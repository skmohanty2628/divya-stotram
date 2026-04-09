'use client';
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Globe } from 'lucide-react';

const CHAT_LANGS = [
  { code: 'en', label: '🇬🇧 English', name: 'English' },
  { code: 'hi', label: '🇮🇳 हिंदी', name: 'Hindi' },
  { code: 'od', label: '🏳️ ଓଡ଼ିଆ', name: 'Odia' },
  { code: 'te', label: '🏳️ తెలుగు', name: 'Telugu' },
  { code: 'ta', label: '🏳️ தமிழ்', name: 'Tamil' },
  { code: 'bn', label: '🏳️ বাংলা', name: 'Bengali' },
  { code: 'mr', label: '🏳️ मराठी', name: 'Marathi' },
  { code: 'gu', label: '🏳️ ગુજરાતી', name: 'Gujarati' },
];

export default function AskPandit({ stotramContext }) {
  const [open, setOpen] = useState(false);
  const [chatLang, setChatLang] = useState(null);
  const [messages, setMsg] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const selectLanguage = (lang) => {
    setChatLang(lang);

    const greetings = {
      en: 'Jai Shri Ram 🙏 Ask me anything about this stotram.',
      hi: 'जय श्री राम 🙏 इस स्तोत्र के बारे में कुछ भी पूछें।',
      od: 'ଜୟ ଶ୍ରୀ ରାମ 🙏 ଏହି ସ୍ତୋତ୍ର ବିଷୟରେ ପଚାରନ୍ତୁ।',
      te: 'జయ శ్రీ రామ్ 🙏 ఈ స్తోత్రం గురించి అడగండి.',
      ta: 'ஜய் ஸ்ரீ ராம் 🙏 இந்த ஸ்தோத்திரம் பற்றி கேளுங்கள்.',
      bn: 'জয় শ্রী রাম 🙏 এই স্তোত্র সম্পর্কে জিজ্ঞাসা করুন।',
      mr: 'जय श्री राम 🙏 या स्तोत्राबद्दल विचारा।',
      gu: 'જય શ્રી રામ 🙏 આ સ્તોત્ર વિશે પૂછો।',
    };

    setMsg([{ role: 'assistant', text: greetings[lang.code] || greetings.en }]);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMsg(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('/api/ask-pandit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          context: stotramContext || 'Hindu stotrams',
          language: chatLang?.name || 'English',
          history: messages.slice(-6).map(m => ({
            role: m.role === 'assistant' ? 'assistant' : 'user',
            content: m.text
          }))
        })
      });

      const data = await res.json();

      setMsg(prev => [
        ...prev,
        { role: 'assistant', text: data.reply || 'Try again 🙏' }
      ]);

    } catch (err) {
      setMsg(prev => [
        ...prev,
        { role: 'assistant', text: 'Server error 🙏' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    setChatLang(null);
    setMsg([]);
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-4 z-40 flex items-center gap-2 bg-[#1a0505] border border-[#9b59b6]/50 text-[#c39bd3] px-4 py-3 rounded-full shadow-lg hover:scale-105"
        >
          <MessageCircle size={16} />
          <span className="text-xs">Ask Pandit</span>
        </button>
      )}

      {open && (
        <div className="fixed bottom-4 right-4 z-50 w-96 bg-black border rounded-2xl shadow-xl flex flex-col">

          {/* Header */}
          <div className="flex justify-between p-3 border-b">
            <span className="text-sm">Ask Pandit</span>
            <button onClick={() => setOpen(false)}>
              <X size={16}/>
            </button>
          </div>

          {/* Language selection */}
          {!chatLang && (
            <div className="p-4 space-y-2">
              {CHAT_LANGS.map(l => (
                <button key={l.code} onClick={() => selectLanguage(l)}>
                  {l.label}
                </button>
              ))}
            </div>
          )}

          {/* Chat */}
          {chatLang && (
            <>
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {messages.map((m, i) => (
                  <div key={i} className={m.role === 'user' ? 'text-right' : ''}>
                    {m.text}
                  </div>
                ))}

                {loading && <div>Thinking...</div>}
                <div ref={bottomRef}/>
              </div>

              {/* Input */}
              <div className="flex p-2 border-t">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  className="flex-1 px-2"
                  placeholder="Ask..."
                />
                <button onClick={sendMessage}>
                  <Send size={14}/>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}