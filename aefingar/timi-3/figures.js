'use strict';
const fmt=n=>String(Number(n.toFixed(4))).replace('.',',');
const round2=n=>Math.round((n+Number.EPSILON)*100)/100;
const frac=(a,b)=>`<span class="fraction"><span>${a}</span><span>${b}</span></span>`;
const svg=(body,label,h=340)=>`<svg viewBox="0 0 520 ${h}" role="img" aria-label="${label}">${body}</svg>`;
const line=(p,q,cls='edge')=>`<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" class="${cls}"/>`;
const label=(p,t,cls='figure-label')=>`<text x="${p[0]}" y="${p[1]}" text-anchor="middle" dominant-baseline="central" class="${cls}">${t}</text>`;
const polygon=(pts,fill='#eff5f8')=>`<polygon points="${pts.map(p=>p.join(',')).join(' ')}" fill="${fill}" stroke="#425963" stroke-width="2"/>`;
function right(r,a,b,size=12){
 const unit=p=>{let x=p[0]-r[0],y=p[1]-r[1],l=Math.hypot(x,y);return [x/l*size,y/l*size]};
 const u=unit(a),v=unit(b),p=[r[0]+u[0],r[1]+u[1]],q=[p[0]+v[0],p[1]+v[1]],s=[r[0]+v[0],r[1]+v[1]];
 return `<path d="M${p} L${q} L${s}" fill="none" stroke="#ac572e" stroke-width="1.7"/>`;
}
function dimension(x1,x2,y,t){return line([x1,y],[x2,y],'dimension')+line([x1,y-4],[x1,y+4],'dimension')+line([x2,y-4],[x2,y+4],'dimension')+label([(x1+x2)/2,y+16],t)}
function triangleFigure(v){
 const [b,h,a]=v.tri,k=Math.min(310/b,195/h),A=[95,250],B=[95+b*k,250],H=[95+a*k,250],C=[H[0],250-h*k];
 return svg(polygon([A,B,C])+line(C,H,'guide')+right(H,A,C)+label([A[0]-15,251],'A','vertex-label')+label([B[0]+16,251],'B','vertex-label')+label([C[0],C[1]-20],'C','vertex-label')+label([H[0],268],'H','vertex-label')+label([C[0]+30,(C[1]+250)/2],fmt(h)+' cm')+label([(A[0]+H[0])/2,232],fmt(a)+' cm')+dimension(A[0],B[0],293,fmt(b)+' cm'),`Þríhyrningur ABC. AB = ${fmt(b)} cm, CH = ${fmt(h)} cm, AH = ${fmt(a)} cm. CH er hornrétt á AB.`);
}
function scaleFigure(v){
 const [b,h,a,newB]=v.tri,k=newB/b,s=Math.min(180/newB,175/(h*k)),A=[45,244],B=[45+b*s,244],C=[45+a*s,244-h*s],D=[290,244],E=[290+newB*s,244],F=[290+a*k*s,244-h*k*s];
 return svg(polygon([A,B,C])+polygon([D,E,F])+line(C,[C[0],244],'guide')+line(F,[F[0],244],'guide')+label([(A[0]+B[0])/2,270],fmt(b)+' cm')+label([(D[0]+E[0])/2,270],fmt(newB)+' cm')+label([C[0]+31,(C[1]+244)/2],fmt(h)+' cm')+label([F[0]+22,(F[1]+244)/2],'h')+label([115,310],'△ABC')+label([355,310],'△DEF')+label([233,166],'→'),`Einslaga þríhyrningar ABC og DEF. Grunnlínur ${b} cm og ${newB} cm. Hæð ABC er ${h} cm. Hæð DEF er h.`);
}
function nestedFigure(v,shade=false){
 const [b,h,d]=v.nested,k=Math.min(330/b,195/h),A=[85,250],B=[85+b*k,250],C=[85,250-h*k],D=[85+(b-d)*k,250],E=[D[0],250-h*d/b*k];
 let out=polygon([A,B,C]);
 if(shade)out+=polygon([A,E,C],'#d7ecf7');else out+=polygon([D,B,E],'#f7ecd9');
 out+=line(D,E)+right(A,B,C)+right(D,B,E);
 for(const [p,t,dx,dy] of [[A,'A',-15,0],[B,'B',18,0],[C,'C',0,-18],[D,'D',0,17],[E,'E',12,-17]])out+=label([p[0]+dx,p[1]+dy],t,'vertex-label');
 out+=label([54,(C[1]+250)/2],fmt(h)+' cm')+dimension(D[0],B[0],276,fmt(d)+' cm')+dimension(A[0],B[0],315,fmt(b)+' cm');
 return svg(out,`ABC og DBE eru einslaga rétthyrndir þríhyrningar. AB = ${b} cm, AC = ${h} cm, DB = ${d} cm. ${shade?'AEC er skyggður.':'DE er samsíða AC.'}`,355);
}
function riverAFigure(v){
 const [near,far,gap]=v.riverA,x=near*gap/(far-near),k=Math.min(290/far,230/(x+gap)),A=[115,45],H=[115,45+x*k],B=[115,45+(x+gap)*k],N=[115+near*k,H[1]],F=[115+far*k,B[1]];
 return svg(`<rect x="60" y="45" width="400" height="${x*k}" fill="#e7f4f8"/>`+line([60,45],[460,45],'river-bank')+line([60,H[1]],[460,H[1]],'river-bank')+line(A,B,'guide')+line(A,F,'sight')+line(H,N)+line(B,F)+right(H,A,N)+right(B,A,F)+label([88,(45+H[1])/2],'x')+label([74,(H[1]+B[1])/2],fmt(gap)+' m')+label([(H[0]+N[0])/2,H[1]-14],fmt(near)+' m')+label([(B[0]+F[0])/2,B[1]+22],fmt(far)+' m'),`Ármæling A. Breidd ár x. Litli þríhyrningurinn hefur hæð x og grunnlínu ${near} m. Stóri hefur hæð x + ${gap} m og grunnlínu ${far} m.`);
}
function riverBFigure(v){
 const [top,bottom,h]=v.riverB,y=top*h/bottom,k=Math.min(350/(top+bottom),235/(y+h)),cx=75+bottom*k,T=[cx,45],I=[cx,45+y*k],B=[cx,45+(y+h)*k],L=[cx-bottom*k,B[1]],R=[cx+top*k,45];
 return svg(`<rect x="45" y="45" width="430" height="${y*k}" fill="#e7f4f8"/>`+line([45,45],[475,45],'river-bank')+line([45,I[1]],[475,I[1]],'river-bank')+line(T,B,'guide')+line(L,R,'sight')+line(T,R)+line(B,L)+right(T,R,I)+right(B,L,I)+label([cx-23,(45+I[1])/2],'y')+label([cx+31,(I[1]+B[1])/2],fmt(h)+' m')+label([(cx+R[0])/2,26],fmt(top)+' m')+label([(cx+L[0])/2,B[1]+23],fmt(bottom)+' m'),`Ármæling B. Tvær sjónlínur skerast á nærbakkanum. Efri þríhyrningur hefur grunnlínu ${top} m og hæð y. Neðri hefur grunnlínu ${bottom} m og hæð ${h} m.`);
}
function joinedFigure(v,outer=false){
 const [a,b,c]=v.joined,e=c*b/a,k=Math.min(345/(b+c),195/Math.max(a,e)),B=[85,260],A=[85,260-a*k],C=[85+b*k,260],D=[85+(b+c)*k,260],E=[D[0],260-e*k];
 let out=outer?polygon([A,C,E],'#f7ecd9'):'';
 out+=polygon([A,B,C])+polygon([C,D,E])+right(B,A,C)+right(D,C,E)+right(C,A,E);
 if(outer)out+=line(A,E,'accent');
 for(const [p,t,dx,dy] of [[A,'A',-3,-19],[B,'B',-14,15],[C,'C',0,20],[D,'D',16,15],[E,'E',6,-19]])out+=label([p[0]+dx,p[1]+dy],t,'vertex-label');
 out+=label([57,(A[1]+260)/2],fmt(a))+label([(B[0]+C[0])/2,243],fmt(b))+label([(C[0]+D[0])/2,282],fmt(c))+label([D[0]+28,(E[1]+260)/2],'DE');
 return svg(out,`B, C og D liggja á beinni línu. AB = ${a}, BC = ${b}, CD = ${c}. Rétt horn við B, D og milli AC og CE. ${outer?'AE tengir efri hornpunktana.':''}`);
}
