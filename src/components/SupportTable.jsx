import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function SupportTable({ data, isLoading, t, theme, language }) {
  // Function to format numbers with commas for better readability
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="overflow-auto rounded-md border max-h-[70vh] shadow-cyan-500/20 shadow-2xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t?.supportpage?.year || 'Year'}</TableHead>
            <TableHead>{t?.supportpage?.association_name || 'Association Name'}</TableHead>
            <TableHead className="text-right">{t?.supportpage?.grant_amount || 'Grant Amount (DH)'}</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            // Loading skeleton rows
            Array.from({ length: 5 }).map((_, idx) => (
              <TableRow key={`loading-${idx}`}>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-24 ml-auto"></div>
                </TableCell>
              </TableRow>
            ))
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan="3" className="text-center text-gray-500 py-8">
                <div className="flex flex-col items-center gap-2">
                  <div className="text-4xl">🏆</div>
                  <p className="text-lg font-medium">{t?.supportpage?.no_grants_found || 'No matching grants found'}</p>
                  <p className="text-sm">{t?.supportpage?.adjust_filters || 'Try adjusting your search filters'}</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, idx) => {
              // Parse and format the grant amount
              const grantAmount = parseFloat(row.المنحة.replace(/,/g, ''));
              const formattedAmount = formatNumber(grantAmount);
              
              return (
                <TableRow key={idx} className={`${theme === 'dark' ? 'hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`}>
                  <TableCell className="font-medium">
                    <span className="inline-block px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                      {row.السنة}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium max-w-md">
                    <span 
                      className="block" 
                      title={row['الجمعية المستفيدة']}
                      style={language === 'ar' ? { direction: 'rtl' } : { direction: 'ltr' }}
                    >
                      {row['الجمعية المستفيدة']}
                    </span>
                    {/* Show sport type as a small badge if identifiable */}
                    {row['الجمعية المستفيدة'].includes('كرة القدم') && (
                      <span className="inline-block  px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                        {t?.supportpage?.football || 'Football'}
                      </span>
                    )}
                    {row['الجمعية المستفيدة'].includes('كرة اليد') && (
                      <span className="inline-block mt-1 px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">
                        {t?.supportpage?.handball || 'Handball'}
                      </span>
                    )}
                    {row['الجمعية المستفيدة'].includes('كرة السلة') && (
                      <span className="inline-block mt-1 px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                        {t?.supportpage?.basketball || 'Basketball'}
                      </span>
                    )}
                    {row['الجمعية المستفيدة'].includes('ألعاب القوى') && (
                      <span className="inline-block mt-1 px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                        {t?.supportpage?.athletics || 'Athletics'}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
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
  );
}