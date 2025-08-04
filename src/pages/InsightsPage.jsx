// src/pages/EnhancedInsightsPage.jsx

import { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import InsightsSidebar from '@/components/InsightsSidebar';
import InsightSummaryCard from '@/components/InsightSummaryCard';
import InsightChartCard from '@/components/InsightChartCard';
import InsightTableCard from '@/components/InsightTableCard';
import { getInsightById } from '@/insights/enhancedInsightConfigs';
import { processInsightData } from '@/insights/enhancedDataProcessor';
import { AlertCircle } from 'lucide-react';

export default function EnhancedInsightsPage({ 
  data, 
  t, 
  language = 'fr', 
  theme = 'dark' 
}) {
  const [selectedInsightId, setSelectedInsightId] = useState('top-income-sources');
  const [processedData, setProcessedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Process insight data when selection changes
  useEffect(() => {
    if (!selectedInsightId || !data) return;

    setLoading(true);
    setError(null);

    try {
      const insight = getInsightById(selectedInsightId);
      if (!insight) {
        throw new Error('Insight not found');
      }

      const result = processInsightData(insight, data, language);
      setProcessedData(result);
    } catch (err) {
      console.error('Error processing insight data:', err);
      setError(err.message);
      setProcessedData(null);
    } finally {
      setLoading(false);
    }
  }, [selectedInsightId, data, language]);

  const selectedInsight = getInsightById(selectedInsightId);

  if (!data || data.length === 0) {
    return (
      <div className={`min-h-full ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="flex items-center justify-center h-64">
          <Alert className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {language === 'ar' ? 'لا توجد بيانات متاحة للتحليل' :
               language === 'fr' ? 'Aucune donnée disponible pour l\'analyse' :
               'No data available for analysis'}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'} px-20`}>
      
      <div className="flex h-screen">
        {/* Sidebar */}
        <InsightsSidebar
          selectedInsightId={selectedInsightId}
          onInsightSelect={setSelectedInsightId}
          language={language}
          theme={theme}
        />

        {/* Main Content */}
        <div className="flex-1 overflow-auto px-5">
          
          <div className="p-4 lg:p-6 space-y-6 pt-16 lg:pt-6">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-2xl lg:text-3xl font-bold">
                📊 {language === 'ar' ? 'تحليلات الميزانية' :
                     language === 'fr' ? 'Analyses Budgétaires' :
                     'Budget Analytics'}
              </h1>
              <p className="text-gray-500">
                {language === 'ar' ? 'تحليل تفصيلي لبيانات الميزانية البلدية' :
                 language === 'fr' ? 'Analyse détaillée des données budgétaires municipales' :
                 'Detailed analysis of municipal budget data'}
              </p>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3">
                  {language === 'ar' ? 'جاري التحليل...' :
                   language === 'fr' ? 'Analyse en cours...' :
                   'Analyzing...'}
                </span>
              </div>
            )}

            {/* Error State */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {language === 'ar' ? 'خطأ في تحليل البيانات: ' :
                   language === 'fr' ? 'Erreur lors de l\'analyse des données: ' :
                   'Error analyzing data: '}
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Content */}
            {!loading && !error && processedData && selectedInsight && (
              <div className="space-y-6">
                {/* Summary Card */}
                <InsightSummaryCard
                  insight={selectedInsight}
                  processedData={processedData}
                  language={language}
                  theme={theme}
                />

                {/* Charts Grid */}
                <div className="grid gap-6 lg:grid-cols-2">
                  {selectedInsight.charts.map((chartConfig, index) => {
                    let chartData = [];
                    
                    // Select appropriate data based on chart type
                    switch (chartConfig.type) {
                      case 'pie':
                        chartData = processedData.chartData.pie || [];
                        break;
                      case 'line':
                        chartData = processedData.chartData.yearly || processedData.chartData.line || [];
                        break;
                      case 'bar':
                      default:
                        chartData = processedData.chartData.bar || [];
                        break;
                    }

                    return (
                      <InsightChartCard
                        key={index}
                        chartConfig={{
                          ...chartConfig,
                          title: chartConfig.title || (
                            language === 'ar' ? 'الرسم البياني' :
                            language === 'fr' ? 'Graphique' :
                            'Chart'
                          )
                        }}
                        data={chartData}
                        language={language}
                        theme={theme}
                      />
                    );
                  })}
                </div>

                {/* Data Table */}
                <InsightTableCard
                  data={processedData.tableData}
                  language={language}
                  theme={theme}
                  title={
                    language === 'ar' ? 'البيانات التفصيلية' :
                    language === 'fr' ? 'Données détaillées' :
                    'Detailed Data'
                  }
                />
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && !processedData && (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="text-6xl mb-4">📈</div>
                  <h3 className="text-xl font-semibold mb-2">
                    {language === 'ar' ? 'اختر تحليلاً من الشريط الجانبي' :
                     language === 'fr' ? 'Sélectionnez une analyse dans la barre latérale' :
                     'Select an analysis from the sidebar'}
                  </h3>
                  <p className="text-gray-500">
                    {language === 'ar' ? 'ابدأ باختيار أحد التحليلات المتاحة' :
                     language === 'fr' ? 'Commencez en sélectionnant une des analyses disponibles' :
                     'Start by selecting one of the available analyses'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}