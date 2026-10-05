/* Pure answer grading shared by the page and regression checks. */
(function(root) {
  'use strict';
  const normalize = value => String(value).trim().replace(/\s+/g, ' ').toLowerCase();
  function grade(question, selected) {
    if (!selected.length || selected.every(value => !normalize(value))) return false;
    const actual = new Set(selected.map(normalize)), expected = new Set(question.answer.map(normalize));
    return question.type === 'text' ? selected.length === 1 && expected.has(normalize(selected[0])) : actual.size === expected.size && [...actual].every(value => expected.has(value));
  }
  const api = {grade};
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.StudyQuizEngine = api;
})(typeof globalThis === 'object' ? globalThis : this);
