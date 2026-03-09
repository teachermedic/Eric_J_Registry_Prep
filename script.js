const quizData = [
    // --- FOUNDATIONS (Chapters 1-6) ---
    { q: "Accidental Death and Disability (1966) is famously known as:", options: ["The Orange Book", "The White Paper", "The EMS Charter", "The NHTSA Guide"], answer: ["The White Paper"], type: "single", category: "Ch 1: EMS Systems", section: "Foundations", rationale: "This paper identified accidental death as a 'neglected disease' and spurred EMS growth." },
    { q: "Which EMS level is trained in IV therapy and limited advanced meds?", options: ["EMR", "EMT", "AEMT", "Paramedic"], answer: ["AEMT"], type: "single", category: "Ch 1: EMS Systems", section: "Foundations", rationale: "AEMTs bridge basic and advanced life support." },
    { q: "What is the primary way to prevent disease transmission?", options: ["Gloves", "Handwashing", "Gowns", "Masks"], answer: ["Handwashing"], type: "single", category: "Ch 2: Safety", section: "Foundations", rationale: "Hand hygiene is the #1 clinical defense." },
    { q: "What are the four elements of Negligence?", options: ["Duty to act", "Breach of duty", "Damages", "Proximate cause"], answer: ["Duty to act", "Breach of duty", "Damages", "Proximate cause"], type: "multiple", category: "Ch 3: Legal", section: "Foundations", rationale: "Negligence requires all 4 components: Duty, Breach, Damages, and Proximate Cause." },
    { q: "In SBAR, what does 'B' stand for?", options: ["Basic Info", "Background", "Body System", "Blood Pressure"], answer: ["Background"], type: "single", category: "Ch 4: Communications", section: "Foundations", rationale: "SBAR = Situation, Background, Assessment, Recommendation." },
    { q: "What does the prefix 'hypo-' mean?", options: ["Above", "Below", "Fast", "Slow"], answer: ["Below"], type: "single", category: "Ch 5: Terminology", section: "Foundations", rationale: "Hypo (low/below) vs Hyper (high/above)." },
    { q: "Which lifting technique uses the legs and an upright back?", options: ["Power grip", "Power lift", "Deadlift", "Shoulder lift"], answer: ["Power lift"], type: "single", category: "Ch 6: Lifting", section: "Foundations", rationale: "Legs are strongest; back must remain straight." },

    // --- PATHOPHYSIOLOGY (Chapter 7) ---
    { q: "What is the primary product of anaerobic metabolism?", options: ["Lactic Acid", "ATP", "Glucose", "Oxygen"], answer: ["Lactic Acid"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "Without oxygen, cells produce lactic acid and very little energy." },
    { q: "Shock caused by widespread vasodilation is categorized as:", options: ["Hypovolemic", "Distributive", "Cardiogenic", "Obstructive"], answer: ["Distributive"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "Anaphylaxis and Sepsis are types of distributive shock." },
    { q: "A pulmonary embolism causes which type of shock?", options: ["Hypovolemic", "Distributive", "Cardiogenic", "Obstructive"], answer: ["Obstructive"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "A physical block to flow is obstructive shock." },

    // --- CH 16: MEDICAL OVERVIEW ---
    {
      q: "When evaluating the Nature of Illness (NOI), what is the AEMT's primary goal during the scene size-up and initial encounter?",
      options: ["Determine the exact diagnosis", "Identify life-threats and determine if the patient is medical or trauma", "Complete a full head-to-toe assessment", "Administer symptom-specific medications"],
      answer: ["Identify life-threats and determine if the patient is medical or trauma"],
      type: "single", category: "Ch 16: Medical Overview", section: "Medical",
      rationale: "The NOI helps focus the assessment, but the primary goal remains identifying life-threats and the general category of the emergency."
    },
    {
      q: "Which of the following patients should be considered high-priority for immediate transport? (Select all that apply)",
      options: ["A patient with a GCS of 15 and stable vital signs", "A patient with an obstructed airway that cannot be cleared", "A patient with signs of poor perfusion or shock", "A patient who is unresponsive and cannot follow commands"],
      answer: ["A patient with an obstructed airway that cannot be cleared", "A patient with signs of poor perfusion or shock", "A patient who is unresponsive and cannot follow commands"],
      type: "multiple", category: "Ch 16: Medical Overview", section: "Medical",
      rationale: "Unresponsiveness, airway obstruction, and poor perfusion are critical findings requiring immediate transport."
    },

    // --- CH 17: RESPIRATORY EMERGENCIES ---
    {
      q: "How does Continuous Positive Airway Pressure (CPAP) improve oxygenation in a patient with acute pulmonary edema?",
      options: ["By increasing heart rate to improve cardiac output", "By forcing fluid out of the alveoli and back into the pulmonary capillaries", "By providing 100% oxygen via a closed system", "By causing systemic vasodilation to lower blood pressure"],
      answer: ["By forcing fluid out of the alveoli and back into the pulmonary capillaries"],
      type: "single", category: "Ch 17: Respiratory", section: "Medical",
      rationale: "CPAP uses extrinsic PEEP to push interstitial fluid from the alveoli back into the vasculature, improving gas exchange."
    },
    
    {
      q: "A 60-year-old male with COPD presents with pursed-lip breathing, a barrel chest, and extreme thinness. These findings are most characteristic of:",
      options: ["Chronic Bronchitis", "Emphysema", "Pneumonia", "Pulmonary Embolism"],
      answer: ["Emphysema"],
      type: "single", category: "Ch 17: Respiratory", section: "Medical",
      rationale: "Emphysema (often called 'pink puffers') involves destruction of alveoli and air trapping, leading to a barrel chest and thin appearance due to high work of breathing."
    },
    {
      q: "Which of the following are classic risk factors for a Pulmonary Embolism? (Select all that apply)",
      options: ["Recent long-distance travel", "Oral contraceptive use", "Recent surgery or immobilization", "Active smoking history"],
      answer: ["Recent long-distance travel", "Oral contraceptive use", "Recent surgery or immobilization", "Active smoking history"],
      type: "multiple", category: "Ch 17: Respiratory", section: "Medical",
      rationale: "Virchow's Triad (stasis, hypercoagulability, and vessel wall injury) drives PE risk; all listed factors contribute to these conditions."
    },
    
    {
      q: "A patient presents with sudden onset sharp chest pain, decreased breath sounds on the right side, and tachycardia. There is no history of trauma. You should suspect:",
      options: ["Spontaneous Pneumothorax", "Acute Myocardial Infarction", "Tension Pneumothorax", "Pericarditis"],
      answer: ["Spontaneous Pneumothorax"],
      type: "single", category: "Ch 17: Respiratory", section: "Medical",
      rationale: "Sudden pleuritic pain and unilateral decreased breath sounds in a non-trauma patient are classic for a spontaneous pneumothorax."
    },
    {
      q: "What is the primary physiological trigger for breathing in a healthy individual without chronic lung disease?",
      options: ["Low oxygen levels in the blood", "High carbon dioxide levels in the blood", "Low pH of the cerebrospinal fluid", "High bicarbonate levels in the blood"],
      answer: ["High carbon dioxide levels in the blood"],
      type: "single", category: "Ch 17: Respiratory", section: "Medical",
      rationale: "The healthy respiratory drive is triggered by the brain's sensitivity to rising CO2 levels."
    },

    // --- CH 18: CARDIOVASCULAR EMERGENCIES ---
    {
      q: "What is the primary goal of administering Aspirin to a patient with suspected Acute Coronary Syndrome?",
      options: ["To provide immediate pain relief", "To dissolve the existing thrombus in the coronary artery", "To prevent further aggregation of platelets at the site of plaque rupture", "To lower the patient's blood pressure"],
      answer: ["To prevent further aggregation of platelets at the site of plaque rupture"],
      type: "single", category: "Ch 18: Cardiovascular", section: "Medical",
      rationale: "Aspirin is an antiplatelet agent; it prevents the clot from getting larger by making platelets 'less sticky.'"
    },
    {
      q: "A patient presents with JVD, peripheral edema, and an enlarged liver. These are hallmark signs of:",
      options: ["Left-sided heart failure", "Right-sided heart failure", "Acute Myocardial Infarction", "Aortic Dissection"],
      answer: ["Right-sided heart failure"],
      type: "single", category: "Ch 18: Cardiovascular", section: "Medical",
      rationale: "Right-sided heart failure causes blood to back up into the systemic circulation, leading to JVD and dependent edema."
    },
    

[Image of right-sided heart failure symptoms]

    {
      q: "Which symptoms are commonly associated with an Abdominal Aortic Aneurysm (AAA) that is beginning to leak? (Select all that apply)",
      options: ["Sudden, severe back or abdominal pain", "A pulsating mass in the abdomen", "Unequal femoral pulses", "Crushing substernal chest pressure"],
      answer: ["Sudden, severe back or abdominal pain", "A pulsating mass in the abdomen", "Unequal femoral pulses"],
      type: "multiple", category: "Ch 18: Cardiovascular", section: "Medical",
      rationale: "AAA presents with abdominal/back pain and a pulsating mass. Substernal pressure is associated with thoracic issues or MI."
    },
    {
      q: "In the cardiac conduction system, which structure acts as the 'gatekeeper' to slow down the impulse before it enters the ventricles?",
      options: ["SA Node", "AV Node", "Bundle of His", "Purkinje Fibers"],
      answer: ["AV Node"],
      type: "single", category: "Ch 18: Cardiovascular", section: "Medical",
      rationale: "The AV node delays the electrical impulse to allow the ventricles time to fill with blood from the atria."
    },
    

[Image of cardiac conduction system]

    {
      q: "You are treating a patient with suspected MI who is hypotensive (BP 88/54). Which medication is CONTRAINDICATED?",
      options: ["Aspirin", "Oxygen", "Nitroglycerin", "Fentanyl"],
      answer: ["Nitroglycerin"],
      type: "single", category: "Ch 18: Cardiovascular", section: "Medical",
      rationale: "Nitroglycerin is a potent vasodilator and should not be given to patients with a systolic BP below 90-100 mmHg."
    },

    // --- CH 19: NEUROLOGIC EMERGENCIES ---
    {
      q: "By definition, the symptoms of a Transient Ischemic Attack (TIA) must resolve within what time frame?",
      options: ["1 hour", "12 hours", "24 hours", "48 hours"],
      answer: ["24 hours"],
      type: "single", category: "Ch 19: Neurologic", section: "Medical",
      rationale: "A TIA is a temporary blockage; neurological deficits must resolve completely within 24 hours."
    },
    {
      q: "Which of the following are components of the 'AEIOU-TIPS' mnemonic for altered mental status? (Select all that apply)",
      options: ["Epilepsy", "Insulin", "Overdose", "Trauma"],
      answer: ["Epilepsy", "Insulin", "Overdose", "Trauma"],
      type: "multiple", category: "Ch 19: Neurologic", section: "Medical",
      rationale: "The mnemonic covers Alcohol/Acidosis, Epilepsy/Endocrine/Electrolytes, Insulin, Opiates/Overdose, Uremia, Trauma/Temperature, Infection, Psychogenic/Poisoning, Stroke/Shock/Seizure."
    },
    {
      q: "A patient is unresponsive to voice but withdraws from painful stimuli, has no eye opening, and makes incomprehensible sounds. What is their GCS score?",
      options: ["6", "8", "9", "11"],
      answer: ["8"],
      type: "single", category: "Ch 19: Neurologic", section: "Medical",
      rationale: "Eye: 1 (none), Verbal: 2 (incomprehensible), Motor: 4 (withdraws from pain) = 7. If choosing 8, verify motor 'withdraws' vs 'localizes'."
    },
    {
      q: "Which type of seizure is characterized by a brief lapse of consciousness, often seen as 'staring into space' with no loss of muscle tone?",
      options: ["Generalized tonic-clonic", "Absence seizure", "Simple partial seizure", "Status epilepticus"],
      answer: ["Absence seizure"],
      type: "single", category: "Ch 19: Neurologic", section: "Medical",
      rationale: "Absence seizures (petit mal) are brief and involve minimal movement, common in children."
    },
    {
      q: "A 'thunderclap' headache followed by rapid loss of consciousness is highly suspicious for which condition?",
      options: ["Ischemic stroke", "Subarachnoid hemorrhage", "Bacterial meningitis", "Classic migraine"],
      answer: ["Subarachnoid hemorrhage"],
      type: "single", category: "Ch 19: Neurologic", section: "Medical",
      rationale: "A subarachnoid hemorrhage often causes the 'worst headache of life' due to arterial bleeding into the subarachnoid space."
    },

    // --- CH 20: GI AND UROLOGIC EMERGENCIES ---
    {
      q: "Referred pain to the right shoulder is a classic sign of which abdominal condition?",
      options: ["Appendicitis", "Cholecystitis", "Pancreatitis", "Diverticulitis"],
      answer: ["Cholecystitis"],
      type: "single", category: "Ch 20: GI/Urologic", section: "Medical",
      rationale: "Inflammation of the gallbladder (cholecystitis) can irritate the diaphragm, causing referred pain to the right shoulder."
    },
    {
      q: "A patient with chronic renal failure presents with severe muscle weakness and palpitations after missing two dialysis sessions. What electrolyte imbalance is most likely?",
      options: ["Hypernatremia", "Hyperkalemia", "Hypocalcemia", "Hypomagnesemia"],
      answer: ["Hyperkalemia"],
      type: "single", category: "Ch 20: GI/Urologic", section: "Medical",
      rationale: "Dialysis removes potassium; when missed, life-threatening levels of potassium (hyperkalemia) can build up, affecting heart rhythm."
    },
    {
      q: "Which findings are consistent with peritonitis? (Select all that apply)",
      options: ["Abdominal rigidity", "Rebound tenderness", "Fever", "Frequent watery diarrhea"],
      answer: ["Abdominal rigidity", "Rebound tenderness", "Fever"],
      type: "multiple", category: "Ch 20: GI/Urologic", section: "Medical",
      rationale: "Peritonitis (inflammation of the abdominal lining) causes 'board-like' rigidity, rebound tenderness, and systemic signs of infection like fever."
    },
    {
      q: "A patient complains of sudden onset, 'tearing' abdominal pain that radiates to the back and describes it as the worst pain they have ever felt. You should prioritize:",
      options: ["Pain management with narcotics", "Assessing for a pulsating abdominal mass and unequal pulses", "Administering oral glucose", "Checking for Murphy's sign"],
      answer: ["Assessing for a pulsating abdominal mass and unequal pulses"],
      type: "single", category: "Ch 20: GI/Urologic", section: "Medical",
      rationale: "These are signs of an Aortic Dissection or leaking AAA, which are immediate surgical emergencies."
    },
    {
      q: "Bright red blood in the stool, typically indicating a lower GI bleed, is known as:",
      options: ["Hematemesis", "Melena", "Hematochezia", "Hemoptysis"],
      answer: ["Hematochezia"],
      type: "single", category: "Ch 20: GI/Urologic", section: "Medical",
      rationale: "Hematochezia is bright red blood in the stool. Melena is dark, tarry stool (upper GI). Hematemesis is vomiting blood."
    },

    // --- CH 21: ENDOCRINE AND HEMATOLOGIC EMERGENCIES ---
    {
      q: "Which clinical finding is unique to Diabetic Ketoacidosis (DKA) compared to Hyperglycemic Hyperosmolar Nonketotic Syndrome (HHNS)?",
      options: ["Extreme hyperglycemia (>600 mg/dL)", "Altered mental status", "Kussmaul respirations", "Severe dehydration"],
      answer: ["Kussmaul respirations"],
      type: "single", category: "Ch 21: Endocrine/Hem", section: "Medical",
      rationale: "Kussmaul respirations occur only in DKA as the body tries to compensate for metabolic acidosis; HHNS does not typically involve significant ketoacidosis."
    },
    
    {
      q: "A patient with Sickle Cell Disease is in severe pain. What is the underlying pathophysiology of a 'vaso-occlusive crisis'?",
      options: ["Acute blood loss from internal bleeding", "Misshapen red blood cells getting stuck in small blood vessels", "A sudden drop in the total number of white blood cells", "The destruction of platelets by the spleen"],
      answer: ["Misshapen red blood cells getting stuck in small blood vessels"],
      type: "single", category: "Ch 21: Endocrine/Hem", section: "Medical",
      rationale: "Sickled RBCs are rigid and clog capillaries, leading to tissue ischemia and extreme pain."
    },
    {
      q: "Which of the following are contraindications for the administration of oral glucose? (Select all that apply)",
      options: ["The patient is unconscious", "The patient is unable to swallow", "The patient's blood glucose is 45 mg/dL", "The patient has a suspected stroke"],
      answer: ["The patient is unconscious", "The patient is unable to swallow"],
      type: "multiple", category: "Ch 21: Endocrine/Hem", section: "Medical",
      rationale: "Airway protection is the priority. If a patient cannot swallow or is unconscious, oral glucose is an aspiration risk."
    },
    {
      q: "Polyuria, polydipsia, and polyphagia are the 'classic triad' of which condition?",
      options: ["Hypoglycemia", "Hyperglycemia", "Sickle Cell Crisis", "Hypothyroidism"],
      answer: ["Hyperglycemia"],
      type: "single", category: "Ch 21: Endocrine/Hem", section: "Medical",
      rationale: "These represent excessive urination, thirst, and hunger associated with high blood glucose."
    },

    // --- CH 22: IMMUNOLOGIC EMERGENCIES ---
    {
      q: "What are the two most definitive clinical criteria that differentiate anaphylaxis from a simple allergic reaction?",
      options: ["Hives and itching", "Nausea and abdominal cramping", "Airway compromise and hypotension", "Localized swelling and tachycardia"],
      answer: ["Airway compromise and hypotension"],
      type: "single", category: "Ch 22: Immunologic", section: "Medical",
      rationale: "Anaphylaxis is systemic and life-threatening, specifically involving respiratory failure or circulatory shock."
    },
    {
      q: "Epinephrine causes which of the following physiological effects? (Select all that apply)",
      options: ["Vasoconstriction", "Bronchodilation", "Increased heart rate", "Decreased capillary permeability"],
      answer: ["Vasoconstriction", "Bronchodilation", "Increased heart rate", "Decreased capillary permeability"],
      type: "multiple", category: "Ch 22: Immunologic", section: "Medical",
      rationale: "Epi stimulates Alpha-1 (vasoconstriction), Beta-1 (HR), and Beta-2 (bronchodilation) and stabilizes mast cells."
    },
    {
      q: "A biphasic reaction in anaphylaxis refers to:",
      options: ["A reaction involving both the skin and the respiratory system", "A recurrence of symptoms after initial resolution without further exposure", "A reaction that only occurs after the second exposure to an allergen", "When a patient requires two doses of Epinephrine"],
      answer: ["A recurrence of symptoms after initial resolution without further exposure"],
      type: "single", category: "Ch 22: Immunologic", section: "Medical",
      rationale: "Up to 20% of anaphylaxis patients experience a 'second wave' of symptoms hours after the initial reaction."
    },
    {
      q: "Which of the following chemical mediators is primarily responsible for the vasodilation and increased capillary permeability seen in anaphylaxis?",
      options: ["Insulin", "Histamine", "Dopamine", "Acetylcholine"],
      answer: ["Histamine"],
      type: "single", category: "Ch 22: Immunologic", section: "Medical",
      rationale: "Histamine is released by mast cells and basophils, causing the classic signs of allergic and anaphylactic reactions."
    },

    // --- CH 23: TOXICOLOGY ---
    {
      q: "A patient presents with pinpoint pupils, shallow respirations (4/min), and a GCS of 3. Which toxidrome is most likely?",
      options: ["Sympathomimetic", "Anticholinergic", "Opioid", "Cholinergic"],
      answer: ["Opioid"],
      type: "single", category: "Ch 23: Toxicology", section: "Medical",
      rationale: "The 'Opioid Triad' consists of CNS depression, respiratory depression, and miosis (pinpoint pupils)."
    },
    
    {
      q: "Why is pulse oximetry unreliable in a patient with suspected carbon monoxide (CO) poisoning?",
      options: ["CO causes the blood to turn dark blue, which the sensor cannot read", "The pulse oximeter cannot distinguish between oxyhemoglobin and carboxyhemoglobin", "CO prevents the patient from breathing, so there is no pulse", "CO causes severe vasoconstriction in the fingers"],
      answer: ["The pulse oximeter cannot distinguish between oxyhemoglobin and carboxyhemoglobin"],
      type: "single", category: "Ch 23: Toxicology", section: "Medical",
      rationale: "Pulse oximeters see the hemoglobin is saturated but can't tell if it's with oxygen or CO."
    },
    {
      q: "Which of the following are symptoms of the Cholinergic toxidrome (e.g., organophosphate poisoning)? (Select all that apply)",
      options: ["Salivation", "Lacrimation (tearing)", "Urination", "Defecation"],
      answer: ["Salivation", "Lacrimation (tearing)", "Urination", "Defecation"],
      type: "multiple", category: "Ch 23: Toxicology", section: "Medical",
      rationale: "The mnemonic SLUDGEM (Salivation, Lacrimation, Urination, Defecation, GI upset, Emesis, Miosis) covers these symptoms."
    },
    
    {
      q: "Which of the following is an ABSOLUTE contraindication for the administration of activated charcoal?",
      options: ["The patient is 12 years old", "The patient has ingested a corrosive acid or base", "The patient has a history of asthma", "The ingestion occurred 45 minutes ago"],
      answer: ["The patient has ingested a corrosive acid or base"],
      type: "single", category: "Ch 23: Toxicology", section: "Medical",
      rationale: "Activated charcoal should not be given for corrosives (it can hide burns during endoscopy) or if the patient cannot protect their airway."
    },

    // --- CH 24: PSYCHIATRIC EMERGENCIES ---
    {
      q: "What is the primary responsibility of an AEMT when responding to a patient in a behavioral crisis?",
      options: ["To diagnose the specific mental health disorder", "To ensure the safety of themselves, their partner, and the patient", "To provide immediate chemical restraint", "To convince the patient that their hallucinations are not real"],
      answer: ["To ensure the safety of themselves, their partner, and the patient"],
      type: "single", category: "Ch 24: Psychiatric", section: "Medical",
      rationale: "Safety is the priority in all psychiatric calls. You cannot treat the patient if the scene is unsafe."
    },
    {
      q: "A patient presenting with hyperthermia, tachycardia, extreme agitation, and supernatural strength is likely experiencing:",
      options: ["Acute Psychosis", "Agitated Delirium", "Generalized Anxiety Disorder", "Post-Traumatic Stress Disorder"],
      answer: ["Agitated Delirium"],
      type: "single", category: "Ch 24: Psychiatric", section: "Medical",
      rationale: "Agitated (or excited) delirium is a medical emergency often involving stimulants, presenting with metabolic acidosis and hyperthermia."
    },

    // --- CH 25: GYNECOLOGIC EMERGENCIES ---
    {
      q: "A 24-year-old female presents with severe lower abdominal pain and vaginal spotting. Her last menstrual period was 7 weeks ago. You must assume:",
      options: ["Pelvic Inflammatory Disease", "Ectopic Pregnancy", "Mittelschmerz", "Ovarian Cyst"],
      answer: ["Ectopic Pregnancy"],
      type: "single", category: "Ch 25: Gynecologic", section: "Medical",
      rationale: "Abdominal pain and bleeding in a female of child-bearing age is an ectopic pregnancy until proven otherwise in the ER."
    },
    

[Image of ectopic pregnancy anatomy]

    {
      q: "Which symptoms are characteristic of Pelvic Inflammatory Disease (PID)? (Select all that apply)",
      options: ["Foul-smelling vaginal discharge", "A 'shuffling' gait when walking", "Severe lower abdominal pain", "Fever and chills"],
      answer: ["Foul-smelling vaginal discharge", "A 'shuffling' gait when walking", "Severe lower abdominal pain", "Fever and chills"],
      type: "multiple", category: "Ch 25: Gynecologic", section: "Medical",
      rationale: "PID is an infection of the upper reproductive tract; the 'PID shuffle' is a common sign due to pain during movement."
    },
    {
      q: "When treating a victim of sexual assault, the AEMT's medical priority is to:",
      options: ["Gather evidence for the police", "Examine the genitalia in detail", "Address life-threats and provide psychological support", "Interview the patient about the suspect's identity"],
      answer: ["Address life-threats and provide psychological support"],
      type: "single", category: "Ch 25: Gynecologic", section: "Medical",
      rationale: "The AEMT's role is medical treatment and support; evidence collection is the role of specialized nurses (SANEs) at the hospital."
    },
    {
      q: "A patient describes sharp, localized abdominal pain that occurs mid-cycle during ovulation. This is known as:",
      options: ["Endometriosis", "Amenorrhea", "Mittelschmerz", "Dysmenorrhea"],
      answer: ["Mittelschmerz"],
      type: "single", category: "Ch 25: Gynecologic", section: "Medical",
      rationale: "Mittelschmerz is German for 'middle pain' and refers to the discomfort some women feel during ovulation."
    }
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
    
    // Count questions
    const filtered = topic === "All" ? quizData : quizData.filter(i => i.section === topic);
    const count = filtered.length;
    
    slider.max = count;
    if (parseInt(slider.value) > count) {
        slider.value = count;
    }
    updateSliderLabel(slider.value);
    console.log("Slider Updated. Topic:", topic, "Available Questions:", count);
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

// THE UNLOCK COMMAND
window.onload = adjustSliderRange;
