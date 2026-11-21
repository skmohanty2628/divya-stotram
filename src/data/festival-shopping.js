// "What to buy" lists for festival guides. Plain retailer search links only (see gear-links.js).
// Each item: icon (shown in a tile, not a product photo), name, why, q (retailer search words).
const I = (icon, name, why, q) => ({ icon, name, why, q });

const KIT = {
  thali: [
    I('🪔', 'Brass or copper puja thali set', 'Plate, bowls, spoon and kalash in one set for daily and festival worship.', 'brass puja thali set'),
    I('🏺', 'Kalash (copper or brass)', 'For holy water and the kalash sthapana.', 'copper kalash for puja'),
    I('🕯️', 'Cotton wicks and ghee or oil', 'Long cotton wicks burn cleanly in a diya.', 'cotton wicks for diya'),
    I('🌿', 'Incense sticks and dhoop', 'Pick a natural, low-smoke brand if you have children or elders at home.', 'incense sticks dhoop puja'),
    I('🔥', 'Camphor (kapoor)', 'For the aarti at the end of the puja.', 'camphor kapoor puja'),
    I('🔴', 'Kumkum, haldi and roli set', 'The basic tilak and offering colours.', 'kumkum haldi roli set'),
    I('🔔', 'Puja bell (ghanti)', 'Rung during the aarti.', 'brass puja bell'),
    I('🧘', 'Asan (sitting mat)', 'Wool or cotton mat for sitting through a long puja.', 'puja asan mat'),
  ],
  diyas: [
    I('🪔', 'Clay diyas (set of 12 to 50)', 'Traditional, cheap and good for the neighbourhood potters too.', 'clay diyas for diwali'),
    I('🏮', 'Brass akhand diya or oil lamp', 'A deep lamp that burns through the night.', 'brass akhand diya'),
    I('🛢️', 'Diya oil or ghee', 'Use ghee or sesame or mustard oil as your family does.', 'diya oil pooja'),
    I('🪵', 'Diya stand or lamp plate', 'Keeps rows of lamps steady on a ledge.', 'diya stand brass'),
  ],
  lights: [
    I('✨', 'LED string lights (warm white)', 'Safe for balconies and windows, reusable every year.', 'led string lights warm white'),
    I('🕯️', 'Flameless LED tealights', 'For homes with children, or in windy places.', 'led tea light candles'),
    I('🎨', 'Rangoli colours and stencils', 'Quick and neat designs for the doorstep.', 'rangoli colours stencils'),
    I('🌼', 'Artificial marigold toran', 'A door garland that lasts all season.', 'marigold toran door hanging'),
    I('🌸', 'Floating candles for the urli bowl', 'For a brass urli with flowers and water.', 'urli bowl floating candles'),
  ],
  menWear: [
    I('👔', 'Kurta pyjama set', 'Cotton or silk blend for the puja day.', 'men kurta pyjama set festive'),
    I('🧵', 'Dhoti and angavastram', 'Needed in many South Indian and Odisha temples.', 'cotton dhoti angavastram'),
    I('👞', 'Mojari or kolhapuri sandals', 'Easy to remove outside the temple.', 'mens kolhapuri sandals'),
  ],
  womenWear: [
    I('🥻', 'Silk or cotton saree', 'Regional weaves suit each festival, see the notes below.', 'silk saree festive'),
    I('👗', 'Salwar suit or anarkali', 'A comfortable option for long standing and queues.', 'women anarkali suit festive'),
    I('🧣', 'Dupatta or stole', 'Also useful for covering the head inside temples.', 'dupatta festive women'),
    I('💍', 'Traditional jewellery set', 'Temple or oxidised jewellery for the puja.', 'temple jewellery set'),
  ],
  kidsWear: [
    I('🧒', 'Boys ethnic wear (kurta set)', 'Soft cotton fits long festival days.', 'boys kurta pyjama set'),
    I('👧', 'Girls lehenga or ethnic frock', 'Choose cotton lining for comfort.', 'girls ethnic wear lehenga'),
  ],
  sweets: [
    I('🍬', 'Sweet boxes and dry fruit gift packs', 'For prasad and for visiting neighbours and relatives.', 'diwali sweets gift box'),
    I('🥥', 'Dry fruits and coconut', 'Common offerings and gifts.', 'dry fruits gift pack'),
    I('🍯', 'Pure ghee (for lamps and prasad)', 'Check the label for 100% milk fat.', 'pure cow ghee'),
  ],
  shiva: [
    I('🕉️', 'Rudraksha mala', 'For japa. Buy from a trusted seller and check the bead quality.', 'rudraksha mala 108'),
    I('🔱', 'Shivling abhishek set', 'Plate, lota and small shivling for home abhishek.', 'shivling abhishek set'),
    I('🍃', 'Bel patra (fresh) and white flowers', 'Usually bought fresh the same morning.', 'bel patra puja'),
    I('💧', 'Gangajal and panchamrit items', 'Gangajal, milk, curd, honey, ghee and sugar for abhishek.', 'gangajal bottle'),
    I('📿', 'Vibhuti (sacred ash)', 'Applied as a tilak.', 'vibhuti sacred ash'),
  ],
  krishna: [
    I('👶', 'Laddu Gopal idol and poshak (dress)', 'For the birthday of baby Krishna.', 'laddu gopal poshak set'),
    I('🛏️', 'Jhula (swing) for Laddu Gopal', 'For the swing ceremony at midnight.', 'laddu gopal jhula'),
    I('🪈', 'Flute and mor pankh (peacock feather)', 'Krishna decorations for the shrine.', 'krishna flute mor pankh'),
    I('🍶', 'Pot and rope for Dahi Handi decoration', 'Used in community and school events.', 'dahi handi matki decoration'),
    I('🌿', 'Tulsi mala', 'For japa and for dressing the deity.', 'tulsi mala'),
  ],
  ganesh: [
    I('🐘', 'Eco-friendly clay Ganesh idol', 'Choose natural clay and natural colours, which dissolve safely at immersion.', 'eco friendly ganesh idol clay'),
    I('🥮', 'Modak mould', 'For making steamed modaks at home.', 'modak mould'),
    I('🌺', 'Durva grass and red flowers', 'Usually bought fresh from the local flower market.', 'durva grass puja'),
    I('🎪', 'Decoration kit for the mandap', 'Lights, curtains and backdrop for the idol.', 'ganpati decoration items'),
    I('📿', 'Red chandan and sindoor', 'Offered to Ganesha.', 'red chandan sindoor puja'),
  ],
  navaratri: [
    I('💃', 'Chaniya choli (garba outfit)', 'Mirror work and bright colours for the nine nights.', 'chaniya choli navratri'),
    I('🥢', 'Dandiya sticks (pair)', 'Wooden sticks with a good grip.', 'dandiya sticks'),
    I('👘', 'Kediyu or kurta set for men', 'Traditional Garba wear for men.', 'kediyu garba men'),
    I('💎', 'Oxidised jewellery set', 'Pairs well with chaniya choli.', 'oxidised jewellery set navratri'),
    I('🛕', 'Durga idol or framed picture', 'For the kalash and ghatasthapana.', 'durga maa idol for puja'),
    I('🌱', 'Jau (barley) seeds and earthen pot', 'For the nine-day ghatasthapana.', 'ghatasthapana kit'),
  ],
  durga: [
    I('🥻', 'Red-border white saree', 'Classic Durga Puja saree for the Ashtami and Dashami days.', 'red border white saree durga puja'),
    I('🐚', 'Shankha and conch holder', 'Blown during the puja and sandhi aarti.', 'shankha conch puja'),
    I('💨', 'Dhunuchi (incense burner) and coconut husk', 'Used in the dhunuchi dance and aarti.', 'dhunuchi for puja'),
    I('🌸', 'Sindoor and alta', 'Used in sindoor khela and for the feet of the goddess.', 'sindoor alta puja'),
  ],
  rama: [
    I('🏹', 'Ram darbar photo or idol', 'The family worship image with Sita, Lakshmana and Hanuman.', 'ram darbar idol'),
    I('🚩', 'Saffron Ram flag (jhanda)', 'For homes, vehicles and processions.', 'ram navami flag'),
    I('📘', 'Ramcharitmanas or Sundarkand book', 'Pick a Hindi or regional script edition with clear print.', 'ramcharitmanas gita press'),
    I('📿', 'Tulsi mala', 'For Ram naam japa.', 'tulsi mala'),
  ],
  hanuman: [
    I('🔴', 'Sindoor and chameli oil', 'Traditionally applied to Hanuman images.', 'sindoor chameli oil hanuman'),
    I('📘', 'Hanuman Chalisa book', 'Pocket edition with meaning.', 'hanuman chalisa book'),
    I('🌺', 'Red flowers and garland', 'Bought fresh the same morning.', 'hanuman puja samagri'),
    I('🚩', 'Hanuman flag (jhanda)', 'For the home and the rooftop.', 'hanuman jhanda flag'),
  ],
  saraswati: [
    I('📚', 'Books, pens and notebooks for the puja', 'Placed before the goddess and not used for study that day.', 'saraswati puja items'),
    I('🎶', 'Small veena or musical instrument', 'A symbolic offering for the goddess of music.', 'miniature veena'),
    I('💛', 'Yellow dress or dupatta', 'Yellow is the colour of the festival.', 'yellow kurta women'),
    I('🖼️', 'Saraswati idol or framed picture', 'For the home shrine.', 'saraswati idol for puja'),
  ],
  chhath: [
    I('🧺', 'Bamboo soop and daura', 'The flat bamboo tray and basket used for the offerings at the ghat.', 'bamboo soop chhath'),
    I('🍌', 'Fruits for the arghya (banana, sugarcane, coconut)', 'Bought fresh a day before.', 'chhath puja samagri'),
    I('🍪', 'Thekua mould and ingredients', 'For the traditional thekua.', 'thekua mould'),
    I('🥣', 'Copper or brass vessels for arghya', 'For the water offering.', 'copper lota arghya'),
    I('🧥', 'New clothes for the vrati and family', 'Clean, new cotton clothes are traditional.', 'chhath puja saree'),
    I('🎋', 'Sugarcane stalks', 'Tied into a canopy at the ghat and offered with the arghya.', 'sugarcane sticks puja'),
  ],
  tulsi: [
    I('🌱', 'Tulsi plant pot (Rama or Shyama tulsi)', 'Healthy plant for the wedding ceremony.', 'tulsi plant pot'),
    I('🧣', 'Red chunri and bangles for Tulsi', 'Dresses Tulsi as the bride.', 'tulsi vivah chunri'),
    I('🪨', 'Shaligram or small Vishnu idol', 'Plays the groom.', 'shaligram shila'),
    I('🏺', 'Sugarcane and mandap decoration', 'Used to make the wedding mandap.', 'tulsi vivah decoration'),
  ],
  karthika: [
    I('🪔', 'Clay or brass diyas for evening lamps', 'For the daily lamp at dusk, the heart of Karthika.', 'clay diyas karthika deepam'),
    I('🌿', 'Amla (gooseberry) lamp set and wicks', 'In Telugu homes, lamps are lit on amla.', 'cotton wicks vibhuti diya'),
    I('🕯️', 'Karthika deepam lamp stand', 'A tall lamp stand for the courtyard.', 'brass deepam stand'),
  ],
  sabarimala: [
    I('⚫', 'Black or blue dhoti and shirt set', 'Worn through the 41-day vratham.', 'ayyappa black dhoti set'),
    I('📿', 'Tulsi or rudraksha mala', 'Worn from the start of the vratham.', 'ayyappa mala tulsi'),
    I('🎒', 'Irumudi kettu bag and kit', 'The two-compartment bag carried on the head to the shrine.', 'irumudi kettu bag'),
    I('🥥', 'Ghee-filled coconut (neyyathenga) kit', 'The offering carried in the irumudi.', 'neyyathenga ayyappa'),
    I('🦶', 'Soft footwear or socks for the walk', 'Pilgrims walk barefoot, so many carry socks for cold mornings.', 'cotton socks'),
  ],
  odiaWear: [
    I('🥻', 'Sambalpuri or Bomkai saree', 'The traditional handloom of Odisha. Buy from a handloom shop or cooperative.', 'sambalpuri saree'),
    I('👕', 'Odia dhoti and gamucha', 'Cotton wear for puja and temples.', 'odisha dhoti gamucha'),
    I('🥻', 'Pasapalli or Khandua saree', 'Odisha silk and ikat weaves.', 'khandua saree odisha'),
  ],
  odiaPuja: [
    I('🪔', 'Brass diya and dhupa', 'For the home shrine.', 'brass diya dhupa'),
    I('🥣', 'Brass thali and bell', 'For the puja plate and aarti.', 'brass puja thali set'),
    I('🎨', 'Chita (rice paste) colour and brush', 'For the floor patterns drawn in front of the shrine.', 'alpona rangoli rice flour colour'),
  ],
  pitru: [
    I('🌾', 'Black til (sesame) and barley', 'Used in tarpan and pinda daan.', 'black sesame seeds tarpan'),
    I('🌿', 'Kusha grass', 'Used in shraddha rituals.', 'kusha grass puja'),
    I('🏺', 'Copper lota and plate', 'For the water offering.', 'copper lota puja'),
    I('🍚', 'Pinda daan kit', 'Includes the items needed for the ritual. Ask your priest before buying.', 'pind daan samagri'),
  ],
  dhanu: [
    I('📘', 'Tiruppavai book with meaning', 'For the dawn recital in the month.', 'tiruppavai book'),
    I('🎨', 'Kolam powder and stencils', 'For the dawn kolam at the doorstep.', 'kolam powder rangoli'),
    I('🥣', 'Brass vessel for the Pongal offering', 'For the sweet Pongal prasad.', 'brass uruli pongal'),
  ],
  rakhi: [
    I('🧵', 'Pata rakhi or silk rakhi', 'Choose the handwoven kind where you can.', 'pata rakhi'),
    I('🥥', 'Areca nut and cotton garlands', 'For the festival garlands.', 'puja garland cotton'),
  ],
  swing: [
    I('🛝', 'Cotton rope swing (jhula)', 'For the swing in the courtyard or balcony.', 'rope jhula swing'),
    I('🎨', 'Alta and mehendi', 'Used by girls on Raja.', 'alta mehendi'),
    I('🎀', 'Bangles and hair accessories', 'A small gift for the girls.', 'glass bangles set'),
  ],
  holi: [
    I('🎨', 'Herbal gulal and organic colours', 'Safer for skin and eyes than synthetic colours.', 'herbal gulal organic colours'),
    I('🔫', 'Pichkari (water gun)', 'For the water play.', 'holi pichkari'),
    I('👕', 'White cotton kurta for the day', 'Soft old clothes you do not mind staining.', 'white kurta holi'),
    I('🧴', 'Coconut oil and sunscreen', 'Apply before colours to protect skin and hair.', 'coconut oil hair skin'),
  ],
  fastEkadashi: [
    I('🍌', 'Fasting foods (sabudana, makhana, rajgira)', 'Common vrat foods.', 'vrat food makhana sabudana'),
    I('🌿', 'Tulsi leaves or tulsi mala', 'Offered to Vishnu.', 'tulsi mala'),
    I('📘', 'Vishnu Sahasranamam book', 'For the evening recital.', 'vishnu sahasranamam book'),
    I('🪔', 'Ghee diya set', 'For the evening lamp.', 'brass diya set'),
  ],
  surya: [
    I('🥇', 'Copper arghya lota', 'The traditional vessel for the water offering.', 'copper lota arghya'),
    I('🔴', 'Red flowers and red chandan', 'Offered to the Sun.', 'red chandan puja'),
  ],
  dattaGuru: [
    I('📘', 'Guru Charitra book', 'For the weekly parayana, in Marathi, Kannada, Telugu or Hindi.', 'guru charitra book'),
    I('🪔', 'Datta idol or picture', 'The three-faced form for the shrine.', 'dattatreya idol'),
    I('🌼', 'Yellow flowers and sandalwood paste', 'Common offerings.', 'sandalwood paste puja'),
  ],
  annapurna: [
    I('🍚', 'Annapurna idol or picture', 'The goddess of food, kept in the kitchen shrine.', 'annapurna devi idol'),
    I('🌾', 'Rice, dal and grain for donation', 'Giving food is central to the day.', 'rice 5 kg'),
  ],
  bhairava: [
    I('🔥', 'Mustard oil and black til', 'Offered to Kala Bhairava.', 'mustard oil lamp puja'),
    I('📘', 'Kalabhairava Ashtakam book', 'For the recital.', 'kalabhairava ashtakam book'),
  ],
  skanda: [
    I('🦚', 'Murugan or Subrahmanya idol', 'For the home shrine.', 'murugan idol'),
    I('🍯', 'Panchamrit items', 'Milk, curd, honey, ghee, sugar.', 'panchamrit pack'),
    I('🌸', 'Red flowers and kumkum', 'Offered to Subrahmanya.', 'kumkum puja'),
  ],
  cow: [
    I('🐄', 'Fodder and jaggery for the cow', 'The usual offering at a gaushala.', 'jaggery gur'),
    I('🌸', 'Garlands and bells for decorating the cow', 'Traditional decoration.', 'cow bell brass'),
    I('🔴', 'Haldi and kumkum', 'For the tilak on the cow.', 'kumkum haldi roli set'),
  ],
  boat: [
    I('⛵', 'Boita (small boat) kit', 'Banana stem, paper and cotton wick to float at dawn.', 'paper boat diya'),
    I('🪔', 'Cotton wicks and oil', 'Lit in the boats.', 'cotton wicks for diya'),
  ],
  yatra: [
    I('🛕', 'Small Jagannath, Balabhadra and Subhadra set', 'For the home shrine during the festival.', 'jagannath balabhadra subhadra idol'),
    I('🥥', 'Tulsi mala and sandal paste', 'Simple Jagannath puja items.', 'tulsi mala'),
    I('📘', 'Jagannath Ashtakam or Odia bhajan book', 'For the evening recital.', 'jagannath ashtakam book'),
  ],
};

const TRIP = {
  base: [
    I('👟', 'Comfortable, slip-on walking footwear', 'You remove shoes at every temple, so easy-off sandals or sneakers save time.', 'walking sandals slip on'),
    I('🔋', 'Power bank (10000 mAh)', 'Long queues drain the phone.', 'power bank 10000mah'),
    I('🎒', 'Small zip backpack', 'Many temples allow only small bags, so keep it light.', 'small backpack zip'),
    I('🚰', 'Reusable water bottle', 'Refill from safe sources.', 'steel water bottle'),
    I('🧴', 'Hand sanitiser and wet wipes', 'For crowded queues.', 'hand sanitizer wet wipes'),
    I('🩹', 'Basic first aid kit', 'Pain relief, band aids, ORS, motion sickness tablets (ask your doctor for your own needs).', 'first aid kit travel'),
  ],
  hot: [
    I('🧢', 'Cotton cap or hat', 'For the walk between queues.', 'cotton cap'),
    I('🧴', 'Sunscreen (SPF 30+)', 'For long open-air queues.', 'sunscreen spf 50'),
    I('🥤', 'ORS and electrolyte sachets', 'For heat and long fasts.', 'ors electrolyte sachets'),
    I('👕', 'Light cotton clothes', 'Easy to dry and comfortable.', 'cotton kurta men women light'),
  ],
  rain: [
    I('🧥', 'Rain poncho', 'Covers you and a small bag.', 'rain poncho'),
    I('🩴', 'Waterproof sandals or floaters', 'For wet streets and ghats.', 'waterproof floaters'),
    I('☔', 'Compact umbrella', 'For short showers.', 'umbrella compact'),
    I('🎒', 'Backpack rain cover or dry bag', 'Protects phone, tickets and papers.', 'backpack rain cover'),
  ],
  cool: [
    I('🧥', 'Light jacket or cardigan', 'Mornings and evenings are cool.', 'light jacket'),
    I('🧣', 'Shawl or stole', 'Also useful inside temples.', 'shawl stole'),
    I('🧦', 'Cotton socks', 'For cold temple floors.', 'cotton socks'),
  ],
  cold: [
    I('🧥', 'Padded or fleece jacket', 'For cold mornings and ghats.', 'fleece jacket'),
    I('🧤', 'Woollen cap and gloves', 'Heat loss is greatest from the head and hands.', 'woolen cap and gloves'),
    I('🧦', 'Thermal innerwear', 'Base layer for chilly mornings.', 'thermal inner wear'),
    I('🧣', 'Woollen muffler or shawl', 'For riverside mornings.', 'woolen muffler'),
  ],
  family: [
    I('🦯', 'Foldable walking stick', 'For elders on steps and queues.', 'foldable walking stick'),
    I('🦵', 'Knee support', 'For long queues and steps (check with a doctor for medical use).', 'knee support brace'),
    I('🍪', 'Snacks and water for children', 'Queues can be long.', 'kids snacks travel'),
    I('🧸', 'Baby wipes and spare clothes', 'For small children.', 'baby wipes'),
  ],
};

function trip(season) {
  const groups = [{ who: 'For the trip (everyone)', items: [...TRIP.base, ...(TRIP[season] || [])] }];
  groups.push({ who: 'For kids and elders', items: TRIP.family });
  return groups;
}

function S(title, intro, kits, season) {
  const groups = kits.map(([who, key]) => ({ who, items: KIT[key] }));
  if (season) groups.push(...trip(season));
  return { title, intro, groups };
}

const INTRO_HOME =
  'Here is a simple shopping list for the festival. The buttons open search pages on Amazon, Flipkart and Decathlon in a new tab, so you can compare brands, sizes and prices yourself. The pictures are icons, not product photos.';

export const FESTIVAL_SHOPPING = {
  'diwali-lakshmi-puja-guide': S('What to buy for Diwali', INTRO_HOME + ' Diwali shopping is mostly about lamps, lights, clothes and sweets, and Ayodhya trips need a few extras for the cool November evenings.', [
    ['Diyas and lamps', 'diyas'], ['Lights and decoration', 'lights'], ['Puja items', 'thali'],
    ['Traditional dress for men', 'menWear'], ['Traditional dress for women', 'womenWear'], ['Traditional dress for kids', 'kidsWear'], ['Sweets and gifts', 'sweets'],
  ], 'cool'),
  'krishna-janmashtami-guide': S('What to buy for Janmashtami', INTRO_HOME, [
    ['Krishna worship items', 'krishna'], ['Puja items', 'thali'], ['Traditional dress for women', 'womenWear'], ['Traditional dress for men', 'menWear'], ['Traditional dress for kids', 'kidsWear'],
  ], 'rain'),
  'ganesh-chaturthi-guide': S('What to buy for Ganesh Chaturthi', INTRO_HOME, [
    ['Ganesh worship items', 'ganesh'], ['Puja items', 'thali'], ['Lights and decoration', 'lights'], ['Traditional dress for men', 'menWear'], ['Traditional dress for women', 'womenWear'],
  ], 'rain'),
  'navaratri-nine-forms-of-durga': S('What to buy for Navaratri', INTRO_HOME, [
    ['Navaratri and Garba items', 'navaratri'], ['Puja items', 'thali'], ['Traditional dress for women', 'womenWear'], ['Traditional dress for men', 'menWear'],
  ], 'cool'),
  'maha-shivaratri-guide': S('What to buy for Maha Shivaratri', INTRO_HOME, [
    ['Shiva puja items', 'shiva'], ['Puja items', 'thali'], ['Dress for the temple', 'menWear'],
  ], 'mild'),
  'maha-shivaratri-lingaraj-mahadeepa-bhubaneswar-guide': S('What to buy for Maha Shivaratri', INTRO_HOME, [
    ['Shiva puja items', 'shiva'], ['Odisha handloom and dress', 'odiaWear'],
  ], 'hot'),
  'rama-navami-guide': S('What to buy for Rama Navami', INTRO_HOME, [
    ['Ram worship items', 'rama'], ['Puja items', 'thali'], ['Traditional dress for men', 'menWear'], ['Traditional dress for women', 'womenWear'],
  ], 'hot'),
  'hanuman-jayanti-guide': S('What to buy for Hanuman Jayanti', INTRO_HOME, [
    ['Hanuman worship items', 'hanuman'], ['Puja items', 'thali'],
  ], 'hot'),
  'vasant-panchami-saraswati-puja-guide': S('What to buy for Vasant Panchami', INTRO_HOME, [
    ['Saraswati puja items', 'saraswati'], ['Puja items', 'thali'], ['Traditional dress for kids', 'kidsWear'],
  ], 'cool'),
  'durga-puja-odisha-guide': S('What to buy for Durga Puja', INTRO_HOME, [
    ['Durga Puja items', 'durga'], ['Odisha handloom and dress', 'odiaWear'], ['Puja items', 'thali'], ['Traditional dress for men', 'menWear'],
  ], 'cool'),
  'chhath-puja-surya-shashthi-guide': S('What to buy for Chhath Puja', INTRO_HOME + ' Many families buy new clothes and the bamboo items a few days before.', [
    ['Chhath items', 'chhath'], ['Arghya and Surya worship', 'surya'], ['Puja items', 'thali'],
  ], 'cool'),
  'tulsi-vivah-dev-uthani-ekadashi-guide': S('What to buy for Tulsi Vivah', INTRO_HOME, [
    ['Tulsi Vivah items', 'tulsi'], ['Puja items', 'thali'], ['Fasting and Ekadashi items', 'fastEkadashi'],
  ], 'cool'),
  'prabodhini-ekadashi-bada-ekadashi-odisha-guide': S('What to buy for Bada Ekadashi', INTRO_HOME, [
    ['Fasting and Ekadashi items', 'fastEkadashi'], ['Odisha puja items', 'odiaPuja'],
  ], 'cool'),
  'karthika-masam-telugu-month-2026-dates-guide': S('What to buy for Karthika Masam', INTRO_HOME, [
    ['Karthika lamps', 'karthika'], ['Shiva puja items', 'shiva'], ['Puja items', 'thali'],
  ], 'cool'),
  'kartika-month-odisha-guide': S('What to buy for Kartika in Odisha', INTRO_HOME, [
    ['Lamps and Kartika worship', 'karthika'], ['Odisha puja items', 'odiaPuja'], ['Fasting and Ekadashi items', 'fastEkadashi'],
  ], 'cool'),
  'panchuka-kartika-last-five-days-odisha-guide': S('What to buy for Panchuka', INTRO_HOME, [
    ['Lamps and Kartika worship', 'karthika'], ['Odisha puja items', 'odiaPuja'], ['Fasting and Ekadashi items', 'fastEkadashi'],
  ], 'cool'),
  'kartika-purnima-dev-deepawali-guide': S('What to buy for Dev Deepawali', INTRO_HOME, [
    ['Diyas and lamps', 'diyas'], ['Lights and decoration', 'lights'], ['Puja items', 'thali'],
  ], 'cool'),
  'boita-bandana-bali-jatra-kartika-purnima-guide': S('What to buy for Boita Bandana', INTRO_HOME, [
    ['Boita kit', 'boat'], ['Odisha handloom and dress', 'odiaWear'], ['Odisha puja items', 'odiaPuja'],
  ], 'cool'),
  'vaikuntha-chaturdashi-hari-hara-guide': S('What to buy for Vaikuntha Chaturdashi', INTRO_HOME, [
    ['Shiva puja items', 'shiva'], ['Fasting and Ekadashi items', 'fastEkadashi'], ['Puja items', 'thali'],
  ], 'cool'),
  'gopashtami-gopastami-cow-worship-guide': S('What to buy for Gopashtami', INTRO_HOME, [
    ['Cow worship items', 'cow'], ['Krishna worship items', 'krishna'],
  ], 'cool'),
  'gita-jayanti-mokshada-ekadashi-2026-guide': S('What to buy for Gita Jayanti', INTRO_HOME, [
    ['Fasting and Ekadashi items', 'fastEkadashi'], ['Krishna worship items', 'krishna'], ['Puja items', 'thali'],
  ], 'cold'),
  'vivah-panchami-2026-rama-sita-wedding-guide': S('What to buy for Vivah Panchami', INTRO_HOME, [
    ['Ram worship items', 'rama'], ['Puja items', 'thali'], ['Traditional dress for women', 'womenWear'],
  ], 'cold'),
  'kalabhairava-jayanti-2026-guide': S('What to buy for Kalabhairava Jayanti', INTRO_HOME, [
    ['Kalabhairava items', 'bhairava'], ['Puja items', 'thali'],
  ], 'cold'),
  'datta-jayanti-2026-dattatreya-guide': S('What to buy for Datta Jayanti', INTRO_HOME, [
    ['Datta worship items', 'dattaGuru'], ['Puja items', 'thali'],
  ], 'cool'),
  'dhanurmasam-2026-tiruppavai-andal-guide': S('What to buy for Dhanurmasam', INTRO_HOME, [
    ['Dhanurmasam items', 'dhanu'], ['Puja items', 'thali'],
  ], 'cool'),
  'annapurna-jayanti-2026-guide': S('What to buy for Annapurna Jayanti', INTRO_HOME, [
    ['Annapurna worship items', 'annapurna'], ['Puja items', 'thali'],
  ], 'cold'),
  'subrahmanya-shashti-champa-shashti-2026-guide': S('What to buy for Subrahmanya Shashti', INTRO_HOME, [
    ['Subrahmanya worship items', 'skanda'], ['Puja items', 'thali'],
  ], 'cool'),
  'vaikuntha-ekadashi-mukkoti-ekadashi-2026-guide': S('What to buy for Vaikuntha Ekadashi', INTRO_HOME, [
    ['Fasting and Ekadashi items', 'fastEkadashi'], ['Puja items', 'thali'], ['Traditional dress for men', 'menWear'],
  ], 'cool'),
  'sabarimala-mandalam-2026-ayyappa-vratham-guide': S('What to buy for the Ayyappa vratham', INTRO_HOME + ' Pilgrims on the vratham follow strict rules, so ask your guruswami if you are unsure about any item.', [
    ['Ayyappa vratham items', 'sabarimala'],
  ], 'cool'),
  'jagannath-ratha-yatra-puri-guide': S('What to buy for Ratha Yatra', INTRO_HOME, [
    ['Jagannath worship items', 'yatra'], ['Odisha handloom and dress', 'odiaWear'], ['Puja items', 'thali'],
  ], 'rain'),
  'snana-yatra-snana-purnima-puri-guide': S('What to buy for Snana Yatra', INTRO_HOME, [
    ['Jagannath worship items', 'yatra'], ['Odisha puja items', 'odiaPuja'],
  ], 'hot'),
  'chandan-yatra-puri-guide': S('What to buy for Chandan Yatra', INTRO_HOME, [
    ['Jagannath worship items', 'yatra'], ['Odisha puja items', 'odiaPuja'],
  ], 'hot'),
  'bahuda-yatra-suna-besha-niladri-bije-puri-guide': S('What to buy for Bahuda Yatra', INTRO_HOME, [
    ['Jagannath worship items', 'yatra'], ['Odisha handloom and dress', 'odiaWear'],
  ], 'rain'),
  'hera-panchami-lakshmi-gundicha-puri-guide': S('What to buy for Hera Panchami', INTRO_HOME, [
    ['Jagannath worship items', 'yatra'], ['Odisha puja items', 'odiaPuja'],
  ], 'rain'),
  'jagannath-mahaprasad-ananda-bazar-puri-guide': S('What to buy for a Puri visit', INTRO_HOME, [
    ['Jagannath worship items', 'yatra'],
  ], 'hot'),
  'nabakalebara-puri-jagannath-guide': S('What to buy for a Puri visit', INTRO_HOME, [
    ['Jagannath worship items', 'yatra'], ['Odisha handloom and dress', 'odiaWear'],
  ], 'hot'),
  'jagannath-ashtakam-meaning-and-story': S('What to buy for Jagannath worship', INTRO_HOME, [
    ['Jagannath worship items', 'yatra'], ['Odisha puja items', 'odiaPuja'],
  ]),
  'kali-puja-odisha-dipabali-amavasya-puri-guide': S('What to buy for Kali Puja and Dipabali', INTRO_HOME, [
    ['Diyas and lamps', 'diyas'], ['Odisha puja items', 'odiaPuja'], ['Lights and decoration', 'lights'],
  ], 'cool'),
  'kaunria-kathi-bada-badua-daka-odisha-guide': S('What to buy for Kaunria Kathi', INTRO_HOME, [
    ['Diyas and lamps', 'diyas'], ['Odisha puja items', 'odiaPuja'],
  ]),
  'rukuna-rath-yatra-ashokashtami-lingaraj-bhubaneswar-guide': S('What to buy for Rukuna Rath Yatra', INTRO_HOME, [
    ['Shiva puja items', 'shiva'], ['Odisha handloom and dress', 'odiaWear'],
  ], 'hot'),
  'samba-dashami-konark-chandrabhaga-pausha-odisha-guide': S('What to buy for Samba Dashami', INTRO_HOME, [
    ['Arghya and Surya worship', 'surya'], ['Odisha puja items', 'odiaPuja'],
  ], 'cool'),
  'sital-sasthi-sambalpur-odisha-guide': S('What to buy for Sital Sasthi', INTRO_HOME, [
    ['Shiva puja items', 'shiva'], ['Odisha handloom and dress', 'odiaWear'],
  ], 'hot'),
  'dhanu-jatra-bargarh-odisha-guide': S('What to buy for Dhanu Jatra', INTRO_HOME, [
    ['Krishna worship items', 'krishna'], ['Odisha handloom and dress', 'odiaWear'],
  ], 'cool'),
  'manabasa-gurubara-odisha-guide': S('What to buy for Manabasa Gurubara', INTRO_HOME, [
    ['Odisha puja items', 'odiaPuja'], ['Puja items', 'thali'],
  ]),
  'kumar-purnima-odisha-guide': S('What to buy for Kumar Purnima', INTRO_HOME, [
    ['Odisha puja items', 'odiaPuja'], ['Puja items', 'thali'], ['Odisha handloom and dress', 'odiaWear'],
  ]),
  'prathamastami-odisha-guide': S('What to buy for Prathamastami', INTRO_HOME, [
    ['Odisha puja items', 'odiaPuja'], ['Traditional dress for kids', 'kidsWear'], ['Sweets and gifts', 'sweets'],
  ]),
  'raja-parba-odisha-guide': S('What to buy for Raja Parba', INTRO_HOME, [
    ['Raja swing items', 'swing'], ['Odisha handloom and dress', 'odiaWear'],
  ]),
  'nuakhai-western-odisha-guide': S('What to buy for Nuakhai', INTRO_HOME, [
    ['Odisha handloom and dress', 'odiaWear'], ['Odisha puja items', 'odiaPuja'], ['Sweets and gifts', 'sweets'],
  ]),
  'makar-sankranti-odisha-guide': S('What to buy for Makar Sankranti', INTRO_HOME, [
    ['Arghya and Surya worship', 'surya'], ['Odisha puja items', 'odiaPuja'], ['Sweets and gifts', 'sweets'],
  ], 'cool'),
  'dola-purnima-odisha-guide': S('What to buy for Dola Purnima', INTRO_HOME, [
    ['Krishna worship items', 'krishna'], ['Colours for the day', 'holi'], ['Odisha puja items', 'odiaPuja'],
  ], 'hot'),
  'savitri-brata-odisha-guide': S('What to buy for Savitri Brata', INTRO_HOME, [
    ['Odisha puja items', 'odiaPuja'], ['Traditional dress for women', 'womenWear'],
  ]),
  'maha-bishuba-pana-sankranti-odisha-guide': S('What to buy for Maha Bishuba Sankranti', INTRO_HOME, [
    ['Hanuman worship items', 'hanuman'], ['Odisha puja items', 'odiaPuja'], ['Odisha handloom and dress', 'odiaWear'],
  ], 'hot'),
  'akhi-muthi-anukula-akshaya-tritiya-odisha-guide': S('What to buy for Akshaya Tritiya', INTRO_HOME, [
    ['Odisha puja items', 'odiaPuja'], ['Puja items', 'thali'],
  ]),
  'khudurukuni-osha-odisha-guide': S('What to buy for Khudurukuni Osha', INTRO_HOME, [
    ['Odisha puja items', 'odiaPuja'], ['Traditional dress for kids', 'kidsWear'],
  ]),
  'gamha-purnima-rakhi-purnima-odisha-guide': S('What to buy for Gamha Purnima', INTRO_HOME, [
    ['Rakhi and garlands', 'rakhi'], ['Cow worship items', 'cow'], ['Sweets and gifts', 'sweets'],
  ]),
  'mahalaya-pitru-paksha-odisha-guide': S('What to buy for Mahalaya', INTRO_HOME + ' The items for shraddha differ by family and priest, so confirm the list before you buy.', [
    ['Mahalaya and shraddha items', 'pitru'], ['Odisha puja items', 'odiaPuja'],
  ], 'rain'),
  'utpanna-ekadashi-2026-guide': S('What to buy for Utpanna Ekadashi', INTRO_HOME, [
    ['Fasting and Ekadashi items', 'fastEkadashi'], ['Puja items', 'thali'],
  ]),
  'pradosh-vrat-2026-guide': S('What to buy for Pradosh Vrat', INTRO_HOME, [
    ['Shiva puja items', 'shiva'], ['Puja items', 'thali'],
  ]),
  'sankashti-chaturthi-2026-guide': S('What to buy for Sankashti Chaturthi', INTRO_HOME, [
    ['Ganesh worship items', 'ganesh'], ['Puja items', 'thali'],
  ]),
  'telugu-sankranti-bhogi-kanuma-2027-guide': S('What to buy for Sankranti', INTRO_HOME, [
    ['Lights and decoration', 'lights'], ['Sweets and gifts', 'sweets'], ['Traditional dress for women', 'womenWear'], ['Traditional dress for men', 'menWear'],
  ]),
};
