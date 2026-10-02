# 🩺 Eric J's Field Notes

**EMS exam preparation, clinical reasoning, and practical study tools.**

Eric J's Field Notes is a mobile-friendly study companion for EMT, Advanced EMT, and Paramedic learners, with a Critical Care Paramedic specialty track in the 10-minute study tool. It complements the [Eric J's Field Notes newsletter](https://ericjm.substack.com/) by helping students practice recall, explain their reasoning, review difficult material, and plan their study time.

## 🚀 Start studying

[**Visit the live website**](https://teachermedic.github.io/Eric_J_Registry_Prep/)

1. Choose a question module and session length for **Review Mode** or a timed **Exam Mode**.
2. Explore the flashcards, clinical reasoning activities, and other study tools.
3. Use **Your Study Tools**, below the homepage menu, to resume a session or revisit saved material.

## 📚 Questions, flashcards, and review

- **Review and Exam Modes:** Practice questions by module, review explanations, and see your session score and category breakdown. Open-review cases let you think through an answer before revealing the explanation; these cases are not scored.
- **Saved question collections:** Revisit missed questions and bookmarks, resume an unfinished question session, and review progress history.
- **[Active Recall Flashcards](https://teachermedic.github.io/Eric_J_Registry_Prep/flashcards.html):** Study clinical topics including obstetrics and pediatrics. Bookmark cards, mark them **Difficult** or **Known**, and revisit those collections later.
- **[Terminology Decks](https://teachermedic.github.io/Eric_J_Registry_Prep/terminology-decks.html):** Practice medical vocabulary with shared flashcard study tools and saved progress.
- **Search and printable study sheets:** Search questions, clinical flashcards, and terminology. Print saved collections with optional answers, or use your browser's **Save as PDF** option.
- **Question reporting:** Open a prefilled email to report a question to **teachermedic84@gmail.com**. Your email application handles sending the report.

## 🧠 Clinical reasoning and study skills

| Tool | What students can do |
| --- | --- |
| [I Have 10 Minutes](https://teachermedic.github.io/Eric_J_Registry_Prep/quick-study.html) | Complete a short mix of questions, flashcards, and a changing clinical case. Choose EMT, AEMT, Paramedic, or Critical Care Paramedic content; record confidence, resume a session, and revisit confident mistakes. |
| [Change One Finding](https://teachermedic.github.io/Eric_J_Registry_Prep/change-finding.html) | Reconsider a clinical case when one finding changes, then compare your reasoning with the explanation and linked references. |
| [What Comes First?](https://teachermedic.github.io/Eric_J_Registry_Prep/what-first.html) | Arrange actions in EMT, AEMT, or Paramedic scenarios using drag-and-drop or keyboard controls. Check priorities, record confidence, and learn which actions depend on earlier steps or can occur together. |
| [Build My Study Plan](https://teachermedic.github.io/Eric_J_Registry_Prep/study-plan.html) | Build a plan for any subject from an exam date, topic priorities, available days, and daily study time. Follow timed instructions for preparation, recall, practice, and teach-back; edit tasks, mark completion, print the plan, or export remaining tasks to a calendar file. |
| [Human Anatomy Atlas](https://teachermedic.github.io/Eric_J_Registry_Prep/anatomy/) | Explore anatomy alongside clinical and terminology study. |
| [Research & Present](https://teachermedic.github.io/Eric_J_Registry_Prep/research-present.html) | Select research topics and use research/presentation timers for solo study or classroom topic assignments. |

## 📊 Progress and data

The student dashboard and saved study tools use **local browser storage**. Bookmarks, missed questions, flashcard collections, session history, confidence records, and study plans stay in the browser where they were created. They do not automatically synchronize across devices or browsers, and clearing site data can remove them.

The question engine also includes an existing **Google Apps Script logging connection** intended for Google Sheets. At the end of a graded question session, it attempts to send the selected module, mode, score, graded question total, percentage, and timestamp. It does not send an individual student identifier in that payload, and the browser does not confirm successful delivery.

This logging connection is separate from the local student dashboard. The site does not currently provide an instructor account portal or a verified live view of individual students' progress.

## 📖 Content and scope

See [CONTENT-SOURCES.md](CONTENT-SOURCES.md) for references, scope decisions, and content limitations.

The level-specific clinical activities use the **National EMS Scope of Practice Model** as a scope reference, alongside relevant AHA guidance, trauma and geriatric education frameworks, and clinical literature documented in the source notes. Critical Care Paramedic is a specialty study track, rather than an additional provider level in the national scope model.

Level filters apply to the activities that offer them; the entire original question and flashcard bank has not been audited for every provider level. Use the material alongside your course, current guidelines, and local protocols. This is an independent educational resource, not an official National Registry examination or a substitute for clinical authorization.

## 📱 Mobile and offline use

The site includes a responsive layout, dark mode, a web app manifest, and a service worker that caches selected study pages and assets after an online visit. Cached tools can support offline study; external links, remote media, and quiz-summary logging still require an internet connection. Home-screen installation availability depends on the browser and the current manifest configuration.

## 🛠️ Built with

- **Frontend:** HTML, CSS, and vanilla JavaScript.
- **Hosting:** GitHub Pages.
- **Study data:** Browser local storage.
- **Offline support:** Service worker and web app manifest.
- **Quiz-summary logging:** Google Apps Script connection intended for Google Sheets.
- **Additional tools:** SortableJS for action ordering, browser printing/PDF saving, and downloadable iCalendar (`.ics`) study plans.

The calendar export is a file you import into your calendar; it does not connect to or synchronize with a calendar account.

### Run locally

No frontend build step is required. From the repository folder, run:

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

## 👨‍🏫 About the author

Eric J is an educator and AHA Instructor specializing in AEMT and Paramedic curriculum development. The website pairs hands-on study activities with deeper explanations in the newsletter.

[**Subscribe to Eric J's Field Notes on Substack**](https://ericjm.substack.com/)

For question corrections, feedback, or advertising inquiries, email **[teachermedic84@gmail.com](mailto:teachermedic84@gmail.com)**.

## ⚖️ Attribution and licensing

Please credit **Eric J's Field Notes** when referencing this project. A repository-wide license for the original code and content has not yet been specified. Third-party components retain their own licenses; the vendored SortableJS license is included with that component.
