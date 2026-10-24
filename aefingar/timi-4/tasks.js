'use strict';
const variants=[
 {tower:[84,3.5],reduction:[2.5,750000],enlargement:[240,8],image:5,postcard:[54,4.5],house:[7,3.5,6],map:[3600,7.2],journey:[12.5,48000000],area:[3,150]},
 {tower:[96,4.8],reduction:[1.5,600000],enlargement:[420,6],image:6,postcard:[63,7.5],house:[9,4.5,7],map:[2400,6],journey:[8.4,65000000],area:[5,80]},
 {tower:[125,2.5],reduction:[3.5,700000],enlargement:[360,9],image:7,postcard:[48,3.2],house:[6,4,6.5],map:[4500,9],journey:[9.6,55000000],area:[2,225]}
];
const numberTask=(title,intro,board,answer,label,unit,hints,explain,round=false)=>({type:'number',title,intro:intro+(round?' Námundaðu að þremur aukastöfum ef þarf.':''),board,answer:round?rounded(answer):answer,label,unit,hints,explain});
const choiceTask=(title,intro,board,options,correct,hints,explain,wrong)=>({type:'choices',title,intro,board,options,correct,hints,explain,wrong});
function buildSections(seed){
 const v=variants[seed%variants.length],f=fmt,g=group;
 const [real,model]=v.tower,realCM=real*100,tn=realCM/model,[ra,rb]=v.reduction,rn=rb/ra,[ea,eb]=v.enlargement,en=ea/eb,L=v.image;
 const [pReal,pImage]=v.postcard,pn=pReal*100/pImage,[hReal,hImage,wImage]=v.house,hn=hReal*100/hImage;
 const [km,cm]=v.map,mapCM=km*100000,mn=mapCM/cm,[jcm,jn]=v.journey,[akm,area]=v.area;
 const t=comparisonFigure(real,model),reduction=ratioFigure(ra,rb),enlargement=ratioFigure(ea,eb),rUse=ratioFigure(1,rn,L),eUse=ratioFigure(en,1,L),postcard=comparisonFigure(pReal,pImage,'building'),map=mapFigure(cm,km),journey=mapFigure(jcm,jn,true),areaBoard=areaFigure(akm);
 return [
 {name:'Sömu einingar, rétt röð',tasks:[
  numberTask('Settu hæðirnar í sömu einingu',`Turn er ${f(real)} m á hæð og líkan af honum er ${f(model)} cm. Hve margir sentímetrar eru ${f(real)} m?`,t,realCM,'Hæð','cm',['Einn metri er 100 sentímetrar.',`Margfaldaðu ${f(real)} með 100.`],`${f(real)} m = ${g(realCM)} cm. Nú má bera hæðirnar saman í sömu einingu.`),
  choiceTask('Hvort á að koma á undan?',`Skrifaðu mælikvarðann sem mynd : raun. Hæð líkansins er ${f(model)} cm og raunhæðin ${g(realCM)} cm.`,t,[`${g(realCM)} : ${f(model)}`,`${f(model)} : ${f(real)}`,`${f(model)} : ${g(realCM)}`,`${f(real)} : ${f(model)}`],2,['Fyrri talan lýsir lengdinni á mynd eða líkani.','Notaðu sentímetra beggja megin í hlutfallinu.'],`${f(model)} : ${g(realCM)} er rétt röð. Við skrifum líkanið fyrst og raunveruleikann á eftir.`, 'Skoðaðu bæði röðina og einingarnar. Báðar tölur þurfa að tákna sentímetra.'),
  numberTask('Finndu mælikvarða líkansins',`Einfaldaðu ${f(model)} : ${g(realCM)} í 1 : n. Hvað er n?`,t,tn,'n','',['Deildu báðum tölunum með hæð líkansins.',`n = ${frac(g(realCM),f(model))}.`],`Mælikvarðinn er 1 : ${g(tn)}. Einn sentímetri á líkaninu táknar ${g(tn)} cm í raun.`)
 ]},
 {name:'Styttu og túlkaðu mælikvarðann',tasks:[
  choiceTask('Gerðu minni töluna að 1','Einfaldaðu mælikvarðann. Hlutfallið á að haldast óbreytt.',reduction,[`1 : ${g(rb)}`,`1 : ${g(rn)}`,`${g(rn)} : 1`,`1 : ${g(rb*ra)}`],1,[`Deildu báðum tölunum með ${f(ra)}.`,`Fyrri talan verður 1. Seinni talan verður ${frac(g(rb),f(ra))}.`],`${f(ra)} : ${g(rb)} = 1 : ${g(rn)}. Við deilum báðum tölunum með sömu tölu.`, 'Ekki breyta annarri tölunni einni. Deildu báðum tölunum með minni tölunni.'),
  numberTask('Og þegar fyrri talan er stærri?',`Einfaldaðu ${g(ea)} : ${g(eb)} í n : 1. Hvað er n?`,enlargement,en,'n','',[`Minni talan er ${g(eb)}. Deildu báðum tölunum með henni.`,`n = ${frac(g(ea),g(eb))}.`],`Mælikvarðinn er ${g(en)} : 1. Lengd á mynd er ${g(en)} sinnum samsvarandi raunlengd.`),
  choiceTask('Stækkun eða minnkun?',`Berðu saman kvarðana 1 : ${g(rn)} og ${g(en)} : 1. Hvaða lýsing er rétt?`,ratioFigure(en,1),['Báðir sýna minnkun.','Báðir sýna stækkun.',`1 : ${g(rn)} sýnir stækkun og ${g(en)} : 1 minnkun.`,`1 : ${g(rn)} sýnir minnkun og ${g(en)} : 1 stækkun.`],3,['Mælikvarðinn er alltaf mynd : raun.','Ef fyrri talan er stærri, er myndlengdin stærri en raunlengdin.'],`Í 1 : ${g(rn)} er myndin minni en raunveruleikinn. Í ${g(en)} : 1 er myndin stærri.`, 'Skoðaðu hvor hlið hlutfallsins er stærri: myndin eða raunveruleikinn.')
 ]},
 {name:'Frá myndlengd að raunlengd',tasks:[
  numberTask('Hve margir metrar eru þetta í raun?',`Lengd á mynd er ${f(L)} cm í mælikvarðanum 1 : ${g(rn)}. Finndu raunlengdina í metrum.`,rUse,L*rn/100,'Lengd','m',['Margfaldaðu myndlengdina með kvarðatölunni. Þá færðu sentímetra.',`Raunlengd = ${f(L)} × ${g(rn)} cm. Deildu síðan með 100 til að fá metra.`],`${f(L)} × ${g(rn)} = ${g(L*rn)} cm = ${g(L*rn/100)} m.`),
  choiceTask('Hvaða aðgerð gefur raunlengdina?',`Nú er myndin stækkun í ${g(en)} : 1 og myndlengdin ${f(L)} cm. Veldu útreikning sem gefur raunlengdina í millimetrum.`,eUse,[`${f(L)} × ${g(en)} × 10`,`${frac(f(L),g(en))} × 10`,`${frac(f(L),g(en))}`,`${frac(f(L)+' × '+g(en),'10')}`],1,['Raunverulegi hluturinn er minni en stækkaða myndin.','Deildu með stækkunarstuðlinum til að fá sentímetra. Einn sentímetri er 10 millimetrar.'],`${frac(f(L),g(en))} cm er raunlengdin. Margfaldaðu hana með 10 til að fá millimetra.`, 'Við stækkun þarf að deila myndlengdinni með stuðlinum. Athugaðu síðan eininguna.'),
  numberTask('Reiknaðu raunlengdina í millimetrum',`Notaðu útreikninginn ${frac(f(L),g(en))} × 10. Hver er raunlengdin?`,eUse,L/en*10,'Lengd','mm',[`Reiknaðu ${f(L)} ÷ ${g(en)} fyrst og margfaldaðu svo með 10.`,'Námundaðu aðeins lokasvarið. Haltu þremur aukastöfum ef svarið gengur ekki upp.'],`Raunlengdin er ${frac(f(L*10),g(en))} mm ≈ ${f(rounded(L/en*10))} mm.`,true)
 ]},
 {name:'Mælikvarði póstkorts',tasks:[
  numberTask('Finndu kvarða póstkortsins',`Bygging er ${f(pReal)} m á hæð. Samsvarandi hæð á póstkorti er ${f(pImage)} cm. Mælikvarðinn er 1 : n. Finndu n.`,postcard,pn,'n','',['Breyttu raunhæðinni fyrst í sentímetra.',`n = ${frac(g(pReal*100),f(pImage))}.`],`${f(pReal)} m = ${g(pReal*100)} cm. Því er mælikvarðinn ${f(pImage)} : ${g(pReal*100)} = 1 : ${g(pn)}.`)
 ]},
 {name:'Mældu húsgaflinn',tasks:[
  {...choiceTask('Hvaða lengd þarftu að mæla?',`Raunhæð hússins er ${f(hReal)} m, frá grunnlínu upp í mæni. Veldu samsvarandi línustrik á myndinni.`,houseFigure(v,'choose'),['Hæðin AB','Breiddin CD'],0,['Finndu hæsta punkt hússins og grunnlínuna fyrir neðan.','Mældu alla hæðina, ekki aðeins þakið.'],'AB liggur frá grunnlínu upp í mæni og samsvarar gefnu raunhæðinni.','CD er breiddin. Gefna lengdin lýsir hæðinni frá grunnlínu að mæni.'),type:'segments'},
  numberTask('Lestu hæðina af reglustikunni','Reglustikan í myndinni sýnir sentímetra á teikningunni. Hve löng er AB?',houseFigure(v,'height'),hImage,'AB','cm',['Núllið er við grunnlínuna. Lestu töluna í sömu hæð og punktur B.','Litlu bilin eru tíundu hlutar úr sentímetra; lengri millistrik merkja hálfa sentímetra.'],`Á teikningunni er AB = ${f(hImage)} cm. Við notum þessa lengd og raunhæðina til að finna kvarðann.`),
  numberTask('Finndu mælikvarða teikningarinnar',`AB er ${f(hImage)} cm á teikningunni og ${f(hReal)} m í raun. Mælikvarðinn er 1 : n. Hvað er n?`,houseFigure(v,'scale'),hn,'n','',['Breyttu metrum í sentímetra áður en þú deilir.',`n = ${frac(g(hReal*100),f(hImage))}.`],`Mælikvarðinn er 1 : ${g(hn)}. Hver sentímetri á teikningunni táknar ${g(hn)} cm í raun.`),
  numberTask('Hve breitt er húsið í raun?',`Lestu breiddina CD af reglustikunni. Mælikvarðinn er 1 : ${g(hn)}. Gefðu raunbreiddina í metrum.`,houseFigure(v,'width'),wImage*hn/100,'Breidd','m',['Lestu alla lengdina frá C að D. Margfaldaðu hana með kvarðatölunni.',`CD er ${f(wImage)} cm á teikningunni. Reiknaðu ${f(wImage)} × ${g(hn)} cm og breyttu í metra.`],`Breidd = ${f(wImage)} × ${g(hn)} = ${g(wImage*hn)} cm = ${f(wImage*hn/100)} m.`)
 ]},
 {name:'Fjarlægðir á landakorti',tasks:[
  numberTask('Frá kílómetrum yfir í sentímetra',`Fjarlægð í raun er ${g(km)} km. Hve margir sentímetrar eru það?`,map,mapCM,'Lengd','cm',['1 km = 1000 m og 1 m = 100 cm.','Því er 1 km = 100 000 cm.'],`${g(km)} × 100 000 = ${g(mapCM)} cm.`),
  numberTask('Hver er mælikvarði kortsins?',`Fjarlægðin er ${f(cm)} cm á kortinu og ${g(km)} km í raun. Skrifaðu mælikvarðann 1 : n. Hvað er n?`,map,mn,'n','',['Notaðu raunfjarlægðina í sentímetrum.',`n = ${frac(g(mapCM),f(cm))}.`],`Mælikvarðinn er 1 : ${g(mn)}. Einn sentímetri táknar ${g(mn/100000)} km í raun.`),
  numberTask('Finndu raunfjarlægð á öðru korti',`Á korti í mælikvarðanum 1 : ${g(jn)} er bein lína ${f(jcm)} cm löng. Hver er raunfjarlægðin í kílómetrum?`,journey,jcm*jn/100000,'Lengd','km',['Margfaldaðu myndlengdina með kvarðatölunni. Svarið fæst í sentímetrum.','Deildu síðan með 100 000 til að breyta sentímetrum í kílómetra.'],`${f(jcm)} × ${g(jn)} cm = ${g(jcm*jn)} cm = ${g(jcm*jn/100000)} km.`)
 ]},
 {name:'Flatarmál á korti',optional:true,tasks:[
  numberTask('Finndu lengdarkvarðann',`Á korti samsvarar 1 cm ${f(akm)} km í raun. Mælikvarðinn er 1 : n. Hvað er n?`,areaBoard,akm*100000,'n','',['Báðar lengdir þurfa að vera í sentímetrum.','1 km = 100 000 cm.'],`Mælikvarðinn er 1 : ${g(akm*100000)}.`),
  choiceTask('Hvað táknar einn fersentímetri?',`Einn reitur er 1 cm á kant á kortinu. Í raun er hvor hlið ${f(akm)} km. Hvert er raunflatarmál reitsins?`,areaBoard,[`${f(akm)} km²`,`${f(akm*10)} km²`,`${f(akm*akm)} km²`,`${f(akm**3)} km²`],2,['Flatarmál fernings fæst með því að margfalda hliðarlengd með sjálfri sér.','Bæði lengd og breidd breytast með sama stuðli.'],`Einn fersentímetri táknar ${f(akm)} km × ${f(akm)} km = ${f(akm*akm)} km².`, 'Lengdarstuðullinn kemur tvisvar fyrir þegar við finnum flatarmál.'),
  numberTask('Hvert er flatarmál alls svæðisins?',`Svæði er ${g(area)} cm² á kortinu. Hver fersentímetri táknar ${f(akm*akm)} km². Hvert er raunflatarmálið?`,areaBoard,area*akm*akm,'F','km²',[`Margfaldaðu ${g(area)} með flatarmáli eins reits.`,`F = ${g(area)} × ${f(akm)}².`],`F = ${g(area)} × ${f(akm*akm)} = ${g(area*akm*akm)} km².`)
 ]}
 ];
}
