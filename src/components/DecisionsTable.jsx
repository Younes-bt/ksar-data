import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Vote, CheckCircle, XCircle, MinusCircle, Users, Eye } from "lucide-react";
import DecisionModal from "./DecisionModal"; // Assuming DecisionModal.jsx is in the same folder

export default function DecisionsTable({ data, isLoading, t, theme, language }) {
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [selectedDecision, setSelectedDecision] = useState(null);

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

  const getDecisionTypeBadge = (voting) => {
    if (voting.refused === 0 && voting.abstained === 0) {
      return (
        <span className="inline-block px-1.5 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">
          {t?.decisionspage?.unanimous || 'إجماع'}
        </span>
      );
    } else if (voting.accepted > voting.refused) {
        return (
            <span className="inline-block px-1.5 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
            {t?.decisionspage?.majority || 'أغلبية'}
            </span>
        );
    } else if (voting.refused > 0) {
        return (
            <span className="inline-block px-1.5 py-0.5 text-xs bg-red-100 text-red-800 rounded-full">
            {t?.decisionspage?.contested || 'متنازع'}
            </span>
        );
    }
    return (
        <span className="inline-block px-1.5 py-0.5 text-xs bg-gray-100 text-gray-800 rounded-full">
        {t?.decisionspage?.mixed || 'مختلط'}
        </span>
    );
  };

  const getVotingStats = (voting) => (
    <div className="flex gap-4 text-xs">
      <span className="flex items-center gap-1 text-green-700">
        <CheckCircle size={12} />
        {voting.accepted}
      </span>
      <span className="flex items-center gap-1 text-red-600">
        <XCircle size={12} />
        {voting.refused}
      </span>
      <span className="flex items-center gap-1 text-orange-700">
        <MinusCircle size={12} />
        {voting.abstained}
      </span>
    </div>
  );

  // Mobile card view for very small screens
  const MobileCard = ({ decision }) => {
    const totalVotes = decision.voting.accepted + decision.voting.refused + decision.voting.abstained;

    return (
      <div
        className={`mb-3 rounded-lg border cursor-pointer transition-all hover:shadow-lg ${
            theme === 'dark' ? 'bg-gray-800 border-gray-50 hover:border-cyan-400' : 'bg-white border-gray-500 hover:border-cyan-500'
        }`}
        onClick={() => setSelectedDecision(decision)}
      >
        
        <div className="p-3">
          <div className="flex justify-between items-start mb-2">
            <span className={`text-sm ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>{decision.decision_number}</span>
            <div className="flex gap-2 items-center text-xs text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Vote size={12} />
                <span>{totalVotes}</span>
              </div>
              <Eye size={16} className="text-cyan-500" />
            </div>
          </div>
          
          <h3 className={`font-semibold text-center text-sm mb-2 line-clamp-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`} title={getDecisionTitle(decision)}>
            {getDecisionTitle(decision)}
          </h3>
          
          <div className="flex justify-between items-center mt-3">
            {getDecisionTypeBadge(decision.voting)}
            <span className="text-xs text-gray-500 dark:text-gray-400" style={language === 'ar' ? {direction:'rtl'} : {direction:'ltr'}}>{formatDate(decision.date)}</span>
          </div>

          {/* Voting stats, re-added to the card */}
          <div className="flex justify-start pt-3 mt-3 border-t border-gray-200 dark:border-gray-700">
             {getVotingStats(decision.voting)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Mobile Card View - Show on screens smaller than lg (1024px) */}
      <div className="block lg:hidden" >
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
            <div className="text-4xl mb-2">📊</div>
            <p className="text-lg font-medium">{t?.decisionspage?.no_decisions_found || 'لم يتم العثور على قرارات مطابقة'}</p>
            <p className="text-sm">{t?.decisionspage?.adjust_filters || 'جرب تعديل المرشحات الخاصة بك'}</p>
          </div>
        ) : (
          data.map((decision, idx) => (
            <MobileCard key={decision.decision_number || idx} decision={decision} />
          ))
        )}
      </div>

        {/* Modal for Mobile View */}
        <DecisionModal 
            isOpen={!!selectedDecision}
            onClose={() => setSelectedDecision(null)}
            decision={selectedDecision}
            t={t}
            theme={theme}
            language={language}
        />

      {/* Desktop Table View - Show on lg screens and larger */}
      <div  className="hidden lg:block overflow-auto rounded-md border max-h-[70vh] shadow-cyan-500/20 shadow-2xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 text-xs">{t?.decisionspage?.expand || 'توسيع'}</TableHead>
              <TableHead className="text-xs">{t?.decisionspage?.decision_number || 'رقم القرار'}</TableHead>
              <TableHead className="text-xs">{t?.decisionspage?.decision_title || 'عنوان القرار'}</TableHead>
              <TableHead className="text-xs">{t?.decisionspage?.date || 'التاريخ'}</TableHead>
              <TableHead className="text-xs">{t?.decisionspage?.decision_type || 'نوع القرار'}</TableHead>
              <TableHead className="text-xs">{t?.decisionspage?.voting_stats || 'إحصائيات التصويت'}</TableHead>
              <TableHead className="text-center text-xs">{t?.decisionspage?.total_votes || 'إجمالي الأصوات'}</TableHead>
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
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-48"></div>
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
                    <div className="text-4xl">📊</div>
                    <p className="text-lg font-medium">{t?.decisionspage?.no_decisions_found || 'لم يتم العثور على قرارات مطابقة'}</p>
                    <p className="text-sm">{t?.decisionspage?.adjust_filters || 'جرب تعديل المرشحات الخاصة بك'}</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((decision, idx) => {
                const totalVotes = decision.voting.accepted + decision.voting.refused + decision.voting.abstained;
                const isExpanded = expandedRows.has(idx);
                
                return (
                  <React.Fragment key={decision.decision_number || idx}>
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
                      <TableCell className="font-medium">
                        <span className="text-xs">{decision.decision_number}</span>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="truncate text-xs" title={getDecisionTitle(decision)}>
                          {getDecisionTitle(decision)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs" style={language === 'ar' ? {direction:'rtl'} : {direction:'ltr'}}>{decision.date}</span>
                      </TableCell>
                      <TableCell>
                        {getDecisionTypeBadge(decision.voting)}
                      </TableCell>
                      <TableCell>
                        {getVotingStats(decision.voting)}
                      </TableCell>
                      <TableCell className="text-center font-bold">
                        <span className="flex items-center justify-center gap-1">
                          <Vote size={12} />
                          <span className="text-xs">{totalVotes}</span>
                        </span>
                      </TableCell>
                    </TableRow>
                    
                    {isExpanded && (
                      <TableRow>
                        <TableCell colSpan="7" className={`${
                    theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white'
                } p-6`}>
                          <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="space-y-4 ">
                            {/* Decision Title */}
                            <div className={`text-center p-3 ${theme === 'dark' ? 'bg-gray-700 border border-gray-100' : 'bg-gray-100 border border-gray-950'} ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'} rounded-lg w-90 md:w-full`}>
                                <h3 className="text-lg font-semibold mb-2 text-wrap">
                                {t?.decisionspage?.decision_details || 'تفاصيل القرار'}
                              </h3>
                              <p className="text-sm leading-relaxed text-wrap">
                                {getDecisionTitle(decision)}
                              </p>
                              </div>
                            

                            {/* Voting Summary */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                              <div className={`text-center p-3 ${theme === 'dark' ? 'bg-gray-200 border border-gray-100' : 'bg-gray-100 border border-gray-950'} rounded-lg w-90 md:w-full`}>
                                <div className="text-2xl font-bold text-green-600">{decision.voting.accepted}</div>
                                <div className="text-sm text-green-700">{t?.decisionspage?.accepted || 'موافق'}</div>
                              </div>
                              <div className={`text-center p-3 ${theme === 'dark' ? 'bg-gray-200 border border-gray-100' : 'bg-gray-100 border border-gray-950'} rounded-lg w-90 md:w-full`} w-90 md:w-full>
                                <div className="text-2xl font-bold text-red-600">{decision.voting.refused}</div>
                                <div className="text-sm text-red-700">{t?.decisionspage?.refused || 'رافض'}</div>
                              </div>
                              <div className={`text-center p-3 ${theme === 'dark' ? 'bg-gray-200 border border-gray-100' : 'bg-gray-100 border border-gray-950'} rounded-lg w-90 md:w-full`}>
                                <div className="text-2xl font-bold text-yellow-600">{decision.voting.abstained}</div>
                                <div className="text-sm text-yellow-700">{t?.decisionspage?.abstained || 'ممتنع'}</div>
                              </div>
                              <div className={`text-center p-3 ${theme === 'dark' ? 'bg-gray-200 border border-gray-100' : 'bg-gray-100 border border-gray-950'} rounded-lg w-90 md:w-full`}>
                                <div className="text-2xl font-bold text-blue-600">{decision.voting.present_members}</div>
                                <div className="text-sm text-blue-700">{t?.decisionspage?.present_members || 'الأعضاء الحاضرون'}</div>
                              </div>
                            </div>

                            {/* Members Lists */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-90 md:w-full">
                              {/* Attendees */}
                              {decision.attendees && decision.attendees.length > 0 && (
                                <div>
                                  <h4 className={`font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'} mb-2 flex items-center gap-2`}>
                                    <Users size={16} />
                                    {t?.decisionspage?.participants || 'المشاركون في التصويت'} ({decision.attendees.length})
                                  </h4>
                                  <div className="max-h-60 overflow-y-auto space-y-1">
                                    {decision.attendees.map((memberName, memberIdx) => (
                                      <div key={memberIdx} className={`p-2 ${theme === 'dark' ? 'bg-gray-700 border border-gray-100' : 'bg-gray-100 border border-gray-950'} ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'} rounded text-sm`}>
                                        <div className="font-medium  flex items-center justify-between">
                                          <span>{memberName}</span>
                                          <span className="text-xs">
                                            {decision.abstained_members?.includes(memberName) ? (
                                              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">ممتنع</span>
                                            ) : decision.refused_members?.includes(memberName) ? (
                                              <span className="px-2 py-1 bg-red-100 text-red-800 rounded">رافض</span>
                                            ) : (
                                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded">موافق</span>
                                            )}
                                          </span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Voting Breakdown */}
                              <div className="space-y-4">
                                {/* Abstained Members */}
                                {decision.abstained_members && decision.abstained_members.length > 0 && (
                                  <div>
                                    <h4 className={`font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'} mb-2 flex items-center gap-2`}>
                                      <MinusCircle size={16} />
                                      {t?.decisionspage?.abstained_members || 'الأعضاء الممتنعون'} ({decision.abstained_members.length})
                                    </h4>
                                    <div className="max-h-32 overflow-y-auto space-y-1">
                                      {decision.abstained_members.map((member, memberIdx) => (
                                        <div key={memberIdx} className={`p-2  rounded text-sm ${theme === 'dark' ? 'bg-gray-700 border border-gray-100' : 'bg-gray-100 border border-gray-950'} ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                                          <div className="font-medium ">{member}</div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Refused Members */}
                                {decision.refused_members && decision.refused_members.length > 0 && (
                                  <div>
                                    <h4 className={`font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'} mb-2 flex items-center gap-2`}>
                                      <XCircle size={16} />
                                      {t?.decisionspage?.refused_members || 'الأعضاء الرافضون'} ({decision.refused_members.length})
                                    </h4>
                                    <div className="max-h-32 overflow-y-auto space-y-1">
                                      {decision.refused_members.map((member, memberIdx) => (
                                        <div key={memberIdx} className={`p-2 ${theme === 'dark' ? 'bg-gray-700 border border-gray-100' : 'bg-gray-100 border border-gray-950'} ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'} rounded text-sm`}>
                                          <div className="font-medium ">{member}</div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Decision Details */}
                            <div className="mt-6 pt-4 border-t border-gray-200">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                                <div>
                                  <span className="font-medium">{t?.decisionspage?.decision_number || 'رقم القرار'}:</span> {decision.decision_number}
                                </div>
                                <div>
                                  <span className="font-medium" style={language === 'ar' ? {direction:'rtl'} : {direction:'ltr'}}>{t?.decisionspage?.decision_date || 'تاريخ القرار'}:</span> {formatDate(decision.date)}
                                </div>
                                <div>
                                  <span className="font-medium">{t?.decisionspage?.expressed_votes || 'الأصوات المعبر عنها'}:</span> {decision.voting.expressed_votes}
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
    </>
  );
}