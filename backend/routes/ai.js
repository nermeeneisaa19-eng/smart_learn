const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');
const { authenticate, aiRateLimit } = require('../middleware/auth');

// جميع routes الخاصة بالذكاء الاصطناعي تحتاج مصادقة
// مسار تجريبي مؤقت لاختبار الشات بوت بدون تسجيل دخول
router.post('/test-chat', async (req, res) => {
  try {
    const { message } = req.body;

    const messages = [
      {
        role: 'user',
        content: message || 'اشرح لي معنى المعلومات والوسائط'
      }
    ];

    const context = {
      grade: 'الأول الثانوي',
      specialization: 'عام',
      level: 'متوسط',
      subject: 'البرمجة والذكاء الاصطناعي'
    };

    const result = await aiService.generateChatResponse(messages, context);

    res.json(result);
  } catch (error) {
    console.error('Test Chat Error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});
router.use(authenticate);
router.use(aiRateLimit);

// شات بوت تفاعلي
router.post('/chat', async (req, res) => {
  try {
    const { messages, context } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        success: false,
        message: 'Messages array is required'
      });
    }

    // إضافة سياق الطالب
    const studentContext = {
      grade: req.student.grade,
      specialization: req.student.specialization,
      level: req.student.level,
      subject: context?.subject || null
    };

    const result = await aiService.generateChatResponse(messages, studentContext);

    if (result.success) {
      // حفظ المحادثة في قاعدة البيانات (سيتم إضافتها لاحقاً)
      res.json({
        success: true,
        reply: result.reply,
        usage: result.usage
      });
    } else {
      res.status(500).json({
        success: false,
        message: result.error,
        reply: result.reply
      });
    }
  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// توليد محتوى تعليمي
router.post('/generate-content', async (req, res) => {
  try {
    const { type, subject, topic, level } = req.body;

    if (!type || !subject || !topic) {
      return res.status(400).json({
        success: false,
        message: 'Type, subject, and topic are required'
      });
    }

    const params = {
      subject,
      topic,
      level: level || req.student.level,
      grade: req.student.grade
    };

    const result = await aiService.generateContent(type, params);

    if (result.success) {
      res.json({
        success: true,
        content: result.content,
        type: result.type,
        usage: result.usage
      });
    } else {
      res.status(500).json({
        success: false,
        message: result.error,
        content: result.content
      });
    }
  } catch (error) {
    console.error('Content Generation API Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// توليد اختبار
router.post('/generate-quiz', async (req, res) => {
  try {
    const { subject, grade, difficulty, topic, count } = req.body;

    if (!subject || !topic) {
      return res.status(400).json({
        success: false,
        message: 'Subject and topic are required'
      });
    }

    const result = await aiService.generateQuiz(
      subject,
      grade || req.student.grade,
      difficulty || 'متوسط',
      topic,
      count || 10
    );

    if (result.success) {
      res.json({
        success: true,
        quiz: result.quiz,
        usage: result.usage
      });
    } else {
      res.status(500).json({
        success: false,
        message: result.error,
        quiz: null
      });
    }
  } catch (error) {
    console.error('Quiz Generation API Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// تحليل أداء الطالب
router.post('/analyze-performance', async (req, res) => {
  try {
    const { quizResults } = req.body;

    const studentData = {
      name: req.student.name,
      grade: req.student.grade,
      specialization: req.student.specialization,
      level: req.student.level
    };

    const result = await aiService.analyzePerformance(studentData, quizResults || []);

    if (result.success) {
      res.json({
        success: true,
        analysis: result.analysis,
        usage: result.usage
      });
    } else {
      res.status(500).json({
        success: false,
        message: result.error,
        analysis: result.analysis
      });
    }
  } catch (error) {
    console.error('Performance Analysis API Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// توليد توصيات مخصصة
router.post('/recommendations', async (req, res) => {
  try {
    const studentProfile = {
      name: req.student.name,
      grade: req.student.grade,
      specialization: req.student.specialization,
      level: req.student.level,
      performance: req.student.performance
    };

    const learningHistory = req.student.learningPath || [];

    const result = await aiService.generateRecommendations(studentProfile, learningHistory);

    if (result.success) {
      res.json({
        success: true,
        recommendations: result.recommendations,
        usage: result.usage
      });
    } else {
      res.status(500).json({
        success: false,
        message: result.error,
        recommendations: result.recommendations
      });
    }
  } catch (error) {
    console.error('Recommendations API Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// الحصول على إحصائيات استخدام AI
router.get('/usage-stats', async (req, res) => {
  try {
    // في التطبيق الحقيقي، سيتم حساب هذه الإحصائيات من قاعدة البيانات
    const stats = {
      totalRequests: 0,
      totalTokens: 0,
      averageResponseTime: 0,
      popularFeatures: ['chat', 'content_generation', 'quiz_generation']
    };

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Usage Stats API Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;