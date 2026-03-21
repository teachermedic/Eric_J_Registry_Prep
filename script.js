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
    { q: "A 9 year old presents with lethargy, polyuria, and tachypnea. pt's mother states the patient has been more sleepy over the past 2 days. Which is the MOST probable cause?", options: ["High blood glucose", "Low blood glucose", "Influenza", "Stroke"], answer: ["High blood glucose"], type: "single", category: "Ch 21: Endocrine", section: "Medical", rationale: "DKA presents with high glucose, lethargy, tachypnea, and polyuria." },
    { q: "A 54 year old is found lethargic with rapid, deep respirations, and high glucose. How should you manage this patient?", options: ["Ventilate with PPV using a BVM", "Open and secure the airway", "Hyperventilate with a BVM", "Check the patient's pupils"], answer: ["Open and secure the airway"], type: "single", category: "Ch 21: Endocrine", section: "Medical", rationale: "In an unresponsive patient, your primary priority is always the Airway. Secure it before other interventions." },
    { q: "Mittelschmerz refers to:", options: ["Endometriosis", "Ovulation pain", "Amenorrhea", "PID"], answer: ["Ovulation pain"], type: "single", category: "Ch 25: Gynecologic", section: "Medical", rationale: "Mittelschmerz is the sharp, localized pain felt during ovulation." },
    { q: "A patient with a history of severe 'water intoxication' is at risk for which imbalance?", options: ["Hypernatremia", "Hyponatremia", "Hyperkalemia", "Hypocalcemia"], answer: ["Hyponatremia"], type: "single", category: "Ch 7: Patho", section: "Medical", rationale: "Excessive water intake dilutes sodium levels, leading to hyponatremia." },
    { q: "Which of the following is a classic field finding for a patient with severe Hypernatremia (high sodium)?", options: ["Excessive salivation", "Altered mental status and extreme thirst", "Bradypnea", "Hypothermia"], answer: ["Altered mental status and extreme thirst"], type: "single", category: "Ch 7: Patho", section: "Medical", rationale: "Hypernatremia pulls water out of the cells, shrinking brain cells and causing confusion." },
    { q: "You are assessing a patient with chronic renal failure who missed dialysis. Which EKG change suggests Hyperkalemia?", options: ["Narrow QRS", "Peaked T-waves", "Shortened PR", "Prominent U-waves"], answer: ["Peaked T-waves"], type: "single", category: "Ch 7: Patho", section: "Medical", rationale: "High potassium interferes with cardiac repolarization, classically presenting as tented T-waves." },
    { q: "A patient presents with generalized weakness. They take powerful diuretics for CHF without supplements. Suspect:", options: ["Hyperkalemia", "Hypokalemia", "Hypercalcemia", "Hypermagnesemia"], answer: ["Hypokalemia"], type: "single", category: "Ch 7: Patho", section: "Medical", rationale: "Diuretics often cause the kidneys to excrete excessive potassium." },
    { q: "Tapping the patient's facial nerve and observing a twitch (Chvostek's sign) indicates:", options: ["Trousseau's sign", "Chvostek's sign", "Murphy's sign", "Cullen's sign"], answer: ["Chvostek's sign"], type: "single", category: "Ch 7: Patho", section: "Medical", rationale: "This is a hallmark of hypocalcemia, indicating neuromuscular excitability." },
    { q: "Which of the following conditions is most likely to cause Hypercalcemia in a field patient?", options: ["Vitamin D deficiency", "Prolonged immobility or bone cancer", "Laxative use", "Hyperventilation"], answer: ["Prolonged immobility or bone cancer"], type: "single", category: "Ch 7: Patho", section: "Medical", rationale: "Bone breakdown releases calcium into the bloodstream." },
    { q: "A patient with chronic alcoholism presents with tremors. Which imbalance is common?", options: ["Hypermagnesemia", "Hypomagnesemia", "Hypernatremia", "Hypercalcemia"], answer: ["Hypomagnesemia"], type: "single", category: "Ch 7: Patho", section: "Medical", rationale: "Chronic alcohol use leads to poor intake and high urinary excretion of magnesium." },
    { q: "Overuse of magnesium-containing antacids or laxatives can lead to:", options: ["Hypermagnesemia", "Prolonged fasting", "Excessive caffeine", "Severe burns"], answer: ["Hypermagnesemia"], type: "single", category: "Ch 7: Patho", section: "Medical", rationale: "Excessive consumption of magnesium-rich medications can cause toxic levels." },
    { q: "A patient hyperventilating from anxiety complains of 'tingling fingers.' This indicates:", options: ["Relative hypocalcemia", "Actual hypernatremia", "Hypomagnesemia", "Hyperkalemia"], answer: ["Relative hypocalcemia"], type: "single", category: "Ch 7: Patho", section: "Medical", rationale: "Alkalosis causes calcium to bind to albumin, creating a temporary low calcium state." },
    { q: "What is a major risk factor for crush syndrome hyperkalemia?", options: ["Sudden release of a heavy object", "Eating bananas", "Minor bruising", "Dehydration"], answer: ["Sudden release of a heavy object"], type: "single", category: "Ch 7: Patho", section: "Medical", rationale: "Releasing the limb floods the system with trapped intracellular potassium." }
// --- FOUNDATIONS & MEDICAL (PREVIOUS CONTENT) ---
    { q: "Accidental Death and Disability (1966) is famously known as:", options: ["The Orange Book", "The White Paper", "The EMS Charter", "The NHTSA Guide"], answer: ["The White Paper"], type: "single", category: "Ch 1: EMS Systems", section: "Foundations", rationale: "This paper identified accidental death as a 'neglected disease' and spurred EMS growth." },
    { q: "A 54 year old is found lethargic with rapid, deep respirations, and high glucose. How should you manage this patient?", options: ["Ventilate with PPV using a BVM", "Open and secure the airway", "Hyperventilate with a BVM", "Check the patient's pupils"], answer: ["Open and secure the airway"], type: "single", category: "Ch 21: Endocrine", section: "Medical", rationale: "In an unresponsive patient, your primary priority is always the Airway. Secure it before other interventions." },
    { q: "Mittelschmerz refers to:", options: ["Endometriosis", "Ovulation pain", "Amenorrhea", "PID"], answer: ["Ovulation pain"], type: "single", category: "Ch 25: Gynecologic", section: "Medical", rationale: "Mittelschmerz is the sharp, localized pain felt during ovulation." },

    // --- NEW TRAUMA & ENVIRONMENTAL QUESTIONS (40 ITEMS) ---
    
    // SHOCK (Ch 14)
    {
        q: "Which of the following are signs of decompensated shock in an adult? (Select all that apply)",
        options: ["Systolic blood pressure of 88 mmHg", "Narrowing pulse pressure", "Ashen or cyanotic skin", "Thirst and anxiety"],
        answer: ["Systolic blood pressure of 88 mmHg", "Ashen or cyanotic skin"],
        type: "multiple", category: "Ch 14: Shock", section: "Trauma",
        rationale: "Decompensated shock is marked by a drop in systolic BP (<90 mmHg) and severe skin changes. Thirst and narrowing pulse pressure are early compensatory signs."
    },
    {
        q: "A patient with a tension pneumothorax is experiencing which type of shock?",
        options: ["Hypovolemic", "Distributive", "Obstructive", "Cardiogenic"],
        answer: ["Obstructive"],
        type: "single", category: "Ch 14: Shock", section: "Trauma",
        rationale: "Obstructive shock occurs when a physical obstruction prevents the heart from pumping blood, such as pressure on the heart from a tension pneumothorax."
    },

    // BLS RESUSCITATION (Ch 15)
    {
        q: "In the AHA Chain of Survival, which link is most critical for a victim of witnessed out-of-hospital cardiac arrest?",
        options: ["Early Advanced Care", "Early Defibrillation", "Integrated Post-Cardiac Arrest Care", "Early Access"],
        answer: ["Early Defibrillation"],
        type: "single", category: "Ch 15: BLS", section: "Trauma",
        rationale: "Early defibrillation within 3-5 minutes is the most critical factor in survival for patients in V-fib."
    },

    // TRAUMA OVERVIEW & MOI (Ch 26)
    {
        q: "Which collision occurs first in a motor vehicle accident according to the three-collision rule?",
        options: ["Internal organs hit the body wall", "The occupants hit the interior of the car", "The car hits another object", "The brain hits the skull"],
        answer: ["The car hits another object"],
        type: "single", category: "Ch 26: Trauma Overview", section: "Trauma",
        rationale: "The first collision is the car hitting a tree or another car. The second is the occupant hitting the interior, and the third is internal organs hitting body walls."
    },

    // BLEEDING (Ch 27)
    {
        q: "You are treating a patient with life-threatening arterial bleeding from the leg. What is your first action?",
        options: ["Apply a tourniquet immediately", "Apply direct pressure with a sterile dressing", "Elevate the leg", "Locate a pressure point"],
        answer: ["Apply direct pressure with a sterile dressing"],
        type: "single", category: "Ch 27: Bleeding", section: "Trauma",
        rationale: "Current standards prioritize direct pressure first. If that fails to control life-threatening hemorrhage on an extremity, apply a tourniquet immediately."
    },
    {
        q: "Which of the following are classic signs of internal bleeding into the retroperitoneal space? (Select all that apply)",
        options: ["Grey Turner sign (flank bruising)", "Cullen sign (periumbilical bruising)", "Rigid, board-like abdomen", "Distended neck veins"],
        answer: ["Grey Turner sign (flank bruising)", "Cullen sign (periumbilical bruising)"],
        type: "multiple", category: "Ch 27: Bleeding", section: "Trauma",
        rationale: "Grey Turner and Cullen signs are delayed indicators of bleeding in the retroperitoneal space. A rigid abdomen is more common with intra-abdominal bleeding."
    },

    // SOFT-TISSUE INJURIES (Ch 28)
    {
        q: "What is the primary pathophysiology behind 'Crush Syndrome'?",
        options: ["Immediate cardiac arrest from pressure", "Release of toxic metabolic byproducts after pressure is removed", "Severe external hemorrhage", "Nerve death from lack of oxygen"],
        answer: ["Release of toxic metabolic byproducts after pressure is removed"],
        type: "single", category: "Ch 28: Soft-Tissue", section: "Trauma",
        rationale: "When pressure is released after 4+ hours, myoglobin and potassium flood the system, causing potential renal failure and cardiac arrest."
    },
    {
        q: "Using the Rule of Nines, what is the estimated Burn Surface Area (BSA) for an adult with burns to the entire right arm and the anterior chest?",
        options: ["18%", "27%", "36%", "45%"],
        answer: ["18%"],
        type: "single", category: "Ch 28: Soft-Tissue", section: "Trauma",
        rationale: "Entire arm = 9%; Anterior chest = 9%. Total = 18%."
    },

    // FACE & NECK INJURIES (Ch 29)
    {
        q: "What is the greatest risk for a patient with a large, open vein injury to the neck?",
        options: ["Exsanguination", "Air embolism", "Spinal cord damage", "Aspiration of blood"],
        answer: ["Air embolism"],
        type: "single", category: "Ch 29: Face/Neck", section: "Trauma",
        rationale: "Veins in the neck have negative pressure; air can be sucked in, causing a fatal air embolism. Occlusive dressings are required."
    },

    // HEAD & SPINE (Ch 30)
    {
        q: "A patient with a head injury presents with Hypertension, Bradycardia, and Irregular respirations. This triad is indicative of:",
        options: ["Beck's Triad", "Cushing's Triad", "Virchow's Triad", "The Lethal Triad"],
        answer: ["Cushing's Triad"],
        type: "single", category: "Ch 30: Head/Spine", section: "Trauma",
        rationale: "Cushing's Triad (high BP, low HR, Cheyne-Stokes) is a late sign of significantly increased intracranial pressure (ICP)."
    },
    {
        q: "Which of the following symptoms would contraindicate performing manual in-line stabilization of the head?",
        options: ["Patient is unresponsive", "Neck muscle spasms", "Severe neck pain", "Patient is a child"],
        answer: ["Neck muscle spasms"],
        type: "single", category: "Ch 30: Head/Spine", section: "Trauma",
        rationale: "Stop moving the head if you meet resistance, muscle spasms, or if the head is severely angulated."
    },

    // CHEST INJURIES (Ch 31)
    {
        q: "A patient has paradoxical movement of a section of the chest wall. What is the immediate priority?",
        options: ["Tape a bulky dressing to the segment", "Perform needle decompression", "Support ventilations with a BVM", "Place the patient on the injured side"],
        answer: ["Support ventilations with a BVM"],
        type: "single", category: "Ch 31: Chest", section: "Trauma",
        rationale: "Flail segments compromise ventilation. High-flow oxygen and BVM support (Positive Pressure) are the priorities."
    },
    {
        q: "Beck's Triad, including JVD, muffled heart sounds, and narrowing pulse pressure, indicates which condition?",
        options: ["Tension Pneumothorax", "Cardiac Tamponade", "Hemothorax", "Commotio Cordis"],
        answer: ["Cardiac Tamponade"],
        type: "single", category: "Ch 31: Chest", section: "Trauma",
        rationale: "Cardiac Tamponade occurs when fluid fills the pericardial sac, compressing the heart and leading to these classic signs."
    },

    // ABDOMINAL & GU (Ch 32)
    {
        q: "Referred pain to the left shoulder (Kehr's sign) is a classic indicator of injury to which organ?",
        options: ["Liver", "Spleen", "Kidneys", "Gallbladder"],
        answer: ["Spleen"],
        type: "single", category: "Ch 32: Abdominal", section: "Trauma",
        rationale: "Blood from a ruptured spleen irritates the diaphragm, causing referred pain to the left shoulder (Kehr's sign)."
    },
    {
        q: "How should an abdominal evisceration be managed in the field?",
        options: ["Push the organs back in", "Apply a dry sterile dressing", "Apply a moist sterile dressing and an occlusive cover", "Apply a pressure dressing"],
        answer: ["Apply a moist sterile dressing and an occlusive cover"],
        type: "single", category: "Ch 32: Abdominal", section: "Trauma",
        rationale: "Organs must be kept warm and moist. Use saline-moistened dressings covered by an occlusive layer (plastic wrap)."
    },

    // ORTHOPAEDIC INJURIES (Ch 33)
    {
        q: "What are the 6 Ps of assessing a musculoskeletal injury? (Select all that apply)",
        options: ["Pain", "Pallor", "Paresthesia", "Pulselessness", "Paralysis", "Pressure"],
        answer: ["Pain", "Pallor", "Paresthesia", "Pulselessness", "Paralysis", "Pressure"],
        type: "multiple", category: "Ch 33: Orthopaedic", section: "Trauma",
        rationale: "The 6 Ps are critical for identifying Compartment Syndrome or neurovascular compromise."
    },
    {
        q: "Which of the following orthopaedic injuries is considered a life-threatening emergency?",
        options: ["Closed radius fracture", "Pelvic fracture", "Shoulder dislocation", "Ankle sprain"],
        answer: ["Pelvic fracture"],
        type: "single", category: "Ch 33: Orthopaedic", section: "Trauma",
        rationale: "A pelvic fracture can cause massive internal hemorrhage (up to 2 or more liters of blood loss)."
    },

    // ENVIRONMENTAL EMERGENCIES (Ch 34)
    {
        q: "A patient found in cold water is not considered dead until:",
        options: ["They have no pulse for 30 minutes", "They are warm and dead", "Their core temp reaches 90°F", "An AED says 'no shock advised'"],
        answer: ["They are warm and dead"],
        type: "single", category: "Ch 34: Environmental", section: "Trauma",
        rationale: "Hypothermic patients have survived long submersions. Resuscitation must continue until the patient's core is warmed at the hospital."
    },
    {
        q: "Which of the following are signs of Heat Stroke? (Select all that apply)",
        options: ["Hot, dry or moist skin", "Altered mental status", "Heavy sweating", "Core temp > 104°F"],
        answer: ["Hot, dry or moist skin", "Altered mental status", "Core temp > 104°F"],
        type: "multiple", category: "Ch 34: Environmental", section: "Trauma",
        rationale: "Altered mental status is the key differentiator between heat exhaustion and heat stroke. Skin does not have to be dry; it can be sweaty if the 'switch' just flipped."
    },

    // --- CONTINUED ADDITIONAL TRAUMA QUESTIONS TO REACH 40 ---
    {
        q: "What is the most common cause of an upper airway obstruction in an unresponsive trauma patient?",
        options: ["Blood", "The tongue", "Vomitus", "Teeth"],
        answer: ["The tongue"],
        type: "single", category: "Ch 15: BLS", section: "Trauma",
        rationale: "In an unresponsive patient, the tongue loses muscle tone and falls back into the pharynx, blocking the airway."
    },
    {
        q: "A patient has been struck by lightning. Which of the following should be your first priority?",
        options: ["Treating the burn marks", "Starting 'reverse triage'", "Checking for exit wounds", "Applying a backboard"],
        answer: ["Starting 'reverse triage'"],
        type: "single", category: "Ch 34: Environmental", section: "Trauma",
        rationale: "In lightning strikes, patients who appear dead (respiratory/cardiac arrest) are treated first because they may have a high chance of recovery with immediate support."
    },
    {
        q: "Which bone is the most commonly fractured bone in the body?",
        options: ["Femur", "Humerus", "Clavicle", "Tibia"],
        answer: ["Clavicle"],
        type: "single", category: "Ch 33: Orthopaedic", section: "Trauma",
        rationale: "The clavicle is the most common fracture, often occurring from a fall on an outstretched hand."
    },
    {
        q: "A patient with a suspected femur fracture is hypotensive. What is the most likely cause?",
        options: ["Neurogenic shock", "Internal bleeding into the thigh", "Pain-induced vasodilation", "Cardiac contusion"],
        answer: ["Internal bleeding into the thigh"],
        type: "single", category: "Ch 33: Orthopaedic", section: "Trauma",
        rationale: "A femur fracture can hide 1.5 liters of blood in the surrounding soft tissues."
    },
    {
        q: "Which type of brain injury involves bleeding between the skull and the dura mater?",
        options: ["Subdural hematoma", "Epidural hematoma", "Intracerebral hemorrhage", "Subarachnoid hemorrhage"],
        answer: ["Epidural hematoma"],
        type: "single", category: "Ch 30: Head/Spine", section: "Trauma",
        rationale: "Epidural hematomas are often arterial (Middle Meningeal Artery) and present with a 'lucid interval' followed by rapid decline."
    },
    {
        q: "What is the definitive treatment for a simple pneumothorax in the field?",
        options: ["Needle decompression", "High-flow oxygen and monitoring", "Occlusive dressing", "Intubation"],
        answer: ["High-flow oxygen and monitoring"],
        type: "single", category: "Ch 31: Chest", section: "Trauma",
        rationale: "Simple pneumothorax is managed with O2. Needle decompression is ONLY for tension pneumothorax with signs of shock."
    },
    {
        q: "A patient has a sucking chest wound. What is the immediate treatment?",
        options: ["Apply a 4-sided occlusive dressing", "Apply a 3-sided occlusive dressing", "Tape a bulky dressing over it", "Seal it with your gloved hand"],
        answer: ["Seal it with your gloved hand"],
        type: "single", category: "Ch 31: Chest", section: "Trauma",
        rationale: "The first action is to seal the leak with a gloved hand, followed by a vented (3-sided) occlusive dressing."
    },
    {
        q: "Traumatic Asphyxia is characterized by which clinical findings?",
        options: ["Muffled heart sounds and JVD", "Facial cyanosis and bulging eyes", "Tracheal deviation", "Absent breath sounds on one side"],
        answer: ["Facial cyanosis and bulging eyes"],
        type: "single", category: "Ch 31: Chest", section: "Trauma",
        rationale: "Sudden compression of the chest forces blood backward into the head and neck, causing classic facial congestion and petechiae."
    },
    {
        q: "Which of the following is an early sign of Compartment Syndrome?",
        options: ["Loss of distal pulse", "Pain out of proportion to the injury", "Paralysis of the limb", "Cold, pale skin"],
        answer: ["Pain out of proportion to the injury"],
        type: "single", category: "Ch 33: Orthopaedic", section: "Trauma",
        rationale: "Pulse loss is a LATE sign. The earliest and most consistent sign is severe pain that is not relieved by splinting or medication."
    },
    {
        q: "A patient with a suspected spinal injury is found in a sitting position in a car. What device should be used if the patient is stable?",
        options: ["Long backboard", "Scoop stretcher", "Vest-style extrication device (KED)", "Stair chair"],
        answer: ["Vest-style extrication device (KED)"],
        type: "single", category: "Ch 30: Head/Spine", section: "Trauma",
        rationale: "The KED (Short board) is used to stabilize the spine of a sitting patient before moving them to a long backboard."
    },
    {
        q: "How many liters of blood can be lost into the abdominal cavity before distension is visible?",
        options: ["0.5 Liters", "1.0 Liter", "1.5 Liters", "2.0 Liters"],
        answer: ["1.5 Liters"],
        type: "single", category: "Ch 32: Abdominal", section: "Trauma",
        rationale: "The abdomen can hide a massive amount of blood (1.5 - 2 liters) before you see a change in girth."
    },
    {
        q: "A patient with a gunshot wound to the abdomen has 'eviscerated' bowel. What is your priority after ABCs?",
        options: ["Soak dressings in sterile saline and cover the wound", "Cover the wound with a dry trauma pad", "Irrigate the bowel with tap water", "Wrap the abdomen in elastic bandages"],
        answer: ["Soak dressings in sterile saline and cover the wound"],
        type: "single", category: "Ch 32: Abdominal", section: "Trauma",
        rationale: "Moist sterile dressings prevent the exposed tissue from drying out (desiccation)."
    },
    {
        q: "What is the primary danger of a 'scaphoid' (sunken) abdomen in a trauma patient?",
        options: ["Liver rupture", "Diaphragmatic rupture with bowel in the chest", "Severe dehydration", "Bladder rupture"],
        answer: ["Diaphragmatic rupture with bowel in the chest"],
        type: "single", category: "Ch 32: Abdominal", section: "Trauma",
        rationale: "A sunken abdomen in a trauma patient suggests the abdominal contents have herniated into the chest through a ruptured diaphragm."
    },
    {
        q: "Which of the following is a symptom of 'Nitrogen Narcosis' in divers?",
        options: ["Severe joint pain", "Itching skin", "Altered mental status/drunken behavior", "Coughing up blood"],
        answer: ["Altered mental status/drunken behavior"],
        type: "single", category: "Ch 34: Environmental", section: "Trauma",
        rationale: "Nitrogen narcosis (Rapture of the Deep) occurs at depth and mimics alcohol intoxication."
    },
    {
        q: "The 'Bends' (Decompression Sickness) is caused by which gas forming bubbles in the tissues?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"],
        answer: ["Nitrogen"],
        type: "single", category: "Ch 34: Environmental", section: "Trauma",
        rationale: "If a diver ascends too fast, nitrogen that was dissolved in the blood under pressure forms bubbles (emboli)."
    },
    {
        q: "A patient has a traumatic amputation of the index finger. How should the finger be transported?",
        options: ["Placed directly on ice", "Placed in a jar of saline", "Wrapped in moist sterile gauze and put in a bag on ice", "Left at room temperature"],
        answer: ["Wrapped in moist sterile gauze and put in a bag on ice"],
        type: "single", category: "Ch 28: Soft-Tissue", section: "Trauma",
        rationale: "Never put tissue directly on ice (frostbite). Wrap it, bag it, and place the bag in cold water/ice."
    },
    {
        q: "What is the 'Golden Period' in trauma care?",
        options: ["The first 10 minutes on scene", "The first hour from the time of injury to surgery", "The time it takes to get to the hospital", "The first hour after arriving at the ER"],
        answer: ["The first hour from the time of injury to surgery"],
        type: "single", category: "Ch 26: Trauma Overview", section: "Trauma",
        rationale: "The Golden Period is the time frame in which surgical intervention is most likely to be successful."
    },
    {
        q: "An AEMT should consider a fall significant if an adult falls from a height greater than:",
        options: ["5 feet", "10 feet", "15 feet", "20 feet"],
        answer: ["20 feet"],
        type: "single", category: "Ch 26: Trauma Overview", section: "Trauma",
        rationale: "According to the CDC, a fall from >20 feet for an adult is a high-risk mechanism."
    },
    {
        q: "In a 'Blast Injury', which stage of injury is caused by the pressure wave hitting the body?",
        options: ["Primary", "Secondary", "Tertiary", "Quaternary"],
        answer: ["Primary"],
        type: "single", category: "Ch 26: Trauma Overview", section: "Trauma",
        rationale: "Primary blast injuries are caused by the blast wave itself, often damaging air-filled organs (lungs, ears)."
    },
    {
        q: "Which type of bleed is characterized by dark red blood that flows steadily?",
        options: ["Arterial", "Venous", "Capillary", "Intercellular"],
        answer: ["Venous"],
        type: "single", category: "Ch 27: Bleeding", section: "Trauma",
        rationale: "Venous blood is deoxygenated (dark) and under low pressure (steady flow)."
    },
    {
        q: "A patient with a suspected pelvic fracture should be stabilized with:",
        options: ["A traction splint", "A pelvic binder", "Two long backboards", "A vacuum mattress only"],
        answer: ["A pelvic binder"],
        type: "single", category: "Ch 33: Orthopaedic", section: "Trauma",
        rationale: "A pelvic binder or a sheet wrap is used to reduce the pelvic volume and control internal bleeding."
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
    const topicSelect = document.getElementById('topic-select');
    const slider = document.getElementById('question-slider');
    
    if (!topicSelect || !slider) return;

    const topic = topicSelect.value;
    const filtered = topic === "All" ? quizData : quizData.filter(i => i.section === topic);
    const availableCount = filtered.length;
    
    slider.max = availableCount;
    // Force the slider back if it is out of bounds
    if (parseInt(slider.value) > availableCount || parseInt(slider.value) === 0) {
        slider.value = availableCount > 20 ? 20 : availableCount;
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
