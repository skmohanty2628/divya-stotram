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

    const prompt = `
You are a helpful Hindu devotional guide.

Explain the following verse in very simple ${languageName}.
Keep the answer:
- short
- clear
- devotional
- beginner-friendly

Verse:
${verse}
`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
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
      return Response.json(
        {
          result: 'AI service error',
        },
        { status: 500 }
      );
    }

    const result = data?.choices?.[0]?.message?.content?.trim();

    return Response.json({
      result: result || 'No response from AI',
    });
  } catch (error) {
    console.error('ROUTE ERROR:', error);
    return Response.json(
      {
        result: 'Server error',
      },
      { status: 500 }
    );
  }
}