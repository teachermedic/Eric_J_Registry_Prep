# Study Quiz implementation and review

Repository: teachermedic/Eric_J_Registry_Prep
Baseline: main at e0a71eb3dbc61f72cbed4ebe2353565e4b3a2214 (inspected October 5, 2026).
Status: reviewed changes approved for a draft pull request only. Not approved for merge or deployment.

## Current structure and implementation plan
1. Keep the static HTML/CSS/JavaScript architecture. Add a dedicated Study Quiz in Study Hall through both the original menu in index.html and its transformed tile in home-dashboard.js.
2. Reuse flashcard_data.js, which already contains prompts, options, answer arrays, categories, and rationales. No new clinical claims or duplicated question bank. Its 90 single/multiple/text records support objective grading; the 63 open-review records remain in the flashcard workflow because they require self-assessment. The source bank is shared clinical practice and does not supply reliable level metadata, so this quiz offers categories rather than inventing EMT/Paramedic labels.
3. Let learners choose a category and 10, 20, or all questions. Randomize the selected set and choice order. Short categories use all available questions.
4. Grade only on explicit submission. Require an answer, disable changes after checking, reveal correct answers and rationale, and advance only through Next Question.
5. Show correct count and rounded percentage, with expandable review of every response. Retry only missed questions with a fresh round score; repeat until there are no misses. Restart restores the original chosen set, shuffled again. New Quiz returns to category selection.
6. Reuse Hearth colors, challenge layout, and ems_theme preference. Use native labeled inputs, live feedback, keyboard controls, focus movement, and mobile wrapping. Use textContent for bank content.
7. Add the page and assets to sw.js and bump the cache version so the new entry is available offline after successful cache installation. Do not add quiz scores to existing exam, flashcard, badges, streak, or backup stores.
8. Review and validate locally. After approval, recheck the baseline against main, apply these changes, and follow the repository's normal GitHub Pages publication process.

## Affected files
| File | Change |
| --- | --- |
| index.html | Original Study Hall menu entry |
| home-dashboard.js | Transformed Study Hall quiz tile |
| study-quiz.html | New setup, question, feedback, results page |
| study-quiz.css | New responsive quiz controls and review styling |
| study-quiz.js | New question filtering, shuffle, grading, scoring, retries, theme |
| study-quiz-engine.js | Pure shared grading function |
| tests/study-quiz-engine.test.cjs | Executed grading regression checks |
| sw.js | Cache version bump and four new quiz assets |
| tests/study-quiz.test.cjs | Browser interaction, category, mobile light/dark, storage and offline checks |
| tests/home-dashboard.test.cjs | Expected Study Hall tile count updated from seven to eight |
| QUIZ-IMPLEMENTATION-PLAN.md | Review plan and scope |

## Grading rules
Single-choice: selected answer must match the answer key.
Select-all: exact set match; no partial credit.
Typed: trims leading/trailing spaces, collapses repeated spaces, and ignores case; any listed answer is accepted. No fuzzy matching or automatic synonym credit. Correct key strings are displayed exactly as supplied.
No-answer submissions do not count. Each question counts once per round. Answers and explanations remain in the shipped client-side bank, as on the current site; this is practice, not a secure exam.

## Limits and review considerations
This is a native Quizlet-style study flow; it does not connect to Quizlet or import sets. Sessions are in memory and reloads clear them; the page states this explicitly. New Quiz abandons the current round. Existing bank content is reused without clinical validation or revision. This iteration excludes open-review questions rather than scoring free-form explanations automatically.

## Local review
Serve the repository over HTTP, open index.html#study, and choose Study Quiz.
Automated interactions: node tests/study-quiz.test.cjs (requires Playwright and Chromium).

## Verification outcome
Reviewed again October 5, 2026. Current main still matches e0a71eb3dbc61f72cbed4ebe2353565e4b3a2214. Review checks were completed locally before authorization to create a draft pull request.

Passed:
- Pure grading checks: single, exact-set multi-select, blank rejection, typed normalization, aliases, and rejection of fuzzy spelling.
- Quiz browser interactions: Study Hall entry, existing bank loading, category selection, explicit-answer validation, answer locking, all three question types, scoring, missed-only retry, restart of the original selected set, and choosing a new quiz.
- Setup, feedback, and results layouts at 320, 390, and 1440 pixels in light and dark modes.
- Session reset on reload, blocked-storage operation, isolated flashcard progress, and service-worker offline quiz startup.
- Existing dashboard browser regression suite, JavaScript syntax checks, and git diff whitespace validation.

Local review fixes:
- Corrected the browser test to select Study Hall instead of searching the default Hearth tab.
- Corrected the test server root route so service-worker installation could be exercised.
- Added category, offline, reload, blocked-storage, and broader layout coverage.
- Updated the existing dashboard test for the additional Study Hall tile.
- Added an explicit no-JavaScript notice.

Product assessment: the feature is useful as a quick recall-and-retry mode. Keep the distinction from Practice Questions and Exam Mode clear. It intentionally has no resume, streak credit, or persistent quiz score. Existing question content was reused, not medically revalidated. Typed grading accepts only supplied answer strings after case/space normalization. This is native practice rather than a Quizlet integration.

The user authorized a draft GitHub pull request on October 5, 2026. Merge and deployment remain unapproved.

## Interaction with the existing quiz structure
- Existing Practice Questions, Review Mode, and Exam Mode continue using script.js and its own quizData bank and engine. Those code paths are not changed.
- Study Quiz reads flashcard_data.js, shared with the flashcard page. It runs on a separate HTML page, so the two quizData declarations do not collide.
- The banks overlap but are not a single source. Editing script.js alone will not update Study Quiz; editing flashcard_data.js updates both flashcard content and the Study Quiz source. A future bank consolidation requires a separate change.
- Existing saved sessions, exam scores, missed-question history, flashcard Know/Don't Know records, achievements, streaks, and backups are not updated by Study Quiz. Only the existing theme preference is shared.
- Scores are per round; a missed-only retry gets its own score. Restart This Set reuses the original selected question set. Reload clears the new session.
- Integration is a Study Hall tile, fallback menu button, and additional offline cache assets. This is an additional practice activity, not a replacement for the existing quiz.
