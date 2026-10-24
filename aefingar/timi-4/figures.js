'use strict';
const fmt=n=>String(Number(n.toFixed(6))).replace('.',',');
const group=n=>String(n).replace(/\B(?=(\d{3})+(?!\d))/g,' ');
const rounded=(n,places=3)=>Math.round((n+Number.EPSILON)*10**places)/10**places;
const frac=(a,b)=>`<span class="fraction"><span>${a}</span><span>${b}</span></span>`;
const svg=(body,label,h=340)=>`<svg viewBox="0 0 520 ${h}" role="img" aria-label="${label}">${body}</svg>`;
const line=(p,q,cls='edge')=>`<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" class="${cls}"/>`;
const label=(p,t,cls='figure-label')=>`<text x="${p[0]}" y="${p[1]}" text-anchor="middle" dominant-baseline="central" class="${cls}">${t}</text>`;
function comparisonFigure(real,model,kind='tower'){
 const tower=(x,y,w,h)=>`<path d="M${x-w/2} ${y} L${x-w*.32} ${y-h*.7} L${x-w*.12} ${y-h*.88} L${x} ${y-h} L${x+w*.12} ${y-h*.88} L${x+w*.32} ${y-h*.7} L${x+w/2} ${y} Z" fill="#f7ecd9" stroke="#425963" stroke-width="2"/>`;
 const building=(x,y,w,h)=>`<rect x="${x-w/2}" y="${y-h}" width="${w}" height="${h}" fill="#eaf3f8" stroke="#425963" stroke-width="2"/>`+[.25,.55,.8].map(a=>line([x-w*.34,y-h*a],[x+w*.34,y-h*a],'dimension')).join('');
 const shape=kind==='tower'?tower:building;
 return svg(label([140,35],'Í raun')+label([380,35],kind==='tower'?'Líkan':'Á mynd')+shape(140,255,90,170)+shape(380,255,45,85)+label([140,285],fmt(real)+' m')+label([380,285],fmt(model)+' cm')+label([260,170],'→')+label([260,325],'Myndirnar eru skýringarmyndir.','diagram-note'),`${kind==='tower'?'Turn':'Bygging'} er ${fmt(real)} m á hæð. Samsvarandi hæð á ${kind==='tower'?'líkani':'mynd'} er ${fmt(model)} cm. Myndirnar tvær eru ekki í sama mælikvarða.`);
}
function ratioFigure(a,b,imageLength=null){
 return `<div class="scale-board"><div class="scale-labels"><span>Á mynd</span><span>Í raun</span></div><div class="ratio-display"><span>${group(fmt(a))}</span><span>:</span><span>${group(fmt(b))}</span></div><p class="scale-caption">${imageLength===null?'Mælikvarði: mynd : raun':`Lengd á mynd: <strong>${fmt(imageLength)} cm</strong>`}</p></div>`;
}
function mapFigure(cm,real,scale=false){
 return svg(`<path d="M90 215 C140 95 220 285 300 115 S405 105 438 70" stroke="#d7e5dd" stroke-width="38" fill="none" stroke-linecap="round"/>`+line([95,245],[425,92],'sight')+`<circle cx="95" cy="245" r="6" fill="#176c9b"/><circle cx="425" cy="92" r="6" fill="#176c9b"/>`+label([75,268],'A','vertex-label')+label([440,76],'B','vertex-label')+label([260,143],fmt(cm)+' cm á korti')+label([260,295],scale?'Mælikvarði 1 : '+group(real):'Í raun: '+group(fmt(real))+' km'),`Bein lína milli A og B er ${fmt(cm)} cm á korti. ${scale?'Mælikvarði 1 : '+real:'Raunfjarlægðin er '+real+' km'}. Kortið er skýringarmynd.`);
}
function ruler(from,to,length){
 let body=line(from,to,'ruler-line');const dx=to[0]-from[0],dy=to[1]-from[1],vertical=dx===0;
 for(let n=0;n<=Math.round(length*10);n++){
  const value=n/10,t=value/length,x=from[0]+dx*t,y=from[1]+dy*t,major=n%10===0,half=n%5===0,size=major?12:half?8:4;
  body+=line([x,y],[x+(vertical?size:0),y+(vertical?0:size)],'ruler-tick');
  if(major||n===Math.round(length*10))body+=label([x+(vertical?27:0),y+(vertical?0:(n===Math.round(length*10)&&!major?40:26))],fmt(value),'ruler-label');
 }
 return body;
}
function houseFigure(v,mode='choose'){
 const [real,h,w]=v.house,k=Math.min(320/w,205/h),x=(520-w*k)/2,y=258,cx=260,top=y-h*k,eave=y-h*k*.43,A=[cx,y],B=[cx,top],C=[x,y],D=[x+w*k,y];
 let s=`<path d="M${C} L${x} ${eave} L${B} L${x+w*k} ${eave} L${D} Z" fill="#fcf0e5" stroke="#425963" stroke-width="2"/>`+line([x,eave],[x+w*k,eave],'dimension');
 s+=`<rect x="${cx-65}" y="${y-50}" width="28" height="50" fill="#e8e4db" stroke="#7d919a"/><rect x="${cx+45}" y="${y-48}" width="42" height="27" fill="#e7f2f8" stroke="#7d919a"/>`;
 const hit=(p,q,i,name)=>`<g class="measure-hit" role="button" tabindex="0" aria-label="${name}" aria-pressed="false" data-choice="${i}">${line(p,q,'measure-edge')}<rect x="${Math.min(p[0],q[0])-12}" y="${Math.min(p[1],q[1])-12}" width="${Math.abs(q[0]-p[0])+24}" height="${Math.abs(q[1]-p[1])+24}" fill="transparent" stroke="none"/></g>`;
 if(mode==='choose')s+=hit(A,B,0,'Hæðin AB')+hit(C,D,1,'Breiddin CD');
 else s+=line(A,B,'guide');
 for(const [p,t,dx,dy] of [[A,'A',0,20],[B,'B',0,-20],[C,'C',-16,16],[D,'D',16,16]])s+=label([p[0]+dx,p[1]+dy],t,'vertex-label');
 if(mode==='height')s+=ruler([x+w*k+27,y],[x+w*k+27,top],h)+line(B,[x+w*k+27,top],'extension')+label([x+w*k+52,top-24],'cm','ruler-label');
 if(mode==='width')s+=ruler([x,y+43],[x+w*k,y+43],w)+line(C,[x,y+43],'extension')+line(D,[x+w*k,y+43],'extension')+label([x-28,y+55],'cm','ruler-label');
 if(mode==='scale')s+=label([cx+48,(y+top)/2],fmt(h)+' cm');
 if(mode!=='width')s+=label([260,322],'Raunhæð hússins: '+fmt(real)+' m','diagram-note');
 const out=svg(s,`Húsgafl. Raunhæð er ${fmt(real)} m. AB er öll hæðin frá grunnlínu að mæni og CD er breiddin.${mode==='height'?' Reglustikan meðfram AB sýnir '+fmt(h)+' cm.':mode==='width'?' Reglustikan undir CD sýnir '+fmt(w)+' cm.':''}`,355);
 return mode==='choose'?out.replace('role="img"','role="group"'):out;
}
function areaFigure(km){
 const square=(x,y,size,color)=>`<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="${color}" stroke="#425963" stroke-width="2"/>`;
 return svg(label([130,45],'Á korti')+label([382,45],'Í raun')+square(80,112,95,'#eff5f8')+square(305,85,150,'#f7ecd9')+label([127,163],'1 cm²')+label([127,227],'1 cm')+label([51,160],'1 cm')+label([260,163],'→')+label([380,255],fmt(km)+' km')+label([480,160],fmt(km)+' km')+label([380,163],'? km²'),`Ferningur sem er 1 cm á kant á kortinu táknar ferning sem er ${km} km á kant í raun.`);
}
