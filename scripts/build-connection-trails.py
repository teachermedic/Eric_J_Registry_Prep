"""Render the editable, sourced trail content: python scripts/build-connection-trails.py."""
import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BASE = 'https://teachermedic.github.io/Eric_J_Registry_Prep/'
LEVELS = {'emt': 'EMT · Recognize', 'aemt': 'AEMT · Connect', 'paramedic': 'Paramedic · Explain'}
def esc(value):
    return html.escape(str(value), quote=True)
def citations(ids):
    return '<span class="trail-citations"> Evidence: ' + ', '.join(f'<a href="#source-{i}" aria-label="Source {i}">[{i}]</a>' for i in ids) + '</span>'
def head(title, description, slug):
    return f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{esc(title)} | Eric J’s Hearth</title><meta name="description" content="{esc(description)}"><link rel="canonical" href="{BASE}{slug}.html"><meta property="og:type" content="website"><meta property="og:site_name" content="Eric J’s Hearth"><meta property="og:title" content="{esc(title)}"><meta property="og:description" content="{esc(description)}"><meta property="og:url" content="{BASE}{slug}.html"><link rel="icon" href="hearth-emblem.svg" type="image/svg+xml"><link rel="stylesheet" href="change-finding.css"><link rel="stylesheet" href="hearth-theme.css"><link rel="stylesheet" href="connection-trails.css"></head><body class="hearth-site"><main class="challenge-shell trail-shell"><header><a href="index.html#study">← The Study Hall</a><button id="trail-theme" type="button" hidden>Toggle Theme</button></header><p class="brand">Eric J’s Hearth</p>'''
def check(q, level):
    return f'''<fieldset class="trail-check" data-check-level="{level}" hidden data-feedback="{esc(q['feedback'])}"><legend>{esc(q['question'])}</legend><div class="choices">''' + ''.join(f'<button type="button" data-correct="{str(i == q["correct"]).lower()}">{esc(a)}</button>' for i,a in enumerate(q['answers'])) + '<div></div></div><p class="trail-answer" role="status"></p></fieldset>'
def sketch(t):
    if 'sketch' in t:
        return t['sketch']
    shapes = {
        'endoplasmic-reticulum-heart-injury': '<path d="M45 56q25-25 53 0t53 0m-102 20q25-25 53 0t53 0m-102 20q25-25 53 0t53 0m-102 20q25-25 53 0t53 0"/><circle cx="55" cy="38" r="2"/><circle cx="83" cy="65" r="2"/><circle cx="139" cy="105" r="2"/>',
        'lysosomes-pancreatitis': '<circle cx="101" cy="82" r="49"/><circle cx="101" cy="82" r="44" stroke-dasharray="3 4"/><path d="m80 70 9 14-17 7m36-30 13 6-5 12m-12 21 12-4 7 12"/>',
        'cell-membrane-rhabdomyolysis': '<path d="M43 56q57-13 114 0M43 108q57-13 114 0"/>' + ''.join(f'<circle cx="{x}" cy="60" r="4"/><path d="m{x} 65-3 14m3-14 4 14"/><circle cx="{x}" cy="104" r="4"/><path d="m{x} 99-3-14m3 14 4-14"/>' for x in range(49,157,18)),
        'cytoplasm-sepsis': '<ellipse cx="101" cy="82" rx="60" ry="47"/><circle cx="83" cy="75" r="15"/><path d="m119 66 10-5 10 5v12l-10 5-10-5Zm-8 41h29m-20-9 9 9-9 9"/><circle cx="62" cy="103" r="2"/><circle cx="99" cy="113" r="2"/>',
        'golgi-cystic-fibrosis': '<path d="M50 57q50-20 100 0M55 72q45-20 90 0M61 87q39-20 78 0M68 102q32-20 64 0"/><circle cx="157" cy="77" r="6"/><circle cx="148" cy="104" r="5"/><circle cx="45" cy="105" r="5"/>'
    }
    short = {'endoplasmic-reticulum-heart-injury':'ER','lysosomes-pancreatitis':'Lysosome','cell-membrane-rhabdomyolysis':'Membrane','cytoplasm-sepsis':'Cytoplasm','golgi-cystic-fibrosis':'Golgi'}[t['slug']]
    return f'''<svg class="trail-sketch" viewBox="0 0 530 185" role="img" aria-label="Concept sketch: {esc(short)} connects through dysfunction to patient findings"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">{shapes[t['slug']]}<path d="M174 82h48m-9-7 9 7-9 7"/><path d="M259 50h53v66h-53zm9 14h35m-35 13h35m-35 13h25"/><path d="M330 82h47m-9-7 9 7-9 7"/><circle cx="426" cy="53" r="16"/><path d="M426 69v49m0-31-24 15m24-15 24 15m-24 16-18 17m18-17 18 17"/><text x="101" y="165">{short}</text><text x="286" y="165">Dysfunction</text><text x="427" y="165">Patient findings</text></g></svg>'''
def render(t):
    out = head(t['title'].replace('→','and'), t['subtitle']+' EMT recognition, AEMT mechanisms, and Paramedic treatment physiology.', t['slug'])
    out += f'''<a class="trail-back" href="connection-trails.html">All Connection Trails</a><p class="eyebrow">From cell to patient</p><h1>{esc(t['title'])}</h1><p class="trail-lead">{esc(t['subtitle'])}</p><p>{esc(t['intro'])}</p>{sketch(t)}
<section class="patient" aria-labelledby="patient-heading"><h2 id="patient-heading">Start with this patient</h2><p>{esc(t['case'])}</p></section>
<div class="trail-controls" hidden><label for="trail-level">Learning view<select id="trail-level"><option value="emt">EMT · Recognize</option><option value="aemt">AEMT · Connect</option><option value="paramedic">Paramedic · Explain</option></select></label><fieldset><legend>Where would you like to start?</legend><button type="button" data-direction="science" aria-pressed="true">Start with the science</button><button type="button" data-direction="patient" aria-pressed="false">Start with the patient</button></fieldset><button type="button" id="trail-print">Print full trail</button></div>
<p class="help">EMT: three simple stops. AEMT: six mechanism connections. Paramedic: deeper physiology and treatment reasoning. Learning views do not expand clinical scope; care follows local protocols and medical direction.</p><p id="trail-direction-note" class="help" hidden></p><nav aria-label="Connection stepping stones"><ol class="trail-map">'''
    for i,s in enumerate(t['steps'],1):
        out += f'<li><a href="#step={i}"><span class="stone-number">{i}</span><span class="stone-label" data-full-label="{esc(s["title"])}">{esc(s["title"])}</span></a></li>'
    out += '</ol></nav><div id="trail-steps">'
    for i,s in enumerate(t['steps'],1):
        out += f'<article class="trail-step challenge-card" id="stone-{i}" data-step="{i}"><p class="eyebrow">Stepping stone {i} of 6</p><h2 tabindex="-1">{esc(s["title"])}</h2><p class="trail-lead">{esc(s["lead"])}</p>'
        for level,label in LEVELS.items():
            out += f'<div class="trail-depth" data-level="{level}"><h3>{label}</h3><p>{esc(s["levels"][level])}</p></div>'
        out += f'<p class="help">{citations(s["refs"])}</p>' + check(s,'basic')
        if i==6:
            out += check(t['advanced'],'paramedic')
        out += f'<details class="trail-explanation"><summary>Explain the connection</summary><p>{esc(s["feedback"])}</p></details></article>\n'
    out += '</div><nav class="trail-paging" aria-label="Trail navigation" hidden><button id="trail-prev" type="button">← Previous stone</button><p id="trail-position" role="status"></p><button id="trail-next" type="button">Next stone →</button></nav><p id="trail-check-status" class="help" role="status" hidden></p>'
    out += '<section class="trail-treatment field-note"><h2>Treatment: connect the why</h2><p class="help">Prehospital actions require authorization. Definitive and long-term care are included to explain physiology, not to expand field scope.</p>'
    for level,label in LEVELS.items():
        out += f'<div class="trail-depth" data-level="{level}"><h3>{label}</h3>' + ''.join(f'<p>{esc(p)}</p>' for p in t['treatment'][level].split('\n')) + citations(t['treatmentRefs']) + '</div>'
    out += f'</section><section class="field-note"><h2>Keep the whole picture</h2><p>{esc(t["caution"])}</p></section><section class="trail-sources"><h2>Evidence &amp; further reading</h2><p class="help">Sources checked October 4, 2026. Teaching synthesis with original concept sketches. Mechanism reviews and experimental evidence explain plausibility; clinical trials and guidelines inform treatment. No field finding establishes an organelle-level diagnosis.</p><ol>'
    for i,r in enumerate(t['sources'],1):
        out += f'<li id="source-{i}"><a href="{esc(r["url"])}" target="_blank" rel="noopener noreferrer">{esc(r["label"])}</a><br><span class="help">{esc(r["kind"])}</span></li>'
    out += '</ol></section><section class="trail-practice"><h2>Take the next step</h2><a href="what-first.html">Practice clinical priorities →</a><a href="flashcards.html">Review clinical flashcards →</a><a href="connection-trails.html">Explore another trail →</a></section><noscript><p>All six stones and all learning views appear in reading order. For a short EMT path, read EMT at stones 1, 3, and 6, then EMT treatment.</p></noscript></main><script src="study-streak.js"></script><script src="connection-trails.js"></script></body></html>\n'
    return out
def main():
    trails=json.loads((ROOT/'connection-trails-content.json').read_text())
    for t in trails:
        assert len(t['steps']) == 6
        assert all(set(s['levels']) == set(LEVELS) for s in t['steps'])
        (ROOT/(t['slug']+'.html')).write_text(render(t))
    hub = head('The Connection Trails: Science to Patient','Sourced EMS learning trails from cell function to disease, with EMT, AEMT, and Paramedic physiology and treatment views.','connection-trails')
    hub += '<p class="eyebrow">From cell to patient</p><h1>The Connection Trails</h1><p class="trail-lead">Follow the why.</p><p>Start with a cell’s job. Follow what changes. Meet the patient at the end of the trail.</p><p>EMT gives you a straight three-stop path. AEMT adds the mechanism. Paramedic explores deeper physiology, treatment tradeoffs, and reassessment.</p>'
    for title,group in [('Inside the cell',[t for t in trails if t['slug'] not in ['airway-resistance-asthma','insulin-ketoacidosis']]),('Beyond the cell',[t for t in trails if t['slug'] in ['airway-resistance-asthma','insulin-ketoacidosis']])]:
        hub += f'<h2>{title}</h2><div class="trail-library">'
        for t in group:
            hub += f'<a class="trail-cover" href="{t["slug"]}.html">{sketch(t)}<span class="eyebrow">EMT: 3 stops · AEMT &amp; Paramedic: 6</span><h3>{esc(t["title"])}</h3><p>{esc(t["subtitle"])}</p><span class="trail-open">Follow this trail →</span></a>'
        hub += '</div>'
    hub += '<section class="field-note"><h2>A little science. A clearer assessment.</h2><p>Every trail includes a patient scene, three learning depths, reasoning checks, treatment physiology, and linked evidence. Reviews explain mechanisms; clinical guidelines and trials support treatment reasoning.</p><p class="help">Not every disease is caused by destruction of its featured organelle. Some trails follow dysfunction or protein trafficking. Learning depth does not define permission to perform care.</p></section></main><script src="connection-trails.js"></script></body></html>\n'
    (ROOT/'connection-trails.html').write_text(hub)
if __name__ == '__main__':
    main()
