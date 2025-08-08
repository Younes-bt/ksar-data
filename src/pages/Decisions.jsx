import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DecisionsTable from "../components/DecisionsTable";
import MembersVotingTable from "../components/MembersVotingTable";

// Function to normalize text for search
const normalizeText = (text) => {
  return text
    ?.normalize("NFKD")
    .toLowerCase()
    .trim();
};

export default function Decisions({ data, loading, t, language, theme }) {
  // State for decisions-based view
  const [search, setSearch] = useState("");
  const [decisionFilter, setDecisionFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  // State for member voting view
  const [memberSearch, setMemberSearch] = useState("");
  const [participationFilter, setParticipationFilter] = useState("");
  const [filteredMemberData, setFilteredMemberData] = useState([]);
  const [isMemberFiltering, setIsMemberFiltering] = useState(false);
  const [memberCurrentPage, setMemberCurrentPage] = useState(1);
  const [memberRowsPerPage, setMemberRowsPerPage] = useState(15);

  // Helper function to extract year and month from new date format
  const extractDateComponents = (dateString) => {
    if (dateString.includes('-')) {
      // New format: DD/MM/YYYY
      const [day, month, year] = dateString.split('-');
      return { year, month };
    } else if (dateString.includes(' ')) {
      // Old format: "04 ماي 2023"
      const parts = dateString.split(' ');
      const year = parts[2];
      const month = getMonthNumber(parts[1]);
      return { year, month };
    } else if (dateString.includes('-')) {
      // ISO format: YYYY-MM-DD
      const [year, month] = dateString.split('-');
      return { year, month };
    }
    return { year: '', month: '' };
  };

  // Process data for decisions view (flatten decisions)
  const flattenedData = data.map(decision => {
    const { year, month } = extractDateComponents(decision.date);
    return {
      ...decision,
      year,
      month
    };
  });

  // Get month number from Arabic month name
  function getMonthNumber(arabicMonth) {
    const monthMap = {
      'يناير': '01', 'فبراير': '02', 'مارس': '03', 'أبريل': '04',
      'مايو': '05', 'يونيو': '06', 'يوليو': '07', 'أغسطس': '08',
      'سبتمبر': '09', 'أكتوبر': '10', 'نوفمبر': '11', 'ديسمبر': '12',
      'نونبر': '11'
    };
    return monthMap[arabicMonth];
  }

  // Get month name from number
  const getMonthName = (monthNum) => {
    const months = {
      '01': 'يناير', '02': 'فبراير', '03': 'مارس', '04': 'أبريل',
      '05': 'مايو', '06': 'يونيو', '07': 'يوليو', '08': 'أغسطس',
      '09': 'سبتمبر', '10': 'أكتوبر', '11': 'نوفمبر', '12': 'ديسمبر'
    };
    return months[monthNum] || monthNum;
  };

  // Get unique years and months for filters
  const getUniqueYears = () => {
    const years = [...new Set(flattenedData.map(item => item.year).filter(Boolean))];
    return years.sort((a, b) => b - a);
  };

  const getUniqueMonths = () => {
    const months = [...new Set(flattenedData.map(item => item.month).filter(Boolean))];
    return months.sort();
  };

  // Helper function to get decision title based on language
  const getDecisionTitle = (decision) => {
    if (language === 'fr' && decision.title_fr) {
      return decision.title_fr;
    }
    if (language === 'en' && decision.title_en) {
      return decision.title_en;
    }
    return decision.title; // Default to Arabic
  };

  // Process voting data for members view
const processMemberVotingData = () => {
  const memberStats = {};

  data.forEach(decision => {
    // First, initialize all attendees (present members)
    decision.attendees?.forEach(memberName => {
      if (!memberStats[memberName]) {
        memberStats[memberName] = {
          name: memberName,
          totalParticipated: 0,
          totalAccepted: 0,
          totalRefused: 0,
          totalAbstained: 0,
          totalDecisions: 0,
          totalPresent: 0 // Track when they were present
        };
      }
      // Count as present for this decision
      memberStats[memberName].totalPresent++;
      memberStats[memberName].totalDecisions++;
    });

    // Process abstained members
    decision.abstained_members?.forEach(memberName => {
      if (memberStats[memberName]) {
        memberStats[memberName].totalAbstained++;
        memberStats[memberName].totalParticipated++; // Abstaining is still participation
      }
    });

    // Process refused members  
    decision.refused_members?.forEach(memberName => {
      if (memberStats[memberName]) {
        memberStats[memberName].totalRefused++;
        memberStats[memberName].totalParticipated++; // Refusing is participation
      }
    });

    // For accepted votes, we need to calculate:
    // Accepted = Present - Abstained - Refused
    decision.attendees?.forEach(memberName => {
      if (memberStats[memberName]) {
        const isAbstained = decision.abstained_members?.includes(memberName);
        const isRefused = decision.refused_members?.includes(memberName);
        
        if (!isAbstained && !isRefused) {
          // This member voted to accept
          memberStats[memberName].totalAccepted++;
          memberStats[memberName].totalParticipated++; // Accepting is participation
        }
      }
    });
  });

  return Object.values(memberStats).map(member => ({
    ...member,
    participationPercentage: data.length > 0 
      ? ((member.totalPresent / data.length) * 100).toFixed(1)
      : 0,
    acceptancePercentage: member.totalParticipated > 0 
      ? ((member.totalAccepted / member.totalParticipated) * 100).toFixed(1)
      : 0
  })).sort((a, b) => parseFloat(b.participationPercentage) - parseFloat(a.participationPercentage));
};

  const processedMemberData = processMemberVotingData();

  // Effect for decisions filtering
  useEffect(() => {
    setIsFiltering(true);
    
    const timeoutId = setTimeout(() => {
      let temp = flattenedData;

      if (search) {
        const normalizedSearch = normalizeText(search);
        temp = temp.filter(decision => {
          const title = normalizeText(getDecisionTitle(decision));
          const titleFr = normalizeText(decision.title_fr);
          const titleEn = normalizeText(decision.title_en);
          const decisionNumber = normalizeText(decision.decision_number);
          const date = normalizeText(decision.date);

          return (
            title?.includes(normalizedSearch) ||
            titleFr?.includes(normalizedSearch) ||
            titleEn?.includes(normalizedSearch) ||
            decisionNumber?.includes(normalizedSearch) ||
            date?.includes(normalizedSearch)
          );
        });
      }

      if (decisionFilter) {
        temp = temp.filter(decision => {
          switch (decisionFilter) {
            case "unanimous":
              return decision.voting.refused === 0 && decision.voting.abstained === 0;
            case "majority":
              return decision.voting.accepted > decision.voting.refused;
            case "contested":
              return decision.voting.refused > 0;
            case "abstained":
              return decision.voting.abstained > 0;
            default:
              return true;
          }
        });
      }

      if (yearFilter) {
        temp = temp.filter(decision => decision.year === yearFilter);
      }

      if (monthFilter) {
        temp = temp.filter(decision => decision.month === monthFilter);
      }

      setFilteredData(temp);
      setIsFiltering(false);
      setCurrentPage(1);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [search, decisionFilter, yearFilter, monthFilter, data, language]);

  // Effect for member filtering
  useEffect(() => {
    setIsMemberFiltering(true);
    
    const timeoutId = setTimeout(() => {
      let temp = processedMemberData;

      if (memberSearch) {
        const normalizedSearch = normalizeText(memberSearch);
        temp = temp.filter(member => {
          const name = normalizeText(member.name);
          return name?.includes(normalizedSearch);
        });
      }

      if (participationFilter) {
        temp = temp.filter(member => {
          const percentage = parseFloat(member.participationPercentage);
          switch (participationFilter) {
            case "high":
              return percentage >= 90;
            case "medium":
              return percentage >= 50 && percentage < 90;
            case "low":
              return percentage < 50;
            default:
              return true;
          }
        });
      }

      setFilteredMemberData(temp);
      setIsMemberFiltering(false);
      setMemberCurrentPage(1);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [memberSearch, participationFilter, data]);

  // Calculate paginated data for decisions
  const totalRows = filteredData.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Calculate paginated data for members
  const totalMemberRows = filteredMemberData.length;
  const totalMemberPages = Math.ceil(totalMemberRows / memberRowsPerPage);
  const paginatedMemberData = filteredMemberData.slice(
    (memberCurrentPage - 1) * memberRowsPerPage,
    memberCurrentPage * memberRowsPerPage
  );

  // Handle page change for decisions
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle page change for members
  const handleMemberPageChange = (page) => {
    if (page >= 1 && page <= totalMemberPages) {
      setMemberCurrentPage(page);
    }
  };

  // Handle rows per page change for decisions
  const handleRowsPerPageChange = (value) => {
    setRowsPerPage(Number(value));
    setCurrentPage(1);
  };

  // Handle rows per page change for members
  const handleMemberRowsPerPageChange = (value) => {
    setMemberRowsPerPage(Number(value));
    setMemberCurrentPage(1);
  };

  // Generate page numbers with ellipsis for decisions
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

  // Generate page numbers with ellipsis for members
  const getMemberPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    const siblingCount = Math.floor(maxPagesToShow / 2);

    if (totalMemberPages <= maxPagesToShow) {
      for (let i = 1; i <= totalMemberPages; i++) pageNumbers.push(i);
    } else {
      let leftSibling = Math.max(memberCurrentPage - siblingCount, 1);
      let rightSibling = Math.min(memberCurrentPage + siblingCount, totalMemberPages);

      if (memberCurrentPage - siblingCount <= 1) {
        rightSibling = Math.min(maxPagesToShow, totalMemberPages);
      }
      if (memberCurrentPage + siblingCount >= totalMemberPages) {
        leftSibling = Math.max(totalMemberPages - maxPagesToShow + 1, 1);
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

      if (rightSibling < totalMemberPages - 1) {
        if (rightSibling < totalMemberPages - 2) pageNumbers.push("...");
        pageNumbers.push(totalMemberPages);
      } else {
        for (let i = rightSibling + 1; i <= totalMemberPages; i++) pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  return (
    <div style={language === 'ar' ? 
          { fontFamily: 'Noto Kufi Arabic, sans-serif', direction:'rtl' } : 
          { fontFamily: 'Inter, sans-serif', direction:'ltr' }
        }  className={`p-5 md:px-40 md:py-10 space-y-4 min-h-screen ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>

      <h1 style={language === 'ar' ? { fontFamily: 'Noto Kufi Arabic, sans-serif', direction:'rtl', fontSize:'2rem' } : { fontFamily: 'Inter, sans-serif', direction:'ltr', fontSize:'2rem' }} className="text-center mb-10">
        {t?.decisionspage?.search_decisions_data || 'بيانات قرارات المجلس'}
      </h1>

      <Tabs defaultValue="decisions" className="w-full">
        <TabsList className={`grid w-full grid-cols-2 mb-5 tabs-list ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
          <TabsTrigger className="data-[state=active]:bg-blue-600 data-[state=active]:text-white cursor-pointer" value="decisions">{t?.decisionspage?.decisions_tab || 'القرارات'}</TabsTrigger>
          <TabsTrigger className="data-[state=active]:bg-blue-600 data-[state=active]:text-white cursor-pointer" value="members">{t?.membersvotingpage?.members_tab || 'الأعضاء'}</TabsTrigger>
        </TabsList>

        <TabsContent value="decisions">
          <div className="flex flex-wrap gap-4 z-10">
            <Input
              type="text"
              placeholder={t?.decisionspage?.search_input_placeholder || 'البحث بعنوان القرار، رقم القرار، أو التاريخ'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-1/2"
              dir="auto"
            />

            <Select onValueChange={(v) => setYearFilter(v === "all" ? "" : v)} defaultValue="all">
              <SelectTrigger className={`w-full sm:w-1/4 ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
                <SelectValue placeholder={t?.decisionspage?.filter_by_year || "تصفية حسب السنة"} />
              </SelectTrigger>
              <SelectContent className={`${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
                <SelectItem className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} value="all">
                  {t?.decisionspage?.all_years || 'جميع السنوات'}
                </SelectItem>
                {getUniqueYears().map((year) => (
                  <SelectItem 
                    key={year} 
                    className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} 
                    value={year}
                  >
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={handleRowsPerPageChange} defaultValue="15">
              <SelectTrigger className={`w-full sm:w-32 ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
                <SelectValue placeholder={t?.decisionspage?.rows_per_page || "عدد الصفوف"} />
              </SelectTrigger>
              <SelectContent className={`${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
                <SelectItem value="10" className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`}>10</SelectItem>
                <SelectItem value="15" className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`}>15</SelectItem>
                <SelectItem value="20" className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`}>20</SelectItem>
                <SelectItem value="50" className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`}>50</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-600">
              {isFiltering ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  {t?.decisionspage?.filtering || 'جاري التصفية...'}
                </span>
              ) : (
                `${t?.decisionspage?.showing || 'عرض'} ${paginatedData.length} ${t?.decisionspage?.of || 'من'} ${totalRows} ${t?.decisionspage?.results || 'نتيجة'}${flattenedData.length > 0 ? ` ${t?.decisionspage?.from_total || 'من أصل'} ${flattenedData.length} ${t?.decisionspage?.total || 'إجمالي'}` : ''}`
              )}
            </p>
          </div>
              <p className='text-red-500 text-sm text-center mb-2'>
                {t?.decisionspage?.click_for_details || 'اضغط على القرار لعرض التفاصيل'}
              </p>
          <DecisionsTable t={t} data={paginatedData} isLoading={isFiltering} theme={theme} language={language}/>

          {/* Data Source Credit */}
      <div className={`mt-4 p-4 text-center rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div>
            <p className="font-medium">
              {t?.supportpage?.data_source || 'Data Source'} : {t?.supportpage?.municipal_records || 'Municipal Records of Al Ksar Al Kabir'}
              {' - '} {t?.supportpage?.years_range || 'Years'}: 2020-2025
            </p>
            
          </div>
        </div>
      </div>

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
        </TabsContent>

        <TabsContent value="members">
          <div className="flex flex-wrap gap-4 z-10">
            <Input
              type="text"
              placeholder={t?.membersvotingpage?.search_input_placeholder || 'البحث باسم العضو'}
              value={memberSearch}
              onChange={(e) => setMemberSearch(e.target.value)}
              className="w-full sm:w-1/2"
              dir="auto"
            />

            <Select onValueChange={(v) => setParticipationFilter(v === "all" ? "" : v)} defaultValue="all">
              <SelectTrigger className={`w-full sm:w-1/4 ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
                <SelectValue placeholder={t?.membersvotingpage?.filter_by_participation || "تصفية حسب المشاركة"} />
              </SelectTrigger>
              <SelectContent className={`${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
                <SelectItem className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} value="all">
                  {t?.membersvotingpage?.all_participation_levels || 'جميع المستويات'}
                </SelectItem>
                <SelectItem className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} value="high">
                  {t?.membersvotingpage?.high_participation || 'مشاركة عالية (90%+)'}
                </SelectItem>
                <SelectItem className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} value="medium">
                  {t?.membersvotingpage?.medium_participation || 'مشاركة متوسطة (50-89%)'}
                </SelectItem>
                <SelectItem className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} value="low">
                  {t?.membersvotingpage?.low_participation || 'مشاركة منخفضة (<50%)'}
                </SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={handleMemberRowsPerPageChange} defaultValue="15">
              <SelectTrigger className={`w-full sm:w-32 ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
                <SelectValue placeholder={t?.membersvotingpage?.rows_per_page || "عدد الصفوف"} />
              </SelectTrigger>
              <SelectContent className={`${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
                <SelectItem value="10" className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`}>10</SelectItem>
                <SelectItem value="15" className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`}>15</SelectItem>
                <SelectItem value="20" className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`}>20</SelectItem>
                <SelectItem value="50" className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`}>50</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between mt-4 mb-4">
            <p className="text-sm text-gray-600">
              {isMemberFiltering ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  {t?.membersvotingpage?.filtering || 'جاري التصفية...'}
                </span>
              ) : (
                `${t?.membersvotingpage?.showing || 'عرض'} ${paginatedMemberData.length} ${t?.membersvotingpage?.of || 'من'} ${totalMemberRows} ${t?.membersvotingpage?.results || 'نتيجة'}${processedMemberData.length > 0 ? ` ${t?.membersvotingpage?.from_total || 'من أصل'} ${processedMemberData.length} ${t?.membersvotingpage?.total || 'عضو'}` : ''}`
              )}
            </p>
          </div>

          <MembersVotingTable t={t} data={paginatedMemberData} isLoading={isMemberFiltering} theme={theme} language={language}/>

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
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
            <Pagination className="mb-10">
              <PaginationContent>
                <PaginationPrevious
                  onClick={() => handleMemberPageChange(memberCurrentPage - 1)}
                  className={memberCurrentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                />
                {getMemberPageNumbers().map((page, index) => (
                  <PaginationItem key={index} className="hover:cursor-pointer">
                    {typeof page === "number" ? (
                      <PaginationLink
                        onClick={() => handleMemberPageChange(page)}
                        isActive={memberCurrentPage === page}
                        className={memberCurrentPage === page ? 'bg-blue-600 text-white' : ''}
                      >
                        {page}
                      </PaginationLink>
                    ) : (
                      <span className="px-2 py-1 text-gray-400">...</span>
                    )}
                  </PaginationItem>
                ))}
                <PaginationNext
                  onClick={() => handleMemberPageChange(memberCurrentPage + 1)}
                  className={memberCurrentPage === totalMemberPages ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationContent>
            </Pagination>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}