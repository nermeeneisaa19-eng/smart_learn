import { useState } from 'react';
import axios from 'axios';

const initialMessages = [
  { id: 1, role: 'assistant', text: 'مرحباً! كيف يمكنني مساعدتك اليوم في التعلم؟' }
];

function ChatbotPanel() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { id: Date.now(), role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('/api/ai/chat', {
        message: input,
        language: 'ar'
      });
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', text: response.data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', text: 'عذراً، حدث خطأ في الاتصال. حاول مرة أخرى.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>AI Tutor ذكي</h2>
      <p className="subtitle">اسأل المعلّم الذكي عن أي درس، وسيجري توليد الشرح والتمارين والمراجعات تلقائياً.</p>
      <div className="chat-window">
        {messages.map(msg => (
          <div key={msg.id} className={`chat-bubble ${msg.role}`}>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="chat-actions">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="اكتب سؤالك هنا..."
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? 'جارٍ الإرسال...' : 'أرسل'}
        </button>
      </div>
    </div>
  );
}

export default ChatbotPanel;
