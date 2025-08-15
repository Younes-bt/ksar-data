import React, { useState, useEffect } from 'react';
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  Heart,
  GraduationCap,
  Droplets,
  Zap,
  Building2,
  DollarSign,
  Scale,
  BookOpen,
  UserX,
  Clock,
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  Briefcase,
  Home
} from 'lucide-react';

const DidYouKnowPage = ({ language = 'en', theme = 'dark' }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const translations = {
    ar: {
      title: 'هل تعلم؟',
      subtitle: 'اكتشف حقائق مدهشة حول القصر الكبير من خلال تقليب هذه البطاقات التفاعلية.',
      facts: [
        { 
          icon: Calendar, 
          title: 'شيخوخة متسارعة', 
          body: 'ارتفعت نسبة السكان الذين تزيد أعمارهم عن 60 عامًا بشكل كبير من 9.6% في 2014 إلى 15.4% في 2024، مما يشير إلى أن المدينة تتجه نحو الشيخوخة بوتيرة سريعة.',
          stat: '+60.4%',
          color: 'orange',
          category: 'demographics'
        },
        { 
          icon: Heart, 
          title: 'تضاعف حالات الطلاق', 
          body: 'ازدادت نسبة المطلقين في الفئة العمرية (15-59 سنة) بأكثر من الضعف، حيث قفزت من 1.6% إلى 3.9%، مما يعكس تغيرات في بنية الأسرة.',
          stat: '+143.8%',
          color: 'red',
          category: 'demographics'
        },
        { 
          icon: Users, 
          title: 'تراجع عدد السكان', 
          body: 'على عكس التوقعات، شهدت المدينة انخفاضًا طفيفًا في إجمالي عدد السكان من 126,425 نسمة في 2014 إلى 124,655 في 2024.',
          stat: '-1,770 نسمة',
          color: 'red',
          category: 'demographics'
        },
        { 
          icon: Briefcase, 
          title: 'تفاقم البطالة', 
          body: 'ارتفع معدل البطالة الإجمالي من 21.7% في 2014 إلى 24.4% في 2024، مما يشير إلى تحديات اقتصادية متزايدة.',
          stat: '+2.7 نقطة',
          color: 'red',
          category: 'demographics'
        },
        { 
          icon: GraduationCap, 
          title: 'قفزة في التعليم العالي', 
          body: 'شهدت المدينة تطورًا إيجابيًا كبيرًا بارتفاع نسبة الحاصلين على شهادات جامعية من 7.4% إلى 11.4%.',
          stat: '+54.1%',
          color: 'green',
          category: 'demographics'
        },
        { 
          icon: Droplets, 
          title: 'تحسن في شبكة المياه', 
          body: 'ارتفعت نسبة الأسر المتصلة بشبكة الماء الصالح للشرب من 92.4% إلى 97.7%، مما يعكس تحسنًا كبيرًا في البنية التحتية.',
          stat: '97.7%',
          color: 'blue',
          category: 'services'
        },
        { 
          icon: Zap, 
          title: 'تحسن في شبكة الكهرباء', 
          body: 'ارتفعت نسبة الأسر المتصلة بشبكة الكهرباء من 92.3% إلى 97.5%، مما يدل على تطوير واسع للخدمات الأساسية.',
          stat: '97.5%',
          color: 'yellow',
          category: 'services'
        },
        { 
          icon: Building2, 
          title: 'المدفوعات للشركات الخاصة', 
          body: 'هل تعلم أن المدفوعات للشركات الخاصة مقابل الخدمات المفوضة هي ثاني أكبر بند للنفقات في المدينة بعد الرواتب؟',
          stat: 'المرتبة الثانية',
          color: 'purple',
          category: 'budget'
        },
        { 
          icon: DollarSign, 
          title: 'فوائد الديون اليومية', 
          body: 'هل تعلم أن المدينة تدفع أكثر من 6,000 درهم يوميًا فقط كفوائد على ديونها؟ هذا يعني أكثر من 2 مليون درهم سنويًا.',
          stat: '+6,000 درهم/يوم',
          color: 'red',
          category: 'budget'
        },
        { 
          icon: Scale, 
          title: 'التعويضات القضائية', 
          body: 'هل تعلم أن المدينة دفعت ما يقرب من 10 ملايين درهم كتعويضات نتيجة خسارتها لدعاوى قضائية في السنوات الخمس الماضية؟',
          stat: '~10 مليون درهم',
          color: 'red',
          category: 'budget'
        },
        
        { 
          icon: UserX, 
          title: 'جلسة "الكراسي الفارغة"', 
          body: 'شهدت الجلسة الثانية من دورة فبراير 2025 حضور 15 عضوًا فقط من أصل 35، أي أقل من النصف (43%)، وهو رقم يكشف عن تحدٍ كبير في اكتمال النصاب القانوني.',
          stat: '43% حضور',
          color: 'red',
          category: 'governance'
        },
        { 
          icon: Clock, 
          title: 'الغياب المبرر الجماعي', 
          body: 'في الجلسة التي سجلت أدنى نسبة حضور (فبراير 2025)، كان 20 عضوًا غائبًا "بعذر"، من بينهم الرئيس نفسه، مما يطرح تساؤلات حول طبيعة هذه الأعذار المتزامنة.',
          stat: '20 غائب بعذر',
          color: 'orange',
          category: 'governance'
        }
      ],
      next: 'التالي',
      prev: 'السابق',
      startOver: 'البدء من جديد',
      footer: 'نسخة تجريبية – الإصدار 1.1.7 | جميع الحقوق محفوظة © 2025',
      cardCounter: 'البطاقة'
    },
    en: {
      title: 'Did You Know?',
      subtitle: 'Discover surprising facts about Ksar El Kebir by flipping through these interactive cards.',
      facts: [
        { 
          icon: Calendar, 
          title: 'Rapid Aging Population', 
          body: 'The percentage of residents over 60 years old increased significantly from 9.6% in 2014 to 15.4% in 2024, indicating the city is aging rapidly.',
          stat: '+60.4%',
          color: 'orange',
          category: 'demographics'
        },
        { 
          icon: Heart, 
          title: 'Divorce Rates Doubled', 
          body: 'The divorce rate among the 15-59 age group more than doubled, jumping from 1.6% to 3.9%, reflecting changes in family structure.',
          stat: '+143.8%',
          color: 'red',
          category: 'demographics'
        },
        { 
          icon: Users, 
          title: 'Population Decline', 
          body: 'Contrary to expectations, the city experienced a slight decrease in total population from 126,425 in 2014 to 124,655 in 2024.',
          stat: '-1,770 residents',
          color: 'red',
          category: 'demographics'
        },
        { 
          icon: Briefcase, 
          title: 'Rising Unemployment', 
          body: 'The overall unemployment rate rose from 21.7% in 2014 to 24.4% in 2024, indicating growing economic challenges.',
          stat: '+2.7 points',
          color: 'red',
          category: 'demographics'
        },
        { 
          icon: GraduationCap, 
          title: 'Higher Education Leap', 
          body: 'The city saw significant positive development with university graduates increasing from 7.4% to 11.4%.',
          stat: '+54.1%',
          color: 'green',
          category: 'demographics'
        },
        { 
          icon: Droplets, 
          title: 'Water Network Improvement', 
          body: 'The percentage of households connected to the drinking water network increased from 92.4% to 97.7%, reflecting major infrastructure improvements.',
          stat: '97.7%',
          color: 'blue',
          category: 'services'
        },
        { 
          icon: Zap, 
          title: 'Electricity Network Improvement', 
          body: 'The percentage of households connected to the electricity grid increased from 92.3% to 97.5%, showing extensive service development.',
          stat: '97.5%',
          color: 'yellow',
          category: 'services'
        },
        { 
          icon: Building2, 
          title: 'Private Company Payments', 
          body: 'Did you know that payments to private companies for delegated services is the second largest expenditure item in the city after salaries?',
          stat: '2nd largest',
          color: 'purple',
          category: 'budget'
        },
        { 
          icon: DollarSign, 
          title: 'Daily Debt Interest', 
          body: 'Did you know the city pays more than 6,000 dirhams daily just in interest on its debts? That\'s over 2 million dirhams annually.',
          stat: '+6,000 MAD/day',
          color: 'red',
          category: 'budget'
        },
        { 
          icon: Scale, 
          title: 'Legal Compensations', 
          body: 'Did you know the city paid nearly 10 million dirhams in compensation for losing lawsuits over the past five years?',
          stat: '~10M MAD',
          color: 'red',
          category: 'budget'
        },
        
        { 
          icon: UserX, 
          title: 'Empty Chairs Session', 
          body: 'The second session of February 2025 saw only 15 members out of 35 attend, less than half (43%), revealing a major challenge in achieving legal quorum.',
          stat: '43% attendance',
          color: 'red',
          category: 'governance'
        },
        { 
          icon: Clock, 
          title: 'Collective Justified Absence', 
          body: 'In the session with the lowest attendance (February 2025), 20 members were absent "with excuse," including the president himself, raising questions about these synchronized excuses.',
          stat: '20 excused absences',
          color: 'orange',
          category: 'governance'
        }
      ],
      next: 'Next',
      prev: 'Prev',
      startOver: 'Start Over',
      footer: 'Beta Version – v1.1.7 | All Rights Reserved © 2025',
      cardCounter: 'Card'
    },
    fr: {
      title: 'Le Saviez-Vous ?',
      subtitle: 'Découvrez des faits surprenants sur Ksar El Kebir en parcourant ces cartes interactives.',
      facts: [
        { 
          icon: Calendar, 
          title: 'Vieillissement Rapide', 
          body: 'Le pourcentage de résidents de plus de 60 ans a considérablement augmenté de 9,6% en 2014 à 15,4% en 2024, indiquant un vieillissement rapide de la ville.',
          stat: '+60,4%',
          color: 'orange',
          category: 'demographics'
        },
        { 
          icon: Heart, 
          title: 'Taux de Divorce Doublé', 
          body: 'Le taux de divorce dans la tranche d\'âge 15-59 ans a plus que doublé, passant de 1,6% à 3,9%, reflétant des changements dans la structure familiale.',
          stat: '+143,8%',
          color: 'red',
          category: 'demographics'
        },
        { 
          icon: Users, 
          title: 'Déclin Démographique', 
          body: 'Contrairement aux attentes, la ville a connu une légère baisse de population totale de 126 425 en 2014 à 124 655 en 2024.',
          stat: '-1 770 résidents',
          color: 'red',
          category: 'demographics'
        },
        { 
          icon: Briefcase, 
          title: 'Chômage Croissant', 
          body: 'Le taux de chômage global est passé de 21,7% en 2014 à 24,4% en 2024, indiquant des défis économiques croissants.',
          stat: '+2,7 points',
          color: 'red',
          category: 'demographics'
        },
        { 
          icon: GraduationCap, 
          title: 'Bond de l\'Enseignement Supérieur', 
          body: 'La ville a connu un développement positif significatif avec les diplômés universitaires passant de 7,4% à 11,4%.',
          stat: '+54,1%',
          color: 'green',
          category: 'demographics'
        },
        { 
          icon: Droplets, 
          title: 'Amélioration du Réseau d\'Eau', 
          body: 'Le pourcentage de ménages connectés au réseau d\'eau potable est passé de 92,4% à 97,7%, reflétant des améliorations majeures de l\'infrastructure.',
          stat: '97,7%',
          color: 'blue',
          category: 'services'
        },
        { 
          icon: Zap, 
          title: 'Amélioration du Réseau Électrique', 
          body: 'Le pourcentage de ménages connectés au réseau électrique est passé de 92,3% à 97,5%, montrant un développement extensif des services.',
          stat: '97,5%',
          color: 'yellow',
          category: 'services'
        },
        { 
          icon: Building2, 
          title: 'Paiements aux Entreprises Privées', 
          body: 'Saviez-vous que les paiements aux entreprises privées pour services délégués constituent le deuxième poste de dépenses après les salaires ?',
          stat: '2ème plus grand',
          color: 'purple',
          category: 'budget'
        },
        { 
          icon: DollarSign, 
          title: 'Intérêts Quotidiens sur la Dette', 
          body: 'Saviez-vous que la ville paie plus de 6 000 dirhams par jour uniquement en intérêts sur ses dettes ? Cela représente plus de 2 millions de dirhams annuellement.',
          stat: '+6 000 MAD/jour',
          color: 'red',
          category: 'budget'
        },
        { 
          icon: Scale, 
          title: 'Compensations Judiciaires', 
          body: 'Saviez-vous que la ville a payé près de 10 millions de dirhams en compensation pour avoir perdu des procès au cours des cinq dernières années ?',
          stat: '~10M MAD',
          color: 'red',
          category: 'budget'
        },
        
        { 
          icon: UserX, 
          title: 'Session des Chaises Vides', 
          body: 'La deuxième session de février 2025 n\'a vu que 15 membres sur 35 présents, moins de la moitié (43%), révélant un défi majeur pour atteindre le quorum légal.',
          stat: '43% présence',
          color: 'red',
          category: 'governance'
        },
        { 
          icon: Clock, 
          title: 'Absence Collective Justifiée', 
          body: 'Lors de la session avec la plus faible participation (février 2025), 20 membres étaient absents "avec excuse", y compris le président, soulevant des questions sur ces excuses synchronisées.',
          stat: '20 absences justifiées',
          color: 'orange',
          category: 'governance'
        }
      ],
      next: 'Suivant',
      prev: 'Précédent',
      startOver: 'Recommencer',
      footer: "Version d'essai – v1.1.7 | Tous droits réservés © 2025",
      cardCounter: 'Carte'
    }
  };
  
  const content = translations[language] || translations.en;
  
  const handleNext = () => {
    setActiveIndex((prev) => Math.min(prev + 1, content.facts.length));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };
  
  const handleStartOver = () => {
    setActiveIndex(0);
  };
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, content.facts.length]);

  const themeClasses = {
    bg: theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50',
    cardBg: theme === 'dark' ? 'bg-gray-900' : 'bg-white',
    borderColor: theme === 'dark' ? 'border-gray-800' : 'border-gray-200',
    textPrimary: theme === 'dark' ? 'text-white' : 'text-gray-900',
    textSecondary: theme === 'dark' ? 'text-gray-400' : 'text-gray-600',
    textAccent: theme === 'dark' ? 'text-amber-400' : 'text-amber-600',
    iconBg: theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100',
    buttonBg: theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100',
    gradientFrom: theme === 'dark' ? 'from-purple-900' : 'from-purple-50',
    gradientTo: theme === 'dark' ? 'to-gray-950' : 'to-gray-100'
  };

  const colorSchemes = {
    red: {
      bg: theme === 'dark' ? 'bg-red-950' : 'bg-red-50',
      border: theme === 'dark' ? 'border-red-500' : 'border-red-200',
      text: theme === 'dark' ? 'text-red-400' : 'text-red-600',
      statBg: theme === 'dark' ? 'bg-red-950' : 'bg-red-100'
    },
    green: {
      bg: theme === 'dark' ? 'bg-green-950' : 'bg-green-50',
      border: theme === 'dark' ? 'border-green-500' : 'border-green-200',
      text: theme === 'dark' ? 'text-green-400' : 'text-green-600',
      statBg: theme === 'dark' ? 'bg-green-950' : 'bg-green-100'
    },
    blue: {
      bg: theme === 'dark' ? 'bg-blue-950' : 'bg-blue-50',
      border: theme === 'dark' ? 'border-blue-500' : 'border-blue-200',
      text: theme === 'dark' ? 'text-blue-400' : 'text-blue-600',
      statBg: theme === 'dark' ? 'bg-blue-950' : 'bg-blue-100'
    },
    yellow: {
      bg: theme === 'dark' ? 'bg-yellow-950' : 'bg-yellow-50',
      border: theme === 'dark' ? 'border-yellow-500' : 'border-yellow-200',
      text: theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600',
      statBg: theme === 'dark' ? 'bg-yellow-950' : 'bg-yellow-100'
    },
    purple: {
      bg: theme === 'dark' ? 'bg-purple-950' : 'bg-purple-50',
      border: theme === 'dark' ? 'border-purple-500' : 'border-purple-200',
      text: theme === 'dark' ? 'text-purple-400' : 'text-purple-600',
      statBg: theme === 'dark' ? 'bg-purple-950' : 'bg-purple-100'
    },
    orange: {
      bg: theme === 'dark' ? 'bg-orange-950' : 'bg-orange-50',
      border: theme === 'dark' ? 'border-orange-500' : 'border-orange-200',
      text: theme === 'dark' ? 'text-orange-400' : 'text-orange-600',
      statBg: theme === 'dark' ? 'bg-orange-950' : 'bg-orange-100'
    }
  };

  const progressPercentage = (activeIndex / content.facts.length) * 100;

  return (
    <div 
      style={language === 'ar' ? { fontFamily: 'Noto Kufi Arabic, sans-serif' } : {}}
      className={`min-h-screen ${themeClasses.bg} flex flex-col overflow-hidden`}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Hero Section */}
      <header className={`relative py-16 md:py-20 bg-gradient-to-b ${themeClasses.gradientFrom} ${themeClasses.gradientTo}`}>
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <div className={`p-4 rounded-full ${themeClasses.iconBg}`}>
              <Brain className={`w-12 h-12 ${themeClasses.textAccent}`} />
            </div>
          </div>
          <h1 className={`text-4xl lg:text-5xl font-extrabold mb-4 ${themeClasses.textPrimary}`}>
            {content.title}
          </h1>
          <p className={`max-w-3xl mx-auto text-lg md:text-xl ${themeClasses.textSecondary}`}>
            {content.subtitle}
          </p>
        </div>
      </header>

      <div className="flex-grow flex flex-col items-center justify-center container mx-auto px-4 py-12">
        {/* Card Counter */}
        <div className="mb-8">
          <div className={`inline-flex items-center px-4 py-2 rounded-full border ${themeClasses.borderColor} ${themeClasses.cardBg}`}>
            <span className={`text-sm font-medium ${themeClasses.textSecondary}`}>
              {content.cardCounter} {activeIndex + 1} {language === 'ar' ? 'من' : language === 'fr' ? 'de' : 'of'} {content.facts.length}
            </span>
          </div>
        </div>

        {/* Cards Container */}
        <div className="w-full max-w-2xl h-96 relative">
          {content.facts.map((fact, index) => {
            const distance = index - activeIndex;
            if (Math.abs(distance) > 2 && index !== activeIndex) return null;
            
            let transform = '', opacity = 1, transitionDuration = '500ms', zIndex = 1;
            const colorScheme = colorSchemes[fact.color];
            
            if (distance < 0) {
              // Cards that have been seen (behind the current card)
              const xTranslate = language === 'ar' ? '150%' : '-150%';
              transform = `translateX(${xTranslate}) rotate(${language === 'ar' ? '15deg' : '-15deg'}) scale(0.8)`;
              opacity = 0.3; // Very low opacity for cards behind
              zIndex = 1;
            } else if (distance === 0) {
              // Current active card
              transform = 'translateY(0) scale(1)';
              opacity = 1; // Full opacity for active card
              zIndex = 10;
            } else if (distance === 1) {
              // Next card (slightly visible)
              transform = `translateY(20px) scale(0.95)`;
              opacity = 0.9; // High opacity for next card
              zIndex = 9;
            } else {
              // Cards further away
              transform = `translateY(${distance * 20}px) scale(${1 - distance * 0.05})`;
              opacity = Math.max(0.7 - (distance - 1) * 0.2, 0.3); // Gradual opacity decrease
              zIndex = 10 - distance;
            }
            
            if (activeIndex === content.facts.length) {
              transform = 'translateY(80px) scale(0.8)';
              opacity = 1;
              zIndex = 1;
            }
            
            return (
              <div 
                key={index}
                className={`absolute inset-0 p-8 rounded-2xl border-2 ${colorScheme.border} ${themeClasses.cardBg} ${colorScheme.bg} flex flex-col shadow-2xl transition-all ease-in-out`}
                style={{ 
                  transform, 
                  opacity, 
                  transitionDuration, 
                  zIndex 
                }}
              >
                {/* Header with Icon and Stat */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-3 rounded-full ${themeClasses.iconBg}`}>
                    {React.createElement(fact.icon, {
                      size: 32,
                      className: colorScheme.text
                    })}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-bold ${colorScheme.statBg} ${colorScheme.text}`}>
                    {fact.stat}
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-grow">
                  <h3 className={`text-xl md:text-2xl font-bold mb-4 ${themeClasses.textPrimary}`}>
                    {fact.title}
                  </h3>
                  <p className={`text-base md:text-lg leading-relaxed ${themeClasses.textSecondary}`}>
                    {fact.body}
                  </p>
                </div>

                {/* Category Badge */}
                <div className="mt-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${colorScheme.text} ${colorScheme.statBg}`}>
                    {fact.category === 'demographics' ? (
                      language === 'ar' ? 'السكان والديموغرافيا' : 
                      language === 'fr' ? 'Démographie' : 'Demographics'
                    ) : fact.category === 'budget' ? (
                      language === 'ar' ? 'الميزانية والمالية' : 
                      language === 'fr' ? 'Budget' : 'Budget'
                    ) : fact.category === 'services' ? (
                      language === 'ar' ? 'الخدمات الأساسية' : 
                      language === 'fr' ? 'Services' : 'Services'
                    ) : fact.category === 'governance' ? (
                      language === 'ar' ? 'الحكامة والمجلس' : 
                      language === 'fr' ? 'Gouvernance' : 'Governance'
                    ) : fact.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Progress Bar and Controls */}
        <div className="w-full max-w-2xl mt-8">
          <div className={`w-full h-2 rounded-full mb-6 ${themeClasses.iconBg}`}>
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            {activeIndex === content.facts.length ? (
              <button
                onClick={handleStartOver}
                className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold transition-all duration-300 ${themeClasses.buttonBg} ${themeClasses.textPrimary} border-2 ${themeClasses.borderColor} hover:scale-105`}
              >
                <RefreshCw size={20} />
                {content.startOver}
              </button>
            ) : (
              <>
                <button 
                  onClick={handlePrev} 
                  disabled={activeIndex === 0}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${themeClasses.buttonBg} ${themeClasses.textPrimary} border-2 ${themeClasses.borderColor} disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100`}
                >
                  <ArrowLeft size={20} className={language === 'ar' ? 'rotate-180' : ''} />
                  {content.prev}
                </button>
                <button 
                  onClick={handleNext} 
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${themeClasses.buttonBg} ${themeClasses.textPrimary} border-2 ${themeClasses.borderColor} hover:scale-105`}
                >
                  {content.next}
                  <ArrowRight size={20} className={language === 'ar' ? 'rotate-180' : ''} />
                </button>
              </>
            )}
          </div>
          
        </div>
      </div>
      
      
    </div>
  );
};

export default DidYouKnowPage;