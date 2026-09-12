'use strict';
// Small editorial collection, not a complete park or ride inventory. Sources checked 2026-09-11.
const RIDE_TYPES = Object.freeze({coaster:'Roller coasters',drop:'Drop towers',carousel:'Merry-go-rounds'});
const PARKS = [
  {id:'boardwalk',name:'Santa Cruz Beach Boardwalk',location:'Santa Cruz',setting:'A day by the ocean',color:'aqua',rides:[
    {name:'Giant Dipper',type:'coaster',gentle:false,source:'https://beachboardwalk.com/rides/giant-dipper/'},
    {name:'Looff Carousel',type:'carousel',gentle:true,source:'https://beachboardwalk.com/rides/looff-carousel/'}]},
  {id:'disneyland',name:'Disneyland Park',location:'Anaheim',setting:'A little storybook escape',color:'lavender',rides:[
    {name:'Space Mountain',type:'coaster',gentle:false,source:'https://disneyland.disney.go.com/attractions/disneyland/space-mountain/'},
    {name:'King Arthur Carrousel',type:'carousel',gentle:true,source:'https://disneyland.disney.go.com/en_CA/attractions/disneyland/king-arthur-carrousel/'}]},
  {id:'magic',name:'Six Flags Magic Mountain',location:'Valencia',setting:'Make it a park day',color:'coral',rides:[
    {name:'Twisted Colossus',type:'coaster',gentle:false,source:'https://www.sixflags.com/magicmountain/attractions/twisted-colossus'},
    {name:'LEX LUTHOR: Drop of Doom',type:'drop',gentle:false,source:'https://www.sixflags.com/magicmountain/attractions/lex-luthor-drop-doom'},
    {name:'Grand American Carousel',type:'carousel',gentle:true,source:'https://www.sixflags.com/magicmountain/attractions/grand-american-carousel'}]}
];
function recommend(types, comfort) {
  if(!Array.isArray(types)||!types.length) return {error:'Choose at least one ride type to find your parks.',matches:[]};
  if(!types.every(t=>Object.hasOwn(RIDE_TYPES,t))||!['any','gentle'].includes(comfort)) return {error:'Choose one of the listed ride types and comfort options.',matches:[]};
  const selected=[...new Set(types)];
  const matches=PARKS.map(park=>{
    const rides=park.rides.filter(r=>selected.includes(r.type)&&(comfort!=='gentle'||r.gentle));
    const matchedTypes=[...new Set(rides.map(r=>r.type))];
    return {park,rides,matchedTypes,missing:selected.filter(t=>!matchedTypes.includes(t))};
  }).filter(m=>m.rides.length>0).sort((a,b)=>b.matchedTypes.length-a.matchedTypes.length||a.park.name.localeCompare(b.park.name));
  return {matches};
}
if(typeof module!=='undefined') module.exports={PARKS,RIDE_TYPES,recommend};
