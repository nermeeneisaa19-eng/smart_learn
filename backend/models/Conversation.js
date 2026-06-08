const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    default: 'محادثة جديدة'
  },
  messages: [{
    role: {
      type: String,
      enum: ['user', 'assistant', 'system'],
      required: true
    },
    content: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    tokens: {
      type: Number,
      default: 0
    },
    model: {
      type: String,
      default: 'gpt-4'
    }
  }],
  context: {
    currentSubject: String,
    currentTopic: String,
    difficulty: String,
    learningGoals: [String]
  },
  summary: {
    totalMessages: {
      type: Number,
      default: 0
    },
    topicsDiscussed: [String],
    questionsAsked: {
      type: Number,
      default: 0
    },
    explanationsGiven: {
      type: Number,
      default: 0
    },
    examplesProvided: {
      type: Number,
      default: 0
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  tags: [String],
  rating: {
    score: {
      type: Number,
      min: 1,
      max: 5
    },
    feedback: String,
    ratedAt: Date
  }
}, {
  timestamps: true
});

// Indexes
conversationSchema.index({ studentId: 1, createdAt: -1 });
conversationSchema.index({ sessionId: 1 });
conversationSchema.index({ 'context.currentSubject': 1 });
conversationSchema.index({ isActive: 1 });

// Pre-save middleware to update summary
conversationSchema.pre('save', function(next) {
  if (this.isModified('messages')) {
    this.summary.totalMessages = this.messages.length;
    this.summary.questionsAsked = this.messages.filter(m => m.role === 'user').length;
    this.summary.explanationsGiven = this.messages.filter(m =>
      m.role === 'assistant' && m.content.includes('شرح')
    ).length;
    this.summary.examplesProvided = this.messages.filter(m =>
      m.role === 'assistant' && m.content.includes('مثال')
    ).length;

    // Extract topics discussed
    const topics = new Set();
    this.messages.forEach(msg => {
      // Simple topic extraction - can be enhanced with NLP
      const words = msg.content.split(' ');
      words.forEach(word => {
        if (word.length > 3) topics.add(word);
      });
    });
    this.summary.topicsDiscussed = Array.from(topics).slice(0, 10);
  }

  // Generate title from first user message
  if (!this.title || this.title === 'محادثة جديدة') {
    const firstUserMessage = this.messages.find(m => m.role === 'user');
    if (firstUserMessage) {
      this.title = firstUserMessage.content.substring(0, 50) + (firstUserMessage.content.length > 50 ? '...' : '');
    }
  }

  next();
});

// Instance methods
conversationSchema.methods.addMessage = function(role, content, metadata = {}) {
  this.messages.push({
    role,
    content,
    metadata,
    timestamp: new Date()
  });
  return this.save();
};

conversationSchema.methods.getRecentMessages = function(limit = 10) {
  return this.messages.slice(-limit);
};

conversationSchema.methods.getContextSummary = function() {
  const recentMessages = this.getRecentMessages(5);
  return {
    sessionId: this.sessionId,
    currentTopic: this.context.currentTopic,
    recentTopics: recentMessages.map(m => m.content.substring(0, 100)),
    messageCount: this.messages.length,
    lastActivity: this.updatedAt
  };
};

conversationSchema.methods.generateInsights = function() {
  const insights = {
    engagement: {
      totalMessages: this.summary.totalMessages,
      avgResponseTime: 0, // Can be calculated from timestamps
      topicsCovered: this.summary.topicsDiscussed.length
    },
    learning: {
      questionsAsked: this.summary.questionsAsked,
      explanationsReceived: this.summary.explanationsGiven,
      examplesProvided: this.summary.examplesProvided
    },
    patterns: {
      preferredTopics: this.summary.topicsDiscussed.slice(0, 3),
      commonQuestionTypes: this.analyzeQuestionTypes()
    }
  };

  return insights;
};

conversationSchema.methods.analyzeQuestionTypes = function() {
  const questions = this.messages.filter(m => m.role === 'user');
  const types = {
    what: 0,
    how: 0,
    why: 0,
    explain: 0,
    example: 0,
    other: 0
  };

  questions.forEach(q => {
    const content = q.content.toLowerCase();
    if (content.includes('ما ') || content.includes('what')) types.what++;
    else if (content.includes('كيف') || content.includes('how')) types.how++;
    else if (content.includes('لماذا') || content.includes('why')) types.why++;
    else if (content.includes('شرح') || content.includes('explain')) types.explain++;
    else if (content.includes('مثال') || content.includes('example')) types.example++;
    else types.other++;
  });

  return types;
};

module.exports = mongoose.model('Conversation', conversationSchema);