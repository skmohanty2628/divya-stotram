// Temple pages (/temples and /temples/<slug>). Each temple is plain data, so adding one means adding one object.
// Photos are Wikimedia Commons files under free licences, credited on every slide.
// Facts below were checked against at least two sources; where sources disagree the page says so.

const P = (file, alt, caption, credit, license = 'CC BY-SA 4.0') => ({ file, alt, caption, credit, license });

export const TEMPLES_UPDATED = '2026-11-20';

export const TEMPLES = [
  {
    slug: 'kedarnath',
    name: 'Kedarnath Temple',
    state: 'Uttarakhand',
    district: 'Rudraprayag',
    deity: 'Shiva (Kedarnath)',
    kind: 'Jyotirlinga and Chota Char Dham',
    emoji: '🏔️',
    title: 'Kedarnath Temple Guide 2027: History, Registration, Best Time, Trek, Packing List',
    description:
      'Complete Kedarnath guide: legend and history, how to register, opening and closing dates, best months, trek stages, helicopter, pony and palki, darshan, food, shopping and a packing list for men, women and kids.',
    h1: 'Kedarnath Temple: Complete Guide to History, Registration, Trek and Travel',
    intro:
      'Kedarnath is the highest of the twelve Jyotirlingas, a stone temple of Shiva at 3,583 metres in the Garhwal Himalaya, reached on foot, by animal or palanquin, or by a short helicopter flight. This guide puts the legend, the history, the registration steps, the season, the trek, the costs and the packing list in one place, and says plainly where sources disagree.',
    facts: [
      ['Deity', 'Shiva as Kedarnath, one of the twelve Jyotirlingas'],
      ['Location', 'Kedarnath, Rudraprayag district, Uttarakhand, on the Mandakini river'],
      ['Elevation', '3,583 m (11,755 ft)'],
      ['Season', 'Opens around Akshaya Tritiya (April or May), closes on Bhai Dooj (October or November)'],
      ['2026 dates', 'Opened 22 April 2026, 8:00 AM. Closed 11 November 2026, 8:30 AM'],
      ['Winter seat', 'Omkareshwar Temple, Ukhimath'],
      ['Nearest roadhead', 'Gaurikund, about 16 to 17 km on foot from the temple'],
      ['Registration', 'Mandatory and free, at registrationandtouristcare.uk.gov.in'],
      ['Helicopter', 'Only through heliyatra.irctc.co.in, from Phata, Sersi or Guptkashi'],
      ['Best months', 'Late May to June, and mid September to mid October'],
    ],
    photos: [
      P('Kedarnath Temple at Dawn - OCT 2014.jpg', 'Kedarnath Temple at dawn in October', 'Kedarnath Temple at dawn', 'Naresh Balakrishnan'),
      P('Kedarnath Temple in Uttarakhand, India, by Yogabrata Chakraborty.jpg', 'Front view of the Kedarnath Temple in Uttarakhand', 'Front view of the temple', 'Billjones94'),
      P('Kedar nath temple and the snow hills 01.jpg', 'Kedarnath Temple with snow hills behind it', 'The temple with the snow hills behind', 'Abhi201979'),
      P('Kedarnath Temple and himalayas.jpg', 'Kedarnath Temple below the Himalayan peaks', 'Temple and Himalayan peaks', 'Manaswrites'),
      P('Kedarnath Himalaya.jpg', 'The mountain range behind Kedarnath Temple', 'The range behind the temple', 'Giri.kalpesh20'),
      P('Kedarnath Mandir.jpg', 'Kedarnath Mandir in Uttarakhand', 'Kedarnath Mandir', 'Karunamay Mukhopadhyay'),
      P('Kedarnath shrine.jpg', 'Kedarnath shrine in the Garhwal Himalaya', 'The shrine in the Garhwal Himalaya', 'AaS'),
      P('Kedarnath Nandi.jpg', 'Nandi, the bull of Shiva, at Kedarnath', 'Nandi at Kedarnath', 'Deepak Seth'),
      P('Kedar shrouded by Fog.jpg', 'Kedarnath Temple crowded with devotees in fog', 'Devotees at the temple in fog', 'Tanusree Das'),
      P('Kedarnath holy stone.jpg', 'The Bhim Shila boulder behind Kedarnath Temple', 'Bhim Shila, the rock that stopped the 2013 flood debris', 'Abhi201979'),
      P('Kedarnath Temple in Rainy season.jpg', 'Kedarnath Temple during the rainy season in July', 'The temple in the July rains', 'Shivam Kumar 766'),
      P('Kedarnath temple october 2022.jpg', 'Kedarnath Temple in October 2022', 'The temple in October', 'Siva301in'),
    ],
    sections: [
      {
        h: 'What Kedarnath is and why it matters',
        photos: [
          P('Kedar Nath.jpg', 'Kedarnath Temple in its valley with snow peaks behind', 'The temple in its Himalayan valley', 'Swantikumar', 'CC BY-SA 4.0'),
        ],
        blocks: [
          { t: 'p', text: `Kedarnath Temple stands in the Garhwal Himalaya near the Mandakini river, a tributary of the Ganga, in Rudraprayag district of Uttarakhand. It is dedicated to Shiva and counts among the twelve Jyotirlingas, the self-luminous lingams that Shaiva tradition holds to be the most sacred seats of the god. At 3,583 metres it is the highest of the twelve. It is also one of the four shrines of the Uttarakhand Char Dham circuit (Yamunotri, Gangotri, Kedarnath and Badrinath) and the first of the Panch Kedar temples.` },
          { t: 'p', text: `The name comes from Sanskrit kedara, a field, and natha, lord. Tradition links the field to the harvest of liberation, and the Kashi Kedara Mahatmya plays on this image. For the pilgrim the practical meaning is simpler: this is a high, cold, weather-bound shrine that is open for only about seven months a year, and a visit needs planning that a lowland temple does not.` },
        ],
      },
      {
        h: 'The legend of the Pandavas and the bull',
        photos: [
          P('Draupadi and Pandavas.jpg', 'Painting of Draupadi and the five Pandavas by Raja Ravi Varma', 'Draupadi and the Pandavas, painting by Raja Ravi Varma', 'Raja Ravi Varma', 'Public domain'),
          P('A map showing the Panch Kedar Hindu Tirtha sites, Uttarakhand India.jpg', 'Map of the five Panch Kedar temple sites in Uttarakhand', 'Map of the five Panch Kedar sites', 'Ms Sarah Welch', 'CC BY 4.0'),
        ],
        blocks: [
          { t: 'p', text: `The best-known story belongs to the aftermath of the Mahabharata war. The Pandavas, burdened by the deaths of kinsmen, sought Shiva's forgiveness. Shiva avoided them and took the form of a bull. Bhima recognised the animal near Guptkashi and caught hold of it, and the bull sank into the earth. It is said to have reappeared in five parts at five places, which are the Panch Kedar: the hump at Kedarnath, the arms at Tungnath, the face at Rudranath, the navel and stomach at Madhyamaheshwar and the hair at Kalpeshwar.` },
          { t: 'p', text: `The Pandavas then worshipped Shiva, performed a yajna and are said to have left for heaven by the Swargarohini peak near Badrinath. Pilgrims connect the custom of rubbing the lingam with ghee to Bhima's grip on the bull. One caution belongs in an honest guide: the Mahabharata itself does not name a place called Kedarnath, so this story comes from later Puranic and local tradition, not from the epic text.` },
        ],
      },
      {
        h: 'History of the temple',
        photos: [
          P('1882 Photograph of Kedarnath.jpg', 'Photograph of Kedarnath taken in 1882', 'Kedarnath in 1882, Geological Survey of India', 'Geological Survey of India', 'Public domain'),
        ],
        blocks: [
          { t: 'p', text: `Kedara is named in the Skanda Purana, usually dated to about the seventh or eighth century, as the place where Shiva released the waters of the Ganga from his matted hair. The temple is also remembered in the Tamil Tevaram hymns of Sambandar, Appar and Sundarar, and it is counted as one of the 275 paadal petra sthalams. The twelfth-century Kritya-kalpataru of the Gahadavala minister Bhatta Lakshmidhara mentions it too.` },
          { t: 'p', text: `Tradition credits Adi Shankara with reviving the shrine, and a samadhi shrine for him stands behind the temple. Accounts of where Shankara died differ, and some give Kanchipuram, so the samadhi is best taken as a place of devotion rather than settled biography. After the 1815 partition of Garhwal the area fell under British-ruled Garhwal. Today the Shri Badrinath-Kedarnath Temple Committee (BKTC), created under a 1939 Act, manages the temple.` },
          { t: 'p', text: `Worship here has an unusual structure. The head priest, the Rawal, belongs to the Veerashaiva community of Karnataka, and unlike at Badrinath the Rawal does not perform the pujas himself. His assistants do so on his instruction. A Jangam priest from the south worships the lingam, while local tirtha purohit Brahmins perform the rites that pilgrims book for themselves.` },
        ],
      },
      {
        h: 'What you will see at the temple',
        photos: [
          P('Kedarnath003.jpg', 'Stone spire and front of Kedarnath Temple', 'The stone temple front and spire', 'Shubhanshri01', 'CC BY-SA 4.0'),
          P('Kedarnath Nandi.jpg', 'Nandi, the bull of Shiva, at Kedarnath', 'Nandi facing the shrine', 'Deepak Seth', 'CC BY-SA 4.0'),
        ],
        blocks: [
          { t: 'p', text: `The temple is a stone structure of grey, closely fitted blocks, set on a plateau with snow peaks rising directly behind it. The Kedarnath peak reaches 6,940 m and Kedar Dome 6,831 m. The sanctum holds not a carved image but a large natural rock form, worshipped as svayambhu, self-manifested, and described as about 3.6 m in circumference. The entrance hall has figures of Parvati, the five Pandavas, Krishna, Nandi, Virabhadra and Draupadi, and a Nandi stands outside facing the shrine.` },
          { t: 'p', text: `Behind the temple is the large boulder known as Bhim Shila, and nearby the samadhi of Adi Shankara. On a ridge to the east is the open-air shrine of Bhukund Bhairavnath, the guardian deity of the place, who is believed to watch over the empty valley in winter.` },
        ],
      },
      {
        h: 'The 2013 flood and the Bhim Shila',
        photos: [
          P('Bhim shila, Kedarnath temple, Uttrakhand.jpg', 'The Bhim Shila boulder behind Kedarnath Temple', 'Bhim Shila, the boulder behind the temple', 'Rohit Sharma', 'CC BY-SA 4.0'),
          P('Kedarnath Temple in 2014.jpg', 'Kedarnath Temple with rubble and rocks around it in 2014', 'The temple and the rubble around it in 2014', 'Kiranmadhu.e', 'CC BY-SA 4.0'),
        ],
        blocks: [
          { t: 'p', text: `On 16 and 17 June 2013 a landslide and a surge of water from the Chorabari lake area swept through the valley. Thousands died or went missing, and more than 100,000 people were later airlifted out of the region. The temple structure survived with no major damage because a large boulder lodged behind it and split the flow of water and debris. That rock is now worshipped as Bhim Shila.` },
          { t: 'p', text: `Engineers from IIT Madras and the Archaeological Survey of India found the structure stable, the town was rebuilt in the following years, and the pilgrimage resumed in 2014. This history is also why registration, weather checks and trek rules are enforced strictly today: the valley is beautiful and also unforgiving.` },
        ],
      },
      {
        h: 'Opening and closing dates, and how they are fixed',
        photos: [
          P('Kedarnadh.jpg', 'Kedarnath Temple in evening mist with lights on', 'The temple in evening mist', 'Iamvrt46', 'CC BY-SA 4.0'),
        ],
        blocks: [
          { t: 'p', text: `The temple does not follow a fixed calendar date. The opening day is tied to Akshaya Tritiya and is announced on Maha Shivaratri by the priests at the Omkareshwar Temple in Ukhimath after calculation from the Panchang. The closing day is fixed on Bhai Dooj, and the doors close after the morning puja.` },
          { t: 'ul', items: [
            `2026 season: opened 22 April 2026 at 8:00 AM and closed 11 November 2026 at 8:30 AM.`,
            `After closing, Kedarnath's festival image (utsav doli) travels in procession to the Omkareshwar Temple in Ukhimath, where worship continues through winter.`,
            `The 2027 dates have not been announced at the time of writing. They will be announced around Maha Shivaratri 2027, so check the BKTC site or the Uttarakhand tourism portal before booking.`,
            `While the temple is closed, the route is under snow and is not open to pilgrims. Winter darshan is at Ukhimath.`,
          ] },
        ],
      },
      {
        h: 'Best time to visit Kedarnath, month by month',
        photos: [
          P('Kedarnath 001.jpg', 'Snow peaks above the Kedarnath temple town', 'Snow peaks above the temple town', 'Saisumanth532', 'CC BY-SA 4.0'),
          P('Kedarnath 3.jpg', 'Kedarnath Temple under heavy cloud', 'The temple under cloud', 'Iamvrt46', 'CC BY-SA 4.0'),
        ],
        blocks: [
          { t: 'p', text: `Two windows suit most pilgrims: late May to June, and mid September to mid October. The monsoon months of July and August are the wettest of the year, and landslides on the approach road and the trek are most likely then. April is the coldest of the open months with snow still around, and the first days after opening can have very heavy crowds.` },
          { t: 'table',
            head: ['Month', 'Avg high / low', 'What to expect'],
            rows: [
              ['April', '10.8 / 0.5 °C', 'Temple opens. Cold, snow near the route, short days.'],
              ['May', '14.8 / 3.8 °C', 'Popular and busy. Cold mornings and nights, usually clear.'],
              ['June', '17.1 / 6.8 °C', 'Warmest month. Crowds generally heaviest. Pre-monsoon showers possible.'],
              ['July', '16.5 / 8.2 °C', 'Monsoon. About 240 mm of rain, landslide risk. Avoid if you can.'],
              ['August', '15.9 / 8.1 °C', 'Monsoon. About 234 mm of rain, landslide risk. Avoid if you can.'],
              ['September', '14.3 / 5.3 °C', 'Rains ease. Greener valley, fewer people from mid month.'],
              ['October', '10.6 / 0.1 °C', 'Clear skies and sharp cold. Good until the closing date.'],
              ['November', '6.9 / -3.6 °C', 'Driest month, but the temple closes on Bhai Dooj.'],
            ] },
          { t: 'note', text: `Temperatures are monthly means for Kedarnath from the climate table on Wikipedia. Real conditions swing widely within a day, and the wind chill at the top is far colder than these averages suggest.` },
        ],
      },
      {
        h: 'How to register for the Kedarnath Yatra',
        blocks: [
          { t: 'p', text: `Registration is mandatory for the Char Dham shrines and it is free. Without a valid QR-coded pass you can be stopped at checkpoints such as Sonprayag. Do not pay an agent for registration itself.` },
          { t: 'ol', items: [
            `Open the official portal registrationandtouristcare.uk.gov.in (Uttarakhand Tourism Development Board, Tourist Care Uttarakhand) and choose Register or Login. New users sign up with a mobile number and OTP.`,
            `Create a tour: give the start and end dates, the number of pilgrims, the shrines (Kedarnath) and the visit date for each.`,
            `Add each pilgrim's details and upload a valid photo ID such as Aadhaar, passport, voter ID or driving licence, with a passport-size photo.`,
            `Download the Yatra Registration Letter or QR e-pass. Keep a printed copy and a phone copy, because mobile networks are weak on the route.`,
            `Carry the pass and the original ID at every checkpoint, and complete verification at the shrine as the letter instructs.`,
          ] },
          { t: 'p', text: `Other ways to register: the Tourist Care Uttarakhand mobile app, a WhatsApp message with the word Yatra to +91 83948 33833, or offline counters at places such as Haridwar, Rishikesh, Guptkashi, Sonprayag and Dehradun airport. Queues at offline counters can be long in peak season. A registration number is also needed to book a helicopter ticket.` },
          { t: 'links', items: [
            { label: 'Official yatra registration portal', url: 'https://registrationandtouristcare.uk.gov.in/', note: 'Free. Start here.' },
            { label: 'Badrinath-Kedarnath Temple Committee', url: 'https://badrinath-kedarnath.gov.in/', note: 'Official temple board: puja booking, notices, helpline 0135-2741600.' },
            { label: 'Kedarnath helicopter booking (IRCTC)', url: 'https://heliyatra.irctc.co.in/', note: 'The only official booking site for Kedarnath helicopter tickets.' },
          ] },
          { t: 'note', text: `Health papers: older pilgrims and anyone with a medical condition should get a fitness check before going. One travel guide reports that a medical certificate dated within 15 days of travel is asked for trek or helicopter travel, but we could not confirm this on an official page, so ask the portal helpline (1364) before you travel. Mobile phones and cameras are not allowed inside the temple premises.` },
        ],
      },
      {
        h: 'How to reach Kedarnath',
        blocks: [
          { t: 'p', text: `There is no road to the temple. The road ends at Gaurikund, and the rest is a climb of about 16 to 17 km (sources vary between 14 and 18 km because the route has been re-aligned over the years). The usual route is Haridwar or Rishikesh to Guptkashi or Sonprayag by road, then Sonprayag to Gaurikund by the shuttle that is permitted, then the trek, an animal, a palanquin or a helicopter.` },
          { t: 'table',
            head: ['From', 'To Gaurikund', 'Notes'],
            rows: [
              ['Rishikesh', 'about 208 km, about 6 hours', 'Nearest large railhead is Rishikesh (Yog Nagari) and Haridwar.'],
              ['Haridwar', 'about 228 km, about 7 hours', 'Main railway junction for the yatra.'],
              ['Dehradun', 'about 245 km, about 7 hours', 'Jolly Grant airport is the nearest airport.'],
            ] },
          { t: 'p', text: `Road times in the hills depend on landslides and traffic. Add a buffer day to your plan, and do not book a flight home for the same day you expect to descend.` },
          { t: 'p', text: `A 12.9 km ropeway from Sonprayag to Kedarnath has been proposed and the construction contract was reported as awarded in September 2025. It was not carrying pilgrims at the time of writing, so plan as if it does not exist and check the news before your trip.` },
        ],
      },
      {
        h: 'The Gaurikund to Kedarnath trek, stage by stage',
        blocks: [
          { t: 'p', text: `The trek is a paved and stepped path with tea stalls and rest stops all the way. Fit walkers take about 6 to 8 hours up, beginners 8 to 10, and the descent is faster but hard on the knees. Start early, around 5 to 6 AM, to finish before the afternoon cloud and cold. The gain is roughly 1,400 m, so go slowly and drink often.` },
          { t: 'table',
            head: ['Stage', 'Approx. distance from Gaurikund', 'What is there'],
            rows: [
              ['Gaurikund', '0 km', 'Start. Shops, toilets, registration check, animal and palanquin counters.'],
              ['Jungle Chatti', 'about 4 to 5 km', 'Tea stalls and basic shelters.'],
              ['Bhimbali', 'about 6 km', 'Water points and small eateries.'],
              ['Linchauli', 'about 9 to 10 km', 'Medical camp, food, stay for those who split the trek.'],
              ['Chhani Camp / Rudra Point', 'about 12 to 14 km', 'Warm-up stops and viewpoints.'],
              ['Kedarnath base area', 'about 15 km', 'Final stretch to the temple.'],
              ['Kedarnath temple', 'about 16 to 17 km', 'Darshan, stay, medical aid.'],
            ] },
          { t: 'note', text: `Stage names and distances differ between published guides, and the official counters are the best final check. Treat the numbers above as approximate, not as measured chainage.` },
          { t: 'ul', items: [
            `Medical posts and mobile medical units operate along the route in season, and the State Disaster Response Force handles evacuation in serious cases.`,
            `Do not attempt the trek with severe asthma, uncontrolled heart disease or uncontrolled high blood pressure without medical advice.`,
            `Staying a night at Bhimbali or Linchauli is a sensible way to split the climb if you are unsure of your stamina.`,
            `Use a trekking pole and shoes with ankle grip. Many pilgrims wear slippers and regret it by the second hour.`,
          ] },
        ],
      },
      {
        h: 'Pony, palki, pitthu and helicopter',
        blocks: [
          { t: 'p', text: `If you cannot or do not wish to walk, there are four options. Fares for animals and carriers are fixed by the state and district authorities and booked at government counters, not online. One travel site that tabulated the 2026 season reported the figures below. Treat them as a guide and confirm the current fare at the counter, because rates are revised and sources do not always agree.` },
          { t: 'table',
            head: ['Service', 'Route', 'Reported 2026 fare (one way)'],
            rows: [
              ['Pony or horse', 'Gaurikund to Kedarnath', '₹3,500'],
              ['Pony or horse', 'Sonprayag to Kedarnath', '₹3,800'],
              ['Pitthu or kandi (basket, up to 25 kg)', 'Gaurikund to Kedarnath', '₹6,000'],
              ['Pitthu or kandi (up to 50 kg)', 'Gaurikund to Kedarnath', '₹8,000'],
              ['Palki or doli (up to 60 kg)', 'Gaurikund to Kedarnath', '₹9,200'],
            ] },
          { t: 'ul', items: [
            `Time taken: ponies about 4 to 5 hours up, pitthu 6 to 8, palki 6 to 9. The last uphill departures are in the early afternoon.`,
            `Book only at official counters at Gaurikund, Bhimbali or Linchauli, check the handler's ID card and keep the slip. Do not pay a palki operator in advance.`,
            `A valid yatra registration is needed for all of these services.`,
            `Children and heavy luggage can be carried by pitthu. Pay after the child or bag arrives safely.`,
          ] },
          { t: 'p', text: `Helicopters fly from Phata, Sersi and Guptkashi, and the flight to the helipad near Kedarnath takes roughly 8 to 10 minutes. Tickets are sold only on the IRCTC helicopter site and need your registration number. Beware of sellers offering tickets elsewhere. Weather can cancel flights at short notice, and you still have a short walk from the helipad to the temple.` },
        ],
      },
      {
        h: 'Darshan, aarti and temple etiquette',
        photos: [
          P('Devotees at Kedarnath temple, Uttrakhand 01.jpg', 'Devotees outside Kedarnath Temple', 'Devotees outside the temple', 'Rohit Sharma', 'CC BY-SA 4.0'),
          P('Devotees at Kedarnath temple, Uttrakhand 02.jpg', 'Pilgrims gathered at Kedarnath Temple', 'Pilgrims gathered at the temple', 'Rohit Sharma', 'CC BY-SA 4.0'),
        ],
        blocks: [
          { t: 'p', text: `Published timings vary. One source lists darshan from 4:00 AM to 9:00 PM with an aarti at 4:00 AM and another at 6:00 PM, while others describe a midday break of two hours or so. Because the hours change with season and crowd, ask the temple office or a BKTC notice on arrival and plan to be in the queue early. Evening aarti is the most atmospheric time, when the temple is lit against the dark peaks.` },
          { t: 'ul', items: [
            `Dress modestly. Traditional or simple clothes are expected inside the temple.`,
            `Phones and cameras are not permitted inside the temple premises. Leave them at your lodging or in a locker if one is offered.`,
            `Prasad is available at official counters. Buy puja items from stalls near the temple and agree on the price first.`,
            `Pujas for pilgrims are arranged through the temple's priests. For online puja booking, use the BKTC portal, which needs an Indian mobile number, and avoid unofficial middlemen.`,
            `Carry a thin rain cover for the queue. Rain and sleet arrive quickly at this altitude.`,
          ] },
        ],
      },
      {
        h: 'Where to stay',
        blocks: [
          { t: 'p', text: `Rooms at Kedarnath itself are limited and fill early in the season. Garhwal Mandal Vikas Nigam (GMVN) runs cottages and tents, and private guest houses, dharamshalas and ashrams operate near the temple. Names listed by travel guides include Hotel Shri Bikaner House, Atithi Seva Sadan, Hotel Behl Ashram and Hotel Trishul, but availability and prices change every season.` },
          { t: 'ul', items: [
            `On the road side, Guptkashi, Sitapur, Phata and Sonprayag have more rooms and suit the night before and after the trek.`,
            `Book the Kedarnath night before you go, because arriving without a room after dark in the cold is dangerous.`,
            `Expect basic rooms with shared bathrooms, limited hot water and power cuts. Electric supply and mobile networks can fail in bad weather.`,
          ] },
        ],
      },
      {
        h: 'What to see in and around Kedarnath',
        photos: [
          P('BhairavnathJi.jpg', 'Shrine of Bhairavnath at Kedarnath', 'Bhairavnath, the guardian deity', 'Samadolfo', 'CC BY-SA 3.0'),
        ],
        blocks: [
          { t: 'ul', items: [
            `Bhairavnath Temple: about 500 m from the main temple on a ridge. Visit it especially at the opening and closing of the season.`,
            `Adi Shankaracharya Samadhi: just behind the main temple. A samadhi puja is held on the last day before the doors close.`,
            `Bhim Shila: the boulder behind the temple that stopped the 2013 debris.`,
            `Chorabari Tal (Gandhi Sarovar): a glacier lake a few kilometres upstream, source of the 2013 surge. Ask locally about current trail conditions before going.`,
            `Vasuki Tal: a high-altitude lake for experienced trekkers with a guide, not for casual visitors.`,
            `Guptkashi: on the approach road. By local tradition this is where Bhima caught the bull.`,
            `Omkareshwar Temple, Ukhimath: the winter seat of Kedarnath, worth a visit in the off season.`,
            `Panch Kedar: Tungnath, Rudranath, Madhyamaheshwar and Kalpeshwar. Tungnath near Chopta is the easiest, and Chandrashila (about 3,679 m) is a popular add-on trek.`,
          ] },
        ],
      },
      {
        h: 'What to eat',
        blocks: [
          { t: 'p', text: `Food on the route is simple, hot and vegetarian-friendly, and prices rise with height because everything is carried up. Expect tea, parathas, dal and rice, khichdi, noodles and soup at the stalls and dhabas, and a basic thali at the GMVN canteens and guest houses. Sources I checked list few named eateries on the trek itself, so rely on what you see on the day and carry your own dry snacks.` },
          { t: 'ul', items: [
            `Carry jaggery, dry fruit, glucose and ORS sachets. Sweet and salty snacks help at altitude.`,
            `Drink plenty of water through the day, and prefer hot drinks in the cold. Alcohol and tobacco are best avoided on a high-altitude yatra.`,
            `In the lower valley, look for local Garhwali dishes such as red rice, jhangora kheer (a millet pudding), aloo ke gutke and kafuli if they are on the menu. Availability varies by season.`,
          ] },
        ],
      },
      {
        h: 'What to buy',
        blocks: [
          { t: 'p', text: `Shops at Gaurikund, Sonprayag, Guptkashi and the Kedarnath bazaar sell prasad, small brass and copper puja items, photographs and framed pictures of the temple, rudraksha beads and woollens. Buy prasad from the official counters, and treat claims about rare or certified rudraksha with caution unless you can verify them. Local honey, dry fruit and woollen caps and gloves are practical buys, and a cap or glove bought on the spot is better than none if you forgot yours.` },
        ],
      },
      {
        h: 'Health and safety at 3,583 metres',
        blocks: [
          { t: 'p', text: `Kedarnath sits at an altitude where oxygen pressure is noticeably lower, and extreme cold, dry air and strong ultraviolet radiation are the main risks, along with rain and slippery steps. Headache, nausea, dizziness, unusual breathlessness and confusion are warning signs of altitude sickness. Rest, drink fluids, do not climb higher, and descend if symptoms worsen. Seek help at a medical post without delay.` },
          { t: 'ul', items: [
            `Emergency numbers listed by the temple committee: State Emergency Operation Centre 0135-2710334 and toll-free 1070. The yatra helpline is 1364.`,
            `Check the weather at mausam.imd.gov.in and health advisories on the Uttarakhand tourism site before you set out.`,
            `Carry your regular medicines for the whole trip, plus extra for two days of delay.`,
            `Do not take a child, an elderly person or anyone unwell above their comfort level. Use a pony, palki or helicopter, or skip the climb.`,
          ] },
        ],
      },
      {
        h: 'A sample plan for a Kedarnath trip',
        blocks: [
          { t: 'ol', items: [
            `Day 1: Reach Haridwar or Rishikesh, collect or print the registration pass, and travel to Guptkashi or Sonprayag.`,
            `Day 2: Early start from Sonprayag to Gaurikund and the trek or ride up. Check in, rest and attend the evening aarti.`,
            `Day 3: Morning darshan, then visit Bhairavnath and the Shankaracharya samadhi, and begin the descent in good weather.`,
            `Day 4: Return to Haridwar or Rishikesh. Keep a spare day in your schedule for landslide delays.`,
          ] },
        ],
      },
      {
        h: 'Prayers and mantras to chant',
        photos: [
          P('Devotee at Kedarnath Temple (India).jpg', 'A devotee at Kedarnath Temple', 'A devotee at the temple', 'Abhishek.katariya1804', 'CC BY-SA 4.0'),
        ],
        blocks: [
          { t: 'p', text: `Pilgrims commonly chant the five-syllable Om Namah Shivaya on the climb, and many recite the Shiva Tandava Stotram, the Maha Mrityunjaya Mantra and the Shiv Chalisa at the shrine. Pages for these are on this site, with Hindi, Odia and Telugu text and meanings.` },
        ],
      },
    ],
    gear: {
      intro:
        'Kedarnath is cold at any time of year and wet in the monsoon. Pack in layers and check weight, because you will carry the bag or pay a porter. The links below open search pages on Amazon, Flipkart and Decathlon so you can compare brands and prices yourself.',
      groups: [
        {
          who: 'For everyone',
          items: [
            { name: 'Trekking shoes with ankle grip', why: 'Wet stone steps and mud. Avoid slippers and new shoes you have not worn in.', q: 'trekking shoes', icon: '🥾' },
            { name: 'Trekking pole', why: 'Takes load off the knees on the long descent.', q: 'trekking pole', icon: '🦯' },
            { name: 'Rain poncho or rain jacket', why: 'Showers and sleet come quickly at any season.', q: 'rain poncho', icon: '🧥' },
            { name: 'Thermal inner wear', why: 'Base layer for nights near 0 °C.', q: 'thermal inner wear', icon: '🧦' },
            { name: 'Padded or fleece jacket', why: 'Middle layer for the evening and the aarti queue.', q: 'fleece jacket', icon: '🧥' },
            { name: 'Woollen cap and gloves', why: 'Heat loss is greatest from the head and hands.', q: 'woolen cap and gloves', icon: '🧤' },
            { name: 'Daypack with rain cover (20 to 30 L)', why: 'Keep it light. Use a waterproof cover.', q: 'trekking backpack 30l rain cover', icon: '🎒' },
            { name: 'Sunscreen and sunglasses', why: 'Strong UV at altitude, even in cloud.', q: 'sunscreen spf 50 and sunglasses', icon: '🕶️' },
            { name: 'Headlamp or torch and power bank', why: 'Early starts and power cuts.', q: 'headlamp torch power bank', icon: '🔦' },
            { name: 'Water bottle and ORS', why: 'Hydration prevents most altitude problems.', q: 'water bottle 1 litre', icon: '💧' },
            { name: 'First aid kit and basic medicines', why: 'Pain relief, antacid, bandages, personal medicines.', q: 'first aid kit', icon: '🩹' },
            { name: 'Quick-dry socks (spare pairs)', why: 'Wet feet cause blisters and chill.', q: 'trekking socks', icon: '🧦' },
          ],
        },
        {
          who: 'For men',
          items: [
            { name: 'Quick-dry track pants', why: 'Dry fast after rain and do not chafe on a long climb.', q: 'men trekking track pants quick dry', icon: '👖' },
            { name: 'Full-sleeve moisture-wicking t-shirts', why: 'Wear several layers rather than one thick one.', q: 'men full sleeve dry fit t-shirt', icon: '👕' },
            { name: 'Down or padded jacket', why: 'For the cold evening and the night.', q: 'men padded jacket', icon: '🧥' },
          ],
        },
        {
          who: 'For women',
          items: [
            { name: 'Quick-dry leggings or trekking pants', why: 'Comfortable and practical for the climb and the steps.', q: 'women trekking pants quick dry', icon: '👖' },
            { name: 'Full-sleeve dry-fit tops', why: 'Layer under a fleece and a jacket.', q: 'women full sleeve dry fit top', icon: '👚' },
            { name: 'Shawl or stole', why: 'Modest cover for the temple and extra warmth.', q: 'woolen shawl women', icon: '🧣' },
            { name: 'Personal hygiene items', why: 'Facilities are limited. Pack what you need for the whole trip.', q: 'sanitary pads travel pack', icon: '🧴' },
          ],
        },
        {
          who: 'For kids',
          items: [
            { name: 'Kids thermal wear and fleece', why: 'Children chill faster than adults. Add a layer early.', q: 'kids thermal wear', icon: '🧒' },
            { name: 'Kids rain suit', why: 'A full suit keeps them dry and happy.', q: 'kids rain suit', icon: '☔' },
            { name: 'Kids woollen cap and gloves', why: 'Small hands and ears get cold first.', q: 'kids woolen cap gloves', icon: '🧤' },
            { name: 'Kids trekking shoes', why: 'Grip matters more than looks.', q: 'kids trekking shoes', icon: '👟' },
            { name: 'Light snacks and glucose', why: 'Keep sugar levels steady on the climb.', q: 'glucose biscuits kids snacks', icon: '🍪' },
          ],
        },
        {
          who: 'For elders',
          items: [
            { name: 'Knee cap or knee support', why: 'Eases pressure on the descent.', q: 'knee support', icon: '🦵' },
            { name: 'Walking stick', why: 'Added stability on wet steps.', q: 'folding walking stick', icon: '🦯' },
            { name: 'Warm socks and a muffler', why: 'Cold-sensitive feet and neck.', q: 'woolen socks muffler', icon: '🧣' },
            { name: 'Pill organiser', why: 'Do not miss regular medicines in the rush.', q: 'pill organiser', icon: '💊' },
          ],
        },
      ],
    },
    travel: {
      place: 'Kedarnath',
      official: { name: 'Uttarakhand Tourism (official)', url: 'https://uttarakhandtourism.gov.in/' },
      extra: [
        { name: 'Official yatra registration', url: 'https://registrationandtouristcare.uk.gov.in/', note: 'Free and compulsory. Do this first.', icon: '📝' },
        { name: 'Helicopter tickets (IRCTC)', url: 'https://heliyatra.irctc.co.in/', note: 'Only official booking site', icon: '🚁' },
      ],
    },
    faqs: [
      { q: 'Is registration compulsory for Kedarnath?', a: 'Yes. The Uttarakhand Tourism Development Board requires every pilgrim to register for the Char Dham shrines, and you can be stopped at checkpoints without a valid QR pass. It is free, and you can register on the official portal, the Tourist Care Uttarakhand app, by WhatsApp or at offline counters.' },
      { q: 'When does Kedarnath temple open and close?', a: 'It opens around Akshaya Tritiya, with the date announced on Maha Shivaratri from Ukhimath, and closes on Bhai Dooj. In 2026 it opened on 22 April and closed on 11 November. The 2027 dates will be announced around Maha Shivaratri 2027.' },
      { q: 'What is the best month to visit Kedarnath?', a: 'Late May to June and mid September to mid October are the most comfortable windows. July and August are the wettest months and carry a higher landslide risk. April and November are the coldest.' },
      { q: 'How long is the Kedarnath trek and how many hours does it take?', a: 'About 16 to 17 km from Gaurikund (published figures range from 14 to 18 km). Fit trekkers need about 6 to 8 hours up and beginners 8 to 10. A pony takes roughly 4 to 5 hours and a palki 6 to 9.' },
      { q: 'Can elderly people and children visit Kedarnath?', a: 'Many do, using a pony, palki, pitthu or helicopter. A health check is advised for older pilgrims and anyone with heart, blood pressure or breathing problems. Children need warm clothing and close watching because they chill quickly at altitude.' },
      { q: 'How do I book a Kedarnath helicopter ticket?', a: 'Only through heliyatra.irctc.co.in, and you need your yatra registration number. Flights run from Phata, Sersi and Guptkashi, and the flight takes about 8 to 10 minutes. Avoid anyone selling tickets outside the official site.' },
      { q: 'Are mobile phones and cameras allowed inside the temple?', a: 'No. Photography and phones are not permitted inside the temple premises. Leave them at your lodging or in a safe place.' },
      { q: 'What is the Kedarnath temple dress code?', a: 'Simple, modest and traditional or formal clothing is expected inside. In practice most people wear warm layers over simple clothes, and a shawl or stole is useful.' },
      { q: 'Where does Kedarnath go in winter?', a: 'The deity is carried in a procession to the Omkareshwar Temple in Ukhimath, where it is worshipped for about six months. The valley is under snow and the route is closed.' },
      { q: 'Why is Kedarnath famous?', a: 'It is the highest of the twelve Jyotirlingas of Shiva, the first of the Panch Kedar temples and one of the four Char Dham shrines of Uttarakhand. It is also known for surviving the 2013 flood, when a large boulder, now worshipped as Bhim Shila, shielded the structure.' },
      { q: 'How much does a pony or palki cost?', a: 'Fares are fixed by the state and district authorities and booked at official counters. One 2026 compilation reported about ₹3,500 for a pony from Gaurikund and ₹9,200 for a palki up to 60 kg. Confirm the current fare at the counter, as rates are revised.' },
      { q: 'Who built the Kedarnath temple?', a: 'Tradition says the Pandavas built the first temple and that Adi Shankara revived it. The Mahabharata itself does not mention Kedarnath, and the dating of the present stone structure is uncertain, so scholars treat the origin story as tradition.' },
    ],
    sources: [
      { t: 'Kedarnath Temple, Wikipedia (legends, history, priests, 2013 flood, access)', u: 'https://en.wikipedia.org/wiki/Kedarnath_Temple' },
      { t: 'Kedarnath, Wikipedia (climate table, geography, nearby places)', u: 'https://en.wikipedia.org/wiki/Kedarnath' },
      { t: 'Tourist Care Uttarakhand, official yatra registration portal', u: 'https://registrationandtouristcare.uk.gov.in/' },
      { t: 'Shri Badrinath-Kedarnath Temple Committee, official site', u: 'https://badrinath-kedarnath.gov.in/' },
      { t: 'Business Today, Kedarnath Yatra 2026 begins (opening date, registration rules)', u: 'https://www.businesstoday.in/india/story/kedarnath-yatra-2026-begins-as-temple-opens-over-19-lakh-pilgrims-register-heres-what-to-note-526983-2026-04-23' },
      { t: 'Prasar Bharati (News on AIR), Kedarnath closing 11 November 2026', u: 'https://newsonair.gov.in/kedarnath-and-yamunotri-dhams-to-close-for-winter-today/' },
      { t: 'Yatradham, how Kedarnath opening and closing dates are set', u: 'https://blog.yatradham.org/kedarnath-kapat-opening-closing-date/' },
      { t: 'Holidify, Char Dham registration guide', u: 'https://www.holidify.com/pages/char-dham-yatra-registration-6488.html' },
      { t: 'Char Dham Tour, Kedarnath trek guide', u: 'https://www.chardhamtour.in/blog/kedarnath-trek-guide/' },
      { t: 'Manchala Mushafir, pony, palki and kandi rates 2026', u: 'https://www.manchalamushafir.com/kedarnath-pony-palquin-kandi-mules-rates/' },
      { t: 'Savaari, things to do near Kedarnath Temple', u: 'https://www.savaari.com/blog/?p=22449' },
    ],
    related: {
      stotrams: ['shiva-tandav', 'maha-mrityunjaya-mantra', 'shiv-chalisa'],
      guides: ['maha-shivaratri-guide', 'how-to-chant-shiva-mantra', 'shiva-tandav-benefits'],
    },
  },
];

export function getTempleBySlug(slug) {
  return TEMPLES.find((t) => t.slug === slug) || null;
}
