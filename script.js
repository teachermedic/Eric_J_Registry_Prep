const quizData = [
    // --- FOUNDATIONS & LEGAL ---
    { q: "Accidental Death and Disability (1966) is famously known as:", options: ["The Orange Book", "The White Paper", "The EMS Charter", "The NHTSA Guide"], answer: ["The White Paper"], type: "single", category: "EMS Systems", section: "Foundations", rationale: "This paper identified accidental death as a 'neglected disease' and spurred EMS growth." },
    { q: "Which EMS level is trained in IV therapy and limited advanced meds?", options: ["EMR", "EMT", "AEMT", "Paramedic"], answer: ["AEMT"], type: "single", category: "EMS Systems", section: "Foundations", rationale: "AEMTs bridge basic and advanced life support." },
    { q: "What is the primary way to prevent disease transmission?", options: ["Gloves", "Handwashing", "Gowns", "Masks"], answer: ["Handwashing"], type: "single", category: "Safety", section: "Foundations", rationale: "Hand hygiene is the #1 clinical defense." },
    { q: "What element of neglect is violated if you hand off care of a patient to a lesser trained healthcare professional?", options: ["Duty to act", "Breach of duty", "Damages", "Proximate cause"], answer: ["Breach of duty"], type: "multiple", category: "Legal", section: "Foundations", rationale: "Breach of duty occurs when handing off patient care to a lesser trained healthcare professional. This is also known as patient abandonment." },
    { q: "In SBAR, what does 'B' stand for?", options: ["Basic Info", "Background", "Body System", "Blood Pressure"], answer: ["Background"], type: "single", category: "Communications", section: "Foundations", rationale: "SBAR = Situation, Background, Assessment, Recommendation." },
    { q: "Which lifting technique uses the legs and an upright back?", options: ["Power grip", "Power lift", "Deadlift", "Shoulder lift"], answer: ["Power lift"], type: "single", category: "Lifting", section: "Foundations", rationale: "Legs are strongest; back must remain straight." },
    { q: "Which document establishes the 'Scope of Practice' for an AEMT within a specific state?", options: ["NHTSA Curriculum", "The State EMS Office / Medical Practice Act", "NREMT Handbook", "Federal DOT"], answer: ["The State EMS Office / Medical Practice Act"], type: "single", category: "EMS Systems", section: "Foundations", rationale: "State legislation defines the actual legal scope of practice." },
    { q: "A patient refuses care and is able to answer questions but has slurred speech with repetitive questioning. You should treat this patient under which of the following:", options: ["Expressed Consent", "Informed Consent", "Implied Consent", "Involuntary Consent"], answer: ["Implied Consent"], type: "single", category: "Legal", section: "Foundations", rationale: "Decision-making capacity is a patient’s functional ability to understand, appreciate, reason, and communicate choices regarding medical treatment. It is required for informed consent, while implied consent (e.g., in emergencies) applies when capacity is absent, and action is immediately necessary to save life or limb." },
    { q: "What is the difference between Libel and Slander?", options: ["Libel is spoken; Slander is written", "Libel is written; Slander is spoken", "Physical vs Verbal", "No difference"], answer: ["Libel is written; Slander is spoken"], type: "single", category: "Legal", section: "Foundations", rationale: "Libel = Written defamation; Slander = Spoken defamation." },
    { q: "In the 'Five Stages of Grief,' which stage involves a patient trying to make a deal to postpone the inevitable?", options: ["Denial", "Bargaining", "Anger", "Depression"], answer: ["Bargaining"], type: "single", category: "Wellness", section: "Foundations", rationale: "Bargaining is the third stage of the Kübler-Ross model." },
    { q: "Which federal document provides the 'National EMS Scope of Practice Model' that states use to create their laws?", options: ["The White Paper", "NHTSA DOT Booklet", "The National EMS Education Standards", "The EMS Agenda for the Future"], answer: ["The National EMS Education Standards"], type: "single", category: "EMS Systems", section: "Foundations", rationale: "NHTSA's National EMS Education Standards define the minimum competencies for each level." },
    { q: "AEMT care is typically required to be provided under the license of a:", options: ["Fire Chief", "Medical Director", "Service Director", "Nursing Supervisor"], answer: ["Medical Director"], type: "single", category: "EMS Systems", section: "Foundations", rationale: "Medical Directors provide the legal authority for AEMTs to practice." },
    { q: "Assault is defined legally as:", options: ["Touching a patient without consent", "Placing a patient in fear of bodily harm", "Causing physical injury to a patient", "Kidnapping a patient"], answer: ["Placing a patient in fear of bodily harm"], type: "single", category: "Legal", section: "Foundations", rationale: "Assault is the threat; Battery is the actual physical touching." },
    // --- PATHOPHYSIOLOGY ---
    { q: "What is the primary product of anaerobic metabolism?", options: ["Lactic Acid", "ATP", "Glucose", "Oxygen"], answer: ["Lactic Acid"], type: "single", category: "Patho", section: "Pathophysiology", rationale: "Without oxygen, cells produce lactic acid and very little energy." },
    { q: "Shock caused by widespread vasodilation is categorized as:", options: ["Hypovolemic", "Distributive", "Cardiogenic", "Obstructive"], answer: ["Distributive"], type: "single", category: "Patho", section: "Pathophysiology", rationale: "Anaphylaxis and Sepsis are types of distributive shock." },
    { q: "A patient hypoventilating from an opioid OD is likely in:", options: ["Respiratory Alkalosis", "Respiratory Acidosis", "Metabolic Alkalosis", "Metabolic Acidosis"], answer: ["Respiratory Acidosis"], type: "single", category: "Patho", section: "Pathophysiology", rationale: "CO2 retention leads to a drop in pH, causing respiratory acidosis." },
    { q: "Kussmaul respirations in DKA are an attempt to compensate for:", options: ["Metabolic Acidosis", "Metabolic Alkalosis", "Respiratory Acidosis", "Hypoxemia"], answer: ["Metabolic Acidosis"], type: "single", category: "Patho", section: "Pathophysiology", rationale: "Rapid breathing 'blows off' CO2 (acid) to raise blood pH." },
    { q: "Which of the following is the primary chemical buffer system in the human body?", options: ["Protein", "Bicarbonate", "Phosphate", "Hemoglobin"], answer: ["Bicarbonate"], type: "single", category: "Patho", section: "Pathophysiology", rationale: "The Bicarbonate-Carbonic Acid system is the most important extracellular buffer." },
    { q: "A hyperventilating patient with an EtCO2 of 22 is in:", options: ["Respiratory Alkalosis", "Respiratory Acidosis", "Metabolic Acidosis", "Normal state"], answer: ["Respiratory Alkalosis"], type: "single", category: "Patho", section: "Pathophysiology", rationale: "Excessive loss of CO2 removes acid, raising the pH." },
    { q: "What is the normal pH range of human arterial blood?", options: ["7.0 - 7.1", "7.35 - 7.45", "7.45 - 7.55", "6.8 - 7.8"], answer: ["7.35 - 7.45"], type: "single", category: "Patho", section: "Pathophysiology", rationale: "This narrow window is essential for cellular enzyme function." },
    { q: "A COPD patient is retaining CO2. This results in an increase of which ion in the blood?", options: ["Sodium", "Hydrogen", "Bicarbonate", "Potassium"], answer: ["Hydrogen"], type: "single", category: "Patho", section: "Pathophysiology", rationale: "CO2 combines with water to form carbonic acid, which dissociates into Hydrogen ions." },
    { q: "Which organ system is responsible for the 'Long-term' compensation of acid-base imbalances?", options: ["The Lungs", "The Kidneys", "The Liver", "The Pancreas"], answer: ["The Kidneys"], type: "single", category: "Patho", section: "Pathophysiology", rationale: "The kidneys adjust pH by excreting or retaining Hydrogen and Bicarbonate." },
    { q: "In a state of Acidosis, the heart becomes:", options: ["More sensitive to Epinephrine", "Less responsive to catecholamines", "Hyper-excitable", "More efficient at pumping"], answer: ["Less responsive to catecholamines"], type: "single", category: "Patho", section: "Pathophysiology", rationale: "Acidosis decreases myocardial contractility." },
    { q: "The Bicarbonate Buffer System manages pH by balancing which two components?", options: ["Oxygen and Nitrogen", "Carbon Dioxide and Bicarbonate", "Sodium and Potassium", "Calcium and Magnesium"], answer: ["Carbon Dioxide and Bicarbonate"], type: "single", category: "Patho", section: "Pathophysiology", rationale: "Lungs regulate CO2 and kidneys regulate Bicarbonate." },
//-----Open Review Box Style Questions----
    // --- SHOCK PATHOPHYSIOLOGY ---
{
  q: "A sudden drop in cardiac output due to a massive Pulmonary Embolism (PE) is a classic example of which type of shock?",
  answer: "Obstructive Shock.",
  type: "open-review",
  onlyStudy: true,
  category: "Patho",
  section: "Pathophysiology",
  rationale: "In obstructive shock, the heart is capable of pumping, but a mechanical obstruction (like a large clot in the pulmonary artery) prevents blood from flowing through the system.",
  cheatSheet: "OBSTRUCTIVE SHOCK: A 'plumbing' block. Common causes: Tension Pneumothorax, Cardiac Tamponade, and PE."
},

// --- ELECTROLYTES: POTASSIUM ---
{
  q: "What is the primary intracellular cation in the human body?",
  answer: "Potassium ($K^+$).",
  type: "open-review",
  onlyStudy: true,
  category: "Patho",
  section: "Pathophysiology",
  rationale: "Potassium is the major positive ion inside the cells. Maintaining the gradient between intracellular $K^+$ and extracellular $Na^+$ is vital for electrical signaling in muscles and nerves.",
  cheatSheet: "ELECTROLYTES: Potassium (K+) = Inside the cell. Sodium (Na+) = Outside the cell."
},

// --- CELLULAR METABOLISM ---
{
  q: "What cellular process occurs when cells are forced to switch to metabolism without a sufficient oxygen supply?",
  answer: "Anaerobic Metabolism.",
  type: "open-review",
  onlyStudy: true,
  category: "Patho",
  section: "Pathophysiology",
  rationale: "Without oxygen, the cell cannot enter the Krebs cycle efficiently. It switches to anaerobic metabolism, which produces only 2 ATP (versus 36) and creates lactic acid as a waste product.",
  cheatSheet: "ANAEROBIC: 'An-' (without) 'aerobic' (oxygen). High waste, low energy."
},

// --- ACID-BASE BALANCE ---
{
  q: "An accumulation of lactic acid in the blood leads to which specific acid-base condition?",
  answer: "Metabolic Acidosis.",
  type: "open-review",
  onlyStudy: true,
  category: "Patho",
  section: "Pathophysiology",
  rationale: "As lactic acid builds up, the blood pH drops. Because the source of the acid is cellular metabolism rather than a respiratory failure, it is classified as metabolic acidosis.",
  cheatSheet: "METABOLIC ACIDOSIS: Low pH caused by metabolic byproducts (like Lactic Acid or Ketones)."
},

// --- BUFFER SYSTEMS ---
{
  q: "What is the primary chemical buffer system used by the human body to maintain pH balance?",
  answer: "The Bicarbonate Buffer System.",
  type: "open-review",
  onlyStudy: true,
  category: "Patho",
  section: "Pathophysiology",
  rationale: "The body uses a balance of Carbonic Acid ($H_2CO_3$) and Bicarbonate ($HCO_3^-$) to neutralize acids and bases in the blood almost instantaneously.",
  cheatSheet: "BUFFERING: The Bicarbonate system is the fastest way the body handles pH shifts before the lungs or kidneys take over."
},

// --- CALCIUM & NEUROMUSCULAR ---
{
  q: "Low serum calcium levels (hypocalcemia) can lead to involuntary muscle spasms, a condition known as?",
  answer: "Tetany.",
  type: "open-review",
  onlyStudy: true,
  category: "Patho",
  section: "Pathophysiology",
  rationale: "Calcium is necessary for proper muscle contraction and relaxation. When levels are too low, nerve membranes become hypersensitive, leading to involuntary contractions or spasms.",
  cheatSheet: "TETANY: Muscle 'tension' caused by low Calcium. Look for Trousseau's or Chvostek's signs."
},

// --- SEPSIS MECHANISM ---
{
  q: "What is the primary underlying vascular mechanism that leads to septic shock?",
  answer: "Widespread vasodilation due to a systemic infection.",
  type: "open-review",
  onlyStudy: true,
  category: "Patho",
  section: "Pathophysiology",
  rationale: "Toxins from the infection trigger a massive inflammatory response, causing blood vessels throughout the body to dilate. This increases the size of the 'container,' leading to relative hypovolemia.",
  cheatSheet: "SEPTIC SHOCK: Distributive shock. The 'pipes' get too big for the amount of fluid available."
},

// --- ENDOTHELIAL FAILURE ---
{
  q: "During sepsis, endothelial tight junctions begin to fail and contract. What are the two primary clinical consequences of this cellular action?",
  answer: "Capillary leak and hypotension.",
  type: "open-review",
  onlyStudy: true,
  category: "Patho",
  section: "Pathophysiology",
  rationale: "When the junctions 'open,' fluid leaks out of the intravascular space and into the interstitial tissue (edema). This loss of fluid directly causes the blood pressure to drop.",
  cheatSheet: "CAPILLARY LEAK: The 'sieve' effect. Fluid leaves the blood vessels, causing low BP and tissue swelling."
},

// --- SEPSIS TO MODS ---
{
  q: "Describe the pathophysiology of how sepsis progresses to Multiple Organ Dysfunction Syndrome (MODS).",
  answer: "Inflammatory signals trigger the clotting cascade throughout the body, forming tiny microclots in small vessels. These clots block blood flow to vital organs, leading to ischemia and failure.",
  type: "open-review",
  onlyStudy: true,
  category: "Patho",
  section: "Pathophysiology",
  rationale: "MODS is often the result of micro-vascular thrombi (tiny clots) that act like thousands of miniature emboli, starving organs of oxygenated blood.",
  cheatSheet: "MODS: Organ failure caused by microscopic 'traffic jams' in the blood vessels."
},

// --- DISSEMINATED INTRAVASCULAR COAGULATION ---
{
  q: "Define DIC (Disseminated Intravascular Coagulation) and explain why it causes uncontrollable bleeding.",
  answer: "DIC occurs when clotting factors are completely used up by widespread microclots, leaving the body unable to clot elsewhere, leading to paradoxical, uncontrollable bleeding.",
  type: "open-review",
  onlyStudy: true,
  category: "Patho",
  section: "Pathophysiology",
  rationale: "It is a consumption coagulopathy. The body 'uses up' its ability to clot in one area (microclots), so it bleeds from everywhere else (IV sites, gums, etc.).",
  cheatSheet: "DIC: Clotting and bleeding at the same time. A late-stage, high-mortality complication."
},

// --- HYPOKALEMIA CAUSES ---
{
  q: "List three common clinical causes of hypokalemia (low potassium).",
  answer: "1. Extrarenal loss (vomiting/diarrhea), 2. Insulin administration (shifts $K^+$ into cells), 3. Renal loss (diuretic use).",
  type: "open-review",
  onlyStudy: true,
  category: "Patho",
  section: "Pathophysiology",
  rationale: "Insulin is a potent trigger for the Na+/K+ pump; when we give insulin (e.g., in DKA), we must monitor potassium levels closely as they can drop dangerously fast.",
  cheatSheet: "HYPOKALEMIA: Low K+. Watch for this in patients on 'water pills' (diuretics) or those with severe GI distress."
},
    
    // --- GRID: CONSENT TYPES ---
{ 
    q: "Match the following patient scenarios to the correct type of legal consent.",
    type: "grid",
    category: "Legal",
    section: "Foundations",
    rows: [
        "An alert 22-year-old female who requests help for a broken arm",
        "A 60-year-old male who is unconscious and in cardiac arrest",
        "A 5-year-old child at school with no parent present",
        "A patient being treated under a psychiatric hold or court order"
    ],
    cols: ["Expressed", "Implied", "Involuntary"],
    answer: [
        "An alert 22-year-old female who requests help for a broken arm|Expressed",
        "A 60-year-old male who is unconscious and in cardiac arrest|Implied",
        "A 5-year-old child at school with no parent present|Implied",
        "A patient being treated under a psychiatric hold or court order|Involuntary"
    ],
    rationale: "Expressed consent requires an alert patient. Implied consent assumes a patient (or their guardian) would want life-saving care if they were capable of deciding. Involuntary consent applies to those legally detained.",
    cheatSheet: "CONSENT CHEAT: Expressed = Words/Actions. Implied = Unconscious/Minor alone. Involuntary = Police/Court involved."
},

// --- GRID: ELEMENTS OF NEGLIGENCE ---
{ 
    q: "Identify which element of negligence is described by each clinical or legal finding.",
    type: "grid",
    category: "Legal",
    section: "Foundations",
    rows: [
        "The medic had a legal obligation to provide care",
        "The medic failed to follow the established Standard of Care",
        "The patient suffered a verifiable physical or financial loss",
        "The medic's specific action (or inaction) directly caused the harm"
    ],
    cols: ["Duty to Act", "Breach of Duty", "Proximate Cause", "Damages"],
    answer: [
        "The medic had a legal obligation to provide care|Duty to Act",
        "The medic failed to follow the established Standard of Care|Breach of Duty",
        "The patient suffered a verifiable physical or financial loss|Damages",
        "The medic's specific action (or inaction) directly caused the harm|Proximate Cause"
    ],
    rationale: "All four elements must be proven in a court of law for a negligence claim to succeed.",
    cheatSheet: "NEGLIGENCE: Duty (Job) + Breach (Mistake) + Cause (Your fault) + Damage (Injury)."
},

// --- EVOLVING SCENARIO: THE RISKY REFUSAL (3 PARTS) ---
{ 
    q: "[LEGAL PART 1] You are treating a 45-year-old male with a history of heart disease who is experiencing chest pain. He is alert and oriented x4. He states he does not want to go to the hospital. Your first priority is to:", 
    options: ["Have him sign a refusal form immediately", "Assess his clinical capacity to make an informed decision", "Call the police to force him to go", "Tell him he will die if he stays"], 
    answer: ["Assess his clinical capacity to make an informed decision"], 
    type: "single", category: "Legal", section: "Foundations", chainID: "Refusal_1", 
    rationale: "Before a patient can refuse, you must determine if they possess 'capacity'—the ability to understand the risks and benefits of their choice.",
    cheatSheet: "REFUSAL STEPS: 1. Capacity? 2. Informed of risks? 3. Alternatives offered? 4. Signature/Witness?"
},
{ 
    q: "[LEGAL PART 2] The patient has clear capacity but still refuses transport. You have explained the risks of death. Before leaving the scene, you should:", 
    options: ["Tell him you can no longer help him", "Offer an alternative plan, such as having a family member drive him", "Keep his 12-lead to prove he was sick", "Threaten him with a bill for the call"], 
    answer: ["Offer an alternative plan, such as having a family member drive him"], 
    type: "single", category: "Legal", section: "Foundations", chainID: "Refusal_1", 
    rationale: "Part of an 'informed refusal' is providing alternatives to EMS transport so the patient isn't left without any options for care.",
    cheatSheet: "PATIENT RIGHTS: Patients with capacity have the 'Right to Refuse' even if that choice results in death."
},
{ 
    q: "[LEGAL PART 3] If you were to leave the scene without explaining the risks or having the patient sign a refusal form, you could be held liable for:", 
    options: ["Assault", "Battery", "Abandonment", "Kidnapping"], 
    answer: ["Abandonment"], 
    type: "single", category: "Legal", section: "Foundations", chainID: "Refusal_1", 
    rationale: "Abandonment occurs when you terminate care without the patient's consent or without ensuring they have a higher or equal level of care.",
    cheatSheet: "ABANDONMENT: Termination of the medic-patient relationship without consent or a proper handoff."
},
    // --- TERMINOLOGY (OPEN TEXT) ---
    { q: "Medical term for 'a heart rate below 60 beats per minute.'", options: [], answer: ["Bradycardia"], type: "text", category: "Terminology", section: "Terminology", rationale: "Brady- (slow) + -cardia (heart)." },
    { q: "Medical term for 'a heart rate above 100 beats per minute.'", options: [], answer: ["Tachycardia"], type: "text", category: "Terminology", section: "Terminology", rationale: "Tachy- (fast) + -cardia (heart)." },
    { q: "Medical term for 'difficulty or labored breathing.'", options: [], answer: ["Dyspnea"], type: "text", category: "Terminology", section: "Terminology", rationale: "Dys- (difficult) + -pnea (breathing)." },
    { q: "Medical term for 'the absence of breathing.'", options: [], answer: ["Apnea"], type: "text", category: "Terminology", section: "Terminology", rationale: "A- (without) + -pnea (breathing)." },
    { q: "Medical term for 'vomiting blood.'", options: [], answer: ["Hematemesis"], type: "text", category: "Terminology", section: "Terminology", rationale: "Hemat- (blood) + -emesis (vomiting)." },
    { q: "Medical term for 'blood in the urine.'", options: [], answer: ["Hematuria"], type: "text", category: "Terminology", section: "Terminology", rationale: "Hemat- (blood) + -uria (urine)." },
    { q: "Medical term for 'enlargement of the liver.'", options: [], answer: ["Hepatomegaly"], type: "text", category: "Terminology", section: "Terminology", rationale: "Hepat- (liver) + -megaly (enlarged)." },
    { q: "Medical term for 'inflammation of the gallbladder.'", options: [], answer: ["Cholecystitis"], type: "text", category: "Terminology", section: "Terminology", rationale: "Chole- (bile) + cyst- (sac) + -itis (inflammation)." },
    { q: "Medical term for 'excessive sweating.'", options: [], answer: ["Diaphoresis"], type: "text", category: "Terminology", section: "Terminology", rationale: "diaphoresis is used to describe sweating. 'Diaphor' is Greek meaning through or to carry off. 'Esis' means condition" },
    { q: "Medical term for 'blood in the chest cavity.'", options: [], answer: ["Hemothorax"], type: "text", category: "Terminology", section: "Terminology", rationale: "Hemo- (blood) + -thorax (chest)." },
    { q: "Medical term for 'low levels of oxygen in the tissues.'", options: [], answer: ["Hypoxia"], type: "text", category: "Terminology", section: "Terminology", rationale: "Hypo- (low) + oxia (oxygen)." },
    { q: "Medical term for 'bluish discoloration of the skin due to low oxygen.'", options: [], answer: ["Cyanosis"], type: "text", category: "Terminology", section: "Terminology", rationale: "Cyan- (blue) + -osis (condition)." },
    { q: "Medical term for 'a new surgical opening in the stomach.'", options: [], answer: ["Gastrostomy"], type: "text", category: "Terminology", section: "Terminology", rationale: "Gastr- (stomach) + -stomy (new opening)." },
    { q: "Medical term for 'the muscle layer of the heart.'", options: [], answer: ["Myocardium"], type: "text", category: "Terminology", section: "Terminology", rationale: "Myo- (muscle) + -cardium (heart)." },
    { q: "Medical term for 'any disease of the kidneys.'", options: [], answer: ["Nephropathy"], type: "text", category: "Terminology", section: "Terminology", rationale: "Nephr- (kidney) + -pathy (disease)." },
    { q: "Medical term for 'excessive production of urine.'", options: [], answer: ["Polyuria"], type: "text", category: "Terminology", section: "Terminology", rationale: "Poly- (many) + -uria (urine)." },
    { q: "Medical term for 'difficulty breathing when lying flat.'", options: [], answer: ["Orthopnea"], type: "text", category: "Terminology", section: "Terminology", rationale: "Often seen in CHF patients." },
    { q: "Medical term for 'a respiratory rate that is slower than normal.'", options: [], answer: ["Bradypnea"], type: "text", category: "Terminology", section: "Terminology", rationale: "Brady- (slow) + -pnea (breathing)." },
    { q: "Medical term for 'a respiratory rate that is faster than normal.'", options: [], answer: ["Tachypnea"], type: "text", category: "Terminology", section: "Terminology", rationale: "Tachy- (fast) + -pnea (breathing)." },
    { q: "Medical term for 'excessive or profuse bleeding.'", options: [], answer: ["Hemorrhage"], type: "text", category: "Terminology", section: "Terminology", rationale: "Hemo- (blood) + -rrhage (bursting forth)." },

    // --- MEDICAL ---
    { q: "A 70-year-old male presents with extreme dyspnea, waking up gasping for air. Sitting bolt-upright, pink, frothy sputum. BP 190/104. Interventions? (Select all that apply)", options: ["Supine position", "CPAP at 5-10 cmH2O", "Nitroglycerin", "Non-rebreather mask", "Albuterol"], answer: ["CPAP at 5-10 cmH2O", "Nitroglycerin", "Non-rebreather mask"], type: "multiple", category: "Cardiovascular", section: "Medical", rationale: "ADHF requires pressure and preload reduction." },
    { q: "Worsening fatigue, JVD, and bilateral pedal edema in a COPD patient indicates:", options: ["Left-Sided Heart Failure", "Right-Sided Heart Failure", "Acute Bronchitis", "Pneumothorax"], answer: ["Right-Sided Heart Failure"], type: "single", category: "Cardiovascular", section: "Medical", rationale: "Right failure causes systemic backup (JVD, edema)." },
    { q: "How does CPAP improve oxygenation in pulmonary edema?", options: ["Increasing HR", "Forcing fluid out of alveoli", "Improves BP", "Vasodilation"], answer: ["Forcing fluid out of alveoli"], type: "single", category: "Respiratory", section: "Medical", rationale: "Pressure pushes fluid back into the capillaries." },
    { q: "Stroke symptoms that resolve in 45 minutes are:", options: ["Ischemic Stroke", "Hemorrhagic Stroke", "TIA", "Hypoglycemia"], answer: ["TIA"], type: "single", category: "Neurology", section: "Medical", rationale: "TIAs resolve within 24 hours." },
    { q: "Cushing's Syndrome signs:", options: ["Moon-face and buffalo hump", "Weight loss", "Low glucose", "Hypotension"], answer: ["Moon-face and buffalo hump"], type: "single", category: "Endocrine", section: "Medical", rationale: "Caused by excess cortisol." },
    { q: "Tearing back pain and unequal BPs in arms indicates:", options: ["Heart Attack", "Aortic Dissection", "Kidney Stones", "Gallstones"], answer: ["Aortic Dissection"], type: "single", category: "Cardiovascular", section: "Medical", rationale: "Classic signs of dissection." },
    { q: "Twitching facial nerve (Chvostek's sign) indicates:", options: ["Hypocalcemia", "Hypercalcemia", "Hypokalemia", "Hyperkalemia"], answer: ["Hypocalcemia"], type: "single", category: "Assessment", section: "Medical", rationale: "Indicates neuromuscular excitability." },
    { q: "Lethargic patient, rapid deep respirations, high glucose. First priority?", options: ["BVM", "Open/secure airway", "Hyperventilate", "Check pupils"], answer: ["Open/secure airway"], type: "single", category: "Endocrine", section: "Medical", rationale: "Airway is always first." },
    { 
    q: "A 68-year-old female presents with sudden onset of orthopnea and a cough producing pink, frothy sputum. Vitals: BP 188/94, HR 112, RR 28. Listen to the lung sounds obtained during your assessment. What is the underlying pathophysiology?",
    audio: "audio/crackles_pulmonary_edema.mp3",
    options: [
        "Infection-driven inflammation of the bronchioles",
        "Increased hydrostatic pressure forcing fluid into the alveoli",
        "Spasmodic constriction of the lower reactive airways",
        "Loss of elasticity in the alveolar walls causing air trapping"
    ],
    answer: ["Increased hydrostatic pressure forcing fluid into the alveoli"],
    type: "single",
    category: "Respiratory",
    section: "Medical",
    rationale: "The presentation (hypertension, orthopnea, pink sputum) and the sound of crackles indicate Pulmonary Edema. This is caused by the left side of the heart failing, which increases pressure in the pulmonary capillaries and forces fluid into the alveolar spaces.",
    cheatSheet: "CRACKLES (RALES): This is the sound of air 'popping' open fluid-filled alveoli. Think 'Wet/Heart' for Crackles; think 'Dry/Lungs' for Wheezes."
},
    { q: "Mittelschmerz refers to:", options: ["Endometriosis", "Ovulation pain", "Amenorrhea", "PID"], answer: ["Ovulation pain"], type: "single", category: "Gynecology", section: "Medical", rationale: "Localized pain during ovulation." },
{ 
    q: "Compare the clinical findings for Acute Pulmonary Edema (CHF) and a COPD Exacerbation by checking the appropriate boxes.",
    type: "grid",
    category: "Respiratory",
    section: "Medical",
    rows: [
        "Presence of Jugular Venous Distension (JVD)",
        "Productive cough with pink, frothy sputum",
        "Wheezing and a prolonged expiratory phase",
        "History of chronic tobacco use and 'barrel chest'",
        "Improvement with CPAP and Nitroglycerin"
    ],
    cols: ["Pulmonary Edema (CHF)", "COPD Exacerbation"],
    answer: [
        "Presence of Jugular Venous Distension (JVD)|Pulmonary Edema (CHF)",
        "Productive cough with pink, frothy sputum|Pulmonary Edema (CHF)",
        "Wheezing and a prolonged expiratory phase|COPD Exacerbation",
        "History of chronic tobacco use and 'barrel chest'|COPD Exacerbation",
        "Improvement with CPAP and Nitroglycerin|Pulmonary Edema (CHF)"
    ],
    rationale: "CHF is a 'pump' problem leading to fluid backup (JVD, pink sputum). COPD is an 'airflow' problem leading to air trapping (barrel chest, wheezing). While CPAP helps both, Nitro is specific to reducing preload in CHF.",
    cheatSheet: "RESPIRATORY AXIS: CHF = Wet/Hypertensive/JVD. COPD = Dry/Wheezy/Stale Air."
},
    { 
    q: "Compare the clinical presentations of Diabetic Ketoacidosis (DKA) and Hyperosmolar Hyperglycemic Nonketotic Syndrome (HHNS) by checking the appropriate boxes.",
    type: "grid",
    category: "Endocrine",
    section: "Medical",
    rows: [
        "Fruity or Acetone breath odor",
        "Blood glucose levels typically > 600 mg/dL",
        "Kussmaul respirations present",
        "Most commonly associated with Type 2 Diabetes",
        "Significant production of ketones"
    ],
    cols: ["DKA", "HHNS"],
    answer: [
        "Fruity or Acetone breath odor|DKA",
        "Blood glucose levels typically > 600 mg/dL|HHNS",
        "Kussmaul respirations present|DKA",
        "Most commonly associated with Type 2 Diabetes|HHNS",
        "Significant production of ketones|DKA"
    ],
    rationale: "DKA involves the breakdown of fats (ketogenesis) because the body has no insulin, leading to fruity breath and Kussmaul breathing. HHNS involves extreme hyperglycemia without significant ketosis, usually in Type 2 patients.",
    cheatSheet: "DIABETIC TRIAGE: DKA = Acidosis, Ketones, Kussmaul. HHNS = Extreme Sugar (>600), Extreme Dehydration, No Ketones."
},
    { 
    q: "[MEDICAL PART 1] You are treating a 19-year-old male who was stung by a bee. He has hives (urticaria) on his neck and complains of 'itchy' throat. Vitals: BP 122/80, HR 104, RR 20. Breath sounds are clear. The most appropriate initial medication is:", 
    options: ["Epinephrine 1:1,000 IM", "Diphenhydramine (Benadryl) 25-50mg", "Albuterol 2.5mg via Nebulizer", "Epinephrine 1:10,000 IV"], 
    answer: ["Diphenhydramine (Benadryl) 25-50mg"], 
    type: "single", category: "Immunology", section: "Medical", chainID: "Anaphy_1", 
    rationale: "At this stage, the patient has an allergic reaction but NO signs of airway compromise or shock. Benadryl is the correct choice for simple allergic reactions.",
    cheatSheet: "ALLERGY VS ANAPHYLAXIS: No airway/cardiovascular involvement = Allergy. Involvement of 2+ systems = Anaphylaxis."
},
{ 
    q: "[MEDICAL PART 2] While monitoring, the patient begins to exhibit inspiratory stridor and his BP drops to 88/50. His heart rate is now 128. You should immediately administer:", 
    options: ["Epinephrine 1:1,000 0.3mg IM", "Epinephrine 1:10,000 0.1mg IV", "A second dose of Benadryl", "Normal Saline 500mL Bolus"], 
    answer: ["Epinephrine 1:1,000 0.3mg IM"], 
    type: "single", category: "Immunology", section: "Medical", chainID: "Anaphy_1", 
    rationale: "The development of stridor (airway) and hypotension (circulation) indicates true Anaphylaxis. IM Epinephrine is the gold standard for immediate reversal.",
    cheatSheet: "EPI DOSING: Adult 0.3mg (1:1,000) IM. Pediatric 0.15mg (1:1,000) IM."
},
{ 
    q: "[MEDICAL PART 3] After the Epinephrine, the patient's airway improves, but his BP remains 86/48. You have already started an IV. Your next AEMT intervention is:", 
    options: ["Repeat Epinephrine IM", "Administer a 20 mL/kg Isotonic Fluid Bolus", "Administer Glucagon", "Contact medical control for a Norepinephrine drip"], 
    answer: ["Administer a 20 mL/kg Isotonic Fluid Bolus"], 
    type: "single", category: "Immunology", section: "Medical", chainID: "Anaphy_1", 
    rationale: "Anaphylaxis causes massive vasodilation (relative hypovolemia). Once the airway is stabilized with Epi, fluid resuscitation is needed to support the blood pressure.",
    cheatSheet: "SHOCK IN ANAPHYLAXIS: Fix the vessels with Epi, then fill the 'pipes' with Isotonic Fluid."
},
    { 
    q: "Which of the following clinical findings indicate that a patient has moved from Compensated Shock to Decompensated Shock? (Select all that apply)", 
    options: [
        "Narrowing pulse pressure",
        "Systolic Blood Pressure < 90 mmHg",
        "Marked tachycardia",
        "Altered Mental Status",
        "Delayed capillary refill"
    ], 
    answer: ["Systolic Blood Pressure < 90 mmHg", "Altered Mental Status"], 
    type: "multiple", 
    category: "Patho", 
    section: "Pathophysiology", 
    rationale: "Hypotension and AMS are the two definitive signs that the body's compensatory mechanisms (tachycardia, vasoconstriction) have failed.",
    cheatSheet: "SHOCK STAGES: Compensated = High HR/Normal BP. Decompensated = Low BP/AMS."
},
    { 
    q: "A 22-year-old male is found unresponsive with warm, dry skin. He is breathing deeply at 32 breaths/min. His heart rate is 124 bpm. His lungs are clear and equal. What is the primary pathophysiological reason for his respiratory pattern?",
    options: [
        "Primary respiratory alkalosis to improve oxygenation",
        "Compensatory mechanism to increase blood pH",
        "Direct stimulation of the medulla by high glucose levels",
        "Failure of the sodium-potassium pump in the lungs"
    ],
    answer: ["Compensatory mechanism to increase blood pH"],
    type: "single",
    category: "Patho",
    section: "Pathophysiology",
    rationale: "This patient is likely in DKA (warm/dry skin, deep/rapid Kussmaul respirations). The deep breathing is a metabolic compensation to blow off $CO_2$ (acid), which raises the blood pH back toward a neutral state.",
    cheatSheet: "KUSSMAUL PATHWAY: Metabolic Acidosis -> Body blows off $CO_2$ -> Attempt to raise pH. Look for 'Clear Lungs' to rule out a respiratory cause.",
},
    { 
    q: "[MEDICAL PART 1] You are called to a nursing home for an 82-year-old male with 'altered mental status.' He is hot to the touch. Vitals: BP 110/70, HR 108, RR 24, Temp 102.4 F. EtCO2 is 28 mmHg. This patient is primarily exhibiting signs of:", 
    options: ["Sepsis", "SIRS (Systemic Inflammatory Response Syndrome)", "Septic Shock", "Hypovolemic Shock"], 
    answer: ["SIRS (Systemic Inflammatory Response Syndrome)"], 
    type: "single", category: "Medical", section: "Medical", chainID: "Sepsis_1", 
    rationale: "The patient meets SIRS criteria (High Temp, High HR, High RR, Low EtCO2). While likely caused by an infection, 'Sepsis' specifically requires a suspected source of infection plus SIRS.",
    cheatSheet: "SIRS CRITERIA: Temp >100.4, HR >90, RR >20, EtCO2 <32."
},
{ 
    q: "[MEDICAL PART 2] You find a urinary catheter bag with dark, cloudy urine. The patient’s BP drops to 92/54. You have established IV access. What is the most appropriate initial fluid goal for this AEMT student?", 
    options: ["TKO (To Keep Open) rate", "250 mL bolus to check for response", "30 mL/kg Isotonic Crystalloid bolus", "Wide open until BP reaches 120 systolic"], 
    answer: ["30 mL/kg Isotonic Crystalloid bolus"], 
    type: "single", category: "Medical", section: "Medical", chainID: "Sepsis_1", 
    rationale: "Current national standards for Sepsis management prioritize early, aggressive fluid resuscitation (30 mL/kg) to maintain organ perfusion.",
    cheatSheet: "SEPSIS FLUIDS: 30 mL/kg is the standard 'start' for sepsis-induced hypotension."
},
{ 
    q: "[MEDICAL PART 3] Despite 2 liters of fluid, the patient’s BP is now 78/40 and he is minimally responsive. This stage of the disease is known as:", 
    options: ["Septic Shock", "MODS (Multiple Organ Dysfunction Syndrome)", "Compensated Sepsis", "Refractory Hypotension"], 
    answer: ["Septic Shock"], 
    type: "single", category: "Medical", section: "Medical", chainID: "Sepsis_1", 
    rationale: "Septic Shock is defined as sepsis with persistent hypotension that does not respond to fluid resuscitation.",
    cheatSheet: "SHOCK DEFINITION: Sepsis + Fluid Refractory Hypotension = Septic Shock."
},
    { 
    q: "You are preparing to administer Dextrose to a 4-year-old pediatric patient with a blood glucose of 38 mg/dL. What is the standard concentration and dose per kg for this age group?", 
    options: [], 
    answer: ["D25", "2-4 mL/kg", "D25 2-4 mL/kg"], 
    type: "text", 
    category: "Pharmacology", 
    section: "Medical", 
    rationale: "For pediatrics (1-8 years), D25 at 2-4 mL/kg is the standard. D50 is contraindicated in small children due to its high osmolarity.",
    cheatSheet: "PEDS DEXTROSE: Neonates = D10. Peds (1-8) = D25. Adults = D50." 
},
    // --- Medical Box Review-----
    // --- RESPIRATORY FOUNDATIONS: STRIDOR ---
{
  q: "What are three common clinical causes of inspiratory stridor?",
  answer: "1. Foreign Body Airway Obstruction (FBAO), 2. Anaphylaxis (Laryngeal Edema), 3. Croup (Laryngotracheobronchitis).",
  type: "open-review",
  onlyStudy: true,
  category: "Respiratory",
  section: "Medical",
  rationale: "Stridor is a high-pitched sound indicating an upper airway obstruction. Identifying the cause—whether it's mechanical (object), allergic (swelling), or infectious (croup)—dictates your immediate treatment path.",
  cheatSheet: "STRIDOR = UPPER AIRWAY. If you hear it, the problem is at or above the vocal cords."
},

// --- UPPER AIRWAY SOUNDS ---
{
  q: "List the three primary upper respiratory sounds and what they typically signify.",
  answer: "1. Stridor (obstruction/swelling), 2. Gurgling (fluid/secretions), 3. Snoring (tongue/partial airway obstruction).",
  type: "open-review",
  onlyStudy: true,
  category: "Respiratory",
  section: "Medical",
  rationale: "Upper airway sounds are audible without a stethoscope. Gurgling requires immediate suctioning, while snoring often requires a manual maneuver (Head-tilt/Chin-lift or Jaw-thrust).",
  cheatSheet: "AIRWAY NOISE: Snoring = Tongue. Gurgling = Fluid. Stridor = Tightness/Blockage."
},

// --- MINUTE VOLUME ---
{
  q: "Identify the two components that calculate Minute Volume ($V_E$).",
  answer: "Respiratory Rate (RR) and Tidal Volume ($V_T$).",
  type: "open-review",
  onlyStudy: true,
  category: "Respiratory",
  section: "Medical",
  rationale: "Minute volume is the total amount of air moved in one minute. If either the rate or the volume drops significantly, the patient will enter respiratory failure.",
  cheatSheet: "MINUTE VOLUME: RR x TV = $V_E$. You need both 'speed' and 'depth' to stay alive."
},

// --- TIDAL VOLUME ---
{
  q: "Define 'Tidal Volume' in the context of respiratory assessment.",
  answer: "The amount of air that is moved into or out of the lungs during a single breath.",
  type: "open-review",
  onlyStudy: true,
  category: "Respiratory",
  section: "Medical",
  rationale: "For a healthy adult, average tidal volume is approximately 500 mL. In the field, we assess this by observing 'adequate chest rise and fall.'",
  cheatSheet: "TIDAL VOLUME: Depth of a single breath. No chest rise = No tidal volume."
},

// --- RESPIRATORY ACIDOSIS ---
{
  q: "What is the pathophysiology of Respiratory Acidosis?",
  answer: "A pathologic condition caused by an accumulation of $CO_2$ in the body, typically resulting from hypoventilation (low minute volume).",
  type: "open-review",
  onlyStudy: true,
  category: "Respiratory",
  section: "Medical",
  rationale: "When a patient doesn't breathe enough, they 'retain' $CO_2$. Since $CO_2$ is an acid when mixed with blood, the body's pH drops, leading to acidosis.",
  cheatSheet: "RESP ACIDOSIS: Low breathing = High $CO_2$ = Low pH (Acidic).",
  link: "https://ericjm.substack.com/p/acid-base-balance-for-aemts"
},

// --- RESPIRATORY ALKALOSIS ---
{
  q: "Define Respiratory Alkalosis and provide a common clinical example.",
  answer: "A pathologic condition caused by the excessive loss of $CO_2$ (base accumulation), typically due to hyperventilation (e.g., anxiety-induced tachypnea).",
  type: "open-review",
  onlyStudy: true,
  category: "Respiratory",
  section: "Medical",
  rationale: "Blowing off too much $CO_2$ makes the blood too alkaline (basic). This can lead to carpopedal spasms and tingling in the extremities.",
  cheatSheet: "RESP ALKALOSIS: High breathing = Low $CO_2$ = High pH (Basic)."
},

// --- INTERVENTION: SHALLOW BREATHING ---
{
  q: "What is the preferred intervention for a patient presenting with shallow breathing and an altered mental status?",
  answer: "Assist ventilations with positive pressure ventilations (BVM).",
  type: "open-review",
  onlyStudy: true,
  category: "Respiratory",
  section: "Medical",
  rationale: "Shallow breathing indicates inadequate tidal volume. Oxygen via NRB is useless if the air isn't reaching the alveoli. You must use a Bag-Valve Mask (BVM) to force air into the lungs.",
  cheatSheet: "SHALLOW BREATHING: This is a 'Volume' problem. Don't just give $O_2$; use the BVM to provide the volume."
},
    // --- CARDIAC CHAIN ---
    { q: "[CARDIAC PART 1] A 68-year-old female with 'heavy' chest pressure and nausea. Pale/diaphoretic. BP 140/90. Initial priority?", options: ["324mg Aspirin", "12-lead ECG", "O2", "Establish IV"], answer: ["324mg Aspirin"], type: "single", category: "Cardiology", section: "Medical", chainID: "Cardiac_1", rationale: "Early Aspirin is the highest priority.", cheatSheet: "ACS PRIORITY: Aspirin -> 12 Lead -> Nitro." },
    { q: "[CARDIAC PART 2] The patient develops extreme dyspnea and crackles. SpO2 88%, BP 188/100. Next step?", options: ["Albuterol", "CPAP at 5 cmH2O", "BVM", "NRB Mask"], answer: ["CPAP at 5 cmH2O"], type: "single", category: "Cardiology", section: "Medical", chainID: "Cardiac_1", rationale: "Crackles + HTN = Pulmonary Edema.", cheatSheet: "CPAP: Awake, Patent Airway, Tachypnea." },
    { q: "[CARDIAC PART 3] Patient becomes lethargic, RR 6, HR 110. You should:", options: ["Increase CPAP", "Remove CPAP/begin BVM", "Administer Nitro", "Check Glucose"], answer: ["Remove CPAP/begin BVM"], type: "single", category: "Cardiology", section: "Medical", chainID: "Cardiac_1", rationale: "CPAP is contraindicated if patient cannot follow commands.", cheatSheet: "CPAP CONTRA: Unconscious, Resp Arrest." },

    // --- MEDICAL TYPE-INS ---
    { q: "Standard adult dose of Epinephrine 1:1,000 for anaphylaxis? (e.g., 0.5 mg)", options: [], answer: ["0.3 mg"], type: "text", category: "Pharmacology", section: "Medical", rationale: "Adult dose is 0.3 mg IM." },
    { q: "Medical term for 'Shortness of Breath.'", options: [], answer: ["Dyspnea"], type: "text", category: "Terminology", section: "Medical", rationale: "Clinical term for difficulty breathing." },
    { q: "Target EtCO2 range for respiratory distress?", options: [], answer: ["35-45"], type: "text", category: "Respiratory", section: "Medical", rationale: "Normal range is 35-45 mmHg." },

    // --- TOXICOLOGY CHAIN ---
    { q: "[TOXICOLOGY PART 1] Unresponsive male, pinpoint pupils, RR 4. Immediate threat?", options: ["Pupils", "Bradycardia", "Hypoventilation", "Unconsciousness"], answer: ["Hypoventilation"], type: "single", category: "Toxicology", section: "Medical", chainID: "Toxic_1", rationale: "RR of 4 is inadequate.", cheatSheet: "OPIOID TRIAD: Pinpoint Pupils, Resp Depression, AMS." },
    { q: "[TOXICOLOGY PART 2] Partner prepares BVM. You prepare Naloxone. Goal of administration?", options: ["Full arousal", "Restoration of spontaneous breathing", "Reverse pupils", "Prevent withdrawal"], answer: ["Restoration of spontaneous breathing"], type: "single", category: "Toxicology", section: "Medical", chainID: "Toxic_1", rationale: "Goal is adequate breathing.", cheatSheet: "NALOXONE: 0.4mg - 2.0mg. Competitive antagonist." },
    { q: "[TOXICOLOGY PART 3] Patient moans, RR 12, EtCO2 55. You should:", options: ["More Naloxone", "Monitor and O2", "Intubate", "Compressions"], answer: ["Monitor and O2"], type: "single", category: "Toxicology", section: "Medical", chainID: "Toxic_1", rationale: "RR is adequate; high EtCO2 is expected.", cheatSheet: "EtCO2: High indicates CO2 retention." },

    // --- TRAUMA & ENVIRONMENTAL ---
    { q: "Coup-contrecoup injury occurs in which collision?", options: ["First", "Second", "Third (organs vs body wall)", "Fourth"], answer: ["Third (organs vs body wall)"], type: "single", category: "MOI", section: "Trauma", rationale: "Organs strike the interior wall." },
    { q: "Class III Hemorrhage loss percentage?", options: ["15%", "15-30%", "30-40%", ">40%"], answer: ["30-40%"], type: "single", category: "Bleeding", section: "Trauma", rationale: "Compensation starts to fail." },
    { q: "Beck's Triad (JVD, muffled sounds, narrow pulse pressure) indicates:", options: ["Tension Pneumo", "Cardiac Tamponade", "Hemothorax", "Commotio Cordis"], answer: ["Cardiac Tamponade"], type: "single", category: "Chest", section: "Trauma", rationale: "Fluid in pericardial sac." },
    { q: "Kehr's sign (L shoulder pain) indicates:", options: ["Liver", "Spleen", "Kidneys", "Pancreas"], answer: ["Spleen"], type: "single", category: "Abdominal", section: "Trauma", rationale: "Referred phrenic nerve pain." },
    { q: "What are the '6 Ps'? (Select all that apply)", options: ["Pain", "Paresthesia", "Pulselessness", "Pallor", "Paralysis", "Pressure"], answer: ["Pain", "Paresthesia", "Pulselessness", "Pallor", "Paralysis", "Pressure"], type: "multiple", category: "Ortho", section: "Trauma", rationale: "Critical ortho assessment." },
    { q: "Trauma 'Lethal Triad' contains: (Select all that apply)", options: ["Acidosis", "Coagulopathy", "Hypothermia", "Hypertension"], answer: ["Acidosis", "Coagulopathy", "Hypothermia"], type: "multiple", category: "Bleeding", section: "Trauma", rationale: "Trauma death cycle." },
    { q: "Cushing's Triad signs:", options: ["HTN, Bradycardia, Irregular Resp", "HTN, Tachycardia, Rapid Resp", "Hypotension, Bradycardia, JVD", "Hypotension, Tachycardia, Narrow Pulse Pressure"], answer: ["HTN, Bradycardia, Irregular Resp"], type: "single", category: "Head/Spine", section: "Trauma", rationale: "Indicates increased ICP." },
    { q: "Cold-water drowning patient status:", options: ["Dead after 30m", "Warm and dead", "Core 90F", "No shock advised"], answer: ["Warm and dead"], type: "single", category: "Environmental", section: "Trauma", rationale: "Must warm before declaring." },
    { q: "Gas law for 'The Bends':", options: ["Boyle's", "Henry's", "Dalton's", "Charles's"], answer: ["Henry's"], type: "single", category: "Environmental", section: "Trauma", rationale: "Gas solubility principle." },
    { q: "Crush Syndrome pathophysiology:", options: ["Cardiac arrest", "Release of toxins after pressure removal", "Hemorrhage", "Nerve death"], answer: ["Release of toxins after pressure removal"], type: "single", category: "Soft-Tissue", section: "Trauma", rationale: "Myoglobin/Potassium flood." },
    { q: "Kinetic Energy formula:", options: ["Mass x Velocity", "1/2 Mass x Velocity Squared", "Weight x Gravity", "Mass / Velocity"], answer: ["1/2 Mass x Velocity Squared"], type: "single", category: "Physics", section: "Trauma", rationale: "Velocity squared is key." },
    { q: "Burn with red, painful blisters is:", options: ["Superficial", "Partial-thickness", "Full-thickness", "Deep-thickness"], answer: ["Partial-thickness"], type: "single", category: "Soft-Tissue", section: "Trauma", rationale: "2nd degree burn." },
    { q: "Retinal detachment symptom:", options: ["Hyphema", "Curtain over vision", "Blowout Fracture", "Pain"], answer: ["Retinal Detachment"], type: "single", category: "Face/Neck", section: "Trauma",image: "img/retinaldetach.jpg", rationale: "Classic 'curtain' description." },
    { q: "CPP formula involves:", options: ["MAP and ICP", "BP and HR", "EtCO2 and RR", "GCS"], answer: ["MAP and ICP"], type: "single", category: "Head/Spine", section: "Trauma", rationale: "CPP = MAP - ICP." },
    { q: "Tension Pneumo field priority:", options: ["Occlusive dressing", "Needle Decompression", "High-flow O2", "Intubation"], answer: ["Needle Decompression"], type: "single", category: "Chest", section: "Trauma", rationale: "Relieve pressure immediately." },
    { q: "Scaphoid abdomen suggests:", options: ["Ruptured Spleen", "Diaphragmatic Rupture", "Internal bleeding", "Evisceration"], answer: ["Diaphragmatic Rupture"], type: "single", category: "Abdominal", section: "Trauma", rationale: "Organs move into chest." },
    { q: "Open pelvic fracture priority:", options: ["Splint legs", "Pelvic binder", "Tourniquet", "Traction splint"], answer: ["Pelvic binder"], type: "single", category: "Ortho", section: "Trauma", rationale: "Reduce volume/limit bleeding." },
    { q: "Permissive hypotension MAP target:", options: ["40-50", "60-65", "80-90", "110-120"], answer: ["60-65"], type: "single", category: "Shock", section: "Trauma", rationale: "Maintain vital perfusion/protect clot." },
    { q: "Heat Stroke hallmark sign:", options: ["Tachycardia", "Hot skin", "Altered Mental Status", "Cramps"], answer: ["Altered Mental Status"], type: "single", category: "Environmental", section: "Trauma", rationale: "Differentiator from heat exhaustion." },
    { q: "Blown pupil on R indicates:", options: ["Oculomotor nerve compression", "Optic nerve damage", "Sympathetic surge", "Normal"], answer: ["Oculomotor nerve compression"], type: "single", category: "Head/Spine", section: "Trauma", rationale: "ICP compresses 3rd cranial nerve." },
    { q: "Latest 6P sign to develop:", options: ["Pain", "Pallor", "Pulselessness", "Paresthesia"], answer: ["Pulselessness"], type: "single", category: "Ortho", section: "Trauma", rationale: "Very late indicator." },
    { q: "Adult toes fanning out (sole stroke) is:", options: ["Babinski's sign", "Kehr's sign", "Murphy's sign", "Cushing's sign"], answer: ["Babinski's sign"], type: "single", category: "Head/Spine", section: "Trauma", rationale: "Indicates upper motor neuron injury." },
    { q: "Spinal shock definition:", options: ["Neurogenic hypotension", "Temporary loss of reflexes", "Bradycardia", "Paralysis"], answer: ["Temporary loss of reflexes"], type: "single", category: "Head/Spine", section: "Trauma", rationale: "Temporary physiologic state." },
    { q: "Greenstick fracture population:", options: ["Geriatric", "Adult", "Pediatric", "Athletes"], answer: ["Pediatric"], type: "single", category: "Ortho", section: "Trauma", rationale: "Flexible bones." },
    { q: "Mammalian Diving Reflex law:", options: ["Boyle's", "Henry's", "Dalton's", "Charles's"], answer: ["Boyle's"], type: "single", category: "Environmental", section: "Trauma", rationale: "Pressure effects law." },
{ 
    q: "Identify the signs and symptoms associated with the two main stages of heat-related illness.",
    type: "grid",
    category: "Environmental",
    section: "Trauma",
    rows: [
        "Altered Mental Status or Coma",
        "Skin is cool, clammy, and diaphoretic",
        "Skin is hot, red, and potentially dry",
        "Muscle cramps and nausea",
        "Core temperature typically above 104°F (40°C)"
    ],
    cols: ["Heat Exhaustion", "Heat Stroke"],
    answer: [
        "Altered Mental Status or Coma|Heat Stroke",
        "Skin is cool, clammy, and diaphoretic|Heat Exhaustion",
        "Skin is hot, red, and potentially dry|Heat Stroke",
        "Muscle cramps and nausea|Heat Exhaustion",
        "Core temperature typically above 104°F (40°C)|Heat Stroke"
    ],
    rationale: "The presence of AMS is the primary differentiator. Heat Stroke is a true life-threat involving a failure of the body's thermoregulatory system.",
    cheatSheet: "HEAT AXIS: Heat Exhaustion = Wet/Dizzy/Normal Mentation. Heat Stroke = Hot/Dry (or wet)/AMS/Deadly."
},
    { 
    q: "A patient was stabbed in the chest. He presents with distended neck veins, a blood pressure of 82/68, and clear, bilateral breath sounds. Which of the following best describes the underlying pathology?",
    options: [
        "Increased intrathoracic pressure causing a shift of the mediastinum",
        "Accumulation of fluid in the pericardial sac restricting stroke volume",
        "Massive hemorrhage leading to a decrease in preload",
        "Loss of sympathetic tone causing systemic vasodilation"
    ],
    answer: ["Accumulation of fluid in the pericardial sac restricting stroke volume"],
    type: "single",
    category: "Patho",
    section: "Trauma",
    rationale: "The triad of JVD, hypotension, and clear breath sounds indicates Cardiac Tamponade. The pathology is 'obstructive'—the heart cannot fill properly (decreased stroke volume) because it is being squeezed by fluid in the pericardium. Tension Pneumothorax is ruled out by the clear breath sounds.",
    cheatSheet: "BECK'S TRIAD: JVD + Muffled Tones + Hypotension (Narrow Pulse Pressure). If lungs are clear, it's the heart; if lungs are absent on one side, it's a Tension PTX. If you see the word 'hyperresonnance' then that points to a tension pneumothorax.",
},
    { 
    q: "Differentiate between an Epidural Hematoma and a Subdural Hematoma by checking the appropriate boxes.",
    type: "grid",
    category: "Trauma",
    section: "Trauma",
    rows: [
        "Involves arterial bleeding (often the Middle Meningeal Artery)",
        "Involves venous bleeding from bridging veins",
        "Characterized by a 'Lucid Interval' followed by rapid decline",
        "Commonly seen in elderly patients or those on blood thinners",
        "Symptoms usually develop gradually over hours or days"
    ],
    cols: ["Epidural Hematoma", "Subdural Hematoma"],
    answer: [
        "Involves arterial bleeding (often the Middle Meningeal Artery)|Epidural Hematoma",
        "Involves venous bleeding from bridging veins|Subdural Hematoma",
        "Characterized by a 'Lucid Interval' followed by rapid decline|Epidural Hematoma",
        "Commonly seen in elderly patients or those on blood thinners|Subdural Hematoma",
        "Symptoms usually develop gradually over hours or days|Subdural Hematoma"
    ],
    rationale: "Epidural bleeds are arterial and fast, often showing a 'lucid interval' where the patient seems fine before crashing. Subdural bleeds are venous and slower, making them more common in patients with brain atrophy (elderly) or anticoagulation therapy.",
    cheatSheet: "HEAD BLEEDS: Epidural = Arterial/Fast/Lucid. Subdural = Venous/Slow/Elderly."
},
    // --- TRAUMA CHAIN ---
    { q: "[TRAUMA PART 1] Massive pulsing bleed from right thigh in MVA. First action?", options: ["O2", "Tourniquet", "Trauma Assessment", "C-Spine"], answer: ["Tourniquet"], type: "single", category: "Trauma", section: "Trauma", chainID: "Trauma_1", rationale: "X-ABC logic.", cheatSheet: "MARCH: Massive Hemorrhage first." },
    { q: "[TRAUMA PART 2] Bleeding controlled. Absent breath sounds R, JVD, BP 88/60. Suspect?", options: ["Simple Pneumo", "Hemothorax", "Tension Pneumothorax", "Tamponade"], answer: ["Tension Pneumothorax"], type: "single", category: "Trauma", section: "Trauma", chainID: "Trauma_1", rationale: "Absent sounds + JVD + Hypotension.", cheatSheet: "TENSION: Obstructive Shock." },
    { q: "[TRAUMA PART 3] Priority intervention for this trauma patient?", options: ["BVM", "Needle Decompression", "Occlusive Dressing", "Transport"], answer: ["Needle Decompression"], type: "single", category: "Trauma", section: "Trauma", chainID: "Trauma_1", rationale: "Restore output.", cheatSheet: "SITES: 2nd ICS Mid-clavicular." },
{ 
    q: "Differentiate between the clinical findings for a Concussion and a Subdural Hematoma by checking the appropriate boxes.",
    type: "grid",
    category: "Neurology",
    section: "Medical",
    rows: [
        "Temporary loss of consciousness",
        "Symptoms may appear days or weeks later",
        "Gradual increase in Intracranial Pressure",
        "Rapid recovery of neurological function",
        "Nausea, vomiting, and headache"
    ],
    cols: ["Concussion", "Subdural Hematoma"],
    // Format: "Row Name|Column Name"
    answer: [
        "Temporary loss of consciousness|Concussion",
        "Temporary loss of consciousness|Subdural Hematoma",
        "Symptoms may appear days or weeks later|Subdural Hematoma",
        "Gradual increase in Intracranial Pressure|Subdural Hematoma",
        "Rapid recovery of neurological function|Concussion",
        "Nausea, vomiting, and headache|Concussion",
        "Nausea, vomiting, and headache|Subdural Hematoma"
    ],
    rationale: "Concussions typically involve a rapid recovery of function. Subdural hematomas involve venous bleeding that causes a gradual, often delayed, increase in ICP.",
    cheatSheet: "SUBDURAL VS CONCUSSION: Subdurals are VENOUS (slower). Epidurals are ARTERIAL (fast/lucid interval). Concussions are functional, not structural, injuries."
},
    { 
    q: "List the components of Beck's Triad and the condition it signifies.",
    answer: "1. JVD, 2. Muffled Heart Tones, 3. Hypotension (Narrow Pulse Pressure). Signifies Cardiac Tamponade.",
    type: "open-review",
    onlyStudy: true,
    section: "Trauma",
    category: "Trauma",
    rationale: "Recognizing this triad is critical for identifying obstructive shock in the field.",
    cheatSheet: "BECK'S TRIAD: Heart is being squeezed. JVD/Muffled Tones/Low BP."
},
    // --- OB/GYN & PEDIATRICS ---
    { q: "Painless, bright red 3rd trimester bleeding is:", options: ["Abruptio Placentae", "Placenta Previa", "Ectopic", "Preeclampsia"], answer: ["Placenta Previa"], type: "single", category: "Obstetrics", section: "OBPeds", rationale: "Painless/bright red." },
    { q: "Eclampsia differentiator:", options: ["HTN", "Proteinuria", "Seizures", "Edema"], answer: ["Seizures"], type: "single", category: "Obstetrics", section: "OBPeds", rationale: "Seizures mark eclampsia." },
    { q: "Stuck shoulders during delivery:", options: ["Nuchal Cord", "Breech", "Shoulder Dystocia", "Prolapsed Cord"], answer: ["Shoulder Dystocia"], type: "single", category: "Obstetrics", section: "OBPeds", rationale: "Shoulders stuck at symphysis pubis." },
    { q: "Neonatal 2-rescuer CPR ratio:", options: ["3:1", "15:2", "30:2", "5:1"], answer: ["3:1"], type: "single", category: "Neonatal", section: "OBPeds", rationale: "90 comp / 30 breaths." },
    { q: "Neonatal HR 54 after 30s PPV. Action?", options: ["Epi", "Chest Compressions", "More O2", "Continue PPV"], answer: ["Chest Compressions"], type: "single", category: "Neonatal", section: "OBPeds", rationale: "Start compressions if HR < 60." },
    { q: "PAT Triangle components: (Select all that apply)", options: ["Appearance", "Work of Breathing", "Circulation", "BP"], answer: ["Appearance", "Work of Breathing", "Circulation"], type: "multiple", category: "Pediatrics", section: "OBPeds", rationale: "Visual PAT assessment." },
    { q: "Drooling, high fever, tripod position in 3yo:", options: ["Croup", "Epiglottitis", "Asthma", "Bronchiolitis"], answer: ["Epiglottitis"], type: "single", category: "Pediatrics", section: "OBPeds", rationale: "Airway emergency." },
    { q: "Seal-bark cough in infant:", options: ["Croup", "Epiglottitis", "Pneumonia", "Pertussis"], answer: ["Croup"], type: "single", category: "Pediatrics", section: "OBPeds", rationale: "Barking cough/stridor." },
    { q: "Sunken fontanelle sign:", options: ["ICP", "Dehydration", "Meningitis", "Normal"], answer: ["Dehydration"], type: "single", category: "Pediatrics", section: "OBPeds", rationale: "Severe hypovolemia." },
    { q: "Prolapsed cord management:", options: ["Pull cord", "Knee-chest position", "Push back", "Clamp"], answer: ["Place mother in knee-chest position"], type: "single", category: "Obstetrics", section: "OBPeds", rationale: "Relieve cord pressure." },
{ 
    q: "Match the clinical presentation to the correct Obstetrical emergency.",
    type: "grid",
    category: "Obstetrics",
    section: "OBPeds",
    rows: [
        "Painless, bright red vaginal bleeding in the 3rd trimester",
        "Painful, dark red vaginal bleeding with a rigid abdomen",
        "Severe, tearing unilateral abdominal pain with 'referred' shoulder pain",
        "Usually occurs in the 1st trimester; may involve missed menses"
    ],
    cols: ["Placenta Previa", "Abruptio Placentae", "Ectopic Pregnancy"],
    answer: [
        "Painless, bright red vaginal bleeding in the 3rd trimester|Placenta Previa",
        "Painful, dark red vaginal bleeding with a rigid abdomen|Abruptio Placentae",
        "Severe, tearing unilateral abdominal pain with 'referred' shoulder pain|Ectopic Pregnancy",
        "Usually occurs in the 1st trimester; may involve missed menses|Ectopic Pregnancy"
    ],
    rationale: "Previa is painless (placenta covers the opening). Abruption is painful (placenta rips away). Ectopic is an early-term emergency involving a rupture outside the uterus.",
    cheatSheet: "OB BLEEDING: Previa = Painless. Abruption = Awful (Painful). Ectopic = Early (1st Trimester)."
},
    // --- PEDS CHAIN ---
    { 
    q: "A 14-month-old female presents with a low-grade fever and a 'barking' cough that worsens at night. Listen to the audible sound heard during inspiration. At which anatomical location is the obstruction occurring?",
    audio: "audio/stridor.mp3",
    options: [
        "The subglottic airway",
        "The terminal bronchioles",
        "The carinal bifurcation",
        "The pleural space"
    ],
    answer: ["The subglottic airway"],
    type: "single",
    category: "Pediatrics",
    section: "OBPeds",
    rationale: "The sound provided is stridor, which is characteristic of Croup (laryngotracheobronchitis). Pathophysiologically, this is caused by edema and inflammation of the subglottic tissues, just below the vocal cords. Bronchiolar sounds (wheezing) occur in the lower airways.",
    cheatSheet: "STRIDOR VS WHEEZING: Stridor = High-pitched Upper Airway Noise (Inspiratory). Wheezing = Lower Airway (Exhalation)/ Prolonged expiratory phase. If you hear it in the neck, it's Stridor."
},
    { q: "[PEDS PART 1] PAT: Limp, pale, grunting 2yo. Status?", options: ["Distress", "Failure", "Compensated Shock", "Decompensated Shock"], answer: ["Failure"], type: "single", category: "Pediatrics", section: "OBPeds", chainID: "Peds_1", rationale: "2 abnormal PAT segments = Failure.", cheatSheet: "PAT: Appearance, Breathing, Circulation." },
    { q: "[PEDS PART 2] Child begins tonic-clonic seizure. History of fever. Priority?", options: ["Midazolam", "Ice Packs", "Protect Airway/Safety", "Insert OPA"], answer: ["Protect Airway/Safety"], type: "single", category: "Pediatrics", section: "OBPeds", chainID: "Peds_1", rationale: "Safety first.", cheatSheet: "SEIZURE: Airway/O2/Safety." },
    { q: "[PEDS PART 3] Post-seizure child is hot. Best cooling method?", options: ["Immersion", "Alcohol rub", "Remove excess clothing", "Ice packs"], answer: ["Remove excess clothing"], type: "single", category: "Pediatrics", section: "OBPeds", chainID: "Peds_1", rationale: "Passive cooling is safest.", cheatSheet: "COOLING: Avoid shivering." }
// Block Reveal Questions
    
    // --- CARDIOLOGY / SHOCK ---
,{
  q: "List the components of Virchow's Triad and identify the life-threatening respiratory condition it often precedes.",
  answer: "1. Venous Stasis (immobility), 2. Endothelial Injury (surgery/trauma), 3. Hypercoagulability (clotting disorders). It signifies a high risk for Pulmonary Embolism (PE).",
  type: "open-review",
  onlyStudy: true,
  category: "Cardiology",
  section: "Medical",
  rationale: "Understanding the source of a clot helps you differentiate between a primary respiratory issue (like Asthma) and a vascular issue (PE). Look for clear lung sounds with sudden onset hypoxia.",
  cheatSheet: "VIRCHOW'S TRIAD: Clotting risk factors. Think PE if you see sudden SOB + clear lungs + recent surgery.",
  image: "img/virchows_triad.jpg"
},
    // --- RESPIRATORY / CAPNOGRAPHY ---
{
  q: "Describe the 'Shark Fin' waveform on a capnogram and identify the underlying mechanical issue in the lungs.",
  answer: "The Shark Fin waveform shows a slurred alveolar plateau (Phase III). It indicates bronchoconstriction and trapped air.",
  type: "open-review",
  onlyStudy: true,
  category: "Respiratory",
  section: "Medical",
  rationale: "Normal capnography is rectangular. As the airways constrict (Asthma/COPD), it takes longer for $CO_{2}$ to exit the alveoli, causing the 'slurred' upstroke appearance.",
  cheatSheet: "SHARK FIN = Bronchoconstriction. If you see this, reach for the Albuterol."
},

// --- NEUROLOGY / TRAUMA ---
{
  q: "Differentiate between Decorticate and Decerebrate posturing. Which one indicates a more severe brainstem injury?",
  answer: "Decorticate: Flexion (arms move toward the 'core'). Decerebrate: Extension (arms move outward/rotate). Decerebrate is more severe as it indicates lower brainstem involvement.",
  type: "open-review",
  onlyStudy: true,
  category: "Neuro",
  section: "Trauma",
  rationale: "Abnormal posturing is a sign of herniation. Decerebrate (Extension) usually scores a 2 on the GCS motor scale, while Decorticate (Flexion) scores a 3.",
  cheatSheet: "POSTURING: DE-CORE-TICATE (toward the core) vs. EXTENSION (Decerebrate). More extension = More brain injury."
},

// --- OBSTETRICS ---
{
  q: "What is the clinical definition of Eclampsia, and how does it differ from Preeclampsia?",
  answer: "Eclampsia is defined as the onset of tonic-clonic seizures in a patient with preeclampsia. Preeclampsia is the combination of hypertension and proteinuria.",
  type: "open-review",
  onlyStudy: true,
  category: "OBPeds",
  section: "Medical",
  rationale: "The 'E' in Eclampsia stands for 'Event' (the seizure). For an AEMT, management switches from monitoring to active seizure control (Magnesium Sulfate/Benzos) and airway protection.",
  cheatSheet: "PREECLAMPSIA: High BP + Protein. ECLAMPSIA: Seizure. Treatment: Left Lateral Recumbent + Dark/Quiet environment."
}
// --- CARDIAC PATHO: PRELOAD & AFTERLOAD ---
,{
  q: "Explain the Frank-Starling Law of the Heart and how it relates to stroke volume in a healthy patient vs. a patient in chronic heart failure.",
  answer: "The Frank-Starling Law states that the heart will contract with more force as the fibers are stretched (increased Preload). In a healthy heart, more stretch = more stroke volume. In heart failure, the fibers are overstretched and lose elasticity, leading to a decrease in contractility despite high preload.",
  type: "open-review",
  onlyStudy: true,
  category: "Cardiology",
  section: "Foundations",
  rationale: "Understanding this helps students see why we use diuretics (Lasix) or Nitroglycerin to *reduce* preload in CHF patients—we are trying to get the heart back to a functional 'stretch' point.",
  cheatSheet: "FRANK-STARLING: Think of a rubber band. Stretch it to a point and it snaps back hard. Overstretch it too many times, and it becomes loose and weak.",
  image: "img/frank_starling_curve.jpg"
},

// --- CELLULAR PATHO: SHOCK & ACIDOSIS ---
{
  q: "Describe the transition from Aerobic to Anaerobic metabolism during compensated shock. What is the primary waste product of this shift?",
  answer: "When cells are deprived of oxygen (hypoperfusion), they switch from aerobic metabolism (using $O_{2}$) to anaerobic metabolism. This process is much less efficient and produces Lactic Acid as a byproduct, leading to metabolic acidosis.",
  type: "open-review",
  onlyStudy: true,
  category: "Patho",
  section: "Foundations",
  rationale: "This is why we see an increased respiratory rate in shock patients; they are trying to breathe off $CO_{2}$ to compensate for the metabolic acidosis caused by lactic acid buildup ($H^{+}$ ions).",
  cheatSheet: "ANAEROBIC = NO OXYGEN. Waste product = Lactic Acid. Result = Acidosis (The 'A' in the Trauma Triad of Death).",
  link: "https://ericjm.substack.com/p/the-cellular-level-of-shock"
},

// --- RESPIRATORY PATHO: V/Q MISMATCH ---
{
  q: "Define 'Ventilation-Perfusion (V/Q) Mismatch' and provide one clinical example of a ventilation failure and one example of a perfusion failure.",
  answer: "V/Q Mismatch occurs when the air reaching the alveoli (Ventilation) does not match the blood flow in the capillaries (Perfusion). Ventilation Failure example: Asthma or Choking. Perfusion Failure example: Pulmonary Embolism (blood flow is blocked).",
  type: "open-review",
  onlyStudy: true,
  category: "Respiratory",
  section: "Medical",
  rationale: "In a PE, the patient can breathe fine (V is 100%), but the blood can't get to the air (Q is 0%). This is why their lungs sound clear even though they are profoundly hypoxic.",
  cheatSheet: "V/Q MISMATCH: Ventilation (Air) vs. Perfusion (Blood). If they don't meet, gas exchange fails.",
  image: "img/vq_mismatch.jpg"
},

// --- CARDIAC PATHO: COR PULMONALE ---
{
  q: "What is 'Cor Pulmonale' and how does chronic lung disease (like COPD) lead to right-sided heart failure?",
  answer: "Cor Pulmonale is right-sided heart failure caused by pulmonary hypertension. Chronic lung disease causes the pulmonary vessels to constrict; the right ventricle must work harder to push blood into the 'tight' lungs, eventually leading to muscle fatigue and failure.",
  type: "open-review",
  onlyStudy: true,
  category: "Cardiology",
  section: "Medical",
  rationale: "This explains why COPD patients often have JVD and peripheral edema—their 'lung' problem has become a 'heart' problem.",
  cheatSheet: "COR PULMONALE: Right Heart Failure caused by Lung Disease. Think: Tight Lungs = Tired Heart."
},

//----Make Me A Physician Section--------//
    // --- CARDIOLOGY: ELECTROPHYSIOLOGY ---
{
  q: "A 19-year-old male presents with palpitations and a heart rate of 190. The EKG shows a shortened PR interval, a widened QRS complex, and a distinct 'slurred' upstroke at the beginning of the QRS. Identify the condition and the specific accessory pathway involved.",
  answer: "Wolff-Parkinson-White (WPW) Syndrome; the accessory pathway is the Bundle of Kent.",
  type: "open-review",
  onlyStudy: true,
  category: "Physician",
  section: "Medical",
  rationale: "WPW involves a bypass tract (Bundle of Kent) that allows electrical impulses to reach the ventricles faster than the AV node allows. The 'slurred' upstroke is known as a Delta Wave. Treating this with standard AV-node blockers like Diltiazem or Verapamil can be fatal as it forces all impulses down the accessory pathway.",
  cheatSheet: "WPW: Short PR + Wide QRS + Delta Wave. DO NOT give calcium channel blockers if you suspect this in SVT."
},

// --- OBSTETRICS: SYSTEMIC FAILURE ---
{
  q: "A pregnant patient in her third trimester presents with RUQ pain, nausea, and extreme fatigue. Lab results show Hemolysis, Elevated Liver enzymes, and a Low Platelet count. What is the diagnosis, and what is the definitive treatment?",
  answer: "HELLP Syndrome; the definitive treatment is the immediate delivery of the fetus.",
  type: "open-review",
  onlyStudy: true,
  category: "Physician",
  section: "Medical",
  rationale: "HELLP is a severe variant of preeclampsia. The microvascular damage leads to red blood cell destruction (hemolysis) and hepatic congestion. It is a high-mortality condition for both mother and fetus if delivery is delayed.",
  cheatSheet: "HELLP: Hemolysis, Elevated Liver enzymes, Low Platelets. It is a multisystem failure, not just a BP problem."
},

// --- ENDOCRINE: CATECHOLAMINE SURGE ---
{
  q: "A patient presents with 'The Five Ps': Pressure (severe HTN), Pain (headache), Perspiration, Palpitations, and Pallor. You suspect a rare catecholamine-secreting tumor. What is the name of this tumor and where is it typically located?",
  answer: "Pheochromocytoma; typically located in the adrenal medulla.",
  type: "open-review",
  onlyStudy: true,
  category: "Physician",
  section: "Medical",
  rationale: "Pheochromocytomas intermittently release massive amounts of Epinephrine and Norepinephrine. This causes 'paroxysmal' hypertension that can lead to stroke or myocardial infarction even in young, otherwise healthy patients.",
  cheatSheet: "PHEOCHROMOCYTOMA: Adrenal tumor + Catecholamine dump. Think 'Sustained Fight or Flight Mode.'"
},

// --- TRAUMA/RENAL: RHABDOMYOLYSIS ---
{
  q: "Following a prolonged extrication from a building collapse, a patient presents with 'tea-colored' urine. Describe the pathophysiology of why this occurs and identify the specific protein causing the renal damage.",
  answer: "Rhabdomyolysis; caused by the release of Myoglobin from damaged muscle cells into the bloodstream.",
  type: "open-review",
  onlyStudy: true,
  category: "Physician",
  section: "Trauma",
  rationale: "When muscle tissue is crushed, the cell membranes fail, releasing Myoglobin, Potassium ($K^+$), and Phosphate. Myoglobin is toxic to the renal tubules, often leading to acute kidney injury (AKI). The tea-colored urine is actually 'myoglobinuria.'",
  cheatSheet: "RHABDO: Muscle death = Myoglobin release = Renal failure. Treatment: Aggressive IV fluid resuscitation."
},
    // --- CARDIOLOGY: MURMURS ---
{
  q: "A 72-year-old patient presents with syncope and dyspnea. Upon auscultation, you hear a harsh systolic crescendo-decrescendo murmur at the right second intercostal space that radiates to the carotids. Identify the valve pathology.",
  answer: "Aortic Stenosis.",
  type: "open-review",
  onlyStudy: true,
  category: "Physician",
  section: "Medical",
  rationale: "The 'SAD' triad (Syncope, Angina, Dyspnea) combined with a crescendo-decrescendo murmur at the upper right sternal border is the classic presentation for Aortic Stenosis. Radiation to the carotids is a key diagnostic differentiator.",
  cheatSheet: "AORTIC STENOSIS: Right 2nd Intercostal + Systolic + Radiates to Neck. Common in elderly patients due to calcification.",
  image: "img/aortic_stenosis_murmur.jpg"
},

// --- NEUROLOGY: HORNER'S SYNDROME ---
{
  q: "A patient presents with unilateral ptosis (drooping eyelid), miosis (constricted pupil), and anhidrosis (lack of sweating) on the left side of the face. What is this clinical triad called, and what does it suggest?",
  answer: "Horner's Syndrome. It suggests an interruption of the sympathetic nerve supply to the eye (often due to a Pancoast tumor or carotid artery dissection).",
  type: "open-review",
  onlyStudy: true,
  category: "Physician",
  section: "Medical",
  rationale: "Horner's is a physical exam 'find' that points to serious underlying pathology. For a medic, seeing this in a trauma patient might suggest a blunt traumatic dissection of the carotid artery.",
  cheatSheet: "HORNER'S TRIAD: Ptosis + Miosis + Anhidrosis. Think: Sympathetic Nerve Failure.",
  image: "img/horners_syndrome.jpg"
},

// --- PHARMACOLOGY: ACE INHIBITORS ---
{
  q: "Why do ACE Inhibitors (like Lisinopril) commonly cause a persistent dry cough in some patients? (Identify the specific substance involved).",
  answer: "Accumulation of Bradykinin.",
  type: "open-review",
  onlyStudy: true,
  category: "Physician",
  section: "Foundations",
  rationale: "ACE (Angiotensin-Converting Enzyme) is also responsible for breaking down bradykinin in the lungs. When you inhibit ACE, bradykinin levels rise, irritating the airways and causing the characteristic dry cough.",
  cheatSheet: "ACE COUGH: Caused by Bradykinin buildup. If a patient can't tolerate it, they are usually switched to an ARB (like Losartan)."
},

// --- METABOLIC: ANION GAP ---
{
  q: "What is the formula for calculating the Anion Gap, and what is the primary clinical reason for calculating it in a patient with metabolic acidosis?",
  answer: "Formula: Na+ - (Cl- + HCO3-). It is used to differentiate between causes of metabolic acidosis (e.g., MUDPILES vs. non-gap causes like diarrhea).",
  type: "open-review",
  onlyStudy: true,
  category: "Physician",
  section: "Foundations",
  rationale: "A high anion gap suggests that 'unmeasured' acids (like lactic acid, ketones, or toxins) are present in the blood, consuming the bicarbonate buffer.",
  cheatSheet: "ANION GAP: Normal is ~8-12. High Gap = Extra acids present (Sepsis, DKA, Toxins)."
}

];

// --- QUIZ ENGINE LOGIC ---
let sessionQuestions = [];
let currentIdx = 0;
let score = 0;
let mode = '';
let timerInterval;
let timeLeft = 0;
let categoryStats = {};
let missedQuestions = []; // NEW: Track mistakes here

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

    let units = [];
    let seenChains = new Set();

    filteredBank.forEach(q => {
        if (q.chainID) {
            if (!seenChains.has(q.chainID)) {
                const chain = filteredBank.filter(item => item.chainID === q.chainID);
                units.push(chain); 
                seenChains.add(q.chainID);
            }
        } else {
            units.push([q]);
        }
    });

    units.sort(() => Math.random() - 0.5);

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
    const qText = document.getElementById('question-text');
    const container = document.getElementById('options-container');
    const mainSubmitBtn = document.getElementById('action-btn'); // 1. GRAB THE MAIN BUTTON
    
    document.getElementById('progress').innerText = `Question ${currentIdx + 1} of ${sessionQuestions.length} | ${data.category}`;
    container.innerHTML = '';
    document.getElementById('feedback').innerText = '';

    // ALWAYS SHOW THE MAIN BUTTON BY DEFAULT (resets from previous open-review)
    mainSubmitBtn.style.display = 'block'; 

    // --- 1. OPEN-REVIEW LOGIC (The Hide-Box) ---
    if (data.type === 'open-review') {
        mainSubmitBtn.style.display = 'none'; // 2. HIDE THE MAIN BUTTON FOR THIS TYPE
        qText.innerText = data.q;
        
        container.innerHTML = `
            <div style="margin-top: 20px;">
                <p style="font-style: italic; color: var(--text-muted); font-size: 0.9rem; margin-bottom: 15px;">Formulate your clinical findings, then reveal the truth:</p>
                <div id="reveal-box" style="display:none; background: var(--light-gray); border-left: 5px solid var(--accent-blue); padding: 20px; border-radius: 8px; margin-bottom: 20px; color: var(--text-main);">
                    <h4 style="margin: 0 0 10px 0; color: var(--primary-blue);">Clinical Truth:</h4>
                    <p style="font-weight: bold; margin-bottom: 15px;">${data.answer}</p>
                    <hr style="border: 0; border-top: 1px solid var(--border-color); margin-bottom: 15px;">
                    <p><small>${data.rationale}</small></p>
                    
                    ${data.cheatSheet ? `<button onclick="openFieldNote('${data.cheatSheet.replace(/'/g, "\\'")}', '${data.link || ''}', '${data.image || ''}')" class="cheat-sheet-btn" style="margin-top:10px;">📖 View Field Note</button>` : ''}
                </div>
                
                <button id="reveal-btn" class="mode-btn" style="background-color: var(--accent-blue); width:100%;">
                    <span class="material-icons">visibility</span> Reveal Answer
                </button>
            </div>
            <button class="mode-btn" style="margin-top:20px; background-color: var(--primary-blue); display:none; width:100%;" id="next-open-btn" onclick="nextSandbox()">
                Next Case <span class="material-icons">arrow_forward</span>
            </button>
        `;

        const revealBtn = document.getElementById('reveal-btn');
        const revealBox = document.getElementById('reveal-box');
        const nextBtn = document.getElementById('next-open-btn');

        revealBtn.onclick = () => {
            revealBox.style.display = 'block';
            revealBtn.style.display = 'none';
            nextBtn.style.display = 'flex';
        };
        return; 
    }

    // --- 2. DISCOVERY SANDBOX LOGIC (Review Mode Only) ---
    if (mode === 'review' && (data.vitals || data.history || data.physical)) {
        qText.innerText = data.q;
        const sandboxGrid = document.createElement('div');
        sandboxGrid.className = 'sandbox-grid';
        
        const tools = [
            { label: 'Vitals', icon: 'monitor_heart', val: data.vitals },
            { label: 'History', icon: 'history', val: data.history },
            { label: 'Exam', icon: 'person_search', val: data.physical }
        ].filter(t => t.val); // Only show buttons if data exists in the question

        tools.forEach(tool => {
            const card = document.createElement('div');
            card.className = 'discovery-card';
            card.innerHTML = `
                <span class="material-icons">${tool.icon}</span>
                <p class="tool-label">${tool.label}</p>
                <div class="tool-data" style="display:none;">${tool.val}</div>
            `;
            card.onclick = function() {
                this.querySelector('.tool-data').style.display = 'block';
                this.querySelector('.tool-label').style.display = 'none';
                this.style.backgroundColor = 'var(--light-gray)';
            };
            sandboxGrid.appendChild(card);
        });
        container.appendChild(sandboxGrid);
    } else {
        // Exam Mode: Combine text for sandbox questions so the data is available but hidden in prose
        let combined = data.q;
        if (data.vitals) combined += ` | Vitals: ${data.vitals}`;
        if (data.history) combined += ` | History: ${data.history}`;
        if (data.physical) combined += ` | Physical: ${data.physical}`;
        qText.innerText = combined;
    }

    // --- 3. AUDIO LOGIC (Study & Exam) ---
    if (data.audio) {
        const audioBtn = document.createElement('button');
        audioBtn.className = 'mode-btn';
        audioBtn.style.marginBottom = '20px';
        audioBtn.innerHTML = `<span class="material-icons">volume_up</span> Play Diagnostic Sound`;
        const audio = new Audio(data.audio);
        audioBtn.onclick = () => audio.play();
        container.appendChild(audioBtn);
    }

    // --- 4. STANDARD QUESTION INPUTS ---
    if (data.type === 'grid') {
        let table = document.createElement('table');
        table.className = "matrix-table";
        let header = `<tr><th>Sign/Symptom</th>`;
        data.cols.forEach(col => { header += `<th>${col}</th>`; });
        header += `</tr>`;
        table.innerHTML = header;

        data.rows.forEach(row => {
            let tr = document.createElement('tr');
            tr.innerHTML = `<td class="matrix-row-label">${row}</td>`;
            data.cols.forEach(col => {
                tr.innerHTML += `<td><input type="checkbox" class="matrix-check" data-row="${row}" data-col="${col}"></td>`;
            });
            table.appendChild(tr);
        });
        container.appendChild(table);

    } else if (data.type === 'text') {
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

    if (q.type === 'grid') {
        const checks = Array.from(document.querySelectorAll('.matrix-check'));
        const userAnswers = checks.filter(c => c.checked).map(c => `${c.dataset.row}|${c.dataset.col}`);
        isCorrect = userAnswers.length === q.answer.length && userAnswers.every(val => q.answer.includes(val));
    } else if (q.type === 'text') {
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
    } else {
        if (!missedQuestions.includes(q)) missedQuestions.push(q);
    }

    if (mode === 'review') {
        const fb = document.getElementById('feedback');
        fb.innerHTML = isCorrect ? `<b style="color:green">Correct!</b>` : `<b style="color:red">Incorrect.</b> See rationale below.`;
        fb.innerHTML += `<br><small>${q.rationale}</small>`;
        
        if (q.cheatSheet) {
    // We wrap the function arguments in " (double quotes) instead of ' (single quotes)
    // This allows the text to contain single quotes like "Don't" or "Cushing's"
    const cheatText = q.cheatSheet.replace(/'/g, "\\'"); // Escapes single quotes
    const linkUrl = q.link || '';
    const imgPath = q.image || '';

    fb.innerHTML += `<br><button onclick="openFieldNote('${cheatText}', '${linkUrl}', '${imgPath}')" class="cheat-sheet-btn" style="margin-top:10px; padding:8px; cursor:pointer;">📖 View Field Note</button>`;
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
    updateStreak(); 
    clearInterval(timerInterval);
    document.getElementById('quiz-area').style.display = 'none';
    document.getElementById('results-area').style.display = 'block';

    const missedBtn = document.getElementById('missed-drill-btn');
    if (missedQuestions.length > 0) {
        missedBtn.style.display = 'block';
        missedBtn.innerText = `Re-drill ${missedQuestions.length} Missed Questions`;
    } else {
        missedBtn.style.display = 'none';
    }

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

function startMissedDrill() {
    sessionQuestions = [...missedQuestions];
    missedQuestions = [];
    currentIdx = 0;
    score = 0;
    mode = 'review';
    document.getElementById('results-area').style.display = 'none';
    document.getElementById('quiz-area').style.display = 'block';
    document.getElementById('timer-container').style.display = 'none';
    categoryStats = {};
    sessionQuestions.forEach(q => {
        if (!categoryStats[q.category]) categoryStats[q.category] = { total: 0, correct: 0 };
        categoryStats[q.category].total++;
    });
    showQuestion();
}

function openFieldNote(text, url, imgPath) {
    const modal = document.getElementById('fieldNoteModal');
    const body = document.getElementById('modal-body');
    
    // Start with the text of the Field Note
    let content = `<p style="line-height: 1.6; color: var(--text-main);">${text}</p>`;

    // Check if an image path exists. If it does, create the image tag.
    if (imgPath && imgPath !== '') {
        content += `
            <div style="text-align: center; margin: 15px 0;">
                <img src="${imgPath}" 
                     alt="Clinical Reference Image" 
                     style="max-width: 100%; height: auto; border-radius: 8px; border: 1px solid var(--border-color); box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
            </div>`;
    }

    // Add the link if it's provided
    if (url) { 
        content += `<div style="margin-top: 15px; border-top: 1px solid var(--border-color); padding-top: 10px;">
                        <a href="${url}" target="_blank" style="color: var(--accent-blue); font-weight: bold; text-decoration: none;">
                            View Full Lesson / Video →
                        </a>
                    </div>`; 
    }
    
    body.innerHTML = content;
    modal.style.display = "block";
}

function closeFieldNote() {
    document.getElementById('fieldNoteModal').style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById('fieldNoteModal');
    if (event.target == modal) { closeFieldNote(); }
}

function checkStreak() {
    const streakData = JSON.parse(localStorage.getItem('ems_streak')) || { count: 0, lastDate: null };
    const today = new Date().toLocaleDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toLocaleDateString();

    if (streakData.lastDate === today) {
    } else if (streakData.lastDate === yesterdayStr) {
    } else {
        if (streakData.lastDate !== null) {
            streakData.count = 0;
            localStorage.setItem('ems_streak', JSON.stringify(streakData));
        }
    }
    if (streakData.count > 0) {
        document.getElementById('streak-container').style.display = 'block';
        document.getElementById('streak-count').innerText = streakData.count;
    }
}

function updateStreak() {
    const streakData = JSON.parse(localStorage.getItem('ems_streak')) || { count: 0, lastDate: null };
    const today = new Date().toLocaleDateString();
    if (streakData.lastDate !== today) {
        streakData.count++;
        streakData.lastDate = today;
        localStorage.setItem('ems_streak', JSON.stringify(streakData));
    }
    document.getElementById('streak-container').style.display = 'block';
    document.getElementById('streak-count').innerText = streakData.count;
}

function nextSandbox() {
    currentIdx++;
    if (currentIdx < sessionQuestions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark-mode');
    const icon = document.getElementById('theme-icon');
    icon.innerText = isDark ? 'light_mode' : 'dark_mode';
    localStorage.setItem('ems_theme', isDark ? 'dark' : 'light');
}

// Fixed Initialization Logic
window.onload = () => { 
    if (typeof adjustSliderRange === "function") adjustSliderRange(); 
    checkStreak(); 
    if (localStorage.getItem('ems_theme') === 'dark') {
        document.body.classList.add('dark-mode');
        const icon = document.getElementById('theme-icon');
        if (icon) icon.innerText = 'light_mode';
    }
};

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('PWA Registered'))
      .catch(err => console.log('PWA Failure', err));
  });
}
