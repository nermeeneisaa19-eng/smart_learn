const express = require('express');
const router = express.Router();
const contentGenerationService = require('../services/contentGenerationService');
const GeneratedContent = require('../models/GeneratedContent');
const { SmartChat, ChatMessage } = require('../models/SmartChat');
const auth = require('../middleware/auth');

/**
 * POST /api/content/generate-summary
 * توليد ملخص لموضوع معين
 */
router.post('/generate-summary', auth, async (req, res) => {
  try {
    const { topic, content, grade } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    const result = await contentGenerationService.generateSummary(topic, content || topic, grade);

    if (!result.success) {
      return res.status(500).json({ error: result.error });
    }

    // حفظ في قاعدة البيانات
    const generatedContent = new GeneratedContent({
      title: `ملخص: ${topic}`,
      topic,
      subject: req.body.subject || 'General',
      grade: grade || '3',
      contentType: 'summary',
      content: { summary: result.summary },
      createdBy: req.user.id,
      metadata: {
        wordCount: result.summary.split(' ').length,
        estimatedReadTime: Math.ceil(result.summary.split(' ').length / 200)
      }
    });

    await generatedContent.save();

    res.json({
      success: true,
      summary: result.summary,
      contentId: generatedContent._id,
      metadata: generatedContent.metadata
    });
  } catch (error) {
    console.error('Summary Error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/content/generate-video-script
 * توليد سكريبت فيديو شرح
 */
router.post('/generate-video-script', auth, async (req, res) => {
  try {
    const { topic, subtopics, duration } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    const result = await contentGenerationService.generateVideoScript(
      topic,
      subtopics || [topic],
      duration || 10
    );

    if (!result.success) {
      return res.status(500).json({ error: result.error });
    }

    const generatedContent = new GeneratedContent({
      title: `سكريبت فيديو: ${topic}`,
      topic,
      subject: req.body.subject || 'General',
      grade: req.body.grade || '3',
      contentType: 'videoScript',
      content: { videoScript: result.script },
      createdBy: req.user.id,
      metadata: {
        wordCount: result.script.split(' ').length,
        estimatedVideoTime: `${duration} دقائق`
      }
    });

    await generatedContent.save();

    res.json({
      success: true,
      script: result.script,
      contentId: generatedContent._id,
      estimatedDuration: result.estimatedDuration
    });
  } catch (error) {
    console.error('Video Script Error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/content/generate-podcast
 * توليد محتوى بودكاست
 */
router.post('/generate-podcast', auth, async (req, res) => {
  try {
    const { topic, episode, length } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    const result = await contentGenerationService.generatePodcastContent(
      topic,
      episode || 1,
      length || 'medium'
    );

    if (!result.success) {
      return res.status(500).json({ error: result.error });
    }

    const generatedContent = new GeneratedContent({
      title: `حلقة بودكاست: ${topic}`,
      topic,
      subject: req.body.subject || 'General',
      grade: req.body.grade || '3',
      contentType: 'podcast',
      content: { podcast: result.content },
      createdBy: req.user.id,
      metadata: {
        wordCount: result.content.split(' ').length,
        estimatedVideoTime: result.estimatedDuration
      }
    });

    await generatedContent.save();

    res.json({
      success: true,
      content: result.content,
      contentId: generatedContent._id,
      episode: result.episode,
      estimatedDuration: result.estimatedDuration
    });
  } catch (error) {
    console.error('Podcast Error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/content/generate-mindmap
 * إنشاء خريطة ذهنية
 */
router.post('/generate-mindmap', auth, async (req, res) => {
  try {
    const { topic, depth } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    const result = await contentGenerationService.generateMindMap(topic, depth || 3);

    if (!result.success) {
      return res.status(500).json({ error: result.error });
    }

    const generatedContent = new GeneratedContent({
      title: `خريطة ذهنية: ${topic}`,
      topic,
      subject: req.body.subject || 'General',
      grade: req.body.grade || '3',
      contentType: 'mindmap',
      content: { mindmap: result.jsonStructure || result.textFormat },
      createdBy: req.user.id
    });

    await generatedContent.save();

    res.json({
      success: true,
      textFormat: result.textFormat,
      jsonStructure: result.jsonStructure,
      contentId: generatedContent._id
    });
  } catch (error) {
    console.error('Mind Map Error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/content/generate-questions
 * توليد أسئلة تفاعلية
 */
router.post('/generate-questions', auth, async (req, res) => {
  try {
    const { topic, difficulty, count } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    const result = await contentGenerationService.generateInteractiveQuestions(
      topic,
      difficulty || 'medium',
      count || 5
    );

    if (!result.success) {
      return res.status(500).json({ error: result.error });
    }

    const generatedContent = new GeneratedContent({
      title: `أسئلة: ${topic}`,
      topic,
      subject: req.body.subject || 'General',
      grade: req.body.grade || '3',
      contentType: 'interactive_questions',
      content: { questions: result.questions },
      createdBy: req.user.id,
      metadata: {
        difficulty: difficulty || 'medium',
        questionCount: count || 5
      }
    });

    await generatedContent.save();

    res.json({
      success: true,
      questions: result.questions,
      contentId: generatedContent._id,
      count: result.count
    });
  } catch (error) {
    console.error('Questions Error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/content/generate-package
 * توليد حزمة محتوى كاملة
 */
router.post('/generate-package', auth, async (req, res) => {
  try {
    const { topic, subject, grade } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    const result = await contentGenerationService.generateCompleteContentPackage(
      topic,
      subject || 'General',
      grade || '3'
    );

    if (!result.success) {
      return res.status(500).json({ error: result.error });
    }

    // حفظ الحزمة
    const generatedContent = new GeneratedContent({
      title: `حزمة كاملة: ${topic}`,
      topic,
      subject: subject || 'General',
      grade: grade || '3',
      contentType: 'package',
      content: {
        summary: result.package.summary,
        videoScript: result.package.videoScript,
        podcast: result.package.podcast,
        mindmap: result.package.mindmap,
        questions: result.package.questions
      },
      createdBy: req.user.id
    });

    await generatedContent.save();

    res.json({
      success: true,
      package: result.package,
      contentId: generatedContent._id,
      components: result.components
    });
  } catch (error) {
    console.error('Package Error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/content/:id
 * الحصول على محتوى محفوظ
 */
router.get('/:id', auth, async (req, res) => {
  try {
    const content = await GeneratedContent.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }

    res.json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/content
 * الحصول على قائمة المحتوى المُولّد
 */
router.get('/', auth, async (req, res) => {
  try {
    const { subject, grade, type, page = 1, limit = 10 } = req.query;
    const filter = { createdBy: req.user.id };

    if (subject) filter.subject = subject;
    if (grade) filter.grade = grade;
    if (type) filter.contentType = type;

    const content = await GeneratedContent.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await GeneratedContent.countDocuments(filter);

    res.json({
      content,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/chat/send
 * إرسال رسالة للشات الذكي
 */
router.post('/chat/send', auth, async (req, res) => {
  try {
    const { conversationId, message, subject, topic } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    let chat;

    // إيجاد أو إنشاء محادثة
    if (conversationId) {
      chat = await SmartChat.findById(conversationId);
    } else {
      chat = new SmartChat({
        studentId: req.user.id,
        subject: subject || 'General',
        topic: topic || 'General',
        grade: req.user.grade || '3'
      });
    }

    // إضافة رسالة المستخدم
    chat.conversationHistory.push({
      role: 'user',
      content: message
    });

    // الحصول على رد من الخدمة الذكية
    const aiResponse = await contentGenerationService.generateSmartChatResponse(
      chat.conversationHistory,
      { subject: chat.subject, topic: chat.topic }
    );

    if (!aiResponse.success) {
      return res.status(500).json({ error: aiResponse.error });
    }

    // إضافة رد المساعد
    chat.conversationHistory.push({
      role: 'assistant',
      content: aiResponse.reply
    });

    chat.messageCount = chat.conversationHistory.length;
    await chat.save();

    res.json({
      success: true,
      conversationId: chat._id,
      reply: aiResponse.reply,
      model: aiResponse.model
    });
  } catch (error) {
    console.error('Chat Error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/chat/:conversationId
 * الحصول على محادثة كاملة
 */
router.get('/chat/:conversationId', auth, async (req, res) => {
  try {
    const chat = await SmartChat.findById(req.params.conversationId);

    if (!chat) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    // التحقق من أن المستخدم هو صاحب المحادثة
    if (chat.studentId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/chat
 * الحصول على قائمة محادثات المستخدم
 */
router.get('/', auth, async (req, res) => {
  try {
    const { subject, page = 1, limit = 10 } = req.query;
    const filter = { studentId: req.user.id };

    if (subject) filter.subject = subject;

    const chats = await SmartChat.find(filter)
      .sort({ startedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await SmartChat.countDocuments(filter);

    res.json({
      chats,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
