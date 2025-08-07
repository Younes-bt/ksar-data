import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Vote, CheckCircle, XCircle, MinusCircle, TrendingUp, TrendingDown, Users } from "lucide-react";

export default function MembersVotingTable({ data, isLoading, t, theme, language }) {
  
  const getParticipationPercentageBadge = (percentage) => {
    const pct = parseFloat(percentage);
    
    if (pct >= 90) {
      return (
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">
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

  const getAcceptancePercentageBadge = (percentage) => {
    const pct = parseFloat(percentage);
    
    if (pct >= 80) {
      return (
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">
          <CheckCircle size={10} />
          <span className="hidden sm:inline">{percentage}%</span>
          <span className="sm:hidden">{percentage}</span>
        </span>
      );
    } else if (pct >= 50) {
      return (
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
          <Vote size={10} />
          <span className="hidden sm:inline">{percentage}%</span>
          <span className="sm:hidden">{percentage}</span>
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-xs bg-red-100 text-red-800 rounded-full">
          <XCircle size={10} />
          <span className="hidden sm:inline">{percentage}%</span>
          <span className="sm:hidden">{percentage}</span>
        </span>
      );
    }
  };

  const getPerformanceIcon = (participationPercentage) => {
    const pct = parseFloat(participationPercentage);
    
    if (pct >= 90) {
      return <TrendingUp className="text-green-600" size={12} />;
    } else if (pct >= 50) {
      return <Users className="text-yellow-600" size={12} />;
    } else {
      return <TrendingDown className="text-red-600" size={12} />;
    }
  };

  // Mobile card view for very small screens
  const MobileCard = ({ member, rank }) => (
    <div className={`p-3 mb-3 rounded-lg border ${
      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          {getPerformanceIcon(member.participationPercentage)}
          <span className="font-bold text-sm">#{rank}</span>
        </div>
        <div className="flex gap-1">
          {getAcceptancePercentageBadge(member.acceptancePercentage)}
        </div>
      </div>
      
      <h3 className="font-semibold text-sm mb-2" title={member.name}>
        {member.name}
      </h3>
      
      <div className="mb-2">
        {getParticipationPercentageBadge(member.participationPercentage)}
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-1">
          <Vote size={12} className="text-blue-600" />
          <span>مشارك: {member.totalParticipated}</span>
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle size={12} className="text-green-600" />
          <span>موافق: {member.totalAccepted}</span>
        </div>
        <div className="flex items-center gap-1">
          <XCircle size={12} className="text-red-600" />
          <span>رافض: {member.totalRefused}</span>
        </div>
        <div className="flex items-center gap-1">
          <MinusCircle size={12} className="text-yellow-600" />
          <span>ممتنع: {member.totalAbstained}</span>
        </div>
      </div>
      
      <div className="mt-2 pt-2 border-t border-gray-200">
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <Users size={12} />
          <span>المجموع: {member.totalDecisions}</span>
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
            <p className="text-lg font-medium">{t?.membersvotingpage?.no_members_found || 'لم يتم العثور على أعضاء مطابقين'}</p>
            <p className="text-sm">{t?.membersvotingpage?.adjust_filters || 'جرب تعديل المرشحات الخاصة بك'}</p>
          </div>
        ) : (
          data.map((member, idx) => (
            <MobileCard key={idx} member={member} rank={idx + 1} />
          ))
        )}
      </div>

      {/* Desktop Table View - Show on md screens and larger */}
      <div className="hidden md:block overflow-auto rounded-md border max-h-[70vh] shadow-cyan-500/20 shadow-2xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 text-xs">{t?.membersvotingpage?.rank || 'الترتيب'}</TableHead>
              <TableHead className="text-xs">{t?.membersvotingpage?.member_name || 'اسم العضو'}</TableHead>
              <TableHead className="text-center text-xs">{t?.membersvotingpage?.acceptance_percentage || 'نسبة الموافقة'}</TableHead>
              <TableHead className="text-center text-xs">{t?.membersvotingpage?.total_participation || 'مشاركة'}</TableHead>
              <TableHead className="text-center text-xs lg:table-cell hidden">{t?.membersvotingpage?.accepted_votes || 'موافق'}</TableHead>
              <TableHead className="text-center text-xs lg:table-cell hidden">{t?.membersvotingpage?.refused_votes || 'رافض'}</TableHead>
              <TableHead className="text-center text-xs lg:table-cell hidden">{t?.membersvotingpage?.abstained_votes || 'ممتنع'}</TableHead>
              <TableHead className="text-center text-xs">{t?.membersvotingpage?.total_decisions || 'المجموع'}</TableHead>
              <TableHead className="text-center text-xs">{t?.membersvotingpage?.participation_percentage || 'نسبة المشاركة'}</TableHead>
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
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-12 mx-auto"></div>
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
                  <TableCell className="lg:table-cell hidden">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-12 mx-auto"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-16 mx-auto"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-16 mx-auto"></div>
                  </TableCell>
                </TableRow>
              ))
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan="9" className="text-center text-gray-500 py-8">
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-4xl">👥</div>
                    <p className="text-lg font-medium">{t?.membersvotingpage?.no_members_found || 'لم يتم العثور على أعضاء مطابقين'}</p>
                    <p className="text-sm">{t?.membersvotingpage?.adjust_filters || 'جرب تعديل المرشحات الخاصة بك'}</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((member, idx) => {
                const rank = idx + 1;
                
                return (
                  <TableRow 
                    key={idx} 
                    className={`${theme === 'dark' ? 'hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'} transition-colors`}
                  >
                    <TableCell className="font-bold text-center">
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-xs font-semibold">#{rank}</span>
                      </div>
                    </TableCell>
                    
                    <TableCell className="font-medium max-w-xs">
                      <div className="flex flex-col">
                        <span className="font-semibold text-xs lg:text-sm" title={member.name}>
                          {member.name}
                        </span>
                      </div>
                    </TableCell>
                    
                    <TableCell className="text-center">
                      {getAcceptancePercentageBadge(member.acceptancePercentage)}
                    </TableCell>
                    
                    <TableCell className="text-center">
                      <span className="flex items-center justify-center gap-1 font-semibold text-blue-700">
                        <Vote size={12} />
                        <span className="text-xs">{member.totalParticipated}</span>
                      </span>
                    </TableCell>
                    
                    <TableCell className="text-center lg:table-cell hidden">
                      <span className="flex items-center justify-center gap-1 font-semibold text-green-700">
                        <CheckCircle size={12} />
                        <span className="text-xs">{member.totalAccepted}</span>
                      </span>
                    </TableCell>
                    
                    <TableCell className="text-center lg:table-cell hidden">
                      <span className="flex items-center justify-center gap-1 font-semibold text-red-700">
                        <XCircle size={12} />
                        <span className="text-xs">{member.totalRefused}</span>
                      </span>
                    </TableCell>
                    
                    <TableCell className="text-center lg:table-cell hidden">
                      <span className="flex items-center justify-center gap-1 font-semibold text-yellow-700">
                        <MinusCircle size={12} />
                        <span className="text-xs">{member.totalAbstained}</span>
                      </span>
                    </TableCell>
                    
                    <TableCell className="text-center">
                      <span className="flex items-center justify-center gap-1 font-bold text-gray-500">
                        <Users size={12} />
                        <span className="text-xs">{member.totalDecisions}</span>
                      </span>
                    </TableCell>
                    
                    <TableCell className="text-center">
                      {getParticipationPercentageBadge(member.participationPercentage)}
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