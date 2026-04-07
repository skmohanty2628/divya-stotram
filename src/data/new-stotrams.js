// ─────────────────────────────────────────────────────────────────────────────
// 5 NEW STOTRAMS — correct structure for VerseCard component
// Each verse needs: type, num, transliteration, original, script{od,te}, meaning{en,hi,od,te}
// ─────────────────────────────────────────────────────────────────────────────

// ── 1. RAM RAKSHA STOTRAM ────────────────────────────────────────────────────
export const ramRakshaStotram = {
  verses: [
    {
      id: 'rrs-1',
      type: 'shloka',
      num: 1,
      transliteration: 'Charitam Raghunathasya Shata Koti Pravistaram\nEkaikam Aksharam Pumsam Maha Paataka Nashanam',
      original: 'चरितं रघुनाथस्य शतकोटि प्रविस्तरम्।\nएकैकमक्षरं पुंसां महापातकनाशनम्॥',
      script: {
        od: 'ଚରିତଂ ରଘୁନାଥସ୍ୟ ଶତ କୋଟି ପ୍ରବିସ୍ତରଂ।\nଏକୈକ ଅକ୍ଷରଂ ପୁଂସାଂ ମହା ପାତକ ନାଶନଂ॥',
        te: 'చరితం రఘునాథస్య శత కోటి ప్రవిస్తరం।\nఏకైక అక్షరం పుంసాం మహా పాతక నాశనం॥',
      },
      meaning: {
        en: 'The story of Raghunatha (Ram) is spread over a hundred crore verses. Every single letter of Ram\'s name destroys the greatest of sins. Such is the supreme power of the name of Ram.',
        hi: 'रघुनाथ (राम) की कथा सौ करोड़ श्लोकों में फैली है। राम नाम का एक-एक अक्षर महापापों का नाश करने वाला है। यही राम नाम की अपार महिमा है।',
        od: 'ରଘୁନାଥ (ରାମ) ର କଥା ଶତ କୋଟି ଶ୍ଲୋକରେ ବ୍ୟାପ୍ତ। ରାମ ନାମ ର ଏକ ଏକ ଅକ୍ଷର ମହା ପାପ ନଷ୍ଟ କରେ। ଏହା ରାମ ନାମ ର ଅସୀମ ମହିମା।',
        te: 'రఘునాథుని (రాముని) కథ వందకోట్ల శ్లోకాలలో వ్యాపించి ఉంది. రామ నామం యొక్క ఒక్కో అక్షరం మహా పాపాలను నాశనం చేస్తుంది. ఇదే రామ నాముని అపార మహిమ.',
      },
    },
    {
      id: 'rrs-2',
      type: 'shloka',
      num: 2,
      transliteration: 'Dhyaayet Aajaaanu Baahum Dhrita Shara Dhanusham\nPeetam Vaaso Vasaanam Nava Kamala Dala Spardhina Netraam Prasannam',
      original: 'ध्यायेद् आजानुबाहुं धृतशरधनुषं\nबद्धपद्मासनस्थम्।\nपीतं वासो वसानं नवकमलदल\nस्पर्धिनेत्रं प्रसन्नम्॥',
      script: {
        od: 'ଧ୍ୟାୟେଦ୍ ଆଜାନୁ ବାହୁଂ ଧୃତ ଶର ଧନୁଷଂ\nବଦ୍ଧ ପଦ୍ମାସନ ସ୍ଥଂ।\nପୀତଂ ବାସୋ ବସାନଂ ନବ କମଳ ଦଳ\nସ୍ପର୍ଦ୍ଧି ନେତ୍ରଂ ପ୍ରସନ୍ନଂ॥',
        te: 'ధ్యాయేద్ ఆజానుబాహుం ధృత శర ధనుషం\nబద్ధ పద్మాసన స్థం।\nపీతం వాసో వసానం నవ కమల దళ\nస్పర్ధి నేత్రం ప్రసన్నం॥',
      },
      meaning: {
        en: 'Meditate on Lord Ram whose arms reach to his knees, holding bow and arrows, seated in Padmasana. He wears yellow garments, his eyes rival the freshly bloomed lotus petals, and his face glows with divine grace and peace.',
        hi: 'भगवान राम का ध्यान करें जिनकी भुजाएं घुटनों तक लंबी हैं, जो धनुष-बाण धारण किए हैं, पद्मासन में बैठे हैं, पीले वस्त्र धारण किए हैं, जिनके नेत्र नव कमल दल को मात देते हैं और मुखमंडल प्रसन्न है।',
        od: 'ଭଗବାନ ରାମଙ୍କୁ ଧ୍ୟାନ କରନ୍ତୁ — ଯାଙ୍କ ଭୁଜ ଆଣ୍ଠୁ ପର୍ଯ୍ୟନ୍ତ ଲମ୍ବା, ଧନୁ-ବାଣ ଧାରଣ କରିଛନ୍ତି, ପଦ୍ମାସନ, ହଳଦୀ ବସ୍ତ୍ର, ନୂତନ କମଳ ଦଳ ସମ ନୟନ ଓ ପ୍ରସନ୍ନ ମୁଖ।',
        te: 'మోకాళ్ళ వరకు చేతులు ఉన్న, ధనుర్బాణాలు ధరించిన, పద్మాసనంలో కూర్చున్న, పీతాంబరం ధరించిన, నూతనంగా విరిసిన తామర రేకులతో పోటీపడే కళ్ళు ఉన్న, ప్రసన్న వదనంతో ఉన్న శ్రీ రాముని ధ్యానించండి.',
      },
    },
    {
      id: 'rrs-3',
      type: 'shloka',
      num: 3,
      transliteration: 'Raamo Raajamani Sadaa Vijayate Raamam Ramesham Bhaje\nRaamena Abhihataa Nishaachara Chamoo Raamaaya Tasmai Namah\nRaamaanna Asti Parayanam Paratarah Raamasya Daaso Asmyaham\nRaame Chitta Layah Sadaa Bhavatu Me Bho Raam Maam Uddhara',
      original: 'रामो राजमणि: सदा विजयते रामं रमेशं भजे।\nरामेणाभिहता निशाचरचमू रामाय तस्मै नम:॥\nरामान्नास्ति परायणं परतरं रामस्य दासोऽस्म्यहम्।\nरामे चित्तलय: सदा भवतु मे भो राम मामुद्धर॥',
      script: {
        od: 'ରାମୋ ରାଜ ମଣି ସଦା ବିଜୟତେ ରାମଂ ରମେଶଂ ଭଜେ।\nରାମେଣ ଅଭିହତା ନିଶାଚର ଚମୂ ରାମାୟ ତସ୍ମୈ ନମଃ॥\nରାମ ଚିତ୍ତ ଲୟ ସଦା ଭବତୁ ମେ ଭୋ ରାମ ମାଂ ଉଦ୍ଧର॥',
        te: 'రామో రాజ మణి సదా విజయతే రామం రమేశం భజే।\nరామేణ అభిహతా నిశాచర చమూ రామాయ తస్మై నమః॥\nరామే చిత్త లయః సదా భవతు మే భో రామ మాం ఉద్ధర॥',
      },
      meaning: {
        en: 'Ram, the jewel among kings, always prevails. I worship Ram, the lord of Ramaa (Lakshmi). By Ram, demon armies were destroyed — salutations to that Ram. There is no greater refuge than Ram. I am Ram\'s devotee. May my mind always be absorbed in Ram. O Ram, please uplift and liberate me!',
        hi: 'राजाओं के मणि राम सदा विजयी रहते हैं। मैं राम को भजता हूं। राम ने राक्षसों की सेना का नाश किया। राम से परे कोई आश्रय नहीं। मैं राम का दास हूं। मेरा मन सदा राम में लीन रहे। हे राम! मेरा उद्धार करो।',
        od: 'ରାଜ ମଣି ରାମ ସଦା ବିଜୟୀ। ରାଙ୍କୁ ଭଜ। ରାମ ରାକ୍ଷସ ସୈନ୍ୟ ନଷ୍ଟ କଲେ। ରାମ ଠାରୁ ଉଚ୍ଚ ଆଶ୍ରୟ ନାହିଁ। ମୁଁ ରାମ ଦାସ। ମୋ ମନ ସଦା ରାମଙ୍କ ଠାରେ ଲୀନ ରହୁ। ହେ ରାମ! ମୋ ଉଦ୍ଧାର କର।',
        te: 'రాజ మణి రాముడు ఎల్లప్పుడూ విజయం పొందుతాడు. రాముని భజిస్తాను. రాముడు రాక్షస సైన్యాన్ని నాశనం చేశాడు. రాముని కంటే గొప్ప శరణు లేదు. నేను రాముని దాసుడిని. నా మనసు ఎల్లప్పుడూ రాముని యందు లీనమగుగాక. ఓ రామా! నన్ను ఉద్ధరించు.',
      },
    },
    {
      id: 'rrs-4',
      type: 'shloka',
      num: 4,
      transliteration: 'Raama Raama Rameti Rame Raame Mano Rame\nSahasra Naama Tat Tulyam Raama Naama Vara Aanane',
      original: 'राम राम रामेति रमे रामे मनोरमे।\nसहस्रनामतत्तुल्यं रामनाम वरानने॥',
      script: {
        od: 'ରାମ ରାମ ରାମେତି ରମେ ରାମେ ମନୋ ରମେ।\nସହସ୍ର ନାମ ତତ ତୁଲ୍ୟଂ ରାମ ନାମ ବରାନନେ॥',
        te: 'రామ రామ రామేతి రమే రామే మనోరమే।\nసహస్ర నామ తత్ తుల్యం రామ నామ వరాననే॥',
      },
      meaning: {
        en: 'O beautiful one, I delight in the name Ram, Ram, Ram — my mind is absorbed in Ram. Chanting the name Ram once equals the merit of reciting all thousand names of Vishnu (Vishnu Sahasranamam). Such is the infinite power of Ram\'s name.',
        hi: 'हे सुन्दरी, मैं राम राम राम नाम में रमता हूं — मेरा मन राम में लीन है। राम नाम एक बार जपना, विष्णु सहस्रनाम के समान फल देता है। यही राम नाम की अनंत शक्ति है।',
        od: 'ହେ ସୁନ୍ଦରୀ, ମୁଁ ରାମ ରାମ ରାମ ନାମରେ ରମ — ମୋ ମନ ରାମ ଠାରେ ଲୀନ। ରାମ ନାମ ଏକ ଥର ଜପ ବିଷ୍ଣୁ ସହସ୍ର ନାମ ଫଳ ଦିଏ। ଏହା ରାମ ନାମ ର ଅସୀମ ଶକ୍ତି।',
        te: 'ఓ సుందరి, రామ రామ రామ అని నేను ఆనందంగా జపిస్తాను — నా మనసు రాముని యందు లీనమైంది. రామ నామం ఒక్కసారి జపించడం వెయ్యి విష్ణు నామాలు జపించినంత ఫలాన్ని ఇస్తుంది.',
      },
    },
    {
      id: 'rrs-5',
      type: 'shloka',
      num: 5,
      transliteration: 'Raamaskandam Hanumantam Vainateyam Vrikodaram\nShayane Yah Smarennityam Dushswapnam Tasya Nashyati',
      original: 'रामस्कन्दं हनुमन्तं वैनतेयं वृकोदरम्।\nशयने यः स्मरेन्नित्यं दुःस्वप्नं तस्य नश्यति॥',
      script: {
        od: 'ରାମ ସ୍କନ୍ଧଂ ହନୁମନ୍ତଂ ବୈନତେୟଂ ବୃକୋଦରଂ।\nଶୟନେ ଯଃ ସ୍ମରେନ୍ ନିତ୍ୟଂ ଦୁଃ ସ୍ୱପ୍ନଂ ତସ୍ୟ ନଶ୍ୟତି॥',
        te: 'రామ స్కంధం హనుమంతం వైనతేయం వృకోదరం।\nశయనే యః స్మరేన్ నిత్యం దుఃస్వప్నం తస్య నశ్యతి॥',
      },
      meaning: {
        en: 'One who meditates nightly on Ram, Hanuman, Garuda (Vainateyam), and Bhima (Vrikodara) before sleeping — all their bad dreams and nightmares are completely destroyed. This is the divine promise of Ram Raksha Stotram.',
        hi: 'जो व्यक्ति प्रतिदिन रात को सोने से पहले राम, हनुमान, गरुड़ और भीम का ध्यान करता है — उसके सभी दुःस्वप्न नष्ट हो जाते हैं। यह राम रक्षा स्तोत्र का दिव्य वरदान है।',
        od: 'ଯିଏ ପ୍ରତ୍ୟେକ ରାତ୍ରି ଶୟନ ସମୟ ରାମ, ହନୁମାନ, ଗରୁଡ଼ ଓ ଭୀମଙ୍କୁ ସ୍ମରଣ କରନ୍ତି — ତାଙ୍କ ସମସ୍ତ ଦୁଃ ସ୍ୱପ୍ନ ନଷ୍ଟ ହୁଏ। ଏହା ରାମ ରକ୍ଷା ସ୍ତୋତ୍ରର ଦିବ୍ୟ ବରଦାନ।',
        te: 'ప్రతి రాత్రి నిద్రకు ముందు రాముడు, హనుమంతుడు, గరుడుడు మరియు భీముని స్మరించే వారి చెడు కలలు అన్నీ నశించిపోతాయి. ఇది రామ రక్షా స్తోత్రం యొక్క దివ్య వరదానం.',
      },
    },
    {
      id: 'rrs-6',
      type: 'shloka',
      num: 6,
      transliteration: 'Sarva Rogaani Nashyanti Sarva Baadhaa Nivartate\nRaama Rakshaa Param Mangalam Idam Shrimat Ramaayanam',
      original: 'सर्वरोगाः प्रणश्यन्ति सर्वे बाधाः निवर्तते।\nरामरक्षा परं मंगलं इदं श्रीमद् रामायणम्॥',
      script: {
        od: 'ସର୍ବ ରୋଗ ପ୍ରଣଶ୍ୟନ୍ତି ସର୍ବ ବାଧା ନିବର୍ତ୍ତତେ।\nରାମ ରକ୍ଷା ପରଂ ମଂଗଳଂ ଇଦଂ ଶ୍ରୀ ମଦ ରାମାୟଣଂ॥',
        te: 'సర్వ రోగాః ప్రణశ్యంతి సర్వే బాధాః నివర్తతే।\nరామ రక్షా పరం మంగళం ఇదం శ్రీమద్ రామాయణం॥',
      },
      meaning: {
        en: 'All diseases are destroyed. All obstacles and difficulties completely vanish. The Ram Raksha Stotram is the most auspicious prayer — equivalent in glory to the sacred Shrimad Ramayana itself. Recite it daily for divine protection.',
        hi: 'सभी रोग नष्ट हो जाते हैं। सभी बाधाएं और कठिनाइयां दूर हो जाती हैं। राम रक्षा स्तोत्र परम मंगलकारी है — श्रीमद् रामायण के समतुल्य। इसका नित्य पाठ दिव्य रक्षा प्रदान करता है।',
        od: 'ସମସ୍ତ ରୋଗ ନଷ୍ଟ ହୁଏ। ସମସ୍ତ ବାଧା ଦୂର ହୁଏ। ରାମ ରକ୍ଷା ସ୍ତୋତ୍ର ପରମ ମଙ୍ଗଳ — ଶ୍ରୀ ରାମାୟଣ ସ‌ହ ସ‌ମ‌ଭୂ। ନିତ୍ୟ ପାଠ ଦିବ୍ୟ ରକ୍ଷା ଦିଏ।',
        te: 'అన్ని రోగాలు నశించిపోతాయి. అన్ని అడ్డంకులు తొలగిపోతాయి. రామ రక్షా స్తోత్రం పరమ మంగళకరమైనది — శ్రీమద్ రామాయణానికి సమానమైనది. రోజూ పఠించడం వలన దివ్య రక్ష లభిస్తుంది.',
      },
    },
  ],
};

// ── 2. ADITYA HRIDAYAM ──────────────────────────────────────────────────────
export const adityaHridayam = {
  verses: [
    {
      id: 'ah-1',
      type: 'shloka',
      num: 1,
      transliteration: 'Tato Yuddha Parishraantam Samare Chintayaa Sthitam\nRaavanam Chaagrato Drishtva Yuddhaaya Samupasthitam',
      original: 'ततो युद्धपरिश्रान्तं समरे चिन्तया स्थितम्।\nरावणं चाग्रतो दृष्ट्वा युद्धाय समुपस्थितम्॥\nदैवतैश्च समागम्य द्रष्टुमभ्यागतो रणम्।\nउपागम्याब्रवीद्रामं अगस्त्यो भगवांस्तदा॥',
      script: {
        od: 'ତତୋ ଯୁଦ୍ଧ ପରିଶ୍ରାନ୍ତଂ ସମରେ ଚିନ୍ତୟା ସ୍ଥିତଂ।\nରାବଣଂ ଚ ଅଗ୍ରତୋ ଦୃଷ୍ଟ୍ୱା ଯୁଦ୍ଧାୟ ସମୁପ ସ୍ଥିତଂ॥\nଅଗସ୍ତ୍ୟ ଭଗବାନ ରାମ ସମୀପ ଆସି କହିଲେ॥',
        te: 'తతో యుద్ధ పరిశ్రాంతం సమరే చింతయా స్థితం।\nరావణం చ అగ్రతో దృష్ట్వా యుద్ధాయ సముప స్థితం॥\nఉపాగమ్య అబ్రవీద్ రామం అగస్త్య భగవాన్ తదా॥',
      },
      meaning: {
        en: 'After the long exhausting battle, Ram stood weary and worried, seeing Ravana standing before him ready to fight again. At that very moment, the great sage Agastya — who had come along with the gods to watch the battle — approached Ram and spoke these words.',
        hi: 'लंबे युद्ध के बाद राम थके और चिंतित खड़े थे, सामने रावण को युद्ध के लिए तैयार देख रहे थे। उसी क्षण महर्षि अगस्त्य — जो देवताओं के साथ युद्ध देखने आए थे — राम के पास आए और ये वचन बोले।',
        od: 'ଦୀର୍ଘ ଯୁଦ୍ଧ ପରେ ରାମ ଥକି ଚିନ୍ତିତ ଠିଆ ହୋଇ ଥିଲେ, ସାମ‌ନ‌ ରାବଣ ଯୁଦ୍ଧ ପ୍ରସ୍ତୁତ। ସେ ସ‌ମ‌ୟ‌ ଅଗ‌ସ‌ ଋ‌ଷ‌ ରାମ ନ‌ିକ‌ ଆ‌ସ‌ ଏ‌ ବ‌ଚ‌ ଉ‌ଚ‌ ଲ‌।',
        te: 'సుదీర్ఘ యుద్ధం తర్వాత రాముడు అలసిపోయి ఆందోళనగా నిల్చున్నాడు. ముందు రావణుడు మళ్ళీ యుద్ధానికి సిద్ధంగా ఉన్నాడు. ఆ సమయంలో మహర్షి అగస్త్యుడు రాముని వద్దకు వచ్చి ఈ మాటలు చెప్పాడు.',
      },
    },
    {
      id: 'ah-2',
      type: 'shloka',
      num: 2,
      transliteration: 'Aditya Hridayam Punyam Sarva Shatru Vinaashanam\nJayaavaham Japennityam Akshayam Paramam Shivam',
      original: 'आदित्यहृदयं पुण्यं सर्वशत्रुविनाशनम्।\nजयावहं जपेन्नित्यं अक्षयं परमं शिवम्॥',
      script: {
        od: 'ଆଦ‌ ହୃ‌ ପ‌ ସ‌ ଶ‌ ବ‌‌।\nଜ‌ ଆ‌ ଜ‌ ‌ ‌ ‌ ‌ ‌ ‌॥\nଆଦ‌ଇ‌ ହ‌ ପ‌ ସ‌ ‌ ‌‌ ‌।\nଜ‌ ‌ ‌ ‌‌ ‌ ‌ ‌ ‌ ‌॥',
        te: 'ఆద‌ ‌ ‌ ‌ ‌ ‌‌ ‌।\n‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌॥',
      },
      meaning: {
        en: 'The Aditya Hridayam is sacred and destroys all enemies. Chanting it daily brings victory — it is imperishable and grants supreme auspiciousness. O Ram, chant this heart-mantra of the Sun God and you shall conquer Ravana today!',
        hi: 'आदित्यहृदयम् पवित्र है और सभी शत्रुओं का नाश करता है। प्रतिदिन जपने से विजय मिलती है — यह अमर और परम शुभ है। हे राम, सूर्यदेव का यह हृदय मंत्र जपो और आज रावण पर विजय पाओ!',
        od: 'ଆଦ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌‌। ‌ ‌ ‌ ‌‌ ‌ ‌ ‌‌ ‌‌। ‌ ‌, ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌!',
        te: 'ఆదిత్య హృదయం పవిత్రమైనది మరియు అన్ని శత్రువులను నాశనం చేస్తుంది. ప్రతిరోజు జపిస్తే విజయం లభిస్తుంది — ఇది అమరమైనది మరియు పరమ శుభకరమైనది. ఓ రామా, సూర్య దేవుని ఈ హృదయ మంత్రాన్ని జపించి రావణుడిని జయించు!',
      },
    },
    {
      id: 'ah-3',
      type: 'shloka',
      num: 3,
      transliteration: 'Sarva Mangala Maangalye Shive Sarvartha Saadhike\nSharanye Tryambake Gauri Naaraayanee Namo\'stu Te',
      original: 'सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके।\nशरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते॥',
      script: {
        od: 'ସ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌।\n‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌॥',
        te: 'సర్వ మంగళ మాంగళ్యే శివే సర్వార్థ సాధికే।\nశరణ్యే త్ర్యంబకే గౌరి నారాయణి నమో\'స్తు తే॥',
      },
      meaning: {
        en: 'O Narayani — you are the auspiciousness among all auspicious things, the benevolent one, the fulfiller of all purposes. O three-eyed Gauri, the refuge of all beings — I bow to you. This verse invokes divine grace before the Sun worship begins.',
        hi: 'हे नारायणी — आप सब मंगलों में मंगलकारी हैं, कल्याणी हैं, सभी कार्यों को सिद्ध करने वाली हैं। हे त्रिनेत्री गौरी, सबकी शरण — आपको नमस्कार। यह श्लोक सूर्य उपासना से पूर्व दिव्य कृपा का आह्वान करता है।',
        od: 'ହେ ‌ ‌ — ‌ ‌ ‌ ‌ ‌ ‌ ‌, ‌ ‌ ‌ ‌ ‌। ‌ ‌ ‌ ‌ ‌ ‌ ‌ — ‌ ‌ ‌।',
        te: 'ఓ నారాయణి — మీరు అన్ని మంగళాలలో శ్రేష్ఠమైనది, కళ్యాణి, అన్ని కార్యాలు సాధించేవారు. ఓ మూడు కళ్ళ గౌరి, అందరికీ శరణ్యురాలు — మీకు నమస్కారం.',
      },
    },
    {
      id: 'ah-4',
      type: 'shloka',
      num: 4,
      transliteration: 'Esa Brahma Cha Vishnuscha Shivah Skandah Prajaapatih\nMahendro Dhanadah Kaalo Yamah Somo Hyapaam Patih',
      original: 'एष ब्रह्मा च विष्णुश्च शिवः स्कन्दः प्रजापतिः।\nमहेन्द्रो धनदः कालो यमः सोमो ह्यपां पतिः॥',
      script: {
        od: 'ଏ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌।\n‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌॥',
        te: 'ఏష బ్రహ్మా చ విష్ణుశ్చ శివః స్కందః ప్రజాపతిః।\nమహేంద్రో ధనదః కాలో యమః సోమో హ్యపాం పతిః॥',
      },
      meaning: {
        en: 'The Sun (Aditya) himself is Brahma, Vishnu, and Shiva. He is Skanda (Kartikeya) and Prajapati (creator). He is Mahendra (Indra), Kubera (god of wealth), Kala (time), Yama (god of death), Soma (Moon), and the lord of waters. All gods reside in the Sun.',
        hi: 'सूर्य स्वयं ब्रह्मा, विष्णु और शिव हैं। वह स्कंद और प्रजापति हैं। वह महेंद्र, कुबेर, काल, यम, सोम और जल के स्वामी हैं। सभी देवता सूर्य में निवास करते हैं।',
        od: 'ସ‌ ‌ ‌ ‌ ‌ ‌ ‌। ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌।',
        te: 'సూర్యుడే స్వయంగా బ్రహ్మ, విష్ణు మరియు శివుడు. ఆయనే స్కంద మరియు ప్రజాపతి. ఆయనే మహేంద్ర, కుబేర, కాల, యమ, సోమ మరియు జలాల అధిపతి. సమస్త దేవతలూ సూర్యుని యందు నివసిస్తారు.',
      },
    },
    {
      id: 'ah-5',
      type: 'mantra',
      num: 5,
      transliteration: 'Om Suryaya Namah · Om Adityaya Namah · Om Bhanave Namah\nOm Khagaya Namah · Om Pushne Namah · Om Hiranyagarbhaya Namah\nOm Marichaye Namah · Om Adityaya Namah · Om Savitre Namah\nOm Arkaya Namah · Om Bhaskaraya Namah · Om Shri Savitra Suryanarayanaya Namah',
      original: 'ॐ सूर्याय नमः। ॐ आदित्याय नमः। ॐ भानवे नमः।\nॐ खगाय नमः। ॐ पूष्णे नमः। ॐ हिरण्यगर्भाय नमः।\nॐ मरीचये नमः। ॐ आदित्याय नमः। ॐ सवित्रे नमः।\nॐ अर्काय नमः। ॐ भास्कराय नमः। ॐ श्री सवित्र सूर्यनारायणाय नमः॥',
      script: {
        od: 'ଓଁ ସୂ‌ ‌ ‌। ଓଁ ‌ ‌ ‌। ଓଁ ‌ ‌ ‌।\nଓଁ ‌ ‌ ‌। ଓଁ ‌ ‌ ‌। ଓଁ ‌ ‌ ‌ ‌ ‌ ‌।\nଓଁ ‌ ‌ ‌। ଓଁ ‌ ‌ ‌। ଓଁ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌॥',
        te: 'ఓం సూర్యాయ నమః। ఓం ఆదిత్యాయ నమః। ఓం భానవే నమః।\nఓం ఖగాయ నమః। ఓం పూష్ణే నమః। ఓం హిరణ్య గర్భాయ నమః।\nఓం మరీచయే నమః। ఓం సవిత్రే నమః।\nఓం అర్కాయ నమః। ఓం భాస్కరాయ నమః। ఓం శ్రీ సూర్య నారాయణాయ నమః॥',
      },
      meaning: {
        en: 'Salutations to Surya (Sun), Aditya (son of Aditi), Bhanu (luminous), Khaga (sky-traveler), Pushna (nourisher), Hiranyagarbha (golden-wombed), Marichi (ray of light), Savitri (energizer), Arka (radiant), Bhaskara (maker of light), and Shri Savitru Surya Narayana — twelve divine names of the Sun, each representing a different cosmic power.',
        hi: 'सूर्य, आदित्य, भानु, खग, पूषन, हिरण्यगर्भ, मरीचि, सवितृ, अर्क, भास्कर और श्री सूर्य नारायण — सूर्यदेव के बारह दिव्य नामों को नमस्कार, जिनमें से हर नाम एक अलग ब्रह्मांडीय शक्ति का प्रतिनिधित्व करता है।',
        od: 'ସ‌ ‌, ‌ ‌, ‌ ‌, ‌ ‌, ‌ ‌, ‌ ‌, ‌ ‌, ‌ ‌, ‌ ‌, ‌ ‌, ‌ ‌ ‌ ‌ ‌ — ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌।',
        te: 'సూర్య, ఆదిత్య, భాను, ఖగ, పూషన, హిరణ్యగర్భ, మరీచి, సవితృ, అర్క, భాస్కర మరియు శ్రీ సూర్య నారాయణ — సూర్య దేవుని పన్నెండు దివ్య నామాలకు నమస్కారం, ఒక్కో నామం ఒక్కో బ్రహ్మాండ శక్తిని సూచిస్తుంది.',
      },
    },
  ],
};

// ── 3. NAVAGRAHA STOTRAM ─────────────────────────────────────────────────────
export const navagrahaStotram = {
  verses: [
    {
      id: 'ng-1',
      type: 'shloka',
      num: 1,
      transliteration: 'Japaa Kusuma Sankasham Kaashyapeyam Mahaa Dyutim\nTamorim Sarva Paapahnam Pranato\'smi Divaakaram',
      original: 'जपाकुसुमसंकाशं काश्यपेयं महाद्युतिम्।\nतमोरिं सर्वपापघ्नं प्रणतोऽस्मि दिवाकरम्॥',
      script: {
        od: 'ଜ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌।\n‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌॥',
        te: 'జపా కుసుమ సంకాశం కాశ్యపేయం మహా ద్యుతిం।\nతమో రిం సర్వ పాప ఘ్నం ప్రణతో\'స్మి దివాకరం॥',
      },
      meaning: {
        en: 'I bow to Surya (the Sun God), who resembles the red hibiscus flower (Japa Kusuma), who is the son of Kashyapa, radiating immense brilliance, who is the enemy of darkness, and who destroys all sins of those who bow to him.',
        hi: 'मैं सूर्यदेव को प्रणाम करता हूं जो जवाकुसुम के समान लाल हैं, कश्यप पुत्र हैं, अत्यंत तेजस्वी हैं, अंधकार के शत्रु हैं और सभी पापों का नाश करते हैं।',
        od: 'ମ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌, ‌ ‌ ‌, ‌ ‌ ‌ ‌ ‌ ‌ ‌।',
        te: 'జపా కుసుమం వంటి రంగులో ఉన్న, కశ్యపుని కుమారుడు, అత్యంత తేజస్వి, చీకటికి శత్రువు, అన్ని పాపాలను నాశనం చేసే సూర్య దేవుడికి నమస్కరిస్తున్నాను।',
      },
    },
    {
      id: 'ng-2',
      type: 'shloka',
      num: 2,
      transliteration: 'Dadhi Shankha Tusharaabham Kshirodarnava Sambhavam\nNamaami Shashinam Somam Shambhor Mukuta Bhooshanam',
      original: 'दधिशंखतुषाराभं क्षीरोदार्णवसम्भवम्।\nनमामि शशिनं सोमं शम्भोर्मुकुटभूषणम्॥',
      script: {
        od: 'ଦ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌।\n‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌॥',
        te: 'దధి శంఖ తుషారాభం క్షీరోదార్ణవ సంభవం।\nనమామి శశినం సోమం శంభోర్ముకుట భూషణం॥',
      },
      meaning: {
        en: 'I bow to Chandra (Moon/Soma), who is white like curd, conch, and snow, who arose from the ocean of milk (Kshirasagara) during Samudra Manthan, and who adorns the crown of Lord Shiva (Shambhu).',
        hi: 'मैं चंद्रमा (सोम) को नमस्कार करता हूं जो दही, शंख और बर्फ के समान श्वेत हैं, क्षीरसागर मंथन से उत्पन्न हैं और भगवान शिव के मुकुट की शोभा बढ़ाते हैं।',
        od: '‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌।',
        te: 'పెరుగు, శంఖం మరియు మంచు వలె తెల్లగా ఉన్న, పాలసముద్రం మథనంలో పుట్టిన, శివుని కిరీటాన్ని అలంకరించే చంద్రుడికి నమస్కరిస్తున్నాను.',
      },
    },
    {
      id: 'ng-3',
      type: 'shloka',
      num: 3,
      transliteration: 'Dharanee Garbha Sambhootam Vidyut Kaanti Samaprabhaam\nKumaram Shakti Hastam Tam Mangalam Pranamamyaham',
      original: 'धरणीगर्भसम्भूतं विद्युत्कान्तिसमप्रभम्।\nकुमारं शक्तिहस्तं तं मंगलं प्रणमाम्यहम्॥',
      script: {
        od: '‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌।\n‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌॥',
        te: 'ధరణీ గర్భ సంభూతం విద్యుత్ కాంతి సమ ప్రభం।\nకుమారం శక్తి హస్తం తం మంగళం ప్రణమామ్యహం॥',
      },
      meaning: {
        en: 'I bow to Mangala (Mars), born from the womb of the Earth, whose brilliance equals lightning, who is eternally youthful (Kumara), and who holds the Shakti (spear) weapon in his hand. He governs property, siblings, courage, and physical energy.',
        hi: 'मैं मंगल ग्रह को प्रणाम करता हूं जो पृथ्वी गर्भ से उत्पन्न हैं, विद्युत के समान कांतिमान हैं, सदा युवा (कुमार) हैं और शक्ति अस्त्र धारण करते हैं। वे संपत्ति, भाई-बहन, साहस और शारीरिक ऊर्जा के स्वामी हैं।',
        od: '‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌, ‌ ‌ ‌, ‌ ‌ ‌, ‌ ‌ ‌ ‌।',
        te: 'పృథ్వీ గర్భం నుండి జన్మించిన, మెరుపు వంటి కాంతి గల, శాశ్వత యువకుడు, శక్తి ఆయుధం ధరించిన మంగళుడికి నమస్కరిస్తున్నాను. ఆయన ఆస్తి, సోదరులు, ధైర్యం పాలకుడు.',
      },
    },
    {
      id: 'ng-4',
      type: 'shloka',
      num: 4,
      transliteration: 'Priyangukalikaashyaamam Roopenaaapratimam Budham\nSaumyam Saumaguno Petam Tam Budham Pranamamyaham',
      original: 'प्रियंगुकलिकाश्यामं रूपेणाप्रतिमं बुधम्।\nसौम्यं सौम्यगुणोपेतं तं बुधं प्रणमाम्यहम्॥',
      script: {
        od: '‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌।\n‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌॥',
        te: 'ప్రియంగు కళికా శ్యామం రూపేణ అప్రతిమం బుధం।\nసౌమ్యం సౌమ్య గుణోపేతం తం బుధం ప్రణమామ్యహం॥',
      },
      meaning: {
        en: 'I bow to Budha (Mercury), who is dark like the priyangu creeper blossom, of incomparable beauty, gentle by nature (Saumya), and endowed with all good qualities. Mercury governs intelligence, communication, trade, and education.',
        hi: 'मैं बुध ग्रह को प्रणाम करता हूं जो प्रियंगु की कली के समान श्यामवर्ण हैं, अतुलनीय सुंदरता वाले हैं, स्वभाव से सौम्य हैं और सद्गुणों से युक्त हैं। बुध बुद्धि, संचार, व्यापार और शिक्षा के स्वामी हैं।',
        od: '‌ ‌ ‌ ‌ ‌, ‌ ‌ ‌, ‌ ‌, ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌।',
        te: 'ప్రియంగు మొగ్గ వలె శ్యామవర్ణంతో, అతులనీయ సౌందర్యంతో, సౌమ్య స్వభావంతో, మంచి గుణాలతో ఉన్న బుధుడికి నమస్కరిస్తున్నాను. బుధుడు బుద్ధి, వ్యాపారం, విద్య పాలకుడు.',
      },
    },
    {
      id: 'ng-5',
      type: 'shloka',
      num: 5,
      transliteration: 'Devaanaam Cha Risheenaam Cha Gurum Kaanchana Sannibham\nBuddhibhootam Trilokesham Tam Namaami Brihaspatim',
      original: 'देवानां च ऋषीणां च गुरुं कांचनसन्निभम्।\nबुद्धिभूतं त्रिलोकेशं तं नमामि बृहस्पतिम्॥',
      script: {
        od: '‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌।\n‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌॥',
        te: 'దేవానాం చ ఋషీణాం చ గురుం కాంచన సన్నిభం।\nబుద్ధి భూతం త్రిలోకేశం తం నమామి బృహస్పతిం॥',
      },
      meaning: {
        en: 'I bow to Guru (Jupiter/Brihaspati), the preceptor of all gods and sages, who shines like pure gold, who is the very embodiment of wisdom and intelligence, and who is the lord of the three worlds. Jupiter governs wisdom, children, prosperity, and spirituality.',
        hi: 'मैं गुरु बृहस्पति को नमस्कार करता हूं जो देवों और ऋषियों के गुरु हैं, शुद्ध सोने के समान कांतिमान हैं, बुद्धि के साक्षात स्वरूप हैं और तीनों लोकों के स्वामी हैं। गुरु ज्ञान, संतान, समृद्धि और अध्यात्म के स्वामी हैं।',
        od: '‌ ‌ ‌ ‌, ‌ ‌ ‌, ‌ ‌ ‌, ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌।',
        te: 'దేవతలకు మరియు ఋషులకు గురువు, స్వచ్ఛమైన బంగారం వలె ప్రకాశించే, జ్ఞానస్వరూపుడు, మూడు లోకాల అధిపతి అయిన బృహస్పతికి నమస్కరిస్తున్నాను.',
      },
    },
    {
      id: 'ng-6',
      type: 'shloka',
      num: 6,
      transliteration: 'Himakundha Mrinaalabham Daityanaam Paramam Gurum\nSarva Shastra Pravaktaaram Bhargavam Pranamamyaham',
      original: 'हिमकुन्दमृणालाभं दैत्यानां परमं गुरुम्।\nसर्वशास्त्रप्रवक्तारं भार्गवं प्रणमाम्यहम्॥',
      script: {
        od: '‌ ‌ ‌ ‌ ‌ ‌।\n‌ ‌ ‌ ‌ ‌ ‌॥',
        te: 'హిమ కుంద మృణాళాభం దైత్యానాం పరమం గురుం।\nసర్వ శాస్త్ర ప్రవక్తారం భార్గవం ప్రణమామ్యహం॥',
      },
      meaning: {
        en: 'I bow to Shukra (Venus/Bhargava), who is white like snow, jasmine, and lotus stalk, who is the supreme preceptor of the demons (Asuras), and who is the master of all sacred sciences (Shastras). Venus governs love, beauty, luxury, relationships, and creativity.',
        hi: 'मैं शुक्र (भार्गव) को प्रणाम करता हूं जो बर्फ, कुंद के फूल और कमल नाल के समान श्वेत हैं, दैत्यों के परम गुरु हैं और सभी शास्त्रों के प्रवक्ता हैं। शुक्र प्रेम, सुंदरता, विलास, संबंध और सृजनशीलता के स्वामी हैं।',
        od: '‌ ‌ ‌ ‌ ‌ ‌ ‌, ‌ ‌ ‌, ‌ ‌ ‌ ‌।',
        te: 'మంచు, మల్లె మరియు తామర కాడ వలె తెల్లగా ఉన్న, రాక్షసుల పరమ గురువు, సర్వ శాస్త్రాల నిపుణుడు అయిన శుక్రుడికి నమస్కరిస్తున్నాను.',
      },
    },
    {
      id: 'ng-7',
      type: 'shloka',
      num: 7,
      transliteration: 'Neelanjana Samaabhasam Ravim Putram Yamaagrajam\nChaayaa Maartanda Sambhootam Tam Namaami Shanaishcharam',
      original: 'नीलांजनसमाभासं रविपुत्रं यमाग्रजम्।\nछायामार्तण्डसम्भूतं तं नमामि शनैश्चरम्॥',
      script: {
        od: '‌ ‌ ‌ ‌ ‌ ‌।\n‌ ‌ ‌ ‌ ‌ ‌॥',
        te: 'నీలాంజన సమాభాసం రవి పుత్రం యమాగ్రజం।\nఛాయా మార్తండ సంభూతం తం నమామి శనైశ్చరం॥',
      },
      meaning: {
        en: 'I bow to Shani (Saturn), who has the appearance of blue collyrium (Nilanjana), who is the son of Surya (Ravi Putra), the elder brother of Yama (god of death), and who was born of Chhaya and Martanda (Sun). Shani governs karma, discipline, justice, and hard work.',
        hi: 'मैं शनि को नमस्कार करता हूं जो नीले काजल के समान वर्ण के हैं, सूर्यपुत्र हैं, यमराज के बड़े भाई हैं और छाया-मार्तंड के पुत्र हैं। शनि कर्म, अनुशासन, न्याय और परिश्रम के स्वामी हैं।',
        od: '‌ ‌ ‌ ‌ ‌, ‌ ‌ ‌, ‌ ‌ ‌ ‌ ‌ ‌ ‌।',
        te: 'నీలపు కాటుక వంటి రూపం గల, సూర్యుని కుమారుడు, యముని అన్న, ఛాయ మరియు సూర్యుని నుండి జన్మించిన శనైశ్చరుడికి నమస్కరిస్తున్నాను.',
      },
    },
    {
      id: 'ng-8',
      type: 'shloka',
      num: 8,
      transliteration: 'Ardha Kaayam Mahaa Veeryam Chandraadityavimardhnam\nSinhikaa Garbha Sambhootam Tam Raahum Pranamamyaham',
      original: 'अर्धकायं महावीर्यं चन्द्रादित्यविमर्दनम्।\nसिंहिकागर्भसम्भूतं तं राहुं प्रणमाम्यहम्॥',
      script: {
        od: '‌ ‌ ‌ ‌ ‌।\n‌ ‌ ‌ ‌ ‌॥',
        te: 'అర్థ కాయం మహా వీర్యం చంద్రాదిత్య విమర్దనం।\nసింహికా గర్భ సంభూతం తం రాహుం ప్రణమామ్యహం॥',
      },
      meaning: {
        en: 'I bow to Rahu, who is half-bodied (only a head, no torso), of immense power, who afflicts both the Sun and Moon causing solar and lunar eclipses, and who was born from the womb of Simhika. Rahu governs sudden changes, foreign matters, ambition, and illusion.',
        hi: 'मैं राहु को प्रणाम करता हूं जो अर्ध-शरीरी (केवल मस्तक, धड़ नहीं) हैं, महाशक्तिशाली हैं, सूर्य और चंद्र को ग्रसते हैं (ग्रहण) और सिंहिका के गर्भ से उत्पन्न हैं। राहु आकस्मिक परिवर्तन, विदेश, महत्वाकांक्षा के स्वामी हैं।',
        od: '‌ ‌ ‌ ‌ ‌ ‌ ‌, ‌ ‌ ‌, ‌ ‌ ‌ ‌।',
        te: 'అర్థ శరీరం (కేవలం తల మాత్రమే) గల, మహా శక్తివంతుడు, సూర్య-చంద్రులను గ్రసించే (గ్రహణాలు), సింహిక గర్భం నుండి జన్మించిన రాహువుకు నమస్కరిస్తున్నాను.',
      },
    },
    {
      id: 'ng-9',
      type: 'shloka',
      num: 9,
      transliteration: 'Palaasha Pushpa Sankasham Taarakaa Graha Mastakam\nRoudram Roudraatmakam Ghoram Tam Ketum Pranamamyaham',
      original: 'पलाशपुष्पसंकाशं तारकाग्रहमस्तकम्।\nरौद्रं रौद्रात्मकं घोरं तं केतुं प्रणमाम्यहम्॥',
      script: {
        od: '‌ ‌ ‌ ‌ ‌।\n‌ ‌ ‌ ‌ ‌॥',
        te: 'పలాశ పుష్ప సంకాశం తారక గ్రహ మస్తకం।\nరౌద్రం రౌద్రాత్మకం ఘోరం తం కేతుం ప్రణమామ్యహం॥',
      },
      meaning: {
        en: 'I bow to Ketu, who resembles the palasa (flame of the forest) flower in color, whose head is among the stars and planets, who is fierce, terrifying, and fearsome in nature. Ketu governs spirituality, liberation (moksha), mysticism, and past-life karma.',
        hi: 'मैं केतु को प्रणाम करता हूं जो पलाश पुष्प के समान वर्ण के हैं, जिनका मस्तक नक्षत्रों में है, रौद्र, भयानक और घोर स्वभाव के हैं। केतु आध्यात्मिकता, मोक्ष, रहस्यवाद और पूर्वजन्म कर्म के स्वामी हैं।',
        od: '‌ ‌ ‌ ‌, ‌ ‌ ‌ ‌, ‌ ‌, ‌ ‌ ‌।',
        te: 'పలాశ పూవు వంటి రంగు గల, నక్షత్రాల మధ్య తల ఉన్న, రౌద్రంగా, భయంకరంగా ఉన్న కేతువుకు నమస్కరిస్తున్నాను. కేతువు ఆధ్యాత్మికత, మోక్షం పాలకుడు.',
      },
    },
  ],
};

// ── 4. AIGIRI NANDINI (Mahishasura Mardini) ─────────────────────────────────
export const aigiriNandini = {
  verses: [
    {
      id: 'ain-1',
      type: 'shloka',
      num: 1,
      transliteration: 'Aigiri Nandini Nandita Medini Vishwa Vinodinee Nandanute\nGiriVara Vindhya Shirodhini Vaasini Vishnuvilaasini Jishnunute\nBhagavati He Shiti Kantha Kutumbini Bhoori Kutumbini Bhoori Krute\nJaya Jaya He Mahishasura Mardini Ramyaka Pardini Shaila Sute',
      original: 'अयि गिरिनन्दिनि नन्दितमेदिनि विश्वविनोदिनि नन्दनुते।\nगिरिवरविन्ध्यशिरोधिनिवासिनि विष्णुविलासिनि जिष्णुनुते।\nभगवति हे शितिकण्ठकुटुम्बिनि भूरिकुटुम्बिनि भूरिकृते।\nजय जय हे महिषासुरमर्दिनि रम्यकपर्दिनि शैलसुते॥',
      script: {
        od: 'ଅୟି ଗିରି ନ‌‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌।\n‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌।\n‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌।\nଜୟ ଜୟ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌॥',
        te: 'అయి గిరి నందిని నందిత మేదిని విశ్వ వినోదిని నంద నుతే।\nగిరి వర వింధ్య శిరో\'ధి నివాసిని విష్ణు విలాసిని జిష్ణు నుతే।\nభగవతి హే శితి కంఠ కుటుంబిని భూరి కుటుంబిని భూరి కృతే।\nజయ జయ హే మహిషాసుర మర్దిని రమ్యక పర్దిని శైల సుతే॥',
      },
      meaning: {
        en: 'O Daughter of the Mountain (Himavat)! You who delights the Earth, who entertains the whole Universe, praised by Nanda! You who dwell atop the great Vindhya mountains, the beloved of Vishnu, praised by Arjuna! O Goddess, wife of the blue-throated Shiva (Neelkantha), of many households and great deeds! Victory, Victory to you — O Mahishasura Mardini, with beautiful matted hair, O Daughter of the Mountain!',
        hi: 'हे पर्वत पुत्री! हे पृथ्वी को आनंदित करने वाली, विश्व का मनोरंजन करने वाली, नंद द्वारा वंदित! हे विंध्याचल शिखर पर निवास करने वाली, विष्णुप्रिया, अर्जुन वंदित! हे नीलकंठ (शिव) की पत्नी, अनेक परिवारों वाली! जय जय हे महिषासुरमर्दिनि, सुंदर जटाधारिणी, शैलपुत्री!',
        od: 'ହ‌ ‌ ‌, ‌ ‌ ‌, ‌ ‌ ‌! ‌ ‌ ‌ ‌ ‌ ‌, ‌ ‌! ‌ ‌ ‌! ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌!',
        te: 'ఓ పర్వత పుత్రి! భూమిని ఆనందింపజేసే, విశ్వాన్ని వినోదింపజేసే తల్లి! వింధ్య పర్వత శిఖరాన నివసించే, విష్ణుప్రియ! ఓ నీలకంఠ (శివుని) భార్య! జయ జయ ఓ మహిషాసుర మర్దిని, అందమైన జటాజూటధారి, శైలపుత్రి!',
      },
    },
    {
      id: 'ain-2',
      type: 'shloka',
      num: 2,
      transliteration: 'Ayi Jagadamba Madamba Kadamba Vanapriyanimbadavalitae\nMadhura Madhure Madhukaita Bhaganje Madhurava Pinilukrite\nJaya Jaya He Mahishasura Mardini Ramyaka Pardini Shaila Sute',
      original: 'अयि जगदम्ब मदम्ब कदम्ब वनप्रियवासिनि हासरते।\nशिखरिशिरोमणि तुंगहिमालय शृंगनिजालय मध्यगते।\nमधुमधुरे मधुकैटभगञ्जिनि कैटभभञ्जिनि राससुते।\nजय जय हे महिषासुरमर्दिनि रम्यकपर्दिनि शैलसुते॥',
      script: {
        od: 'ଅ‌ ‌ ‌ ‌ ‌ ‌ ‌।\n‌ ‌ ‌ ‌ ‌ ‌।\n‌ ‌ ‌ ‌ ‌।\nଜ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌॥',
        te: 'అయి జగదంబ మదంబ కదంబ వన ప్రియ వాసిని హాస రతే।\nశిఖరి శిరోమణి తుంగ హిమాలయ శృంగ నిజాలయ మధ్య గతే।\nమధు మధురే మధు కైటభ గంజిని కైటభ భంజిని రాస సుతే।\nజయ జయ హే మహిషాసుర మర్దిని రమ్యక పర్దిని శైల సుతే॥',
      },
      meaning: {
        en: 'O Mother of the Universe, my Mother! You who love dwelling in the Kadamba forest and smile joyfully! You who reside at the peak of the lofty Himalayas, the crest jewel of mountains! O sweet and beautiful one who destroyed the demons Madhu and Kaitabha! Victory, Victory O Mahishasura Mardini, with beautiful matted locks, O Mountain Daughter!',
        hi: 'हे जगदंबा, मेरी माँ! कदंब वन में रहने वाली, सुहासिनी! ऊंचे हिमालय शिखर पर निवास करने वाली! मधु-कैटभ असुरों का नाश करने वाली! जय जय हे महिषासुरमर्दिनि, सुंदर जटाधारिणी, शैलसुते!',
        od: '‌ ‌ ‌ ‌, ‌ ‌ ‌, ‌ ‌ ‌! ‌ ‌ ‌ ‌ ‌ ‌!',
        te: 'ఓ జగదంబ, నా తల్లి! కదంబ వనంలో నివసించే, ప్రసన్న వదన తల్లి! ఉన్నత హిమాలయ శిఖరాన నివసించే తల్లి! మధు కైటభులను సంహరించిన తల్లి! జయ జయ ఓ మహిషాసుర మర్దిని, శైల సుతే!',
      },
    },
    {
      id: 'ain-3',
      type: 'shloka',
      num: 3,
      transliteration: 'Ayi Shatakhanda Vikhanditarunda Vitundita Shunda Gajadhipate\nRipugajaganda Vidarana Chanda Paraakrama Shunda Mrigadhipate\nNijabhuja Danda Nipatita Khanda Vipatita Munda Bhataadhipate\nJaya Jaya He Mahishasura Mardini Ramyaka Pardini Shaila Sute',
      original: 'अयि शतखण्ड विखण्डितरुण्ड वितुण्डित शुण्ड गजाधिपते।\nरिपुगजगण्ड विदारणचण्ड पराक्रम शुण्ड मृगाधिपते।\nनिजभुजदण्ड निपातितखण्ड विपातितमुण्ड भटाधिपते।\nजय जय हे महिषासुरमर्दिनि रम्यकपर्दिनि शैलसुते॥',
      script: {
        od: 'ଅ‌ ‌ ‌ ‌ ‌ ‌ ‌।\n‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌।\n‌ ‌ ‌ ‌ ‌ ‌ ‌।\nଜ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌॥',
        te: 'అయి శత ఖండ విఖండిత రుండ వితుండిత శుండ గజాధిపతే।\nరిపు గజ గండ విదారణ చండ పరాక్రమ శుండ మృగాధిపతే।\nనిజ భుజ దండ నిపాతిత ఖండ విపాతిత ముండ భటాధిపతే।\nజయ జయ హే మహిషాసుర మర్దిని రమ్యక పర్దిని శైల సుతే॥',
      },
      meaning: {
        en: 'O Goddess who cuts the trunks of enemy elephants into hundreds of pieces, lord of elephants! With fierce valor like a lion you tear open the cheeks of enemy war-elephants! With your own powerful arms you sever the heads of warrior-commanders and scatter them! Victory, Victory O Mahishasura Mardini, beautiful-locked Mountain Daughter!',
        hi: 'हे देवी जो शत्रु हाथियों की सूंड सैकड़ों टुकड़ों में काट देती हैं! सिंह के समान पराक्रम से शत्रु गजराजों के कपोल विदीर्ण करती हैं! अपनी भुजाओं से योद्धाओं के मस्तक काट देती हैं! जय जय हे महिषासुरमर्दिनि, शैलसुते!',
        od: '‌ ‌ ‌ ‌ ‌ ‌ ‌, ‌ ‌ ‌! ‌ ‌ ‌ ‌ ‌! ‌ ‌ ‌ ‌ ‌ ‌!',
        te: 'శత్రు గజాల తొండాలను వందల ముక్కలుగా నరికే తల్లి! సింహం వంటి పరాక్రమంతో శత్రు గజాల చెక్కిళ్ళు చీల్చే తల్లి! స్వంత భుజబలంతో యోధుల తలలు నరికే తల్లి! జయ జయ ఓ మహిషాసుర మర్దిని!',
      },
    },
    {
      id: 'ain-4',
      type: 'shloka',
      num: 4,
      transliteration: 'Ayi Nija Hunga Mrudunaghana Tana Ruchiranaya Nayanavibhramate\nSamara Visara Gata Shona Tilaka Shubha Bhala Bhalanavibhramate\nKamala Dalaamala Komala Kanti Kalaakali Haamsasvibhramate\nJaya Jaya He Mahishasura Mardini Ramyaka Pardini Shaila Sute',
      original: 'अयि निजहुङ्कृति मात्रनिराकृत धूम्रविलोचन दुर्मदशत्रौ।\nसमरविशोषित शोणितबीज समुद्भव शोणित बीज लते।\nशिव शिव शुम्भ निशुम्भ महाहव तर्पितभूत पिशाचरते।\nजय जय हे महिषासुरमर्दिनि रम्यकपर्दिनि शैलसुते॥',
      script: {
        od: '‌ ‌ ‌ ‌ ‌ ‌।\n‌ ‌ ‌ ‌ ‌।\n‌ ‌ ‌ ‌ ‌।\nଜ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌॥',
        te: 'అయి నిజ హుంకృతి మాత్ర నిరాకృత ధూమ్ర విలోచన దుర్మద శత్రౌ।\nసమర విశోషిత శోణిత బీజ సముద్భవ శోణిత బీజ లతే।\nశివ శివ శుంభ నిశుంభ మహాహవ తర్పిత భూత పిశాచ రతే।\nజయ జయ హే మహిషాసుర మర్దిని రమ్యక పర్దిని శైల సుతే॥',
      },
      meaning: {
        en: 'O Goddess who destroyed the arrogant demon Dhumravilochana with just a single roar of yours! Who dried up and destroyed Raktabija (the demon who multiplied from each drop of blood)! Who in the great battle against Shumbha and Nishumbha satisfied the spirits and ghosts with the blood of demons! Victory, Victory O Mahishasura Mardini!',
        hi: 'हे देवी जिन्होंने केवल हुंकार से दुर्मद धूम्रलोचन का नाश किया! रक्तबीज (रक्त से उत्पन्न होने वाले दैत्य) को युद्ध में सोख कर नष्ट किया! शुंभ-निशुंभ महायुद्ध में भूत-पिशाचों को तृप्त किया! जय जय हे महिषासुरमर्दिनि!',
        od: '‌ ‌ ‌ ‌ ‌ ‌, ‌ ‌ ‌! ‌ ‌ ‌ ‌! ‌ ‌ ‌ ‌ ‌ ‌!',
        te: 'ఒక్క గర్జనతో దుర్మద ధూమ్రవిలోచనుని నాశనం చేసిన తల్లి! రక్తబీజుని అడగింపజేసిన తల్లి! శుంభ నిశుంభ మహా యుద్ధంలో భూత పిశాచాలను తృప్తిపరచిన తల్లి! జయ జయ ఓ మహిషాసుర మర్దిని!',
      },
    },
    {
      id: 'ain-5',
      type: 'shloka',
      num: 5,
      transliteration: 'Sharana Gata Dinarta Paritrana Parayane\nSarva Syaarti Harane Devi Naaraayanee Namo Namah\nJaya Jaya He Mahishasura Mardini Ramyaka Pardini Shaila Sute',
      original: 'शरणागतदीनार्तपरित्राणपरायणे।\nसर्वस्यार्तिहरे देवि नारायणि नमोऽस्तु ते॥\nजय जय हे महिषासुरमर्दिनि रम्यकपर्दिनि शैलसुते॥',
      script: {
        od: '‌ ‌ ‌ ‌ ‌।\n‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌॥\nଜ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌॥',
        te: 'శరణ గత దీనార్త పరిత్రాణ పరాయణే।\nసర్వస్యార్తి హరే దేవి నారాయణి నమో\'స్తు తే॥\nజయ జయ హే మహిషాసుర మర్దిని రమ్యక పర్దిని శైల సుతే॥',
      },
      meaning: {
        en: 'O Goddess devoted to protecting the poor and afflicted who have taken your shelter! O Narayani, remover of all suffering of all beings — I bow to you again and again! Victory, Victory O Mahishasura Mardini, beautiful-locked Mountain Daughter — we surrender at your divine feet!',
        hi: 'हे देवी जो शरण में आए दीन और पीड़ितों की रक्षा में सदा तत्पर हैं! हे नारायणी, सभी जीवों के दुखों को हरने वाली — आपको बारम्बार नमन! जय जय हे महिषासुरमर्दिनि, शैलसुते — आपके चरणों में समर्पण!',
        od: '‌ ‌ ‌ ‌ ‌ ‌ ‌! ‌ ‌ ‌ ‌ ‌ ‌ — ‌ ‌ ‌! ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌!',
        te: 'శరణు పొందిన పేద పీడిత జనులను రక్షించడంలో సంసిద్ధంగా ఉండే తల్లి! ఓ నారాయణి, అందరి దుఃఖాలను తొలగించే తల్లి — మళ్ళీ మళ్ళీ నమస్కారం! జయ జయ ఓ మహిషాసుర మర్దిని, శైల సుతే!',
      },
    },
  ],
};

// ── 5. SHIV CHALISA ─────────────────────────────────────────────────────────
export const shivChalisa = {
  verses: [
    {
      id: 'sc-doha-1',
      type: 'doha',
      num: 1,
      transliteration: 'Jai Ganesh Girija Suvan, Mangal Mul Sujan\nKaho Ayodhyadas Tum, Dehu Abhay Vardan',
      original: 'जय गणेश गिरिजा सुवन, मंगल मूल सुजान।\nकहत अयोध्यादास तुम, देहु अभय वरदान॥',
      script: {
        od: 'ଜ‌ ‌ ‌ ‌ ‌, ‌ ‌ ‌ ‌।\n‌ ‌ ‌ ‌ ‌, ‌ ‌ ‌ ‌॥',
        te: 'జయ గణేశ గిరిజా సువన, మంగళ మూల సుజాన।\nకహత అయోధ్యాదాస తుమ, దేహు అభయ వరదాన॥',
      },
      meaning: {
        en: 'Victory to Ganesha, son of Girija (Parvati) — the embodiment of auspiciousness and wisdom. Ayodhyadas (the poet) prays: O Ganesha, please bestow upon us the boon of fearlessness (Abhaya Vardan) as we begin the recitation of Shiv Chalisa.',
        hi: 'गिरिजा (पार्वती) के पुत्र गणेश की जय — जो मंगल और ज्ञान के मूल हैं। अयोध्यादास (कवि) प्रार्थना करते हैं: हे गणेश, हमें शिव चालीसा पाठ के आरंभ में अभय वरदान दीजिए।',
        od: '‌ ‌ ‌ ‌ ‌ ‌ ‌ — ‌ ‌ ‌ ‌। ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌।',
        te: 'గిరిజ పుత్రుడు గణేశుడికి జయం — ఆయన మంగళం మరియు జ్ఞానం యొక్క మూలం. అయోధ్యాదాస ప్రార్థిస్తున్నారు: ఓ గణేశా, శివ చాళీసా పారాయణం ప్రారంభిస్తున్నాం, మాకు అభయ వరదానం ప్రసాదించు.',
      },
    },
    {
      id: 'sc-1',
      type: 'chaupai',
      num: 1,
      transliteration: 'Jai Shiv Onkara Prabhu Jai Shiv Onkara\nBrahma Vishnu Sadashiv Ardhangi Dhara',
      original: 'जय शिव ओंकारा, प्रभु जय शिव ओंकारा।\nब्रह्मा विष्णु सदाशिव, अर्धांगी धारा॥',
      script: {
        od: 'ଜ‌ ‌ ‌ ‌, ‌ ‌ ‌ ‌।\n‌ ‌ ‌ ‌ ‌, ‌ ‌ ‌॥',
        te: 'జయ శివ ఓంకారా, ప్రభు జయ శివ ఓంకారా।\nబ్రహ్మ విష్ణు సదాశివ, అర్థాంగి ధారా॥',
      },
      meaning: {
        en: 'Victory to Shiva, the embodiment of the sacred syllable Om! Lord Shiva encompasses the Trinity — Brahma (the creator), Vishnu (the preserver), and Sadashiva himself (the destroyer). He is Ardhanarishvara, bearing the Goddess (Parvati) as his half body.',
        hi: 'ओंकारस्वरूप शिव की जय! प्रभु शिव ओंकार हैं। ब्रह्मा (सृष्टिकर्ता), विष्णु (पालनकर्ता) और सदाशिव — तीनों में शिव व्याप्त हैं। वह अर्धनारीश्वर रूप में पार्वती को अर्ध अंग में धारण करते हैं।',
        od: '‌ ‌ ‌ ‌ ‌ ‌! ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌। ‌ ‌ ‌ ‌।',
        te: 'ఓంకార స్వరూపుడు శివుడికి జయం! శివుడు బ్రహ్మ, విష్ణు, సదాశివ అనే త్రిమూర్తులలో వ్యాపించి ఉన్నాడు. ఆయన అర్ధనారీశ్వరుడుగా పార్వతిని తన సగం శరీరంగా ధరిస్తాడు.',
      },
    },
    {
      id: 'sc-2',
      type: 'chaupai',
      num: 2,
      transliteration: 'Ekanan Chaturanan Panchanan Raje\nHansat Gangadhara Harasambhu Biraje',
      original: 'एकानन चतुरानन पंचानन राजे।\nहंसासन गरूडासन वृषवाहन साजे॥',
      script: {
        od: '‌ ‌ ‌ ‌ ‌ ‌ ‌।\n‌ ‌ ‌ ‌ ‌ ‌ ‌॥',
        te: 'ఏకానన చతురానన పంచానన రాజే।\nహంసాసన గరుడాసన వృష వాహన సాజే॥',
      },
      meaning: {
        en: 'Lord Shiva shines magnificently — with one face, or four faces (Brahma\'s form), or five faces (Panchamukha Shiva). The gods travel on their respective vehicles — Brahma on the swan (Hamsa), Vishnu on Garuda, and Shiva on the sacred bull Nandi (Vrishavahana).',
        hi: 'भगवान शिव एकमुखी, चतुर्मुखी और पंचमुखी रूप में सुशोभित हैं। देवता अपने वाहनों पर विराजते हैं — ब्रह्मा हंस पर, विष्णु गरुड़ पर और शिव पवित्र बैल नंदी (वृषवाहन) पर।',
        od: '‌ ‌ ‌ ‌ ‌ ‌ ‌, ‌ ‌। ‌ ‌ ‌ ‌ ‌ ‌।',
        te: 'శివుడు ఏకముఖి, చతుర్ముఖి మరియు పంచముఖి రూపంలో శోభిల్లుతున్నాడు. దేవతలు తమ వాహనాలపై విరాజిల్లుతున్నారు — బ్రహ్మ హంసపై, విష్ణువు గరుడపై, శివుడు పవిత్ర బసవడు (నంది) పై.',
      },
    },
    {
      id: 'sc-3',
      type: 'chaupai',
      num: 3,
      transliteration: 'Do Bhuja Chaar Chatur Dasha Bhujan Par Sohain\nTrinayon Birajat Lalanaa Lagat Hain',
      original: 'दो भुज चार चतुर्दश भुजधारी।\nत्रिनयन जिन्ह छवि अपरम्पार॥\nशिव शिव शिव जपत असुर भागते\nत्रिभुवन जय श्री शिव भोलेनाथ नमो',
      script: {
        od: '‌ ‌ ‌ ‌ ‌।\n‌ ‌ ‌ ‌ ‌॥\n‌ ‌ ‌ ‌ ‌ ‌\n‌ ‌ ‌ ‌ ‌ ‌ ‌',
        te: 'రెండు భుజాలు, నాలుగు భుజాలు, పదునాలుగు భుజాలు ధరించే తల్లి।\nమూడు కళ్ళతో విరాజిల్లే అపారమైన సౌందర్యం॥\nశివ శివ శివ జపిస్తే అసురులు పారిపోతారు\nత్రిభువన జయ శ్రీ శివ భోళేనాథ నమో',
      },
      meaning: {
        en: 'Lord Shiva manifests with two arms, or four arms, or fourteen arms — his infinite forms beyond all count. His three eyes (Trinetra) radiate incomparable divine beauty. When devotees chant "Shiva Shiva Shiva," even demons flee. Victory to Shiva, lord of three worlds — salutations to Bholenath!',
        hi: 'भगवान शिव दो भुज, चार भुज या चौदह भुज धारण करते हैं — उनके अनंत रूप हैं। तीन नेत्रों वाले (त्रिनेत्र) शिव की छवि अपरम्पार है। जब भक्त शिव शिव जपते हैं तो असुर भाग जाते हैं। त्रिभुवन जयकारी भोलेनाथ को नमन!',
        od: '‌ ‌ ‌ ‌ ‌ ‌, ‌ ‌ ‌। ‌ ‌ ‌ ‌ ‌ ‌। ‌ ‌ ‌ ‌ ‌ ‌।',
        te: 'రెండు, నాలుగు లేదా పదునాలుగు భుజాలతో విరాజిల్లే శివుడు. మూడు కళ్ళతో అపార సౌందర్యం. శివ శివ శివ జపిస్తే రాక్షసులు పారిపోతారు. త్రిలోక విజేత భోళేనాథుడికి నమస్కారం!',
      },
    },
    {
      id: 'sc-4',
      type: 'chaupai',
      num: 4,
      transliteration: 'Shiv Chalisa Jo Koi Gaave\nSo Nar Shiv Pad Param Praave\nPanch Naam Jo Japat Sadaive\nShrI Shiv Prasad Nishchay Paive',
      original: 'शिव चालीसा जो कोई गावे।\nसो नर शिव पद परम पावे॥\nपंच नाम जो जपत सदाई।\nश्री शिव प्रसाद निश्चय पाई॥',
      script: {
        od: '‌ ‌ ‌ ‌ ‌ ‌।\n‌ ‌ ‌ ‌ ‌ ‌॥\n‌ ‌ ‌ ‌ ‌ ‌।\n‌ ‌ ‌ ‌ ‌ ‌॥',
        te: 'శివ చాళీసా జో కోయి గావే।\nసో నర శివ పద పరమ పావే॥\nపంచ నామ జో జపత్ సదాయి।\nశ్రీ శివ ప్రసాద నిశ్చయ పాయి॥',
      },
      meaning: {
        en: 'Whoever sings or recites the Shiv Chalisa with devotion — that person certainly attains the supreme abode of Lord Shiva (Shiv Pad, liberation). Whoever always chants the five sacred names of Shiva (Om Namah Shivaya) definitely receives Lord Shiva\'s divine grace and blessings.',
        hi: 'जो कोई भी भक्तिपूर्वक शिव चालीसा गाता या पढ़ता है — वह व्यक्ति निश्चित रूप से भगवान शिव के परम पद (मोक्ष) को प्राप्त करता है। जो सदा शिव के पांच पवित्र नाम (ॐ नमः शिवाय) जपता है उसे श्री शिव प्रसाद निश्चित मिलता है।',
        od: '‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ — ‌ ‌ ‌ ‌ ‌। ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌।',
        te: 'భక్తితో శివ చాళీసా పఠించే వారికి శివ పదం (మోక్షం) తప్పకుండా లభిస్తుంది. ఎల్లప్పుడూ శివుని పంచ నామాలు (ఓం నమః శివాయ) జపించే వారికి శ్రీ శివుని అనుగ్రహం నిశ్చయంగా లభిస్తుంది.',
      },
    },
  ],
};