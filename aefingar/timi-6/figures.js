'use strict';
const fmt=n=>String(Number(n.toFixed(6))).replace('.',',');
const frac=(a,b)=>`<span class="fraction"><span>${a}</span><span>${b}</span></span>`;
const root=a=>`<span class="radical"><span>√</span><span>${a}</span></span>`;
const svg=(body,alt,h=340)=>`<svg viewBox="0 0 520 ${h}" role="img" aria-label="${alt}">${body}</svg>`;
const line=(p,q,cls='edge')=>`<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" class="${cls}"/>`;
const label=(p,t,cls='figure-label')=>`<text x="${p[0]}" y="${p[1]}" text-anchor="middle" dominant-baseline="central" class="${cls}">${t}</text>`;
const poly=(points,fill='#f7ecd9')=>`<polygon points="${points.map(p=>p.join(',')).join(' ')}" fill="${fill}" stroke="#526773" stroke-width="1.6"/>`;
const dim=(p,q,t,dy=20)=>line(p,q,'dimension')+line([p[0],p[1]-4],[p[0],p[1]+4],'dimension')+line([q[0],q[1]-4],[q[0],q[1]+4],'dimension')+label([(p[0]+q[0])/2,(p[1]+q[1])/2+dy],t);
const rightAngle=(x,y,dir=1)=>`<path d="M${x-12} ${y} V${y-12*dir} H${x}" class="dimension"/>`;
function rectangleFigure(l,b,square=false){
 const k=Math.min(280/l,195/b),x=(520-l*k)/2,y=(285-b*k)/2;
 let s=poly([[x,y],[x+l*k,y],[x+l*k,y+b*k],[x,y+b*k]],'#eef4f6');
 s+=dim([x,y+b*k+20],[x+l*k,y+b*k+20],fmt(l)+' cm');
 if(!square)s+=label([x-45,y+b*k/2],fmt(b)+' cm','figure-label small');
 return svg(s,`${square?'Ferningur':'Rétthyrningur'} með hliðar ${fmt(l)} cm og ${fmt(b)} cm.`);
}
function triangleFigure(b,h){
 const k=Math.min(300/b,200/h),x=105,y=262,A=[x,y],B=[x+b*k,y],C=[x+b*k*.6,y-h*k],D=[C[0],y];
 return svg(poly([A,B,C])+line(C,D,'extension')+rightAngle(D[0],D[1])+label([C[0]+32,(C[1]+D[1])/2],fmt(h)+' m')+dim([A[0],y+16],[B[0],y+16],fmt(b)+' m'),`Þríhyrningur með grunnlínu ${fmt(b)} m og hornrétta hæð ${fmt(h)} m inni í þríhyrningnum.`);
}
function selectable(p,q,i,description){const mark=i===1?[p[0]+19,p[1]+25]:[(p[0]+q[0])/2+(i===0?-15:0),(p[1]+q[1])/2-12];return `<g class="edge-hit" data-choice="${i}" role="button" tabindex="0" aria-pressed="false" aria-label="${description}">${line(p,q,'hit-target')}${line(p,q)}${label(mark,String.fromCharCode(65+i),'vertex-label')}</g>`;}
function outsideHeightFigure(b,h){
 const k=Math.min(280/(b*1.55),185/h),A=[65,255],B=[65+b*k,255],C=[65+b*k*1.55,255-h*k],D=[C[0],255];
 let s=poly([A,B,C],'#e8f0e5')+line(B,D,'extension')+rightAngle(D[0],D[1]);
 s+=selectable(B,C,0,'A: skáhlið þríhyrningsins')+selectable(C,D,1,'B: strik hornrétt á framlengda grunnlínu')+selectable(A,B,2,'C: grunnlína þríhyrningsins');
 s+=label([C[0]+43,(C[1]+D[1])/2],fmt(h)+' cm')+dim([A[0],278],[B[0],278],fmt(b)+' cm');
 return svg(s,`Gleiðhyrndur þríhyrningur. Grunnlínan er ${fmt(b)} cm og strik frá efsta hornpunkti að framlengingu grunnlínunnar er ${fmt(h)} cm. Veldu hæðina meðal strikanna A, B og C.`).replace('role="img"','role="group"');
}
function rightTriangleFigure(b,c){
 const h=Math.sqrt(c*c-b*b),k=Math.min(270/b,205/h),A=[105,263],B=[105+b*k,263],C=[B[0],263-h*k];
 return svg(poly([A,B,C],'#edf3f7')+rightAngle(B[0],B[1])+label([(A[0]+C[0])/2-30,(A[1]+C[1])/2-15],fmt(c)+' mm')+label([B[0]+30,(B[1]+C[1])/2],'h')+dim([A[0],281],[B[0],281],fmt(b)+' mm'),`Rétthyrndur þríhyrningur með skammhlið ${fmt(b)} mm, langhlið ${fmt(c)} mm og óþekkta hæð h.`);
}
function circleSquareFigure(s,r){
 const k=112/r,cx=260,cy=145,R=r*k,S=s*k,x=cx-S/2,y=cy-S/2;
 let out=`<circle cx="${cx}" cy="${cy}" r="${R}" fill="#edf3f7" stroke="#526773" stroke-width="1.6"/>`;
 out+=poly([[x,y],[x+S,y],[x+S,y+S],[x,y+S]],'none')+line([cx,cy],[cx-R,cy],'dimension')+`<circle cx="${cx}" cy="${cy}" r="3" fill="#526773"/>`+label([cx-R/2,cy+20],fmt(r)+' m');
 out+=dim([x,281],[x+S,281],fmt(s)+' m');
 return svg(out,`Ferningur með hliðarlengd ${fmt(s)} m og hringur með radíus ${fmt(r)} m, teiknuð í sama kvarða. Merkt strik í hringnum liggur frá miðju að jaðri.`);
}
function boxFigure(l,b,h,unit='cm',caption='',baseOnly=false){
 const k=Math.min(305/(l+b*.65),205/(h+b*.35)),ox=(520-(l+b*.65)*k)/2,oy=265;
 const P=(x,y,z)=>[ox+(x+y*.65)*k,oy-(z+y*.35)*k];
 const p=[P(0,0,0),P(l,0,0),P(l,b,0),P(0,b,0),P(0,0,h),P(l,0,h),P(l,b,h),P(0,b,h)];
 let s=poly([p[0],p[1],p[5],p[4]],'#f7ecd9')+poly([p[1],p[2],p[6],p[5]],'#e4edf3')+poly([p[4],p[5],p[6],p[7]],'#e6eee0');
 if(!baseOnly)s+=dim([p[0][0],oy+15],[p[1][0],oy+15],fmt(l)+' '+unit)+label([(p[1][0]+p[2][0])/2+32,(p[1][1]+p[2][1])/2+19],fmt(b)+' '+unit,'figure-label small');
 s+=label([p[2][0]+31,(p[2][1]+p[6][1])/2],fmt(h)+' '+unit,'figure-label small');
 if(baseOnly)s+=label([(p[4][0]+p[6][0])/2,(p[4][1]+p[6][1])/2],'G','figure-label');
 const alt=baseOnly?`Réttstrendingur með hæð ${fmt(h)} ${unit}. Efri og neðri grunnflötur hafa sama flatarmál G.`:`Rétthyrndur kassi, lengd ${fmt(l)} ${unit}, breidd ${fmt(b)} ${unit} og hæð ${fmt(h)} ${unit}.`;
 return `<div class="board-wrap">${svg(s,alt)}${caption?`<p class="figure-caption">${caption}</p>`:''}</div>`;
}
function grooveFigure(W,L,H,t,d){
 const k=Math.min(285/(W+L*.6),205/(H+L*.4)),ox=(520-(W+L*.6)*k)/2,oy=278;
 const P=(x,y,z)=>[ox+(x+y*.6)*k,oy-(z+y*.4)*k];
 let s=poly([P(W,0,0),P(W,L,0),P(W,L,H),P(W,0,H)],'#e4edf3');
 s+=poly([P(t,0,H-d),P(W-t,0,H-d),P(W-t,L,H-d),P(t,L,H-d)],'#f0eee6');
 s+=poly([P(t,0,H),P(t,L,H),P(t,L,H-d),P(t,0,H-d)],'#e6eee0');
 s+=poly([P(0,0,H),P(t,0,H),P(t,L,H),P(0,L,H)],'#faf6ec');
 s+=poly([P(W-t,0,H),P(W,0,H),P(W,L,H),P(W-t,L,H)],'#faf6ec');
 s+=poly([[0,0],[W,0],[W,H],[W-t,H],[W-t,H-d],[t,H-d],[t,H],[0,H]].map(([x,z])=>P(x,0,z)),'#f7ecd9');
 s+=dim([P(0,0,0)[0],oy+15],[P(W,0,0)[0],oy+15],fmt(W));
 s+=label([(P(W,0,0)[0]+P(W,L,0)[0])/2+25,(P(W,0,0)[1]+P(W,L,0)[1])/2+17],fmt(L));
 s+=label([P(W,L,H)[0]+25,(P(W,L,H)[1]+P(W,L,0)[1])/2],fmt(H));
 s+=label([(P(0,0,H)[0]+P(t,0,H)[0])/2,P(0,0,H)[1]-14],fmt(t),'figure-label small');
 s+=label([(P(W-t,0,H)[0]+P(W,0,H)[0])/2,P(W,0,H)[1]-14],fmt(t),'figure-label small');
 s+=line(P(t,L,H),P(t,L,H-d),'dimension')+label([P(t,L,H)[0]+23,(P(t,L,H)[1]+P(t,L,H-d)[1])/2],fmt(d),'figure-label small');
 return `<div class="board-wrap">${svg(s,`Form með rauf eftir allri lengdinni. Ytri breidd ${W}, lengd ${L} og hæð ${H} cm. Hvor hliðarveggur er ${t} cm þykkur. Rauf er ${d} cm djúp, mælt frá efri brún. Öll mál í cm.`)}<p class="figure-caption">Öll mál í cm. Rauf nær eftir allri lengdinni.<br>Dýpt raufar: <b>${fmt(d)} cm</b> frá efri brún.</p></div>`;
}
