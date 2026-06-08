import { useState } from 'react';
import ChatbotPanel from './components/ChatbotPanel';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import QuizGenerator from './components/QuizGenerator';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? 'app dark' : 'app light'}>
      <header className="topbar">
        <div>
          <h1>SmartLearn AI</h1>
          <p>منصة تعليمية ذكية تعتمد على توصيات AI وتخصيص مسار التعلم</p>
        </div>
        <button className="mode-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>

      <main className="layout">
        <section className="panel large">
          <ChatbotPanel />
        </section>
        <section className="panel medium">
          <AnalyticsDashboard />
        </section>
        <section className="panel small">
          <QuizGenerator />
        </section>
      </main>
    </div>
  );
}

export default App;
