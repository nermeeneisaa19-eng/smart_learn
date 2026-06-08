import { useState } from 'react';

const questionTypes = [
  { value: 'mcq', label: 'اختيار من متعدد' },
  { value: 'truefalse', label: 'صح/خطأ' },
  { value: 'fill', label: 'اكمل الفراغ' }
];

function QuizGenerator() {
  const [type, setType] = useState('mcq');
  const [difficulty, setDifficulty] = useState('medium');

  return (
    <div>
      <h2>مولّد الاختبارات الذكي</h2>
      <p className="subtitle">إنشاء بنك أسئلة ذكي باختيارات مخصصة حسب مستوى الطالب.</p>
      <div className="form-row">
        <label>نوع السؤال</label>
        <select value={type} onChange={e => setType(e.target.value)}>
          {questionTypes.map(item => (
            <option key={item.value} value={item.value}>{item.label}</option>
          ))}
        </select>
      </div>
      <div className="form-row">
        <label>مستوى الصعوبة</label>
        <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
          <option value="easy">سهل</option>
          <option value="medium">متوسط</option>
          <option value="hard">صعب</option>
        </select>
      </div>
      <button className="action-btn">توليد سؤال ذكي</button>
    </div>
  );
}

export default QuizGenerator;
