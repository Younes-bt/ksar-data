import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import PersonsAttendanceTable from "../components/PersonsAttendanceTable";

// Function to normalize text for search
const normalizeText = (text) => {
  return text
    ?.normalize("NFKD")
    .toLowerCase()
    .trim();
};



export default function PersonsAttendance({ data, loading, t, language, theme }) {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [attendanceFilter, setAttendanceFilter] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  // Process attendance data to get individual statistics
  const processAttendanceData = () => {
    const personStats = {};

    // Iterate through all files and sessions
    data.forEach(file => {
      file.sessions.forEach(session => {
        // Count attendees
        session.attendees?.forEach(person => {
          if (!personStats[person.name]) {
            personStats[person.name] = {
              name: person.name,
              role: person.role,
              totalPresent: 0,
              totalAbsentWithReason: 0,
              totalAbsentWithoutReason: 0,
              totalSessions: 0
            };
          }
          personStats[person.name].totalPresent++;
          personStats[person.name].totalSessions++;
        });

        // Count absentees with reason
        session.absentees_with_reason?.forEach(person => {
          if (!personStats[person.name]) {
            personStats[person.name] = {
              name: person.name,
              role: person.role,
              totalPresent: 0,
              totalAbsentWithReason: 0,
              totalAbsentWithoutReason: 0,
              totalSessions: 0
            };
          }
          personStats[person.name].totalAbsentWithReason++;
          personStats[person.name].totalSessions++;
        });

        // Count absentees without reason
        session.absentees_without_reason?.forEach(person => {
          if (!personStats[person.name]) {
            personStats[person.name] = {
              name: person.name,
              role: person.role,
              totalPresent: 0,
              totalAbsentWithReason: 0,
              totalAbsentWithoutReason: 0,
              totalSessions: 0
            };
          }
          personStats[person.name].totalAbsentWithoutReason++;
          personStats[person.name].totalSessions++;
        });
      });
    });

    // Convert to array and calculate attendance percentage
    return Object.values(personStats).map(person => ({
      ...person,
      attendancePercentage: person.totalSessions > 0 
        ? ((person.totalPresent / person.totalSessions) * 100).toFixed(1)
        : 0
    })).sort((a, b) => parseFloat(b.attendancePercentage) - parseFloat(a.attendancePercentage));
  };

  const processedData = processAttendanceData();

  // Get unique roles for filter
  const getUniqueRoles = () => {
    const roles = [...new Set(processedData.map(item => item.role).filter(Boolean))];
    return roles.sort();
  };

  useEffect(() => {
    setIsFiltering(true);
    
    const timeoutId = setTimeout(() => {
      let temp = processedData;

      // Search filter
      if (search) {
        const normalizedSearch = normalizeText(search);
        temp = temp.filter(person => {
          const name = normalizeText(person.name);
          const role = normalizeText(person.role);

          return (
            name?.includes(normalizedSearch) ||
            role?.includes(normalizedSearch)
          );
        });
      }

      // Role filter
      if (roleFilter) {
        temp = temp.filter(person => person.role === roleFilter);
      }

      // Attendance filter
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

      setFilteredData(temp);
      setIsFiltering(false);
      setCurrentPage(1); // Reset to first page when filters change
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [search, roleFilter, attendanceFilter, data]);

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
        {t?.personsattendancepage?.persons_attendance_stats || 'إحصائيات حضور الأعضاء'}
      </h1>

      <div className="flex flex-wrap gap-4 z-10">
        <Input
          type="text"
          placeholder={t?.personsattendancepage?.search_input_placeholder || 'البحث باسم العضو أو المنصب'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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

        <Select onValueChange={handleRowsPerPageChange} defaultValue="15">
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

      {/* Results info */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {isFiltering ? (
            <span className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              {t?.personsattendancepage?.filtering || 'جاري التصفية...'}
            </span>
          ) : (
            `${t?.personsattendancepage?.showing || 'عرض'} ${paginatedData.length} ${t?.personsattendancepage?.of || 'من'} ${totalRows} ${t?.personsattendancepage?.results || 'نتيجة'}${processedData.length > 0 ? ` ${t?.personsattendancepage?.from_total || 'من أصل'} ${processedData.length} ${t?.personsattendancepage?.total || 'عضو'}` : ''}`
          )}
        </p>
      </div>

      {/* Statistics Summary */}
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

      {/* The data table */}
      <PersonsAttendanceTable t={t} data={paginatedData} isLoading={isFiltering} theme={theme} language={language}/>

      {/* Data Source Credit */}
      <div className={`mt-4 p-4 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div>
            <p className="font-medium">
              {t?.personsattendancepage?.data_source || 'مصدر البيانات'} :{' '}
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                المجلس الجماعي لطنجة
              </a>
            </p>
            <p className="text-xs mt-1">
              {t?.personsattendancepage?.last_update || 'آخر تحديث'}: 05/08/2025
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
      {/* FOOTER CTA */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center">
            <div className={`inline-flex items-center px-6 py-3 rounded-full border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              
              <span>
                {language === 'ar' ? 'نسخة تجريبية – الإصدار 1.1.7 | جميع الحقوق محفوظة © 2025' : 
                 language === 'en' ? 'Beta Version – v1.1.7 | All Rights Reserved © 2025' : 
                 'Version d’essai – v1.1.7 | Tous droits réservés © 2025'}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}