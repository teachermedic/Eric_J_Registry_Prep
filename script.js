const quizData = [
    // --- FOUNDATIONS (60 Items abbreviated for example, ensure yours are full) ---
    { q: "Accidental Death and Disability (1966) is famously known as:", options: ["The Orange Book", "The White Paper", "The EMS Charter", "The NHTSA Guide"], answer: ["The White Paper"], type: "single", category: "Ch 1: EMS Systems", section: "Foundations", rationale: "This paper identified accidental death as a 'neglected disease' and spurred EMS growth." },
    // ... [Insert all other Foundations items here]

    // --- PATHOPHYSIOLOGY & ELECTROLYTES ---
    { q: "A 72-year-old patient with chronic hypertension presents with left ventricular enlargement. Which cellular adaptation is most likely occurring?", options: ["Atrophy", "Hypertrophy", "Hyperplasia", "Metaplasia"], answer: ["Hypertrophy"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "Hypertrophy is an increase in the size of cells due to synthesis of more subcellular components." },
    { q: "A patient with severe renal failure is most at risk for which of the following? (Select all that apply)", options: ["Hyperkalemia", "Hypermagnesemia", "Hypercalcemia", "Hyperphosphatemia"], answer: ["Hyperkalemia", "Hypermagnesemia", "Hyperphosphatemia"], type: "multiple", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "Renal failure leads to decreased excretion of potassium, magnesium, and phosphate." },
    { q: "What is the primary intracellular cation responsible for maintaining intracellular osmolarity?", options: ["Sodium", "Potassium", "Calcium", "Magnesium"], answer: ["Potassium"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "Potassium (K+) is the major intracellular cation." },
    { q: "During anaerobic metabolism, what is the primary byproduct that leads to metabolic acidosis?", options: ["Carbon dioxide", "Lactic acid", "Bicarbonate", "Ketones"], answer: ["Lactic acid"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "Inadequate perfusion forces cells into anaerobic metabolism, causing lactic acid production." },
    { q: "A patient with a pH of 7.25 and a PCO2 of 55 mmHg is in which state?", options: ["Respiratory alkalosis", "Metabolic acidosis", "Respiratory acidosis", "Metabolic alkalosis"], answer: ["Respiratory acidosis"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "pH < 7.35 is acidosis; PCO2 > 45 indicates respiratory origin." },

    // --- MEDICAL EMERGENCIES (Integrated Items) ---
    { q: "A 68-year-old male with COPD presents with acute dyspnea and cyanosis. Which finding suggests hypoxic drive?", options: ["Elevated CO2", "Low SpO2 despite O2", "Respiration stimulated by low O2 rather than high CO2", "Sudden pulmonary edema"], answer: ["Respiration stimulated by low O2 rather than high CO2"], type: "single", category: "Ch 17: Respiratory", section: "Medical", rationale: "Hypoxic drive uses low O2 levels to stimulate breathing when CO2 sensitivity is lost." },
    { q: "Which signs indicate severe respiratory distress? (Select all that apply)", options: ["Tripod position", "Two-word dyspnea", "SpO2 of 96%", "Use of accessory muscles"], answer: ["Tripod position", "Two-word dyspnea", "Use of accessory muscles"], type: "multiple", category: "Ch 17: Respiratory", section: "Medical", rationale: "Severe distress is shown through position, speech limit, and muscle use." },
    { q: "What is the primary goal of aspirin in suspected ACS?", options: ["Pain relief", "Prevent platelet aggregation", "Dissolve existing thrombus", "Decrease heart rate"], answer: ["Prevent platelet aggregation"], type: "single", category: "Ch 18: Cardiovascular", section: "Medical", rationale: "Aspirin prevents further clotting by stopping platelets from clumping." },
    { q: "Sharp, tearing chest pain radiating to the back with unequal BPs in arms is likely:", options: ["MI", "Aortic Dissection", "CHF", "Pneumothorax"], answer: ["Aortic Dissection"], type: "single", category: "Ch 18: Cardiovascular", section: "Medical", rationale: "Aortic dissection is characterized by 'tearing' pain and pressure discrepancies." },
    { q: "A patient with Type 1 diabetes is found unresponsive with fruity breath. This pattern is:", options: ["Cheyne-Stokes", "Kussmaul", "Biot's", "Agonal"], answer: ["Kussmaul"], type: "single", category: "Ch 21: Endocrine", section: "Medical", rationale: "Kussmaul respirations attempt to blow off CO2 in DKA." },
    { q: "Signs of opioid overdose include: (Select all that apply)", options: ["Pinpoint pupils", "Respiratory depression", "Tachycardia", "Altered mental status"], answer: ["Pinpoint pupils", "Respiratory depression", "Altered mental status"], type: "multiple", category: "Ch 23: Toxicology", section: "Medical", rationale: "The opioid triad is CNS/Resp depression and pinpoint pupils." },
    { q: "The postictal state is best described as:", options: ["Return to baseline", "Airway narrowing", "Altered mental status with gradual improvement", "Muscle rigidity"], answer: ["Altered mental status with gradual improvement"], type: "single", category: "Ch 19: Neurologic", section: "Medical", rationale: "Postictal is the recovery period following a seizure." }
];

let sessionQuestions = [];
let currentIdx = 0;
let score = 0;
let mode = '';
let timerInterval;
let timeLeft = 0;
let categoryStats = {};

function adjustSliderRange() {
    const topic = document.getElementById('topic-select').value;
    const slider = document.getElementById('question-slider');
    const availableCount = topic === "All" ? quizData.length : quizData.filter(i => i.section === topic).length;
    slider.max = availableCount;
    if (parseInt(slider.value) > availableCount) slider.value = availableCount;
    updateSliderLabel(slider.value);
}

function updateSliderLabel(val) {
    document.getElementById('question-count-label').innerText = val;
    document.getElementById('time-estimate-label').innerText = val * 2;
}

function startQuiz(selectedMode) {
    mode = selectedMode;
    const selectedTopic = document.getElementById('topic-select').value;
    const numToPull = parseInt(document.getElementById('question-slider').value);
    let filteredBank = selectedTopic === "All" ? [...quizData] : quizData.filter(i => i.section === selectedTopic);
    const finalPull = Math.min(numToPull, filteredBank.length);

    document.getElementById('setup-area').style.display = 'none';
    document.getElementById('quiz-area').style.display = 'block';

    const history = JSON.parse(localStorage.getItem('eric_field_notes_history') || "{}");
    let sortedBank = filteredBank.sort((a, b) => {
        const failA = history[a.q] ? history[a.q].fail : 0;
        const failB = history[b.q] ? history[b.q].fail : 0;
        return failB - failA;
    });

    sessionQuestions = sortedBank.slice(0, finalPull);
    if (mode === 'exam') {
        sessionQuestions.sort(() => Math.random() - 0.5);
        timeLeft = sessionQuestions.length * 2 * 60; 
        document.getElementById('timer-container').style.display = 'block';
        startTimer();
    }
    showQuestion();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        let mins = Math.floor(timeLeft / 60);
        let secs = timeLeft % 60;
        document.getElementById('timer-display').innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        if (timeLeft <= 0) { clearInterval(timerInterval); showResults(); }
    }, 1000);
}

function showQuestion() {
    const data = sessionQuestions[currentIdx];
    document.getElementById('progress').innerText = `Question ${currentIdx + 1} of ${sessionQuestions.length} | ${data.category}`;
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
        div.onclick = () => input.click();
        container.appendChild(div);
    });
}

function handleAction() {
    const selected = Array.from(document.querySelectorAll('input[name="option"]:checked')).map(i => i.value);
    if (selected.length === 0) return alert("Select an answer.");
    const q = sessionQuestions[currentIdx];
    const isCorrect = (data_type) => {
        if (q.type === 'single') return selected[0] === q.answer[0];
        return selected.length === q.answer.length && selected.every(v => q.answer.includes(v));
    };
    
    const correctCheck = isCorrect();
    let history = JSON.parse(localStorage.getItem('eric_field_notes_history') || "{}");
    if (!history[q.q]) history[q.q] = { pass: 0, fail: 0 };
    correctCheck ? history[q.q].pass++ : history[q.q].fail++;
    localStorage.setItem('eric_field_notes_history', JSON.stringify(history));

    if (!categoryStats[q.category]) categoryStats[q.category] = { correct: 0, total: 0 };
    categoryStats[q.category].total++;
    if (correctCheck) categoryStats[q.category].correct++;

    if (mode === 'review') {
        const fb = document.getElementById('feedback');
        fb.innerHTML = correctCheck ? `<b style="color:green">Correct!</b>` : `<b style="color:red">Incorrect.</b> Answer: ${q.answer.join(", ")}`;
        fb.innerHTML += `<br><small>${q.rationale}</small>`;
        if (correctCheck) score++;
        const btn = document.getElementById('action-btn');
        btn.innerText = "Next Question";
        btn.onclick = () => {
            currentIdx++;
            if (currentIdx < sessionQuestions.length) { showQuestion(); btn.innerText = "Submit Answer"; btn.onclick = handleAction; }
            else showResults();
        };
    } else {
        if (correctCheck) score++;
        currentIdx++;
        currentIdx < sessionQuestions.length ? showQuestion() : showResults();
    }
}

function showResults() {
    clearInterval(timerInterval);
    document.getElementById('quiz-area').style.display = 'none';
    document.getElementById('results-area').style.display = 'block';
    const percent = Math.round((score / sessionQuestions.length) * 100);
    document.getElementById('score-display').innerText = `Score: ${score} / ${sessionQuestions.length}`;
    document.getElementById('percentage-display').innerText = `${percent}%`;
    let breakdownHTML = "<strong>Mastery by Chapter:</strong><br>";
    for (const cat in categoryStats) {
        let catPercent = Math.round((categoryStats[cat].correct / categoryStats[cat].total) * 100);
        breakdownHTML += `${cat}: ${catPercent}%<br>`;
    }
    document.getElementById('category-breakdown').innerHTML = breakdownHTML;
    document.getElementById('pass-status').innerHTML = percent >= 70 ? "<b style='color:green'>PASSED</b>" : "<b style='color:red'>RE-STUDY REQUIRED</b>";
}
