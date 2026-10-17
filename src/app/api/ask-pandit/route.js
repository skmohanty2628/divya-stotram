export async function POST(req) {
  try {
    if (!rateLimit(`pandit:${clientIp(req)}`, { limit: 12, windowMs: 60_000 })) {
      return Response.json({ reply: 'Too many questions. Please wait a minute and try again.' }, { status: 429 });
    }
    const body = await req.json();
    const message = String(body.message || '').slice(0, 600);
    const context = String(body.context || '').slice(0, 800);
    const language = ['English', 'Hindi', 'Odia', 'Telugu'].includes(body.language) ? body.language : 'English';
    const history = (Array.isArray(body.history) ? body.history : [])
      .slice(-6)
      .filter((m) => m && (m.role === 'user' || m.role === 'assistant'))
      .map((m) => ({ role: m.role, content: String(m.content || '').slice(0, 600) }));
    if (!message.trim()) return Response.json({ reply: 'Please type a question.' }, { status: 400 });

    if (!process.env.GROQ_API_KEY) {
      return Response.json(
        { reply: 'GROQ_API_KEY missing on server' },
        { status: 500 }
      );
    }

    const prompt = `
You are a calm, respectful Hindu spiritual guide called Pandit AI.

Answer the user's question in ${language || 'English'}.

Context:
${context || 'Hindu stotrams and prayers'}

User question:
${message}

Instructions:
- Keep the answer devotional, simple, and helpful
- Answer clearly in the requested language
- If the question is about chanting, mention a traditional time, a common count and a simple tip when relevant
- Describe benefits only as the belief of the tradition. Never promise results, and never give medical, legal or financial advice; for health or distress, gently suggest a qualified professional
- Do not be too long
`;

    const messages = [
      {
        role: 'system',
        content:
          'You are Pandit AI, a respectful Hindu devotional guide who answers clearly and gently. You never promise outcomes and never give medical, legal or financial advice.',
      },
      ...(history || []),
      {
        role: 'user',
        content: prompt,
      },
    ];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages,
        temperature: 0.5,
        max_tokens: 400,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('ASK PANDIT GROQ ERROR:', data);
      return Response.json(
        {
          reply: `AI service error: ${data?.error?.message || 'unknown error'}`,
        },
        { status: 500 }
      );
    }

    return Response.json({
      reply: data?.choices?.[0]?.message?.content?.trim() || 'No response',
    });
  } catch (error) {
    console.error('ASK PANDIT ROUTE ERROR:', error);
    return Response.json(
      { reply: 'Server error' },
      { status: 500 }
    );
  }
}