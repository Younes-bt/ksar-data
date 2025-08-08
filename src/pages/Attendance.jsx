import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AttendanceTable from "../components/AttendanceTable";
import PersonsAttendanceTable from "../components/PersonsAttendanceTable";

// Function to normalize text for search
const normalizeText = (text) => {
  return text
    ?.normalize("NFKD")
    .toLowerCase()
    .trim();
};

export default function Attendance({ data, loading, t, language, theme }) {
  // State for session-based view (Attendance)
  const [search, setSearch] = useState("");
  const [sessionTypeFilter, setSessionTypeFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  // State for person-based view (PersonsAttendance)
  const [personSearch, setPersonSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [attendanceFilter, setAttendanceFilter] = useState("");
  const [filteredPersonData, setFilteredPersonData] = useState([]);
  const [isPersonFiltering, setIsPersonFiltering] = useState(false);
  const [personCurrentPage, setPersonCurrentPage] = useState(1);
  const [personRowsPerPage, setPersonRowsPerPage] = useState(15);

  // Flatten sessions data for session-based view
  const flattenedData = data.flatMap(file => 
    file.sessions.map(session => ({
      ...session,
      file: file.file,
      year: session.date.split('-')[0],
      month: session.date.split('-')[1]
    }))
  );

  // Get unique years and months for session filters
  const getUniqueYears = () => {
    const years = [...new Set(flattenedData.map(item => item.year))];
    return years.sort((a, b) => b - a);
  };

  const getUniqueMonths = () => {
    const months = [...new Set(flattenedData.map(item => item.month))];
    return months.sort();
  };

  const getMonthName = (monthNum) => {
    const months = {
      '01': 'يناير', '02': 'فبراير', '03': 'مارس', '04': 'أبريل',
      '05': 'مايو', '06': 'يونيو', '07': 'يوليو', '08': 'أغسطس',
      '09': 'سبتمبر', '10': 'أكتوبر', '11': 'نوفمبر', '12': 'ديسمبر'
    };
    return months[monthNum] || monthNum;
  };

  // Process attendance data for person-based view
  const processAttendanceData = () => {
  const personStats = {};
  
  // Sort data chronologically by extracting dates from sessions
  const sortedData = data.sort((a, b) => {
    const getLatestDate = (file) => {
      const dates = file.sessions.map(session => new Date(session.date));
      return Math.max(...dates);
    };
    return getLatestDate(a) - getLatestDate(b);
  });
  
  // Process each file and session
  sortedData.forEach(file => {
    file.sessions.forEach(session => {
      const sessionDate = new Date(session.date);
      
      // Helper function to update person stats
      const updatePersonStats = (person, status) => {
        if (!personStats[person.name]) {
          personStats[person.name] = {
            name: person.name,
            currentRole: person.role,
            totalPresent: 0,
            totalAbsentWithReason: 0,
            totalAbsentWithoutReason: 0,
            totalSessions: 0,
            sessionHistory: [],
            roleHistory: []
          };
        }
        
        const personStat = personStats[person.name];
        
        // Track role changes
        const lastRole = personStat.roleHistory.length > 0 
          ? personStat.roleHistory[personStat.roleHistory.length - 1].role 
          : null;
          
        if (lastRole !== person.role) {
          personStat.roleHistory.push({
            role: person.role,
            startDate: session.date,
            sessionDate: sessionDate
          });
        }
        
        // Update current role to most recent
        personStat.currentRole = person.role;
        
        // Update attendance stats
        if (status === 'present') {
          personStat.totalPresent++;
        } else if (status === 'absent_with_reason') {
          personStat.totalAbsentWithReason++;
        } else if (status === 'absent_without_reason') {
          personStat.totalAbsentWithoutReason++;
        }
        
        personStat.totalSessions++;
        
        // Add to session history
        personStat.sessionHistory.push({
          date: session.date,
          role: person.role,
          status: status,
          sessionType: session.session_type,
          sessionNumber: session.session_number
        });
      };
      
      // Process attendees
      session.attendees?.forEach(person => {
        updatePersonStats(person, 'present');
      });
      
      // Process absentees with reason
      session.absentees_with_reason?.forEach(person => {
        updatePersonStats(person, 'absent_with_reason');
      });
      
      // Process absentees without reason
      session.absentees_without_reason?.forEach(person => {
        updatePersonStats(person, 'absent_without_reason');
      });
    });
  });
  
  // Calculate attendance percentages and finalize data
  const processedData = Object.values(personStats).map(person => {
    const attendancePercentage = person.totalSessions > 0 
      ? ((person.totalPresent / person.totalSessions) * 100).toFixed(1)
      : '0.0';
    
    // Determine if there was a role change
    const hasRoleChange = person.roleHistory.length > 1;
    
    return {
      name: person.name,
      role: person.currentRole, // Current/latest role
      totalPresent: person.totalPresent,
      totalAbsentWithReason: person.totalAbsentWithReason,
      totalAbsentWithoutReason: person.totalAbsentWithoutReason,
      totalSessions: person.totalSessions,
      attendancePercentage: attendancePercentage,
      sessionHistory: person.sessionHistory,
      roleHistory: person.roleHistory,
      hasRoleChange: hasRoleChange,
      // Additional info for display
      firstRole: person.roleHistory.length > 0 ? person.roleHistory[0].role : person.currentRole,
      roleChangeInfo: hasRoleChange ? {
        from: person.roleHistory[0].role,
        to: person.roleHistory[person.roleHistory.length - 1].role,
        changeDate: person.roleHistory[1]?.startDate || null
      } : null
    };
  });
  
  // Sort by attendance percentage (descending)
  return processedData.sort((a, b) => 
    parseFloat(b.attendancePercentage) - parseFloat(a.attendancePercentage)
  );
};

  const processedData = processAttendanceData();

  // Get unique roles for person filter
  const getUniqueRoles = () => {
    const roles = [...new Set(processedData.map(item => item.role).filter(Boolean))];
    return roles.sort();
  };

  // Effect for session-based filtering
  useEffect(() => {
    setIsFiltering(true);
    
    const timeoutId = setTimeout(() => {
      let temp = flattenedData;

      if (search) {
        const normalizedSearch = normalizeText(search);
        temp = temp.filter(session => {
          const sessionType = normalizeText(session.session_type);
          const sessionNumber = normalizeText(session.session_number);
          const date = normalizeText(session.date);
          const file = normalizeText(session.file);

          return (
            sessionType?.includes(normalizedSearch) ||
            sessionNumber?.includes(normalizedSearch) ||
            date?.includes(normalizedSearch) ||
            file?.includes(normalizedSearch)
          );
        });
      }

      if (sessionTypeFilter) {
        temp = temp.filter(session => {
          switch (sessionTypeFilter) {
            case "normal":
              return session.session_type === "عادية";
            case "exceptional":
              return session.session_type === "استثنائية";
            default:
              return true;
          }
        });
      }

      if (yearFilter) {
        temp = temp.filter(session => session.year === yearFilter);
      }

      if (monthFilter) {
        temp = temp.filter(session => session.month === monthFilter);
      }

      setFilteredData(temp);
      setIsFiltering(false);
      setCurrentPage(1);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [search, sessionTypeFilter, yearFilter, monthFilter, data]);

  // Effect for person-based filtering
  useEffect(() => {
    setIsPersonFiltering(true);
    
    const timeoutId = setTimeout(() => {
      let temp = processedData;

      if (personSearch) {
        const normalizedSearch = normalizeText(personSearch);
        temp = temp.filter(person => {
          const name = normalizeText(person.name);
          const role = normalizeText(person.role);

          return (
            name?.includes(normalizedSearch) ||
            role?.includes(normalizedSearch)
          );
        });
      }

      if (roleFilter) {
        temp = temp.filter(person => person.role === roleFilter);
      }

      if (attendanceFilter) {
        temp = temp.filter(person => {
          const percentage = parseFloat(person.attendancePercentage);
          switch (attendanceFilter) {
            case "excellent":
              return percentage >= 90;
            case "good":
              return percentage >= 75 && percentage < 90;
            case "average":
              return percentage >= 50 && percentage < 75;
            case "poor":
              return percentage < 50;
            default:
              return true;
          }
        });
      }

      setFilteredPersonData(temp);
      setIsPersonFiltering(false);
      setPersonCurrentPage(1);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [personSearch, roleFilter, attendanceFilter, data]);

  // Calculate paginated data for sessions
  const totalRows = filteredData.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Calculate paginated data for persons
  const totalPersonRows = filteredPersonData.length;
  const totalPersonPages = Math.ceil(totalPersonRows / personRowsPerPage);
  const paginatedPersonData = filteredPersonData.slice(
    (personCurrentPage - 1) * personRowsPerPage,
    personCurrentPage * personRowsPerPage
  );

  // Handle page change for sessions
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle page change for persons
  const handlePersonPageChange = (page) => {
    if (page >= 1 && page <= totalPersonPages) {
      setPersonCurrentPage(page);
    }
  };

  // Handle rows per page change for sessions
  const handleRowsPerPageChange = (value) => {
    setRowsPerPage(Number(value));
    setCurrentPage(1);
  };

  // Handle rows per page change for persons
  const handlePersonRowsPerPageChange = (value) => {
    setPersonRowsPerPage(Number(value));
    setPersonCurrentPage(1);
  };

  // Generate page numbers with ellipsis for sessions
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

  // Generate page numbers with ellipsis for persons
  const getPersonPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    const siblingCount = Math.floor(maxPagesToShow / 2);

    if (totalPersonPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPersonPages; i++) pageNumbers.push(i);
    } else {
      let leftSibling = Math.max(personCurrentPage - siblingCount, 1);
      let rightSibling = Math.min(personCurrentPage + siblingCount, totalPersonPages);

      if (personCurrentPage - siblingCount <= 1) {
        rightSibling = Math.min(maxPagesToShow, totalPersonPages);
      }
      if (personCurrentPage + siblingCount >= totalPersonPages) {
        leftSibling = Math.max(totalPersonPages - maxPagesToShow + 1, 1);
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

      if (rightSibling < totalPersonPages - 1) {
        if (rightSibling < totalPersonPages - 2) pageNumbers.push("...");
        pageNumbers.push(totalPersonPages);
      } else {
        for (let i = rightSibling + 1; i <= totalPersonPages; i++) pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  <style jsx>{`
  [data-state="active"] {
    background-color: #2563eb !important; /* Blue background for active tab */
    color: #ffffff !important; /* White text for active tab */
  }
  [data-state="active"]:hover {
    background-color: #1e40af !important; /* Slightly darker blue on hover */
  }
  .tabs-list {
    border-radius: 0.375rem; /* Optional: Match Shadcn's default border radius */
  }
`}</style>

  return (
    <div style={language === 'ar' ? 
          { fontFamily: 'Noto Kufi Arabic, sans-serif', direction:'rtl' } : 
          { fontFamily: 'Inter, sans-serif', direction:'ltr' }
        }  className={`p-5 md:px-40 md:py-10 space-y-4 min-h-screen ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
      <h1 style={language === 'ar' ? { fontFamily: 'Noto Kufi Arabic, sans-serif', direction:'rtl', fontSize:'2rem' } : { fontFamily: 'Inter, sans-serif', direction:'ltr', fontSize:'2rem' }} className="text-center mb-10">
        {t?.attendancepage?.search_attendance_data || 'بيانات حضور الجلسات'}
      </h1>

      <Tabs defaultValue="sessions" className="w-full ">
        <TabsList className={`grid w-full grid-cols-2 mb-5 tabs-list ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
          <TabsTrigger className="data-[state=active]:bg-blue-600 data-[state=active]:text-white cursor-pointer" value="sessions">{t?.attendancepage?.sessions_tab || 'الجلسات'}</TabsTrigger>
          <TabsTrigger className="data-[state=active]:bg-blue-600 data-[state=active]:text-white cursor-pointer" value="persons">{t?.personsattendancepage?.persons_tab || 'الأعضاء'}</TabsTrigger>
        </TabsList>

        <TabsContent value="sessions">
          <div className="flex flex-wrap gap-4 z-10">
            <Input
              type="text"
              placeholder={t?.attendancepage?.search_input_placeholder || 'البحث بنوع الجلسة، التاريخ، أو رقم الجلسة'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-1/2"
              dir="auto"
            />

            <Select onValueChange={(v) => setSessionTypeFilter(v === "all" ? "" : v)} defaultValue="all">
              <SelectTrigger className={`w-full sm:w-1/4 ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
                <SelectValue placeholder={t?.attendancepage?.filter_by_session_type || "تصفية حسب نوع الجلسة"} />
              </SelectTrigger>
              <SelectContent className={`${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
                <SelectItem className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} value="all">
                  {t?.attendancepage?.all_session_types || 'جميع الأنواع'}
                </SelectItem>
                <SelectItem className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} value="normal">
                  {t?.attendancepage?.normal_session || 'جلسة عادية'}
                </SelectItem>
                <SelectItem className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} value="exceptional">
                  {t?.attendancepage?.exceptional_session || 'جلسة استثنائية'}
                </SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={(v) => setYearFilter(v === "all" ? "" : v)} defaultValue="all">
              <SelectTrigger className={`w-full sm:w-1/4 ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
                <SelectValue placeholder={t?.attendancepage?.filter_by_year || "تصفية حسب السنة"} />
              </SelectTrigger>
              <SelectContent className={`${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
                <SelectItem className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} value="all">
                  {t?.attendancepage?.all_years || 'جميع السنوات'}
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

            <Select onValueChange={(v) => setMonthFilter(v === "all" ? "" : v)} defaultValue="all">
              <SelectTrigger className={`w-full sm:w-1/4 ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
                <SelectValue placeholder={t?.attendancepage?.filter_by_month || "تصفية حسب الشهر"} />
              </SelectTrigger>
              <SelectContent className={`${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
                <SelectItem className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} value="all">
                  {t?.attendancepage?.all_months || 'جميع الشهور'}
                </SelectItem>
                {getUniqueMonths().map((month) => (
                  <SelectItem 
                    key={month} 
                    className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} 
                    value={month}
                  >
                    {getMonthName(month)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={handleRowsPerPageChange} defaultValue="15">
              <SelectTrigger className={`w-full sm:w-32 ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
                <SelectValue placeholder={t?.attendancepage?.rows_per_page || "عدد الصفوف"} />
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
                  {t?.attendancepage?.filtering || 'جاري التصفية...'}
                </span>
              ) : (
                `${t?.attendancepage?.showing || 'عرض'} ${paginatedData.length} ${t?.attendancepage?.of || 'من'} ${totalRows} ${t?.attendancepage?.results || 'نتيجة'}${flattenedData.length > 0 ? ` ${t?.attendancepage?.from_total || 'من أصل'} ${flattenedData.length} ${t?.attendancepage?.total || 'إجمالي'}` : ''}`
              )}
            </p>
          </div>
<p className='text-red-500 text-sm text-center mb-2'>
                {t?.attendancepage?.click_for_details || 'اضغط على الجلسة لعرض التفاصيل'}
              </p>
          <AttendanceTable t={t} data={paginatedData} isLoading={isFiltering} theme={theme} language={language}/>

          <div className={`mt-4 p-4 text-center rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div>
            <p className="font-medium">
              {t?.supportpage?.data_source || 'Data Source'} : {t?.supportpage?.municipal_records || 'Municipal Records of Al Ksar Al Kabir'}
              {' - '} {t?.supportpage?.years_range || 'Years'}: 2021-2025
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

        <TabsContent value="persons">
          <div className="flex flex-wrap gap-4 z-10">
            <Input
              type="text"
              placeholder={t?.personsattendancepage?.search_input_placeholder || 'البحث باسم العضو أو المنصب'}
              value={personSearch}
              onChange={(e) => setPersonSearch(e.target.value)}
              className="w-full sm:w-1/2"
              dir="auto"
            />

            <Select onValueChange={(v) => setRoleFilter(v === "all" ? "" : v)} defaultValue="all">
              <SelectTrigger className={`w-full sm:w-1/4 ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
                <SelectValue placeholder={t?.personsattendancepage?.filter_by_role || "تصفية حسب المنصب"} />
              </SelectTrigger>
              <SelectContent className={`${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
                <SelectItem className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} value="all">
                  {t?.personsattendancepage?.all_roles || 'جميع المناصب'}
                </SelectItem>
                {getUniqueRoles().map((role) => (
                  <SelectItem 
                    key={role} 
                    className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} 
                    value={role}
                  >
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
                {/* 
            <Select onValueChange={(v) => setAttendanceFilter(v === "all" ? "" : v)} defaultValue="all">
              <SelectTrigger className={`w-full sm:w-1/4 ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
                <SelectValue placeholder={t?.personsattendancepage?.filter_by_attendance || "تصفية حسب نسبة الحضور"} />
              </SelectTrigger>
              <SelectContent className={`${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
                <SelectItem className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} value="all">
                  {t?.personsattendancepage?.all_attendance_levels || 'جميع المستويات'}
                </SelectItem>
                <SelectItem className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} value="excellent">
                  {t?.personsattendancepage?.excellent_attendance || 'ممتاز (90%+)'}
                </SelectItem>
                <SelectItem className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} value="good">
                  {t?.personsattendancepage?.good_attendance || 'جيد (75-89%)'}
                </SelectItem>
                <SelectItem className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} value="average">
                  {t?.personsattendancepage?.average_attendance || 'متوسط (50-74%)'}
                </SelectItem>
                <SelectItem className={`${theme === 'dark' ? 'bg-gray-950 text-white hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`} value="poor">
                  {t?.personsattendancepage?.poor_attendance || 'ضعيف (أقل من 50%)'}
                </SelectItem>
              </SelectContent>
            </Select>
*/}
            <Select onValueChange={handlePersonRowsPerPageChange} defaultValue="15">
              <SelectTrigger className={`w-full sm:w-32 ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
                <SelectValue placeholder={t?.personsattendancepage?.rows_per_page || "عدد الصفوف"} />
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
              {isPersonFiltering ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  {t?.personsattendancepage?.filtering || 'جاري التصفية...'}
                </span>
              ) : (
                `${t?.personsattendancepage?.showing || 'عرض'} ${paginatedPersonData.length} ${t?.personsattendancepage?.of || 'من'} ${totalPersonRows} ${t?.personsattendancepage?.results || 'نتيجة'}${processedData.length > 0 ? ` ${t?.personsattendancepage?.from_total || 'من أصل'} ${processedData.length} ${t?.personsattendancepage?.total || 'عضو'}` : ''}`
              )}
            </p>
          </div>
{/* 
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="text-2xl font-bold text-blue-600">{processedData.length}</div>
              <div className="text-sm text-gray-500">{t?.personsattendancepage?.total_members || 'إجمالي الأعضاء'}</div>
            </div>
            <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="text-2xl font-bold text-green-600">
                {processedData.filter(p => parseFloat(p.attendancePercentage) >= 90).length}
              </div>
              <div className="text-sm text-gray-500">{t?.personsattendancepage?.excellent_performers || 'ممتاز (90%+)'}</div>
            </div>
            <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="text-2xl font-bold text-yellow-600">
                {processedData.filter(p => {
                  const pct = parseFloat(p.attendancePercentage);
                  return pct >= 75 && pct < 90;
                }).length}
              </div>
              <div className="text-sm text-gray-500">{t?.personsattendancepage?.good_performers || 'جيد (75-89%)'}</div>
            </div>
            <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="text-2xl font-bold text-red-600">
                {processedData.filter(p => parseFloat(p.attendancePercentage) < 50).length}
              </div>
              <div className="text-sm text-gray-500">{t?.personsattendancepage?.needs_improvement || 'يحتاج تحسين (<50%)'}</div>
            </div>
          </div>
*/}
          <PersonsAttendanceTable t={t} data={paginatedPersonData} isLoading={isPersonFiltering} theme={theme} language={language}/>

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
                  onClick={() => handlePersonPageChange(personCurrentPage - 1)}
                  className={personCurrentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                />
                {getPersonPageNumbers().map((page, index) => (
                  <PaginationItem key={index} className="hover:cursor-pointer">
                    {typeof page === "number" ? (
                      <PaginationLink
                        onClick={() => handlePersonPageChange(page)}
                        isActive={personCurrentPage === page}
                        className={personCurrentPage === page ? 'bg-blue-600 text-white' : ''}
                      >
                        {page}
                      </PaginationLink>
                    ) : (
                      <span className="px-2 py-1 text-gray-400">...</span>
                    )}
                  </PaginationItem>
                ))}
                <PaginationNext
                  onClick={() => handlePersonPageChange(personCurrentPage + 1)}
                  className={personCurrentPage === totalPersonPages ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationContent>
            </Pagination>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}