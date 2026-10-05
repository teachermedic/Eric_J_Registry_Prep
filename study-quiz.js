/* Standalone practice rounds. Existing exam and flashcard storage stay independent. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  // Open-review answers require self-assessment; only objectively gradable records enter this quiz.
  const bank = quizData.filter(q => typeof q.q === 'string' && Array.isArray(q.answer) && q.answer.length && q.answer.every(a => typeof a === 'string' && a.trim()) && (
    q.type === 'text' || (['single', 'multiple'].includes(q.type) && Array.isArray(q.options) && q.options.length > 1 && new Set(q.options).size === q.options.length && q.answer.every(a => q.options.includes(a)) && (q.type !== 'single' || q.answer.length === 1))
  ));
  let original = [], round = [], index = 0, responses = [], checked = false;
  function text(tag, value) { const el = document.createElement(tag); el.textContent = value; return el; }
  function shuffle(items) { const copy = [...items]; for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; } return copy; }
  [...new Set(bank.map(q => q.category || 'General'))].sort().forEach(category => {
    const option = text('option', category); option.value = category; $('quiz-category').append(option);
  });
  const filtered = () => bank.filter(q => $('quiz-category').value === 'all' || (q.category || 'General') === $('quiz-category').value);
  function available() { $('quiz-available').textContent = `${filtered().length} questions available. Short categories use all available questions.`; $('quiz-setup').querySelector('button').disabled = !filtered().length; }
  $('quiz-category').addEventListener('change', available); available();
  function start(items) {
    round = shuffle(items); index = 0; responses = []; $('quiz-setup').hidden = true; $('quiz-results').hidden = true; $('quiz-round').hidden = false; $('quiz-new').hidden = false; render();
  }
  $('quiz-setup').addEventListener('submit', event => { event.preventDefault(); original = shuffle(filtered()).slice(0, $('quiz-size').value === 'all' ? bank.length : Number($('quiz-size').value)); if (original.length) start(original); });
  function render() {
    checked = false; const q = round[index];
    $('quiz-progress').textContent = `Question ${index + 1} of ${round.length} · ${responses.filter(r => r.correct).length} correct`;
    $('quiz-meter').max = round.length; $('quiz-meter').value = index;
    $('quiz-question').textContent = q.q; $('quiz-inputs').replaceChildren();
    $('quiz-instructions').textContent = q.type === 'text' ? 'Type your answer (spelling matters; case and extra spaces do not).' : q.type === 'multiple' ? 'Select all correct answers.' : 'Choose one answer.';
    if (q.type === 'text') {
      const input = document.createElement('input'); input.type = 'text'; input.name = 'answer'; input.autocomplete = 'off'; input.setAttribute('aria-label', 'Your answer'); $('quiz-inputs').append(input);
    } else shuffle(q.options).forEach(value => {
      const label = text('label', ''), input = document.createElement('input'); input.type = q.type === 'multiple' ? 'checkbox' : 'radio'; input.name = 'answer'; input.value = value; label.append(input, text('span', value)); $('quiz-inputs').append(label);
    });
    $('quiz-check').disabled = false; $('quiz-feedback').hidden = true; $('quiz-next').hidden = true; $('quiz-error').textContent = ''; $('quiz-question').focus();
  }
  $('quiz-answer').addEventListener('submit', event => {
    event.preventDefault(); if (checked) return;
    const q = round[index], selected = q.type === 'text' ? [$('quiz-inputs').querySelector('input').value.trim()] : [...$('quiz-inputs').querySelectorAll('input:checked')].map(el => el.value);
    if (!selected.length || !selected[0]) { $('quiz-error').textContent = 'Enter or select an answer before checking.'; return; }
    const correct = StudyQuizEngine.grade(q, selected);
    checked = true; responses.push({q, selected, correct});
    $('quiz-inputs').querySelectorAll('input').forEach(el => { el.disabled = true; }); $('quiz-check').disabled = true; $('quiz-error').textContent = '';
    $('quiz-verdict').textContent = correct ? 'Correct' : 'Keep practicing'; $('quiz-correct').textContent = `Answer: ${q.answer.join('; ')}`; $('quiz-rationale').textContent = q.rationale || 'No explanation supplied for this question.';
    $('quiz-feedback').hidden = false; $('quiz-next').hidden = false; $('quiz-next').textContent = index + 1 === round.length ? 'See Results' : 'Next Question'; $('quiz-meter').value = index + 1; $('quiz-next').focus();
  });
  $('quiz-next').addEventListener('click', () => { if (!checked) return; if (++index < round.length) render(); else finish(); });
  function finish() {
    $('quiz-round').hidden = true; $('quiz-results').hidden = false;
    const correct = responses.filter(r => r.correct).length;
    $('quiz-score').textContent = `${correct} of ${round.length} correct (${Math.round(correct / round.length * 100)}%).`;
    $('quiz-review').replaceChildren(); responses.forEach(r => {
      const detail = document.createElement('details'); detail.append(text('summary', `${r.correct ? 'Correct' : 'Missed'} · ${r.q.q}`), text('p', `Your answer: ${r.selected.join('; ')}`), text('p', `Correct answer: ${r.q.answer.join('; ')}`), text('p', r.q.rationale || 'No explanation supplied.')); $('quiz-review').append(detail);
    }); $('quiz-retry').disabled = correct === round.length; $('quiz-result-title').focus();
  }
  $('quiz-retry').addEventListener('click', () => { const missed = responses.filter(r => !r.correct).map(r => r.q); if (missed.length) start(missed); });
  $('quiz-restart').addEventListener('click', () => start(original));
  $('quiz-new').addEventListener('click', () => { round = []; responses = []; $('quiz-round').hidden = true; $('quiz-results').hidden = true; $('quiz-new').hidden = true; $('quiz-setup').hidden = false; $('quiz-category').focus(); });
  try { document.body.classList.toggle('dark-mode', localStorage.getItem('ems_theme') === 'dark'); } catch {}
  $('quiz-theme').addEventListener('click', () => { const dark = document.body.classList.toggle('dark-mode'); try { localStorage.setItem('ems_theme', dark ? 'dark' : 'light'); } catch {} });
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(() => {});
})();
