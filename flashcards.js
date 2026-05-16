let currentCardIdx = 0;
let cardBank = [];
let currentAudio = null;

window.onload = () => {
    // Sync to main dark mode preference if set
    if (localStorage.getItem('ems_theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // Filter out complex matrix-grids, only pull items compatible with a standard card layout
    cardBank = quizData.filter(q => q.type === 'single' || q.type === 'open-review' || q.type === 'multiple' || q.type === 'text');
    
    // Shuffle the starting sequence deck
    cardBank.sort(() => Math.random() - 0.5);
    
    renderCard();
};

function renderCard() {
    // Turn off active audio if skipping cards mid-track
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }

    const cardElement = document.getElementById('main-card');
    cardElement.classList.remove('is-flipped'); // Always display front first
    
    setTimeout(() => {
        const item = cardBank[currentCardIdx];
        
        // Header Tracking Progress Bar
        document.getElementById('card-progress').innerText = `Card ${currentCardIdx + 1} of ${cardBank.length} | ${item.category}`;
        
        // --- ASSEMBLE FRONT CARD ELEMENTS ---
        const frontContainer = document.querySelector('.card-front');
        frontContainer.innerHTML = `
            <span class="material-icons card-icon">psychology</span>
            <p id="card-question-text" style="font-size: 1.05rem; margin-bottom: 10px; font-weight:500;"></p>
            <small class="flip-hint">Tap card to reveal clinical truth</small>
        `;
        document.getElementById('card-question-text').innerText = item.q;

        // Route Image elements if appended to parameters
        if (item.image) {
            const img = document.createElement('img');
            img.src = item.image;
            img.style.maxWidth = "110px";
            img.style.borderRadius = "6px";
            img.style.marginTop = "8px";
            frontContainer.insertBefore(img, frontContainer.querySelector('.flip-hint'));
        }

        // Route Audio tracks and generate standalone functional execution triggers
        if (item.audio) {
            const audioBtn = document.createElement('button');
            audioBtn.className = 'mode-btn';
            audioBtn.style.padding = '6px 12px';
            audioBtn.style.fontSize = '0.85rem';
            audioBtn.style.marginTop = '8px';
            audioBtn.innerHTML = `<span class="material-icons" style="font-size:1rem; vertical-align:middle;">volume_up</span> Play Diagnostic Track`;
            
            currentAudio = new Audio(item.audio);
            // stopPropagation keeps the card from flipping open when hitting play
            audioBtn.onclick = (e) => { e.stopPropagation(); currentAudio.play(); };
            frontContainer.insertBefore(audioBtn, frontContainer.querySelector('.flip-hint'));
        }
        
        // --- ASSEMBLE REVERSE CARD ELEMENTS ---
        const cleanlyFormattedAnswer = Array.isArray(item.answer) ? item.answer.join(", ") : item.answer;
        document.getElementById('card-answer-text').innerText = cleanlyFormattedAnswer;
        document.getElementById('card-rationale-text').innerText = item.rationale;
        
        const csBox = document.getElementById('card-cheat-sheet');
        if (item.cheatSheet) {
            csBox.style.display = 'block';
            csBox.innerHTML = `<strong>Field Note Summary:</strong> ${item.cheatSheet}`;
        } else {
            csBox.style.display = 'none';
        }
    }, 150);
}

function flipCard() {
    document.getElementById('main-card').classList.toggle('is-flipped');
}

function nextCard(event) {
    event.stopPropagation(); // Avoid accidental flipping
    if (currentCardIdx < cardBank.length - 1) {
        currentCardIdx++;
        renderCard();
    } else {
        alert("End of deck! Reshuffling questions...");
        cardBank.sort(() => Math.random() - 0.5);
        currentCardIdx = 0;
        renderCard();
    }
}

function prevCard(event) {
    event.stopPropagation(); // Avoid accidental flipping
    if (currentCardIdx > 0) {
        currentCardIdx--;
        renderCard();
    }
}
