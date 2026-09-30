/* ============================================================
   CLINICAL FLASHCARDS — Deck picker + simple progress tracking
   ============================================================ */

const STORAGE_KEY = "clinical-flashcards-progress-v4";

let currentCardIdx = 0;
let cardBank = [];
let currentAudio = null;
let activeDeck = "all";
let reviewOnlyMode = false;

const persisted = loadProgress();
let known = new Set(Object.keys(persisted.known));
let review = new Set(Object.keys(persisted.review));

/* ---------- DECK MAPPING ---------- */
const CATEGORY_MAP = {
    "EMS Systems": "EMS Operations",
    "Legal": "EMS Operations",
    "Safety": "EMS Operations",
    "Communications": "EMS Operations",
    "Lifting": "EMS Operations",
    "Wellness": "EMS Operations",
    "Medical": "Medical",
    "Cardiology": "Medical",
    "Cardiovascular": "Medical",
    "Respiratory": "Medical",
    "Neurology": "Medical",
    "Neuro": "Medical",
    "Endocrine": "Medical",
    "Toxicology": "Medical",
    "Immunology": "Medical",
    "Pharmacology": "Medical",
    "Assessment": "Medical",
    "Gynecology": "Medical",
    "Trauma": "Trauma",
    "MOI": "Trauma",
    "Bleeding": "Trauma",
    "Chest": "Trauma",
    "Abdominal": "Trauma",
    "Ortho": "Trauma",
    "Head/Spine": "Trauma",
    "Environmental": "Trauma",
    "Soft-Tissue": "Trauma",
    "Physics": "Trauma",
    "Shock": "Trauma",
    "Face/Neck": "Trauma",
    "Patho": "Pathophysiology",
    "Pathophysiology": "Pathophysiology",
    "Pediatrics": "Pediatrics",
    "Neonatal": "Pediatrics",
    "Obstetrics": "OB/GYN",
    "OBPeds": "OB/GYN",
    "Terminology": "Terminology"
};

function getDeckName(card) {
    const cat = card.category || "General";
    return CATEGORY_MAP[cat] || "Medical";
}

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
    return (card.category || "unknown") + "|" + card.q;
}

function isFlashcardType(q) {
    return q.type === "single" || q.type === "open-review" ||
           q.type === "multiple" || q.type === "text";
}

function getFilteredBank() {
    let base = quizData.filter(isFlashcardType);
    if (activeDeck !== "all") {
        base = base.filter(q => getDeckName(q) === activeDeck);
    }
    if (reviewOnlyMode) {
        base = base.filter(q => review.has(cardKey(q)));
    } else {
        base = base.filter(q => !known.has(cardKey(q)));
    }
    return base;
}

/* ---------- DECK PICKER ---------- */
function getDeckStats() {
    const decks = {};
    quizData.filter(isFlashcardType).forEach(q => {
        const deck = getDeckName(q);
        if (!decks[deck]) decks[deck] = { total: 0, known: 0, review: 0 };
        decks[deck].total++;
        const key = cardKey(q);
        if (known.has(key)) decks[deck].known++;
        if (review.has(key)) decks[deck].review++;
    });
    return decks;
}

function getDeckIcon(deckName) {
    const icons = {
        "EMS Operations": "local_hospital",
        "Medical": "medical_services",
        "Trauma": "healing",
        "Pathophysiology": "coronavirus",
        "Pediatrics": "child_care",
        "OB/GYN": "pregnant_woman",
        "Terminology": "translate"
    };
    return icons[deckName] || "style";
}

function renderDeckPicker() {
    const grid = document.getElementById("deckGrid");
    if (!grid) return;

    const decks = getDeckStats();
    const sorted = Object.entries(decks).sort((a, b) => a[0].localeCompare(b[0]));

    grid.innerHTML = sorted.map(function(entry) {
        const cat = entry[0];
        const stats = entry[1];
        const pct = stats.total > 0 ? Math.round((stats.known / stats.total) * 100) : 0;
        const mastered = stats.known === stats.total;
        const icon = getDeckIcon(cat);
        const reviewBadge = stats.review > 0
            ? '<span class="deck-tile-review-badge">' + stats.review + ' to review</span>'
            : '';

        return '<button class="deck-tile ' + (mastered ? 'mastered' : '') + '" onclick="selectDeck(\'' + cat.replace(/'/g, "\\'") + '\')">' +
            reviewBadge +
            '<span class="material-icons deck-tile-icon">' + icon + '</span>' +
            '<p class="deck-tile-name">' + cat + '</p>' +
            '<p class="deck-tile-stats">' + stats.total + ' cards · ' + stats.known + ' known</p>' +
            '<div class="deck-tile-progress-bar">' +
                '<div class="deck-tile-progress-fill" style="width: ' + pct + '%"></div>' +
            '</div>' +
        '</button>';
    }).join("");
}

/* ---------- SCREEN SWITCHING ---------- */
function selectDeck(category) {
    activeDeck = category;
    reviewOnlyMode = false;
    currentCardIdx = 0;
    document.getElementById("deckPicker").style.display = "none";
    document.getElementById("cardView").classList.add("visible");
    cardBank = getFilteredBank();
    renderCard();
}

function backToDeckPicker() {
    document.getElementById("cardView").classList.remove("visible");
    document.getElementById("deckPicker").style.display = "block";
    renderDeckPicker();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------- RENDER ---------- */
function renderCard() {
    if (currentAudio) { currentAudio.pause(); currentAudio = null; }
    cardBank = getFilteredBank();

    if (cardBank.length === 0) { showCompletion(); return; }
    hideCompletion();

    if (currentCardIdx >= cardBank.length) currentCardIdx = 0;
    if (currentCardIdx < 0) currentCardIdx = cardBank.length - 1;

    const item = cardBank[currentCardIdx];
    const cardElement = document.getElementById("main-card");
    cardElement.classList.remove("is-flipped");

    document.getElementById("card-progress").innerText =
        "Card " + (currentCardIdx + 1) + " of " + cardBank.length;

    document.getElementById("fcDeckLabel").innerText =
        reviewOnlyMode ? "Review Mode — Still Learning" : activeDeck;

    document.getElementById("card-question-text").innerText = item.q;

    const reviewBadge = document.getElementById("cardReviewBadge");
    reviewBadge.style.display = review.has(cardKey(item)) ? "block" : "none";

    const cleanAnswer = Array.isArray(item.answer) ? item.answer.join(", ") : item.answer;
    document.getElementById("card-answer-text").innerText = cleanAnswer;
    document.getElementById("card-rationale-text").innerText = item.rationale || "";

    const csBox = document.getElementById("card-cheat-sheet");
    if (item.cheatSheet) {
        csBox.style.display = "block";
        csBox.innerHTML = "<strong>Field Note Summary:</strong> " + item.cheatSheet;
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
    const wrapper = document.querySelector(".flashcard-wrapper");
    const controls = document.querySelector(".fc-controls");
    const secondary = document.querySelector(".fc-secondary-controls");
    const progressBar = document.querySelector(".fc-progress-bar");
    const meta = document.querySelector(".fc-meta");

    if (wrapper) wrapper.style.display = "none";
    if (controls) controls.style.display = "none";
    if (secondary) secondary.style.display = "none";
    if (progressBar) progressBar.style.display = "none";
    if (meta) meta.style.display = "none";

    document.getElementById("completionScreen").classList.add("visible");

    const title = document.getElementById("completionTitle");
    const msg = document.getElementById("completionMessage");

    if (reviewOnlyMode) {
        title.textContent = "Review Complete!";
    } else {
        title.textContent = activeDeck + " Complete!";
    }

    if (reviewOnlyMode) {
        msg.textContent = "You've cleared your review list! Nothing is marked 'Still Learning.'";
    } else if (review.size > 0) {
        msg.textContent = "Deck mastered! " + review.size + " card" + (review.size === 1 ? "" : "s") + " still marked 'Still Learning.'";
    } else {
        msg.textContent = "You've mastered every card in this deck. Outstanding work!";
    }
}

function hideCompletion() {
    const wrapper = document.querySelector(".flashcard-wrapper");
    const controls = document.querySelector(".fc-controls");
    const secondary = document.querySelector(".fc-secondary-controls");
    const progressBar = document.querySelector(".fc-progress-bar");
    const meta = document.querySelector(".fc-meta");

    if (wrapper) wrapper.style.display = "";
    if (controls) controls.style.display = "";
    if (secondary) secondary.style.display = "";
    if (progressBar) progressBar.style.display = "";
    if (meta) meta.style.display = "";

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
        const tmp = cardBank[i];
        cardBank[i] = cardBank[j];
        cardBank[j] = tmp;
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
        : quizData.filter(q => isFlashcardType(q) && getDeckName(q) === activeDeck);
    scope.forEach(q => {
        known.delete(cardKey(q));
        review.delete(cardKey(q));
    });
    saveProgress();
    currentCardIdx = 0;
    reviewOnlyMode = false;
    renderCard();
}

/* ---------- INIT ---------- */
function initFlashcards() {
    if (localStorage.getItem("ems_theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
    const resetBtn = document.getElementById("resetFromCompleteBtn");
    const backBtn = document.getElementById("backFromCompleteBtn");
    if (resetBtn) resetBtn.addEventListener("click", resetCurrentDeck);
    if (backBtn) backBtn.addEventListener("click", backToDeckPicker);
    renderDeckPicker();
}

document.addEventListener("keydown", function(e) {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
    const cardView = document.getElementById("cardView");
    if (!cardView || !cardView.classList.contains("visible")) return;
    if (e.key === "ArrowRight") nextCard();
    if (e.key === "ArrowLeft") prevCard();
    if (e.key === " ") { e.preventDefault(); flipCard(); }
    if (e.key === "1") markKnown();
    if (e.key === "2") markReview();
    if (e.key === "Escape") backToDeckPicker();
});

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFlashcards);
} else {
    initFlashcards();
}
