'use strict';
const form=document.getElementById('preferences');
const cards=document.getElementById('cards');
const title=document.getElementById('result-title');
const status=document.getElementById('status');
const summary=document.getElementById('summary');
const notice=document.getElementById('gentle-note');
function element(tag,text,className){const e=document.createElement(tag);if(text)e.textContent=text;if(className)e.className=className;return e;}
function choices(){return {types:[...form.querySelectorAll('input[name="ride"]:checked')].map(i=>i.value),comfort:form.elements.comfort.value};}
function updateSummary(){
  const {types,comfort}=choices();
  summary.textContent=(types.length?types.map(t=>RIDE_TYPES[t]).join(' + '):'No rides selected')+' · '+(comfort==='gentle'?'Gentle rides only':'Open to thrills');
  notice.hidden=comfort!=='gentle';
  cards.replaceChildren();
  title.textContent='Your next park day starts here.';
  status.textContent='Preferences updated. Find your parks to see new matches.';
}
form.addEventListener('change',updateSummary);
form.addEventListener('submit',event=>{
  event.preventDefault();
  const {types,comfort}=choices();
  const result=recommend(types,comfort);
  cards.replaceChildren();
  if(result.error){title.textContent='One quick choice first.';status.textContent=result.error;form.querySelector('input[name="ride"]').focus();return;}
  title.textContent=result.matches.length?`${result.matches.length} ${result.matches.length===1?'park':'parks'} for your kind of day.`:'No match in this small collection.';
  status.textContent=result.matches.length?'Matched by ride type. More matching types appear first; ties are alphabetical.':comfort==='gentle'?'Your selected rides have no gentle match here. Try merry-go-rounds; your comfort setting stays yours.':'Try another ride type. This collection does not cover every California park.';
  result.matches.forEach((match,index)=>{
    const card=element('article',null,'park '+match.park.color);
    const head=element('div',null,'card-top');head.append(element('span',match.park.location.toUpperCase(),'eyebrow'),element('span',String(index+1).padStart(2,'0'),'number'));card.append(head);
    card.append(element('h3',match.park.name),element('p',match.park.setting,'setting'));
    const badges=element('div',null,'badges');match.matchedTypes.forEach(t=>badges.append(element('span',RIDE_TYPES[t])));card.append(badges);
    card.append(element('p',comfort==='gentle'?'Your gentle ride match':'Your matching rides','ride-label'));
    const list=element('ul');match.rides.forEach(ride=>{const li=element('li');const a=element('a',ride.name+' ↗');a.href=ride.source;a.target='_blank';a.rel='noopener noreferrer';a.setAttribute('aria-label',ride.name+' — official ride details (opens in a new tab)');li.append(a);list.append(li);});card.append(list);
    if(match.missing.length)card.append(element('p','No listed match for: '+match.missing.map(t=>RIDE_TYPES[t]).join(', ')+'.','missing'));
    cards.append(card);
  });
  title.focus({preventScroll:true});
  const bounds=title.getBoundingClientRect();if(bounds.top<0||bounds.bottom>innerHeight)title.scrollIntoView({behavior:'auto',block:'start'});
});
updateSummary();status.textContent='Pick your rides, then find a place to make a day of it.';
