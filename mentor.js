let respiratoryData = [];

// Load the Knowledge Base from your JSON file
fetch('respiratory_kb.json')
    .then(response => response.json())
    .then(data => {
        respiratoryData = data;
        console.log("Respiratory Mentor: Knowledge Base Loaded.");
    })
    .catch(err => console.error("Critical Error: Could not load Respiratory KB", err));

function askMentor() {
    const queryInput = document.getElementById('user-query');
    const query = queryInput.value.toLowerCase().trim();
    const display = document.getElementById('mentor-response');
    
    if (!query) return;

    // ROBUST SEARCH: Checks technical keywords AND plain-language synonyms
    const match = respiratoryData.find(item => 
        item.keywords.some(k => query.includes(k.toLowerCase())) || 
        (item.synonyms && item.synonyms.some(s => query.includes(s.toLowerCase())))
    );

    if (match) {
        display.style.display = 'block';
        document.getElementById('response-title').innerText = match.title;

        // BUILD THE RESPONSE: Start with the plain-language explanation
        let fullResponse = match.explanation;

        // DYNAMIC ADDITION: Add Assessment findings if available
        if (match.assessment) {
            fullResponse += `\n\nClinical Assessment: ${match.assessment}`;
        }

        // DYNAMIC ADDITION: Check if user is asking about kids/pediatrics
        const pedsTerms = ["peds", "child", "kid", "infant", "toddler", "baby"];
        const isAskingPeds = pedsTerms.some(term => query.includes(term));

        if (isAskingPeds && match.pediatric_note) {
            fullResponse += `\n\nPediatric Pearl: ${match.pediatric_note}`;
        }

        document.getElementById('response-text').innerText = fullResponse;
        
        // FIELD NOTE: Use innerHTML to allow for bolding or small styling
        document.getElementById('response-field-note').innerHTML = `<strong>Field Note:</strong> ${match.field_note}`;
        
        // Scroll to the answer automatically for better mobile UX
        display.scrollIntoView({ behavior: 'smooth' });

    } else {
        alert("I don't have a specific field note for that yet. Try terms like 'Asthma', 'CPAP', 'Fluid', or 'Clot'.");
    }
}

function startTargetedQuiz() {
    const currentTopic = document.getElementById('response-title').innerText;
    
    // Save the specific topic to local storage for the main quiz engine
    localStorage.setItem('mentor_targeted_topic', currentTopic);
    
    // Redirect to the main page with the mentor mode trigger in the URL
    window.location.href = 'index.html?mode=mentor';
}
