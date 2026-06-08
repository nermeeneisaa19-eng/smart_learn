const mongoose = require('mongoose');

// نموذج المحتوى المُولّد
const GeneratedContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  topic: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    enum: ['Arabic', 'English', 'Math', 'Science', 'History', 'Geography', 'Physics', 'Chemistry', 'Biology'],
    required: true
  },
  grade: {
    type: String,
    enum: ['1', '2', '3'],
    default: '3'
  },
  contentType: {
    type: String,
    enum: ['summary', 'videoScript', 'podcast', 'mindmap', 'interactive_questions', 'package'],
    required: true
  },
  content: {
    summary: String,
    videoScript: String,
    podcast: String,
    mindmap: mongoose.Schema.Types.Mixed, // يمكن أن يكون JSON أو نص
    questions: [mongoose.Schema.Types.Mixed]
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  curriculum: {
    book: String,
    unit: String,
    lesson: String
  },
  metadata: {
    wordCount: Number,
    estimatedReadTime: Number,
    estimatedVideoTime: String,
    difficulty: String
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  downloads: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  usedByCount: {
    type: Number,
    default: 0
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

GeneratedContentSchema.index({ topic: 'text', subject: 1, grade: 1 });
GeneratedContentSchema.index({ createdBy: 1, contentType: 1 });

module.exports = mongoose.model('GeneratedContent', GeneratedContentSchema);
