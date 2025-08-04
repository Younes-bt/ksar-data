import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function RGPHTable({ data, isLoading, t, theme, language, tableType = "part1" }) {
  // Function to format numbers with proper locale
  const formatNumber = (value) => {
    if (value === null || value === undefined) return '-';
    if (typeof value === 'number') {
      return value.toLocaleString(language === 'ar' ? 'ar-MA' : 'fr-FR');
    }
    return value;
  };

  // Function to get theme color for different categories
  const getThemeColor = (theme) => {
    const themeColors = {
      'DEMOGRAPHIE': 'bg-blue-100 text-blue-800',
      'ACTIVITE ECONOMIQUE': 'bg-green-100 text-green-800',
      'EDUCATION ': 'bg-purple-100 text-purple-800',
      'LANGUES MATERNELLES': 'bg-orange-100 text-orange-800',
      'CONDITIONS D\'HABITAT': 'bg-teal-100 text-teal-800'
    };
    return themeColors[theme] || 'bg-gray-100 text-gray-800';
  };

  // Render table headers based on table type
  const renderTableHeaders = () => {
    if (tableType === "part2") {
      // Headers for housing conditions data (part2)
      return (
        <TableRow>
          <TableHead className="min-w-[80px]">
            {t?.rgphpage?.year || 'السنة' || 'Year'}
          </TableHead>
          <TableHead className="min-w-[120px]">
            {t?.rgphpage?.theme || 'الموضوع' || 'Theme'}
          </TableHead>
          <TableHead className="min-w-[300px]">
            {t?.rgphpage?.indicator || 'المؤشر' || 'Indicator'}
          </TableHead>
          <TableHead className="text-right min-w-[120px]">
            {t?.rgphpage?.total_value || 'القيمة' || 'Value'}
          </TableHead>
        </TableRow>
      );
    } else {
      // Headers for demographic data (part1) - original headers
      return (
        <TableRow>
          <TableHead className="min-w-[80px]">
            {t?.rgphpage?.year || 'السنة' || 'Year'}
          </TableHead>
          <TableHead className="min-w-[120px]">
            {t?.rgphpage?.theme || 'الموضوع' || 'Theme'}
          </TableHead>
          <TableHead className="min-w-[300px]">
            {t?.rgphpage?.indicator || 'المؤشر' || 'Indicator'}
          </TableHead>
          <TableHead className="text-right min-w-[100px]">
            {t?.rgphpage?.male_percent || 'ذكور (%)' || 'Male (%)'}
          </TableHead>
          <TableHead className="text-right min-w-[100px]">
            {t?.rgphpage?.male_count || 'ذكور' || 'Male'}
          </TableHead>
          <TableHead className="text-right min-w-[100px]">
            {t?.rgphpage?.female_percent || 'إناث (%)' || 'Female (%)'}
          </TableHead>
          <TableHead className="text-right min-w-[100px]">
            {t?.rgphpage?.female_count || 'إناث' || 'Female'}
          </TableHead>
          <TableHead className="text-right min-w-[100px]">
            {t?.rgphpage?.total_percent || 'المجموع (%)' || 'Total (%)'}
          </TableHead>
          <TableHead className="text-right min-w-[120px]">
            {t?.rgphpage?.total_count || 'المجموع' || 'Total'}
          </TableHead>
        </TableRow>
      );
    }
  };

  // Render table rows based on table type
  const renderTableRows = () => {
    if (tableType === "part2") {
      // Rows for housing conditions data (part2)
      return data.map((row, idx) => (
        <TableRow key={idx} className={`${theme === 'dark' ? 'hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`}>
          <TableCell className="font-medium">{row.Année}</TableCell>
          <TableCell>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getThemeColor(row.Thème)}`}>
              {row.Thème}
            </span>
          </TableCell>
          <TableCell className="max-w-xs" title={language === 'ar' ? row.ar_Indicateur : row.fr_Indicateur}>
            {language === 'ar' ? (
              <span dir="rtl" className="block text-right">{row.ar_Indicateur}</span>
            ) : (
              <span className="block">{row.fr_Indicateur}</span>
            )}
          </TableCell>
          <TableCell className="text-right">
            <span className="font-mono text-sm font-semibold text-blue-600">
              {formatNumber(row.Ensemble)}
              {/* Add % sign for percentage values */}
              {row.fr_Indicateur?.includes('(%)')  || row.ar_Indicateur?.includes('(%)') ? '%' : ''}
            </span>
          </TableCell>
        </TableRow>
      ));
    } else {
      // Rows for demographic data (part1) - original rows
      return data.map((row, idx) => (
        <TableRow key={idx} className={`${theme === 'dark' ? 'hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`}>
          <TableCell className="font-medium">{row.Année}</TableCell>
          <TableCell>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getThemeColor(row.Thème)}`}>
              {row.Thème}
            </span>
          </TableCell>
          <TableCell className="max-w-xs" title={language === 'ar' ? row.ar_Indicateur : row.fr_Indicateur}>
            {language === 'ar' ? (
              <span dir="rtl" className="block text-right">{row.ar_Indicateur}</span>
            ) : (
              <span className="block">{row.fr_Indicateur}</span>
            )}
          </TableCell>
          <TableCell className="text-right">
            <span className="font-mono text-sm">
              {formatNumber(row['Masculin (%)'])}
              {row['Masculin (%)'] && typeof row['Masculin (%)'] === 'number' ? '%' : ''}
            </span>
          </TableCell>
          <TableCell className="text-right">
            <span className="font-mono text-sm text-blue-600">
              {formatNumber(row.Masculin)}
            </span>
          </TableCell>
          <TableCell className="text-right">
            <span className="font-mono text-sm">
              {formatNumber(row['Féminin (%)'])}
              {row['Féminin (%)'] && typeof row['Féminin (%)'] === 'number' ? '%' : ''}
            </span>
          </TableCell>
          <TableCell className="text-right">
            <span className="font-mono text-sm text-pink-600">
              {formatNumber(row.Féminin)}
            </span>
          </TableCell>
          <TableCell className="text-right">
            <span className="font-mono text-sm font-semibold">
              {formatNumber(row['Ensemble (%)'])}
              {row['Ensemble (%)'] && typeof row['Ensemble (%)'] === 'number' ? '%' : ''}
            </span>
          </TableCell>
          <TableCell className="text-right">
            <span className="font-mono text-sm font-semibold text-green-600">
              {formatNumber(row.Ensemble)}
            </span>
          </TableCell>
        </TableRow>
      ));
    }
  };

  // Render loading skeleton
  const renderLoadingSkeleton = () => {
    const columnCount = tableType === "part2" ? 4 : 9;
    return Array.from({ length: 5 }).map((_, idx) => (
      <TableRow key={`loading-${idx}`}>
        {Array.from({ length: columnCount }).map((_, colIdx) => (
          <TableCell key={colIdx}>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  // Render no data message
  const renderNoDataMessage = () => {
    const columnCount = tableType === "part2" ? 4 : 9;
    return (
      <TableRow>
        <TableCell colSpan={columnCount} className="text-center text-gray-500 py-8">
          <div className="flex flex-col items-center gap-2">
            <div className="text-4xl">📊</div>
            <p className="text-lg font-medium">
              {t?.rgphpage?.no_data || 'لا توجد بيانات مطابقة' || 'No matching data found'}
            </p>
            <p className="text-sm">
              {t?.rgphpage?.adjust_filters || 'حاول تعديل مرشحات البحث' || 'Try adjusting your search filters'}
            </p>
          </div>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div className="overflow-auto rounded-md border max-h-[70vh] shadow-cyan-500/20 shadow-2xl">
      <Table>
        <TableHeader>
          {renderTableHeaders()}
        </TableHeader>

        <TableBody>
          {isLoading ? (
            renderLoadingSkeleton()
          ) : data.length === 0 ? (
            renderNoDataMessage()
          ) : (
            renderTableRows()
          )}
        </TableBody>
      </Table>
    </div>
  );
}