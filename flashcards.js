/* ============================================================
   CLINICAL FLASHCARDS — FSRS-powered spaced repetition
   ============================================================ */

// ---------- FSRS SETUP ----------
// Wait for the ts-fsrs library to be available before destructuring
if (!window.tsFsrs) {
    console.error("FSRS library not loaded. Check the CDN script tag.");
}

const { createEmptyCard, fsrs, Rating, State } = window.tsFsrs || {
    createEmptyCard: () => ({
        due: new Date(),
        stability: 0,
        difficulty: 0,
        elapsed_days: 0,
        scheduled_days: 0,
        reps: 0,
        lapses: 0,
        state: 0,
        last_review: undefined,
    }),
    fsrs: () => ({
        next: (card) => ({ card }),
        repeat: (card) => ({
            1: { card },
            2: { card },
            3: { card },
            4: { card },
        }),
    }),
    Rating: { Again: 1, Hard: 2, Good: 3, Easy: 4 },
    State: { New: 0, Learning: 1, Review: 2, Relearning: 3 },
};

// Create the FSRS scheduler with default parameters
const scheduler = fsrs({
    request_retention: 0.9,
    maximum_interval: 36500,
    enable_fuzz: true,
    enable_short_term: false,
});

const STORAGE_KEY = "clinical-flashcards-fsrs-v1";

/* ---------- STATE ---------- */
let currentCardIdx = 0;
let cardBank = [];
let currentAudio = null;
let activeDeck = "all";
let reviewOnlyMode = false;

// FSRS card states stored by cardKey
let fsrsCards = {};

/* ---------- STORAGE ---------- */
function loadProgress() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return { cards: {} };
        const parsed = JSON.parse(raw);
        return { cards: parsed.cards || {} };
    } catch (err) {
        console.warn("Could not load FSRS progress:", err);
        return { cards: {} };
    }
}

function saveProgress() {
    try {
        // Serialize FSRS cards (convert Date objects to ISO strings)
        const serialized = {};
        for (const [key, card] of Object.entries(fsrsCards)) {
            serialized[key] = {
                ...card,
                due: card.due instanceof Date ? card.due.toISOString() : card.due,
                last_review: card.last_review instanceof Date
                    ? card.last_review.toISOString()
                    : card.last_review,
            };
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ cards: serialized }));
    } catch (err) {
        console.warn("Could not save FSRS progress:", err);
    }
}

/* ---------- HELPERS ---------- */
function cardKey(card) {
    return `${card.category || "unknown"}|${card.q}`;
}

function getOrCreateFsrsCard(card) {
    const key = cardKey(card);
    if (!fsrsCards[key]) {
        fsrsCards[key] = createEmptyCard();
    }
    // Rehydrate dates if they were serialized
    const c = fsrsCards[key];
    if (typeof c.due === 'string') c.due = new Date(c.due);
    if (typeof c.last_review === 'string') c.last_review = new Date(c.last_review);
    return c;
}

function isFlashcardType(q) {
    return q.type === "single" || q.type === "open-review" ||
           q.type === "multiple" || q.type === "text";
}

function getAllCategories() {
    const cats = new Set();
    quizData.forEach(q => {
        if (isFlashcardType(q) && q.category) cats.add(q.category);
    });
    return ["all", ...Array.from(cats).sort()];
}

/* ---------- FSRS FILTERING ---------- */
function isDueForReview(card) {
    const fsrsCard = getOrCreateFsrsCard(card);
    if (fsrsCard.state === State.New) return true;
    return new Date(fsrsCard.due) <= new Date();
}

function getFilteredBank() {
    let base = quizData.filter(isFlashcardType);

    if (activeDeck !== "all") {
        base = base.filter(q => q.category === activeDeck);
    }

    if (reviewOnlyMode) {
        // Show cards that are due for review and have been reviewed before
        base = base.filter(q => {
            const fsrsCard = getOrCreateFsrsCard(q);
            return fsrsCard.state !== State.New && isDueForReview(q);
        });
    } else {
        // Show cards due for review (includes new cards)
        base = base.filter(isDueForReview);
    }

    // Sort by due date (most overdue first), with new cards mixed in
    base.sort((a, b) => {
        const cardA = getOrCreateFsrsCard(a);
        const cardB = getOrCreateFsrsCard(b);
        if (cardA.state === State.New && cardB.state === State.New) return 0;
        if (cardA.state === State.New) return -1;  // New cards first
        if (cardB.state === State.New) return 1;
        return new Date(cardA.due) - new Date(cardB.due);
    });

    return base;
}

/* ---------- TABS ---------- */
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
        tab.type = "button";
        tab.textContent = labels[cat] || cat;

        // Count due cards for this category
        let count;
        if (cat === "all") {
            count = quizData.filter(q => isFlashcardType(q) && isDueForReview(q)).length;
        } else {
            count = quizData.filter(q => isFlashcardType(q) && q.category === cat && isDueForReview(q)).length;
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
            renderDeckTabs();
            renderCard();
        });

        container.appendChild(tab);
    });
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
        reviewOnlyMode ? "Review Mode — Due Cards"
        : (activeDeck === "all" ? "All Cards" : activeDeck);

    // Front
    document.getElementById("card-question-text").innerText = item.q;

    // Answer + rationale + cheat sheet
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

    // Progress bar
    const pct = ((currentCardIdx + 1) / cardBank.length) * 100;
    document.getElementById("fcProgressFill").style.width = pct + "%";

    updateStats();
    updateTabBadges();
    updateRatingButtons();
}

function updateStats() {
    const knownEl = document.getElementById("knownCount");
    const reviewEl = document.getElementById("reviewCount");
    const remainingEl = document.getElementById("remainingCount");
    if (!knownEl) return;

    let learned = 0;
    let learning = 0;

    for (const card of quizData.filter(isFlashcardType)) {
        const fsrsCard = getOrCreateFsrsCard(card);
        if (fsrsCard.state === State.Review) {
            learned++;
        } else if (fsrsCard.state === State.Learning || fsrsCard.state === State.Relearning) {
            learning++;
        }
    }

    knownEl.textContent = learned;
    reviewEl.textContent = learning;
    remainingEl.textContent = cardBank.length;
}

function updateTabBadges() {
    document.querySelectorAll(".deck-tab").forEach(tab => {
        const cat = tab.dataset.deck;
        let count;
        if (cat === "all") {
            count = quizData.filter(q => isFlashcardType(q) && isDueForReview(q)).length;
        } else {
            count = quizData.filter(q => isFlashcardType(q) && q.category === cat && isDueForReview(q)).length;
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

function updateRatingButtons() {
    // Hide the default rating buttons and show FSRS 4-button layout
    const currentCard = cardBank[currentCardIdx];
    if (!currentCard) return;

    const fsrsCard = getOrCreateFsrsCard(currentCard);

    // Update button labels with next review interval preview
    const preview = scheduler.repeat(fsrsCard, new Date());

    const formatInterval = (card) => {
        const due = new Date(card.due);
        const now = new Date();
        const diffMs = due - now;
        const diffMins = Math.round(diffMs / 60000);
        const diffHours = Math.round(diffMs / 3600000);
        const diffDays = Math.round(diffMs / 86400000);

        if (diffMins < 60) return `${diffMins}m`;
        if (diffHours < 24) return `${diffHours}h`;
        return `${diffDays}d`;
    };

    // Update the button labels if you want to show intervals
    // This requires custom buttons in your HTML
    const againBtn = document.getElementById('btn-again');
    const hardBtn = document.getElementById('btn-hard');
    const goodBtn = document.getElementById('btn-good');
    const easyBtn = document.getElementById('btn-easy');

    if (againBtn) againBtn.innerHTML = `Again<br><small>${formatInterval(preview[Rating.Again].card)}</small>`;
    if (hardBtn) hardBtn.innerHTML = `Hard<br><small>${formatInterval(preview[Rating.Hard].card)}</small>`;
    if (goodBtn) goodBtn.innerHTML = `Good<br><small>${formatInterval(preview[Rating.Good].card)}</small>`;
    if (easyBtn) easyBtn.innerHTML = `Easy<br><small>${formatInterval(preview[Rating.Easy].card)}</small>`;
}

/* ---------- COMPLETION ---------- */
function showCompletion() {
    document.body.classList.add("deck-finished");
    document.getElementById("completionScreen").classList.add("visible");
    const msg = document.getElementById("completionMessage");

    const totalDue = quizData.filter(q => isFlashcardType(q) && isDueForReview(q)).length;

    if (reviewOnlyMode) {
        msg.textContent = "You've cleared all due cards! Come back later when more are scheduled.";
    } else if (totalDue > 0) {
        msg.textContent = `You've cleared your current queue! ${totalDue} card${totalDue === 1 ? "" : "s"} are scheduled for later review.`;
    } else {
        msg.textContent = "You're all caught up! No cards are due for review right now.";
    }

    document.getElementById("remainingCount").textContent = 0;
    document.getElementById("fcProgressFill").style.width = "100%";
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

/* ---------- FSRS RATING HANDLERS ---------- */
function rateCard(rating, event) {
    if (event) event.stopPropagation();
    if (cardBank.length === 0) return;

    const card = cardBank[currentCardIdx];
    const key = cardKey(card);
    const fsrsCard = getOrCreateFsrsCard(card);

    // Apply FSRS scheduling
    const result = scheduler.next(fsrsCard, new Date(), rating);
    fsrsCards[key] = result.card;

    saveProgress();

    // Remove from current view (it's now scheduled for the future)
    cardBank.splice(currentCardIdx, 1);
    if (currentCardIdx >= cardBank.length) currentCardIdx = 0;

    renderCard();
}

function markKnown(event) {
    // Legacy handler - maps to "Good" rating
    rateCard(Rating.Good, event);
}

function markReview(event) {
    // Legacy handler - maps to "Again" rating
    rateCard(Rating.Again, event);
}

/* ---------- OTHER ACTIONS ---------- */
function shuffleDeck() {
    // With FSRS, shuffling isn't needed - cards are already ordered by due date
    // But we can randomize the order of due cards
    for (let i = cardBank.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardBank[i], cardBank[j]] = [cardBank[j], cardBank[i]];
    }
    currentCardIdx = 0;
    renderCard();
}

function toggleReviewOnly() {
    const dueCount = quizData.filter(q => {
        const fsrsCard = getOrCreateFsrsCard(q);
        return fsrsCard.state !== State.New && isDueForReview(q);
    }).length;

    if (!reviewOnlyMode && dueCount === 0) {
        alert("No cards are due for review right now. Come back later!");
        return;
    }
    reviewOnlyMode = !reviewOnlyMode;
    currentCardIdx = 0;
    cardBank = getFilteredBank();
    renderCard();
}

function resetCurrentDeck() {
    if (!confirm("Reset progress for this deck? All FSRS scheduling data will be cleared.")) return;
    const scope = activeDeck === "all"
        ? quizData.filter(isFlashcardType)
        : quizData.filter(q => isFlashcardType(q) && q.category === activeDeck);
    scope.forEach(q => {
        delete fsrsCards[cardKey(q)];
    });
    saveProgress();
    currentCardIdx = 0;
    reviewOnlyMode = false;
    cardBank = getFilteredBank();
    renderCard();
}

function clearAllProgress() {
    if (!confirm("Clear ALL progress? This cannot be undone.")) return;
    fsrsCards = {};
    saveProgress();
    currentCardIdx = 0;
    reviewOnlyMode = false;
    cardBank = getFilteredBank();
    renderCard();
}

/* ---------- COMPLETION BUTTONS ---------- */
window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("resetFromCompleteBtn").addEventListener("click", resetCurrentDeck);
    document.getElementById("reviewMissedFromCompleteBtn").addEventListener("click", () => {
        reviewOnlyMode = true;
        currentCardIdx = 0;
        cardBank = getFilteredBank();
        renderCard();
    });

    // FSRS Rating buttons (if you add them to HTML)
    const againBtn = document.getElementById('btn-again');
    const hardBtn = document.getElementById('btn-hard');
    const goodBtn = document.getElementById('btn-good');
    const easyBtn = document.getElementById('btn-easy');

    if (againBtn) againBtn.addEventListener('click', (e) => rateCard(Rating.Again, e));
    if (hardBtn) hardBtn.addEventListener('click', (e) => rateCard(Rating.Hard, e));
    if (goodBtn) goodBtn.addEventListener('click', (e) => rateCard(Rating.Good, e));
    if (easyBtn) easyBtn.addEventListener('click', (e) => rateCard(Rating.Easy, e));
});

/* ---------- KEYBOARD ---------- */
document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
    if (e.key === "ArrowRight") nextCard();
    if (e.key === "ArrowLeft") prevCard();
    if (e.key === " ") { e.preventDefault(); flipCard(); }
    // Keyboard shortcuts for ratings (1-4)
    if (e.key === "1") rateCard(Rating.Again);
    if (e.key === "2") rateCard(Rating.Hard);
    if (e.key === "3") rateCard(Rating.Good);
    if (e.key === "4") rateCard(Rating.Easy);
});

/* ---------- INIT ---------- */
window.addEventListener("load", () => {
    if (localStorage.getItem("ems_theme") === "dark") {
        document.body.classList.add("dark-mode");
    }

    // Load existing FSRS state
    const persisted = loadProgress();
    fsrsCards = persisted.cards || {};

    renderDeckTabs();
    cardBank = getFilteredBank();
    renderCard();
});
