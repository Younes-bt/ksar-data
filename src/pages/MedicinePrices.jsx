import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import MedicineTable from "../components/MedicineTable";

// Function to normalize text for search
const normalizeText = (text) => {
  return text
    ?.normalize("NFKD")
    .toLowerCase()
    .trim();
};

export default function MedicinePrices({ data, loading, t, language, theme }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [therapeuticClassFilter, setTherapeuticClassFilter] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  // Get unique therapeutic classes for filter
  const getUniqueTherapeuticClasses = () => {
    const classes = [...new Set(data.map(item => item.class_therapeutique).filter(Boolean))];
    return classes.sort();
  };

  useEffect(() => {
    setIsFiltering(true);
    
    const timeoutId = setTimeout(() => {
      let temp = data;

      // Search filter
      if (search) {
        const normalizedSearch = normalizeText(search);
        temp = temp.filter(row => {
          const specialite = normalizeText(row.specialite);
          const dosage = normalizeText(row.dosage);
          const forme = normalizeText(row.forme);
          const presentation = normalizeText(row.presentation);
          const therapeuticClass = normalizeText(row.class_therapeutique);

          return (
            specialite?.includes(normalizedSearch) ||
            dosage?.includes(normalizedSearch) ||
            forme?.includes(normalizedSearch) ||
            presentation?.includes(normalizedSearch) ||
            therapeuticClass?.includes(normalizedSearch)
          );
        });
      }

      // Status filter
      if (statusFilter) {
        temp = temp.filter(row => {
          switch (statusFilter) {
            case "commercialized":
              return row.statut_commercialisation === "Commercialisé";
            case "not_commercialized":
              return row.statut_commercialisation === "Non Commercialisé";
            default:
              return true;
          }
        });
      }

      // Type filter (based on form)
      if (typeFilter) {
        temp = temp.filter(row => {
          const forme = normalizeText(row.forme);
          switch (typeFilter) {
            case "tablet":
              return forme?.includes('comprimé') || forme?.includes('comprime');
            case "capsule":
              return forme?.includes('gélule') || forme?.includes('gelule') || forme?.includes('capsule');
            case "injection":
              return forme?.includes('injection') || forme?.includes('injectable');
            case "syrup":
              return forme?.includes('sirop') || forme?.includes('suspension');
            case "cream":
              return forme?.includes('crème') || forme?.includes('creme') || forme?.includes('pommade');
            case "drops":
              return forme?.includes('gouttes') || forme?.includes('collyre');
            default:
              return true;
          }
        });
      }

      // Therapeutic class filter
      if (therapeuticClassFilter) {
        temp = temp.filter(row => row.class_therapeutique === therapeuticClassFilter);
      }

      setFilteredData(temp);
      setIsFiltering(false);
      setCurrentPage(1); // Reset to first page when filters change
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [search, typeFilter, statusFilter, therapeuticClassFilter, data]);

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

  return (
    <div className={`p-5 md:px-40 md:py-10 space-y-4 min-h-screen ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
      
      <h1 style={language === 'ar' ? { fontFamily: 'Noto Kufi Arabic, sans-serif', direction:'rtl', fontSize:'2rem' } : { fontFamily: 'Inter, sans-serif', direction:'ltr', fontSize:'2rem' }} className="text-center mb-10">
        {t?.medicinepage?.search_medicine_data || 'Search Medicine Prices'}
      </h1>

      <div className="flex flex-wrap gap-4 z-10">
        <Input
          type="text"
          placeholder={t?.medicinepage?.search_input_placeholder || 'Search by medicine name, dosage, form, or therapeutic class'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2"
          dir="auto"
        />
        {/*
        <Select onValueChange={(v) => setStatusFilter(v === "all" ? "" : v)} defaultValue="all">
          <SelectTrigger className={`w-full sm:w-1/4 ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
            <SelectValue placeholder={t?.medicinepage?.filter_by_status || "Filter by Status"} />
          </SelectTrigger>
          <SelectContent className={`${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
            <SelectItem className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} value="all">
              {t?.medicinepage?.all_status || 'All Status'}
            </SelectItem>
            <SelectItem className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} value="commercialized">
              {t?.medicinepage?.commercialized || 'Available'}
            </SelectItem>
            <SelectItem className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} value="not_commercialized">
              {t?.medicinepage?.not_commercialized || 'Not Available'}
            </SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(v) => setTypeFilter(v === "all" ? "" : v)} defaultValue="all">
          <SelectTrigger className={`w-full sm:w-1/4 ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
            <SelectValue placeholder={t?.medicinepage?.filter_by_form || "Filter by Form"} />
          </SelectTrigger>
          <SelectContent className={`${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
            <SelectItem className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} value="all">
              {t?.medicinepage?.all_forms || 'All Forms'}
            </SelectItem>
            <SelectItem className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} value="tablet">
              {t?.medicinepage?.tablet || 'Tablets'}
            </SelectItem>
            <SelectItem className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} value="capsule">
              {t?.medicinepage?.capsule || 'Capsules'}
            </SelectItem>
            <SelectItem className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} value="injection">
              {t?.medicinepage?.injection || 'Injections'}
            </SelectItem>
            <SelectItem className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} value="syrup">
              {t?.medicinepage?.syrup || 'Syrups'}
            </SelectItem>
            <SelectItem className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} value="cream">
              {t?.medicinepage?.cream || 'Creams'}
            </SelectItem>
            <SelectItem className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} value="drops">
              {t?.medicinepage?.drops || 'Drops'}
            </SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(v) => setTherapeuticClassFilter(v === "all" ? "" : v)} defaultValue="all">
          <SelectTrigger className={`w-full sm:w-1/4 ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
            <SelectValue placeholder={t?.medicinepage?.filter_by_therapeutic_class || "Filter by Class"} />
          </SelectTrigger>
          <SelectContent className={`${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
            <SelectItem className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} value="all">
              {t?.medicinepage?.all_classes || 'All Classes'}
            </SelectItem>
            {getUniqueTherapeuticClasses().map((classItem) => (
              <SelectItem 
                key={classItem} 
                className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} 
                value={classItem}
              >
                {classItem}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        */}

        <Select onValueChange={handleRowsPerPageChange} defaultValue="15">
          <SelectTrigger className={`w-full sm:w-32 ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
            <SelectValue placeholder={t?.medicinepage?.rows_per_page || "Rows per page"} />
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
              {t?.medicinepage?.filtering || 'Filtering...'}
            </span>
          ) : (
            `${t?.medicinepage?.showing || 'Showing'} ${paginatedData.length} ${t?.medicinepage?.of || 'of'} ${totalRows} ${t?.medicinepage?.results || 'results'}${data.length > 0 ? ` ${t?.medicinepage?.of || 'of'} ${data.length} ${t?.medicinepage?.total || 'total'}` : ''}`
          )}
        </p>
      </div>

      {/* The data table */}
      <MedicineTable t={t} data={paginatedData} isLoading={isFiltering} theme={theme} language={language}/>

      {/* Data Source Credit */}
      <div className={`mt-4 p-4 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} text-center`}>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div>
            <p className="font-medium text-gray-500">
              {t?.medicinepage?.data_source || 'Data Source'} :{' '}
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                
              </a>
              
            </p>
            <p className="text-xs mt-1 text-gray-500">
              L'AGENCE MAROCAINE DES MEDICAMENTS ET DES PRODUITS DE SANTE (AMMPS) {' - '} {t?.medicinepage?.last_update || 'Last update'}: 04/08/2025
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