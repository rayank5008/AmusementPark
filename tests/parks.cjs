'use strict';
const assert=require('node:assert/strict');
const {PARKS,RIDE_TYPES,recommend}=require('../park-data.js');
const types=Object.keys(RIDE_TYPES);
let combinations=0;
for(let mask=1;mask<8;mask++)for(const comfort of ['any','gentle']){
  const chosen=types.filter((_,i)=>mask&(1<<i));
  const result=recommend(chosen,comfort);
  assert.deepEqual(result,recommend(chosen,comfort));
  for(const match of result.matches){
    assert.ok(match.rides.length);
    assert.ok(match.rides.every(r=>chosen.includes(r.type)));
    if(comfort==='gentle')assert.ok(match.rides.every(r=>r.gentle),'Standing rule must hold for every combination');
    assert.deepEqual(new Set([...match.matchedTypes,...match.missing]),new Set(chosen));
  }
  combinations++;
}
assert.equal(recommend(['drop'],'any').matches[0].park.id,'magic');
assert.equal(recommend(['drop'],'gentle').matches.length,0);
assert.equal(recommend(['coaster','drop'],'gentle').matches.length,0);
assert.equal(recommend(['carousel'],'gentle').matches.length,3);
assert.equal(recommend(['drop','carousel'],'any').matches[0].park.id,'magic');
assert.ok(recommend(['drop','carousel'],'any').matches.find(m=>m.park.id==='disneyland').missing.includes('drop'));
for(const input of [[],null,undefined,['bogus'],['__proto__']])assert.ok(recommend(input,'any').error);
assert.ok(recommend(['carousel'],'bad').error);
assert.deepEqual(recommend(['carousel','carousel'],'gentle'),recommend(['carousel'],'gentle'));
for(const park of PARKS)for(const ride of park.rides){
  const url=new URL(ride.source);assert.equal(url.protocol,'https:');
  assert.ok(['beachboardwalk.com','www.sixflags.com','disneyland.disney.go.com'].includes(url.hostname));
}
console.log('Passed: 14 preference combinations, gentle-only invariant, no matches, partial matches, ranking, invalid inputs, duplicate choices, source domains.');
