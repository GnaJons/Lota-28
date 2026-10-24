'use strict';
const fmt=n=>{const [whole,decimal]=String(Number(n.toFixed(9))).split('.');return whole.replace(/\B(?=(\d{3})+(?!\d))/g,' ')+(decimal?','+decimal:'');};
const frac=(a,b)=>`<span class="fraction"><span>${a}</span><span>${b}</span></span>`;
const unitLabels={m3:'m³',dm3:'dm³',cm3:'cm³',mm3:'mm³',l:'l',dl:'dl',cl:'cl',ml:'ml',g:'g',kg:'kg'};
const unit=id=>unitLabels[id];
const cubeUnits=['m3','dm3','cm3','mm3'],litreUnits=['l','dl','cl','ml'];
function conversionFigure(value,from,to,track=null,note='Rúmmálið helst óbreytt.'){
 const route=track?`<div class="unit-track" aria-label="Einingar frá stærri til minni">${track.map((u,i)=>`${i?'<span class="track-arrow" aria-hidden="true">→</span>':''}<span class="node ${u===from?'from ':''}${u===to?'to':''}">${unit(u)}</span>`).join('')}</div>`:'';
 return `<div class="unit-board"><div class="unit-equation"><span class="unit-value">${fmt(value)} ${unit(from)}</span><span class="arrow" aria-hidden="true">→</span><span class="unit-value target">? ${unit(to)}</span></div>${route}<p class="conversion-note">${note}</p></div>`;
}
function bridgeFigure(){return '<div class="bridge-board"><div class="bridge-row"><span>1 l</span><span class="equals">=</span><span>? dm³</span></div><div class="bridge-row"><span>1 ml</span><span class="equals">=</span><span>? cm³</span></div></div>';}
function waterFigure(value,from,to){
 return `<div class="water-board"><div class="unit-equation"><span class="unit-value">${fmt(value)} ${unit(from)}</span><span class="arrow" aria-hidden="true">→</span><span class="unit-value target">? ${unit(to)}</span></div><div class="water-key"><span>1 l af vatni ↔ 1 kg</span><span>1 ml af vatni ↔ 1 g</span></div><p class="water-note">Gefin forsenda fyrir vatnið í þessum dæmum.</p></div>`;
}
function cubeFigure(){
 const P=(x,y,z)=>[105+18*x+9*y,264-6*y-18*z],pts=[[0,0,0],[10,0,0],[10,10,0],[0,10,0],[0,0,10],[10,0,10],[10,10,10],[0,10,10]].map(p=>P(...p));
 const line=(a,b)=>`<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" class="cube-grid"/>`;
 const poly=(p,color)=>`<polygon points="${p.map(i=>pts[i].join(',')).join(' ')}" fill="${color}" stroke="#526773" stroke-width="1.6"/>`;
 const label=(x,y,t)=>`<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central" class="figure-label">${t}</text>`;
 let s=poly([0,1,5,4],'#f7ecd9')+poly([1,2,6,5],'#e7efe4')+poly([4,5,6,7],'#edf3f7');
 for(let i=1;i<10;i++){s+=line(P(i,0,0),P(i,0,10))+line(P(0,0,i),P(10,0,i))+line(P(10,i,0),P(10,i,10))+line(P(10,0,i),P(10,10,i))+line(P(i,0,10),P(i,10,10))+line(P(0,i,10),P(10,i,10));}
 s+=label(195,287,'10 mm')+label(365,248,'10 mm')+label(62,174,'10 mm');
 s+='<text x="260" y="326" text-anchor="middle" class="diagram-note">1 cm brún = 10 mm</text>';
 return `<svg viewBox="0 0 520 345" role="img" aria-label="Teningur með 1 cm brún. Hver brún er skipt í 10 millimetra. Tíu litlir teningar komast í hverja af þremur áttum.">${s}</svg>`;
}
