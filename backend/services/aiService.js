const OpenAI = require('openai');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

class AIService {
  constructor() {
    this.model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
    this.maxTokens = 2000;
  }

   // توليد رد للشات بوت
  async generateChatResponse(messages, context = {}) {
    try {
      const systemMessage = this.buildSystemMessage(context);

      const conversation = [
        { role: 'system', content: systemMessage },
        ...messages.slice(-10)
      ];

      const response = await openai.chat.completions.create({
        model: this.model,
        messages: conversation,
        max_tokens: this.maxTokens,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      });

      const reply = response.choices[0].message.content.trim();

      return {
        success: true,
        reply,
        usage: response.usage,
        model: this.model,
        fallback: false
      };
    } catch (error) {
      console.error('AI Chat Error:', error.message);

      return {
        success: true,
        error: error.message,
        reply: this.getFallbackReply(messages, context),
        fallback: true
      };
    }
  }

  // رد احتياطي مجاني عند عدم توفر رصيد OpenAI
  getFallbackReply(messages, context = {}) {
    const lastMessage = messages[messages.length - 1]?.content || '';
    const level = context.level || 'متوسط';
    const subject = context.subject || 'المادة الحالية';

    if (
      lastMessage.toLowerCase().includes('data') ||
      lastMessage.toLowerCase().includes('information') ||
      lastMessage.includes('البيانات') ||
      lastMessage.includes('المعلومات')
    ) {
      if (level === 'ضعيف') {
        return `خلينا نشرحها ببساطة جدًا 🌟

البيانات هي أشياء خام مثل رقم أو كلمة أو رمز.

مثال:
30 درجة.

أما المعلومات فهي بيانات فهمنا معناها واستخدمناها.

مثال:
درجة الحرارة 30، إذن الجو حار ونحتاج ملابس خفيفة.

يعني:
البيانات = شيء خام
المعلومات = بيانات لها معنى`;
      }

      if (level === 'ممتاز') {
        return `البيانات تمثل المادة الخام التي تُجمع في صورة أرقام أو نصوص أو رموز، أما المعلومات فهي ناتج معالجة هذه البيانات وتنظيمها بحيث تصبح ذات معنى وتساعد على اتخاذ القرار.

مثال:
درجات الطلاب = بيانات.
تحليل الدرجات لمعرفة مستوى الفصل = معلومات.

وهذا الفرق مهم في ${subject} لأنه يوضح كيف تتحول المدخلات الخام إلى معرفة قابلة للاستخدام.`;
      }

      return `البيانات هي حقائق خام مثل الأرقام أو الكلمات أو الرموز، أما المعلومات فهي بيانات تمت معالجتها وتنظيمها فأصبح لها معنى.

مثال:
درجة الطالب في الاختبار = بيانات.
معرفة أن الطالب يحتاج إلى مراجعة درس معين بناءً على الدرجة = معلومات.

إذن البيانات تتحول إلى معلومات عندما نفهمها ونستخدمها في اتخاذ قرار.`;
    }

    return `أنا مساعدك التعليمي داخل منصة SmartLearn HS 🤖

أستطيع مساعدتك في شرح الدرس، تبسيط المفاهيم، عمل ملخص، أو اقتراح تدريبات مناسبة لمستواك الحالي: ${level}.

اكتب سؤالك عن الدرس وسأشرحه لك بطريقة مناسبة.`;
  }
  // توليد محتوى تعليمي
  async generateContent(type, params) {
    try {
      const prompt = this.buildContentPrompt(type, params);

      const response = await openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: `أنت معلم خبير متخصص في ${params.subject || 'المادة المطلوبة'}. اكتب باللغة العربية فقط.`
          },
          { role: 'user', content: prompt }
        ],
        max_tokens: 3000,
        temperature: 0.8
      });

      const content = response.choices[0].message.content.trim();

      return {
        success: true,
        content,
        type,
        usage: response.usage
      };
    } catch (error) {
      console.error('AI Content Generation Error:', error);
      return {
        success: false,
        error: error.message,
        content: 'عذراً، تعذر توليد المحتوى. يرجى المحاولة مرة أخرى.'
      };
    }
  }

  // توليد أسئلة اختبار
  async generateQuiz(subject, grade, difficulty, topic, count = 10) {
    try {
      const prompt = `قم بتوليد ${count} أسئلة اختبار لمادة ${subject} للصف ${grade} بمستوى ${difficulty}.

الموضوع: ${topic}

متطلبات:
- ${Math.floor(count * 0.6)} سؤال اختيار من متعدد (4 خيارات)
- ${Math.floor(count * 0.3)} سؤال صح/خطأ
- ${Math.floor(count * 0.1)} سؤال إكمال جملة

لكل سؤال:
- السؤال واضح ومباشر
- الإجابة الصحيحة محددة
- شرح مختصر للإجابة الصحيحة
- مناسب لمستوى ${difficulty}

اكتب النتيجة بتنسيق JSON صالح.`;

      const response = await openai.chat.completions.create({
        model: this.model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 4000,
        temperature: 0.7
      });

      const result = response.choices[0].message.content.trim();

      // Parse JSON response
      const quizData = JSON.parse(result);

      return {
        success: true,
        quiz: quizData,
        usage: response.usage
      };
    } catch (error) {
      console.error('AI Quiz Generation Error:', error);
      return {
        success: false,
        error: error.message,
        quiz: null
      };
    }
  }

  // تحليل أداء الطالب
  async analyzePerformance(studentData, quizResults) {
    try {
      const prompt = `حلل أداء الطالب التالي وأعطِ توصيات:

بيانات الطالب:
- الاسم: ${studentData.name}
- الصف: ${studentData.grade}
- التخصص: ${studentData.specialization}
- المستوى العام: ${studentData.level}

نتائج الاختبارات الأخيرة:
${quizResults.map(r => `- ${r.subject}: ${r.score}% (${r.date})`).join('\n')}

أعطِ:
1. تحليل الأداء العام
2. نقاط القوة والضعف
3. توصيات للتحسين
4. خطة دراسية مقترحة

اكتب الرد باللغة العربية بشكل منظم.`;

      const response = await openai.chat.completions.create({
        model: this.model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 2000,
        temperature: 0.6
      });

      const analysis = response.choices[0].message.content.trim();

      return {
        success: true,
        analysis,
        usage: response.usage
      };
    } catch (error) {
      console.error('AI Performance Analysis Error:', error);
      return {
        success: false,
        error: error.message,
        analysis: 'تعذر تحليل الأداء حالياً.'
      };
    }
  }

  // توليد توصيات مخصصة
  async generateRecommendations(studentProfile, learningHistory) {
    try {
      const prompt = `بناءً على ملف الطالب التالي، أعطِ توصيات تعليمية مخصصة:

الملف الشخصي:
${JSON.stringify(studentProfile, null, 2)}

تاريخ التعلم:
${JSON.stringify(learningHistory, null, 2)}

أعطِ:
1. المواد التي يحتاج مراجعتها
2. أنواع المحتوى المناسبة (فيديو، نص، تمارين)
3. جدولة زمنية مقترحة
4. أهداف قصيرة وطويلة الأمد

اكتب الرد بتنسيق منظم وواضح.`;

      const response = await openai.chat.completions.create({
        model: this.model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 2500,
        temperature: 0.7
      });

      const recommendations = response.choices[0].message.content.trim();

      return {
        success: true,
        recommendations,
        usage: response.usage
      };
    } catch (error) {
      console.error('AI Recommendations Error:', error);
      return {
        success: false,
        error: error.message,
        recommendations: 'تعذر توليد التوصيات حالياً.'
      };
    }
  }

  // بناء رسالة النظام للشات
  buildSystemMessage(context) {
    const baseSystem = `أنت مساعد تعليمي ذكي متقدم لطلاب الثانوية العامة المصرية.

المبادئ الأساسية:
- أجب باللغة العربية الفصحى الواضحة والمشجعة
- كن ودوداً ومشجعاً مثل معلم حقيقي
- اعتمد على المنهج الرسمي المصري 2025-2026
- ربط الشرح بالحياة اليومية والتطبيقات العملية
- إذا كان السؤال دراسي، ابدأ بالإجابة المباشرة ثم شرح إضافي
- استخدم الرموز التوضيحية (📚, 💡, ⚠️, ✅) لجعل الإجابة أكثر جاذبية
- اقترح أنشطة أو تمارين إضافية عند المناسبة

السياق الحالي:
- الطالب في ${context.grade || 'صف غير محدد'}
- التخصص: ${context.specialization || 'غير محدد'}
- المستوى: ${context.level || 'متوسط'}
- المادة الحالية: ${context.subject || 'غير محددة'}

أجب بطريقة طبيعية وتفاعلية، وإذا لزم الأمر اقترح استخدام أدوات أخرى في المنصة.`;

    return baseSystem;
  }

  // بناء prompt لتوليد المحتوى
  buildContentPrompt(type, params) {
    const { subject, topic, level, grade } = params;

    const prompts = {
      summary: `اكتب ملخصاً تعليمياً شاملاً لموضوع "${topic}" في مادة ${subject}.
      المستوى: ${level}
      الصف: ${grade}

      يجب أن يشمل:
      - مقدمة عن الموضوع
      - النقاط الرئيسية
      - أمثلة توضيحية
      - خلاصة عملية`,

      video: `اقترح محتوى فيديو تعليمي لموضوع "${topic}" في مادة ${subject}.
      المستوى: ${level}

      يجب أن يشمل:
      - وصف الفيديو (3-5 دقائق)
      - النقاط الرئيسية لتغطيتها
      - أمثلة بصرية مقترحة
      - أسئلة للتفكير أثناء المشاهدة`,

      podcast: `اكتب سيناريو بودكاست تعليمي (5 دقائق) عن "${topic}" في مادة ${subject}.
      المستوى: ${level}

      يجب أن يشمل:
      - ترحيب ومقدمة
      - شرح الموضوع بأمثلة
      - نصائح عملية
      - خاتمة ودعوة للتفكير`,

      quiz: `قم بتوليد 10 أسئلة اختبار عن "${topic}" في مادة ${subject}.
      المستوى: ${level}

      يجب أن تشمل:
      - 6 أسئلة اختيار من متعدد
      - 3 أسئلة صح/خطأ
      - 1 سؤال إكمال
      - الإجابات الصحيحة مع الشرح`,

      exercise: `قم بتوليد 8 تمارين تطبيقية متدرجة عن "${topic}" في مادة ${subject}.
      المستوى: ${level}

      يجب أن تشمل:
      - تمارين من السهل للصعب
      - حل مفصل لكل تمرين
      - نصائح وحيل للحل`
    };

    return prompts[type] || prompts.summary;
  }
}

module.exports = new AIService();