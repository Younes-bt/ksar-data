import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Typewriter } from 'react-simple-typewriter';
import { HeartHandshake, Search, Users, Eye, Info, ArrowDown, ArrowRight, TrendingUp, Wallet, Globe, BarChart3, FileText, Calendar, Phone, Download, Brain, Gavel } from 'lucide-react';
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
  // Translations structured for the new layout
  const translations = {
    ar: {
      typewriter: ['مدينتك.', 'ميزانيتك.', 'بياناتك.'],
      welcome: 'بوابة بيانات القصر الكبير',
      subtitle: 'مبادرة محلية مفتوحة المصدر لجعل البيانات العامة سهلة الفهم، شفافة، ومتاحة للجميع لاستكشافها.',
      exploreCTA: 'اكتشف الخدمات',
      servicesTitle: 'بيانات حول المجلس',
      dataTitle: 'بيانات عامة',
      informationTitle: 'المعلومات و البيانات',
      aboutTitle: 'حول المبادرة',
      motionTitle: 'لمحة حول البيانا ',
      motionStats: {
        budget: 'إجمالي ميزانية 2025',
        population: 'تقدير عدد السكان (2024)',
        datasets: 'مجموعات البيانات'
      },
      insightTitle: 'هل تعلم؟',
      insightStat: 'هل تعلم أن المدينة تدفع أكثر من 6,000 درهم يومياً فقط كفوائد على ديونها؟ هذا يعني أكثر من 2 مليون درهم سنوياً.',
      services: [
        { icon: Search, title: 'الميزانية', description: 'ابحث في البيانات المالية للمدينة.', link: '/search', color: 'blue' },
        { icon: Gavel, title: 'القرارات', description: 'تتبع قرارات المجلس الجماعي.', link: '/decisions', color: 'amber' },
        { icon: Calendar, title: 'الحضور', description: 'مراقبة حضور أعضاء المجلس.', link: '/attendance', color: 'green' },
        { icon: HeartHandshake, title: 'الدعم', description: 'عرض تفاصيل الدعم المقدم للجمعيات.', link: '/support', color: 'red' }
      ],
      dataGroups: [
        { icon: Users, title: 'بيانات الإحصاء (RGPH)', description: 'استكشف الإحصاءات السكانية والسكنية.', link: '/rgph', color: 'teal' },
        { icon: BarChart3, title: 'النادي الرياضي القصري', description: 'تحليل أداء نقاط النادي الرياضي القصري.', link: '/scores', color: 'indigo' },
        { icon: FileText, title: 'أسعار الأدوية', description: 'قاعدة بيانات أسعار الأدوية.', link: '/medicines', color: 'pink' }
      ],
      informationGroups: [
        { icon: Eye, title: 'تصورات ورؤى', description: 'حوِّل الأرقام إلى رؤى واضحة.', link: '/insights', color: 'purple' },
        { icon: Brain, title: 'حقائق ومعلومات', description: 'اكتشف حقائق مثيرة عن مدينتك.', link: '/facts', color: 'orange' }
      ],
      aboutGroups: [
        { icon: Download, title: 'التحميلات', description: 'حمل البيانات والتقارير.', link: '/download', color: 'cyan' },
        { icon: Info, title: 'عن المبادرة', description: 'تعرف على مهمتنا وكيفية المساهمة.', link: '/about', color: 'emerald' },
        { icon: Phone, title: 'اتصل بنا', description: 'تواصل معنا للاستفسارات.', link: '/contactUs', color: 'violet' }
      ],
      footer: 'نسخة تجريبية – الإصدار 1.1.7 | جميع الحقوق محفوظة © 2025'
    },
    en: {
      typewriter: ['Your City.', 'Your Budget.', 'Your Data.'],
      welcome: 'The Ksar El Kebir Data Gateway',
      subtitle: 'A local, open-source initiative to make public data understandable, transparent, and explorable for everyone.',
      exploreCTA: 'Explore Services',
      servicesTitle: 'Council Data',
      dataTitle: 'Public Data',
      informationTitle: 'Information & Data',
      aboutTitle: 'About The Initiative',
      motionTitle: 'Data in Motion',
      motionStats: {
        budget: 'Total 2025 Budget',
        population: 'Estimated Population 2024',
        datasets: 'Datasets Available'
      },
      insightTitle: 'Did You Know?',
      insightStat: 'Did you know the city pays more than 6,000 dirhams daily just in interest on its debts? That\'s over 2 million dirhams annually.',
      services: [
        { icon: Search, title: 'Budget Explorer', description: 'Investigate the city\'s financial data.', link: '/search', color: 'blue' },
        { icon: Gavel, title: 'Decisions', description: 'Track municipal council decisions.', link: '/decisions', color: 'amber' },
        { icon: Calendar, title: 'Attendance', description: 'Monitor council member attendance.', link: '/attendance', color: 'green' },
        { icon: HeartHandshake, title: 'Support', description: 'View details on support provided to associations.', link: '/support', color: 'red' }
      ],
      dataGroups: [
        { icon: Users, title: 'Census (RGPH) Data', description: 'Explore population and housing statistics.', link: '/rgph', color: 'teal' },
        { icon: BarChart3, title: 'CSK Scores', description: 'Analyze CSK point.', link: '/scores', color: 'indigo' },
        { icon: FileText, title: 'Medicine Prices', description: 'Database of pharmaceutical prices.', link: '/medicines', color: 'pink' }
      ],
      informationGroups: [
        { icon: Eye, title: 'Visuals & Insights', description: 'Turn complex numbers into clear insights.', link: '/insights', color: 'purple' },
        { icon: Brain, title: 'Facts & Information', description: 'Discover interesting facts about your city.', link: '/facts', color: 'orange' }
      ],
      aboutGroups: [
        { icon: Download, title: 'Downloads', description: 'Download data and reports.', link: '/download', color: 'cyan' },
        { icon: Info, title: 'About Initiative', description: 'Learn about our mission and how to contribute.', link: '/about', color: 'emerald' },
        { icon: Phone, title: 'Contact Us', description: 'Get in touch for inquiries.', link: '/contactUs', color: 'violet' }
      ],
      footer: 'Beta Version – v1.1.7 | All Rights Reserved © 2025'
    },
    fr: {
      typewriter: ['Votre Ville.', 'Votre Budget.', 'Vos Données.'],
      welcome: 'Le Portail de Données de Ksar El Kebir',
      subtitle: 'Une initiative locale et open-source pour rendre les données publiques compréhensibles, transparentes et explorables par tous.',
      exploreCTA: 'Découvrez les Services',
      servicesTitle: 'Données sur le Conseil',
      dataTitle: 'Données Publiques',
      informationTitle: 'Informations et Données',
      aboutTitle: 'À Propos de l\'Initiative',
      motionTitle: 'Données en Mouvement',
      motionStats: {
        budget: 'Budget Total 2025',
        population: 'Population Estimée 2024',
        datasets: 'Ensembles de Données'
      },
      insightTitle: 'Le Saviez-Vous ?',
      insightStat: 'Saviez-vous que la ville paie plus de 6 000 dirhams par jour uniquement en intérêts sur ses dettes ? Cela représente plus de 2 millions de dirhams annuellement.',
      services: [
        { icon: Search, title: 'Explorateur de Budget', description: 'Examinez les données financières de la ville.', link: '/search', color: 'blue' },
        { icon: Gavel, title: 'Décisions', description: 'Suivez les décisions du conseil municipal.', link: '/decisions', color: 'amber' },
        { icon: Calendar, title: 'Présence', description: 'Surveillez la présence des conseillers.', link: '/attendance', color: 'green' },
        { icon: HeartHandshake, title: 'Support', description: 'Consultez les détails du soutien aux associations.', link: '/support', color: 'red' }
      ],
      dataGroups: [
        { icon: Users, title: 'Données du Recensement', description: 'Explorez les statistiques démographiques.', link: '/rgph', color: 'teal' },
        { icon: BarChart3, title: 'Scores CSK', description: 'Analysez les performances des points de CSK.', link: '/scores', color: 'indigo' },
        { icon: FileText, title: 'Prix des Médicaments', description: 'Base de données des prix pharmaceutiques.', link: '/medicines', color: 'pink' }
      ],
      informationGroups: [
        { icon: Eye, title: 'Visuels & Aperçus', description: 'Traduisez les chiffres en informations claires.', link: '/insights', color: 'purple' },
        { icon: Brain, title: 'Faits & Informations', description: 'Découvrez des faits intéressants sur votre ville.', link: '/facts', color: 'orange' }
      ],
      aboutGroups: [
        { icon: Download, title: 'Téléchargements', description: 'Téléchargez des données et rapports.', link: '/download', color: 'cyan' },
        { icon: Info, title: 'À Propos', description: 'Découvrez notre mission et comment contribuer.', link: '/about', color: 'emerald' },
        { icon: Phone, title: 'Contactez-nous', description: 'Contactez-nous pour vos questions.', link: '/contactUs', color: 'violet' }
      ],
      footer: 'Version d\'essai – v1.1.7 | Tous droits réservés © 2025'
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
    // Card-specific styles with extended color palette
    gradients: {
      blue: 'from-blue-500/10 to-transparent',
      teal: 'from-teal-500/10 to-transparent',
      purple: 'from-purple-500/10 to-transparent',
      green: 'from-green-500/10 to-transparent',
      amber: 'from-amber-500/10 to-transparent',
      red: 'from-red-500/10 to-transparent',
      indigo: 'from-indigo-500/10 to-transparent',
      pink: 'from-pink-500/10 to-transparent',
      orange: 'from-orange-500/10 to-transparent',
      cyan: 'from-cyan-500/10 to-transparent',
      emerald: 'from-emerald-500/10 to-transparent',
      violet: 'from-violet-500/10 to-transparent'
    },
    hovers: {
      blue: 'hover:border-blue-500',
      teal: 'hover:border-teal-500',
      purple: 'hover:border-purple-500',
      green: 'hover:border-green-500',
      amber: 'hover:border-amber-500',
      red: 'hover:border-red-500',
      indigo: 'hover:border-indigo-500',
      pink: 'hover:border-pink-500',
      orange: 'hover:border-orange-500',
      cyan: 'hover:border-cyan-500',
      emerald: 'hover:border-emerald-500',
      violet: 'hover:border-violet-500'
    },
    accents: {
      blue: theme === 'dark' ? 'text-blue-400' : 'text-blue-600',
      teal: theme === 'dark' ? 'text-teal-400' : 'text-teal-600',
      purple: theme === 'dark' ? 'text-purple-400' : 'text-purple-600',
      green: theme === 'dark' ? 'text-green-400' : 'text-green-600',
      amber: theme === 'dark' ? 'text-amber-400' : 'text-amber-600',
      red: theme === 'dark' ? 'text-red-400' : 'text-red-600',
      indigo: theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600',
      pink: theme === 'dark' ? 'text-pink-400' : 'text-pink-600',
      orange: theme === 'dark' ? 'text-orange-400' : 'text-orange-600',
      cyan: theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600',
      emerald: theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600',
      violet: theme === 'dark' ? 'text-violet-400' : 'text-violet-600'
    }
  };

  const scrollToServices = () => {
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
  };
  
  // Animated values for the tickers
  const totalBudget = useCountUp(119498800);
  const population = useCountUp(124655);
  const datasets = useCountUp(9);

  // Card component for reusability
  const ServiceCard = ({ item, size = 'normal' }) => (
    <Link to={item.link} className="group block h-full">
      <div className={`relative h-full ${size === 'large' ? 'p-8' : 'p-6'} rounded-2xl border-2 ${themeClasses.cardBg} ${themeClasses.borderColor} ${themeClasses.hovers[item.color]} bg-gradient-to-br ${themeClasses.gradients[item.color]} transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}>
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="mb-4">
              <item.icon className={`${size === 'large' ? 'w-12 h-12' : 'w-8 h-8'} ${themeClasses.accents[item.color]}`} />
            </div>
            <h3 className={`${size === 'large' ? 'text-2xl' : 'text-xl'} font-bold mb-2 ${themeClasses.textPrimary}`}>{item.title}</h3>
            <p className={`${themeClasses.textSecondary} ${size === 'large' ? 'text-base' : 'text-sm'}`}>{item.description}</p>
          </div>
          <ArrowRight className={`w-5 h-5 text-gray-500 transition-transform duration-300 group-hover:translate-x-1 mt-4 self-end ${language === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
        </div>
      </div>
    </Link>
  );

  return (
    <div 
      style={language === 'ar' ? { fontFamily: 'Noto Kufi Arabic, sans-serif' } : { fontFamily: 'Inter, sans-serif' }}
      className={`${themeClasses.bg}`}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* HERO SECTION - MODERN SPLIT LAYOUT */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* Left Panel: Text Content */}
        <div className="relative flex flex-col justify-center items-center lg:items-start text-center lg:text-center px-8 md:p-16 order-1 lg:order-1">
          <GlobeBackground theme={theme} />
          <div className="relative z-10 w-full max-w-xl">
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 leading-18 ${themeClasses.textPrimary}`}>
              {content.welcome}
              <span className={`block my-3 bg-gradient-to-r ${themeClasses.gradientFrom} ${themeClasses.gradientTo} bg-clip-text text-transparent`}>
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
              onClick={scrollToServices}
              className={`inline-flex items-center  px-8 py-4 text-sm md:text-lg font-bold rounded-full transition-transform transform hover:scale-105 ${theme === 'dark' ? 'bg-gray-50 text-gray-900' : 'bg-gray-900 text-gray-50'}`}
            >
              {content.exploreCTA}
              <ArrowDown className={`w-5 h-5 ${language === 'ar' ? 'mr-3' : 'ml-3'}`} />
            </button>
          </div>
        </div>

        {/* Right Panel: Image */}
        <div className="relative flex items-center justify-center order-1 lg:order-2">
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

      {/* DATA IN MOTION SECTION - MOVED UP */}
      <section className="py-0">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold ${themeClasses.textPrimary}`}>{content.motionTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Budget Ticker */}
            <div className={`p-8 rounded-2xl border-2 ${themeClasses.borderColor} ${themeClasses.cardBg} bg-gradient-to-br from-blue-500/5 to-transparent transition-all duration-300 hover:shadow-lg hover:border-blue-500`}>
              <div className="flex items-center space-x-4">
                <Wallet className={`w-10 h-10 ${themeClasses.accents.blue}`} />
                <div>
                  <p className={`text-sm font-medium ${themeClasses.textSecondary}`}>{content.motionStats.budget}</p>
                  <p className={`text-3xl font-bold ${themeClasses.textPrimary}`}>{totalBudget} <span className="text-lg font-medium">MAD</span></p>
                </div>
              </div>
            </div>
            {/* Population Ticker */}
            <div className={`p-8 rounded-2xl border-2 ${themeClasses.borderColor} ${themeClasses.cardBg} bg-gradient-to-br from-teal-500/5 to-transparent transition-all duration-300 hover:shadow-lg hover:border-teal-500`}>
              <div className="flex items-center space-x-4">
                <Globe className={`w-10 h-10 ${themeClasses.accents.teal}`} />
                <div>
                  <p className={`text-sm font-medium ${themeClasses.textSecondary}`}>{content.motionStats.population}</p>
                  <p className={`text-3xl font-bold ${themeClasses.textPrimary}`}>{population}</p>
                </div>
              </div>
            </div>
            {/* Datasets Ticker */}
            <div className={`p-8 rounded-2xl border-2 ${themeClasses.borderColor} ${themeClasses.cardBg} bg-gradient-to-br from-purple-500/5 to-transparent transition-all duration-300 hover:shadow-lg hover:border-purple-500`}>
              <div className="flex items-center space-x-4">
                <TrendingUp className={`w-10 h-10 ${themeClasses.accents.purple}`} />
                <div>
                  <p className={`text-sm font-medium ${themeClasses.textSecondary}`}>{content.motionStats.datasets}</p>
                  <p className={`text-3xl font-bold ${themeClasses.textPrimary}`}>{datasets}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION - ORGANIZED BY NAVBAR STRUCTURE */}
      <section id="services" className={`py-20 md:py-28 ${themeClasses.sectionBg}`}>
        <div className="container mx-auto px-6">
          
          {/* Digital Services */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className={`text-3xl md:text-4xl font-bold ${themeClasses.textPrimary}`}>{content.servicesTitle}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {content.services.map((service) => (
                <ServiceCard key={service.title} item={service} />
              ))}
            </div>
          </div>

          {/* Data Sources */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className={`text-3xl md:text-4xl font-bold ${themeClasses.textPrimary}`}>{content.dataTitle}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {content.dataGroups.map((data) => (
                <ServiceCard key={data.title} item={data} size="large" />
              ))}
            </div>
          </div>

          {/* Information & Insights */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className={`text-3xl md:text-4xl font-bold ${themeClasses.textPrimary}`}>{content.informationTitle}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {content.informationGroups.map((info) => (
                <ServiceCard key={info.title} item={info} size="large" />
              ))}
            </div>
          </div>

          {/* About Section */}
          <div>
            <div className="text-center mb-12">
              <h2 className={`text-3xl md:text-4xl font-bold ${themeClasses.textPrimary}`}>{content.aboutTitle}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {content.aboutGroups.map((about) => (
                <ServiceCard key={about.title} item={about} />
              ))}
            </div>
          </div>

        </div>
      </section>
      
      {/* QUICK INSIGHT SECTION */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className={`relative max-w-5xl mx-auto p-8 md:p-16 rounded-3xl border-2 ${themeClasses.borderColor} ${themeClasses.cardBg} overflow-hidden`}>
            <div className={`absolute -inset-2 bg-gradient-to-br from-purple-600/10 to-amber-600/10 blur-xl`}></div>
            <div className="relative text-center">
              <h3 className={`text-sm font-bold uppercase tracking-widest mb-6 ${themeClasses.textSecondary}`}>
                {content.insightTitle}
              </h3>
              <p className={`text-2xl md:text-4xl font-medium leading-relaxed ${themeClasses.textPrimary}`}>
                "{content.insightStat}"
              </p>
            </div>
          </div>
        </div>
      </section>

      
      
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