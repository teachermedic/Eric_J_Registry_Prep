const quizData = [
    // --- FOUNDATIONS (CH 1-6) ---
    { q: "Accidental Death and Disability (1966) is famously known as:", options: ["The Orange Book", "The White Paper", "The EMS Charter", "The NHTSA Guide"], answer: ["The White Paper"], type: "single", category: "Ch 1: EMS Systems", section: "Foundations", rationale: "This paper identified accidental death as a 'neglected disease' and spurred EMS growth." },
    { q: "Which EMS level is trained in IV therapy and limited advanced meds?", options: ["EMR", "EMT", "AEMT", "Paramedic"], answer: ["AEMT"], type: "single", category: "Ch 1: EMS Systems", section: "Foundations", rationale: "AEMTs bridge basic and advanced life support." },
    { q: "What is the primary way to prevent disease transmission?", options: ["Gloves", "Handwashing", "Gowns", "Masks"], answer: ["Handwashing"], type: "single", category: "Ch 2: Safety", section: "Foundations", rationale: "Hand hygiene is the #1 clinical defense." },
    { q: "What are the four elements of Negligence?", options: ["Duty to act", "Breach of duty", "Damages", "Proximate cause"], answer: ["Duty to act", "Breach of duty", "Damages", "Proximate cause"], type: "multiple", category: "Ch 3: Legal", section: "Foundations", rationale: "Negligence requires all 4 components: Duty, Breach, Damages, and Proximate Cause." },
    { q: "In SBAR, what does 'B' stand for?", options: ["Basic Info", "Background", "Body System", "Blood Pressure"], answer: ["Background"], type: "single", category: "Ch 4: Communications", section: "Foundations", rationale: "SBAR = Situation, Background, Assessment, Recommendation." },
    { q: "What does the prefix 'hypo-' mean?", options: ["Above", "Below", "Fast", "Slow"], answer: ["Below"], type: "single", category: "Ch 5: Terminology", section: "Foundations", rationale: "Hypo (low/below) vs Hyper (high/above)." },
    { q: "Which lifting technique uses the legs and an upright back?", options: ["Power grip", "Power lift", "Deadlift", "Shoulder lift"], answer: ["Power lift"], type: "single", category: "Ch 6: Lifting", section: "Foundations", rationale: "Legs are strongest; back must remain straight." },

    // --- PATHOPHYSIOLOGY (CH 7) ---
    { q: "What is the primary product of anaerobic metabolism?", options: ["Lactic Acid", "ATP", "Glucose", "Oxygen"], answer: ["Lactic Acid"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "Without oxygen, cells produce lactic acid and very little energy." },
    { q: "Shock caused by widespread vasodilation is categorized as:", options: ["Hypovolemic", "Distributive", "Cardiogenic", "Obstructive"], answer: ["Distributive"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "Anaphylaxis and Sepsis are types of distributive shock." },
    { q: "A pulmonary embolism causes which type of shock?", options: ["Hypovolemic", "Distributive", "Cardiogenic", "Obstructive"], answer: ["Obstructive"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "A physical block to flow is obstructive shock." },
    { q: "The Fick Principle describes components necessary for:", options: ["Lifting", "Oxygen reaching cells", "Legal duty", "Radio use"], answer: ["Oxygen reaching cells"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "Fick Principle: O2 in air, working pump, enough RBCs." },

    // --- MEDICAL (CH 16-25) ---
    { q: "When evaluating the Nature of Illness (NOI), what is the AEMT's primary goal during size-up?", options: ["Determine exact diagnosis", "Identify life-threats and determine medical vs trauma", "Complete full head-to-toe", "Administer medications"], answer: ["Identify life-threats and determine medical vs trauma"], type: "single", category: "Ch 16: Overview", section: "Medical", rationale: "The NOI helps focus the assessment on the general category and threats." },
    { q: "How does CPAP improve oxygenation in pulmonary edema?", options: ["Increasing HR", "Forcing fluid out of alveoli and into capillaries", "Improves blood pressure", "Causing vasodilation"], answer: ["Forcing fluid out of alveoli and into capillaries"], type: "single", category: "Ch 17: Respiratory", section: "Medical", rationale: "CPAP uses pressure to push fluid from the air sacs back into the bloodstream." },
    { q: "Kussmaul respirations are unique to which condition?", options: ["HHNS", "DKA", "Hypoglycemia", "Stroke"], answer: ["DKA"], type: "single", category: "Ch 21: Endocrine", section: "Medical", rationale: "Kussmaul breathing is the body's attempt to compensate for metabolic acidosis." },
    { q: "A 54 year old is found lethargic with rapid, deep respirations, and high glucose. How should you manage this patient?", options: ["Ventilate with PPV", "Open and secure the airway", "Hyperventilate", "Check pupils"], answer: ["Open and secure the airway"], type: "single", category: "Ch 21: Endocrine", section: "Medical", rationale: "Airway is always the priority in an unresponsive patient." },
    { q: "Mittelschmerz refers to:", options: ["Endometriosis", "Ovulation pain", "Amenorrhea", "PID"], answer: ["Ovulation pain"], type: "single", category: "Ch 25: Gynecologic", section: "Medical", rationale: "Mittelschmerz is localized pain felt during ovulation." },

    // --- TRAUMA: SHOCK & BLEEDING (CH 14, 15, 27) ---
    { q: "What is the target Mean Arterial Pressure (MAP) when using permissive hypotension for an internal hemorrhage?", options: ["60-65 mmHg", "80-90 mmHg", "100-110 mmHg", "120 mmHg"], answer: ["60-65 mmHg"], type: "single", category: "Ch 14: Shock", section: "Trauma", rationale: "Targeting a lower MAP (permissive hypotension) prevents 'popping the clot' in internal bleeding." },
    { q: "Which Class of Hemorrhage is defined by a 30-40% blood loss (1500-2000mL) and a significant drop in systolic BP?", options: ["Class I", "Class II", "Class III", "Class IV"], answer: ["Class III"], type: "single", category: "Ch 27: Bleeding", section: "Trauma", rationale: "Class III hemorrhage is when the body can no longer compensate and blood pressure begins to fall." },
    { q: "A patient has lost 800mL of blood. They are slightly tachycardic but have a normal BP. Which class of hemorrhage is this?", options: ["Class I", "Class II", "Class III", "Class IV"], answer: ["Class II"], type: "single", category: "Ch 27: Bleeding", section: "Trauma", rationale: "Class II (15-30%) typically presents with tachycardia but maintained BP through compensation." },
    { q: "Which of the following is an 'Obstructive' cause of shock? (Select all that apply)", options: ["Tension Pneumothorax", "Cardiac Tamponade", "Sepsis", "Pulmonary Embolism"], answer: ["Tension Pneumothorax", "Cardiac Tamponade", "Pulmonary Embolism"], type: "multiple", category: "Ch 14: Shock", section: "Trauma", rationale: "Obstructive shock is caused by mechanical interference with the heart's ability to pump or fill." },
    { q: "After how many minutes without a pulse do brain cells typically begin to die?", options: ["1-2 minutes", "4-6 minutes", "8-10 minutes", "12-15 minutes"], answer: ["4-6 minutes"], type: "single", category: "Ch 15: BLS", section: "Trauma", rationale: "Irreversible brain damage typically begins after 4-6 minutes without perfusion." },

    // --- TRAUMA: SOFT TISSUE & BURNS (CH 28) ---
    { q: "A patient has a 4th degree burn. What is the defining characteristic?", options: ["Blisters", "Leathery skin", "Involvement of muscle, fascia, or bone", "Redness and pain"], answer: ["Involvement of muscle, fascia, or bone"], type: "single", category: "Ch 28: Soft Tissue", section: "Trauma", rationale: "4th degree burns extend past the skin into underlying structures like muscle and bone." },
    { q: "Using the Rule of Nines for an adult, what is the percentage for the entire left leg AND the genitals?", options: ["14%", "18%", "19%", "23%"], answer: ["19%"], type: "single", category: "Ch 28: Soft Tissue", section: "Trauma", rationale: "Entire leg = 18%, Genitals = 1%. Total = 19%." },
    { q: "What is the primary danger of an acid chemical burn compared to an alkali burn?", options: ["Alkalis cause liquefaction necrosis", "Acids cause deeper burns", "Alkalis are easier to neutralize", "Acids cause coagulation necrosis"], answer: ["Alkalis cause liquefaction necrosis", "Acids cause coagulation necrosis"], type: "multiple", category: "Ch 28: Soft Tissue", section: "Trauma", rationale: "Acids cause coagulation necrosis (thickening) which limits depth, while alkalis cause liquefaction which allows the burn to travel deeper." },
    { q: "In the field, how should you transport an amputated part?", options: ["Directly on ice", "Submerged in saline", "Wrapped in saline-moistened gauze, in a bag, on cold water/ice", "Dry in a sealed container at room temperature"], answer: ["Wrapped in saline-moistened gauze, in a bag, on cold water/ice"], type: "single", category: "Ch 28: Soft Tissue", section: "Trauma", rationale: "Amputated parts should be kept cool but not frozen or directly in contact with ice." },

    // --- TRAUMA: HEAD & SPINE (CH 30) ---
    { q: "Which hematoma is characterized by a 'lucid interval' followed by a rapid loss of consciousness?", options: ["Subdural", "Epidural", "Intracerebral", "Subarachnoid"], answer: ["Epidural"], type: "single", category: "Ch 30: Head/Spine", section: "Trauma", rationale: "Epidural hematomas (arterial) often feature a brief period of consciousness before intracranial pressure rises sharply." },
    { q: "A patient has a GCS of 8. This is classified as what level of brain injury?", options: ["Mild", "Moderate", "Severe", "Critical"], answer: ["Severe"], type: "single", category: "Ch 30: Head/Spine", section: "Trauma", rationale: "GCS 3-8 is severe; 9-12 is moderate; 13-15 is mild." },
    { q: "Which reflex involves the toes fanning out when the sole of the foot is stroked, indicating a brain or spinal cord injury in an adult?", options: ["Cushing's reflex", "Babinski's sign", "Kehr's sign", "Hering-Breuer reflex"], answer: ["Babinski's sign"], type: "single", category: "Ch 30: Head/Spine", section: "Trauma", rationale: "A positive Babinski sign is abnormal in adults and suggests upper motor neuron damage." },
    { q: "Brown-Sequard syndrome results in which pattern of deficit?", options: ["Total paralysis below injury", "Loss of motor on one side and sensory on the opposite side", "Loss of motor in upper extremities but not lower", "Loss of sensory only"], answer: ["Loss of motor on one side and sensory on the opposite side"], type: "single", category: "Ch 30: Head/Spine", section: "Trauma", rationale: "Brown-Sequard is a 'hemisection' of the cord, causing ipsilateral motor loss and contralateral pain/temp loss." },

    // --- TRAUMA: CHEST & ABDOMEN (CH 31, 32) ---
    { q: "Beck's Triad for Cardiac Tamponade consists of: (Select all that apply)", options: ["Muffled heart sounds", "JVD", "Narrowing pulse pressure", "Tracheal deviation"], answer: ["Muffled heart sounds", "JVD", "Narrowing pulse pressure"], type: "multiple", category: "Ch 31: Chest", section: "Trauma", rationale: "Beck's Triad describes the classic signs of fluid in the pericardial sac." },
    { q: "What is the hallmark of a 'Flail Chest'?", options: ["Absent breath sounds", "Paradoxical motion", "JVD", "Subcutaneous emphysema"], answer: ["Paradoxical motion"], type: "single", category: "Ch 31: Chest", section: "Trauma", rationale: "Paradoxical motion occurs when a free-floating segment of ribs moves opposite the rest of the chest during breathing." },
    { q: "Which sign involves periumbilical bruising and indicates intra-abdominal bleeding?", options: ["Grey Turner's sign", "Cullen's sign", "Kehr's sign", "Murphy's sign"], answer: ["Cullen's sign"], type: "single", category: "Ch 32: Abdomen", section: "Trauma", rationale: "Cullen's sign is ecchymosis around the navel." },
    { q: "A patient has pain referred to the left shoulder after blunt abdominal trauma. This is likely a rupture of the:", options: ["Liver", "Spleen", "Appendix", "Bladder"], answer: ["Spleen"], type: "single", category: "Ch 32: Abdomen", section: "Trauma", rationale: "Kehr's sign (left shoulder pain) is a classic indicator of splenic rupture." },

    // --- TRAUMA: ORTHO & ENVIRONMENT (CH 33, 34) ---
    { q: "What is the maximum amount of blood that can be lost from a single femur fracture?", options: ["500 mL", "1000 mL", "1500 mL", "2500 mL"], answer: ["1500 mL"], type: "single", category: "Ch 33: Ortho", section: "Trauma", rationale: "The thigh can easily hold 1.5 liters of blood following a mid-shaft femur fracture." },
    { q: "In the 6 Ps of musculoskeletal assessment, which is typically the LATEST sign to develop?", options: ["Pain", "Pallor", "Pulselessness", "Paresthesia"], answer: ["Pulselessness"], type: "single", category: "Ch 33: Ortho", section: "Trauma", rationale: "Pulselessness and Paralysis are late signs of neurovascular compromise." },
    { q: "A patient in 'Heat Stroke' is distinguished from 'Heat Exhaustion' by which finding?", options: ["Tachycardia", "Heavy sweating", "Altered Mental Status", "Muscle cramps"], answer: ["Altered Mental Status"], type: "single", category: "Ch 34: Environmental", section: "Trauma", rationale: "The core differentiator of Heat Stroke is CNS dysfunction (Altered Mental Status)." },
    { q: "Which gas law explains why bubbles form in the blood of a diver who ascends too quickly (The Bends)?", options: ["Boyle's Law", "Henry's Law", "Dalton's Law", "Charles's Law"], answer: ["Henry's Law"], type: "single", category: "Ch 34: Environmental", section: "Trauma", rationale: "Henry's Law states that gas dissolved in liquid will come out of solution if pressure is decreased." },
    { q: "A patient with 'The Staggers' following a dive likely has nitrogen bubbles in which system?", options: ["Lungs", "Joints", "Cerebellum/Inner Ear", "Skin"], answer: ["Cerebellum/Inner Ear"], type: "single", category: "Ch 34: Environmental", section: "Trauma", rationale: "The 'Staggers' refers to decompression sickness affecting balance and coordination." },

    // --- FILLING OUT TO 100+ (RAPID FIRE RIGOR) ---
    { q: "What is the primary medication used for field treatment of Magnesium-induced toxicity or Calcium Channel Blocker overdose?", options: ["Sodium Bicarbonate", "Calcium Chloride", "Magnesium Sulfate", "Atropine"], answer: ["Calcium Chloride"], type: "single", category: "Ch 7: Patho", section: "Medical", rationale: "Calcium antagonizes the effects of magnesium and blocks calcium channel effects in overdose." },
    { q: "Which type of blast injury is caused by the patient being thrown against a solid object?", options: ["Primary", "Secondary", "Tertiary", "Quaternary"], answer: ["Tertiary"], type: "single", category: "Ch 26: MOI", section: "Trauma", rationale: "Primary is the wave; secondary is shrapnel; tertiary is the body being thrown." },
    { q: "The 'Lethal Triad' in trauma consists of: (Select all that apply)", options: ["Acidosis", "Coagulopathy", "Hypothermia", "Hypertension"], answer: ["Acidosis", "Coagulopathy", "Hypothermia"], type: "multiple", category: "Ch 27: Bleeding", section: "Trauma", rationale: "These three conditions feed into each other to cause death in major trauma." },
    { q: "Traumatic Asphyxia is caused by:", options: ["Neck compression", "Severe sudden crushing force to the chest", "Drowning", "Carbon Monoxide"], answer: ["Severe sudden crushing force to the chest"], type: "single", category: "Ch 31: Chest", section: "Trauma", rationale: "Chest compression forces blood back into the neck and face, causing bulging eyes and purple skin." },
    { q: "An AEMT should suspect a 'scaphoid' abdomen in which condition?", options: ["Liver laceration", "Diaphragmatic rupture", "Pregnancy", "Spleen rupture"], answer: ["Diaphragmatic rupture"], type: "single", category: "Ch 32: Abdomen", section: "Trauma", rationale: "If abdominal contents move into the chest through a hole in the diaphragm, the abdomen will appear hollow (scaphoid)." }
    // ... Additional questions can be added here following this same syntax.
// --- ADDITIONAL FOUNDATIONS (CH 1-6) ---
  {
    q: "Which document establishes the 'Scope of Practice' for an AEMT within a specific state?",
    options: ["NHTSA National Standard Curriculum", "The State EMS Office / Medical Practice Act", "The NREMT Handbook", "The Federal Department of Transportation"],
    answer: ["The State EMS Office / Medical Practice Act"],
    type: "single", category: "Ch 1: EMS Systems", section: "Foundations",
    rationale: "While NHTSA provides a national model, the actual legal 'Scope of Practice' is defined by state-specific legislation and the State EMS Office."
  },
  {
    q: "A patient refuses care but appears to have a life-threatening injury and is currently altered. Under which legal doctrine can you treat this patient?",
    options: ["Expressed Consent", "Informed Consent", "Implied Consent", "Involuntary Consent"],
    answer: ["Implied Consent"],
    type: "single", category: "Ch 3: Legal", section: "Foundations",
    rationale: "Implied consent applies when a patient is unable to give expressed consent due to being unconscious or significantly altered, and a life-threat exists."
  },
  {
    q: "You are ordered by a physician to give a medication that you know is outside your scope of practice. What is your best course of action?",
    options: ["Administer the medication as ordered by the higher authority", "Respectfully refuse and notify the physician it is outside your scope", "Administer half the dose to be safe", "Document that the doctor told you to do it and proceed"],
    answer: ["Respectfully refuse and notify the physician it is outside your scope"],
    type: "single", category: "Ch 3: Legal", section: "Foundations",
    rationale: "An AEMT is legally responsible for their own actions. You cannot perform a skill or give a med outside your state-defined scope, regardless of who orders it."
  },
  {
    q: "What is the difference between Libel and Slander?",
    options: ["Libel is spoken; Slander is written", "Libel is written; Slander is spoken", "Libel is a physical act; Slander is verbal", "There is no legal difference"],
    answer: ["Libel is written; Slander is spoken"],
    type: "single", category: "Ch 3: Legal", section: "Foundations",
    rationale: "Libel is the act of defaming someone in writing; Slander is the act of defaming someone verbally."
  },
  {
    q: "In the 'Five Stages of Grief,' which stage involves a patient trying to make a deal to postpone the inevitable?",
    options: ["Denial", "Bargaining", "Anger", "Depression"],
    answer: ["Bargaining"],
    type: "single", category: "Ch 2: Wellness", section: "Foundations",
    rationale: "Bargaining is the third stage of the Kübler-Ross model where the patient tries to negotiate for more time."
  },

  // --- ADDITIONAL PATHOPHYSIOLOGY: ACID-BASE BALANCE (CH 7) ---
  {
    q: "A patient has been hypoventilating due to an opioid overdose. Which acid-base imbalance is most likely occurring?",
    options: ["Respiratory Alkalosis", "Respiratory Acidosis", "Metabolic Alkalosis", "Metabolic Acidosis"],
    answer: ["Respiratory Acidosis"],
    type: "single", category: "Ch 7: Patho", section: "Pathophysiology",
    rationale: "Hypoventilation causes the retention of CO2. Since CO2 is an acid (it turns into carbonic acid in the blood), the pH drops, causing respiratory acidosis."
  },
  

[Image of respiratory acidosis vs alkalosis chart]

  {
    q: "An AEMT is treating a patient with DKA who is breathing rapidly (Kussmaul's). This respiratory pattern is an attempt to compensate for which condition?",
    options: ["Metabolic Acidosis", "Metabolic Alkalosis", "Respiratory Acidosis", "Hypoxemia"],
    answer: ["Metabolic Acidosis"],
    type: "single", category: "Ch 7: Patho", section: "Pathophysiology",
    rationale: "In DKA, the body produces ketones (acids). The lungs try to 'blow off' CO2 (acid) through rapid, deep breathing to raise the pH back to normal."
  },
  {
    q: "Which of the following is the primary chemical buffer system in the human body?",
    options: ["The Protein Buffer System", "The Bicarbonate Buffer System", "The Phosphate Buffer System", "The Hemoglobin Buffer System"],
    answer: ["The Bicarbonate Buffer System"],
    type: "single", category: "Ch 7: Patho", section: "Pathophysiology",
    rationale: "The Bicarbonate-Carbonic Acid buffer system is the fastest and most important extracellular buffer for maintaining blood pH."
  },
  {
    q: "A patient is hyperventilating due to extreme anxiety. Their EtCO2 is 22 mmHg. Which acid-base state are they in?",
    options: ["Respiratory Alkalosis", "Respiratory Acidosis", "Metabolic Acidosis", "Normal pH"],
    answer: ["Respiratory Alkalosis"],
    type: "single", category: "Ch 7: Patho", section: "Pathophysiology",
    rationale: "Blowing off too much CO2 (hypocapnia) removes acid from the blood, causing the pH to rise into an alkalotic state."
  },
  {
    q: "What is the normal pH range of human arterial blood?",
    options: ["7.0 - 7.1", "7.35 - 7.45", "7.45 - 7.55", "6.8 - 7.8"],
    answer: ["7.35 - 7.45"],
    type: "single", category: "Ch 7: Patho", section: "Pathophysiology",
    rationale: "The body must maintain a tight pH window between 7.35 and 7.45 for cellular enzymes to function."
  },

  // --- ADDITIONAL MEDICAL (CH 16-25) ---
  {
    q: "A patient presents with a sudden onset of facial droop, arm drift, and slurred speech. These symptoms resolved completely in 45 minutes. What did this patient experience?",
    options: ["Ischemic Stroke", "Hemorrhagic Stroke", "Transient Ischemic Attack (TIA)", "Hypoglycemic event"],
    answer: ["Transient Ischemic Attack (TIA)"],
    type: "single", category: "Ch 19: Neurologic", section: "Medical",
    rationale: "A TIA (mini-stroke) involves stroke-like symptoms that resolve completely without permanent damage, usually within 24 hours."
  },
  {
    q: "Which type of seizure involves the entire brain and is characterized by a loss of consciousness and alternating muscle contraction/relaxation?",
    options: ["Absence Seizure", "Simple Partial Seizure", "Generalized Tonic-Clonic Seizure", "Complex Partial Seizure"],
    answer: ["Generalized Tonic-Clonic Seizure"],
    type: "single", category: "Ch 19: Neurologic", section: "Medical",
    rationale: "Formerly known as 'grand mal,' these seizures involve the whole brain and the classic jerking motions (tonicity and clonicity)."
  },
  {
    q: "A patient describes their abdominal pain as 'tearing' and says it radiates straight through to their back. Their BP is 190/110 in the right arm and 140/90 in the left arm. Suspect:",
    options: ["Acute Myocardial Infarction", "Aortic Dissection", "Kidney Stones", "Cholecystitis"],
    answer: ["Aortic Dissection"],
    type: "single", category: "Ch 18: Cardiovascular", section: "Medical",
    rationale: "The 'tearing' sensation and a significant difference in blood pressure between arms are classic signs of a thoracic aortic dissection."
  },
  {
    q: "Which medication is typically the first-line AEMT intervention for a patient in active, life-threatening anaphylaxis?",
    options: ["Diphenhydramine (Benadryl) IV", "Albuterol via Nebulizer", "Epinephrine 1:1,000 IM", "Methylprednisolone (Solu-Medrol)"],
    answer: ["Epinephrine 1:1,000 IM"],
    type: "single", category: "Ch 22: Immunology", section: "Medical",
    rationale: "Epinephrine is the only medication that works fast enough to reverse the life-threatening bronchoconstriction and vasodilation of anaphylaxis."
  },
  {
    q: "A patient has a 'moon-face' appearance, a 'buffalo hump' on their back, and high blood glucose. These are hallmark signs of:",
    options: ["Addison's Disease", "Cushing's Syndrome", "Grave's Disease", "Myxedema"],
    answer: ["Cushing's Syndrome"],
    type: "single", category: "Ch 21: Endocrine", section: "Medical",
    rationale: "Cushing's is caused by an overproduction of cortisol (hyperadrenalism), leading to weight gain in specific areas (face and upper back)."
  }
];

// --- LOGIC ---
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
        slider.value = availableCount > 20 ? 20 : availableCount;
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
