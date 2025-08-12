import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Typewriter } from 'react-simple-typewriter';
import { Search, Users, Eye, Info, ArrowDown, ArrowRight, TrendingUp, Wallet, Globe } from 'lucide-react';
import GlobeBackground from '../components/GlobeBackground';

// A custom hook for the count-up animation
const useCountUp = (end, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const endValue = parseInt(String(end).replace(/,/g, ''));
    if (start === endValue) return;

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current = Math.floor(progress * (endValue - start) + start);
      setCount(current.toLocaleString()); // Format with commas
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration]);

  return count;
};


const Home = ({ t, language, theme }) => {
  // Translations structured for the final layout
  const translations = {
    ar: {
      typewriter: ['مدينتك.', 'ميزانيتك.', 'بياناتك.'],
      welcome: 'بوابة بيانات القصر الكبير',
      subtitle: 'مبادرة محلية مفتوحة المصدر لجعل البيانات العامة سهلة الفهم، شفافة، ومتاحة للجميع لاستكشافها.',
      exploreCTA: 'اكتشف الأعمدة الأساسية',
      pillarsTitle: 'الأعمدة الأساسية للمنصة',
      motionTitle: 'البيانات في حركة',
      motionStats: {
        budget: 'إجمالي ميزانية 2024',
        population: 'تقدير السكان',
        datasets: 'مجموعات البيانات'
      },
      insightTitle: 'هل تعلم؟',
      insightStat: 'أكثر من 98% من الأسر في القصر الكبير متصلة بشبكة الكهرباء، مما يعكس بنية تحتية واسعة الانتشار.',
      features: [
        { icon: Search, title: 'مستكشف الميزانية', description: 'ابحث في البيانات المالية للمدينة.', link: '/search', color: 'blue' },
        { icon: Users, title: 'بيانات الإحصاء (RGPH)', description: 'استكشف الإحصاءات السكانية والسكنية.', link: '/rgph', color: 'teal' },
        { icon: Eye, title: 'تصورات ورؤى', description: 'حوّل الأرقام إلى رؤى واضحة.', link: '/insights', color: 'purple' },
        { icon: Info, title: 'عن المبادرة', description: 'تعرف على مهمتنا وكيفية المساهمة.', link: '/about', color: 'green' }
      ],
      footer: 'نسخة تجريبية – الإصدار 1.1.7 | جميع الحقوق محفوظة © 2025'
    },
    en: {
      typewriter: ['Your City.', 'Your Budget.', 'Your Data.'],
      welcome: 'The Ksar El Kebir Data Gateway',
      subtitle: 'A local, open-source initiative to make public data understandable, transparent, and explorable for everyone.',
      exploreCTA: 'Explore The Pillars',
      pillarsTitle: 'The Four Pillars of the Platform',
      motionTitle: 'Data in Motion',
      motionStats: {
        budget: 'Total 2024 Budget',
        population: 'Estimated Population',
        datasets: 'Datasets Available'
      },
      insightTitle: 'Did You Know?',
      insightStat: 'Over 98% of households in Ksar El Kebir are connected to the electricity grid, reflecting widespread infrastructure.',
      features: [
        { icon: Search, title: 'Budget Explorer', description: 'Investigate the city\'s financial data.', link: '/search', color: 'blue' },
        { icon: Users, title: 'Census (RGPH) Data', description: 'Explore population and housing statistics.', link: '/rgph', color: 'teal' },
        { icon: Eye, title: 'Visuals & Insights', description: 'Turn complex numbers into clear insights.', link: '/insights', color: 'purple' },
        { icon: Info, title: 'About The Initiative', description: 'Learn about our mission and how to contribute.', link: '/about', color: 'green' }
      ],
      footer: 'Beta Version – v1.1.7 | All Rights Reserved © 2025'
    },
    fr: {
      typewriter: ['Votre Ville.', 'Votre Budget.', 'Vos Données.'],
      welcome: 'Le Portail de Données de Ksar El Kebir',
      subtitle: 'Une initiative locale et open-source pour rendre les données publiques compréhensibles, transparentes et explorables par tous.',
      exploreCTA: 'Découvrez les Piliers',
      pillarsTitle: 'Les Quatre Piliers de la Plateforme',
      motionTitle: 'Données en Mouvement',
      motionStats: {
        budget: 'Budget Total 2024',
        population: 'Population Estimée',
        datasets: 'Ensembles de Données'
      },
      insightTitle: 'Le Saviez-Vous ?',
      insightStat: 'Plus de 98 % des ménages à Ksar El Kebir sont raccordés au réseau électrique, reflétant une infrastructure étendue.',
      features: [
        { icon: Search, title: 'Explorateur de Budget', description: 'Examinez les données financières de la ville.', link: '/search', color: 'blue' },
        { icon: Users, title: 'Données du Recensement', description: 'Explorez les statistiques démographiques.', link: '/rgph', color: 'teal' },
        { icon: Eye, title: 'Visuels & Aperçus', description: 'Traduisez les chiffres en informations claires.', link: '/insights', color: 'purple' },
        { icon: Info, title: 'À Propos de l\'Initiative', description: 'Découvrez notre mission et comment contribuer.', link: '/about', color: 'green' }
      ],
      footer: 'Version d’essai – v1.1.7 | Tous droits réservés © 2025'
    }
  };

  const content = translations[language] || translations.en;
  
  const themeClasses = {
    bg: theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50',
    cardBg: theme === 'dark' ? 'bg-gray-900' : 'bg-white',
    sectionBg: theme === 'dark' ? 'bg-black/20' : 'bg-gray-100',
    borderColor: theme === 'dark' ? 'border-gray-800' : 'border-gray-200',
    textPrimary: theme === 'dark' ? 'text-white' : 'text-gray-900',
    textSecondary: theme === 'dark' ? 'text-gray-400' : 'text-gray-600',
    gradientFrom: theme === 'dark' ? 'from-amber-600' : 'from-amber-600',
    gradientTo: theme === 'dark' ? 'to-amber-400' : 'to-amber-400',
    // Card-specific styles
    gradients: {
      blue: 'from-blue-500/10 to-transparent',
      teal: 'from-teal-500/10 to-transparent',
      purple: 'from-purple-500/10 to-transparent',
      green: 'from-green-500/10 to-transparent',
    },
    hovers: {
      blue: 'hover:border-blue-500',
      teal: 'hover:border-teal-500',
      purple: 'hover:border-purple-500',
      green: 'hover:border-green-500',
    },
    accents: {
      blue: theme === 'dark' ? 'text-blue-400' : 'text-blue-600',
      teal: theme === 'dark' ? 'text-teal-400' : 'text-teal-600',
      purple: theme === 'dark' ? 'text-purple-400' : 'text-purple-600',
      green: theme === 'dark' ? 'text-green-400' : 'text-green-600',
    }
  };

  const scrollToPillars = () => {
    document.getElementById('pillars').scrollIntoView({ behavior: 'smooth' });
  };
  
  // Animated values for the tickers
  const totalBudget = useCountUp(285500000);
  const population = useCountUp(126617);
  const datasets = useCountUp(42);

  return (
    <div 
      style={language === 'ar' ? { fontFamily: 'Noto Kufi Arabic, sans-serif' } : { fontFamily: 'Inter, sans-serif' }}
      className={`${themeClasses.bg}`}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* HERO SECTION - SPLIT SCREEN */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* Left Panel: Text Content */}
        <div className="relative flex flex-col justify-center items-center lg:items-start text-center lg:text-left p-8 md:p-16 order-2 lg:order-1">
          <GlobeBackground theme={theme} />
          <div className="relative z-10 w-full max-w-xl">
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 ${themeClasses.textPrimary}`}>
              {content.welcome}
              <span className={`block bg-gradient-to-r ${themeClasses.gradientFrom} ${themeClasses.gradientTo} bg-clip-text text-transparent`}>
                <Typewriter
                  words={content.typewriter}
                  loop={false}
                  cursor
                  cursorStyle='_'
                  typeSpeed={90}
                  deleteSpeed={60}
                  delaySpeed={2000}
                />
              </span>
            </h1>
            <p className={`text-lg md:text-xl leading-relaxed mb-8 ${themeClasses.textSecondary}`}>
              {content.subtitle}
            </p>
            <button
              onClick={scrollToPillars}
              className={`inline-flex items-center px-8 py-4 text-lg font-bold rounded-full transition-transform transform hover:scale-105 ${theme === 'dark' ? 'bg-gray-50 text-gray-900' : 'bg-gray-900 text-gray-50'}`}
            >
              {content.exploreCTA}
              <ArrowDown className={`w-5 h-5 ${language === 'ar' ? 'mr-3' : 'ml-3'}`} />
            </button>
          </div>
        </div>

        {/* Right Panel: Image (No background) */}
        <div className="relative flex items-center justify-center p-8 order-1 lg:order-2">
           <img 
              src={theme === 'dark'
                ? 'https://res.cloudinary.com/daeuundyc/image/upload/f_auto,q_auto/ksar-el-kebir-gate_lqfind.png'
                : 'https://res.cloudinary.com/daeuundyc/image/upload/f_auto,q_auto/ksar-el-kebir-gate_dark_ujloxv.png'
              }
              alt="Ksar El Kebir Gate"
              className="relative z-20 w-full max-w-2xl h-auto object-contain drop-shadow-2xl animate-float"
            />
        </div>
      </section>

      {/* PILLARS SECTION */}
      <section id="pillars" className={`py-20 md:py-28 ${themeClasses.sectionBg}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold ${themeClasses.textPrimary}`}>{content.pillarsTitle}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {content.features.map((feature) => (
              <Link to={feature.link} key={feature.title} className="group block">
                <div className={`relative h-full p-8 rounded-2xl border-2 ${themeClasses.cardBg} ${themeClasses.borderColor} ${themeClasses.hovers[feature.color]} bg-gradient-to-br ${themeClasses.gradients[feature.color]} transition-all duration-300 transform hover:scale-105`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="mb-4">
                        <feature.icon className={`w-10 h-10 ${themeClasses.accents[feature.color]}`} />
                      </div>
                      <h3 className={`text-2xl font-bold mb-2 ${themeClasses.textPrimary}`}>{feature.title}</h3>
                      <p className={`${themeClasses.textSecondary}`}>{feature.description}</p>
                    </div>
                    <ArrowRight className={`w-6 h-6 text-gray-500 transition-transform duration-300 group-hover:translate-x-1 ${language === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* DATA IN MOTION SECTION */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold ${themeClasses.textPrimary}`}>{content.motionTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Budget Ticker */}
            <div className={`p-6 rounded-lg border ${themeClasses.borderColor} ${themeClasses.cardBg}`}>
              <div className="flex items-center space-x-4">
                <Wallet className={`w-8 h-8 ${themeClasses.accents.blue}`} />
                <div>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>{content.motionStats.budget}</p>
                  <p className={`text-2xl font-bold ${themeClasses.textPrimary}`}>{totalBudget} <span className="text-base font-medium">MAD</span></p>
                </div>
              </div>
            </div>
            {/* Population Ticker */}
            <div className={`p-6 rounded-lg border ${themeClasses.borderColor} ${themeClasses.cardBg}`}>
              <div className="flex items-center space-x-4">
                <Globe className={`w-8 h-8 ${themeClasses.accents.teal}`} />
                <div>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>{content.motionStats.population}</p>
                  <p className={`text-2xl font-bold ${themeClasses.textPrimary}`}>{population}</p>
                </div>
              </div>
            </div>
            {/* Datasets Ticker */}
            <div className={`p-6 rounded-lg border ${themeClasses.borderColor} ${themeClasses.cardBg}`}>
              <div className="flex items-center space-x-4">
                <TrendingUp className={`w-8 h-8 ${themeClasses.accents.purple}`} />
                <div>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>{content.motionStats.datasets}</p>
                  <p className={`text-2xl font-bold ${themeClasses.textPrimary}`}>{datasets}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* QUICK INSIGHT SECTION */}
      <section className="pb-20 md:pb-28">
        <div className="container mx-auto px-6">
          <div className={`relative max-w-4xl mx-auto p-8 md:p-12 rounded-2xl border ${themeClasses.borderColor} overflow-hidden`}>
            <div className={`absolute -inset-2 bg-gradient-to-br from-purple-600/10 to-transparent blur-xl`}></div>
            <div className="relative text-center">
              <h3 className={`text-sm font-bold uppercase tracking-widest mb-4 ${themeClasses.textSecondary}`}>
                {content.insightTitle}
              </h3>
              <p className={`text-2xl md:text-3xl font-medium ${themeClasses.textPrimary}`}>
                "{content.insightStat}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`py-8 border-t`} style={{borderColor: themeClasses.borderColor}}>
        <div className="container mx-auto px-6 text-center">
          <div className={`inline-flex items-center px-4 py-2 rounded-full border text-sm ${themeClasses.borderColor} ${themeClasses.textSecondary} ${themeClasses.cardBg}`}>

            <span>{content.footer}</span>
          </div>
        </div>
      </footer>
      
      {/* Adding a keyframe animation for the floating effect */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;