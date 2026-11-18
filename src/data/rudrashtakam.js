// RUDRASHTAKAM (Shri Rudrashtakam), eight verses to Shiva with a closing verse on the fruit of reciting, from Tulsidas's Ramcharitmanas, Uttara Kanda (Hindutone places it after Doha 107).
// Text checked on 2026-11-18 against shlokam.org (Rudra Ashtakam), bhaktibharat.com (Shri Rudrashtakam) and the vedicscripturesinc Tulsidas page (Rudrashtakam, mool Sanskrit).
// Variants: omkara in verse 2 (shlokam prints omkara without the long vowel; the other two have the long vowel, which the site follows), gabhiram (shlokam, bhaktibharat) against gambhiram (vedicscripturesinc) in verse 3 (gabhiram follows the metre), tryah (shlokam) against trayah (bhaktibharat, vedicscripturesinc) in verse 5 (trayah follows the metre), yavat or yavad in verse 7, and word spacing in compounds.
// Verse 9 is the closing phalashruti verse found in all three sources.
export const rudrashtakam = {
  slug: 'rudrashtakam',
  verses: [
    {
      id: 1, type: 'shloka', num: 1,
      original: `नमामीशमीशान निर्वाणरूपं
विभुं व्यापकं ब्रह्मवेदस्वरूपम्।
निजं निर्गुणं निर्विकल्पं निरीहं
चिदाकाशमाकाशवासं भजेऽहम्॥`,
      transliteration: `Namami Isham Ishana Nirvana Roopam
Vibhum Vyapakam Brahma Veda Swaroopam
Nijam Nirgunam Nirvikalpam Nireeham
Chidakasham Akasha Vasam Bhajeham`,
      script: {
        od: `ନମାମୀଶମୀଶାନ ନିର୍ବାଣରୂପଂ
ବିଭୁଂ ବ୍ୟାପକଂ ବ୍ରହ୍ମବେଦସ୍ୱରୂପମ୍।
ନିଜଂ ନିର୍ଗୁଣଂ ନିର୍ବିକଲ୍ପଂ ନିରୀହଂ
ଚିଦାକାଶମାକାଶବାସଂ ଭଜେଽହମ୍॥`,
        te: `నమామీశమీశాన నిర్వాణరూపం
విభుం వ్యాపకం బ్రహ్మవేదస్వరూపమ్।
నిజం నిర్గుణం నిర్వికల్పం నిరీహం
చిదాకాశమాకాశవాసం భజేఽహమ్॥`,
      },
      meaning: {
        en: `I bow to Ishana, the Lord of all, the very form of liberation, all-pervading and present everywhere, the true nature of Brahman and of the Vedas. I worship him who is his own self, beyond the qualities, free of division and of desire, whose being is the sky of consciousness and whose home is the sky.`,
        hi: `मैं ईशान, सबके स्वामी को प्रणाम करता हूँ, जो मोक्षस्वरूप, सर्वव्यापक और ब्रह्म तथा वेदों के स्वरूप हैं। मैं उनका भजन करता हूँ जो स्वयं अपने आप में स्थित हैं, गुणों से परे हैं, भेद और इच्छा से रहित हैं, चेतना रूपी आकाश हैं और आकाश में निवास करते हैं।`,
        od: `ମୁଁ ଈଶାନ, ସର୍ବେଶ୍ୱରଙ୍କୁ ପ୍ରଣାମ କରେ, ଯେ ମୋକ୍ଷସ୍ୱରୂପ, ସର୍ବବ୍ୟାପୀ ଏବଂ ବ୍ରହ୍ମ ଓ ବେଦର ସ୍ୱରୂପ। ମୁଁ ତାଙ୍କୁ ଭଜେ ଯେ ନିଜ ସ୍ୱରୂପରେ ସ୍ଥିତ, ଗୁଣରୁ ପର, ଭେଦ ଓ ଇଚ୍ଛାରୁ ମୁକ୍ତ, ଚେତନାର ଆକାଶ ସ୍ୱରୂପ ଏବଂ ଆକାଶରେ ବାସ କରନ୍ତି।`,
        te: `సర్వానికి ప్రభువైన ఈశానునికి నేను నమస్కరిస్తున్నాను. ఆయన మోక్ష స్వరూపుడు, సర్వవ్యాపకుడు, బ్రహ్మ మరియు వేదాల స్వరూపుడు. తన స్వరూపంలోనే నిలిచినవాడు, గుణాలకు అతీతుడు, భేదం, కోరికలు లేనివాడు, చైతన్యమనే ఆకాశమై ఆకాశంలో నివసించేవాడైన ఆయనను నేను భజిస్తున్నాను.`,
      },
    },
    {
      id: 2, type: 'shloka', num: 2,
      original: `निराकारमोङ्कारमूलं तुरीयं
गिराज्ञानगोतीतमीशं गिरीशम्।
करालं महाकालकालं कृपालं
गुणागारसंसारपारं नतोऽहम्॥`,
      transliteration: `Nirakaram Omkara Moolam Turiyam
Gira Gyana Gotitam Isham Girisham
Karalam Mahakala Kalam Kripalam
Gunagara Samsara Param Nato'ham`,
      script: {
        od: `ନିରାକାରମୋଙ୍କାରମୂଲଂ ତୁରୀୟଂ
ଗିରାଜ୍ଞାନଗୋତୀତମୀଶଂ ଗିରୀଶମ୍।
କରାଲଂ ମହାକାଲକାଲଂ କୃପାଲଂ
ଗୁଣାଗାରସଂସାରପାରଂ ନତୋଽହମ୍॥`,
        te: `నిరాకారమోంకారమూలం తురీయం
గిరాజ్ఞానగోతీతమీశం గిరీశమ్।
కరాలం మహాకాలకాలం కృపాలం
గుణాగారసంసారపారం నతోఽహమ్॥`,
      },
      meaning: {
        en: `He has no form and is the root of Om. He is the fourth state beyond waking, dream and deep sleep, and lies beyond speech, knowledge and the senses. He is the lord of the mountain, fearsome, the Time that devours Time, and full of mercy. He is the home of all good qualities and the one who takes us across the cycle of worldly life. I bow to him.`,
        hi: `वे निराकार हैं, ओंकार के मूल हैं और जाग्रत, स्वप्न तथा सुषुप्ति से परे चौथी अवस्था (तुरीय) हैं। वे वाणी, ज्ञान और इन्द्रियों की पहुँच से परे हैं। वे पर्वत के स्वामी, भयंकर, काल के भी काल और दयालु हैं। वे गुणों के भण्डार हैं और संसार से पार ले जाने वाले हैं। मैं उन्हें प्रणाम करता हूँ।`,
        od: `ସେ ନିରାକାର, ଓଁକାରର ମୂଳ ଏବଂ ଜାଗ୍ରତ, ସ୍ୱପ୍ନ ଓ ସୁଷୁପ୍ତିରୁ ପର ଚତୁର୍ଥ ଅବସ୍ଥା (ତୁରୀୟ)। ସେ ବାଣୀ, ଜ୍ଞାନ ଓ ଇନ୍ଦ୍ରିୟର ପହଞ୍ଚରୁ ପର। ସେ ପର୍ବତର ଅଧିପତି, ଭୟଙ୍କର, କାଳଙ୍କର ମଧ୍ୟ କାଳ ଏବଂ ଦୟାଳୁ। ସେ ଗୁଣର ଭଣ୍ଡାର ଏବଂ ସଂସାରରୁ ପାର କରାନ୍ତି। ମୁଁ ତାଙ୍କୁ ପ୍ରଣାମ କରେ।`,
        te: `ఆయన నిరాకారుడు, ఓంకారానికి మూలం, మెలకువ, కల, గాఢనిద్రలకు అతీతమైన నాల్గవ స్థితి (తురీయం). మాట, జ్ఞానం, ఇంద్రియాల పరిధికి అతీతుడు. పర్వతాధిపతి, భయంకరుడు, కాలానికే కాలుడు, కరుణామయుడు. గుణాలకు నిలయం, సంసారాన్ని దాటించేవాడు. ఆయనకు నేను నమస్కరిస్తున్నాను.`,
      },
    },
    {
      id: 3, type: 'shloka', num: 3,
      original: `तुषाराद्रिसंकाशगौरं गभीरं
मनोभूतकोटिप्रभाश्रीशरीरम्।
स्फुरन्मौलिकल्लोलिनीचारुगङ्गा
लसद्भालबालेन्दुकण्ठे भुजङ्गा॥`,
      transliteration: `Tushara Adri Sankasha Gauram Gabhiram
Manobhuta Koti Prabha Shri Shariram
Sphuran Mauli Kallolini Charu Ganga
Lasad Bhala Balendu Kanthe Bhujanga`,
      script: {
        od: `ତୁଷାରାଦ୍ରିସଂକାଶଗୌରଂ ଗଭୀରଂ
ମନୋଭୂତକୋଟିପ୍ରଭାଶ୍ରୀଶରୀରମ୍।
ସ୍ଫୁରନ୍ମୌଲିକଲ୍ଲୋଲିନୀଚାରୁଗଙ୍ଗା
ଲସଦ୍ଭାଲବାଲେନ୍ଦୁକଣ୍ଠେ ଭୁଜଙ୍ଗା॥`,
        te: `తుషారాద్రిసంకాశగౌరం గభీరం
మనోభూతకోటిప్రభాశ్రీశరీరమ్।
స్ఫురన్మౌలికల్లోలినీచారుగంగా
లసద్భాలబాలేందుకణ్ఠే భుజంగా॥`,
      },
      meaning: {
        en: `His body is fair like a snow mountain and deep in its calm, and it shines with a beauty brighter than countless Kamadevas. From his head the lovely Ganga flows in rippling waves, the young crescent moon gleams on his forehead, and snakes rest around his neck.`,
        hi: `उनका शरीर हिमालय के समान गौर और गम्भीर है और करोड़ों कामदेवों की आभा से भी अधिक शोभायमान है। उनके मस्तक पर सुन्दर गंगा लहरों के साथ बहती है, भाल पर बाल चन्द्रमा चमकता है और कण्ठ में सर्प विराजते हैं।`,
        od: `ତାଙ୍କ ଶରୀର ହିମାଳୟ ପରି ଗୌର ଓ ଗମ୍ଭୀର, ଏବଂ କୋଟି କୋଟି କାମଦେବଙ୍କ ଶୋଭାଠାରୁ ଅଧିକ ଦୀପ୍ତିମାନ। ତାଙ୍କ ମସ୍ତକରୁ ସୁନ୍ଦର ଗଙ୍ଗା ଲହରୀ ସହ ବହେ, କପାଳରେ ବାଳ ଚନ୍ଦ୍ର ଝଲସେ ଏବଂ କଣ୍ଠରେ ସର୍ପ ବିରାଜମାନ।`,
        te: `ఆయన శరీరం హిమాలయంలా తెల్లగా, గంభీరంగా ఉంది, కోట్ల మన్మథుల కాంతికి మించి ప్రకాశిస్తోంది. ఆయన శిరస్సు నుండి అందమైన గంగ అలలతో ప్రవహిస్తోంది, నుదుటిపై బాల చంద్రుడు మెరుస్తున్నాడు, కంఠంలో సర్పాలు ఉన్నాయి.`,
      },
    },
    {
      id: 4, type: 'shloka', num: 4,
      original: `चलत्कुण्डलं भ्रूसुनेत्रं विशालं
प्रसन्नाननं नीलकण्ठं दयालम्।
मृगाधीशचर्माम्बरं मुण्डमालं
प्रियं शङ्करं सर्वनाथं भजामि॥`,
      transliteration: `Chalat Kundalam Bhru Sunetram Vishalam
Prasanna Ananam Neelakantham Dayalam
Mrigadhisha Charma Ambaram Munda Malam
Priyam Shankaram Sarva Natham Bhajami`,
      script: {
        od: `ଚଲତ୍କୁଣ୍ଡଲଂ ଭ୍ରୂସୁନେତ୍ରଂ ବିଶାଲଂ
ପ୍ରସନ୍ନାନନଂ ନୀଲକଣ୍ଠଂ ଦୟାଲମ୍।
ମୃଗାଧୀଶଚର୍ମାମ୍ବରଂ ମୁଣ୍ଡମାଲଂ
ପ୍ରିୟଂ ଶଙ୍କରଂ ସର୍ବନାଥଂ ଭଜାମି॥`,
        te: `చలత్కుండలం భ్రూసునేత్రం విశాలం
ప్రసన్నాననం నీలకణ్ఠం దయాలమ్।
మృగాధీశచర్మాంబరం ముండమాలం
ప్రియం శంకరం సర్వనాథం భజామి॥`,
      },
      meaning: {
        en: `His earrings sway, his brows are fine and his eyes wide. His face is serene, his throat is blue, and he is full of compassion. He wears a lion's skin and a garland of skulls. I worship Shankara, the beloved lord of all.`,
        hi: `उनके कुण्डल हिलते हैं, भौंहें सुन्दर और नेत्र विशाल हैं। उनका मुख प्रसन्न है, कण्ठ नीला है और वे दयालु हैं। वे सिंह चर्म धारण करते हैं और मुण्डमाला पहनते हैं। मैं सबके स्वामी, प्रिय शंकर का भजन करता हूँ।`,
        od: `ତାଙ୍କ କୁଣ୍ଡଳ ଦୋହଲେ, ଭ୍ରୁ ସୁନ୍ଦର ଓ ନେତ୍ର ବିଶାଳ। ତାଙ୍କ ମୁଖ ପ୍ରସନ୍ନ, କଣ୍ଠ ନୀଳ ଏବଂ ସେ ଦୟାଳୁ। ସେ ସିଂହ ଚର୍ମ ପିନ୍ଧନ୍ତି ଓ ମୁଣ୍ଡମାଳା ଧାରଣ କରନ୍ତି। ମୁଁ ସର୍ବେଶ୍ୱର, ପ୍ରିୟ ଶଙ୍କରଙ୍କୁ ଭଜେ।`,
        te: `ఆయన కుండలాలు కదులుతున్నాయి, కనుబొమ్మలు సొగసైనవి, కన్నులు విశాలమైనవి. ముఖం ప్రసన్నం, కంఠం నీలం, ఆయన దయామయుడు. సింహచర్మాన్ని ధరించి, కపాలమాల వేసుకున్నవాడు. సర్వానికి నాథుడైన ప్రియ శంకరుని నేను భజిస్తున్నాను.`,
      },
    },
    {
      id: 5, type: 'shloka', num: 5,
      original: `प्रचण्डं प्रकृष्टं प्रगल्भं परेशं
अखण्डं अजं भानुकोटिप्रकाशम्।
त्रयःशूलनिर्मूलनं शूलपाणिं
भजेऽहं भवानीपतिं भावगम्यम्॥`,
      transliteration: `Prachandam Prakrishtam Pragalbham Paresham
Akhandam Ajam Bhanu Koti Prakasham
Trayah Shula Nirmoolanam Shula Panim
Bhajeham Bhavani Patim Bhava Gamyam`,
      script: {
        od: `ପ୍ରଚଣ୍ଡଂ ପ୍ରକୃଷ୍ଟଂ ପ୍ରଗଲ୍ଭଂ ପରେଶଂ
ଅଖଣ୍ଡଂ ଅଜଂ ଭାନୁକୋଟିପ୍ରକାଶମ୍।
ତ୍ରୟଃଶୂଲନିର୍ମୂଲନଂ ଶୂଲପାଣିଂ
ଭଜେଽହଂ ଭବାନୀପତିଂ ଭାବଗମ୍ୟମ୍॥`,
        te: `ప్రచండం ప్రకృష్టం ప్రగల్భం పరేశం
అఖండం అజం భానుకోటిప్రకాశమ్।
త్రయఃశూలనిర్మూలనం శూలపాణిం
భజేఽహం భవానీపతిం భావగమ్యమ్॥`,
      },
      meaning: {
        en: `He is fierce, supreme and bold, the highest lord, whole and unborn, shining with the light of countless suns. He removes the three kinds of suffering and carries the trident in his hand. I worship the husband of Bhavani, who is reached through devotion.`,
        hi: `वे प्रचण्ड, श्रेष्ठ और प्रगल्भ हैं, परमेश्वर हैं, अखण्ड और अजन्मा हैं तथा करोड़ों सूर्यों के समान प्रकाशमान हैं। वे तीनों प्रकार के दुःखों को जड़ से मिटाने वाले और हाथ में त्रिशूल धारण करने वाले हैं। मैं भवानी के पति का भजन करता हूँ, जो भाव (भक्ति) से प्राप्त होते हैं।`,
        od: `ସେ ପ୍ରଚଣ୍ଡ, ଶ୍ରେଷ୍ଠ ଓ ପ୍ରଗଲ୍ଭ, ପରମେଶ୍ୱର, ଅଖଣ୍ଡ ଓ ଅଜନ୍ମା ଏବଂ କୋଟି ସୂର୍ଯ୍ୟ ପରି ପ୍ରକାଶମାନ। ସେ ତିନି ପ୍ରକାର ଦୁଃଖକୁ ମୂଳରୁ ଉପାଡ଼ନ୍ତି ଏବଂ ହସ୍ତରେ ତ୍ରିଶୂଳ ଧାରଣ କରନ୍ତି। ମୁଁ ଭବାନୀଙ୍କ ପତିଙ୍କୁ ଭଜେ, ଯେ ଭକ୍ତି ଭାବରେ ପ୍ରାପ୍ତ ହୁଅନ୍ତି।`,
        te: `ఆయన ప్రచండుడు, శ్రేష్ఠుడు, ధీరుడు, పరమేశ్వరుడు, అఖండుడు, అజుడు, కోట్ల సూర్యుల కాంతితో ప్రకాశించేవాడు. మూడు విధాల దుఃఖాలను వేర్లతో సహా తొలగించేవాడు, చేత త్రిశూలం ధరించినవాడు. భక్తి భావంతో పొందదగిన భవానీపతిని నేను భజిస్తున్నాను.`,
      },
    },
    {
      id: 6, type: 'shloka', num: 6,
      original: `कलातीतकल्याण कल्पान्तकारी
सदा सज्जनानन्ददाता पुरारी।
चिदानन्दसंदोह मोहापहारी
प्रसीद प्रसीद प्रभो मन्मथारी॥`,
      transliteration: `Kalateeta Kalyana Kalpanta Kari
Sada Sajjana Ananda Data Purari
Chidananda Sandoha Mohapahari
Praseeda Praseeda Prabho Manmathari`,
      script: {
        od: `କଲାତୀତକଲ୍ୟାଣ କଲ୍ପାନ୍ତକାରୀ
ସଦା ସଜ୍ଜନାନନ୍ଦଦାତା ପୁରାରୀ।
ଚିଦାନନ୍ଦସଂଦୋହ ମୋହାପହାରୀ
ପ୍ରସୀଦ ପ୍ରସୀଦ ପ୍ରଭୋ ମନ୍ମଥାରୀ॥`,
        te: `కలాతీతకల్యాణ కల్పాంతకారీ
సదా సజ్జనానందదాతా పురారీ।
చిదానందసందోహ మోహాపహారీ
ప్రసీద ప్రసీద ప్రభో మన్మథారీ॥`,
      },
      meaning: {
        en: `You are beyond all the arts and divisions, giver of good, and the one who brings a cosmic age to its end. You always bring joy to good people, O destroyer of the three cities. You are a mass of consciousness and bliss and the remover of delusion. Be gracious, be gracious, O Lord, enemy of Kama.`,
        hi: `आप कलाओं से परे, कल्याणकारी और कल्प का अन्त करने वाले हैं। आप सदा सज्जनों को आनन्द देने वाले, त्रिपुर के शत्रु हैं। आप चैतन्य और आनन्द के समूह तथा मोह को हरने वाले हैं। हे प्रभो, कामदेव के शत्रु, प्रसन्न हों, प्रसन्न हों।`,
        od: `ଆପଣ କଳାରୁ ପର, କଲ୍ୟାଣକାରୀ ଏବଂ କଳ୍ପର ଅନ୍ତ କରନ୍ତି। ଆପଣ ସଦା ସଜ୍ଜନଙ୍କୁ ଆନନ୍ଦ ଦିଅନ୍ତି, ତ୍ରିପୁରର ଶତ୍ରୁ। ଆପଣ ଚିଦାନନ୍ଦର ସମୂହ ଏବଂ ମୋହ ହରଣକାରୀ। ହେ ପ୍ରଭୁ, କାମଦେବଙ୍କ ଶତ୍ରୁ, ପ୍ରସନ୍ନ ହୁଅନ୍ତୁ, ପ୍ରସନ୍ନ ହୁଅନ୍ତୁ।`,
        te: `మీరు కళలకు అతీతులు, మంగళకరులు, కల్పాన్ని అంతం చేసేవారు. సజ్జనులకు ఎల్లప్పుడూ ఆనందాన్ని ఇచ్చేవారు, త్రిపురాంతకులు. చైతన్యానంద సమూహం, మోహాన్ని హరించేవారు. ప్రభూ, మన్మథుని శత్రువా, ప్రసన్నులు కండి, ప్రసన్నులు కండి.`,
      },
    },
    {
      id: 7, type: 'shloka', num: 7,
      original: `न यावदुमानाथपादारविन्दं
भजन्तीह लोके परे वा नराणाम्।
न तावत्सुखं शान्ति सन्तापनाशं
प्रसीद प्रभो सर्वभूताधिवासम्॥`,
      transliteration: `Na Yavad Uma Natha Padaravindam
Bhajanti Iha Loke Pare Va Naranam
Na Tavat Sukham Shanti Santapa Nasham
Praseeda Prabho Sarva Bhuta Adhivasam`,
      script: {
        od: `ନ ୟାବଦୁମାନାଥପାଦାରବିନ୍ଦଂ
ଭଜନ୍ତୀହ ଲୋକେ ପରେ ବା ନରାଣାମ୍।
ନ ତାବତ୍ସୁଖଂ ଶାନ୍ତି ସନ୍ତାପନାଶଂ
ପ୍ରସୀଦ ପ୍ରଭୋ ସର୍ବଭୂତାଧିବାସମ୍॥`,
        te: `న యావదుమానాథపాదారవిందం
భజంతీహ లోకే పరే వా నరాణామ్।
న తావత్సుఖం శాంతి సంతాపనాశం
ప్రసీద ప్రభో సర్వభూతాధివాసమ్॥`,
      },
      meaning: {
        en: `As long as people do not worship the lotus feet of Uma's lord, in this world or the next, they find no happiness, no peace and no end to their distress. Be gracious, O Lord, who dwells in all beings.`,
        hi: `जब तक लोग इस लोक या परलोक में उमापति के चरणकमलों का भजन नहीं करते, तब तक उन्हें न सुख मिलता है, न शान्ति और न कष्टों का अन्त। हे प्रभो, सब प्राणियों में निवास करने वाले, प्रसन्न हों।`,
        od: `ଯେପର୍ଯ୍ୟନ୍ତ ଲୋକେ ଏହି ଲୋକ ବା ପରଲୋକରେ ଉମାପତିଙ୍କ ଚରଣକମଳକୁ ଭଜନ୍ତି ନାହିଁ, ସେପର୍ଯ୍ୟନ୍ତ ସେମାନଙ୍କୁ ସୁଖ, ଶାନ୍ତି ବା କଷ୍ଟର ଅନ୍ତ ମିଳେ ନାହିଁ। ହେ ପ୍ରଭୁ, ସର୍ବଭୂତରେ ବାସ କରୁଥିବା, ପ୍ରସନ୍ନ ହୁଅନ୍ତୁ।`,
        te: `ఇహలోకంలో లేదా పరలోకంలో ఉమాపతి పాదపద్మాలను మనుషులు భజించనంత వరకు, వారికి సుఖం, శాంతి, బాధల అంతం లభించవు. ప్రభూ, సర్వభూతాలలో నివసించేవాడా, ప్రసన్నులు కండి.`,
      },
    },
    {
      id: 8, type: 'shloka', num: 8,
      original: `न जानामि योगं जपं नैव पूजां
नतोऽहं सदा सर्वदा शम्भुतुभ्यम्।
जराजन्मदुःखौघतातप्यमानं
प्रभो पाहि आपन्नमामीश शम्भो॥`,
      transliteration: `Na Janami Yogam Japam Naiva Pujam
Nato'ham Sada Sarvada Shambhu Tubhyam
Jara Janma Duhkha Ougha Tatapyamanam
Prabho Pahi Apannam Amisha Shambho`,
      script: {
        od: `ନ ଜାନାମି ୟୋଗଂ ଜପଂ ନୈବ ପୂଜାଂ
ନତୋଽହଂ ସଦା ସର୍ବଦା ଶମ୍ଭୁତୁଭ୍ୟମ୍।
ଜରାଜନ୍ମଦୁଃଖୌଘତାତପ୍ୟମାନଂ
ପ୍ରଭୋ ପାହି ଆପନ୍ନମାମୀଶ ଶମ୍ଭୋ॥`,
        te: `న జానామి యోగం జపం నైవ పూజాం
నతోఽహం సదా సర్వదా శమ్భుతుభ్యమ్।
జరాజన్మదుఃఖౌఘతాతప్యమానం
ప్రభో పాహి ఆపన్నమామీశ శమ్భో॥`,
      },
      meaning: {
        en: `I do not know yoga, japa or ritual worship. I bow to you, Shambhu, always and at all times. I am burning in the many sorrows of old age and birth and have come to you in distress. Protect me, O Lord Shambhu.`,
        hi: `मैं न योग जानता हूँ, न जप और न पूजा। हे शम्भो, मैं सदा और सर्वदा आपको प्रणाम करता हूँ। मैं बुढ़ापे और जन्म के दुःखों के समूह से जल रहा हूँ और संकट में पड़ा हूँ। हे प्रभो, हे शम्भो, मेरी रक्षा करें।`,
        od: `ମୁଁ ଯୋଗ, ଜପ କି ପୂଜା ଜାଣେ ନାହିଁ। ହେ ଶମ୍ଭୁ, ମୁଁ ସଦା ସର୍ବଦା ଆପଣଙ୍କୁ ପ୍ରଣାମ କରେ। ମୁଁ ଜରା ଓ ଜନ୍ମର ଦୁଃଖ ସମୂହରେ ଜଳୁଛି ଏବଂ ସଙ୍କଟରେ ପଡ଼ିଛି। ହେ ପ୍ରଭୁ, ହେ ଶମ୍ଭୋ, ମୋତେ ରକ୍ଷା କରନ୍ତୁ।`,
        te: `నాకు యోగం, జపం, పూజ తెలియవు. శంభో, నేను ఎల్లప్పుడూ మీకు నమస్కరిస్తున్నాను. ముసలితనం, జన్మల దుఃఖసమూహంలో కాలిపోతూ ఆపదలో ఉన్నాను. ప్రభూ, శంభో, నన్ను రక్షించండి.`,
      },
    },
    {
      id: 9, type: 'shloka', num: 9,
      original: `रुद्राष्टकमिदं प्रोक्तं विप्रेण हरतोषये।
ये पठन्ति नरा भक्त्या तेषां शम्भुः प्रसीदति॥`,
      transliteration: `Rudrashtakam Idam Proktam Viprena Hara Toshaye
Ye Pathanti Nara Bhaktya Tesham Shambhuh Praseedati`,
      script: {
        od: `ରୁଦ୍ରାଷ୍ଟକମିଦଂ ପ୍ରୋକ୍ତଂ ବିପ୍ରେଣ ହରତୋଷୟେ।
ୟେ ପଠନ୍ତି ନରା ଭକ୍ତ୍ୟା ତେଷାଂ ଶମ୍ଭୁଃ ପ୍ରସୀଦତି॥`,
        te: `రుద్రాష్టకమిదం ప్రోక్తం విప్రేణ హరతోషయే।
యే పఠంతి నరా భక్త్యా తేషాం శమ్భుః ప్రసీదతి॥`,
      },
      meaning: {
        en: `This Rudrashtakam was spoken by a Brahmin to please Hara. Shambhu is pleased with those who recite it with devotion.`,
        hi: `यह रुद्राष्टक एक ब्राह्मण ने भगवान हर को प्रसन्न करने के लिए कहा था। जो लोग भक्ति से इसका पाठ करते हैं, उन पर शम्भु प्रसन्न होते हैं।`,
        od: `ଏହି ରୁଦ୍ରାଷ୍ଟକ ଜଣେ ବ୍ରାହ୍ମଣ ଭଗବାନ ହରଙ୍କୁ ପ୍ରସନ୍ନ କରିବା ପାଇଁ କହିଥିଲେ। ଯେଉଁମାନେ ଭକ୍ତିରେ ଏହା ପାଠ କରନ୍ତି, ସେମାନଙ୍କ ଉପରେ ଶମ୍ଭୁ ପ୍ରସନ୍ନ ହୁଅନ୍ତି।`,
        te: `ఈ రుద్రాష్టకాన్ని ఒక బ్రాహ్మణుడు హరుని ప్రసన్నం చేసుకోవడానికి చెప్పాడు. దీనిని భక్తితో పఠించేవారిపై శంభుడు ప్రసన్నుడవుతాడు.`,
      },
    },
  ],
};
