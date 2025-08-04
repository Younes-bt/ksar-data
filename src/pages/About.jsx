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
              title: 'لماذا أنشأنا KSAR-DATA؟',
              icon: Target,
              content: {
                description: 'البيانات العمومية لمدينتنا متوفرة…لكن الوصول إليها صعب، وتصفحها ممل، وغالبًا ما تُعرض في ملفات PDF إدارية معقدة، بدون أي أدوات للفهم أو المقارنة. Ksar-Data وُلد من الحاجة لفهم ميزانية المدينة، ثم تحول لمبادرة مفتوحة: نحو مجتمع أكثر وعيًا، وأكثر اطلاعًا.',
                points: [
                  ' لا علاقة لنا بأي جهة سياسية',
                  'المشروع غير ربحي، وتم تطويره بالكامل بدون أي تمويل خارجي',
                  ' الهدف الوحيد هو التوعية وخدمة المجتمع'
                ]
              }
            },
            {
              id: 'what',
              title: 'ما ستجده في KSAR-DATA',
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
              title: 'كيف بنيناها',
              icon: Code,
              content: {
                description: 'KSAR-DATA مبني باستخدام تقنيات مفتوحة المصدر: React، TailwindCSS، Pandas، وبيانات  من مصادر رسمية.',
                tech: 'Open Source • React • TailwindCSS • ShadCN • Recharts • Pandas • Python'
              }
            },
            {
              id: 'team',
              title: 'من وراء المشروع',
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
          
          heroMission: 'KSAR-DATA is a local initiative to make Ksar El Kebir\'s public data open, visual, and easy to understand.',
          heroSubtitle1: 'Transparency through data',
          heroSubtitle2: 'Explore budgets, demographics, and key insights about your city',

          // Accordion Sections
          sections: [
            {
              id: 'why',
              title: 'Why We Built KSAR-DATA',
              icon: Target,
              content: {
                description: 'Public data about our city exists, but it\'s often hard to access, full of jargon, and presented in static PDFs. KSAR-DATA changes that by transforming raw numbers into interactive charts, clear insights, and local stories.',
                points: [
                  'No political affiliation',
                  'Non-commercial — built for education, civic awareness, and community engagement'
                ]
              }
            },
            {
              id: 'what',
              title: 'What You\'ll Find on KSAR-DATA',
              icon: BarChart3,
              content: {
                items: [
                  {
                    icon: Building2,
                    title: 'Budget Explorer',
                    description: 'Track where public money comes from and where it goes'
                  },
                  {
                    icon: Users,
                    title: 'Population Insights',
                    description: 'Understand the demographics of Ksar El Kebir (age, education, etc.)'
                  },
                  {
                    icon: TrendingUp,
                    title: 'Interactive Charts',
                    description: 'Visualize multi-year trends in a clear and simple way'
                  },
                  {
                    icon: Brain,
                    title: 'Did You Know?',
                    description: 'Surprising local facts from official statistics'
                  }
                ]
              }
            },
            {
              id: 'how',
              title: 'How We Built It',
              icon: Code,
              content: {
                description: 'KSAR-DATA is built using open-source technologies: React, TailwindCSS, Pandas, and CSV data from government sources.',
                tech: 'Open Source • React • TailwindCSS • Pandas'
              }
            },
            {
              id: 'team',
              title: 'Who\'s Behind It',
              icon: Users,
              content: {
                description: 'KSAR-DATA is a project by Younes El Mourabit, full-stack developer and founder of OPICOM Tech. Built as part of an effort to give back to the community, promote transparency, and encourage civic engagement through open data.',
                quote: 'This is just the beginning. We believe in the power of accessible information. If it helps one student, citizen, or journalist understand their city better — it\'s worth it.'
              }
            },
            {
              id: 'contact',
              title: 'Contact & Contribution',
              icon: Mail,
              content: {
                description: 'Want to report an error? Suggest a dataset? Collaborate with us?',
                contactEmail: 'Email us at',
                contactSocial: 'or message us via our Facebook page'
              }
            }
          ]
        };

      default: // French
        return {
          // Hero Section
          
          heroMission: 'KSAR-DATA est une initiative locale pour rendre les données publiques de Ksar El Kebir ouvertes, visuelles et faciles à comprendre.',
          heroSubtitle1: 'Transparence par les données',
          heroSubtitle2: 'Explorez les budgets, la démographie et les insights clés de votre ville',

          // Accordion Sections
          sections: [
            {
              id: 'why',
              title: 'Pourquoi Nous Avons Créé KSAR-DATA',
              icon: Target,
              content: {
                description: 'Les données publiques sur notre ville existent, mais elles sont souvent difficiles d\'accès, pleines de jargon, et présentées dans des PDFs statiques. KSAR-DATA change cela en transformant les chiffres bruts en graphiques interactifs, insights clairs, et histoires locales.',
                points: [
                  'Aucune affiliation politique',
                  'Non commercial — construit pour l\'éducation, la sensibilisation civique et l\'engagement communautaire'
                ]
              }
            },
            {
              id: 'what',
              title: 'Ce Que Vous Trouverez sur KSAR-DATA',
              icon: BarChart3,
              content: {
                items: [
                  {
                    icon: Building2,
                    title: 'Explorateur de Budget',
                    description: 'Suivez d\'où vient l\'argent public et où il va'
                  },
                  {
                    icon: Users,
                    title: 'Insights de Population',
                    description: 'Comprenez la démographie de Ksar El Kebir (âge, éducation, etc.)'
                  },
                  {
                    icon: TrendingUp,
                    title: 'Graphiques Interactifs',
                    description: 'Visualisez les tendances multi-années de manière claire et simple'
                  },
                  {
                    icon: Brain,
                    title: 'Le Saviez-Vous ?',
                    description: 'Faits locaux surprenants des statistiques officielles'
                  }
                ]
              }
            },
            {
              id: 'how',
              title: 'Comment Nous L\'Avons Construit',
              icon: Code,
              content: {
                description: 'KSAR-DATA est construit avec des technologies open-source : React, TailwindCSS, Pandas, et des données CSV de sources gouvernementales.',
                tech: 'Open Source • React • TailwindCSS • Pandas'
              }
            },
            {
              id: 'team',
              title: 'Qui Est Derrière',
              icon: Users,
              content: {
                description: 'KSAR-DATA est un projet de Younes El Mourabit, développeur full-stack et fondateur d\'OPICOM Tech. Construit dans le cadre d\'un effort pour redonner à la communauté, promouvoir la transparence, et encourager l\'engagement civique par les données ouvertes.',
                quote: 'Ce n\'est que le début. Nous croyons au pouvoir de l\'information accessible. Si cela aide un étudiant, un citoyen, ou un journaliste à mieux comprendre sa ville — cela en vaut la peine.'
              }
            },
            {
              id: 'contact',
              title: 'Contact & Contribution',
              icon: Mail,
              content: {
                description: 'Vous voulez signaler une erreur ? Suggérer un dataset ? Collaborer avec nous ?',
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
                  href="mailto:ksardata@opicom.tech"
                  className={`text-lg font-mono ${themeClasses.textAccent} hover:underline`}
                >
                  ksardata@opicom.tech
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
                  <AccordionContent className="px-6 pb-6">
                    {renderSectionContent(section)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center">
            <div className={`inline-flex items-center px-6 py-3 rounded-full ${themeClasses.iconBg} ${themeClasses.borderColor} border`}>
              <Eye className={`w-5 h-5 ${themeClasses.textAccent} ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
              <span className={`${themeClasses.textSecondary}`}>
                {language === 'ar' ? 'الشفافية من خلال البيانات' : 
                 language === 'en' ? 'Transparency through data' : 
                 'Transparence par les données'}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;