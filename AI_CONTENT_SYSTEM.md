# SmartLearn HS — نظام توليد المحتوى بالذكاء الاصطناعي

## 🚀 نظام متكامل لتوليد المحتوى التعليمي الذكي

تم تطوير نظام جديد متكامل يمكّن المعلمين والطلاب من توليد محتوى تعليمي حقيقي ومتعدد الأنواع بواسطة الذكاء الاصطناعي.

---

## ✨ الميزات الجديدة

### 1️⃣ **توليد ملخصات نصية** 📋
- ملخصات واضحة ومركزة للدروس
- مناسبة لمستويات الطلاب المختلفة
- تلخيص سريع قبل الامتحانات

### 2️⃣ **سكريبتات فيديو شرح** 🎥
- كتابة سيناريوهات شرح جاهزة للتسجيل
- تنسيق احترافي بمقدمة وشرح وخلاصة
- تقدير المدة اللازمة للفيديو

### 3️⃣ **محتوى بودكاست** 🎙️
- نصوص قابلة للتسجيل الصوتي
- أسلوب حواري تفاعلي
- مناسب للاستماع أثناء الطريق

### 4️⃣ **خرائط ذهنية** 🗺️
- تمثيل بصري للمفاهيم
- هيكل تفرعي منظم
- صيغة JSON وصيغة نصية

### 5️⃣ **أسئلة تفاعلية** 📝
- أسئلة متنوعة (اختيار من متعدد، صح/خطأ، إجابة قصيرة)
- مستويات صعوبة مختلفة
- شروحات للإجابات الصحيحة

### 6️⃣ **حزمة محتوى كاملة** 📦
- توليد جميع أنواع المحتوى دفعة واحدة
- محتوى منسق وشامل لموضوع واحد
- توفير الوقت والجهد

### 7️⃣ **شات بوت ذكي** 🤖
- إجابات ذكية على أسئلة الطلاب
- سياق تعليمي موثوق
- محفوظ تاريخ المحادثات

---

## 📋 البنية التقنية

### Backend Services

```
backend/
├── services/
│   ├── contentGenerationService.js  (خدمة توليد المحتوى)
│   └── aiService.js                  (خدمة الـ AI الأساسية)
├── routes/
│   └── content.js                    (API endpoints)
├── models/
│   ├── GeneratedContent.js           (نموذج المحتوى)
│   └── SmartChat.js                  (نموذج المحادثات)
└── middleware/
    └── auth.js                       (المصادقة)
```

### Frontend APIs

```javascript
// في aiContentAPI.js
- generateSummary()              // توليد ملخص
- generateVideoScript()          // توليد سكريبت فيديو
- generatePodcast()              // توليد بودكاست
- generateMindMap()              // توليد خريطة ذهنية
- generateQuestions()            // توليد أسئلة
- generateCompletePackage()      // توليد حزمة كاملة
- sendSmartMessage()             // إرسال رسالة للشات
- fetchGeneratedContent()        // جلب المحتوى المحفوظ
```

---

## 🔌 API Endpoints

### Content Generation

```
POST /api/content/generate-summary
- topic (string): موضوع الملخص
- subject (string): المادة الدراسية
- grade (string): المستوى الدراسي
- Response: { summary, contentId, metadata }

POST /api/content/generate-video-script
- topic: الموضوع
- subtopics: المحاور الفرعية
- duration: مدة الفيديو المتوقعة
- Response: { script, contentId, estimatedDuration }

POST /api/content/generate-podcast
- topic: الموضوع
- episode: رقم الحلقة
- length: 'short' | 'medium' | 'long'
- Response: { content, contentId, estimatedDuration }

POST /api/content/generate-mindmap
- topic: الموضوع
- depth: عمق التفرع (1-5)
- Response: { textFormat, jsonStructure, contentId }

POST /api/content/generate-questions
- topic: الموضوع
- difficulty: 'easy' | 'medium' | 'hard'
- count: عدد الأسئلة
- Response: { questions[], contentId }

POST /api/content/generate-package
- topic: الموضوع
- subject: المادة
- grade: المستوى
- Response: { package, components, contentId }
```

### Chat & Conversation

```
POST /api/content/chat/send
- message: الرسالة
- subject: المادة
- topic: الموضوع (اختياري)
- conversationId: معرّف المحادثة (اختياري)
- Response: { reply, conversationId, model }

GET /api/content/chat/:conversationId
- Response: { conversation object }

GET /api/content
- Params: subject, grade, type, page
- Response: { content[], total, pages }
```

---

## 🛠️ كيفية الاستخدام

### للمعلمين

1. **توليد محتوى لدرس**:
   ```javascript
   const result = await generateCompletePackage(
     'مقدمة في الذكاء الاصطناعي',
     'البرمجة والذكاء الاصطناعي',
     '3'
   );
   ```

2. **الحصول على ملخص**:
   ```javascript
   const summary = await generateSummary(
     'التعلم الآلي',
     'cs',
     '3'
   );
   ```

3. **توليد سكريبت فيديو**:
   ```javascript
   const video = await generateVideoScript(
     'الشبكات العصبية',
     ['مبادئ أساسية', 'تطبيقات عملية'],
     15
   );
   ```

### للطلاب

1. **الشات الذكي**:
   ```javascript
   const reply = await sendSmartMessage(
     'اشرح لي قانون أوم بطريقة مبسطة',
     'العلوم',
     'الفيزياء'
   );
   ```

2. **أسئلة تدريبية**:
   ```javascript
   const questions = await generateQuestions(
     'المشتقات في التفاضل',
     'medium',
     10
   );
   ```

---

## 🔐 الأمان والخصوصية

- ✅ جميع الطلبات تتطلب مصادقة Bearer token
- ✅ تشفير البيانات الحساسة
- ✅ معدل محدود للطلبات (Rate Limiting)
- ✅ تسجيل جميع العمليات (Logging)
- ✅ فصل البيانات حسب المستخدم

---

## 📊 قاعدة البيانات

### GeneratedContent Schema
```javascript
{
  title: String,
  topic: String,
  subject: String (enum),
  grade: String,
  contentType: String (summary|videoScript|podcast|mindmap|questions|package),
  content: {
    summary: String,
    videoScript: String,
    podcast: String,
    mindmap: Mixed,
    questions: Array
  },
  createdBy: ObjectId (ref: User),
  curriculum: {
    book: String,
    unit: String,
    lesson: String
  },
  status: String (draft|published|archived),
  downloads: Number,
  likes: Number,
  usedByCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### SmartChat Schema
```javascript
{
  studentId: ObjectId,
  subject: String,
  topic: String,
  grade: String,
  messages: Array,
  conversationHistory: Array,
  status: String,
  satisfaction: Number,
  feedback: String,
  startedAt: Date,
  endedAt: Date,
  messageCount: Number,
  teacherReview: Object
}
```

---

## ⚙️ متطلبات التشغيل

### Dependencies
```json
{
  "express": "^4.18.2",
  "mongoose": "^7.5.0",
  "openai": "^4.0.0",
  "cors": "^2.8.5",
  "helmet": "^7.0.0",
  "dotenv": "^16.3.1",
  "jsonwebtoken": "^9.0.2"
}
```

### Environment Variables
```
OPENAI_API_KEY=sk-...
MONGODB_URI=mongodb://localhost:27017/smartlearn_hs
JWT_SECRET=your_secret
PORT=3000
```

---

## 🚀 الخطوات التالية

1. **إعداد متغيرات البيئة** — نسخ `.env.example` إلى `.env` وإدخال المفاتيح
2. **تثبيت المتعلقات** — `npm install`
3. **بدء قاعدة البيانات** — MongoDB
4. **تشغيل الخادم** — `npm start`
5. **اختبار الـ API** — استخدام Postman أو curl

---

## 📝 أمثلة الاستخدام

### مثال 1: توليد ملخص درس
```javascript
const result = await generateSummary(
  'النسب المثلثية في المثلث القائم',
  'math',
  '3'
);

// النتيجة:
// {
//   success: true,
//   summary: "النسب المثلثية هي...",
//   contentId: "507f...",
//   metadata: { wordCount: 250, estimatedReadTime: 2 }
// }
```

### مثال 2: توليد حزمة محتوى كاملة
```javascript
const pkg = await generateCompletePackage(
  'التعلم الآلي: مقدمة',
  'cs',
  '3'
);

// تتضمن الحزمة:
// - ملخص
// - سكريبت فيديو
// - محتوى بودكاست
// - خريطة ذهنية
// - 5 أسئلة تفاعلية
```

### مثال 3: شات ذكي تفاعلي
```javascript
const chat = await sendSmartMessage(
  'كيف أفهم الاشتقاق؟',
  'math',
  'التفاضل'
);

// الرد:
// {
//   success: true,
//   reply: "الاشتقاق هو عملية رياضية...",
//   conversationId: "507f...",
//   model: "gpt-4-turbo"
// }
```

---

## 🎯 الفوائد التعليمية

✅ **للمعلمين**:
- توفير الوقت في إعداد المحتوى
- محتوى متنوع وشامل
- سهولة الوصول إلى موارد تعليمية عالية الجودة

✅ **للطلاب**:
- شرح مخصص حسب المستوى
- تعلم بطرق متعددة (نص، فيديو، صوت، صور)
- جواب فوري لأسئلتهم التعليمية

✅ **للمنصة**:
- تحسين جودة التعليم
- زيادة التفاعل والانخراط
- بيانات وتحليلات أفضل

---

## 📞 الدعم والمساعدة

للأسئلة أو الإبلاغ عن مشاكل:
- 📧 البريد: support@smartlearn.eg
- 🔗 الموقع: https://smartlearn.eg
- 💬 الدعم الفني: support@smartlearn.eg

---

## 📄 الترخيص

© 2025 SmartLearn HS. All rights reserved.

---

**آخر تحديث**: May 7, 2025
**النسخة**: 2.0.0
**الحالة**: ✅ جاهزة للاستخدام الإنتاجي
