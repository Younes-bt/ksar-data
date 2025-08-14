import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";
// MODIFIED: Import PaginationEllipsis
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import RGPHTable from "@/components/RGPHTable";

// Function to normalize text (handles Arabic diacritics and encoding)
const normalizeText = (text) => {
  return text
    ?.normalize("NFKD") // Decompose combined characters
    .replace(/[\u064B-\u065F\u06D6-\u06EF]/g, "") // Remove Arabic diacritics
    .toLowerCase()
    .trim();
};

export default function RgphPage({ data, loading, t, language, theme }) {
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [themeFilter, setThemeFilter] = useState("");
  const [filteredPart1Data, setFilteredPart1Data] = useState([]);
  const [filteredPart2Data, setFilteredPart2Data] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [currentPage1, setCurrentPage1] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const themeClasses = {
    bg: theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50',
    cardBg: theme === 'dark' ? 'bg-gray-900' : 'bg-white',
    borderColor: theme === 'dark' ? 'border-gray-800' : 'border-gray-200',
    textPrimary: theme === 'dark' ? 'text-white' : 'text-gray-900',
    textSecondary: theme === 'dark' ? 'text-gray-400' : 'text-gray-600',
    textAccent: theme === 'dark' ? 'text-blue-400' : 'text-blue-600',
    gradientFrom: theme === 'dark' ? 'from-blue-600' : 'from-blue-500',
    gradientTo: theme === 'dark' ? 'to-purple-600' : 'to-purple-500'
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

  // Separate data into part1 (with gender columns) and part2 (without gender columns)
  const part1Data = data.filter(row => row.Masculin !== undefined || row.Féminin !== undefined);
  const part2Data = data.filter(row => row.Masculin === undefined && row.Féminin === undefined);

  // Get unique years and themes from combined data
  const uniqueYears = [...new Set(data.map(row => row.Année))].sort((a, b) => b - a);
  const uniqueThemes = [...new Set(data.map(row => row.Thème))].sort();

  useEffect(() => {
    setIsFiltering(true);
    
    const timeoutId = setTimeout(() => {
      let tempPart1 = part1Data;
      let tempPart2 = part2Data;

      // Apply search filter
      if (search) {
        const normalizedSearch = normalizeText(search);
        
        tempPart1 = tempPart1.filter(row => {
          const frIndicateur = normalizeText(row.fr_Indicateur);
          const arIndicateur = normalizeText(row.ar_Indicateur);
          const theme = normalizeText(row.Thème);

          return (
            frIndicateur?.includes(normalizedSearch) ||
            arIndicateur?.includes(normalizedSearch) ||
            theme?.includes(normalizedSearch)
          );
        });

        tempPart2 = tempPart2.filter(row => {
          const frIndicateur = normalizeText(row.fr_Indicateur);
          const arIndicateur = normalizeText(row.ar_Indicateur);
          const theme = normalizeText(row.Thème);

          return (
            frIndicateur?.includes(normalizedSearch) ||
            arIndicateur?.includes(normalizedSearch) ||
            theme?.includes(normalizedSearch)
          );
        });
      }

      // Apply year filter
      if (yearFilter) {
        tempPart1 = tempPart1.filter(row => String(row.Année) === yearFilter);
        tempPart2 = tempPart2.filter(row => String(row.Année) === yearFilter);
      }

      // Apply theme filter
      if (themeFilter) {
        tempPart1 = tempPart1.filter(row => row.Thème === themeFilter);
        tempPart2 = tempPart2.filter(row => row.Thème === themeFilter);
      }

      setFilteredPart1Data(tempPart1);
      setFilteredPart2Data(tempPart2);
      setIsFiltering(false);
      setCurrentPage1(1); // Reset to first page when filters change
      setCurrentPage2(1); // Reset to first page when filters change
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [search, yearFilter, themeFilter, data]);

  // Calculate paginated data for both tables
  const totalRows1 = filteredPart1Data.length;
  const totalPages1 = Math.ceil(totalRows1 / rowsPerPage);
  const paginatedData1 = filteredPart1Data.slice(
    (currentPage1 - 1) * rowsPerPage,
    currentPage1 * rowsPerPage
  );

  const totalRows2 = filteredPart2Data.length;
  const totalPages2 = Math.ceil(totalRows2 / rowsPerPage);
  const paginatedData2 = filteredPart2Data.slice(
    (currentPage2 - 1) * rowsPerPage,
    currentPage2 * rowsPerPage
  );

  // Handle page change for table 1
  const handlePageChange1 = (page) => {
    if (page >= 1 && page <= totalPages1) {
      setCurrentPage1(page);
    }
  };

  // Handle page change for table 2
  const handlePageChange2 = (page) => {
    if (page >= 1 && page <= totalPages2) {
      setCurrentPage2(page);
    }
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (value) => {
    setRowsPerPage(Number(value));
    setCurrentPage1(1); // Reset to first page when rows per page changes
    setCurrentPage2(1); // Reset to first page when rows per page changes
  };

  // Generate page numbers with ellipsis
  const getPageNumbers = (currentPage, totalPages) => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    const siblingCount = Math.floor(maxPagesToShow / 2);

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      let leftSibling = Math.max(currentPage - siblingCount, 1);
      let rightSibling = Math.min(currentPage + siblingCount, totalPages);

      if (currentPage - siblingCount <= 1) {
        rightSibling = Math.min(maxPagesToShow, totalPages);
      }
      if (currentPage + siblingCount >= totalPages) {
        leftSibling = Math.max(totalPages - maxPagesToShow + 1, 1);
      }

      if (leftSibling > 2) {
        pageNumbers.push(1);
        if (leftSibling > 3) pageNumbers.push("...");
        else pageNumbers.push(2);
      } else {
        for (let i = 1; i < leftSibling; i++) pageNumbers.push(i);
      }

      for (let i = leftSibling; i <= rightSibling; i++) {
        pageNumbers.push(i);
      }

      if (rightSibling < totalPages - 1) {
        if (rightSibling < totalPages - 2) pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else {
        for (let i = rightSibling + 1; i <= totalPages; i++) pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  // MODIFIED: Pagination component updated for i18n
  const PaginationComponent = ({ currentPage, totalPages, onPageChange, tableId, t, language }) => (
    <Pagination className="mb-10">
      <PaginationContent className={language === 'ar' ? 'flex-row-reverse' : ''}>
        <PaginationPrevious
          onClick={() => onPageChange(currentPage - 1)}
          className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
          label={t?.rgphpage?.previous || 'Previous'}
          dir={language === 'ar' ? 'rtl' : 'ltr'}
        />
        {getPageNumbers(currentPage, totalPages).map((page, index) => (
          <PaginationItem key={`${tableId}-${index}`} style={{cursor: 'pointer'}}>
            {typeof page === "number" ? (
              <PaginationLink
                onClick={() => onPageChange(page)}
                isActive={currentPage === page}
                className={currentPage === page ? 'bg-blue-600 text-white' : ''}
              >
                {page}
              </PaginationLink>
            ) : (
              <PaginationEllipsis label={t?.rgphpage?.more_pages || 'More pages'} />
            )}
          </PaginationItem>
        ))}
        <PaginationNext
          onClick={() => onPageChange(currentPage + 1)}
          className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
          label={t?.rgphpage?.next || 'Next'}
          dir={language === 'ar' ? 'rtl' : 'ltr'}
        />
      </PaginationContent>
    </Pagination>
  );

  return (
    <div style={language === 'ar' ? 
          { fontFamily: 'Noto Kufi Arabic, sans-serif', direction:'rtl' } : 
          { fontFamily: 'Inter, sans-serif', direction:'ltr' }
        }  className={`p-5 md:px-40 md:py-10 space-y-4 min-h-screen ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
      <h1 
        style={language === 'ar' ? 
          { fontFamily: 'Noto Kufi Arabic, sans-serif', direction:'rtl' } : 
          { fontFamily: 'Inter, sans-serif', direction:'ltr' }
        } 
        className="text-center mb-10 text-md sm:text-3xl"
      >
        {t?.rgphpage?.Search_RGPH_Data || 'البحث في بيانات الإحصاء العام للسكان والسكنى' || 'Search RGPH Data'}
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 z-10">
        <Input
          type="text"
          placeholder={t?.rgphpage?.Search_input_placeholder || 'البحث بالمؤشر أو الموضوع' || 'Search by indicator or theme'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/3"
          dir="auto" // Automatically handle RTL for Arabic input
        />

        <Select onValueChange={(v) => setYearFilter(v === "all" ? "" : v)} defaultValue="all">
          <SelectTrigger className={`w-full sm:w-1/4 ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
            <SelectValue placeholder={t?.rgphpage?.filter_by_year || 'تصفية حسب السنة' || 'Filter by Year'} />
          </SelectTrigger>
          <SelectContent className={`${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
            <SelectItem value="all" className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`}>
              {t?.rgphpage?.all_years || 'جميع السنوات' || 'All years'}
            </SelectItem>
            {uniqueYears.map(year => (
              <SelectItem 
                key={year} 
                value={String(year)} 
                className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`}
              >
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(v) => setThemeFilter(v === "all" ? "" : v)} defaultValue="all">
          <SelectTrigger className={`w-full sm:w-1/4 ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
            <SelectValue placeholder={t?.rgphpage?.filter_by_theme || 'تصفية حسب الموضوع' || 'Filter by Theme'} />
          </SelectTrigger>
          <SelectContent className={`${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
            <SelectItem value="all" className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`}>
              {t?.rgphpage?.all_themes || 'جميع المواضيع' || 'All themes'}
            </SelectItem>
            {uniqueThemes.map(themeItem => (
              <SelectItem 
                key={themeItem} 
                value={themeItem} 
                className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`}
              >
                {translateTheme(themeItem)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Rows per page selector */}
        <Select onValueChange={handleRowsPerPageChange} defaultValue="15">
          <SelectTrigger className={`w-full sm:w-32 ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
            <SelectValue placeholder={t?.rgphpage?.rows_per_page || 'صفوف لكل صفحة' || 'Rows per page'} />
          </SelectTrigger>
          <SelectContent className={`${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
            <SelectItem value="10" className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`}>10</SelectItem>
            <SelectItem value="15" className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`}>15</SelectItem>
            <SelectItem value="20" className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`}>20</SelectItem>
            <SelectItem value="50" className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`}>50</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table 1: Demographic and socioeconomic data (with gender breakdown) */}
      {totalRows1 > 0 && (
        <div className="space-y-4">
          <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {language === 'ar' ? 'البيانات الديموغرافية والاجتماعية الاقتصادية' : 'Demographic and Socioeconomic Data'}
          </h2>
          
          {/* Results info for table 1 */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {isFiltering ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  {t?.rgphpage?.filtering || 'جاري التصفية...' || 'Filtering...'}
                </span>
              ) : (
                `${t?.rgphpage?.showing || 'عرض'} ${paginatedData1.length} ${t?.rgphpage?.of || 'من'} ${totalRows1} ${t?.rgphpage?.results || 'نتيجة'}`
              )}
            </p>
          </div>

          <RGPHTable t={t} data={paginatedData1} isLoading={isFiltering} theme={theme} language={language} tableType="part1"/>

          {/* MODIFIED: Pagination for table 1 */}
          {totalPages1 > 1 && (
            <PaginationComponent 
              currentPage={currentPage1} 
              totalPages={totalPages1} 
              onPageChange={handlePageChange1}
              tableId="table1"
              t={t}
              language={language}
            />
          )}
        </div>
      )}

      {/* Table 2: Housing conditions data (without gender breakdown) */}
      {totalRows2 > 0 && (
        <div className="space-y-4 mt-8">
          <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {language === 'ar' ? 'بيانات ظروف السكن' : 'Housing Conditions Data'}
          </h2>
          
          {/* Results info for table 2 */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {isFiltering ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  {t?.rgphpage?.filtering || 'جاري التصفية...' || 'Filtering...'}
                </span>
              ) : (
                `${t?.rgphpage?.showing || 'عرض'} ${paginatedData2.length} ${t?.rgphpage?.of || 'من'} ${totalRows2} ${t?.rgphpage?.results || 'نتيجة'}`
              )}
            </p>
          </div>

          <RGPHTable t={t} data={paginatedData2} isLoading={isFiltering} theme={theme} language={language} tableType="part2"/>

          {/* MODIFIED: Pagination for table 2 */}
          {totalPages2 > 1 && (
            <PaginationComponent 
              currentPage={currentPage2} 
              totalPages={totalPages2} 
              onPageChange={handlePageChange2}
              tableId="table2"
              t={t}
              language={language}
            />
          )}
        </div>
      )}
      {/* Data Source Credit */}
      <div className={`mt-4 p-4 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div>
            <p className="font-medium">
              {t?.medicinepage?.data_source || 'Data Source'} :{' '}
              <a
                href="https://www.hcp.ma/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                hcp.ma (Haut-Commissariat au Plan)
              </a>
              {' - '} {t?.medicinepage?.last_update || 'Last update'}: 27/7/2025
            </p>
            <p className="text-xs mt-1">
              
            </p>
          </div>
        </div>
      </div>
      
      {/* No data message */}
      {totalRows1 === 0 && totalRows2 === 0 && !isFiltering && (
        <div className="text-center text-gray-500 py-8">
          <div className="flex flex-col items-center gap-2">
            <div className="text-4xl">📊</div>
            <p className="text-lg font-medium">
              {t?.rgphpage?.no_data || 'لا توجد بيانات مطابقة' || 'No matching data found'}
            </p>
            <p className="text-sm">
              {t?.rgphpage?.adjust_filters || 'حاول تعديل مرشحات البحث' || 'Try adjusting your search filters'}
            </p>
          </div>
        </div>
      )}
      
    </div>
  );
}