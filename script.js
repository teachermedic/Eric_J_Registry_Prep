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
    { q: "In the 'Five Stages of Grief,' which stage involves a patient trying to make a deal to postpone the inevitable?", options: ["Denial", "Bargaining", "Anger", "Depression"], answer: ["Bargaining"], type: "single", category: "Ch 2: Wellness", section: "Foundations", rationale: "Bargaining is the third stage of the Kübler-Ross model where the patient tries to negotiate for more time." },

    // --- PATHOPHYSIOLOGY (CH 7 & ACID-BASE) ---
    { q: "What is the primary product of anaerobic metabolism?", options: ["Lactic Acid", "ATP", "Glucose", "Oxygen"], answer: ["Lactic Acid"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "Without oxygen, cells produce lactic acid and very little energy." },
    { q: "Shock caused by widespread vasodilation is categorized as:", options: ["Hypovolemic", "Distributive", "Cardiogenic", "Obstructive"], answer: ["Distributive"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "Anaphylaxis and Sepsis are types of distributive shock." },
    { q: "A patient hypoventilating from an opioid OD is likely in:", options: ["Respiratory Alkalosis", "Respiratory Acidosis", "Metabolic Alkalosis", "Metabolic Acidosis"], answer: ["Respiratory Acidosis"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "CO2 retention leads to a drop in pH, causing respiratory acidosis." },
    { q: "Kussmaul respirations in DKA are an attempt to compensate for:", options: ["Metabolic Acidosis", "Metabolic Alkalosis", "Respiratory Acidosis", "Hypoxemia"], answer: ["Metabolic Acidosis"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "Rapid breathing 'blows off' CO2 (acid) to raise blood pH." },
    { q: "Which of the following is the primary chemical buffer system in the human body?", options: ["Protein", "Bicarbonate", "Phosphate", "Hemoglobin"], answer: ["Bicarbonate"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "The Bicarbonate-Carbonic Acid system is the most important extracellular buffer." },
    { q: "A hyperventilating patient with an EtCO2 of 22 is in:", options: ["Respiratory Alkalosis", "Respiratory Acidosis", "Metabolic Acidosis", "Normal state"], answer: ["Respiratory Alkalosis"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "Excessive loss of CO2 removes acid, raising the pH." },
    { q: "What is the normal pH range of human arterial blood?", options: ["7.0 - 7.1", "7.35 - 7.45", "7.45 - 7.55", "6.8 - 7.8"], answer: ["7.35 - 7.45"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "This narrow window is essential for cellular enzyme function." },

    // --- MEDICAL (CH 16-25) ---
    { q: "How does CPAP improve oxygenation in pulmonary edema?", options: ["Increasing HR", "Forcing fluid out of alveoli and into capillaries", "Improves blood pressure", "Causing vasodilation"], answer: ["Forcing fluid out of alveoli and into capillaries"], type: "single", category: "Ch 17: Respiratory", section: "Medical", rationale: "CPAP uses pressure to push fluid from the air sacs back into the bloodstream." },
    { q: "A patient has stroke symptoms that resolve in 45 minutes. This was a:", options: ["Ischemic Stroke", "Hemorrhagic Stroke", "TIA", "Hypoglycemia"], answer: ["TIA"], type: "single", category: "Ch 19: Neurologic", section: "Medical", rationale: "Transient Ischemic Attacks resolve completely within 24 hours." },
    { q: "Cushing's Syndrome is characterized by:", options: ["Moon-face and buffalo hump", "Extreme weight loss", "Low blood glucose", "Hypotension"], answer: ["Moon-face and buffalo hump"], type: "single", category: "Ch 21: Endocrine", section: "Medical", rationale: "Caused by hyperadrenalism (excess cortisol)." },
    { q: "A patient with 'tearing' back pain and unequal BPs in arms likely has:", options: ["Heart Attack", "Aortic Dissection", "Kidney Stones", "Gallstones"], answer: ["Aortic Dissection"], type: "single", category: "Ch 18: Cardiovascular", section: "Medical", rationale: "Unequal BP and tearing pain are classic for dissection." },
    { q: "Kussmaul respirations are unique to which condition?", options: ["HHNS", "DKA", "Hypoglycemia", "Stroke"], answer: ["DKA"], type: "single", category: "Ch 21: Endocrine", section: "Medical", rationale: "Indicates the body is trying to blow off acid to compensate for ketones." },
    { q: "Tapping the patient's facial nerve and observing a twitch (Chvostek's sign) indicates:", options: ["Trousseau's sign", "Chvostek's sign", "Murphy's sign", "Cullen's sign"], answer: ["Chvostek's sign"], type: "single", category: "Ch 7: Patho", section: "Medical", rationale: "This is a hallmark of hypocalcemia, indicating neuromuscular excitability." },
    { q: "A 54 year old is found lethargic with rapid, deep respirations, and high glucose. How should you manage this patient?", options: ["Ventilate with PPV using a BVM", "Open and secure the airway", "Hyperventilate", "Check pupils"], answer: ["Open and secure the airway"], type: "single", category: "Ch 21: Endocrine", section: "Medical", rationale: "In an unresponsive patient, the primary priority is always the Airway." },
    { q: "Mittelschmerz refers to:", options: ["Endometriosis", "Ovulation pain", "Amenorrhea", "PID"], answer: ["Ovulation pain"], type: "single", category: "Ch 25: Gynecologic", section: "Medical", rationale: "Mittelschmerz is the sharp, localized pain felt during ovulation." },

    // --- TRAUMA & ENVIRONMENTAL (CH 26-34) ---
    {
        q: "Which collision in a motor vehicle accident is most likely to cause a 'coup-contrecoup' brain injury?",
        options: ["First (car vs object)", "Second (occupant vs interior)", "Third (organs vs body wall)", "Fourth"],
        answer: ["Third (organs vs body wall)"],
        type: "single", category: "Ch 26: MOI", section: "Trauma",
        rationale: "The third collision involves the organs striking the interior body wall, causing brain or aortic injuries."
    },
    {
        q: "Which Class of Hemorrhage is defined by 30-40% blood loss and a significant drop in systolic BP?",
        options: ["Class I", "Class II", "Class III", "Class IV"],
        answer: ["Class III"],
        type: "single", category: "Ch 27: Bleeding", section: "Trauma",
        rationale: "Class III involves marked tachycardia and hypotension as compensation fails."
    },
    {
        q: "Beck's Triad (JVD, muffled heart sounds, and narrowing pulse pressure) indicates:",
        options: ["Tension Pneumothorax", "Cardiac Tamponade", "Hemothorax", "Commotio Cordis"],
        answer: ["Cardiac Tamponade"],
        type: "single", category: "Ch 31: Chest", section: "Trauma",
        rationale: "Cardiac Tamponade occurs when fluid fills the pericardial sac, compressing the heart."
    },
    {
        q: "Referred pain to the left shoulder (Kehr's sign) is a classic indicator of injury to which organ?",
        options: ["Liver", "Spleen", "Kidneys", "Pancreas"],
        answer: ["Spleen"],
        type: "single", category: "Ch 32: Abdominal", section: "Trauma",
        rationale: "Splenic blood irritates the diaphragm, referred to the left shoulder via the phrenic nerve."
    },
    {
        q: "What are the '6 Ps' of musculoskeletal assessment? (Select all that apply)",
        options: ["Pain", "Paresthesia", "Pulselessness", "Pallor", "Paralysis", "Pressure"],
        answer: ["Pain", "Paresthesia", "Pulselessness", "Pallor", "Paralysis", "Pressure"],
        type: "multiple", category: "Ch 33: Ortho", section: "Trauma",
        rationale: "These are critical for identifying Compartment Syndrome or neurovascular compromise."
    },
    {
        q: "The 'Lethal Triad' in trauma consists of which three conditions? (Select all that apply)",
        options: ["Acidosis", "Coagulopathy", "Hypothermia", "Hypertension"],
        answer: ["Acidosis", "Coagulopathy", "Hypothermia"],
        type: "multiple", category: "Ch 27: Bleeding", section: "Trauma",
        rationale: "Acidosis, Coagulopathy, and Hypothermia are a self-reinforcing cycle of death in major trauma."
    },
    {
        q: "A patient with a head injury presents with Hypertension, Bradycardia, and Irregular respirations. This is:",
        options: ["Beck's Triad", "Cushing's Triad", "Virchow's Triad", "The Bends"],
        answer: ["Cushing's Triad"],
        type: "single", category: "Ch 30: Head/Spine", section: "Trauma",
        rationale: "Cushing's Triad is a late sign of significantly increased intracranial pressure (ICP)."
    },
    {
        q: "A cold-water drowning patient is not considered dead until they are:",
        options: ["Warm and dead", "Pulseless for 30 mins", "Core temp reaches 90F", "No shock advised"],
        answer: ["Warm and dead"],
        type: "single", category: "Ch 34: Environmental", section: "Trauma",
        rationale: "Hypothermia protects vital organs; resuscitation must continue until the patient is warmed."
    },
    {
        q: "Which gas law explains decompression sickness ('The Bends') in divers?",
        options: ["Boyle's Law", "Henry's Law", "Dalton's Law", "Charles's Law"],
        answer: ["Henry's Law"],
        type: "single", category: "Ch 34: Environmental", section: "Trauma",
        rationale: "Henry's Law states that the amount of gas dissolved in a liquid is proportional to the partial pressure of that gas."
    },
    {
        q: "What is the primary pathophysiology behind 'Crush Syndrome'?",
        options: ["Immediate cardiac arrest", "Release of toxic metabolic byproducts after pressure is removed", "External hemorrhage", "Nerve death"],
        answer: ["Release of toxic metabolic byproducts after pressure is removed"],
        type: "single", category: "Ch 28: Soft-Tissue", section: "Trauma",
        rationale: "Releasing pressure allows myoglobin and potassium to flood the system, causing renal failure and arrhythmias."
    },
    // --- NEW RIGOROUS ADDITIONS (FOUNDATIONS) ---
    { q: "Which federal document provides the 'National EMS Scope of Practice Model' that states use to create their laws?", options: ["The White Paper", "NHTSA DOT Booklet", "The National EMS Education Standards", "The EMS Agenda for the Future"], answer: ["The National EMS Education Standards"], type: "single", category: "Ch 1: EMS Systems", section: "Foundations", rationale: "NHTSA's National EMS Education Standards define the minimum competencies for each level of licensure." },
    { q: "AEMT care is typically required to be provided under the license of a:", options: ["Fire Chief", "Medical Director", "Service Director", "Nursing Supervisor"], answer: ["Medical Director"], type: "single", category: "Ch 1: EMS Systems", section: "Foundations", rationale: "Medical Directors provide the legal authority for AEMTs to practice via standing orders or online direction." },
    { q: "In the 'Lethal Triad' of trauma, which factor directly impairs the blood's ability to clot?", options: ["Acidosis", "Hypothermia", "Coagulopathy", "Hypotension"], answer: ["Coagulopathy"], type: "single", category: "Ch 27: Bleeding", section: "Foundations", rationale: "Coagulopathy is the impaired ability of the blood to form clots, often exacerbated by the other two legs of the triad." },
    { q: "Assault is defined legally as:", options: ["Touching a patient without consent", "Placing a patient in fear of bodily harm", "Causing physical injury to a patient", "Kidnapping a patient"], answer: ["Placing a patient in fear of bodily harm"], type: "single", category: "Ch 3: Legal", section: "Foundations", rationale: "Assault is the threat; Battery is the actual physical touching without consent." },
    { q: "Which of the following is a 'Mandatory Reporting' requirement for EMS in most states? (Select all that apply)", options: ["Child abuse", "Elder abuse", "Gunshot wounds", "Domestic violence"], answer: ["Child abuse", "Elder abuse", "Gunshot wounds", "Domestic violence"], type: "multiple", category: "Ch 3: Legal", section: "Foundations", rationale: "Most jurisdictions require reporting of these categories to protect vulnerable populations." },

    // --- NEW RIGOROUS ADDITIONS (PATHOPHYSIOLOGY / ACID-BASE) ---
    { q: "A patient with a COPD exacerbation is retaining CO2. This results in an increase of which ion in the blood?", options: ["Sodium", "Hydrogen", "Bicarbonate", "Potassium"], answer: ["Hydrogen"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "CO2 combines with water to form carbonic acid, which dissociates into Hydrogen ions, lowering the pH." },
    { q: "Respiratory Alkalosis is primarily caused by:", options: ["Slow, shallow breathing", "The kidneys retaining acid", "Hyperventilation and 'blowing off' CO2", "Excessive intake of antacids"], answer: ["Hyperventilation and 'blowing off' CO2"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "Excessive CO2 loss reduces the acid content of the blood, raising the pH." },
    { q: "Which organ system is responsible for the 'Long-term' (hours to days) compensation of acid-base imbalances?", options: ["The Lungs", "The Kidneys", "The Liver", "The Pancreas"], answer: ["The Kidneys"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "The kidneys adjust pH by excreting or retaining Hydrogen and Bicarbonate, but it takes much longer than the respiratory system." },
    { q: "In a state of Acidosis, the heart becomes:", options: ["More sensitive to Epinephrine", "Less responsive to catecholamines", "Hyper-excitable", "More efficient at pumping"], answer: ["Less responsive to catecholamines"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "Acidosis decreases myocardial contractility and makes the heart less responsive to the body's natural stimulants." },

    // --- NEW RIGOROUS ADDITIONS (TRAUMA CHAPTERS 26-34) ---
    { q: "What is the formula for Kinetic Energy in relation to trauma?", options: ["Mass x Velocity", "1/2 Mass x Velocity Squared", "Weight x Gravity", "Mass / Velocity"], answer: ["1/2 Mass x Velocity Squared"], type: "single", category: "Ch 26: Overview", section: "Trauma", rationale: "Velocity has a much greater impact on energy (and injury) than mass because it is squared." },
    { q: "A patient has a gunshot wound to the chest. This is considered what type of trauma?", options: ["Low-velocity penetrating", "High-velocity penetrating", "Blunt force", "Secondary blast injury"], answer: ["Low-velocity penetrating"], type: "single", category: "Ch 26: Overview", section: "Trauma", rationale: "Handguns are generally low-velocity; rifles are high-velocity. Both are penetrating." },
    { q: "Which 'collision' in an MVC is responsible for a 'torn aorta'?", options: ["The Car collision", "The Body collision", "The Organ collision", "The Secondary collision"], answer: ["The Organ collision"], type: "single", category: "Ch 26: Overview", section: "Trauma", rationale: "The 3rd collision involves the heart/aorta continuing to move forward after the chest wall has stopped." },
    { q: "What is the maximum volume of blood loss allowed for a Class I hemorrhage?", options: ["Up to 15% (750 mL)", "15-30% (750-1500 mL)", "30-40%", "Over 40%"], answer: ["Up to 15% (750 mL)"], type: "single", category: "Ch 27: Bleeding", section: "Trauma", rationale: "Class I hemorrhage is well-compensated by the body with minimal symptoms." },
    { q: "In 'Crush Syndrome,' the release of which electrolyte causes life-threatening dysrhythmias?", options: ["Sodium", "Potassium", "Calcium", "Chloride"], answer: ["Potassium"], type: "single", category: "Ch 28: Soft-Tissue", section: "Trauma", rationale: "Potassium is primarily intracellular; when cells are crushed and released, it floods the blood (Hyperkalemia)." },
    { q: "A burn that is red, painful, and has blisters is classified as:", options: ["Superficial", "Partial-thickness", "Full-thickness", "Deep-thickness"], answer: ["Partial-thickness"], type: "single", category: "Ch 28: Soft-Tissue", section: "Trauma", rationale: "Partial-thickness (2nd degree) burns involve the epidermis and part of the dermis." },
    { q: "Which eye injury involves the feeling of 'a curtain being pulled over the field of vision'?", options: ["Hyphema", "Retinal Detachment", "Blowout Fracture", "Corneal Abrasion"], answer: ["Retinal Detachment"], type: "single", category: "Ch 29: Face/Neck", section: "Trauma", rationale: "This is a classic painless symptom of the retina separating from the back of the eye." },
    { q: "What is the priority for a patient with an impaled object in the eye?", options: ["Remove the object immediately", "Stabilize the object and cover both eyes", "Apply direct pressure", "Rinse with sterile saline"], answer: ["Stabilize the object and cover both eyes"], type: "single", category: "Ch 29: Face/Neck", section: "Trauma", rationale: "Covering the unaffected eye prevents 'sympathetic movement,' which would cause further damage in the injured eye." },
    { q: "Cerebral blood flow is determined by which two factors?", options: ["BP and Heart Rate", "MAP and ICP", "Pulse Pressure and EtCO2", "GCS and Respiratory Rate"], answer: ["MAP and ICP"], type: "single", category: "Ch 30: Head/Spine", section: "Trauma", rationale: "Cerebral Perfusion Pressure (CPP) = Mean Arterial Pressure (MAP) - Intracranial Pressure (ICP)." },
    { q: "A 'lucid interval' after a head injury followed by rapid unconsciousness is classic for:", options: ["Subdural hematoma", "Epidural hematoma", "Concussion", "Diffuse Axonal Injury"], answer: ["Epidural hematoma"], type: "single", category: "Ch 30: Head/Spine", section: "Trauma", rationale: "Epidural bleeds are typically arterial and high-pressure." },
    { q: "Which spinal cord syndrome involves loss of motor function, pain, and temperature below the injury, but preserves light touch?", options: ["Central Cord Syndrome", "Anterior Cord Syndrome", "Brown-Sequard Syndrome", "Cauda Equina"], answer: ["Anterior Cord Syndrome"], type: "single", category: "Ch 30: Head/Spine", section: "Trauma", rationale: "Anterior cord injury spares the posterior columns (touch/vibration)." },
    { q: "Beck’s Triad includes JVD, muffled heart sounds, and:", options: ["Widening pulse pressure", "Narrowing pulse pressure", "Bradycardia", "Hypertension"], answer: ["Narrowing pulse pressure"], type: "single", category: "Ch 31: Chest", section: "Trauma", rationale: "Narrowing pulse pressure indicates the heart can no longer fill properly (Tamponade)." },
    { q: "What is the immediate field treatment for a tension pneumothorax with signs of shock?", options: ["Occlusive dressing", "Needle Decompression", "High-flow O2 only", "Intubation"], answer: ["Needle Decompression"], type: "single", category: "Ch 31: Chest", section: "Trauma", rationale: "Needle decompression is an AEMT-level skill to relieve pressure on the heart and great vessels." },
    { q: "A 'Scaphoid' (hollow) abdomen in trauma suggests:", options: ["Ruptured Spleen", "Diaphragmatic Rupture", "Internal bleeding", "Evisceration"], answer: ["Diaphragmatic Rupture"], type: "single", category: "Ch 32: Abdominal", section: "Trauma", rationale: "Contents moving from the abdomen into the chest leave a hollow appearance." },
    { q: "Which organ is most commonly injured in blunt abdominal trauma?", options: ["Spleen", "Liver", "Bladder", "Stomach"], answer: ["Liver"], type: "single", category: "Ch 32: Abdominal", section: "Trauma", rationale: "The liver is the largest and most frequently injured solid organ in the abdomen." },
    { q: "What is the priority treatment for an open pelvic fracture?", options: ["Splint the legs", "Apply a pelvic binder", "Apply a tourniquet", "Apply a traction splint"], answer: ["Apply a pelvic binder"], type: "single", category: "Ch 33: Ortho", section: "Trauma", rationale: "Pelvic binders reduce internal volume and stabilize the fracture to limit bleeding." },
    { q: "In diving emergencies, Boyle’s Law relates to which phase of the dive?", options: ["Descent only", "Ascent only", "Bottom time", "Both Ascent and Descent"], answer: ["Both Ascent and Descent"], type: "single", category: "Ch 34: Environmental", section: "Trauma", rationale: "Boyle's Law states volume is inversely proportional to pressure, affecting air-filled spaces as depth changes." },
    // --- PATHOPHYSIOLOGY: ACID-BASE RIGOR ---
    { q: "A patient hypoventilating from an opioid OD is likely in which state?", options: ["Respiratory Alkalosis", "Respiratory Acidosis", "Metabolic Alkalosis", "Metabolic Acidosis"], answer: ["Respiratory Acidosis"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "CO2 retention leads to a drop in pH, causing respiratory acidosis." },
    

[Image of respiratory acidosis vs alkalosis chart]

    { q: "The Bicarbonate Buffer System manages pH by balancing which two components?", options: ["Oxygen and Nitrogen", "Carbon Dioxide and Bicarbonate", "Sodium and Potassium", "Calcium and Magnesium"], answer: ["Carbon Dioxide and Bicarbonate"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "The body uses the lungs to regulate CO2 and the kidneys to regulate Bicarbonate." },
    { q: "In a state of Acidosis, the heart becomes:", options: ["More sensitive to Epinephrine", "Less responsive to catecholamines", "Hyper-excitable", "More efficient at pumping"], answer: ["Less responsive to catecholamines"], type: "single", category: "Ch 7: Patho", section: "Pathophysiology", rationale: "Acidosis decreases myocardial contractility and makes the heart less responsive to the body's natural stimulants." },

    // --- TRAUMA: SHOCK & BLEEDING RIGOR ---
    { q: "Which Class of Hemorrhage involves 30-40% blood loss and the onset of hypotension?", options: ["Class I", "Class II", "Class III", "Class IV"], answer: ["Class III"], type: "single", category: "Ch 27: Bleeding", section: "Trauma", rationale: "Class III is the point where compensatory mechanisms fail to maintain blood pressure." },
    { q: "The 'Lethal Triad' in trauma consists of which three conditions? (Select all that apply)", options: ["Acidosis", "Coagulopathy", "Hypothermia", "Hypertension"], answer: ["Acidosis", "Coagulopathy", "Hypothermia"], type: "multiple", category: "Ch 27: Bleeding", section: "Trauma", rationale: "Acidosis, Coagulopathy, and Hypothermia create a cycle that makes shock irreversible." },
    { q: "What is the target Mean Arterial Pressure (MAP) for 'permissive hypotension' in internal trauma?", options: ["40-50 mmHg", "60-65 mmHg", "80-90 mmHg", "110-120 mmHg"], answer: ["60-65 mmHg"], type: "single", category: "Ch 14: Shock", section: "Trauma", rationale: "Targeting a lower MAP (60-65) helps maintain vital organ perfusion without 'popping the clot' formed at the injury site." },

    // --- TRAUMA: HEAD & CHEST RIGOR ---
    { q: "Cushing's Triad (Hypertension, Bradycardia, Irregular Respirations) indicates:", options: ["Hypovolemic Shock", "Increased Intracranial Pressure", "Cardiac Tamponade", "Pulmonary Embolism"], answer: ["Increased Intracranial Pressure"], type: "single", category: "Ch 30: Head/Spine", section: "Trauma", rationale: "Cushing's triad is a late sign of brain herniation or significantly high ICP." },
    
    { q: "Beck's Triad (JVD, muffled heart sounds, and narrowing pulse pressure) indicates:", options: ["Tension Pneumothorax", "Cardiac Tamponade", "Hemothorax", "Flail Chest"], answer: ["Cardiac Tamponade"], type: "single", category: "Ch 31: Chest", section: "Trauma", rationale: "Cardiac Tamponade occurs when fluid fills the pericardial sac, compressing the heart." },
    
    { q: "Referred pain to the left shoulder (Kehr's sign) in a trauma patient likely indicates injury to the:", options: ["Liver", "Spleen", "Kidney", "Diaphragm"], answer: ["Spleen"], type: "single", category: "Ch 32: Abdominal", section: "Trauma", rationale: "Splenic blood irritates the phrenic nerve, which refers pain to the left shoulder." },

    // --- TRAUMA: ORTHO & ENVIRONMENTAL RIGOR ---
    { q: "In the 6 Ps of musculoskeletal assessment, which is often the earliest sign of compartment syndrome?", options: ["Pain out of proportion", "Pulselessness", "Paralysis", "Pallor"], answer: ["Pain out of proportion"], type: "single", category: "Ch 33: Ortho", section: "Trauma", rationale: "Pain out of proportion to the injury is the earliest and most reliable sign of compartment syndrome." },
    
    { q: "Which gas law explains the formation of nitrogen bubbles in 'The Bends'?", options: ["Boyle's Law", "Henry's Law", "Dalton's Law", "Charles's Law"], answer: ["Henry's Law"], type: "single", category: "Ch 34: Environmental", section: "Trauma", rationale: "Henry's Law states that the amount of gas dissolved in a liquid is proportional to the pressure of that gas." },
    { q: "A patient in 'Heat Stroke' is distinguished by which clinical finding?", options: ["Tachycardia", "Hot skin", "Altered Mental Status", "Muscle cramps"], answer: ["Altered Mental Status"], type: "single", category: "Ch 34: Environmental", section: "Trauma", rationale: "CNS dysfunction (Altered Mental Status) is the hallmark differentiator of Heat Stroke." }
    // (Add more following this pattern)
    // ... Additional questions follow this exact syntax.
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
    
    // This unlocks the slider to the full length of your bank
    slider.max = availableCount;
    
    // If the slider is at 20 but you have 130, this lets it move
    if (parseInt(slider.value) > availableCount || parseInt(slider.value) <= 20) {
        slider.value = availableCount > 20 ? 20 : availableCount;
    }
    updateSliderLabel(slider.value);
}

// Add this to the very bottom of your script.js file
window.onload = function() {
    adjustSliderRange();
};
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
    
    if (isCorrect) score++;

    if (mode === 'review') {
        const fb = document.getElementById('feedback');
        fb.innerHTML = isCorrect ? `<b style="color:green">Correct!</b>` : `<b style="color:red">Incorrect.</b> Answer: ${q.answer.join(", ")}`;
        fb.innerHTML += `<br><small>${q.rationale}</small>`;
        const btn = document.getElementById('action-btn');
        btn.innerText = "Next Question";
        btn.onclick = () => {
            currentIdx++;
            if (currentIdx < sessionQuestions.length) { showQuestion(); btn.innerText = "Submit Answer"; btn.onclick = handleAction; }
            else showResults();
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
    document.getElementById('score-display').innerText = `Score: ${score} / ${sessionQuestions.length} (${percent}%)`;
}

// FORCE INITIALIZE SLIDER
window.onload = function() {
    adjustSliderRange();
};
