// Original sequencing exercises. Dependencies are teaching priorities, not a complete protocol.
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
  }
];
