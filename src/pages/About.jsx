import React from 'react';
import {
  Users,
  Target,
  BarChart3,
  Eye,
  Code,
  Mail,
  Github,
  Building2,
  TrendingUp,
  Brain,
  MessageCircle,
  CheckCircle,
  GitBranch,
  Database,
  Search,
  Paintbrush
} from 'lucide-react';

const AboutUsPage = ({
  language = 'en',
  theme = 'dark'
}) => {
  // Translations (structured for the new layout)
  const getTranslations = () => {
    switch (language) {
      case 'ar':
        return {
          heroTitle: 'عن مشروع KSAR DATA',
          heroMission: 'مبادرة محلية لجعل البيانات العامة لمدينة القصر الكبير مفتوحة، مرئية، وسهلة الفهم.',
          why: {
            title: 'لماذا أنشأنا هذا المشروع؟',
            description: 'البيانات العمومية لمدينتنا متوفرة… لكن الوصول إليها صعب، وتصفحها ممل، وغالبًا ما تُعرض في ملفات PDF إدارية معقدة. وُلد KSAR DATA من الحاجة لفهم ميزانية المدينة، ثم تحول لمبادرة مفتوحة نحو مجتمع أكثر وعيًا واطلاعًا.',
            points: [
              'لا علاقة للموقع بأي جهة سياسية',
              'المشروع غير ربحي وممول ذاتيًا بالكامل',
              'الهدف الوحيد هو التوعية وخدمة المجتمع'
            ],
            integrity: {
              title: 'التزامنا بالدقة',
              text: 'هذا المشروع ثمرة جهد شخصي، وقد حرصنا على مراجعة البيانات بعناية لضمان دقتها. يتم جمع المعلومات من الوثائق الرسمية عبر مزيج من الأدوات البرمجية والمراجعة اليدوية. ورغم هذه الدقة، تظل هناك – ولو بنسبة ضئيلة – إمكانية لحدوث خطأ غير مقصود. في حال لاحظت أي ملاحظة أو تناقض، فإن إسهامك في تصحيحه سيكون محل تقدير كبير. نرجو منك التواصل معنا لذلك.'
            },
          },
          what: {
            title: 'ماذا ستجد في المنصة؟',
            items: [
              { icon: Building2, title: 'مستكشف الميزانية', description: 'تتبع من أين تأتي الأموال العامة وأين تذهب.' },
              { icon: Users, title: 'رؤى حول السكان', description: 'فهم ديموغرافية القصر الكبير (العمر، التعليم، إلخ).' },
              { icon: TrendingUp, title: 'مخططات تفاعلية', description: 'تصور اتجاهات متعددة السنوات بطريقة واضحة وبسيطة.' },
              { icon: Brain, title: 'هل تعلم؟', description: 'حقائق محلية مدهشة مستقاة من الإحصائيات الرسمية.' }
            ]
          },
          // MODIFICATION START: Detailed steps for "How We Built It"
          how: {
            title: 'كيف بنينا المشروع؟',
            steps: [
              { icon: Search, title: 'البحث وجمع البيانات', description: 'نبحث بشكل منهجي عن الوثائق العمومية الرسمية ونقوم بأرشفتها، مثل تقارير الميزانية الجماعية، ونتائج الإحصاء العام للسكان والسكنى، وغيرها من المنشورات الإحصائية. الهدف هو بناء أساس موثوق من المواد المصدرية الأولية.' },
              { icon: Database, title: 'الاستخلاص والمعالجة', description: 'غالباً ما تكون البيانات الأولية حبيسة جداول داخل ملفات PDF. نستخدم سكريبتات بايثون (مع مكتبات مثل PyPDF2 و Pandas) لاستخراج هذه المعلومات برمجياً. بعد ذلك، يتم تنظيف البيانات وتوحيدها وتحويلها إلى صيغ مهيكلة مثل CSV و JSON، مما يجعلها قابلة للقراءة آلياً.' },
              { icon: GitBranch, title: 'التحليل والتجهيز', description: 'هذه مرحلة حاسمة حيث نتحقق من سلامة البيانات، ونعالج القيم المفقودة، ونعيد هيكلتها لتكون جاهزة للعرض البصري. نقوم بإجراء العمليات الحسابية، وإنشاء روابط بين مجموعات البيانات المختلفة، وتجهيزها لتطبيق الواجهة الأمامية.' },
              { icon: Paintbrush, title: 'التصميم والتطوير', description: 'تتمثل الخطوة الأخيرة في جعل البيانات متاحة وجذابة. نصمم ونبني واجهة مستخدم تفاعلية باستخدام تقنيات الويب الحديثة مثل React و TailwindCSS. الهدف هو تحويل الجداول المعقدة إلى رسوم بيانية واضحة ولوحات تحكم سهلة الفهم للجميع.' }
            ],
            tech: 'Open Source • React • TailwindCSS • ShadCN • Recharts • Pandas • Python'
          },
          // MODIFICATION END
          team: {
            title: 'من وراء المشروع؟',
            description: 'KSAR DATA هو مشروع من إنجاز يونس البتات، مطور برامج. تم بناؤه كجزء من جهد لرد الجميل للمجتمع، وتعزيز الشفافية، وتشجيع المشاركة المدنية.',
            quote: 'هذه مجرد البداية. نؤمن بقوة المعلومات المتاحة. إذا ساعد هذا المشروع طالبًا واحدًا أو مواطنًا على فهم مدينته بشكل أفضل - فإن الأمر يستحق ذلك.'
          },
          contact: {
            title: 'تواصل معنا وساهم',
            description: 'هل لديك اقتراح؟ هل تريد الإبلاغ عن خطأ أو التعاون معنا؟ يسعدنا أن نسمع منك.',
            email: 'راسلنا عبر البريد الإلكتروني',
            social: 'تواصل معنا على فيسبوك'
          },
        };

      case 'en':
        return {
          heroTitle: 'About KSAR DATA',
          heroMission: 'A local initiative to make the public data of Ksar El Kebir open, visible, and easy to understand.',
          why: {
            title: 'Why We Built This',
            description: 'Public data about our city exists, but it\'s hard to access and often buried in complex PDF files. KSAR DATA was born from a need to understand the city budget and grew into an open initiative for a more informed community.',
            points: [
              'No affiliation with any political party',
              'Non-profit and entirely self-funded',
              'Solely for community awareness and service'
            ],
             integrity: {
              title: 'Our Commitment to Accuracy',
              text: 'This project is the fruit of a personal effort, and we have carefully reviewed the data to ensure its accuracy. Information is collected from official documents through a mix of software tools and manual verification. Despite this diligence, a small possibility of unintentional error remains. Should you notice any discrepancy, your contribution in correcting it would be greatly appreciated. We kindly ask you to contact us.'
            }
          },
          what: {
            title: 'What You\'ll Find Inside',
            items: [
              { icon: Building2, title: 'Budget Explorer', description: 'Track where public funds come from and where they go.' },
              { icon: Users, title: 'Population Insights', description: 'Understand the demographics of Ksar El Kebir.' },
              { icon: TrendingUp, title: 'Interactive Charts', description: 'Visualize multi-year trends in a clear, simple way.' },
              { icon: Brain, title: 'Did You Know?', description: 'Discover surprising local facts from official statistics.' }
            ]
          },
          // MODIFICATION START: Detailed steps for "How We Built It"
          how: {
            title: 'How We Built It',
            steps: [
              { icon: Search, title: 'Research & Data Collection', description: 'We systematically search for and archive official public documents, such as municipal budget reports, national census results, and other statistical publications. The goal is to build a reliable foundation of primary source material.' },
              { icon: Database, title: 'Extraction & Processing', description: 'Raw data is often locked in PDF tables. We use Python scripts (with libraries like PyPDF2 and Pandas) to programmatically extract this information. The data is then cleaned, standardized, and converted into structured formats like CSV and JSON, making it machine-readable.' },
              { icon: GitBranch, title: 'Analysis & Preparation', description: 'This is a critical stage where we verify the data\'s integrity, handle missing values, and structure it for visualization. We perform calculations, establish relationships between different datasets, and prepare it for the front-end application.' },
              { icon: Paintbrush, title: 'Design & Development', description: 'The final step is to make the data accessible and engaging. We design and build an interactive user interface using modern web technologies like React and TailwindCSS, transforming complex tables into clear charts and intuitive dashboards.' }
            ],
            tech: 'Open Source • React • TailwindCSS • ShadCN • Recharts • Pandas • Python'
          },
          // MODIFICATION END
          team: {
            title: 'Who Is Behind This?',
            description: 'KSAR DATA is a project by El Bettate, a software developer. It was built to give back to the community, promote transparency, and encourage civic engagement.',
            quote: 'This is just the beginning. We believe in the power of accessible information. If this helps even one student or citizen better understand their city—it’s worth it.'
          },
          contact: {
            title: 'Get Involved',
            description: 'Have a suggestion? Want to report an error or collaborate with us? We\'d love to hear from you.',
            email: 'Contact us via Email',
            social: 'Connect on Facebook'
          },
        };

      default: // French
        return {
          heroTitle: 'À propos de KSAR DATA',
          heroMission: 'Une initiative locale pour rendre les données publiques de Ksar El Kebir ouvertes, visibles et faciles à comprendre.',
          why: {
            title: 'Pourquoi ce projet ?',
            description: 'Les données publiques de notre ville existent, mais elles sont difficiles d\'accès et souvent cachées dans des fichiers PDF complexes. KSAR DATA est né du besoin de comprendre le budget municipal et a évolué en une initiative ouverte pour une communauté mieux informée.',
            points: [
              'Aucune affiliation politique',
              'Projet à but non lucratif et entièrement autofinancé',
              'Uniquement pour la sensibilisation et le service communautaire'
            ],
            integrity: {
              title: 'Notre engagement envers l\'exactitude',
              text: 'Ce projet est le fruit d\'un effort personnel et nous avons soigneusement examiné les données pour en garantir l\'exactitude. Les informations sont collectées à partir de documents officiels grâce à une combinaison d\'outils logiciels et de vérifications manuelles. Malgré cette rigueur, une faible possibilité d\'erreur involontaire subsiste. Si vous remarquez une anomalie, votre contribution à sa correction serait grandement appréciée. Nous vous invitons à nous contacter.'
            }
          },
          what: {
            title: 'Ce que vous y trouverez',
            items: [
              { icon: Building2, title: 'Explorateur de budget', description: 'Suivez la provenance et l\'utilisation des fonds publics.' },
              { icon: Users, title: 'Aperçus de la population', description: 'Comprenez la démographie de Ksar El Kebir.' },
              { icon: TrendingUp, title: 'Graphiques interactifs', description: 'Visualisez les tendances pluriannuelles de manière simple.' },
              { icon: Brain, title: 'Le saviez-vous ?', description: 'Découvrez des faits locaux surprenants issus de statistiques officielles.' }
            ]
          },
          // MODIFICATION START: Detailed steps for "How We Built It"
          how: {
            title: 'Comment l\'avons-nous construit ?',
            steps: [
              { icon: Search, title: 'Recherche et collecte', description: 'Nous recherchons et archivons systématiquement les documents publics officiels, comme les rapports budgétaires et les résultats de recensement. L\'objectif est de construire une base fiable de sources primaires.' },
              { icon: Database, title: 'Extraction et traitement', description: 'Les données brutes sont souvent verrouillées dans des tableaux PDF. Nous utilisons des scripts Python (PyPDF2, Pandas) pour extraire ces informations. Les données sont ensuite nettoyées, standardisées et converties en formats structurés (CSV, JSON).' },
              { icon: GitBranch, title: 'Analyse et préparation', description: 'C\'est une étape critique où nous vérifions l\'intégrité des données, gérons les valeurs manquantes et les structurons pour la visualisation. Nous effectuons des calculs, établissons des liens entre les données et les préparons pour l\'application.' },
              { icon: Paintbrush, title: 'Conception et développement', description: 'L\'étape finale est de rendre les données accessibles et engageantes. Nous concevons une interface utilisateur interactive avec React et TailwindCSS pour transformer les tableaux complexes en graphiques et tableaux de bord intuitifs.' }
            ],
            tech: 'Open Source • React • TailwindCSS • ShadCN • Recharts • Pandas • Python'
          },
          // MODIFICATION END
          team: {
            title: 'Qui est derrière ce projet ?',
            description: 'KSAR DATA est un projet de Younes El Bettate, un développeur. Il a été créé pour redonner à la communauté, promouvoir la transparence et encourager l\'engagement civique.',
            quote: 'Ce n\'est que le début. Nous croyons au pouvoir de l\'information accessible. Si cela aide ne serait-ce qu\'un étudiant à mieux comprendre sa ville, cela en vaut la peine.'
          },
          contact: {
            title: 'Participez',
            description: 'Une suggestion ? Signaler une erreur ou collaborer ? Nous serions ravis de vous entendre.',
            email: 'Contactez-nous par e-mail',
            social: 'Connectez-vous sur Facebook'
          },
        };
    }
  };

  const t = getTranslations();

  const themeClasses = {
    bg: theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50',
    cardBg: theme === 'dark' ? 'bg-gray-900' : 'bg-white',
    sectionBg: theme === 'dark' ? 'bg-black/20' : 'bg-white/50',
    borderColor: theme === 'dark' ? 'border-gray-800' : 'border-gray-200',
    textPrimary: theme === 'dark' ? 'text-white' : 'text-gray-900',
    textSecondary: theme === 'dark' ? 'text-gray-400' : 'text-gray-600',
    textAccent: theme === 'dark' ? 'text-blue-400' : 'text-blue-600',
    iconBg: theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100',
    gradientFrom: theme === 'dark' ? 'from-blue-900' : 'from-blue-50',
    gradientTo: theme === 'dark' ? 'to-gray-950' : 'to-gray-100'
  };

  return (
    <div
      className={`${themeClasses.bg}`}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      style={language === 'ar' ? { fontFamily: 'Noto Kufi Arabic, sans-serif' } : undefined}
    >
      {/* Hero Section */}
      <header className={`relative py-20 md:py-28 bg-gradient-to-b ${themeClasses.gradientFrom} ${themeClasses.gradientTo}`}>
        <div className="container mx-auto px-6 text-center">
          <h1 className={`text-4xl lg:text-5xl font-extrabold mb-4 ${themeClasses.textPrimary}`}>
            {t.heroTitle}
          </h1>
          <p className={`max-w-3xl mx-auto text-lg md:text-xl ${themeClasses.textSecondary}`}>
            {t.heroMission}
          </p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16 space-y-24">

        {/* Section: Why We Built This */}
        <section>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={language === 'ar' ? 'lg:order-2' : ''}>
              <h2 className={`text-3xl font-bold mb-6 ${themeClasses.textPrimary}`}>{t.why.title}</h2>
              <p className={`text-lg leading-relaxed ${themeClasses.textSecondary}`}>
                {t.why.description}
              </p>
            </div>
            <div className={`p-8 rounded-2xl border ${themeClasses.borderColor} ${themeClasses.cardBg} ${language === 'ar' ? 'lg:order-1' : ''}`}>
              <ul className="space-y-4">
                {t.why.points.map((point, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className={`w-6 h-6 text-green-500 flex-shrink-0 ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
                    <span className={themeClasses.textSecondary}>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={`mt-6 p-4 rounded-lg border ${themeClasses.borderColor} bg-black/5 dark:bg-white/5`}>
          <h4 className={`font-semibold mb-2 ${themeClasses.textPrimary}`}>{t.why.integrity.title}</h4>
          <p className={`text-sm ${themeClasses.textSecondary}`}>
            {t.why.integrity.text}
          </p>
      </div>
        </section>

        {/* Section: What You'll Find */}
        <section>
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold ${themeClasses.textPrimary}`}>{t.what.title}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.what.items.map((item, index) => (
              <div key={index} className={`p-6 rounded-2xl border ${themeClasses.borderColor} ${themeClasses.cardBg} text-center transition-transform transform hover:-translate-y-2`}>
                <div className={`inline-block p-4 rounded-full ${themeClasses.iconBg} mb-4`}>
                  <item.icon className={`w-8 h-8 ${themeClasses.textAccent}`} />
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${themeClasses.textPrimary}`}>{item.title}</h3>
                <p className={themeClasses.textSecondary}>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section: How We Built It (Timeline) */}
        <section>
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold ${themeClasses.textPrimary}`}>{t.how.title}</h2>
          </div>
          <div className="relative">
            {/* The vertical line */}
            <div className={`absolute top-0 bottom-0 w-0.5 ${language === 'ar' ? 'right-6' : 'left-6'} bg-gray-300 dark:bg-gray-700`}></div>
            <div className="space-y-12">
              {t.how.steps.map((step, index) => (
                <div key={index} className="relative flex items-start">
                  <div className={`z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${themeClasses.cardBg} border-2 ${themeClasses.borderColor}`}>
                    <step.icon className={`w-6 h-6 ${themeClasses.textAccent}`} />
                  </div>
                  <div className={` ${language === 'ar' ? 'mr-6' : 'ml-6'}`}>
                    <h3 className={`text-xl font-semibold mb-2 ${themeClasses.textPrimary}`}>{step.title}</h3>
                    <p className={themeClasses.textSecondary}>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={`mt-10 text-center text-sm font-mono tracking-tight p-3 rounded-lg border ${themeClasses.borderColor} ${themeClasses.iconBg} ${themeClasses.textSecondary}`}>
            {t.how.tech}
          </div>
        </section>

        {/* Section: Team & Contact (Combined) */}
        <section className={`p-8 md:p-12 rounded-2xl border ${themeClasses.borderColor} ${themeClasses.sectionBg}`}>
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Team Section */}
            <div className="lg:col-span-3">
              <h2 className={`text-3xl font-bold mb-6 ${themeClasses.textPrimary}`}>{t.team.title}</h2>
              <p className={`text-lg mb-6 ${themeClasses.textSecondary}`}>
                {t.team.description}
              </p>
              <blockquote className={`p-4 border-l-4 ${themeClasses.borderColor} bg-black/10 dark:bg-white/5 rounded-r-lg`}>
                <p className="italic text-gray-600 dark:text-gray-400">
                  "{t.team.quote}"
                </p>
              </blockquote>
            </div>

            {/* Contact Section */}
            <div className="lg:col-span-2">
              <h2 className={`text-3xl font-bold mb-6 ${themeClasses.textPrimary}`}>{t.contact.title}</h2>
              <p className={`mb-6 ${themeClasses.textSecondary}`}>
                {t.contact.description}
              </p>
              <div className="space-y-4">
                <a href="mailto:ksardata@gmail.com" className={`flex items-center p-4 rounded-lg border ${themeClasses.borderColor} ${themeClasses.cardBg} hover:border-blue-500 transition-colors`}>
                  <Mail className={`w-6 h-6 ${themeClasses.textAccent} ${language === 'ar' ? 'ml-4' : 'mr-4'}`} />
                  <span className={themeClasses.textPrimary}>{t.contact.email} : ksardata@gmail.com</span>
                </a>
                <a href="https://www.facebook.com/profile.php?id=61578979396224" target="_blank" rel="noopener noreferrer" className={`flex items-center p-4 rounded-lg border ${themeClasses.borderColor} ${themeClasses.cardBg} hover:border-blue-500 transition-colors`}>
                  <MessageCircle className={`w-6 h-6 ${themeClasses.textAccent} ${language === 'ar' ? 'ml-4' : 'mr-4'}`} />
                  <span className={themeClasses.textPrimary}>{t.contact.social}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      
    </div>
  );
};

export default AboutUsPage;