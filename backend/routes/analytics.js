const express = require('express');
const Student = require('../models/Student');
const Quiz = require('../models/Quiz');
const Conversation = require('../models/Conversation');
const { authenticate, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// لوحة التحليلات الرئيسية
router.get('/dashboard', authenticate, async (req, res) => {
  try {
    let analytics = {};

    if (req.student.role === 'admin') {
      // إحصائيات شاملة للإداريين
      analytics = await getAdminAnalytics();
    } else if (req.student.role === 'instructor') {
      // إحصائيات المعلم
      analytics = await getInstructorAnalytics(req.student._id);
    } else {
      // إحصائيات الطالب
      analytics = await getStudentAnalytics(req.student._id);
    }

    res.json({
      success: true,
      data: {
        analytics
      }
    });
  } catch (error) {
    console.error('Dashboard Analytics Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// تحليلات الطلاب
router.get('/students', authenticate, requireAdmin, async (req, res) => {
  try {
    const { grade, specialization, dateFrom, dateTo } = req.query;

    const matchConditions = {};
    if (grade) matchConditions.grade = grade;
    if (specialization) matchConditions.specialization = specialization;
    if (dateFrom || dateTo) {
      matchConditions.createdAt = {};
      if (dateFrom) matchConditions.createdAt.$gte = new Date(dateFrom);
      if (dateTo) matchConditions.createdAt.$lte = new Date(dateTo);
    }

    const studentsAnalytics = await Student.aggregate([
      { $match: matchConditions },
      {
        $group: {
          _id: {
            grade: '$grade',
            specialization: '$specialization'
          },
          count: { $sum: 1 },
          avgOverall: { $avg: '$performance.overall' },
          avgStudyTime: { $avg: '$performance.totalStudyTime' },
          totalQuizzes: { $sum: '$performance.totalQuizzes' }
        }
      },
      { $sort: { '_id.grade': 1, '_id.specialization': 1 } }
    ]);

    res.json({
      success: true,
      data: {
        studentsAnalytics
      }
    });
  } catch (error) {
    console.error('Students Analytics Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// تحليلات الاختبارات
router.get('/quizzes', authenticate, async (req, res) => {
  try {
    const { subject, grade, dateFrom, dateTo } = req.query;

    const matchConditions = { isActive: true };
    if (req.student.role === 'student') {
      matchConditions.$or = [
        { isPublic: true },
        { createdBy: req.student._id }
      ];
    } else {
      matchConditions.createdBy = req.student._id;
    }

    if (subject) matchConditions.subject = subject;
    if (grade) matchConditions.grade = grade;
    if (dateFrom || dateTo) {
      matchConditions.createdAt = {};
      if (dateFrom) matchConditions.createdAt.$gte = new Date(dateFrom);
      if (dateTo) matchConditions.createdAt.$lte = new Date(dateTo);
    }

    const quizzesAnalytics = await Quiz.aggregate([
      { $match: matchConditions },
      {
        $group: {
          _id: {
            subject: '$subject',
            difficulty: '$difficulty'
          },
          count: { $sum: 1 },
          avgScore: { $avg: '$statistics.averageScore' },
          totalAttempts: { $sum: '$statistics.totalAttempts' },
          avgCompletionRate: { $avg: '$statistics.completionRate' }
        }
      },
      { $sort: { '_id.subject': 1, '_id.difficulty': 1 } }
    ]);

    res.json({
      success: true,
      data: {
        quizzesAnalytics
      }
    });
  } catch (error) {
    console.error('Quizzes Analytics Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// تحليلات الذكاء الاصطناعي
router.get('/ai-usage', authenticate, requireAdmin, async (req, res) => {
  try {
    // في التطبيق الحقيقي، سيتم حساب هذه الإحصائيات من جدول منفصل لاستخدام AI
    const aiAnalytics = {
      totalRequests: 0,
      requestsByType: {
        chat: 0,
        content_generation: 0,
        quiz_generation: 0,
        recommendations: 0
      },
      averageResponseTime: 0,
      errorRate: 0,
      popularTopics: [],
      usageByGrade: [],
      usageBySubject: []
    };

    // محاكاة البيانات
    const conversations = await Conversation.find({})
      .populate('studentId', 'grade specialization')
      .limit(1000);

    aiAnalytics.totalRequests = conversations.reduce((sum, conv) => sum + conv.messages.length, 0);

    // تحليل المواضيع الشائعة
    const topics = {};
    conversations.forEach(conv => {
      conv.summary.topicsDiscussed.forEach(topic => {
        topics[topic] = (topics[topic] || 0) + 1;
      });
    });

    aiAnalytics.popularTopics = Object.entries(topics)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([topic, count]) => ({ topic, count }));

    res.json({
      success: true,
      data: {
        aiAnalytics
      }
    });
  } catch (error) {
    console.error('AI Usage Analytics Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// توقع الطلاب المعرضين للتعثر
router.get('/predictions/at-risk', authenticate, requireAdmin, async (req, res) => {
  try {
    // تحليل الطلاب ذوي الأداء المنخفض
    const atRiskStudents = await Student.find({
      'performance.overall': { $lt: 60 },
      isActive: true
    })
    .select('name email grade specialization performance learningPath')
    .sort({ 'performance.overall': 1 })
    .limit(50);

    const predictions = atRiskStudents.map(student => ({
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        grade: student.grade,
        specialization: student.specialization
      },
      riskFactors: {
        lowOverallGrade: student.performance.overall < 50,
        multipleWeakSubjects: student.performance.subjects.filter(s => s.grade < 50).length > 2,
        lowStudyTime: student.performance.totalStudyTime < 10, // أقل من 10 ساعات
        incompleteLearningPath: student.learningPath.filter(p => p.progress < 30).length > 3
      },
      riskLevel: calculateRiskLevel(student),
      recommendations: generateRiskRecommendations(student)
    }));

    res.json({
      success: true,
      data: {
        predictions: predictions.filter(p => p.riskLevel !== 'low')
      }
    });
  } catch (error) {
    console.error('At-Risk Predictions Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// تقارير مخصصة
router.post('/reports', authenticate, requireAdmin, async (req, res) => {
  try {
    const { type, filters, dateRange } = req.body;

    let report = {};

    switch (type) {
      case 'student_performance':
        report = await generateStudentPerformanceReport(filters, dateRange);
        break;
      case 'quiz_analytics':
        report = await generateQuizAnalyticsReport(filters, dateRange);
        break;
      case 'engagement':
        report = await generateEngagementReport(filters, dateRange);
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid report type'
        });
    }

    res.json({
      success: true,
      data: {
        report
      }
    });
  } catch (error) {
    console.error('Generate Report Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// وظائف مساعدة
async function getAdminAnalytics() {
  const totalStudents = await Student.countDocuments({ isActive: true });
  const totalQuizzes = await Quiz.countDocuments({ isActive: true });
  const totalConversations = await Conversation.countDocuments();

  const avgPerformance = await Student.aggregate([
    { $match: { isActive: true } },
    { $group: { _id: null, avg: { $avg: '$performance.overall' } } }
  ]);

  return {
    overview: {
      totalStudents,
      totalQuizzes,
      totalConversations,
      averagePerformance: avgPerformance[0]?.avg || 0
    },
    trends: {
      // يمكن إضافة اتجاهات زمنية
    }
  };
}

async function getInstructorAnalytics(instructorId) {
  const myQuizzes = await Quiz.find({ createdBy: instructorId });
  const quizIds = myQuizzes.map(q => q._id);

  // إحصائيات الاختبارات التي أنشأها
  const quizStats = await Quiz.aggregate([
    { $match: { createdBy: instructorId } },
    {
      $group: {
        _id: null,
        totalQuizzes: { $sum: 1 },
        totalAttempts: { $sum: '$statistics.totalAttempts' },
        avgScore: { $avg: '$statistics.averageScore' }
      }
    }
  ]);

  return {
    myContent: {
      quizzesCreated: myQuizzes.length,
      totalAttempts: quizStats[0]?.totalAttempts || 0,
      averageScore: quizStats[0]?.avgScore || 0
    }
  };
}

async function getStudentAnalytics(studentId) {
  const student = await Student.findById(studentId);
  if (!student) return {};

  return {
    performance: student.performance,
    learningPath: student.learningPath,
    achievements: student.achievements,
    recentActivity: {
      lastLogin: student.lastLogin,
      conversationsCount: student.conversations.length
    }
  };
}

function calculateRiskLevel(student) {
  let riskScore = 0;

  if (student.performance.overall < 50) riskScore += 3;
  else if (student.performance.overall < 60) riskScore += 2;

  const weakSubjects = student.performance.subjects.filter(s => s.grade < 50).length;
  riskScore += weakSubjects;

  if (student.performance.totalStudyTime < 5) riskScore += 2;
  else if (student.performance.totalStudyTime < 10) riskScore += 1;

  if (riskScore >= 5) return 'high';
  if (riskScore >= 3) return 'medium';
  return 'low';
}

function generateRiskRecommendations(student) {
  const recommendations = [];

  if (student.performance.overall < 60) {
    recommendations.push('مراجعة المواد الأساسية وإعادة الاختبارات الضعيفة');
  }

  const weakSubjects = student.performance.subjects.filter(s => s.grade < 50);
  if (weakSubjects.length > 0) {
    recommendations.push(`التركيز على المواد: ${weakSubjects.map(s => s.subject).join(', ')}`);
  }

  if (student.performance.totalStudyTime < 10) {
    recommendations.push('زيادة وقت الدراسة اليومي ومتابعة التقدم');
  }

  return recommendations;
}

async function generateStudentPerformanceReport(filters, dateRange) {
  // تنفيذ منطق إنشاء التقرير
  return {
    title: 'تقرير أداء الطلاب',
    generatedAt: new Date(),
    data: {}
  };
}

async function generateQuizAnalyticsReport(filters, dateRange) {
  // تنفيذ منطق إنشاء التقرير
  return {
    title: 'تحليلات الاختبارات',
    generatedAt: new Date(),
    data: {}
  };
}

async function generateEngagementReport(filters, dateRange) {
  // تنفيذ منطق إنشاء التقرير
  return {
    title: 'تقرير التفاعل',
    generatedAt: new Date(),
    data: {}
  };
}

module.exports = router;