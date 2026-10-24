'use strict';
const variants=[
 {tiny:.065,twosteps:.36,litres:[2.7,350],millilitres:[3.25,.026],small:[6.5,46,.7],cubic:[.32,.045,275,1850,640000],water:[.28,42,.46,6.8]},
 {tiny:.007,twosteps:.042,litres:[4.25,75],millilitres:[.72,.075],small:[12.4,7.8,3.5],cubic:[4.75,.62,80,260,125000],water:[.065,7.5,.032,125]},
 {tiny:.48,twosteps:.125,litres:[.18,920],millilitres:[8.4,.009],small:[.85,125,.09],cubic:[12.6,2.35,4600,75,72000],water:[1.25,.8,.275,3.6]}
];
const numberTask=(title,intro,board,answer,label,unit,hints,explain)=>({type:'number',title,intro,board,answer,label,unit,hints,explain});
const choiceTask=(title,intro,board,options,correct,hints,explain,wrong)=>({type:'choices',title,intro,board,options,correct,hints,explain,wrong});
function buildSections(seed){
 const v=variants[seed%variants.length],f=fmt,[lm,lc]=v.litres,[md,mm]=v.millilitres,[sc,sd,sm]=v.small,[cd,cm,cc,rd,rc]=v.cubic,[wl,wc,wkg,wg]=v.water;
 const convert=(title,value,from,to,answer,hints,explain,track=null,note='Rúmmálið helst óbreytt.')=>numberTask(title,`Skrifaðu ${f(value)} ${unit(from)} í ${unit(to)}. Gefðu nákvæmt svar.`,conversionFigure(value,from,to,track,note),answer,'Rúmmál',unit(to),hints,explain);
 const pair=(a,b)=>`<span class="pair-option"><span>1 l = ${a} dm³</span><span>1 ml = ${b} cm³</span></span>`;
 return [
 {name:'Þrjár stefnur — þúsundfalt',tasks:[
  choiceTask('Hve margir rúmmillímetrar fylla teninginn?','Teningur hefur 1 cm brún. Tíu litlir teningar með 1 mm brún komast í hverja átt. Hvert er rúmmál stóra teningsins í mm³?',cubeFigure(),['10 mm³','100 mm³','1 000 mm³'],2,['Teldu litlu teningana í einu lagi og síðan fjölda laga.','Eitt lag er 10 × 10 teningar. Lögin eru líka 10.'],'10 × 10 × 10 = 1 000. Því er 1 cm³ = 1 000 mm³. Lengdarstuðullinn tíu kemur þrisvar fyrir, einu sinni fyrir hverja átt.','Rúmmál hefur þrjár stefnur. Tíu teningar í röð eða hundrað í einu lagi fylla ekki allan stóra teninginn.'),
  convert('Lítil tala, minni eining',v.tiny,'cm3','mm3',v.tiny*1000,['Þegar farið er í minni rúmeiningu þarf fleiri einingar til að mæla sama rúmmál.','Úr cm³ í mm³ er eitt skref: margfaldaðu með 1 000.'],`${f(v.tiny)} × 1 000 = ${f(v.tiny*1000)}. Því eru ${f(v.tiny)} cm³ = ${f(v.tiny*1000)} mm³.`,cubeUnits),
  convert('Tvö skref milli rúmeininga',v.twosteps,'dm3','mm3',v.twosteps*1e6,['Farðu fyrst úr dm³ í cm³ og síðan úr cm³ í mm³.','Í hvoru skrefi margfaldarðu með 1 000. Stuðullinn alls er 1 000 × 1 000.'],`${f(v.twosteps)} dm³ = ${f(v.twosteps*1000)} cm³ = ${f(v.twosteps*1e6)} mm³. Tvö skref gefa stuðulinn 1 000 000, ekki 2 000.`,cubeUnits)
 ]},
 {name:'Tengdu rúmeiningar og lítra',tasks:[
  choiceTask('Hvaða par er rétt?','Lítraeiningar og rúmeiningar geta lýst nákvæmlega sama rúmmáli. Veldu parið þar sem báðar línurnar eru réttar.',bridgeFigure(),[pair('1 000','1'),pair('1','1'),pair('1','1 000'),pair('100','10')],1,['Einn lítri fyllir tening með 1 dm brún.','Einn millilítri fyllir tening með 1 cm brún.'],'1 l = 1 dm³ og 1 ml = 1 cm³. Þetta eru tvær mikilvægar tengingar milli einingakerfanna. Talnagildið breytist ekki þegar skipt er innan hvors pars.','Skoðaðu báðar línurnar. Lítri og rúmdesímetri eru sama rúmmál; millilítri og rúmsentímetri líka.'),
  convert('Úr rúmmetrum í lítra',lm,'m3','l',lm*1000,['Breyttu fyrst m³ í dm³. Einn dm³ er einn lítri.','1 m³ = 1 000 dm³ = 1 000 l.'],`${f(lm)} m³ = ${f(lm*1000)} dm³ = ${f(lm*1000)} l.`,null,'Milliskref: m³ → dm³ = l'),
  convert('Úr rúmsentímetrum í lítra',lc,'cm3','l',lc/1000,['Einn cm³ er einn ml. Lítrinn er stærri eining, svo talan verður minni.','Breyttu cm³ í ml og deildu síðan með 1 000.'],`${f(lc)} cm³ = ${f(lc)} ml = ${f(lc/1000)} l.`,null,'Milliskref: cm³ = ml → l')
 ]},
 {name:'Mældu í millilítrum',tasks:[
  convert('Úr rúmdesímetrum í millilítra',md,'dm3','ml',md*1000,['Rúmdesímetri jafngildir lítra. Í einum lítra eru 1 000 ml.','Margfaldaðu talnagildið með 1 000.'],`${f(md)} dm³ = ${f(md)} l = ${f(md*1000)} ml.`,null,'Milliskref: dm³ = l → ml'),
  convert('Úr rúmmetrum í millilítra',mm,'m3','ml',mm*1e6,['Farðu fyrst úr m³ í lítra, síðan úr lítrum í ml.','1 m³ = 1 000 l og hver lítri er 1 000 ml. Stuðullinn alls er 1 000 000.'],`${f(mm)} m³ = ${f(mm*1000)} l = ${f(mm*1e6)} ml. Hér þarf tvö þúsundföld skref.`,null,'Milliskref: m³ → l → ml')
 ]},
 {name:'Lítrar, desílítrar og sentílítrar',tasks:[
  convert('Úr sentílítrum í rúmsentímetra',sc,'cl','cm3',sc*10,['Notaðu millilítra sem milliskref. Einn ml jafngildir einum cm³.','1 cl = 10 ml. Úr cl í cm³ margfaldarðu því með 10.'],`${f(sc)} cl = ${f(sc*10)} ml = ${f(sc*10)} cm³.`,litreUnits,'Finndu fyrst ml. Síðan gildir ml = cm³.'),
  convert('Úr desílítrum í rúmdesímetra',sd,'dl','dm3',sd/10,['Notaðu lítra sem milliskref. Einn lítri jafngildir einum dm³.','Úr dl í l deilirðu með 10.'],`${f(sd)} dl = ${f(sd/10)} l = ${f(sd/10)} dm³.`,litreUnits,'Finndu fyrst l. Síðan gildir l = dm³.'),
  convert('Úr millilítrum í sentílítra',sm,'ml','cl',sm/10,['Sentílítrinn er stærri eining en millilítrinn. Talnagildið verður því minna.','1 cl = 10 ml. Deildu millilítrunum með 10.'],`${f(sm)} ml = ${f(sm/10)} cl. Lítið rúmmál getur verið brot úr sentílítra. Sama aðferð gildir ef upphafseiningin er cm³, því cm³ = ml.`,litreUnits)
 ]},
 {name:'Milli stórra og smárra rúmeininga',tasks:[
  convert('Úr rúmdesímetrum í rúmsentímetra',cd,'dm3','cm3',cd*1000,['Þú ferð eitt skref í minni rúmeiningu.','Margfaldaðu með 1 000.'],`${f(cd)} dm³ = ${f(cd*1000)} cm³.`,cubeUnits),
  convert('Úr rúmmetrum í rúmdesímetra',cm,'m3','dm3',cm*1000,['Þú ferð eitt skref í minni rúmeiningu, rétt eins og úr dm³ í cm³.','1 m³ = 1 000 dm³.'],`${f(cm)} m³ = ${f(cm*1000)} dm³.`,cubeUnits),
  convert('Úr rúmsentímetrum í rúmdesímetra',cc,'cm3','dm3',cc/1000,['Nú ferð þú í stærri rúmeiningu. Talnagildið verður minna.','Deildu með 1 000, því 1 dm³ = 1 000 cm³.'],`${f(cc)} cm³ = ${f(cc/1000)} dm³. Ekki námunda: tugabrotið lýsir nákvæmlega sama rúmmáli.`,cubeUnits),
  convert('Úr rúmdesímetrum í rúmmetra',rd,'dm3','m3',rd/1000,['Rúmmetri er stærri eining en rúmdesímetri.','Deildu með 1 000 í þessu eina skrefi.'],`${f(rd)} dm³ = ${f(rd/1000)} m³.`,cubeUnits),
  convert('Tvö skref í stærri rúmeiningu',rc,'cm3','m3',rc/1e6,['Farðu úr cm³ í dm³ og síðan úr dm³ í m³.','Deildu með 1 000 í hvoru skrefi, eða með 1 000 000 í einu lagi.'],`${f(rc)} cm³ = ${f(rc/1000)} dm³ = ${f(rc/1e6)} m³. Ekki nota lengdarstuðulinn 100; hér er verið að breyta rúmmáli.`,cubeUnits)
 ]},
 {name:'Pipruð: rúmmál og massi vatns',optional:true,tasks:[
  numberTask('Hve mörg grömm vegur vatnið?',`Finndu massa ${f(wl)} l af vatni. Miðaðu við að 1 l af vatni vegi 1 kg = 1 000 g.`,waterFigure(wl,'l','g'),wl*1000,'Massi','g',['Breyttu lítrunum í millilítra. Hver ml af vatninu vegur 1 g samkvæmt forsendunni.',`${f(wl)} l = ${f(wl*1000)} ml.`],`Vatnið vegur ${f(wl*1000)} g. Rúmmál og massi eru ólíkar stærðir; forsendan um vatnið tengir þær saman.`),
  numberTask('Frá rúmsentímetrum í grömm',`Hve mörg grömm vega ${f(wc)} cm³ af vatni? Notaðu sömu forsendu: 1 ml af vatni vegur 1 g.`,waterFigure(wc,'cm3','g'),wc,'Massi','g',['Einn cm³ er einn ml.','Talnagildið í cm³ er því jafnt talnagildinu í grömmum fyrir þetta vatn.'],`${f(wc)} cm³ = ${f(wc)} ml. Vatnið vegur því ${f(wc)} g samkvæmt forsendunni.`),
  numberTask('Frá kílógrömmum í millilítra',`Hvert er rúmmál vatns sem vegur ${f(wkg)} kg? Miðaðu við að 1 kg af vatni hafi rúmmálið 1 l.`,waterFigure(wkg,'kg','ml'),wkg*1000,'Rúmmál','ml',['Breyttu kílógrömmum í grömm eða notaðu jafngildið 1 kg af vatni ↔ 1 l.','Margfaldaðu með 1 000 til að fá millilítra.'],`${f(wkg)} kg af vatni hafa rúmmálið ${f(wkg)} l = ${f(wkg*1000)} ml.`),
  numberTask('Frá grömmum í millilítra',`Vatn vegur ${f(wg)} g. Hvert er rúmmálið í ml ef 1 ml af vatni vegur 1 g?`,waterFigure(wg,'g','ml'),wg,'Rúmmál','ml',['Samkvæmt forsendunni svarar hvert gramm af vatni til eins millilítra.','Talnagildið helst óbreytt; aðeins stærðin sem við lýsum og einingin breytast.'],`Rúmmálið er ${f(wg)} ml. Tengingin 1 ml ↔ 1 g gildir hér vegna gefinnar forsendu um vatn; hún gildir ekki sjálfkrafa fyrir önnur efni.`)
 ]}
 ];
}
