import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import BudgetTable from "@/components/BudgetTable";
import GlobeBackground from '../components/GlobeBackground';

// Function to normalize text (handles Arabic diacritics and encoding)
const normalizeText = (text) => {
  return text
    ?.normalize("NFKD") // Decompose combined characters
    .replace(/[\u064B-\u065F\u06D6-\u06EF]/g, "") // Remove Arabic diacritics
    .toLowerCase()
    .trim();
};

export default function SearchPage({ data, loading, t, language, theme }) {
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  useEffect(() => {
    setIsFiltering(true);
    
    const timeoutId = setTimeout(() => {
      let temp = data;

      if (search) {
        const normalizedSearch = normalizeText(search);
        temp = temp.filter(row => {
          const frLabel = normalizeText(row.fr_label);
          const arLabel = normalizeText(row.ar_label);
          const code = row.code?.toLowerCase();
          const type = row.type?.toLowerCase();

          return (
            frLabel?.includes(normalizedSearch) ||
            arLabel?.includes(normalizedSearch) ||
            code?.includes(normalizedSearch) ||
            type?.includes(normalizedSearch)
          );
        });
      }

      if (yearFilter) {
        temp = temp.filter(row => String(row.year) === yearFilter);
      }
      if (typeFilter) temp = temp.filter(row => row.type === typeFilter);

      setFilteredData(temp);
      setIsFiltering(false);
      setCurrentPage(1); // Reset to first page when filters change
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [search, yearFilter, typeFilter, data]);

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
    setCurrentPage(1); // Reset to first page when rows per page changes
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

  return (
    <div className={`p-5 md:px-40 md:py-10 space-y-4 min-h-screen ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>

      
      <h1 style={language === 'ar' ? { fontFamily: 'Noto Kufi Arabic, sans-serif', direction:'rtl', fontSize:'2rem' } : { fontFamily: 'Inter, sans-serif', direction:'ltr', fontSize:'2rem' }} className="text-center mb-10">{t?.searchpage?.Search_Budget_Data || 'Search Budget Data'}</h1>

      <div className="flex flex-wrap gap-4 z-10">
        <Input
          type="text"
          placeholder={t?.searchpage?.Search_input_placeholder || 'Search by label, code, or type'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/3"
          dir="auto" // Automatically handle RTL for Arabic input
        />

        <Select onValueChange={(v) => setYearFilter(v === "all" ? "" : v)} defaultValue="all">
          <SelectTrigger className={`w-full sm:w-1/4 ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
            <SelectValue placeholder="Filter by Year" />
          </SelectTrigger>
          <SelectContent className={`${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
            <SelectItem value="all" className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`}>{t?.searchpage?.allyear || 'all years'}</SelectItem>
            <SelectItem value="2020" className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`}>2020</SelectItem>
            <SelectItem value="2021" className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`}>2021</SelectItem>
            <SelectItem value="2022" className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`}>2022</SelectItem>
            <SelectItem value="2023" className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`}>2023</SelectItem>
            <SelectItem value="2024" className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`}>2024</SelectItem>
            <SelectItem value="2025" className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`}>2025</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(v) => setTypeFilter(v === "all" ? "" : v)} defaultValue="all">
          <SelectTrigger className={`w-full sm:w-1/4 ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
            <SelectValue placeholder="Filter by Type" />
          </SelectTrigger>
          <SelectContent className={`${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
            <SelectItem className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} value="all">{t?.searchpage?.alltype || 'All types'}</SelectItem>
            <SelectItem className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} value="Crédits">{t?.searchpage?.credits || 'Crédits'}</SelectItem>
            <SelectItem className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} value="recettes">{t?.searchpage?.recettes || 'Recettes'}</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={handleRowsPerPageChange} defaultValue="10">
          <SelectTrigger className={`w-full sm:w-32 ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
            <SelectValue placeholder="Rows per page" />
          </SelectTrigger>
          <SelectContent className={`${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
            <SelectItem value="10" className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`}>10</SelectItem>
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
              Filtering...
            </span>
          ) : (
            `Showing ${paginatedData.length} of ${totalRows} results${data.length > 0 ? ` of ${data.length} total` : ''}`
          )}
        </p>
      </div>

      {/* The data table */}
      <BudgetTable t={t} data={paginatedData} isLoading={isFiltering} theme={theme} language={language}/>

      {/* Data Source Credit */}
      <div className={`mt-4 p-4 text-center rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div>
            <p className="font-medium">
              {t?.supportpage?.data_source || 'Data Source'} : {t?.supportpage?.municipal_records || 'Municipal Records of Al Ksar Al Kabir'}
              {' - '} 
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