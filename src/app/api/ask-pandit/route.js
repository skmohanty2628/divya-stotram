export async function POST(req) {
  try {
    const { message, context, language, history } = await req.json();

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
- If the question is about chanting, include best time, count, benefits, and a simple tip when relevant
- Do not be too long
`;

    const messages = [
      {
        role: 'system',
        content:
          'You are Pandit AI, a respectful Hindu devotional guide who answers clearly and gently.',
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