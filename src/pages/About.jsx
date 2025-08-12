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
          heroTitle: 'عن مشروع KSAR-DATA',
          heroMission: 'مبادرة محلية لجعل البيانات العامة لمدينة القصر الكبير مفتوحة، مرئية، وسهلة الفهم.',
          why: {
            title: 'لماذا أنشأنا هذا المشروع؟',
            description: 'البيانات العمومية لمدينتنا متوفرة… لكن الوصول إليها صعب، وتصفحها ممل، وغالبًا ما تُعرض في ملفات PDF إدارية معقدة. وُلد Ksar-Data من الحاجة لفهم ميزانية المدينة، ثم تحول لمبادرة مفتوحة نحو مجتمع أكثر وعيًا واطلاعًا.',
            points: [
              'لا علاقة للموقع بأي جهة سياسية',
              'المشروع غير ربحي وممول ذاتيًا بالكامل',
              'الهدف الوحيد هو التوعية وخدمة المجتمع'
            ]
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
          how: {
            title: 'كيف بنينا المشروع؟',
            steps: [
              { icon: Search, title: 'البحث وجمع البيانات', description: 'تحديد وتجميع المصادر الرسمية الموثوقة للبيانات (ملفات PDF).' },
              { icon: Database, title: 'الاستخلاص والمعالجة', description: 'استخدام Python (PyPDF2, Pandas) لاستخراج وتنظيف وتحويل البيانات إلى صيغ منظمة (CSV, JSON).' },
              { icon: GitBranch, title: 'التحليل والتجهيز', description: 'معالجة وتحليل متقدم للبيانات لضمان دقتها وتوافقها مع هيكل المشروع.' },
              { icon: Paintbrush, title: 'التصميم والتطوير', description: 'بناء واجهة مستخدم عصرية وسهلة الاستخدام باستخدام React وTailwindCSS.' }
            ],
            tech: 'Open Source • React • TailwindCSS • ShadCN • Recharts • Pandas • Python'
          },
          team: {
            title: 'من وراء المشروع؟',
            description: 'KSAR-DATA هو مشروع من إنجاز يونس البتات، مطور برامج. تم بناؤه كجزء من جهد لرد الجميل للمجتمع، وتعزيز الشفافية، وتشجيع المشاركة المدنية.',
            quote: 'هذه مجرد البداية. نؤمن بقوة المعلومات المتاحة. إذا ساعد هذا المشروع طالبًا واحدًا أو مواطنًا على فهم مدينته بشكل أفضل - فإن الأمر يستحق ذلك.'
          },
          contact: {
            title: 'تواصل معنا وساهم',
            description: 'هل لديك اقتراح؟ هل تريد الإبلاغ عن خطأ أو التعاون معنا؟ يسعدنا أن نسمع منك.',
            email: 'راسلنا عبر البريد الإلكتروني',
            social: 'تواصل معنا على فيسبوك'
          },
          footer: 'نسخة تجريبية – الإصدار 1.1.7 | جميع الحقوق محفوظة © 2025'
        };

      case 'en':
        return {
          heroTitle: 'About KSAR-DATA',
          heroMission: 'A local initiative to make the public data of Ksar El Kebir open, visible, and easy to understand.',
          why: {
            title: 'Why We Built This',
            description: 'Public data about our city exists, but it\'s hard to access and often buried in complex PDF files. Ksar-Data was born from a need to understand the city budget and grew into an open initiative for a more informed community.',
            points: [
              'No affiliation with any political party',
              'Non-profit and entirely self-funded',
              'Solely for community awareness and service'
            ]
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
          how: {
            title: 'How We Built It',
            steps: [
              { icon: Search, title: 'Research & Data Collection', description: 'Identifying and gathering official, reliable data sources (PDFs).' },
              { icon: Database, title: 'Extraction & Processing', description: 'Using Python (PyPDF2, Pandas) to extract, clean, and format data (CSV, JSON).' },
              { icon: GitBranch, title: 'Analysis & Preparation', description: 'Advanced data processing and analysis to ensure accuracy and consistency.' },
              { icon: Paintbrush, title: 'Design & Development', description: 'Building a modern, user-friendly interface with React and TailwindCSS.' }
            ],
            tech: 'Open Source • React • TailwindCSS • ShadCN • Recharts • Pandas • Python'
          },
          team: {
            title: 'Who Is Behind This?',
            description: 'KSAR-DATA is a project by Younes Bettate, a software developer. It was built to give back to the community, promote transparency, and encourage civic engagement.',
            quote: 'This is just the beginning. We believe in the power of accessible information. If this helps even one student or citizen better understand their city—it’s worth it.'
          },
          contact: {
            title: 'Get Involved',
            description: 'Have a suggestion? Want to report an error or collaborate with us? We\'d love to hear from you.',
            email: 'Contact us via Email',
            social: 'Connect on Facebook'
          },
          footer: 'Beta Version – v1.1.7 | All Rights Reserved © 2025'
        };

      default: // French
        return {
          heroTitle: 'À propos de KSAR-DATA',
          heroMission: 'Une initiative locale pour rendre les données publiques de Ksar El Kebir ouvertes, visibles et faciles à comprendre.',
          why: {
            title: 'Pourquoi ce projet ?',
            description: 'Les données publiques de notre ville existent, mais elles sont difficiles d\'accès et souvent cachées dans des fichiers PDF complexes. Ksar-Data est né du besoin de comprendre le budget municipal et a évolué en une initiative ouverte pour une communauté mieux informée.',
            points: [
              'Aucune affiliation politique',
              'Projet à but non lucratif et entièrement autofinancé',
              'Uniquement pour la sensibilisation et le service communautaire'
            ]
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
          how: {
            title: 'Comment l\'avons-nous construit ?',
            steps: [
              { icon: Search, title: 'Recherche et collecte', description: 'Identification et collecte de sources de données officielles (PDF).' },
              { icon: Database, title: 'Extraction et traitement', description: 'Utilisation de Python (PyPDF2, Pandas) pour extraire, nettoyer et formater les données.' },
              { icon: GitBranch, title: 'Analyse et préparation', description: 'Traitement et analyse avancés des données pour garantir leur exactitude.' },
              { icon: Paintbrush, title: 'Conception et développement', description: 'Création d\'une interface moderne avec React et TailwindCSS.' }
            ],
            tech: 'Open Source • React • TailwindCSS • ShadCN • Recharts • Pandas • Python'
          },
          team: {
            title: 'Qui est derrière ce projet ?',
            description: 'KSAR-DATA est un projet de Younes Bettate, un développeur de logiciels. Il a été créé pour redonner à la communauté, promouvoir la transparence et encourager l\'engagement civique.',
            quote: 'Ce n\'est que le début. Nous croyons au pouvoir de l\'information accessible. Si cela aide ne serait-ce qu\'un étudiant à mieux comprendre sa ville, cela en vaut la peine.'
          },
          contact: {
            title: 'Participez',
            description: 'Une suggestion ? Signaler une erreur ou collaborer ? Nous serions ravis de vous entendre.',
            email: 'Contactez-nous par e-mail',
            social: 'Connectez-vous sur Facebook'
          },
          footer: 'Version d’essai – v1.1.7 | Tous droits réservés © 2025'
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
                <a href="mailto:bt.younesse@gmail.com" className={`flex items-center p-4 rounded-lg border ${themeClasses.borderColor} ${themeClasses.cardBg} hover:border-blue-500 transition-colors`}>
                  <Mail className={`w-6 h-6 ${themeClasses.textAccent} ${language === 'ar' ? 'ml-4' : 'mr-4'}`} />
                  <span className={themeClasses.textPrimary}>{t.contact.email} : bt.younesse@gmail.com</span>
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

      {/* Footer */}
      <footer className="py-8 border-t" style={{ borderColor: themeClasses.borderColor }}>
        <div className="container mx-auto px-6 text-center">
          <div className={`inline-flex items-center px-4 py-2 rounded-full border text-sm ${themeClasses.borderColor} ${themeClasses.textSecondary} ${themeClasses.cardBg}`}>
            
            <span>{t.footer}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUsPage;