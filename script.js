const quizData = [
    // --- FOUNDATIONS & LEGAL ---
    { q: "Accidental Death and Disability (1966) is famously known as:", options: ["The Orange Book", "The White Paper", "The EMS Charter", "The NHTSA Guide"], answer: ["The White Paper"], type: "single", category: "EMS Systems", section: "Foundations", rationale: "This paper identified accidental death as a 'neglected disease' and spurred EMS growth." },
    { q: "Which EMS level is trained in IV therapy and limited advanced meds?", options: ["EMR", "EMT", "AEMT", "Paramedic"], answer: ["AEMT"], type: "single", category: "EMS Systems", section: "Foundations", rationale: "AEMTs bridge basic and advanced life support." },
    { q: "What is the primary way to prevent disease transmission?", options: ["Gloves", "Handwashing", "Gowns", "Masks"], answer: ["Handwashing"], type: "single", category: "Safety", section: "Foundations", rationale: "Hand hygiene is the #1 clinical defense." },
    { q: "What are the four elements of Negligence?", options: ["Duty to act", "Breach of duty", "Damages", "Proximate cause"], answer: ["Duty to act", "Breach of duty", "Damages", "Proximate cause"], type: "multiple", category: "Legal", section: "Foundations", rationale: "Negligence requires all 4 components: Duty, Breach, Damages, and Proximate Cause." },
    { q: "In SBAR, what does 'B' stand for?", options: ["Basic Info", "Background", "Body System", "Blood Pressure"], answer: ["Background"], type: "single", category: "Communications", section: "Foundations", rationale: "SBAR = Situation, Background, Assessment, Recommendation." },
    { q: "What does the prefix 'hypo-' mean?", options: ["Above", "Below", "Fast", "Slow"], answer: ["Below"], type: "single", category: "Terminology", section: "Foundations", rationale: "Hypo (low/below) vs Hyper (high/above)." },
    { q: "Which document establishes the 'Scope of Practice' for an AEMT within a specific state?", options: ["NHTSA Curriculum", "The State EMS Office / Medical Practice Act", "NREMT Handbook", "Federal DOT"], answer: ["The State EMS Office / Medical Practice Act"], type: "single", category: "EMS Systems", section: "Foundations", rationale: "State legislation defines the actual legal scope of practice." },

    // --- PATHOPHYSIOLOGY ---
    { q: "What is the primary product of anaerobic metabolism?", options: ["Lactic Acid", "ATP", "Glucose", "Oxygen"], answer: ["Lactic Acid"], type: "single", category: "Patho", section: "Pathophysiology", rationale: "Without oxygen, cells produce lactic acid and very little energy." },
    { q: "Shock caused by widespread vasodilation is categorized as:", options: ["Hypovolemic", "Distributive", "Cardiogenic", "Obstructive"], answer: ["Distributive"], type: "single", category: "Patho", section: "Pathophysiology", rationale: "Anaphylaxis and Sepsis are types of distributive shock." },
    { q: "A patient hypoventilating from an opioid OD is likely in:", options: ["Respiratory Alkalosis", "Respiratory Acidosis", "Metabolic Alkalosis", "Metabolic Acidosis"], answer: ["Respiratory Acidosis"], type: "single", category: "Patho", section: "Pathophysiology", rationale: "CO2 retention leads to a drop in pH, causing respiratory acidosis." },

    // --- MEDICAL ---
    { q: "A 70-year-old male with a history of MI presents with extreme dyspnea, waking up gasping for air. You find him sitting bolt-upright, coughing up pink, frothy sputum. BP 190/104, HR 110, SpO2 84% on room air. Which interventions are appropriate? (Select all that apply)", options: ["Placing the patient in a supine position", "Application of CPAP at 5-10 cmH2O", "Administration of Nitroglycerin (per protocol)", "High-flow oxygen via Non-rebreather mask", "Administration of Albuterol via nebulizer"], answer: ["Application of CPAP at 5-10 cmH2O", "Administration of Nitroglycerin (per protocol)", "High-flow oxygen via Non-rebreather mask"], type: "multiple", category: "Cardiovascular", section: "Medical", rationale: "Acute Decompensated Heart Failure (ADHF) requires CPAP to move alveolar fluid and Nitro to reduce preload." },
    { q: "A patient with a history of chronic COPD presents with worsening fatigue and shortness of breath. Which findings indicate Right-Sided Heart Failure (Cor Pulmonale)? (Select all that apply)", options: ["Jugular Venous Distension (JVD)", "Bilateral crackles (rales) in the lung bases", "Dependent peripheral edema", "Pink frothy sputum", "Ascites (abdominal swelling)"], answer: ["Jugular Venous Distension (JVD)", "Dependent peripheral edema", "Ascites (abdominal swelling)"], type: "multiple", category: "Cardiovascular", section: "Medical", rationale: "Right failure causes systemic backup (JVD, edema, ascites)." },

    // --- CARDIAC CHAIN ---
    { q: "[CARDIAC PART 1] A 68-year-old female complains of 'heavy' chest pressure and nausea. She is pale and diaphoretic. Vitals: BP 140/90, HR 92, SpO2 94%. Initial priority?", options: ["Administer 324mg Aspirin", "Perform a 12-lead ECG", "Administer O2", "Establish IV"], answer: ["Administer 324mg Aspirin"], type: "single", category: "Cardiology", section: "Medical", chainID: "Cardiac_1", rationale: "Early Aspirin prevents further clot formation.", cheatSheet: "ACS PRIORITY: Aspirin (Anti-platelet) -> 12 Lead -> Nitro -> Morphine." },
    { q: "[CARDIAC PART 2] The patient develops extreme dyspnea and crackles in the bases. SpO2 88%, BP 188/100. Next step?", options: ["Albuterol", "CPAP at 5 cmH2O", "BVM", "NRB Mask"], answer: ["CPAP at 5 cmH2O"], type: "single", category: "Cardiology", section: "Medical", chainID: "Cardiac_1", rationale: "Crackles + Hypertension = Pulmonary Edema. CPAP is the gold standard.", cheatSheet: "CPAP CRITERIA: Awake, Patent Airway, Tachypnea." },
    { q: "[CARDIAC PART 3] The patient becomes lethargic and cannot follow commands. RR is 6, HR 110. You should:", options: ["Increase CPAP", "Remove CPAP and begin BVM", "Administer Nitro", "Check Glucose"], answer: ["Remove CPAP and begin BVM"], type: "single", category: "Cardiology", section: "Medical", chainID: "Cardiac_1", rationale: "CPAP is contraindicated if the patient cannot protect their own airway or follow commands.", cheatSheet: "CPAP CONTRAINDICATIONS: Unconscious, Respiratory Arrest, Pneumothorax." },

    // --- TRAUMA & ENVIRONMENTAL ---
    { q: "Beck's Triad (JVD, muffled heart sounds, and narrowing pulse pressure) indicates:", options: ["Tension Pneumothorax", "Cardiac Tamponade", "Hemothorax", "Commotio Cordis"], answer: ["Cardiac Tamponade"], type: "single", category: "Chest", section: "Trauma", rationale: "Cardiac Tamponade occurs when fluid fills the pericardial sac." },
    { q: "What are the '6 Ps' of musculoskeletal assessment? (Select all that apply)", options: ["Pain", "Paresthesia", "Pulselessness", "Pallor", "Paralysis", "Pressure"], answer: ["Pain", "Paresthesia", "Pulselessness", "Pallor", "Paralysis", "Pressure"], type: "multiple", category: "Ortho", section: "Trauma", rationale: "Critical for identifying Compartment Syndrome." },

    // --- TRAUMA CHAIN ---
    { q: "[TRAUMA PART 1] High-speed MVC. 24-year-old male with a pulsing arterial bleed from his right thigh. First action?", options: ["Apply O2", "Apply Tourniquet", "Rapid Trauma Assessment", "C-Spine"], answer: ["Apply Tourniquet"], type: "single", category: "Trauma", section: "Trauma", chainID: "Trauma_1", rationale: "X-ABC: Exsanguinating hemorrhage is addressed first.", cheatSheet: "MARCH: Massive Hemorrhage, Airway, Respiration, Circulation, Head/Hypothermia." },
    { q: "[TRAUMA PART 2] Bleeding controlled. Patient has absent breath sounds on the right, JVD, and BP is 88/60. Suspect?", options: ["Simple Pneumo", "Hemothorax", "Tension Pneumothorax", "Tamponade"], answer: ["Tension Pneumothorax"], type: "single", category: "Trauma", section: "Trauma", chainID: "Trauma_1", rationale: "Absent sounds + JVD + Hypotension = Tension Pneumo.", cheatSheet: "TENSION PNEUMO: Life-threatening obstructive shock." },
    { q: "[TRAUMA PART 3] Immediate priority intervention for this patient?", options: ["BVM", "Needle Decompression", "Occlusive Dressing", "Rapid Transport"], answer: ["Needle Decompression"], type: "single", category: "Trauma", section: "Trauma", chainID: "Trauma_1", rationale: "Relieves pressure to restore cardiac output.", cheatSheet: "DECOMPRESSION: 2nd ICS Mid-clavicular OR 4th/5th ICS Anterior-axillary." },

    // --- OB/GYN & PEDIATRICS ---
    { q: "A newborn has a HR of 54 bpm after 30 seconds of effective positive pressure ventilation. What is your next action?", options: ["Administer Epinephrine", "Begin chest compressions", "Increase O2 concentration", "Continue PPV for another 30s"], answer: ["Begin chest compressions"], type: "single", category: "Neonatal", section: "OBPeds", rationale: "If HR is < 60 despite effective PPV, chest compressions must begin." },
    { q: "Upon assessment of a delivering mother, you see the umbilical cord protruding from the vagina. How should you manage this?", options: ["Pull the cord", "Place mother in knee-chest position", "Push cord back", "Clamp immediately"], answer: ["Place mother in knee-chest position"], type: "single", category: "Obstetrics", section: "OBPeds", rationale: "Requires manual displacement/positioning to take pressure off the cord." },

    // --- PEDS CHAIN ---
    { q: "[PEDS PART 1] Using PAT, a 2-year-old is limp, pale, and grunting. Status?", options: ["Distress", "Failure", "Compensated Shock", "Decompensated Shock"], answer: ["Failure"], type: "single", category: "Pediatrics", section: "OBPeds", chainID: "Peds_1", rationale: "Limp (Appearance) + Grunting (Breathing) = Failure.", cheatSheet: "PAT TRIANGLE: Appearance, Work of Breathing, Circulation." },
    { q: "[PEDS PART 2] Child begins a tonic-clonic seizure. History of high fever. Priority?", options: ["Midazolam", "Ice Packs", "Protect Airway/Prevent Injury", "Insert OPA"], answer: ["Protect Airway/Prevent Injury"], type: "single", category: "Pediatrics", section: "OBPeds", chainID: "Peds_1", rationale: "Airway safety is first during active seizure.", cheatSheet: "SEIZURE GOALS: Airway, Oxygen, Safety." },

    // --- TERMINOLOGY (OPEN TEXT) ---
    { q: "Provide the medical term for 'vomiting blood.'", options: [], answer: ["Hematemesis"], type: "text", category: "Terminology", section: "Terminology", rationale: "Hemat- (blood) + -emesis (vomiting)." },
    { q: "Provide the medical term for 'blood in the urine.'", options: [], answer: ["Hematuria"], type: "text", category: "Terminology", section: "Terminology", rationale: "Hemat- (blood) + -uria (urine)." }
];

// --- QUIZ ENGINE LOGIC ---
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
    const availableCount = filtered.length > 0 ? filtered.length : 5;
    
    slider.max = availableCount;
    if (parseInt(slider.value) > availableCount) {
        slider.value = availableCount;
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

    if (filteredBank.length === 0) return alert("No questions found!");

    // --- CHAIN-AWARE SHUFFLE ---
    let units = [];
    let seenChains = new Set();

    filteredBank.forEach(q => {
        if (q.chainID) {
            if (!seenChains.has(q.chainID)) {
                const chain = filteredBank.filter(item => item.chainID === q.chainID);
                units.push(chain); // Staple the chain together
                seenChains.add(q.chainID);
            }
        } else {
            units.push([q]); // Single card
        }
    });

    // Shuffle the packets and single cards
    units.sort(() => Math.random() - 0.5);

    // --- UNIT-COMPLETE RULE ---
    // Instead of slice(), we add whole units until we reach the slider number
    sessionQuestions = [];
    for (let unit of units) {
        if (sessionQuestions.length >= numToPull) break; 
        sessionQuestions.push(...unit);
    }

    document.getElementById('setup-area').style.display = 'none';
    document.getElementById('quiz-area').style.display = 'block';

    categoryStats = {};
    sessionQuestions.forEach(q => {
        if (!categoryStats[q.category]) categoryStats[q.category] = { total: 0, correct: 0 };
        categoryStats[q.category].total++;
    });

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
    document.getElementById('progress').innerText = `Question ${currentIdx + 1} of ${sessionQuestions.length} | ${data.category}`;
    document.getElementById('question-text').innerText = data.q;
    const container = document.getElementById('options-container');
    container.innerHTML = '';
    document.getElementById('feedback').innerText = '';

    if (data.type === 'text') {
        const input = document.createElement('input');
        input.type = "text";
        input.id = "text-answer";
        input.placeholder = "Type your answer...";
        input.style.width = "100%";
        input.style.padding = "15px";
        input.style.boxSizing = "border-box";
        container.appendChild(input);
        input.focus();
        input.addEventListener("keypress", (e) => { if (e.key === "Enter") handleAction(); });
    } else {
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
}

function handleAction() {
    const q = sessionQuestions[currentIdx];
    let isCorrect = false;

    if (q.type === 'text') {
        const inputVal = document.getElementById('text-answer').value.trim().toLowerCase();
        isCorrect = q.answer.some(ans => ans.toLowerCase().trim() === inputVal);
    } else {
        const selected = Array.from(document.querySelectorAll('input[name="option"]:checked')).map(i => i.value);
        if (selected.length === 0) return alert("Select an answer.");
        isCorrect = selected.length === q.answer.length && selected.every(v => q.answer.includes(v));
    }
    
    if (isCorrect) {
        score++;
        categoryStats[q.category].correct++;
    }

    if (mode === 'review') {
        const fb = document.getElementById('feedback');
        fb.innerHTML = isCorrect ? `<b style="color:green">Correct!</b>` : `<b style="color:red">Incorrect.</b> Answer: ${q.answer.join(", ")}`;
        fb.innerHTML += `<br><small>${q.rationale}</small>`;
        
        if (q.cheatSheet) {
            fb.innerHTML += `<br><button onclick="alert('${q.cheatSheet}')" class="cheat-sheet-btn" style="margin-top:10px; padding:8px; cursor:pointer;">📖 View Field Note</button>`;
        }

        const btn = document.getElementById('action-btn');
        btn.innerText = "Next Question";
        btn.onclick = () => {
            currentIdx++;
            if (currentIdx < sessionQuestions.length) { 
                showQuestion(); 
                btn.innerText = "Submit Answer"; 
                btn.onclick = handleAction; 
            } else { showResults(); }
        };
    } else {
        currentIdx++;
        currentIdx < sessionQuestions.length ? showQuestion() : showResults();
    }
}

function showResults() {
    clearInterval(timerInterval);
    document.getElementById('quiz-area').style.display = 'none';
    document.getElementById('results-area').style.display = 'block';

    const percent = Math.round((score / sessionQuestions.length) * 100);
    document.getElementById('score-display').innerText = `Final Score: ${score} / ${sessionQuestions.length}`;
    document.getElementById('percentage-display').innerText = `Total Mastery: ${percent}%`;

    const breakdown = document.getElementById('category-breakdown');
    breakdown.innerHTML = '<h3>Performance Profile</h3>';

    for (const [cat, data] of Object.entries(categoryStats)) {
        const catPercent = Math.round((data.correct / data.total) * 100);
        let masteryClass = catPercent >= 75 ? 'high-mastery' : (catPercent >= 50 ? 'mid-mastery' : 'low-mastery');
        breakdown.innerHTML += `
            <div class="category-stat">
                <div class="category-label"><span>${cat}</span><span>${catPercent}%</span></div>
                <div class="stat-bar-bg"><div class="stat-bar-fill ${masteryClass}" style="width: ${catPercent}%"></div></div>
            </div>`;
    }

    fetch('https://script.google.com/macros/s/AKfycbw9Bs67ZwoEiMa4gRH1m6EctG67Y1TMP3B-sKDAAse8ZLISyBXDn76gDBexnTmWv-6Bbw/exec', {
        method: 'POST',
        mode: 'no-cors', 
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ module: document.getElementById('topic-select').value, score, total: sessionQuestions.length, percentage: percent, timestamp: new Date().toLocaleString() })
    });
}

window.onload = () => { adjustSliderRange(); };
