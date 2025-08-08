import React from "react";
import { X, Vote, CheckCircle, XCircle, MinusCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DecisionModal({ decision, isOpen, onClose, t, theme, language }) {
    if (!isOpen || !decision) {
        return null;
    }

    const getDecisionTitle = (decision) => {
        // Return appropriate title based on language preference
        if (language === 'fr' && decision.title_fr) {
            return decision.title_fr;
        }
        if (language === 'en' && decision.title_en) {
            return decision.title_en;
        }
        return decision.title; // Default to Arabic
    };

    const formatDate = (dateString) => {
        // Handle new date format DD/MM/YYYY
        if (dateString.includes('-')) {
            const [day, month, year] = dateString.split('-');
            const date = new Date(year, month - 1, day);
            return date.toLocaleDateString('ar-MA', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
        // Handle old format if still present
        if (dateString.includes(' ')) {
            return dateString;
        }
        const date = new Date(dateString);
        return date.toLocaleDateString('ar-MA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const acceptedMembers = decision.attendees?.filter(
        (member) =>
            !decision.refused_members?.includes(member) &&
            !decision.abstained_members?.includes(member)
    ) || [];

    const totalVotes = decision.voting.accepted + decision.voting.refused + decision.voting.abstained;

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
                        {t?.decisionspage?.decision_details || 'تفاصيل القرار'}
                    </h3>
                    <Button variant="ghost" size="icon" className="rounded-full" onClick={onClose}>
                        <X size={20} />
                    </Button>
                </header>

                {/* Modal Body */}
                <div className="flex-grow p-4 overflow-y-auto">
                    <div className="space-y-5">
                        {/* Decision Title */}
                        <div className={`p-3 text-center rounded-lg ${theme === 'dark' ? 'bg-gray-700 border border-gray-100' : 'bg-gray-100 border border-gray-950'} ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                            <h4 className={`mb-1 text-base font-semibold `}>
                                {decision.decision_number}
                            </h4>
                            <p className="text-sm leading-relaxed ">
                                {getDecisionTitle(decision)}
                            </p>
                            <p className="text-xs text-gray-500 mt-2" style={language === 'ar' ? {direction:'rtl'} : {direction:'ltr'}}>
                                {formatDate(decision.date)}
                            </p>
                        </div>

                        {/* Voting Summary */}
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 ">
                            <div className={`p-2 text-center rounded-lg  ${theme === 'dark' ? 'bg-gray-700 border border-gray-100' : 'bg-gray-100 border border-gray-950'} ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                                <div className="text-xl font-bold text-green-600">{decision.voting.accepted}</div>
                                <div className="text-xs text-green-700 dark:text-green-500">{t?.decisionspage?.accepted || 'موافق'}</div>
                            </div>
                            <div className={`p-2 text-center rounded-lg  ${theme === 'dark' ? 'bg-gray-700 border border-gray-100' : 'bg-gray-100 border border-gray-950'} ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                                <div className="text-xl font-bold text-red-600">{decision.voting.refused}</div>
                                <div className="text-xs text-red-700 dark:text-red-500">{t?.decisionspage?.refused || 'رافض'}</div>
                            </div>
                            <div className={`p-2 text-center rounded-lg  ${theme === 'dark' ? 'bg-gray-700 border border-gray-100' : 'bg-gray-100 border border-gray-950'} ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                                <div className="text-xl font-bold text-yellow-600">{decision.voting.abstained}</div>
                                <div className="text-xs text-yellow-700 dark:text-yellow-500">{t?.decisionspage?.abstained || 'ممتنع'}</div>
                            </div>
                            <div className={`p-2 text-center rounded-lg  ${theme === 'dark' ? 'bg-gray-700 border border-gray-100' : 'bg-gray-100 border border-gray-950'} ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                                <div className="text-xl font-bold text-blue-600">{totalVotes}</div>
                                <div className="text-xs text-blue-700 dark:text-blue-500">{t?.decisionspage?.total_votes || 'الإجمالي'}</div>
                            </div>
                        </div>

                        {/* Accepted Members */}
                        {acceptedMembers.length > 0 && (
                            <div>
                                <h4 className={`flex items-center gap-2 mb-2 text-sm font-semibold  ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                                    <CheckCircle size={16} className="text-green-500" />
                                    {t?.decisionspage?.accepted_members || 'الأعضاء الموافقون'} ({acceptedMembers.length})
                                </h4>
                                <div className="space-y-1 max-h-40 overflow-y-auto ">
                                    {acceptedMembers.map((member, idx) => (
                                        <div key={idx} className={`p-2 text-xs rounded-md ${theme === 'dark' ? 'bg-gray-700 border border-gray-100' : 'bg-gray-100 border border-gray-950'} ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                                            {member}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Refused Members */}
                        {decision.refused_members && decision.refused_members.length > 0 && (
                            <div>
                                <h4 className={`flex items-center gap-2 mb-2 text-sm font-semibold  ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                                    <XCircle size={16} className="text-red-500" />
                                    {t?.decisionspage?.refused_members || 'الأعضاء الرافضون'} ({decision.refused_members.length})
                                </h4>
                                <div className="space-y-1 max-h-40 overflow-y-auto">
                                    {decision.refused_members.map((member, idx) => (
                                        <div key={idx} className={`p-2 text-xs rounded-md ${theme === 'dark' ? 'bg-gray-700 border border-gray-100' : 'bg-gray-100 border border-gray-950'} ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                                            {member}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Abstained Members */}
                        {decision.abstained_members && decision.abstained_members.length > 0 && (
                            <div>
                                <h4 className={`flex items-center gap-2 mb-2 text-sm font-semibold  ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                                    <MinusCircle size={16} className="text-yellow-500" />
                                    {t?.decisionspage?.abstained_members || 'الأعضاء الممتنعون'} ({decision.abstained_members.length})
                                </h4>
                                <div className="space-y-1 max-h-40 overflow-y-auto">
                                    {decision.abstained_members.map((member, idx) => (
                                        <div key={idx} className={`p-2 text-xs rounded-md ${theme === 'dark' ? 'bg-gray-700 border border-gray-100' : 'bg-gray-100 border border-gray-950'} ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                                            {member}
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