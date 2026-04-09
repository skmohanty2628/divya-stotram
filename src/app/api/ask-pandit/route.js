export async function POST(req) {
  const { question } = await req.json();

  const prompt = `
You are a Hindu spiritual guide (Pandit AI).

Answer the user's question in a structured and helpful way.

Format like this:

🕉️ Best Time: ...
📿 How many times: ...
🙏 Benefits: ...
📖 Tip: ...

Keep it simple, calm, and devotional.

Question:
${question}
`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();

    return Response.json({
      result: data.choices?.[0]?.message?.content || 'No response',
    });

  } catch (error) {
    return Response.json({ result: 'Something went wrong' });
  }
}