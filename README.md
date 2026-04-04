# 🕉️ Divya Stotram — Full Setup Guide

Your complete Hindu devotional portal. Built with Next.js 14, Tailwind CSS, Firebase, and Claude AI.

---

## ⚡ Quick Start (5 minutes)

```bash
# 1. Install dependencies
npm install

# 2. Copy env file
cp .env.local.example .env.local

# 3. Run locally
npm run dev

# 4. Open browser
http://localhost:3000
```

---

## 🔧 Environment Variables (.env.local)

Open `.env.local` and fill in these values:

### Firebase (Live visitor counter + Search tracking + Admin)
1. Go to https://console.firebase.google.com
2. Click "Add project" → name it "divya-stotram"
3. Go to "Build" → "Realtime Database" → "Create database" → Start in test mode
4. Go to Project Settings → "Your apps" → Add web app
5. Copy the firebaseConfig values into .env.local

### Google Analytics (Track all visitors)
1. Go to https://analytics.google.com
2. Create property → Web → enter your site URL
3. Copy the Measurement ID (looks like G-XXXXXXXXXX)
4. Add: `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`

### Claude AI (Ask the Pandit chatbot)
1. Go to https://console.anthropic.com
2. Create API key
3. Add: `ANTHROPIC_API_KEY=sk-ant-...`

### Google AdSense (Earn money from ads)
1. Apply at https://adsense.google.com (need live site first)
2. After approval, copy your publisher ID
3. Add: `NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXX`

### Admin Password
Change the default password:
```
NEXT_PUBLIC_ADMIN_PASS=your_new_password
```
Default password is: **om108**

---

## 🚀 Deploy to Vercel (Free)

```bash
# Option 1: Via GitHub (Recommended)
# 1. Push this folder to GitHub: github.com/skmohanty2628
# 2. Go to vercel.com → New Project → Import from GitHub
# 3. Add all .env.local variables in Vercel dashboard
# 4. Click Deploy → Done!

# Option 2: Via Vercel CLI
npm install -g vercel
vercel
```

Your site will be live at: `https://divya-stotram.vercel.app`
Connect custom domain later from Vercel dashboard.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.js              → Home page (all stotrams grid)
│   ├── [slug]/page.js       → Individual stotram page
│   ├── admin/page.js        → Admin dashboard
│   ├── api/pandit/route.js  → AI Pandit chatbot API
│   └── layout.js            → Root layout (GA + AdSense scripts)
├── components/
│   ├── Navbar.jsx           → Top navigation + search
│   ├── LanguageSwitcher.jsx → EN/HI/OD/TE switcher
│   ├── LiveCounter.jsx      → "Holy Souls Present" badge
│   ├── VerseCard.jsx        → Individual verse display
│   ├── MusicPlayer.jsx      → YouTube music sidebar
│   ├── AskPandit.jsx        → AI chatbot widget
│   └── AdSlot.jsx           → Google AdSense ad slots
├── data/
│   ├── stotrams-index.js    → All stotram metadata
│   ├── hanuman-chalisa.js   → All 40 chaupais with translations
│   └── other-stotrams.js    → Durga, Shiva, Gayatri, Ganesh, etc.
└── lib/
    └── firebase.js          → Firebase live counter + search tracking
```

---

## ➕ How to Add a New Stotram

1. Add metadata in `src/data/stotrams-index.js`:
```js
{
  slug: 'navagraha-stotram',
  title: { en: 'Navagraha Stotram', hi: '...', od: '...', te: '...' },
  deity: 'Navagraha',
  deityEmoji: '🌟',
  description: { en: 'Prayers to the nine planetary gods', ... },
  youtubeId: 'YOUTUBE_VIDEO_ID',
  verseCount: 9,
  language: 'Sanskrit',
  featured: false,
}
```

2. Create verse data in `src/data/` following the same pattern as `other-stotrams.js`

3. Import and register in `src/app/[slug]/page.js` VERSE_DATA object

That's it! The page is automatically created at `/navagraha-stotram`

---

## 💰 Monetization Timeline

| Month | Action | Expected Income |
|-------|--------|----------------|
| 1 | Deploy + share in WhatsApp groups | $0 (building traffic) |
| 2 | Apply AdSense (need 15+ pages) | $0 (waiting approval) |
| 3 | First AdSense earnings | $5–30/month |
| 6 | Add 20+ stotrams + SEO | $50–150/month |
| 12 | Full SEO + all languages | $200–1000/month |

**Your Odia advantage:** Almost no competition for Odia devotional content. Add Odia translations to all stotrams = Google ranks you #1 for Odia searches.

---

## 🔑 Admin Panel

Visit `/admin` → default password: `om108`

Change it by setting `NEXT_PUBLIC_ADMIN_PASS` in `.env.local`

Shows:
- Live visitor count (Firebase)
- Total page views per stotram
- Top countries
- Language preferences
- Recent search queries
- Device breakdown
- Setup checklist

---

## 📱 Features

- ✅ 8 stotrams with full verse data
- ✅ 4 languages (English, Hindi, Odia, Telugu)
- ✅ Live visitor counter ("Holy Souls Present")
- ✅ YouTube music player (copyright-safe)
- ✅ AI Pandit chatbot (Ask about stotrams)
- ✅ Admin dashboard
- ✅ Search across all stotrams
- ✅ WhatsApp share per verse
- ✅ AdSense slots on every page
- ✅ Google Analytics ready
- ✅ SEO optimized (each stotram = its own URL)
- ✅ Mobile responsive
- ✅ Expand/collapse verse meanings

---

## 🆘 Troubleshooting

**npm install fails?**
```bash
node --version   # Must be 18+
npm cache clean --force
npm install
```

**Firebase not working?**
Check that NEXT_PUBLIC_FIREBASE_DATABASE_URL is set correctly. It should look like:
`https://your-project-default-rtdb.firebaseio.com`

**AdSense showing placeholder?**
That's normal until you get approved. Placeholders show as dashed boxes.

**Admin password not working?**
Default is `om108`. If you set NEXT_PUBLIC_ADMIN_PASS in .env.local, use that.

---

## 📞 Need Help?

GitHub: https://github.com/skmohanty2628
