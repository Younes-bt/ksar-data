import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserCheck, UserX, Users, TrendingUp, TrendingDown } from "lucide-react";

export default function PersonsAttendanceTable({ data, isLoading, t, theme, language }) {
  
  const getAttendancePercentageBadge = (percentage) => {
    const pct = parseFloat(percentage);
    
    if (pct >= 90) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
          <TrendingUp size={12} />
          {percentage}%
        </span>
      );
    } else if (pct >= 75) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
          <TrendingUp size={12} />
          {percentage}%
        </span>
      );
    } else if (pct >= 50) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
          <Users size={12} />
          {percentage}%
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
          <TrendingDown size={12} />
          {percentage}%
        </span>
      );
    }
  };

  const getRoleDisplayName = (role) => {
    // Map common roles to shorter display names
    const roleMap = {
      'رئيس المجلس الجماعي': 'الرئيس',
      'النائب الأول للرئيس': 'النائب الأول',
      'النائب الثاني للرئيس': 'النائب الثاني',
      'النائب الثالث للرئيس': 'النائب الثالث',
      'النائب الرابع للرئيس': 'النائب الرابع',
      'النائب الخامس للرئيس': 'النائب الخامس',
      'النائبة السادسة للرئيس': 'النائبة السادسة',
      'النائبة السابعة للرئيس': 'النائبة السابعة',
      'كاتب المجلس': 'الكاتب',
      'نائب كاتب المجلس': 'نائب الكاتب',
      'نائبة كاتب المجلس': 'نائبة الكاتب',
      'عضو مستشار': 'عضو',
      'عضوة مستشارة': 'عضوة'
    };
    
    return roleMap[role] || role;
  };

  const getPerformanceIcon = (percentage) => {
    const pct = parseFloat(percentage);
    
    if (pct >= 90) {
      return <TrendingUp className="text-green-600" size={16} />;
    } else if (pct >= 75) {
      return <TrendingUp className="text-blue-600" size={16} />;
    } else if (pct >= 50) {
      return <Users className="text-yellow-600" size={16} />;
    } else {
      return <TrendingDown className="text-red-600" size={16} />;
    }
  };

  return (
    <div className="overflow-auto rounded-md border max-h-[70vh] shadow-cyan-500/20 shadow-2xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">{t?.personsattendancepage?.rank || 'الترتيب'}</TableHead>
            <TableHead>{t?.personsattendancepage?.member_name || 'اسم العضو'}</TableHead>
            <TableHead className="text-center">{t?.personsattendancepage?.role || 'المنصب'}</TableHead>
            <TableHead className="text-center">{t?.personsattendancepage?.total_presence || 'إجمالي الحضور'}</TableHead>
            <TableHead className="text-center">{t?.personsattendancepage?.absent_with_reason || 'غياب بعذر'}</TableHead>
            <TableHead className="text-center">{t?.personsattendancepage?.absent_without_reason || 'غياب بدون عذر'}</TableHead>
            <TableHead className="text-center">{t?.personsattendancepage?.total_sessions || 'إجمالي الجلسات'}</TableHead>
            <TableHead className="text-center">{t?.personsattendancepage?.attendance_percentage || 'نسبة الحضور'}</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            // Loading skeleton rows
            Array.from({ length: 10 }).map((_, idx) => (
              <TableRow key={`loading-${idx}`}>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-8"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-20 mx-auto"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-12 mx-auto"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-12 mx-auto"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-12 mx-auto"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-12 mx-auto"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-16 mx-auto"></div>
                </TableCell>
              </TableRow>
            ))
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan="8" className="text-center text-gray-500 py-8">
                <div className="flex flex-col items-center gap-2">
                  <div className="text-4xl">👥</div>
                  <p className="text-lg font-medium">{t?.personsattendancepage?.no_members_found || 'لم يتم العثور على أعضاء مطابقين'}</p>
                  <p className="text-sm">{t?.personsattendancepage?.adjust_filters || 'جرب تعديل المرشحات الخاصة بك'}</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            data.map((person, idx) => {
              // Calculate the actual rank based on the original index before pagination
              const rank = idx + 1; // This will show 1, 2, 3... for each page
              
              return (
                <TableRow 
                  key={idx} 
                  className={`${theme === 'dark' ? 'hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'} transition-colors`}
                >
                  <TableCell className="font-bold text-center">
                    <div className="flex items-center justify-center gap-2">
                      {getPerformanceIcon(person.attendancePercentage)}
                      <span className="text-sm font-semibold">#{rank}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell className="font-medium max-w-xs">
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm" title={person.name}>
                        {person.name}
                      </span>
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      person.role.includes('رئيس') || person.role.includes('نائب') 
                        ? 'bg-purple-100 text-purple-800' 
                        : person.role.includes('كاتب')
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {getRoleDisplayName(person.role)}
                    </span>
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <span className="flex items-center justify-center gap-1 font-semibold text-green-700">
                      <UserCheck size={14} />
                      {person.totalPresent}
                    </span>
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <span className="flex items-center justify-center gap-1 font-semibold text-yellow-700">
                      <UserX size={14} />
                      {person.totalAbsentWithReason}
                    </span>
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <span className="flex items-center justify-center gap-1 font-semibold text-red-700">
                      <UserX size={14} />
                      {person.totalAbsentWithoutReason}
                    </span>
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <span className="flex items-center justify-center gap-1 font-bold text-blue-700">
                      <Users size={14} />
                      {person.totalSessions}
                    </span>
                  </TableCell>
                  
                  <TableCell className="text-center">
                    {getAttendancePercentageBadge(person.attendancePercentage)}
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}