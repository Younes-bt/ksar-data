import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function BudgetTable({ data, isLoading, t, theme, language }) {
  return (
    <div className="overflow-auto rounded-md border max-h-[70vh] shadow-cyan-500/20 shadow-2xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Year</TableHead>
            <TableHead >Label</TableHead> {/* Changed to generic "Label" */}
            <TableHead className="text-right">Approved</TableHead>
            <TableHead>section</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Code</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            // Loading skeleton rows
            Array.from({ length: 5 }).map((_, idx) => (
              <TableRow key={`loading-${idx}`}>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2 ml-auto"></div>
                </TableCell>
              </TableRow>
            ))
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan="6" className="text-center text-gray-500 py-8">
                <div className="flex flex-col items-center gap-2">
                  <div className="text-4xl">📊</div>
                  <p className="text-lg font-medium">No matching data found</p>
                  <p className="text-sm">Try adjusting your search filters</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, idx) => (
              <TableRow key={idx} className={`${theme === 'dark' ? 'hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`}>
                <TableCell className="font-medium">{row.year}</TableCell>
                <TableCell className="max-w-45 truncate">
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="cursor-pointer tap-highlight-transparent">
                        {language === 'ar' ? (
                          <span dir="rtl">{row.ar_label}</span>
                        ) : (
                          row.fr_label
                        )}
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto max-w-xs break-words p-3 bg-gray-200">
                      {language === 'ar' ? (
                        <span dir="rtl">{row.ar_label}</span>
                      ) : (
                        row.fr_label
                      )}
                    </PopoverContent>
                  </Popover>
                </TableCell>
                <TableCell className="text-right font-semibold">
                  <span className="text-green-600">
                    {Number(row.amount_approved).toLocaleString("fr-FR")} DH
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    row.section === 'section' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {row.section}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    row.type === 'Crédits' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {row.type}
                  </span>
                </TableCell>
                <TableCell className="font-mono text-sm">{row.code}</TableCell>
                
                
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}