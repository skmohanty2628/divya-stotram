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
