import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Users, UserCheck, UserX, Eye } from "lucide-react";
import AttendanceModal from "./AttendanceModal"; // Import the modal

export default function AttendanceTable({ data, isLoading, t, theme, language }) {
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [selectedSession, setSelectedSession] = useState(null); // State for the modal

  const toggleRowExpansion = (index) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedRows(newExpanded);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-MA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getSessionTypeBadge = (type) => {
    const sessionText = type === "عادية" 
      ? (t?.attendancepage?.normal_session || 'عادية')
      : (t?.attendancepage?.exceptional_session || 'استثنائية');
      
    const badgeClass = type === "عادية"
      ? "bg-blue-100 text-blue-800"
      : "bg-orange-100 text-orange-800";

    return (
      <span className={`inline-block px-1.5 py-0.5 text-xs rounded-full ${badgeClass}`}>
        {sessionText}
      </span>
    );
  };

  const getAttendanceStats = (attendance) => (
    <div className="flex gap-4 text-xs">
      <span className="flex items-center gap-1 text-green-600">
        <UserCheck size={12} />
        {attendance.present}
      </span>
      <span className="flex items-center gap-1 text-yellow-600">
        <UserX size={12} />
        {attendance.absent_with_reason}
      </span>
      <span className="flex items-center gap-1 text-red-600">
        <UserX size={12} />
        {attendance.absent_without_reason}
      </span>
    </div>
  );

  // Mobile card view for very small screens
  const MobileCard = ({ session }) => {
    const totalMembers = session.attendance.present + session.attendance.absent_with_reason + session.attendance.absent_without_reason + session.attendance.vacant_positions;

    return (
      <div
        className={`mb-3 rounded-lg border cursor-pointer transition-all hover:shadow-lg ${
            theme === 'dark' ? 'bg-gray-800 border-gray-50 hover:border-cyan-400' : 'bg-white border-gray-500 hover:border-cyan-500'
        }`}
        onClick={() => setSelectedSession(session)}
      >
        <div className="p-3">
          <div className="flex justify-between items-start mb-2">
            <span className={`font-bold text-sm ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>{session.session_number}</span>
            <div className="flex gap-2 items-center text-xs text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Users size={12} />
                <span>{totalMembers}</span>
              </div>
              <Eye size={16} className="text-cyan-500" />
            </div>
          </div>
          
          <h3 className={`font-semibold text-sm mb-2 line-clamp-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`} title={`${session.session_type} - ${formatDate(session.date)}`}>
             {session.session_type} - {formatDate(session.date)}
          </h3>
          
          <div className="flex justify-between items-center mt-3">
            {getSessionTypeBadge(session.session_type)}
            <span className="text-xs text-gray-500 dark:text-gray-400">{session.time}</span>
          </div>

          <div className="flex justify-start pt-3 mt-3 border-t border-gray-200 dark:border-gray-700">
            {getAttendanceStats(session.attendance)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Mobile Card View - Show on screens smaller than lg (1024px) */}
      <div className="block lg:hidden">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, idx) => (
            <div key={`loading-card-${idx}`} className="p-3 mb-3 rounded-lg border bg-gray-50 dark:bg-gray-800 animate-pulse">
              <div className="flex justify-between items-center mb-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
              </div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
              <div className="flex justify-between items-center">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              </div>
            </div>
          ))
        ) : data.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            <div className="text-4xl mb-2">📋</div>
            <p className="text-lg font-medium">{t?.attendancepage?.no_sessions_found || 'لم يتم العثور على جلسات مطابقة'}</p>
            <p className="text-sm">{t?.attendancepage?.adjust_filters || 'جرب تعديل المرشحات الخاصة بك'}</p>
          </div>
        ) : (
          data.map((session, idx) => (
            <MobileCard key={session.session_number || idx} session={session} />
          ))
        )}
      </div>

      {/* Modal for Mobile View */}
      <AttendanceModal 
          isOpen={!!selectedSession}
          onClose={() => setSelectedSession(null)}
          session={selectedSession}
          t={t}
          theme={theme}
      />

      {/* Desktop Table View - Show on lg screens and larger */}
      <div className="hidden lg:block overflow-auto rounded-md border max-h-[70vh] shadow-cyan-500/20 shadow-2xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 text-xs">{t?.attendancepage?.expand || 'توسيع'}</TableHead>
              <TableHead className="text-xs">{t?.attendancepage?.session_type || 'نوع الجلسة'}</TableHead>
              <TableHead className="text-xs">{t?.attendancepage?.session_number || 'رقم الجلسة'}</TableHead>
              <TableHead className="text-xs">{t?.attendancepage?.date || 'التاريخ'}</TableHead>
              <TableHead className="text-xs">{t?.attendancepage?.time || 'الوقت'}</TableHead>
              <TableHead className="text-xs">{t?.attendancepage?.attendance_stats || 'إحصائيات الحضور'}</TableHead>
              <TableHead className="text-center text-xs">{t?.attendancepage?.total_members || 'إجمالي الأعضاء'}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <TableRow key={`loading-${idx}`}>
                  <TableCell><div className="h-4 bg-gray-200 rounded animate-pulse w-8"></div></TableCell>
                  <TableCell><div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div></TableCell>
                  <TableCell><div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div></TableCell>
                  <TableCell><div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div></TableCell>
                  <TableCell><div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div></TableCell>
                  <TableCell><div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div></TableCell>
                  <TableCell><div className="h-4 bg-gray-200 rounded animate-pulse w-12 mx-auto"></div></TableCell>
                </TableRow>
              ))
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan="7" className="text-center text-gray-500 py-8">
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-4xl">📋</div>
                    <p className="text-lg font-medium">{t?.attendancepage?.no_sessions_found || 'لم يتم العثور على جلسات مطابقة'}</p>
                    <p className="text-sm">{t?.attendancepage?.adjust_filters || 'جرب تعديل المرشحات الخاصة بك'}</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((session, idx) => {
                const totalMembers = session.attendance.present + session.attendance.absent_with_reason + session.attendance.absent_without_reason + session.attendance.vacant_positions;
                const isExpanded = expandedRows.has(idx);
                
                return (
                  <React.Fragment key={session.session_number || idx}>
                    <TableRow 
                      onClick={() => toggleRowExpansion(idx)}
                      className={`cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`}
                    >
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent row's onClick from firing
                            toggleRowExpansion(idx);
                          }}
                          className="p-1 h-6 w-6"
                        >
                          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </Button>
                      </TableCell>
                      <TableCell>{getSessionTypeBadge(session.session_type)}</TableCell>
                      <TableCell className="font-medium text-xs">{session.session_number}</TableCell>
                      <TableCell className="text-xs">{session.date}</TableCell>
                      <TableCell className="text-xs">{session.time}</TableCell>
                      <TableCell>{getAttendanceStats(session.attendance)}</TableCell>
                      <TableCell className="text-center font-bold">
                        <span className="flex items-center justify-center gap-1 text-xs">
                          <Users size={12} />
                          {totalMembers}
                        </span>
                      </TableCell>
                    </TableRow>
                    
                    {isExpanded && (
                      <TableRow>
                        <TableCell colSpan="7" className={`${theme === 'dark' ? 'bg-gray-950 border border-gray-700' : 'bg-white'} p-6`}>
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                              <div className={`text-center p-3 ${theme === 'dark' ? 'bg-gray-950 border border-gray-100' : 'bg-gray-100 border border-gray-950'} rounded-lg`}>
                                <div className="text-2xl font-bold text-green-600">{session.attendance.present}</div>
                                <div className="text-sm text-green-700">{t?.attendancepage?.present || 'حاضر'}</div>
                              </div>
                              <div className={`text-center p-3 ${theme === 'dark' ? 'bg-gray-950 border border-gray-100' : 'bg-gray-100 border border-gray-950'} rounded-lg`}>
                                <div className="text-2xl font-bold text-yellow-600">{session.attendance.absent_with_reason}</div>
                                <div className="text-sm text-yellow-700">{t?.attendancepage?.absent_with_reason || 'غائب بعذر'}</div>
                              </div>
                              <div className={`text-center p-3 ${theme === 'dark' ? 'bg-gray-950 border border-gray-100' : 'bg-gray-100 border border-gray-950'} rounded-lg`}>
                                <div className="text-2xl font-bold text-red-600">{session.attendance.absent_without_reason}</div>
                                <div className="text-sm text-red-700">{t?.attendancepage?.absent_without_reason || 'غائب بدون عذر'}</div>
                              </div>
                              {/* 
                              <div className={`text-center p-3 ${theme === 'dark' ? 'bg-gray-700 border border-gray-100' : 'bg-gray-100 border border-gray-950'} rounded-lg`}>
                                <div className="text-2xl font-bold text-gray-600">{session.attendance.vacant_positions}</div>
                                <div className="text-sm text-gray-700">{t?.attendancepage?.vacant_positions || 'مناصب شاغرة'}</div>
                              </div>
                              */}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              {session.attendees && session.attendees.length > 0 && (
                                <div>
                                  <h4 className={`font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'} mb-2 flex items-center gap-2`}>
                                    <UserCheck size={16} />
                                    {t?.attendancepage?.present_members || 'الأعضاء الحاضرون'} ({session.attendees.length})
                                  </h4>
                                  <div className="max-h-60 overflow-y-auto space-y-1">
                                    {session.attendees.map((member, memberIdx) => (
                                      <div key={memberIdx} className={`p-2 ${theme === 'dark' ? 'bg-gray-950 border border-gray-100' : 'bg-gray-100 border border-gray-950'} ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'} rounded text-sm`}>
                                        <div className="font-medium">{member.name} - ( {member.role} )</div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              <div className="space-y-4">
                                {session.absentees_with_reason && session.absentees_with_reason.length > 0 && (
                                  <div>
                                    <h4 className={`font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-950'} mb-2 flex items-center gap-2`}>
                                      <UserX size={16} />
                                      {t?.attendancepage?.absent_with_reason_members || 'غائبون بعذر'} ({session.absentees_with_reason.length})
                                    </h4>
                                    <div className="max-h-32 overflow-y-auto space-y-1">
                                      {session.absentees_with_reason.map((member, memberIdx) => (
                                        <div key={memberIdx} className={`p-2 rounded text-sm ${theme === 'dark' ? 'bg-gray-950 border border-gray-100' : 'bg-gray-100 border border-gray-950'} ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                                          <div className="font-medium">{member.name} - {member.role}</div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {session.absentees_without_reason && session.absentees_without_reason.length > 0 && (
                                  <div>
                                    <h4 className={`font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'} mb-2 flex items-center gap-2`}>
                                      <UserX size={16} />
                                      {t?.attendancepage?.absent_without_reason_members || 'غائبون بدون عذر'} ({session.absentees_without_reason.length})
                                    </h4>
                                    <div className="max-h-32 overflow-y-auto space-y-1">
                                      {session.absentees_without_reason.map((member, memberIdx) => (
                                        <div key={memberIdx} className={`p-2 rounded text-sm ${theme === 'dark' ? 'bg-gray-950 border border-gray-100' : 'bg-gray-100 border border-gray-950'} ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                                          <div className="font-medium">{member.name} - {member.role}</div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="mt-6 pt-4 border-t border-gray-200">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                                <div><span className="font-medium">{t?.attendancepage?.file_source || 'ملف المصدر'}:</span> {session.file}</div>
                                <div><span className="font-medium">{t?.attendancepage?.session_date || 'تاريخ الجلسة'}:</span> {formatDate(session.date)}</div>
                                <div><span className="font-medium">{t?.attendancepage?.session_time || 'وقت الجلسة'}:</span> {session.time}</div>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}