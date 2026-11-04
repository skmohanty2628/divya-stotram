# Verse audit log

One line per audit. Rotation: every stotram in every language (Hindi/Devanagari, Odia, Telugu, English transliteration).

## 2026-10-23: hanuman-chalisa, Hindi (Devanagari original)
- Sources compared word by word: BhaktiBharat, PSU Connect (both online editions). Folded comparison (anusvara/chandrabindu, b/v, sibilants, long/short vowels ignored).
- Result: all 43 verses present (2 opening dohas, 40 chaupais, 1 closing doha), order correct, no missing or extra lines.
- Accepted spelling variants left unchanged (both are in circulation): जम/यम (v17), रच्छक/रक्षक (v24), नव/नौ निधि and दीन्ह/दीन (v33), कुण्डल/कुंडल (v6), जय/जै (v39), सहस्र/सहस्त्र (v20), औ/अरु (v7), लाए/लाये (v13), शंकर सुवन (v8; another edition reads शंकर स्वयं).
- Fixes made (side-effects of the cross-script check):
  - v1 English transliteration: "Nij mane mukure sudhar" to "Nij manu mukuru sudhari"; "Varnao ... phal char" to "Varnau ... phal chari" (matches the Devanagari).
  - v1 Odia: ନିଜ ମନ to ନିଜ ମନୁ; v1 Telugu: నిజ మన to నిజ మను (matches Devanagari "मनु").
  - v2 Telugu: మొహిం (short o) to మోహిం (long o).
  - v2 English transliteration: "Dehu Mohe" to "Dehu Mohi".
- Needs human check / next rotations: Odia and Telugu scripts use many modern spellings (final virama in Telugu, ଳ for ल, ୱ/ବ for व); a mechanical back-conversion to Devanagari matched except the items above. verseCount in stotrams-index.js says 42 while the data has 43 entries (field not displayed anywhere; left as is).
- Not done: audio check (cannot listen to recordings).

## 2026-10-23: new mantra added: maha-mrityunjaya-mantra
- Text: Rigveda 7.59.12. Devanagari compared across greenmesg.org and shlokam.org (identical); wisdomlib.org gives the references (RV 7.59.12, TS 1.8.6, VS 3.60) but prints "माम्रतात्", a typo, so it was not used for the text.
- Odia and Telugu scripts back-converted to Devanagari and matched the original.
- YouTube: Sounds of Isha, "Maha Mrityunjaya Mantra [108 times]", id OV9LXGOXjgs (oEmbed returns 200).

## 2026-10-24: audit: hanuman-chalisa, Odia
- Method: Odia text (43 verses) back-converted to Devanagari by Unicode offset (with fixes for ୟ, ୱ, ଳ) and compared with the Hindi text audited on 2026-10-23, with folding of anusvara/chandrabindu, ବ/ଵ, sibilants, ଣ/ନ and long/short vowels. Then compared word by word with two independent Odia editions: chalisahanuman.co.in/odia (full text) and hindunidhi.com/hanuman-chalisa-odia (first 16 verses only; it has several visible typos).
- Fixed: v1 "ଜସ ... ଦାୟକ" to "ଜସୁ ... ଦାୟକୁ" (final -u, as in the Hindi and the hindunidhi edition); v2 "ସୁମିରଉଁ" to "ସୁମିରୌଁ" (सुमिरौं, both Odia editions have ୌ); v17 and v36 "ଯହାଁ" to "ଜହାଁ" (जहाँ).
- Left as accepted spelling variants: ଗୁଣ/ଗୁନ, ଜାଣିକେ/ଜାନିକେ (ଣ is the usual Odia letter), ଯୋଜନ (editions differ between ଯୋଜନ and ଜୋଜନ), ଗଏ/ଗଯେ, କାଁଧେ/କାନ୍ଧେ, ରଚ୍ଛକ/ରକ୍ଷକ (Hindi text has रच्छक), ପରତାପ/ପ୍ରତାପ.
- Source-side typos ignored: ଗାର୍ଦେ, ଏଁବାରେ, ପଡ଼ୈ, ଜନେବୂ, ଦିନ for ଦୀନ୍ହ.
- Needs human check: none open. Telugu and English transliteration of this stotram are still to be audited.

## 2026-10-24: new mantra added: karpura-gauram
- Text: Devanagari compared across smartpuja.com and vachmi.com. They agree on every word; vachmi.com spells "वसं तं" and prints "भवानि" with a short i, which are typographic variants, so the text follows smartpuja.com and standard spelling (वसन्तं, भवानी).
- Attribution: some pages say Yajurveda, none gives a chapter and verse, so the site says the source is uncertain. The wedding-of-Shiva-and-Parvati story is devotional tradition.
- Odia and Telugu scripts back-converted to Devanagari: Odia matches exactly except that ब stands for व (usual Odia convention); Telugu matches apart from anusvara and final -m conventions.
- YouTube: id tZcgg5ATndk, "Karpur Gauram Karunavtaram Full Song | with Sanskrit lyrics" (channel sacredverses, about 295k views, embeddable, oEmbed 200). Alternative checked: 8TnWDFbRkdk (Shemaroo Bhakti, 1 hour loop).

## 2026-10-25: audit: hanuman-chalisa, Telugu
- Method: Telugu text (43 verses) back-converted to Devanagari by Unicode offset and compared with the audited Hindi text, with folding of anusvara, ba/va, sibilants, long/short vowels, ణ/న and word-final virama. Then compared word by word with two Telugu editions: chalisahanuman.co.in/telugu (full text, some visible typos) and hindunidhi.com/hanuman-chalisa-telugu (M.S. Rama Rao edition with meanings; Sanskritised spellings).
- Fixed (both Telugu editions and the Hindi agree): v17 "దిగ్‌పాల్" to "దిగపాల్"; v23 and v32 "రఖ్వారే" to "రఖవారే"; v37 "ధరై" to "ధరయి" and "కరై" to "కరయి" (धरई, करई).
- Left as accepted variants: వర్ణఉఁ (Sanskritised varna, editions differ), జస and దాయక without final -u (neither Telugu edition has it), రక్షక్ for रच्छक, సంజీవన్ (one edition has సజీవన), దువారే/దుఆరే (editions differ), సమ్హారో/సంహారో, కటై/హటై (the site follows Gita Press), యోజన/జోజన, యుగ/జుగ, మూర్తి/మూరతి.
- Observation, not an error: final consonants are written with a halant in most verses (రామ్) but not in some (రామ, v4 to v6), so the convention is mixed across verses. Decide later whether to normalise.
- Needs human check: none open. English transliteration of Hanuman Chalisa is still to be audited.

## 2026-10-25: new mantra added: sarve-bhavantu-sukhinah
- Text: Devanagari compared across shlokam.org and vedicfeed.com. Both give the same two lines and closing Om Shantih Shantih Shantih. greenmesg.org showed a bot check and was not used. vedicfeed.com also prints variants of the same verse from other texts (for example ending "मा कश्चित्कष्टमाप्नुयात्"), so the popular form was used.
- Attribution: the author is unknown. vedicfeed.com cites similar verses in the Garuda Purana and in Uvata's commentary on the Vajasaneyi Samhita; this is from one site only, so the page says the exact source is uncertain.
- Odia and Telugu scripts back-converted to Devanagari: match apart from ba/va and anusvara conventions.
- YouTube: id g_1jeVTjv88, "Sarve Bhavantu Sukhinah || Shanti mantra", channel Adiyogam, 86 seconds, about 488k views, embeddable, oEmbed 200. Alternative checked: _hHegM37AUc (topic channel, 194 seconds).

## 2026-10-26: audit: hanuman-chalisa, English transliteration
- Method: the 43 transliterated verses were compared with the audited Hindi text offline using consonant skeletons (folding aspirates, ba/va, sibilants, vowels and doubled letters), then with an IAST edition on shlokam.org and with the English page on hindunidhi.com, which gives only the Chaupai lines and in a looser spelling.
- Fixed (the Hindi सहस्र and the IAST edition agree): v20 "Jug sahastra jojan par Bhanu" to "Jug sahasra jojan par Bhanu".
- Left as romanisation conventions: rakshak for रच्छक, Hanumaan/Hanuman spellings, jarava/jalava in one web source (the Hindi has जलावा).
- Needs human check: none open. Hanuman Chalisa is now audited in Hindi, Odia, Telugu and English. Next in rotation: durga-stotram, Hindi.

## 2026-10-26: new mantra added: hare-krishna-maha-mantra
- Text: Devanagari compared across hindutone.com and shubhpanchang.com; both give the same two lines in the same order (Hare Krishna line first).
- Attribution: the Kali-Santarana Upanishad (Krishna Yajurveda), per Wikipedia and vyasaonline.com. The Upanishad lists the Hare Rama line first; the Hare Krishna line first order is the Gaudiya Vaishnava and common printed order. The date of the Upanishad is uncertain (usually placed before about 1500 CE), and the page says so.
- Odia and Telugu scripts back-converted to Devanagari: exact match.
- YouTube: id N74o3G_cTAA, "Srila Prabhupada Chanting Japa, 108 times with soothing music", channel Hare Krishna Movement Mumbai, 637 seconds, about 5.2 million views, embeddable, oEmbed 200. Alternative checked: Ykg-alEM3ls (Braja Beats, 24 minutes).

## 2026-10-27: audit: durga-stotram, Hindi
- Method: the 8 verses were compared with two editions of the Devi Mahatmya and the Argala Stotra. Verses 1 to 4 (Narayani Stuti, Devi Mahatmya 11.10, 11.12, 11.24 and 11.29): drikpanchang.com chapter 11 and the aurobharati.in Devi Mahatmyam edition (IAST) agree with the site, word for word. The hindupad.com edition was also read but has typos of its own (trayambake, kama), so it was not used as a reference. Verse 5 (Argala Stotra verse 12): drikpanchang.com and bhaktibharat.com agree with the site. Verses 6 to 8 (Ya Devi Sarvabhuteshu, Devi Mahatmya chapter 5): drikpanchang.com and hindupad.com agree with the site.
- Original text: no corrections needed.
- Fixed, supported by the editions: English transliteration v3 "Bhaye Bhyas" to "Bhayebhyas". Hindi meaning v2 and v4 rewritten in own words to cover the whole verse (the old v2 meaning left out that she removes everyone's pain, the old v4 meaning left out the second half), and a stray emoji removed from v8.
- Left as variant: the aurobharati.in Argala text reads "dehi devi param sukham" where the site (and drikpanchang.com and bhaktibharat.com) read "dehi me paramam sukham". Also drikpanchang.com spells "gauri" with a short vowel where the site has a long one, and "mangalye" with a short first vowel in the compound. All are accepted variants.
- Note: the site presents these verses as one hymn. They come from three places (Devi Mahatmya 11, the Argala Stotra and Devi Mahatmya 5), so the page text should not claim a single source. Not changed today.
- Needs human check: none open. Next in rotation: durga-stotram in Odia.

## 2026-10-27: new stotram added: shiva-panchakshara-stotram
- Text: Devanagari compared across drikpanchang.com and sanskritdocuments.org. They agree on all six verses except typographic damage in the drikpanchang copy (verse 3 and spacing), which was ignored.
- Variants noted: v1 "vilochanaya" for "trilochanaya" (sanskritdocuments.org notes it), v2 "makaramahitaya" (noted there) and "mandaramukhya" (some prints; both checked sources read "mandarapushpa"), v5 "yajnasvarupaya" in some prints (both checked sources read "yakshasvarupaya"). The two-source reading is used.
- Attribution: both sources carry a colophon naming Shankaracharya; the page says the attribution is traditional. The mantra namah shivaya appearing in the Sri Rudram is stated from general knowledge, not checked against a chapter and verse here.
- Odia and Telugu scripts: converted from the Devanagari by Unicode offset, then converted back and compared. All 6 verses match.
- YouTube: id NHBJn0KxWbU, "Shiva Stotra | Shiva Panchakshara Stotra with Lyrics (Full Track)", channel Anandmurti Gurumaa, 287 seconds, about 11.7 million views, embeddable, oEmbed 200. Alternative checked: xFvfdjw2eno (Nova Spiritual India, 288 seconds).

## 2026-10-28: durga-stotram, Odia
- Method: Odia text back-converted to Devanagari by Unicode offset (with folding) and compared with the Hindi original audited on 2026-10-27. All 8 verses match; the only difference is the nasal convention in verse 1. The vignanam.org Odia edition of Devi Mahatmya chapter 11 was read as a second reference; it is noisy but agrees on the words, and uses the same spelling conventions seen before (va written with the Odia va-like sign, full nasal versus anusvara).
- Fixed: stray spaces after the halant in verses 6 to 8 (the hymn reads as joined words in the Hindi original), so "ସର୍ବ ଭୂତେଷୁ" became "ସର୍ବଭୂତେଷୁ", "ଶକ୍ତି/ମାତୃ/ଶାନ୍ତି ରୂପେଣ" became one word each and "ନମସ୍ ତସ୍ୟୈ" became "ନମସ୍ତସ୍ୟୈ". The same spacing was fixed in the Telugu text of those verses.
- Fixed: Odia, Telugu and English meanings for verse 2 and verse 4 now follow the corrected Hindi meanings (verse 4: those who take refuge meet no calamity and become a refuge for others). Emoji removed from the verse 8 meanings in all languages.
- Accepted variants: ଓଁ-style avagraha omitted in "ନମୋସ୍ତୁତେ" (matches the Hindi original on the site); nasal convention in verse 1.
- Needs human check: none open. Next in rotation: durga-stotram in Telugu.

## 2026-10-29: durga-stotram, Telugu
- Method: Telugu text back-converted to Devanagari by Unicode offset (with folding) and compared with the audited Hindi original. All 8 verses match, apart from two script conventions: the Telugu retroflex la used in "mangala" (verse 1) and a final anusvara in "sukham" (verse 5).
- Second and third references: shubhpanchang.com (Telugu page for the Durga stuti mantra, covers verses 1 and 3) and vignanam.org (Telugu pages for Devi Mahatmya chapter 11, chapter 5 and the Argala Stotra). Verses 1 to 3 and 6 to 8 agree word for word with the site once spelling conventions are folded.
- Accepted variants, not changed: "mangala" is spelled with the retroflex la on vignanam.org and with the plain la on shubhpanchang.com, so both spellings are in use. vignanam.org writes "tryambake" as "trayambake" and drops letters in verse 4 ("kaama", "tvamashrita shrayatam"), which are print errors against the Hindi original, so the site's "hyashrayatam" form stays. vignanam.org writes long u in "sarvabhuteshu" in chapter 5, which is a typo. Verse 5: the Argala text reads "dehi devi param sukham" where the site and drikpanchang.com read "dehi me paramam sukham" (already logged on 2026-10-27).
- Fixed: Telugu meaning of verse 5 now includes rupam (beauty), which the English, Hindi and Odia meanings already had. English transliteration of verse 4 checked: "Tvaam" (long a) matches the Devanagari.
- Needs human check: none open. Next in rotation: durga-stotram in English transliteration.

## 2026-10-29: new mantra added: vakratunda-mahakaya-mantra
- Text: Devanagari compared across shlokam.org and vedadhara.com. Both give the same two lines. No variants found in the checked sources.
- Attribution: neither source names an author, so the page calls it a traditional shloka of unknown authorship.
- Odia and Telugu scripts: converted from the Devanagari by Unicode offset. Odia uses the plain ba after r-halant, as elsewhere on the site, and Telugu uses the anusvara before a same-class consonant.
- YouTube: id 2Jt1HQe67jU, "Vakratunda Mahakaya With Lyrics | Brahma Muhurta Chanting | Ganesh Mantra For Success", channel Rajshri Soul, 2:55, about 1.4 million views, embeddable, oEmbed 200. Alternative checked: kxxhO92X8ro (Nupur Bhakti Sansaar, Anup Jalota, oEmbed 200).
- Cross-link: the new slug was added to related.stotrams of ganesh-chaturthi-guide.

## 2026-10-30: durga-stotram, English transliteration
- Method: each transliteration line was reduced to a consonant skeleton (long and short vowels, b and v, sibilants and nasals folded) and compared with the Devanagari original audited on 2026-10-27. It was then compared with the English (IAST style) edition of Devi Mahatmya chapter 11 on vignanam.org, which gives the Narayani Stuti verses used in verses 1 to 4.
- Fixed: verse 3 "Sarva Swarope" became "Sarva Svarupe" (Devanagari svarupe; vignanam.org reads svarupe). The "o" was a wrong vowel and "Sw" was inconsistent with "Sv" used elsewhere on the site.
- Fixed for consistency within the stotram: verse 5 "Roopam" became "Rupam" (it was spelled "Rupena" in verses 6 to 8), and "Bhooteshu" became "Bhuteshu" in verses 6 to 8 to match the Devanagari bhuteshu and the other spellings in the file.
- Checked and left unchanged: "Tvaam" in verse 4 (long a is correct); "Tryambake" (vignanam.org prints "trayambake", a print error against the Devanagari); the Argala line in verse 5 follows the "me paramam sukham" reading already logged on 2026-10-27; the long-vowel marking style (Dinaarta, Kaamaan, Aashritanaam against Sarvartha, Mangalye) varies but every spelling is a correct romanisation, so it was not changed.
- Needs human check: none open. Durga Stotram is now audited in all four languages. Next in rotation: shiva-tandav in Hindi.

## 2026-10-30: new mantra added: shuklambaradharam-mantra
- Text: Devanagari compared across shlokam.org (shloka page) and the Divine Life Society edition of the Vishnu Sahasranama invocation (swami-krishnananda.org). Both give the same two lines. vedadhara.com had no page for this slug.
- Reading: the plain wording names Vishnu (shuklambaradharam vishnum). The Divine Life edition presents it as the invocation to the Vishnu Sahasranama, while shlokam.org gives both a Vishnu and a Ganesha translation, because it is recited before Ganesha puja by custom. The page presents both readings and does not choose one.
- Odia and Telugu scripts: converted from the Devanagari by Unicode offset. Odia uses the plain ba after r-halant and Telugu uses the anusvara before a same-class consonant, as elsewhere on the site.
- YouTube: id 0XPPmIpNOqs, "Vishnu Stuti Mantra | Shuklambaradharam Vishnum | Lord Vishnu Mantra For Protection", channel Rajshri Soul, about 26 thousand views, oEmbed 200. Alternatives checked: khq91DFUaE4 and 8M8lukszWgM, both oEmbed 200.
- Cross-link: the new slug was added to related.stotrams of ganesh-chaturthi-guide and how-to-chant-vishnu-mantra.

## 2026-10-30: guides
- New: gamha-purnima-rakhi-purnima-odisha-guide (sources: Odisha Bytes, eOdisha). Temple ritual details come from a single detailed account and the guide says so.
- New: mahalaya-pitru-paksha-odisha-guide (sources: ETV Bharat, ThePrint, Wikipedia, Free Press Journal). No dates quoted.
- Upgraded: maha-mrityunjaya-mantra-meaning (about 364 to 890 words). Added Taittiriya Samhita 1.8.6 and Vajasaneyi Samhita 3.60, word by word breakdown, tryambaka note, Pradosh use. Sources: Shlokam.org and Bharatpedia.

## 2026-10-31: shiva-tandav, Hindi (with Odia, Telugu and English transliteration rebuilt from it)
- Sources: sanskritdocuments.org (Shivatandavastotra by Ravana, 17 verses with variants noted) and ramcharit.in (15-verse edition). The two agree on the text of the 15 verses used.
- Problem found: the site had 15 two-line pieces. Verses 7, 8 and 9 were cut in half and the missing halves were scattered as separate pieces (the "dhara dharendra nandini kucagra" lines at 12, a second "navina megha" at 13, a second "praphulla nila" at 14), the first piece of verse 11 was joined to the wrong lines, and verse 8 read "bandhukandharah" instead of "baddhakandharah".
- Fix: the stotram is rebuilt as the standard 15-verse edition with four lines per verse (verses 1 to 13 as in both sources, verse 14 imam hi nityam, verse 15 pujavasana). Odia, Telugu and English transliteration were regenerated from the corrected Devanagari by the standard conversion, and meanings were rewritten for all 15 verses in four languages. The last two verses are described as the text's traditional promise, not a guarantee.
- Variants recorded, not changed: ङ्घ्रि (sanskritdocuments) against ङ्ग्रि (ramcharit.in, a print error); स्रजोर् against स्रजो in verse 12; नान्यथा against नाऽन्यथा; क्वचिच्चिदम्बरे as an alternate reading in verse 3; मदान्धसिन्धुर... alternate in verse 4. The site follows sanskritdocuments.org.
- Not included: two extra verses (nilimpanatha... and prachanda vadavanala...) that sanskritdocuments.org says appear only in some versions. The guide shiva-tandava-stotram-meaning-and-story already says editions have 15 or 17 verses.
- Needs human check: a reader of Odia and Telugu should read the new meanings (these were written by hand, not from a printed edition). Next in rotation: shiva-tandav in Odia.

## 2026-10-31: new mantra added: asato-ma-sadgamaya
- Text: Devanagari compared across shlokam.org and bhaktibharat.com. Both cite Brihadaranyaka Upanishad 1.3.28 and give the same three lines. Variant: shlokam.org writes mrityor ma amritam and bhaktibharat.com joins it as mrityor mamritam; the site uses the joined form. bhaktibharat.com prints one shanti as shanti (typo).
- Context: Wikipedia (Pavamana Mantra) notes the closing Om Shantih is a later addition, and that the Upanishad says the three lines carry one meaning, a plea for immortality.
- YouTube: id Vwyo62x9yC4, "Asato Ma Sadgamaya With Lyrics | Early Morning Chant | Nirguna Mantra For Peace | Rajshri Soul", channel Rajshri Soul, oEmbed 200. Alternative checked: l7gXrjJeAHc (Times Music Spiritual, Rattan Mohan Sharma), oEmbed 200.
- Cross-link: added to related.stotrams of best-prayer-for-inner-peace.

## 2026-10-31: guides
- New: snana-yatra-snana-purnima-puri-guide (sources: Wikipedia Snana Yatra, Deccan Chronicle). The two differ on the water source (northern well against golden well) and the guide says so.
- New: dhanu-jatra-bargarh-odisha-guide (sources: Wikipedia Dhanu jatra, ISKCON News). The two differ on the start year (1947 against 1948) and the stage radius (8 km against 5 km); the guide says so.
- Upgraded: gayatri-mantra-word-by-word-meaning (about 389 to 818 words). Added the prefix note, Savitr, bhargas readings, grammar of the last line, usage and more FAQs. Sources added: Advaita Vision, Sri Deva Sthanam.
- Cross-links: snana guide added to jagannath-ratha-yatra-puri-guide.

## 2026-11-01: audit: shiva-tandav, Odia
- Method: Odia converted back to Devanagari by Unicode offset (with fixes for ୟ, ୱ) and compared with the site Hindi in all 15 verses: no mismatch. Then compared with the independent Odia edition on vignanam.org (15 verses).
- Differences were regional variants only: murdhani and murddhani (v2), bhala and phala (v7, v11), ahutikrita and adharikrita with ratirmama and matirmama (v7), baddhakandharah and bandhukandharah (v8), avalambi and vilambi (v9), akharva and agarva (v10), trinaravinda and trishnaravinda (v12), vilolalola and vimuktalola and kada and sada (v13), one missing visarga in the vignanam print (v5). Word-final halants are valid. No broken Unicode.
- Result: no fixes needed. Next in rotation: shiva-tandav, Telugu.

## 2026-11-01: new mantra added: om-jai-jagdish-hare-aarti
- Text: eight stanzas compared across bhaktibharat.com and drikpanchang.com. Variants: stanza 5 reads "main moorakh phalkami, main sevak tum swami" on bhaktibharat.com and "main moorakh khal kami" on drikpanchang.com (site uses the bhaktibharat.com reading); "thakur tum mere" against "tum thakur mere"; binse and vinse; sampatti and sampati (site uses sampati). Drikpanchang adds a ninth stanza naming Shivananda Swami; it is not used and the page says authorship is traditionally given as Pt. Shardha Ram Phillauri (about 1870, per Wikipedia and bhaktibharat.com).
- Odia and Telugu are converted from the Hindi by Unicode offset. Odia and Telugu meanings are hand written and need a human reader check.
- YouTube: id 3ucCEjXS9n8, Om Jai Jagdish Hare Aarti, Anuradha Paudwal, channel T-Series Bhakti Sagar, oEmbed 200.
- Registered in verseData.js, stotrams-index.js, stotram-extra.js, stotramSeo.js.

## 2026-11-01: guides
- New: jagannath-mahaprasad-ananda-bazar-puri-guide (sources: Wikipedia Mahaprasad (Jagannath Temple), ISKCON News 2007, Free Press Journal). Kitchen figures (32 rooms, 752 stoves, about 500 cooks) are attributed to the 2007 article, and the top-pot-cooks-first and Mahalakshmi claims are stated as beliefs. Wikipedia lists khai, nadia kora and gaja as dry items.
- New: bahuda-yatra-suna-besha-niladri-bije-puri-guide (sources: Free Press Journal, Jawhar Sircar, OdishaBytes, Outlook India, Bhaktibharat). Sources differ on the Lakshmi offering: Free Press Journal says Rasagola, Sircar names no sweet. The guide says so. No festival dates are quoted.
- Upgraded: night-prayer-routine (about 368 to 1,200 words). Added the sandhya explanation, Shubham Karoti text and meaning with spelling variants, Shantakaram meaning, ten-minute outline and more FAQs. Sources: Green Message, Bhaktibharat, Shlokam.org, Wikipedia Sandhyavandanam.
- Cross-links: both new guides added to jagannath-ratha-yatra-puri-guide.

## 2026-11-02: audit: shiva-tandav, Telugu
- Method: Telugu converted back to Devanagari by Unicode offset and compared with the site Hindi in all 15 verses. The only differences were the convention of a final anusvara in place of a final m with halant, which is valid. No broken Unicode, no stray halants or spaces before matras.
- Then compared with the independent Telugu edition on vignanam.org (15 verses). Differences were the same regional variants logged for Odia on 2026-11-01: murdhani and murddhani (v2), bhala and phala (v7, v11), baddhakandharah and bandhukandharah (v8), avalambi and vilambi (v9), akharva and agarva (v10), the v12 last line and the v13 vilolalola and vimuktalola variant.
- Result: no fixes needed. Next in rotation: shiva-tandav, English transliteration.

## 2026-11-02: new mantra added: karagre-vasate-lakshmi
- Text: Devanagari compared across shlokam.org and bhaktibharat.com (Pratah Smaran page). Same verse in both. Variant: shlokam.org ends the first line with sarasvati (short i), bhaktibharat.com with sarasvati (long i); the site uses the long form. bhaktibharat.com spaces karamule as two words. No author named in either source. A third source (greenmesg.org) showed a bot check and was not used.
- Odia and Telugu are converted from the Hindi by Unicode offset. The four meanings are hand written and need a human reader check.
- YouTube: id KGYGtddqVOo, "Karagray Vaste Laxmi Karamdhyay Saraswati with lyrics", channel Saregama Bhakti, oEmbed 200.
- Registered in verseData.js, stotrams-index.js, stotram-extra.js, stotramSeo.js. Added to related.stotrams of morning-prayer-routine.

## 2026-11-02: guides
- New: rukuna-rath-yatra-ashokashtami-lingaraj-bhubaneswar-guide (sources: Bhubaneswar Smart City site, Incredible India, Wikipedia Rameshwar Deula, The Statesman). Sources differ on the deities: Chandrasekhar with Rukmini and Basudeva in two, Lingaraj with Parvati in Incredible India. The guide says so. The Rama legends are marked as tradition. No date is quoted.
- New: samba-dashami-konark-chandrabhaga-pausha-odisha-guide (sources: Wikipedia Samba Dashami, OdishaBytes). The Samba legend is marked as tradition (Wikipedia tags it citation needed). No date is quoted.
- Upgraded: best-mantra-for-study-focus (about 370 to 1,090 words). Added Khadi Chhuan, Sahana Vavatu, Kara Darshan, Hayagriva meaning, more FAQs and a note that a mantra does not replace study. Sources added: Vedadhara, Wikipedia Vidyarambha, Odisha Lifestyle, Shlokam.org.

## 2026-11-03: audit: shiva-tandav, English transliteration
- Method: the site's 15-verse transliteration was folded (vowel length, sibilants, anusvara and nasals, b and v, aspirates) and compared half-line by half-line with two independent Roman texts: shlokam.org (IAST, all 15 verses) and hindupad.com (Harvard-Kyoto style, verses 2 to 15; verse 1 is not on that page). It was also converted back from the site Devanagari by a rule-based script and compared with the English in all 15 verses. The only mismatches in that last check were two false alarms from the script's handling of the double consonant ch+chh in verses 9 and 13, which were confirmed by hand (smarachchhidam and mantramuchcharan are correct).
- Differences from the two Roman sources are recension variants, not errors, and the site follows the Devanagari already verified on 2026-10-31 against sanskritdocuments.org and ramcharit.in: v2 murddhani (shlokam murdhani); v5 jutakah (hindupad jutaka); v7 bhala and ahutikrita and ratirmama (hindupad dhanamjayadharikruta... and matirmama, shlokam phala); v8 baddhakandharah (hindupad bandhukandharah); v9 valambika (shlokam and hindupad vilambika); v10 akharva (hindupad agarva); v11 bhala (shlokam phala) and dhimiddhimiddhimiddhvanan (sanskritdocuments prints it with the note dhimim dhimim dhimim dhvanan, while shlokam and hindupad read dhimiddhimidhvanan); v12 trina (hindupad trishna) and the last line (samapravrittikah kada sadashivam bhajamyaham versus samam pravartayanmanah kada sadashivam bhaje); v13 vilolalolalochano lalamabhalalagnakah (hindupad vimuktalolalochano lalataphalalagnakah, shlokam lalamaphala), kada sukhi (shlokam and hindupad sada sukhi) and shirahsthamanjalim (shlokam shirasthamanjalim).
- Result: no fixes needed. The English matches the site Devanagari and its Odia and Telugu in all 15 verses. Shiva Tandav is now audited in all four languages. Next in rotation: gayatri-mantra in Hindi.

## 2026-11-03: new mantra added: lingashtakam
- Text: Devanagari compared across sanskritdocuments.org (Lingashtakam with meaning, encoded by Srinivas Sunder) and shlokam.org; vedicfeed.com and hindupad.com used as extra checks. Verses 1, 5, 6, 7 and 8 are identical in the first two. Differences and the choice made: v2 kamadahana (shlokam, vedicfeed, hindupad) over kamadaham (sanskritdocuments); v3 sugandha (shlokam, vedicfeed) over sugandhi (sanskritdocuments, hindupad); v4 vinashana (sanskritdocuments, hindupad) over ninashana (shlokam, vedicfeed). Notes in sanskritdocuments mention nirmalabhashita (v1) and vinashita (v7) as alternates; the site keeps nirmalabhasita and vinashana. The closing verse reads pathet shivasannidhau (sanskritdocuments, hindupad); shlokam and vedicfeed print pathesshiva sannidhau, the same words with sandhi. No author is named in any edition checked.
- Odia and Telugu are converted from the Devanagari by Unicode offset (ya as ୟ, va as ବ in Odia; nasals before same-group consonants as anusvara in Telugu) and converted back and compared in all nine verses with no mismatch. The four meanings are hand written and need a human reader check, in particular the Odia and Telugu.
- YouTube: id S91CFs_rvvI, "Shiv Lingashtakam by Rishi Nityapragya | Brahma Murari Surachita Lingam | Art of Living Shiv Bhajan", channel The Art of Living, oEmbed 200.
- Registered in verseData.js, stotrams-index.js, stotram-extra.js, stotramSeo.js. Added to related.stotrams of maha-shivaratri-guide, rukuna-rath-yatra-ashokashtami-lingaraj-bhubaneswar-guide and how-to-chant-shiva-mantra.

## 2026-11-03: guides
- New: hera-panchami-lakshmi-gundicha-puri-guide (sources: Wikipedia Ratha Yatra (Puri), All India Radio, Free Press Journal, ThePrint). Sources differ on whether Lakshmi enters the Gundicha Temple (door shut in Wikipedia and All India Radio, enters but cannot meet Jagannath in ThePrint) and on how the days are counted. The guide says so. The history (Skanda Purana, Kapilendra Deb, Madala Panji) rests on Wikipedia alone and is marked as reported tradition. No date is quoted.
- New: maha-shivaratri-lingaraj-mahadeepa-bhubaneswar-guide (sources: Wikipedia Lingaraja Temple, three OdishaBytes reports, Orissa Post). The sources do not say what the Mahadeepa is made of, and the guide says so. No date is quoted.
- Upgraded: best-mantra-for-protection (about 385 to 990 words). Added the meaning of raksha and kavacha, Hanuman Chalisa verses 24, 26 and 36 (numbering as on this site), Ram Raksha attribution, Aditya Hridayam, Maha Mrityunjaya (Rigveda 7.59.12) and Taittiriya Upanishad 2.9.1 (Muller translation and eSamskriti), a short practice section and more FAQs, with the safety note kept. The Aditya Hridayam chapter is given as 105 or 107 because editions differ (valmikiramayan.net and sanskritdocuments use 105, vedapath uses 107).
- Cross-links: both new guides added to related.guides of the Ratha Yatra, Bahuda Yatra, Maha Shivaratri and Rukuna Rath Yatra guides as fits.

## 2026-11-04: audit gayatri-mantra, Hindi
- Compared the Devanagari line by line with bhaktibharat.com, shlokam.org and drikpanchang.com (verse 1, Rigveda 3.62.10 with the vyahritis) and greenmesg.org and Wikipedia Sandhyavandanam (shanti verse). Verse 1 matches: om bhur bhuvah svah, tat savitur varenyam, bhargo devasya dhimahi, dhiyo yo nah prachodayat. bhaktibharat and drikpanchang print devasyah with a visarga, which the Rigveda text does not have; the site keeps devasya.
- Fixed: removed the old verse 2 ("om tat savitur varenyam yasya bhargah punati dhiyah, soh devah prachodayat") together with its Odia, Telugu, English and meanings. It was not found in any source and is not a known Gayatri verse. Remaining verses renumbered gm-1, gm-2 (Gayatri Shiras, Taittiriya Aranyaka 10.27: om apo jyotiraso 'mritam brahma bhur bhuvah svar om) and gm-3 (shanti). verseCount in stotrams-index.js changed from 4 to 3.
- Odia normalised: bhurbhuvah written with ବ (ଭୂର୍ଭୁବଃ) instead of ଵ, to match the rest of the site.
- Hindi done. Next in rotation: gayatri-mantra, Odia.

## 2026-11-04: new mantra jagannath-ashtakam
- Added Jagannath Ashtakam (Kadachit Kalindi Tata Vipine), nine verses (eight plus phalashruti), in Hindi, Odia, Telugu and English transliteration.
- Sources: shlokam.org (9 verses, colophon naming Adi Shankaracharya), sanskritdocuments.org jagannAthAShTaka (8 verses, a different recension with some different words), hinduismoutlook.com (Roman text matching the shlokam recension). bhaktibharat.com prints the same text as shlokam and was treated as a copy of it, not as an independent check. The site follows the nine-verse shlokam and hinduismoutlook recension. Spelling: sources print the phalashruti word as punyam and the site uses the standard Devanagari spelling पुण्यं.
- Attribution: traditionally Adi Shankaracharya; some sources attribute it differently and this was not resolved, so the page says traditional and states the uncertainty.
- Odia and Telugu are converted from the Devanagari by offset and converted back and compared in all nine verses with no mismatch; the transliteration was generated from the Devanagari and compared with it. The four meanings are hand written and need a human reader check, in particular Odia and Telugu. Verse 4 reads rama vani ramah: the meaning avoids naming who is meant by the second Rama.
- YouTube: id HpVRh44dAL8, "Shri Jagannath Astakam, Adi Shankaracharya" (Sanskrit, Devanagari and Odia title), channel Shree Jagannatha, oEmbed 200. Title and description only; audio not listened to.
- Registered in verseData.js, stotrams-index.js, stotram-extra.js, stotramSeo.js. Added to related.stotrams of the Ratha Yatra, Chandan Yatra, Snana Yatra, Mahaprasad, Bahuda Yatra and Hera Panchami guides.

## 2026-11-04: guides
- New: nabakalebara-puri-jagannath-guide (sources: Wikipedia Nabakalebara, Government of Odisha Orissa Annual Reference 2017 chapter on Nabakalebara 2015). The two sources differ on village spellings and on the timing of the transfer, so the guide gives the official 2015 timeline and marks village names as approximate. No date is quoted for a future ceremony.
- New: jagannath-ashtakam-meaning-and-story (sources: shlokam.org, sanskritdocuments.org, hinduismoutlook.com, Wikipedia Govardhan Math). Attribution stated as traditional.
- Upgraded: vasant-panchami-saraswati-puja-guide (about 374 to 704 words). Added how the tithi is chosen when it spans two days, Odisha customs (Basanta Panchami, Sri Panchami, school pujas, Khadi Chhuan, food), other regions, Kamadeva link and more FAQs (sources: Wikipedia Vasant Panchami, OdishaTV, Sambad English). The Ratha Katha Anukula remark rests on one source (OdishaTV) and is marked as reported.
