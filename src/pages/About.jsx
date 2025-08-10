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
  MessageCircle
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const AboutUsPage = ({ 
  language = 'ar', 
  theme = 'dark' 
}) => {
  

  
  // Translations
  const getTranslations = () => {
    switch (language) {
      case 'ar':
        return {
          // Hero Section
          
          heroMission: 'مبادرة محلية لجعل البيانات العامة لمدينة القصر الكبير مفتوحة، مرئية، وسهلة الفهم.',
        

          // Accordion Sections
          sections: [
            {
              id: 'why',
              title: 'لماذا أنشأنا KSAR DATA؟',
              icon: Target,
              content: {
                description: 'البيانات العمومية لمدينتنا متوفرة…لكن الوصول إليها صعب، وتصفحها ممل، وغالبًا ما تُعرض في ملفات PDF إدارية معقدة، بدون أي أدوات للفهم أو المقارنة. Ksar-Data وُلد من الحاجة لفهم ميزانية المدينة، ثم تحول لمبادرة مفتوحة: نحو مجتمع أكثر وعيًا، وأكثر اطلاعًا.',
                points: [
                  ' لا علاقة للموقع بأي جهة سياسية أو مؤسسة',
                  'المشروع غير ربحي، وتم تطويره بالكامل بدون أي تمويل خارجي',
                  ' الهدف الوحيد هو التوعية وخدمة المجتمع'
                ]
              }
            },
            {
              id: 'what',
              title: 'ما ستجده في KSAR DATA',
              icon: BarChart3,
              content: {
                items: [
                  {
                    icon: Building2,
                    title: 'مستكشف الميزانية',
                    description: 'تتبع من أين تأتي الأموال العامة وأين تذهب'
                  },
                  {
                    icon: Users,
                    title: 'رؤى السكان',
                    description: 'فهم ديموغرافية القصر الكبير (العمر، التعليم، إلخ)'
                  },
                  {
                    icon: TrendingUp,
                    title: 'مخططات تفاعلية',
                    description: 'تصور اتجاهات متعددة السنوات بطريقة واضحة وبسيطة'
                  },
                  {
                    icon: Brain,
                    title: 'هل تعلم؟',
                    description: 'حقائق محلية مدهشة من الإحصائيات الرسمية'
                  }
                ]
              }
            },
            {
              id: 'how',
              title: 'كيف بنينا المشروع؟',
              icon: Code,
              content: {
                description: 'تم إنجاز مشروع "KSAR-DATA" وفق منهجية عمل دقيقة ومراحل متكاملة، بهدف ضمان أعلى مستويات الجودة والموثوقية للبيانات. اعتمدنا في جميع مراحل المشروع على تقنيات مفتوحة المصدر، مما أتاح لنا مرونة عالية في التطوير وسهولة في التعامل مع البيانات. فيما يلي عرض مفصل لخطوات تنفيذ المشروع: \n\nالمرحلة الأولى: البحث وجمع البيانات \nبدأت رحلتنا بتحديد وتجميع المصادر الرسمية الموثوقة للبيانات المتعلقة بمدينة القصر الكبير. ركزنا على جمع الملفات والتقارير الصادرة عن الجهات الحكومية والمؤسسات المحلية، والتي كانت متاحة في الغالب بصيغة PDF، لضمان دقة وأصالة المعلومات.\n\nالمرحلة الثانية: استخلاص ومعالجة البيانات الأولية \n في هذه المرحلة، قمنا بتحميل ملفات PDF وتجهيزها للمعالجة. استخدمنا أدوات برمجية متخصصة لتحويل هذه الملفات إلى نصوص قابلة للتحليل. وشمل ذلك:التفريغ النصي: بالاعتماد على لغة البرمجة "بايثون" ومكتبتها القوية "PyPDF2"، تمكنا من استخراج النصوص بكفاءة. وفي الحالات التي كانت فيها المستندات ممسوحة ضوئيًا، لجأنا إلى تقنيات التعرف الضوئي على الحروف (OCR) لضمان عدم فقدان أي بيانات.تنظيف البيانات وتحويلها: بعد استخراج النصوص، استخدمنا مكتبة "Pandas" في "بايثون" لتنظيف البيانات من الأخطاء والتكرار، ومن ثم تحويلها إلى صيغ منظمة مثل CSV وJSON، لتسهيل استيرادها والتعامل معها في المراحل اللاحقة.\n\nالمرحلة الثالثة: تحليل البيانات وتجهيزها\nخضعت البيانات المنظمة لعمليات معالجة وتحليل متقدمة للتأكد من دقتها وتوافقها مع الهيكلية المعتمدة للمشروع. وقد هدفت هذه المرحلة إلى إعداد بيانات جاهزة وموثوقة للعرض والاستخدام النهائي.\n\nالمرحلة الرابعة: تطوير البنية التحتية التقنية للمشروعشملت هذه المرحلة الجوانب التقنية لتطوير المنصة:\nتطوير واجهة المستخدم (Frontend):\n تم تصميم وبناء واجهة مستخدم عصرية وسهلة الاستخدام بالاعتماد على مكتبة "React.js". كما استخدمنا إطار العمل "Tailwind CSS" لضمان تجربة مستخدم سلسة ومتجاوبة على مختلف الأجهزة والشاشات.',
                tech: 'Open Source • React • TailwindCSS • ShadCN • Recharts • Pandas • Python'
              }
            },
            {
              id: 'team',
              title: 'من وراء المشروع؟',
              icon: Users,
              content: {
                description: 'KSAR-DATA مشروع من إنجاز يونس البتات، مبرمج full-stack. تم بناؤه كجزء من جهد لرد الجميل للمجتمع، وتعزيز الشفافية، وتشجيع المشاركة المدنية من خلال البيانات المفتوحة.',
                quote: 'هذه مجرد البداية. نؤمن بقوة المعلومات المتاحة. إذا ساعد طالباً واحداً أو مواطناً أو صحفياً على فهم مدينته بشكل أفضل - فإن الأمر يستحق ذلك.'
              }
            },
            {
              id: 'contact',
              title: 'التواصل والمساهمة',
              icon: Mail,
              content: {
                description: 'تريد الإبلاغ عن خطأ؟ اقتراح مجموعة بيانات؟ التعاون معنا؟',
                contactEmail: 'راسلنا على',
                contactSocial: 'أو تواصل معنا عبر صفحتنا على فيسبوك'
              }
            }
          ]
        };

      case 'en':
        return {
  // Hero Section
  
  heroMission: 'A local initiative to make the public data of Ksar El Kebir open, visible, and easy to understand.',

  // Accordion Sections
  sections: [
    {
      id: 'why',
      title: 'Why did we create KSAR-DATA?',
      icon: Target,
      content: {
        description: 'Public data about our city is available… but accessing it is difficult, browsing is boring, and it is often presented in complex administrative PDF files without any tools for understanding or comparison. Ksar-Data was born from the need to understand the city’s budget, then evolved into an open initiative: towards a more aware and informed community.',
        points: [
          'We have no connection to any political party',
          'The project is non-profit and was developed entirely without external funding',
          'The sole goal is awareness and serving the community'
        ]
      }
    },
    {
      id: 'what',
      title: 'What you will find in KSAR-DATA',
      icon: BarChart3,
      content: {
        items: [
          {
            icon: Building2,
            title: 'Budget Explorer',
            description: 'Track where public funds come from and where they go'
          },
          {
            icon: Users,
            title: 'Population Insights',
            description: 'Understanding the demographics of Ksar El Kebir (age, education, etc.)'
          },
          {
            icon: TrendingUp,
            title: 'Interactive Charts',
            description: 'Visualize multi-year trends clearly and simply'
          },
          {
            icon: Brain,
            title: 'Did you know?',
            description: 'Amazing local facts from official statistics'
          }
        ]
      }
    },
    {
      id: 'how',
      title: 'How we built it',
      icon: Code,
      content: {
        description: `The "KSAR-DATA" project was accomplished following a precise methodology and comprehensive phases to ensure the highest levels of data quality and reliability. Throughout all project phases, we relied on open source technologies, which gave us high flexibility in development and ease of data handling. Below is a detailed presentation of the project implementation steps:

Phase 1: Research and Data Collection  
Our journey began by identifying and gathering official reliable data sources related to Ksar El Kebir. We focused on collecting files and reports issued by government bodies and local institutions, mostly available in PDF format, to guarantee data accuracy and authenticity.

Phase 2: Extracting and Processing Raw Data  
In this phase, we downloaded PDF files and prepared them for processing. We used specialized software tools to convert these files into analyzable text. This included:  
- Text extraction: Using Python and its powerful "PyPDF2" library, we efficiently extracted text. For scanned documents, we applied Optical Character Recognition (OCR) techniques to avoid any data loss.  
- Data cleaning and transformation: After text extraction, we used Python’s "Pandas" library to clean the data from errors and duplicates, then converted it into organized formats such as CSV and JSON for easier import and handling in later stages.

Phase 3: Data Analysis and Preparation  
The organized data underwent advanced processing and analysis to ensure its accuracy and compatibility with the project’s structure. This phase aimed to prepare reliable, ready-to-use data for display and final usage.

Phase 4: Developing the Technical Infrastructure  
This phase covered the technical aspects of platform development:  
- Frontend development: We designed and built a modern, user-friendly interface using the React.js library. We also used the Tailwind CSS framework to ensure a smooth, responsive user experience across various devices and screen sizes.`,
        tech: 'Open Source • React • TailwindCSS • ShadCN • Recharts • Pandas • Python'
      }
    },
    {
      id: 'team',
      title: 'Who is behind the project',
      icon: Users,
      content: {
        description: 'KSAR-DATA is a project by Younes Bettate, a full-stack developer. It was built as part of an effort to give back to the community, promote transparency, and encourage civic engagement through open data.',
        quote: 'This is just the beginning. We strongly believe in the power of accessible information. If it helps even one student, citizen, or journalist better understand their city — it’s worth it.'
      }
    },
    {
      id: 'contact',
      title: 'Contact and Contribution',
      icon: Mail,
      content: {
        description: 'Want to report an error? Suggest a dataset? Collaborate with us?',
        contactEmail: 'Write to us at',
        contactSocial: 'or connect with us via our Facebook page'
      }
    }
  ]
};


      default: // French
        return {
  // Hero Section
  
  heroMission: 'Une initiative locale visant à rendre les données publiques de la ville de Ksar El Kebir ouvertes, visibles et faciles à comprendre.',

  // Accordion Sections
  sections: [
    {
      id: 'why',
      title: 'Pourquoi avons-nous créé KSAR-DATA ?',
      icon: Target,
      content: {
        description: 'Les données publiques de notre ville sont disponibles… mais y accéder est difficile, la navigation est ennuyeuse, et elles sont souvent présentées dans des fichiers PDF administratifs complexes, sans outils pour comprendre ou comparer. Ksar-Data est née du besoin de comprendre le budget de la ville, puis a évolué en une initiative ouverte : vers une communauté plus consciente et mieux informée.',
        points: [
          "Nous n'avons aucun lien avec une quelconque organisation politique",
          "Le projet est à but non lucratif et a été développé entièrement sans financement externe",
          "Le seul but est la sensibilisation et le service à la communauté"
        ]
      }
    },
    {
      id: 'what',
      title: 'Ce que vous trouverez dans KSAR-DATA',
      icon: BarChart3,
      content: {
        items: [
          {
            icon: Building2,
            title: 'Explorateur de Budget',
            description: "Suivez d'où viennent les fonds publics et où ils vont"
          },
          {
            icon: Users,
            title: 'Aperçus de la Population',
            description: 'Comprendre la démographie de Ksar El Kebir (âge, éducation, etc.)'
          },
          {
            icon: TrendingUp,
            title: 'Graphiques Interactifs',
            description: 'Visualiser clairement et simplement les tendances pluriannuelles'
          },
          {
            icon: Brain,
            title: 'Le saviez-vous ?',
            description: 'Faits locaux étonnants tirés des statistiques officielles'
          }
        ]
      }
    },
    {
      id: 'how',
      title: 'Comment nous l\'avons construit',
      icon: Code,
      content: {
        description: `Le projet "KSAR-DATA" a été réalisé selon une méthodologie précise et des phases complètes, afin d'assurer les plus hauts niveaux de qualité et de fiabilité des données. Tout au long des phases du projet, nous nous sommes appuyés sur des technologies open source, ce qui nous a offert une grande flexibilité dans le développement et une facilité de gestion des données. Voici une présentation détaillée des étapes de réalisation du projet :

Phase 1 : Recherche et collecte des données  
Notre parcours a commencé par l'identification et la collecte des sources de données officielles et fiables relatives à Ksar El Kebir. Nous avons ciblé la collecte de fichiers et de rapports émis par des organismes gouvernementaux et des institutions locales, principalement disponibles au format PDF, afin de garantir la précision et l'authenticité des informations.

Phase 2 : Extraction et traitement des données brutes  
Lors de cette phase, nous avons téléchargé les fichiers PDF et les avons préparés pour le traitement. Nous avons utilisé des outils logiciels spécialisés pour convertir ces fichiers en textes analysables. Cela incluait :  
- Extraction de texte : En utilisant Python et sa puissante bibliothèque "PyPDF2", nous avons extrait efficacement les textes. Pour les documents scannés, nous avons appliqué des techniques de reconnaissance optique de caractères (OCR) pour éviter toute perte de données.  
- Nettoyage et transformation des données : Après extraction du texte, nous avons utilisé la bibliothèque "Pandas" de Python pour nettoyer les données des erreurs et doublons, puis les convertir en formats organisés tels que CSV et JSON, facilitant ainsi leur importation et gestion aux étapes suivantes.

Phase 3 : Analyse et préparation des données  
Les données organisées ont subi des traitements et analyses avancées pour en assurer la précision et la compatibilité avec la structure du projet. Cette phase visait à préparer des données fiables et prêtes à l'affichage et à l'utilisation finale.

Phase 4 : Développement de l'infrastructure technique  
Cette phase a couvert les aspects techniques du développement de la plateforme :  
- Développement frontend : Nous avons conçu et construit une interface utilisateur moderne et conviviale en utilisant la bibliothèque React.js. Nous avons également utilisé le framework Tailwind CSS pour garantir une expérience utilisateur fluide et responsive sur divers appareils et tailles d'écran.`,
        tech: 'Open Source • React • TailwindCSS • ShadCN • Recharts • Pandas • Python'
      }
    },
    {
      id: 'team',
      title: 'Qui est derrière le projet',
      icon: Users,
      content: {
        description: 'KSAR-DATA est un projet de Younes Bettate, développeur full-stack. Il a été construit dans le cadre d’un effort pour rendre à la communauté, promouvoir la transparence, et encourager la participation citoyenne à travers les données ouvertes.',
        quote: 'Ce n’est que le début. Nous croyons fermement au pouvoir de l’information accessible. Si cela aide ne serait-ce qu’un étudiant, citoyen, ou journaliste à mieux comprendre sa ville — cela en vaut la peine.'
      }
    },
    {
      id: 'contact',
      title: 'Contact et Contribution',
      icon: Mail,
      content: {
        description: 'Vous voulez signaler une erreur ? Proposer un jeu de données ? Collaborer avec nous ?',
        contactEmail: 'Écrivez-nous à',
        contactSocial: 'ou contactez-nous via notre page Facebook'
      }
    }
  ]
};

    }
  };

  const t = getTranslations();

  // Theme classes
  const themeClasses = {
    bg: theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50',
    cardBg: theme === 'dark' ? 'bg-gray-900' : 'bg-white',
    borderColor: theme === 'dark' ? 'border-gray-800' : 'border-gray-200',
    textPrimary: theme === 'dark' ? 'text-white' : 'text-gray-900',
    textSecondary: theme === 'dark' ? 'text-gray-400' : 'text-gray-600',
    textAccent: theme === 'dark' ? 'text-blue-400' : 'text-blue-600',
    iconBg: theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100',
    gradientFrom: theme === 'dark' ? 'from-blue-600' : 'from-blue-500',
    gradientTo: theme === 'dark' ? 'to-purple-600' : 'to-purple-500'
  };

  const renderSectionContent = (section) => {
    const { content } = section;

    switch (section.id) {
      case 'team':
        return (
          <div className="space-y-6">
            <p className={`text-lg leading-relaxed ${themeClasses.textSecondary}`}>
              {content.description}
            </p>
            <div className={`p-4 rounded-lg border-l-4 border-blue-500 ${themeClasses.iconBg}`}>
              <p className={`text-base italic ${themeClasses.textSecondary}`}>
                "{content.quote}"
              </p>
            </div>
          </div>
        );

      case 'why':
        return (
          <div className="space-y-6">
            <p className={`text-lg leading-relaxed ${themeClasses.textSecondary}`}>
              {content.description}
            </p>
            <div className="space-y-3">
              {content.points.map((point, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-2 h-2 rounded-full bg-green-500 ${language === 'ar' ? 'ml-3' : 'mr-3'}`}></div>
                  <span className={`${themeClasses.textSecondary}`}>{point}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'what':
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              {content.items.map((item, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border ${themeClasses.iconBg} ${themeClasses.borderColor}`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${themeClasses.cardBg} ${language === 'ar' ? 'ml-3' : 'mr-3'}`}>
                      <item.icon className={`w-5 h-5 ${themeClasses.textAccent}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold mb-2 ${themeClasses.textPrimary}`}>
                        {item.title}
                      </h4>
                      <p className={`text-sm ${themeClasses.textSecondary}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'how':
        return (
          <div className="space-y-6">
            <p className={`text-lg leading-relaxed ${themeClasses.textSecondary}`}>
              {content.description}
            </p>
            <div className="flex items-center space-x-4">
              <Github className={`w-5 h-5 ${themeClasses.textAccent}`} />
              <span className={`text-sm ${themeClasses.textSecondary}`}>
                {content.tech}
              </span>
            </div>
          </div>
        );

      

      case 'contact':
        return (
          <div className="space-y-6">
            <p className={`text-lg leading-relaxed ${themeClasses.textSecondary}`}>
              {content.description}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg border ${themeClasses.iconBg} ${themeClasses.borderColor}`}>
                <div className="flex items-center mb-3">
                  <Mail className={`w-5 h-5 ${themeClasses.textAccent} ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                  <span className={`font-medium ${themeClasses.textPrimary}`}>
                    {content.contactEmail}
                  </span>
                </div>
                <a 
                  href="mailto:bt.younesse@gmail.com"
                  className={`text-lg font-mono ${themeClasses.textAccent} hover:underline`}
                >
                  bt.younesse@gmail.com
                </a>
              </div>
              <div className={`p-4 rounded-lg border ${themeClasses.iconBg} ${themeClasses.borderColor}`}>
                <div className="flex items-center mb-3">
                  <MessageCircle className={`w-5 h-5 ${themeClasses.textAccent} ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                  <span className={`font-medium ${themeClasses.textPrimary}`}>
                    Facebook
                  </span>
                </div>
                <p className={`${themeClasses.textSecondary}`}>
                  {content.contactSocial}
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      className={`min-h-screen ${themeClasses.bg} pt-10`}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      style={language === 'ar' ? { fontFamily: 'Noto Kufi Arabic, sans-serif' } : undefined}
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${themeClasses.gradientFrom} ${themeClasses.gradientTo} opacity-1`}></div>
        <div className="container mx-auto px-6 lg:px-12 py-16 relative">
          <div className="text-center max-w-4xl mx-auto">
            <img 
            src={`${theme === 'dark' ? '/logo_on_dark.png' : '/Logo_on_white.png'}`} 
            alt="Ksar El Kebir Gate"
            className="w-50 justify-self-center mb-5 max-w-2xl h-auto object-contain drop-shadow-2xl"
          />
            <h1 className={`text-4xl lg:text-6xl font-bold mb-6 ${themeClasses.textPrimary}`}>
              {t.heroTitle}
            </h1>
            <p className={`text-xl lg:text-2xl mb-8 ${themeClasses.textSecondary} leading-relaxed`}>
              {t.heroMission}
            </p>
            <div className="space-y-2">
              <p className={`text-lg ${themeClasses.textAccent}`}>
                {t.heroSubtitle1}
              </p>
              <p className={`text-base ${themeClasses.textSecondary}`}>
                {t.heroSubtitle2}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion Sections */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className={`rounded-lg border shadow-lg ${themeClasses.cardBg} ${themeClasses.borderColor}`}>
            <Accordion type="multiple" className="w-full">
              {t.sections.map((section, index) => (
                <AccordionItem 
                  key={section.id} 
                  value={section.id}
                  className={`border-b ${themeClasses.borderColor} last:border-b-0`}
                >
                  <AccordionTrigger 
                    className={`px-6 py-4 hover:no-underline ${themeClasses.textPrimary}`}
                  >
                    <div className="flex items-center w-full">
                      <div className={`p-2 rounded-lg ${themeClasses.iconBg} ${language === 'ar' ? 'ml-4' : 'mr-4'}`}>
                        <section.icon className={`w-5 h-5 ${themeClasses.textAccent}`} />
                      </div>
                      <span className={`text-lg font-semibold ${language === 'ar' ? 'text-right' : 'text-left'} flex-1`}>
                        {section.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 whitespace-pre-line">
                    {renderSectionContent(section)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center">
            <div className={`inline-flex items-center px-6 py-3 rounded-full border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-3"></div>
              <span className={themeClasses.textSecondary}>
                {language === 'ar' ? 'نسخة تجريبية – الإصدار 1.1.7 | جميع الحقوق محفوظة © 2025' : 
                 language === 'en' ? 'Beta Version – v1.1.7 | All Rights Reserved © 2025' : 
                 'Version d’essai – v1.1.7 | Tous droits réservés © 2025'}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;