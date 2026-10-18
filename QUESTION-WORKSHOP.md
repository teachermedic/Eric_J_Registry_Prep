# Question Workshop

Open **the homepage → Question Workshop** or **Gathering Hall → Question Workshop**, then enter the configured instructor password to add your own question collection. The one-time setup and the browser-side lock’s limits are documented in `INSTRUCTOR-ACCESS.md`. It supports multiple choice and select-all, 2–6 choices, correct answers, a module, explanation, and optional source/reference. You can edit, duplicate, delete/undo, search, and preview questions. This edits your additional collection; it does not replace the built-in question bank.

## Save, import, and publish

- **Save Question** saves to a browser draft under `field_notes_author_v1`. Drafts stay on this device and never enter student question pools until published.
- **Download draft backup** produces a reusable JSON file. CSV and JSON imports are validated before changing the collection. The collection limit is 1,000 questions / 2 MB. Matching IDs update existing questions; repeated question wording in the same module is skipped. Empty or malformed rows, repeated choices, and missing explanations/correct answers are rejected.
- **CSV template** provides the accepted headers and an example. Use module values Foundations, Pathophysiology, Medical, Trauma, OBPeds, Terminology, or Physician; type single or multiple; and correct answer letters such as A or A|C. Categories are no longer needed. Older CSV and JSON files with categories still import; those category values are ignored. New exports group questions by module in Review/Exam and the live-session builder. CSV quoting, embedded commas, double quotes, and multiline fields are supported. Edit or remove the example before publishing.
- **Export website file** downloads `authored-questions.js` containing the whole saved workshop collection. Upload that file to the repository root using GitHub's file-upload page and commit the replacement. Repository write access is required. No GitHub login tokens are collected by the site. Browser saving and exporting alone do not deploy changes.
- Keep prior exports or JSON backups to recover older versions. Deploying an empty collection removes workshop additions while preserving built-in questions. Additions are loaded into Review/Exam before saved-question maps are built, and into the Gathering Hall live pool. The service worker fetches this publication file network-first so subsequent question updates do not require another cache-version edit; offline mode uses its last successfully cached version.

The editor treats entered content as plain text. The Review/Exam HTML rationale sink receives escaped explanations; live-session explanations remain plain text. Structural validation does not verify clinical facts. Use Preview and review your question/answer/explanation before publishing. For images, ordering, typed answers, polls, or teaching slides, use the existing live presentation editor.

Browser storage failures show a backup warning. Stale-tab writes are rejected. Corrupt drafts are not silently overwritten; the backup button downloads the original saved text for recovery. Draft backups include saved questions, not unsaved form edits.

You may also submit questions to the assistant in chat for formatting, review, and a GitHub update. The workshop is an independent authoring option, not a requirement for submitting questions through chat.

## Character additions

The live-room character picker also adds Wizard, Elf, Dwarf, Hobbit, Orc, and Goblin to the six existing woodland choices. They use Unicode avatars and generic labels; no movie artwork or additional asset dependency is required. Nickname, lobby, score, and CSV rendering use the same character catalogue.

## Checks

`node tests/question-author-engine.test.cjs` covers validation, stable IDs, CSV parsing, JSON/JavaScript exports, duplicate handling, escaped rationale generation, and idempotent live bank loading. Playwright `tests/question-workshop.test.cjs` covers editing, persistence, import/export, preview, delete/undo, bank integration, and service-worker refresh/offline fallback. The Gathering Hall engine/browser tests cover the expanded character picker and host/student flow.
