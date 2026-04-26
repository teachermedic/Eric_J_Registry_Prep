const quizData = [
    // --- FOUNDATIONS & LEGAL ---
    { q: "Accidental Death and Disability (1966) is famously known as:", options: ["The Orange Book", "The White Paper", "The EMS Charter", "The NHTSA Guide"], answer: ["The White Paper"], type: "single", category: "EMS Systems", section: "Foundations", rationale: "This paper identified accidental death as a 'neglected disease' and spurred EMS growth." },
    { q: "Which EMS level is trained in IV therapy and limited advanced meds?", options: ["EMR", "EMT", "AEMT", "Paramedic"], answer: ["AEMT"], type: "single", category: "EMS Systems", section: "Foundations", rationale: "AEMTs bridge basic and advanced life support." },
    { q: "What is the primary way to prevent disease transmission?", options: ["Gloves", "Handwashing", "Gowns", "Masks"], answer: ["Handwashing"], type: "single", category: "Safety", section: "Foundations", rationale: "Hand hygiene is the #1 clinical defense." },
    { q: "What are the four elements of Negligence?", options: ["Duty to act", "Breach of duty", "Damages", "Proximate cause"], answer: ["Duty to act", "Breach of duty", "Damages", "Proximate cause"], type: "multiple", category: "Legal", section: "Foundations", rationale: "Negligence requires all 4 components: Duty, Breach, Damages, and Proximate Cause." },
    { q: "In SBAR, what does 'B' stand for?", options: ["Basic Info", "Background", "Body System", "Blood Pressure"], answer: ["Background"], type: "single", category: "Communications", section: "Foundations", rationale: "SBAR = Situation, Background, Assessment, Recommendation." },
    { q: "What does the prefix 'hypo-' mean?", options: ["Above", "Below", "Fast", "Slow"], answer: ["Below"], type: "single", category: "Terminology", section: "Foundations", rationale: "Hypo (low/below) vs Hyper (high/above)." },
    { q: "Which lifting technique uses the legs and an upright back?", options: ["Power grip", "Power lift", "Deadlift", "Shoulder lift"], answer: ["Power lift"], type: "single", category: "Lifting", section: "Foundations", rationale: "Legs are strongest; back must remain straight." },
    { q: "Which document establishes the 'Scope of Practice' for an AEMT within a specific state?", options: ["NHTSA Curriculum", "The State EMS Office / Medical Practice Act", "NREMT Handbook", "Federal DOT"], answer: ["The State EMS Office / Medical Practice Act"], type: "single", category: "EMS Systems", section: "Foundations", rationale: "State legislation defines the actual legal scope of practice." },
    { q: "A patient refuses care but is altered with a life-threat. Treat under:", options: ["Expressed Consent", "Informed Consent", "Implied Consent", "Involuntary Consent"], answer: ["Implied Consent"], type: "single", category: "Legal", section: "Foundations", rationale: "Implied consent is used when a patient cannot legally consent but needs life-saving care." },
    { q: "What is the difference between Libel and Slander?", options: ["Libel is spoken; Slander is written", "Libel is written; Slander is spoken", "Physical vs Verbal", "No difference"], answer: ["Libel is written; Slander is spoken"], type: "single", category: "Legal", section: "Foundations", rationale: "Libel = Written defamation; Slander = Spoken defamation." },
    { q: "In the 'Five Stages of Grief,' which stage involves a patient trying to make a deal to postpone the inevitable?", options: ["Denial", "Bargaining", "Anger", "Depression"], answer: ["Bargaining"], type: "single", category: "Wellness", section: "Foundations", rationale: "Bargaining is the third stage of the Kübler-Ross model." },
    { q: "Which federal document provides the 'National EMS Scope of Practice Model' that states use to create their laws?", options: ["The White Paper", "NHTSA DOT Booklet", "The National EMS Education Standards", "The EMS Agenda for the Future"], answer: ["The National EMS Education Standards"], type: "single", category: "EMS Systems", section: "Foundations", rationale: "NHTSA's National EMS Education Standards define the minimum competencies for each level." },
    { q: "AEMT care is typically required to be provided under the license of a:", options: ["Fire Chief", "Medical Director", "Service Director", "Nursing Supervisor"], answer: ["Medical Director"], type: "single", category: "EMS Systems", section: "Foundations", rationale: "Medical Directors provide the legal authority for AEMTs to practice." },
    { q: "Assault is defined legally as:", options: ["Touching a patient without consent", "Placing a patient in fear of bodily harm", "Causing physical injury to a patient", "Kidnapping a patient"], answer: ["Placing a patient in fear of bodily harm"], type: "single", category: "Legal", section: "Foundations", rationale: "Assault is the threat; Battery is the actual physical touching." },
    { q: "Which of the following is a 'Mandatory Reporting' requirement for EMS? (Select all that apply)", options: ["Child abuse", "Elder abuse", "Gunshot wounds", "Domestic violence"], answer: ["Child abuse", "Elder abuse", "Gunshot wounds", "Domestic violence"], type: "multiple", category: "Legal", section: "Foundations", rationale: "Most jurisdictions require reporting of these categories to protect vulnerable populations." },

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

    // --- TERMINOLOGY (OPEN TEXT) ---
    { q: "Medical term for 'a heart rate below 60 beats per minute.'", options: [], answer: ["Bradycardia"], type: "text", category: "Terminology", section: "Terminology", rationale: "Brady- (slow) + -cardia (heart)." },
    { q: "Medical term for 'a heart rate above 100 beats per minute.'", options: [], answer: ["Tachycardia"], type: "text", category: "Terminology", section: "Terminology", rationale: "Tachy- (fast) + -cardia (heart)." },
    { q: "Medical term for 'difficulty or labored breathing.'", options: [], answer: ["Dyspnea"], type: "text", category: "Terminology", section: "Terminology", rationale: "Dys- (difficult) + -pnea (breathing)." },
    { q: "Medical term for 'the absence of breathing.'", options: [], answer: ["Apnea"], type: "text", category: "Terminology", section: "Terminology", rationale: "A- (without) + -pnea (breathing)." },
    { q: "Medical term for 'vomiting blood.'", options: [], answer: ["Hematemesis"], type: "text", category: "Terminology", section: "Terminology", rationale: "Hemat- (blood) + -emesis (vomiting)." },
    { q: "Medical term for 'blood in the urine.'", options: [], answer: ["Hematuria"], type: "text", category: "Terminology", section: "Terminology", rationale: "Hemat- (blood) + -uria (urine)." },
    { q: "Medical term for 'enlargement of the liver.'", options: [], answer: ["Hepatomegaly"], type: "text", category: "Terminology", section: "Terminology", rationale: "Hepat- (liver) + -megaly (enlarged)." },
    { q: "Medical term for 'inflammation of the gallbladder.'", options: [], answer: ["Cholecystitis"], type: "text", category: "Terminology", section: "Terminology", rationale: "Chole- (bile) + cyst- (sac) + -itis (inflammation)." },
    { q: "Medical term for 'excessive sweating.'", options: [], answer: ["Diaphoresis"], type: "text", category: "Terminology", section: "Terminology", rationale: "Used often to describe clinical signs of shock." },
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
    { q: "Mittelschmerz refers to:", options: ["Endometriosis", "Ovulation pain", "Amenorrhea", "PID"], answer: ["Ovulation pain"], type: "single", category: "Gynecology", section: "Medical", rationale: "Localized pain during ovulation." },

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
    { q: "Retinal detachment symptom:", options: ["Hyphema", "Curtain over vision", "Blowout Fracture", "Pain"], answer: ["Retinal Detachment"], type: "single", category: "Face/Neck", section: "Trauma", rationale: "Classic 'curtain' description." },
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

    // --- TRAUMA CHAIN ---
    { q: "[TRAUMA PART 1] Massive pulsing bleed from right thigh in MVA. First action?", options: ["O2", "Tourniquet", "Trauma Assessment", "C-Spine"], answer: ["Tourniquet"], type: "single", category: "Trauma", section: "Trauma", chainID: "Trauma_1", rationale: "X-ABC logic.", cheatSheet: "MARCH: Massive Hemorrhage first." },
    { q: "[TRAUMA PART 2] Bleeding controlled. Absent breath sounds R, JVD, BP 88/60. Suspect?", options: ["Simple Pneumo", "Hemothorax", "Tension Pneumothorax", "Tamponade"], answer: ["Tension Pneumothorax"], type: "single", category: "Trauma", section: "Trauma", chainID: "Trauma_1", rationale: "Absent sounds + JVD + Hypotension.", cheatSheet: "TENSION: Obstructive Shock." },
    { q: "[TRAUMA PART 3] Priority intervention for this trauma patient?", options: ["BVM", "Needle Decompression", "Occlusive Dressing", "Transport"], answer: ["Needle Decompression"], type: "single", category: "Trauma", section: "Trauma", chainID: "Trauma_1", rationale: "Restore output.", cheatSheet: "SITES: 2nd ICS Mid-clavicular." },

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

    // --- PEDS CHAIN ---
    { q: "[PEDS PART 1] PAT: Limp, pale, grunting 2yo. Status?", options: ["Distress", "Failure", "Compensated Shock", "Decompensated Shock"], answer: ["Failure"], type: "single", category: "Pediatrics", section: "OBPeds", chainID: "Peds_1", rationale: "2 abnormal PAT segments = Failure.", cheatSheet: "PAT: Appearance, Breathing, Circulation." },
    { q: "[PEDS PART 2] Child begins tonic-clonic seizure. History of fever. Priority?", options: ["Midazolam", "Ice Packs", "Protect Airway/Safety", "Insert OPA"], answer: ["Protect Airway/Safety"], type: "single", category: "Pediatrics", section: "OBPeds", chainID: "Peds_1", rationale: "Safety first.", cheatSheet: "SEIZURE: Airway/O2/Safety." },
    { q: "[PEDS PART 3] Post-seizure child is hot. Best cooling method?", options: ["Immersion", "Alcohol rub", "Remove excess clothing", "Ice packs"], answer: ["Remove excess clothing"], type: "single", category: "Pediatrics", section: "OBPeds", chainID: "Peds_1", rationale: "Passive cooling is safest.", cheatSheet: "COOLING: Avoid shivering." }
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
    document.getElementById('progress').innerText = `Question ${currentIdx + 1} of ${sessionQuestions.length} | ${data.category}`;
    document.getElementById('question-text').innerText = data.q;
    const container = document.getElementById('options-container');
    container.innerHTML = '';
    document.getElementById('feedback').innerText = '';

    if (data.type === 'grid') {
        // --- MATRIX ENGINE ---
        let table = document.createElement('table');
        table.className = "matrix-table";
        
        // Header Row
        let header = `<tr><th>Sign/Symptom</th>`;
        data.cols.forEach(col => { header += `<th>${col}</th>`; });
        header += `</tr>`;
        table.innerHTML = header;

        // Content Rows
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
        // ... Standard Single/Multiple Logic ...
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
        // Check Every Row/Col pair
        const checks = Array.from(document.querySelectorAll('.matrix-check'));
        const userAnswers = checks.filter(c => c.checked).map(c => `${c.dataset.row}|${c.dataset.col}`);
        
        // Compare against answer list
        isCorrect = userAnswers.length === q.answer.length && 
                    userAnswers.every(val => q.answer.includes(val));

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
    }

    if (mode === 'review') {
        const fb = document.getElementById('feedback');
        fb.innerHTML = isCorrect ? `<b style="color:green">Correct!</b>` : `<b style="color:red">Incorrect.</b> See rationale below.`;
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
