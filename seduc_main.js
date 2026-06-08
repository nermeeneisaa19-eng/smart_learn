// ============================================================
// DATA
// ============================================================
const SUBJECTS = [
  { id:'arabic',   name:'اللغة العربية',              icon:'📚', color:'#E74C3C', tracks:['sci','scimath','lit'],
    bookId:'1V0dF_AsXhPh11BfiHAc5aguqNQDwOzEi',
    extras:[{title:'قصة عنترة ابن شداد',id:'16UlX6GesWCvitTkD2vNy9hK5Hl7gzeqI'},{title:'قواعد النحو والصرف',id:'14-kcKYFsSM_BHrSSr7_2qKxoNg4n-Gdl'}] },
  { id:'english',  name:'اللغة الإنجليزية',           icon:'🌍', color:'#3498DB', tracks:['sci','scimath','lit'], bookId:'1HSSDkowx0eh8FqDjDpxEIfS1A6dR7PQe' },
  { id:'french',   name:'اللغة الفرنسية',             icon:'🥐', color:'#9B59B6', tracks:['lit'],               bookId:'1VwK0cuEHU2oZFAGhj3jbPeYaNQpSPfPf' },
  { id:'math',     name:'الرياضيات',                  icon:'🔢', color:'#2ECC71', tracks:['sci','scimath'],      bookId:'1CCzFmabdOUIrIRkLtaF_coVuJOBTUFjK' },
  { id:'cs',       name:'البرمجة والذكاء الاصطناعي', icon:'💻', color:'#FF8C42', tracks:['sci','scimath'],      bookId:'11CpYfOT1bepqHgkfhvh-EhrfuL-v-o3h' },
  { id:'history',  name:'التاريخ',                    icon:'🏛️', color:'#E67E22', tracks:['sci','scimath','lit'],bookId:'1RtrQwlFG2OdWuHXcg0u6IZ8F2BJM-bK3' },
  { id:'religion', name:'التربية الدينية',            icon:'☪️', color:'#1ABC9C', tracks:['sci','scimath','lit'],bookId:'18JDiEEe3DzTrfFB_IxgiSm1TXALJPoUJ' },
  { id:'science',  name:'العلوم المتكاملة',           icon:'🔬', color:'#16A085', tracks:['sci','scimath'],      bookId:'1R_eNbdAb7wHy08HlxNO3fWjgv1Z95lNk' },
  { id:'philo',    name:'الفلسفة والمنطق',            icon:'🧠', color:'#8E44AD', tracks:['lit'],               bookId:'1pKCnJP_Nw-1iwSLQrZciRV0sxC_cFWf6' },
];

const SUBJECT_UNITS = {
  arabic:  ['الوحدة الأولى: الأدب والنصوص الأدبية','الوحدة الثانية: البلاغة والأساليب البيانية','الوحدة الثالثة: النحو والصرف','الوحدة الرابعة: التعبير والإنشاء'],
  english: ['Unit 1: Communication Skills','Unit 2: Technology & Innovation','Unit 3: Environment & Sustainability','Unit 4: Culture & Identity'],
  french:  ['Unité 1: La famille et les relations','Unité 2: La ville et les transports','Unité 3: Les loisirs et la culture'],
  math:    ['الوحدة الأولى: الجبر والدوال','الوحدة الثانية: الهندسة التحليلية','الوحدة الثالثة: التفاضل والتكامل','الوحدة الرابعة: الإحصاء والاحتمالات'],
  cs:      ['الوحدة الأولى: ما هي المعلومات؟','الوحدة الثانية: القوانين والحقوق في مجتمع المعلومات','الوحدة الثالثة: أمن المعلومات'],
  history: ['الوحدة الأولى: الحضارات القديمة','الوحدة الثانية: العصور الوسطى','الوحدة الثالثة: التاريخ الحديث','الوحدة الرابعة: تاريخ مصر والعالم العربي'],
  religion:['الوحدة الأولى: العقيدة الإسلامية','الوحدة الثانية: الفقه والمعاملات','الوحدة الثالثة: السيرة النبوية','الوحدة الرابعة: الأخلاق والقيم'],
  science: ['الوحدة الأولى: الفيزياء الحديثة','الوحدة الثانية: الكيمياء العضوية','الوحدة الثالثة: علم الأحياء والخلية','الوحدة الرابعة: الجيولوجيا والفضاء'],
  philo:   ['الوحدة الأولى: مقدمة في الفلسفة','الوحدة الثانية: المنطق الصوري','الوحدة الثالثة: الفلسفة الغربية الحديثة','الوحدة الرابعة: فلسفة العلوم'],
};

const SUBJECT_VIDEOS = {
  arabic:  ['شرح نحو عربي أول ثانوي','تحليل نصوص أدبية الثانوية العامة','بلاغة عربية أول ثانوي شرح مبسط'],
  english: ['English grammar secondary 1 Egypt','Vocabulary building Egyptian secondary','English comprehension grade 1'],
  french:  ['فرنسية أول ثانوي أدبي','grammaire française secondaire Egypte','vocabulaire français lycée'],
  math:    ['رياضيات أول ثانوي الفصل الأول','شرح التفاضل والتكامل مبسط','هندسة تحليلية أول ثانوي'],
  cs:      ['برمجة Python للمبتدئين بالعربي','الذكاء الاصطناعي شرح مبسط للطلاب','أمن المعلومات أول ثانوي'],
  history: ['تاريخ أول ثانوي 2025','الحضارات القديمة شرح مبسط','تاريخ مصر الحديث للثانوي'],
  religion:['تربية دينية أول ثانوي','السيرة النبوية للطلاب','فقه إسلامي أول ثانوي'],
  science: ['علوم متكاملة أول ثانوي','فيزياء أول ثانوي شرح سهل','كيمياء عضوية أول ثانوي'],
  philo:   ['فلسفة ومنطق أول ثانوي أدبي','شرح المنطق الصوري للطلاب','فلسفة غربية مبسطة'],
};

const LESSON_ASSETS_BY_LEVEL = {
  'ضعيف': {
    video: {
      id: '1-owLPEwOyqSs2V4yA2Ekto-AjMMTZC45',
      title: 'فيديو المستوى الضعيف',
      subtitle: 'شرح مرئي للمستوى الضعيف عبر Drive'
    },
    ppt: {
      id: '1UC0rD4nLMKKr9FjNdFxGI2_Qvh2WPMT2',
      title: 'عرض PowerPoint للمستوى الضعيف',
      subtitle: 'شريحة تعليمية جاهزة للمستوى الضعيف'
    },
    podcast: {
      id: '1x0e_E0Dc51QRaaknhkMwPTEAS7Oahnti',
      title: 'بودكاست المستوى الضعيف',
      subtitle: 'حلقة صوتية تعليمية للمستوى الضعيف'
    },
    mindmap: {
      id: '16ZjtCCQE_yoVWlrmAUPpRTqSh925Miey',
      title: 'الخريطة الذهنية للمستوى الضعيف',
      subtitle: 'رؤية مرئية للمفاهيم للمستوى الضعيف'
    },
    pdf: {
      id: '11CiZE4NN7-p1YEo6edsui-IurrZ8HWzf',
      title: 'PDF المستوى الضعيف',
      subtitle: 'ملف PDF كامل للمستوى الضعيف'
    },
    infographic: {
      id: '1rPfVae4LrghOG_qYtiz0f8doxdsjVdx0',
      title: 'إنفوجرافيك المستوى الضعيف',
      subtitle: 'ملف إنفوجرافيك بصري يلخص الدرس للمستوى الضعيف'
    }
  },
  'متوسط': {
    video: {
      id: '1oVcCn47GclGWDr_r-Ap1ytJ6UrbXO1Nn',
      title: 'فيديو المستوى المتوسط',
      subtitle: 'شرح مرئي للمستوى المتوسط عبر Drive'
    },
    ppt: {
      id: '1gCbd1zmcBcmsy0HoAKWQ2eqJcpePW-fC',
      title: 'عرض PowerPoint للمستوى المتوسط',
      subtitle: 'شريحة تعليمية جاهزة للمستوى المتوسط'
    },
    podcast: {
      id: '146WJKECNKd9NR1v6Bop4Ydw4coZ8aTRo',
      title: 'بودكاست المستوى المتوسط',
      subtitle: 'حلقة صوتية تعليمية للمستوى المتوسط'
    },
    mindmap: {
      id: '1dHHGGr-qiCLogVx1fqG8_ALkgpMpjTJJ',
      title: 'الخريطة الذهنية للمستوى المتوسط',
      subtitle: 'رؤية مرئية للمفاهيم للمستوى المتوسط'
    },
    pdf: {
      id: '1ejgZUmdYkSWlhjVBOPwhQCHmcOLQ9zha',
      title: 'PDF المستوى المتوسط',
      subtitle: 'ملف PDF كامل للمستوى المتوسط'
    },
    infographic: {
      id: '1QSZWNyRWW39JMfHCaihyRGzKAcKri3Xr',
      title: 'إنفوجرافيك المستوى المتوسط',
      subtitle: 'ملف إنفوجرافيك بصري يلخص الدرس للمستوى المتوسط'
    }
  },
  'ممتاز': {
    video: {
      id: '1areMaXg2LpX4F9UWHJK49tLtP_4CCwYY',
      title: 'فيديو المستوى الممتاز',
      subtitle: 'شرح مرئي للمستوى الممتاز عبر Drive'
    },
    ppt: {
      id: '1ajl4JZaYJYAc4D05v8X8vyXvHfFObnHA',
      title: 'عرض PowerPoint للمستوى الممتاز',
      subtitle: 'شريحة تعليمية جاهزة للمستوى الممتاز'
    },
    podcast: {
      id: '19smzLFXCkDKTGMmtCWDW1yi1ck9DUw4V',
      title: 'بودكاست المستوى الممتاز',
      subtitle: 'حلقة صوتية تعليمية للمستوى الممتاز'
    },
    mindmap: {
      id: '1yWDLfeSVVh2CrA0fBNQwC1arVOCmhlm4',
      title: 'الخريطة الذهنية للمستوى الممتاز',
      subtitle: 'رؤية مرئية للمفاهيم للمستوى الممتاز'
    },
    pdf: {
      id: '1uBpPn2rpy1QGT0v_W6R7HNY747lJG9Iy',
      title: 'PDF المستوى الممتاز',
      subtitle: 'ملف PDF كامل للمستوى الممتاز'
    },
    infographic: {
      id: '1rPfVae4LrghOG_qYtiz0f8doxdsjVdx0',
      title: 'إنفوجرافيك المستوى الممتاز',
      subtitle: 'ملف إنفوجرافيك بصري يلخص الدرس للمستوى الممتاز'
    }
  }
};

// منهج كامل لكل مادة في الأول الثانوي 2025-2026 — يستخدمه مولّد AI لاقتراح موضوعات حقيقية
const CURRICULUM = {
  arabic:[
    {unit:'الأدب والنصوص الأدبية',lessons:['تعريف الأدب وأقسامه','الشعر العربي القديم','نص: حب الوطن لمصطفى صادق الرافعي','نص: العلم والإيمان للشيخ محمد عبده','المعلقات وامرؤ القيس','الشعر في العصر الجاهلي']},
    {unit:'البلاغة وعلم البيان',lessons:['التشبيه: تعريفه وأركانه وأنواعه','الاستعارة التصريحية والمكنية','الكناية وأقسامها','المجاز المرسل وعلاقاته','علم البديع: الطباق والجناس','المقابلة والاقتباس']},
    {unit:'النحو والصرف',lessons:['الجملة الاسمية: المبتدأ والخبر','الجملة الفعلية: الفعل والفاعل','المفعول به والمفاعيل','المرفوعات والمنصوبات والمجرورات','الميزان الصرفي وأبنيته','جمع المذكر السالم وجمع المؤنث السالم']},
    {unit:'التعبير والإنشاء',lessons:['كتابة المقال','كتابة القصة القصيرة','كتابة الرسالة الإدارية','مهارات التلخيص','إعراب جمل تطبيقية']},
  ],
  english:[
    {unit:'Communication Skills',lessons:['Introducing yourself','Daily routines','Asking for information','Making appointments','Telephone conversations']},
    {unit:'Grammar Foundations',lessons:['Present Simple vs Present Continuous','Past Simple vs Past Continuous','Present Perfect tense','Future tenses','Modal verbs (can, must, should)','Conditionals Type 1 & 2']},
    {unit:'Technology & Innovation',lessons:['Reading: AI in education','Vocabulary: technology terms','Listening: tech podcast','Writing: opinion essay on technology']},
    {unit:'Environment & Sustainability',lessons:['Reading: climate change','Vocabulary: environment','Writing: a report on pollution','Listening: documentary excerpt']},
    {unit:'Culture & Identity',lessons:['Egyptian heritage','World cultures','Reading: famous Egyptians','Writing: descriptive essay about Egypt']},
  ],
  french:[
    {unit:'La famille et les relations',lessons:['Présentations: bonjour, je m\'appelle','Les membres de la famille','Décrire une personne','Verbe être au présent','Verbe avoir au présent']},
    {unit:'La ville et les transports',lessons:['Demander son chemin','Les moyens de transport','Décrire sa ville','Les prépositions de lieu','Le présent des verbes en -er']},
    {unit:'Les loisirs et la culture',lessons:['Parler des loisirs','Le passé composé','L\'imparfait','La culture francophone','Les articles définis et indéfinis']},
    {unit:'Grammaire essentielle',lessons:['Les pronoms personnels','La négation','Les adjectifs qualificatifs','Le futur proche']},
  ],
  math:[
    {unit:'الجبر والدوال',lessons:['المعادلات الخطية وحلها','المعادلات التربيعية','الدوال وتمثيلها البياني','الدالة الخطية','الدالة التربيعية','المتباينات']},
    {unit:'الهندسة التحليلية',lessons:['الإحداثيات الديكارتية','معادلة المستقيم','ميل المستقيم','المتجهات في المستوى','حساب المسافة بين نقطتين','معادلة الدائرة']},
    {unit:'حساب المثلثات',lessons:['النسب المثلثية في المثلث القائم','الزوايا الخاصة (30, 45, 60, 90)','جيب وجيب التمام والظل','قانون الجيب','قانون جيب التمام','حل المثلث']},
    {unit:'التفاضل',lessons:['مفهوم النهاية','تطبيقات النهايات','مفهوم المشتقة','قواعد الاشتقاق الأساسية','مشتقات الدوال المثلثية','تطبيقات المشتقة في الفيزياء']},
    {unit:'الإحصاء والاحتمالات',lessons:['المتوسط والوسيط والمنوال','الانحراف المعياري','مفهوم الاحتمال','احتمالات الأحداث','التوزيعات الإحصائية']},
  ],
  cs:[
    {unit:'ما هي المعلومات؟',lessons:['تعريف البيانات والمعلومات','الفرق بين البيانات والمعرفة','أنظمة المعلومات','التحول الرقمي','مكونات الحاسوب الأساسية']},
    {unit:'القوانين والحقوق في مجتمع المعلومات',lessons:['الملكية الفكرية والحقوق الرقمية','أخلاقيات استخدام التكنولوجيا','قوانين مكافحة الجرائم الإلكترونية','الخصوصية الرقمية','المواطنة الرقمية']},
    {unit:'أمن المعلومات',lessons:['مفهوم أمن المعلومات','أنواع التهديدات الإلكترونية','الفيروسات والبرامج الخبيثة','التشفير وحماية البيانات','كلمات المرور القوية والتوثيق الثنائي','أمن الشبكات والحماية الشخصية']},
    {unit:'مقدمة في البرمجة بـ Python',lessons:['أساسيات Python والمتغيرات','الجمل الشرطية if/elif/else','الحلقات for و while','القوائم والقواميس','الدوال (Functions)','استخدام المكتبات']},
    {unit:'مقدمة في الذكاء الاصطناعي',lessons:['تعريف الذكاء الاصطناعي وتاريخه','أنواع الذكاء الاصطناعي','التعلم الآلي (Machine Learning)','الشبكات العصبية الاصطناعية','تطبيقات AI في الحياة','أخلاقيات الذكاء الاصطناعي']},
  ],
  history:[
    {unit:'الحضارات القديمة',lessons:['الحضارة الفرعونية المصرية','حضارة بلاد الرافدين','حضارة فينيقيا والشام','حضارة بلاد اليونان','الحضارة الرومانية']},
    {unit:'العصور الوسطى والإسلامية',lessons:['ظهور الإسلام في الجزيرة العربية','الخلافة الراشدة','الدولة الأموية','الدولة العباسية والعصر الذهبي','الدولة الفاطمية والأيوبية في مصر','الدولة المملوكية والعثمانية']},
    {unit:'التاريخ الحديث',lessons:['الثورة الفرنسية وأثرها','الحملة الفرنسية على مصر','محمد علي ومشروع التحديث','الإمبريالية والاستعمار','الحرب العالمية الأولى','الحرب العالمية الثانية']},
    {unit:'تاريخ مصر والعالم العربي المعاصر',lessons:['ثورة 1919 وسعد زغلول','ثورة 23 يوليو 1952','حروب فلسطين 1948-1973','الوحدة العربية','مصر في القرن الحادي والعشرين']},
  ],
  religion:[
    {unit:'العقيدة الإسلامية',lessons:['أركان الإسلام والإيمان','صفات الله الواجبة','الإيمان بالملائكة','الإيمان بالكتب السماوية','الإيمان بالرسل','الإيمان باليوم الآخر','الإيمان بالقدر خيره وشره']},
    {unit:'الفقه والمعاملات',lessons:['الطهارة والوضوء','أحكام الصلاة','أحكام الزكاة ونصابها','أحكام الصيام في رمضان','أحكام الحج وأركانه','المعاملات: البيع والشراء','معاملات الزواج والميراث']},
    {unit:'السيرة النبوية',lessons:['نسب النبي ﷺ ومولده','بدايات الدعوة في مكة','الهجرة إلى المدينة','الغزوات الكبرى: بدر وأحد والخندق','صلح الحديبية وفتح مكة','حجة الوداع ووفاة النبي ﷺ']},
    {unit:'الأخلاق والقيم',lessons:['الأخلاق الإسلامية: الصدق والأمانة','بر الوالدين وصلة الرحم','حقوق الجار وآداب المجتمع','العلم والعمل في الإسلام','التسامح وحسن الخلق','الأخلاق المهنية']},
  ],
  science:[
    {unit:'الفيزياء الحديثة',lessons:['الكهرباء التيارية وقانون أوم','المغناطيسية والمجال المغناطيسي','الموجات والصوت','الضوء والبصريات','الحركة وقوانين نيوتن','الطاقة والشغل والقدرة']},
    {unit:'الكيمياء العضوية',lessons:['الذرة وبنيتها','الجدول الدوري','الروابط الكيميائية','الأحماض والقواعد ومقياس pH','المركبات العضوية والهيدروكربونات','الأكسدة والاختزال']},
    {unit:'علم الأحياء والخلية',lessons:['الخلية النباتية والحيوانية','الميتوكوندريا والريبوسوم','التمثيل الضوئي والتنفس الخلوي','الجهاز الهضمي ووظائفه','الجهاز الدوري والقلب','الوراثة والـ DNA']},
    {unit:'الجيولوجيا والفضاء',lessons:['تركيب الأرض وطبقاتها','الصخور والمعادن','الزلازل والبراكين','المجموعة الشمسية','النجوم والمجرات','نشأة الكون']},
  ],
  philo:[
    {unit:'مقدمة في الفلسفة',lessons:['تعريف الفلسفة وأهميتها','الفلسفة وعلاقتها بالعلوم','مصادر التفكير الفلسفي','فروع الفلسفة الرئيسية','مناهج البحث الفلسفي']},
    {unit:'المنطق الصوري',lessons:['تعريف المنطق وموضوعه','الحدود والقضايا','أنواع القضايا (الحملية والشرطية)','القياس الصوري وأشكاله','الاستقراء والاستنباط','المغالطات المنطقية']},
    {unit:'الفلسفة اليونانية والإسلامية',lessons:['سقراط ومنهجه الحواري','أفلاطون ونظرية المُثُل','أرسطو ومؤسس المنطق الصوري','الكندي فيلسوف العرب','ابن سينا والفلسفة الإسلامية','ابن رشد والشارح الأكبر']},
    {unit:'فلسفة العلوم والقيم',lessons:['طبيعة المعرفة العلمية','مناهج البحث العلمي','فلسفة الأخلاق: الخير والشر','فلسفة الجمال','فلسفة الحرية والمسؤولية']},
  ],
};

const LEVEL_TESTS = {
  cs:[
    {q:'ما هو الذكاء الاصطناعي؟',opts:['محاكاة ذكاء الإنسان في الحاسوب','برنامج للألعاب فقط','نوع من الشبكات الاجتماعية','جهاز تخزين بيانات'],ans:0},
    {q:'ما لغة البرمجة الأكثر استخداماً في AI؟',opts:['Java','C++','Python','HTML'],ans:2},
    {q:'ما معنى خوارزمية؟',opts:['نوع من الأجهزة','خطوات منظمة لحل مشكلة','لغة برمجة','قاعدة بيانات'],ans:1},
    {q:'ما هو التعلم الآلي؟',opts:['تعليم الإنسان عبر الإنترنت','تعلم الحاسوب من البيانات تلقائياً','برنامج تعليمي للأطفال','حاسوب محمول متطور'],ans:1},
    {q:'ما الشبكة العصبية الاصطناعية؟',opts:['شبكة إنترنت عادية','نظام مستوحى من الدماغ البشري','برنامج فيروسي','قاعدة بيانات ضخمة'],ans:1}
  ],
  math:[
    {q:'ما نتيجة 15² ؟',opts:['215','225','235','245'],ans:1},
    {q:'حل المعادلة: 2x + 5 = 15',opts:['x=4','x=5','x=6','x=7'],ans:1},
    {q:'ما مفهوم المشتقة في التفاضل؟',opts:['مجموع دالتين','معدل التغيير الفوري للدالة','قيمة ثابتة للدالة','متغير مستقل'],ans:1},
    {q:'ما الجذر التربيعي لـ 144؟',opts:['11','12','13','14'],ans:1},
    {q:'ما قيمة sin(90°)؟',opts:['0','0.5','1','-1'],ans:2}
  ],
  arabic:[
    {q:'ما إعراب "المدرسة" في جملة "المدرسة كبيرة"؟',opts:['فاعل','مبتدأ','خبر','مفعول به'],ans:1},
    {q:'ما علامة جمع المذكر السالم؟',opts:['الواو والنون أو الياء والنون','الألف والتاء المربوطة','النون وحدها','الكسرة الظاهرة'],ans:0},
    {q:'ما نوع الأسلوب في "يا وطني"؟',opts:['استفهام','تعجب','نداء','أمر'],ans:2},
    {q:'ما وزن كلمة "كاتب" في الميزان الصرفي؟',opts:['فاعل','فعيل','فعّال','مفعول'],ans:0},
    {q:'ما التشبيه في "العلم كالنور"؟',opts:['تشبيه مرسل مجمل','تشبيه مرسل مفصل','تشبيه بليغ','تشبيه ضمني'],ans:0}
  ],
  english:[
    {q:'What is the past tense of "go"?',opts:['goed','went','gone','going'],ans:1},
    {q:'Choose correct: She ___ to school every day.',opts:['go','goes','went','going'],ans:1},
    {q:'What does "enormous" mean?',opts:['small','medium','very large','beautiful'],ans:2},
    {q:'Passive of "They built the house":',opts:['The house were built','The house was built','The house is built','The house has build'],ans:1},
    {q:'I have lived here ___ 2010.',opts:['for','since','during','while'],ans:1}
  ],
  french:[
    {q:'Comment dit-on "صباح الخير" en français?',opts:['Bonsoir','Bonjour','Bonne nuit','Salut'],ans:1},
    {q:'Quel est le verbe "être" avec "je"?',opts:['je suis','tu es','il est','je es'],ans:0},
    {q:'L\'article défini féminin singulier:',opts:['le','la','les','l\''],ans:1},
    {q:'Le passé composé se forme avec:',opts:['avoir/être + participe passé','futur + verbe','seulement avoir','seulement être'],ans:0},
    {q:'"J\'___ une voiture" — verbe avoir, tu choisis:',opts:['ai','as','a','avons'],ans:0}
  ],
  science:[
    {q:'ما المعادلة الرئيسية للتمثيل الضوئي؟',opts:['CO₂+H₂O+ضوء→جلوكوز+O₂','O₂+جلوكوز→CO₂+H₂O','H₂O→H₂+O₂','CO₂→C+O₂'],ans:0},
    {q:'ما قانون أوم؟',opts:['V = I × R','F = m × a','E = mc²','P = m × g'],ans:0},
    {q:'ما العضو المسؤول عن ضخ الدم؟',opts:['الكبد','القلب','الرئة','الكلية'],ans:1},
    {q:'كم عدد كروموسومات الإنسان؟',opts:['23','46','48','24'],ans:1},
    {q:'ما مقياس الحموضة pH للمحلول المتعادل؟',opts:['0','7','14','3'],ans:1}
  ],
  history:[
    {q:'متى بُنيت أهرامات الجيزة تقريباً؟',opts:['1000 ق.م','2500 ق.م','5000 ق.م','500 ق.م'],ans:1},
    {q:'من فتح القسطنطينية؟',opts:['صلاح الدين','محمد الفاتح','عمر بن الخطاب','هارون الرشيد'],ans:1},
    {q:'في أي عام بدأت الحرب العالمية الثانية؟',opts:['1914','1939','1945','1950'],ans:1},
    {q:'من أسس مصر الحديثة؟',opts:['أحمد عرابي','محمد علي باشا','جمال عبد الناصر','سعد زغلول'],ans:1},
    {q:'متى افتُتحت قناة السويس؟',opts:['1869','1900','1820','1956'],ans:0}
  ],
  religion:[
    {q:'كم عدد سور القرآن الكريم؟',opts:['100','110','114','120'],ans:2},
    {q:'كم ركعة في صلاة الظهر؟',opts:['2','3','4','5'],ans:2},
    {q:'في أي شهر فُرض الصيام؟',opts:['شعبان','رجب','رمضان','شوال'],ans:2},
    {q:'كم عدد أركان الإسلام؟',opts:['4','5','6','7'],ans:1},
    {q:'ما أول سورة نزلت من القرآن؟',opts:['الفاتحة','البقرة','العلق','المدثر'],ans:2}
  ],
  philo:[
    {q:'من مؤسس المنطق الصوري؟',opts:['سقراط','أفلاطون','أرسطو','ابن سينا'],ans:2},
    {q:'مقولة "أعرف أنني لا أعرف" تعود لـ:',opts:['أرسطو','سقراط','أفلاطون','ديكارت'],ans:1},
    {q:'فرع الفلسفة الذي يدرس الوجود:',opts:['الإبستيمولوجيا','الأنطولوجيا','الأكسيولوجيا','المنطق'],ans:1},
    {q:'من معلم الإسكندر الأكبر؟',opts:['سقراط','أفلاطون','أرسطو','فيثاغورس'],ans:2},
    {q:'القياس: "كل إنسان فانٍ، سقراط إنسان، إذن..."',opts:['سقراط ليس فانياً','سقراط فانٍ','سقراط حيوان','الفناء إنسان'],ans:1}
  ],
  default:[
    {q:'ما أهمية الدراسة في حياتنا؟',opts:['لا أهمية لها','بناء المستقبل والنجاح','للترفيه فقط','للامتحان فقط'],ans:1},
    {q:'ما أفضل طريقة للاستذكار؟',opts:['حفظ دون فهم','فهم ثم تلخيص وتطبيق','قراءة مرة واحدة','المذاكرة قبل الامتحان مباشرة'],ans:1},
    {q:'ما الفرق بين المعلومة والمعرفة؟',opts:['لا فرق بينهما','المعرفة أشمل وتشمل التطبيق','المعلومة أشمل','المعرفة أبسط'],ans:1},
    {q:'ما دور التكنولوجيا في التعليم؟',opts:['لا دور لها','تسهيل وتحسين التعلم','تعقيد الأمور','الإضرار بالطلاب'],ans:1},
    {q:'ما التفكير النقدي؟',opts:['قبول المعلومات دون تحليل','تحليل المعلومات وتقييمها','رفض كل الأفكار','التفكير السريع فقط'],ans:1}
  ]
};

// ألعاب تعليمية حقيقية — لكل مادة قاعدة بيانات خاصة (مطابقة + ألغاز + إكمال الفراغ)
const GAME_DATA = {
  arabic:{
    match:[
      {term:'الاستعارة',def:'تشبيه حُذفت أداته وأحد طرفيه'},
      {term:'الطباق',def:'الجمع بين لفظين متضادين'},
      {term:'الكناية',def:'تعبير يُراد به غير معناه الحرفي'},
      {term:'المبتدأ',def:'اسم مرفوع يُبتدأ به في الجملة الاسمية'},
      {term:'الخبر',def:'ما تم به الكلام عن المبتدأ'},
      {term:'الجناس',def:'تشابه لفظين في النطق واختلافهما في المعنى'},
      {term:'المفعول به',def:'اسم منصوب وقع عليه فعل الفاعل'},
      {term:'فعل ماضٍ',def:'فعل دل على حدث وقع قبل زمن التكلم'},
    ],
    riddles:[
      {q:'"رأيت أسداً يخطب" — ما نوع الصورة البيانية؟',a:'استعارة تصريحية (شبّه الخطيب بالأسد)'},
      {q:'"العلم نور والجهل ظلام" — ما المحسن البديعي؟',a:'طباق (نور ≠ ظلام)'},
      {q:'ما وزن كلمة "مُعلِّم" في الميزان الصرفي؟',a:'مُفَعِّل'},
      {q:'ما علامة رفع جمع المذكر السالم؟',a:'الواو والنون'},
      {q:'"طويل النجاد" — كناية عن ماذا؟',a:'الطول والشجاعة'},
      {q:'ما أركان الجملة الاسمية؟',a:'المبتدأ والخبر'},
      {q:'ما الفرق بين الفعل المضارع والماضي؟',a:'المضارع يدل على الحاضر/المستقبل، الماضي على الزمن الماضي'},
      {q:'ما الفرق بين النعت والحال؟',a:'النعت يبيّن صفة الاسم، الحال تبيّن هيئة صاحبها'},
    ],
    puzzles:[
      {type:'text',code:'حدد نوع الصورة في: "نهرٌ يضحك"',opts:['تشبيه','استعارة مكنية','كناية','طباق'],correct:1,hint:'الشخصنة = استعارة مكنية'},
      {type:'text',code:'ما إعراب "العلمُ" في: "العلمُ نافعٌ"؟',opts:['فاعل مرفوع','مبتدأ مرفوع','خبر مرفوع','مفعول به'],correct:1,hint:'أول الجملة الاسمية = مبتدأ'},
      {type:'text',code:'أكمل: "العلمُ نورٌ يُضيءُ ظُلمةَ ..."',opts:['القلوب','الجهل','الليل','الظلام'],correct:1,hint:'الطباق: نور ↔ ظلمة الجهل'},
      {type:'text',code:'وزن كلمة "كاتب" في الميزان الصرفي:',opts:['فاعل','فعيل','مفعول','فاعِل'],correct:0,hint:'الكاف = ف، الألف = ا، التاء = ع، الباء = ل'},
      {type:'text',code:'حدد نوع الأسلوب في "يا وطني":',opts:['استفهام','نداء','تعجب','أمر'],correct:1,hint:'يا = أداة نداء'},
    ]
  },
  english:{
    match:[
      {term:'Subject',def:'The doer of the action'},
      {term:'Verb',def:'Action or state word'},
      {term:'Past Simple',def:'Action completed in the past'},
      {term:'Present Perfect',def:'Past action with present effect'},
      {term:'Adjective',def:'Describes a noun'},
      {term:'Adverb',def:'Describes verb/adjective'},
      {term:'Passive Voice',def:'Subject receives the action'},
      {term:'Conditional',def:'If-then sentence structure'},
    ],
    riddles:[
      {q:'What is the past tense of "go"?',a:'went'},
      {q:'I have ___ here since 2010. (live)',a:'lived (Present Perfect)'},
      {q:'Passive of "They built the house":',a:'The house was built'},
      {q:'What does "enormous" mean?',a:'Very large / huge'},
      {q:'Choose: She ___ to school every day. (go/goes)',a:'goes (3rd person singular)'},
      {q:'Type 2 conditional uses which tenses?',a:'If + Past Simple, would + base verb'},
    ],
    puzzles:[
      {type:'text',code:'Choose the correct tense: "I ___ my homework yesterday."',opts:['do','did','done','have done'],correct:1,hint:'Yesterday = Past Simple'},
      {type:'text',code:'"She ___ in London for 5 years."',opts:['lives','has lived','lived','is living'],correct:1,hint:'For + duration = Present Perfect'},
      {type:'text',code:'Passive of "We will finish the work":',opts:['The work will finish','The work will be finished','The work is finished','The work was finished'],correct:1,hint:'will + be + past participle'},
      {type:'text',code:'"If I ___ rich, I would travel the world."',opts:['am','was','were','will be'],correct:2,hint:'Type 2 conditional uses "were" for all subjects'},
    ]
  },
  french:{
    match:[
      {term:'Bonjour',def:'تحية الصباح'},
      {term:'Merci',def:'شكراً'},
      {term:'Je suis',def:'أنا (مع فعل être)'},
      {term:'Avoir',def:'يملك / فعل امتلاك'},
      {term:'Être',def:'يكون / فعل كينونة'},
      {term:'Le passé composé',def:'الماضي المركّب'},
      {term:'L\'imparfait',def:'الماضي الناقص'},
      {term:'Article défini',def:'le, la, les'},
    ],
    riddles:[
      {q:'كيف نقول "صباح الخير" بالفرنسية؟',a:'Bonjour'},
      {q:'فعل être في الحاضر مع je:',a:'je suis'},
      {q:'فعل avoir في الحاضر مع tu:',a:'tu as'},
      {q:'كيف نكوّن الـ Passé Composé؟',a:'avoir/être (présent) + participe passé'},
      {q:'الأدوات المعرفة في الفرنسية:',a:'le (مذكر), la (مؤنث), les (جمع), l\' (قبل صوت متحرك)'},
    ],
    puzzles:[
      {type:'text',code:'Complétez: "Je ___ étudiant."',opts:['suis','es','est','sommes'],correct:0,hint:'je + suis (être)'},
      {type:'text',code:'Passé composé de "manger" avec je:',opts:['je mange','j\'ai mangé','je mangeais','je mangerai'],correct:1,hint:'avoir + participe passé'},
      {type:'text',code:'Article défini avant "école" (مؤنث، يبدأ بصوت متحرك):',opts:['le','la','l\'','les'],correct:2,hint:'l\' قبل المتحرك'},
    ]
  },
  math:{
    match:[
      {term:'المشتقة',def:'معدل التغير الفوري للدالة'},
      {term:'التكامل',def:'مجموع المساحة تحت المنحنى'},
      {term:'المتجه',def:'كمية لها مقدار واتجاه'},
      {term:'المصفوفة',def:'ترتيب الأعداد في صفوف وأعمدة'},
      {term:'π (باي)',def:'نسبة محيط الدائرة إلى قطرها ≈ 3.14'},
      {term:'sin(30°)',def:'يساوي 0.5 (نصف)'},
      {term:'log(1)',def:'يساوي صفر'},
      {term:'الجذر التربيعي لـ 144',def:'يساوي 12'},
    ],
    riddles:[
      {q:'مشتقة sin(x) تساوي؟',a:'cos(x)'},
      {q:'ما ناتج تكامل 2x dx؟',a:'x² + C'},
      {q:'ما قيمة sin(90°)؟',a:'1 (واحد صحيح)'},
      {q:'إذا f(x)=x² فما f\'(x)؟',a:'2x'},
      {q:'ما قيمة log₁₀(1000)؟',a:'3'},
      {q:'مجموع زوايا المثلث؟',a:'180 درجة'},
      {q:'مجموع زوايا الرباعي؟',a:'360 درجة'},
      {q:'حل المعادلة 2x+5=15:',a:'x = 5'},
    ],
    puzzles:[
      {type:'code',code:'<span style="color:#e2e8f0">import math\n# مشتقة x² = 2x عند x=5\nx = 5\nresult = 2 * </span><span style="background:rgba(255,140,66,.3);padding:2px 6px;border-radius:4px;">???</span>',opts:['x','x**2','math.sqrt(x)','x+2'],correct:0,hint:'2 × 5 = 10'},
      {type:'code',code:'<span style="color:#e2e8f0">import math\nangle_deg = 30\nresult = math.</span><span style="background:rgba(255,140,66,.3);padding:2px 6px;border-radius:4px;">???</span><span style="color:#e2e8f0">(math.radians(angle_deg))</span>',opts:['sin','cos','tan','sqrt'],correct:0,hint:'sin(30°) = 0.5'},
      {type:'code',code:'<span style="color:#e2e8f0">v = [3, 4]\nmag = (v[0]**2 + v[1]**2) </span><span style="background:rgba(255,140,66,.3);padding:2px 6px;border-radius:4px;">???</span><span style="color:#e2e8f0"> 0.5</span>',opts:['**','//','%','*'],correct:0,hint:'|v|=√(9+16)=5'},
      {type:'code',code:'<span style="color:#e2e8f0">data=[2,4,6,8,10]\nmean=</span><span style="background:rgba(255,140,66,.3);padding:2px 6px;border-radius:4px;">???</span><span style="color:#e2e8f0">(data)/len(data)</span>',opts:['sum','max','min','len'],correct:0,hint:'المتوسط = 30÷5 = 6'},
    ]
  },
  cs:{
    match:[
      {term:'الخوارزمية',def:'خطوات منظمة لحل مشكلة'},
      {term:'Python',def:'لغة برمجة شائعة في AI'},
      {term:'المتغير',def:'مكان لتخزين قيمة في الذاكرة'},
      {term:'الحلقة (Loop)',def:'تكرار تنفيذ كود'},
      {term:'الدالة (Function)',def:'كتلة كود يمكن استدعاؤها'},
      {term:'الذكاء الاصطناعي',def:'محاكاة الذكاء البشري بالحاسوب'},
      {term:'التعلم الآلي',def:'تعلم الحاسوب من البيانات تلقائياً'},
      {term:'الشبكة العصبية',def:'نموذج مستوحى من الدماغ البشري'},
    ],
    riddles:[
      {q:'لغة البرمجة الأكثر استخداماً في الذكاء الاصطناعي؟',a:'Python'},
      {q:'ما هي وحدة الذاكرة الأساسية؟',a:'البت (Bit) ثم البايت (Byte = 8 bits)'},
      {q:'ما الفرق بين RAM و ROM؟',a:'RAM ذاكرة عشوائية مؤقتة، ROM ذاكرة قراءة فقط دائمة'},
      {q:'كم بايت في الكيلوبايت؟',a:'1024 بايت'},
      {q:'ما اختصار AI؟',a:'Artificial Intelligence'},
      {q:'ما أنواع التعلم الآلي الثلاثة؟',a:'Supervised, Unsupervised, Reinforcement'},
      {q:'ما الفرق بين الخوارزمية والبرنامج؟',a:'الخوارزمية فكرة منطقية، والبرنامج تنفيذ بلغة برمجة'},
    ],
    puzzles:[
      {type:'code',code:'<span style="color:#e2e8f0">cells=["نواة","غشاء","ميتوكوندريا"]\nprint(</span><span style="background:rgba(255,140,66,.3);padding:2px 6px;border-radius:4px;">???</span><span style="color:#e2e8f0">(cells))</span>',opts:['sum','len','min','max'],correct:1,hint:'len تُعيد عدد العناصر = 3'},
      {type:'code',code:'<span style="color:#e2e8f0">for i in </span><span style="background:rgba(255,140,66,.3);padding:2px 6px;border-radius:4px;">???</span><span style="color:#e2e8f0">(5):\n    print(i)</span>',opts:['len','range','print','input'],correct:1,hint:'range(5) → 0,1,2,3,4'},
      {type:'code',code:'<span style="color:#e2e8f0">def add(a, b):\n    </span><span style="background:rgba(255,140,66,.3);padding:2px 6px;border-radius:4px;">???</span><span style="color:#e2e8f0"> a + b</span>',opts:['print','return','input','def'],correct:1,hint:'الدالة تُرجع قيمة بـ return'},
      {type:'code',code:'<span style="color:#e2e8f0">x = 10\nif x </span><span style="background:rgba(255,140,66,.3);padding:2px 6px;border-radius:4px;">???</span><span style="color:#e2e8f0"> 5:\n    print("كبير")</span>',opts:['<','>','==','!='],correct:1,hint:'10 > 5 صحيح'},
    ]
  },
  science:{
    match:[
      {term:'الخلية',def:'وحدة الحياة الأساسية'},
      {term:'التمثيل الضوئي',def:'تحويل الضوء إلى غذاء في النبات'},
      {term:'HCl',def:'حمض كلور الهيدروجين'},
      {term:'NaOH',def:'هيدروكسيد الصوديوم — قاعدة'},
      {term:'الميتوكوندريا',def:'محطة توليد طاقة الخلية ATP'},
      {term:'DNA',def:'الحمض النووي — الشفرة الوراثية'},
      {term:'الإلكترون',def:'جسيم سالب الشحنة في الذرة'},
      {term:'قانون أوم',def:'V = I × R'},
    ],
    riddles:[
      {q:'أنا أصغر وحدة حية ولديّ نواة. ما أنا؟',a:'الخلية (Cell)'},
      {q:'أحوّل الضوء والماء وثاني أكسيد الكربون إلى سكر. ما أنا؟',a:'التمثيل الضوئي'},
      {q:'تفاعل حمض + قاعدة ينتج ماءً و...؟',a:'ملح (تعادل حمض-قاعدة)'},
      {q:'العضو الذي يضخ الدم في الجسم؟',a:'القلب'},
      {q:'ما المادة التي تعطي الدم لونه الأحمر؟',a:'الهيموغلوبين'},
      {q:'ما عدد كروموسومات الإنسان؟',a:'46 (23 زوجاً)'},
      {q:'من وضع نظرية النسبية الخاصة؟',a:'ألبرت أينشتاين'},
      {q:'ما معادلة الطاقة والكتلة لأينشتاين؟',a:'E = mc²'},
    ],
    puzzles:[
      {type:'code',code:'<span style="color:#e2e8f0">V, R = 12, 4\nI = </span><span style="background:rgba(255,140,66,.3);padding:2px 6px;border-radius:4px;">???</span><span style="color:#e2e8f0"> / R  # قانون أوم</span>',opts:['R','I','V','12'],correct:2,hint:'I = V/R = 12/4 = 3 أمبير'},
      {type:'code',code:'<span style="color:#e2e8f0">pH = 5\nif pH </span><span style="background:rgba(255,140,66,.3);padding:2px 6px;border-radius:4px;">???</span><span style="color:#e2e8f0"> 7:\n    print("حمضي")</span>',opts:['==','>','<','!='],correct:2,hint:'pH < 7 = حمضي'},
      {type:'code',code:'<span style="color:#e2e8f0">dna = "ATCG"\nrna = dna.</span><span style="background:rgba(255,140,66,.3);padding:2px 6px;border-radius:4px;">???</span><span style="color:#e2e8f0">("T","U")</span>',opts:['find','replace','split','count'],correct:1,hint:'في DNA→RNA: T يتحول إلى U'},
    ]
  },
  history:{
    match:[
      {term:'الحضارة الفرعونية',def:'نشأت على ضفاف النيل ~3000 ق.م'},
      {term:'بيت الحكمة',def:'مركز ترجمة وعلوم في بغداد العصر العباسي'},
      {term:'الجاحظ',def:'أديب موسوعي عصر العباسي — البخلاء والحيوان'},
      {term:'الخوارزمي',def:'مؤسس علم الجبر والخوارزمية'},
      {term:'سقراط',def:'فيلسوف يوناني — أعرف أنني لا أعرف'},
      {term:'الأهرامات',def:'مقابر فراعنة مصر القديمة'},
      {term:'صلاح الدين',def:'محرر بيت المقدس عام 1187م'},
      {term:'محمد علي',def:'مؤسس مصر الحديثة 1805م'},
    ],
    riddles:[
      {q:'من بنى أهرامات الجيزة؟',a:'خوفو وخفرع ومنقرع'},
      {q:'في أي عام بدأت الحرب العالمية الثانية؟',a:'1939م'},
      {q:'من فتح القسطنطينية؟',a:'محمد الفاتح عام 1453م'},
      {q:'ما هي أكبر معركة في التاريخ الإسلامي ضد الصليبيين؟',a:'معركة حطين 1187م'},
      {q:'من أسس الدولة الفاطمية؟',a:'عبيد الله المهدي عام 909م'},
      {q:'متى افتُتحت قناة السويس؟',a:'1869م'},
      {q:'ما الحضارة التي اشتهرت بالكتابة المسمارية؟',a:'الحضارة السومرية في بلاد الرافدين'},
    ],
    puzzles:[
      {type:'text',code:'من أسّس مدينة الإسكندرية؟',opts:['رمسيس الثاني','الإسكندر الأكبر','يوليوس قيصر','نابليون'],correct:1,hint:'الإسكندر المقدوني عام 331 ق.م'},
      {type:'text',code:'العصر الذهبي الإسلامي ازدهر تحت أي خلافة؟',opts:['الراشدين','الأموية','العباسية','العثمانية'],correct:2,hint:'بغداد — عصر هارون الرشيد والمأمون'},
      {type:'text',code:'متى وقعت ثورة 23 يوليو في مصر؟',opts:['1948','1952','1956','1967'],correct:1,hint:'بقيادة جمال عبد الناصر'},
      {type:'text',code:'الحضارة التي وضعت قانون حمورابي:',opts:['الفرعونية','البابلية','الفينيقية','اليونانية'],correct:1,hint:'حمورابي ملك بابل ~1750 ق.م'},
    ]
  },
  religion:{
    match:[
      {term:'العقيدة',def:'ما يؤمن به القلب من أصول الإسلام'},
      {term:'الفقه',def:'علم الأحكام الشرعية العملية'},
      {term:'السيرة النبوية',def:'تاريخ حياة النبي محمد ﷺ'},
      {term:'أركان الإسلام',def:'الشهادتان والصلاة والزكاة والصوم والحج'},
      {term:'أركان الإيمان',def:'الإيمان بالله وملائكته وكتبه ورسله واليوم الآخر والقدر'},
      {term:'غزوة بدر',def:'أول غزوة كبرى في الإسلام (2هـ)'},
      {term:'صلح الحديبية',def:'صلح بين النبي وقريش (6هـ)'},
      {term:'فتح مكة',def:'دخول النبي مكة منتصراً (8هـ)'},
    ],
    riddles:[
      {q:'كم عدد سور القرآن الكريم؟',a:'114 سورة'},
      {q:'ما أطول سورة في القرآن؟',a:'سورة البقرة'},
      {q:'ما أول سورة نزلت من القرآن؟',a:'سورة العلق (اقرأ)'},
      {q:'ما الغار الذي اختبأ فيه النبي ﷺ في الهجرة؟',a:'غار ثور'},
      {q:'ما السنة الهجرية لفتح مكة؟',a:'8 هجرية (630م)'},
      {q:'كم مرة ذُكر اسم النبي محمد ﷺ في القرآن؟',a:'4 مرات'},
      {q:'ما أركان الصلاة الفعلية؟',a:'القيام، الركوع، السجود، الجلوس'},
    ],
    puzzles:[
      {type:'text',code:'كم عدد ركعات صلاة الظهر؟',opts:['ركعتان','3 ركعات','4 ركعات','5 ركعات'],correct:2,hint:'الظهر والعصر والعشاء = 4 ركعات'},
      {type:'text',code:'ما اسم زوجة النبي ﷺ الأولى؟',opts:['عائشة','خديجة','حفصة','زينب'],correct:1,hint:'خديجة بنت خويلد رضي الله عنها'},
      {type:'text',code:'في أي شهر فُرض الصيام؟',opts:['شعبان','رجب','رمضان','شوال'],correct:2,hint:'يا أيها الذين آمنوا كُتب عليكم الصيام'},
      {type:'text',code:'كم نصاب زكاة المال (الفضة)؟',opts:['200 درهم','100 درهم','50 درهم','500 درهم'],correct:0,hint:'نصاب الفضة 200 درهم (~595 جم)'},
    ]
  },
  philo:{
    match:[
      {term:'الفلسفة',def:'محبة الحكمة والبحث في الوجود والمعرفة'},
      {term:'المنطق',def:'علم قوانين التفكير الصحيح'},
      {term:'القياس',def:'استنتاج نتيجة من مقدمتين'},
      {term:'الأنطولوجيا',def:'فلسفة الوجود والكائن'},
      {term:'الإبستيمولوجيا',def:'فلسفة المعرفة ومصادرها'},
      {term:'الأكسيولوجيا',def:'فلسفة القيم — الخير والجمال'},
      {term:'سقراط',def:'فيلسوف يوناني — المنهج الحواري'},
      {term:'أرسطو',def:'مؤسس المنطق الصوري'},
    ],
    riddles:[
      {q:'من أسّس المنطق الصوري؟',a:'أرسطو (384-322 ق.م)'},
      {q:'مقولة سقراط الشهيرة؟',a:'أعرف أنني لا أعرف'},
      {q:'من هو معلم الإسكندر الأكبر؟',a:'أرسطو'},
      {q:'ما القياس الأرسطي الشهير؟',a:'كل إنسان فانٍ — سقراط إنسان — إذن سقراط فانٍ'},
      {q:'من فلاسفة الإسلام الكبار؟',a:'الكندي، الفارابي، ابن سينا، ابن رشد'},
      {q:'ما نظرية المُثُل لأفلاطون؟',a:'العالم المحسوس ظل لعالم المُثُل العقلي'},
      {q:'ما الفرق بين الاستنباط والاستقراء؟',a:'الاستنباط: من العام إلى الخاص — الاستقراء: من الخاص إلى العام'},
    ],
    puzzles:[
      {type:'text',code:'القياس الصحيح: "كل المعادن تتمدد بالحرارة، الحديد معدن، إذن..."',opts:['الحديد لا يتمدد','الحديد يتمدد بالحرارة','الحديد بارد','الحرارة معدن'],correct:1,hint:'النتيجة من المقدمتين'},
      {type:'text',code:'الفيلسوف الذي قال "الإنسان حيوان ناطق":',opts:['سقراط','أفلاطون','أرسطو','ابن سينا'],correct:2,hint:'تعريف أرسطو الشهير للإنسان'},
      {type:'text',code:'فرع الفلسفة الذي يبحث في الجمال:',opts:['الأنطولوجيا','الإبستيمولوجيا','الأكسيولوجيا','الميتافيزيقا'],correct:2,hint:'الأكسيولوجيا = القيم: الخير والجمال'},
      {type:'text',code:'ابن رشد الفيلسوف الأندلسي اشتهر بـ:',opts:['الكيمياء','شرح أرسطو','الطب فقط','الفلك'],correct:1,hint:'لُقِّب بـ "الشارح الأكبر" لأرسطو'},
    ]
  }
};

let currentGameSubj = 'arabic';
function getGameData(){
  return GAME_DATA[currentGameSubj] || GAME_DATA.arabic;
}

function addPoints(n){
  let total=parseInt(localStorage.getItem('totalPoints')||'0')+n;
  localStorage.setItem('totalPoints',total);
  document.querySelectorAll('.points-display').forEach(el=>el.textContent=total.toLocaleString());
}

// ============================================================
// STATE
// ============================================================
let currentRole = 'student';
let currentSubjectId = 'cs';
let currentChatSubject = '';
let podPlaying = false, podVal = 0, podInterval;
let qIndex = 0, quizScore = 0;
let currentQuizMode = 'level';
let currentQuizSubject = 'cs';
let currentQuizSet = 0;
let ltIdx = 0, ltScore = 0, ltSubj = '';
let gqIdx = 0, gqScore = 0, gqQuestions = [];
let matchSelected = null, matchDone = 0;
let riddleIdx = 0;
let puzzleIdx = 0;
let afterTestAction = 'lesson';

const qs = [
  {q:'ما هو الذكاء الاصطناعي؟',opts:['محاكاة ذكاء الإنسان في الحاسوب','برنامج لتشغيل الألعاب','نوع من الشبكات الاجتماعية','جهاز تخزين'],ans:0},
  {q:'ما هي لغة البرمجة الأكثر استخداماً في AI؟',opts:['Java','C++','Python','HTML'],ans:2},
  {q:'ما معنى خوارزمية في البرمجة؟',opts:['نوع من الأجهزة','خطوات منظمة لحل مشكلة','لغة برمجة','قاعدة بيانات'],ans:1},
  {q:'ما هو التعلم الآلي؟',opts:['تعليم الإنسان عبر الإنترنت','تعلم الحاسوب من البيانات تلقائياً','برنامج تعليمي','حاسوب محمول'],ans:1},
  {q:'ما هو الشبكة العصبية الاصطناعية؟',opts:['شبكة إنترنت','نظام مستوحى من الدماغ البشري','برنامج فيروسي','نوع من قواعد البيانات'],ans:1}
];

const QUIZ_SETS = [
  qs,
  [
    {q:'ما المقصود بالمصفوفة في الرياضيات؟',opts:['مجموعة نقاط','جدول أرقام','خط بياني','دالة'],ans:1},
    {q:'ما هو مشتق الدالة؟',opts:['الناتج بعد التكامل','معدل التغير اللحظي','مساحة تحت المنحنى','خط متوسط'],ans:1},
    {q:'ما هو التفاعل الكيميائي؟',opts:['تغير في الزمان','عملية تحول المواد إلى مواد جديدة','احتواء المواد على الماء','كتلة ثابتة'],ans:1},
    {q:'ما المقصود بالبرمجة؟',opts:['كتابة تعليمات للحاسوب','تصميم شكل التطبيق','تشغيل الحاسوب','تحميل البيانات'],ans:0},
    {q:'ما هو الشبكة العصبية الاصطناعية؟',opts:['نموذج للتعلم التلقائي','حاسوب متصل بالإنترنت','مجموعة من البرامج','سيرفر ويب'],ans:0}
  ]
];

// ============================================================
// NAVIGATION
// ============================================================
function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>{s.style.display='none';s.classList.remove('active');});
  const s=document.getElementById(id);
  if(s){s.style.display='flex';s.classList.add('active');}
}
function showRoles(){ showScreen('roles'); }
function showRegister(){ showScreen('register'); }

function showLogin(role){
  currentRole=role;
  showScreen('login');
  const badge=document.getElementById('login-badge');
  const extras=document.getElementById('student-login-extras');
  const map={student:{icon:'🎓',label:'طالب',cls:'lb-s'},teacher:{icon:'👩‍🏫',label:'معلم',cls:'lb-t'},parent:{icon:'👨‍👩‍👦',label:'ولي أمر',cls:'lb-p'},admin:{icon:'⚙️',label:'مدير',cls:'lb-a'}};
  const r=map[role];
  badge.textContent=r.icon+' '+r.label;
  badge.className='login-badge '+r.cls;
  extras.style.display=role==='student'?'block':'none';
}

function doLogin(){
  if(currentRole==='student'){
    const specEl=document.getElementById('spec-sel');
    const gradeEl=document.getElementById('grade-sel');
    const spec = specEl ? specEl.value||'sci' : 'sci';
    const grade = gradeEl ? gradeEl.value : 'الأول الثانوي';
    localStorage.setItem('currentSpec', spec);
    localStorage.setItem('currentGrade', grade);
    const specLabels={sci:'علمي — علوم', scimath:'علمي — رياضة', lit:'أدبي'};
    const specLabel = specLabels[spec]||spec;
    const roleEl=document.getElementById('s-userrole');
    if(roleEl) roleEl.textContent=grade+' · '+specLabel;
    const gradeTextEl=document.getElementById('s-home-grade');
    if(gradeTextEl) gradeTextEl.textContent=grade+' — '+specLabel+' · المنهج 2025-2026';
    showScreen('student-dash');
    renderSubjects();
    renderDailySuggestions();
    renderAIRecommendations();
    renderHomeCharts();
  } else {
    showScreen(currentRole+'-dash');
  }
}

function doRegister(){
  alert('تم إنشاء حسابك بنجاح! 🎉\nرقم حسابك: SLHS-2025-'+ Math.floor(Math.random()*90000+10000)+'\nيمكنك تسجيل الدخول الآن.');
  showRoles();
  showScreen('landing');
}

const homeChartState = {
  pie:[62.5,25,12.5],
  pieLabels:['مكتملة','جارية','لم تبدأ'],
  pieColors:['#36B847','#FF8C42','#E24B4A'],
  lineScores:[68,74,79,75,82,78],
  lineLabels:['اختبار 1','2','3','4','5','6'],
  ringValue:67,
  description:'آخر اختبار 78%، الأداء مستقر مع فرصة لتحسين الرياضيات.'
};

const homeChartDatasets = {
  general:{
    pie:[62.5,25,12.5],
    pieLabels:['مكتملة','جارية','لم تبدأ'],
    pieColors:['#36B847','#FF8C42','#E24B4A'],
    lineScores:[68,74,79,75,82,78],
    lineLabels:['اختبار 1','2','3','4','5','6'],
    ringValue:67,
    description:'آخر اختبار 78%، الأداء مستقر مع فرصة لتحسين الرياضيات.'
  },
  math:{
    pie:[54,30,16],
    pieLabels:['مكتملة','جارية','لم تبدأ'],
    pieColors:['#2563EB','#3B82F6','#93C5FD'],
    lineScores:[72,76,81,79,86,88],
    lineLabels:['اختبار 1','2','3','4','5','6'],
    ringValue:78,
    description:'رياضيات: تحسّن واضح في الأداء خلال الأسابيع الأخيرة.'
  },
  science:{
    pie:[68,22,10],
    pieLabels:['مكتملة','جارية','لم تبدأ'],
    pieColors:['#16A085','#2ECC71','#6EE7B7'],
    lineScores:[65,70,74,72,80,84],
    lineLabels:['اختبار 1','2','3','4','5','6'],
    ringValue:74,
    description:'علوم: أداء مستمر مع تركيز إضافي على التجارب العملية.'
  },
  arabic:{
    pie:[75,18,7],
    pieLabels:['مكتملة','جارية','لم تبدأ'],
    pieColors:['#C53030','#E53E3E','#FEB2B2'],
    lineScores:[78,82,85,83,88,90],
    lineLabels:['اختبار 1','2','3','4','5','6'],
    ringValue:81,
    description:'عربي: مستوى ممتاز مع تقدم مستمر في القراءة والأدب.'
  }
};

function updateHomeCharts(dataset){
  const data = homeChartDatasets[dataset] || homeChartDatasets.general;
  Object.assign(homeChartState,data);
  document.querySelectorAll('.chart-switcher .small-btn').forEach(btn=>{
    btn.classList.toggle('active',btn.dataset.set===dataset);
  });
  renderHomeCharts();
}

function renderHomeCharts(){
  const pieEl=document.getElementById('study-pie');
  const pieCore=document.getElementById('study-pie-core');
  const legendEl=document.getElementById('study-legend');
  if(pieEl && pieCore && legendEl){
    const {pie,pieLabels,pieColors}=homeChartState;
    const stops=[];
    let start=0;
    pie.forEach((value,i)=>{
      const end=start+value;
      stops.push(`${pieColors[i]} ${start}% ${end}%`);
      start=end;
    });
    pieEl.style.background=`conic-gradient(${stops.join(', ')})`;
    pieCore.innerHTML=`${pie[0]}%<span>${pieLabels[0]}</span>`;
    legendEl.innerHTML=pie.map((value,i)=>
      `<div><span class="legend-dot" style="background:${pieColors[i]}"></span>${pieLabels[i]} — ${value}%</div>`
    ).join('');
  }

  const pathEl=document.getElementById('home-line-path');
  const dotEls=document.querySelectorAll('#home-line-svg .home-line-dot');
  const scoreEl=document.getElementById('home-line-score');
  const descEl=document.getElementById('home-line-description');
  const trendEl=document.getElementById('home-line-trend');
  if(pathEl && dotEls.length){
    const {lineScores,lineLabels}=homeChartState;
    const minScore=60, maxScore=90;
    const points=lineScores.map((score,i)=>{
      const x=30 + i*50;
      const normalized=(score-minScore)/(maxScore-minScore);
      const y=145 - normalized*60;
      return {x,y,score};
    });
    const d=points.map((pt,i)=> i===0?`M${pt.x} ${pt.y}`:`L${pt.x} ${pt.y}`).join(' ');
    pathEl.setAttribute('d',d);
    dotEls.forEach((dot,i)=>{
      if(points[i]){ dot.setAttribute('cx',points[i].x); dot.setAttribute('cy',points[i].y); }
    });
    const avg=Math.round(lineScores.reduce((sum,v)=>sum+v,0)/lineScores.length);
    if(scoreEl) scoreEl.textContent=`${avg}%`;
    const labelEls=document.querySelectorAll('#home-line-svg text');
    labelEls.forEach((text,i)=>{ if(lineLabels[i]) text.textContent=lineLabels[i]; });
    if(descEl) descEl.textContent=homeChartState.description || `آخر اختبار ${lineScores[lineScores.length-1]}%، الأداء مستقر مع فرصة لتحسين الرياضيات.`;
    const lastDiff=lineScores[lineScores.length-1]-lineScores[lineScores.length-2];
    if(trendEl){
      trendEl.textContent = lastDiff >= 0 ? '📈 طالع' : '📉 نازل';
      trendEl.className = `trend-tag ${lastDiff >= 0 ? 'tu' : 'td'}`;
    }
  }

  const ringFill=document.getElementById('home-ring-fill');
  if(ringFill){
    const pct=homeChartState.ringValue;
    const circumference=276;
    const offset=circumference*(1 - pct/100);
    ringFill.style.strokeDashoffset=offset;
  }
}

function toggleRegFields(){
  const role=document.getElementById('reg-role').value;
  document.getElementById('reg-student-fields').classList.toggle('hidden',role!=='student');
  document.getElementById('reg-teacher-fields').classList.toggle('hidden',role!=='teacher');
  document.getElementById('reg-parent-fields').classList.toggle('hidden',role!=='parent');
}

// ============================================================
// TAB FUNCTIONS
// ============================================================
function sTab(name, el){
  document.querySelectorAll('#student-dash [id^="st-"]').forEach(t=>t.classList.add('hidden'));
  document.querySelectorAll('#student-dash .nav-item').forEach(n=>n.classList.remove('active'));
  const t=document.getElementById('st-'+name);
  if(t)t.classList.remove('hidden');
  if(el)el.classList.add('active');
  const titles={home:'الرئيسية',performance:'تقرير الأداء',subjects:'موادي الدراسية',ai:'مساعد الذكاء الاصطناعي',tests:'الاختبارات',schedule:'جدول الحصص',messages:'رسالة لمعلمي',rooms:'الغرف التفاعلية',library:'المكتبة',media:'قناة مدرستنا',tarbawi:'الإعلام التربوي',courses:'الدورات التدريبية'};
  document.getElementById('s-page-title').textContent=titles[name]||'SmartLearn HS';
  if(name==='subjects') renderSubjects();
  if(name==='home'){ renderAIRecommendations(); }
  if(name==='performance'){ renderHomeCharts(); }
}
// Teacher tabs
function tTab(name, el){
  document.querySelectorAll('#teacher-dash [id^="tt-"]').forEach(t=>t.classList.add('hidden'));
  document.querySelectorAll('#teacher-dash .nav-item').forEach(n=>n.classList.remove('active'));
  const t=document.getElementById('tt-'+name);
  if(t)t.classList.remove('hidden');
  if(el)el.classList.add('active');
  const titles={home:'المعلم',students:'إدارة الطلاب',content:'رفع المحتوى',broadcast:'البث المباشر','ai-tools':'توليد محتوى AI',schedule:'جدول الحصص',messages:'رسائل الطلاب',tarbawi:'الإعلام التربوي'};
  document.getElementById('t-page-title').textContent=titles[name]||'SmartLearn HS';
}
// Parent tabs
function pTab(name, el){
  document.querySelectorAll('#parent-dash [id^="pt-"]').forEach(t=>t.classList.add('hidden'));
  document.querySelectorAll('#parent-dash .nav-item').forEach(n=>n.classList.remove('active'));
  const t=document.getElementById('pt-'+name);
  if(t)t.classList.remove('hidden');
  if(el)el.classList.add('active');
  const titles={home:'ولي الأمر',children:'متابعة الأبناء',tarbawi:'نصائح تربوية',messages:'التواصل مع المعلمين',schedule:'مواعيد البث'};
  document.getElementById('p-page-title').textContent=titles[name]||'SmartLearn HS';
}
// Admin tabs
function aTab(name, el){
  document.querySelectorAll('#admin-dash [id^="at-"]').forEach(t=>t.classList.add('hidden'));
  document.querySelectorAll('#admin-dash .nav-item').forEach(n=>n.classList.remove('active'));
  const t=document.getElementById('at-'+name);
  if(t)t.classList.remove('hidden');
  if(el)el.classList.add('active');
  const titles={home:'الإدارة',teachers:'قبول المعلمين',reports:'تقارير المنصة',security:'الأمن والصلاحيات',schedule:'جدول الحصص',broadcast:'إدارة البث'};
  document.getElementById('a-page-title').textContent=titles[name]||'SmartLearn HS';
}

// ============================================================
// MODALS
// ============================================================
function openModal(id){ document.getElementById(id).classList.add('open'); }
function closeModal(id){ document.getElementById(id).classList.remove('open'); }

function approveContent(btn){
  const item = btn.closest('div');
  if(item){ item.style.opacity='0.65'; item.style.pointerEvents='none'; }
  alert('✅ تمت الموافقة على المحتوى وسيُعرض بعد التحقق');
}

function rejectContent(btn){
  const item = btn.closest('div');
  if(item){ item.style.opacity='0.65'; item.style.pointerEvents='none'; }
  alert('⚠️ تم رفض المحتوى. يرجى التواصل مع المعلم للمراجعة');
}

function editAdminSchedule(btn){
  const row = btn.closest('tr');
  if(!row) return;
  const time = prompt('الوقت الجديد', row.cells[3].textContent);
  const day = prompt('اليوم الجديد', row.cells[4].textContent);
  if(time) row.cells[3].textContent = time;
  if(day) row.cells[4].textContent = day;
  alert('✅ تم تعديل الجدول');
}

function editBroadcast(btn){
  alert('يمكن تعديل بيانات البث مباشرة من خلال جدول البث أو إعادة جدولة الحصة.');
}

function endBroadcast(btn){
  const row = btn.closest('tr');
  if(row){
    row.cells[4].innerHTML = '<span class="badge b-warn">متوقف</span>';
    btn.textContent = 'معاد جدولة';
  }
}

// — البث المباشر لقناة مدرستنا —
function openLiveBroadcast(){ openModal('live-broadcast-modal'); }
document.querySelectorAll('.modal-overlay').forEach(m=>{ m.addEventListener('click',e=>{ if(e.target===m)m.classList.remove('open'); }); });

// ============================================================
// SUBJECTS GRID
// ============================================================
function renderSubjects(){
  const grid = document.getElementById('subjects-grid');
  if(!grid) return;
  const trackLabels = {sci:'علمي علوم',scimath:'علمي رياضة',lit:'أدبي'};
  grid.innerHTML = SUBJECTS.map(s=>{
    const prog = parseInt(localStorage.getItem('prog_'+s.id)||'0');
    const lvl = sessionStorage.getItem('level_'+s.id)||'';
    const trackBadge = s.tracks.map(t=>trackLabels[t]).join(' • ');
    const lvlBadge = lvl ? `<span class="badge ${lvl==='ممتاز'?'b-suc':lvl==='متوسط'?'b-warn':'b-org'}" style="font-size:10px;">${lvl}</span>` : '';
    return `<div class="skill-card" style="border-right:4px solid ${s.color};cursor:pointer;" onclick="openSubject('${s.id}')">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
        <div style="width:52px;height:52px;border-radius:14px;background:linear-gradient(135deg,${s.color}22,${s.color}44);display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0;">${s.icon}</div>
        <div style="flex:1;min-width:0;">
          <div style="font-size:14px;font-weight:700;margin-bottom:3px;">${s.name}</div>
          <div style="display:flex;gap:5px;align-items:center;flex-wrap:wrap;">
            ${lvlBadge}
            <span style="font-size:11px;color:var(--tx3);">${trackBadge}</span>
          </div>
        </div>
      </div>
      <div class="prog-row" style="margin-bottom:5px;"><span style="font-size:11px;">التقدم</span><span style="font-size:11px;font-weight:700;color:${s.color};">${prog}%</span></div>
      <div class="prog-bar"><div class="prog-fill" style="width:${prog}%;background:${s.color};"></div></div>
      <button class="btn-pr" style="width:100%;padding:10px;font-size:13px;margin-top:14px;background:linear-gradient(135deg,${s.color},${s.color}cc);" onclick="event.stopPropagation();openSubject('${s.id}')">ادخل المادة ←</button>
    </div>`;
  }).join('');
}

function renderDailySuggestions(){
  const spec=localStorage.getItem('currentSpec')||'sci';
  const shuffled=[...SUBJECTS].filter(s=>s.tracks.includes(spec)).sort(()=>Math.random()-.5).slice(0,3);
  const cont = document.getElementById('daily-suggestions');
  if(!cont) return;
  cont.innerHTML = shuffled.map(s=>`<div class="skill-card" style="cursor:pointer;border-right:4px solid ${s.color};" onclick="sTab('subjects',null);openSubject('${s.id}')">
    <div style="font-size:28px;margin-bottom:6px;">${s.icon}</div>
    <div style="font-size:13px;font-weight:700;margin-bottom:3px;">${s.name}</div>
    <div style="font-size:11px;color:var(--tx3);">ابدأ التعلم الآن</div>
  </div>`).join('');
}

// ============================================================
// AI RECOMMENDATIONS — توصيات ذكية حسب مستوى الطالب
// ============================================================
function renderAIRecommendations(forceShuffle){
  const cont = document.getElementById('ai-recommendations');
  if(!cont) return;
  const spec = localStorage.getItem('currentSpec') || 'sci';
  const grade = localStorage.getItem('currentGrade') || 'الأول الثانوي';
  const subjects = SUBJECTS.filter(s=>s.tracks.includes(spec));

  // اجمع المواد مع مستويات الطالب من localStorage
  const withLevel = subjects.map(s=>({
    s,
    level: sessionStorage.getItem('level_'+s.id) || null,
    progress: parseInt(localStorage.getItem('prog_'+s.id)||'0')
  }));

  // اختر مادة تحتاج درساً مقترحاً (الأقل تقدماً) ومادة تحتاج مراجعة (الأضعف مستوى)
  const sortedByProgress = [...withLevel].sort((a,b)=>a.progress-b.progress);
  const sortedByLevel = [...withLevel].filter(x=>x.level).sort((a,b)=>{
    const order={'ضعيف':0,'متوسط':1,'ممتاز':2};
    return (order[a.level]??1)-(order[b.level]??1);
  });

  // إن كان forceShuffle، اخلط النتائج
  const lessonRec = forceShuffle ? sortedByProgress[Math.floor(Math.random()*Math.min(3,sortedByProgress.length))] : sortedByProgress[0];
  const reviewRec = sortedByLevel[0] || withLevel[Math.floor(Math.random()*withLevel.length)];

  const lessonUnit = lessonRec ? (SUBJECT_UNITS[lessonRec.s.id]||[])[0] : null;
  const lessonReason = lessonRec
    ? (lessonRec.progress<20 ? 'لم تبدئي بعد — وقت ممتاز للانطلاق'
       : lessonRec.progress<60 ? `أنجزت ${lessonRec.progress}% — أكملي الزخم`
       : `قاربتِ على الإتمام (${lessonRec.progress}%) — اختمي بقوة`)
    : '';

  const reviewLevel = reviewRec?.level || 'لم يحدد';
  const reviewMsg = {
    'ضعيف':'مراجعة مبسطة من البداية — مع شرح خطوة بخطوة',
    'متوسط':'مراجعة متوازنة تركز على نقاط الضعف الشائعة',
    'ممتاز':'مراجعة سريعة + تحديات تعمّق فهمك'
  }[reviewLevel] || 'حدّدي مستواك أولاً للحصول على مراجعة مخصّصة';

  let html = '';
  if(lessonRec){
    const s = lessonRec.s;
    html += `<div style="background:#fff;border:1px solid var(--bdr);border-radius:var(--r2);padding:14px;border-right:4px solid ${s.color};">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
        <div style="width:34px;height:34px;border-radius:9px;background:linear-gradient(135deg,${s.color}22,${s.color}44);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">${s.icon}</div>
        <div style="flex:1;min-width:0;">
          <div style="font-size:11px;color:#7B3ADB;font-weight:700;margin-bottom:1px;">📚 درس مقترح</div>
          <div style="font-size:13px;font-weight:700;">${s.name}</div>
        </div>
      </div>
      <div style="font-size:11px;color:var(--tx2);margin-bottom:6px;line-height:1.6;">${lessonUnit||s.name}</div>
      <div style="font-size:11px;color:var(--tx3);margin-bottom:10px;">💡 ${lessonReason}</div>
      <button class="btn-pr" style="width:100%;padding:8px;font-size:12px;background:${s.color};" onclick="openSubject('${s.id}')">ابدئي الدرس ←</button>
    </div>`;
  }
  if(reviewRec){
    const s = reviewRec.s;
    const lvlBadge = reviewRec.level
      ? `<span class="badge ${reviewRec.level==='ممتاز'?'b-suc':reviewRec.level==='متوسط'?'b-warn':'b-org'}" style="font-size:10px;">${reviewRec.level}</span>`
      : '';
    html += `<div style="background:#fff;border:1px solid var(--bdr);border-radius:var(--r2);padding:14px;border-right:4px solid #7B3ADB;">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
        <div style="width:34px;height:34px;border-radius:9px;background:linear-gradient(135deg,#7B3ADB22,#9B5AE544);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">🔁</div>
        <div style="flex:1;min-width:0;">
          <div style="font-size:11px;color:#7B3ADB;font-weight:700;margin-bottom:1px;">🎯 مراجعة حسب مستواك ${lvlBadge}</div>
          <div style="font-size:13px;font-weight:700;">${s.name}</div>
        </div>
      </div>
      <div style="font-size:11px;color:var(--tx2);margin-bottom:10px;line-height:1.6;">${reviewMsg}</div>
      <button class="btn-pr" style="width:100%;padding:8px;font-size:12px;background:linear-gradient(135deg,#7B3ADB,#9B5AE5);" onclick="openAIGen('review','${s.id}')">ولّدي مراجعة AI الآن ✨</button>
    </div>`;
  }
  if(!html){
    html = `<div style="grid-column:1/-1;padding:14px;background:#fff;border-radius:var(--r2);text-align:center;color:var(--tx3);font-size:12px;">حدّدي مستواك في إحدى المواد للحصول على توصيات مخصّصة.</div>`;
  }
  cont.innerHTML = html;
}

function levelConfirmed(subjId){
  return sessionStorage.getItem('level_'+subjId) && sessionStorage.getItem('level_passed_'+subjId) === 'true';
}

function hasPassedPostLessonQuiz(subjId){
  return sessionStorage.getItem('post_lesson_passed_'+subjId) === 'true';
}

function markPostLessonQuizPassed(subjId, passed){
  sessionStorage.setItem('lesson_started_'+subjId, 'true');
  sessionStorage.setItem('post_lesson_passed_'+subjId, passed ? 'true' : 'false');
}

function updateLessonModalGateNote(){
  const subjectId = currentSubjectId || ltSubj || 'cs';
  const note = document.getElementById('lt-quiz-gate-note');
  if(!note) return;
  if(hasPassedPostLessonQuiz(subjectId)){
    note.classList.remove('hidden');
    note.style.borderColor = '#36B847';
    note.style.background = '#E6FFE8';
    note.style.color = '#1B8A30';
    note.textContent = '✅ الاختبار بعد الدرس مكتمل. يمكنك متابعة الدرس التالي عندما تكوني جاهزة.';
  } else if(sessionStorage.getItem('lesson_started_'+subjectId) === 'true'){
    note.classList.remove('hidden');
    note.style.borderColor = '#E24B4A';
    note.style.background = '#FEECEC';
    note.style.color = '#A32D2D';
    note.textContent = '⚠️ يجب حل الاختبار بعد الدرس قبل متابعة الدرس التالي. اضغطي "اختبار بعدي" لإكمال الاختبار.';
  } else {
    note.classList.add('hidden');
  }
}

function openSubject(subjId){
  currentSubjectId = subjId;
  const s = SUBJECTS.find(x=>x.id===subjId);
  if(!s) return;
  document.getElementById('subj-modal-title').textContent = s.name;
  document.getElementById('subj-modal-icon').textContent = s.icon;
  document.getElementById('subj-modal-icon').style.background = `linear-gradient(135deg,${s.color}22,${s.color}44)`;
  const lvl = sessionStorage.getItem('level_'+subjId);
  const confirmed = levelConfirmed(subjId);
  const badge = document.getElementById('subj-level-badge');
  const banner = document.getElementById('subj-level-banner');
  const note = document.getElementById('subj-level-note');
  if(confirmed){
    badge.textContent = 'المستوى: '+lvl;
    badge.className = 'badge '+(lvl==='ممتاز'?'b-suc':lvl==='متوسط'?'b-warn':'b-org');
    if(banner) banner.style.display='none';
  } else if(lvl){
    badge.textContent = 'المستوى محفوظ — أعد الاختبار';
    badge.className = 'badge b-warn';
    if(banner) banner.style.display='flex';
    if(note) note.textContent = 'مستواك محفوظ سابقاً، لكن يجب إعادة اختبار المستوى في هذه الجلسة قبل بدء الدرس.';
  } else {
    badge.textContent = 'حدد مستواك أولاً';
    badge.className = 'badge b-warn';
    if(banner) banner.style.display='flex';
    if(note) note.textContent = 'لن يتم فتح الدروس أو أي محتوى متقدّم في هذه المادة قبل اجتياز اختبار تحديد المستوى.';
  }
  // Book pane
  const bookLinks = document.getElementById('sp-book-links');
  if(bookLinks){
    let html = `<a href="https://drive.google.com/file/d/${s.bookId}/view" target="_blank" class="btn-pr" style="padding:12px 20px;text-decoration:none;display:inline-block;margin-bottom:8px;">📖 فتح الكتاب المدرسي</a>`;
    if(s.extras) s.extras.forEach(e=>{
      html += `<a href="https://drive.google.com/file/d/${e.id}/view" target="_blank" class="btn-out" style="padding:10px 20px;text-decoration:none;display:inline-block;margin-bottom:6px;">${e.title}</a>`;
    });
    bookLinks.innerHTML = html;
  }
  document.getElementById('sp-book-title').textContent = 'الكتاب المدرسي — '+s.name;
  // Explain pane
  const units = SUBJECT_UNITS[subjId]||SUBJECT_UNITS.cs;
  const explainEl = document.getElementById('sp-explain-units');
  const lessonAction = confirmed ?
    (idx=>`startLessonFromSubject('${subjId}',${idx})`)
    : (idx=>`prepareSubjectLevelTest('${subjId}')`);
  if(explainEl) explainEl.innerHTML = units.map((u,i)=>{
    const btnText = confirmed ? 'ابدأ' : 'ابدأ اختبار المستوى أولاً';
    return `
      <div class="lesson-item">
        <div class="l-num" style="background:${s.color}22;color:${s.color};">${i+1}</div>
        <div class="l-info"><div class="l-name">${u}</div><div class="l-meta">~45 دقيقة · ${i===0?'متاح':'مقفل'}</div></div>
        <button class="btn-pr" style="font-size:11px;padding:7px 14px;background:${s.color};" onclick="${lessonAction(i)}">${btnText}</button>
      </div>`;
  }).join('');
  // PDF pane
  const pdfEl = document.getElementById('sp-pdf-links');
  if(pdfEl) pdfEl.innerHTML = [`ملخص الوحدة الأولى — ${s.name}`,`ورقة عمل — ${s.name}`,`مراجعة شاملة — ${s.name}`].map((title,i)=>`
    <a href="https://drive.google.com/file/d/${s.bookId}/view" target="_blank" style="padding:12px 14px;background:var(--bg);border-radius:var(--r2);border:1px solid var(--bdr);display:flex;align-items:center;gap:12px;text-decoration:none;color:var(--tx);">
      <div style="width:36px;height:36px;background:linear-gradient(135deg,${s.color}22,${s.color}44);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px;">📄</div>
      <div><div style="font-size:13px;font-weight:600;">${title}</div><div style="font-size:11px;color:var(--tx3);">PDF · Google Drive</div></div>
      <span style="margin-right:auto;font-size:16px;color:var(--tx3);">←</span>
    </a>`).join('');
  // Videos pane
  const vids = SUBJECT_VIDEOS[subjId]||SUBJECT_VIDEOS.cs;
  const vidEl = document.getElementById('sp-videos-grid');
  if(vidEl) vidEl.innerHTML = vids.map(v=>`
    <div class="card" style="cursor:pointer;text-align:center;" onclick="window.open('https://www.youtube.com/results?search_query=${encodeURIComponent(v)}','_blank')">
      <div style="font-size:32px;margin-bottom:8px;">🎬</div>
      <div style="font-size:12px;font-weight:600;line-height:1.5;">${v}</div>
      <div style="font-size:10px;color:var(--tx3);margin-top:4px;">YouTube ↗</div>
    </div>`).join('');
  // Exercise pane — load first question
  loadSubjectExercise(subjId, 0);
  // Podcast
  const podTitle = document.getElementById('sp-pod-title');
  if(podTitle) podTitle.textContent = 'بودكاست — '+s.name;
  // AI tools pane — student-side per-subject generators
  renderSubjectAITools(subjId);
  openModal('subject-modal');
  subjectInnerTab('book', document.querySelector('#subj-tab-bar .subj-tab'));
}

function openQuizPicker(mode){
  currentQuizMode = mode || 'level';
  currentQuizSubject = currentSubjectId || 'cs';
  const titleEl = document.getElementById('quiz-pick-title');
  const subtitleEl = document.querySelector('#quiz-step-pick .modal-sub');
  const grid = document.getElementById('quiz-subjects-grid');
  const typeTitles = {
    level: 'اختبار تحديد المستوى',
    quick: 'اختبار سريع',
    adaptive: 'اختبار تكيفي AI'
  };
  const typeSubs = {
    level: 'اختر مادة لبدء اختبار تحديد المستوى.',
    quick: 'اختر مادة لبدء اختبار سريع مكوّن من 5 أسئلة.',
    adaptive: 'اختر مادة لبدء اختبار تكيفي حسب مستواك في المادة.'
  };
  if(titleEl) titleEl.textContent = '📚 '+(typeTitles[currentQuizMode]||'اختر المادة');
  if(subtitleEl) subtitleEl.textContent = typeSubs[currentQuizMode] || 'اختر مادة لبدء الاختبار.';
  if(grid){
    grid.innerHTML = SUBJECTS.map(s=>`
      <div class="card" style="text-align:center;cursor:pointer;border-right:3px solid ${s.color};" onclick="selectQuizSubject('${s.id}')">
        <div style="font-size:32px;margin-bottom:10px;">${s.icon}</div>
        <div style="font-size:13px;font-weight:700;margin-bottom:5px;">${s.name}</div>
        <div style="font-size:11px;color:var(--tx3);margin-bottom:12px;">${s.tracks.includes('lit') ? 'متاح لجميع التخصصات' : 'مادة مستقلة'}</div>
        <button class="btn-pr" style="font-size:12px;width:100%;padding:9px 0;" onclick="event.stopPropagation();selectQuizSubject('${s.id}')">اختر المادة</button>
      </div>`).join('');
  }
  document.getElementById('quiz-step-pick')?.classList.remove('hidden');
  document.getElementById('quiz-step-questions')?.classList.add('hidden');
  document.getElementById('quiz-step-result')?.classList.add('hidden');
  openModal('quiz-modal');
}

function selectQuizSubject(subjId){
  currentQuizSubject = subjId;
  if(currentQuizMode === 'level'){
    closeModal('quiz-modal');
    prepareSubjectLevelTest(subjId);
    return;
  }
  const s = SUBJECTS.find(x=>x.id===subjId) || SUBJECTS[0];
  const typeLabels = {
    quick: 'اختبار سريع',
    adaptive: 'اختبار تكيفي AI'
  };
  document.getElementById('quiz-title-dyn').textContent = `${typeLabels[currentQuizMode] || 'اختبار'} — ${s.name}`;
  document.getElementById('quiz-subject-name').textContent = s.name;
  currentQuizSet = currentQuizMode === 'adaptive' ? 1 : 0;
  qIndex = 0;
  document.getElementById('quiz-step-pick')?.classList.add('hidden');
  document.getElementById('quiz-step-questions')?.classList.remove('hidden');
  document.getElementById('quiz-step-result')?.classList.add('hidden');
  document.querySelector('.quiz-container')?.style.setProperty('display','block');
  loadQ(0);
}

function renderSubjectAITools(subjId){
  const grid = document.getElementById('sp-aitools-grid');
  if(!grid) return;
  const s = SUBJECTS.find(x=>x.id===subjId);
  if(!s) return;
  const tools = [
    {type:'explain',  icon:'🎓', title:'شرح مفصل',     sub:'شرح خطوة بخطوة بأمثلة من حياتك'},
    {type:'summary',  icon:'📋', title:'ملخص الدرس',   sub:'نقاط محورية مرتبة'},
    {type:'quiz',     icon:'📝', title:'اختبر نفسك',  sub:'10 أسئلة MCQ مع الإجابات'},
    {type:'exercises',icon:'✍️', title:'تمارين متدرجة',sub:'8 تمارين من السهل للصعب'},
    {type:'review',   icon:'🔁', title:'مراجعة سريعة', sub:'لما قبل الامتحان مباشرة'},
    {type:'mindmap',  icon:'🗺️', title:'خريطة ذهنية',  sub:'مفاهيم مترابطة نصياً'},
  ];
  grid.innerHTML = tools.map(t=>`
    <div class="card" style="text-align:center;cursor:pointer;border-right:3px solid ${s.color};" onclick="openAIGen('${t.type}','${subjId}')">
      <div style="font-size:30px;margin-bottom:6px;">${t.icon}</div>
      <div style="font-size:13px;font-weight:700;margin-bottom:3px;">${t.title}</div>
      <div style="font-size:11px;color:var(--tx3);margin-bottom:10px;line-height:1.5;">${t.sub}</div>
      <button class="btn-pr" style="font-size:11px;width:100%;padding:8px;background:${s.color};" onclick="event.stopPropagation();openAIGen('${t.type}','${subjId}')">ولّد الآن ✨</button>
    </div>`).join('');
}

function subjectInnerTab(name, el){
  document.querySelectorAll('#subject-modal .subj-pane').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('#subj-tab-bar .subj-tab').forEach(t=>t.classList.remove('active'));
  const p=document.getElementById('sp-'+name);
  if(p)p.classList.add('active');
  if(el)el.classList.add('active');
}

function loadSubjectExercise(subjId, idx){
  const tests = LEVEL_TESTS[subjId]||LEVEL_TESTS.default;
  const q = tests[idx % tests.length];
  const qEl = document.getElementById('exercise-q');
  const optsEl = document.getElementById('exercise-opts');
  const fbEl = document.getElementById('exercise-feedback');
  if(!qEl) return;
  qEl.textContent = q.q;
  if(fbEl) fbEl.classList.add('hidden');
  optsEl.innerHTML = q.opts.map((o,i)=>`
    <button class="quiz-choice" onclick="answerExercise(this,${i===q.ans})">${o}</button>`).join('');
}

function answerExercise(btn, correct){
  document.querySelectorAll('#sp-exercises .quiz-choice').forEach(b=>b.disabled=true);
  btn.classList.add(correct?'correct':'wrong');
  const fb = document.getElementById('exercise-feedback');
  if(fb){
    fb.classList.remove('hidden');
    fb.style.background = correct?'#E6FFE8':'#FEECEC';
    fb.style.color = correct?'#1B8A30':'#A32D2D';
    fb.innerHTML = correct ? '✅ إجابة صحيحة! ممتاز' : `❌ إجابة خاطئة. السؤال التالي...`;
    if(!correct) setTimeout(()=>loadSubjectExercise(currentSubjectId, Math.floor(Math.random()*5)), 1200);
  }
}

function openLesson(subjId){ currentSubjectId = subjId || currentSubjectId; startLessonFromSubject(currentSubjectId, 0); }

function continueLesson(subjId){
  const subjectId = subjId || currentSubjectId;
  currentSubjectId = subjectId;
  if(sessionStorage.getItem('lesson_started_'+subjectId) === 'true' && !hasPassedPostLessonQuiz(subjectId)){
    alert('⚠️ يجب حل الاختبار بعد الدرس قبل متابعة الدرس التالي. اضغطي "اختبار بعدي" لإكمال الاختبار.');
    openModal('lesson-modal');
    setupLessonResources();
    updateLessonModalGateNote();
    return;
  }
  openLesson(subjectId);
}

function startLessonFromSubject(subjId, unitIdx){
  if(unitIdx > 0 && !hasPassedPostLessonQuiz(subjId)){
    alert('⚠️ يجب حل الاختبار بعد الدرس السابق قبل فتح الدرس التالي.');
    return;
  }
  if(!levelConfirmed(subjId)){
    ltSubj = subjId;
    afterTestAction = 'lesson';
    startLevelTest();
  } else {
    sessionStorage.setItem('lesson_started_'+subjId, 'true');
    openModal('lesson-modal');
    setupLessonResources();
  }
} 

function prepareSubjectLevelTest(subjId){
  ltSubj = subjId;
  afterTestAction = 'lesson';
  startLevelTest();
}

function switchLessonTab(name, el){
  ['video','ppt','podcast','mindmap','pdf','tarbawi-lesson'].forEach(t=>{ const d=document.getElementById('lt-'+t); if(d)d.classList.add('hidden'); });
  document.querySelectorAll('#lesson-modal .ct').forEach(t=>t.classList.remove('active'));
  const d=document.getElementById('lt-'+name);
  if(d)d.classList.remove('hidden');
  if(el)el.classList.add('active');
}

function getLessonAssetsForLevel(level){
  return LESSON_ASSETS_BY_LEVEL[level] || null;
}

function setupLessonResources(){
  const subjectId = currentSubjectId || ltSubj;
  const level = sessionStorage.getItem('level_'+subjectId) || 'ضعيف';
  const assets = getLessonAssetsForLevel(level);
  if(!assets) return;

  const setIframe = (id, fileId)=>{
    const frame = document.getElementById(id);
    if(frame) frame.src = `https://drive.google.com/file/d/${fileId}/preview`;
  };
  const setLink = (id, fileId)=>{
    const btn = document.getElementById(id);
    if(btn) btn.onclick = ()=>window.open(`https://drive.google.com/file/d/${fileId}/view`, '_blank');
  };
  setIframe('lt-video-iframe', assets.video.id);
  setLink('lt-video-dl', assets.video.id);
  const videoTitle = document.getElementById('lt-video-title');
  const videoSub = document.getElementById('lt-video-sub');
  if(videoTitle) videoTitle.textContent = assets.video.title;
  if(videoSub) videoSub.textContent = assets.video.subtitle;

  setIframe('lt-ppt-iframe', assets.ppt.id);
  setLink('lt-ppt-dl', assets.ppt.id);
  const pptTitle = document.getElementById('lt-ppt-title');
  if(pptTitle) pptTitle.textContent = assets.ppt.title;

  setIframe('lt-pod-iframe', assets.podcast.id);
  setLink('lt-pod-dl', assets.podcast.id);
  const podTitle = document.getElementById('lt-pod-title');
  const podSub = document.getElementById('lt-pod-sub');
  if(podTitle) podTitle.textContent = assets.podcast.title;
  if(podSub) podSub.textContent = assets.podcast.subtitle;

  setIframe('lt-pdf-iframe', assets.pdf.id);
  setLink('lt-pdf-dl', assets.pdf.id);
  const pdfTitle = document.getElementById('lt-pdf-title');
  if(pdfTitle) pdfTitle.textContent = assets.pdf.title;

  setIframe('lt-info-iframe', assets.mindmap.id);
  setLink('lt-info-dl', assets.mindmap.id);
  const infoLabel = document.getElementById('lt-info-label');
  const infoNote = document.getElementById('lt-info-note');
  if(infoLabel) infoLabel.textContent = assets.mindmap.title;
  if(infoNote) infoNote.textContent = assets.mindmap.subtitle;
  const caption = document.getElementById('lt-mindmap-caption');
  if(caption) caption.textContent = `${assets.mindmap.title} — الدرس الأول`;

  setLink('lt-infographic-dl', assets.infographic.id);
  const infographicLabel = document.getElementById('lt-infographic-label');
  if(infographicLabel) infographicLabel.textContent = assets.infographic.title;

  renderMindmapGraphic(level);
  updateLessonModalGateNote();
}

function startPostLessonQuiz(){
  const subjectId = currentSubjectId || ltSubj || 'cs';
  currentQuizSubject = subjectId;
  currentQuizMode = 'postlesson';
  currentQuizSet = 0;
  qIndex = 0;
  quizScore = 0;
  const s = SUBJECTS.find(x=>x.id===subjectId) || SUBJECTS.find(x=>x.id==='cs');
  const titleEl = document.getElementById('quiz-title-dyn');
  const subjectNameEl = document.getElementById('quiz-subject-name');
  const scoreEl = document.getElementById('q-score');
  const totalEl = document.getElementById('q-total');
  if(titleEl) titleEl.textContent = `اختبار بعدي — ${s ? s.name : 'المادة'}`;
  if(subjectNameEl) subjectNameEl.textContent = s ? s.name : 'المادة';
  if(scoreEl) scoreEl.textContent = '0';
  if(totalEl) totalEl.textContent = (QUIZ_SETS[currentQuizSet]||[]).length;
  document.getElementById('quiz-step-pick')?.classList.add('hidden');
  document.getElementById('quiz-step-questions')?.classList.remove('hidden');
  document.getElementById('quiz-step-result')?.classList.add('hidden');
  document.querySelector('.quiz-container')?.style.setProperty('display','block');
  openModal('quiz-modal');
  loadQ(0);
}

function renderMindmapGraphic(level){
  const container = document.getElementById('lt-mindmap-graphic');
  if(!container) return;
  const levelMap = {
    'ضعيف': {
      central: 'الأساسيات',
      nodes: ['ما هو AI؟', 'أنواع الذكاء', 'أمثلة بسيطة', 'البرمجة الأساسية', 'السلامة الرقمية'],
      colors: ['#FF8C42','#3B8FDB','#36B847','#9B5AE5','#E24B4A']
    },
    'متوسط': {
      central: 'المفاهيم الأساسية',
      nodes: ['التعلم الآلي', 'الشبكات العصبية', 'البيانات', 'التطبيقات', 'التحليل'],
      colors: ['#FF8C42','#1B6DB5','#1B8A30','#7B3ADB','#E67E22']
    },
    'ممتاز': {
      central: 'المستوى المتقدم',
      nodes: ['التعلم العميق', 'معالجة اللغة', 'الرؤية الحاسوبية', 'الذكاء الأخلاقي', 'الخوارزميات المتقدمة'],
      colors: ['#FF8C42','#1B6DB5','#36B847','#7B3ADB','#E24B4A']
    }
  };
  const map = levelMap[level] || levelMap['ضعيف'];
  const width = 700;
  const height = 400;
  const lines = [
    {x1:350,y1:175,x2:350,y2:95,stroke:map.colors[0]},
    {x1:350,y1:175,x2:145,y2:150,stroke:map.colors[1]},
    {x1:350,y1:175,x2:555,y2:150,stroke:map.colors[2]},
    {x1:350,y1:175,x2:160,y2:300,stroke:map.colors[3]},
    {x1:350,y1:175,x2:540,y2:300,stroke:map.colors[4]},
  ];
  const nodes = map.nodes.map((text,index)=>{
    const positions = [
      {x:270,y:50,rx:20,fill:'#FFF4ED',stroke:map.colors[0],color:map.colors[0]},
      {x:40,y:130,rx:20,fill:'#E6F4FF',stroke:map.colors[1],color:map.colors[1]},
      {x:520,y:130,rx:20,fill:'#E6FFE8',stroke:map.colors[2],color:map.colors[2]},
      {x:40,y:280,rx:20,fill:'#F0E6FF',stroke:map.colors[3],color:map.colors[3]},
      {x:500,y:280,rx:20,fill:'#FEECEC',stroke:map.colors[4],color:map.colors[4]}
    ];
    const pos = positions[index] || positions[0];
    return `<line x1="350" y1="175" x2="${pos.x+60}" y2="${pos.y+20}" stroke="${pos.stroke}" stroke-width="2"/>
      <rect x="${pos.x}" y="${pos.y}" width="160" height="40" rx="${pos.rx}" fill="${pos.fill}" stroke="${pos.stroke}" stroke-width="1.5"/>
      <text x="${pos.x+80}" y="${pos.y+25}" text-anchor="middle" fill="${pos.color}" font-size="12" font-weight="600">${text}</text>`;
  }).join('');
  container.innerHTML = `
    <svg width="100%" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" font-family="Cairo,sans-serif" direction="rtl">
      <rect x="275" y="175" width="150" height="50" rx="25" fill="#FF8C42"/>
      <text x="350" y="205" text-anchor="middle" fill="white" font-size="14" font-weight="700">${map.central}</text>
      ${nodes}
    </svg>
  `;
}

// ============================================================
// LEVEL TEST
// ============================================================
function startLevelTest(){
  ltIdx = 0; ltScore = 0;
  if(!ltSubj) ltSubj = currentSubjectId;
  const s = SUBJECTS.find(x=>x.id===ltSubj);
  const badge = document.getElementById('lt-subj-badge');
  if(badge) badge.textContent = s ? s.icon+' '+s.name : 'المادة';
  document.getElementById('lt-test-area').classList.remove('hidden');
  document.getElementById('lt-result').classList.add('hidden');
  loadLevelQ(0);
  openModal('level-test-modal');
}

function loadLevelQ(i){
  const tests = LEVEL_TESTS[ltSubj]||LEVEL_TESTS.default;
  const q = tests[i];
  document.getElementById('lt-num').textContent = i+1;
  document.getElementById('lt-prog').style.width = ((i+1)/5*100)+'%';
  document.getElementById('lt-question').textContent = q.q;
  const optsEl = document.getElementById('lt-options');
  optsEl.innerHTML = q.opts.map((o,idx)=>`
    <button class="quiz-choice" onclick="answerLevelQ(this,${idx===q.ans})">${o}</button>`).join('');
}

function answerLevelQ(btn, correct){
  document.querySelectorAll('#lt-options .quiz-choice').forEach(b=>b.disabled=true);
  btn.classList.add(correct?'correct':'wrong');
  if(correct) ltScore++;
  setTimeout(()=>{
    ltIdx++;
    if(ltIdx>=5){ showLevelResult(); return; }
    loadLevelQ(ltIdx);
  }, 800);
}

function showLevelResult(){
  document.getElementById('lt-test-area').classList.add('hidden');
  document.getElementById('lt-result').classList.remove('hidden');
  let level, icon, msg;
  if(ltScore>=4){
    level='ممتاز'; icon='🏆';
    msg=`أحسنت! حصلت على ${ltScore}/5. مستواك ممتاز ✨\nيمكنك الانتقال مباشرة للوحدات المتقدمة.`;
  } else if(ltScore>=2){
    level='متوسط'; icon='📈';
    msg=`أداء جيد! حصلت على ${ltScore}/5. مستواك متوسط.\n💡 ننصح بمشاهدة شرح الوحدات الأولى أولاً ثم المتابعة.`;
  } else {
    level='ضعيف'; icon='💪';
    msg=`حصلت على ${ltScore}/5. لا تقلق!\n📺 ننصح بمشاهدة شرح المادة على YouTube أولاً ثم إعادة الاختبار.`;
  }
  sessionStorage.setItem('level_'+ltSubj, level);
  document.getElementById('lt-result-icon').textContent = icon;
  document.getElementById('lt-result-title').textContent = 'مستواك: '+level;
  document.getElementById('lt-result-msg').textContent = msg;
  // store for adaptive lesson
  renderAdaptiveLessonNote(ltSubj, level);
  // حدّث توصيات AI بناءً على المستوى الجديد
  if(typeof renderAIRecommendations==='function') renderAIRecommendations();
}

function closeLevelTest(){
  if(ltSubj) {
    sessionStorage.setItem('level_passed_'+ltSubj, 'true');
    currentSubjectId = ltSubj;
  }
  closeModal('level-test-modal');
  if(afterTestAction === 'games'){
    afterTestAction = 'lesson';
    initQuizGame();
    openModal('games-modal');
    return;
  }
  openModal('lesson-modal');
  setupLessonResources();
  // refresh level badge in subject modal
  const badge = document.getElementById('subj-level-badge');
  const banner = document.getElementById('subj-level-banner');
  const lvl = sessionStorage.getItem('level_'+ltSubj);
  if(badge&&lvl){
    badge.textContent='المستوى: '+lvl;
    badge.className='badge '+(lvl==='ممتاز'?'b-suc':lvl==='متوسط'?'b-warn':'b-org');
  }
  if(banner) banner.style.display='none';
}

// ============================================================
// FORUM TAB
// ============================================================
function forumTab(name, el){
  ['questions','discuss','help'].forEach(t=>{ const d=document.getElementById('forum-'+t); if(d)d.classList.add('hidden'); });
  document.querySelectorAll('#forum-modal .tab').forEach(t=>t.classList.remove('active'));
  const d=document.getElementById('forum-'+name);
  if(d)d.classList.remove('hidden');
  if(el)el.classList.add('active');
}

// ============================================================
// QUIZ (lesson modal quiz)
// ============================================================
function answerQ(btn, correct){
  const opts=document.querySelectorAll('#quiz-modal .quiz-choice');
  opts.forEach(o=>o.disabled=true);
  btn.classList.add(correct?'correct':'wrong');
  if(correct){
    quizScore++;
    const scoreEl=document.getElementById('q-score');
    if(scoreEl) scoreEl.textContent = quizScore;
  }
  setTimeout(()=>{
    qIndex++;
    const currentQs = QUIZ_SETS[currentQuizSet];
    if(qIndex>=currentQs.length){showQuizResult();return;} loadQ(qIndex);
  },1000);
}
function loadQ(i){
  const currentQs = QUIZ_SETS[currentQuizSet];
  const q=currentQs[i];
  const qEl=document.getElementById('quiz-question');
  const numEl=document.getElementById('q-num');
  const progEl=document.getElementById('q-prog');
  const optsEl=document.getElementById('quiz-options');
  if(!qEl)return;
  qEl.textContent=q.q;
  if(numEl)numEl.textContent=i+1;
  if(progEl)progEl.style.width=((i+1)/currentQs.length*100)+'%';
  optsEl.innerHTML='';
  q.opts.forEach((o,idx)=>{ const b=document.createElement('button'); b.className='quiz-choice'; b.textContent=o; b.onclick=function(){answerQ(this,idx===q.ans);}; optsEl.appendChild(b); });
}
function showQuizResult(){
  const cont=document.querySelector('.quiz-container');
  if(cont)cont.style.display='none';
  document.getElementById('quiz-step-questions')?.classList.add('hidden');
  const resultEl=document.getElementById('quiz-step-result');
  if(resultEl) resultEl.classList.remove('hidden');
  const total = (QUIZ_SETS[currentQuizSet]||[]).length;
  const pct = total ? Math.round((quizScore/total)*100) : 0;
  const passed = pct >= 60;
  const icon = passed ? '🎉' : '😕';
  const label = pct >= 80 ? 'ممتاز' : pct >= 60 ? 'جيد' : 'بحاجة لتحسن';
  const msg = passed
    ? `أحسنت! أكملت الاختبار بعد الدرس ويمكنك المتابعة للدرس التالي.`
    : `حاولي مرة أخرى حتى تتمكني من متابعة الدرس القادم.`;
  document.getElementById('quiz-result-icon').textContent = icon;
  document.getElementById('quiz-result-msg').textContent = `${msg} (${quizScore}/${total})`;
  document.getElementById('quiz-result-pct').textContent = pct;
  document.getElementById('quiz-result-label').textContent = label;
  if(currentQuizMode==='postlesson'){
    markPostLessonQuizPassed(currentQuizSubject, passed);
    updateLessonModalGateNote();
  }
}
function resetQuiz(){
  qIndex=0;
  quizScore=0;
  const cont=document.querySelector('.quiz-container');
  if(cont)cont.style.display='block';
  document.getElementById('quiz-step-result')?.classList.add('hidden');
  document.getElementById('quiz-step-questions')?.classList.remove('hidden');
  const scoreEl=document.getElementById('q-score');
  if(scoreEl) scoreEl.textContent = '0';
  loadQ(0);
}
function nextQuiz(){
  currentQuizSet = (currentQuizSet + 1) % QUIZ_SETS.length;
  qIndex = 0;
  quizScore = 0;
  const cont=document.querySelector('.quiz-container');
  if(cont)cont.style.display='block';
  document.getElementById('quiz-step-result')?.classList.add('hidden');
  document.getElementById('quiz-step-questions')?.classList.remove('hidden');
  const scoreEl=document.getElementById('q-score');
  if(scoreEl) scoreEl.textContent = '0';
  const totalEl=document.getElementById('q-total');
  if(totalEl) totalEl.textContent = (QUIZ_SETS[currentQuizSet]||[]).length;
  loadQ(0);
}

// ============================================================
// GAMES MODAL
// ============================================================
function switchGame(id, el){
  ['quiz-game','match-game','riddle-game','puzzle-game'].forEach(g=>{
    const el2=document.getElementById(g); if(el2)el2.classList.add('hidden');
  });
  document.querySelectorAll('#games-modal .tab').forEach(t=>t.classList.remove('active'));
  const g=document.getElementById(id); if(g)g.classList.remove('hidden');
  if(el)el.classList.add('active');
}

// — Quiz Game —
function initQuizGame(){
  const pool=LEVEL_TESTS[currentGameSubj]||LEVEL_TESTS[currentSubjectId]||LEVEL_TESTS.default;
  gqQuestions=[...pool].sort(()=>Math.random()-.5);
  gqIdx=0; gqScore=0;
  const scoreEl=document.getElementById('gq-score');
  if(scoreEl)scoreEl.textContent='0';
  const res=document.getElementById('gq-result');
  if(res)res.classList.add('hidden');
  const qEl=document.getElementById('gq-question');
  if(qEl)qEl.style.display='';
  loadQGame(0);
}
function loadQGame(i){
  if(i>=gqQuestions.length){
    const resEl=document.getElementById('gq-result');
    if(resEl)resEl.classList.remove('hidden');
    const qEl=document.getElementById('gq-question');
    if(qEl)qEl.textContent='';
    const opEl=document.getElementById('gq-options');
    if(opEl)opEl.innerHTML='';
    const fsEl=document.getElementById('gq-final-score');
    if(fsEl)fsEl.textContent=gqScore;
    addPoints(gqScore);
    return;
  }
  const q=gqQuestions[i];
  const numEl=document.getElementById('gq-num');
  const progEl=document.getElementById('gq-prog');
  const qEl=document.getElementById('gq-question');
  const opEl=document.getElementById('gq-options');
  if(numEl)numEl.textContent=i+1;
  if(progEl)progEl.style.width=((i+1)/gqQuestions.length*100)+'%';
  if(qEl)qEl.textContent=q.q;
  if(opEl)opEl.innerHTML=q.opts.map((o,idx)=>`
    <button class="quiz-choice" onclick="answerQGame(this,${idx===q.ans})">${o}</button>`).join('');
}
function answerQGame(btn, correct){
  document.querySelectorAll('#quiz-game .quiz-choice').forEach(b=>b.disabled=true);
  btn.classList.add(correct?'correct':'wrong');
  if(correct){gqScore+=10; const s=document.getElementById('gq-score');if(s)s.textContent=gqScore;}
  setTimeout(()=>{ gqIdx++; loadQGame(gqIdx); }, 900);
}
function resetQuizGame(){ initQuizGame(); }

// — Match Game —
let _currentMatchData=[];
function initMatchGame(){
  _currentMatchData=getGameData().match.slice(0,4);
  matchSelected=null; matchDone=0;
  const scoreEl=document.getElementById('match-score-display');
  const fbEl=document.getElementById('match-feedback');
  if(scoreEl)scoreEl.textContent='';
  if(fbEl)fbEl.classList.add('hidden');
  const shuffledTerms=[..._currentMatchData].sort(()=>Math.random()-.5);
  const shuffledDefs=[..._currentMatchData].sort(()=>Math.random()-.5);
  const termsEl=document.getElementById('match-terms');
  const defsEl=document.getElementById('match-defs');
  if(termsEl)termsEl.innerHTML=shuffledTerms.map((d,i)=>`
    <button class="match-item" id="mt-${i}" onclick="selectMatch(this,'term',${i},'${d.term.replace(/'/g,"&#39;")}')">${d.term}</button>`).join('');
  if(defsEl)defsEl.innerHTML=shuffledDefs.map((d,i)=>`
    <button class="match-item" id="md-${i}" onclick="selectMatch(this,'def',${i},'${d.def.replace(/'/g,"&#39;")}')">${d.def}</button>`).join('');
}
function selectMatch(btn, type, idx, value){
  if(btn.classList.contains('correct')||btn.classList.contains('wrong'))return;
  if(!matchSelected){
    matchSelected={el:btn,type,value};
    btn.style.background='var(--prl)'; btn.style.borderColor='var(--pr)';
  } else {
    if(matchSelected.type===type){
      matchSelected.el.style.background=''; matchSelected.el.style.borderColor='';
      matchSelected={el:btn,type,value};
      btn.style.background='var(--prl)'; btn.style.borderColor='var(--pr)';
      return;
    }
    const termVal=type==='term'?value:matchSelected.value;
    const defVal=type==='def'?value:matchSelected.value;
    const correct=_currentMatchData.some(d=>d.term===termVal&&d.def===defVal);
    btn.classList.add(correct?'correct':'wrong');
    matchSelected.el.classList.add(correct?'correct':'wrong');
    btn.disabled=true; matchSelected.el.disabled=true;
    if(correct){
      matchDone++;
      const sc=document.getElementById('match-score-display');
      if(sc)sc.textContent='✅ '+matchDone+'/'+_currentMatchData.length;
      addPoints(20);
    }
    matchSelected=null;
    if(matchDone>=_currentMatchData.length){
      const fb=document.getElementById('match-feedback');
      if(fb){fb.classList.remove('hidden');fb.style.background='#E6FFE8';fb.style.color='#1B8A30';fb.textContent='🏆 أحسنت! طابقت جميع المفاهيم بنجاح!';}
    }
  }
}

// — Riddle Game —
function nextRiddle(){
  const riddles=getGameData().riddles;
  riddleIdx=(riddleIdx+1)%riddles.length;
  const el=document.getElementById('riddle-text');
  if(el)el.textContent=riddles[riddleIdx].q;
  const ans=document.getElementById('riddle-answer');
  if(ans)ans.classList.add('hidden');
}
function showRiddleAnswer(){
  const riddles=getGameData().riddles;
  const el=document.getElementById('riddle-answer');
  if(el){el.textContent='💡 الجواب: '+riddles[riddleIdx].a; el.classList.remove('hidden');}
  addPoints(5);
}

// — Puzzle Game —
function initPuzzleGame(){
  const puzzles=getGameData().puzzles;
  const p=puzzles[puzzleIdx%puzzles.length];
  const codeEl=document.getElementById('puzzle-code');
  const fbEl=document.getElementById('puzzle-fb');
  const choicesEl=document.getElementById('puzzle-choices');
  if(!codeEl)return;
  if(p.type==='text'){
    codeEl.innerHTML=`<span style="color:#e2e8f0;font-size:14px;line-height:1.8;">${p.code}</span>`;
  } else {
    codeEl.innerHTML=p.code;
  }
  if(fbEl)fbEl.classList.add('hidden');
  if(choicesEl)choicesEl.innerHTML=p.opts.map((o,i)=>`
    <button class="quiz-choice" onclick="answerPuzzle(this,${i===p.correct})">${o}</button>`).join('');
}
function answerPuzzle(btn, correct){
  document.querySelectorAll('#puzzle-game .quiz-choice').forEach(b=>b.disabled=true);
  btn.classList.add(correct?'correct':'wrong');
  const fb=document.getElementById('puzzle-fb');
  if(fb){
    fb.classList.remove('hidden');
    const puzzles=getGameData().puzzles;
    const p=puzzles[puzzleIdx%puzzles.length];
    fb.style.background=correct?'#E6FFE8':'#FEECEC';
    fb.style.color=correct?'#1B8A30':'#A32D2D';
    fb.textContent=correct?`✅ ممتاز! ${p.hint}`:`❌ ليس هذا — حاول مجدداً`;
    if(correct){addPoints(15); setTimeout(()=>{puzzleIdx++;initPuzzleGame();},1500);}
  }
}

// ============================================================
// AI CHAT — قاعدة معرفية شاملة (منصة + منهج + عام)
// ============================================================
const AI_KB=[
  // ── المنصة وإنشاء الحساب ──
  {p:['انشئ حساب','إنشاء حساب','انشاء حساب','سجل','تسجيل','sign up','register','أنشئ','ازاى اسجل','كيف أسجل','ازاي اتسجل','عايز اشترك','اشتراك'],
   r:'📋 خطوات إنشاء حساب على منصة SmartLearn HS:\n\n1️⃣ افتح صفحة المنصة الرئيسية\n2️⃣ اختر دورك:\n   🎓 طالب | 👩‍🏫 معلم | 👪 ولي أمر | ⚙️ مدير\n3️⃣ ستنتقل لصفحة التسجيل — أدخل:\n   • الاسم الكامل\n   • البريد الإلكتروني\n   • كلمة المرور\n4️⃣ إذا كنت طالباً اختر:\n   • الصف (الأول / الثاني / الثالث الثانوي)\n   • التخصص (علمي علوم / علمي رياضة / أدبي)\n5️⃣ اضغط "تسجيل" وستدخل لوحة التحكم مباشرة ✅\n\n💡 يمكن لولي الأمر ربط حساب أبنائه الطلاب بحسابه'},
  {p:['نسيت كلمة المرور','استعادة الحساب','تغيير كلمة المرور','login','دخول','تسجيل دخول','ازاى ادخل'],
   r:'🔐 تسجيل الدخول على SmartLearn HS:\n\n1️⃣ من الصفحة الرئيسية اختر دورك\n2️⃣ أدخل بريدك الإلكتروني وكلمة المرور\n3️⃣ اضغط "دخول"\n\n✅ ستنتقل تلقائياً للوحة التحكم الخاصة بك\n\n❓ هل أنت:\n• طالب؟ ستجد مواد دراستك وجدولك ومعملك الافتراضي\n• معلم؟ ستجد أدوات رفع المحتوى والتواصل مع الطلاب\n• ولي أمر؟ ستتابع أداء أبنائك وتقاريرهم\n• مدير؟ ستجد لوحة إدارة شاملة للمنصة'},
  {p:['ما هي المنصة','ايه هي المنصة','ما هو seduc','معلومات عن المنصة','شرح المنصة'],
   r:'🎓 منصة SmartLearn HS — منصة التعليم الذكي\n\n✨ نموذج مقترح لتعليم الثانوي العام المصري\n\n📌 ما تقدمه المنصة:\n• محتوى دراسي كامل لكل المواد (كتب، فيديوهات، ملخصات)\n• معمل افتراضي تفاعلي حسب تخصصك\n• ألعاب تعليمية وتقييم مستوى قبلي\n• مساعد ذكي (أنا!) للإجابة على أسئلتك\n• متابعة التقدم وجمع النقاط\n• لوحات للطلاب والمعلمين وأولياء الأمور والإدارة\n\n🚀 المنهج المصري 2025-2026 للأول الثانوي'},
  {p:['الملف الشخصي','بروفايل','profile','بيانات الحساب'],
   r:'👤 تعديل الملف الشخصي على SmartLearn HS:\n\n1️⃣ بعد تسجيل الدخول اذهب للوحة التحكم\n2️⃣ اضغط على اسمك أو صورتك في الأعلى\n3️⃣ يمكنك تعديل:\n   • الاسم والبيانات الشخصية\n   • كلمة المرور\n   • التخصص والصف (للطلاب)\n4️⃣ احفظ التغييرات ✅'},
  // ── تحيات وتفاعل عام ──
  {p:['مرحبا','مرحباً','هاي','hi','hello','أهلا','أهلاً','السلام عليكم','صباح','مساء'],
   r:'أهلاً وسهلاً! 👋\nأنا المساعد الذكي لمنصة SmartLearn HS — يسعدني مساعدتك!\n\nيمكنني مساعدتك في:\n📚 شرح دروس المواد الدراسية\n🏫 معلومات عن المنصة وإنشاء الحساب\n💡 نصائح للمذاكرة والامتحانات\n❓ أي سؤال عام تريده\n\nاكتب سؤالك وأنا هنا! 😊'},
  {p:['شكرا','شكراً','thank','ممتاز','حلو','رائع','تمام'],
   r:'العفو! 😊 يسعدني دائماً مساعدتك.\nهل هناك أي شيء آخر تريد معرفته؟'},
  {p:['كيف حالك','عامل ايه','ازيك','how are you'],
   r:'بخير وفي خدمتك دائماً! 😄\nجاهز أجاوب على أي سؤال — دراسي أو عام أو عن المنصة. اكتب ما تريد!'},
  {p:['من أنت','مين انت','ما اسمك','ايه اسمك','who are you'],
   r:'أنا المساعد الذكي لمنصة SmartLearn HS 🤖\nتم تصميمي لمساعدة طلاب الثانوي العام المصري.\n\n✅ أستطيع:\n• شرح مواد المنهج (عربي، رياضيات، فيزياء، كيمياء...)\n• الإجابة على أسئلة عامة\n• مساعدتك في استخدام المنصة\n• تقديم نصائح للدراسة والامتحانات\n\nاسأل ما تشاء! 📚'},
  // ── معلومات عامة ──
  {p:['الذكاء الاصطناعي ايه','ما هو الذكاء الاصطناعي','عرّف الذكاء','ما هو ai'],
   r:'🤖 الذكاء الاصطناعي (AI — Artificial Intelligence):\n\nهو علم يهدف لجعل الحاسوب يُقلّد الذكاء البشري في:\n• التعلم من البيانات\n• حل المشكلات\n• فهم اللغة والكلام\n• رؤية الصور وتحليلها\n\n📌 أمثلة حولك:\n  ChatGPT / Siri / ترجمة Google / YouTube (التوصيات)\n  تشخيص الأمراض / السيارات ذاتية القيادة\n\n💡 AI لا يفكر مثل الإنسان — لكنه يتعلم من كميات ضخمة من البيانات'},
  {p:['الإنترنت','شبكة الإنترنت','internet','ما هو الإنترنت'],
   r:'🌐 الإنترنت:\nشبكة عالمية تربط ملايين الحواسيب والأجهزة حول العالم.\n\n📌 كيف يعمل؟\n• البيانات تُرسَل على شكل حزم (packets)\n• تمر عبر أجهزة توجيه (routers)\n• البروتوكول الأساسي: TCP/IP\n\n📌 مفاهيم مرتبطة:\n• الويب (WWW): مواقع الإنترنت\n• HTTP/HTTPS: بروتوكول نقل صفحات الويب\n• DNS: يحوّل الأسماء (google.com) لعناوين IP'},
  {p:['مصر','عاصمة مصر','القاهرة','عدد سكان مصر'],
   r:'🇪🇬 مصر — جمهورية مصر العربية:\n• العاصمة: القاهرة\n• عدد السكان: ~106 مليون نسمة (2024)\n• أطول نهر في العالم: النيل يمر بها (6650 كم)\n• أقدم حضارة: الحضارة الفرعونية (~3100 ق.م)\n• اللغة الرسمية: العربية\n• العملة: الجنيه المصري\n• أبرز المعالم: الأهرامات، أبو الهول، الكرنك، المتحف المصري'},
  {p:['رياضة','كرة القدم','الأهلي','الزمالك'],
   r:'⚽ كرة القدم في مصر:\n• النادي الأهلي: أكثر الأندية تتويجاً بالبطولة الأفريقية (13 مرة)\n• الزمالك: نادي عريق وبطل أفريقي كذلك\n• المنتخب المصري: الفراعنة — 7 بطولات أمم أفريقية\n• محمد صلاح: أشهر لاعب مصري حالياً (يلعب في ليفربول الإنجليزي)\n\n💡 هل تريد معرفة المزيد عن موضوع معين؟'},
  {p:['صحة','غذاء','تغذية','الأكل الصحي','رياضة للصحة'],
   r:'💪 نصائح الصحة والغذاء:\n• اشرب 8 أكواب ماء يومياً\n• تناول الخضروات والفواكه يومياً\n• قلّل السكر والأغذية المصنّعة\n• نَمْ 7-9 ساعات ليلاً (مهم لتثبيت التعلم!)\n• مارس رياضة 30 دقيقة 3 مرات أسبوعياً\n• وجبة الإفطار مهمة جداً ولا تتخطاها\n\n🧠 الجسم الصحي = ذهن صافٍ = نتائج أفضل في الدراسة!'},
  {p:['وقت','إدارة الوقت','تنظيم','جدول'],
   r:'⏰ إدارة الوقت للطالب:\n\n📅 نصائح عملية:\n1️⃣ ضع جدولاً أسبوعياً ثابتاً للمذاكرة\n2️⃣ ابدأ بالمادة الصعبة وأنت نشيط\n3️⃣ استخدم تقنية بومودورو: 25 دقيقة دراسة + 5 راحة\n4️⃣ أطفئ الهاتف أثناء المذاكرة (أو اعزل الإشعارات)\n5️⃣ خصص وقتاً للترفيه بدون ذنب — الراحة ضرورية\n\n📌 القاعدة الذهبية: انتظام بسيط > حفظ مكثف قبل الامتحان بيوم'},
  {p:['ما معنى','معنى كلمة','اشرح كلمة','تعريف'],
   r:'📖 أهلاً! اكتب لي الكلمة أو المصطلح الذي تريد معرفة معناه وسأشرحه لك.\nمثال: "ما معنى الخوارزمية؟" أو "ما معنى الاستعارة؟"'},
  // ── النحو والصرف ──
  {p:['مبتدأ','خبر جملة اسمية','جملة اسمية'],r:'📌 الجملة الاسمية = مبتدأ + خبر\n• المبتدأ: اسم مرفوع يُبتدأ به في أول الجملة\n• الخبر: يُكمل المعنى ويُرفع مثله\n✍️ مثال: "العِلمُ نافعٌ"\n  العِلمُ: مبتدأ مرفوع بالضمة\n  نافعٌ: خبر مرفوع بالضمة'},
  {p:['فاعل','مرفوعات'],r:'📌 الفاعل: اسم مرفوع يدل على من فعل الفعل\n• يأتي بعد فعل مبني للمعلوم\n• علامة الرفع: الضمة أو الواو أو الألف\n✍️ "كتبَ الطالبُ الدرسَ"\n  الطالبُ: فاعل مرفوع بالضمة'},
  {p:['مفعول به','منصوبات'],r:'📌 المفعول به: اسم منصوب وقع عليه فعل الفاعل\n• علامة النصب: الفتحة أو الألف أو الياء\n✍️ "قرأَ الطالبُ الكتابَ"\n  الكتابَ: مفعول به منصوب بالفتحة'},
  {p:['أعرب','إعراب'],r:'📌 خطوات الإعراب:\n1️⃣ حدد نوع الكلمة (اسم/فعل/حرف)\n2️⃣ حدد موقعها في الجملة\n3️⃣ حدد علامة الإعراب\n📌 علامات الإعراب الأصلية:\n  الرفع: ضمة | النصب: فتحة | الجر: كسرة | الجزم: سكون'},
  {p:['ميزان صرفي','وزن كلمة','الصرف'],r:'📌 الميزان الصرفي: ف ع ل\n  ف = الحرف الأول | ع = الأوسط | ل = الأخير\n✍️ أمثلة:\n  كَتَبَ → فَعَلَ\n  مُعَلِّم → مُفَعِّل\n  كاتِب → فاعِل\n  مكتوب → مَفعول\n  كِتاب → فِعال'},
  {p:['جمع مذكر سالم','جمع مؤنث سالم','جمع تكسير'],r:'📌 أنواع الجمع:\n• جمع المذكر السالم: يُرفع بالواو، يُنصب/يُجر بالياء\n  مثال: مُعلِّمون ← مُعلِّمين\n• جمع المؤنث السالم: يُرفع بالضمة، يُنصب/يُجر بالكسرة\n  مثال: طالباتٌ\n• جمع التكسير: لا قاعدة ثابتة — كُتُب، رجال، أقلام'},
  // ── البلاغة ──
  {p:['تشبيه'],r:'📌 التشبيه: مقارنة شيئين اشتركا في صفة\n🔹 أركانه: مشبَّه + أداة + مشبَّه به + وجه شبه\n📌 أنواعه:\n• مرسل مفصّل: ذُكرت كل الأركان → "العلمُ كالنور يُضيء"\n• مرسل مجمل: حُذف وجه الشبه → "العلمُ كالنور"\n• بليغ: حُذفت الأداة ووجه الشبه → "أنتَ قمرٌ"\n• ضمني: لا يُصرَّح بطرفيه'},
  {p:['استعارة'],r:'📌 الاستعارة: تشبيه حُذف أحد طرفيه\n📌 نوعان:\n• تصريحية: ذُكر المشبَّه به وحُذف المشبَّه\n  "رأيتُ أسداً يخطب" ← الخطيب شُبِّه بالأسد\n• مكنية: ذُكر المشبَّه وأُضيف إليه ما يلائم المشبَّه به\n  "المنيةُ أنشبَتْ أظفارها" ← المنية شُبِّهت بأسد'},
  {p:['كناية'],r:'📌 الكناية: تعبير يُراد به غير معناه الحرفي مع جواز إرادة الحرفي\n📌 أنواع:\n• عن صفة: "طويل النجاد" ← كناية عن الطول والشجاعة\n• عن موصوف: "بنات الفكر" ← كناية عن القصائد\n• عن نسبة: "المجدُ في حسبه" ← كناية عن نسبه الكريم'},
  {p:['طباق','مطابقة'],r:'📌 الطباق: الجمع بين لفظين متضادين في المعنى\n📌 نوعان:\n• طباق الإيجاب: "يُحيي ويُميت" (فعلان مثبتان)\n• طباق السلب: أحدهما مثبت والآخر منفي\n✍️ الفائدة: تقوية المعنى وإبرازه بالتضاد'},
  {p:['جناس'],r:'📌 الجناس: تشابه لفظين في النطق واختلافهما في المعنى\n• جناس تام: الاتفاق في عدد الحروف وترتيبها وضبطها\n• جناس ناقص: الاختلاف في حرف واحد أو ضبطه\n✍️ "وَيَوْمَ يُعرَضُ الَّذِينَ كَفَرُوا عَلَى النَّارِ" — جناس بين: النار والنار (تكرار مع اختلاف السياق)'},
  {p:['بلاغة','صورة بيانية','بيان','بديع'],r:'📌 علوم البلاغة الثلاثة:\n🔹 علم البيان: التشبيه / الاستعارة / الكناية / المجاز\n🔹 علم المعاني: الإيجاز / الإطناب / التقديم / التأخير\n🔹 علم البديع: الطباق / الجناس / المقابلة / الاقتباس'},
  // ── الرياضيات ──
  {p:['مشتقة','اشتقاق','derivative'],r:'📌 المشتقة: معدل التغيّر الفوري للدالة\n📌 قواعد أساسية:\n  d/dx(xⁿ) = n·xⁿ⁻¹   مثال: (x³)\' = 3x²\n  d/dx(sin x) = cos x\n  d/dx(cos x) = -sin x\n  d/dx(eˣ) = eˣ\n  d/dx(ln x) = 1/x\n💡 المشتقة عند نقطة = ميل المماس للمنحنى عندها'},
  {p:['تكامل','integral'],r:'📌 التكامل: عملية عكس الاشتقاق\n📌 قواعد:\n  ∫xⁿ dx = xⁿ⁺¹/(n+1) + C\n  ∫sin x dx = -cos x + C\n  ∫cos x dx = sin x + C\n  ∫eˣ dx = eˣ + C\n💡 التكامل المحدد ∫ₐᵇ f(x)dx = المساحة تحت المنحنى بين a و b'},
  {p:['متجه','vector'],r:'📌 المتجه: كمية لها مقدار واتجاه\n📌 عمليات المتجهات:\n  الجمع: (a₁,a₂)+(b₁,b₂) = (a₁+b₁, a₂+b₂)\n  المقدار: |v| = √(x²+y²)\n  الضرب النقطي: v₁·v₂ = x₁x₂+y₁y₂\n✍️ مثال: v=(3,4) → |v|=√(9+16)=√25=5'},
  {p:['احتمال','probability'],r:'📌 الاحتمال: P(A) = الحالات المواتية ÷ الحالات الكلية\n📌 قواعد:\n  0 ≤ P(A) ≤ 1\n  P(Aᶜ) = 1 - P(A)\n  P(A∪B) = P(A)+P(B)-P(A∩B)\n  مستقلان: P(A∩B)=P(A)×P(B)\n✍️ ظهور 6 على نرد = 1/6 ≈ 0.167'},
  {p:['sin','cos','tan','جيب','جيب تمام','ظل','مثلثات'],r:'📌 النسب المثلثية في المثلث القائم:\n  sin θ = المقابل ÷ الوتر\n  cos θ = المجاور ÷ الوتر\n  tan θ = المقابل ÷ المجاور = sin/cos\n📌 قيم أساسية:\n  30°: sin=0.5, cos=√3/2, tan=1/√3\n  45°: sin=cos=√2/2, tan=1\n  60°: sin=√3/2, cos=0.5, tan=√3\n  90°: sin=1, cos=0'},
  {p:['لوغاريتم','log','ln'],r:'📌 اللوغاريتم: عكس الأس\n  logₐb = x  ↔  aˣ = b\n📌 قواعد:\n  log(AB) = log A + log B\n  log(A/B) = log A - log B\n  log(Aⁿ) = n·log A\n  log₁₀(10)=1  |  log₂(8)=3  |  ln(e)=1\n✍️ log₂(32) = 5 لأن 2⁵=32'},
  {p:['معادلة','حل','مجهول'],r:'📌 حل المعادلة خطوة بخطوة:\n1️⃣ اجمع الحدود المتماثلة في كل طرف\n2️⃣ انقل المجهول لطرف والثوابت للطرف الآخر\n3️⃣ اقسم على معامل المجهول\n4️⃣ تحقق بالتعويض\n✍️ مثال: 3x - 5 = 10\n  3x = 15 → x = 5 ✓'},
  {p:['نهاية','حد','lim'],r:'📌 النهاية (Limit):\n  lim(x→a) f(x): قيمة الدالة عند اقتراب x من a\n📌 نهايات مهمة:\n  lim(x→0) sin(x)/x = 1\n  lim(x→∞) (1+1/x)ˣ = e\n  lim(x→0) (eˣ-1)/x = 1\n💡 إذا أعطت التعويض المباشر 0/0 → استخدم قاعدة لوبيتال'},
  // ── الفيزياء ──
  {p:['قانون أوم','ohm','تيار','جهد','مقاومة'],r:'📌 قانون أوم: V = I × R\n  V: الجهد بالفولت (V)\n  I: التيار بالأمبير (A)\n  R: المقاومة بالأوم (Ω)\n✍️ إذا V=12V و R=4Ω:\n  I = V/R = 12/4 = 3A\n📌 القدرة الكهربية: P = V×I = I²×R (واط)'},
  {p:['قوانين نيوتن','نيوتن','حركة','تسارع','قوة'],r:'📌 قوانين نيوتن الثلاثة:\n1️⃣ قانون القصور الذاتي: الجسم يبقى ساكناً أو بحركة منتظمة إلا بقوة خارجية\n2️⃣ F = m × a (نيوتن = كجم × م/ث²)\n3️⃣ لكل فعل ردة فعل مساوية ومعاكسة\n✍️ مثال: F=5kg × 4m/s² = 20N'},
  {p:['طاقة','شغل','قدرة','work','energy'],r:'📌 الشغل: W = F × d × cosθ (جول)\n📌 الطاقة الحركية: KE = ½mv²\n📌 طاقة الوضع: PE = mgh\n📌 قانون حفظ الطاقة: الطاقة الكلية ثابتة\n✍️ جسم m=2kg، v=10m/s:\n  KE = ½×2×100 = 100 جول'},
  {p:['موجة','ضوء','صوت','تردد','طول موجي'],r:'📌 معادلة الموجة: v = f × λ\n  v: السرعة (م/ث) | f: التردد (هرتز) | λ: الطول الموجي (م)\n📌 سرعة الضوء: c = 3×10⁸ م/ث\n📌 سرعة الصوت في الهواء: ~340 م/ث\n💡 الضوء يسير في الفراغ، الصوت يحتاج وسطاً مادياً'},
  {p:['بندول','pendulum','زمن دوري'],r:'📌 البندول البسيط:\n  T = 2π√(L/g)\n  T: الزمن الدوري (ثانية)\n  L: طول الخيط (متر)\n  g: جاذبية الأرض ≈ 9.8 م/ث²\n📌 ملاحظة: T لا يعتمد على الكتلة ولا على السعة (للزوايا الصغيرة)\n✍️ إذا L=1m: T=2π√(1/9.8)≈2 ثانية'},
  // ── الكيمياء ──
  {p:['حمض','قاعدة','ph','تعادل','حمضي','قاعدي'],r:'📌 الأحماض والقواعد:\n  pH < 7: حمضي (HCl, H₂SO₄, خل)\n  pH = 7: متعادل (الماء النقي)\n  pH > 7: قاعدي (NaOH, أمونيا)\n📌 تفاعل التعادل:\n  حمض + قاعدة → ملح + ماء\n  HCl + NaOH → NaCl + H₂O\n💡 المؤشرات: عباد الشمس — أحمر في حمضي، أزرق في قاعدي'},
  {p:['تفاعل كيميائي','معادلة كيميائية','موازنة'],r:'📌 أنواع التفاعلات:\n• الاتحاد: A+B → AB\n• التحلل: AB → A+B\n• الإحلال الأحادي: A+BC → AC+B\n• الأكسدة والاختزال (Redox): نقل إلكترونات\n📌 موازنة المعادلة: عدد ذرات كل عنصر متساوٍ في الطرفين\n✍️ 2H₂ + O₂ → 2H₂O'},
  {p:['ذرة','إلكترون','بروتون','نيوترون','جدول دوري'],r:'📌 بناء الذرة:\n  النواة: بروتونات (+) + نيوترونات\n  خارجها: إلكترونات (-) في مستويات طاقة\n📌 العدد الذري = عدد البروتونات = عدد الإلكترونات\n📌 عناصر مهمة:\n  H=1 | C=6 | N=7 | O=8 | Na=11 | Cl=17 | Fe=26'},
  // ── الأحياء ──
  {p:['خلية','cell','نواة','ميتوكوندريا','غشاء خلوي'],r:'📌 مكونات الخلية الحيوانية:\n  الغشاء البلازمي: يتحكم في دخول المواد وخروجها\n  النواة: تحتوي DNA — المركز الرئيسي\n  الميتوكوندريا: مصنع الطاقة (ATP)\n  الريبوسوم: يصنع البروتينات\n📌 الخلية النباتية تضيف:\n  جدار الخلية + البلاستيدات الخضراء (للتمثيل الضوئي)'},
  {p:['dna','وراثة','جين','كروموسوم','الحمض النووي'],r:'📌 الحمض النووي DNA:\n  يحمل الشفرة الوراثية من 4 قواعد: A-T-G-C\n  قاعدة التكامل: A يرتبط مع T | G يرتبط مع C\n📌 الإنسان: 46 كروموسوم (23 زوج)\n  الزوج 23: يحدد الجنس (XX أنثى | XY ذكر)\n💡 الجين: قطعة DNA تحدد صفة وراثية واحدة'},
  {p:['تمثيل ضوئي','بناء ضوئي','كلوروفيل','photosynthesis'],r:'📌 التمثيل الضوئي:\n  يحدث في البلاستيدات الخضراء (الكلوروبلاست)\n📌 المعادلة:\n  6CO₂ + 6H₂O + ضوء ─▶ C₆H₁₂O₆ + 6O₂\n  (ثاني أكسيد الكربون + ماء + ضوء → جلوكوز + أكسجين)\n💡 الكلوروفيل يمتص الضوء الأحمر والأزرق ويعكس الأخضر'},
  {p:['الجهاز الهضمي','هضم','امتصاص','معدة'],r:'📌 مسار الهضم:\n  فم → مريء → معدة → أمعاء دقيقة → أمعاء غليظة\n📌 الإنزيمات الهاضمة:\n  الأميليز (الفم): يهضم النشا\n  البيبسين (المعدة): يهضم البروتين\n  الليباز (الأمعاء): يهضم الدهون\n💡 الامتصاص يتم في الأمعاء الدقيقة بواسطة الزغابات المعوية'},
  // ── البرمجة والذكاء الاصطناعي ──
  {p:['python','بايثون','كود','برمجة'],r:'📌 Python — لغة البرمجة الأولى في AI:\n```python\n# المتغيرات والطباعة\nname = "طالب"\nprint(f"مرحباً {name}")\n\n# الشرط\nif score >= 90:\n    print("ممتاز")\nelif score >= 70:\n    print("جيد")\nelse:\n    print("يحتاج تحسين")\n\n# الحلقة\nfor i in range(5):\n    print(i)  # يطبع 0,1,2,3,4\n\n# الدالة\ndef add(a, b):\n    return a + b\n```'},
  {p:['خوارزمية','algorithm'],r:'📌 الخوارزمية: خطوات منظمة ومحددة لحل مشكلة\n📌 خصائصها:\n  محدودة (تنتهي) | واضحة (لا غموض) | لها مدخلات ومخرجات\n📌 أمثلة:\n  ترتيب الفقاعات: يقارن كل عنصرين متجاورين\n  البحث الثنائي: يقسم المصفوفة للنصف في كل خطوة\n💡 الخوارزمية الجيدة: صحيحة + كفؤة (زمن وذاكرة أقل)'},
  {p:['ذكاء اصطناعي','تعلم آلي','machine learning','شبكة عصبية'],r:'📌 الذكاء الاصطناعي (AI):\n  هو محاكاة الذكاء البشري بالحاسوب\n📌 أنواع التعلم الآلي:\n  Supervised: نُعطيه أمثلة مصنّفة ← يتعلم التصنيف\n  Unsupervised: يكتشف الأنماط وحده\n  Reinforcement: يتعلم بالتجربة والمكافأة\n📌 الشبكة العصبية: نموذج مستوحى من الدماغ البشري (طبقات — خلايا عصبية اصطناعية)'},
  // ── التاريخ ──
  {p:['مصر القديمة','الفراعنة','الأهرامات','الحضارة الفرعونية'],r:'📌 حضارة مصر القديمة (~3000 ق.م):\n  نشأت على ضفاف النيل\n📌 الإنجازات:\n  الكتابة الهيروغليفية | بناء الأهرامات\n  نظام الري | التقويم الشمسي\n  الطب والتحنيط | الرياضيات والفلك\n📌 أبرز الفراعنة: رمسيس الثاني، تحتمس الثالث، أخناتون'},
  {p:['الحضارة الإسلامية','العصر الذهبي','عباسي','بيت الحكمة'],r:'📌 العصر الذهبي الإسلامي (8-13م):\n  مركزه: بغداد — بيت الحكمة\n📌 العلماء الكبار:\n  الخوارزمي: مؤسس الجبر (Algorithm سُمّيت باسمه)\n  ابن سينا: القانون في الطب\n  البيروني: الجغرافيا والفلك\n  جابر بن حيان: الكيمياء\n  الإدريسي: الخرائط الجغرافية'},
  {p:['الحضارة اليونانية','يونان','أثينا'],r:'📌 الحضارة اليونانية (~500-300 ق.م):\n  الديمقراطية: نشأت في أثينا\n  الفلسفة: سقراط، أفلاطون، أرسطو\n  الرياضيات: فيثاغورس، إقليدس، أرخميدس\n  الأدب: هوميروس (الإلياذة والأوديسا)\n  الأولمبياد: أُقيمت كل 4 سنوات في أولمبيا'},
  // ── الفلسفة والمنطق ──
  {p:['منطق','قياس','استنتاج','مقدمة كبرى','مقدمة صغرى'],r:'📌 القياس المنطقي الصوري:\n  المقدمة الكبرى: كل إنسان فانٍ\n  المقدمة الصغرى: سقراط إنسان\n  النتيجة: ∴ سقراط فانٍ\n📌 شروط القياس الصحيح:\n  صدق المقدمتين + صحة الشكل المنطقي\n📌 أرسطو: واضع المنطق الصوري (القياس الأرسطي)'},
  {p:['فلسفة','الوجود','المعرفة','الأخلاق','الجمال'],r:'📌 فروع الفلسفة:\n  الأنطولوجيا: ما الوجود؟ ما الحقيقة؟\n  الإبستيمولوجيا: كيف نعرف؟ مصادر المعرفة\n  الأكسيولوجيا: ما الخير؟ ما الجمال؟\n  المنطق: كيف نفكر بشكل سليم؟\n💡 الفلسفة تسعى لفهم الكون والإنسان بالعقل وحده'},
  {p:['سقراط','أفلاطون','أرسطو'],r:'📌 أعلام الفلسفة اليونانية:\n  سقراط (470-399 ق.م): المنهج الحواري — "أعرف أنني لا أعرف"\n  أفلاطون (428-348 ق.م): نظرية المُثُل — عالم الأفكار أحقّ من عالم الحواس\n  أرسطو (384-322 ق.م): المنطق الصوري، التصنيف، البيولوجيا، السياسة\n  أرسطو كان معلم الإسكندر الأكبر'},
  // ── نصائح الدراسة ──
  {p:['كيف أذاكر','مذاكرة','دراسة','تركيز','نسيان'],r:'📌 أساليب المذاكرة الفعّالة:\n  ⏱️ بومودورو: 25 دقيقة تركيز + 5 دقيقة راحة\n  🗺️ خريطة ذهنية: ربط المفاهيم بصرياً\n  📢 الشرح بصوت عالٍ: اشرح الدرس كأنك تعلّم غيرك\n  🔄 المراجعة على فترات: بعد يوم، أسبوع، شهر\n  😴 النوم: يثبّت المعلومات في الذاكرة بعيدة المدى'},
  {p:['امتحان','اختبار','استعداد','الاختبار'],r:'📌 خطة الاستعداد للامتحان:\n  قبل 3 أيام: راجع الملخصات والخرائط الذهنية\n  قبل ليلة: راجع النقاط الصعبة فقط، نَمْ مبكراً\n  يوم الامتحان: وجبة صحية، اقرأ الأسئلة كلها أولاً\n  في الامتحان: ابدأ بالسهل، خصص وقتاً لكل سؤال، راجع إجاباتك\n  💡 الثقة بالنفس + المذاكرة المنتظمة = النجاح'},
];

function quickAsk(ctx, text){
  const inpId=ctx==='float'?'float-inp':ctx+'-inp';
  const inp=document.getElementById(inpId);
  if(inp){ inp.value=text; sendAI(ctx); }
}

async function sendAI(ctx){
  const inpId=ctx==='float'?'float-inp':ctx+'-inp';
  const msgsId=ctx==='float'?'float-msgs':ctx+'-msgs';
  const inp=document.getElementById(inpId);
  const msgs=document.getElementById(msgsId);
  if(!inp||!inp.value.trim())return;
  const text=inp.value.trim(); inp.value='';

  // إضافة رسالة المستخدم
  addMsg(msgs,text,true);

  // رسالة الانتظار مع مؤشر كتابة أكثر تفاعلاً
  const typing=document.createElement('div');
  typing.className='msg ai typing';
  typing.innerHTML='<div style="display:flex;gap:4px;"><span>🤔</span><span>جارٍ التفكير...</span><span class="dots">...</span></div>';
  msgs.appendChild(typing); msgs.scrollTop=msgs.scrollHeight;

  // محاكاة التفكير لجعلها أكثر واقعية
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));

  // إضافة سياق المادة إذا كان المستخدم يسأل عن مادة محددة
  let contextualQuestion = text;
  if(currentChatSubject){
    const s = SUBJECTS.find(x=>x.id===currentChatSubject);
    if(s && !text.includes(s.name)){
      contextualQuestion = `[المادة: ${s.name}] ${text}`;
    }
  }

  // 1) ابحث في الـ KB المحلي أولاً (سريع وموثوق)
  const local=getLocalKBReply(contextualQuestion);
  if(local){
    typing.innerHTML=local.replace(/\n/g,'<br>');
    msgs.scrollTop=msgs.scrollHeight;
    return;
  }

  // 2) استخدم الذكاء الاصطناعي المتقدم للأسئلة الأكثر تعقيداً
  const enhancedReply=await callEnhancedAI(contextualQuestion, ctx);
  typing.innerHTML=(enhancedReply||'عذراً، لم أتمكن من الإجابة الآن. حاول مرة أخرى. 🔄').replace(/\n/g,'<br>');
  msgs.scrollTop=msgs.scrollHeight;
}

// البحث في قاعدة المعرفة المحلية فقط
function getLocalKBReply(question){
  const q=question.toLowerCase().trim();

  // البحث في AI_KB أولاً
  for(const entry of AI_KB){
    if(entry.p.some(kw=>q.includes(kw.toLowerCase()))) return entry.r;
  }

  // البحث في المنهج باستخدام البحث الذكي
  const searchResults = searchCurriculum(q);
  if(searchResults.length > 0){
    return formatSearchResults(searchResults, q);
  }

  // إجابات عامة للأسئلة الشائعة
  if(q.includes('كيف') && (q.includes('دراس') || q.includes('تعلم'))){
    return `📚 **نصائح للدراسة الفعالة:**\n\n• ركز على فهم المفاهيم لا الحفظ\n• استخدم أدوات الذكاء الاصطناعي لشرح الصعب\n• مارس التمارين بانتظام\n• راجع يومياً ما درست\n\n💡 جرب: "أحتاج تمارين في [المادة]"`;
  }

  if(q.includes('امتحان') || q.includes('اختبار') || q.includes('تقييم')){
    return `📝 **تحضير للامتحانات:**\n\n• راجع المنهج كاملاً\n• حل تمارين قديمة\n• استخدم خاصية "مراجعة سريعة"\n• اختبر نفسك بأسئلة من المنصة\n\n🎯 نصيحة: ابدأ المراجعة مبكراً!`;
  }

  return null;
}

function buildCurriculumAnswer(question){
  const q=question.toLowerCase();
  const matches=[];
  for(const subj in CURRICULUM){
    const subject=SUBJECTS.find(s=>s.id===subj);
    if(!subject) continue;
    for(const unit of CURRICULUM[subj]){
      if(unit.unit && q.includes(unit.unit.toLowerCase())){
        matches.push({type:'unit',subject:subject.name,unit,lesson:null});
      }
      for(const lesson of unit.lessons){
        if(q.includes(lesson.toLowerCase())){
          matches.push({type:'lesson',subject:subject.name,unit,lesson});
        }
      }
    }
  }
  if(matches.length){
    const first=matches[0];
    if(first.type==='lesson'){
      return `📖 درس "${first.lesson}" في مادة ${first.subject} ضمن وحدة "${first.unit.unit}".

أهم النقاط:
• هذا الدرس يشرح ${first.lesson} بأسلوب مناسب للثانوي.
• ركز على المصطلحات الأساسية والأمثلة التطبيقية.
• إذا أردت، اكتب "اشرح ${first.lesson} بالتفصيل".`;
    }
    return `📚 وحدة "${first.unit.unit}" في مادة ${first.subject} تشمل الدروس:
${first.unit.lessons.map(l=>`• ${l}`).join('\n')}

💡 اختر درساً لتفاصيل أعمق أو اكتب "اشرح الدرس الأول في الوحدة".`;
  }
  const subjectMatch=SUBJECTS.find(s=>q.includes(s.name.toLowerCase())||q.includes(s.id));
  if(subjectMatch){
    return `📘 يبدو أنك تسأل عن مادة ${subjectMatch.name}. يمكنك أن تطلب شرح درس أو مفهوم محدد مثل: "اشرح المشتقة" أو "ما هو أمن المعلومات؟".`;
  }
  return `🧠 أحتاج منك سؤالاً أدقّ أو درساً محدداً. جرّب كتابة: "اشرح قانون أوم" أو "ما معنى الاستعارة".`;
}

// الاتصال بـ AI الخارجي بشكل شفاف للطالب
async function callExternalAI(question){
  const spec=localStorage.getItem('currentSpec')||'sci';
  const grade=localStorage.getItem('currentGrade')||'الأول الثانوي';
  const specLabel=spec==='scimath'?'علمي رياضة':spec==='lit'?'أدبي':'علمي علوم';

  // ابحث في المنهج عن معلومات ذات صلة بالسؤال
  let curriculumInfo = '';
  const q = question.toLowerCase();
  for(const subj in CURRICULUM){
    const subject = SUBJECTS.find(s=>s.id===subj);
    if(!subject) continue;
    for(const unit of CURRICULUM[subj]){
      if(unit.unit && q.includes(unit.unit.toLowerCase())){
        curriculumInfo += `وحدة: ${unit.unit} في ${subject.name}\nالدروس: ${unit.lessons.join(', ')}\n`;
      }
      for(const lesson of unit.lessons){
        if(q.includes(lesson.toLowerCase())){
          curriculumInfo += `درس: ${lesson} من وحدة ${unit.unit} في ${subject.name}\n`;
        }
      }
    }
  }
  if(curriculumInfo) curriculumInfo = `\nمعلومات من المنهج:\n${curriculumInfo}`;

  const system=`أنت مساعد تعليمي ذكي لطلاب الثانوي العام المصري. الطالب في ${grade}، تخصص ${specLabel}. أجب باللغة العربية فقط بشكل مختصر ومفيد ومناسب لمستوى الثانوي. اعتمد على المنهج الرسمي المصري عند الإجابة على الأسئلة الدراسية. لا تذكر اسم أي شركة أو نموذج ذكاء اصطناعي. إذا كان السؤال دراسياً اشرحه بأمثلة.${curriculumInfo}`;

  try{
    const res=await fetch('https://text.pollinations.ai/',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        messages:[{role:'system',content:system},{role:'user',content:question}],
        model:'openai',
        private:true
      })
    });
    if(res.ok){
      const txt=await res.text();
      if(txt.trim()) return txt.trim();
    }
  }catch{}

  return buildCurriculumAnswer(question);
}

async function callEnhancedAI(question, ctx){
  const spec=localStorage.getItem('currentSpec')||'sci';
  const grade=localStorage.getItem('currentGrade')||'الأول الثانوي';
  const specLabel=spec==='scimath'?'علمي رياضة':spec==='lit'?'أدبي':'علمي علوم';

  // جمع معلومات السياق من المحادثة السابقة
  const msgsContainer = document.getElementById(ctx==='float'?'float-msgs':ctx+'-msgs');
  let conversationContext = '';
  if(msgsContainer){
    const recentMsgs = Array.from(msgsContainer.querySelectorAll('.msg')).slice(-6); // آخر 6 رسائل
    conversationContext = recentMsgs.map(msg => {
      const isUser = msg.classList.contains('user');
      const content = msg.textContent || msg.innerText;
      return `${isUser ? 'الطالب' : 'المعلم'}: ${content}`;
    }).join('\n');
  }

  // معلومات إضافية من المادة الحالية
  let subjectContext = '';
  if(currentChatSubject){
    const s = SUBJECTS.find(x=>x.id===currentChatSubject);
    if(s){
      subjectContext = `\nالمادة الحالية: ${s.name} (${s.id})\n`;
      const units = CURRICULUM[currentChatSubject] || [];
      if(units.length > 0){
        subjectContext += `الوحدات المتاحة: ${units.map(u=>u.unit).join(', ')}\n`;
      }
    }
  }

  // معلومات إضافية من المنهج والأداء
  let curriculumInfo = '';
  const q = question.toLowerCase();
  for(const subj in CURRICULUM){
    const subject = SUBJECTS.find(s=>s.id===subj);
    if(!subject) continue;
    for(const unit of CURRICULUM[subj]){
      if(unit.unit && q.includes(unit.unit.toLowerCase())){
        curriculumInfo += `وحدة: ${unit.unit} في ${subject.name}\nالدروس: ${unit.lessons.join(', ')}\n`;
      }
      for(const lesson of unit.lessons){
        if(q.includes(lesson.toLowerCase())){
          curriculumInfo += `درس: ${lesson} من وحدة ${unit.unit} في ${subject.name}\n`;
        }
      }
    }
  }

  // معلومات الأداء إذا كانت متوفرة
  const performanceData = getStudentPerformanceData();
  let performanceContext = '';
  if(performanceData){
    performanceContext = `\nبيانات الأداء الحالية:\n- المعدل العام: ${performanceData.overall}%\n- المواد الأقوى: ${performanceData.strongSubjects.join(', ')}\n- المواد التي تحتاج تحسين: ${performanceData.weakSubjects.join(', ')}`;
  }

  if(curriculumInfo) curriculumInfo = `\nمعلومات من المنهج:\n${curriculumInfo}`;
  if(performanceContext) curriculumInfo += performanceContext;

  const system=`أنت مساعد تعليمي ذكي متقدم لطلاب الثانوي العام المصري. الطالب في ${grade}، تخصص ${specLabel}.${subjectContext}

المبادئ الأساسية:
- أجب باللغة العربية الفصحى الواضحة والمشجعة
- كن ودوداً ومشجعاً مثل معلم حقيقي
- اعتمد على المنهج الرسمي المصري 2025-2026
- ربط الشرح بالحياة اليومية والتطبيقات العملية
- إذا كان السؤال دراسي، ابدأ بالإجابة المباشرة ثم شرح إضافي
- استخدم الرموز التوضيحية (📚, 💡, ⚠️, ✅) لجعل الإجابة أكثر جاذبية
- اقترح أنشطة أو تمارين إضافية عند المناسبة

السياق الحالي:
${conversationContext ? `المحادثة السابقة:\n${conversationContext}\n\n` : ''}${curriculumInfo}

أجب بطريقة طبيعية وتفاعلية، وإذا لزم الأمر اقترح استخدام أدوات أخرى في المنصة مثل توليد المحتوى أو الاختبارات.`;

  try{
    const res=await fetch('https://text.pollinations.ai/',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        messages:[{role:'system',content:system},{role:'user',content:question}],
        model:'openai',
        private:true
      })
    });
    if(res.ok){
      const txt=await res.text();
      if(txt.trim()) return enhanceReplyWithFeatures(txt.trim(), question);
    }
  }catch(e){}

  return buildCurriculumAnswer(question);
}

function enhanceReplyWithFeatures(reply, originalQuestion){
  let enhanced = reply;

  // إضافة اقتراحات ذكية حسب نوع السؤال
  const q = originalQuestion.toLowerCase();

  if(q.includes('شرح') || q.includes('فهم') || q.includes('صعب')){
    enhanced += '\n\n💡 **اقتراح مفيد:** جرب توليد محتوى تفاعلي من قسم "أدوات الذكاء الاصطناعي" لشرح بصري أو تمارين تطبيقية!';
  }

  if(q.includes('امتحان') || q.includes('اختبار') || q.includes('مراجعة')){
    enhanced += '\n\n📝 **نصيحة للاستعداد:** استخدم خاصية "توليد اختبار" لاختبار نفسك قبل الامتحان الحقيقي.';
  }

  if(q.includes('فيديو') || q.includes('شاهد') || q.includes('بصري')){
    enhanced += '\n\n🎥 **محتوى بصري:** يمكنني مساعدتك في توليد أفكار فيديو تعليمية مخصصة لمستواك!';
  }

  if(q.includes('بودكاست') || q.includes('استماع') || q.includes('سمعي')){
    enhanced += '\n\n🎧 **تعلم سمعي:** جرب سيناريوهات البودكاست التعليمي للمراجعة أثناء التنقل!';
  }

  if(q.includes('تمرين') || q.includes('تدريب') || q.includes('ممارسة')){
    enhanced += '\n\n✍️ **تدريب عملي:** اطلب تمارين متدرجة من السهل للصعب مع حلول مفصلة.';
  }

  // إضافة تشجيع عام
  if(!enhanced.includes('أحسنت') && !enhanced.includes('ممتاز') && Math.random() > 0.7){
    enhanced += '\n\n🌟 أنت تسأل أسئلة ممتازة! استمر في التعلم النشط.';
  }

  return enhanced;
}

function getStudentPerformanceData(){
  // محاكاة بيانات الأداء - في التطبيق الحقيقي ستكون من قاعدة البيانات
  const mockData = {
    overall: 88,
    strongSubjects: ['الرياضيات', 'الفيزياء'],
    weakSubjects: ['الكيمياء', 'الأحياء']
  };
  return mockData;
}

function addMsg(container, text, isUser){
  if(!container)return;
  const d=document.createElement('div');
  d.className='msg '+(isUser?'user':'ai');
  if(isUser){d.textContent=text;}
  else{d.innerHTML=text.replace(/\n/g,'<br>');}
  container.appendChild(d);
  container.scrollTop=container.scrollHeight;
}

function toggleFloatChat(){
  const panel=document.getElementById('float-chat-panel');
  if(!panel)return;
  panel.classList.toggle('hidden');
  if(!panel.classList.contains('hidden')&&document.getElementById('float-msgs').childElementCount===0){
    const welcomeMsg = `مرحباً! 👋 أنا المساعد الذكي لمنصة SmartLearn HS.

يمكنني مساعدتك في:
📚 شرح الدروس والمواد الدراسية
🎥 توليد فيديوهات ومحتوى بصري
🎧 إنشاء بودكاست تعليمي
📝 اختبارات وتمارين تطبيقية
💡 نصائح للدراسة والامتحانات
🏫 إنشاء حساب أو الدخول للمنصة

💭 **أسئلة شائعة يمكنك السؤال عنها:**
"اشرح قانون نيوتن الثاني"
"أحتاج تمارين في المشتقات"
"ما هي أفكار فيديو عن التمثيل الضوئي؟"
"ساعدني في مراجعة قبل امتحان الكيمياء"

اكتب سؤالك وأنا هنا للمساعدة! 😊`;

    addMsg(document.getElementById('float-msgs'), welcomeMsg, false);
  }
}

// البحث الذكي في المنهج
function searchCurriculum(query){
  const results = [];
  const q = query.toLowerCase().trim();

  for(const subj in CURRICULUM){
    const subject = SUBJECTS.find(s=>s.id===subj);
    if(!subject) continue;

    for(const unit of CURRICULUM[subj]){
      // البحث في اسم الوحدة
      if(unit.unit && unit.unit.toLowerCase().includes(q)){
        results.push({
          type: 'unit',
          subject: subject.name,
          unit: unit.unit,
          lessons: unit.lessons,
          relevance: 'high'
        });
      }

      // البحث في الدروس
      for(const lesson of unit.lessons){
        if(lesson.toLowerCase().includes(q)){
          results.push({
            type: 'lesson',
            subject: subject.name,
            unit: unit.unit,
            lesson: lesson,
            relevance: 'high'
          });
        }
      }

      // البحث في الكلمات المفتاحية (إذا كانت متوفرة)
      if(unit.keywords){
        for(const keyword of unit.keywords){
          if(keyword.toLowerCase().includes(q) || q.includes(keyword.toLowerCase())){
            results.push({
              type: 'keyword',
              subject: subject.name,
              unit: unit.unit,
              keyword: keyword,
              lessons: unit.lessons,
              relevance: 'medium'
            });
          }
        }
      }
    }
  }

  return results.slice(0, 5); // أفضل 5 نتائج
}

// دالة لعرض نتائج البحث في الشات
function formatSearchResults(results, query){
  if(results.length === 0){
    return `🔍 لم أجد نتائج لـ "${query}" في المنهج. جرب كلمات مفتاحية أخرى مثل "مشتقة" أو "تمثيل ضوئي".`;
  }

  let response = `🔍 نتائج البحث عن "${query}":\n\n`;

  for(const result of results){
    if(result.type === 'unit'){
      response += `📚 **وحدة: ${result.unit}**\n`;
      response += `المادة: ${result.subject}\n`;
      response += `الدروس: ${result.lessons.join(' • ')}\n\n`;
    } else if(result.type === 'lesson'){
      response += `📖 **درس: ${result.lesson}**\n`;
      response += `من وحدة: ${result.unit} (${result.subject})\n\n`;
    } else if(result.type === 'keyword'){
      response += `🔑 **كلمة مفتاحية: ${result.keyword}**\n`;
      response += `في وحدة: ${result.unit} (${result.subject})\n`;
      response += `الدروس ذات الصلة: ${result.lessons.join(' • ')}\n\n`;
    }
  }

  response += `💡 إذا كنت تريد شرحاً مفصلاً، قل "اشرح ${results[0].lesson || results[0].unit}".`;

  return response;
}
function togglePodcast(){
  podPlaying=!podPlaying;
  const playBtn=document.getElementById('pod-play')||document.getElementById('sp-pod-play');
  if(playBtn)playBtn.textContent=podPlaying?'⏸':'▶';
  if(podPlaying){
    podInterval=setInterval(()=>{
      podVal=Math.min(100,podVal+0.5);
      const rangeEl=document.getElementById('pod-range')||document.getElementById('sp-pod-range');
      const timeEl=document.getElementById('pod-time')||document.getElementById('sp-pod-time');
      if(rangeEl)rangeEl.value=podVal;
      const secs=Math.floor(podVal*1.5);
      if(timeEl)timeEl.textContent=Math.floor(secs/60)+':'+(secs%60).toString().padStart(2,'0');
      if(podVal>=100)clearInterval(podInterval);
    },300);
  } else clearInterval(podInterval);
}
function updatePod(v){ podVal=parseFloat(v); const secs=Math.floor(podVal*1.5); const t=document.getElementById('pod-time')||document.getElementById('sp-pod-time'); if(t)t.textContent=Math.floor(secs/60)+':'+(secs%60).toString().padStart(2,'0'); }

// ============================================================
// LAB
// ============================================================
function runLab(btn, type){
  document.querySelectorAll('.lab-tool').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  const canvas=document.getElementById('lab-canvas');
  const configs={
    chem:{title:'تجربة الكيمياء — تفاعل الحمض مع القاعدة', html:`
      <div style="text-align:center;width:100%;">
        <div style="font-size:13px;color:rgba(255,255,255,.7);margin-bottom:16px;">HCl + NaOH → NaCl + H₂O</div>
        <div style="display:flex;justify-content:center;gap:24px;align-items:flex-end;margin-bottom:16px;">
          <div class="lab-tube"><div class="lab-liquid" style="height:60%;background:#2979FF;"></div></div>
          <div style="color:rgba(255,255,255,.6);font-size:24px;margin-bottom:20px;">+</div>
          <div class="lab-tube"><div class="lab-liquid" style="height:50%;background:#FF7043;"></div></div>
          <div style="color:rgba(255,255,255,.6);font-size:24px;margin-bottom:20px;">→</div>
          <div class="lab-tube" id="result-tube"><div class="lab-liquid" style="height:0;transition:all 1s;"></div></div>
        </div>
        <div style="display:flex;justify-content:center;gap:24px;font-size:11px;color:rgba(255,255,255,.5);margin-bottom:16px;">
          <span>HCl (حمض)</span><span style="width:40px;"></span><span>NaOH (قاعدة)</span><span style="width:40px;"></span><span>النتيجة</span>
        </div>
        <button onclick="startLabSim()" style="background:var(--pr);color:#fff;border:none;padding:10px 24px;border-radius:50px;font-family:'Cairo',sans-serif;font-size:13px;cursor:pointer;">▶ ابدئي التجربة</button>
        <div id="lab-log" style="margin-top:14px;"></div>
      </div>`},
    physics:{title:'تجربة الفيزياء — البندول البسيط', html:`
      <div style="text-align:center;width:100%;padding:10px 0;">
        <div style="font-size:13px;color:rgba(255,255,255,.7);margin-bottom:20px;">قانون نيوتن للحركة الدورية</div>
        <div style="display:flex;justify-content:center;margin-bottom:20px;">
          <div style="width:4px;height:100px;background:rgba(255,255,255,.3);border-radius:2px;position:relative;transform-origin:top center;animation:pendulumSwing 1.4s ease-in-out infinite;">
            <div style="width:20px;height:20px;background:var(--pr);border-radius:50%;position:absolute;bottom:-20px;left:-8px;"></div>
          </div>
        </div>
        <div style="font-size:12px;color:rgba(255,255,255,.6);">T = 2π√(L/g) | الزمن الدوري للبندول</div>
      </div>`},
    bio:{title:'تجربة الأحياء — الخلية النباتية', html:`
      <div style="text-align:center;width:100%;">
        <div style="font-size:13px;color:rgba(255,255,255,.7);margin-bottom:16px;">مكونات الخلية النباتية</div>
        <svg width="180" height="180" viewBox="0 0 180 180" style="margin:0 auto;">
          <ellipse cx="90" cy="90" rx="80" ry="70" fill="rgba(54,184,71,.1)" stroke="#36B847" stroke-width="3" class="cell-svg"/>
          <rect x="20" y="20" width="140" height="140" rx="5" fill="none" stroke="#1B8A30" stroke-width="2" stroke-dasharray="5,3"/>
          <circle cx="90" cy="90" r="22" fill="rgba(54,184,71,.4)" stroke="#1B8A30" stroke-width="2"/>
          <circle cx="58" cy="58" r="8" fill="rgba(54,184,71,.5)"/>
          <circle cx="122" cy="60" r="6" fill="rgba(54,184,71,.5)"/>
          <circle cx="55" cy="118" r="10" fill="rgba(54,184,71,.5)"/>
          <circle cx="125" cy="115" r="7" fill="rgba(54,184,71,.5)"/>
          <text x="90" y="94" text-anchor="middle" fill="#fff" font-size="10" font-family="Cairo">نواة</text>
          <text x="90" y="170" text-anchor="middle" fill="rgba(255,255,255,.7)" font-size="10" font-family="Cairo">خلية نباتية — الجدار الخلوي</text>
        </svg>
      </div>`},
    ai:{title:'معمل AI — تدريب شبكة عصبية', html:`
      <div style="text-align:center;width:100%;">
        <div style="font-size:13px;color:rgba(255,255,255,.7);margin-bottom:16px;">محاكاة تدريب نموذج تعلم آلي</div>
        <div style="display:flex;justify-content:center;gap:16px;align-items:center;margin-bottom:20px;">
          <div style="display:flex;flex-direction:column;gap:10px;">${[1,2,3].map(i=>`<div class="neural-dot" style="animation-delay:${i*.2}s;"></div>`).join('')}</div>
          <div style="font-size:18px;color:rgba(255,255,255,.4);">→</div>
          <div style="display:flex;flex-direction:column;gap:8px;">${[1,2,3,4].map(i=>`<div class="neural-dot" style="animation-delay:${i*.15}s;background:#9B5AE5;"></div>`).join('')}</div>
          <div style="font-size:18px;color:rgba(255,255,255,.4);">→</div>
          <div style="display:flex;flex-direction:column;gap:12px;">${[1,2].map(i=>`<div class="neural-dot" style="animation-delay:${i*.3}s;background:var(--pr);width:18px;height:18px;"></div>`).join('')}</div>
        </div>
        <div id="ai-train-log" style="font-family:monospace;font-size:12px;color:#4eca78;text-align:right;max-height:80px;overflow:hidden;"></div>
        <button onclick="runAITraining()" style="background:var(--pr);color:#fff;border:none;padding:10px 24px;border-radius:50px;font-family:'Cairo',sans-serif;font-size:13px;cursor:pointer;margin-top:10px;">▶ ابدأ التدريب</button>
      </div>`},
    ohm:{title:'تجربة الفيزياء — قانون أوم', html:`
      <div style="text-align:center;width:100%;color:rgba(255,255,255,.9);">
        <div style="font-size:13px;color:rgba(255,255,255,.7);margin-bottom:16px;">V = I × R — قانون أوم التفاعلي</div>
        <div style="display:flex;justify-content:center;gap:20px;align-items:center;margin-bottom:18px;flex-wrap:wrap;">
          <div style="background:rgba(255,140,66,.15);border-radius:12px;padding:14px;text-align:center;min-width:100px;">
            <div style="font-size:11px;opacity:.7;margin-bottom:6px;">الجهد (V)</div>
            <input id="ohm-v" type="range" min="1" max="24" value="12" oninput="calcOhm()" style="width:80px;accent-color:var(--pr);">
            <div id="ohm-v-val" style="font-size:18px;font-weight:700;margin-top:4px;">12V</div>
          </div>
          <div style="font-size:22px;opacity:.6;">÷</div>
          <div style="background:rgba(100,180,255,.15);border-radius:12px;padding:14px;text-align:center;min-width:100px;">
            <div style="font-size:11px;opacity:.7;margin-bottom:6px;">المقاومة (Ω)</div>
            <input id="ohm-r" type="range" min="1" max="20" value="4" oninput="calcOhm()" style="width:80px;accent-color:#3B8FDB;">
            <div id="ohm-r-val" style="font-size:18px;font-weight:700;margin-top:4px;">4Ω</div>
          </div>
          <div style="font-size:22px;opacity:.6;">=</div>
          <div style="background:rgba(100,220,100,.2);border-radius:12px;padding:14px;text-align:center;min-width:100px;">
            <div style="font-size:11px;opacity:.7;margin-bottom:6px;">التيار (A)</div>
            <div id="ohm-i" style="font-size:28px;font-weight:900;color:#4eca78;">3A</div>
          </div>
        </div>
        <div id="ohm-bar-wrap" style="margin:0 auto;max-width:300px;background:rgba(255,255,255,.1);border-radius:8px;height:16px;overflow:hidden;">
          <div id="ohm-bar" style="height:100%;background:linear-gradient(90deg,#4eca78,var(--pr));border-radius:8px;width:15%;transition:width .4s;"></div>
        </div>
        <div style="font-size:11px;color:rgba(255,255,255,.5);margin-top:8px;">حرّك المنزلقات لتغيير القيم</div>
      </div>`},
    dna:{title:'تجربة الأحياء — نموذج DNA', html:`
      <div style="text-align:center;width:100%;color:rgba(255,255,255,.9);">
        <div style="font-size:13px;color:rgba(255,255,255,.7);margin-bottom:12px;">اضغط على القواعد النيتروجينية لتعلّم التكامل</div>
        <div style="display:flex;justify-content:center;gap:8px;margin-bottom:16px;flex-wrap:wrap;">
          ${['A','T','G','C'].map(b=>`<button onclick="showDNA('${b}')" style="background:${'ATGC'.indexOf(b)<2?'rgba(255,140,66,.3)':'rgba(100,180,255,.3)'};color:#fff;border:1px solid rgba(255,255,255,.2);border-radius:8px;padding:10px 18px;font-family:monospace;font-size:16px;font-weight:700;cursor:pointer;">${b}</button>`).join('')}
        </div>
        <div id="dna-detail" style="background:rgba(255,255,255,.06);border-radius:12px;padding:16px;font-size:13px;line-height:1.8;min-height:60px;text-align:right;"></div>
        <svg width="200" height="100" viewBox="0 0 200 100" style="margin-top:14px;">
          ${[0,1,2,3,4].map(i=>`
            <line x1="20" y1="${20+i*15}" x2="80" y2="${20+i*15}" stroke="rgba(255,140,66,.7)" stroke-width="2"/>
            <line x1="120" y1="${20+i*15}" x2="180" y2="${20+i*15}" stroke="rgba(100,180,255,.7)" stroke-width="2"/>
            <line x1="80" y1="${20+i*15}" x2="120" y2="${20+i*15}" stroke="rgba(255,255,255,.3)" stroke-width="1.5" stroke-dasharray="4,2"/>
          `).join('')}
          <text x="100" y="96" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="9" font-family="Cairo">الحمض النووي DNA — سلسلتان متكاملتان</text>
        </svg>
      </div>`},
    vectors:{title:'معمل الرياضيات — المتجهات', html:`
      <div style="text-align:center;width:100%;color:rgba(255,255,255,.9);">
        <div style="font-size:13px;color:rgba(255,255,255,.7);margin-bottom:14px;">أدخل مكوّنَي المتجه واحسب مقداره</div>
        <div style="display:flex;justify-content:center;gap:16px;align-items:center;margin-bottom:16px;flex-wrap:wrap;">
          <div style="background:rgba(255,140,66,.15);border-radius:10px;padding:12px;text-align:center;">
            <div style="font-size:11px;opacity:.7;margin-bottom:6px;">المركبة x</div>
            <input id="vec-x" type="number" value="3" min="-10" max="10" oninput="calcVector()" style="width:60px;padding:6px;border-radius:6px;border:1px solid rgba(255,140,66,.4);background:rgba(255,255,255,.1);color:#fff;text-align:center;font-size:16px;font-family:Cairo;">
          </div>
          <div style="background:rgba(100,180,255,.15);border-radius:10px;padding:12px;text-align:center;">
            <div style="font-size:11px;opacity:.7;margin-bottom:6px;">المركبة y</div>
            <input id="vec-y" type="number" value="4" min="-10" max="10" oninput="calcVector()" style="width:60px;padding:6px;border-radius:6px;border:1px solid rgba(100,180,255,.4);background:rgba(255,255,255,.1);color:#fff;text-align:center;font-size:16px;font-family:Cairo;">
          </div>
        </div>
        <svg id="vec-svg" width="200" height="200" viewBox="-110 -110 220 220" style="border:1px solid rgba(255,255,255,.1);border-radius:10px;background:rgba(0,0,0,.2);">
          <line x1="-100" y1="0" x2="100" y2="0" stroke="rgba(255,255,255,.2)" stroke-width="1"/>
          <line x1="0" y1="-100" x2="0" y2="100" stroke="rgba(255,255,255,.2)" stroke-width="1"/>
          <line id="vec-arrow" x1="0" y1="0" x2="30" y2="-40" stroke="#FF8C42" stroke-width="2.5" marker-end="url(#arrowhead)"/>
          <defs><marker id="arrowhead" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><polygon points="0 0, 6 3, 0 6" fill="#FF8C42"/></marker></defs>
          <text id="vec-label" x="35" y="-42" fill="#FF8C42" font-size="10" font-family="Cairo">(3,4)</text>
        </svg>
        <div id="vec-result" style="margin-top:12px;font-size:16px;font-weight:700;color:#4eca78;">|v| = √(3²+4²) = 5</div>
      </div>`},
    function_graph:{title:'معمل الرياضيات — رسم الدوال', html:`
      <div style="text-align:center;width:100%;color:rgba(255,255,255,.9);">
        <div style="font-size:13px;color:rgba(255,255,255,.7);margin-bottom:12px;">اختر دالة لرسم مخططها</div>
        <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:14px;">
          <button onclick="plotFn('quad')" style="background:rgba(255,140,66,.3);color:#fff;border:1px solid rgba(255,140,66,.5);border-radius:8px;padding:8px 14px;cursor:pointer;font-family:Cairo;font-size:12px;">y = x²</button>
          <button onclick="plotFn('sin')" style="background:rgba(100,180,255,.3);color:#fff;border:1px solid rgba(100,180,255,.5);border-radius:8px;padding:8px 14px;cursor:pointer;font-family:Cairo;font-size:12px;">y = sin(x)</button>
          <button onclick="plotFn('linear')" style="background:rgba(100,220,100,.3);color:#fff;border:1px solid rgba(100,220,100,.5);border-radius:8px;padding:8px 14px;cursor:pointer;font-family:Cairo;font-size:12px;">y = 2x+1</button>
          <button onclick="plotFn('abs')" style="background:rgba(155,90,229,.3);color:#fff;border:1px solid rgba(155,90,229,.5);border-radius:8px;padding:8px 14px;cursor:pointer;font-family:Cairo;font-size:12px;">y = |x|</button>
        </div>
        <canvas id="fn-canvas" width="280" height="160" style="border:1px solid rgba(255,255,255,.1);border-radius:10px;background:#0d1117;"></canvas>
        <div id="fn-info" style="margin-top:10px;font-size:12px;color:rgba(255,255,255,.6);">اضغط على دالة لرسمها</div>
      </div>`},
    arabic_analysis:{title:'معمل اللغة — تحليل النص الأدبي', html:`
      <div style="text-align:center;width:100%;color:rgba(255,255,255,.9);">
        <div style="font-size:13px;color:rgba(255,255,255,.7);margin-bottom:16px;">نموذج تحليل نصي — الأول الثانوي أدبي</div>
        <div style="background:rgba(255,255,255,.05);border-radius:10px;padding:16px;text-align:right;margin-bottom:14px;border:1px solid rgba(255,140,66,.2);">
          <p style="font-size:13px;line-height:1.8;color:rgba(255,255,255,.85);">"العلمُ نورٌ يُضيءُ ظُلمةَ الجهلِ ويرفعُ الأمةَ إلى أعلى المراتبِ وأسمى الدرجاتِ"</p>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;text-align:right;margin-bottom:14px;">
          <div style="background:rgba(255,140,66,.1);border-radius:8px;padding:12px;"><div style="font-size:10px;color:rgba(255,255,255,.5);margin-bottom:4px;">النوع الأدبي</div><div style="font-size:12px;font-weight:700;">نثر — أسلوب خطابي</div></div>
          <div style="background:rgba(255,140,66,.1);border-radius:8px;padding:12px;"><div style="font-size:10px;color:rgba(255,255,255,.5);margin-bottom:4px;">الصورة البيانية</div><div style="font-size:12px;font-weight:700;">تشبيه: العلم كالنور</div></div>
          <div style="background:rgba(255,140,66,.1);border-radius:8px;padding:12px;"><div style="font-size:10px;color:rgba(255,255,255,.5);margin-bottom:4px;">المحسن البديعي</div><div style="font-size:12px;font-weight:700;">طباق: نور ↔ ظلمة</div></div>
          <div style="background:rgba(255,140,66,.1);border-radius:8px;padding:12px;"><div style="font-size:10px;color:rgba(255,255,255,.5);margin-bottom:4px;">الأسلوب</div><div style="font-size:12px;font-weight:700;">خبري تقريري</div></div>
        </div>
        <div id="lab-log" style="margin-top:8px;"></div>
      </div>`},
    rhetoric:{title:'معمل البلاغة — الصور الأدبية', html:`
      <div style="width:100%;color:rgba(255,255,255,.9);">
        <div style="font-size:13px;color:rgba(255,255,255,.7);margin-bottom:16px;text-align:center;">أنواع الصور البيانية — اضغط للتوضيح</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
          <div onclick="showRhetoric('tashbih')" style="background:rgba(255,140,66,.15);border:1px solid rgba(255,140,66,.3);border-radius:10px;padding:14px;cursor:pointer;text-align:center;"><div style="font-size:22px;margin-bottom:6px;">🔗</div><div style="font-size:13px;font-weight:700;">التشبيه</div><div style="font-size:10px;opacity:.7;margin-top:3px;">مقارنة شيئين</div></div>
          <div onclick="showRhetoric('majaz')" style="background:rgba(100,180,255,.1);border:1px solid rgba(100,180,255,.2);border-radius:10px;padding:14px;cursor:pointer;text-align:center;"><div style="font-size:22px;margin-bottom:6px;">💫</div><div style="font-size:13px;font-weight:700;">الاستعارة</div><div style="font-size:10px;opacity:.7;margin-top:3px;">نقل المعنى</div></div>
          <div onclick="showRhetoric('kinaya')" style="background:rgba(100,220,100,.1);border:1px solid rgba(100,220,100,.2);border-radius:10px;padding:14px;cursor:pointer;text-align:center;"><div style="font-size:22px;margin-bottom:6px;">💬</div><div style="font-size:13px;font-weight:700;">الكناية</div><div style="font-size:10px;opacity:.7;margin-top:3px;">التلميح لمعنى</div></div>
          <div onclick="showRhetoric('tibaq')" style="background:rgba(155,90,229,.1);border:1px solid rgba(155,90,229,.2);border-radius:10px;padding:14px;cursor:pointer;text-align:center;"><div style="font-size:22px;margin-bottom:6px;">⚖️</div><div style="font-size:13px;font-weight:700;">الطباق</div><div style="font-size:10px;opacity:.7;margin-top:3px;">الجمع بين الضدين</div></div>
        </div>
        <div id="rhetoric-detail" style="margin-top:14px;padding:12px;background:rgba(255,255,255,.05);border-radius:8px;font-size:12px;line-height:1.8;min-height:40px;"></div>
      </div>`},
    history_sim:{title:'معمل التاريخ — خط زمني تفاعلي', html:`
      <div style="width:100%;color:rgba(255,255,255,.9);">
        <div style="font-size:13px;color:rgba(255,255,255,.7);margin-bottom:16px;text-align:center;">خط زمني للحضارات — المنهج 2025-2026</div>
        <div style="position:relative;padding:10px 0;">
          <div style="height:3px;background:rgba(255,140,66,.4);border-radius:2px;margin:40px 10px;position:relative;">
            <div style="position:absolute;top:-28px;left:5%;text-align:center;"><div style="background:rgba(255,200,100,.8);width:12px;height:12px;border-radius:50%;margin:0 auto 4px;"></div><div style="font-size:9px;color:rgba(255,200,100,.9);">3000ق.م</div><div style="font-size:8px;opacity:.7;">مصر القديمة</div></div>
            <div style="position:absolute;top:-28px;left:25%;text-align:center;"><div style="background:rgba(255,140,66,.8);width:12px;height:12px;border-radius:50%;margin:0 auto 4px;"></div><div style="font-size:9px;color:rgba(255,140,66,.9);">500ق.م</div><div style="font-size:8px;opacity:.7;">اليونان</div></div>
            <div style="position:absolute;top:-28px;left:45%;text-align:center;"><div style="background:rgba(100,180,255,.8);width:12px;height:12px;border-radius:50%;margin:0 auto 4px;"></div><div style="font-size:9px;color:rgba(100,180,255,.9);">700م</div><div style="font-size:8px;opacity:.7;">الحضارة الإسلامية</div></div>
            <div style="position:absolute;top:-28px;left:65%;text-align:center;"><div style="background:rgba(100,220,100,.8);width:12px;height:12px;border-radius:50%;margin:0 auto 4px;"></div><div style="font-size:9px;color:rgba(100,220,100,.9);">1500م</div><div style="font-size:8px;opacity:.7;">النهضة</div></div>
            <div style="position:absolute;top:-28px;left:85%;text-align:center;"><div style="background:rgba(155,90,229,.8);width:12px;height:12px;border-radius:50%;margin:0 auto 4px;"></div><div style="font-size:9px;color:rgba(155,90,229,.9);">1800م</div><div style="font-size:8px;opacity:.7;">الحداثة</div></div>
          </div>
        </div>
        <div id="lab-log" style="margin-top:30px;font-size:12px;color:rgba(255,255,255,.7);text-align:center;">اضغط على أي نقطة لعرض التفاصيل</div>
      </div>`},
    logic:{title:'معمل المنطق — القياس الصوري', html:`
      <div style="width:100%;color:rgba(255,255,255,.9);">
        <div style="font-size:13px;color:rgba(255,255,255,.7);margin-bottom:16px;text-align:center;">تدريب على القياس المنطقي الصوري</div>
        <div style="background:rgba(255,255,255,.05);border-radius:10px;padding:16px;text-align:right;margin-bottom:14px;">
          <div style="font-size:12px;font-weight:700;color:rgba(255,140,66,.9);margin-bottom:8px;">القضية الكبرى:</div>
          <div style="font-size:13px;margin-bottom:12px;">كل إنسان فانٍ</div>
          <div style="font-size:12px;font-weight:700;color:rgba(255,140,66,.9);margin-bottom:8px;">القضية الصغرى:</div>
          <div style="font-size:13px;margin-bottom:12px;">أرسطو إنسان</div>
          <div style="height:1px;background:rgba(255,140,66,.3);margin-bottom:12px;"></div>
          <div style="font-size:12px;font-weight:700;color:rgba(100,220,100,.9);margin-bottom:6px;">∴ النتيجة:</div>
          <div id="logic-result" style="font-size:14px;font-weight:700;"></div>
        </div>
        <button onclick="showLogicResult()" style="background:var(--pr);color:#fff;border:none;padding:10px 24px;border-radius:50px;font-family:Cairo,sans-serif;font-size:13px;cursor:pointer;">استنتج النتيجة ←</button>
        <div id="lab-log" style="margin-top:14px;"></div>
      </div>`}
  };
  const cfg=configs[type]||configs.chem;
  canvas.innerHTML=cfg.html;
}

function startLabSim(){
  const tube=document.getElementById('result-tube');
  const log=document.getElementById('lab-log');
  if(tube){ const liq=tube.querySelector('.lab-liquid'); if(liq){ liq.style.height='55%'; liq.style.background='#26C6DA'; } }
  const steps=['⚗️ تحضير المواد...','🌡️ درجة الحرارة: 25°C','💧 إضافة HCl...','⚡ بدء التفاعل...','🟢 اكتمل! pH=7 محلول متعادل ✓'];
  let i=0;
  if(log){ log.innerHTML=''; function step(){ if(i>=steps.length)return; const p=document.createElement('p'); p.style.cssText='color:#4eca78;font-family:monospace;font-size:12px;margin-bottom:4px;'; p.textContent=steps[i++]; log.appendChild(p); setTimeout(step,600); } step(); }
}

function runAITraining(){
  const logEl=document.getElementById('ai-train-log');
  if(!logEl)return;
  logEl.innerHTML='';
  const lines=['Epoch 1/5 — loss: 2.45 accuracy: 0.32','Epoch 2/5 — loss: 1.87 accuracy: 0.51','Epoch 3/5 — loss: 1.23 accuracy: 0.68','Epoch 4/5 — loss: 0.76 accuracy: 0.82','Epoch 5/5 — loss: 0.42 accuracy: 0.94 ✓'];
  let i=0;
  function step(){ if(i>=lines.length)return; const p=document.createElement('p'); p.textContent=lines[i++]; logEl.appendChild(p); setTimeout(step,700); }
  step();
}

function calcOhm(){
  const v=parseFloat(document.getElementById('ohm-v').value)||12;
  const r=parseFloat(document.getElementById('ohm-r').value)||4;
  const current=(v/r).toFixed(2);
  const vv=document.getElementById('ohm-v-val'),rv=document.getElementById('ohm-r-val'),iv=document.getElementById('ohm-i'),bar=document.getElementById('ohm-bar');
  if(vv)vv.textContent=v+'V';
  if(rv)rv.textContent=r+'Ω';
  if(iv)iv.textContent=current+'A';
  if(bar)bar.style.width=Math.min(100,(parseFloat(current)/24*100))+'%';
}

function showDNA(base){
  const info={
    A:'الأدينين (A) — يرتبط دائماً مع الثايمين (T) برابطتين هيدروجينيتين',
    T:'الثايمين (T) — يرتبط دائماً مع الأدينين (A) برابطتين هيدروجينيتين',
    G:'الغوانين (G) — يرتبط دائماً مع السيتوزين (C) بثلاث روابط هيدروجينية',
    C:'السيتوزين (C) — يرتبط دائماً مع الغوانين (G) بثلاث روابط هيدروجينية'
  };
  const el=document.getElementById('dna-detail');
  if(el)el.innerHTML=`<span style="font-size:20px;font-weight:900;color:${'AT'.includes(base)?'#FF8C42':'#3B8FDB'};">${base}</span> → ${info[base]}`;
}

function calcVector(){
  const x=parseFloat(document.getElementById('vec-x').value)||0;
  const y=parseFloat(document.getElementById('vec-y').value)||0;
  const mag=Math.sqrt(x*x+y*y).toFixed(2);
  const scale=15;
  const arrow=document.getElementById('vec-arrow');
  const label=document.getElementById('vec-label');
  const res=document.getElementById('vec-result');
  if(arrow){arrow.setAttribute('x2',x*scale);arrow.setAttribute('y2',-y*scale);}
  if(label){label.setAttribute('x',x*scale+5);label.setAttribute('y',-y*scale-5);label.textContent=`(${x},${y})`;}
  if(res)res.textContent=`|v| = √(${x}²+${y}²) = ${mag}`;
}

function plotFn(type){
  const canvas=document.getElementById('fn-canvas');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const W=canvas.width,H=canvas.height,cx=W/2,cy=H/2,scale=20;
  ctx.clearRect(0,0,W,H);
  ctx.strokeStyle='rgba(255,255,255,.15)'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(0,cy); ctx.lineTo(W,cy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx,0); ctx.lineTo(cx,H); ctx.stroke();
  const fns={quad:x=>x*x, sin:x=>4*Math.sin(x), linear:x=>2*x+1, abs:x=>Math.abs(x)};
  const colors={quad:'#FF8C42',sin:'#3B8FDB',linear:'#36B847',abs:'#9B5AE5'};
  const labels={quad:'y = x²',sin:'y = sin(x)',linear:'y = 2x+1',abs:'y = |x|'};
  const fn=fns[type]; const color=colors[type];
  ctx.strokeStyle=color; ctx.lineWidth=2.5; ctx.beginPath();
  let first=true;
  for(let px=0;px<W;px++){
    const x=(px-cx)/scale;
    const y=fn(x);
    const py=cy-y*scale;
    if(first){ctx.moveTo(px,py);first=false;}else{ctx.lineTo(px,py);}
  }
  ctx.stroke();
  const info=document.getElementById('fn-info');
  if(info)info.textContent=`الدالة: ${labels[type]}`;
}

// ============================================================
// CODE EDITOR
// ============================================================
function runCode(){
  const code=document.getElementById('code-editor').value;
  const out=document.getElementById('code-output');
  out.innerHTML='<span style="color:#888;">>>> تشغيل الكود...</span><br>';
  setTimeout(()=>{
    let result='';
    if(code.includes('greet'))result+='مرحباً! أهلاً في SmartLearn HS 🎓\n';
    if(code.includes('random'))result+='أرقام عشوائية: [42, 17, 83, 29, 61, 74, 8, 95, 33, 51]\nالمتوسط: 49.3\n';
    if(code.includes('print')&&!result)result+='Hello, World!\n';
    if(!result)result='تم تشغيل الكود بنجاح ✓\n';
    out.innerHTML='<span style="color:#4eca78;">'+result.replace(/\n/g,'<br>')+'</span>';
  },500);
}
function clearCode(){ document.getElementById('code-editor').value=''; document.getElementById('code-output').innerHTML='>>> جاهز للتشغيل...'; }

// ============================================================
// AI CONTENT GENERATION — مولّد محتوى بالذكاء الاصطناعي الحقيقي
// ============================================================
const AI_TYPE_PROMPTS = {
  quiz:'اكتب اختباراً من 10 أسئلة اختيار من متعدد (4 خيارات لكل سؤال) مع الإجابة الصحيحة والشرح في النهاية.',
  summary:'اكتب ملخصاً تعليمياً منظماً للموضوع — يبدأ بمقدمة، ثم النقاط الرئيسية كنقاط واضحة، ثم خلاصة عملية.',
  video:'اقترح محتوى فيديو تعليمي لهذا الموضوع: وصف لفيديو قصير (3-5 دقائق)، النقاط الرئيسية التي يجب تغطيتها، أمثلة بصرية مقترحة، وأسئلة للتفكير أثناء المشاهدة.',
  podcast:'اكتب سيناريو بودكاست تعليمي مدته 5 دقائق بصوت معلم ودود. يبدأ بترحيب، ثم شرح الموضوع بأمثلة من حياة الطالب، ثم تلخيص ودعوة للتفكير.',
  pdf:'اكتب ملخصاً تعليميًا منظمًا ومهيأً للطباعة كملف PDF. ضمّن عناوين فرعية، نقاط أساسية، أمثلة قصيرة، وأقسام تلخيصية لكل وحدة.',
  mindmap:'صمم خريطة ذهنية نصية للموضوع: الفكرة المركزية في الأعلى، ثم 4-6 فروع رئيسية، ولكل فرع 2-3 فروع فرعية باستخدام مسافات ورموز.',
  ppt:'صمم 8-12 شريحة عرض تقديمي. لكل شريحة: عنوان + 3-5 نقاط محددة. اكتبها بشكل: "الشريحة 1: العنوان" ثم النقاط.',
  explain:'اشرح الموضوع خطوة بخطوة بتدرج منطقي مع أمثلة محسوسة من بيئة الطالب المصري ورموز توضيحية. اختم بسؤال تحقق من الفهم.',
  exercises:'اكتب 8 تمارين تطبيقية متدرجة من السهل إلى الصعب، مع حل مفصل لكل تمرين بعد سرد التمارين كلها.',
  review:'اكتب مراجعة سريعة لما قبل الامتحان: قائمة بأهم المفاهيم، ثم 5 أسئلة محتملة في الامتحان مع نقاط الإجابة المثالية.'
};

const AI_TYPE_LABELS = {
  quiz:'اختبار MCQ',summary:'ملخص نصي',pdf:'ملف PDF تعليمي',video:'محتوى فيديو',podcast:'بودكاست تعليمي',
  mindmap:'خريطة ذهنية',ppt:'شرائح عرض',explain:'شرح مفصل',exercises:'تمارين متدرجة',review:'مراجعة سريعة'
};

const SUBJECT_NAMES = {
  cs:'البرمجة والذكاء الاصطناعي',math:'الرياضيات',arabic:'اللغة العربية',
  english:'اللغة الإنجليزية',french:'اللغة الفرنسية',science:'العلوم المتكاملة',
  history:'التاريخ',religion:'التربية الدينية',philo:'الفلسفة والمنطق'
};

const LEVEL_HINTS = {
  'ضعيف':'الطالب مبتدئ — استخدم لغة بسيطة جداً، أمثلة من الحياة اليومية، تجنب المصطلحات الصعبة، ركّز على الأساسيات.',
  'متوسط':'الطالب متوسط — اشرح بأسلوب متوازن مع أمثلة وتطبيقات، اربط بمعرفة سابقة، لا تتعمق في التفاصيل المتقدمة.',
  'ممتاز':'الطالب متفوق — قدّم محتوى متقدماً مع تحديات، اربط بمواضيع متعلقة، اطرح أسئلة تطبيقية أعلى مستوى.'
};

let _lastAIResult = '';

async function generateAIContent(){
  const topic = (document.getElementById('ai-topic')?.value || 'الموضوع').trim();
  const subjKey = document.getElementById('ai-subject')?.value || 'cs';
  const level = document.getElementById('ai-level')?.value || 'متوسط';
  const result = document.getElementById('ai-gen-result');
  const actions = document.getElementById('ai-gen-actions');
  const btn = document.getElementById('ai-gen-btn');
  const grade = localStorage.getItem('currentGrade') || 'الأول الثانوي';

  if(!result) return;

  // إذا لم يتم اختيار نوع المحتوى بعد، أظهر خيارات التفاعلية
  if(!document.getElementById('ai-content-type').value || document.getElementById('ai-content-type').value === ''){
    showContentTypeSelection();
    return;
  }

  const typeKey = document.getElementById('ai-content-type').value;

  if(actions) actions.classList.add('hidden');
  result.classList.remove('hidden');
  result.textContent = '⏳ جارٍ توليد المحتوى بالذكاء الاصطناعي...';
  if(btn){ btn.disabled = true; btn.style.opacity = '.6'; btn.textContent = '⏳ يولّد...'; }

  const subjectName = SUBJECT_NAMES[subjKey] || subjKey;
  const typeInstruction = AI_TYPE_PROMPTS[typeKey] || AI_TYPE_PROMPTS.summary;
  const typeLabel = AI_TYPE_LABELS[typeKey] || 'محتوى';
  const levelHint = LEVEL_HINTS[level] || '';

  // ابحث في المنهج عن معلومات ذات صلة بالموضوع
  let curriculumInfo = '';
  const units = CURRICULUM[subjKey] || [];
  for(const unit of units){
    if(unit.unit && topic.toLowerCase().includes(unit.unit.toLowerCase())){
      curriculumInfo += `وحدة: ${unit.unit}\nالدروس: ${unit.lessons.join(', ')}\n`;
    }
    for(const lesson of unit.lessons){
      if(topic.toLowerCase().includes(lesson.toLowerCase())){
        curriculumInfo += `درس: ${lesson} (من وحدة ${unit.unit})\n`;
      }
    }
  }
  if(curriculumInfo) curriculumInfo = `\nمعلومات من المنهج:\n${curriculumInfo}`;

  const system = `أنت معلم خبير لطلاب الثانوي العام المصري متخصص في ${subjectName}. الطالب في ${grade}، مستواه ${level}. ${levelHint} اكتب باللغة العربية فقط (مع المصطلحات الإنجليزية في مادة البرمجة والإنجليزية فقط)، بشكل منظم باستخدام عناوين ونقاط ورموز توضيحية. اعتمد على المنهج الرسمي المصري ولا تذكر اسم أي شركة أو نموذج ذكاء اصطناعي.`;

  const user = `${typeInstruction}\n\nالمادة: ${subjectName}\nالموضوع: ${topic}\nمستوى الطالب: ${level}${curriculumInfo}\n\nاكتب الآن المحتوى مباشرة دون مقدمات.`;

  let reply = null;
  try{
    const res = await fetch('https://text.pollinations.ai/',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        messages:[{role:'system',content:system},{role:'user',content:user}],
        model:'openai',
        private:true
      })
    });
    if(res.ok){ reply = (await res.text()).trim(); }
  }catch(e){}

  if(btn){ btn.disabled = false; btn.style.opacity = ''; btn.textContent = 'توليد المحتوى الآن ✨'; }

  if(!reply){
    result.innerHTML = '⚠️ تعذّر الاتصال بخدمة التوليد. تحققي من الاتصال بالإنترنت ثم حاولي مرة أخرى.';
    return;
  }

  // تخصيص الرد حسب نوع المحتوى
  let formattedReply = reply;
  if(typeKey === 'video'){
    formattedReply = `🎥 **اقتراح فيديو تعليمي:**\n\n${reply}\n\n💡 **نصائح للفيديو:**\n• ابحث عن هذا الموضوع على YouTube\n• شاهد الفيديوهات التعليمية من قنوات موثوقة\n• خذ ملاحظات أثناء المشاهدة\n• أعد مشاهدة الأجزاء الصعبة`;
  } else if(typeKey === 'podcast'){
    formattedReply = `🎙️ **سيناريو بودكاست تعليمي:**\n\n${reply}\n\n🎧 **كيف تستخدم هذا السيناريو:**\n• اقرأه بصوت عالٍ كما لو كنت تقدم بودكاست\n• سجله بتطبيق التسجيل على هاتفك\n• شاركه مع زملائك للمراجعة الجماعية`;
  } else if(typeKey === 'pdf'){
    formattedReply = `📄 **ملخص قابل للطباعة كـ PDF:**\n\n${reply}\n\n💡 **استخدام هذا الملخص:**\n• يمكنك نسخه إلى محرّر نصوص وطباعته أو حفظه كـ PDF\n• استخدمه لمراجعة المادة قبل الامتحان\n• احفظه كنقطة مرجعية لكل وحدة`;
  }

  _lastAIResult = `🤖 ${typeLabel} — ${subjectName}\n📌 الموضوع: ${topic}\n🎯 المستوى: ${level}\n${'─'.repeat(40)}\n\n${formattedReply}`;
  result.innerHTML = _lastAIResult.replace(/\n/g, '<br>');
  if(actions) actions.classList.remove('hidden');
}

function showContentTypeSelection(){
  const modal = document.getElementById('ai-gen-modal');
  const content = modal.querySelector('.modal');
  const existingSelection = document.getElementById('content-type-selection');

  if(existingSelection){
    existingSelection.remove();
  }

  const selectionDiv = document.createElement('div');
  selectionDiv.id = 'content-type-selection';
  selectionDiv.innerHTML = `
    <div style="background: var(--prl); padding: 20px; border-radius: var(--r3); margin: 20px 0; border: 2px solid var(--prd);">
      <h4 style="color: var(--prd); margin-bottom: 15px; font-size: 16px;">🎯 اختر نوع المحتوى المطلوب</h4>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
        <button class="content-type-btn" data-type="summary" style="display: flex; align-items: center; gap: 8px; padding: 12px; background: white; border: 1px solid var(--b2); border-radius: var(--r2); cursor: pointer; transition: all 0.2s;">
          <span>📋</span>
          <div style="text-align: right;">
            <div style="font-weight: 600; font-size: 14px;">ملخص نصي</div>
            <div style="font-size: 12px; color: var(--tx3);">شرح مكتوب شامل</div>
          </div>
        </button>
        <button class="content-type-btn" data-type="video" style="display: flex; align-items: center; gap: 8px; padding: 12px; background: white; border: 1px solid var(--b2); border-radius: var(--r2); cursor: pointer; transition: all 0.2s;">
          <span>🎥</span>
          <div style="text-align: right;">
            <div style="font-weight: 600; font-size: 14px;">محتوى فيديو</div>
            <div style="font-size: 12px; color: var(--tx3);">اقتراحات وأفكار فيديو</div>
          </div>
        </button>
        <button class="content-type-btn" data-type="podcast" style="display: flex; align-items: center; gap: 8px; padding: 12px; background: white; border: 1px solid var(--b2); border-radius: var(--r2); cursor: pointer; transition: all 0.2s;">
          <span>🎙️</span>
          <div style="text-align: right;">
            <div style="font-weight: 600; font-size: 14px;">بودكاست تعليمي</div>
            <div style="font-size: 12px; color: var(--tx3);">سيناريو للبودكاست</div>
          </div>
        </button>
        <button class="content-type-btn" data-type="quiz" style="display: flex; align-items: center; gap: 8px; padding: 12px; background: white; border: 1px solid var(--b2); border-radius: var(--r2); cursor: pointer; transition: all 0.2s;">
          <span>📝</span>
          <div style="text-align: right;">
            <div style="font-weight: 600; font-size: 14px;">اختبار تفاعلي</div>
            <div style="font-size: 12px; color: var(--tx3);">أسئلة متعددة الخيارات</div>
          </div>
        </button>
        <button class="content-type-btn" data-type="mindmap" style="display: flex; align-items: center; gap: 8px; padding: 12px; background: white; border: 1px solid var(--b2); border-radius: var(--r2); cursor: pointer; transition: all 0.2s;">
          <span>🗺️</span>
          <div style="text-align: right;">
            <div style="font-weight: 600; font-size: 14px;">خريطة ذهنية</div>
            <div style="font-size: 12px; color: var(--tx3);">تنظيم المعلومات بصرياً</div>
          </div>
        </button>
        <button class="content-type-btn" data-type="exercises" style="display: flex; align-items: center; gap: 8px; padding: 12px; background: white; border: 1px solid var(--b2); border-radius: var(--r2); cursor: pointer; transition: all 0.2s;">
          <span>✍️</span>
          <div style="text-align: right;">
            <div style="font-weight: 600; font-size: 14px;">تمارين تطبيقية</div>
            <div style="font-size: 12px; color: var(--tx3);">تدريبات عملية</div>
          </div>
        </button>
      </div>
      <p style="font-size: 12px; color: var(--tx3); margin-top: 15px; text-align: center;">
        💡 الذكاء الاصطناعي سيقوم بتخصيص المحتوى حسب مستواك ومنهجك الدراسي
      </p>
    </div>
  `;

  // إدراج قبل زر التوليد
  const genBtn = document.getElementById('ai-gen-btn');
  genBtn.parentNode.insertBefore(selectionDiv, genBtn);

  // إضافة event listeners للأزرار
  const buttons = selectionDiv.querySelectorAll('.content-type-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', function(){
      const type = this.getAttribute('data-type');
      document.getElementById('ai-content-type').value = type;

      // تحديث المظهر
      buttons.forEach(b => b.style.background = 'white');
      this.style.background = 'var(--prl)';
      this.style.borderColor = 'var(--prd)';

      // إزالة التحديد وإظهار زر التوليد
      setTimeout(() => {
        selectionDiv.remove();
        generateAIContent();
      }, 300);
    });

    // تأثير hover
    btn.addEventListener('mouseenter', function(){
      if(!this.style.background.includes('var(--prl)')){
        this.style.background = 'var(--prl)';
        this.style.transform = 'translateY(-2px)';
      }
    });
    btn.addEventListener('mouseleave', function(){
      if(document.getElementById('ai-content-type').value !== this.getAttribute('data-type')){
        this.style.background = 'white';
        this.style.transform = 'translateY(0)';
      }
    });
  });
}

function copyAIResult(){
  if(!_lastAIResult) return;
  navigator.clipboard.writeText(_lastAIResult).then(()=>{
    const btn = event.target;
    const orig = btn.textContent;
    btn.textContent = '✓ تم النسخ';
    setTimeout(()=>btn.textContent = orig, 1500);
  }).catch(()=>alert('تعذّر النسخ — يمكنك تحديد النص يدوياً'));
}

function downloadAIResult(){
  if(!_lastAIResult) return;
  const blob = new Blob([_lastAIResult], {type:'text/plain;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const subj = SUBJECT_NAMES[document.getElementById('ai-subject')?.value]||'محتوى';
  const topic = (document.getElementById('ai-topic')?.value||'درس').replace(/[^؀-ۿa-zA-Z0-9]/g,'_').slice(0,40);
  a.download = `SmartLearnHS_${subj}_${topic}.txt`;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// املأ قائمة المواد في مولّد AI حسب التخصص الحالي للطالب — حتى لا يرى المواد التي لا تخصه
function populateAISubjectDropdown(targetSubj){
  const sel = document.getElementById('ai-subject');
  if(!sel) return;
  const allowed = SUBJECTS;
  sel.innerHTML = allowed.map(s => `<option value="${s.id}">${s.icon} ${s.name}</option>`).join('');
  if(targetSubj && allowed.some(s=>s.id===targetSubj)){
    sel.value = targetSubj;
  }
}

// املأ قائمة الموضوعات من المنهج الحقيقي للمادة المختارة
function populateAITopicDropdown(subjId){
  const sel = document.getElementById('ai-topic-select');
  const inp = document.getElementById('ai-topic');
  if(!sel) return;
  const units = CURRICULUM[subjId] || [];
  const opts = ['<option value="">— اختاري موضوعاً من المنهج —</option>'];
  units.forEach(u => {
    opts.push(`<optgroup label="${u.unit}">`);
    u.lessons.forEach(l => opts.push(`<option value="${l}">${l}</option>`));
    opts.push('</optgroup>');
  });
  sel.innerHTML = opts.join('');
  // عند اختيار درس من القائمة انسخه إلى حقل الإدخال الحر
  sel.onchange = () => { if(sel.value && inp){ inp.value = sel.value; } };
}

// فتح مولّد المحتوى مع نوع محدد مسبقاً ومادة الطالب الحالية ومستواه
function openAIGen(type, subjId){
  openModal('ai-gen-modal');
  const typeSel = document.getElementById('ai-content-type');
  if(typeSel){ typeSel.value = type || 'summary'; }
  const targetSubj = subjId || currentSubjectId || 'cs';
  // املأ قائمة المواد بحسب تخصص الطالب
  populateAISubjectDropdown(targetSubj);
  const subjSel = document.getElementById('ai-subject');
  // املأ قائمة الموضوعات من المنهج الحقيقي
  const finalSubj = subjSel ? subjSel.value : targetSubj;
  populateAITopicDropdown(finalSubj);
  // اربط تغيير المادة بإعادة بناء قائمة الموضوعات
  if(subjSel){
    subjSel.onchange = () => populateAITopicDropdown(subjSel.value);
  }
  // عيّن المستوى تلقائياً من sessionStorage إن وُجد
  const lvl = sessionStorage.getItem('level_'+finalSubj);
  const lvlSel = document.getElementById('ai-level');
  if(lvlSel && lvl){ lvlSel.value = lvl; }
  // ضبط حقل الموضوع تبعاً للمادة (أول درس من أول وحدة)
  const topicInp = document.getElementById('ai-topic');
  if(topicInp){
    const units = CURRICULUM[finalSubj] || [];
    const first = units[0] && units[0].lessons[0];
    if(first) topicInp.value = first;
  }
  // إخفاء النتائج السابقة
  const res = document.getElementById('ai-gen-result');
  const acts = document.getElementById('ai-gen-actions');
  if(res) res.classList.add('hidden');
  if(acts) acts.classList.add('hidden');
}

// ============================================================
// TEACHER UPLOAD PREVIEW
// ============================================================
function previewUpload(input, type){
  const file=input.files[0];
  if(!file)return;
  const previewEl=document.getElementById('preview-'+type);
  if(!previewEl)return;
  const size=(file.size/1024/1024).toFixed(2);
  previewEl.innerHTML=`✅ تم اختيار: <strong>${file.name}</strong> (${size} ميجا)
    <button onclick="confirmUpload('${type}')" style="background:var(--pr);color:#fff;border:none;padding:5px 12px;border-radius:20px;font-size:11px;cursor:pointer;margin-right:8px;font-family:'Cairo',sans-serif;">رفع الملف</button>`;
}
function confirmUpload(type){
  const names={video:'الفيديو',pdf:'PDF',cv:'السيرة الذاتية'};
  alert(`✅ تم رفع ${names[type]||type} بنجاح! سيظهر للطلاب خلال دقائق.`);
}

// ============================================================
// OTHER FUNCTIONS
// ============================================================
function selectChild(btn, name){
  document.querySelectorAll('.child-btn').forEach(b=>b.classList.remove('active'));
  if(btn) btn.classList.add('active');
  const child = parentChildren.find(c=>c.name===name);
  const firstName = name.split(' ')[0];
  const el = document.getElementById('child-name-stat');
  const rn = document.getElementById('child-report-name');
  const avg = document.getElementById('child-avg');
  const codeEl = document.getElementById('child-code');
  const stageEl = document.getElementById('child-stage');
  const levelEl = document.getElementById('child-level');
  if(el) el.textContent = firstName;
  if(rn) rn.textContent = firstName;
  if(avg) avg.textContent = child ? child.avg : '80%';
  if(codeEl) codeEl.textContent = child ? child.code : 'غير متوفر';
  if(stageEl) stageEl.textContent = child ? child.stage : 'غير محدد';
  if(levelEl) levelEl.textContent = child ? child.level : 'غير محدد';
  renderChildDetails(child);
}

const parentChildren = [
  {
    name:'أحمد محمد', code:'P001', stage:'الصف الأول الثانوي', level:'المستوى المتقدم', avg:'88%', attendance:'95%', studyTime:'4.5 س', points:'2,450',
    subjects:[
      {name:'البرمجة والذكاء الاصطناعي', score:'88%', completed:'9 / 12', lastTest:'92%', recommendation:'ممتاز — استمر'},
      {name:'الرياضيات', score:'72%', completed:'11 / 18', lastTest:'68%', recommendation:'يحتاج مراجعة'},
      {name:'الكيمياء', score:'58%', completed:'6 / 14', lastTest:'54%', recommendation:'دعم إضافي فوراً'}
    ]
  },
  {
    name:'سارة محمد', code:'P002', stage:'الصف الأول الثانوي', level:'المستوى المتوسط', avg:'91%', attendance:'98%', studyTime:'5 س', points:'2,900',
    subjects:[
      {name:'الفيزياء', score:'93%', completed:'12 / 12', lastTest:'96%', recommendation:'ممتاز'},
      {name:'الأحياء', score:'84%', completed:'10 / 12', lastTest:'88%', recommendation:'متابعة خفيفة'},
      {name:'الرياضيات', score:'79%', completed:'13 / 18', lastTest:'81%', recommendation:'مراجعة بسيطة'}
    ]
  },
  {
    name:'يوسف محمد', code:'P003', stage:'الصف الثاني الثانوي', level:'المستوى المبتدئ', avg:'74%', attendance:'87%', studyTime:'3.2 س', points:'1,760',
    subjects:[
      {name:'اللغة العربية', score:'78%', completed:'14 / 16', lastTest:'75%', recommendation:'حافظ على القراءة اليومية'},
      {name:'الإنجليزي', score:'68%', completed:'10 / 14', lastTest:'65%', recommendation:'يرجى مراجعة القواعد'},
      {name:'الدراسات', score:'70%', completed:'8 / 12', lastTest:'72%', recommendation:'دعم بالمراجعة'}
    ]
  }
];

function renderParentChildren(){
  const homeContainer=document.getElementById('parent-home-children');
  const childrenContainer=document.getElementById('parent-children-list');
  [homeContainer, childrenContainer].forEach(container=>{
    if(!container) return;
    container.innerHTML = '';
    parentChildren.forEach(child=>{
      const btn=document.createElement('button');
      btn.className='child-btn';
      const icon = child.name.startsWith('س') ? '👧' : '👦';
      btn.textContent = `${icon} ${child.name}`;
      btn.onclick=()=>selectChild(btn, child.name);
      container.appendChild(btn);
    });
  });
  const activeBtn = document.querySelector('#parent-home-children .child-btn');
  if(activeBtn){ activeBtn.classList.add('active'); selectChild(activeBtn, parentChildren[0].name); }
}

function renderChildDetails(child){
  const tableBody = document.getElementById('child-subjects-body');
  const summaryNote = document.getElementById('child-detail-summary');
  if(summaryNote && child){
    summaryNote.innerHTML = `المرحلة: <strong>${child.stage}</strong> · المستوى: <strong>${child.level}</strong> · الكود: <strong>${child.code}</strong>`;
  }
  if(tableBody){
    tableBody.innerHTML = '';
    if(child && child.subjects){
      child.subjects.forEach(s=>{
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${s.name}</td><td>${s.score}</td><td>${s.completed}</td><td>${s.lastTest}</td><td>${s.recommendation}</td>`;
        tableBody.appendChild(tr);
      });
    }
  }
}

function openAddChildModal(){
  const modal = document.getElementById('parent-add-child-modal');
  if(modal){ modal.classList.remove('hidden'); modal.classList.add('open'); }
}

function closeAddChildModal(){
  const modal = document.getElementById('parent-add-child-modal');
  if(modal){ modal.classList.add('hidden'); modal.classList.remove('open'); }
}

function addChildByCode(){
  const codeInput=document.getElementById('new-child-code');
  const nameInput=document.getElementById('new-child-name');
  const stageSelect=document.getElementById('new-child-stage');
  const code=codeInput.value.trim();
  const name=nameInput.value.trim() || `ابن جديد ${parentChildren.length+1}`;
  const stage=stageSelect.value;
  if(!code){ alert('يرجى إدخال كود الطالب'); return; }
  parentChildren.push({
    name,
    code,
    stage,
    level:'المستوى الجديد',
    avg:'0%',
    attendance:'0%',
    studyTime:'0 س',
    points:'0',
    subjects:[]
  });
  renderParentChildren();
  selectChild(document.querySelector('#parent-home-children .child-btn:last-child'), name);
  closeAddChildModal();
  codeInput.value='';
  nameInput.value='';
  alert(`تم إضافة ${name} بنجاح بكود ${code}`);
}

function toggleNotif(btn){
  const panel=btn.querySelector('.notif-panel');
  if(panel){ panel.classList.toggle('open'); }
}
document.addEventListener('click',e=>{
  if(!e.target.closest('.ib')){ document.querySelectorAll('.notif-panel').forEach(p=>p.classList.remove('open')); }
});

renderParentChildren();

function startGame(type){
  switchGame(type+'-game', null);
  openGamesWithCheck();
}

// ============================================================
// SPECIALIZATION-AWARE OPENERS
// ============================================================

function openLabForSpec(){
  const spec=localStorage.getItem('currentSpec')||'sci';
  const bars={
    sci:document.getElementById('lab-toolbar-sci'),
    scimath:document.getElementById('lab-toolbar-scimath'),
    lit:document.getElementById('lab-toolbar-lit')
  };
  Object.values(bars).forEach(b=>{if(b)b.style.display='none';});
  const activeBar=bars[spec]||bars.sci;
  if(activeBar){
    activeBar.style.display='flex';
    const firstBtn=activeBar.querySelector('.lab-tool');
    const firstType=spec==='lit'?'arabic_analysis':spec==='scimath'?'vectors':'chem';
    if(firstBtn){
      document.querySelectorAll('.lab-tool').forEach(t=>t.classList.remove('active'));
      firstBtn.classList.add('active');
      runLab(firstBtn,firstType);
    }
  }
  openModal('lab-modal');
}

// ============================================================
// 3D MODELS ROOM — مجسمات حقيقية مفصولة لكل قسم
// ============================================================
const MODELS_DATA = {
  // علمي ورياضة (sci + scimath)
  sci:[
    {id:'cell',title:'الخلية النباتية',sub:'مجسم تفاعلي للخلية مع تسمياتها',type:'cell',
     info:'الخلية النباتية: غشاء بلازمي + جدار خلوي + نواة + ميتوكوندريا + بلاستيدات خضراء + فجوات. يحدث فيها التمثيل الضوئي.'},
    {id:'dna',title:'الحمض النووي DNA',sub:'حلزون مزدوج بقواعد A-T-G-C',type:'dna',
     info:'DNA يتركب من سلسلتين متكاملتين: A يرتبط بـ T بـ 2 رابطة هيدروجينية، G يرتبط بـ C بـ 3 روابط. يحمل الشفرة الوراثية للكائن.'},
    {id:'atom',title:'الذرة',sub:'مجسم لذرة الكربون',type:'atom',
     info:'ذرة الكربون: 6 بروتونات + 6 نيوترونات في النواة + 6 إلكترونات في مدارين (2 في الأول، 4 في الثاني).'},
    {id:'pyramid',title:'الهرم الأكبر',sub:'مجسم هندسي للهرم',type:'pyramid',
     info:'الهرم الأكبر (هرم خوفو): ارتفاع ~146م، طول كل ضلع ~230م، بُني عام ~2560 ق.م. مكون من ~2.3 مليون كتلة حجرية.'},
    {id:'molecule',title:'جزيء الماء H₂O',sub:'مجسم ثلاثي الأبعاد',type:'molecule',
     info:'جزيء الماء: ذرة أكسجين مرتبطة بذرتي هيدروجين بزاوية ~104.5°. الماء جزيء قطبي ومذيب عام للحياة.'},
    {id:'cube',title:'المكعب الهندسي',sub:'مجسم رياضي ثلاثي',type:'cube',
     info:'المكعب: 6 أوجه مربعة متساوية، 12 حافة، 8 رؤوس. حجمه = الضلع × الضلع × الضلع. مساحته السطحية = 6 × مربع الضلع.'},
  ],
  // أدبي (lit)
  lit:[
    {id:'pyramid',title:'الهرم الأكبر',sub:'مجسم تاريخي لأهرامات الجيزة',type:'pyramid',
     info:'الهرم الأكبر (خوفو): أعجوبة معمارية فرعونية، بُني ~2560 ق.م. يضم ممرات وغرف الملك والملكة. أحد عجائب الدنيا السبع.'},
    {id:'kaaba',title:'الكعبة المشرفة',sub:'مجسم للبيت العتيق',type:'kaaba',
     info:'الكعبة المشرفة: قبلة المسلمين، بُنيت على يد سيدنا إبراهيم وإسماعيل. مكعّبة الشكل، تقع في مكة المكرمة. الحج إليها ركن من أركان الإسلام.'},
    {id:'parthenon',title:'البارثينون اليوناني',sub:'معبد أثينا في أثينا',type:'parthenon',
     info:'معبد البارثينون: بُني 447-432 ق.م على هضبة الأكروبوليس، تكريماً لأثينا (إلهة الحكمة). نموذج للعمارة اليونانية الكلاسيكية.'},
    {id:'colosseum',title:'الكولوسيوم الروماني',sub:'مدرج روما القديم',type:'colosseum',
     info:'الكولوسيوم: مدرج روماني بُني 70-80م، يتسع لـ 50,000 متفرج. كان مسرحاً للمصارعات ومعارك الجلادايتورز. رمز للحضارة الرومانية.'},
    {id:'mosque',title:'المسجد الحرام',sub:'أعظم مساجد الإسلام',type:'mosque',
     info:'المسجد الحرام في مكة: أعظم مسجد في العالم وأقدسها. يضم الكعبة وزمزم ومقام إبراهيم. يستوعب أكثر من 4 ملايين مصلٍّ.'},
    {id:'cube',title:'المكعب الفلسفي',sub:'رمز الكمال الهندسي',type:'cube',
     info:'المكعب في الفلسفة: رمز للكمال والثبات والاستقرار عند فيثاغورس وأفلاطون. أحد المجسمات الأفلاطونية الخمسة.'},
  ]
};

function openModelsForSpec(){
  const spec = localStorage.getItem('currentSpec')||'sci';
  renderModels(spec);
  openModal('models-modal');
}

function renderModels(spec){
  const grid = document.getElementById('models-grid');
  if(!grid) return;
  const list = (spec==='lit') ? MODELS_DATA.lit : MODELS_DATA.sci;
  grid.innerHTML = list.map(m => `
    <div class="model-card" onclick="openModel('${m.id}','${spec}')">
      <div class="model-3d">${renderModelObject(m.type,'sm')}</div>
      <div style="font-size:14px;font-weight:700;margin-bottom:4px;">${m.title}</div>
      <div style="font-size:11px;opacity:.7;line-height:1.5;">${m.sub}</div>
      <button onclick="event.stopPropagation();openModel('${m.id}','${spec}')" style="margin-top:10px;background:rgba(255,140,66,.25);color:#fff;border:1px solid rgba(255,140,66,.5);padding:7px 16px;border-radius:50px;font-family:'Cairo',sans-serif;font-size:11px;cursor:pointer;">🖱️ افتحي المجسم</button>
    </div>
  `).join('');
}

// كل نوع مجسم له تمثيل بصري حقيقي (CSS 3D أو SVG)
function renderModelObject(type, size){
  const sm = size==='sm';
  const s = sm?60:140;
  const half = s/2;
  if(type==='cube'){
    return `<div class="cube" style="width:${s}px;height:${s}px;${sm?'':'animation-duration:8s;'}">
      <div class="cube-face front"  style="width:${s}px;height:${s}px;transform:translateZ(${half}px);">📦</div>
      <div class="cube-face back"   style="width:${s}px;height:${s}px;transform:rotateY(180deg) translateZ(${half}px);">⬛</div>
      <div class="cube-face left"   style="width:${s}px;height:${s}px;transform:rotateY(-90deg) translateZ(${half}px);">▣</div>
      <div class="cube-face right"  style="width:${s}px;height:${s}px;transform:rotateY(90deg) translateZ(${half}px);">▣</div>
      <div class="cube-face top-face" style="width:${s}px;height:${s}px;transform:rotateX(90deg) translateZ(${half}px);">▢</div>
      <div class="cube-face bottom" style="width:${s}px;height:${s}px;transform:rotateX(-90deg) translateZ(${half}px);">▢</div>
    </div>`;
  }
  if(type==='atom'){
    const r = sm?28:80;
    return `<svg width="${s}" height="${s}" viewBox="-${half} -${half} ${s} ${s}" class="m3d-atom">
      <circle cx="0" cy="0" r="${r*.25}" fill="#FF8C42"/>
      <ellipse cx="0" cy="0" rx="${r}" ry="${r*.4}" fill="none" stroke="rgba(255,140,66,.5)" stroke-width="1.5"/>
      <ellipse cx="0" cy="0" rx="${r}" ry="${r*.4}" fill="none" stroke="rgba(100,180,255,.5)" stroke-width="1.5" transform="rotate(60)"/>
      <ellipse cx="0" cy="0" rx="${r}" ry="${r*.4}" fill="none" stroke="rgba(155,90,229,.5)" stroke-width="1.5" transform="rotate(-60)"/>
      <circle cx="${r}" cy="0" r="${sm?3:6}" fill="#3B8FDB"/>
      <circle cx="-${r}" cy="0" r="${sm?3:6}" fill="#3B8FDB"/>
      <circle cx="${r*.5}" cy="-${r*.4}" r="${sm?3:6}" fill="#9B5AE5" transform="rotate(60 0 0)"/>
    </svg>`;
  }
  if(type==='cell'){
    return `<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" class="m3d-cell">
      <rect x="${s*.04}" y="${s*.04}" width="${s*.92}" height="${s*.92}" rx="${s*.08}" fill="none" stroke="#1B8A30" stroke-width="2" stroke-dasharray="4,2"/>
      <ellipse cx="${half}" cy="${half}" rx="${s*.42}" ry="${s*.36}" fill="rgba(54,184,71,.18)" stroke="#36B847" stroke-width="2"/>
      <circle cx="${half}" cy="${half}" r="${s*.13}" fill="rgba(27,138,48,.5)" stroke="#1B8A30" stroke-width="1.5"/>
      <ellipse cx="${s*.32}" cy="${s*.32}" rx="${s*.07}" ry="${s*.05}" fill="rgba(36,99,36,.6)"/>
      <ellipse cx="${s*.7}" cy="${s*.72}" rx="${s*.06}" ry="${s*.05}" fill="rgba(36,99,36,.6)"/>
      <ellipse cx="${s*.72}" cy="${s*.3}" rx="${s*.05}" ry="${s*.04}" fill="rgba(36,99,36,.6)"/>
    </svg>`;
  }
  if(type==='dna'){
    const lines = [];
    const n = sm?5:11;
    for(let i=0;i<n;i++){
      const y = (s/(n+1))*(i+1);
      const offset = Math.sin(i*.7)*(s*.13);
      lines.push(`<line x1="${half-s*.25+offset}" y1="${y}" x2="${half+s*.25-offset}" y2="${y}" stroke="${i%2?'#FF8C42':'#3B8FDB'}" stroke-width="${sm?1.5:2.5}"/>`);
    }
    return `<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
      <path d="M ${half-s*.25} 0 Q ${half+s*.3} ${half} ${half-s*.25} ${s}" fill="none" stroke="rgba(255,140,66,.5)" stroke-width="${sm?1.5:2.5}"/>
      <path d="M ${half+s*.25} 0 Q ${half-s*.3} ${half} ${half+s*.25} ${s}" fill="none" stroke="rgba(100,180,255,.5)" stroke-width="${sm?1.5:2.5}"/>
      ${lines.join('')}
    </svg>`;
  }
  if(type==='pyramid'){
    return `<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
      <polygon points="${half},${s*.12} ${s*.94},${s*.85} ${s*.06},${s*.85}" fill="rgba(255,200,100,.35)" stroke="#FFB347" stroke-width="2"/>
      <polygon points="${half},${s*.12} ${s*.94},${s*.85} ${half},${s*.78}" fill="rgba(255,170,80,.55)" stroke="#FFB347" stroke-width="1.5"/>
      <line x1="${s*.06}" y1="${s*.85}" x2="${s*.94}" y2="${s*.85}" stroke="#8B5E3C" stroke-width="2"/>
    </svg>`;
  }
  if(type==='molecule'){
    return `<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
      <line x1="${s*.3}" y1="${s*.7}" x2="${half}" y2="${half}" stroke="rgba(255,255,255,.4)" stroke-width="${sm?2:3}"/>
      <line x1="${s*.7}" y1="${s*.7}" x2="${half}" y2="${half}" stroke="rgba(255,255,255,.4)" stroke-width="${sm?2:3}"/>
      <circle cx="${half}" cy="${half}" r="${s*.15}" fill="#E24B4A"/>
      <text x="${half}" y="${half+s*.04}" text-anchor="middle" fill="#fff" font-size="${sm?10:18}" font-weight="700" font-family="Cairo">O</text>
      <circle cx="${s*.3}" cy="${s*.7}" r="${s*.1}" fill="#3B8FDB"/>
      <text x="${s*.3}" y="${s*.7+s*.03}" text-anchor="middle" fill="#fff" font-size="${sm?9:14}" font-weight="700" font-family="Cairo">H</text>
      <circle cx="${s*.7}" cy="${s*.7}" r="${s*.1}" fill="#3B8FDB"/>
      <text x="${s*.7}" y="${s*.7+s*.03}" text-anchor="middle" fill="#fff" font-size="${sm?9:14}" font-weight="700" font-family="Cairo">H</text>
    </svg>`;
  }
  if(type==='kaaba'){
    return `<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
      <rect x="${s*.22}" y="${s*.18}" width="${s*.56}" height="${s*.62}" fill="#1a1a1a" stroke="#FFD700" stroke-width="2"/>
      <rect x="${s*.22}" y="${s*.32}" width="${s*.56}" height="${s*.04}" fill="#FFD700"/>
      <text x="${half}" y="${s*.55}" text-anchor="middle" fill="#FFD700" font-size="${sm?7:13}" font-family="Cairo" font-weight="700">الكعبة</text>
      <rect x="${s*.42}" y="${s*.5}" width="${s*.16}" height="${s*.18}" fill="#3a2a1a" stroke="#FFD700" stroke-width="1"/>
    </svg>`;
  }
  if(type==='parthenon'){
    const cols = sm?5:7;
    const cw = (s*.7)/cols;
    let pillars = '';
    for(let i=0;i<cols;i++){
      pillars += `<rect x="${s*.15 + i*cw}" y="${s*.32}" width="${cw*.6}" height="${s*.5}" fill="rgba(255,250,230,.85)" stroke="#a89070" stroke-width="1"/>`;
    }
    return `<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
      <polygon points="${s*.1},${s*.32} ${half},${s*.12} ${s*.9},${s*.32}" fill="rgba(255,250,230,.85)" stroke="#a89070" stroke-width="2"/>
      <rect x="${s*.1}" y="${s*.28}" width="${s*.8}" height="${s*.05}" fill="#d4c4a0" stroke="#a89070" stroke-width="1"/>
      ${pillars}
      <rect x="${s*.06}" y="${s*.82}" width="${s*.88}" height="${s*.06}" fill="#a89070"/>
    </svg>`;
  }
  if(type==='colosseum'){
    return `<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
      <ellipse cx="${half}" cy="${s*.55}" rx="${s*.42}" ry="${s*.32}" fill="none" stroke="#c9a876" stroke-width="${sm?2:3}"/>
      <ellipse cx="${half}" cy="${s*.55}" rx="${s*.32}" ry="${s*.22}" fill="none" stroke="#c9a876" stroke-width="${sm?1.5:2}"/>
      <ellipse cx="${half}" cy="${s*.55}" rx="${s*.22}" ry="${s*.13}" fill="rgba(180,140,80,.25)" stroke="#c9a876" stroke-width="1"/>
      ${[0,1,2,3,4,5,6,7].map(i=>{
        const a = i*Math.PI/4;
        return `<line x1="${half+Math.cos(a)*s*.22}" y1="${s*.55+Math.sin(a)*s*.13}" x2="${half+Math.cos(a)*s*.42}" y2="${s*.55+Math.sin(a)*s*.32}" stroke="#c9a876" stroke-width="1"/>`;
      }).join('')}
    </svg>`;
  }
  if(type==='mosque'){
    return `<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
      <rect x="${s*.18}" y="${s*.45}" width="${s*.64}" height="${s*.4}" fill="rgba(220,200,140,.85)" stroke="#9c8050" stroke-width="2"/>
      <ellipse cx="${half}" cy="${s*.45}" rx="${s*.18}" ry="${s*.16}" fill="rgba(220,180,100,.9)" stroke="#9c8050" stroke-width="2"/>
      <line x1="${half}" y1="${s*.18}" x2="${half}" y2="${s*.3}" stroke="#FFD700" stroke-width="2"/>
      <circle cx="${half}" cy="${s*.16}" r="${sm?2.5:5}" fill="#FFD700"/>
      <rect x="${s*.05}" y="${s*.3}" width="${s*.07}" height="${s*.55}" fill="rgba(220,200,140,.9)" stroke="#9c8050" stroke-width="1.5"/>
      <rect x="${s*.88}" y="${s*.3}" width="${s*.07}" height="${s*.55}" fill="rgba(220,200,140,.9)" stroke="#9c8050" stroke-width="1.5"/>
    </svg>`;
  }
  return `<div style="width:${s}px;height:${s}px;display:flex;align-items:center;justify-content:center;font-size:${sm?40:90}px;">📦</div>`;
}

// ─── 3D viewer interaction state ───
let _modelSpinOn = true;
let _modelRotX = -20, _modelRotY = 0;
let _modelDragging = false, _modelLastX = 0, _modelLastY = 0;
let _currentModel = null;

function openModel(modelId, spec){
  const list = (spec==='lit') ? MODELS_DATA.lit : MODELS_DATA.sci;
  const model = list.find(m=>m.id===modelId);
  if(!model) return;
  _currentModel = model;
  document.getElementById('md-title').textContent = model.title;
  document.getElementById('md-sub').textContent   = model.sub;
  document.getElementById('md-info').textContent  = model.info;
  // ضع المجسم الكبير في المسرح
  const stage = document.getElementById('md-stage');
  if(stage){
    stage.innerHTML = `<div class="imodel-obj spinning" id="md-obj">${renderModelObject(model.type,'lg')}</div>`;
    // فعّل السحب لتدوير المجسم يدوياً
    _modelSpinOn = true;
    _modelRotX = -20; _modelRotY = 0;
    const obj = document.getElementById('md-obj');
    if(obj){
      obj.onmousedown = (e) => { _modelDragging=true; _modelLastX=e.clientX; _modelLastY=e.clientY; obj.classList.remove('spinning'); _modelSpinOn=false; const btn=document.getElementById('md-spin-btn'); if(btn) btn.textContent='▶ شغّلي التدوير التلقائي'; };
      obj.ontouchstart = (e) => { const t=e.touches[0]; _modelDragging=true; _modelLastX=t.clientX; _modelLastY=t.clientY; obj.classList.remove('spinning'); _modelSpinOn=false; };
    }
    if(stage){
      stage.onmousemove = (e) => { if(!_modelDragging) return; _modelRotY += (e.clientX - _modelLastX)*.5; _modelRotX += (e.clientY - _modelLastY)*.5; _modelLastX=e.clientX; _modelLastY=e.clientY; const o=document.getElementById('md-obj'); if(o) o.style.transform = `rotateX(${_modelRotX}deg) rotateY(${_modelRotY}deg)`; };
      stage.ontouchmove = (e) => { if(!_modelDragging) return; const t=e.touches[0]; _modelRotY += (t.clientX - _modelLastX)*.5; _modelRotX += (t.clientY - _modelLastY)*.5; _modelLastX=t.clientX; _modelLastY=t.clientY; const o=document.getElementById('md-obj'); if(o) o.style.transform = `rotateX(${_modelRotX}deg) rotateY(${_modelRotY}deg)`; };
      stage.onmouseup = () => { _modelDragging=false; };
      stage.onmouseleave = () => { _modelDragging=false; };
      stage.ontouchend = () => { _modelDragging=false; };
    }
  }
  const btn = document.getElementById('md-spin-btn');
  if(btn) btn.textContent='⏸ إيقاف التدوير التلقائي';
  openModal('model-detail-modal');
}

function toggleModelSpin(){
  const obj = document.getElementById('md-obj');
  const btn = document.getElementById('md-spin-btn');
  if(!obj) return;
  _modelSpinOn = !_modelSpinOn;
  if(_modelSpinOn){
    obj.classList.add('spinning');
    obj.style.transform = '';
    if(btn) btn.textContent='⏸ إيقاف التدوير التلقائي';
  } else {
    obj.classList.remove('spinning');
    if(btn) btn.textContent='▶ شغّلي التدوير التلقائي';
  }
}

function resetModelRotation(){
  _modelRotX = -20; _modelRotY = 0;
  const obj = document.getElementById('md-obj');
  if(obj){
    if(_modelSpinOn){
      obj.classList.add('spinning');
      obj.style.transform = '';
    } else {
      obj.style.transform = 'rotateX(-20deg) rotateY(0deg)';
    }
  }
}

// ============================================================
// GAMES — picker + per-subject content
// ============================================================
function openGamesWithCheck(){
  const total=parseInt(localStorage.getItem('totalPoints')||'0');
  document.querySelectorAll('.points-display').forEach(el=>el.textContent=total.toLocaleString());
  // عرض خطوة اختيار المادة أولاً
  const pick = document.getElementById('games-step-pick');
  const play = document.getElementById('games-step-play');
  if(pick) pick.classList.remove('hidden');
  if(play) play.classList.add('hidden');
  renderGameSubjects();
  openModal('games-modal');
}

function openSubjectChat(subjId){
  currentChatSubject = subjId;
  const s = SUBJECTS.find(x=>x.id===subjId);
  const chatHeader = document.getElementById('float-chat-header');
  if(chatHeader && s){
    chatHeader.style.display = 'block';
  }
  toggleFloatChat();
  const inp = document.getElementById('float-inp');
  if(inp) inp.focus();
  const hintMsg = `هل لديك أسئلة عن ${s.name}؟ أنا هنا للمساعدة! 📚`;
  if(!document.getElementById('float-msgs').innerHTML){
    addMsg(document.getElementById('float-msgs'), hintMsg, false);
  }
}

function renderGameSubjects(){
  const grid = document.getElementById('games-subjects-grid');
  if(!grid) return;
  const list = SUBJECTS.filter(s => GAME_DATA[s.id]);
  grid.innerHTML = list.map(s=>`
    <div class="card" style="text-align:center;cursor:pointer;border-right:3px solid ${s.color};" onclick="pickGameSubject('${s.id}')">
      <div style="font-size:32px;margin-bottom:8px;">${s.icon}</div>
      <div style="font-size:13px;font-weight:700;margin-bottom:4px;">${s.name}</div>
      <div style="font-size:10px;color:var(--tx3);margin-bottom:10px;">${(GAME_DATA[s.id].match||[]).length} مفهوم · ${(GAME_DATA[s.id].riddles||[]).length} لغز</div>
      <button class="btn-pr" style="font-size:11px;width:100%;padding:7px;background:${s.color};" onclick="event.stopPropagation();pickGameSubject('${s.id}')">العبي ←</button>
    </div>
  `).join('');
}

function pickGameSubject(subjId){
  if(!GAME_DATA[subjId]) return;
  currentGameSubj = subjId;
  const s = SUBJECTS.find(x=>x.id===subjId);
  const label = document.getElementById('games-current-subject');
  if(label && s) label.textContent = s.icon+' '+s.name;
  // أظهر شاشة اللعب وأخفِ شاشة الاختيار
  const pick = document.getElementById('games-step-pick');
  const play = document.getElementById('games-step-play');
  if(pick) pick.classList.add('hidden');
  if(play) play.classList.remove('hidden');
  // ابدأ الألعاب الأربع بمحتوى المادة المختارة
  switchGame('quiz-game', document.querySelector('#games-step-play .tab'));
  initQuizGame();
  initMatchGame();
  initRiddleGame();
  initPuzzleGame();
}

function backToGamesPicker(){
  const pick = document.getElementById('games-step-pick');
  const play = document.getElementById('games-step-play');
  if(pick) pick.classList.remove('hidden');
  if(play) play.classList.add('hidden');
  renderGameSubjects();
}

function initRiddleGame(){
  const riddles=getGameData().riddles;
  riddleIdx=0;
  const el=document.getElementById('riddle-text');
  if(el)el.textContent=riddles[0].q;
  const ans=document.getElementById('riddle-answer');
  if(ans)ans.classList.add('hidden');
}

function showRhetoric(type){
  const examples = {
    tashbih:'التشبيه: مقارنة شيئين بأداة (مثال: "العلم كالنور" — المشبه: العلم، المشبه به: النور، أداة التشبيه: الكاف)',
    majaz:'الاستعارة: إزالة أداة التشبيه (مثال: "رأيت أسداً يخطب" — استعارة تصريحية للشجاع)',
    kinaya:'الكناية: التعبير غير المباشر (مثال: "طويل النجاد" — كناية عن الشجاعة والطول)',
    tibaq:'الطباق: الجمع بين ضدين (مثال: "ويحيي ويميت" — الحياة والموت في جملة واحدة)'
  };
  const el = document.getElementById('rhetoric-detail');
  if(el) el.textContent = examples[type]||'';
}

function showLogicResult(){
  const el = document.getElementById('logic-result');
  if(el){ el.textContent = 'أرسطو فانٍ ✓'; el.style.color = 'rgba(100,220,100,.9)'; }
  const log = document.getElementById('lab-log');
  if(log){ log.innerHTML='<p style="color:#4eca78;font-family:monospace;font-size:12px;">✓ قياس منطقي صحيح — البرهان القياسي الأرسطي</p>'; }
}

function renderAdaptiveLessonNote(subjId, level){
  const noteEl = document.getElementById('lt-adaptive-note');
  if(!noteEl) return;
  const notes = {
    'ممتاز': '🏆 مستواك ممتاز! ستنتقل للمحتوى المتقدم مباشرة مع تحديات إضافية.',
    'متوسط': '📈 مستواك متوسط. سيبدأ الشرح بالأساسيات ثم ينتقل للتفاصيل تدريجياً.',
    'ضعيف':  '💪 لا تقلق! ستحصل على شرح مبسط خطوة بخطوة مع أمثلة داعمة.'
  };
  noteEl.textContent = notes[level]||'';
  noteEl.style.display = 'block';
}

// ============================================================
// INITIALIZATION
// ============================================================
document.querySelectorAll('.screen').forEach(s=>{s.style.display='none';s.classList.remove('active');});
document.getElementById('landing').style.display='flex';
document.getElementById('landing').classList.add('active');
loadQ(0);
initQuizGame();
initMatchGame();
nextRiddle();
initPuzzleGame();
function openVideo(embedUrl) {
  const modal = document.getElementById("videoModal");
  const frame = document.getElementById("videoFrame");

  if (!modal || !frame) {
    console.error("Video modal elements not found");
    return;
  }

  frame.src = embedUrl;
  modal.style.display = "flex";
}

function closeVideo() {
  const modal = document.getElementById("videoModal");
  const frame = document.getElementById("videoFrame");

  if (!modal || !frame) {
    return;
  }

  frame.src = "";
  modal.style.display = "none";
}