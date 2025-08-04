// src/components/QuestionCard.jsx

import React from 'react';

const QuestionCard = ({ 
  question, 
  isSelected, 
  onClick, 
  theme = 'dark',
  language = 'fr'
}) => {
  const getQuestionText = () => {
    if (typeof question === 'string') return question;
    return question[language] || question.fr || question.en;
  };

  return (
    <div
      onClick={onClick}
      className={`
        flex-shrink-0 w-64 h-20 p-4 rounded-lg border cursor-pointer transition-all duration-200 shadow-cyan-500/10 shadow-lg
        ${isSelected 
          ? (theme === 'dark' 
              ? 'bg-blue-600 border-blue-500 text-white' 
              : 'bg-blue-100 border-blue-300 text-blue-900')
          : (theme === 'dark'
              ? 'bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700 hover:border-gray-600'
              : 'bg-white border-gray-200 text-gray-800 hover:bg-gray-50 hover:border-gray-300')
        }
        ${language === 'ar' ? 'text-right' : 'text-left'}
      `}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="flex items-center justify-center h-full">
        <p className="text-center leading-tight">
          {getQuestionText()}
        </p>
      </div>
    </div>
  );
};

export default QuestionCard;