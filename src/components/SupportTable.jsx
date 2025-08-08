import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { TrendingUp, Trophy } from "lucide-react";

export default function SupportTable({ data, isLoading, t, theme, language }) {
  // Function to format numbers with commas for better readability
  const formatNumber = (num) => {
    // Ensure num is a valid number before formatting
    const number = parseFloat(num);
    if (isNaN(number)) {
      return num; // Return original value if not a number
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Mobile card view for small screens
  const MobileCard = ({ row }) => {
    const grantAmount = parseFloat(row.المنحة.replace(/,/g, ''));
    const formattedAmount = formatNumber(grantAmount);

    return (
      <div className={`p-3 mb-3 rounded-lg border ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex justify-between items-start gap-3">
          {/* Left side: Association Name and Year */}
          <div className="flex-grow">
            <h3 className="font-semibold text-sm mb-2 break-words" style={language === 'ar' ? { direction: 'rtl' } : { direction: 'ltr' }}>
              {row['الجمعية المستفيدة']}
            </h3>
            <span className="inline-block px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
              {row.السنة}
            </span>
          </div>
          {/* Right side: Grant Amount */}
          <div className="flex-shrink-0 text-right">
            <span className="flex items-center justify-end gap-1 font-bold text-green-600 text-sm">
              <TrendingUp size={14} />
              {formattedAmount} DH
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Mobile Card View - Shows on screens smaller than md */}
      <div className="block md:hidden">
        {isLoading ? (
          // Loading skeleton for mobile cards
          Array.from({ length: 5 }).map((_, idx) => (
            <div key={`loading-card-${idx}`} className={`p-3 mb-3 rounded-lg border animate-pulse ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex justify-between items-start">
                <div className="flex-grow">
                  <div className={`h-4 rounded mb-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} w-3/4`}></div>
                  <div className={`h-5 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} w-16`}></div>
                </div>
                <div className={`h-4 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} w-24`}></div>
              </div>
            </div>
          ))
        ) : data.length === 0 ? (
          // "No data" message for mobile
          <div className={`text-center py-8 rounded-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            <div className="flex flex-col items-center gap-2">
              <Trophy size={40} className="text-yellow-500" />
              <p className="text-lg font-medium">{t?.supportpage?.no_grants_found || 'No matching grants found'}</p>
              <p className="text-sm">{t?.supportpage?.adjust_filters || 'Try adjusting your search filters'}</p>
            </div>
          </div>
        ) : (
          // Render mobile cards
          data.map((row, idx) => (
            <MobileCard key={idx} row={row} />
          ))
        )}
      </div>

      {/* Desktop Table View - Shows on md screens and larger */}
      <div className="hidden md:block overflow-auto rounded-md border max-h-[70vh] shadow-cyan-500/20 shadow-2xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24 text-xs">{t?.supportpage?.year || 'Year'}</TableHead>
              <TableHead className="text-left text-xs">{t?.supportpage?.association_name || 'Association Name'}</TableHead>
              <TableHead className="text-center text-xs">{t?.supportpage?.grant_amount || 'Grant Amount (DH)'}</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              // Loading skeleton for desktop table
              Array.from({ length: 10 }).map((_, idx) => (
                <TableRow key={`loading-${idx}`}>
                  <TableCell>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-24 ml-auto"></div>
                  </TableCell>
                </TableRow>
              ))
            ) : data.length === 0 ? (
              // "No data" message for desktop table
              <TableRow>
                <TableCell colSpan="3" className="text-center text-gray-500 py-8">
                  <div className="flex flex-col items-center gap-2">
                    <Trophy size={48} className="text-yellow-500" />
                    <p className="text-lg font-medium">{t?.supportpage?.no_grants_found || 'No matching grants found'}</p>
                    <p className="text-sm">{t?.supportpage?.adjust_filters || 'Try adjusting your search filters'}</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              // Render desktop table rows
              data.map((row, idx) => {
                const grantAmount = parseFloat(row.المنحة.replace(/,/g, ''));
                const formattedAmount = formatNumber(grantAmount);
                
                return (
                  <TableRow key={idx} className={`${theme === 'dark' ? 'hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`}>
                    <TableCell className="font-medium">
                      <span className="inline-block px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                        {row.السنة}
                      </span>
                    </TableCell>
                    <TableCell className="font-medium max-w-sm">
                      <Popover>
                        <PopoverTrigger asChild>
                          <span 
                            className="block truncate max-w-xs cursor-pointer" 
                            style={language === 'ar' ? { direction: 'rtl', textAlign: 'right' } : { direction: 'ltr' }}
                          >
                            {row['الجمعية المستفيدة']}
                          </span>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto max-w-md break-words p-3 bg-gray-800 text-white border-gray-600">
                          <span style={language === 'ar' ? { direction: 'rtl' } : { direction: 'ltr' }}>
                            {row['الجمعية المستفيدة']}
                          </span>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                    <TableCell className="text-center font-semibold">
                      <span className="text-green-600">
                        {formattedAmount} DH
                      </span>
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