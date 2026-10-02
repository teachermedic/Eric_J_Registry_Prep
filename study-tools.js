/* Personal study work stays on this browser/device. No account or email service. */
const STUDY_STORAGE_KEY = 'field_notes_study_v1';
const studyQuestionKey = q => JSON.stringify([q.section || '', q.category || '', q.type, q.q]);
const studyQuestionMap = new Map(quizData.map(q => [studyQuestionKey(q), q]));
let studyStorageAvailable = true;
let studyWork = readStudyWork();
let studyActive = false;
let studyFinished = false;
let studySource = 'Module';
let studySessionId = '';
let studyStartedAt = '';
let studyPhase = 'answer';
let studyCorrect = null;
let studyShownIndex = -1;
let studyReportQuestion = null;

function readStudySetting(key) { try { return localStorage.getItem(key); } catch { return null; } }
function writeStudySetting(key, value) { try { localStorage.setItem(key, value); } catch { /* Study tools show the persistence warning. */ } }

function emptyStudyWork() { return { version: 1, missed: [], bookmarks: [], history: [], session: null }; }
function readStudyWork() {
    try {
        const raw = JSON.parse(localStorage.getItem(STUDY_STORAGE_KEY));
        if (!raw || raw.version !== 1) return emptyStudyWork();
        return {
            version: 1,
            missed: Array.isArray(raw.missed) ? [...new Set(raw.missed.filter(k => studyQuestionMap.has(k)))] : [],
            bookmarks: Array.isArray(raw.bookmarks) ? [...new Set(raw.bookmarks.filter(k => studyQuestionMap.has(k)))] : [],
            history: Array.isArray(raw.history) ? raw.history.filter(h => h && typeof h.id === 'string' && typeof h.date === 'string' && Number.isFinite(h.correct) && Number.isFinite(h.graded)).slice(-100) : [],
            session: validStudySession(raw.session) ? raw.session : null
        };
    } catch (error) {
        if (!(error instanceof SyntaxError)) studyStorageAvailable = false;
        return emptyStudyWork();
    }
}
function validStudySession(s) {
    return !!(s && Array.isArray(s.keys) && s.keys.length && s.keys.every(k => studyQuestionMap.has(k)) &&
        Number.isInteger(s.index) && s.index >= 0 && s.index < s.keys.length &&
        ['review', 'exam'].includes(s.mode) && ['answer', 'feedback', 'revealed'].includes(s.phase) &&
        typeof s.id === 'string' && typeof s.topic === 'string' &&
        Number.isFinite(s.score) && s.score >= 0 && Number.isFinite(s.timeLeft) && s.timeLeft >= 0 &&
        Array.isArray(s.missed) && s.missed.every(k => studyQuestionMap.has(k)) &&
        s.stats && typeof s.stats === 'object' && Object.values(s.stats).every(v => v && Number.isFinite(v.total) && Number.isFinite(v.correct)));
}
function writeStudyWork() {
    try {
        localStorage.setItem(STUDY_STORAGE_KEY, JSON.stringify(studyWork));
        studyStorageAvailable = true;
    } catch (error) { studyStorageAvailable = false; }
    const status = document.getElementById('study-storage-status');
    if (status) status.textContent = studyStorageAvailable ? '' : 'This browser cannot save study work. You can keep studying, but it may be lost when this page closes.';
}
function renderStudyHome() {
    document.getElementById('saved-missed-button').textContent = `Missed Questions (${studyWork.missed.length})`;
    document.getElementById('saved-bookmark-button').textContent = `Bookmarks (${studyWork.bookmarks.length})`;
    const s = studyWork.session;
    document.getElementById('resume-card').hidden = !s;
    if (s) {
        document.getElementById('resume-description').textContent = `${s.mode === 'exam' ? 'Exam' : 'Review'} · ${s.topic} · Question ${s.index + 1} of ${s.keys.length}${s.mode === 'exam' ? ' · Timer pauses while closed.' : ''}`;
    }
    const status = document.getElementById('study-storage-status');
    status.textContent = studyStorageAvailable ? '' : 'This browser cannot save study work. It may be lost when this page closes.';
}
function confirmStudyReplacement() {
    return !studyWork.session || confirm('Starting a new session replaces your unfinished session. Continue?');
}
function studyBeginSession(source = 'Module') {
    clearInterval(timerInterval);
    currentIdx = 0;
    score = 0;
    missedQuestions = [];
    studySource = source;
    studySessionId = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;
    studyStartedAt = new Date().toISOString();
    studyActive = true;
    studyFinished = false;
    studyPhase = 'answer';
    studyCorrect = null;
    studyShownIndex = -1;
    timeLeft = mode === 'exam' ? sessionQuestions.length * 120 : 0;
    document.getElementById('results-area').style.display = 'none';
    document.getElementById('timer-container').style.display = mode === 'exam' ? 'block' : 'none';
    document.getElementById('action-btn').textContent = 'Submit Answer';
    document.getElementById('action-btn').onclick = handleAction;
}
function studyQuestionShown() {
    if (studyShownIndex !== currentIdx) {
        studyPhase = 'answer';
        studyCorrect = null;
        studyShownIndex = currentIdx;
    }
    updateStudyBookmarkButton();
}
function captureStudyInput() {
    const text = document.getElementById('text-answer');
    return {
        text: text ? text.value : undefined,
        discovery: Array.from(document.querySelectorAll('.discovery-card')).map((card, index) => card.querySelector('.tool-data').style.display === 'block' ? index : -1).filter(index => index >= 0),
        options: Array.from(document.querySelectorAll('input[name="option"]:checked')).map(i => i.value),
        grid: Array.from(document.querySelectorAll('.matrix-check:checked')).map(i => [i.dataset.row, i.dataset.col])
    };
}
function saveStudySession() {
    if (!studyActive || studyFinished || currentIdx >= sessionQuestions.length) return;
    studyWork.session = {
        id: studySessionId, startedAt: studyStartedAt, updatedAt: new Date().toISOString(),
        source: studySource, keys: sessionQuestions.map(studyQuestionKey), index: currentIdx,
        score, mode, topic: document.getElementById('topic-select').value,
        timeLeft, stats: JSON.parse(JSON.stringify(categoryStats)), missed: missedQuestions.map(studyQuestionKey),
        phase: studyPhase, correct: studyCorrect, input: captureStudyInput()
    };
    writeStudyWork();
}
function studyRecordAnswer(q, correct) {
    const key = studyQuestionKey(q);
    if (correct) studyWork.missed = studyWork.missed.filter(k => k !== key);
    else if (!studyWork.missed.includes(key)) studyWork.missed.push(key);
    studyCorrect = correct;
    window.StudyBadges?.record({type:'activity',id:'question:'+key,date:Date.now()});
    studyPhase = mode === 'review' ? 'feedback' : 'answer';
    writeStudyWork();
}
function restoreStudyInput(input) {
    if (!input || typeof input !== 'object') return;
    const text = document.getElementById('text-answer');
    if (text && typeof input.text === 'string') text.value = input.text;
    if (Array.isArray(input.options)) document.querySelectorAll('input[name="option"]').forEach(i => { i.checked = input.options.includes(i.value); });
    if (Array.isArray(input.discovery)) document.querySelectorAll('.discovery-card').forEach((card, index) => { if (input.discovery.includes(index)) { card.querySelector('.tool-data').style.display = 'block'; card.querySelector('.tool-label').style.display = 'none'; card.style.backgroundColor = 'var(--light-gray)'; } });
    if (Array.isArray(input.grid)) document.querySelectorAll('.matrix-check').forEach(i => {
        i.checked = input.grid.some(pair => Array.isArray(pair) && pair[0] === i.dataset.row && pair[1] === i.dataset.col);
    });
}
function resumeStudySession() {
    const s = studyWork.session;
    if (!validStudySession(s)) { studyWork.session = null; writeStudyWork(); renderStudyHome(); return; }
    clearInterval(timerInterval);
    sessionQuestions = s.keys.map(k => studyQuestionMap.get(k));
    currentIdx = s.index; score = s.score; mode = s.mode; timeLeft = s.timeLeft;
    categoryStats = JSON.parse(JSON.stringify(s.stats));
    missedQuestions = s.missed.map(k => studyQuestionMap.get(k));
    studySessionId = s.id; studyStartedAt = s.startedAt; studySource = s.source;
    studyActive = true; studyFinished = false; studyShownIndex = currentIdx;
    studyPhase = s.phase; studyCorrect = s.correct;
    document.getElementById('topic-select').value = s.topic;
    document.getElementById('setup-area').style.display = 'none';
    document.getElementById('results-area').style.display = 'none';
    document.getElementById('quiz-area').style.display = 'block';
    document.getElementById('timer-container').style.display = mode === 'exam' ? 'block' : 'none';
    const phase = s.phase, correct = s.correct, input = s.input;
    const submit = document.getElementById('action-btn');
    submit.textContent = 'Submit Answer'; submit.onclick = handleAction;
    showQuestion();
    restoreStudyInput(input);
    if (phase === 'feedback') { studyPhase = phase; studyCorrect = correct; renderReviewFeedback(sessionQuestions[currentIdx], correct); }
    if (phase === 'revealed') {
        const reveal = document.getElementById('reveal-btn');
        if (reveal) reveal.click();
    }
    saveStudySession();
    if (mode === 'exam') { if (timeLeft <= 0) showResults(); else startTimer(); }
}
function pauseStudySession() {
    clearInterval(timerInterval);
    saveStudySession();
    studyActive = false;
    document.getElementById('quiz-area').style.display = 'none';
    document.getElementById('results-area').style.display = 'none';
    document.getElementById('setup-area').style.display = 'block';
    renderStudyHome();
}
function discardStudySession() {
    if (!confirm('Discard your unfinished session? Saved mistakes, bookmarks, and history will stay.')) return;
    studyWork.session = null; writeStudyWork(); renderStudyHome();
}
function nextStudyQuestion() {
    currentIdx++;
    studyPhase = 'answer';
    if (currentIdx < sessionQuestions.length) {
        const btn = document.getElementById('action-btn');
        btn.textContent = 'Submit Answer'; btn.onclick = handleAction;
        showQuestion();
    } else showResults();
}
function studyFinishSession() {
    if (studyFinished) return false;
    studyFinished = true; studyActive = false;
    const graded = sessionQuestions.filter(q => q.type !== 'open-review').length;
    const completed = Math.min(currentIdx + (studyPhase === 'feedback' || studyPhase === 'revealed' ? 1 : 0), sessionQuestions.length);
    const categories = Object.entries(categoryStats).map(([name, value]) => ({
        name, correct: value.correct,
        total: sessionQuestions.filter(q => q.category === name && q.type !== 'open-review').length
    })).filter(c => c.total > 0);
    studyWork.history.push({ id: studySessionId, date: new Date().toISOString(), topic: document.getElementById('topic-select').value,
        source: studySource, mode, correct: score, graded, total: sessionQuestions.length, completed,
        reviewed: sessionQuestions.slice(0, completed).filter(q => q.type === 'open-review').length,
        timedOut: mode === 'exam' && currentIdx < sessionQuestions.length, categories });
    if(completed===sessionQuestions.length&&completed>0)window.StudyBadges?.record({type:'session',id:'quiz:'+studySessionId,date:Date.now()});
    studyWork.history = studyWork.history.slice(-100);
    studyWork.session = null;
    writeStudyWork();
    return true;
}
function updateStudyBookmarkButton() {
    const q = sessionQuestions[currentIdx];
    if (!q) return;
    const saved = studyWork.bookmarks.includes(studyQuestionKey(q));
    const btn = document.getElementById('bookmark-question-button');
    btn.textContent = saved ? 'Bookmarked' : 'Bookmark';
    btn.setAttribute('aria-pressed', String(saved));
}
function toggleStudyBookmark() {
    const q = sessionQuestions[currentIdx];
    if (!q) return;
    const key = studyQuestionKey(q);
    if (studyWork.bookmarks.includes(key)) studyWork.bookmarks = studyWork.bookmarks.filter(k => k !== key);
    else studyWork.bookmarks.push(key);
    writeStudyWork(); updateStudyBookmarkButton();
}
function openStudyDialog(title) {
    document.getElementById('study-dialog-title').textContent = title;
    const body = document.getElementById('study-dialog-body');
    body.replaceChildren();
    const dialog = document.getElementById('study-dialog');
    if (!dialog.open) dialog.showModal();
    return body;
}
function studyElement(tag, text, className) {
    const el = document.createElement(tag);
    if (text !== undefined) el.textContent = text;
    if (className) el.className = className;
    return el;
}
function studyButton(text, handler) {
    const btn = studyElement('button', text, 'study-button');
    btn.type = 'button'; btn.onclick = handler; return btn;
}
function openStudyCollection(kind) {
    const title = kind === 'missed' ? 'Saved Missed Questions' : 'Bookmarked Questions';
    const body = openStudyDialog(title);
    const keys = studyWork[kind];
    if (!keys.length) { body.append(studyElement('p', kind === 'missed' ? 'No saved mistakes yet. Missed answers will appear here.' : 'Use Bookmark while studying to save a question here.')); return; }
    body.append(studyElement('p', kind === 'missed' ? 'A correct answer removes a question from this list. Linked cases include their related questions for context.' : 'Bookmarks stay saved until you remove them. Linked cases include their related questions for context.', 'study-help'));
    body.append(studyButton('Practice All', () => startStudyCollection(kind, keys)));
    keys.forEach(key => {
        const q = studyQuestionMap.get(key);
        const row = studyElement('div', undefined, 'study-saved-item');
        row.append(studyElement('small', q.category), studyElement('p', q.q));
        row.append(studyButton('Practice', () => startStudyCollection(kind, [key])));
        row.append(studyButton('Remove', () => { studyWork[kind] = studyWork[kind].filter(k => k !== key); writeStudyWork(); renderStudyHome(); openStudyCollection(kind); }));
        body.append(row);
    });
}
function startStudyCollection(kind, keys) {
    if (!confirmStudyReplacement()) return;
    const selected = keys.map(k => studyQuestionMap.get(k)).filter(Boolean);
    const chains = new Set(selected.map(q => q.chainID).filter(Boolean));
    const keySet = new Set(keys);
    sessionQuestions = quizData.filter(q => keySet.has(studyQuestionKey(q)) || (q.chainID && chains.has(q.chainID)));
    if (!sessionQuestions.length) return;
    mode = 'review';
    document.getElementById('topic-select').value = 'All';
    studyBeginSession(kind === 'missed' ? 'Saved missed questions' : 'Bookmarks');
    categoryStats = {};
    sessionQuestions.forEach(q => { if (!categoryStats[q.category]) categoryStats[q.category] = { total: 0, correct: 0 }; categoryStats[q.category].total++; });
    document.getElementById('study-dialog').close();
    document.getElementById('setup-area').style.display = 'none';
    document.getElementById('quiz-area').style.display = 'block';
    showQuestion();
}
function openStudyHistory() {
    const body = openStudyDialog('Progress History');
    body.append(studyElement('p', 'Your last 100 completed sessions are saved on this device. Accuracy covers scored questions; self-study cases are listed separately.', 'study-help'));
    if (!studyWork.history.length) { body.append(studyElement('p', 'Complete a session to see your progress here.')); return; }
    [...studyWork.history].reverse().forEach(h => {
        const row = studyElement('div', undefined, 'study-history-item');
        row.append(studyElement('strong', `${h.topic} · ${h.mode === 'exam' ? 'Exam' : 'Review'}`));
        row.append(studyElement('p', `${new Date(h.date).toLocaleString()} · ${h.source || 'Module'}`, 'study-help'));
        row.append(studyElement('p', h.graded ? `${h.correct}/${h.graded} scored questions · ${Math.round(h.correct / h.graded * 100)}% accuracy` : 'Self-study session · not scored'));
        if (h.reviewed) row.append(studyElement('p', `${h.reviewed} self-study cases reviewed.`));
        if (h.timedOut) row.append(studyElement('p', `Timer expired after ${h.completed}/${h.total} questions completed. Unanswered scored questions count in the total.`));
        if (Array.isArray(h.categories)) h.categories.forEach(c => row.append(studyElement('p', `${c.name}: ${c.correct}/${c.total} (${Math.round(c.correct / c.total * 100)}%)`, 'study-help')));
        body.append(row);
    });
}
function studyReportBody(q, concern) {
    return `Question report\n\nModule: ${q.section || ''}\nCategory: ${q.category || ''}\nQuestion: ${q.q}\nQuestion reference: ${quizData.indexOf(q) + 1}\n\n${q.options ? 'Options:\n' + q.options.join('\n') + '\n\n' : ''}${q.rows ? 'Grid rows: ' + q.rows.join(', ') + '\nGrid columns: ' + q.cols.join(', ') + '\n\n' : ''}${q.vitals ? 'Vitals: ' + q.vitals + '\n' : ''}${q.history ? 'History: ' + q.history + '\n' : ''}${q.physical ? 'Physical: ' + q.physical + '\n' : ''}Student concern:\n${concern}\n\nPage: ${location.origin}${location.pathname}`;
}
function openQuestionReport() {
    const q = sessionQuestions[currentIdx];
    if (!q) return;
    studyReportQuestion = q;
    const body = openStudyDialog('Report a Question');
    body.append(studyElement('p', q.q));
    const label = studyElement('label', 'What seems incorrect or confusing?'); label.htmlFor = 'study-report-concern';
    const input = studyElement('textarea'); input.id = 'study-report-concern'; input.maxLength = 1500;
    const link = studyElement('a', 'Open Email Draft', 'study-report-link');
    link.id = 'study-report-email';
    const update = () => { link.href = `mailto:teachermedic84@gmail.com?subject=${encodeURIComponent('Field Notes question report: ' + q.category)}&body=${encodeURIComponent(studyReportBody(q, input.value))}`; };
    input.addEventListener('input', update); update();
    body.append(label, input, studyElement('p', 'Opens your email app with a draft addressed to teachermedic84@gmail.com. Review it and click Send. Nothing is sent automatically.', 'study-help'), link);
    const copied = studyElement('p', '', 'study-help'); copied.setAttribute('role', 'status');
    body.append(studyElement('p', 'If your email app does not open, copy the report and email it to teachermedic84@gmail.com.', 'study-help'));
    body.append(studyButton('Copy Report', async () => {
        const report = studyReportBody(q, input.value);
        try { await navigator.clipboard.writeText(report); copied.textContent = 'Report copied. Paste it into an email.'; }
        catch { const fallback = studyElement('textarea'); fallback.value = report; fallback.readOnly = true; fallback.setAttribute('aria-label', 'Report text to copy'); body.append(fallback); fallback.focus(); fallback.select(); copied.textContent = 'Select and copy the report text below.'; }
    }), copied);
}

document.getElementById('options-container').addEventListener('input', saveStudySession);
document.getElementById('options-container').addEventListener('change', saveStudySession);
window.addEventListener('beforeunload', saveStudySession);
document.addEventListener('visibilitychange', () => { if (document.hidden) saveStudySession(); });
window.addEventListener('load', renderStudyHome);
