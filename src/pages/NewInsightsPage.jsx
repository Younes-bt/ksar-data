// src/pages/NewInsightsPage.jsx

import React, { useState, useEffect, useRef } from 'react';
import { simpleInsights, getInsightById } from '../insights/simpleInsightConfigs';
import Chart from '../components/Chart';
import DataTable from '../components/DataTable';
import html2canvas from 'html2canvas';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const NewInsightsPage = ({ 
  data, 
  t, 
  language = 'fr', 
  theme = 'dark' 
}) => {
  const [processedDataMap, setProcessedDataMap] = useState({});
  const [loadingMap, setLoadingMap] = useState({});
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState({});
  const [accordionValue, setAccordionValue] = useState('');
  const cardRefs = useRef({}); // References to each accordion card

  // Get translations
  const getTranslations = () => {
    switch (language) {
      case 'ar':
        return {
          title: 'تحليلات الميزانية',
          subtitle: 'تحليل تفصيلي لبيانات الميزانية البلدية',
          noData: 'لا توجد بيانات متاحة للتحليل',
          analyzing: 'جاري التحليل...',
          chartArea: 'الرسم البياني',
          tableArea: 'الجدول',
          share: 'مشاركة',
          download: 'تحميل',
          generating: 'جاري إنشاء الصورة...',
          shareOn: 'مشاركة على',
          downloadImage: 'تحميل الصورة',
          selectQuestion: 'اختر سؤالاً للتحليل'
        };
      case 'en':
        return {
          title: 'Budget Analytics',
          subtitle: 'Detailed analysis of municipal budget data',
          noData: 'No data available for analysis',
          analyzing: 'Analyzing...',
          chartArea: 'Chart',
          tableArea: 'Table',
          share: 'Share',
          download: 'Download',
          generating: 'Generating image...',
          shareOn: 'Share on',
          downloadImage: 'Download Image',
          selectQuestion: 'Select a question to analyze'
        };
      default: // French
        return {
          title: 'Analyses Budgétaires',
          subtitle: 'Analyse détaillée des données budgétaires municipales',
          noData: 'Aucune donnée disponible pour l\'analyse',
          analyzing: 'Analyse en cours...',
          chartArea: 'Graphique',
          tableArea: 'Tableau',
          share: 'Partager',
          download: 'Télécharger',
          generating: 'Génération de l\'image...',
          shareOn: 'Partager sur',
          downloadImage: 'Télécharger l\'image',
          selectQuestion: 'Sélectionnez une question à analyser'
        };
    }
  };

  const translations = getTranslations();

  // Generate card image for specific insight
  const generateCardImage = async (insightId) => {
    setIsGeneratingImage(true);
    
    try {
      const cardRef = cardRefs.current[insightId];
      if (!cardRef) {
        console.error('Card reference not found for insight:', insightId);
        return null;
      }

      console.log('Starting capture of card for insight:', insightId);
      
      // Hide share menu if open
      setShowShareMenu(prev => ({ ...prev, [insightId]: false }));
      
      // Hide the share button temporarily
      const shareButton = cardRef.querySelector('.share-menu-container');
      if (shareButton) {
        shareButton.style.visibility = 'hidden';
      }

      // Wait for any pending renders and ensure charts are loaded
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Get card dimensions
      const rect = cardRef.getBoundingClientRect();
      console.log('Card dimensions:', rect.width + 'x' + rect.height);

      // Configure html2canvas with optimal settings
      const canvas = await html2canvas(cardRef, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: theme === 'dark' ? '#111827' : '#ffffff',
        logging: false,
        width: rect.width,
        height: rect.height,
        x: 0,
        y: 0,
        scrollX: 0,
        scrollY: 0,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        removeContainer: false,
        foreignObjectRendering: true,
        imageTimeout: 15000,
        onclone: (clonedDoc, element) => {
          console.log('Cloning document for capture...');
          
          // Remove the share button from clone
          const clonedShareBtn = clonedDoc.querySelector('.share-menu-container');
          if (clonedShareBtn) {
            clonedShareBtn.remove();
          }

          // Ensure all chart canvases are visible
          const canvases = clonedDoc.querySelectorAll('canvas');
          console.log(`Found ${canvases.length} canvas elements`);
          canvases.forEach((canvas, index) => {
            console.log(`Canvas ${index}:`, canvas.width + 'x' + canvas.height);
            canvas.style.display = 'block';
            canvas.style.visibility = 'visible';
            canvas.style.opacity = '1';
          });

          // Ensure all SVGs are visible
          const svgs = clonedDoc.querySelectorAll('svg');
          console.log(`Found ${svgs.length} SVG elements`);
          svgs.forEach(svg => {
            svg.style.display = 'block';
            svg.style.visibility = 'visible';
            svg.style.opacity = '1';
          });

          // Make sure tables are visible
          const tables = clonedDoc.querySelectorAll('table, [class*="table"]');
          console.log(`Found ${tables.length} table elements`);
          tables.forEach(table => {
            table.style.display = 'block';
            table.style.visibility = 'visible';
            table.style.opacity = '1';
          });

          // Fix any flexbox or grid layouts that might be broken
          const flexElements = clonedDoc.querySelectorAll('[class*="flex"], [class*="grid"]');
          flexElements.forEach(el => {
            if (el.style) {
              el.style.display = el.classList.contains('grid') ? 'grid' : 'flex';
            }
          });
        }
      });

      // Restore share button visibility
      if (shareButton) {
        shareButton.style.visibility = 'visible';
      }

      console.log('Canvas generated:', canvas.width + 'x' + canvas.height);

      // Check if canvas is valid
      if (!canvas || canvas.width === 0 || canvas.height === 0) {
        throw new Error('Generated canvas is empty or invalid');
      }

      // Add watermark
      const ctx = canvas.getContext('2d');
      ctx.font = 'bold 24px Arial, sans-serif';
      ctx.fillStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)';
      ctx.textAlign = 'center';
      
      const watermarkText = 'www.ksar-data.ma';
      const textWidth = ctx.measureText(watermarkText).width;
      const x = canvas.width / 2;
      const y = canvas.height - 30;
      
      // Add background for watermark
      ctx.fillStyle = theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)';
      ctx.fillRect(x - textWidth/2 - 20, y - 35, textWidth + 40, 40);
      
      // Add watermark text
      ctx.fillStyle = theme === 'dark' ? '#ffffff' : '#000000';
      ctx.fillText(watermarkText, x, y - 10);

      return canvas;

    } catch (error) {
      console.error('Error in generateCardImage:', error);
      throw error;
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // Download image for specific insight
  const downloadImage = async (insightId) => {
    console.log('Starting download process for insight:', insightId);
    
    try {
      const canvas = await generateCardImage(insightId);
      
      if (!canvas) {
        throw new Error('Failed to generate canvas');
      }

      console.log('Converting canvas to blob...');
      const blob = await new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to convert canvas to blob'));
          }
        }, 'image/png', 0.95);
      });

      console.log('Creating download link...');
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `budget-analysis-${insightId}-${Date.now()}.png`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      URL.revokeObjectURL(url);
      console.log('Download completed successfully!');

    } catch (error) {
      console.error('Download failed:', error);
      
      // Show a user-friendly error message
      alert(`خطأ في تصدير الصورة. 
      
الرجاء المحاولة مرة أخرى أو استخدام:
- Windows: Windows + Shift + S  
- Mac: Cmd + Shift + 4
- أو انقر بالزر الأيمن واختر "التقاط لقطة شاشة"

Sorry, image export failed. Please try again or use your browser's screenshot tool.`);
    }
  };

  // Share functions for different platforms
  const shareToFacebook = async (insightId) => {
    const canvas = await generateCardImage(insightId);
    if (!canvas) {
      alert('Failed to generate image. Please try again.');
      return;
    }

    try {
      const blob = await new Promise(resolve => {
        canvas.toBlob(resolve, 'image/png', 0.9);
      });
      
      if (!blob) {
        alert('Failed to create image. Please try again.');
        return;
      }

      const file = new File([blob], 'budget-analysis.png', { type: 'image/png' });
      
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            title: translations.title,
            text: translations.subtitle,
            files: [file]
          });
          return;
        } catch (shareError) {
          console.log('Web Share failed, trying alternative method');
        }
      }
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'budget-analysis.png';
      link.click();
      URL.revokeObjectURL(url);
      
      setTimeout(() => {
        const text = encodeURIComponent(`${translations.title} - ${translations.subtitle}\n\nGenerated from www.ksar-data.ma`);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${text}`, '_blank');
      }, 500);
      
    } catch (error) {
      console.error('Error sharing to Facebook:', error);
      alert('Failed to share. Please try downloading the image instead.');
    }
  };

  const shareToTwitter = async () => {
    const text = encodeURIComponent(`${translations.title} - ${translations.subtitle} via @ksar_data`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const shareToWhatsApp = async () => {
    const text = encodeURIComponent(`${translations.title} - ${translations.subtitle}\n${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const shareToLinkedIn = async () => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(translations.title);
    const summary = encodeURIComponent(translations.subtitle);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`, '_blank');
  };

  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const openMenus = Object.keys(showShareMenu).filter(key => showShareMenu[key]);
      if (openMenus.length > 0 && !event.target.closest('.share-menu-container')) {
        setShowShareMenu({});
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showShareMenu]);

  // Process insight data when accordion opens
  const processInsightData = async (insightId) => {
    if (!data || data.length === 0 || processedDataMap[insightId]) return;

    setLoadingMap(prev => ({ ...prev, [insightId]: true }));
    
    try {
      const insight = getInsightById(insightId);
      if (!insight) {
        setProcessedDataMap(prev => ({ ...prev, [insightId]: null }));
        return;
      }

      const result = insight.getData(data);
      setProcessedDataMap(prev => ({ ...prev, [insightId]: result }));
    } catch (error) {
      console.error('Error processing insight data:', error);
      setProcessedDataMap(prev => ({ ...prev, [insightId]: null }));
    } finally {
      setLoadingMap(prev => ({ ...prev, [insightId]: false }));
    }
  };

  // Handle accordion value change
  const handleAccordionChange = (value) => {
    setAccordionValue(value);
    if (value) {
      processInsightData(value);
    }
  };

  // Get filtered data for table
  const getTableData = (insightId) => {
    const processedData = processedDataMap[insightId];
    if (!processedData?.filteredData) return [];
    return processedData.filteredData.slice(0, 50);
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
    <div style={language === 'ar' ? { fontFamily: 'Noto Kufi Arabic, sans-serif', direction:'rtl', fontSize:'1.50rem' } : undefined} className={`min-h-screen ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'} pt-5`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 lg:px-12">
        
        {/* Header */}
        <div className={`mb-8 text-center`}>
          <h1 className={`text-xl lg:text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {translations.title}
          </h1>
          <p className={`text-lg lg:text-3xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {translations.subtitle}
          </p>
        </div>

        {/* Questions Accordion */}
        <div className="mb-8">
          <Accordion 
            type="single" 
            collapsible 
            value={accordionValue}
            onValueChange={handleAccordionChange}
            className={`
              w-full space-y-4 
              ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
            `}
          >
            {simpleInsights.map((insight) => (
              <AccordionItem 
                key={insight.id} 
                value={insight.id}
                className={`
                  border rounded-lg transition-all duration-200
                  ${theme === 'dark' 
                    ? 'border-gray-700 bg-gray-800 data-[state=open]:bg-gray-800/80' 
                    : 'border-gray-200 bg-white data-[state=open]:bg-gray-50'}
                  shadow-cyan-500/10 shadow-lg
                `}
              >
                <AccordionTrigger 
                  className={`
                    px-6 py-4 hover:no-underline
                    ${theme === 'dark' ? 'text-gray-200 hover:text-white' : 'text-gray-800 hover:text-gray-900'}
                    ${language === 'ar' ? 'text-right [&>svg]:order-first [&>svg]:ml-2 [&>svg]:mr-0' : 'text-left'}
                  `}
                  style={language === 'ar' ? { fontFamily: 'Noto Kufi Arabic, sans-serif', fontSize:'1rem' } : { fontSize:'.9rem' }}
                >
                  <span className={`flex-1 ${language === 'ar' ? 'text-center' : 'text-left'}`}>
                    {typeof insight.question === 'string' 
                      ? insight.question 
                      : insight.question[language] || insight.question.fr}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-0 pb-0">
                  <div 
                    ref={el => cardRefs.current[insight.id] = el}
                    className={`
                      mx-2 mb-6 p-3 rounded-lg border relative
                      shadow-cyan-500/20 shadow-2xl
                      ${theme === 'dark' 
                        ? 'bg-gray-900 border-gray-800' 
                        : 'bg-white border-gray-200'}
                    `}
                  >
                    {/* Share/Download Button */}
                    <div className={` ${language === 'ar' ? 'left-4' : 'right-4'} share-menu-container absolute top-3 z-10`}>
                      <button
                        onClick={() => setShowShareMenu(prev => ({ ...prev, [insight.id]: !prev[insight.id] }))}
                        disabled={isGeneratingImage}
                        className={`
                          p-2 rounded-lg transition-all duration-200
                          ${theme === 'dark' 
                            ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-600' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'}
                          ${isGeneratingImage ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
                        `}
                        title={translations.share}
                      >
                        {isGeneratingImage ? (
                          <div className="w-5 h-5 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                          </svg>
                        )}
                      </button>

                      {/* Share Menu */}
                      {showShareMenu[insight.id] && (
                        <div className={`
                          absolute top-full mt-2 ${language === 'ar' ? 'left-0' : 'right-0'} 
                          w-48 rounded-lg border shadow-lg z-50
                          ${theme === 'dark' 
                            ? 'bg-gray-800 border-gray-700' 
                            : 'bg-white border-gray-200'}
                        `}>
                          {/* Download Option */}
                          <button
                            onClick={() => downloadImage(insight.id)}
                            className={`
                              w-full px-4 py-3 text-left flex items-center space-x-3 rounded-t-lg
                              transition-colors duration-200
                              ${theme === 'dark' 
                                ? 'hover:bg-gray-700 text-white' 
                                : 'hover:bg-gray-50 text-gray-700'}
                              ${language === 'ar' ? 'flex-row-reverse space-x-reverse text-right' : ''}
                            `}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>{translations.downloadImage}</span>
                          </button>

                          {/* Social Media Options */}
                          <button
                            onClick={() => shareToFacebook(insight.id)}
                            className={`
                              w-full px-4 py-3 text-left flex items-center space-x-3
                              transition-colors duration-200
                              ${theme === 'dark' 
                                ? 'hover:bg-gray-700 text-white' 
                                : 'hover:bg-gray-50 text-gray-700'}
                              ${language === 'ar' ? 'flex-row-reverse space-x-reverse text-right' : ''}
                            `}
                          >
                            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                            <span>Facebook</span>
                          </button>

                          <button
                            onClick={shareToTwitter}
                            className={`
                              w-full px-4 py-3 text-left flex items-center space-x-3
                              transition-colors duration-200
                              ${theme === 'dark' 
                                ? 'hover:bg-gray-700 text-white' 
                                : 'hover:bg-gray-50 text-gray-700'}
                              ${language === 'ar' ? 'flex-row-reverse space-x-reverse text-right' : ''}
                            `}
                          >
                            <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                            <span>X (Twitter)</span>
                          </button>

                          <button
                            onClick={shareToWhatsApp}
                            className={`
                              w-full px-4 py-3 text-left flex items-center space-x-3
                              transition-colors duration-200
                              ${theme === 'dark' 
                                ? 'hover:bg-gray-700 text-white' 
                                : 'hover:bg-gray-50 text-gray-700'}
                              ${language === 'ar' ? 'flex-row-reverse space-x-reverse text-right' : ''}
                            `}
                          >
                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                            </svg>
                            <span>WhatsApp</span>
                          </button>

                          <button
                            onClick={shareToLinkedIn}
                            className={`
                              w-full px-4 py-3 text-left flex items-center space-x-3 rounded-b-lg
                              transition-colors duration-200
                              ${theme === 'dark' 
                                ? 'hover:bg-gray-700 text-white' 
                                : 'hover:bg-gray-50 text-gray-700'}
                              ${language === 'ar' ? 'flex-row-reverse space-x-reverse text-right' : ''}
                            `}
                          >
                            <svg className="w-5 h-5 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                            <span>LinkedIn</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Question Title and Description */}
                    <div className={`mb-6 mt-10 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                      <h2 
                        style={language === 'ar' ? { fontFamily: 'Noto Kufi Arabic, sans-serif', direction:'rtl' } : undefined}
                        className={`
                          text-sm md:text-lg font-semibold mb-2 
                          ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
                        `}
                      >
                        {typeof insight.question === 'string' 
                          ? insight.question 
                          : insight.question[language] || insight.question.fr}
                      </h2>
                      <p className={`
                        text-sm 
                        ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
                      `}>
                        {typeof insight.description === 'string' 
                          ? insight.description 
                          : insight.description[language] || insight.description.fr}
                      </p>
                    </div>

                    {/* Chart and Table Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          
                       {/* Table Area */}
                      <div className={`
                        rounded-lg border p-4
                        ${theme === 'dark' 
                          ? 'bg-gray-800 border-gray-700' 
                          : 'bg-gray-50 border-gray-200'}
                      `}>
                        <h3 className={`
                          text-md md:text-lg font-medium text-center mb-4
                          ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
                          
                        `}>
                          {translations.tableArea}
                        </h3>
                        <p className="text-xs text-red-500 text-center ">
                            <span>{t?.supportpage?.showAll || 'Total Grants'}</span> 
                          </p>
                        
                        {loadingMap[insight.id] ? (
                          <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <span className="ml-3">{translations.analyzing}</span>
                          </div>
                        ) : (
                          <DataTable 
                            data={getTableData(insight.id)} 
                            theme={theme}
                            language={language}
                          />
                        )}
                      </div>

                      {/* Chart Area */}
                      <div className={`
                        rounded-lg border p-2
                        ${theme === 'dark' 
                          ? 'bg-gray-800 border-gray-700' 
                          : 'bg-gray-50 border-gray-200'}
                      `}>
                        <h3 className={`
                          text-md md:text-lg text-center font-medium mb-4
                          ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
                          
                        `}>
                          {translations.chartArea}
                        </h3>
                        
                        {loadingMap[insight.id] ? (
                          <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <span className="ml-3">{translations.analyzing}</span>
                          </div>
                        ) : (
                          <Chart 
                            data={processedDataMap[insight.id]?.chartData || []} 
                            type={insight.type}
                            theme={theme}
                            language={language}
                          />
                        )}
                      </div>


                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
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

export default NewInsightsPage;