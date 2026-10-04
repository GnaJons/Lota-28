# Lota 28 – vefhefti og fylgiskjöl

Uppfært 4. október 2026, útgáfa 6.

## Opna vefheftið

Afþjappaðu `lota28-vefhefti.zip` og opnaðu `index.html`. Hafðu PDF-skjölin þrjú í sömu möppu svo niðurhalstenglar virki. Vefheftið, myndirnar og formúlublaðið þurfa ekki nettengingu. Myndirnar fjórar eru uppfærðar í hlýjan pennastíl samkvæmt nýjum skrám frá kennara. Þær eru innbyggðar í HTML og þurfa því ekki sérstaka myndamöppu við lestur vefsíðunnar.

Á forsíðunni er **Formúlublað og talnahús**, sem opnast inni í heftinu. Fylgiblaðið er líka í `formulublad.html` og tveggja síðna A4-skránni `rumfraediformulur-talnahus.pdf`. Gátlistinn vistar merkingar í sama vafra þegar vafrageymsla er tiltæk. Á mjóum skjá má færa víðar töflur innan rammans.

## Heimaverkefni

Í 5. kafla er aðeins tengillinn **Sækja heimaverkefnið: Herbergið þitt (PDF)**. Verkefnið sjálft er í fjögurra síðna A4-skránni `heimaverkefni-rumfraedi.pdf`, með matsviðmiðum, rúðuneti og punktaneti. Skiladagurinn er áfram 10. nóvember.

Prentaðu heimaverkefnið á **A4 í 100% / Actual size**. Rúðunetið er 18 × 26 cm og hver rúða er 1 cm á kant.

## Prentun lesheftis

`lota28-prent.pdf` er uppfært 48 síðna leshefti í Letter-stærð. Þar eru sömu styttingar og nýju myndirnar og á vefsíðunni. Vatnsmerkið er á hverri síðu.

Veldu **100% / Actual size / Raunveruleg stærð** þegar mæla á mynd með reglustiku. Húsgaflinn í 4. tíma er 6 cm breiður og 4 cm hár á PDF-útprentuninni; sýnir geymsluhúss í 5. tíma eru í mælikvarða 1:20. Teikning turns og líkans sýnir þau ekki í sama mælikvarða, eins og tekið er fram á myndinni.

## Google Sites

1. Opnaðu `google-sites-embed.txt` og afritaðu allan textann.
2. Í Google Sites velurðu **Insert → Embed → Embed code**, límir inn og velur **Next → Insert**.
3. Stilltu rammann og prófaðu símaforskoðun. Allt heftið og formúlublaðið eru í einum ramma svo innri tenglar virki saman.
4. Settu PDF-skjölin þrjú sérstaklega inn á Sites, til dæmis úr Google Drive, með aðgangi fyrir nemendur. Bættu við sérstökum hnappi fyrir heimaverkefnið. Staðbundnir PDF-niðurhalstenglar fylgja ekki kóðainnfellingunni.
5. Prófaðu nemendasýn, hugtakaflakk og PDF-tengla áður en þú birtir síðuna.

Innfellingarkóðinn inniheldur einnig myndirnar fjórar. Raunveruleg Google Sites-innfelling hefur ekki verið prófuð og engin birting á netinu hefur farið fram. Ef HTML er hýst annars staðar þarf að hafa HTML- og PDF-skrárnar saman og þá má tengja á vefslóðina frá Sites.

## Breytanleg frumskjöl

`lota28.tex` hefur verið samræmt efni vefsíðunnar. Fyrir Overleaf þarf að hlaða upp bæði þeirri skrá og **images-möppunni**, sem hefur PNG-myndirnar fjórar. Aðrar skýringarmyndir eru áfram breytanlegar TikZ-myndir. Veldu pdfLaTeX fyrir lesheftið.

`heimaverkefni-rumfraedi.tex` er sjálfstætt XeLaTeX-skjal. `rumfraediformulur-talnahus.tex` er frumskjal fylgiblaðsins. Bæði fylgiskjölin eru óbreytt í þessari umferð.

Afhent prent-PDF er myndað úr yfirförnu HTML. Samsetning LaTeX-frumskjalsins er óstaðfest: innbyggði samsetjarinn stöðvaðist vegna umhverfisvillu áður en hann vann skjalið.
