import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Vote, CheckCircle, XCircle, MinusCircle, TrendingUp, TrendingDown, Users } from "lucide-react";

export default function MembersVotingTable({ data, isLoading, t, theme, language }) {
  
  const getParticipationPercentageBadge = (percentage) => {
    const pct = parseFloat(percentage);
    
    if (pct >= 90) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
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

  const getAcceptancePercentageBadge = (percentage) => {
    const pct = parseFloat(percentage);
    
    if (pct >= 80) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
          <CheckCircle size={12} />
          {percentage}%
        </span>
      );
    } else if (pct >= 50) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
          <Vote size={12} />
          {percentage}%
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
          <XCircle size={12} />
          {percentage}%
        </span>
      );
    }
  };

  const getPerformanceIcon = (participationPercentage) => {
    const pct = parseFloat(participationPercentage);
    
    if (pct >= 90) {
      return <TrendingUp className="text-green-600" size={16} />;
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
            <TableHead className="w-12">{t?.membersvotingpage?.rank || 'الترتيب'}</TableHead>
            <TableHead>{t?.membersvotingpage?.member_name || 'اسم العضو'}</TableHead>
            <TableHead className="text-center">{t?.membersvotingpage?.total_participation || 'إجمالي المشاركة'}</TableHead>
            <TableHead className="text-center">{t?.membersvotingpage?.accepted_votes || 'أصوات الموافقة'}</TableHead>
            <TableHead className="text-center">{t?.membersvotingpage?.refused_votes || 'أصوات الرفض'}</TableHead>
            <TableHead className="text-center">{t?.membersvotingpage?.abstained_votes || 'أصوات الامتناع'}</TableHead>
            <TableHead className="text-center">{t?.membersvotingpage?.total_decisions || 'إجمالي القرارات'}</TableHead>
            <TableHead className="text-center">{t?.membersvotingpage?.participation_percentage || 'نسبة المشاركة'}</TableHead>
            <TableHead className="text-center">{t?.membersvotingpage?.acceptance_percentage || 'نسبة الموافقة'}</TableHead>
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
              // Calculate the actual rank based on the original index before pagination
              const rank = idx + 1; // This will show 1, 2, 3... for each page
              
              return (
                <TableRow 
                  key={idx} 
                  className={`${theme === 'dark' ? 'hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'} transition-colors`}
                >
                  <TableCell className="font-bold text-center">
                    <div className="flex items-center justify-center gap-2">
                      {getPerformanceIcon(member.participationPercentage)}
                      <span className="text-sm font-semibold">#{rank}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell className="font-medium max-w-xs">
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm" title={member.name}>
                        {member.name}
                      </span>
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <span className="flex items-center justify-center gap-1 font-semibold text-blue-700">
                      <Vote size={14} />
                      {member.totalParticipated}
                    </span>
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <span className="flex items-center justify-center gap-1 font-semibold text-green-700">
                      <CheckCircle size={14} />
                      {member.totalAccepted}
                    </span>
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <span className="flex items-center justify-center gap-1 font-semibold text-red-700">
                      <XCircle size={14} />
                      {member.totalRefused}
                    </span>
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <span className="flex items-center justify-center gap-1 font-semibold text-yellow-700">
                      <MinusCircle size={14} />
                      {member.totalAbstained}
                    </span>
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <span className="flex items-center justify-center gap-1 font-bold text-gray-700">
                      <Users size={14} />
                      {member.totalDecisions}
                    </span>
                  </TableCell>
                  
                  <TableCell className="text-center">
                    {getParticipationPercentageBadge(member.participationPercentage)}
                  </TableCell>
                  
                  <TableCell className="text-center">
                    {getAcceptancePercentageBadge(member.acceptancePercentage)}
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