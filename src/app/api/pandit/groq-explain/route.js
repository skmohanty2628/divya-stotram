export async function POST(req) {
  const { verse, lang } = await req.json();

  const prompt = `
Explain this Hindu verse in a simple and easy way.

Verse:
${verse}

Language: ${lang}
`;

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama3-8b-8192',
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  const data = await response.json();

  return Response.json({
    result: data.choices?.[0]?.message?.content || 'No response',
  });
}