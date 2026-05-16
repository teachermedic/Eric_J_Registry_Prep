let currentCardIdx = 0;
let cardBank = [];

// Initialize: Filter out long matrix grids or text typed answers if you prefer clean flashcards
window.onload = () => {
    // Collect single-choice, open-review, and multiple choice questions for the deck
    cardBank = quizData.filter(q => q.type === 'single' || q.type === 'open-review' || q.type === 'multiple');
    
    // Optional: Shuffle the deck
    cardBank.sort(() => Math.random() - 0.5);
    
    renderCard();
};

function renderCard() {
    const cardElement = document.getElementById('main-card');
    // Ensure card is unflipped before loading new content
    cardElement.classList.remove('is-flipped');
    
    // Small delay to let unflipped transition finish before text changes
    setTimeout(() => {
        const item = cardBank[currentCardIdx];
        
        // Progress display
        document.getElementById('card-progress').innerText = `Card ${currentCardIdx + 1} of ${cardBank.length} | ${item.category}`;
        
        // Front text
        document.getElementById('card-question-text').innerText = item.q;
        
        // Back text assembly
        // If it's a standard quiz item, combine array strings cleanly
        const cleanlyFormattedAnswer = Array.isArray(item.answer) ? item.answer.join(", ") : item.answer;
        document.getElementById('card-answer-text').innerText = cleanlyFormattedAnswer;
        document.getElementById('card-rationale-text').innerText = item.rationale;
        
        // Bottom Cheat-Sheet/Field Note item display block
        const csBox = document.getElementById('card-cheat-sheet');
        if (item.cheatSheet) {
            csBox.style.display = 'block';
            csBox.innerHTML = `<strong>Quick Note:</strong> ${item.cheatSheet}`;
        } else {
            csBox.style.display = 'none';
        }
    }, 150);
}

function flipCard() {
    document.getElementById('main-card').classList.toggle('is-flipped');
}

function nextCard(event) {
    event.stopPropagation(); // Stops the card from flipping back over when button is clicked
    if (currentCardIdx < cardBank.length - 1) {
        currentCardIdx++;
        renderCard();
    } else {
        alert("Deck complete! Shuffling to start over.");
        cardBank.sort(() => Math.random() - 0.5);
        currentCardIdx = 0;
        renderCard();
    }
}

function prevCard(event) {
    event.stopPropagation(); // Stops card from flipping
    if (currentCardIdx > 0) {
        currentCardIdx--;
        renderCard();
    }
}
