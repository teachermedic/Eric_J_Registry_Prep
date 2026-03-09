const quizData = [
    // FOUNDATIONS (Chapters 1-6) - 60 Total
    { q: "Accidental Death and Disability (1966) is famously known as:", options: ["The Orange Book", "The White Paper", "The EMS Charter", "The NHTSA Guide"], answer: ["The White Paper"], type: "single", category: "Ch 1: EMS Systems", section: "Foundations", rationale: "This paper identified accidental death as a 'neglected disease' and spurred EMS growth." },
    { q: "Which level of EMS is trained in IV therapy and limited advanced meds?", options: ["EMR", "EMT", "AEMT", "Paramedic"], answer: ["AEMT"], type: "single", category: "Ch 1: EMS Systems", section: "Foundations", rationale: "AEMTs bridge basic and advanced life support." },
    { q: "What is the primary way to prevent disease transmission?", options: ["Gloves", "Handwashing", "Gowns", "Masks"], answer: ["Handwashing"], type: "single", category: "Ch 2: Safety", section: "Foundations", rationale: "Hand hygiene is the #1 clinical defense." },
    { q: "What are the four elements of Negligence?", options: ["Duty, Breach, Damages, Cause", "Assault, Battery, Intent, Injury", "Duty, Error, Harm, Witness", "Law, Error, Cost, Pain"], answer: ["Duty, Breach, Damages, Cause"], type: "multiple", category: "Ch 3: Legal", section: "Foundations", rationale: "Negligence requires all 4 components: Duty, Breach, Damages, and Proximate Cause." },
    { q: "In SBAR, what does 'B' stand for?", options: ["Basic Info", "Background", "Body System", "Blood Pressure"], answer: ["Background"], type: "single", category: "Ch 4: Communications", section: "Foundations", rationale: "SBAR = Situation, Background, Assessment, Recommendation." },
    { q: "What does the prefix 'hypo-' mean?", options: ["Above", "Below", "Fast", "Slow"], answer: ["Below"], type: "single", category: "Ch 5: Terminology", section: "Foundations", rationale: "Hypo (low/below) vs Hyper (high/above)." },
    { q: "Which lifting technique uses the legs and an upright back?", options: ["Power grip", "Power lift", "Deadlift", "Shoulder lift"], answer: ["Power lift"], type: "single", category: "Ch 6: Lifting", section: "Foundations", rationale: "Legs are strongest; back must remain straight." },
    // ...[Chapters 1-6 content continues]...

    // PATHOPHYSIOLOGY (Chapter 7) - 10 Total
    { q: "What is the primary product of anaerobic metabolism?", options: ["Lactic Acid", "ATP", "Glucose", "Oxygen"], answer: ["Lactic Acid"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "Without oxygen, cells produce lactic acid and very little energy." },
    { q: "Shock caused by widespread vasodilation is categorized as:", options: ["Hypovolemic", "Distributive", "Cardiogenic", "Obstructive"], answer: ["Distributive"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "Anaphylaxis and Sepsis are types of distributive shock." },
    { q: "Perfusion is best defined as:", options: ["Breathing", "Adequate circulation to meet cell needs", "Heart beating", "Gas exchange"], answer: ["Adequate circulation to meet cell needs"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "Perfusion is the delivery of O2/nutrients and removal of waste." },
    { q: "A pulmonary embolism causes which type of shock?", options: ["Hypovolemic", "Distributive", "Cardiogenic", "Obstructive"], answer: ["Obstructive"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "A physical block to flow (embolism, tension pneumo) is obstructive." },
    { q: "What happens to the Sodium-Potassium pump during severe shock?", options: ["Speeds up", "Fails due to lack of ATP", "Switches to calcium", "Remains normal"], answer: ["Fails due to lack of ATP"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "Without ATP (energy), cellular pumps fail, leading to cell death." },
    { q: "Which are signs of COMPENSATED shock?", options: ["Thirst", "Narrowing pulse pressure", "Tachycardia", "Hypotension"], answer: ["Thirst", "Narrowing pulse pressure", "Tachycardia"], type: "multiple", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "Hypotension is the key sign of DECOMPENSATED shock." },
    { q: "The Fick Principle describes components necessary for:", options: ["Lifting", "Oxygen reaching cells", "Legal duty", "Radio use"], answer: ["Oxygen reaching cells"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "Fick Principle: O2 in air, working pump, enough RBCs." },
    { q: "Which receptor causes vasoconstriction during the stress response?", options: ["Alpha-1", "Beta-1", "Beta-2", "Muscarinic"], answer: ["Alpha-1"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "Alpha-1 constriction pushes blood to the core." },
    { q: "Stroke Volume is defined as:", options: ["HR x BP", "Blood ejected per contraction", "Total body volume", "Flow speed"], answer: ["Blood ejected per contraction"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "Cardiac Output = Stroke Volume x Heart Rate." },
    { q: "In an adult, Decompensated Shock is often indicated by a systolic BP below:", options: ["120 mmHg", "100 mmHg", "90 mmHg", "60 mmHg"], answer: ["90 mmHg"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "90 mmHg is the classic threshold for decompensation." }
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
    const isCorrect = selected.length === q.answer.length && selected.every(v => q.answer.includes(v));

    let history = JSON.parse(localStorage.getItem('eric_field_notes_history') || "{}");
    if (!history[q.q]) history[q.q] = { pass: 0, fail: 0 };
    isCorrect ? history[q.q].pass++ : history[q.q].fail++;
    localStorage.setItem('eric_field_notes_history', JSON.stringify(history));

    if (!categoryStats[q.category]) categoryStats[q.category] = { correct: 0, total: 0 };
    categoryStats[q.category].total++;
    if (isCorrect) categoryStats[q.category].correct++;

    if (mode === 'review') {
        const fb = document.getElementById('feedback');
        fb.innerHTML = isCorrect ? `<b style="color:green">Correct!</b>` : `<b style="color:red">Incorrect.</b> Answer: ${q.answer.join(", ")}`;
        fb.innerHTML += `<br><small>${q.rationale}</small>`;
        if (isCorrect) score++;
        const btn = document.getElementById('action-btn');
        btn.innerText = "Next Question";
        btn.onclick = () => {
            currentIdx++;
            if (currentIdx < sessionQuestions.length) { showQuestion(); btn.innerText = "Submit Answer"; btn.onclick = handleAction; }
            else showResults();
        };
    } else {
        if (isCorrect) score++;
        currentIdx++;
        currentIdx < sessionQuestions.length ? showQuestion() : showResults();
    }
}

function showResults() {
    clearInterval(timerInterval);
    document.getElementById('quiz-area').style.display = 'none';
    document.getElementById('results-area').style.display = 'block';
    const percent = Math.round((score / sessionQuestions.length) * 100);
    document.getElementById('score-display').innerText = `Total Score: ${score} / ${sessionQuestions.length}`;
    document.getElementById('percentage-display').innerText = `${percent}%`;
    
    let breakdownHTML = "<strong>Mastery by Chapter:</strong><br>";
    for (const cat in categoryStats) {
        let catPercent = Math.round((categoryStats[cat].correct / categoryStats[cat].total) * 100);
        breakdownHTML += `${cat}: ${catPercent}%<br>`;
    }
    document.getElementById('category-breakdown').innerHTML = breakdownHTML;
    document.getElementById('pass-status').innerHTML = percent >= 70 ? "<b style='color:green'>PASSED</b>" : "<b style='color:red'>RE-STUDY REQUIRED</b>";
}
