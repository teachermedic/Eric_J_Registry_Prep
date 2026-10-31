# Hearth Trivia — first playable version

An independently written solo practice game using the site's published EMS question bank. No third-party app was decompiled and no proprietary code, assets, or questions are included.

- Six shared categories, no timer, six answered questions per round.
- Three different correct questions earn each category seal; completed categories leave the draw.
- Single-answer and exact-match select-all questions with explanations. Published Workshop additions with compatible options/answers join the pool.
- Missed questions receive priority when their category returns. The review drawer shows answers and explanations. A later correct answer removes the question.
- Progress uses `field_notes_trivia_v1` on the current browser/device. Reload restores the active question or locked feedback. Missing question IDs are pruned on bank updates while other progress remains.
- Storage failure allows memory-only play with a visible warning; a change in another tab pauses controls until reload.
- Uses the shared `ems_theme` preference. No writes to Review/Exam, flashcard, badge, streak, or Hearthlands state. No student accounts, multiplayer, campaign supplies, or cross-device synchronization in this version.
- Original HTML/CSS wheel and seals, keyboard-native answer controls, responsive styles, reduced-motion support. Correct answers are client-visible because this is practice.

Run `node tests/hearth-trivia-engine.test.cjs` for grading, progression, restoration and bank tests. Browser preview checks covered spin/answer/feedback/reload and desktop/mobile light/dark layouts. Full offline install, blocked-storage and concurrent-tab UI scenarios still need browser verification.
