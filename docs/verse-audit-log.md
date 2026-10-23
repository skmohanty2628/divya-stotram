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
