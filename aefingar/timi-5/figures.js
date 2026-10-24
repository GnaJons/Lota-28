'use strict';
const fmt=n=>String(Number(n.toFixed(6))).replace('.',',');
const frac=(a,b)=>`<span class="fraction"><span>${a}</span><span>${b}</span></span>`;
const svg=(body,alt,h=340)=>`<svg viewBox="0 0 520 ${h}" role="img" aria-label="${alt}">${body}</svg>`;
const line=(p,q,cls='edge')=>`<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" class="${cls}"/>`;
const label=(p,t,cls='figure-label')=>`<text x="${p[0]}" y="${p[1]}" text-anchor="middle" dominant-baseline="central" class="${cls}">${t}</text>`;
const rect=(x,y,w,h,fill='#eff5f8')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="#526773" stroke-width="1.5"/>`;
const polygon=(points,fill='#eff5f8')=>`<polygon points="${points.map(p=>p.join(',')).join(' ')}" fill="${fill}" stroke="#526773" stroke-width="1.5"/>`;
const dim=(x1,x2,y,t)=>line([x1,y],[x2,y],'dimension')+line([x1,y-4],[x1,y+4],'dimension')+line([x2,y-4],[x2,y+4],'dimension')+label([(x1+x2)/2,y+16],t);
function apronPath(x,y,k){return `M${x+2*k} ${y} H${x+4*k} C${x+4*k} ${y+3*k} ${x+4.8*k} ${y+3.6*k} ${x+6*k} ${y+4*k} V${y+9*k} H${x} V${y+4*k} C${x+1.2*k} ${y+3.6*k} ${x+2*k} ${y+3*k} ${x+2*k} ${y} Z`}
function apronFigure(v,child=false){
 const k=29,x=173,y=25,unit=child?v.apron[1]:v.apron[0];
 let s=`<path d="${apronPath(x,y,k)}" fill="#f7ecd9"/>`;
 for(let i=0;i<=6;i++)s+=line([x+i*k,y],[x+i*k,y+9*k],'grid-line');
 for(let i=0;i<=9;i++)s+=line([x,y+i*k],[x+6*k,y+i*k],'grid-line');
 s+=`<path d="${apronPath(x,y,k)}" fill="none" stroke="#526773" stroke-width="2"/>`;
 return svg(s+label([260,317],'Heilt snið · einn reitur: '+fmt(unit)+' cm','diagram-note'),`Heilt svuntusnið, 9 reitir á lengd og mest 6 reitir á breidd. Hlið hvers reits táknar ${fmt(unit)} cm.`);
}
function fabricFigure(v){
 const [a,c,roll]=v.apron,al=9*a,aw=6*a,cl=9*c,cw=6*c,k=Math.min(340/roll,260/(al+cl)),x=100,y=24,W=roll*k;
 let s=rect(x,y,W,(al+cl)*k,'#fff')+rect(x,y,aw*k,al*k,'#f7ecd9')+rect(x,y+al*k,cw*k,cl*k,'#e6f0e6')+rect(x+cw*k,y+al*k,cw*k,cl*k,'#e6f0e6');
 s+=label([x+aw*k/2,y+al*k/2],'Fullorðins','fabric-label')+label([x+cw*k/2,y+al*k+cl*k/2],'Barn','fabric-label')+label([x+cw*k*1.5,y+al*k+cl*k/2],'Barn','fabric-label');
 s+=label([x-33,y+al*k/2],fmt(al)+' cm','ruler-label')+label([x-33,y+al*k+cl*k/2],fmt(cl)+' cm','ruler-label')+dim(x,x+W,y+(al+cl)*k+17,fmt(roll)+' cm');
 return svg(s,`Efnisrúlla ${roll} cm á breidd. Ein fullorðinssvunta í efri röð sem er ${al} cm löng. Tvær barnasvuntur hlið við hlið í neðri röð sem er ${cl} cm löng. Þær nota samtals ${2*cw} cm af breidd rúllunnar.`);
}
function boxesFigure(v){
 const [rows,b,p]=v.boxes,k=Math.min(185/b,210/p),x=65,y=42,W=b*k,H=p*k,ground=y+H*.8,boardH=15*k,gap=(H*.8-rows*boardH)/(rows-1);
 let s=`<rect x="${x-10}" y="${ground}" width="${W+20}" height="${H*.2}" fill="#e7eee3"/>`+rect(x,y,5*k,H,'#e9e0cd')+rect(x+W-5*k,y,5*k,H,'#e9e0cd');
 for(let r=0;r<rows;r++)s+=rect(x,y+r*(boardH+gap),W,boardH,'#f7ecd9');
 s+=dim(x,x+W,y+H+19,fmt(b)+' cm')+line([x+W+20,y],[x+W+20,y+H],'dimension')+label([x+W+56,y+H/2],fmt(p)+' cm','ruler-label')+label([x+W/2,327],'Ein hlið','diagram-note');
 for(let j=0;j<3;j++){let bx=380,by=35+j*95;s+=rect(bx,by,68,68,'#eff5f8');for(const [dx,dy]of [[0,0],[68,0],[0,68],[68,68]])s+=`<circle cx="${bx+dx}" cy="${by+dy}" r="4.5" fill="#ac572e"/>`;s+=label([bx+34,by+34],String(j+1),'figure-label')}
 s+=label([414,327],'Ofan frá','diagram-note');
 return svg(s,`Þrír aðskildir kassar án botns og loks. Hver hefur 4 hliðar og 4 staura. Á hverri hlið eru ${rows} timburfjalir, hver ${b} cm löng. Hver staur er ${p} cm langur. Rauðir punktar sýna fjóra staura á hverjum kassa.`);
}
function viewDrawing(v,type,wrong=false,compact=false){
 const [w,d,wall,h,dw,dh,n]=v.dog,k=Math.min(270/Math.max(w,d),205/h,205/d),cx=260,bottom=252;
 let s='';
 if(type==='top'){let x=cx-w*k/2,y=70;s=rect(x,y,w*k,d*k,'#eff5f8');if(!compact)s+=dim(x,x+w*k,y+d*k+16,fmt(w)+' cm')+label([x+w*k+42,y+d*k/2],fmt(d)+' cm','ruler-label');}
 if(type==='front'){
  let x=cx-w*k/2,peak=bottom-(wrong?wall:h)*k;
  s=polygon([[x,bottom],[x,bottom-wall*k],[cx,peak],[x+w*k,bottom-wall*k],[x+w*k,bottom]],'#f7ecd9')+line([x,bottom-wall*k],[x+w*k,bottom-wall*k],'dimension')+rect(cx-dw*k/2,bottom-dh*k,dw*k,dh*k,'#fff');
  if(!compact)s+=dim(x,x+w*k,bottom+17,fmt(w)+' cm')+label([x+w*k+40,bottom-h*k/2],fmt(h)+' cm','ruler-label');
 }
 if(type==='side'){
  let x=cx-d*k/2;
  s=rect(x,bottom-h*k,d*k,h*k,'#e7eee3')+line([x,bottom-wall*k],[x+d*k,bottom-wall*k],'edge');
  if(wrong)s+=`<path d="M${x} ${bottom-wall*k} L${cx} ${bottom-h*k} L${x+d*k} ${bottom-wall*k}" fill="none" stroke="#ac572e" stroke-width="2"/>`;
  if(!compact)s+=dim(x,x+d*k,bottom+17,fmt(d)+' cm')+label([x+d*k+42,bottom-h*k/2],fmt(h)+' cm','ruler-label');
 }
 if(!compact)s+=label([260,328],type==='top'?'Grunnmynd':type==='front'?'Framan frá':'Frá hlið','diagram-note');
 return svg(s,compact?(type==='top'?'Rétthyrningur án innri lína.':type==='front'?'Fimmhyrnd útlína með mænisþaki, miðjuðum dyrum og línu við neðri brún þaks.':'Rétthyrnd útlína með láréttri línu fyrir ofan miðju, án dyra.'):`${type==='top'?'Grunnmynd: breidd og dýpt':type==='front'?'Framhlið: mænisþak og miðjaðar dyr':'Hliðarmynd: dýpt og heildarhæð, með mótum veggjar og þaks'}.`);
}
function dogFigure(v){
 const [w,d,wall,h,dw,dh,n]=v.dog;
 return `<div class="drawing-info">${viewDrawing(v,'front')}<div class="measurements"><span>Breidd: <b>${w} cm</b></span><span>Dýpt: <b>${d} cm</b></span><span>Vegghæð: <b>${wall} cm</b></span><span>Heildarhæð: <b>${h} cm</b></span><span>Dyr: <b>${dw} × ${dh} cm</b></span><span>Mælikvarði: <b>1 : ${n}</b></span></div></div>`;
}
function viewOption(v,type,caption,wrong=false){return `<span class="view-option">${viewDrawing(v,type,wrong,true)}<span>${caption}</span></span>`;}
function bathroomFigure(v){
 const [w,d,sh,vw,vd,tw,td,draw]=v.bath,k=Math.min(350/w,238/d),x=(520-w*k)/2,y=56,W=w*k,H=d*k;
 let s=rect(x,y,W,H,'#fff')+rect(x,y,sh*k,sh*k,'#e6eee0')+rect(x+(w-vw)*k,y,vw*k,vd*k,'#f7ecd9')+rect(x+(w-tw)*k,y+(d-td)*k,tw*k,td*k,'#e4edf3');
 s+=label([x+sh*k/2,y+sh*k/2],'1','figure-label');
 s+=label([x+(w-vw/2)*k,y+vd*k/2],'2','figure-label');
 s+=label([x+(w-tw/2)*k,y+(d-td/2)*k],'3','figure-label');
 const doorX=x+W*.13,doorW=W*.2;s+=line([doorX,y+H],[doorX+doorW,y+H],'door-gap')+line([doorX,y+H],[doorX,y+H-doorW],'dimension')+`<path d="M${doorX} ${y+H-doorW} A${doorW} ${doorW} 0 0 1 ${doorX+doorW} ${y+H}" class="extension" fill="none"/>`;
 s+=dim(x,x+W,24,String(w))+label([x-34,y+H/2],String(d),'ruler-label')+label([260,328],'Öll mál í millimetrum','diagram-note');
 return `<div class="room-figure">${svg(s,`Baðherbergi ${w} × ${d} mm innan veggja. Svæði 1 er sturta, ${sh} × ${sh} mm. Svæði 2 er innrétting, ${vw} × ${vd} mm. Svæði 3 er salerni, ${tw} × ${td} mm. Lituðu svæðin skarast ekki. Hurðarboginn táknar opnun og er ekki búnaður.`)}<div class="room-key"><span><b>1. Sturta:</b> ${sh} × ${sh} mm</span><span><b>2. Innrétting:</b> ${vw} × ${vd} mm</span><span><b>3. Salerni:</b> ${tw} × ${td} mm</span></div></div>`;
}
function cabinetFigure(v){
 const [count,w,d,h,unit]=v.cabinets,L=count*w,nL=L/unit,nD=d/unit,nH=h/unit;
 const raw=(a,b,c)=>[a*26+b*26,(a-b)*15-c*30],corners=[[0,0,0],[nL,0,0],[nL,nD,0],[0,nD,0],[0,0,nH],[nL,0,nH],[nL,nD,nH],[0,nD,nH]].map(p=>raw(...p));
 const xs=corners.map(p=>p[0]),ys=corners.map(p=>p[1]),minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.min(...ys),maxY=Math.max(...ys),k=Math.min(325/(maxX-minX),235/(maxY-minY));
 const point=(a,b,c)=>{const p=raw(a,b,c);return [(p[0]-(minX+maxX)/2)*k+260,(p[1]-(minY+maxY)/2)*k+160]};
 const P=[[0,0,0],[nL,0,0],[nL,nD,0],[0,nD,0],[0,0,nH],[nL,0,nH],[nL,nD,nH],[0,nD,nH]].map(p=>point(...p));
 let s='';for(let a=-nH-2;a<=nL+2;a++)for(let b=-2;b<=nD+nH+2;b++){const p=point(a,b,0);if(p[0]>20&&p[0]<500&&p[1]>15&&p[1]<315)s+=`<circle cx="${p[0]}" cy="${p[1]}" r="1.3" fill="#c2ccd0"/>`;}
 s+=polygon([P[0],P[1],P[5],P[4]],'#f7ecd9')+polygon([P[1],P[2],P[6],P[5]],'#e6eee0')+polygon([P[4],P[5],P[6],P[7]],'#faf7ef');
 for(let i=1;i<count;i++){let a=i*w/unit;s+=line(point(a,0,0),point(a,0,nH),'edge')+line(point(a,0,nH),point(a,nD,nH),'guide');}
 s+=label([(P[0][0]+P[1][0])/2,(P[0][1]+P[1][1])/2+25],L+' cm')+label([(P[1][0]+P[2][0])/2+29,(P[1][1]+P[2][1])/2+12],d+' cm','ruler-label')+label([P[0][0]-30,(P[0][1]+P[4][1])/2],h+' cm','ruler-label');
 return svg(s+label([260,330],'Eitt bil í hverri teikniátt: '+unit+' cm','diagram-note'),`${count} skápar í röð. Hver er ${w} cm breiður, ${d} cm djúpur og ${h} cm hár. Heildarlengd ${L} cm. Eitt bil eftir hverri af þremur teikniáttum táknar ${unit} cm.`,355);
}
