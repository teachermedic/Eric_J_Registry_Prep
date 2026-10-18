const assert=require('node:assert/strict'),G=require('../instructor-corner-engine.js');
const item=(type,extra={})=>({...G.newItem(type),text:'Test question',answers:['A','B','C'],...extra});
const single=item('single',{correct:[1]});assert.equal(G.grade(single,1),true);for(const v of [null,-1,3,'1',{},[1],NaN])assert.equal(G.grade(single,v),false);
const multi=item('multiple',{correct:[0,2]});assert.equal(G.grade(multi,[2,0]),true);for(const v of [[0],[0,1,2],[0,0,2],[],[-1],null])assert.equal(G.grade(multi,v),false);
const typed=item('typed',{accepted:['Myocardial infarction','MI']});assert.equal(G.grade(typed,'  myocardial   INFARCTION  '),true);assert.equal(G.grade(typed,'mi'),true);assert.equal(G.grade(typed,'heart attack'),false);
const order=item('order');assert.equal(G.grade(order,[0,1,2]),true);for(const v of [[1,0,2],[0,1],[0,0,2],null])assert.equal(G.grade(order,v),false);
assert.equal(G.grade(item('poll'),1),null);assert.equal(G.validResponse(item('slide'),0),false);
assert.deepEqual(G.fromBank({q:'Q',options:['a','b'],answer:['a','b']}).correct,[0,1]);assert.equal(G.fromBank({q:'Q',options:['a','b'],answer:['a','b']}).type,'multiple');
const deck=G.validate([single,multi,typed,order,item('poll'),item('slide')]);assert.equal(deck.length,6);assert.deepEqual(G.parseDeck(JSON.stringify({format:'hearth-gathering-hall',version:2,items:deck})),deck);
for(const bad of [[],Array(61).fill(single),[item('unknown')],[item('single',{text:''})],[item('single',{correct:[8]})],[item('multiple',{correct:[]})],[item('typed',{accepted:[]})],[item('single',{image:'https://example.com/x.jpg'})],[item('single',{image:'data:image/svg+xml;base64,AAAA'})],[item('single',{image:'data:image/jpeg;base64,AAAA',imageAlt:''})]])assert.throws(()=>G.validate(bad));
assert.throws(()=>G.parseDeck('{"format":"other","version":2,"items":[]}'));assert.throws(()=>G.parseDeck('invalid'));
for(const q of [single,multi,typed,order]){const publicQ=G.publicItem(q);assert.equal(publicQ.correct,undefined);assert.equal(publicQ.accepted,undefined);assert.equal(publicQ.rationale,'');if(q.type==='order')assert.deepEqual(publicQ.answers,[]);}
assert.equal(G.csvCell('=HYPERLINK("x")'),'"\'=HYPERLINK(""x"")"');assert.equal(G.csvCell('a,b'),'"a,b"');
console.log('PASS: grading, malformed responses, select-all exact matching, typed normalization, ordering, unscored polls/slides, bank conversion, deck validation/roundtrip, answer-key redaction and spreadsheet formula escaping.');

assert.equal(G.CHARACTERS.length,12);for(const id of ['wizard','elf','dwarf','hobbit','orc','goblin'])assert.ok(G.CHARACTERS.some(c=>c.id===id));assert.equal(new Set(G.CHARACTERS.map(c=>c.id)).size,12);
