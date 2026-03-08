const quizData = [
    // CHAPTER 1 (10 QUESTIONS)
    { q: "Accidental Death and Disability: The Neglected Disease of Modern Society is commonly known as what?", options: ["The Orange Book", "The White Paper", "The EMS Blueprint", "The NHTSA Guide"], answer: ["The White Paper"], type: "single", category: "Ch 1: EMS Systems", rationale: "Released in 1966, the White Paper identified the critical need for improved prehospital care." },
    { q: "Which EMS level is primarily trained in advanced life support (ALS) skills like IV therapy and limited medications?", options: ["EMR", "EMT", "AEMT", "Physician"], answer: ["AEMT"], type: "single", category: "Ch 1: EMS Systems", rationale: "AEMTs bridge the gap between basic and advanced life support." },
    { q: "The Medical Director provides which of the following for the AEMT?", options: ["1:1 guidance for all patient care", "Legal authority to practice", "Liability and malpractice insurance", "Discipling providers for tardiness or uniform appearance"], answer: ["Legal authority to practice"], type: "single", category: "Ch 1: EMS Systems", rationale: "EMS providers practice under the license of their Medical Director." },
    { q: "Which agency regulates the radio frequencies used by EMS?", options: ["NHTSA", "FCC", "NREMT", "FEMA"], answer: ["FCC"], type: "single", category: "Ch 1: EMS Systems", rationale: "The Federal Communications Commission (FCC) manages all radio communications." },
    { q: "Continuous Quality Improvement (CQI) is designed to be:", options: ["Punitive", "Circular and non-punitive", "Optional", "Managed by the Mayor"], answer: ["Circular and non-punitive"], type: "single", category: "Ch 1: EMS Systems", rationale: "CQI focuses on improving system performance and patient care." },
    { q: "Public Health focuses on which of the following?", options: ["One patient at a time", "The entire population", "Hospital billing", "Radio maintenance"], answer: ["The entire population"], type: "single", category: "Ch 1: EMS Systems", rationale: "Public health initiatives target health and prevention for the whole community." },
    { q: "Evidence-based medicine in EMS is primarily driven by:", options: ["Tradition", "EMS Research", "Intuition", "Old protocols"], answer: ["EMS Research"], type: "single", category: "Ch 1: EMS Systems", rationale: "Research provides the evidence to justify changing clinical practices." },
    { q: "The ADA (Americans with Disabilities Act) protects:", options: ["Unqualified applicants", "Qualified individuals with disabilities", "Physicians only", "Ambulance manufacturers"], answer: ["Qualified individuals with disabilities"], type: "single", category: "Ch 1: EMS Systems", rationale: "The ADA ensures equal opportunity in employment for those with disabilities." },
    { q: "Online medical direction is characterized by:", options: ["Written protocols", "Real-time radio/phone consultation", "Monthly meetings", "Emailing the Chief"], answer: ["Real-time radio/phone consultation"], type: "single", category: "Ch 1: EMS Systems", rationale: "Online direction is immediate communication during a call." },
    { q: "The primary purpose of NREMT certification is to:", options: ["Issues a license to practice", "Ensure a national standard of competency", "Dictate care levels for all states", "Ensuring EMS programs meet education standards and equipment"], answer: ["Ensure a national standard of competency"], type: "single", category: "Ch 1: EMS Systems", rationale: "NREMT validates minimum competency across the United States." },

    // CHAPTER 2 (10 QUESTIONS)
    { q: "What is the single most important way to prevent the spread of infection?", options: ["Wearing a gown", "Handwashing", "Always wearing a mask", "Staying in the truck"], answer: ["Handwashing"], type: "single", category: "Ch 2: Safety & Wellness", rationale: "Hand hygiene is the #1 defense against pathogen transmission." },
    { q: "Which PPE is required specifically for suspected Tuberculosis (TB)?", options: ["Surgical mask", "N95 or HEPA respirator", "Gloves only", "No mask needed"], answer: ["N95 or HEPA respirator"], type: "single", category: "Ch 2: Safety & Wellness", rationale: "TB is an airborne pathogen requiring high-level filtration." },
    { q: "What is your FIRST priority at any scene?", options: ["Patient care", "Personal safety", "Documentation", "Crowd control"], answer: ["Personal safety"], type: "single", category: "Ch 2: Safety & Wellness", rationale: "Scene safety prevents the provider from becoming a second victim." },
    { q: "Which Hepatitis strain is most commonly spread through blood-to-blood contact?", options: ["Hep A", "Hep B", "Hep E", "Hep G"], answer: ["Hep B"], type: "single", category: "Ch 2: Safety & Wellness", rationale: "Hepatitis B is a high-risk bloodborne pathogen for EMS." },
    { q: "If you are exposed to a patient's blood, what is your first step?", options: ["Call your supervisor", "Wash the area with soap and water", "Go to the ER", "Finish the transport"], answer: ["Wash the area with soap and water"], type: "single", category: "Ch 2: Safety & Wellness", rationale: "Immediate decontamination is the priority after exposure." },
    { q: "Standard Precautions assume that:", options: ["Only sick people are infectious", "All body fluids are potentially infectious", "Patients will tell you if they have a virus", "Gloves are only for bleeding"], answer: ["All body fluids are potentially infectious"], type: "single", category: "Ch 2: Safety & Wellness", rationale: "Standard precautions protect against unknown risks in every patient." },
    { q: "The process of killing all microorganisms on an object is:", options: ["Disinfection", "Sterilization", "Cleaning", "Boiling"], answer: ["Sterilization"], type: "single", category: "Ch 2: Safety & Wellness", rationale: "Sterilization kills 100% of life forms; disinfection only kills most." },
    { q: "A state of chronic emotional and physical exhaustion is called:", options: ["Acute stress", "Burnout", "Eustress", "Delayed stress"], answer: ["Burnout"], type: "single", category: "Ch 2: Safety & Wellness", rationale: "Burnout is the long-term result of unresolved job stress." },
    { q: "The three stages of stress (Alarm, Resistance, Exhaustion) are part of:", options: ["Grieving", "General Adaptation Syndrome", "NHTSA Guidelines", "The EMS Agenda"], answer: ["General Adaptation Syndrome"], type: "single", category: "Ch 2: Safety & Wellness", rationale: "GAS describes the physiological response to prolonged stress." },
    { q: "Which stress reaction occurs days, weeks, or months after a call?", options: ["Acute", "Delayed", "Cumulative", "Eustress"], answer: ["Delayed"], type: "single", category: "Ch 2: Safety & Wellness", rationale: "Delayed reactions (like PTSD) manifest after the event has passed." },

    // CHAPTER 3 (10 QUESTIONS)
    { q: "Identify the four elements required to prove Negligence:", options: ["Duty, Breach, Damages, Proximate Cause", "Assault, Battery, Intent, Injury", "Duty, Error, Harm, Witness", "Law, Breach, Cost, Pain"], answer: ["Duty, Breach, Damages, Proximate Cause"], type: "multiple", category: "Ch 3: Medical/Legal", rationale: "Negligence requires all 4: Duty, Breach, Damages, and Causation." },
    { q: "A competent adult has the right to refuse medical care. (T/F)", options: ["True", "False"], answer: ["True"], type: "single", category: "Ch 3: Medical/Legal", rationale: "Autonomy allows competent adults to refuse any/all care." },
    { q: "Leaving a patient without transferring care to an equal or higher level provider is:", options: ["Assault", "Abandonment", "Battery", "Slander"], answer: ["Abandonment"], type: "single", category: "Ch 3: Medical/Legal", rationale: "Abandonment is a legal failure in the continuum of care." },
    { q: "Touching a patient without their consent is legally considered:", options: ["Assault", "Battery", "Slander", "Libel"], answer: ["Battery"], type: "single", category: "Ch 3: Medical/Legal", rationale: "Battery is the physical act; assault is the threat or fear." },
    { q: "What law protects the privacy of patient health information?", options: ["OSHA", "HIPAA", "FEMA", "NHTSA"], answer: ["HIPAA"], type: "single", category: "Ch 3: Medical/Legal", rationale: "HIPAA governs the protection of PHI." },
    { q: "Assume an unconscious patient wants life-saving care. This is:", options: ["Expressed Consent", "Implied Consent", "Involuntary Consent", "Informed Consent"], answer: ["Implied Consent"], type: "single", category: "Ch 3: Medical/Legal", rationale: "Implied consent applies when the patient cannot speak for themselves." },
    { q: "Spoken defamation is known as:", options: ["Libel", "Slander", "Negligence", "Abandonment"], answer: ["Slander"], type: "single", category: "Ch 3: Medical/Legal", rationale: "Slander is spoken; Libel is written." },
    { q: "A DNR order is a type of:", options: ["Refusal form", "Advance Directive", "Insurance policy", "Police report"], answer: ["Advance Directive"], type: "single", category: "Ch 3: Medical/Legal", rationale: "Advance directives specify medical wishes before a crisis." },
    { q: "A wrongful act leading to civil legal liability is a:", options: ["Felony", "Misdemeanor", "Tort", "Protocol"], answer: ["Tort"], type: "single", category: "Ch 3: Medical/Legal", rationale: "Torts are civil wrongs (like negligence)." },
    { q: "The scope of practice for an AEMT is defined by:", options: ["The patient", "State law and the Medical Director", "The dispatcher", "The senior partner"], answer: ["State law and the Medical Director"], type: "single", category: "Ch 3: Medical/Legal", rationale: "Scope defines the legal limits of your clinical skills." },

    // CHAPTER 4 (10 QUESTIONS)
    { q: "In the SBAR format, what does the 'B' stand for?", options: ["Basic Info", "Background", "Blood Pressure", "Body System"], answer: ["Background"], type: "single", category: "Ch 4: Communications", rationale: "SBAR = Situation, Background, Assessment, Recommendation." },
    { q: "A device that receives a signal and re-broadcasts it at higher power is a:", options: ["Base station", "Mobile radio", "Repeater", "Pager"], answer: ["Repeater"], type: "single", category: "Ch 4: Communications", rationale: "Repeaters overcome terrain and distance barriers." },
    { q: "Which type of question allows the patient to explain in their own words?", options: ["Closed-ended", "Open-ended", "Leading", "Biased"], answer: ["Open-ended"], type: "single", category: "Ch 4: Communications", rationale: "Open-ended questions (e.g., 'What happened?') yield better detail." },
    { q: "If it wasn't written down in the PCR:", options: ["It still happened", "It didn't happen (legally)", "The nurse will know", "It's optional"], answer: ["It didn't happen (legally)"], type: "single", category: "Ch 4: Communications", rationale: "Legally, if an action isn't documented, it never occurred." },
    { q: "The agency that regulates radio communication is the:", options: ["FAA", "FCC", "FDA", "FBI"], answer: ["FCC"], type: "single", category: "Ch 4: Communications", rationale: "The FCC manages radio airwaves and licensing." },
    { q: "To correct an error on a written PCR, you should:", options: ["Scribble it out", "Use white-out", "Draw a single line, initial, and write the correction", "Throw it away"], answer: ["Draw a single line, initial, and write the correction"], type: "single", category: "Ch 4: Communications", rationale: "Proper correction maintains the legal integrity of the report." },
    { q: "Transmission of data (like ECG) to the hospital is called:", options: ["Radio repair", "Telemetry", "A type of map", "Patient transport"], answer: ["Telemetry"], type: "single", category: "Ch 4: Communications", rationale: "Telemetry allows the hospital to monitor field diagnostics." },
    { q: "The 'Chief Complaint' is defined as:", options: ["Your final diagnosis", "The patient's reason for calling", "The dispatcher's notes", "The patient's medical history"], answer: ["The patient's reason for calling"], type: "single", category: "Ch 4: Communications", rationale: "The CC is why the patient requested help." },
    { q: "Therapeutic communication includes which of the following?", options: ["Judging the patient", "Active listening and eye contact", "Interrupting frequently", "Standing over the patient"], answer: ["Active listening and eye contact"], type: "single", category: "Ch 4: Communications", rationale: "Active listening builds trust and yields more info." },
    { q: "Transfer of care happens when you:", options: ["Unload the patient", "Give a verbal report to a provider of equal/higher training", "Leave the hospital", "Finish the PCR"], answer: ["Give a verbal report to a provider of equal/higher training"], type: "single", category: "Ch 4: Communications", rationale: "Verbal report ensures continuity and legal duty transfer." },

    // CHAPTER 5 (10 QUESTIONS)
    { q: "What does the prefix 'hypo-' mean?", options: ["High/Above", "Low/Below", "Fast", "Slow"], answer: ["Low/Below"], type: "single", category: "Ch 5: Terminology", rationale: "Hypo (low), Hyper (high)." },
    { q: "The term 'Supine' means lying:", options: ["Face down", "Face up", "On the side", "Sitting up"], answer: ["Face up"], type: "single", category: "Ch 5: Terminology", rationale: "Supine = face up; Prone = face down." },
    { q: "Which plane divides the body into top and bottom?", options: ["Sagittal", "Frontal", "Transverse", "Coronal"], answer: ["Transverse"], type: "single", category: "Ch 5: Terminology", rationale: "Transverse is the horizontal plane." },
    { q: "Proximal means:", options: ["Farther from the trunk", "Closer to the trunk", "The front", "The top"], answer: ["Closer to the trunk"], type: "single", category: "Ch 5: Terminology", rationale: "Proximal is near the point of attachment." },
    { q: "The suffix '-ectomy' indicates:", options: ["Inflammation", "Surgical removal", "Pain", "Hole"], answer: ["Surgical removal"], type: "single", category: "Ch 5: Terminology", rationale: "Ectomy = removal (e.g., Appendectomy)." },
    { q: "What quadrant is the Liver primarily in?", options: ["LUQ", "RUQ", "LLQ", "RLQ"], answer: ["RUQ"], type: "single", category: "Ch 5: Terminology", rationale: "The Liver is primarily Right Upper Quadrant." },
    { q: "Anterior refers to which part of the body?", options: ["Back", "Front", "Side", "Top"], answer: ["Front"], type: "single", category: "Ch 5: Terminology", rationale: "Anterior (ventral) is the front." },
    { q: "What does the root 'Cardi/o' refer to?", options: ["Lungs", "Brain", "Heart", "Stomach"], answer: ["Heart"], type: "single", category: "Ch 5: Terminology", rationale: "Cardio = Heart." },
    { q: "A 'Combining Vowel' is usually which letter?", options: ["A", "E", "O", "I"], answer: ["O"], type: "single", category: "Ch 5: Terminology", rationale: "'O' is the standard combining vowel." },
    { q: "Abduction means moving a limb:", options: ["Toward the midline", "Away from the midline", "Up", "Down"], answer: ["Away from the midline"], type: "single", category: "Ch 5: Terminology", rationale: "Abduct = move away from midline; Adduct = add to midline." },

    // CHAPTER 6 (10 QUESTIONS)
    { q: "The 'Power Lift' technique uses which muscles for the work?", options: ["Back", "Legs", "Arms", "Abs"], answer: ["Legs"], type: "single", category: "Ch 6: Lifting/Moving", rationale: "Legs are strongest; back must stay straight." },
    { q: "When is 'Rapid Extrication' used?", options: ["When late", "Unsafe scene or unstable patient", "For all vehicle accidents", "When patient is heavy"], answer: ["Unsafe scene or unstable patient"], type: "single", category: "Ch 6: Lifting/Moving", rationale: "Used when speed is critical for survival." },
    { q: "Which device is best for moving a patient down stairs?", options: ["Scoop stretcher", "Wheeled stretcher", "Stair chair", "Basket stretcher"], answer: ["Stair chair"], type: "single", category: "Ch 6: Lifting/Moving", rationale: "Stair chairs are designed for vertical navigation." },
    { q: "The 'Power Grip' involves palms facing:", options: ["Down", "Up", "Each other", "Sideways"], answer: ["Up"], type: "single", category: "Ch 6: Lifting/Moving", rationale: "Palms up is the strongest/safest grip." },
    { q: "An 'Emergency Move' is used when:", options: ["Patient is in pain", "Immediate environmental danger (e.g., fire)", "Patient is stable", "To clear the scene faster"], answer: ["Immediate environmental danger (e.g., fire)"], type: "single", category: "Ch 6: Lifting/Moving", rationale: "Emergency moves prioritize life over spinal precautions." },
    { q: "Weight limit for a standard 2-person lift is:", options: ["150 lbs", "250 lbs", "400 lbs", "500 lbs"], answer: ["250 lbs"], type: "single", category: "Ch 6: Lifting/Moving", rationale: "250 lbs is the safety benchmark for 2 providers." },
    { q: "Which stretcher splits into halves to 'scoop' the patient?", options: ["Portable stretcher", "Basket stretcher", "Scoop stretcher", "Wheeled stretcher"], answer: ["Scoop stretcher"], type: "single", category: "Ch 6: Lifting/Moving", rationale: "Scoop stretchers minimize rolling of the patient." },
    { q: "Before every lift, you should first:", options: ["Run to patient", "Estimate the load weight", "Call for helicopter", "Lift with back"], answer: ["Estimate the load weight"], type: "single", category: "Ch 6: Lifting/Moving", rationale: "Assessing load prevents injury." },
    { q: "A 'Bariatric Stretcher' is used for:", options: ["Infants", "Obese patients", "Cardiac patients", "Trauma patients"], answer: ["Obese patients"], type: "single", category: "Ch 6: Lifting/Moving", rationale: "Bariatric equipment has higher weight capacities." },
    { q: "When pulling, keep the line of pull:", options: ["Far away", "Through the center of your body", "Overhead", "Twisted"], answer: ["Through the center of your body"], type: "single", category: "Ch 6: Lifting/Moving", rationale: "Centralizing pull protects the spine." }
];

let sessionQuestions = [];
let currentIdx = 0;
let score = 0;
let mode = '';
let timerInterval;
let timeLeft = 0;
let categoryStats = {};

function updateSliderLabel(val) {
    document.getElementById('question-count-label').innerText = val;
    document.getElementById('time-estimate-label').innerText = val * 2;
}

function startQuiz(selectedMode) {
    mode = selectedMode;
    const numToPull = parseInt(document.getElementById('question-slider').value);
    
    document.getElementById('setup-area').style.display = 'none';
    document.getElementById('quiz-area').style.display = 'block';

    const history = JSON.parse(localStorage.getItem('eric_field_notes_history') || "{}");
    
    // Adaptive Logic: Show most failed questions first
    let sortedBank = [...quizData].sort((a, b) => {
        const failA = history[a.q] ? history[a.q].fail : 0;
        const failB = history[b.q] ? history[b.q].fail : 0;
        return failB - failA;
    });

    sessionQuestions = sortedBank.slice(0, numToPull);

    if (mode === 'exam') {
        sessionQuestions.sort(() => Math.random() - 0.5);
        timeLeft = numToPull * 2 * 60; 
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
    
    const totalCount = sessionQuestions.length;
    const percent = Math.round((score / totalCount) * 100);
    
    document.getElementById('score-display').innerText = `Total Score: ${score} / ${totalCount}`;
    document.getElementById('percentage-display').innerText = `${percent}%`;
    
    let breakdownHTML = "<strong>Performance by Chapter:</strong><br>";
    for (const cat in categoryStats) {
        let catPercent = Math.round((categoryStats[cat].correct / categoryStats[cat].total) * 100);
        breakdownHTML += `${cat}: ${catPercent}%<br>`;
    }
    document.getElementById('category-breakdown').innerHTML = breakdownHTML;

    const passStatus = document.getElementById('pass-status');
    passStatus.innerHTML = percent >= 70 ? "<b style='color:green; font-size: 1.5rem;'>PASSED</b>" : "<b style='color:red; font-size: 1.5rem;'>RE-STUDY RECOMMENDED</b>";
}
