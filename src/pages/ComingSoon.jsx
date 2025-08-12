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

  // Theme classes for consistency with Home.jsx
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
    { 
      label: language === 'ar' ? 'يوم' : language === 'fr' ? 'Jours' : 'Days', 
      value: timeLeft.days 
    },
    { 
      label: language === 'ar' ? 'ساعة' : language === 'fr' ? 'Heures' : 'Hours', 
      value: timeLeft.hours 
    },
    { 
      label: language === 'ar' ? 'دقيقة' : language === 'fr' ? 'Minutes' : 'Minutes', 
      value: timeLeft.minutes 
    },
    { 
      label: language === 'ar' ? 'ثانية' : language === 'fr' ? 'Secondes' : 'Seconds', 
      value: timeLeft.seconds 
    }
  ];

  return (
    <div 
      style={language === 'ar' ? 
        { fontFamily: 'Noto Kufi Arabic, sans-serif' } : 
        { fontFamily: 'Inter, sans-serif', direction:'ltr' }
      }  
      className={`min-h-screen relative overflow-hidden ${themeClasses.bg}`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${theme === 'dark' ? 'from-gray-900 via-gray-950 to-black' : 'from-gray-50 via-white to-gray-100'}`}></div>
        
        {/* Animated dots pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400 rounded-full animate-ping delay-0"></div>
          <div className="absolute bottom-32 right-32 w-2 h-2 bg-blue-400 rounded-full animate-ping delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-2000"></div>
          <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-indigo-400 rounded-full animate-ping delay-3000"></div>
          <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-teal-400 rounded-full animate-pulse delay-4000"></div>
          <div className="absolute top-3/4 right-1/3 w-2 h-2 bg-pink-400 rounded-full animate-ping delay-5000"></div>
        </div>

        {/* Floating particles */}
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

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center space-y-12">
            
            {/* Logo Section */}
            <div className="space-y-8 mt-5">
              {/* Logo placeholder - replace with your actual logo */}
              <div className="flex justify-center">
                <div className="relative">
                  {/* Glow effect behind logo */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${themeClasses.gradientFrom} ${themeClasses.gradientTo} blur-2xl opacity-20 transform scale-110`}></div>
                  
                  {/* Logo container */}
                  <div className={`relative w-32 h-32 md:w-48 md:h-48 rounded-full ${themeClasses.cardBg} border-2 ${themeClasses.borderColor} flex items-center justify-center shadow-2xl`}>
                    {/* Replace this with your actual logo */}
                    <img 
            src={`${theme === 'dark' ? '/logo_on_dark.png' : '/Logo_on_white.png'}`} 
            alt="Ksar El Kebir Gate"
            className="w-25 md:w-40 justify-self-center mb-5 max-w-2xl h-auto object-contain drop-shadow-2xl"
          />
                  </div>
                </div>
              </div>

              {/* Brand name */}
              <div className="space-y-2">
                <h1 
                  style={language === 'ar' ? arabicStyle : undefined}
                  className={`text-4xl md:text-6xl lg:text-7xl font-bold ${themeClasses.textPrimary}`}
                >
                  KSAR-DATA
                </h1>
                <div className="flex items-center justify-center space-x-2">
                  <Sparkles className={`w-5 h-5 ${themeClasses.textAccent}`} />
                  <span className={`text-lg md:text-xl ${themeClasses.textSecondary}`}>
                    {language === 'ar' ? 'قريباً' : language === 'fr' ? 'Bientôt disponible' : 'Coming Soon'}
                  </span>
                  <Sparkles className={`w-5 h-5 ${themeClasses.textAccent}`} />
                </div>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="space-y-8">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <Clock className={`w-6 h-6 ${themeClasses.textAccent}`} />
                <h2 
                  style={language === 'ar' ? arabicStyle : undefined}
                  className={`text-2xl md:text-3xl font-semibold ${themeClasses.textPrimary}`}
                >
                  {language === 'ar' ? 'العد التنازلي للإطلاق' : 
                   language === 'fr' ? 'Compte à rebours pour le lancement' : 
                   'Launch Countdown'}
                </h2>
              </div>

              {/* Timer Cards */}
              <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto ${language === 'ar' ? 'rtl' : 'ltr'}`}>
                {timeUnits.map((unit, index) => (
                  <div 
                    key={unit.label}
                    className={`${themeClasses.cardBg} border-2 ${themeClasses.borderColor} rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="space-y-3">
                      <div 
                        className={`text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r ${theme === 'dark' ? 'from-amber-600 via-amber-300 to-amber-600' : 'from-amber-600 via-amber-400 to-amber-600'} bg-clip-text text-transparent`}
                      >
                        {unit.value.toString().padStart(2, '0')}
                      </div>
                      <div 
                        style={language === 'ar' ? arabicStyle : undefined}
                        className={`text-sm md:text-base font-medium ${themeClasses.textSecondary} uppercase tracking-wider`}
                      >
                        {unit.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Launch Date */}
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <Calendar className={`w-5 h-5 ${themeClasses.textAccent}`} />
                <span 
                  style={language === 'ar' ? arabicStyle : undefined}
                  className={`text-lg md:text-xl font-medium ${themeClasses.textSecondary}`}
                >
                  {language === 'ar' ? 'تاريخ الإطلاق ' : 
                   language === 'fr' ? 'Date de lancement ' : 
                   'Expected Launch Date'}
                </span>
              </div>
              <div 
                style={language === 'ar' ? arabicStyle : undefined}
                className={`text-2xl md:text-3xl font-bold ${themeClasses.textPrimary}`}
              >
                {language === 'ar' ? '20 غشت 2025' : 
                 language === 'fr' ? '20 Août 2025' : 
                 'August 20, 2025'}
              </div>
            </div>

            {/* Description */}
            <div className="max-w-2xl mx-auto">
              <p 
                style={language === 'ar' ? arabicStyle : undefined}
                className={`text-base md:text-lg leading-relaxed ${themeClasses.textSecondary}`}
              >
                {language === 'ar' ? 
                  'نحن نعمل بجد لتقديم منصة مبتكرة لاستكشاف البيانات العامة لمدينة القصر الكبير. ترقبوا تجربة تفاعلية مذهلة!' :
                 language === 'fr' ? 
                  'Nous travaillons dur pour vous offrir une plateforme innovante d\'exploration des données publiques de Ksar El Kebir. Restez à l\'écoute pour une expérience interactive incroyable !' :
                  'We\'re working hard to bring you an innovative platform for exploring public data from Ksar El Kebir. Stay tuned for an amazing interactive experience!'}
              </p>
            </div>

            {/* Status Badge */}
            <div className="flex justify-center">
              <div className={`inline-flex items-center px-6 py-3 rounded-full border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}>
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse mr-3"></div>
                <span className={themeClasses.textSecondary}>
                  {language === 'ar' ? 'قيد التطوير – الإصدار الرسمي قريباً' : 
                   language === 'fr' ? 'En développement – Version bêta bientôt' : 
                   'Under Development – Beta Version Soon'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for floating animation */}
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
      `}</style>
    </div>
  );
};

export default ComingSoon;