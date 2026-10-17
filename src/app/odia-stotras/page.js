import LangHub from '@/components/LangHub';
import { SITE_URL } from '@/lib/site';

export const metadata = {
  title: 'ଓଡ଼ିଆ ସ୍ତୋତ୍ର ଓ ମନ୍ତ୍ର ଅର୍ଥ ସହିତ | ଅୟିଗିରି ନନ୍ଦିନୀ, ହନୁମାନ ଚାଳୀଶା | Divya Stotram',
  description: 'ଓଡ଼ିଆ ଭାଷାରେ ସ୍ତୋତ୍ର ଓ ମନ୍ତ୍ର ପଢ଼ନ୍ତୁ: ଅୟିଗିରି ନନ୍ଦିନୀ, ହନୁମାନ ଚାଳୀଶା, ରାମ ରକ୍ଷା ସ୍ତୋତ୍ର, ବଜରଙ୍ଗ ବାଣ ଓ ଅଧିକ, ଅର୍ଥ ଓ ଉଚ୍ଚାରଣ ସହିତ। Odia stotram lyrics with meaning.',
  alternates: { canonical: `${SITE_URL}/odia-stotras` },
};

export default function Page() {
  return (
    <LangHub
      langCode="od"
      hubPath="/odia-stotras"
      h1="ଓଡ଼ିଆରେ ସ୍ତୋତ୍ର ଓ ମନ୍ତ୍ର"
      intro="ଅୟିଗିରି ନନ୍ଦିନୀ, ହନୁମାନ ଚାଳୀଶା, ରାମ ରକ୍ଷା ସ୍ତୋତ୍ର ଭଳି ପ୍ରାର୍ଥନା ଓଡ଼ିଆ ଲିପିରେ ପଢ଼ନ୍ତୁ, ଅର୍ଥ ସହିତ।"
      englishNote="Odia (ଓଡ଼ିଆ) script stotrams and mantras with meaning. Each prayer also has English, Hindi and Telugu pages."
    />
  );
}
