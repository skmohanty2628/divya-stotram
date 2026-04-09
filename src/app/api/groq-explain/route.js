export async function POST(req) {
  try {
    const { verse, lang } = await req.json();

    const languageMap = {
      en: 'English',
      hi: 'Hindi',
      od: 'Odia',
      te: 'Telugu',
    };

    const languageName = languageMap[lang] || 'English';

    if (!process.env.GROQ_API_KEY) {
      return Response.json({ result: 'GROQ_API_KEY missing on server' }, { status: 500 });
    }

    const prompt = `Explain this Hindu devotional verse in very simple ${languageName}. Keep it short, clear, and respectful.

Verse:
${verse}`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: 'You explain Hindu devotional verses simply and respectfully.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.4,
        max_tokens: 300,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('GROQ API ERROR:', data);
      return Response.json({ result: `AI service error: ${data?.error?.message || 'unknown error'}` }, { status: 500 });
    }

    return Response.json({
      result: data?.choices?.[0]?.message?.content?.trim() || 'No response from AI',
    });
  } catch (error) {
    console.error('ROUTE ERROR:', error);
    return Response.json({ result: 'Server error' }, { status: 500 });
  }
}