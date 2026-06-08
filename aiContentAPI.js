/**
 * AI Content Generation APIs
 * اتصال حقيقي مع خوادم التوليد المتقدمة
 */

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

/**
 * توليد ملخص نصي للموضوع
 */
async function generateSummary(topic, subject = 'General', grade = '3') {
  try {
    const response = await fetch(`${API_BASE}/content/generate-summary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ topic, subject, grade })
    });

    if (!response.ok) throw new Error('Failed to generate summary');
    
    const data = await response.json();
    return {
      success: true,
      summary: data.summary,
      contentId: data.contentId,
      metadata: data.metadata
    };
  } catch (error) {
    console.error('Summary Error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * توليد سكريبت فيديو شرح
 */
async function generateVideoScript(topic, subtopics = [], duration = 10, subject = 'General', grade = '3') {
  try {
    const response = await fetch(`${API_BASE}/content/generate-video-script`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ topic, subtopics, duration, subject, grade })
    });

    if (!response.ok) throw new Error('Failed to generate video script');
    
    const data = await response.json();
    return {
      success: true,
      script: data.script,
      contentId: data.contentId,
      estimatedDuration: data.estimatedDuration
    };
  } catch (error) {
    console.error('Video Script Error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * توليد محتوى بودكاست
 */
async function generatePodcast(topic, episode = 1, length = 'medium', subject = 'General', grade = '3') {
  try {
    const response = await fetch(`${API_BASE}/content/generate-podcast`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ topic, episode, length, subject, grade })
    });

    if (!response.ok) throw new Error('Failed to generate podcast');
    
    const data = await response.json();
    return {
      success: true,
      content: data.content,
      contentId: data.contentId,
      estimatedDuration: data.estimatedDuration
    };
  } catch (error) {
    console.error('Podcast Error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * توليد خريطة ذهنية
 */
async function generateMindMap(topic, depth = 3, subject = 'General', grade = '3') {
  try {
    const response = await fetch(`${API_BASE}/content/generate-mindmap`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ topic, depth, subject, grade })
    });

    if (!response.ok) throw new Error('Failed to generate mind map');
    
    const data = await response.json();
    return {
      success: true,
      textFormat: data.textFormat,
      jsonStructure: data.jsonStructure,
      contentId: data.contentId
    };
  } catch (error) {
    console.error('Mind Map Error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * توليد أسئلة تفاعلية
 */
async function generateQuestions(topic, difficulty = 'medium', count = 5, subject = 'General', grade = '3') {
  try {
    const response = await fetch(`${API_BASE}/content/generate-questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ topic, difficulty, count, subject, grade })
    });

    if (!response.ok) throw new Error('Failed to generate questions');
    
    const data = await response.json();
    return {
      success: true,
      questions: data.questions,
      count: data.count,
      contentId: data.contentId
    };
  } catch (error) {
    console.error('Questions Error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * توليد حزمة محتوى كاملة
 */
async function generateCompletePackage(topic, subject = 'General', grade = '3') {
  try {
    const response = await fetch(`${API_BASE}/content/generate-package`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ topic, subject, grade })
    });

    if (!response.ok) throw new Error('Failed to generate package');
    
    const data = await response.json();
    return {
      success: true,
      package: data.package,
      components: data.components,
      contentId: data.contentId
    };
  } catch (error) {
    console.error('Package Error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * إرسال رسالة للشات الذكي
 */
async function sendSmartMessage(message, subject = 'General', topic = '', conversationId = null) {
  try {
    const response = await fetch(`${API_BASE}/content/chat/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ message, subject, topic, conversationId })
    });

    if (!response.ok) throw new Error('Failed to send message');
    
    const data = await response.json();
    return {
      success: true,
      reply: data.reply,
      conversationId: data.conversationId,
      model: data.model
    };
  } catch (error) {
    console.error('Chat Error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * الحصول على قائمة المحتوى المُولّد
 */
async function fetchGeneratedContent(subject = null, grade = null, type = null, page = 1) {
  try {
    const params = new URLSearchParams();
    if (subject) params.append('subject', subject);
    if (grade) params.append('grade', grade);
    if (type) params.append('type', type);
    params.append('page', page);

    const response = await fetch(`${API_BASE}/content?${params.toString()}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) throw new Error('Failed to fetch content');
    
    const data = await response.json();
    return {
      success: true,
      content: data.content,
      total: data.total,
      pages: data.pages,
      currentPage: data.currentPage
    };
  } catch (error) {
    console.error('Fetch Content Error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * الحصول على محادثة محددة
 */
async function fetchConversation(conversationId) {
  try {
    const response = await fetch(`${API_BASE}/content/chat/${conversationId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) throw new Error('Failed to fetch conversation');
    
    const data = await response.json();
    return {
      success: true,
      conversation: data
    };
  } catch (error) {
    console.error('Fetch Conversation Error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * واجهة فرونتند محسّنة للتفاعل مع المحتوى المُولّد
 */
async function generateAIContentFrontend(contentType) {
  const topic = (document.getElementById('ai-topic')?.value || 'الموضوع').trim();
  const subjKey = document.getElementById('ai-subject')?.value || 'cs';
  const level = document.getElementById('ai-level')?.value || 'متوسط';
  const result = document.getElementById('ai-gen-result');
  const btn = document.getElementById('ai-gen-btn');

  if (!result || !topic) {
    alert('الرجاء إدخال موضوع صحيح');
    return;
  }

  // عرض حالة التحميل
  result.classList.remove('hidden');
  result.innerHTML = '⏳ جارٍ توليد المحتوى بالذكاء الاصطناعي...';
  if (btn) { btn.disabled = true; btn.style.opacity = '0.6'; }

  let response = null;

  try {
    switch(contentType) {
      case 'summary':
        response = await generateSummary(topic, subjKey, level);
        if (response.success) {
          result.innerHTML = `
            <div style="padding: 14px; background: var(--prl); border-radius: var(--r3); border: 1px solid var(--bdr2);">
              <p style="font-weight: 700; color: var(--prd); margin-bottom: 10px;">📋 ملخص الدرس</p>
              <div style="font-size: 13px; color: var(--tx2); line-height: 1.8; white-space: pre-wrap;">${response.summary}</div>
            </div>
          `;
        }
        break;

      case 'videoScript':
        response = await generateVideoScript(topic, [topic], 10, subjKey, level);
        if (response.success) {
          result.innerHTML = `
            <div style="padding: 14px; background: var(--prl); border-radius: var(--r3); border: 1px solid var(--bdr2);">
              <p style="font-weight: 700; color: var(--prd); margin-bottom: 10px;">🎥 سكريبت فيديو شرح</p>
              <div style="font-size: 13px; color: var(--tx2); line-height: 1.8; white-space: pre-wrap;">${response.script}</div>
              <div style="margin-top: 10px; font-size: 12px; color: var(--tx3);">⏱️ المدة المتوقعة: ${response.estimatedDuration} دقيقة</div>
            </div>
          `;
        }
        break;

      case 'podcast':
        response = await generatePodcast(topic, 1, 'medium', subjKey, level);
        if (response.success) {
          result.innerHTML = `
            <div style="padding: 14px; background: var(--prl); border-radius: var(--r3); border: 1px solid var(--bdr2);">
              <p style="font-weight: 700; color: var(--prd); margin-bottom: 10px;">🎙️ محتوى بودكاست</p>
              <div style="font-size: 13px; color: var(--tx2); line-height: 1.8; white-space: pre-wrap;">${response.content}</div>
              <div style="margin-top: 10px; font-size: 12px; color: var(--tx3);">⏱️ المدة المتوقعة: ${response.estimatedDuration}</div>
            </div>
          `;
        }
        break;

      case 'mindmap':
        response = await generateMindMap(topic, 3, subjKey, level);
        if (response.success) {
          result.innerHTML = `
            <div style="padding: 14px; background: var(--prl); border-radius: var(--r3); border: 1px solid var(--bdr2);">
              <p style="font-weight: 700; color: var(--prd); margin-bottom: 10px;">🗺️ خريطة ذهنية</p>
              <div style="font-size: 13px; color: var(--tx2); line-height: 1.8; white-space: pre-wrap;">${response.textFormat}</div>
            </div>
          `;
        }
        break;

      case 'questions':
        response = await generateQuestions(topic, 'medium', 5, subjKey, level);
        if (response.success) {
          let questionsHTML = '<div style="padding: 14px; background: var(--prl); border-radius: var(--r3); border: 1px solid var(--bdr2);"><p style="font-weight: 700; color: var(--prd); margin-bottom: 10px;">📝 أسئلة تفاعلية</p>';
          
          if (Array.isArray(response.questions)) {
            response.questions.forEach((q, idx) => {
              questionsHTML += `
                <div style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid rgba(0,0,0,.1);">
                  <p style="font-weight: 600; margin-bottom: 6px; color: var(--tx);">${idx + 1}. ${q.question || q}</p>
                  ${q.options ? `<div style="margin: 6px 0; font-size: 12px; color: var(--tx2);">${q.options.join(' | ')}</div>` : ''}
                  ${q.explanation ? `<div style="margin-top: 6px; padding: 6px; background: rgba(255,255,255,.1); border-radius: 4px; font-size: 12px; color: var(--tx3);">💡 ${q.explanation}</div>` : ''}
                </div>
              `;
            });
          } else {
            questionsHTML += `<div style="white-space: pre-wrap; font-size: 13px; color: var(--tx2);">${response.questions}</div>`;
          }
          questionsHTML += '</div>';
          result.innerHTML = questionsHTML;
        }
        break;

      case 'package':
        response = await generateCompletePackage(topic, subjKey, level);
        if (response.success) {
          const pkg = response.package;
          result.innerHTML = `
            <div style="padding: 14px; background: var(--prl); border-radius: var(--r3); border: 1px solid var(--bdr2); font-size: 13px;">
              <p style="font-weight: 700; color: var(--prd); margin-bottom: 10px;">📦 حزمة محتوى كاملة</p>
              
              ${pkg.summary ? `<div style="margin-bottom: 10px;"><strong>📋 الملخص:</strong><div style="white-space: pre-wrap; color: var(--tx2); margin-top: 4px;">${pkg.summary.substring(0, 200)}...</div></div>` : ''}
              
              ${pkg.videoScript ? `<div style="margin-bottom: 10px;"><strong>🎥 سكريبت الفيديو:</strong><div style="white-space: pre-wrap; color: var(--tx2); margin-top: 4px;">${pkg.videoScript.substring(0, 200)}...</div></div>` : ''}
              
              ${pkg.podcast ? `<div style="margin-bottom: 10px;"><strong>🎙️ البودكاست:</strong><div style="white-space: pre-wrap; color: var(--tx2); margin-top: 4px;">${pkg.podcast.substring(0, 200)}...</div></div>` : ''}
              
              ${pkg.questions && Array.isArray(pkg.questions) && pkg.questions.length > 0 ? `<div style="margin-bottom: 10px;"><strong>📝 الأسئلة:</strong><div style="color: var(--tx2); margin-top: 4px;">${pkg.questions.length} أسئلة تفاعلية متوفرة</div></div>` : ''}
              
              <div style="color: var(--tx3); margin-top: 10px; font-size: 12px;">✅ تم إنشاء الحزمة بنجاح!</div>
            </div>
          `;
        }
        break;
    }

    if (!response?.success) {
      result.innerHTML = `⚠️ خطأ: ${response?.error || 'فشل توليد المحتوى'}`;
    }

  } catch (error) {
    result.innerHTML = `⚠️ خطأ: ${error.message}`;
    console.error('Error:', error);
  }

  // إعادة تفعيل الزر
  if (btn) { 
    btn.disabled = false; 
    btn.style.opacity = ''; 
  }
}

/**
 * واجهة الشات الذكي المحسّن
 */
async function sendSmartAIChat(message) {
  const container = document.getElementById('float-msgs');
  if (!container) return;

  // إضافة رسالة المستخدم
  addMsg(container, message, true);

  // عرض مؤشر الكتابة
  const typing = document.createElement('div');
  typing.className = 'msg ai typing';
  typing.innerHTML = '<div style="display:flex;gap:4px;"><span>🤖</span><span>جارٍ الرد...</span></div>';
  container.appendChild(typing);
  container.scrollTop = container.scrollHeight;

  // إرسال الرسالة للـ API
  const response = await sendSmartMessage(message, 'General', '');

  if (response.success) {
    typing.innerHTML = response.reply.replace(/\n/g, '<br>');
  } else {
    typing.innerHTML = `⚠️ ${response.error || 'حدث خطأ في معالجة الرسالة'}`;
  }

  container.scrollTop = container.scrollHeight;
}

/**
 * تعديل الدالة القديمة generateAIContent لاستخدام النسخة الجديدة
 */
async function generateAIContentLegacy() {
  // تحديد نوع المحتوى المختار
  const contentTypeSelect = document.querySelector('.content-type-selector');
  const selectedType = contentTypeSelect?.getAttribute('data-selected') || 'summary';
  await generateAIContentFrontend(selectedType);
}
