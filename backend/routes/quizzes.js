const express = require('express');
const Quiz = require('../models/Quiz');
const Student = require('../models/Student');
const aiService = require('../services/aiService');
const { authenticate, requireInstructor } = require('../middleware/auth');

const router = express.Router();

// الحصول على جميع الاختبارات
router.get('/', authenticate, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      subject,
      grade,
      difficulty,
      type,
      isPublic,
      search,
      createdBy
    } = req.query;

    const query = {};

    // فلترة حسب الصلاحيات
    if (req.student.role === 'student') {
      query.isActive = true;
      query.$or = [
        { isPublic: true },
        { createdBy: req.student._id }
      ];
    }

    if (subject) query.subject = subject;
    if (grade) query.grade = grade;
    if (difficulty) query.difficulty = difficulty;
    if (type) query.type = type;
    if (isPublic !== undefined) query.isPublic = isPublic === 'true';
    if (createdBy) query.createdBy = createdBy;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const quizzes = await Quiz.find(query)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Quiz.countDocuments(query);

    res.json({
      success: true,
      data: {
        quizzes,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get Quizzes Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// الحصول على اختبار محدد
router.get('/:id', authenticate, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    // التحقق من الصلاحيات
    if (req.student.role === 'student' &&
        !quiz.isPublic &&
        quiz.createdBy.toString() !== req.student._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: {
        quiz
      }
    });
  } catch (error) {
    console.error('Get Quiz Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// إنشاء اختبار جديد
router.post('/', authenticate, requireInstructor, async (req, res) => {
  try {
    const quizData = {
      ...req.body,
      createdBy: req.student._id
    };

    const quiz = new Quiz(quizData);
    await quiz.save();

    await quiz.populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Quiz created successfully',
      data: {
        quiz
      }
    });
  } catch (error) {
    console.error('Create Quiz Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// تحديث اختبار
router.put('/:id', authenticate, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    // التحقق من الصلاحيات
    if (req.student.role !== 'admin' && quiz.createdBy.toString() !== req.student._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const updatedQuiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email');

    res.json({
      success: true,
      message: 'Quiz updated successfully',
      data: {
        quiz: updatedQuiz
      }
    });
  } catch (error) {
    console.error('Update Quiz Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// حذف اختبار
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    // التحقق من الصلاحيات
    if (req.student.role !== 'admin' && quiz.createdBy.toString() !== req.student._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    await Quiz.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Quiz deleted successfully'
    });
  } catch (error) {
    console.error('Delete Quiz Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// توليد اختبار بالذكاء الاصطناعي
router.post('/generate-ai', authenticate, requireInstructor, async (req, res) => {
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
      grade,
      difficulty || 'متوسط',
      topic,
      count || 10
    );

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: result.error
      });
    }

    // إنشاء الاختبار في قاعدة البيانات
    const quizData = {
      title: `اختبار ذكي: ${topic}`,
      description: `اختبار مولد بالذكاء الاصطناعي عن ${topic}`,
      subject,
      grade: grade || 'الأول الثانوي',
      difficulty: difficulty || 'متوسط',
      type: 'ai_generated',
      questions: result.quiz.questions,
      createdBy: req.student._id,
      tags: ['ai_generated', topic]
    };

    const quiz = new Quiz(quizData);
    await quiz.save();

    await quiz.populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'AI-generated quiz created successfully',
      data: {
        quiz
      }
    });
  } catch (error) {
    console.error('Generate AI Quiz Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// تسليم اختبار
router.post('/:id/submit', authenticate, async (req, res) => {
  try {
    const { answers } = req.body;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: 'Answers array is required'
      });
    }

    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    // حساب النتيجة
    const result = quiz.calculateScore(answers);

    // تحديث أداء الطالب
    await req.student.updatePerformance(quiz.subject, result.percentage);

    res.json({
      success: true,
      message: 'Quiz submitted successfully',
      data: {
        result,
        quiz: {
          id: quiz._id,
          title: quiz.title,
          subject: quiz.subject
        }
      }
    });
  } catch (error) {
    console.error('Submit Quiz Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// الحصول على إحصائيات الاختبار
router.get('/:id/analytics', authenticate, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    // التحقق من الصلاحيات
    if (req.student.role !== 'admin' && quiz.createdBy.toString() !== req.student._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const analytics = quiz.getInsights();

    res.json({
      success: true,
      data: {
        analytics
      }
    });
  } catch (error) {
    console.error('Get Quiz Analytics Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// الحصول على اختبارات مشابهة
router.get('/:id/similar', authenticate, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    // البحث عن اختبارات مشابهة
    const similarQuizzes = await Quiz.find({
      subject: quiz.subject,
      grade: quiz.grade,
      _id: { $ne: quiz._id },
      isActive: true
    })
    .populate('createdBy', 'name')
    .sort({ 'statistics.averageScore': -1 })
    .limit(5);

    res.json({
      success: true,
      data: {
        similarQuizzes
      }
    });
  } catch (error) {
    console.error('Get Similar Quizzes Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;