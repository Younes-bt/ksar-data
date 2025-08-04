import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function MedicineTable({ data, isLoading, t, theme, language }) {
  return (
    <div className="overflow-auto rounded-md border max-h-[70vh] shadow-cyan-500/20 shadow-2xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t?.medicinepage?.medicine_name || 'Medicine Name'}</TableHead>
            <TableHead>{t?.medicinepage?.dosage || 'Dosage'}</TableHead>
            <TableHead>{t?.medicinepage?.form || 'Form'}</TableHead>
            <TableHead>{t?.medicinepage?.presentation || 'Presentation'}</TableHead>
            <TableHead className="text-right">{t?.medicinepage?.price || 'Price (DHS)'}</TableHead>
            <TableHead>{t?.medicinepage?.therapeutic_class || 'Therapeutic Class'}</TableHead>
            <TableHead>{t?.medicinepage?.status || 'Status'}</TableHead>
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
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2 ml-auto"></div>
                </TableCell>
              </TableRow>
            ))
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan="7" className="text-center text-gray-500 py-8">
                <div className="flex flex-col items-center gap-2">
                  <div className="text-4xl">💊</div>
                  <p className="text-lg font-medium">{t?.medicinepage?.no_medicines_found || 'No matching medicines found'}</p>
                  <p className="text-sm">{t?.medicinepage?.adjust_filters || 'Try adjusting your search filters'}</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, idx) => {
              // Format price
              const price = row.PPV ? parseFloat(row.PPV.replace(',', '.')).toFixed(2) : "N/A";
              
              // Determine status badge color
              const getStatusBadge = (status) => {
                if (status === "Commercialisé") {
                  return (
                    <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                      {t?.medicinepage?.commercialized || 'Available'}
                    </span>
                  );
                } else if (status === "Non Commercialisé") {
                  return (
                    <span className="inline-block px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                      {t?.medicinepage?.not_commercialized || 'Not Available'}
                    </span>
                  );
                } else {
                  return (
                    <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                      {status || t?.medicinepage?.unknown_status || 'Unknown'}
                    </span>
                  );
                }
              };
              
              return (
                <TableRow key={idx} className={`${theme === 'dark' ? 'hover:bg-gray-700' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'}`}>
                  <TableCell className="font-medium max-w-md">
                    <span className="block truncate" title={row.specialite}>
                      {row.specialite}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <span className="text-sm text-gray-500" title={row.dosage}>
                      {row.dosage || "N/A"}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <span className="text-sm text-gray-500" title={row.forme}>
                      {row.forme || "N/A"}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <span className="text-sm text-gray-500" title={row.presentation}>
                      {row.presentation || "N/A"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    <span className={price !== "N/A" ? "text-green-700" : "text-gray-500"}>
                      {price !== "N/A" ? `${price} DH` : (t?.medicinepage?.price_na || "Price N/A")}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <span className="text-sm text-gray-500" title={row.class_therapeutique}>
                      {row.class_therapeutique || "N/A"}
                    </span>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(row.statut_commercialisation)}
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