const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['student', 'instructor', 'admin'],
    default: 'student'
  },
  grade: {
    type: String,
    enum: ['الأول الثانوي', 'الثاني الثانوي', 'الثالث الثانوي'],
    required: true
  },
  specialization: {
    type: String,
    enum: ['علمي علوم', 'علمي رياضة', 'أدبي'],
    required: true
  },
  level: {
    type: String,
    enum: ['ضعيف', 'متوسط', 'ممتاز'],
    default: 'متوسط'
  },
  profile: {
    avatar: String,
    bio: String,
    phone: String,
    address: String
  },
  performance: {
    overall: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    subjects: [{
      subject: {
        type: String,
        required: true
      },
      grade: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
      },
      weakTopics: [String],
      strongTopics: [String],
      quizzesTaken: [{
        quizId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Quiz'
        },
        score: Number,
        date: {
          type: Date,
          default: Date.now
        }
      }]
    }],
    totalQuizzes: {
      type: Number,
      default: 0
    },
    totalStudyTime: {
      type: Number,
      default: 0 // بالدقائق
    },
    lastActivity: {
      type: Date,
      default: Date.now
    }
  },
  learningPath: [{
    subject: {
      type: String,
      required: true
    },
    completedLessons: [String],
    recommendedLessons: [String],
    currentLesson: String,
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    difficulty: {
      type: String,
      enum: ['سهل', 'متوسط', 'صعب'],
      default: 'متوسط'
    }
  }],
  preferences: {
    language: {
      type: String,
      enum: ['ar', 'en'],
      default: 'ar'
    },
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light'
    },
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      ai: { type: Boolean, default: true }
    },
    voice: {
      enabled: { type: Boolean, default: false },
      speed: { type: Number, default: 1, min: 0.5, max: 2 },
      voice: { type: String, default: 'female' }
    }
  },
  conversations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation'
  }],
  achievements: [{
    title: String,
    description: String,
    icon: String,
    date: {
      type: Date,
      default: Date.now
    },
    points: {
      type: Number,
      default: 0
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  lastLogin: Date
}, {
  timestamps: true
});

// Indexes for performance
studentSchema.index({ email: 1 });
studentSchema.index({ grade: 1, specialization: 1 });
studentSchema.index({ 'performance.overall': -1 });
studentSchema.index({ lastActivity: -1 });

// Virtual for full name
studentSchema.virtual('fullInfo').get(function() {
  return `${this.name} - ${this.grade} ${this.specialization}`;
});

// Instance methods
studentSchema.methods.updatePerformance = function(subject, score) {
  const subjectPerf = this.performance.subjects.find(s => s.subject === subject);
  if (subjectPerf) {
    subjectPerf.quizzesTaken.push({ score, date: new Date() });
    subjectPerf.grade = (subjectPerf.grade + score) / 2; // Simple average
  } else {
    this.performance.subjects.push({
      subject,
      grade: score,
      quizzesTaken: [{ score, date: new Date() }]
    });
  }

  // Update overall performance
  const totalSubjects = this.performance.subjects.length;
  this.performance.overall = this.performance.subjects.reduce((sum, s) => sum + s.grade, 0) / totalSubjects;
  this.performance.totalQuizzes += 1;

  return this.save();
};

studentSchema.methods.getRecommendations = function() {
  const recommendations = [];

  this.performance.subjects.forEach(subject => {
    if (subject.grade < 60) {
      recommendations.push({
        type: 'weak_subject',
        subject: subject.subject,
        action: 'review_weak_topics',
        priority: 'high'
      });
    }
  });

  // Add learning path recommendations
  this.learningPath.forEach(path => {
    if (path.progress < 50) {
      recommendations.push({
        type: 'learning_path',
        subject: path.subject,
        action: 'continue_learning',
        priority: 'medium'
      });
    }
  });

  return recommendations;
};

module.exports = mongoose.model('Student', studentSchema);