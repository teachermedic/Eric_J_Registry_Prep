// Original educational cases with linked clinical references.
window.WHAT_FIRST_CASES=[
  {
    "id": "emt-adult-arrest",
    "level": "EMT",
    "title": "Adult arrest: help, CPR, AED",
    "scene": "The scene is safe. You identify adult cardiac arrest. You are the only trained responder, with a phone within reach; a bystander can retrieve an AED.",
    "steps": [
      {
        "id": "0",
        "text": "Activate emergency response on speakerphone; send for the AED.",
        "note": "Get help without leaving the patient."
      },
      {
        "id": "1",
        "text": "Begin high-quality CPR while the AED is retrieved.",
        "note": "Do not wait for equipment to start CPR."
      },
      {
        "id": "2",
        "text": "Use the AED promptly when it arrives.",
        "note": "Follow analysis prompts and minimize interruptions."
      },
      {
        "id": "3",
        "text": "Follow the shock/no-shock prompt, then immediately resume CPR.",
        "note": "No shock advised does not establish a pulse."
      }
    ],
    "dependencies": [
      [
        "0",
        "1"
      ],
      [
        "1",
        "2"
      ],
      [
        "2",
        "3"
      ]
    ],
    "parallel": "Additional trained responders can activate help and prepare the AED while CPR continues.",
    "sources": [
      {
        "label": "AHA 2025 Adult BLS",
        "url": "https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-basic-life-support",
        "kind": "peer-reviewed clinical reference"
      }
    ],
    "scope": {
      "label": "NHTSA/NASEMSO national scope model",
      "url": "https://rosap.ntl.bts.gov/view/dot/56917",
      "kind": "consensus scope framework"
    },
    "checkedOn": "2026-10-01"
  },
  {
    "id": "emt-infant-choking",
    "level": "EMT",
    "title": "Infant choking: the response changes",
    "scene": "Help is activated. An infant with severe choking is initially responsive, then becomes unresponsive after the first care step.",
    "steps": [
      {
        "id": "0",
        "text": "While responsive, alternate five back blows and five chest thrusts.",
        "note": "No abdominal thrusts for an infant."
      },
      {
        "id": "1",
        "text": "When unresponsive, place on a firm surface and start CPR with compressions.",
        "note": "Unresponsiveness changes the pathway."
      },
      {
        "id": "2",
        "text": "Before breaths, open the mouth; remove an object only if visible.",
        "note": "Never perform a blind finger sweep."
      },
      {
        "id": "3",
        "text": "Attempt breaths and continue CPR.",
        "note": "Continue resuscitation and follow arriving help."
      }
    ],
    "dependencies": [
      [
        "0",
        "1"
      ],
      [
        "1",
        "2"
      ],
      [
        "2",
        "3"
      ]
    ],
    "parallel": "These cards follow a changing patient state; they are not a list of simultaneous actions.",
    "sources": [
      {
        "label": "AHA 2025 Pediatric BLS",
        "url": "https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/pediatric-basic-life-support",
        "kind": "peer-reviewed clinical reference"
      }
    ],
    "scope": {
      "label": "NHTSA/NASEMSO national scope model",
      "url": "https://rosap.ntl.bts.gov/view/dot/56917",
      "kind": "consensus scope framework"
    },
    "checkedOn": "2026-10-01"
  },
  {
    "id": "aemt-airway",
    "level": "AEMT",
    "title": "Ventilation before airway escalation",
    "scene": "An apneic adult has a definite pulse. Initial BVM breaths are ineffective. In this scenario they remain ineffective after optimization. You are trained and authorized to use an SGA.",
    "steps": [
      {
        "id": "0",
        "text": "Optimize airway position, adjuncts and mask seal; use two-person BVM if available.",
        "note": "Check the basic causes of ineffective breaths."
      },
      {
        "id": "1",
        "text": "Because ventilation remains ineffective, place an appropriate SGA per protocol.",
        "note": "SGAs are an AEMT skill in the supplied scope model."
      },
      {
        "id": "2",
        "text": "Confirm effective ventilation and device position, including waveform capnography when available.",
        "note": "Placement is not proof of effective ventilation."
      },
      {
        "id": "3",
        "text": "Monitor ventilation continuously and reassess after movement.",
        "note": "Deterioration requires prompt reassessment."
      }
    ],
    "dependencies": [
      [
        "0",
        "1"
      ],
      [
        "1",
        "2"
      ],
      [
        "2",
        "3"
      ]
    ],
    "parallel": "Partners obtain help and prepare equipment during ventilation; do not pause support simply to prepare a device.",
    "sources": [
      {
        "label": "NAEMSP 2022 Manual Ventilation",
        "url": "https://pubmed.ncbi.nlm.nih.gov/35001826/",
        "kind": "peer-reviewed clinical reference"
      },
      {
        "label": "NAEMSP 2022 Supraglottic Airways",
        "url": "https://pubmed.ncbi.nlm.nih.gov/35001830/",
        "kind": "peer-reviewed clinical reference"
      }
    ],
    "scope": {
      "label": "NHTSA/NASEMSO national scope model",
      "url": "https://rosap.ntl.bts.gov/view/dot/56917",
      "kind": "consensus scope framework"
    },
    "checkedOn": "2026-10-01"
  },
  {
    "id": "aemt-glucose",
    "level": "AEMT",
    "title": "Hypoglycemia: route before medication",
    "scene": "An adult is obtunded with glucose 32 mg/dL. Airway and breathing are supported; oral swallowing is unsafe. Your protocol allows IV dextrose and IV access is not yet established.",
    "steps": [
      {
        "id": "0",
        "text": "Recognize symptomatic hypoglycemia and avoid the unsafe oral route.",
        "note": "Protect against aspiration."
      },
      {
        "id": "1",
        "text": "Establish and confirm a patent IV.",
        "note": "Confirm access before an IV medication."
      },
      {
        "id": "2",
        "text": "Administer IV dextrose according to protocol.",
        "note": "Follow local concentration and dose instructions."
      },
      {
        "id": "3",
        "text": "Reassess glucose, mental status and airway protection.",
        "note": "Do not assume improvement without reassessment."
      }
    ],
    "dependencies": [
      [
        "0",
        "1"
      ],
      [
        "1",
        "2"
      ],
      [
        "2",
        "3"
      ]
    ],
    "parallel": "Airway support continues throughout. This exercise assumes prompt IV access; failed access needs an alternative protocol pathway.",
    "sources": [
      {
        "label": "Sanello et al. 2018: Prehospital Altered Mental Status",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5942021/",
        "kind": "peer-reviewed clinical reference"
      }
    ],
    "scope": {
      "label": "NHTSA/NASEMSO national scope model",
      "url": "https://rosap.ntl.bts.gov/view/dot/56917",
      "kind": "consensus scope framework"
    },
    "checkedOn": "2026-10-01"
  },
  {
    "id": "param-vf",
    "level": "Paramedic",
    "title": "VF: one defibrillation cycle",
    "scene": "An adult is pulseless. CPR is ongoing, pads are attached and the monitor shows VF. Order the next shock cycle, not the entire arrest algorithm.",
    "steps": [
      {
        "id": "0",
        "text": "Prepare defibrillation while compressions continue.",
        "note": "Prioritize rapid defibrillation."
      },
      {
        "id": "1",
        "text": "Clear the patient and deliver the shock with the shortest feasible pause.",
        "note": "Use device-recommended energy and safe clearance."
      },
      {
        "id": "2",
        "text": "Immediately resume CPR.",
        "note": "Do not pause for an immediate post-shock pulse check."
      },
      {
        "id": "3",
        "text": "After about two minutes of CPR, reassess the rhythm.",
        "note": "Coordinate rhythm assessment with minimal interruption."
      }
    ],
    "dependencies": [
      [
        "0",
        "1"
      ],
      [
        "1",
        "2"
      ],
      [
        "2",
        "3"
      ]
    ],
    "parallel": "Access, airway care and other indicated treatments proceed in parallel without delaying CPR or defibrillation.",
    "sources": [
      {
        "label": "AHA 2025 Adult Cardiac Arrest Algorithm",
        "url": "https://cpr.heart.org/-/media/CPR-Files/CPR-Guidelines-Files/2025-Algorithms/Algorithm-ACLS-CA-250527.pdf",
        "kind": "peer-reviewed clinical reference"
      }
    ],
    "scope": {
      "label": "NHTSA/NASEMSO national scope model",
      "url": "https://rosap.ntl.bts.gov/view/dot/56917",
      "kind": "consensus scope framework"
    },
    "checkedOn": "2026-10-01"
  },
  {
    "id": "param-tachy",
    "level": "Paramedic",
    "title": "Tachycardia: instability first",
    "scene": "Monitoring identifies regular narrow-complex tachycardia with a pulse. Airway support and monitoring are underway. Hypotension and confusion are attributable to the rhythm.",
    "steps": [
      {
        "id": "0",
        "text": "Recognize rhythm-related instability.",
        "note": "Fast rate alone is not enough; assess its clinical effect."
      },
      {
        "id": "1",
        "text": "Prepare synchronized cardioversion; sedate if feasible without delaying treatment.",
        "note": "Do not delay urgent treatment for optional preparation."
      },
      {
        "id": "2",
        "text": "Verify synchronization and deliver cardioversion per protocol.",
        "note": "Synchronization distinguishes this treatment from defibrillation."
      },
      {
        "id": "3",
        "text": "Reassess rhythm, perfusion and need for further treatment.",
        "note": "A shock does not end assessment."
      }
    ],
    "dependencies": [
      [
        "0",
        "1"
      ],
      [
        "1",
        "2"
      ],
      [
        "2",
        "3"
      ]
    ],
    "parallel": "Partners can prepare equipment while instability is assessed; this sequence represents decision dependencies.",
    "sources": [
      {
        "label": "AHA 2025 Tachyarrhythmia Algorithm",
        "url": "https://cpr.heart.org/-/media/CPR-Files/CPR-Guidelines-Files/2025-Algorithms/Algorithm-ACLS-Tachycardia-250514.pdf",
        "kind": "peer-reviewed clinical reference"
      }
    ],
    "scope": {
      "label": "NHTSA/NASEMSO national scope model",
      "url": "https://rosap.ntl.bts.gov/view/dot/56917",
      "kind": "consensus scope framework"
    },
    "checkedOn": "2026-10-01"
  },
  {
    "id": "param-pea",
    "level": "Paramedic",
    "title": "PEA: access and early epinephrine",
    "scene": "Adult cardiac arrest: CPR and ventilation are already underway. Pads show an organized rhythm without a pulse. No vascular access is present. Order the access/medication branch, not the whole arrest algorithm.",
    "steps": [
      {
        "id": "0",
        "text": "Identify PEA as a nonshockable rhythm and continue CPR.",
        "note": "Do not defibrillate PEA."
      },
      {
        "id": "1",
        "text": "Obtain and confirm IV access; use IO if IV is unsuccessful or not feasible per protocol.",
        "note": "Prepare access while CPR continues."
      },
      {
        "id": "2",
        "text": "Give epinephrine as soon as feasible through confirmed access per protocol.",
        "note": "Do not wait through extra CPR cycles to give the indicated medication."
      },
      {
        "id": "3",
        "text": "At the scheduled approximately 2-minute check, reassess rhythm with a brief pause.",
        "note": "Reassess for a shockable rhythm or ROSC and continue the indicated pathway."
      }
    ],
    "dependencies": [
      [
        "0",
        "1"
      ],
      [
        "1",
        "2"
      ],
      [
        "0",
        "3"
      ]
    ],
    "parallel": "The access/epinephrine branch and the rhythm-check clock run in parallel. A scheduled rhythm check need not wait for successful access; ventilation and reversible-cause assessment continue.",
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
    "scope": {
      "label": "NHTSA/NASEMSO national scope model",
      "url": "https://rosap.ntl.bts.gov/view/dot/56917",
      "kind": "consensus scope framework"
    },
    "checkedOn": "2026-10-02"
  },
  {
    "id": "param-airway-confirmation",
    "level": "Paramedic",
    "title": "Intubation: confirmation before movement",
    "scene": "An adult needs an advanced airway. Effective BVM oxygenation is ongoing; a trained, authorized paramedic has decided to intubate with a rescue-airway plan. Order the placement-to-movement checks.",
    "steps": [
      {
        "id": "0",
        "text": "Prepare monitoring, capnography, equipment and the rescue plan while BVM support continues.",
        "note": "Preparation must preserve oxygenation."
      },
      {
        "id": "1",
        "text": "Place the endotracheal tube using the authorized airway approach.",
        "note": "This case assumes successful placement; failed attempts require the rescue pathway."
      },
      {
        "id": "2",
        "text": "Confirm sustained exhaled CO2 plus clinical ventilation assessment before accepting the tube.",
        "note": "If there is no sustained trace, actively exclude esophageal placement and restore ventilation."
      },
      {
        "id": "3",
        "text": "Secure the tube; monitor continuously and recheck after movement.",
        "note": "Reassess depth and ventilation as well as the waveform."
      }
    ],
    "dependencies": [
      [
        "0",
        "1"
      ],
      [
        "1",
        "2"
      ],
      [
        "2",
        "3"
      ]
    ],
    "parallel": "A partner prepares the stretcher and checks circulation while airway support continues. Absent confirmation requires rescue action, not progression to securing an unconfirmed tube.",
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
    "scope": {
      "label": "NHTSA/NASEMSO national scope model",
      "url": "https://rosap.ntl.bts.gov/view/dot/56917",
      "kind": "consensus scope framework"
    },
    "checkedOn": "2026-10-02"
  },
  {
    "id": "param-opioid-ventilation",
    "level": "Paramedic",
    "title": "Opioid respiratory arrest: breaths before waiting",
    "scene": "An adult with suspected opioid poisoning has a definite pulse but is apneic. You have BVM equipment and naloxone; you are the only clinician immediately delivering care.",
    "steps": [
      {
        "id": "0",
        "text": "Open the airway and immediately provide effective assisted ventilation.",
        "note": "Do not wait for the antagonist to work."
      },
      {
        "id": "1",
        "text": "Give naloxone by an available route according to protocol while sustaining ventilation.",
        "note": "Use the protocol dose and reassess the response."
      },
      {
        "id": "2",
        "text": "Reassess spontaneous breathing, ventilation and the pulse.",
        "note": "The immediate goal is effective breathing; continue assistance when needed."
      },
      {
        "id": "3",
        "text": "Continue monitoring and transport assessment for recurrent respiratory depression.",
        "note": "A response to naloxone does not eliminate the need for observation."
      }
    ],
    "dependencies": [
      [
        "0",
        "1"
      ],
      [
        "1",
        "2"
      ],
      [
        "2",
        "3"
      ]
    ],
    "parallel": "With more clinicians, ventilation and naloxone can start together. If the pulse is lost, transition immediately to cardiac-arrest care.",
    "sources": [
      {
        "label": "AHA 2025 Special Circumstances: opioid emergencies (Circulation)",
        "url": "https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-and-pediatric-special-circumstances-of-resuscitation",
        "kind": "peer-reviewed clinical reference"
      },
      {
        "label": "Siddiqui et al. 2026: EMS naloxone in cardiac arrest (PLOS One)",
        "url": "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0351738",
        "kind": "systematic review"
      }
    ],
    "scope": {
      "label": "NHTSA/NASEMSO national scope model",
      "url": "https://rosap.ntl.bts.gov/view/dot/56917",
      "kind": "consensus scope framework"
    },
    "checkedOn": "2026-10-02"
  },
  {
    "id": "param-anaphylaxis",
    "level": "Paramedic",
    "title": "Anaphylaxis: epinephrine before adjuncts",
    "scene": "An adult with a pulse develops hives, stridor and hypotension after allergen exposure. Oxygen and airway support are underway. IM epinephrine is immediately available; no IV is established.",
    "steps": [
      {
        "id": "0",
        "text": "Recognize anaphylaxis from the exposure and airway/circulatory findings.",
        "note": "A severe reaction does not need every possible symptom."
      },
      {
        "id": "1",
        "text": "Give IM epinephrine promptly per protocol.",
        "note": "Do not defer first-line treatment for IV access or an antihistamine."
      },
      {
        "id": "2",
        "text": "Reassess airway, breathing and perfusion; repeat IM epinephrine if indicated by protocol.",
        "note": "Persistent or returning symptoms require reassessment and escalation."
      },
      {
        "id": "3",
        "text": "Continue transport and monitoring; communicate treatment and the response.",
        "note": "Definitive evaluation remains necessary for this severe presentation."
      }
    ],
    "dependencies": [
      [
        "0",
        "1"
      ],
      [
        "1",
        "2"
      ],
      [
        "2",
        "3"
      ]
    ],
    "parallel": "Airway preparation, IV fluids for shock, and transport arrangements proceed in parallel. These cards describe the epinephrine decision branch, not every anaphylaxis intervention.",
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
    "scope": {
      "label": "NHTSA/NASEMSO national scope model",
      "url": "https://rosap.ntl.bts.gov/view/dot/56917",
      "kind": "consensus scope framework"
    },
    "checkedOn": "2026-10-02"
  },
  {
    "id": "param-rosc-oxygen-check",
    "level": "Paramedic",
    "title": "ROSC: measure before reducing oxygen",
    "scene": "An adult has sustained ROSC. Assisted ventilation uses 100% oxygen, and the initial oximeter reading has a poor signal. Perfusion support is underway. Order the oxygen-titration branch.",
    "steps": [
      {
        "id": "0",
        "text": "Continue 100% oxygen while the measurement is unreliable.",
        "note": "Avoid an unmeasured fall in oxygenation."
      },
      {
        "id": "1",
        "text": "Obtain a reliable oxygen measurement and assess signal quality.",
        "note": "Check the probe, waveform and agreement with the measured pulse."
      },
      {
        "id": "2",
        "text": "Titrate oxygen to the local target; this exercise uses ILCOR 94–98%.",
        "note": "Avoid hypoxemia and unnecessary hyperoxemia."
      },
      {
        "id": "3",
        "text": "Recheck oxygenation after adjustments and throughout transport.",
        "note": "Poor signal or clinical deterioration requires reassessment."
      }
    ],
    "dependencies": [
      [
        "0",
        "1"
      ],
      [
        "1",
        "2"
      ],
      [
        "2",
        "3"
      ]
    ],
    "parallel": "Blood-pressure support, ECG assessment, ventilation assessment and destination planning occur concurrently; this is only the oxygen branch. Oximetry is imperfect and must be interpreted clinically.",
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
    "scope": {
      "label": "NHTSA/NASEMSO national scope model",
      "url": "https://rosap.ntl.bts.gov/view/dot/56917",
      "kind": "consensus scope framework"
    },
    "checkedOn": "2026-10-02"
  },
  {
    "id": "param-status-route",
    "level": "Paramedic",
    "title": "Convulsive status: do not wait for an IV",
    "scene": "An adult has continuous generalized convulsions for 6 minutes. Airway support is underway, glucose is normal, and IV access is not promptly achievable. No benzodiazepine has been given; your protocol authorizes IM midazolam.",
    "steps": [
      {
        "id": "0",
        "text": "Recognize convulsive status and select the immediately available authorized route.",
        "note": "Persistent convulsions require timely treatment."
      },
      {
        "id": "1",
        "text": "Give protocol-dose IM midazolam without waiting for repeated IV attempts.",
        "note": "IM treatment is a valid first-line option when IV access is unavailable."
      },
      {
        "id": "2",
        "text": "Reassess seizure activity, breathing and perfusion after treatment.",
        "note": "Be ready to assist ventilation and follow repeat-dose instructions if needed."
      },
      {
        "id": "3",
        "text": "If seizures persist despite adequate first-line treatment, escalate per protocol and notify the receiving team.",
        "note": "Use authorized next-line treatment and expedite definitive care; do not improvise a hospital infusion regimen."
      }
    ],
    "dependencies": [
      [
        "0",
        "1"
      ],
      [
        "1",
        "2"
      ],
      [
        "2",
        "3"
      ]
    ],
    "parallel": "Airway support, glucose assessment, access attempts and transport can proceed with other team members. The case assumes normal glucose; hypoglycemia needs concurrent correction.",
    "sources": [
      {
        "label": "2026: Status epilepticus systematic review and clinical update (Emergencias)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/42345989/",
        "kind": "systematic review and clinical update"
      },
      {
        "label": "2026: Prehospital rescue treatment of seizures and status epilepticus",
        "url": "https://pubmed.ncbi.nlm.nih.gov/41486219/",
        "kind": "peer-reviewed clinical review"
      },
      {
        "label": "2025: Emergency department management of status epilepticus (Emergency Medicine Practice)",
        "url": "https://pubmed.ncbi.nlm.nih.gov/40825177/",
        "kind": "peer-reviewed clinical review"
      }
    ],
    "scope": {
      "label": "NHTSA/NASEMSO national scope model",
      "url": "https://rosap.ntl.bts.gov/view/dot/56917",
      "kind": "consensus scope framework"
    },
    "checkedOn": "2026-10-02"
  }
];
