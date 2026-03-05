const quizData = [
    // Chapter 1: EMS Systems
    { q: "Which of the following are the four levels of EMS training and licensure?", options: ["EMR", "EMT", "AEMT", "Paramedic", "Physician Assistant"], answer: ["EMR", "EMT", "AEMT", "Paramedic"], type: "multiple" },
    { q: "The medical director's daily oversight of patient care is known as:", options: ["Offline medical direction", "Standing orders", "Online medical direction", "Protocols"], answer: ["Online medical direction"], type: "single" },
    { q: "What is the primary goal of Continuous Quality Improvement (CQI)?", options: ["To punish provider errors", "To improve patient care and safety", "To reduce department costs", "To increase response times"], answer: ["To improve patient care and safety"], type: "single" },
    
    // Chapter 2: Workforce Safety and Wellness
    { q: "Which of these are standard precautions for every patient contact?", options: ["Gloves", "Hand hygiene", "HEPA Respirator", "Gown", "Full face shield"], answer: ["Gloves", "Hand hygiene"], type: "multiple" },
    { q: "A patient with suspected Tuberculosis (TB) requires which level of PPE?", options: ["Surgical mask", "N95 or HEPA respirator", "Gloves only", "Goggles only"], answer: ["N95 or HEPA respirator"], type: "single" },
    { q: "The process by which an organism is transmitted from one person to another is:", options: ["Infection", "Contamination", "Transmission", "Exposure"], answer: ["Transmission"], type: "single" },
    
    // Chapter 3: Medical, Legal, and Ethical Issues
    { q: "What four factors must be present to determine negligence?", options: ["Duty to act", "Breach of duty", "Damages", "Proximate cause", "Intent to injure"], answer: ["Duty to act", "Breach of duty", "Damages", "Proximate cause"], type: "multiple" },
    { q: "A wrongful act that gives rise to a civil lawsuit is a:", options: ["Felony", "Misdemeanor", "Tort", "Protocol"], answer: ["Tort"], type: "single" },
    { q: "What is the term for false and damaging information communicated by the spoken word?", options: ["Libel", "Slander", "Battery", "Assault"], answer: ["Slander"], type: "single" },
    { q: "Terminating care of a patient without their consent and without transferring care to a person of equal or greater training is:", options: ["Assault", "Abandonment", "Kidnapping", "Negligence"], answer: ["Abandonment"], type: "single" },

    // Chapter 4: Communications and Documentation
    { q: "In the SBAR format for patient hand-off, what does the 'B' stand for?", options: ["Basic Info", "Body System", "Background", "Blood Pressure"], answer: ["Background"], type: "single" },
    { q: "Which of the following are components of an EMS radio system?", options: ["Base Station", "Mobile Radio", "Repeater", "Portable Radio", "Otoscope"], answer: ["Base Station", "Mobile Radio", "Repeater", "Portable Radio"], type: "multiple" },
    { q: "What type of question allows a patient to provide a detailed answer in their own words?", options: ["Closed-ended", "Leading", "Open-ended", "Binary"], answer: ["Open-ended"], type: "single" },
    { q: "When documenting a patient refusal, you should include which of the following?", options: ["Patient's mental status", "Risks of refusal explained", "Witness signatures", "A copy of their ID"], answer: ["Patient's mental status", "Risks of refusal explained", "Witness signatures"], type: "multiple" },

    // Chapter 5: Medical Terminology
    { q: "What does the prefix 'retro-' indicate?", options: ["Before", "Behind", "Below", "Against"], answer: ["Behind"], type: "single" },
    { q: "What suffix indicates the 'surgical removal' of a body part?", options: ["-itis", "-ostomy", "-ectomy", "-otomy"], answer: ["-ectomy"], type: "single" },
    { q: "The term 'Supine' describes which body position?", options: ["Lying face down", "Lying face up", "Lying on the side", "Sitting upright"], answer: ["Lying face up"], type: "single" },
    { q: "What does the prefix 'hyper-' mean?", options: ["Below normal", "Above normal", "Inside", "Between"], answer: ["Above normal"], type: "single" },
    { q: "Which planes divide the body into right and left portions?", options: ["Transverse", "Frontal", "Sagittal", "Coronal"], answer: ["Sagittal"], type: "single" },

    // Chapter 6: Lifting and Moving Patients
    { q: "Which lifting technique keeps the back upright and uses the legs to lift?", options: ["Power grip", "Power lift", "Deadlift", "Shoulder lift"], answer: ["Power lift"], type: "single" },
    { q: "When should 'Rapid Extrication' be utilized?", options: ["The patient requests it", "The scene is unsafe or patient is unstable", "To speed up the call", "When many bystanders are present"], answer: ["The scene is unsafe or patient is unstable"], type: "single" },
    { q: "Which of the following are used for moving a patient down stairs?", options: ["Stair chair", "Backboard (secured)", "Wheeled stretcher", "Scoop stretcher"], answer: ["Stair chair", "Backboard (secured)"], type: "multiple" },
    { q: "A technique where the stretcher handle is gripped with palms facing up is the:", options: ["Power grip", "Power lift", "Underhand lift", "Safety grip"], answer: ["Power grip"], type: "single" },
    { q: "A specialized stretcher designed to be split into sections to fit around a patient is a:", options: ["Flexible stretcher", "Basket stretcher", "Scoop stretcher", "Portable stretcher"], answer: ["Scoop stretcher"], type: "single" },
    { q: "What is the maximum weight typically recommended for a standard two-person lift?", options: ["150 lbs", "250 lbs", "400 lbs", "500 lbs"], answer: ["250 lbs"], type: "single" }
];

let currentIdx = 0;
let score = 0;
let mode = '';
let timerInterval;
let timeLeft = 1800; // 30 minutes in seconds

function startQuiz(selectedMode) {
    mode = selectedMode;
    document.getElementById('setup-area').style.display = 'none';
    document.getElementById('quiz-area').style.display = 'block';

    if (mode === 'exam') {
        quizData.sort(() => Math.random() - 0.5); 
        document.getElementById('timer-container').style.display = 'block';
        startTimer();
    }
    showQuestion();
}

function startTimer() {
    // Reset timer just in case
    timeLeft = 1800; 
    
    // Update display immediately
    updateTimerDisplay();

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("NREMT Pacing Alert: Time is up!");
            showResults();
        }
    }, 1000);
}

function updateTimerDisplay() {
    let mins = Math.floor(timeLeft / 60);
    let secs = timeLeft % 60;
    // This ID must match the span in index.html exactly
    const display = document.getElementById('timer-display');
    if (display) {
        display.innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
}

function showQuestion() {
    const data = quizData[currentIdx];
    document.getElementById('progress').innerText = `Question ${currentIdx + 1} of ${quizData.length}`;
    document.getElementById('question-text').innerText = data.q;
    const container = document.getElementById('options-container');
    container.innerHTML = '';
    document.getElementById('feedback').innerText = '';

    data.options.forEach(opt => {
        const div = document.createElement('div');
        div.className = "option-item";
        const input = document.createElement('input');
        input.type = data.type === 'single' ? 'radio' : 'checkbox';
        input.name = "option";
        input.value = opt;
        input.id = opt;
        
        const label = document.createElement('label');
        label.htmlFor = opt;
        label.innerText = opt;

        div.appendChild(input);
        div.appendChild(label);
        container.appendChild(div);
    });
}

function handleAction() {
    const selected = Array.from(document.querySelectorAll('input[name="option"]:checked')).map(i => i.value);
    if (selected.length === 0) return alert("Please select an answer.");

    const correct = quizData[currentIdx].answer;
    const isCorrect = selected.length === correct.length && selected.every(val => correct.includes(val));

    if (mode === 'review') {
        const fb = document.getElementById('feedback');
        fb.innerText = isCorrect ? "Correct!" : `Incorrect. Answer: ${correct.join(", ")}`;
        fb.style.color = isCorrect ? "#27ae60" : "#e74c3c";
        if (isCorrect) score++;
        
        const btn = document.getElementById('action-btn');
        btn.innerText = "Next Question";
        btn.onclick = () => {
            currentIdx++;
            if(currentIdx < quizData.length) { 
                showQuestion(); 
                btn.innerText = "Submit Answer"; 
                btn.onclick = handleAction; 
            } else { showResults(); }
        };
    } else {
        if (isCorrect) score++;
        currentIdx++;
        currentIdx < quizData.length ? showQuestion() : showResults();
    }
}

function showResults() {
    clearInterval(timerInterval);
    document.getElementById('quiz-area').style.display = 'none';
    document.getElementById('results-area').style.display = 'block';
    
    const total = quizData.length;
    const percent = Math.round((score / total) * 100);
    
    document.getElementById('score-display').innerText = `Score: ${score} / ${total}`;
    document.getElementById('percentage-display').innerText = `Percentage: ${percent}%`;
    
    const passElem = document.getElementById('pass-status');
    if (passElem) {
        passElem.innerText = percent >= 70 ? "PASSED" : "RE-STUDY RECOMMENDED";
        passElem.style.color = percent >= 70 ? "#27ae60" : "#e74c3c";
    }
}
