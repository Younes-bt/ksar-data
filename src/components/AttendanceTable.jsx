import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Users, UserCheck, UserX } from "lucide-react";

export default function AttendanceTable({ data, isLoading, t, theme, language }) {
  const [expandedRows, setExpandedRows] = useState(new Set());

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
    if (type === "عادية") {
      return (
        <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
          {t?.attendancepage?.normal_session || 'عادية'}
        </span>
      );
    } else if (type === "استثنائية") {
      return (
        <span className="inline-block px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">
          {t?.attendancepage?.exceptional_session || 'استثنائية'}
        </span>
      );
    }
    return (
      <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
        {type}
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

  return (
    <div className="overflow-auto rounded-md border max-h-[70vh] shadow-cyan-500/20 shadow-2xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">{t?.attendancepage?.expand || 'توسيع'}</TableHead>
            <TableHead>{t?.attendancepage?.session_type || 'نوع الجلسة'}</TableHead>
            <TableHead>{t?.attendancepage?.session_number || 'رقم الجلسة'}</TableHead>
            <TableHead>{t?.attendancepage?.date || 'التاريخ'}</TableHead>
            <TableHead>{t?.attendancepage?.time || 'الوقت'}</TableHead>
            <TableHead>{t?.attendancepage?.attendance_stats || 'إحصائيات الحضور'}</TableHead>
            <TableHead className="text-center">{t?.attendancepage?.total_members || 'إجمالي الأعضاء'}</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            // Loading skeleton rows
            Array.from({ length: 5 }).map((_, idx) => (
              <TableRow key={`loading-${idx}`}>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-8"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-12 mx-auto"></div>
                </TableCell>
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
                <React.Fragment key={idx}>
                  <TableRow className={`${theme === 'dark' ? 'hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`}>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleRowExpansion(idx)}
                        className="p-1 h-6 w-6"
                      >
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </Button>
                    </TableCell>
                    <TableCell>
                      {getSessionTypeBadge(session.session_type)}
                    </TableCell>
                    <TableCell className="font-medium">
                      {session.session_number}
                    </TableCell>
                    <TableCell>
                      {formatDate(session.date)}
                    </TableCell>
                    <TableCell>
                      {session.time}
                    </TableCell>
                    <TableCell>
                      {getAttendanceStats(session.attendance)}
                    </TableCell>
                    <TableCell className="text-center font-bold">
                      <span className="flex items-center justify-center gap-1">
                        <Users size={14} />
                        {totalMembers}
                      </span>
                    </TableCell>
                  </TableRow>
                  
                  {isExpanded && (
                    <TableRow>
                      <TableCell colSpan="7" className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} p-6`}>
                        <div className="space-y-4">
                          {/* Attendance Summary */}
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            <div className="text-center p-3 bg-gray-300 rounded-lg">
                              <div className="text-2xl font-bold text-green-600"></div>
                              <div className="text-sm text-green-700">{t?.attendancepage?.present || 'حاضر'} ({session.attendance.present}) </div>
                            </div>
                            <div className="text-center p-3 bg-gray-300 rounded-lg">
                              <div className="text-sm text-yellow-700">{t?.attendancepage?.absent_with_reason || 'غائب بعذر'} ({session.attendance.absent_with_reason}) </div>
                            </div>
                            <div className="text-center p-3 bg-gray-300 rounded-lg">
                              <div className="text-sm text-red-700">{t?.attendancepage?.absent_without_reason || 'غائب بدون عذر'} ({session.attendance.absent_without_reason}) </div>
                            </div>
                            <div className="text-center p-3 bg-gray-300 rounded-lg">
                              <div className="text-sm text-gray-700">{t?.attendancepage?.vacant_positions || 'مناصب شاغرة'} ({session.attendance.vacant_positions}) </div>
                            </div>
                          </div>

                          {/* Attendees Lists */}
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Present Members */}
                            {session.attendees && session.attendees.length > 0 && (
                              <div>
                                <h4 className="font-semibold text-gray-200 mb-2 flex items-center gap-2">
                                  <UserCheck size={16} />
                                  {t?.attendancepage?.present_members || 'الأعضاء الحاضرون'} ({session.attendees.length})
                                </h4>
                                <div className="max-h-60 overflow-y-auto space-y-1">
                                  {session.attendees.map((member, memberIdx) => (
                                    <div key={memberIdx} className="p-2 bg-gray-300 rounded text-sm">
                                      <div className="font-medium text-gray-950">{member.name} - ( {member.role} )</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Absent Members */}
                            <div className="space-y-4">
                              {/* Absent with reason */}
                              {session.absentees_with_reason && session.absentees_with_reason.length > 0 && (
                                <div>
                                  <h4 className="font-semibold text-gray-200 mb-2 flex items-center gap-2">
                                    <UserX size={16} />
                                    {t?.attendancepage?.absent_with_reason_members || 'غائبون بعذر'} ({session.absentees_with_reason.length})
                                  </h4>
                                  <div className="max-h-32 overflow-y-auto space-y-1">
                                    {session.absentees_with_reason.map((member, memberIdx) => (
                                      <div key={memberIdx} className="p-2 bg-gray-300 rounded text-sm">
                                        <div className="font-medium text-gray-950">{member.name} - {member.role}</div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Absent without reason */}
                              {session.absentees_without_reason && session.absentees_without_reason.length > 0 && (
                                <div>
                                  <h4 className="font-semibold text-gray-200 mb-2 flex items-center gap-2">
                                    <UserX size={16} />
                                    {t?.attendancepage?.absent_without_reason_members || 'غائبون بدون عذر'} ({session.absentees_without_reason.length})
                                  </h4>
                                  <div className="max-h-32 overflow-y-auto space-y-1">
                                    {session.absentees_without_reason.map((member, memberIdx) => (
                                      <div key={memberIdx} className="p-2 bg-gray-300 rounded text-sm">
                                        <div className="font-medium text-gray-950">{member.name} - {member.role}</div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Officials Present 
                          {session.officials_present && session.officials_present.length > 0 && (
                            <div className="mt-6">
                              <h4 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
                                <Users size={16} />
                                {t?.attendancepage?.officials_present || 'المسؤولون الحاضرون'} ({session.officials_present.length})
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {session.officials_present.map((official, officialIdx) => (
                                  <div key={officialIdx} className="p-2 bg-blue-50 rounded text-sm">
                                    <div className="font-medium">{official.name}</div>
                                    <div className="text-gray-600 text-xs">{official.role}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                            */}

                          {/* Session Details */}
                          <div className="mt-6 pt-4 border-t border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                              <div>
                                <span className="font-medium">{t?.attendancepage?.file_source || 'ملف المصدر'}:</span> {session.file}
                              </div>
                              <div>
                                <span className="font-medium">{t?.attendancepage?.session_date || 'تاريخ الجلسة'}:</span> {formatDate(session.date)}
                              </div>
                              <div>
                                <span className="font-medium">{t?.attendancepage?.session_time || 'وقت الجلسة'}:</span> {session.time}
                              </div>
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
  );
}