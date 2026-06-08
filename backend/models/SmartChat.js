const mongoose = require('mongoose');

// نموذج رسائل الشات الذكي
const ChatMessageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SmartChat',
    required: true
  },
  sender: {
    type: String,
    enum: ['user', 'assistant'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  contentType: {
    type: String,
    enum: ['text', 'suggestion', 'resource_link'],
    default: 'text'
  },
  metadata: {
    timestamp: Date,
    processingTime: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// نموذج المحادثة الكاملة
const SmartChatSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subject: {
    type: String,
    enum: ['Arabic', 'English', 'Math', 'Science', 'History', 'Geography', 'Physics', 'Chemistry', 'Biology'],
    required: true
  },
  topic: {
    type: String,
    trim: true
  },
  grade: String,
  messages: [ChatMessageSchema],
  conversationHistory: [{
    role: String,
    content: String
  }],
  status: {
    type: String,
    enum: ['active', 'archived', 'resolved'],
    default: 'active'
  },
  satisfaction: {
    type: Number,
    min: 1,
    max: 5,
    default: null
  },
  feedback: String,
  startedAt: {
    type: Date,
    default: Date.now
  },
  endedAt: Date,
  duration: Number, // in minutes
  messageCount: {
    type: Number,
    default: 0
  },
  keywords: [String],
  teacherReview: {
    reviewed: Boolean,
    comment: String,
    reviewedBy: mongoose.Schema.Types.ObjectId,
    reviewedAt: Date
  }
}, { timestamps: true });

SmartChatSchema.index({ studentId: 1, subject: 1, startedAt: -1 });
SmartChatSchema.index({ topic: 'text' });

module.exports = {
  SmartChat: mongoose.model('SmartChat', SmartChatSchema),
  ChatMessage: mongoose.model('ChatMessage', ChatMessageSchema)
};
