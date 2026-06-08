# SmartLearn HS - منصة التعليم الذكي

منصة تعليمية ذكية متكاملة تعتمد على تقنيات الذكاء الاصطناعي لطلاب الثانوية العامة المصرية.

## 🚀 الميزات

### 🤖 AI Tutor الذكي
- شات بوت تعليمي تفاعلي
- شرح المحتوى حسب مستوى الطالب
- توليد أمثلة وأسئلة تلقائياً
- دعم اللغة العربية والإنجليزية
- حفظ سياق المحادثة

### 📊 Adaptive Learning
- تحليل أداء الطالب
- تتبع درجات الاختبارات
- معرفة نقاط الضعف
- اقتراح محتوى مناسب
- مسارات تعلم مخصصة

### 📝 AI Quiz Generator
- توليد امتحانات تلقائياً
- دعم MCQ, True/False, Fill in the blanks
- تحديد مستوى الصعوبة
- بنك أسئلة ذكي

### 📈 Smart Analytics Dashboard
- تحليل أداء الطلاب
- رسوم بيانية تفاعلية
- توقع الطلاب المعرضين للتعثر
- قياس التفاعل

### 🎯 Recommendation System
- اقتراح كورسات ودروس
- اقتراح فيديوهات حسب المستوى
- مصادر تعليمية مخصصة

### 🎤 AI Voice Features
- تحويل الكلام إلى نص
- تحويل النص إلى صوت
- مساعد صوتي داخل المنصة

## 🏗️ Architecture المشروع

```
smartlearn-hs/
├── assets/                 # ملفات CSS, JS, صور
├── components/            # مكونات HTML منفصلة
├── data/                  # بيانات JSON
├── ai/                    # ملفات الذكاء الاصطناعي
├── backend/               # الخادم الخلفي
│   ├── models/           # نماذج قاعدة البيانات
│   ├── routes/           # APIs
│   ├── middleware/       # وسطاء
│   ├── services/         # خدمات
│   └── utils/            # أدوات مساعدة
├── public/               # ملفات عامة
├── tests/                # اختبارات
├── package.json
├── README.md
└── .env.example
```

## 🛠️ التقنيات المستخدمة

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Chart.js للرسوم البيانية
- Web Speech API للميزات الصوتية
- Local Storage للبيانات المحلية

### Backend (مقترح)
- Node.js + Express.js
- MongoDB (قاعدة البيانات)
- JWT للمصادقة
- Socket.io للوقت الفعلي
- OpenAI API للذكاء الاصطناعي

### AI & ML
- OpenAI GPT للشات والتوليد
- TensorFlow.js للتحليل المحلي
- Natural Language Processing

## 🚀 التثبيت والتشغيل

### النسخة المحلية (حالياً)
```bash
# فتح الملف مباشرة في المتصفح
open seduc_platform.html
```

### النسخة الكاملة (مع Backend)
```bash
# تثبيت التبعيات
npm install

# تشغيل الخادم
npm start

# للتطوير
npm run dev
```

## 📊 Database Schema

### نموذج الطالب (Student)
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  grade: String, // الأول الثانوي، الثاني، إلخ
  specialization: String, // علمي علوم، علمي رياضة، أدبي
  level: String, // ضعيف، متوسط، ممتاز
  performance: {
    overall: Number, // المعدل العام
    subjects: [{
      subject: String,
      grade: Number,
      weakTopics: [String],
      strongTopics: [String]
    }]
  },
  learningPath: [{
    subject: String,
    completedLessons: [String],
    recommendedLessons: [String],
    progress: Number
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### نموذج المحادثة (Conversation)
```javascript
{
  _id: ObjectId,
  studentId: ObjectId,
  messages: [{
    role: String, // user, assistant
    content: String,
    timestamp: Date,
    context: Object // معلومات إضافية
  }],
  sessionId: String,
  createdAt: Date
}
```

### نموذج الاختبار (Quiz)
```javascript
{
  _id: ObjectId,
  title: String,
  subject: String,
  grade: String,
  difficulty: String,
  questions: [{
    type: String, // mcq, truefalse, fillblank
    question: String,
    options: [String], // للاختيار من متعدد
    correctAnswer: String,
    explanation: String,
    points: Number
  }],
  createdBy: ObjectId, // معلم أو AI
  createdAt: Date
}
```

## 🔗 APIs المقترحة

### Authentication
- `POST /api/auth/login` - تسجيل الدخول
- `POST /api/auth/register` - التسجيل
- `POST /api/auth/refresh` - تجديد التوكن

### Students
- `GET /api/students/:id` - الحصول على بيانات طالب
- `PUT /api/students/:id` - تحديث بيانات طالب
- `GET /api/students/:id/analytics` - إحصائيات الطالب

### AI Tutor
- `POST /api/ai/chat` - إرسال رسالة للشات بوت
- `POST /api/ai/generate-content` - توليد محتوى
- `POST /api/ai/generate-quiz` - توليد اختبار

### Quizzes
- `GET /api/quizzes` - قائمة الاختبارات
- `POST /api/quizzes` - إنشاء اختبار جديد
- `POST /api/quizzes/:id/submit` - تسليم اختبار

### Analytics
- `GET /api/analytics/dashboard` - لوحة التحليلات
- `GET /api/analytics/students` - تحليل الطلاب
- `GET /api/analytics/predictions` - توقعات التعثر

## 🎯 خطة التطوير

### المرحلة 1: Frontend Enhancements ✅
- تحسين UI/UX
- إضافة Dark/Light Mode
- تحسين الرسوم البيانية
- إضافة Voice Features

### المرحلة 2: Backend Development 🔄
- إنشاء Node.js Server
- إضافة MongoDB
- تطبيق Authentication
- بناء APIs

### المرحلة 3: AI Integration 🚀
- دمج OpenAI API
- تطوير Recommendation System
- تحسين Adaptive Learning
- إضافة Voice AI

### المرحلة 4: Advanced Features 🔮
- Real-time Collaboration
- Mobile App
- Advanced Analytics
- Machine Learning Models

## 🤝 المساهمة

نرحب بالمساهمات! يرجى قراءة [دليل المساهمة](CONTRIBUTING.md) أولاً.

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT - راجع ملف [LICENSE](LICENSE) للتفاصيل.

## 📞 التواصل

- **المطور**: SmartLearn HS Team
- **البريد الإلكتروني**: contact@smartlearnhs.com
- **الموقع**: [www.smartlearnhs.com](https://www.smartlearnhs.com)

---

⭐ إذا أعجبك المشروع، لا تنس إعطاؤه نجمة!