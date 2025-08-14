import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import SupportTable from "../components/SupportTable";

// Function to normalize text for search
const normalizeText = (text) => {
  return text
    ?.normalize("NFKD")
    .toLowerCase()
    .trim();
};



export default function SupportGrants({ data, loading, t, language, theme }) {
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [sportFilter, setSportFilter] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  // Get unique years from data for filter dropdown
  const getUniqueYears = () => {
    const years = [...new Set(data.map(item => item.السنة))].sort((a, b) => b - a);
    return years;
  };

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

  // Calculate total grants and statistics
  const calculateStats = (dataSet) => {
    const totalGrants = dataSet.reduce((sum, item) => {
      const amount = parseFloat(item.المنحة.replace(/,/g, ''));
      return sum + amount;
    }, 0);
    
    const uniqueAssociations = new Set(dataSet.map(item => item['الجمعية المستفيدة'])).size;
    
    return {
      totalGrants: totalGrants.toLocaleString(),
      totalEntries: dataSet.length,
      uniqueAssociations
    };
  };

  useEffect(() => {
    setIsFiltering(true);
    
    const timeoutId = setTimeout(() => {
      let temp = data;

      // Search filter
      if (search) {
        const normalizedSearch = normalizeText(search);
        temp = temp.filter(row => {
          const associationName = normalizeText(row['الجمعية المستفيدة']);
          const year = row.السنة.toString();
          const amount = row.المنحة;

          return (
            associationName?.includes(normalizedSearch) ||
            year.includes(search) ||
            amount.includes(search)
          );
        });
      }

      // Year filter
      if (yearFilter) {
        temp = temp.filter(row => row.السنة.toString() === yearFilter);
      }

      // Sport type filter
      if (sportFilter) {
        temp = temp.filter(row => {
          const associationName = row['الجمعية المستفيدة'].toLowerCase();
          switch (sportFilter) {
            case "football":
              return associationName.includes('كرة القدم');
            case "handball":
              return associationName.includes('كرة اليد');
            case "basketball":
              return associationName.includes('كرة السلة');
            case "athletics":
              return associationName.includes('ألعاب القوى');
            case "cycling":
              return associationName.includes('دراجات') || associationName.includes('الدراجات');
            case "other":
              return !associationName.includes('كرة القدم') && 
                     !associationName.includes('كرة اليد') && 
                     !associationName.includes('كرة السلة') && 
                     !associationName.includes('ألعاب القوى');
            default:
              return true;
          }
        });
      }

      // Sort by year (descending) and then by grant amount (descending)
      temp.sort((a, b) => {
        if (a.السنة !== b.السنة) {
          return b.السنة - a.السنة;
        }
        const amountA = parseFloat(a.المنحة.replace(/,/g, ''));
        const amountB = parseFloat(b.المنحة.replace(/,/g, ''));
        return amountB - amountA;
      });

      setFilteredData(temp);
      setIsFiltering(false);
      setCurrentPage(1); // Reset to first page when filters change
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [search, yearFilter, sportFilter, data]);

  // Calculate paginated data
  const totalRows = filteredData.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (value) => {
    setRowsPerPage(Number(value));
    setCurrentPage(1);
  };

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
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

  // Calculate statistics for current filtered data
  const stats = calculateStats(filteredData);
  const allStats = calculateStats(data);

  return (
    <div style={language === 'ar' ? 
          { fontFamily: 'Noto Kufi Arabic, sans-serif', direction:'rtl' } : 
          { fontFamily: 'Inter, sans-serif', direction:'ltr' }
        }  className={`p-5 md:px-40 md:py-10 space-y-4 min-h-screen ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
      
      <h1 style={language === 'ar' ? { fontFamily: 'Noto Kufi Arabic, sans-serif', direction:'rtl' } : { fontFamily: 'Inter, sans-serif', direction:'ltr' }} className="text-center mb-5 md:mb-10 md:text-4xl">
        {t?.supportpage?.search_support_data || 'Search Sports Association Support Grants'}
      </h1>

      {/* Statistics Cards 
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h3 className="text-sm font-medium text-gray-500 mb-1">{t?.supportpage?.total_grants || 'Total Grants'}</h3>
          <p className="text-2xl font-bold text-green-600">{stats.totalGrants} DH</p>
          <p className="text-xs text-gray-400">{t?.supportpage?.from || 'from'} {stats.totalEntries} {t?.supportpage?.entries || 'entries'}</p>
        </div>
        <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h3 className="text-sm font-medium text-gray-500 mb-1">{t?.supportpage?.unique_associations || 'Unique Associations'}</h3>
          <p className="text-2xl font-bold text-blue-600">{stats.uniqueAssociations}</p>
          <p className="text-xs text-gray-400">{t?.supportpage?.different_orgs || 'different organizations'}</p>
        </div>
        <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h3 className="text-sm font-medium text-gray-500 mb-1">{t?.supportpage?.years_covered || 'Years Covered'}</h3>
          <p className="text-2xl font-bold text-purple-600">{getUniqueYears().length}</p>
          <p className="text-xs text-gray-400">2020 - 2024</p>
        </div>
      </div>
      */}

      <div className="flex flex-wrap gap-4 z-10">
        <Input
          type="text"
          placeholder={t?.supportpage?.search_input_placeholder || 'Search by association name, year, or amount'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2"
          dir="auto"
        />

        <Select onValueChange={(v) => setYearFilter(v === "all" ? "" : v)} defaultValue="all">
          <SelectTrigger className={`w-full sm:w-32 ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
            <SelectValue placeholder={t?.supportpage?.filter_by_year || "Filter by Year"} />
          </SelectTrigger>
          <SelectContent className={`${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
            <SelectItem className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} value="all">
              {t?.supportpage?.all_years || 'All Years'}
            </SelectItem>
            {getUniqueYears().map(year => (
              <SelectItem 
                key={year} 
                className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} 
                value={year.toString()}
              >
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(v) => setSportFilter(v === "all" ? "" : v)} defaultValue="all">
          <SelectTrigger className={`w-full sm:w-40 ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
            <SelectValue placeholder={t?.supportpage?.filter_by_sport || "Filter by Sport"} />
          </SelectTrigger>
          <SelectContent className={`${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
            <SelectItem className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} value="all">
              {t?.supportpage?.all_sports || 'All Sports'}
            </SelectItem>
            <SelectItem className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} value="football">
              {t?.supportpage?.football || 'Football'}
            </SelectItem>
            <SelectItem className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} value="handball">
              {t?.supportpage?.handball || 'Handball'}
            </SelectItem>
            <SelectItem className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} value="basketball">
              {t?.supportpage?.basketball || 'Basketball'}
            </SelectItem>
            <SelectItem className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} value="athletics">
              {t?.supportpage?.athletics || 'Athletics'}
            </SelectItem>
            <SelectItem className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} value="cycling">
              {t?.supportpage?.cycling || 'Cycling'}
            </SelectItem>
            <SelectItem className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} value="other">
              {t?.supportpage?.other || 'Other Sports'}
            </SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={handleRowsPerPageChange} defaultValue="15">
          <SelectTrigger className={`w-full sm:w-32 ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
            <SelectValue placeholder={t?.supportpage?.rows_per_page || "Rows per page"} />
          </SelectTrigger>
          <SelectContent className={`${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
            <SelectItem value="10" className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`}>10</SelectItem>
            <SelectItem value="15" className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`}>15</SelectItem>
            <SelectItem value="20" className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`}>20</SelectItem>
            <SelectItem value="50" className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`}>50</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results info */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {isFiltering ? (
            <span className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              {t?.supportpage?.filtering || 'Filtering...'}
            </span>
          ) : (
            `${t?.supportpage?.showing || 'Showing'} ${paginatedData.length} ${t?.supportpage?.of || 'of'} ${totalRows} ${t?.supportpage?.results || 'results'}${data.length > 0 ? ` ${t?.supportpage?.of || 'of'} ${data.length} ${t?.supportpage?.total || 'total'}` : ''}`
          )}
        </p>
        
      </div>
          <p className="text-xs text-red-500 text-center mt-2">
          <span>{t?.supportpage?.showAll || 'Total Grants'}</span> 
        </p>
      {/* The data table */}
      <SupportTable t={t} data={paginatedData} isLoading={isFiltering} theme={theme} language={language}/>

      {/* Data Source Credit */}
      <div className={`mt-4 p-4 text-center rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div>
            <p className="font-medium">
              {t?.supportpage?.data_source || 'Data Source'} : {t?.supportpage?.municipal_records || 'Municipal Records of Al Ksar Al Kabir'}
              {' - '} {t?.supportpage?.years_range || 'Years'}: 2020-2024
            </p>
            
          </div>
        </div>
      </div>

      {/* Pagination controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
        <Pagination className="mb-10">
          <PaginationContent>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
            />
            {getPageNumbers().map((page, index) => (
              <PaginationItem key={index} className="hover:cursor-pointer">
                {typeof page === "number" ? (
                  <PaginationLink
                    onClick={() => handlePageChange(page)}
                    isActive={currentPage === page}
                    className={currentPage === page ? 'bg-blue-600 text-white' : ''}
                  >
                    {page}
                  </PaginationLink>
                ) : (
                  <span className="px-2 py-1 text-gray-400">...</span>
                )}
              </PaginationItem>
            ))}
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationContent>
        </Pagination>
      </div>
      
    </div>
  );
}