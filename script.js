const quizData = [
    // --- FOUNDATIONS ---
    { q: "Accidental Death and Disability (1966) is famously known as:", options: ["The Orange Book", "The White Paper", "The EMS Charter", "The NHTSA Guide"], answer: ["The White Paper"], type: "single", category: "Ch 1: EMS Systems", section: "Foundations", rationale: "This paper identified accidental death as a 'neglected disease' and spurred EMS growth." },
    { q: "Which EMS level is trained in IV therapy and limited advanced meds?", options: ["EMR", "EMT", "AEMT", "Paramedic"], answer: ["AEMT"], type: "single", category: "Ch 1: EMS Systems", section: "Foundations", rationale: "AEMTs bridge basic and advanced life support." },
    { q: "What is the primary way to prevent disease transmission?", options: ["Gloves", "Handwashing", "Gowns", "Masks"], answer: ["Handwashing"], type: "single", category: "Ch 2: Safety", section: "Foundations", rationale: "Hand hygiene is the #1 clinical defense." },
    { q: "What are the four elements of Negligence?", options: ["Duty to act", "Breach of duty", "Damages", "Proximate cause"], answer: ["Duty to act", "Breach of duty", "Damages", "Proximate cause"], type: "multiple", category: "Ch 3: Legal", section: "Foundations", rationale: "Negligence requires all 4 components: Duty, Breach, Damages, and Proximate Cause." },
    { q: "In SBAR, what does 'B' stand for?", options: ["Basic Info", "Background", "Body System", "Blood Pressure"], answer: ["Background"], type: "single", category: "Ch 4: Communications", section: "Foundations", rationale: "SBAR = Situation, Background, Assessment, Recommendation." },
    { q: "What does the prefix 'hypo-' mean?", options: ["Above", "Below", "Fast", "Slow"], answer: ["Below"], type: "single", category: "Ch 5: Terminology", section: "Foundations", rationale: "Hypo (low/below) vs Hyper (high/above)." },
    { q: "Which lifting technique uses the legs and an upright back?", options: ["Power grip", "Power lift", "Deadlift", "Shoulder lift"], answer: ["Power lift"], type: "single", category: "Ch 6: Lifting", section: "Foundations", rationale: "Legs are strongest; back must remain straight." },
    { q: "Who is responsible for the daily oversight of an EMS system?", options: ["Fire Chief", "Mayor", "Medical Director", "Shift Supervisor"], answer: ["Medical Director"], type: "single", category: "Ch 1: EMS Systems", section: "Foundations", rationale: "The Medical Director provides the legal authority and oversight for clinical care." },
    { q: "What does CQI stand for?", options: ["Clinical Quality Insurance", "Continuous Quality Improvement", "Critical Quality Indicator", "Cardiac Quality Initiative"], answer: ["Continuous Quality Improvement"], type: "single", category: "Ch 1: EMS Systems", section: "Foundations", rationale: "CQI is a circular process used to improve patient care through internal/external reviews." },
    { q: "Online medical direction is defined as:", options: ["Protocols", "Standing orders", "Real-time radio/phone consultation", "Monthly meetings"], answer: ["Real-time radio/phone consultation"], type: "single", category: "Ch 1: EMS Systems", section: "Foundations", rationale: "Online direction is immediate/real-time; Offline is via protocols/standing orders." },
    { q: "The ADA (Americans with Disabilities Act) protects which group?", options: ["Only wheelchair users", "Patients only", "Qualified workers with disabilities", "Physicians only"], answer: ["Qualified workers with disabilities"], type: "single", category: "Ch 1: EMS Systems", section: "Foundations", rationale: "The ADA ensures equal opportunity for qualified individuals with disabilities in employment." },
    { q: "Which of the following is an example of 'Public Health'?", options: ["Doing a 12-lead ECG", "Vaccination programs", "Lifting a patient", "Giving ASA"], answer: ["Vaccination programs"], type: "single", category: "Ch 1: EMS Systems", section: "Foundations", rationale: "Public health focuses on prevention across a population." },
    { q: "The highest level of EMS training is:", options: ["EMT", "AEMT", "Paramedic", "Physician"], answer: ["Paramedic"], type: "single", category: "Ch 1: EMS Systems", section: "Foundations", rationale: "Paramedic is the highest prehospital licensure level." },
    { q: "What is the goal of EMS Research?", options: ["To prove EMS is the best", "Evidence-based medicine", "To justify higher pay", "To sell equipment"], answer: ["Evidence-based medicine"], type: "single", category: "Ch 1: EMS Systems", section: "Foundations", rationale: "Research ensures treatments are based on proven clinical outcomes." },
    { q: "NREMT serves what primary purpose?", options: ["Legal advocacy", "National standard for certification", "Employment agency", "Billing"], answer: ["National standard for certification"], type: "single", category: "Ch 1: EMS Systems", section: "Foundations", rationale: "NREMT provides a national standard of competency." },
    { q: "When should an N95 or HEPA respirator be worn?", options: ["Vomiting", "Bleeding", "Suspected Tuberculosis (TB)", "Broken leg"], answer: ["Suspected Tuberculosis (TB)"], type: "single", category: "Ch 2: Safety & Wellness", section: "Foundations", rationale: "Airborne pathogens like TB require high-level filtration." },
    { q: "Which route of transmission involves a person touching a contaminated object?", options: ["Direct contact", "Indirect contact", "Airborne", "Vector-borne"], answer: ["Indirect contact"], type: "single", category: "Ch 2: Safety & Wellness", section: "Foundations", rationale: "Indirect contact uses a 'fomite' (contaminated object) to move the pathogen." },
    { q: "What is the first priority at every emergency scene?", options: ["Patient care", "Documentation", "Personal safety", "Family support"], answer: ["Personal safety"], type: "single", category: "Ch 2: Safety & Wellness", section: "Foundations", rationale: "You cannot help the patient if you become a victim yourself." },
    { q: "Which of these is a 'Vector' for disease?", options: ["Stethoscope", "Mosquito", "Air", "Water"], answer: ["Mosquito"], type: "single" , category: "Ch 2: Safety & Wellness", section: "Foundations", rationale: "A vector is a living organism that transmits disease." },
    { q: "The process of killing most, but not all, microorganisms is:", options: ["Cleaning", "Disinfecting", "Sterilizing", "Wiping"], answer: ["Disinfecting"], type: "single", category: "Ch 2: Safety & Wellness", section: "Foundations", rationale: "Disinfection kills many pathogens; sterilization kills all forms of life." },

    // --- PATHOPHYSIOLOGY ---
    { q: "What is the primary product of anaerobic metabolism?", options: ["Lactic Acid", "ATP", "Glucose", "Oxygen"], answer: ["Lactic Acid"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "Without oxygen, cells produce lactic acid and very little energy." },
    
    { q: "Shock caused by widespread vasodilation is categorized as:", options: ["Hypovolemic", "Distributive", "Cardiogenic", "Obstructive"], answer: ["Distributive"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "Anaphylaxis and Sepsis are types of distributive shock." },
    { q: "A pulmonary embolism causes which type of shock?", options: ["Hypovolemic", "Distributive", "Cardiogenic", "Obstructive"], answer: ["Obstructive"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "A physical block to flow (embolism, tension pneumo) is obstructive." },
    { q: "What happens to the Sodium-Potassium pump during severe shock?", options: ["Speeds up", "Fails due to lack of ATP", "Switches to calcium", "Remains normal"], answer: ["Fails due to lack of ATP"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "Without ATP (energy), cellular pumps fail, leading to cell death." },
    { q: "Which are signs of COMPENSATED shock?", options: ["Thirst", "Narrowing pulse pressure", "Tachycardia", "Hypotension"], answer: ["Thirst", "Narrowing pulse pressure", "Tachycardia"], type: "multiple", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "Hypotension is the key sign of DECOMPENSATED shock." },
    { q: "The Fick Principle describes components necessary for:", options: ["Lifting", "Oxygen reaching cells", "Legal duty", "Radio use"], answer: ["Oxygen reaching cells"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "Fick Principle: O2 in air, working pump, enough RBCs." },
    { q: "Which receptor causes vasoconstriction during the stress response?", options: ["Alpha-1", "Beta-1", "Beta-2", "Muscarinic"], answer: ["Alpha-1"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "Alpha-1 constriction pushes blood to the core." },
    { q: "Stroke Volume is defined as:", options: ["HR x BP", "Blood ejected per contraction", "Total body volume", "Flow speed"], answer: ["Blood ejected per contraction"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "Cardiac Output = Stroke Volume x Heart Rate." },
    { q: "In an adult, Decompensated Shock is often indicated by a systolic BP below:", options: ["120 mmHg", "100 mmHg", "90 mmHg", "60 mmHg"], answer: ["90 mmHg"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "90 mmHg is the classic threshold for decompensation." },
    { q: "A patient with severe renal failure is most at risk for which of the following? (Select all that apply)", options: ["Hyperkalemia", "Hypermagnesemia", "Hypercalcemia", "Hyperphosphatemia"], answer: ["Hyperkalemia", "Hypermagnesemia", "Hyperphosphatemia"], type: "multiple", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "Renal failure leads to decreased excretion of potassium, magnesium, and phosphate." },
    { q: "Metaplasia is defined as:", options: ["Decrease in cell size", "Increase in cell number", "Reversible replacement of one cell type with another", "Alteration in size and shape"], answer: ["Reversible replacement of one cell type with another"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "Metaplasia is the reversible adaptation where one adult cell type is replaced by another." },

   // --- MEDICAL ---
    { q: "When evaluating the Nature of Illness (NOI), what is the AEMT's primary goal during size-up?", options: ["Determine exact diagnosis", "Identify life-threats and determine medical vs trauma", "Complete full head-to-toe", "Administer medications"], answer: ["Identify life-threats and determine medical vs trauma"], type: "single", category: "Ch 16: Overview", section: "Medical", rationale: "The NOI helps focus the assessment on the general category and threats." },
    { q: "Which findings are associated with the 'Alarm' stage of the GAS? (Select all that apply)", options: ["Release of catecholamines", "Decreased HR", "Increased blood glucose", "Exhaustion"], answer: ["Release of catecholamines", "Increased blood glucose"], type: "multiple", category: "Ch 7: Patho", section: "Medical", rationale: "The alarm stage involves the fight-or-flight response, increasing HR and glucose." },
    { q: "How does CPAP improve oxygenation in pulmonary edema?", options: ["Increasing HR", "Forcing fluid out of alveoli and into capillaries", "Improves blood pressure", "Causing vasodilation"], answer: ["Forcing fluid out of alveoli and into capillaries"], type: "single", category: "Ch 17: Respiratory", section: "Medical", rationale: "CPAP uses pressure to push fluid from the air sacs back into the bloodstream." },
    
    { q: "A 60-year-old male with emphysema likely presents with:", options: ["Barrel chest", "Extreme thinness", "Pursed-lip breathing", "Chronic productive cough"], answer: ["Barrel chest", "Extreme thinness", "Pursed-lip breathing"], type: "multiple", category: "Ch 17: Respiratory", section: "Medical", rationale: "Emphysema (pink puffers) involves air trapping (barrel chest) and high energy use (thinness)." },
    { q: "Classic risk factors for Pulmonary Embolism include: (Select all that apply)", options: ["Recent surgery", "Oral contraceptives", "Long-distance travel", "Immobilization"], answer: ["Recent surgery", "Oral contraceptives", "Long-distance travel", "Immobilization"], type: "multiple", category: "Ch 17: Respiratory", section: "Medical", rationale: "These factors represent elements of Virchow's Triad (stasis and hypercoagulability)." },
    
    { q: "What is the primary goal of Aspirin in suspected ACS?", options: ["Pain relief", "Dissolve the thrombus", "Prevent further platelet aggregation", "Lower BP"], answer: ["Prevent further platelet aggregation"], type: "single", category: "Ch 18: Cardiovascular", section: "Medical", rationale: "Aspirin makes platelets 'slippery' so they don't grow the existing clot." },
    { q: "Hallmark signs of right-sided heart failure include:", options: ["JVD", "Peripheral edema", "Pulmonary edema", "Enlarged liver"], answer: ["JVD", "Peripheral edema", "Enlarged liver"], type: "multiple", category: "Ch 18: Cardiovascular", section: "Medical", rationale: "Right-sided failure causes backup into the body (systemic), whereas left-sided backs up into the lungs." },
    
    { q: "Which conduction structure is the 'gatekeeper' of the heart?", options: ["SA Node", "AV Node", "Bundle of His", "Purkinje Fibers"], answer: ["AV Node"], type: "single", category: "Ch 18: Cardiovascular", section: "Medical", rationale: "The AV node delays the impulse to allow for ventricular filling." },
    { q: "Symptoms of TIA must resolve within:", options: ["1 hour", "12 hours", "24 hours", "48 hours"], answer: ["24 hours"], type: "single", category: "Ch 19: Neurologic", section: "Medical", rationale: "By definition, TIA symptoms are temporary and must resolve within one day." },
    { q: "Referred pain to the right shoulder is characteristic of:", options: ["Appendicitis", "Cholecystitis", "Pancreatitis", "Diverticulitis"], answer: ["Cholecystitis"], type: "single", category: "Ch 20: GI/GU", section: "Medical", rationale: "Gallbladder inflammation can irritate the phrenic nerve, causing shoulder pain." },
    { q: "Kussmaul respirations are unique to which condition?", options: ["HHNS", "DKA", "Hypoglycemia", "Stroke"], answer: ["DKA"], type: "single", category: "Ch 21: Endocrine", section: "Medical", rationale: "Kussmaul breathing is the body's attempt to compensate for metabolic acidosis." },
    { q: "Define the 'Opioid Triad':", options: ["Pinpoint pupils", "Respiratory depression", "Tachycardia", "Altered mental status"], answer: ["Pinpoint pupils", "Respiratory depression", "Altered mental status"], type: "multiple", category: "Ch 23: Toxicology", section: "Medical", rationale: "The three signs of opioid overdose are pinpoint pupils (miosis), slow/shallow breathing, and unconsciousness." },
    { q: "A 9 year old presents with lethargy, polyuria, and tachypnea. pt's mother states the patient has been more sleepy over the past 2 days. Which of the following is the MOST probable cause?", options: ["High blood glucose", "Low blood glucose", "Influenza", "Stroke"], answer: ["High blood glucose"], type: "single", category: "Ch 21: Endocrine", section: "Medical", rationale: "DKA most often occurs in IDDM (Type 1) and presents with high glucose, lethargy, tachypnea, and polyuria. Polyuria is a definitive sign of high glucose levels." },
    { q: "A 54 year old is found lethargic with rapid, deep respirations, and high glucose. How should you manage this patient?", options: ["Ventilate with PPV using a BVM to slow the respirations", "Open and secure the airway", "Hyperventilate the patient with a BVM", "Check the patient's pupils"], answer: ["Open and secure the airway"], type: "single", category: "Ch 21: Endocrine", section: "Medical", rationale: "In an unresponsive patient, your primary priority is always the Airway. Secure the airway first before moving to other interventions." },
    { q: "Mittelschmerz refers to:", options: ["Endometriosis", "Ovulation pain", "Amenorrhea", "PID"], answer: ["Ovulation pain"], type: "single", category: "Ch 25: Gynecologic", section: "Medical", rationale: "Mittelschmerz is the sharp, localized pain felt during the middle of the menstrual cycle (ovulation)." }
];
// --- QUIZ LOGIC ---
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
    const filtered = topic === "All" ? quizData : quizData.filter(i => i.section === topic);
    const availableCount = filtered.length;
    
    slider.max = availableCount;
    if (parseInt(slider.value) > availableCount || parseInt(slider.value) === 0) {
        slider.value = availableCount > 10 ? 10 : availableCount;
    }
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

    document.getElementById('setup-area').style.display = 'none';
    document.getElementById('quiz-area').style.display = 'block';

    const history = JSON.parse(localStorage.getItem('eric_field_notes_history') || "{}");
    let sortedBank = filteredBank.sort((a, b) => {
        const failA = history[a.q] ? history[a.q].fail : 0;
        const failB = history[b.q] ? history[b.q].fail : 0;
        return failB - failA;
    });

    sessionQuestions = sortedBank.slice(0, numToPull);
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

window.onload = adjustSliderRange;
