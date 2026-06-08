# 🚀 دليل البدء السريع — نظام توليد المحتوى الذكي

## الخطوة 1: التثبيت والتكوين

### 1.1 نسخ المفاتيح والإعدادات
```bash
cp .env.example .env
```

### 1.2 تعديل ملف `.env` بإضافة:
```env
# OpenAI API
OPENAI_API_KEY=sk-your-key-here

# Database
MONGODB_URI=mongodb://localhost:27017/smartlearn_hs

# Server
PORT=3000
JWT_SECRET=your-secret-key

# Frontend
FRONTEND_URL=http://localhost:3001
```

### 1.3 تثبيت المتعلقات
```bash
cd backend
npm install
```

---

## الخطوة 2: بدء قاعدة البيانات

```bash
# إذا كنت تستخدم MongoDB محلياً
mongod

# أو استخدم MongoDB Atlas (سحابي)
# تأكد من تحديث MONGODB_URI في .env
```

---

## الخطوة 3: تشغيل الخادم

```bash
# من مجلد backend
npm start

# أو للتطوير (مع auto-reload)
npm run dev
```

سيظهر:
```
✅ تم الاتصال بـ MongoDB بنجاح
🚀 خادم SmartLearn HS يعمل على المنفذ 3000
```

---

## الخطوة 4: دمج الـ API مع الواجهة الأمامية

### 4.1 استيراد المكتبة
```html
<script src="aiContentAPI.js"></script>
```

### 4.2 استخدام الدوال في الواجهة

#### توليد ملخص:
```javascript
const result = await generateSummary(
  'قانون نيوتن الثاني',
  'science',
  '3'
);

if (result.success) {
  console.log(result.summary);
} else {
  console.error(result.error);
}
```

#### توليد فيديو:
```javascript
const video = await generateVideoScript(
  'الخوارزميات',
  ['البحث', 'الترتيب'],
  15,
  'cs',
  '3'
);

console.log(video.script);
```

#### توليد بودكاست:
```javascript
const podcast = await generatePodcast(
  'التمثيل الضوئي',
  1,
  'medium',
  'science',
  '3'
);

console.log(podcast.content);
```

#### توليد خريطة ذهنية:
```javascript
const mindmap = await generateMindMap(
  'الجملة الاسمية',
  3,
  'arabic',
  '3'
);

console.log(mindmap.jsonStructure);
```

#### توليد أسئلة:
```javascript
const questions = await generateQuestions(
  'المشتقات',
  'medium',
  5,
  'math',
  '3'
);

questions.questions.forEach(q => {
  console.log(q.question);
  console.log(q.correctAnswer);
});
```

#### توليد حزمة كاملة:
```javascript
const pkg = await generateCompletePackage(
  'الذكاء الاصطناعي',
  'cs',
  '3'
);

// تتضمن: summary, videoScript, podcast, mindmap, questions
console.log(pkg.package);
```

#### الشات الذكي:
```javascript
const response = await sendSmartMessage(
  'كيف أحل مسائل المشتقات؟',
  'math',
  'التفاضل'
);

console.log(response.reply);
```

---

## اختبار الـ API مع cURL

### اختبار التوليد:
```bash
curl -X POST http://localhost:3000/api/content/generate-summary \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "topic": "الذكاء الاصطناعي",
    "subject": "cs",
    "grade": "3"
  }'
```

### اختبار الشات:
```bash
curl -X POST http://localhost:3000/api/content/chat/send \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "message": "اشرح لي الخوارزمية",
    "subject": "البرمجة",
    "topic": "الخوارزميات"
  }'
```

---

## الأخطاء الشائعة وحلولها

### ❌ خطأ: "No token provided"
**الحل**: تأكد من إرسال Bearer token في headers
```javascript
headers: {
  'Authorization': `Bearer ${localStorage.getItem('token')}`
}
```

### ❌ خطأ: "OPENAI_API_KEY is not set"
**الحل**: أضف المفتاح في ملف `.env`

### ❌ خطأ: "Connection refused (MongoDB)"
**الحل**: تأكد من تشغيل MongoDB أو تصحيح MONGODB_URI

### ❌ خطأ: "CORS error"
**الحل**: تأكد من تطابق FRONTEND_URL مع عنوان الواجهة الأمامية

---

## اختبار شامل

### اختبار جميع الميزات:
```javascript
async function testAllFeatures() {
  console.log('🧪 اختبار نظام توليد المحتوى...\n');

  // 1. اختبار الملخص
  console.log('📋 اختبار توليد ملخص...');
  const summary = await generateSummary('الذكاء الاصطناعي', 'cs', '3');
  console.log('✅', summary.success ? 'نجح' : 'فشل', '\n');

  // 2. اختبار الفيديو
  console.log('🎥 اختبار توليد سكريبت فيديو...');
  const video = await generateVideoScript('الخوارزميات', ['البحث'], 10, 'cs', '3');
  console.log('✅', video.success ? 'نجح' : 'فشل', '\n');

  // 3. اختبار البودكاست
  console.log('🎙️ اختبار توليد بودكاست...');
  const podcast = await generatePodcast('التعلم الآلي', 1, 'medium', 'cs', '3');
  console.log('✅', podcast.success ? 'نجح' : 'فشل', '\n');

  // 4. اختبار الخريطة
  console.log('🗺️ اختبار توليد خريطة ذهنية...');
  const mindmap = await generateMindMap('الجملة الاسمية', 3, 'arabic', '3');
  console.log('✅', mindmap.success ? 'نجح' : 'فشل', '\n');

  // 5. اختبار الأسئلة
  console.log('📝 اختبار توليد أسئلة...');
  const questions = await generateQuestions('المشتقات', 'medium', 5, 'math', '3');
  console.log('✅', questions.success ? 'نجح' : 'فشل', '\n');

  // 6. اختبار الحزمة
  console.log('📦 اختبار توليد حزمة كاملة...');
  const pkg = await generateCompletePackage('الذكاء الاصطناعي', 'cs', '3');
  console.log('✅', pkg.success ? 'نجح' : 'فشل', '\n');

  // 7. اختبار الشات
  console.log('🤖 اختبار الشات الذكي...');
  const chat = await sendSmartMessage('كيف أدرس بفعالية؟', 'General', '');
  console.log('✅', chat.success ? 'نجح' : 'فشل', '\n');

  console.log('🎉 انتهى الاختبار!');
}

// تشغيل الاختبار
testAllFeatures();
```

---

## مستويات الخطورة والمعالجة

### Level 1: Information
```javascript
console.log('ℹ️ معلومة عادية');
```

### Level 2: Warning
```javascript
console.warn('⚠️ تحذير');
```

### Level 3: Error
```javascript
console.error('❌ خطأ');
```

### Level 4: Success
```javascript
console.log('✅ نجاح');
```

---

## الأداء والتحسينات

### نصائح لتحسين الأداء:
1. **التخزين المؤقت**: استخدم caching للمحتوى المُولّد
2. **التزامن**: استخدم `Promise.all()` لتوليد عدة أنواع معاً
3. **التقسيم**: قسّم الطلبات الكبيرة
4. **المراقبة**: استخدم logging لتتبع الأداء

---

## الدعم والموارد

- 📖 [توثيق OpenAI API](https://platform.openai.com/docs)
- 📖 [توثيق MongoDB](https://docs.mongodb.com)
- 📖 [توثيق Express.js](https://expressjs.com)

---

**تم الإعداد بنجاح! 🎉**

بعد هذه الخطوات، يكون لديك نظام كامل لتوليد محتوى تعليمي ذكي!
