// src/pages/RgphInsights.jsx

import React, { useState, useEffect, useRef } from 'react';
import { rgphInsights, getRgphInsightById } from '../insights/rgphInsightConfigs';
import QuestionCard from '../components/QuestionCard';
import RgphChart from '../components/RgphChart';
import DataTable from '../components/DataTable';

const RgphInsights = ({ 
  data, 
  t, 
  language = 'fr', 
  theme = 'dark' 
}) => {
  const [selectedInsightId, setSelectedInsightId] = useState(rgphInsights[0]?.id);
  const [processedData, setProcessedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const scrollContainerRef = useRef(null);

  // Get translations
  const getTranslations = () => {
    switch (language) {
      case 'ar':
        return {
          title: 'تحليلات ديموغرافية',
          subtitle: 'تحليل تفصيلي لبيانات الإحصاء العام للسكان والسكنى',
          noData: 'لا توجد بيانات متاحة للتحليل',
          analyzing: 'جاري التحليل...',
          chartArea: 'منطقة الرسم البياني',
          tableArea: 'منطقة الجدول'
        };
      case 'en':
        return {
          title: 'Demographic Analytics',
          subtitle: 'Detailed analysis of General Population and Housing Census data',
          noData: 'No data available for analysis',
          analyzing: 'Analyzing...',
          chartArea: 'Chart Area',
          tableArea: 'Table Area'
        };
      default: // French
        return {
          title: 'Analyses Démographiques',
          subtitle: 'Analyse détaillée des données du Recensement Général de la Population et de l\'Habitat',
          noData: 'Aucune donnée disponible pour l\'analyse',
          analyzing: 'Analyse en cours...',
          chartArea: 'Zone Graphique',
          tableArea: 'Zone Tableau'
        };
    }
  };

  const translations = getTranslations();

  // Handle horizontal scroll with mouse wheel
  useEffect(() => {
    const handleWheel = (e) => {
      if (scrollContainerRef.current) {
        // Check if the mouse is over the scroll container
        const rect = scrollContainerRef.current.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          e.preventDefault();
          scrollContainerRef.current.scrollLeft += e.deltaY;
        }
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('wheel', handleWheel, { passive: false });
      return () => {
        scrollContainer.removeEventListener('wheel', handleWheel);
      };
    }
  }, []);

  // Process insight data when selection changes
  useEffect(() => {
    if (!selectedInsightId || !data || data.length === 0) return;

    setLoading(true);
    
    try {
      const insight = getRgphInsightById(selectedInsightId);
      if (!insight) {
        setProcessedData(null);
        return;
      }

      const result = insight.getData(data);
      setProcessedData(result);
    } catch (error) {
      console.error('Error processing insight data:', error);
      setProcessedData(null);
    } finally {
      setLoading(false);
    }
  }, [selectedInsightId, data]);

  const selectedInsight = getRgphInsightById(selectedInsightId);

  // Get filtered data for table with proper structure for RGPH data
  const getTableData = () => {
    if (!processedData?.filteredData) return [];
    
    // Transform RGPH data to match expected table structure
    return processedData.filteredData.slice(0, 50).map(row => ({
      year: row.Année,
      fr_label: row.fr_Indicateur,
      ar_label: row.ar_Indicateur,
      amount_approved: row.Ensemble|| row['Ensemble (%)'] || 0,
      ensemble_percent: row['Ensemble (%)']|| row.Ensemble || 0,
      // Additional fields for demographic data
      male: row.Masculin || row['Masculin (%)'] || 0,
      female: row.Féminin || row['Féminin (%)'] || 0,
      theme: row.Thème
    }));
  };

  // Scroll functions for navigation buttons
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  if (!data || data.length === 0) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'}`}>
        <div className="flex items-center justify-center h-64">
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {translations.noData}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={language === 'ar' ? { fontFamily: 'Noto Kufi Arabic, sans-serif', direction:'rtl', fontSize:'1.50rem' } : undefined} className={`min-h-screen ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'} pt-16`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className={`mb-8 text-center`}>
          <h1 className={`text-2xl lg:text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {translations.title}
          </h1>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {translations.subtitle}
          </p>
        </div>

        {/* Question Cards - Horizontal Scroll with Navigation */}
        <div className="mb-8 relative">
          {/* Left scroll button */}
          <button
            onClick={scrollLeft}
            className={`
              absolute left-0 top-1/2 transform -translate-y-1/2 z-10
              w-8 h-8 rounded-full flex items-center justify-center
              transition-all duration-200 hover:scale-110
              ${theme === 'dark' 
                ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-600' 
                : 'bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 shadow-md'}
              ${language === 'ar' ? 'right-0 left-auto' : ''}
            `}
            style={{ 
              boxShadow: theme === 'dark' ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              style={{ transform: language === 'ar' ? 'rotate(180deg)' : 'none' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right scroll button */}
          <button
            onClick={scrollRight}
            className={`
              absolute right-0 top-1/2 transform -translate-y-1/2 z-10
              w-8 h-8 rounded-full flex items-center justify-center
              transition-all duration-200 hover:scale-110
              ${theme === 'dark' 
                ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-600' 
                : 'bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 shadow-md'}
              ${language === 'ar' ? 'left-0 right-auto' : ''}
            `}
            style={{ 
              boxShadow: theme === 'dark' ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              style={{ transform: language === 'ar' ? 'rotate(180deg)' : 'none' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Scrollable container */}
          <div 
            ref={scrollContainerRef}
            style={language === 'ar' ? { fontFamily: 'Noto Kufi Arabic, sans-serif', direction:'rtl', fontSize:'1rem' } : { fontFamily: 'Noto Kufi Arabic, sans-serif', direction:'ltr', fontSize:'.9rem' }}
            className={`
              flex space-x-4 overflow-x-auto pb-4 px-10
              scrollbar-hide scroll-smooth
              ${language === 'ar' ? 'space-x-reverse' : ''}
            `}
          >
            {rgphInsights.map((insight) => (
              <QuestionCard
                key={insight.id}
                question={insight.question}
                isSelected={selectedInsightId === insight.id}
                onClick={() => setSelectedInsightId(insight.id)}
                theme={theme}
                language={language}
              />
            ))}
          </div>
        </div>

        {/* Selected Question Details */}
        {selectedInsight && (
          <div 
          className={`
            shadow-cyan-500/20 shadow-2xl
            rounded-lg border p-6 mb-8
            ${theme === 'dark' 
              ? 'bg-gray-900 border-gray-800' 
              : 'bg-white border-gray-200'}
          `}>
            <div className={`mb-4 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              <h2 
              style={language === 'ar' ? { fontFamily: 'Noto Kufi Arabic, sans-serif', direction:'rtl', fontSize:'1.50rem' } : undefined}
              className={`
                text-xl mb-2
                ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
              `}>
                {typeof selectedInsight.question === 'string' 
                  ? selectedInsight.question 
                  : selectedInsight.question[language] || selectedInsight.question.fr}
              </h2>
              <p className={`
                text-sm
                ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
              `}>
                {typeof selectedInsight.description === 'string' 
                  ? selectedInsight.description 
                  : selectedInsight.description[language] || selectedInsight.description.fr}
              </p>
            </div>

            {/* Chart and Table Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Chart Area */}
              <div className={`
                rounded-lg border p-4
                ${theme === 'dark' 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-gray-50 border-gray-200'}
              `}>
                <h3 className={`
                  text-lg font-medium mb-4
                  ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
                  ${language === 'ar' ? 'text-right' : 'text-left'}
                `}>
                  {translations.chartArea}
                </h3>
                
                {loading ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-3">{translations.analyzing}</span>
                  </div>
                ) : (
                  <RgphChart 
                    data={processedData?.chartData || []} 
                    type={selectedInsight.type}
                    theme={theme}
                    language={language}
                  />
                )}
              </div>

              {/* Table Area */}
              <div className={`
                rounded-lg border p-4
                ${theme === 'dark' 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-gray-50 border-gray-200'}
              `}>
                <h3 className={`
                  text-lg font-medium mb-4
                  ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
                  ${language === 'ar' ? 'text-right' : 'text-left'}
                `}>
                  {translations.tableArea}
                </h3>
                
                {loading ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-3">{translations.analyzing}</span>
                  </div>
                ) : (
                  <RgphDataTable 
                    data={getTableData()} 
                    theme={theme}
                    language={language}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scroll-smooth {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

// Custom Data Table component for RGPH data
const RgphDataTable = ({ 
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
          indicator: 'المؤشر',
          value: 'القيمة',
          valuePercent: '%',
          theme: 'المحور',
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
          indicator: 'Indicator',
          value: 'Value',
          theme: 'Theme',
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
          indicator: 'Indicateur',
          value: 'Valeur',
          theme: 'Thème',
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

  const formatValue = (value, row) => {
    if (typeof value === 'number') {
      // If it's a percentage indicator or value under 100, show as percentage
      if (row.fr_label && (row.fr_label.includes('(%)') || row.fr_label.includes('Part ') || row.fr_label.includes('Taux '))) {
        return `${value.toFixed(1)}%`;
      }
      // If it's a large number (population), use number formatting
      if (value > 1000) {
        const locale = language === 'ar' ? 'ar-MA' : 'fr-MA';
        return new Intl.NumberFormat(locale).format(value);
      }
      return value.toFixed(1);
    }
    return value || 'N/A';
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
                {t.indicator}
              </th>
              <th className={`
                px-4 py-3 text-sm font-medium
                ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
                ${language === 'ar' ? 'text-left' : 'text-right'}
              `}>
                {t.value}
              </th>
              <th className={`
                px-4 py-3 text-sm font-medium
                ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
                ${language === 'ar' ? 'text-left' : 'text-right'}
              `}>
                {t.valuePercent}
              </th>
              <th className={`
                px-4 py-3 text-sm font-medium
                ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
                ${language === 'ar' ? 'text-right' : 'text-left'}
              `}>
                {t.theme}
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
                  px-4 py-3 text-sm
                  ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
                  ${language === 'ar' ? 'text-right' : 'text-left'}
                `}>
                  {language === 'ar' ? (row.ar_label || row.fr_label || 'N/A') : (row.fr_label || row.ar_label || 'N/A')}
                </td>
                <td className={`
                  px-4 py-3 text-sm font-medium
                  ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}
                  ${language === 'ar' ? 'text-left' : 'text-right'}
                `}>
                  {formatValue(row.amount_approved, row)}
                </td>
                <td className={`
                  px-4 py-3 text-sm font-medium
                  ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}
                  ${language === 'ar' ? 'text-left' : 'text-right'}
                `}>
                  {formatValue(row.ensemble_percent, row)}
                </td>
                <td className={`
                  px-4 py-3 text-sm
                  ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
                  ${language === 'ar' ? 'text-right' : 'text-left'}
                `}>
                  {row.theme || 'N/A'}
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

export default RgphInsights;