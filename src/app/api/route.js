import Groq from 'groq-sdk';

// ✅ FIXED: Only create Groq client if API key exists
// This prevents build-time crashes when env var is missing
let groq = null;

if (process.env.GROQ_API_KEY) {
  groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
}

export async function POST(request) {
  // ✅ Handle missing API key gracefully
  if (!groq) {
    return Response.json({
      reply: 'The Pandit is temporarily unavailable. Please configure GROQ_API_KEY. 🙏'
    }, { status: 503 });
  }

  try {
    const { message, context, language = 'English', history = [] } = await request.json();

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content: `You are a wise Hindu Pandit on a devotional website called Divya Stotram.
The user is reading: ${context}.
IMPORTANT: You must respond ONLY in ${language}. If the language is Hindi, respond in Hindi (Devanagari script). If Odia, respond in Odia script. If Telugu, respond in Telugu script. Always match the user's chosen language exactly.
Keep answers to 3-5 sentences. Be warm, spiritual and encouraging.`
        },
        ...history.map(h => ({ role: h.role, content: h.content })),
        { role: 'user', content: message }
      ],
      max_tokens: 300,
    });

    return Response.json({ reply: completion.choices[0].message.content });

  } catch (e) {
    console.error(e);
    return Response.json({
      reply: 'The Pandit is meditating. Please try again shortly. 🙏'
    });
  }
}