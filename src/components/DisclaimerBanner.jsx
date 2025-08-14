import React, { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

const DisclaimerBanner = ({ language = 'en', theme = 'dark' }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Check localStorage when the component mounts
  useEffect(() => {
    const hasBeenDismissed = localStorage.getItem('ksarDataDisclaimerDismissed');
    if (!hasBeenDismissed) {
      setIsVisible(true);
    }
  }, []);

  const getTranslations = () => {
    switch (language) {
      case 'ar':
        return {
          title: 'ملاحظة حول دقة البيانات:',
          body: 'مشروع KSAR DATA هو مبادرة شخصية وتطوعية. بينما نسعى جاهدين لتحقيق أقصى درجات الدقة، قد تحدث أخطاء أثناء استخراج البيانات أو معالجتها. إذا لاحظت أي شيء يبدو غير صحيح، نرجو منك مساعدتنا على تحسين المشروع عبر التواصل معنا.',
        };
      case 'fr':
        return {
          title: 'Note sur la précision des données :',
          body: "KSAR DATA est une initiative personnelle et bénévole. Bien que nous visions la plus grande précision possible, des erreurs lors de l'extraction ou du traitement des données peuvent survenir. Si vous remarquez une anomalie, merci de nous aider à nous améliorer en nous contactant.",
        };
      default: // en
        return {
          title: 'Data Accuracy Note:',
          body: 'KSAR DATA is a personal, volunteer-driven initiative. While we strive for the utmost accuracy, errors from data extraction or processing are possible. If you notice anything that seems incorrect, please help us improve by contacting us.',
        };
    }
  };

  const t = getTranslations();

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('ksarDataDisclaimerDismissed', 'true');
  };

  const themeClasses = {
    bg: theme === 'dark' ? 'bg-yellow-900/50' : 'bg-yellow-100',
    borderColor: theme === 'dark' ? 'border-yellow-700/60' : 'border-yellow-300',
    textPrimary: theme === 'dark' ? 'text-yellow-200' : 'text-yellow-900',
    textSecondary: theme === 'dark' ? 'text-yellow-300' : 'text-yellow-800',
    iconColor: theme === 'dark' ? 'text-yellow-400' : 'text-yellow-500',
  };
  
  // Render nothing if it's not visible
  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`relative p-4 border-b ${themeClasses.bg} ${themeClasses.borderColor}`}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto flex items-start gap-4">
        <div className="flex-shrink-0">
          <AlertTriangle className={`w-5 h-5 mt-0.5 ${themeClasses.iconColor}`} aria-hidden="true" />
        </div>
        <div className={`flex-grow ${themeClasses.textSecondary} text-sm`}>
          <p>
            <strong className={themeClasses.textPrimary}>{t.title}</strong>{' '}
            {t.body}
          </p>
        </div>
        <div className="flex-shrink-0">
          <button
            onClick={handleDismiss}
            aria-label="Dismiss"
            className={`p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors ${language === 'ar' ? '-ml-2' : '-mr-2'}`}
          >
            <X className={`w-5 h-5 ${themeClasses.textPrimary}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerBanner;
