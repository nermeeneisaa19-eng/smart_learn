const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  subject: {
    type: String,
    required: true,
    enum: ['arabic', 'english', 'french', 'math', 'cs', 'science', 'history', 'religion', 'philo']
  },
  grade: {
    type: String,
    required: true,
    enum: ['الأول الثانوي', 'الثاني الثانوي', 'الثالث الثانوي']
  },
  specialization: {
    type: String,
    enum: ['علمي علوم', 'علمي رياضة', 'أدبي']
  },
  difficulty: {
    type: String,
    enum: ['سهل', 'متوسط', 'صعب'],
    default: 'متوسط'
  },
  type: {
    type: String,
    enum: ['practice', 'exam', 'homework', 'ai_generated'],
    default: 'practice'
  },
  questions: [{
    type: {
      type: String,
      enum: ['mcq', 'truefalse', 'fillblank', 'essay'],
      required: true
    },
    question: {
      type: String,
      required: true
    },
    options: [String], // للاختيار من متعدد
    correctAnswer: {
      type: String,
      required: true
    },
    explanation: String,
    points: {
      type: Number,
      default: 1,
      min: 1
    },
    timeLimit: Number, // بالثواني
    hints: [String],
    metadata: {
      topic: String,
      subtopic: String,
      curriculumUnit: String,
      aiGenerated: {
        type: Boolean,
        default: false
      },
      confidence: {
        type: Number,
        min: 0,
        max: 1
      }
    }
  }],
  settings: {
    timeLimit: Number, // إجمالي وقت الاختبار بالدقائق
    shuffleQuestions: {
      type: Boolean,
      default: true
    },
    shuffleOptions: {
      type: Boolean,
      default: true
    },
    showResults: {
      type: Boolean,
      default: true
    },
    showExplanations: {
      type: Boolean,
      default: true
    },
    allowReview: {
      type: Boolean,
      default: true
    },
    maxAttempts: {
      type: Number,
      default: 1
    }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  tags: [String],
  statistics: {
    totalAttempts: {
      type: Number,
      default: 0
    },
    averageScore: {
      type: Number,
      default: 0
    },
    completionRate: {
      type: Number,
      default: 0
    },
    difficultyRating: {
      type: Number,
      default: 0,
      min: 1,
      max: 5
    },
    questionStats: [{
      questionIndex: Number,
      correctCount: {
        type: Number,
        default: 0
      },
      incorrectCount: {
        type: Number,
        default: 0
      },
      averageTime: Number // بالثواني
    }]
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  scheduledFor: Date,
  expiresAt: Date
}, {
  timestamps: true
});

// Indexes
quizSchema.index({ subject: 1, grade: 1, difficulty: 1 });
quizSchema.index({ createdBy: 1 });
quizSchema.index({ 'statistics.averageScore': -1 });
quizSchema.index({ createdAt: -1 });
quizSchema.index({ isActive: 1, isPublic: 1 });

// Virtuals
quizSchema.virtual('totalPoints').get(function() {
  return this.questions.reduce((sum, q) => sum + q.points, 0);
});

quizSchema.virtual('questionCount').get(function() {
  return this.questions.length;
});

quizSchema.virtual('estimatedTime').get(function() {
  const questionTime = this.questions.reduce((sum, q) => sum + (q.timeLimit || 60), 0);
  return Math.ceil(questionTime / 60); // بالدقائق
});

// Instance methods
quizSchema.methods.calculateScore = function(answers) {
  let totalScore = 0;
  let correctCount = 0;

  this.questions.forEach((question, index) => {
    const userAnswer = answers[index];
    if (userAnswer && userAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim()) {
      totalScore += question.points;
      correctCount++;

      // Update question statistics
      if (this.statistics.questionStats[index]) {
        this.statistics.questionStats[index].correctCount++;
      }
    } else {
      if (this.statistics.questionStats[index]) {
        this.statistics.questionStats[index].incorrectCount++;
      }
    }
  });

  // Update overall statistics
  this.statistics.totalAttempts++;
  const newAverage = ((this.statistics.averageScore * (this.statistics.totalAttempts - 1)) + (totalScore / this.totalPoints * 100)) / this.statistics.totalAttempts;
  this.statistics.averageScore = Math.round(newAverage * 100) / 100;

  this.save();

  return {
    score: totalScore,
    percentage: Math.round((totalScore / this.totalPoints) * 100),
    correctAnswers: correctCount,
    totalQuestions: this.questions.length
  };
};

quizSchema.methods.generateSimilarQuiz = function() {
  // Logic to generate similar quiz based on this quiz's performance
  const similarQuiz = {
    title: `مراجعة: ${this.title}`,
    subject: this.subject,
    grade: this.grade,
    difficulty: this.difficulty,
    questions: []
  };

  // Select questions that students struggled with
  const weakQuestions = this.questions.filter((q, index) => {
    const stats = this.statistics.questionStats[index];
    if (!stats) return false;
    const successRate = stats.correctCount / (stats.correctCount + stats.incorrectCount);
    return successRate < 0.6; // Less than 60% success rate
  });

  similarQuiz.questions = weakQuestions.slice(0, 10); // Max 10 questions

  return similarQuiz;
};

quizSchema.methods.getInsights = function() {
  const insights = {
    performance: {
      averageScore: this.statistics.averageScore,
      totalAttempts: this.statistics.totalAttempts,
      completionRate: this.statistics.completionRate
    },
    difficulty: {
      rating: this.difficulty,
      questionAnalysis: this.questions.map((q, index) => ({
        question: q.question.substring(0, 50) + '...',
        successRate: this.statistics.questionStats[index] ?
          this.statistics.questionStats[index].correctCount /
          (this.statistics.questionStats[index].correctCount + this.statistics.questionStats[index].incorrectCount) : 0,
        averageTime: this.statistics.questionStats[index]?.averageTime || 0
      }))
    },
    recommendations: this.generateRecommendations()
  };

  return insights;
};

quizSchema.methods.generateRecommendations = function() {
  const recommendations = [];

  // Analyze weak questions
  this.questions.forEach((q, index) => {
    const stats = this.statistics.questionStats[index];
    if (stats) {
      const successRate = stats.correctCount / (stats.correctCount + stats.incorrectCount);
      if (successRate < 0.5) {
        recommendations.push({
          type: 'review_topic',
          topic: q.metadata?.topic || 'موضوع غير محدد',
          reason: 'نسبة النجاح منخفضة',
          suggestion: 'راجع هذا الموضوع مع الطالب'
        });
      }
    }
  });

  // Time-based recommendations
  const avgTime = this.questions.reduce((sum, q, index) => {
    const stats = this.statistics.questionStats[index];
    return sum + (stats?.averageTime || 0);
  }, 0) / this.questions.length;

  if (avgTime > 120) { // More than 2 minutes per question
    recommendations.push({
      type: 'time_management',
      reason: 'الطلاب يستغرقون وقتاً طويلاً',
      suggestion: 'قسم الأسئلة إلى أجزاء أصغر'
    });
  }

  return recommendations;
};

// Static methods
quizSchema.statics.generateAIQuiz = async function(subject, grade, difficulty, topic, questionCount = 10) {
  // This would integrate with AI service to generate quiz
  // For now, return a template
  const quiz = {
    title: `اختبار ذكي: ${topic}`,
    subject,
    grade,
    difficulty,
    type: 'ai_generated',
    questions: [],
    settings: {
      timeLimit: questionCount * 2, // 2 minutes per question
      shuffleQuestions: true,
      shuffleOptions: true,
      showResults: true,
      showExplanations: true
    }
  };

  // Generate questions based on type
  for (let i = 0; i < questionCount; i++) {
    quiz.questions.push({
      type: 'mcq',
      question: `سؤال ${i + 1} عن ${topic}`,
      options: ['الإجابة الأولى', 'الإجابة الثانية', 'الإجابة الثالثة', 'الإجابة الرابعة'],
      correctAnswer: 'الإجابة الأولى',
      explanation: 'شرح الإجابة الصحيحة',
      points: 1,
      metadata: {
        topic,
        aiGenerated: true,
        confidence: 0.8
      }
    });
  }

  return quiz;
};

module.exports = mongoose.model('Quiz', quizSchema);