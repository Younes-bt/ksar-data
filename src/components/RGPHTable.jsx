import React, { useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function RGPHTable({ data, isLoading, t, theme, language, tableType = "part1" }) {
  // --- Helper Functions ---
  const formatNumber = (value) => {
    if (value === null || value === undefined) return '-';
    return value.toLocaleString(language === 'ar' ? 'ar-MA' : 'fr-FR');
  };

  // Helper function to translate theme/subject values
  const translateTheme = (themeValue) => {
    if (!t.subjects) return themeValue; // fallback if translations not available
    
    switch(themeValue) {
      case 'DEMOGRAPHIE':
        return t.subjects.demographie || themeValue;
      case 'ACTIVITE ECONOMIQUE':
        return t.subjects.activiteEconomique || themeValue;
      case 'EDUCATION':
        return t.subjects.education || themeValue;
      case 'EDUCATION ':
        return t.subjects.education || themeValue; // Handle the space variant
      case 'LANGUES MATERNELLES':
        return t.subjects.languesMaternelles || themeValue;
      case 'CONDITIONS D\'HABITAT':
        return t.subjects.conditionsHabitat || themeValue;
      default:
        return themeValue;
    }
  };

  const getThemeColor = (theme) => {
    const themeColors = {
        'DEMOGRAPHIE': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        'ACTIVITE ECONOMIQUE': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        'EDUCATION ': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
        'EDUCATION': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
        'LANGUES MATERNELLES': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
        'CONDITIONS D\'HABITAT': 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200'
    };
    return themeColors[theme] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  };

  // --- Data Grouping for Mobile View ---
  const groupedData = useMemo(() => {
    if (!data) return [];
    const groups = data.reduce((acc, row) => {
      const key = language === 'ar' ? row.ar_Indicateur : row.fr_Indicateur;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(row);
      return acc;
    }, {});
    // Sort years within each group, descending
    Object.values(groups).forEach(group => group.sort((a, b) => b.Année - a.Année));
    return Object.values(groups);
  }, [data, language]);

  // --- Sub-Components for Rendering ---

  // Renders the stats for a single year within a grouped card
  const YearDataBlock = ({ row }) => {
    const isHousingData = tableType === "part2";
    const isPercentage = (language === 'ar' ? row.ar_Indicateur : row.fr_Indicateur)?.includes('(%)');
    const blockStyle = `rounded-lg ${theme === 'dark' ? 'bg-gray-700 border border-gray-100' : 'bg-gray-100 border border-gray-950'}`;

    return (
        <div className="p-3 mt-2 border-t border-gray-200 dark:border-gray-700">
            <h4 className={`mb-2 font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>{row.Année}</h4>
            {isHousingData ? (
                 <div className={`p-3 text-center ${blockStyle}`}>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {formatNumber(row.Ensemble)}{isPercentage ? '%' : ''}
                    </div>
                    <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                        {t?.rgphpage?.total_value || 'القيمة الإجمالية'}
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-2 text-center">
                    <div className={`p-2 ${blockStyle}`}>
                        <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{formatNumber(row.Masculin)}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{formatNumber(row['Masculin (%)'])}{row['Masculin (%)'] ? '%' : ''}</div>
                    </div>
                    <div className={`p-2 ${blockStyle}`}>
                        <div className="text-lg font-bold text-pink-600 dark:text-pink-400">{formatNumber(row.Féminin)}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{formatNumber(row['Féminin (%)'])}{row['Féminin (%)'] ? '%' : ''}</div>
                    </div>
                    <div className={`p-2 ${blockStyle}`}>
                        <div className="text-lg font-bold text-green-600 dark:text-green-400">{formatNumber(row.Ensemble)}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{formatNumber(row['Ensemble (%)'])}{row['Ensemble (%)'] ? '%' : ''}</div>
                    </div>
                </div>
            )}
        </div>
    );
  };

  // The main card for a grouped indicator
  const GroupedMobileCard = ({ group }) => {
    const firstRow = group[0];
    const indicator = language === 'ar' ? firstRow.ar_Indicateur : firstRow.fr_Indicateur;

    return (
      <div className={`mb-3 rounded-lg border transition-all hover:shadow-lg ${
        theme === 'dark' ? 'bg-gray-800 border-gray-50 hover:border-cyan-400' : 'bg-white border-gray-500 hover:border-cyan-500'
      }`}>
        <div className="p-3">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getThemeColor(firstRow.Thème)}`}>
            {translateTheme(firstRow.Thème)}
          </span>
          <h3 className={`mt-2 font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`} title={indicator}>
            {indicator}
          </h3>
        </div>
        {group.map(row => <YearDataBlock key={row.Année} row={row} />)}
      </div>
    );
  };
  
  const renderMobileLoadingSkeleton = () => (
    Array.from({ length: 3 }).map((_, idx) => (
        <div key={`loading-card-${idx}`} className="p-3 mb-3 rounded-lg border bg-gray-50 dark:bg-gray-800 animate-pulse">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-3"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4"></div>
            {/* Year Block Skeleton */}
            <div className="p-3 mt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-2"></div>
                <div className="grid grid-cols-3 gap-2">
                    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                </div>
            </div>
             {/* Year Block Skeleton */}
             <div className="p-3 mt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-2"></div>
                <div className="grid grid-cols-3 gap-2">
                    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                </div>
            </div>
        </div>
    ))
  );

  const NoDataMessage = () => (
    <div className="text-center text-gray-500 dark:text-gray-400 py-8">
      <div className="text-4xl mb-2">📊</div>
      <p className="text-lg font-medium">{t?.rgphpage?.no_data || 'لا توجد بيانات مطابقة'}</p>
      <p className="text-sm">{t?.rgphpage?.adjust_filters || 'حاول تعديل مرشحات البحث'}</p>
    </div>
  );
  
  // --- Desktop Table ---
  const DesktopTable = () => {
    const columnCount = tableType === "part2" ? 4 : 9;
    const renderHeaders = () => {
        if (tableType === "part2") {
            return (
                <TableRow>
                    <TableHead className="text-xs">{t?.rgphpage?.year || 'السنة'}</TableHead>
                    <TableHead className="text-xs">{t?.rgphpage?.theme || 'الموضوع'}</TableHead>
                    <TableHead className="text-xs">{t?.rgphpage?.indicator || 'المؤشر'}</TableHead>
                    <TableHead className="text-right text-xs">{t?.rgphpage?.total_value || 'القيمة'}</TableHead>
                </TableRow>
            );
        }
        return (
            <TableRow>
                <TableHead className="text-xs text-center">{t?.rgphpage?.year || 'السنة'}</TableHead>
                <TableHead className="text-xs text-center">{t?.rgphpage?.theme || 'الموضوع'}</TableHead>
                <TableHead className="text-xs text-center">{t?.rgphpage?.indicator || 'المؤشر'}</TableHead>
                <TableHead className="text-right text-xs">{t?.rgphpage?.male_percent || 'ذكور (%)'}</TableHead>
                <TableHead className="text-right text-xs">{t?.rgphpage?.male_count || 'ذكور'}</TableHead>
                <TableHead className="text-right text-xs">{t?.rgphpage?.female_percent || 'إناث (%)'}</TableHead>
                <TableHead className="text-right text-xs">{t?.rgphpage?.female_count || 'إناث'}</TableHead>
                <TableHead className="text-right text-xs">{t?.rgphpage?.total_percent || 'المجموع (%)'}</TableHead>
                <TableHead className="text-right text-xs">{t?.rgphpage?.total_count || 'المجموع'}</TableHead>
            </TableRow>
        );
    };

    const renderRows = () => data.map((row, idx) => {
        const indicator = language === 'ar' ? row.ar_Indicateur : row.fr_Indicateur;
        const isPercentage = indicator?.includes('(%)');
        if (tableType === "part2") {
            return (
                <TableRow key={idx} className={`${theme === 'dark' ? 'hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`}>
                    <TableCell className="text-xs">{row.Année}</TableCell>
                    <TableCell><span className={`px-2 py-1 rounded-full text-xs font-medium ${getThemeColor(row.Thème)}`}>{translateTheme(row.Thème)}</span></TableCell>
                    <TableCell className="text-xs">{indicator}</TableCell>
                    <TableCell className="text-right font-mono font-semibold text-blue-600 text-xs">{formatNumber(row.Ensemble)}{isPercentage ? '%' : ''}</TableCell>
                </TableRow>
            );
        }
        return (
            <TableRow key={idx} className={`${theme === 'dark' ? 'hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`}>
                <TableCell className="text-xs">{row.Année}</TableCell>
                <TableCell><span className={`px-2 py-1 rounded-full text-xs font-medium ${getThemeColor(row.Thème)}`}>{translateTheme(row.Thème)}</span></TableCell>
                <TableCell className="text-xs">{indicator}</TableCell>
                <TableCell className="text-right font-mono text-xs">{formatNumber(row['Masculin (%)'])}{row['Masculin (%)'] ? '%' : ''}</TableCell>
                <TableCell className="text-right font-mono text-blue-600 text-xs">{formatNumber(row.Masculin)}</TableCell>
                <TableCell className="text-right font-mono text-xs">{formatNumber(row['Féminin (%)'])}{row['Féminin (%)'] ? '%' : ''}</TableCell>
                <TableCell className="text-right font-mono text-pink-600 text-xs">{formatNumber(row.Féminin)}</TableCell>
                <TableCell className="text-right font-mono font-semibold text-xs">{formatNumber(row['Ensemble (%)'])}{row['Ensemble (%)'] ? '%' : ''}</TableCell>
                <TableCell className="text-right font-mono font-semibold text-green-600 text-xs">{formatNumber(row.Ensemble)}</TableCell>
            </TableRow>
        );
    });
    
    const renderLoading = () => Array.from({ length: 5 }).map((_, idx) => (
        <TableRow key={`loading-${idx}`}>
            {Array.from({ length: columnCount }).map((_, colIdx) => (
                <TableCell key={colIdx}><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div></TableCell>
            ))}
        </TableRow>
    ));

    return (
        <div className="hidden lg:block overflow-auto rounded-md border max-h-[70vh] shadow-cyan-500/20 shadow-2xl">
            <Table>
                <TableHeader>{renderHeaders()}</TableHeader>
                <TableBody>
                    {isLoading ? renderLoading() : data.length === 0 ? <TableRow><TableCell colSpan={columnCount}><NoDataMessage /></TableCell></TableRow> : renderRows()}
                </TableBody>
            </Table>
        </div>
    );
  };


  return (
    <>
      {/* --- Mobile View --- */}
      <div className="block lg:hidden">
        {isLoading
          ? renderMobileLoadingSkeleton()
          : groupedData.length === 0
            ? <NoDataMessage />
            : groupedData.map((group, idx) => <GroupedMobileCard key={idx} group={group} />)
        }
      </div>

      {/* --- Desktop View --- */}
      <DesktopTable />
    </>
  );
}