const quizData = [
    // --- FOUNDATIONS (CH 1-6) ---
    { q: "Accidental Death and Disability (1966) is famously known as:", options: ["The Orange Book", "The White Paper", "The EMS Charter", "The NHTSA Guide"], answer: ["The White Paper"], type: "single", category: "Ch 1: EMS Systems", section: "Foundations", rationale: "This paper identified accidental death as a 'neglected disease' and spurred EMS growth." },
    { q: "Which EMS level is trained in IV therapy and limited advanced meds?", options: ["EMR", "EMT", "AEMT", "Paramedic"], answer: ["AEMT"], type: "single", category: "Ch 1: EMS Systems", section: "Foundations", rationale: "AEMTs bridge basic and advanced life support." },
    { q: "What is the primary way to prevent disease transmission?", options: ["Gloves", "Handwashing", "Gowns", "Masks"], answer: ["Handwashing"], type: "single", category: "Ch 2: Safety", section: "Foundations", rationale: "Hand hygiene is the #1 clinical defense." },
    { q: "What are the four elements of Negligence?", options: ["Duty to act", "Breach of duty", "Damages", "Proximate cause"], answer: ["Duty to act", "Breach of duty", "Damages", "Proximate cause"], type: "multiple", category: "Ch 3: Legal", section: "Foundations", rationale: "Negligence requires all 4 components: Duty, Breach, Damages, and Proximate Cause." },
    { q: "In SBAR, what does 'B' stand for?", options: ["Basic Info", "Background", "Body System", "Blood Pressure"], answer: ["Background"], type: "single", category: "Ch 4: Communications", section: "Foundations", rationale: "SBAR = Situation, Background, Assessment, Recommendation." },
    { q: "What does the prefix 'hypo-' mean?", options: ["Above", "Below", "Fast", "Slow"], answer: ["Below"], type: "single", category: "Ch 5: Terminology", section: "Foundations", rationale: "Hypo (low/below) vs Hyper (high/above)." },
    { q: "Which lifting technique uses the legs and an upright back?", options: ["Power grip", "Power lift", "Deadlift", "Shoulder lift"], answer: ["Power lift"], type: "single", category: "Ch 6: Lifting", section: "Foundations", rationale: "Legs are strongest; back must remain straight." },
    { q: "Which document establishes the 'Scope of Practice' for an AEMT within a specific state?", options: ["NHTSA Curriculum", "The State EMS Office / Medical Practice Act", "NREMT Handbook", "Federal DOT"], answer: ["The State EMS Office / Medical Practice Act"], type: "single", category: "Ch 1: EMS Systems", section: "Foundations", rationale: "State legislation defines the actual legal scope of practice." },
    { q: "A patient refuses care but is altered with a life-threat. Treat under:", options: ["Expressed Consent", "Informed Consent", "Implied Consent", "Involuntary Consent"], answer: ["Implied Consent"], type: "single", category: "Ch 3: Legal", section: "Foundations", rationale: "Implied consent is used when a patient cannot legally consent but needs life-saving care." },
    { q: "What is the difference between Libel and Slander?", options: ["Libel is spoken; Slander is written", "Libel is written; Slander is spoken", "Physical vs Verbal", "No difference"], answer: ["Libel is written; Slander is spoken"], type: "single", category: "Ch 3: Legal", section: "Foundations", rationale: "Libel = Written defamation; Slander = Spoken defamation." },

    // --- PATHOPHYSIOLOGY (CH 7) ---
    { q: "What is the primary product of anaerobic metabolism?", options: ["Lactic Acid", "ATP", "Glucose", "Oxygen"], answer: ["Lactic Acid"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "Without oxygen, cells produce lactic acid and very little energy." },
    { q: "Shock caused by widespread vasodilation is categorized as:", options: ["Hypovolemic", "Distributive", "Cardiogenic", "Obstructive"], answer: ["Distributive"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "Anaphylaxis and Sepsis are types of distributive shock." },
    { q: "A pulmonary embolism causes which type of shock?", options: ["Hypovolemic", "Distributive", "Cardiogenic", "Obstructive"], answer: ["Obstructive"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "A physical block to flow is obstructive shock." },
    { q: "A patient hypoventilating from an opioid OD is likely in:", options: ["Respiratory Alkalosis", "Respiratory Acidosis", "Metabolic Alkalosis", "Metabolic Acidosis"], answer: ["Respiratory Acidosis"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "CO2 retention leads to a drop in pH, causing respiratory acidosis." },
    { q: "Kussmaul respirations in DKA are an attempt to compensate for:", options: ["Metabolic Acidosis", "Metabolic Alkalosis", "Respiratory Acidosis", "Hypoxemia"], answer: ["Metabolic Acidosis"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "Rapid breathing 'blows off' CO2 (acid) to raise blood pH." },
    { q: "What is the normal pH range of human arterial blood?", options: ["7.0 - 7.1", "7.35 - 7.45", "7.45 - 7.55", "6.8 - 7.8"], answer: ["7.35 - 7.45"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "This narrow window is essential for cellular enzyme function." },
    { q: "A hyperventilating patient with an EtCO2 of 22 is in:", options: ["Respiratory Alkalosis", "Respiratory Acidosis", "Metabolic Acidosis", "Normal state"], answer: ["Respiratory Alkalosis"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "Excessive loss of CO2 removes acid, raising the pH." },

    // --- MEDICAL (CH 16-25) ---
    { q: "A patient has stroke symptoms that resolve in 45 minutes. This was a:", options: ["Ischemic Stroke", "Hemorrhagic Stroke", "TIA", "Hypoglycemia"], answer: ["TIA"], type: "single", category: "Ch 19: Neurologic", section: "Medical", rationale: "Transient Ischemic Attacks resolve completely within 24 hours." },
    { q: "Cushing's Syndrome is characterized by:", options: ["Moon-face and buffalo hump", "Extreme weight loss", "Low blood glucose", "Hypotension"], answer: ["Moon-face and buffalo hump"], type: "single", category: "Ch 21: Endocrine", section: "Medical", rationale: "Caused by hyperadrenalism (excess cortisol)." },
    { q: "A patient with 'tearing' back pain and unequal BPs in arms likely has:", options: ["Heart Attack", "Aortic Dissection", "Kidney Stones", "Gallstones"], answer: ["Aortic Dissection"], type: "single", category: "Ch 18: Cardiovascular", section: "Medical", rationale: "Unequal BP and tearing pain are classic for dissection." },
    { q: "First line AEMT med for active anaphylaxis?", options: ["Benadryl IV", "Albuterol Neb", "Epi 1:1,000 IM", "Solu-Medrol"], answer: ["Epi 1:1,000 IM"], type: "single", category: "Ch 22: Immunology", section: "Medical", rationale: "Epinephrine is the only immediate life-saving reversal agent." },
    { q: "Kussmaul respirations are unique to which condition?", options: ["HHNS", "DKA", "Hypoglycemia", "Stroke"], answer: ["DKA"], type: "single", category: "Ch 21: Endocrine", section: "Medical", rationale: "Indicates the body is trying to blow off acid to compensate for ketones." },

    // --- TRAUMA (CH 26-34) ---
    { q: "Beck's Triad (JVD, muffled heart sounds, low BP) indicates:", options: ["Tension Pneumo", "Cardiac Tamponade", "Hemothorax", "Flail Chest"], answer: ["Cardiac Tamponade"], type: "single", category: "Ch 31: Chest", section: "Trauma", rationale: "Fluid in the pericardial sac restricts heart movement." },
    { q: "Kehr's Sign (left shoulder pain) indicates injury to the:", options: ["Liver", "Spleen", "Appendix", "Bladder"], answer: ["Spleen"], type: "single", category: "Ch 32: Abdomen", section: "Trauma", rationale: "Referred pain from diaphragmatic irritation due to splenic blood." },
    { q: "The 6 Ps of musculoskeletal assessment help identify:", options: ["Shock", "Compartment Syndrome", "Infection", "Concussion"], answer: ["Compartment Syndrome"], type: "multiple", category: "Ch 33: Ortho", section: "Trauma", rationale: "Assesses neurovascular compromise." },
    { q: "A cold-water drowning patient is not dead until they are:", options: ["Warm and dead", "No pulse for 10 mins", "Core temp is 90F", "Pupils fixed"], answer: ["Warm and dead"], type: "single", category: "Ch 34: Environmental", section: "Trauma", rationale: "Hypothermia protects the brain; warm them before calling it." }
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
    const topicSelect = document.getElementById('topic-select');
    const slider = document.getElementById('question-slider');
    if (!topicSelect || !slider) return;

    const topic = topicSelect.value;
    const filtered = topic === "All" ? quizData : quizData.filter(i => i.section === topic);
    const availableCount = filtered.length;
    
    slider.max = availableCount;
    // Fix: If slider is at 0 or higher than available, reset to 10 or max
    if (parseInt(slider.value) > availableCount || parseInt(slider.value) === 0) {
        slider.value = availableCount > 10 ? 10 : availableCount;
    }
    updateSliderLabel(slider.value);
}

function updateSliderLabel(val) {
    const label = document.getElementById('question-count-label');
    const timeLabel = document.getElementById('time-estimate-label');
    if (label) label.innerText = val;
    if (timeLabel) timeLabel.innerText = val * 2;
}

function startQuiz(selectedMode) {
    mode = selectedMode;
    const topic = document.getElementById('topic-select').value;
    const numToPull = parseInt(document.getElementById('question-slider').value);
    let filteredBank = topic === "All" ? [...quizData] : quizData.filter(i => i.section === topic);

    document.getElementById('setup-area').style.display = 'none';
    document.getElementById('quiz-area').style.display = 'block';

    sessionQuestions = filteredBank.sort(() => Math.random() - 0.5).slice(0, numToPull);

    if (mode === 'exam') {
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
    document.getElementById('progress').innerText = `Question ${
