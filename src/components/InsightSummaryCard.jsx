// src/components/InsightSummaryCard.jsx

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatNumber } from '@/insights/enhancedDataProcessor';
import { TrendingUp, TrendingDown, DollarSign, FileText, Calendar } from 'lucide-react';

export default function InsightSummaryCard({ 
  insight, 
  processedData, 
  language = 'fr', 
  theme = 'dark' 
}) {
  if (!insight || !processedData) {
    return null;
  }

  const { title, description, totalAmount, recordCount, processedGroups } = processedData;

  // Calculate some additional stats
  const averageAmount = recordCount > 0 ? totalAmount / recordCount : 0;
  const topCategory = processedGroups && processedGroups.length > 0 ? processedGroups[0] : null;
  const categoryCount = processedGroups ? processedGroups.length : 0;

  // Calculate growth if we have yearly data
  const hasYearlyData = processedData.chartData?.yearly && processedData.chartData.yearly.length > 1;
  let growthRate = null;
  
  if (hasYearlyData) {
    const yearly = processedData.chartData.yearly;
    const currentYear = yearly[yearly.length - 1];
    const previousYear = yearly[yearly.length - 2];
    
    if (previousYear && previousYear.value > 0) {
      growthRate = ((currentYear.value - previousYear.value) / previousYear.value) * 100;
    }
  }

  return (
    <Card className={theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2 leading-6">
              {title}
            </CardTitle>
            <p className="text-sm text-gray-500 leading-relaxed">
              {description}
            </p>
          </div>
          <div className="ml-4">
            <span className="text-2xl">{insight.icon}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Key Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <DollarSign className="h-4 w-4" />
              {language === 'ar' ? 'المجموع' :
               language === 'fr' ? 'Total' :
               'Total'}
            </div>
            <div className="text-xl font-bold text-green-600">
              {formatCurrency(totalAmount, language)}
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <FileText className="h-4 w-4" />
              {language === 'ar' ? 'العناصر' :
               language === 'fr' ? 'Éléments' :
               'Records'}
            </div>
            <div className="text-xl font-bold text-blue-600">
              {formatNumber(recordCount, language)}
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              {language === 'ar' ? 'المتوسط' :
               language === 'fr' ? 'Moyenne' :
               'Average'}
            </div>
            <div className="text-xl font-bold text-purple-600">
              {formatCurrency(averageAmount, language)}
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="h-4 w-4 bg-orange-500 rounded-full"></span>
              {language === 'ar' ? 'الفئات' :
               language === 'fr' ? 'Catégories' :
               'Categories'}
            </div>
            <div className="text-xl font-bold text-orange-600">
              {formatNumber(categoryCount, language)}
            </div>
          </div>
        </div>

        {/* Growth Rate */}
        {growthRate !== null && (
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center gap-2">
              {growthRate >= 0 ? (
                <TrendingUp className="h-5 w-5 text-green-500" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-500" />
              )}
              <span className="font-medium">
                {language === 'ar' ? 'معدل النمو السنوي' :
                 language === 'fr' ? 'Taux de croissance annuel' :
                 'Annual Growth Rate'}
              </span>
            </div>
            <Badge variant={growthRate >= 0 ? "default" : "destructive"}>
              {growthRate >= 0 ? '+' : ''}{growthRate.toFixed(1)}%
            </Badge>
          </div>
        )}

        {/* Top Category */}
        {topCategory && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-gray-500">
              {language === 'ar' ? 'الفئة الأعلى' :
               language === 'fr' ? 'Catégorie principale' :
               'Top Category'}
            </h4>
            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div>
                <div className="font-medium">{topCategory.label}</div>
                <div className="text-sm text-gray-500">
                  {formatNumber(topCategory.records.length, language)} {
                    language === 'ar' ? 'عنصر' :
                    language === 'fr' ? 'éléments' :
                    'items'
                  }
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-blue-600">
                  {formatCurrency(topCategory.total, language)}
                </div>
                <div className="text-sm text-gray-500">
                  {totalAmount > 0 ? ((topCategory.total / totalAmount) * 100).toFixed(1) : 0}%
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Additional Insights */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-gray-500">
            {language === 'ar' ? 'رؤى إضافية' :
             language === 'fr' ? 'Informations supplémentaires' :
             'Additional Insights'}
          </h4>
          <div className="space-y-2 text-sm">
            {categoryCount > 0 && (
              <div className="flex justify-between">
                <span>
                  {language === 'ar' ? 'عدد الفئات المختلفة:' :
                   language === 'fr' ? 'Nombre de catégories distinctes:' :
                   'Number of distinct categories:'}
                </span>
                <span className="font-medium">{categoryCount}</span>
              </div>
            )}
            
            {recordCount > 0 && totalAmount > 0 && (
              <div className="flex justify-between">
                <span>
                  {language === 'ar' ? 'متوسط المبلغ لكل عنصر:' :
                   language === 'fr' ? 'Montant moyen par élément:' :
                   'Average amount per item:'}
                </span>
                <span className="font-medium">{formatCurrency(averageAmount, language)}</span>
              </div>
            )}

            {topCategory && totalAmount > 0 && (
              <div className="flex justify-between">
                <span>
                  {language === 'ar' ? 'نسبة الفئة الأعلى:' :
                   language === 'fr' ? 'Pourcentage de la catégorie principale:' :
                   'Top category percentage:'}
                </span>
                <span className="font-medium">
                  {((topCategory.total / totalAmount) * 100).toFixed(1)}%
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}