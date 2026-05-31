import { Resend } from 'resend';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const SITE_URL = 'https://divyastotram.com';

// ── Stotram rotation (15 stotrams, cycles by day of year) ────────────────────
const DAILY_STOTRAMS = [
  {
    slug: 'hanuman-chalisa',
    name: 'Hanuman Chalisa',
    nameHi: 'हनुमान चालीसा',
    deity: 'Lord Hanuman',
    emoji: '🦧',
    color: '#e8760a',
    bgColor: '#fff3e0',
    verse: 'जय हनुमान ज्ञान गुन सागर। जय कपीस तिहुँ लोक उजागर॥',
    meaning: 'Victory to Hanuman, ocean of wisdom and virtue. Victor of the three worlds.',
    benefit: 'Chanting Hanuman Chalisa today grants courage, protection and removes all obstacles from your path.',
  },
  {
    slug: 'gayatri-mantra',
    name: 'Gayatri Mantra',
    nameHi: 'गायत्री मंत्र',
    deity: 'Surya Deva',
    emoji: '🌞',
    color: '#f0c040',
    bgColor: '#fffde7',
    verse: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥',
    meaning: 'We meditate on the glorious light of the divine Sun — may it illuminate our intellect.',
    benefit: 'Reciting the Gayatri Mantra today brings clarity of mind, wisdom and divine blessings for new beginnings.',
  },
  {
    slug: 'durga-stotram',
    name: 'Durga Stotram',
    nameHi: 'दुर्गा स्तोत्रम्',
    deity: 'Maa Durga',
    emoji: '🌺',
    color: '#e53935',
    bgColor: '#fce4ec',
    verse: 'या देवी सर्वभूतेषु शक्तिरूपेण संस्थिता। नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥',
    meaning: 'Salutations to the Goddess who dwells in all beings as power — I bow to her again and again.',
    benefit: 'Reciting Durga Stotram today invokes the divine mother\'s protection, strength and fearlessness.',
  },
  {
    slug: 'vishnu-sahasranamam',
    name: 'Vishnu Sahasranamam',
    nameHi: 'विष्णु सहस्रनामम्',
    deity: 'Lord Vishnu',
    emoji: '🪷',
    color: '#7b1fa2',
    bgColor: '#f3e5f5',
    verse: 'विश्वं विष्णुर्वषट्कारो भूतभव्यभवत्प्रभुः। भूतकृद्भूतभृद्भावो भूतात्मा भूतभावनः॥',
    meaning: 'Vishnu is the universe itself — the lord of past, present and future, the sustainer of all beings.',
    benefit: 'Reading Vishnu Sahasranamam today brings peace, prosperity and liberation from the cycle of suffering.',
  },
  {
    slug: 'shiva-tandav',
    name: 'Shiva Tandav Stotram',
    nameHi: 'शिव तांडव स्तोत्रम्',
    deity: 'Lord Shiva',
    emoji: '🔱',
    color: '#1565c0',
    bgColor: '#e3f2fd',
    verse: 'जटाटवीगलज्जलप्रवाहपावितस्थले गलेऽवलम्ब्य लम्बितां भुजङ्गतुङ्गमालिकाम्।',
    meaning: 'Shiva, whose neck is purified by the flowing waters of his matted hair, adorned with a garland of serpents.',
    benefit: 'Chanting Shiva Tandav today connects you with cosmic energy, dissolves ego and brings deep transformation.',
  },
  {
    slug: 'mahalakshmi-ashtakam',
    name: 'Mahalakshmi Ashtakam',
    nameHi: 'महालक्ष्मी अष्टकम्',
    deity: 'Goddess Lakshmi',
    emoji: '🪷',
    color: '#e65100',
    bgColor: '#fff8e1',
    verse: 'नमस्तेऽस्तु महामाये श्रीपीठे सुरपूजिते। शंखचक्रगदाहस्ते महालक्ष्मि नमोऽस्तु ते॥',
    meaning: 'Salutations to the great goddess, worshipped by the gods, holding conch, discus and mace — I bow to Mahalakshmi.',
    benefit: 'Reciting Mahalakshmi Ashtakam today opens doors to abundance, prosperity and good fortune.',
  },
  {
    slug: 'saraswati-vandana',
    name: 'Saraswati Vandana',
    nameHi: 'सरस्वती वंदना',
    deity: 'Goddess Saraswati',
    emoji: '🦢',
    color: '#0288d1',
    bgColor: '#e1f5fe',
    verse: 'या कुन्देन्दुतुषारहारधवला या शुभ्रवस्त्रावृता। या वीणावरदण्डमण्डितकरा या श्वेतपद्मासना॥',
    meaning: 'She who is white as jasmine, who wears pure white garments, who holds the veena — goddess Saraswati.',
    benefit: 'Chanting Saraswati Vandana today sharpens intellect, improves memory and brings clarity in studies and creative work.',
  },
  {
    slug: 'ganesh-aarti',
    name: 'Ganesh Aarti',
    nameHi: 'गणेश आरती',
    deity: 'Lord Ganesha',
    emoji: '🐘',
    color: '#f57f17',
    bgColor: '#fff9c4',
    verse: 'जय गणेश जय गणेश जय गणेश देवा। माता जाकी पार्वती पिता महादेवा॥',
    meaning: 'Victory to Ganesha, the divine one, whose mother is Parvati and father is Mahadeva.',
    benefit: 'Beginning the day with Ganesh Aarti removes obstacles, brings success in all new endeavors.',
  },
  {
    slug: 'ram-raksha-stotram',
    name: 'Ram Raksha Stotram',
    nameHi: 'राम रक्षा स्तोत्रम्',
    deity: 'Lord Ram',
    emoji: '🏹',
    color: '#2e7d32',
    bgColor: '#e8f5e9',
    verse: 'चरितं रघुनाथस्य शतकोटिप्रविस्तरम्। एकैकमक्षरं पुंसां महापातकनाशनम्॥',
    meaning: 'The story of Raghunatha spans a hundred crore verses — each single letter destroys the greatest of sins.',
    benefit: 'Reciting Ram Raksha Stotram today provides divine protection and removes fear from all directions.',
  },
  {
    slug: 'aditya-hridayam',
    name: 'Aditya Hridayam',
    nameHi: 'आदित्य हृदयम्',
    deity: 'Surya Deva',
    emoji: '☀️',
    color: '#f9a825',
    bgColor: '#fffde7',
    verse: 'ततो युद्धपरिश्रान्तं समरे चिन्तया स्थितम्। रावणं चाग्रतो दृष्ट्वा युद्धाय समुपस्थितम्॥',
    meaning: 'When Ram stood exhausted in battle, the sage Agastya came and taught him this sacred solar hymn.',
    benefit: 'Chanting Aditya Hridayam today brings victory over enemies, energy for challenges and radiant good health.',
  },
  {
    slug: 'navagraha-stotram',
    name: 'Navagraha Stotram',
    nameHi: 'नवग्रह स्तोत्रम्',
    deity: 'Nine Planets',
    emoji: '🪐',
    color: '#4527a0',
    bgColor: '#ede7f6',
    verse: 'जपाकुसुमसंकाशं काश्यपेयं महद्युतिम्। तमोऽरिं सर्वपापघ्नं प्रणतोऽस्मि दिवाकरम्॥',
    meaning: 'I bow to the Sun, red as hibiscus flower, son of Kashyapa, destroyer of darkness and all sins.',
    benefit: 'Reciting Navagraha Stotram today pacifies planetary influences and brings harmony, peace and balance to your life.',
  },
  {
    slug: 'aigiri-nandini',
    name: 'Aigiri Nandini',
    nameHi: 'अयि गिरिनन्दिनि',
    deity: 'Maa Durga',
    emoji: '🌸',
    color: '#ad1457',
    bgColor: '#fce4ec',
    verse: 'अयि गिरिनन्दिनि नन्दितमेदिनि विश्वविनोदिनि नन्दनुते। गिरिवरविन्ध्यशिरोऽधिनिवासिनि विष्णुविलासिनि जिष्णुनुते॥',
    meaning: 'O daughter of the mountain, delight of the earth, joy of the universe — who dwells on Mount Vindhya, praised by Vishnu.',
    benefit: 'Singing Aigiri Nandini today awakens the divine feminine energy within and brings triumph over all darkness.',
  },
  {
    slug: 'shiv-chalisa',
    name: 'Shiv Chalisa',
    nameHi: 'शिव चालीसा',
    deity: 'Lord Shiva',
    emoji: '🔱',
    color: '#00838f',
    bgColor: '#e0f7fa',
    verse: 'जय गिरिजापति दीनदयाला। सदा करत सन्तन प्रतिपाला॥',
    meaning: 'Victory to the husband of Parvati, compassionate to the needy, who always protects the saints.',
    benefit: 'Chanting Shiv Chalisa today brings Shiva\'s divine grace, removes suffering and grants liberation.',
  },
  {
    slug: 'bajrang-baan',
    name: 'Bajrang Baan',
    nameHi: 'बजरंग बाण',
    deity: 'Lord Hanuman',
    emoji: '⚡',
    color: '#bf360c',
    bgColor: '#fbe9e7',
    verse: 'निश्चय प्रेम प्रतीति ते, विनय करैं सनमान। तेहि के कारज सकल शुभ, सिद्ध करैं हनुमान॥',
    meaning: 'One who approaches Hanuman with unwavering love and humility — all their auspicious works are fulfilled.',
    benefit: 'Reciting Bajrang Baan today destroys all negativity, evil influences and grants fearless divine protection.',
  },
  {
    slug: 'krishna-vasudevaya-mantra',
    name: 'Krishna Vasudevaya Mantra',
    nameHi: 'कृष्णाय वासुदेवाय मंत्र',
    deity: 'Lord Krishna',
    emoji: '🪈',
    color: '#1a237e',
    bgColor: '#e8eaf6',
    verse: 'ॐ कृष्णाय वासुदेवाय हरये परमात्मने। प्रणतक्लेशनाशाय गोविन्दाय नमो नमः॥',
    meaning: 'Om, salutations to Krishna, son of Vasudeva, Hari the Supreme Soul, Govinda who destroys the sorrows of devotees.',
    benefit: 'Chanting this Krishna mantra today removes all sorrow, brings inner peace and the grace of the Supreme.',
  },
];

// ── Motivational messages (rotates daily) ────────────────────────────────────
const DAILY_MESSAGES = [
  { msg: 'Every prayer you offer is a step closer to the divine. Your devotion lights up the universe.', author: '🕉️ Divya Stotram' },
  { msg: 'The lotus blooms in muddy water. Your spiritual practice transforms every challenge into grace.', author: '🌸 Ancient Wisdom' },
  { msg: 'A single moment of sincere prayer is worth more than hours of distracted ritual. Show up with your heart today.', author: '🙏 Daily Reminder' },
  { msg: 'The gods do not measure the length of your prayer — they measure the depth of your devotion.', author: '🪔 Sacred Teaching' },
  { msg: 'Your streak is not just a number — it is a chain of grace connecting you to the divine every single day.', author: '🔥 Keep Going' },
  { msg: 'In the silence after prayer, the divine speaks. Listen today.', author: '🧘 Spiritual Insight' },
  { msg: 'Every time you return to your practice, you are choosing the sacred over the ordinary. That is true strength.', author: '⚡ Daily Inspiration' },
];

// ── Get today's stotram based on day of year ────────────────────────────────
function getTodayStotram() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return DAILY_STOTRAMS[dayOfYear % DAILY_STOTRAMS.length];
}

function getTodayMessage() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return DAILY_MESSAGES[dayOfYear % DAILY_MESSAGES.length];
}

function getDayName() {
  return new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

// ── Beautiful HTML email template ────────────────────────────────────────────
function buildEmailHtml(stotram, message, email) {
  const unsubUrl = `${SITE_URL}/api/unsubscribe?email=${encodeURIComponent(email)}`;
  const readUrl = `${SITE_URL}/${stotram.slug}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>🕉️ Daily Divya Stotram — ${stotram.name}</title>
</head>
<body style="margin:0;padding:0;background:#0d0000;font-family:Georgia,serif;">

<!-- Wrapper -->
<table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#1a0000 0%,#0d0000 50%,#0a0010 100%);min-height:100vh;">
<tr><td align="center" style="padding:20px 10px;">

<!-- Main Card -->
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:24px;overflow:hidden;border:1px solid rgba(201,146,42,0.3);box-shadow:0 20px 60px rgba(0,0,0,0.8);">

  <!-- Header with mandala pattern -->
  <tr>
    <td style="background:linear-gradient(135deg,#1a0505 0%,#2d0a0a 50%,#1a0505 100%);padding:0;text-align:center;border-bottom:2px solid rgba(201,146,42,0.4);">
      <!-- Decorative top bar -->
      <div style="background:linear-gradient(90deg,#c9922a,#f0c040,#e8760a,#f0c040,#c9922a);height:4px;"></div>
      
      <!-- Header content -->
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:32px 30px 24px;text-align:center;">
            <!-- Om symbol -->
            <div style="font-size:48px;margin-bottom:8px;">🕉️</div>
            <h1 style="margin:0;font-family:Georgia,serif;font-size:28px;font-weight:bold;color:#f0c040;letter-spacing:3px;text-transform:uppercase;">Divya Stotram</h1>
            <p style="margin:6px 0 0;font-family:Georgia,serif;font-size:12px;color:#c9922a;letter-spacing:4px;text-transform:uppercase;">Sacred Daily Prayer</p>
            
            <!-- Decorative divider -->
            <div style="margin:16px auto;width:200px;height:1px;background:linear-gradient(90deg,transparent,#c9922a,transparent);"></div>
            
            <p style="margin:0;font-family:Georgia,serif;font-size:13px;color:#e8d5b5;opacity:0.7;">${getDayName()}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Motivational Message -->
  <tr>
    <td style="background:linear-gradient(135deg,#1f0505,#2a0808);padding:24px 30px;text-align:center;border-bottom:1px solid rgba(201,146,42,0.15);">
      <p style="margin:0 0 8px;font-size:11px;color:#c9922a;letter-spacing:3px;text-transform:uppercase;">Today's Blessing</p>
      <p style="margin:0;font-family:Georgia,serif;font-size:16px;line-height:1.8;color:#e8d5b5;font-style:italic;">"${message.msg}"</p>
      <p style="margin:10px 0 0;font-size:12px;color:#c9922a;">${message.author}</p>
    </td>
  </tr>

  <!-- Today's Stotram Banner -->
  <tr>
    <td style="background:linear-gradient(135deg,${stotram.color}22,${stotram.color}11);padding:28px 30px;text-align:center;border-bottom:1px solid rgba(201,146,42,0.15);">
      <p style="margin:0 0 8px;font-size:11px;color:#c9922a;letter-spacing:3px;text-transform:uppercase;">Today's Sacred Prayer</p>
      <div style="font-size:52px;margin:8px 0;">${stotram.emoji}</div>
      <h2 style="margin:8px 0 4px;font-family:Georgia,serif;font-size:26px;font-weight:bold;color:#f0c040;">${stotram.name}</h2>
      <p style="margin:0 0 4px;font-family:Georgia,serif;font-size:18px;color:#c9922a;">${stotram.nameHi}</p>
      <p style="margin:0;font-size:12px;color:#e8d5b5;opacity:0.6;">Dedicated to ${stotram.deity}</p>
    </td>
  </tr>

  <!-- Sacred Verse -->
  <tr>
    <td style="background:#120202;padding:28px 30px;">
      <!-- Verse box -->
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="background:linear-gradient(135deg,rgba(201,146,42,0.08),rgba(240,192,64,0.04));border:1px solid rgba(201,146,42,0.25);border-radius:16px;padding:24px;text-align:center;">
            <p style="margin:0 0 6px;font-size:10px;color:#c9922a;letter-spacing:3px;text-transform:uppercase;">Today's Verse</p>
            <p style="margin:0 0 16px;font-family:Georgia,serif;font-size:17px;line-height:1.9;color:#f0c040;font-style:italic;">${stotram.verse}</p>
            <div style="width:60px;height:1px;background:linear-gradient(90deg,transparent,#c9922a,transparent);margin:0 auto 16px;"></div>
            <p style="margin:0;font-family:Georgia,serif;font-size:14px;line-height:1.7;color:#e8d5b5;opacity:0.85;">${stotram.meaning}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Today's Benefit -->
  <tr>
    <td style="background:#0f0101;padding:0 30px 24px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="background:linear-gradient(135deg,rgba(232,118,10,0.12),rgba(240,192,64,0.06));border-left:3px solid ${stotram.color};border-radius:0 12px 12px 0;padding:16px 20px;">
            <p style="margin:0 0 4px;font-size:10px;color:#e8760a;letter-spacing:2px;text-transform:uppercase;">✨ Today's Benefit</p>
            <p style="margin:0;font-family:Georgia,serif;font-size:14px;line-height:1.7;color:#e8d5b5;">${stotram.benefit}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- CTA Button -->
  <tr>
    <td style="background:#0f0101;padding:8px 30px 32px;text-align:center;">
      <a href="${readUrl}" style="display:inline-block;background:linear-gradient(135deg,#c9922a,#f0c040);color:#0d0000;text-decoration:none;padding:16px 40px;border-radius:50px;font-family:Georgia,serif;font-size:15px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;box-shadow:0 8px 24px rgba(201,146,42,0.4);">
        🙏 Read ${stotram.name} Today
      </a>
      <p style="margin:12px 0 0;font-size:11px;color:#c9922a;opacity:0.6;">Tap to open on Divya Stotram</p>
    </td>
  </tr>

  <!-- Other Prayers Section -->
  <tr>
    <td style="background:#0a0000;padding:24px 30px;border-top:1px solid rgba(201,146,42,0.15);">
      <p style="margin:0 0 16px;font-size:11px;color:#c9922a;letter-spacing:3px;text-transform:uppercase;text-align:center;">Explore More Sacred Prayers</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td width="33%" style="padding:4px;text-align:center;">
            <a href="${SITE_URL}/hanuman-chalisa" style="display:block;background:rgba(232,118,10,0.1);border:1px solid rgba(232,118,10,0.25);border-radius:12px;padding:12px 8px;text-decoration:none;">
              <div style="font-size:22px;">🦧</div>
              <p style="margin:4px 0 0;font-size:10px;color:#f0c040;letter-spacing:1px;">Hanuman Chalisa</p>
            </a>
          </td>
          <td width="33%" style="padding:4px;text-align:center;">
            <a href="${SITE_URL}/gayatri-mantra" style="display:block;background:rgba(240,192,64,0.08);border:1px solid rgba(240,192,64,0.2);border-radius:12px;padding:12px 8px;text-decoration:none;">
              <div style="font-size:22px;">🌞</div>
              <p style="margin:4px 0 0;font-size:10px;color:#f0c040;letter-spacing:1px;">Gayatri Mantra</p>
            </a>
          </td>
          <td width="33%" style="padding:4px;text-align:center;">
            <a href="${SITE_URL}/durga-stotram" style="display:block;background:rgba(229,57,53,0.08);border:1px solid rgba(229,57,53,0.2);border-radius:12px;padding:12px 8px;text-decoration:none;">
              <div style="font-size:22px;">🌺</div>
              <p style="margin:4px 0 0;font-size:10px;color:#f0c040;letter-spacing:1px;">Durga Stotram</p>
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Streak reminder -->
  <tr>
    <td style="background:#0a0000;padding:16px 30px 24px;text-align:center;border-top:1px solid rgba(201,146,42,0.1);">
      <p style="margin:0;font-size:22px;">🔥</p>
      <p style="margin:6px 0 0;font-family:Georgia,serif;font-size:14px;color:#e8d5b5;opacity:0.75;">Keep your prayer streak alive — visit Divya Stotram every day!</p>
      <a href="${SITE_URL}" style="display:inline-block;margin-top:10px;color:#c9922a;font-size:12px;text-decoration:underline;">divyastotram.com</a>
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td style="background:#060000;padding:20px 30px;text-align:center;border-top:1px solid rgba(201,146,42,0.1);">
      <div style="background:linear-gradient(90deg,#c9922a,#f0c040,#e8760a,#f0c040,#c9922a);height:2px;margin-bottom:16px;border-radius:2px;"></div>
      <p style="margin:0 0 6px;font-size:11px;color:#c9922a;letter-spacing:2px;text-transform:uppercase;">🕉️ Divya Stotram</p>
      <p style="margin:0 0 8px;font-size:11px;color:#e8d5b5;opacity:0.4;">Sacred Hindu Prayers in English, Hindi, Odia & Telugu</p>
      <p style="margin:0;font-size:10px;color:#e8d5b5;opacity:0.3;">
        You received this because you subscribed at divyastotram.com · 
        <a href="${unsubUrl}" style="color:#c9922a;opacity:0.6;text-decoration:underline;">Unsubscribe</a>
      </p>
    </td>
  </tr>

</table>
<!-- End Main Card -->

</td></tr>
</table>
<!-- End Wrapper -->

</body>
</html>`;
}

// ── Get all subscribers from Firebase ────────────────────────────────────────
async function getAllSubscribers() {
  const base =
    process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ||
    process.env.FIREBASE_DATABASE_URL;

  if (!base) return [];

  try {
    const res = await fetch(`${base.replace(/\/$/, '')}/subscribers.json`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    if (!data || typeof data !== 'object') return [];
    return Object.values(data).filter((s) => s?.email);
  } catch {
    return [];
  }
}

// ── Main cron handler ─────────────────────────────────────────────────────────
export async function GET(request) {
  // Security: verify cron secret
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET || 'divya-cron-2026';

  if (authHeader !== `Bearer ${cronSecret}`) {
    return Response.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return Response.json({ ok: false, error: 'RESEND_API_KEY not set' }, { status: 500 });
  }

  const resend = new Resend(resendKey);
  const stotram = getTodayStotram();
  const message = getTodayMessage();
  const subscribers = await getAllSubscribers();

  if (subscribers.length === 0) {
    return Response.json({ ok: true, message: 'No subscribers yet', sent: 0 });
  }

  let sent = 0;
  let failed = 0;
  const errors = [];

  // Send in batches of 10 to avoid rate limits
  const batchSize = 10;
  for (let i = 0; i < subscribers.length; i += batchSize) {
    const batch = subscribers.slice(i, i + batchSize);

    await Promise.all(
      batch.map(async (subscriber) => {
        try {
          await resend.emails.send({
            from: 'Divya Stotram 🕉️ <noreply@divyastotram.com>',
            to: subscriber.email,
            subject: `🕉️ Today's Sacred Prayer — ${stotram.name} | ${getDayName()}`,
            html: buildEmailHtml(stotram, message, subscriber.email),
          });
          sent++;
        } catch (e) {
          failed++;
          errors.push({ email: subscriber.email, error: e.message });
        }
      })
    );

    // Small delay between batches
    if (i + batchSize < subscribers.length) {
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  return Response.json({
    ok: true,
    stotram: stotram.name,
    totalSubscribers: subscribers.length,
    sent,
    failed,
    errors: errors.slice(0, 5),
  });
}