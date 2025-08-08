import React from "react";
import { X, Users, UserCheck, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AttendanceModal({ session, isOpen, onClose, t, theme }) {
    if (!isOpen || !session) {
        return null;
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ar-MA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm">
            <div
                className={`w-full max-w-lg max-h-[90vh] rounded-2xl shadow-2xl flex flex-col ${
                    theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white'
                }`}
            >
                {/* Modal Header */}
                <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'} text-center`}>
                        {t?.attendancepage?.session_details || 'تفاصيل الجلسة'}
                    </h3>
                    <Button variant="ghost" size="icon" className="rounded-full" onClick={onClose}>
                        <X size={20} />
                    </Button>
                </header>

                {/* Modal Body */}
                <div className="flex-grow p-4 overflow-y-auto">
                    <div className="space-y-5">
                        {/* Session Info */}
                        <div className={`p-3 text-center rounded-lg ${theme === 'dark' ? 'bg-gray-700 border border-gray-100' : 'bg-gray-100 border border-gray-950'} ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                            <h4 className="mb-1 text-base font-semibold">
                                {t?.attendancepage?.session || 'جلسة'} رقم {session.session_number}
                            </h4>
                            <p className="text-sm leading-relaxed">
                                {formatDate(session.date)} - {session.time}
                            </p>
                        </div>

                        {/* Attendance Summary */}
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            <div className={`p-2 text-center rounded-lg ${theme === 'dark' ? 'bg-gray-700 border border-gray-100' : 'bg-gray-100 border border-gray-950'}`}>
                                <div className="text-xl font-bold text-green-600">{session.attendance.present}</div>
                                <div className="text-xs text-green-700 dark:text-green-500">{t?.attendancepage?.present || 'حاضر'}</div>
                            </div>
                            <div className={`p-2 text-center rounded-lg ${theme === 'dark' ? 'bg-gray-700 border border-gray-100' : 'bg-gray-100 border border-gray-950'}`}>
                                <div className="text-xl font-bold text-yellow-600">{session.attendance.absent_with_reason}</div>
                                <div className="text-xs text-yellow-700 dark:text-yellow-500">{t?.attendancepage?.absent_with_reason || 'غائب بعذر'}</div>
                            </div>
                            <div className={`p-2 text-center rounded-lg ${theme === 'dark' ? 'bg-gray-700 border border-gray-100' : 'bg-gray-100 border border-gray-950'}`}>
                                <div className="text-xl font-bold text-red-600">{session.attendance.absent_without_reason}</div>
                                <div className="text-xs text-red-700 dark:text-red-500">{t?.attendancepage?.absent_without_reason || 'غائب بدون عذر'}</div>
                            </div>
                            <div className={`p-2 text-center rounded-lg ${theme === 'dark' ? 'bg-gray-700 border border-gray-100' : 'bg-gray-100 border border-gray-950'}`}>
                                <div className="text-xl font-bold text-gray-600">{session.attendance.vacant_positions}</div>
                                <div className="text-xs text-gray-700 dark:text-gray-500">{t?.attendancepage?.vacant_positions || 'مناصب شاغرة'}</div>
                            </div>
                        </div>

                        {/* Present Members */}
                        {session.attendees && session.attendees.length > 0 && (
                            <div>
                                <h4 className={`flex items-center gap-2 mb-2 text-sm font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                                    <UserCheck size={16} className="text-green-500" />
                                    {t?.attendancepage?.present_members || 'الأعضاء الحاضرون'} ({session.attendees.length})
                                </h4>
                                <div className="space-y-1 max-h-40 overflow-y-auto">
                                    {session.attendees.map((member, idx) => (
                                        <div key={idx} className={`p-2 text-xs rounded-md ${theme === 'dark' ? 'bg-gray-700 border border-gray-100' : 'bg-gray-100 border border-gray-950'} ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                                            {member.name} - ({member.role})
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Absent with Reason */}
                        {session.absentees_with_reason && session.absentees_with_reason.length > 0 && (
                            <div>
                                <h4 className={`flex items-center gap-2 mb-2 text-sm font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                                    <UserX size={16} className="text-yellow-500" />
                                    {t?.attendancepage?.absent_with_reason_members || 'غائبون بعذر'} ({session.absentees_with_reason.length})
                                </h4>
                                <div className="space-y-1 max-h-40 overflow-y-auto">
                                    {session.absentees_with_reason.map((member, idx) => (
                                        <div key={idx} className={`p-2 text-xs rounded-md ${theme === 'dark' ? 'bg-gray-700 border border-gray-100' : 'bg-gray-100 border border-gray-950'} ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                                            {member.name} - ({member.role})
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Absent without Reason */}
                        {session.absentees_without_reason && session.absentees_without_reason.length > 0 && (
                            <div>
                                <h4 className={`flex items-center gap-2 mb-2 text-sm font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                                    <UserX size={16} className="text-red-500" />
                                    {t?.attendancepage?.absent_without_reason_members || 'غائبون بدون عذر'} ({session.absentees_without_reason.length})
                                </h4>
                                <div className="space-y-1 max-h-40 overflow-y-auto">
                                    {session.absentees_without_reason.map((member, idx) => (
                                        <div key={idx} className={`p-2 text-xs rounded-md ${theme === 'dark' ? 'bg-gray-700 border border-gray-100' : 'bg-gray-100 border border-gray-950'} ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                                            {member.name} - ({member.role})
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}