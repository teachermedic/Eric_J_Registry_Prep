// Original educational cases with linked clinical references.
window.CHANGE_FINDING_CASES=[
  {
    "id": "effective-cough",
    "category": "Airway",
    "title": "Listen to the cough",
    "scene": "A conscious adult begins choking during a meal.",
    "prompt": "What is your immediate priority?",
    "choices": [
      "Encourage coughing and observe closely.",
      "Start severe-choking care and get help."
    ],
    "variants": [
      {
        "finding": "They cough forcefully.",
        "correct": 0,
        "note": "An effective cough moves air. Stay with the patient and watch for deterioration."
      },
      {
        "finding": "Their cough is weak and ineffective.",
        "correct": 1,
        "note": "A weak cough signals severe obstruction. For this adult, use cycles of five back blows and five abdominal thrusts while help is activated."
      }
    ],
    "source": {
      "label": "AHA 2025 Adult Basic Life Support",
      "url": "https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-basic-life-support"
    },
    "checkedOn": "2026-10-01",
    "scopeSource": {
      "label": "NHTSA/NASEMSO national scope model",
      "url": "https://rosap.ntl.bts.gov/view/dot/56917"
    }
  },
  {
    "id": "adult-pulse",
    "category": "Airway",
    "title": "Check circulation",
    "scene": "An adult is unresponsive and not breathing normally. Help and an AED are being obtained. You check for a pulse for no more than 10 seconds.",
    "prompt": "Which pathway fits?",
    "choices": [
      "Provide breaths and reassess the pulse.",
      "Begin CPR and use the AED promptly."
    ],
    "variants": [
      {
        "finding": "A definite pulse is present.",
        "correct": 0,
        "note": "With a definite pulse, support ventilation: one breath every six seconds for an adult. Reassess the pulse about every two minutes."
      },
      {
        "finding": "No definite pulse is felt.",
        "correct": 1,
        "note": "No definite pulse plus abnormal breathing calls for CPR. Gasping is not normal breathing. Apply the AED as soon as available."
      }
    ],
    "source": {
      "label": "AHA 2025: Adult Basic Life Support",
      "url": "https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-basic-life-support"
    },
    "checkedOn": "2026-10-01",
    "scopeSource": {
      "label": "NHTSA/NASEMSO national scope model",
      "url": "https://rosap.ntl.bts.gov/view/dot/56917"
    }
  },
  {
    "id": "tachy-pressure",
    "category": "Cardiac",
    "title": "A fast rhythm, a different pressure",
    "scene": "An adult has a persistent regular narrow-complex tachyarrhythmia at 180/min with a pulse. They are alert, without ischemic chest discomfort or acute heart failure.",
    "prompt": "Which care priority fits an EMT or AEMT?",
    "choices": [
      "Support and monitor while arranging appropriate evaluation.",
      "Recognize rhythm-related instability, provide support, and request paramedic-level intervention."
    ],
    "variants": [
      {
        "finding": "Blood pressure is 126/78 mmHg.",
        "correct": 0,
        "note": "A fast rate alone does not establish instability. Continue monitoring and evaluate rhythm-specific treatment."
      },
      {
        "finding": "Blood pressure is 72/40 mmHg because of the tachyarrhythmia.",
        "correct": 1,
        "note": "Hypotension caused by the rhythm signals instability. Continue support and request higher-level care. Synchronized cardioversion is outside EMT/AEMT scope in the supplied national model."
      }
    ],
    "source": {
      "label": "AHA 2025: Tachyarrhythmia with a pulse algorithm",
      "url": "https://cpr.heart.org/-/media/CPR-Files/CPR-Guidelines-Files/2025-Algorithms/Algorithm-ACLS-Tachycardia-250514.pdf"
    },
    "checkedOn": "2026-10-01",
    "scopeSource": {
      "label": "NHTSA/NASEMSO national scope model",
      "url": "https://rosap.ntl.bts.gov/view/dot/56917"
    }
  },
  {
    "id": "arrest-rhythm",
    "category": "Cardiac",
    "title": "The rhythm changes the next step",
    "scene": "An adult is pulseless. CPR is underway and an AED is attached.",
    "prompt": "Which AED-directed action applies?",
    "choices": [
      "Deliver the advised shock, then immediately resume CPR.",
      "Immediately resume CPR and follow AED prompts."
    ],
    "variants": [
      {
        "finding": "The AED advises a shock.",
        "correct": 0,
        "note": "VF is shockable. Keep pauses brief and resume compressions immediately after the shock."
      },
      {
        "finding": "The AED advises no shock.",
        "correct": 1,
        "note": "No shock advised does not establish a pulse. Resume CPR and follow the AED prompts while higher-level care is obtained."
      }
    ],
    "source": {
      "label": "AHA 2025: Adult Advanced Life Support",
      "url": "https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-advanced-life-support"
    },
    "checkedOn": "2026-10-01",
    "scopeSource": {
      "label": "NHTSA/NASEMSO national scope model",
      "url": "https://rosap.ntl.bts.gov/view/dot/56917"
    }
  },
  {
    "id": "bleed-location",
    "category": "Trauma",
    "title": "Location matters",
    "scene": "Life-threatening external bleeding continues despite pressure. You have bleeding-control supplies and training.",
    "prompt": "Which additional method fits the wound location?",
    "choices": [
      "Apply a limb tourniquet proximal to the wound.",
      "Pack the accessible wound and maintain pressure."
    ],
    "variants": [
      {
        "finding": "The wound is on the mid-thigh.",
        "correct": 0,
        "note": "A limb tourniquet can stop severe extremity bleeding. Avoid placing it over a joint."
      },
      {
        "finding": "The wound is at the groin junction, too high for a standard limb tourniquet.",
        "correct": 1,
        "note": "A standard limb tourniquet cannot fit above this junctional wound. Use packing and sustained pressure under training and protocol."
      }
    ],
    "source": {
      "label": "American Red Cross: Life-threatening bleeding",
      "url": "https://www.redcross.org/take-a-class/resources/learn-first-aid/bleeding-life-threatening-external"
    },
    "checkedOn": "2026-10-01",
    "scopeSource": {
      "label": "NHTSA/NASEMSO national scope model",
      "url": "https://rosap.ntl.bts.gov/view/dot/56917"
    }
  },
  {
    "id": "embedded-object",
    "category": "Trauma",
    "title": "Before you press",
    "scene": "An adult has an externally bleeding forearm wound. You are choosing where to apply manual pressure.",
    "prompt": "Where should you apply pressure?",
    "choices": [
      "Directly over the wound with a dressing.",
      "Around the object while stabilizing it."
    ],
    "variants": [
      {
        "finding": "No object remains in the wound.",
        "correct": 0,
        "note": "Direct pressure is appropriate over this wound. Escalate bleeding control if needed."
      },
      {
        "finding": "A piece of glass remains embedded in the wound.",
        "correct": 1,
        "note": "Leave the embedded glass in place. Press around it and stabilize it; removal can worsen bleeding."
      }
    ],
    "source": {
      "label": "American Red Cross: Life-threatening bleeding",
      "url": "https://www.redcross.org/take-a-class/resources/learn-first-aid/bleeding-life-threatening-external"
    },
    "checkedOn": "2026-10-01",
    "scopeSource": {
      "label": "NHTSA/NASEMSO national scope model",
      "url": "https://rosap.ntl.bts.gov/view/dot/56917"
    }
  },
  {
    "id": "pregnancy-seizure",
    "category": "OB/GYN",
    "title": "A new neurologic finding",
    "scene": "A patient at 32 weeks has diagnosed preeclampsia, BP 170/112, and a severe headache.",
    "prompt": "Which working concern best fits?",
    "choices": [
      "Preeclampsia with severe features.",
      "Suspected eclampsia."
    ],
    "variants": [
      {
        "finding": "No seizure has occurred.",
        "correct": 0,
        "note": "Severe hypertension and headache require urgent care even before a seizure. Support the patient and expedite obstetric evaluation."
      },
      {
        "finding": "A new generalized seizure occurs without an identified alternative cause.",
        "correct": 1,
        "note": "A new seizure in this setting raises concern for eclampsia. Protect the airway and patient, obtain ALS care including magnesium per protocol, and expedite obstetric care. Other seizure causes still need consideration."
      }
    ],
    "source": {
      "label": "Merck Manual: Preeclampsia and eclampsia",
      "url": "https://www.merckmanuals.com/professional/gynecology-and-obstetrics/antenatal-complications/preeclampsia-and-eclampsia"
    },
    "checkedOn": "2026-10-01",
    "scopeSource": {
      "label": "NHTSA/NASEMSO national scope model",
      "url": "https://rosap.ntl.bts.gov/view/dot/56917"
    }
  },
  {
    "id": "uterine-tone",
    "category": "OB/GYN",
    "title": "Bleeding after birth",
    "scene": "A patient has heavy vaginal bleeding after delivery. Shock care and urgent transport are underway.",
    "prompt": "How does this finding guide your concern?",
    "choices": [
      "Uterine atony becomes a leading concern.",
      "Consider other bleeding causes, including genital-tract injury."
    ],
    "variants": [
      {
        "finding": "The uterus feels soft and poorly contracted.",
        "correct": 0,
        "note": "Poor uterine contraction can allow continued bleeding. Uterine massage may be indicated within your training and protocol."
      },
      {
        "finding": "The uterus feels firm and well contracted.",
        "correct": 1,
        "note": "A firm uterus does not make heavy bleeding safe. Consider other causes and communicate the finding; tone alone does not establish the diagnosis."
      }
    ],
    "source": {
      "label": "Merck Manual: Postpartum hemorrhage",
      "url": "https://www.merckmanuals.com/professional/gynecology-and-obstetrics/intrapartum-complications/postpartum-hemorrhage"
    },
    "checkedOn": "2026-10-01",
    "scopeSource": {
      "label": "NHTSA/NASEMSO national scope model",
      "url": "https://rosap.ntl.bts.gov/view/dot/56917"
    }
  },
  {
    "id": "pediatric-rate",
    "category": "Pediatrics",
    "title": "A pulse is not the whole story",
    "scene": "A 6-year-old child has persistent poor perfusion despite effective oxygenation and ventilation. A pulse is present.",
    "prompt": "Which action fits the heart rate?",
    "choices": [
      "Continue support and urgent evaluation; no compressions solely for this rate.",
      "Begin CPR while continuing oxygenation and ventilation."
    ],
    "variants": [
      {
        "finding": "Heart rate is 80/min.",
        "correct": 0,
        "note": "Poor perfusion still requires urgent treatment, but this rate does not meet the less-than-60 CPR trigger."
      },
      {
        "finding": "Heart rate is 50/min.",
        "correct": 1,
        "note": "A rate below 60/min with poor perfusion despite effective oxygenation and ventilation is an indication for CPR in a child."
      }
    ],
    "source": {
      "label": "AHA 2025: Pediatric Advanced Life Support",
      "url": "https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/pediatric-advanced-life-support"
    },
    "checkedOn": "2026-10-01",
    "scopeSource": {
      "label": "NHTSA/NASEMSO national scope model",
      "url": "https://rosap.ntl.bts.gov/view/dot/56917"
    }
  },
  {
    "id": "infant-response",
    "category": "Pediatrics",
    "title": "When the infant stops responding",
    "scene": "An infant has severe choking and cannot cough effectively. Emergency help has been activated.",
    "prompt": "Which care sequence fits?",
    "choices": [
      "Alternate five back blows and five chest thrusts.",
      "Place on a firm surface and begin CPR with compressions."
    ],
    "variants": [
      {
        "finding": "The infant remains responsive.",
        "correct": 0,
        "note": "For a responsive choking infant, use back blows and chest thrusts. Do not use abdominal thrusts."
      },
      {
        "finding": "The infant becomes unresponsive.",
        "correct": 1,
        "note": "Unresponsiveness changes the sequence to CPR. Before breaths, look for an object and remove it only if visible; never perform a blind finger sweep."
      }
    ],
    "source": {
      "label": "AHA 2025 Pediatric Basic Life Support",
      "url": "https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/pediatric-basic-life-support"
    },
    "checkedOn": "2026-10-01",
    "scopeSource": {
      "label": "NHTSA/NASEMSO national scope model",
      "url": "https://rosap.ntl.bts.gov/view/dot/56917"
    }
  },
  {
    "id": "param-manual-arrest",
    "level": "Paramedic",
    "category": "Cardiac",
    "title": "Manual monitor: shock or early epinephrine?",
    "scene": "An adult is pulseless. High-quality CPR is underway, pads are attached, and a patent IV is ready. This is the first rhythm assessment.",
    "prompt": "Which ALS priority does the rhythm support?",
    "choices": [
      "Defibrillate promptly, then immediately resume CPR.",
      "Continue CPR and give epinephrine as soon as feasible per protocol; do not shock this rhythm."
    ],
    "variants": [
      {
        "finding": "The monitor shows ventricular fibrillation.",
        "correct": 0,
        "note": "VF needs rapid defibrillation. Do not delay the first shock for epinephrine."
      },
      {
        "finding": "The monitor shows an organized rhythm, but there is no pulse: PEA.",
        "correct": 1,
        "note": "PEA is not shockable. Prioritize CPR, early epinephrine, and reversible causes."
      }
    ],
    "source": {
      "label": "AHA 2025 Adult Advanced Life Support (Circulation)",
      "url": "https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-advanced-life-support",
      "kind": "peer-reviewed clinical reference"
    },
    "sources": [
      {
        "label": "AHA 2025 Adult Advanced Life Support (Circulation)",
        "url": "https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-advanced-life-support",
        "kind": "peer-reviewed clinical reference"
      },
      {
        "label": "Drennan et al. 2025: ILCOR ALS CoSTR (Circulation)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/41122842/",
        "kind": "peer-reviewed consensus guideline"
      }
    ],
    "checkedOn": "2026-10-02",
    "scopeSource": {
      "label": "NHTSA/NASEMSO national scope model",
      "url": "https://rosap.ntl.bts.gov/view/dot/56917",
      "kind": "consensus scope framework"
    }
  },
  {
    "id": "param-tube-waveform",
    "level": "Paramedic",
    "category": "Airway",
    "title": "A tube is placed. Is it confirmed?",
    "scene": "An adult with a definite pulse has just been intubated. A functioning capnograph is connected. You evaluate exhaled CO2 over repeated breaths.",
    "prompt": "How should this finding change your airway plan?",
    "choices": [
      "Use clinical assessment plus the sustained waveform to confirm placement; continue monitoring.",
      "Treat placement as unconfirmed; actively exclude esophageal intubation and restore reliable ventilation."
    ],
    "variants": [
      {
        "finding": "A sustained exhaled CO2 waveform is present.",
        "correct": 0,
        "note": "A sustained trace supports tracheal placement. Continue checking ventilation, depth, and oxygenation; a trace does not exclude mainstem placement."
      },
      {
        "finding": "No sustained exhaled CO2 waveform is present.",
        "correct": 1,
        "note": "Do not accept chest movement alone as confirmation. Check the circuit promptly; if esophageal placement cannot be excluded, remove the tube and use BVM or an SGA per protocol."
      }
    ],
    "source": {
      "label": "Chrimes et al. 2022: preventing unrecognised oesophageal intubation (Anaesthesia)",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9804892/",
      "kind": "peer-reviewed consensus guideline"
    },
    "sources": [
      {
        "label": "Chrimes et al. 2022: preventing unrecognised oesophageal intubation (Anaesthesia)",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9804892/",
        "kind": "peer-reviewed consensus guideline"
      },
      {
        "label": "AHA 2025 Adult Advanced Life Support (Circulation)",
        "url": "https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-advanced-life-support",
        "kind": "peer-reviewed clinical reference"
      }
    ],
    "checkedOn": "2026-10-02",
    "scopeSource": {
      "label": "NHTSA/NASEMSO national scope model",
      "url": "https://rosap.ntl.bts.gov/view/dot/56917",
      "kind": "consensus scope framework"
    }
  },
  {
    "id": "param-opioid-pulse",
    "level": "Paramedic",
    "category": "Medical",
    "title": "Opioid emergency: the pulse changes the pathway",
    "scene": "An adult with suspected opioid poisoning is unresponsive and not breathing. Help and resuscitation equipment are present; assess for a pulse for no more than 10 seconds.",
    "prompt": "Which resuscitation priority fits?",
    "choices": [
      "Support ventilation immediately and give naloxone per protocol.",
      "Start CPR with ventilation and the cardiac-arrest pathway; naloxone must not delay those actions."
    ],
    "variants": [
      {
        "finding": "A definite pulse is present.",
        "correct": 0,
        "note": "Respiratory arrest needs ventilation now, with naloxone to reverse suspected opioid effects. Continue reassessing breathing and circulation."
      },
      {
        "finding": "No definite pulse is present.",
        "correct": 1,
        "note": "Use standard arrest care. Naloxone may be added without interrupting CPR, ventilation, or defibrillation. Reviews have not established a causal survival benefit for intra-arrest naloxone."
      }
    ],
    "source": {
      "label": "AHA 2025 Special Circumstances: opioid emergencies (Circulation)",
      "url": "https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-and-pediatric-special-circumstances-of-resuscitation",
      "kind": "peer-reviewed clinical reference"
    },
    "sources": [
      {
        "label": "AHA 2025 Special Circumstances: opioid emergencies (Circulation)",
        "url": "https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-and-pediatric-special-circumstances-of-resuscitation",
        "kind": "peer-reviewed clinical reference"
      },
      {
        "label": "Grunau et al. 2025: opioid-associated arrest (Resuscitation Plus)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/40129502/",
        "kind": "systematic review"
      },
      {
        "label": "Siddiqui et al. 2026: EMS naloxone in cardiac arrest (PLOS One)",
        "url": "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0351738",
        "kind": "systematic review"
      }
    ],
    "checkedOn": "2026-10-02",
    "scopeSource": {
      "label": "NHTSA/NASEMSO national scope model",
      "url": "https://rosap.ntl.bts.gov/view/dot/56917",
      "kind": "consensus scope framework"
    }
  },
  {
    "id": "param-allergy-airway",
    "level": "Paramedic",
    "category": "Medical",
    "title": "Hives: listen for the airway clue",
    "scene": "An adult develops generalized hives shortly after eating a known allergen. BP is 124/76, with no vomiting or other organ-system symptoms. You reassess the upper airway.",
    "prompt": "Which treatment priority fits the new clue?",
    "choices": [
      "Monitor the skin-only reaction closely and reassess for progression.",
      "Treat suspected anaphylaxis with prompt IM epinephrine and airway support per protocol."
    ],
    "variants": [
      {
        "finding": "There is no upper-airway involvement.",
        "correct": 0,
        "note": "Isolated hives in this defined presentation do not by themselves establish anaphylaxis. Reassess frequently; deterioration changes the plan."
      },
      {
        "finding": "New stridor indicates upper-airway involvement.",
        "correct": 1,
        "note": "Hives plus airway involvement after allergen exposure warrant prompt epinephrine. Do not wait for hypotension or let antihistamines delay first-line treatment."
      }
    ],
    "source": {
      "label": "Abrams et al. 2024: Anaphylaxis",
      "url": "https://pubmed.ncbi.nlm.nih.gov/39654057/",
      "kind": "peer-reviewed clinical review"
    },
    "sources": [
      {
        "label": "Abrams et al. 2024: Anaphylaxis",
        "url": "https://pubmed.ncbi.nlm.nih.gov/39654057/",
        "kind": "peer-reviewed clinical review"
      },
      {
        "label": "Dribin et al. 2026: epinephrine and EMS activation (JACI)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/41386477/",
        "kind": "peer-reviewed consensus report"
      }
    ],
    "checkedOn": "2026-10-02",
    "scopeSource": {
      "label": "NHTSA/NASEMSO national scope model",
      "url": "https://rosap.ntl.bts.gov/view/dot/56917",
      "kind": "consensus scope framework"
    }
  },
  {
    "id": "param-rosc-oxygen",
    "level": "Paramedic",
    "category": "Cardiac",
    "title": "After ROSC: can you trust the oxygen reading?",
    "scene": "An adult has sustained ROSC and receives assisted ventilation with 100% oxygen. The oximeter displays 100%; you assess whether the measurement is trustworthy.",
    "prompt": "When is oxygen titration appropriate?",
    "choices": [
      "Titrate oxygen to the protocol target while monitoring; this exercise uses the ILCOR 94–98% target.",
      "Maintain 100% oxygen until oxygenation can be measured reliably; troubleshoot the sensor."
    ],
    "variants": [
      {
        "finding": "The pleth signal is strong and agrees with the measured pulse.",
        "correct": 0,
        "note": "A reliable measurement permits titration to avoid both low oxygen and unnecessary excess oxygen. ILCOR suggests 94–98%; follow your local target."
      },
      {
        "finding": "The pleth signal is unreliable and does not agree with the measured pulse.",
        "correct": 1,
        "note": "An unreliable number cannot guide safe titration. Continue oxygen and obtain a reliable measure before reducing it."
      }
    ],
    "source": {
      "label": "ILCOR 2025 ALS CoSTR: oxygen targets after ROSC",
      "url": "https://ilcor.org/uploads/ALS-2025-COSTR-Full-Chapter.pdf",
      "kind": "peer-reviewed consensus guideline"
    },
    "sources": [
      {
        "label": "ILCOR 2025 ALS CoSTR: oxygen targets after ROSC",
        "url": "https://ilcor.org/uploads/ALS-2025-COSTR-Full-Chapter.pdf",
        "kind": "peer-reviewed consensus guideline"
      },
      {
        "label": "AHA 2025 Post-Cardiac Arrest Care (Circulation)",
        "url": "https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/post-cardiac-arrest-care",
        "kind": "peer-reviewed clinical reference"
      }
    ],
    "checkedOn": "2026-10-02",
    "scopeSource": {
      "label": "NHTSA/NASEMSO national scope model",
      "url": "https://rosap.ntl.bts.gov/view/dot/56917",
      "kind": "consensus scope framework"
    }
  },
  {
    "id": "param-seizure-time",
    "level": "Paramedic",
    "category": "Neurology",
    "title": "The seizure clock matters",
    "scene": "An adult has an ongoing generalized convulsion. Airway support and monitoring are underway, glucose is normal, and no rescue benzodiazepine has been given. Reliable witnesses timed the onset.",
    "prompt": "Which priority fits the elapsed time?",
    "choices": [
      "Continue support and close timing; prepare treatment for persistent or recurrent seizure activity per protocol.",
      "Treat convulsive status epilepticus promptly with a protocol benzodiazepine while maintaining airway support."
    ],
    "variants": [
      {
        "finding": "Continuous convulsions have lasted 2 minutes.",
        "correct": 0,
        "note": "This duration alone has not reached the 5-minute operational threshold. Stay ready to treat; recurrent seizures without recovery can also indicate status."
      },
      {
        "finding": "Continuous convulsions have lasted 6 minutes.",
        "correct": 1,
        "note": "Do not wait for a 30-minute duration. Give timely first-line benzodiazepine therapy by an available authorized route, with ventilation and reassessment."
      }
    ],
    "source": {
      "label": "2026: Status epilepticus systematic review and clinical update (Emergencias)",
      "url": "https://pubmed.ncbi.nlm.nih.gov/42345989/",
      "kind": "systematic review and clinical update"
    },
    "sources": [
      {
        "label": "2026: Status epilepticus systematic review and clinical update (Emergencias)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/42345989/",
        "kind": "systematic review and clinical update"
      },
      {
        "label": "2025: Emergency department management of status epilepticus (Emergency Medicine Practice)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/40825177/",
        "kind": "peer-reviewed clinical review"
      },
      {
        "label": "2026: Prehospital rescue treatment of seizures and status epilepticus",
        "url": "https://pubmed.ncbi.nlm.nih.gov/41486219/",
        "kind": "peer-reviewed clinical review"
      }
    ],
    "checkedOn": "2026-10-02",
    "scopeSource": {
      "label": "NHTSA/NASEMSO national scope model",
      "url": "https://rosap.ntl.bts.gov/view/dot/56917",
      "kind": "consensus scope framework"
    }
  }
];
