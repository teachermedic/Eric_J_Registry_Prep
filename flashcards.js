/* ============================================================
   CLINICAL FLASHCARDS — Simple progress tracking
   ============================================================ */

const STORAGE_KEY = "clinical-flashcards-progress-v2";

let currentCardIdx = 0;
let cardBank = [];
let currentAudio = null;
let activeDeck = "all";
let reviewOnlyMode = false;

const persisted = loadProgress();
let known = new Set(Object.keys(persisted.known));
let review = new Set(Object.keys(persisted.review));

/* ---------- STORAGE ---------- */
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

/* ---------- HELPERS ---------- */
function cardKey(card) {
    return `${card.category || "unknown"}|${card.q}`;
}

function isFlashcardType(q) {
    return q.type === "single" || q.type === "open-review" ||
           q.type === "multiple" || q.type === "text";
}

function getFilteredBank() {
    let base = quizData.filter(isFlashcardType);

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

/* ---------- RENDER ---------- */
function renderCard() {
    if (currentAudio) { currentAudio.pause(); currentAudio = null; }

    cardBank = getFilteredBank();

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

    document.getElementById("card-progress").innerText =
        `Card ${currentCardIdx + 1} of ${cardBank.length}`;

    document.getElementById("fcDeckLabel").innerText =
        reviewOnlyMode ? "Review Mode — Still Learning"
        : (activeDeck === "all" ? "All Cards" : activeDeck);

    document.getElementById("card-question-text").innerText = item.q;

    const reviewBadge = document.getElementById("cardReviewBadge");
    reviewBadge.style.display = review.has(cardKey(item)) ? "block" : "none";

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

    const pct = ((currentCardIdx + 1) / cardBank.length) * 100;
    document.getElementById("fcProgressFill").style.width = pct + "%";

    updateStats();
}

function updateStats() {
    document.getElementById("knownCount").textContent = known.size;
    document.getElementById("reviewCount").textContent = review.size;
    document.getElementById("remainingCount").textContent = cardBank.length;
}

/* ---------- COMPLETION ---------- */
function showCompletion() {
    document.body.classList.add("deck-finished");
    document.getElementById("completionScreen").classList.add("visible");
    const msg = document.getElementById("completionMessage");

    if (reviewOnlyMode) {
        msg.textContent = "You've cleared your review list! Nothing is marked 'Still Learning.'";
    } else if (review.size > 0) {
        msg.textContent = `Deck mastered! ${review.size} card${review.size === 1 ? "" : "s"} still marked "Still Learning."`;
    } else {
        msg.textContent = "You've mastered every card in this deck. Outstanding work!";
    }

    updateStats();
}

function hideCompletion() {
    document.body.classList.remove("deck-finished");
    document.getElementById("completionScreen").classList.remove("visible");
}

/* ---------- ACTIONS ---------- */
function flipCard() {
    document.getElementById("main-card").classList.toggle("is-flipped");
}

function nextCard(event) {
    if (event) event.stopPropagation();
    if (cardBank.length === 0) return;
    currentCardIdx = (currentCardIdx + 1) % cardBank.length;
    renderCard();
}

function prevCard(event) {
    if (event) event.stopPropagation();
    if (cardBank.length === 0) return;
    currentCardIdx = (currentCardIdx - 1 + cardBank.length) % cardBank.length;
    renderCard();
}

function markKnown(event) {
    if (event) event.stopPropagation();
    if (cardBank.length === 0) return;
    const card = cardBank[currentCardIdx];
    const key = cardKey(card);
    known.add(key);
    review.delete(key);
    saveProgress();
    if (currentCardIdx >= cardBank.length - 1) currentCardIdx = 0;
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

function shuffleDeck() {
    for (let i = cardBank.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardBank[i], cardBank[j]] = [cardBank[j], cardBank[i]];
    }
    currentCardIdx = 0;
    renderCard();
}

function toggleReviewOnly() {
    if (!reviewOnlyMode && review.size === 0) {
        alert("You haven't marked any cards as 'Still Learning' yet.");
        return;
    }
    reviewOnlyMode = !reviewOnlyMode;
    currentCardIdx = 0;
    cardBank = getFilteredBank();
    renderCard();
}

function resetCurrentDeck() {
    if (!confirm("Reset progress for this deck?")) return;
    const scope = activeDeck === "all"
        ? quizData.filter(isFlashcardType)
        : quizData.filter(q => isFlashcardType(q) && q.category === activeDeck);
    scope.forEach(q => {
        known.delete(cardKey(q));
        review.delete(cardKey(q));
    });
    saveProgress();
    currentCardIdx = 0;
    reviewOnlyMode = false;
    renderCard();
}

function clearAllProgress() {
    if (!confirm("Clear ALL progress? This cannot be undone.")) return;
    known.clear();
    review.clear();
    saveProgress();
    currentCardIdx = 0;
    reviewOnlyMode = false;
    renderCard();
}

/* ---------- COMPLETION BUTTONS ---------- */
window.addEventListener("DOMContentLoaded", () => {
    const resetBtn = document.getElementById("resetFromCompleteBtn");
    const reviewBtn = document.getElementById("reviewMissedFromCompleteBtn");
    if (resetBtn) resetBtn.addEventListener("click", resetCurrentDeck);
    if (reviewBtn) reviewBtn.addEventListener("click", () => {
        reviewOnlyMode = true;
        currentCardIdx = 0;
        cardBank = getFilteredBank();
        renderCard();
    });
});

/* ---------- KEYBOARD ---------- */
document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
    if (e.key === "ArrowRight") nextCard();
    if (e.key === "ArrowLeft") prevCard();
    if (e.key === " ") { e.preventDefault(); flipCard(); }
    if (e.key === "1") markKnown();
    if (e.key === "2") markReview();
});

/* ---------- INIT ---------- */
window.addEventListener("load", () => {
    if (localStorage.getItem("ems_theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
    cardBank = getFilteredBank();
    renderCard();
});
