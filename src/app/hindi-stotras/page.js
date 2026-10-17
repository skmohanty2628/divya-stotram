import LangHub from '@/components/LangHub';
import { SITE_URL } from '@/lib/site';

export const metadata = {
  title: 'हिंदी में स्तोत्र और मंत्र अर्थ सहित | हनुमान चालीसा, शिव तांडव | Divya Stotram',
  description: 'हिंदी में स्तोत्र और मंत्र पढ़ें: हनुमान चालीसा, शिव तांडव, दुर्गा स्तोत्र, गायत्री मंत्र, विष्णु सहस्रनाम और अधिक, अर्थ सहित। Hindi stotram lyrics with meaning.',
  alternates: { canonical: `${SITE_URL}/hindi-stotras` },
};

export default function Page() {
  return (
    <LangHub
      langCode="hi"
      hubPath="/hindi-stotras"
      h1="हिंदी में स्तोत्र और मंत्र"
      intro="हनुमान चालीसा, शिव तांडव, दुर्गा स्तोत्र जैसी प्रार्थनाएँ देवनागरी में पढ़ें, अर्थ सहित।"
      englishNote="Hindi (Devanagari) stotrams and mantras with meaning. Each prayer also has English, Odia and Telugu pages."
    />
  );
}
