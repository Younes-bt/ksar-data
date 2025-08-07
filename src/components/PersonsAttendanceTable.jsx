import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserCheck, UserX, Users, TrendingUp, TrendingDown, ArrowRight, Info } from "lucide-react";

export default function PersonsAttendanceTable({ data, isLoading, t, theme, language }) {
  
  const getAttendancePercentageBadge = (percentage) => {
    const pct = parseFloat(percentage);
    
    if (pct >= 90) {
      return (
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">
          <TrendingUp size={10} />
          <span className="hidden sm:inline">{percentage}%</span>
          <span className="sm:hidden">{percentage}</span>
        </span>
      );
    } else if (pct >= 75) {
      return (
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
          <TrendingUp size={10} />
          <span className="hidden sm:inline">{percentage}%</span>
          <span className="sm:hidden">{percentage}</span>
        </span>
      );
    } else if (pct >= 50) {
      return (
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded-full">
          <Users size={10} />
          <span className="hidden sm:inline">{percentage}%</span>
          <span className="sm:hidden">{percentage}</span>
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-xs bg-red-100 text-red-800 rounded-full">
          <TrendingDown size={10} />
          <span className="hidden sm:inline">{percentage}%</span>
          <span className="sm:hidden">{percentage}</span>
        </span>
      );
    }
  };

  const getRoleDisplayName = (role) => {
    // Map common roles to shorter display names
    const roleMap = {
      'رئيس المجلس الجماعي': 'الرئيس',
      'رئيس المجلس': 'الرئيس',
      'النائب الأول للرئيس': 'النائب الأول',
      'النائب الثاني للرئيس': 'النائب الثاني',
      'النائب الثالث للرئيس': 'النائب الثالث',
      'النائب الرابع للرئيس': 'النائب الرابع',
      'النائب الخامس للرئيس': 'النائب الخامس',
      'النائبة السادسة للرئيس': 'النائبة السادسة',
      'النائبة السابعة للرئيس': 'النائبة السابعة',
      'كاتب المجلس': 'كاتب المجلس',
      'نائب كاتب المجلس': 'نائب كاتب',
      'نائبة كاتب المجلس': 'نائبة كاتب',
      'عضو مستشار': 'عضو',
      'عضوة مستشارة': 'عضوة'
    };
    
    return roleMap[role] || role;
  };

  const getPerformanceIcon = (percentage) => {
    const pct = parseFloat(percentage);
    
    if (pct >= 90) {
      return <TrendingUp className="text-green-600" size={12} />;
    } else if (pct >= 75) {
      return <TrendingUp className="text-blue-600" size={12} />;
    } else if (pct >= 50) {
      return <Users className="text-yellow-600" size={12} />;
    } else {
      return <TrendingDown className="text-red-600" size={12} />;
    }
  };

  // Function to detect role changes and create role display
  const getRoleDisplay = (person) => {
    // Check if person has role change info (from new processing function)
    if (!person.hasRoleChange || !person.roleChangeInfo) {
      // No role change - show single role
      return (
        <span className={`inline-block px-1.5 py-0.5 text-xs rounded-full ${
          person.role.includes('رئيس') || person.role.includes('نائب') 
            ? 'bg-purple-100 text-purple-800' 
            : person.role.includes('كاتب')
            ? 'bg-blue-100 text-blue-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {getRoleDisplayName(person.role)}
        </span>
      );
    }

    // Role change detected
    const firstRole = person.roleChangeInfo.from;
    const latestRole = person.roleChangeInfo.to;
    
    return (
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-1 text-xs">
          <span className='text-xs text-yellow-300 mr-1 hidden sm:inline'>(تغيير منصب)</span>
          <span className={`px-1.5 py-0.5 rounded-full text-xs ${
            firstRole.includes('رئيس') || firstRole.includes('نائب') 
              ? 'bg-purple-100 text-purple-700' 
              : firstRole.includes('كاتب')
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-700'
          }`}>
            {getRoleDisplayName(firstRole)}
          </span>
          <ArrowRight size={8} className="text-gray-400" />
          <span className={`px-1.5 py-0.5 rounded-full text-xs ${
            latestRole.includes('رئيس') || latestRole.includes('نائب') 
              ? 'bg-purple-100 text-purple-800' 
              : latestRole.includes('كاتب')
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {getRoleDisplayName(latestRole)}
          </span>
        </div>
      </div>
    );
  };

  // Mobile card view for very small screens
  const MobileCard = ({ person, rank }) => (
    <div className={`p-3 mb-3 rounded-lg border ${
      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          {getPerformanceIcon(person.attendancePercentage)}
          <span className="font-bold text-sm">#{rank}</span>
        </div>
        {getAttendancePercentageBadge(person.attendancePercentage)}
      </div>
      
      <h3 className="font-semibold text-sm mb-2" title={person.name}>
        {person.name}
      </h3>
      
      <div className="mb-2">
        {getRoleDisplay(person)}
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-1">
          <UserCheck size={12} className="text-green-600" />
          <span>حضر: {person.totalPresent}</span>
        </div>
        <div className="flex items-center gap-1">
          <UserX size={12} className="text-yellow-600" />
          <span>بعذر: {person.totalAbsentWithReason}</span>
        </div>
        <div className="flex items-center gap-1">
          <UserX size={12} className="text-red-600" />
          <span>بدون عذر: {person.totalAbsentWithoutReason}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users size={12} className="text-blue-600" />
          <span>المجموع: {person.totalSessions}</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Card View - Show on screens smaller than md (768px) */}
      <div className="block md:hidden">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, idx) => (
            <div key={`loading-card-${idx}`} className="p-3 mb-3 rounded-lg border bg-gray-50 animate-pulse">
              <div className="flex justify-between items-center mb-2">
                <div className="h-4 bg-gray-200 rounded w-16"></div>
                <div className="h-6 bg-gray-200 rounded-full w-20"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="grid grid-cols-2 gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-3 bg-gray-200 rounded w-20"></div>
                ))}
              </div>
            </div>
          ))
        ) : data.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl mb-2">👥</div>
            <p className="text-lg font-medium">{t?.personsattendancepage?.no_members_found || 'لم يتم العثور على أعضاء مطابقين'}</p>
            <p className="text-sm">{t?.personsattendancepage?.adjust_filters || 'جرب تعديل المرشحات الخاصة بك'}</p>
          </div>
        ) : (
          data.map((person, idx) => (
            <MobileCard key={idx} person={person} rank={idx + 1} />
          ))
        )}
      </div>

      {/* Desktop Table View - Show on md screens and larger */}
      <div className="hidden md:block overflow-auto rounded-md border max-h-[70vh] shadow-cyan-500/20 shadow-2xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 text-xs">{t?.personsattendancepage?.rank || 'الترتيب'}</TableHead>
              <TableHead className="text-xs">{t?.personsattendancepage?.member_name || 'اسم العضو'}</TableHead>
              <TableHead className="text-center text-xs">{t?.personsattendancepage?.role || 'المنصب'}</TableHead>
              <TableHead className="text-center text-xs">{t?.personsattendancepage?.total_presence || 'حضور'}</TableHead>
              <TableHead className="text-center text-xs lg:table-cell hidden">{t?.personsattendancepage?.absent_with_reason || 'بعذر'}</TableHead>
              <TableHead className="text-center text-xs lg:table-cell hidden">{t?.personsattendancepage?.absent_without_reason || 'بدون عذر'}</TableHead>
              <TableHead className="text-center text-xs">{t?.personsattendancepage?.total_sessions || 'المجموع'}</TableHead>
              <TableHead className="text-center text-xs">{t?.personsattendancepage?.attendance_percentage || 'النسبة'}</TableHead>
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
                  <TableCell className="lg:table-cell hidden">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-12 mx-auto"></div>
                  </TableCell>
                  <TableCell className="lg:table-cell hidden">
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
                      <div className="flex items-center justify-center gap-1">
                        {getPerformanceIcon(person.attendancePercentage)}
                        <span className="text-xs font-semibold">#{rank}</span>
                      </div>
                    </TableCell>
                    
                    <TableCell className="font-medium max-w-xs">
                      <div className="flex flex-col">
                        <span className="font-semibold text-xs lg:text-sm" title={person.name}>
                          {person.name}
                        </span>
                      </div>
                    </TableCell>
                    
                    <TableCell className="text-center">
                      {getRoleDisplay(person)}
                    </TableCell>
                    
                    <TableCell className="text-center">
                      <span className="flex items-center justify-center gap-1 font-semibold text-green-700">
                        <UserCheck size={12} />
                        <span className="text-xs">{person.totalPresent}</span>
                      </span>
                    </TableCell>
                    
                    <TableCell className="text-center lg:table-cell hidden">
                      <span className="flex items-center justify-center gap-1 font-semibold text-yellow-700">
                        <UserX size={12} />
                        <span className="text-xs">{person.totalAbsentWithReason}</span>
                      </span>
                    </TableCell>
                    
                    <TableCell className="text-center lg:table-cell hidden">
                      <span className="flex items-center justify-center gap-1 font-semibold text-red-700">
                        <UserX size={12} />
                        <span className="text-xs">{person.totalAbsentWithoutReason}</span>
                      </span>
                    </TableCell>
                    
                    <TableCell className="text-center">
                      <span className="flex items-center justify-center gap-1 font-bold text-blue-700">
                        <Users size={12} />
                        <span className="text-xs">{person.totalSessions}</span>
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
    </>
  );
}