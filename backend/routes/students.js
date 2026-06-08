const express = require('express');
const Student = require('../models/Student');
const { authenticate, requireAdmin, requireOwnership } = require('../middleware/auth');

const router = express.Router();

// الحصول على جميع الطلاب (للإداريين فقط)
router.get('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, grade, specialization, search } = req.query;

    const query = {};
    if (grade) query.grade = grade;
    if (specialization) query.specialization = specialization;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const students = await Student.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('conversations', 'title createdAt');

    const total = await Student.countDocuments(query);

    res.json({
      success: true,
      data: {
        students,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get Students Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// الحصول على طالب محدد
router.get('/:id', authenticate, requireOwnership('id'), async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .select('-password')
      .populate('conversations')
      .populate('learningPath');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      data: {
        student
      }
    });
  } catch (error) {
    console.error('Get Student Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// تحديث طالب
router.put('/:id', authenticate, requireOwnership('id'), async (req, res) => {
  try {
    const allowedFields = [
      'name', 'profile', 'preferences', 'level'
    ];

    const updates = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    // الإداريون يمكنهم تحديث جميع الحقول
    if (req.student.role === 'admin') {
      const adminFields = ['grade', 'specialization', 'role', 'isActive'];
      adminFields.forEach(field => {
        if (req.body[field] !== undefined) {
          updates[field] = req.body[field];
        }
      });
    }

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      message: 'Student updated successfully',
      data: {
        student
      }
    });
  } catch (error) {
    console.error('Update Student Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// حذف طالب (للإداريين فقط)
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      message: 'Student deleted successfully'
    });
  } catch (error) {
    console.error('Delete Student Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// تحديث الأداء
router.put('/:id/performance', authenticate, requireOwnership('id'), async (req, res) => {
  try {
    const { subject, score, quizData } = req.body;

    if (!subject || score === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Subject and score are required'
      });
    }

    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    await student.updatePerformance(subject, score);

    res.json({
      success: true,
      message: 'Performance updated successfully',
      data: {
        performance: student.performance
      }
    });
  } catch (error) {
    console.error('Update Performance Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// الحصول على التوصيات
router.get('/:id/recommendations', authenticate, requireOwnership('id'), async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    const recommendations = student.getRecommendations();

    res.json({
      success: true,
      data: {
        recommendations
      }
    });
  } catch (error) {
    console.error('Get Recommendations Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// إحصائيات الطالب
router.get('/:id/analytics', authenticate, requireOwnership('id'), async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('conversations')
      .populate({
        path: 'performance.subjects.quizzesTaken.quizId',
        select: 'title subject difficulty'
      });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    const analytics = {
      overview: {
        totalStudyTime: student.performance.totalStudyTime,
        totalQuizzes: student.performance.totalQuizzes,
        overallGrade: student.performance.overall,
        achievements: student.achievements.length
      },
      subjects: student.performance.subjects,
      learningPath: student.learningPath,
      recentActivity: {
        lastLogin: student.lastLogin,
        conversationsCount: student.conversations.length,
        completedLessons: student.learningPath.reduce((sum, path) => sum + (path.completedLessons?.length || 0), 0)
      },
      trends: {
        // يمكن حساب الاتجاهات من البيانات التاريخية
        improvement: 'حسن',
        consistency: 'جيد'
      }
    };

    res.json({
      success: true,
      data: {
        analytics
      }
    });
  } catch (error) {
    console.error('Get Analytics Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// إضافة إنجاز
router.post('/:id/achievements', authenticate, requireOwnership('id'), async (req, res) => {
  try {
    const { title, description, icon, points } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title and description are required'
      });
    }

    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    student.achievements.push({
      title,
      description,
      icon: icon || '🏆',
      points: points || 10
    });

    await student.save();

    res.json({
      success: true,
      message: 'Achievement added successfully',
      data: {
        achievement: student.achievements[student.achievements.length - 1]
      }
    });
  } catch (error) {
    console.error('Add Achievement Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;