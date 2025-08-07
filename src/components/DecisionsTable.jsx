import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Vote, CheckCircle, XCircle, MinusCircle, Users } from "lucide-react";

export default function DecisionsTable({ data, isLoading, t, theme, language }) {
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
    // Handle Arabic date format
    if (dateString.includes(' ')) {
      return dateString; // Already in Arabic format
    }
    
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-MA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
    <div className="flex gap-2 text-xs">
      <span className="flex items-center gap-1 text-green-600">
        <CheckCircle size={10} />
        {voting.accepted}
      </span>
      <span className="flex items-center gap-1 text-red-600">
        <XCircle size={10} />
        {voting.refused}
      </span>
      <span className="flex items-center gap-1 text-yellow-600">
        <MinusCircle size={10} />
        {voting.abstained}
      </span>
    </div>
  );

  // Mobile card view for very small screens
  const MobileCard = ({ decision, index }) => {
    const totalVotes = decision.voting.accepted + decision.voting.refused + decision.voting.abstained;
    const isExpanded = expandedRows.has(index);

    return (
      <div className={`mb-3 rounded-lg border ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="p-3">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleRowExpansion(index)}
                className="p-1 h-6 w-6"
              >
                {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </Button>
              <span className="font-bold text-sm">{decision.decision_number}</span>
            </div>
            <div className="flex gap-1 items-center">
              <Vote size={12} />
              <span className="text-xs font-bold">{totalVotes}</span>
            </div>
          </div>
          
          <h3 className="font-semibold text-sm mb-2 line-clamp-2" title={decision.title}>
            {decision.title}
          </h3>
          
          <div className="flex justify-between items-center mb-2">
            {getDecisionTypeBadge(decision.voting)}
            <span className="text-xs text-gray-600">{formatDate(decision.date)}</span>
          </div>
          
          <div className="mt-2">
            {getVotingStats(decision.voting)}
          </div>
        </div>

        {/* Mobile Expanded Content */}
        {isExpanded && (
          <div className={`p-3 border-t ${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
            <div className="space-y-3">
              {/* Decision Title */}
              <div className="p-2 bg-gray-300 rounded text-center">
                <h4 className="font-semibold text-gray-950 text-sm mb-1">
                  {t?.decisionspage?.decision_details || 'تفاصيل القرار'}
                </h4>
                <p className="text-gray-900 text-xs leading-relaxed">
                  {decision.title}
                </p>
              </div>

              {/* Voting Summary */}
              <div className="grid grid-cols-2 gap-2">
                <div className="text-center p-2 bg-gray-300 rounded">
                  <div className="text-lg font-bold text-green-600">{decision.voting.accepted}</div>
                  <div className="text-xs text-green-700">{t?.decisionspage?.accepted || 'موافق'}</div>
                </div>
                <div className="text-center p-2 bg-gray-300 rounded">
                  <div className="text-lg font-bold text-red-600">{decision.voting.refused}</div>
                  <div className="text-xs text-red-700">{t?.decisionspage?.refused || 'رافض'}</div>
                </div>
                <div className="text-center p-2 bg-gray-300 rounded">
                  <div className="text-lg font-bold text-yellow-600">{decision.voting.abstained}</div>
                  <div className="text-xs text-yellow-700">{t?.decisionspage?.abstained || 'ممتنع'}</div>
                </div>
                <div className="text-center p-2 bg-gray-300 rounded">
                  <div className="text-lg font-bold text-blue-600">{decision.voting.present_members}</div>
                  <div className="text-xs text-blue-700">{t?.decisionspage?.present_members || 'حاضر'}</div>
                </div>
              </div>

              {/* Members Lists */}
              {decision.attendees && decision.attendees.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-200 text-sm mb-2 flex items-center gap-1">
                    <Users size={12} />
                    {t?.decisionspage?.participants || 'المشاركون'} ({decision.attendees.length})
                  </h4>
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {decision.attendees.slice(0, 3).map((memberName, memberIdx) => (
                      <div key={memberIdx} className="p-1 bg-gray-300 rounded text-xs">
                        <div className="font-medium text-gray-950 flex items-center justify-between">
                          <span className="truncate">{memberName}</span>
                          <span className="text-xs ml-1">
                            {decision.abstained_members?.includes(memberName) ? (
                              <span className="px-1 py-0.5 bg-yellow-100 text-yellow-800 rounded text-xs">ممتنع</span>
                            ) : decision.refused_members?.includes(memberName) ? (
                              <span className="px-1 py-0.5 bg-red-100 text-red-800 rounded text-xs">رافض</span>
                            ) : (
                              <span className="px-1 py-0.5 bg-green-100 text-green-800 rounded text-xs">موافق</span>
                            )}
                          </span>
                        </div>
                      </div>
                    ))}
                    {decision.attendees.length > 3 && (
                      <div className="text-xs text-gray-500 text-center">
                        وآخرين ({decision.attendees.length - 3})...
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Card View - Show on screens smaller than lg (1024px) */}
      <div className="block lg:hidden">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, idx) => (
            <div key={`loading-card-${idx}`} className="p-3 mb-3 rounded-lg border bg-gray-50 animate-pulse">
              <div className="flex justify-between items-center mb-2">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-12"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="flex justify-between items-center">
                <div className="h-6 bg-gray-200 rounded w-16"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          ))
        ) : data.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl mb-2">📊</div>
            <p className="text-lg font-medium">{t?.decisionspage?.no_decisions_found || 'لم يتم العثور على قرارات مطابقة'}</p>
            <p className="text-sm">{t?.decisionspage?.adjust_filters || 'جرب تعديل المرشحات الخاصة بك'}</p>
          </div>
        ) : (
          data.map((decision, idx) => (
            <MobileCard key={idx} decision={decision} index={idx} />
          ))
        )}
      </div>

      {/* Desktop Table View - Show on lg screens and larger */}
      <div className="hidden lg:block overflow-auto rounded-md border max-h-[70vh] shadow-cyan-500/20 shadow-2xl">
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
                      <TableCell className="font-medium">
                        <span className="text-xs">{decision.decision_number}</span>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <div className="truncate text-xs" title={decision.title}>
                          {decision.title}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs">{formatDate(decision.date)}</span>
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
                        <TableCell colSpan="7" className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} p-6`}>
                          <div className="space-y-4 ">
                            {/* Decision Title */}
                            <div className="text-center p-3 bg-gray-300 rounded-lg w-90 md:w-full">
                                <h3 className="text-lg font-semibold text-gray-950 mb-2 text-wrap">
                                {t?.decisionspage?.decision_details || 'تفاصيل القرار'}
                              </h3>
                              <p className="text-gray-900 text-sm leading-relaxed text-wrap">
                                {decision.title}
                              </p>
                              </div>
                            

                            {/* Voting Summary */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                              <div className="text-center p-3 bg-gray-300 rounded-lg w-90 md:w-full">
                                <div className="text-2xl font-bold text-green-600">{decision.voting.accepted}</div>
                                <div className="text-sm text-green-700">{t?.decisionspage?.accepted || 'موافق'}</div>
                              </div>
                              <div className="text-center p-3 bg-gray-300 rounded-lg w-90 md:w-full" w-90 md:w-full>
                                <div className="text-2xl font-bold text-red-600">{decision.voting.refused}</div>
                                <div className="text-sm text-red-700">{t?.decisionspage?.refused || 'رافض'}</div>
                              </div>
                              <div className="text-center p-3 bg-gray-300 rounded-lg w-90 md:w-full">
                                <div className="text-2xl font-bold text-yellow-600">{decision.voting.abstained}</div>
                                <div className="text-sm text-yellow-700">{t?.decisionspage?.abstained || 'ممتنع'}</div>
                              </div>
                              <div className="text-center p-3 bg-gray-300 rounded-lg w-90 md:w-full">
                                <div className="text-2xl font-bold text-blue-600">{decision.voting.present_members}</div>
                                <div className="text-sm text-blue-700">{t?.decisionspage?.present_members || 'الأعضاء الحاضرون'}</div>
                              </div>
                            </div>

                            {/* Members Lists */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-90 md:w-full">
                              {/* Attendees */}
                              {decision.attendees && decision.attendees.length > 0 && (
                                <div>
                                  <h4 className="font-semibold text-gray-200 mb-2 flex items-center gap-2">
                                    <Users size={16} />
                                    {t?.decisionspage?.participants || 'المشاركون في التصويت'} ({decision.attendees.length})
                                  </h4>
                                  <div className="max-h-60 overflow-y-auto space-y-1">
                                    {decision.attendees.map((memberName, memberIdx) => (
                                      <div key={memberIdx} className="p-2 bg-gray-300 rounded text-sm">
                                        <div className="font-medium text-gray-950 flex items-center justify-between">
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
                                    <h4 className="font-semibold text-gray-200 mb-2 flex items-center gap-2">
                                      <MinusCircle size={16} />
                                      {t?.decisionspage?.abstained_members || 'الأعضاء الممتنعون'} ({decision.abstained_members.length})
                                    </h4>
                                    <div className="max-h-32 overflow-y-auto space-y-1">
                                      {decision.abstained_members.map((member, memberIdx) => (
                                        <div key={memberIdx} className="p-2 bg-gray-300 rounded text-sm">
                                          <div className="font-medium text-gray-950">{member}</div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Refused Members */}
                                {decision.refused_members && decision.refused_members.length > 0 && (
                                  <div>
                                    <h4 className="font-semibold text-gray-200 mb-2 flex items-center gap-2">
                                      <XCircle size={16} />
                                      {t?.decisionspage?.refused_members || 'الأعضاء الرافضون'} ({decision.refused_members.length})
                                    </h4>
                                    <div className="max-h-32 overflow-y-auto space-y-1">
                                      {decision.refused_members.map((member, memberIdx) => (
                                        <div key={memberIdx} className="p-2 bg-gray-300 rounded text-sm">
                                          <div className="font-medium text-gray-950">{member}</div>
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
                                  <span className="font-medium">{t?.decisionspage?.decision_date || 'تاريخ القرار'}:</span> {formatDate(decision.date)}
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