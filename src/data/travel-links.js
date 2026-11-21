// Plain outbound booking links shown on place-based festival guides.
// These are NOT affiliate links. To switch a provider to an affiliate link later,
// change only its `url` here (and add rel="sponsored" plus a disclosure line in TravelBox).
export const TRAVEL_PROVIDERS = [
  { id: 'irctc', name: 'IRCTC Rail Connect', note: 'Train tickets', url: 'https://www.irctc.co.in/nget/train-search', icon: '🚆' },
  { id: 'mmt', name: 'MakeMyTrip', note: 'Flights, hotels and trains', url: 'https://www.makemytrip.com/', icon: '✈️' },
  { id: 'goibibo', name: 'Goibibo', note: 'Flights and hotels', url: 'https://www.goibibo.com/', icon: '🧳' },
  { id: 'agoda', name: 'Agoda', note: 'Hotels and stays', url: 'https://www.agoda.com/', icon: '🏨' },
  { id: 'booking', name: 'Booking.com', note: 'Hotels and stays', url: 'https://www.booking.com/', icon: '🛏️' },
  { id: 'ixigo', name: 'ixigo', note: 'Trains, flights and buses', url: 'https://www.ixigo.com/', icon: '🎫' },
];

// Official tourism sites, shown as an extra button where we are sure of the right one.
export const OFFICIAL = {
  odisha: { name: 'Odisha Tourism (official)', url: 'https://odishatourism.gov.in/' },
  kerala: { name: 'Kerala Tourism (official)', url: 'https://www.keralatourism.org/' },
};

// slug -> { place, official }. Only guides tied to a specific place get the box.
export const TRAVEL_PLACES = {
  'boita-bandana-bali-jatra-kartika-purnima-guide': { place: 'Cuttack', official: 'odisha' },
  'jagannath-ratha-yatra-puri-guide': { place: 'Puri', official: 'odisha' },
  'snana-yatra-snana-purnima-puri-guide': { place: 'Puri', official: 'odisha' },
  'chandan-yatra-puri-guide': { place: 'Puri', official: 'odisha' },
  'bahuda-yatra-suna-besha-niladri-bije-puri-guide': { place: 'Puri', official: 'odisha' },
  'hera-panchami-lakshmi-gundicha-puri-guide': { place: 'Puri', official: 'odisha' },
  'jagannath-mahaprasad-ananda-bazar-puri-guide': { place: 'Puri', official: 'odisha' },
  'nabakalebara-puri-jagannath-guide': { place: 'Puri', official: 'odisha' },
  'kali-puja-odisha-dipabali-amavasya-puri-guide': { place: 'Puri', official: 'odisha' },
  'rukuna-rath-yatra-ashokashtami-lingaraj-bhubaneswar-guide': { place: 'Bhubaneswar', official: 'odisha' },
  'maha-shivaratri-lingaraj-mahadeepa-bhubaneswar-guide': { place: 'Bhubaneswar', official: 'odisha' },
  'samba-dashami-konark-chandrabhaga-pausha-odisha-guide': { place: 'Konark', official: 'odisha' },
  'sital-sasthi-sambalpur-odisha-guide': { place: 'Sambalpur', official: 'odisha' },
  'dhanu-jatra-bargarh-odisha-guide': { place: 'Bargarh', official: 'odisha' },
  'sabarimala-mandalam-2026-ayyappa-vratham-guide': { place: 'Sabarimala', official: 'kerala' },
};
