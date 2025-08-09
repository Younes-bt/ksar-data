import React, { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

export default function BudgetTable({ data, isLoading, t, theme, language }) {
  const [sortOrder, setSortOrder] = useState(null); // null, 'asc', 'desc'

  // Helper function to translate section values
  const translateSection = (section) => {
    if (!t.sections) return section; // fallback if translations not available
    
    switch(section) {
      case 'Fonctionnement':
        return t.sections.fonctionnement || section;
      case 'Equipement':
        return t.sections.equipement || section;
      default:
        return section;
    }
  };

  // Helper function to translate type values
  const translateType = (type) => {
    if (!t.types) return type; // fallback if translations not available
    
    switch(type) {
      case 'Crédits':
        return t.types.credits || type;
      case 'recettes':
        return t.types.recettes || type;
      default:
        return type;
    }
  };

  // Sort data based on approved amount
  const sortedData = useMemo(() => {
    if (!sortOrder) return data;
    
    return [...data].sort((a, b) => {
      const amountA = Number(a.amount_approved);
      const amountB = Number(b.amount_approved);
      
      if (sortOrder === 'asc') {
        return amountA - amountB;
      } else {
        return amountB - amountA;
      }
    });
  }, [data, sortOrder]);

  const handleSort = () => {
    if (sortOrder === null) {
      setSortOrder('desc'); // First click: highest to lowest
    } else if (sortOrder === 'desc') {
      setSortOrder('asc'); // Second click: lowest to highest
    } else {
      setSortOrder(null); // Third click: reset to original order
    }
  };

  const getSortIcon = () => {
    if (sortOrder === 'asc') {
      return <ChevronUp className="h-4 w-4" />;
    } else if (sortOrder === 'desc') {
      return <ChevronDown className="h-4 w-4" />;
    } else {
      return <ChevronsUpDown className="h-4 w-4 opacity-50" />;
    }
  };

  return (
    <div className="overflow-auto rounded-md border max-h-[70vh] shadow-cyan-500/20 shadow-2xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t.table.year}</TableHead>
            <TableHead className='text-center'>{t.table.label}</TableHead>
            <TableHead className="text-right">
              <div 
                className="flex items-center justify-end gap-1 cursor-pointer rounded px-2 py-1 transition-colors"
                onClick={handleSort}
              >
                {t.table.approved}
                {getSortIcon()}
              </div>
            </TableHead>
            <TableHead>{t.table.section}</TableHead>
            <TableHead>{t.table.type}</TableHead>
            <TableHead>{t.table.code}</TableHead>
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
          ) : sortedData.length === 0 ? (
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
            sortedData.map((row, idx) => (
              <TableRow key={idx} className={`${theme === 'dark' ? 'hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`}>
                <TableCell className="font-medium">{row.year}</TableCell>
                <TableCell className="max-w-45 truncate">
                  <Popover>
                    <PopoverTrigger asChild>
                      <div style={language === 'ar' ? { direction: 'rtl' } : { direction: 'ltr' }} className="cursor-pointer tap-highlight-transparent">
                        {language === 'ar' ? (
                          <span dir="rtl">{row.ar_label}</span>
                        ) : (
                          row.fr_label
                        )}
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto max-w-xs break-words p-3 bg-gray-200">
                      {language === 'ar' ? (
                        <span style={language === 'ar' ? { direction: 'rtl' } : { direction: 'ltr' }}>{row.ar_label}</span>
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
                    row.section === 'Fonctionnement' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {translateSection(row.section)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    row.type === 'Crédits' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {translateType(row.type)}
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