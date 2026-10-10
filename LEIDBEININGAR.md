# Lota 28 – vefhefti og fylgiskjöl

Uppfært 10. október 2026, útgáfa 8 — orðalag yfirfarið.

## Opna vefheftið

Afþjappaðu `lota28-vefhefti.zip` og opnaðu `index.html`. Hafðu PDF-skjölin þrjú og **videos-möppuna** með `index.html` svo tenglar og myndbönd virki. Vefheftið, myndirnar, formúlublaðið og myndböndin þurfa ekki nettengingu. Myndirnar fjórar eru uppfærðar í hlýjan pennastíl samkvæmt nýjum skrám frá kennara. Þær eru innbyggðar í HTML og þurfa því ekki sérstaka myndamöppu við lestur vefsíðunnar.

Á forsíðunni er **Formúlublað og talnahús**, sem opnast inni í heftinu. Fylgiblaðið er líka í `formulublad.html` og tveggja síðna A4-skránni `rumfraediformulur-talnahus.pdf`. Gátlistinn vistar merkingar í sama vafra þegar vafrageymsla er tiltæk. Á mjóum skjá má færa víðar töflur innan rammans.

## Myndbönd

Smelltu á reit merktan **Myndband** og síðan á spilunarhnappinn. Hægt er að gera hlé, færa til spilun og opna myndbandið á öllum skjánum. Myndböndin fara ekki sjálfkrafa í gang. Þau eru um tveggja mínútna löng og hafa skýringar á skjánum.

| Tími | Myndband og staðsetning |
|---|---|
| 1 | Hæð og skáhæð píramída, á eftir dæmi um flatarmál hliðaflatar |
| 2 | Einslögun á samsettri mynd, við hæð dregna á langhlið |
| 3 | Lengdarhlutfall og flatarmálshlutfall, á eftir dæmi um lengdir og flatarmál þríhyrnings |
| 5 | Grunnmynd, mynd framan frá og mynd frá hlið, við geymsluhúsið |
| 6 | Flatarmál og rúmmál, við lög af einingateningum |
| 7 | Rúmeiningar og lítrar, við tengsl lítra og rúmeininga |

Myndböndin eru í vefheftinu og birtast ekki við prentun. MP4-skrárnar eru í `videos/`; breytanleg Manim-frumskjöl fylgja í `videos/source/`.

## Heimaverkefni

Í 5. kafla er aðeins tengillinn **Sækja heimaverkefnið: Herbergið þitt (PDF)**. Verkefnið sjálft er í fjögurra síðna A4-skránni `heimaverkefni-rumfraedi.pdf`, með matsviðmiðum, rúðuneti og punktaneti. Skiladagurinn er áfram 10. nóvember.

Prentaðu heimaverkefnið á **A4 í 100% / Actual size**. Rúðunetið er 18 × 26 cm og hver rúða er 1 cm á kant.

## Prentun lesheftis

`lota28-prent.pdf` er 48 síðna leshefti í Letter-stærð með yfirförnu orðalagi frá 10. október. Það hefur sama texta og vefheftið; opnanlegir myndbandsreitir birtast aðeins á vefnum. Vatnsmerkið er á hverri síðu. PDF fylgir áfram samþykktum prentstillingum vefheftisins; sérstök minnkun mynda í LaTeX-frumskjalinu á aðeins við um það frumskjal.

Veldu **100% / Actual size / Raunveruleg stærð** þegar mæla á mynd með reglustiku. Húsgaflinn í 4. tíma er 6 cm breiður og 4 cm hár á PDF-útprentuninni; sýnir geymsluhúss í 5. tíma eru í mælikvarða 1:20. Teikning turns og líkans sýnir þau ekki í sama mælikvarða, eins og tekið er fram á myndinni.

## Google Sites

1. Opnaðu `google-sites-embed.txt` og afritaðu allan textann.
2. Í Google Sites velurðu **Insert → Embed → Embed code**, límir inn og velur **Next → Insert**.
3. Stilltu rammann og prófaðu símaforskoðun. Allt heftið og formúlublaðið eru í einum ramma svo innri tenglar virki saman.
4. Settu PDF-skjölin þrjú sérstaklega inn á Sites, til dæmis úr Google Drive, með aðgangi fyrir nemendur. Bættu við sérstökum hnappi fyrir heimaverkefnið. Staðbundnir PDF-niðurhalstenglar fylgja ekki kóðainnfellingunni.
5. Prófaðu nemendasýn, hugtakaflakk og PDF-tengla áður en þú birtir síðuna.

Innfellingarkóðinn inniheldur myndirnar fjórar og myndböndin sex; hann er um 32 MB. Myndböndin hafa verið prófuð í þessari sjálfstæðu HTML-útgáfu, en raunveruleg Google Sites-innfelling hefur ekki verið prófuð og engin birting á netinu hefur farið fram. Ef Sites tekur ekki við svo stórum kóða er hægt að hýsa vefpakkann annars staðar og fella vefslóðina inn í Sites. Þá þurfa `index.html`, PDF-skjölin og `videos/` að fylgjast að á hýsingunni.

## Breytanleg frumskjöl

`lota28.tex` hefur verið samræmt yfirförnu orðalagi vefsíðunnar. Fyrir Overleaf þarf að hlaða upp bæði þeirri skrá og **images-möppunni**, sem hefur PNG-myndirnar fjórar. Nýjasta frumskjalið hefur minni myndir samkvæmt síðari ósk kennara: að hámarki 70% af línubreidd og 55 mm á hæð. Aðrar skýringarmyndir eru áfram breytanlegar TikZ-myndir. Veldu pdfLaTeX fyrir lesheftið.

`heimaverkefni-rumfraedi.tex` er sjálfstætt XeLaTeX-skjal. `rumfraediformulur-talnahus.tex` er frumskjal fylgiblaðsins. Bæði fylgiskjölin eru óbreytt í þessari umferð.

Afhent prent-PDF er myndað úr yfirförnu HTML. Samsetning LaTeX-frumskjalsins er óstaðfest: innbyggði samsetjarinn stöðvaðist vegna umhverfisvillu áður en hann vann skjalið.
