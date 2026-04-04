'use client';
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Globe } from 'lucide-react';

const CHAT_LANGS = [
  { code: 'en', label: '🇬🇧 English',    name: 'English'  },
  { code: 'hi', label: '🇮🇳 हिंदी',      name: 'Hindi'    },
  { code: 'od', label: '🏳️ ଓଡ଼ିଆ',       name: 'Odia'     },
  { code: 'te', label: '🏳️ తెలుగు',      name: 'Telugu'   },
  { code: 'ta', label: '🏳️ தமிழ்',       name: 'Tamil'    },
  { code: 'bn', label: '🏳️ বাংলা',       name: 'Bengali'  },
  { code: 'mr', label: '🏳️ मराठी',       name: 'Marathi'  },
  { code: 'gu', label: '🏳️ ગુજરાતી',    name: 'Gujarati' },
];

export default function AskPandit({ stotramContext }) {
  const [open, setOpen]         = useState(false);
  const [chatLang, setChatLang] = useState(null); // null = not selected yet
  const [messages, setMsg]      = useState([]);
  const [input, setInput]       = useState('');
  const [loading, setLoading]   = useState(false);
  const bottomRef               = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const selectLanguage = (lang) => {
    setChatLang(lang);
    const greetings = {
      en: 'Jai Shri Ram 🙏 I am your Pandit. Ask me anything about this stotram — its meaning, benefits, or how to chant it.',
      hi: 'जय श्री राम 🙏 मैं आपका पंडित हूँ। इस स्तोत्र के बारे में कुछ भी पूछें — अर्थ, लाभ या जप विधि।',
      od: 'ଜୟ ଶ୍ରୀ ରାମ 🙏 ମୁଁ ଆପଣଙ୍କ ପଣ୍ଡିତ। ଏ ସ୍ତୋତ୍ର ବିଷୟରେ ଯାହା ଜାଣିବାକୁ ଚାହାନ୍ତି ପଚାରନ୍ତୁ।',
      te: 'జయ శ్రీ రామ్ 🙏 నేను మీ పండితుడిని. ఈ స్తోత్రం గురించి ఏదైనా అడగండి.',
      ta: 'ஜய் ஸ்ரீ ராம் 🙏 நான் உங்கள் பண்டிதர். இந்த ஸ்தோத்திரம் பற்றி எதுவும் கேளுங்கள்.',
      bn: 'জয় শ্রী রাম 🙏 আমি আপনার পণ্ডিত। এই স্তোত্র সম্পর্কে যা ইচ্ছা জিজ্ঞেস করুন।',
      mr: 'जय श्री राम 🙏 मी तुमचा पंडित आहे. या स्तोत्राबद्दल काहीही विचारा।',
      gu: 'જય શ્રી રામ 🙏 હું તમારો પંડિત છું. આ સ્તોત્ર વિશે કંઈ પણ પૂછો।',
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
      const res = await fetch('/api/pandit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          context: stotramContext || 'Hindu stotrams and prayers',
          language: chatLang?.name || 'English',
          history: messages.slice(-6).map(m => ({
            role: m.role === 'assistant' ? 'assistant' : 'user',
            content: m.text
          }))
        })
      });
      const data = await res.json();
      setMsg(prev => [...prev, { role: 'assistant', text: data.reply || 'Please try again.' }]);
    } catch {
      setMsg(prev => [...prev, { role: 'assistant', text: 'The Pandit is meditating. Please try again. 🙏' }]);
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => { setChatLang(null); setMsg([]); };

  return (
    <>
      {/* Floating trigger */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-4 z-40 flex items-center gap-2 bg-[#1a0505] border border-[#9b59b6]/50 text-[#c39bd3] px-4 py-3 rounded-full shadow-lg hover:border-[#9b59b6] hover:scale-105 transition-all"
        >
          <MessageCircle size={16} />
          <span className="font-cinzel-reg text-xs tracking-wider">Ask Pandit</span>
        </button>
      )}

      {/* Chat window — full screen on mobile, panel on desktop */}
      {open && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-4 sm:right-4 z-50 sm:w-96 bg-[#0d0202] border border-[#9b59b6]/40 sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col"
             style={{ height: chatLang ? '440px' : 'auto' }}>

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#9b59b6]/20 bg-[#1a0505]">
            <div className="flex items-center gap-2">
              <Bot size={16} className="text-[#c39bd3]" />
              <span className="font-cinzel-reg text-xs tracking-widest text-[#c39bd3]">ASK THE PANDIT</span>
            </div>
            <div className="flex items-center gap-2">
              {chatLang && (
                <button onClick={resetChat}
                  className="font-cinzel-reg text-[9px] tracking-widest text-[#c9922a]/50 hover:text-[#c9922a] uppercase transition-colors"
                  title="Change language">
                  <Globe size={13}/>
                </button>
              )}
              <button onClick={() => setOpen(false)} className="text-[#c39bd3]/50 hover:text-[#c39bd3]">
                <X size={14}/>
              </button>
            </div>
          </div>

          {/* Language selector screen */}
          {!chatLang && (
            <div className="px-4 py-5">
              <p className="font-cinzel-reg text-[10px] tracking-[3px] uppercase text-[#e8760a] mb-1 text-center">
                Choose Your Language
              </p>
              <p className="font-garamond text-sm text-[#e8d5b5]/60 text-center mb-4 italic">
                The Pandit will respond in your chosen language
              </p>
              <div className="grid grid-cols-2 gap-2">
                {CHAT_LANGS.map(l => (
                  <button
                    key={l.code}
                    onClick={() => selectLanguage(l)}
                    className="flex items-center gap-2 bg-[#1a0505] hover:bg-[#c9922a]/15 border border-[#c9922a]/20 hover:border-[#c9922a]/50 rounded-xl px-3 py-2.5 transition-all text-left group"
                  >
                    <span className="text-base">{l.label.split(' ')[0]}</span>
                    <div>
                      <p className="font-cinzel-reg text-[10px] tracking-wider text-[#f0c040] group-hover:text-[#f5c842]">{l.name}</p>
                      <p className="font-garamond text-[11px] text-[#e8d5b5]/50">{l.label.split(' ').slice(1).join(' ')}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat messages */}
          {chatLang && (
            <>
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                {/* Language indicator */}
                <div className="flex justify-center">
                  <span className="font-cinzel-reg text-[9px] tracking-[2px] uppercase text-[#c9922a]/40 bg-[#c9922a]/5 border border-[#c9922a]/15 rounded-full px-3 py-1">
                    {chatLang.label} · {chatLang.name}
                  </span>
                </div>

                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm font-garamond leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-[#9b59b6]/20 text-[#fdf3e3] rounded-br-sm'
                        : 'bg-[#1a0505] border border-[#c9922a]/20 text-[#f0e8d0] rounded-bl-sm'
                    }`}>
                      {m.text}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-[#1a0505] border border-[#c9922a]/20 rounded-2xl rounded-bl-sm px-4 py-2.5">
                      <div className="flex gap-1">
                        {[0, 150, 300].map(d => (
                          <span key={d} className="w-1.5 h-1.5 rounded-full bg-[#c9922a] animate-bounce" style={{ animationDelay: `${d}ms` }}/>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <div ref={bottomRef}/>
              </div>

              {/* Input */}
              <div className="px-3 pb-3 pt-2 border-t border-[#c9922a]/10">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage()}
                    placeholder={chatLang.code === 'hi' ? 'अपना प्रश्न पूछें...' :
                                 chatLang.code === 'od' ? 'ପ୍ରଶ୍ନ ପଚାରନ୍ତୁ...' :
                                 chatLang.code === 'te' ? 'మీ ప్రశ్న అడగండి...' :
                                 'Ask about this stotram...'}
                    className="flex-1 bg-[#1a0505] border border-[#c9922a]/25 rounded-xl px-3 py-2 text-sm text-white font-garamond placeholder-[#e8d5b5]/25 outline-none focus:border-[#c9922a]/60"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={loading || !input.trim()}
                    className="bg-[#c9922a] hover:bg-[#f0c040] disabled:opacity-30 text-[#0d0202] rounded-xl px-3 py-2 transition-colors"
                  >
                    <Send size={14}/>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}