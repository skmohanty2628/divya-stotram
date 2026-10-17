import LangHub from '@/components/LangHub';
import { SITE_URL } from '@/lib/site';

export const metadata = {
  title: 'తెలుగులో స్తోత్రాలు మరియు మంత్రాలు అర్థంతో | హనుమాన్ చాలీసా | Divya Stotram',
  description: 'తెలుగులో స్తోత్రాలు మరియు మంత్రాలు చదవండి: హనుమాన్ చాలీసా, శివ తాండవం, దుర్గా స్తోత్రం, గాయత్రీ మంత్రం మరియు మరిన్ని, అర్థంతో. Telugu stotram lyrics with meaning.',
  alternates: { canonical: `${SITE_URL}/telugu-stotras` },
};

export default function Page() {
  return (
    <LangHub
      langCode="te"
      hubPath="/telugu-stotras"
      h1="తెలుగులో స్తోత్రాలు మరియు మంత్రాలు"
      intro="హనుమాన్ చాలీసా, శివ తాండవం, దుర్గా స్తోత్రం వంటి ప్రార్థనలను తెలుగు లిపిలో చదవండి, అర్థంతో."
      englishNote="Telugu script stotrams and mantras with meaning. Each prayer also has English, Hindi and Odia pages."
    />
  );
}
