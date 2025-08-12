import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Sparkles } from 'lucide-react';

const ComingSoon = ({ t, language, theme }) => {
  // Target date - change this date as needed
  const targetDate = new Date('2025-08-20T00:00:00').getTime();
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const arabicStyle = {
    fontFamily: 'Noto Kufi Arabic, sans-serif',
    direction: 'rtl',
  };

  // Theme classes for consistency (retained from original)
  const themeClasses = {
    bg: theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50',
    cardBg: theme === 'dark' ? 'bg-gray-900' : 'bg-white',
    borderColor: theme === 'dark' ? 'border-gray-800' : 'border-gray-200',
    textPrimary: theme === 'dark' ? 'text-white' : 'text-gray-900',
    textSecondary: theme === 'dark' ? 'text-gray-400' : 'text-gray-600',
    textAccent: theme === 'dark' ? 'text-blue-400' : 'text-blue-600',
    gradientFrom: theme === 'dark' ? 'from-blue-600' : 'from-blue-500',
    gradientTo: theme === 'dark' ? 'to-purple-600' : 'to-purple-500'
  };

  const timeUnits = [
    { label: language === 'ar' ? 'يوم' : language === 'fr' ? 'Jours' : 'Days', value: timeLeft.days },
    { label: language === 'ar' ? 'ساعة' : language === 'fr' ? 'Heures' : 'Hours', value: timeLeft.hours },
    { label: language === 'ar' ? 'دقيقة' : language === 'fr' ? 'Minutes' : 'Minutes', value: timeLeft.minutes },
    { label: language === 'ar' ? 'ثانية' : language === 'fr' ? 'Secondes' : 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <div 
      style={language === 'ar' ? 
        { fontFamily: 'Noto Kufi Arabic, sans-serif', direction:"ltr"} : 
        { fontFamily: 'Inter, sans-serif', direction:'ltr' }
      }  
      className={`min-h-screen relative overflow-hidden ${themeClasses.bg}`}
    >
      {/* Animated Background Elements (retained from original) */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${theme === 'dark' ? 'from-gray-900 via-gray-950 to-black' : 'from-gray-50 via-white to-gray-100'}`}></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400 rounded-full animate-ping delay-0"></div>
          <div className="absolute bottom-32 right-32 w-2 h-2 bg-blue-400 rounded-full animate-ping delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-2000"></div>
        </div>
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${theme === 'dark' ? 'bg-blue-400' : 'bg-blue-500'} opacity-20`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content - New Split-Screen Layout */}
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">
        
        {/* Left Section: Brand & Info */}
        <div className={`w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 ${language === 'ar' ? 'lg:border-l' : 'lg:border-r'} ${themeClasses.borderColor}`}>
          <div 
            className={`max-w-md text-center lg:text-left ${language === 'ar' ? 'lg:text-right' : ''}`}
            style={language === 'ar' ? { direction: 'rtl' } : { direction: 'ltr' }}
          >
            {/* Logo */}
            <div className="flex justify-center lg:justify-start mb-8">
              <div className={`relative w-28 h-28 rounded-full ${themeClasses.cardBg} border-2 ${themeClasses.borderColor} flex items-center justify-center shadow-2xl`}>
                <img 
                  src={`${theme === 'dark' ? '/logo_on_dark.png' : '/Logo_on_white.png'}`} 
                  alt="Ksar El Kebir Gate"
                  className="w-20 h-auto object-contain"
                />
              </div>
            </div>

            {/* Brand Name & Subtitle */}
            <h1 className={`text-5xl md:text-6xl font-bold ${themeClasses.textPrimary}`}>
              KSAR-DATA
            </h1>
            <div className="flex items-center justify-center lg:justify-start space-x-2 mt-3">
              <Sparkles className={`w-5 h-5 ${themeClasses.textAccent}`} />
              <span className={`text-lg md:text-xl ${themeClasses.textSecondary}`}>
                {language === 'ar' ? 'قريباً' : language === 'fr' ? 'Bientôt disponible' : 'Coming Soon'}
              </span>
              <Sparkles className={`w-5 h-5 ${themeClasses.textAccent}`} />
            </div>

            {/* Description */}
            <p className={`mt-8 text-lg leading-relaxed ${themeClasses.textSecondary}`}>
              {language === 'ar' ? 
                'نحن نعمل بجد لتقديم منصة مبتكرة لاستكشاف البيانات العامة لمدينة القصر الكبير. ترقبوا تجربة تفاعلية مذهلة!' :
               language === 'fr' ? 
                'Nous travaillons dur pour vous offrir une plateforme innovante d\'exploration des données publiques de Ksar El Kebir. Restez à l\'écoute pour une expérience interactive incroyable !' :
                'We\'re working hard to bring you an innovative platform for exploring public data from Ksar El Kebir. Stay tuned for an amazing interactive experience!'}
            </p>

            {/* Status Badge */}
            <div className="mt-10 flex justify-center lg:justify-start">
              <div className={`inline-flex items-center px-6 py-3 rounded-full border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}>
                
                <span className={themeClasses.textSecondary}>
                  {language === 'ar' ? ' الإصدار الرسمي قريباً' : language === 'fr' ? 'En développement' : 'Under Development'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Countdown */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
           <div 
             className="max-w-2xl w-full"
             style={language === 'ar' ? { direction: 'ltr' } : { direction: 'ltr' }}
           >
            {/* Countdown Header */}
            <div className="flex items-center justify-center space-x-3 mb-8">
              <Clock className={`w-7 h-7 ${themeClasses.textAccent}`} />
              <h2 className={`text-2xl md:text-3xl font-semibold ${themeClasses.textPrimary}`}>
                {language === 'ar' ? 'العد التنازلي للإطلاق' : language === 'fr' ? 'Compte à rebours' : 'Launch Countdown'}
              </h2>
            </div>

            {/* Timer Cards */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-4`}>
              {timeUnits.map((unit, index) => (
                <div 
                  key={unit.label}
                  className={`${themeClasses.cardBg} border ${themeClasses.borderColor} rounded-2xl p-4 text-center shadow-lg transition-transform duration-300 hover:scale-105`}
                >
                  <div className={`text-4xl lg:text-5xl font-bold bg-gradient-to-r ${theme === 'dark' ? 'from-amber-600 via-amber-300 to-amber-600' : 'from-amber-600 via-amber-400 to-amber-600'} bg-clip-text text-transparent`}>
                    {unit.value.toString().padStart(2, '0')}
                  </div>
                  <div className={`mt-2 text-xs font-medium ${themeClasses.textSecondary} uppercase tracking-wider`}>
                    {unit.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Launch Date */}
            <div className="mt-12 text-center">
               <div className="flex items-center justify-center space-x-3">
                 <Calendar className={`w-5 h-5 ${themeClasses.textAccent}`} />
                 <span className={`text-lg font-medium ${themeClasses.textSecondary}`}>
                   {language === 'ar' ? 'تاريخ الإطلاق المتوقع' : language === 'fr' ? 'Date de lancement' : 'Expected Launch Date'}
                 </span>
               </div>
               <div className={`mt-3 text-2xl md:text-3xl font-bold ${themeClasses.textPrimary}`}>
                 {language === 'ar' ? '20/08/2025' : language === 'fr' ? '20 Août 2025' : 'August 20, 2025'}
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for floating animation (retained from original) */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.8;
          }
        }
        .rtl {
            direction: rtl;
        }
        .ltr {
            direction: ltr;
        }
      `}</style>
    </div>
  );
};

export default ComingSoon;