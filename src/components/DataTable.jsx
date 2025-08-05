// src/components/DataTable.jsx

import React, { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const formatCurrency = (value, language = 'fr') => {
  const locale = language === 'ar' ? 'ar-MA' : 'fr-MA';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'MAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

const DataTable = ({ 
  data, 
  theme = 'dark',
  language = 'fr'
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getTranslations = () => {
    switch (language) {
      case 'ar':
        return {
          noData: 'لا توجد بيانات متاحة',
          year: 'السنة',
          description: 'الوصف',
          amount: 'المبلغ',
          showing: 'عرض',
          to: 'إلى',
          of: 'من',
          entries: 'مدخلات',
          previous: 'السابق',
          next: 'التالي'
        };
      case 'en':
        return {
          noData: 'No data available',
          year: 'Year',
          description: 'Description',
          amount: 'Amount',
          showing: 'Showing',
          to: 'to',
          of: 'of',
          entries: 'entries',
          previous: 'Previous',
          next: 'Next'
        };
      default: // French
        return {
          noData: 'Aucune donnée disponible',
          year: 'Année',
          description: 'Description',
          amount: 'Montant',
          showing: 'Affichage',
          to: 'à',
          of: 'de',
          entries: 'entrées',
          previous: 'Précédent',
          next: 'Suivant'
        };
    }
  };

  const t = getTranslations();

  if (!data || data.length === 0) {
    return (
      <div className={`
        flex items-center justify-center h-32 rounded-lg border
        ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-500'}
        ${language === 'ar' ? 'text-right' : 'text-left'}
      `}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      >
        <p>{t.noData}</p>
      </div>
    );
  }

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-4" dir={language === 'ar' ? 'rtl' : 'ltr'} >
      {/* Table */}
      <div className="overflow-x-auto" style={language === 'ar' ? { fontFamily: 'Noto Kufi Arabic, sans-serif', direction:'rtl', fontSize:'1.50rem' } : undefined}>
        <table className="w-full">
          <thead>
            <tr className={`
              border-b
              ${theme === 'dark' ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}
            `}>
              <th className={`
                px-4 py-3 text-sm font-medium
                ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
                ${language === 'ar' ? 'text-right' : 'text-left'}
              `}>
                {t.year}
              </th>
              <th className={`
                px-4 py-3 text-sm font-medium
                ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
                ${language === 'ar' ? 'text-right' : 'text-left'}
              `}>
                {t.description}
              </th>
              <th className={`
                px-4 py-3 text-sm font-medium
                ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
                ${language === 'ar' ? 'text-left' : 'text-right'}
              `}>
                {t.amount}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, index) => (
              <tr 
                key={index}
                className={`
                  border-b transition-colors
                  ${theme === 'dark' 
                    ? 'border-gray-700 hover:bg-gray-800/30' 
                    : 'border-gray-200 hover:bg-gray-50'}
                `}
              >
                <td className={`
                  px-4 py-3 text-sm
                  ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
                  ${language === 'ar' ? 'text-right' : 'text-left'}
                `}>
                  {row.year}
                </td>
                <td className={`
  px-4 py-3 text-sm text-nowrap truncate max-w-20 md:max-w-30 lg:max-w-full
  ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
  ${language === 'ar' ? 'text-right' : 'text-left'}
`}>
  <Popover>
    <PopoverTrigger asChild>
      <div className="cursor-pointer tap-highlight-transparent">
        {language === 'ar' ? (
          <span dir="rtl">{row.ar_label || row.fr_label || 'N/A'}</span>
        ) : (
          row.fr_label || row.ar_label || 'N/A'
        )}
      </div>
    </PopoverTrigger>
    <PopoverContent className="w-auto max-w-xs break-words p-3 bg-gray-200">
      {language === 'ar' ? (
        <span dir="rtl">{row.ar_label || row.fr_label || 'N/A'}</span>
      ) : (
        row.fr_label || row.ar_label || 'N/A'
      )}
    </PopoverContent>
  </Popover>
</td>
                <td className={`
                  px-4 py-3 text-sm font-medium
                  ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}
                  ${language === 'ar' ? 'text-left' : 'text-right'}
                `}>
                  {formatCurrency(row.amount_approved || 0, language)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={`flex items-center justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          <div className={`
            text-sm
            ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
          `}>
            {t.showing} {startIndex + 1} {t.to} {Math.min(endIndex, data.length)} {t.of} {data.length} {t.entries}
          </div>
          
          <div className={`flex space-x-2 ${language === 'ar' ? 'space-x-reverse' : ''}`}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`
                px-3 py-1 rounded text-sm transition-colors
                ${currentPage === 1
                  ? (theme === 'dark' ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                  : (theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-300 text-gray-700 hover:bg-gray-400')
                }
              `}
            >
              {t.previous}
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`
                  px-3 py-1 rounded text-sm transition-colors
                  ${currentPage === i + 1
                    ? 'bg-blue-600 text-white'
                    : (theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-300 text-gray-700 hover:bg-gray-400')
                  }
                `}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`
                px-3 py-1 rounded text-sm transition-colors
                ${currentPage === totalPages
                  ? (theme === 'dark' ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                  : (theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-300 text-gray-700 hover:bg-gray-400')
                }
              `}
            >
              {t.next}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;// src/components/DataTable.jsx

