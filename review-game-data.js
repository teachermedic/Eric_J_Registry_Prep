/* Original fictional teaching cases. Sources checked October 10, 2026. */
window.REVIEW_GAME_DATA = {
  "version": 1,
  "sources": {
    "standards": {
      "label": "National EMS Education Standards · scene safety, assessment and reassessment",
      "url": "https://www.ems.gov/assets/EMS_Education_Standards_2021_Updated2_24_25forEO.pdf"
    },
    "bls": {
      "label": "AHA 2025 · Adult Basic Life Support",
      "url": "https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-basic-life-support"
    },
    "head": {
      "label": "NICE NG232 · head injury and anticoagulant history",
      "url": "https://www.nice.org.uk/guidance/ng232/chapter/recommendations"
    },
    "handoff": {
      "label": "AHRQ TeamSTEPPS · communication and handoffs",
      "url": "https://www.ahrq.gov/teamstepps-program/curriculum/communication/tools/handoff.html"
    }
  },
  "cases": [
    {
      "id": "traffic",
      "title": "The open lane",
      "tag": "Scene size-up",
      "scene": "A patient is beside a disabled vehicle. Traffic is still moving through the lane between your ambulance and the patient. Police are arriving to control traffic.",
      "lines": [
        "Park the ambulance in a safe location and use appropriate visibility equipment.",
        "Identify moving traffic as an active hazard.",
        "Walk through the open traffic lane to reach the patient before police secure it.",
        "Request the resources needed to make patient access safe."
      ],
      "mistake": 2,
      "correction": "Coordinate traffic control and wait for a safe access route rather than entering an uncontrolled lane.",
      "why": "A visible patient does not make the route to that patient safe.",
      "levels": {
        "emt": "Identify the hazard before approaching. Do not become another patient.",
        "aemt": "Extra clinical skills do not change the need for safe access. Coordinate with the agencies managing traffic.",
        "paramedic": "Lead scene coordination while preparing care. Urgency changes resource needs, not the reality of an uncontrolled hazard."
      },
      "source": "standards"
    },
    {
      "id": "ventilation",
      "title": "History before breathing",
      "tag": "Primary assessment",
      "scene": "An adult is unresponsive with a definite pulse. Breathing is four shallow breaths per minute with very little chest rise. Airway equipment and a bag-valve mask are available.",
      "lines": [
        "Recognize that breathing is inadequate.",
        "Finish a detailed medication history before supporting the airway and ventilation.",
        "Ask a partner to prepare airway and ventilation equipment.",
        "Request additional help while managing the immediate threat."
      ],
      "mistake": 1,
      "correction": "Support the airway and provide effective assisted ventilation promptly; a partner can gather history in parallel.",
      "why": "Waiting for a complete history leaves an immediate breathing problem untreated.",
      "levels": {
        "emt": "A pulse does not mean breathing is adequate. Prioritize airway support and assisted ventilation.",
        "aemt": "Check that breaths actually produce chest rise. Add monitoring and other interventions within your protocol without delaying ventilation.",
        "paramedic": "Protect oxygenation and ventilation while investigating the cause. Advanced airway planning should support effective ventilation, not interrupt it."
      },
      "source": "bls"
    },
    {
      "id": "anticoagulant",
      "title": "A small bump, an important medicine",
      "tag": "History taking",
      "scene": "An older adult struck their head in a fall and is currently alert. A medication list includes apixaban. There is a small scalp bruise.",
      "lines": [
        "Assess the primary threats and examine the injury.",
        "Ask about symptoms and the events surrounding the fall.",
        "Include the medication list in the assessment.",
        "Ignore apixaban in the handoff because the scalp bruise looks minor."
      ],
      "mistake": 3,
      "correction": "Communicate the anticoagulant use, injury history and findings; external appearance does not determine internal injury risk.",
      "why": "Medication history can change the receiving team’s head-injury evaluation.",
      "levels": {
        "emt": "Bring the medication information into the handoff. An alert appearance does not erase the history.",
        "aemt": "Follow serial neurological findings and convey changes together with the anticoagulant history.",
        "paramedic": "Anticoagulant exposure affects bleeding-risk assessment. Communicate it clearly; imaging and reversal decisions belong to the receiving clinical pathway."
      },
      "source": "head"
    },
    {
      "id": "reassessment",
      "title": "One improvement is not the finish",
      "tag": "Reassessment",
      "scene": "A patient’s breathing appears easier after an appropriate intervention. Transport is continuing. Your partner is watching the patient, and monitoring equipment is available.",
      "lines": [
        "Stop all planned reassessment because the first response was favorable.",
        "Compare the response with the earlier assessment.",
        "Communicate any subsequent changes.",
        "Continue observing the patient during transport."
      ],
      "mistake": 0,
      "correction": "Continue scheduled and condition-driven reassessment, including the effect of the intervention.",
      "why": "An early improvement does not establish that the response will persist.",
      "levels": {
        "emt": "Repeat the assessment and watch for deterioration. Recheck after an intervention or a change in condition.",
        "aemt": "Reassess both the problem and the intervention’s effect, using the monitoring available within your scope.",
        "paramedic": "Use trends to test whether the treatment is helping and whether adverse effects or a different mechanism are emerging."
      },
      "source": "standards"
    },
    {
      "id": "baseline",
      "title": "The familiar label",
      "tag": "Clinical reasoning",
      "scene": "A patient with a history of dementia is much less responsive than usual. A caregiver says this change began suddenly today.",
      "lines": [
        "Address immediate threats during the primary assessment.",
        "Treat the change as usual dementia and stop looking for an acute cause.",
        "Ask the caregiver what the patient normally does and says.",
        "Assess the sudden change and communicate the time course."
      ],
      "mistake": 1,
      "correction": "Treat the new change as an acute problem requiring assessment; establish baseline and onset without letting the old diagnosis close the assessment.",
      "why": "A familiar diagnosis can distract from a new illness or injury.",
      "levels": {
        "emt": "Compare today with the patient’s usual behavior. Follow your altered-mental-status assessment pathway.",
        "aemt": "Look for treatable contributors within your scope while continuing the broader assessment. One finding may not explain everything.",
        "paramedic": "Keep competing causes in the differential. Revisit the working explanation as history, examination and monitoring add new evidence."
      },
      "source": "standards"
    },
    {
      "id": "handoff",
      "title": "Unknown is not a negative",
      "tag": "Handoff",
      "scene": "You are handing over a patient with weakness. Chest pain was not asked about or assessed. The patient’s other reported symptoms and measured findings are available.",
      "lines": [
        "Describe the presenting complaint and measured findings.",
        "Report treatments and the observed response.",
        "State that the patient denies chest pain, even though nobody asked.",
        "Identify information that still needs clarification."
      ],
      "mistake": 2,
      "correction": "Say that chest pain has not yet been assessed; obtain the missing history if feasible and communicate the uncertainty honestly.",
      "why": "An invented negative can mislead the next clinician.",
      "levels": {
        "emt": "Separate what the patient reported from what you did not ask.",
        "aemt": "Use a structured handoff to distinguish observations, patient reports and remaining gaps.",
        "paramedic": "Communicate your working impression and uncertainty separately from verified findings. An unassessed symptom cannot support diagnostic exclusion."
      },
      "source": "handoff"
    }
  ]
};
