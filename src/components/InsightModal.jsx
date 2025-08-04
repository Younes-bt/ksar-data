// src/components/InsightModal.jsx

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const COLORS = ['#4F46E5', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#F97316', '#84CC16'];

export default function InsightModal({ insight, onClose, language = 'fr', theme }) {
  if (!insight) return null;

  const { title, description, chartData, total, chartType, count } = insight;

  const formatCurrency = (value) => {
    return `${Number(value).toLocaleString("fr-FR")} DH`;
  };

  const formatNumber = (value) => {
    return Number(value).toLocaleString("fr-FR");
  };

  const renderChart = () => {
    if (!chartData?.length) {
      return (
        <div className="flex items-center justify-center h-64 text-gray-500">
          <div className="text-center">
            <div className="text-4xl mb-2">📊</div>
            <p>No data available for this insight</p>
          </div>
        </div>
      );
    }

    switch (chartType) {
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ label, percentage }) => `${label}: ${percentage}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [formatCurrency(value), 'Amount']} />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <XAxis dataKey="label" />
              <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
              <Tooltip formatter={(value) => [formatCurrency(value), 'Amount']} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#4F46E5" 
                strokeWidth={3}
                dot={{ fill: '#4F46E5', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'bar':
      default:
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <XAxis 
                dataKey="label" 
                angle={-45}
                textAnchor="end"
                height={100}
                interval={0}
              />
              <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'value' && insight.field === 'variance') {
                    return [formatCurrency(value), 'Variance'];
                  }
                  return [formatCurrency(value), 'Amount'];
                }}
                labelFormatter={(label) => `Category: ${label}`}
              />
              <Bar dataKey="value" fill="#4F46E5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  const renderSummaryTable = () => {
    if (!chartData?.length) return null;

    return (
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">
          {language === 'ar' ? 'تفاصيل البيانات' : 
           language === 'fr' ? 'Détails des données' : 'Data Details'}
        </h3>
        <div className="max-h-64 overflow-y-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  {language === 'ar' ? 'الفئة' : 
                   language === 'fr' ? 'Catégorie' : 'Category'}
                </TableHead>
                <TableHead className="text-right">
                  {language === 'ar' ? 'المبلغ' : 
                   language === 'fr' ? 'Montant' : 'Amount'}
                </TableHead>
                {chartType === 'pie' && (
                  <TableHead className="text-right">
                    {language === 'ar' ? 'النسبة المئوية' : 
                     language === 'fr' ? 'Pourcentage' : 'Percentage'}
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {chartData.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{item.label}</TableCell>
                  <TableCell className="text-right font-mono">
                    {formatCurrency(item.value)}
                  </TableCell>
                  {chartType === 'pie' && (
                    <TableCell className="text-right">
                      {item.percentage}%
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={!!insight} onOpenChange={onClose}>
      <DialogContent className={`py-7 w-full max-h-[90vh] overflow-y-auto ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
        <DialogHeader>
          <DialogTitle className="text-xl">{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 rounded-lg p-6 mb-4 text-white w-100">
          <p className="text-sm text-muted-foreground">{description}</p>

          {/* Summary Stats */}
          <div className="grid w-100 grid-cols-1 md:flex-4 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {formatNumber(count)}
              </div>
              <div className="text-sm text-gray-600">
                {language === 'ar' ? 'العناصر' : 
                 language === 'fr' ? 'Éléments' : 'Items'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(total)}
              </div>
              <div className="text-sm text-gray-600">
                {language === 'ar' ? 'المجموع' : 
                 language === 'fr' ? 'Total' : 'Total'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {chartData?.length || 0}
              </div>
              <div className="text-sm text-gray-600">
                {language === 'ar' ? 'الفئات' : 
                 language === 'fr' ? 'Catégories' : 'Categories'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {total > 0 ? formatCurrency(total / (chartData?.length || 1)) : '0 DH'}
              </div>
              <div className="text-sm text-gray-600">
                {language === 'ar' ? 'المتوسط' : 
                 language === 'fr' ? 'Moyenne' : 'Average'}
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white rounded-lg border p-4">
            {renderChart()}
          </div>

          {/* Data Table */}
          {renderSummaryTable()}
        </div>

        <DialogFooter>
          <Button onClick={onClose}>
            {language === 'ar' ? 'إغلاق' : 
             language === 'fr' ? 'Fermer' : 'Close'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}