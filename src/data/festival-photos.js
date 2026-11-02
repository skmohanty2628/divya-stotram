// Photos are hosted by Wikimedia Commons under free licences and credited on every slide.
// `file` is the exact Commons file name.
const P = (file, alt, caption, credit, license) => ({ file, alt, caption, credit, license });

export function commonsUrl(file, width = 2000) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;
}

export function commonsPage(file) {
  return `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replace(/ /g, '_'))}`;
}

export const PHOTO_SETS = {
  Festivals: {
    eyebrow: 'Festival gallery',
    title: 'Festivals in pictures',
    items: [
      P('Brihadisvara Temple during Maha Shivaratri-WUS03611 (edit).jpg', 'Brihadisvara Temple lit up during Maha Shivaratri', 'Brihadisvara Temple on Maha Shivaratri night', 'Rainer Halama', 'CC BY-SA 4.0'),
      P('2016 Durga Puja Kolkata Shobhabazar Sarbojonin (9).jpg', 'Durga idol at a Kolkata puja pandal', 'Durga Puja pandal, Kolkata', 'Sumit Surai', 'CC BY-SA 3.0'),
      P('Visitors decoration Idol of 2017 Durga Puja South Kolkata area 46.jpg', 'Visitors at a decorated Durga Puja pandal in South Kolkata', 'Durga Puja crowds and decoration, South Kolkata', 'Goutam1962', 'CC BY-SA 4.0'),
      P('Ganesh Chaturthi (9714901325).jpg', 'Ganesh idol during Ganesh Chaturthi', 'Ganesh Chaturthi', 'Thejas Panarkandy', 'CC BY 2.0'),
      P('Diwali Diyas Lamps.jpg', 'Rows of clay diyas lit for Diwali', 'Diyas lit for Diwali', 'humdingor', 'CC BY-SA 2.0'),
      P('Holi Celebration 01.jpg', 'People celebrating Holi with coloured powder', 'Holi, the festival of colours', 'Bhaiyaji Smile 123', 'CC BY-SA 4.0'),
      P('Celebration of doi handi.jpg', 'Human pyramid at a Dahi Handi celebration', 'Dahi Handi, a Janmashtami custom', 'Abir Choudhury', 'CC BY-SA 4.0'),
      P('Anegundi - Anjaneya Hill - Hanuman Figure - 2.jpg', 'Hanuman figure at Anjaneya Hill, Anegundi', 'Anjaneya Hill, Anegundi', 'Ingo Mehling', 'CC BY-SA 4.0'),
      P('Idol of Shree Ram on Garuda.jpg', 'Idol of Shri Ram on Garuda', 'Shri Ram idol, a Rama Navami scene', 'Phanidharvaranasi', 'CC BY-SA 4.0'),
      P('Diya for Diwali.jpg', 'A decorated diya for Diwali', 'A diya for Diwali', 'siddarth varanasi', 'CC BY 2.0'),
    ],
  },
  'Meaning and history': {
    eyebrow: 'Image gallery',
    title: 'Deities and sacred places behind the prayers',
    items: [
      P('Lord Shiva Nataraja at the British Museum.jpg', 'Nataraja, Shiva as the cosmic dancer, at the British Museum', 'Nataraja, Shiva as the cosmic dancer', 'Sanjay ach', 'CC BY-SA 4.0'),
      P('01Dancing Shiva.jpg', 'Dancing Shiva sculpture', 'Dancing Shiva', 'yashima', 'CC BY-SA 2.0'),
      P('Anegundi - Anjaneya Hill - Hanuman Figure - 1.jpg', 'Hanuman figure at Anjaneya Hill, Anegundi', 'Hanuman at Anjaneya Hill', 'Ingo Mehling', 'CC BY-SA 4.0'),
      P('Adiyogi Shiva bust, left side view.jpg', 'Adiyogi Shiva bust, left side view', 'Adiyogi, Shiva as the first yogi', 'Prabhuthiru57', 'CC BY-SA 4.0'),
      P('Adiyogi Shiva steel burst 2018.jpg', 'Adiyogi Shiva steel bust in 2018', 'Adiyogi bust', 'Prabhuthiru57', 'CC BY-SA 4.0'),
      P('India - Varanasi sun greet - 0270.jpg', 'Sunrise worship on the Ganges at Varanasi', 'Sunrise worship on the Ganges, Varanasi', 'Jorge Royan', 'CC BY-SA 3.0'),
      P('Sri Rama Navami Edurukolu At Bhadrachalam Temple 07.jpg', 'Rama Navami procession at Bhadrachalam Temple', 'Rama Navami at Bhadrachalam', 'Iharishs', 'CC BY-SA 4.0'),
      P('Sri Rama Navami Edurukolu At Bhadrachalam Temple 01.jpg', 'Edurukolu ceremony at Bhadrachalam Temple', 'Edurukolu, Bhadrachalam', 'Iharishs', 'CC BY-SA 4.0'),
      P('Stone wheel engraved in the 13th century built Konark Sun Temple in Orissa, India.jpg', 'Stone wheel carving at Konark Sun Temple', 'Stone wheel, Konark Sun Temple', 'Subhrajyoti07', 'CC BY-SA 4.0'),
      P('Sri Ranganathaswamy Temple, dedicated to Vishnu, in Srirangam, near Tiruchirappali (16) (36842412443).jpg', 'Sri Ranganathaswamy Temple, dedicated to Vishnu, Srirangam', 'Sri Ranganathaswamy Temple, Srirangam', 'Richard Mortel', 'CC BY 2.0'),
    ],
  },
  'Odisha festivals': {
    eyebrow: 'Odisha gallery',
    title: 'Odisha festivals in pictures',
    items: [
      P('Puri Ratha Yatra.jpg', 'Chariots at the Ratha Yatra in Puri', 'Chariots at the Ratha Yatra, Puri', 'Krupasindhu Muduli', 'CC BY-SA 3.0'),
      P("Annual chariot festival 'Jagannath Yatra', Puri Odisha.jpg", 'Devotees at the annual Jagannath chariot festival in Puri', 'Jagannath Yatra, Puri', 'Prashant Kharote', 'CC BY-SA 4.0'),
      P('Jagannath Temple, Puri 01.jpg', 'Jagannath Temple in Puri', 'Jagannath Temple, Puri', 'Bernard Gagnon', 'CC BY-SA 3.0'),
      P('Bali Jatra of Cuttack, Odisha.jpg', 'Bali Jatra fair at Cuttack', 'Bali Jatra, Cuttack', 'Pkp05', 'CC BY-SA 4.0'),
      P('Cuttack Bali Yatra Gate.jpg', 'Entrance gate of the Bali Yatra fair in Cuttack', 'Bali Yatra gate, Cuttack', 'Kishan 677382', 'CC BY-SA 4.0'),
      P('Konark Sun Temple 6.jpg', 'Stone wheel carving at Konark Sun Temple', 'Konark Sun Temple', 'Phadke09', 'CC BY-SA 4.0'),
      P('Lingaraja Temple 01.jpg', 'Lingaraja Temple in Bhubaneswar', 'Lingaraja Temple, Bhubaneswar', 'Bernard Gagnon', 'CC BY-SA 3.0'),
      P('Deities’ Palanquin Procession during Chandan yatra festival in Puri.jpg', 'Palanquin procession during Chandan Yatra in Puri', 'Chandan Yatra procession, Puri', 'Aliva Sahoo', 'CC BY-SA 4.0'),
      P('Sakhigopal chandan yatra.jpg', 'Chandan Yatra at Sakhigopal', 'Chandan Yatra, Sakhigopal', 'Sidsahu', 'CC BY-SA 4.0'),
      P('Chandrabhaga Sea Beach, Konark.jpg', 'Chandrabhaga Sea Beach near Konark', 'Chandrabhaga beach, Konark', '29paayal', 'CC BY-SA 3.0'),
    ],
  },
};
