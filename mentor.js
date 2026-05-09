let respiratoryData = [];

// Load the JSON data when the page opens
fetch('respiratory_kb.json')
    .then(response => response.json())
    .then(data => respiratoryData = data);

function askMentor() {
    const query = document.getElementById('user-query').value.toLowerCase();
    const display = document.getElementById('mentor-response');
    
    // Find the best match by checking keywords
    const match = respiratoryData.find(item => 
        item.keywords.some(keyword => query.includes(keyword))
    );

    if (match) {
        display.style.display = 'block';
        document.getElementById('response-title').innerText = match.title;
        document.getElementById('response-text').innerText = match.explanation;
        document.getElementById('response-field-note').innerText = "Field Note: " + match.field_note;
    } else {
        alert("I don't have a plain-language explanation for that yet. Try 'Asthma', 'CPAP', or 'Fluid'.");
    }
}
function startTargetedQuiz() {
    const currentTopic = document.getElementById('response-title').innerText;
    // Save the topic to local storage so the quiz engine knows what to pull
    localStorage.setItem('mentor_targeted_topic', currentTopic);
    window.location.href = 'index.html?mode=mentor';
}
