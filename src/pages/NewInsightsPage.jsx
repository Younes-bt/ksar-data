// src/pages/NewInsightsPage.jsx

import React, { useState, useEffect, useRef } from 'react';
import { simpleInsights, getInsightById } from '../insights/simpleInsightConfigs';
import QuestionCard from '../components/QuestionCard';
import Chart from '../components/Chart';
import DataTable from '../components/DataTable';
import html2canvas from 'html2canvas';

const NewInsightsPage = ({ 
  data, 
  t, 
  language = 'fr', 
  theme = 'dark' 
}) => {
  const [selectedInsightId, setSelectedInsightId] = useState(simpleInsights[0]?.id);
  const [processedData, setProcessedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const scrollContainerRef = useRef(null);
  const cardRef = useRef(null); // Reference to the card we want to share

  // Get translations
  const getTranslations = () => {
    switch (language) {
      case 'ar':
        return {
          title: 'تحليلات الميزانية',
          subtitle: 'تحليل تفصيلي لبيانات الميزانية البلدية',
          noData: 'لا توجد بيانات متاحة للتحليل',
          analyzing: 'جاري التحليل...',
          chartArea: 'منطقة الرسم البياني',
          tableArea: 'منطقة الجدول',
          share: 'مشاركة',
          download: 'تحميل',
          generating: 'جاري إنشاء الصورة...',
          shareOn: 'مشاركة على',
          downloadImage: 'تحميل الصورة'
        };
      case 'en':
        return {
          title: 'Budget Analytics',
          subtitle: 'Detailed analysis of municipal budget data',
          noData: 'No data available for analysis',
          analyzing: 'Analyzing...',
          chartArea: 'Chart Area',
          tableArea: 'Table Area',
          share: 'Share',
          download: 'Download',
          generating: 'Generating image...',
          shareOn: 'Share on',
          downloadImage: 'Download Image'
        };
      default: // French
        return {
          title: 'Analyses Budgétaires',
          subtitle: 'Analyse détaillée des données budgétaires municipales',
          noData: 'Aucune donnée disponible pour l\'analyse',
          analyzing: 'Analyse en cours...',
          chartArea: 'Zone Graphique',
          tableArea: 'Zone Tableau',
          share: 'Partager',
          download: 'Télécharger',
          generating: 'Génération de l\'image...',
          shareOn: 'Partager sur',
          downloadImage: 'Télécharger l\'image'
        };
    }
  };

  const translations = getTranslations();

  // Function to create a simple chart representation for the image
  const createSimpleChart = (chartData, chartType) => {
    const chartContainer = document.createElement('div');
    chartContainer.style.cssText = `
      background-color: ${theme === 'dark' ? '#374151' : '#e5e7eb'};
      border-radius: 6px;
      height: 250px;
      padding: 16px;
      position: relative;
      overflow: hidden;
    `;

    if (!chartData || chartData.length === 0) {
      const placeholder = document.createElement('div');
      placeholder.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: ${theme === 'dark' ? '#9ca3af' : '#6b7280'};
        font-size: 14px;
      `;
      placeholder.textContent = 'No chart data available';
      chartContainer.appendChild(placeholder);
      return chartContainer;
    }

    // Create simple bar chart representation
    const maxValue = Math.max(...chartData.map(d => d.value || d.y || d.amount || 0));
    const chartHeight = 200;
    const barWidth = Math.min(40, (chartContainer.offsetWidth - 32) / chartData.length - 8);

    chartData.slice(0, 10).forEach((item, index) => {
      const value = item.value || item.y || item.amount || 0;
      const barHeight = (value / maxValue) * chartHeight;
      
      // Create bar
      const bar = document.createElement('div');
      bar.style.cssText = `
        position: absolute;
        bottom: 16px;
        left: ${16 + index * (barWidth + 8)}px;
        width: ${barWidth}px;
        height: ${barHeight}px;
        background-color: ${theme === 'dark' ? '#3b82f6' : '#2563eb'};
        border-radius: 2px 2px 0 0;
      `;
      
      // Add value label
      const label = document.createElement('div');
      label.style.cssText = `
        position: absolute;
        bottom: ${barHeight + 4}px;
        left: ${16 + index * (barWidth + 8)}px;
        width: ${barWidth}px;
        font-size: 10px;
        color: ${theme === 'dark' ? '#d1d5db' : '#374151'};
        text-align: center;
      `;
      label.textContent = typeof value === 'number' ? value.toLocaleString() : value;
      
      chartContainer.appendChild(bar);
      chartContainer.appendChild(label);
    });

    return chartContainer;
  };

  // Function to create a data table representation
  const createDataTable = (tableData) => {
    const tableContainer = document.createElement('div');
    tableContainer.style.cssText = `
      background-color: ${theme === 'dark' ? '#374151' : '#e5e7eb'};
      border-radius: 6px;
      height: 250px;
      padding: 12px;
      overflow: hidden;
    `;

    if (!tableData || tableData.length === 0) {
      const placeholder = document.createElement('div');
      placeholder.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: ${theme === 'dark' ? '#9ca3af' : '#6b7280'};
        font-size: 14px;
      `;
      placeholder.textContent = 'No table data available';
      tableContainer.appendChild(placeholder);
      return tableContainer;
    }

    // Get column headers from first row
    const headers = Object.keys(tableData[0]).slice(0, 4); // Show first 4 columns
    
    // Create header row
    const headerRow = document.createElement('div');
    headerRow.style.cssText = `
      display: flex;
      padding: 8px 0;
      border-bottom: 2px solid ${theme === 'dark' ? '#4b5563' : '#d1d5db'};
      font-weight: bold;
      color: ${theme === 'dark' ? '#ffffff' : '#111827'};
      font-size: 12px;
    `;
    
    headers.forEach(header => {
      const headerCell = document.createElement('div');
      headerCell.style.cssText = `
        flex: 1;
        padding: 0 4px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      `;
      headerCell.textContent = header;
      headerRow.appendChild(headerCell);
    });
    
    tableContainer.appendChild(headerRow);

    // Create data rows
    tableData.slice(0, 8).forEach((row, index) => {
      const dataRow = document.createElement('div');
      dataRow.style.cssText = `
        display: flex;
        padding: 6px 0;
        border-bottom: 1px solid ${theme === 'dark' ? '#4b5563' : '#d1d5db'};
        color: ${theme === 'dark' ? '#d1d5db' : '#374151'};
        font-size: 11px;
      `;
      
      headers.forEach(header => {
        const cell = document.createElement('div');
        cell.style.cssText = `
          flex: 1;
          padding: 0 4px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        `;
        const value = row[header];
        cell.textContent = typeof value === 'number' ? value.toLocaleString() : (value || '');
        dataRow.appendChild(cell);
      });
      
      tableContainer.appendChild(dataRow);
    });

    return tableContainer;
  };
  // Function to create a simplified card for image generation
  const createImageCard = () => {
    if (!selectedInsight || !processedData) return null;

    // Create a new card element from scratch
    const cardDiv = document.createElement('div');
    cardDiv.style.cssText = `
      background-color: ${theme === 'dark' ? '#111827' : '#ffffff'};
      border: 1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'};
      border-radius: 12px;
      padding: 32px;
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      width: 900px;
      min-height: 600px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    `;

    // Add title
    const title = document.createElement('h2');
    title.style.cssText = `
      color: ${theme === 'dark' ? '#ffffff' : '#111827'};
      font-size: 28px;
      font-weight: bold;
      margin: 0 0 12px 0;
      line-height: 1.3;
      ${language === 'ar' ? 'direction: rtl; text-align: right;' : ''}
    `;
    title.textContent = typeof selectedInsight.question === 'string' 
      ? selectedInsight.question 
      : selectedInsight.question[language] || selectedInsight.question.fr;

    // Add description
    const description = document.createElement('p');
    description.style.cssText = `
      color: ${theme === 'dark' ? '#9ca3af' : '#6b7280'};
      font-size: 16px;
      margin: 0 0 32px 0;
      line-height: 1.5;
      ${language === 'ar' ? 'direction: rtl; text-align: right;' : ''}
    `;
    description.textContent = typeof selectedInsight.description === 'string' 
      ? selectedInsight.description 
      : selectedInsight.description[language] || selectedInsight.description.fr;

    // Add content areas
    const contentDiv = document.createElement('div');
    contentDiv.style.cssText = `
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 24px;
    `;

    // Chart area
    const chartArea = document.createElement('div');
    chartArea.style.cssText = `
      background-color: ${theme === 'dark' ? '#1f2937' : '#f9fafb'};
      border: 1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'};
      border-radius: 8px;
      padding: 20px;
      min-height: 300px;
    `;

    const chartTitle = document.createElement('h3');
    chartTitle.style.cssText = `
      color: ${theme === 'dark' ? '#ffffff' : '#111827'};
      font-size: 18px;
      font-weight: 600;
      margin: 0 0 16px 0;
      ${language === 'ar' ? 'direction: rtl; text-align: right;' : ''}
    `;
    chartTitle.textContent = translations.chartArea;

    // Add actual chart visualization
    const chartVisualization = createSimpleChart(processedData?.chartData || [], selectedInsight.type);
    chartArea.appendChild(chartTitle);
    chartArea.appendChild(chartVisualization);

    // Table area
    const tableArea = document.createElement('div');
    tableArea.style.cssText = `
      background-color: ${theme === 'dark' ? '#1f2937' : '#f9fafb'};
      border: 1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'};
      border-radius: 8px;
      padding: 20px;
      min-height: 300px;
    `;

    const tableTitle = document.createElement('h3');
    tableTitle.style.cssText = `
      color: ${theme === 'dark' ? '#ffffff' : '#111827'};
      font-size: 18px;
      font-weight: 600;
      margin: 0 0 16px 0;
      ${language === 'ar' ? 'direction: rtl; text-align: right;' : ''}
    `;
    tableTitle.textContent = translations.tableArea;

    // Add actual data table
    const tableData = getTableData();
    const dataTable = createDataTable(tableData);
    tableArea.appendChild(tableTitle);
    tableArea.appendChild(dataTable);

    contentDiv.appendChild(chartArea);
    contentDiv.appendChild(tableArea);

    cardDiv.appendChild(title);
    cardDiv.appendChild(description);
    cardDiv.appendChild(contentDiv);

    return cardDiv;
  };

// Completely rewritten image capture function focused on the actual card
const generateCardImage = async () => {
  setIsGeneratingImage(true);
  
  try {
    if (!cardRef.current) {
      console.error('Card reference not found');
      return null;
    }

    console.log('Starting capture of actual card...');
    
    // Hide share menu if open
    setShowShareMenu(false);
    
    // Hide the share button temporarily
    const shareButton = cardRef.current.querySelector('.share-menu-container');
    if (shareButton) {
      shareButton.style.visibility = 'hidden';
    }

    // Wait for any pending renders and ensure charts are loaded
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Get card dimensions
    const rect = cardRef.current.getBoundingClientRect();
    console.log('Card dimensions:', rect.width + 'x' + rect.height);

    // Configure html2canvas with optimal settings for your use case
    const canvas = await html2canvas(cardRef.current, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: theme === 'dark' ? '#111827' : '#ffffff',
      logging: false, // Disable logging to reduce noise
      width: rect.width,
      height: rect.height,
      x: 0,
      y: 0,
      scrollX: 0,
      scrollY: 0,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      removeContainer: false,
      foreignObjectRendering: true, // Enable this for better SVG/canvas support
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
    throw error; // Re-throw to be handled by downloadImage
  } finally {
    setIsGeneratingImage(false);
  }
};

// Simplified download function - only try the main method
const downloadImage = async () => {
  console.log('Starting download process...');
  
  try {
    const canvas = await generateCardImage();
    
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
    link.download = `budget-analysis-${selectedInsightId}-${Date.now()}.png`;
    
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

// Alternative: Add a debug function to check what's in the card
const debugCardContent = () => {
  if (!cardRef.current) {
    console.log('No card reference');
    return;
  }
  
  console.log('=== CARD DEBUG INFO ===');
  console.log('Card element:', cardRef.current);
  console.log('Card dimensions:', cardRef.current.offsetWidth + 'x' + cardRef.current.offsetHeight);
  
  const canvases = cardRef.current.querySelectorAll('canvas');
  console.log('Canvases found:', canvases.length);
  canvases.forEach((canvas, i) => {
    console.log(`Canvas ${i}:`, canvas.width + 'x' + canvas.height, canvas);
  });
  
  const svgs = cardRef.current.querySelectorAll('svg');
  console.log('SVGs found:', svgs.length);
  
  const tables = cardRef.current.querySelectorAll('table');
  console.log('Tables found:', tables.length);
  
  const charts = cardRef.current.querySelectorAll('[class*="chart"], [class*="recharts"]');
  console.log('Chart elements found:', charts.length);
  
  console.log('=== END DEBUG INFO ===');
};

// You can call debugCardContent() in the browser console to see what elements are present
  // Share functions for different platforms
  const shareToFacebook = async () => {
    const canvas = await generateCardImage();
    if (!canvas) {
      alert('Failed to generate image. Please try again.');
      return;
    }

    try {
      // Convert canvas to blob
      const blob = await new Promise(resolve => {
        canvas.toBlob(resolve, 'image/png', 0.9);
      });
      
      if (!blob) {
        alert('Failed to create image. Please try again.');
        return;
      }

      const file = new File([blob], 'budget-analysis.png', { type: 'image/png' });
      
      // Try Web Share API first (mobile devices)
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
      
      // Fallback: Create a download link and open Facebook
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'budget-analysis.png';
      link.click();
      URL.revokeObjectURL(url);
      
      // Also open Facebook sharer
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

  // Handle horizontal scroll with mouse wheel
  useEffect(() => {
    const handleWheel = (e) => {
      if (scrollContainerRef.current) {
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

  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showShareMenu && !event.target.closest('.share-menu-container')) {
        setShowShareMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showShareMenu]);

  // Process insight data when selection changes
  useEffect(() => {
    if (!selectedInsightId || !data || data.length === 0) return;

    setLoading(true);
    
    try {
      const insight = getInsightById(selectedInsightId);
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

  const selectedInsight = getInsightById(selectedInsightId);

  // Get filtered data for table
  const getTableData = () => {
    if (!processedData?.filteredData) return [];
    return processedData.filteredData.slice(0, 50);
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
              
            `}
          >
            {simpleInsights.map((insight) => (
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
            ref={cardRef}
            data-card-ref="true"
            className={`
              shadow-cyan-500/20 shadow-2xl
              rounded-lg border p-6 mb-8 relative
              ${theme === 'dark' 
                ? 'bg-gray-900 border-gray-800' 
                : 'bg-white border-gray-200'}
            `}
          >
            {/* Share/Download Button */}
            <div className={`absolute top-4 ${language === 'ar' ? 'left-4' : 'right-4'} share-menu-container`}>
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
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
              {showShareMenu && (
                <div className={`
                  absolute top-full mt-2 ${language === 'ar' ? 'left-0' : 'right-0'} 
                  w-48 rounded-lg border shadow-lg z-50
                  ${theme === 'dark' 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-200'}
                `}>
                  {/* Download Option */}
                  
                  {/* Social Media Options */}
                  <button
                    onClick={shareToFacebook}
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

            <div className={`mb-4 text-center`}>
              <h2 
                style={language === 'ar' ? { fontFamily: 'Noto Kufi Arabic, sans-serif', direction:'rtl', fontSize:'1.50rem' } : undefined}
                className={`
                  text-xl mb-2 
                  ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
                `}
              >
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
                  <Chart 
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
                  <DataTable 
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

export default NewInsightsPage;