const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

class ContentGenerationService {
  constructor() {
    this.model = 'gpt-4-turbo';
    this.arabicSystemPrompt = 'أنت معلم خبير متخصص في المنهج المصري. اكتب باللغة العربية الفصيحة الواضحة والسهلة الفهم.';
  }

  /**
   * تلخيص محتوى تعليمي
   */
  async generateSummary(topic, content, grade = '3') {
    try {
      const prompt = `قم بتلخيص المحتوى التالي بشكل مركز وسهل الفهم للصف ${grade}:

الموضوع: ${topic}

المحتوى:
${content}

المتطلبات:
- تلخيص واضح ومختصر (300-500 كلمة)
- استخدام نقاط رئيسية
- تجنب التعقيد
- مناسب للطلاب`;

      const response = await openai.chat.completions.create({
        model: this.model,
        messages: [
          { role: 'system', content: this.arabicSystemPrompt },
          { role: 'user', content: prompt }
        ],
        max_tokens: 1500,
        temperature: 0.7
      });

      return {
        success: true,
        summary: response.choices[0].message.content.trim(),
        type: 'summary',
        tokens: response.usage.total_tokens
      };
    } catch (error) {
      console.error('Summary Generation Error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * إنشاء سكريبت فيديو شرح
   */
  async generateVideoScript(topic, subtopics, duration = 10) {
    try {
      const prompt = `قم بكتابة سكريبت فيديو شرح تعليمي لمدة حوالي ${duration} دقائق:

الموضوع الرئيسي: ${topic}
المحاور الرئيسية: ${subtopics.join(', ')}

السكريبت يجب أن يتضمن:
1. مقدمة جذابة (30 ثانية)
2. شرح المفاهيم الأساسية (${duration - 2} دقائق)
3. أمثلة عملية وتطبيقات
4. خلاصة وتذكير بالنقاط الهامة (30 ثانية)

صيغ السكريبت بشكل يناسب القراءة بصوت عالي والشرح الحي.
استخدم لغة بسيطة وواضحة.`;

      const response = await openai.chat.completions.create({
        model: this.model,
        messages: [
          { role: 'system', content: this.arabicSystemPrompt },
          { role: 'user', content: prompt }
        ],
        max_tokens: 2000,
        temperature: 0.8
      });

      return {
        success: true,
        script: response.choices[0].message.content.trim(),
        type: 'videoScript',
        estimatedDuration: duration,
        tokens: response.usage.total_tokens
      };
    } catch (error) {
      console.error('Video Script Error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * إنشاء محتوى بودكاست
   */
  async generatePodcastContent(topic, episode, length = 'short') {
    try {
      const durationMap = { short: '5-7', medium: '10-15', long: '20-30' };
      const dur = durationMap[length] || '10-15';

      const prompt = `قم بكتابة محتوى حلقة بودكاست تعليمية لمدة ${dur} دقيقة:

الموضوع: ${topic}
رقم الحلقة: ${episode}

المحتوى يجب أن يتضمن:
1. مقدمة ترحيب دافئة
2. تقديم الموضوع بطريقة جذابة
3. شرح المحتوى الرئيسي بأسلوب حواري سهل
4. أسئلة تفاعلية موجهة للمستمع
5. خلاصة ودعوة للحلقة القادمة

اكتب بأسلوب طبيعي يناسب البث الصوتي والحوار.`;

      const response = await openai.chat.completions.create({
        model: this.model,
        messages: [
          { role: 'system', content: this.arabicSystemPrompt },
          { role: 'user', content: prompt }
        ],
        max_tokens: 1800,
        temperature: 0.8
      });

      return {
        success: true,
        content: response.choices[0].message.content.trim(),
        type: 'podcast',
        episode,
        estimatedDuration: dur,
        tokens: response.usage.total_tokens
      };
    } catch (error) {
      console.error('Podcast Content Error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * إنشاء خريطة ذهنية (بصيغة نصية وهيكل JSON)
   */
  async generateMindMap(mainTopic, depth = 3) {
    try {
      const prompt = `قم بإنشاء خريطة ذهنية شاملة للموضوع:

الموضوع الرئيسي: ${mainTopic}
عمق التفرع: ${depth} مستويات

قدّم الخريطة في صيغتين:
1. نصية موضحة (شرح الهيكل)
2. JSON structured format

الصيغة JSON يجب أن تكون:
{
  "topic": "...",
  "branches": [
    {
      "title": "فرع رئيسي",
      "subtopics": ["فرع فرعي 1", "فرع فرعي 2"],
      "details": "شرح مختصر"
    }
  ]
}

اجعل الخريطة شاملة وسهلة الفهم للطلاب.`;

      const response = await openai.chat.completions.create({
        model: this.model,
        messages: [
          { role: 'system', content: this.arabicSystemPrompt },
          { role: 'user', content: prompt }
        ],
        max_tokens: 2500,
        temperature: 0.7
      });

      const result = response.choices[0].message.content.trim();
      
      // محاولة استخراج JSON من الرد
      let jsonStructure = null;
      const jsonMatch = result.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          jsonStructure = JSON.parse(jsonMatch[0]);
        } catch (e) {
          console.log('JSON parsing failed, using text format');
        }
      }

      return {
        success: true,
        textFormat: result,
        jsonStructure: jsonStructure,
        type: 'mindmap',
        tokens: response.usage.total_tokens
      };
    } catch (error) {
      console.error('Mind Map Error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * توليد أسئلة تفاعلية للطالب
   */
  async generateInteractiveQuestions(topic, difficulty = 'medium', count = 5) {
    try {
      const difficultyMap = {
        easy: 'سهلة',
        medium: 'متوسطة',
        hard: 'صعبة'
      };

      const prompt = `قم بتوليد ${count} أسئلة ${difficultyMap[difficulty]} لموضوع: ${topic}

المتطلبات:
- أسئلة متنوعة (اختيار من متعدد، صح/خطأ، إكمال جملة، قصيرة الإجابة)
- كل سؤال يجب أن يكون واضح ومباشر
- إجابة صحيحة محددة بوضوح
- شرح مختصر للإجابة الصحيحة

استخدم هذا الصيغة JSON:
[
  {
    "id": 1,
    "type": "multiple_choice|true_false|short_answer",
    "question": "...",
    "options": ["...", "..."] (if applicable),
    "correctAnswer": "...",
    "explanation": "..."
  }
]`;

      const response = await openai.chat.completions.create({
        model: this.model,
        messages: [
          { role: 'system', content: this.arabicSystemPrompt },
          { role: 'user', content: prompt }
        ],
        max_tokens: 2000,
        temperature: 0.7
      });

      const result = response.choices[0].message.content.trim();
      let questions = [];

      try {
        const jsonMatch = result.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          questions = JSON.parse(jsonMatch[0]);
        }
      } catch (e) {
        console.log('Questions JSON parsing failed');
      }

      return {
        success: true,
        questions: questions.length > 0 ? questions : result,
        count: count,
        type: 'interactive_questions',
        tokens: response.usage.total_tokens
      };
    } catch (error) {
      console.error('Interactive Questions Error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * توليد محتوى متعدد (حزمة كاملة)
   */
  async generateCompleteContentPackage(topic, subject, grade) {
    try {
      const [summary, videoScript, podcast, mindmap, questions] = await Promise.all([
        this.generateSummary(topic, topic, grade),
        this.generateVideoScript(topic, [topic], 10),
        this.generatePodcastContent(topic, 1, 'medium'),
        this.generateMindMap(topic, 3),
        this.generateInteractiveQuestions(topic, 'medium', 5)
      ]);

      return {
        success: true,
        package: {
          topic,
          subject,
          grade,
          summary: summary.success ? summary.summary : null,
          videoScript: videoScript.success ? videoScript.script : null,
          podcast: podcast.success ? podcast.content : null,
          mindmap: mindmap.success ? mindmap : null,
          questions: questions.success ? questions.questions : null,
          generatedAt: new Date()
        },
        components: {
          summary: summary.success,
          videoScript: videoScript.success,
          podcast: podcast.success,
          mindmap: mindmap.success,
          questions: questions.success
        }
      };
    } catch (error) {
      console.error('Complete Package Error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * تحسين استجابة الشات بوت بسياق تعليمي
   */
  async generateSmartChatResponse(messages, context = {}) {
    try {
      const systemPrompt = `أنت معلم ذكي ومساعد تعليمي متفاعل.
- تجيب على أسئلة الطلاب بشكل واضح وسهل الفهم
- تقدم أمثلة عملية وتطبيقات حقيقية
- تشرح المفاهيم الصعبة بطرق بسيطة
- تحافظ على تركيز الحوار حول المواضيع التعليمية
- تشجع الطالب على التعلم والفضول
${context.subject ? `- متخصص في مادة ${context.subject}` : ''}
${context.topic ? `- ركز على موضوع: ${context.topic}` : ''}`;

      const conversation = messages.slice(-15).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await openai.chat.completions.create({
        model: this.model,
        messages: [
          { role: 'system', content: systemPrompt },
          ...conversation
        ],
        max_tokens: 1000,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      });

      return {
        success: true,
        reply: response.choices[0].message.content.trim(),
        usage: response.usage,
        model: this.model
      };
    } catch (error) {
      console.error('Smart Chat Error:', error);
      return {
        success: false,
        error: error.message,
        reply: 'عذراً، حدث خطأ في معالجة رسالتك. يرجى المحاولة مرة أخرى.'
      };
    }
  }
}

module.exports = new ContentGenerationService();
