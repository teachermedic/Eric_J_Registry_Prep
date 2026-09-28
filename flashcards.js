/* ============================================================
   CLINICAL FLASHCARDS — with persistence + review mode
   ============================================================ */

const STORAGE_KEY = "clinical-flashcards-progress-v1";

// ---------- STATE ----------
let currentCardIdx = 0;
let cardBank = [];
let currentAudio = null;
let activeDeck = "all";
let reviewOnlyMode = false;

// Persisted sets (keyed by "category|q" so reordering doesn't break them)
const persisted = loadProgress();
let known = new Set(Object.keys(persisted.known));
let review = new Set(Object.keys(persisted.review));

// ---------- STORAGE ----------
function loadProgress() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return { known: {}, review: {} };
        const p = JSON.parse(raw);
        return { known: p.known || {}, review: p.review || {} };
    } catch { return { known: {}, review: {} }; }
}

function saveProgress() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            known: Object.fromEntries([...known].map(k => [k, true])),
            review: Object.fromEntries([...review].map(k => [k, true]))
        }));
    } catch (e) { console.warn("Save failed:", e); }
}

// ---------- CARD HELPERS ----------
function cardKey(card) {
    return `${card.category || "unknown"}|${card.q}`;
}

function getAllCategories() {
    const cats = new Set();
    quizData.forEach(q => {
        if (q.type === "single" || q.type === "open-review" || q.type === "multiple" || q.type === "text") {
            if (q.category) cats.add(q.category);
        }
    });
    return ["all", ...Array.from(cats).sort()];
}

function getFilteredBank() {
    let base = quizData.filter(q =>
        q.type === "single" || q.type === "open-review" || q.type === "multiple" || q.type === "text"
    );

    if (activeDeck !== "all") {
        base = base.filter(q => q.category === activeDeck);
    }

    if (reviewOnlyMode) {
        base = base.filter(q => review.has(cardKey(q)));
    } else {
        base = base.filter(q => !known.has(cardKey(q)));
    }

    return base;
}

// ---------- TABS ----------
function renderDeckTabs() {
    const container = document.getElementById("deckSelector");
    if (!container) return;

    container.innerHTML = "";
    const cats = getAllCategories();
    const labels = { all: "All Cards" };

    cats.forEach(cat => {
        const tab = document.createElement("button");
        tab.className = "deck-tab" + (cat === activeDeck ? " active" : "");
        tab.dataset.deck = cat;
        tab.textContent = labels[cat] || cat;

        // Count cards in review for this category
        let count;
        if (cat === "all") {
            count = quizData.filter(q => review.has(cardKey(q))).length;
        } else {
            count = quizData.filter(q => q.category === cat && review.has(cardKey(q))).length;
        }

        if (count > 0) {
            const badge = document.createElement("span");
            badge.className = "tab-badge";
            badge.textContent = count;
            tab.appendChild(badge);
        }

        tab.addEventListener("click", () => {
            activeDeck = cat;
            reviewOnlyMode = false;
            currentCardIdx = 0;
            cardBank = getFilteredBank();
            cardBank.sort(() => Math.random() - 0.5);
            renderDeckTabs();
            renderCard();
        });

        container.appendChild(tab);
    });
}

// ---------- RENDER ----------
function renderCard() {
    if (currentAudio) { currentAudio.pause(); currentAudio = null; }

    // Filter & shuffle if we came from a button action
    if (cardBank.length === 0) cardBank = getFilteredBank();

    // If the deck is empty, show completion
    if (cardBank.length === 0) {
        showCompletion();
        return;
    }

    hideCompletion();

    if (currentCardIdx >= cardBank.length) currentCardIdx = 0;
    if (currentCardIdx < 0) currentCardIdx = cardBank.length - 1;

    const item = cardBank[currentCardIdx];
    const cardElement = document.getElementById("main-card");
    cardElement.classList.remove("is-flipped");

    setTimeout(() => {
        // --- PROGRESS ---
        document.getElementById("card-progress").innerText =
            `Card ${currentCardIdx + 1} of ${cardBank.length} | ${item.category || "—"}`;

        // --- FRONT ---
        const frontContainer = document.querySelector(".card-front");
        frontContainer.innerHTML = `
            <span class="material-icons card-icon">psychology</span>
            <p id="card-question-text" style="font-size: 1.05rem; margin-bottom: 10px; font-weight:500;"></p>
            <small class="flip-hint">Tap card to reveal clinical truth</small>
        `;
        document.getElementById("card-question-text").innerText = item.q;

        // Still Learning badge
        if (review.has(cardKey(item))) {
            const badge = document.createElement("div");
            badge.className = "card-review-badge";
            badge.textContent = "Still Learning";
            frontContainer.appendChild(badge);
        }

        // Image
        if (item.image) {
            const img = document.createElement("img");
            img.src = item.image;
            img.style.maxWidth = "110px";
            img.style.borderRadius = "6px";
            img.style.marginTop = "8px";
            frontContainer.insertBefore(img, frontContainer.querySelector(".flip-hint"));
        }

        // Audio
        if (item.audio) {
            const audioBtn = document.createElement("button");
            audioBtn.className = "mode-btn";
            audioBtn.style.padding = "6px 12px";
            audioBtn.style.fontSize = "0.85rem";
            audioBtn.style.marginTop = "8px";
            audioBtn.innerHTML = `<span class="material-icons" style="font-size:1rem; vertical-align:middle;">volume_up</span> Play Diagnostic Track`;
            currentAudio = new Audio(item.audio);
            audioBtn.onclick = (e) => { e.stopPropagation(); currentAudio.play(); };
            frontContainer.insertBefore(audioBtn, frontContainer.querySelector(".flip-hint"));
        }

        // --- BACK ---
        const cleanAnswer = Array.isArray(item.answer) ? item.answer.join(", ") : item.answer;
        document.getElementById("card-answer-text").innerText = cleanAnswer;
        document.getElementById("card-rationale-text").innerText = item.rationale || "";

        const csBox = document.getElementById("card-cheat-sheet");
        if (item.cheatSheet) {
            csBox.style.display = "block";
            csBox.innerHTML = `<strong>Field Note Summary:</strong> ${item.cheatSheet}`;
        } else {
            csBox.style.display = "none";
        }

        updateStats();
        updateDeckTabsIfNeeded();
    }, 150);
}

function updateStats() {
    const knownEl = document.getElementById("knownCount");
    const reviewEl = document.getElementById("reviewCount");
    const remainingEl = document.getElementById("remainingCount");
    if (!knownEl) return;
    knownEl.textContent = known.size;
    reviewEl.textContent = review.size;
    remainingEl.textContent = cardBank.length;
}

function updateDeckTabsIfNeeded() {
    // Refresh badge counts without rebuilding the whole row
    document.querySelectorAll(".deck-tab").forEach(tab => {
        const cat = tab.dataset.deck;
        let count;
        if (cat === "all") {
            count = quizData.filter(q => review.has(cardKey(q))).length;
        } else {
            count = quizData.filter(q => q.category === cat && review.has(cardKey(q))).length;
        }
        const existing = tab.querySelector(".tab-badge");
        if (existing) existing.remove();
        if (count > 0) {
            const badge = document.createElement("span");
            badge.className = "tab-badge";
            badge.textContent = count;
            tab.appendChild(badge);
        }
    });
}

// ---------- ACTIONS ----------
function flipCard() {
    document.getElementById("main-card").classList.toggle("is-flipped");
}

function nextCard(event) {
    if (event) event.stopPropagation();
    if (cardBank.length === 0) return;
    if (currentCardIdx < cardBank.length - 1) {
        currentCardIdx++;
        renderCard();
    } else {
        cardBank.sort(() => Math.random() - 0.5);
        currentCardIdx = 0;
        renderCard();
    }
}

function prevCard(event) {
    if (event) event.stopPropagation();
    if (currentCardIdx > 0) {
        currentCardIdx--;
        renderCard();
    }
}

function markKnown(event) {
    if (event) event.stopPropagation();
    if (cardBank.length === 0) return;
    const card = cardBank[currentCardIdx];
    const key = cardKey(card);
    known.add(key);
    review.delete(key);
    saveProgress();
    cardBank.splice(currentCardIdx, 1);
    if (currentCardIdx >= cardBank.length) currentCardIdx = 0;
    renderCard();
}

function markReview(event) {
    if (event) event.stopPropagation();
    if (cardBank.length === 0) return;
    const card = cardBank[currentCardIdx];
    const key = cardKey(card);
    review.add(key);
    known.delete(key);
    saveProgress();
    currentCardIdx = (currentCardIdx + 1) % cardBank.length;
    renderCard();
}

function toggleReviewOnly() {
    reviewOnlyMode = !reviewOnlyMode;
    if (reviewOnlyMode && review.size === 0) {
        alert("You haven't marked any cards as 'Still Learning' yet.");
        reviewOnlyMode = false;
        return;
    }
    currentCardIdx = 0;
    cardBank = getFilteredBank();
    cardBank.sort(() => Math.random() - 0.5);
    renderCard();
}

function resetCurrentDeck() {
    if (!confirm("Reset progress for this deck?")) return;
    const scope = activeDeck === "all"
        ? quizData
        : quizData.filter(q => q.category === activeDeck);
    scope.forEach(q => {
        known.delete(cardKey(q));
        review.delete(cardKey(q));
    });
    saveProgress();
    currentCardIdx = 0;
    reviewOnlyMode = false;
    cardBank = getFilteredBank();
    cardBank.sort(() => Math.random() - 0.5);
    renderCard();
}

function clearAllProgress() {
    if (!confirm("Clear ALL progress? This cannot be undone.")) return;
    known.clear();
    review.clear();
    saveProgress();
    currentCardIdx = 0;
    reviewOnlyMode = false;
    cardBank = getFilteredBank();
    cardBank.sort(() => Math.random() - 0.5);
    renderCard();
}

// ---------- COMPLETION SCREEN ----------
function showCompletion() {
    document.getElementById("completionScreen").classList.add("visible");
    const msg = document.getElementById("completionMessage");
    if (reviewOnlyMode) {
        msg.textContent = "You've cleared your review list! Nothing is marked 'Still Learning' right now.";
    } else if (review.size > 0) {
        msg.textContent = `Deck mastered! ${review.size} card${review.size === 1 ? "" : "s"} still marked "Still Learning."`;
    } else {
        msg.textContent = "You've mastered every card in this deck. Outstanding work!";
    }
}

function hideCompletion() {
    document.getElementById("completionScreen").classList.remove("visible");
}

// ---------- KEYBOARD ----------
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextCard();
    if (e.key === "ArrowLeft") prevCard();
    if (e.key === " ") { e.preventDefault(); flipCard(); }
    if (e.key === "1") markKnown();
    if (e.key === "2") markReview();
});

// ---------- INIT ----------
window.onload = () => {
    if (localStorage.getItem("ems_theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
    renderDeckTabs();
    cardBank = getFilteredBank();
    cardBank.sort(() => Math.random() - 0.5);
    renderCard();
};
