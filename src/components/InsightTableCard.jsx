// src/components/InsightTableCard.jsx

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency, formatNumber } from '@/insights/enhancedDataProcessor';
import { Search, Download, Filter } from 'lucide-react';

export default function InsightTableCard({ 
  data, 
  language = 'fr', 
  theme = 'dark',
  title 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

  // Filter data based on search term
  const filteredData = data.filter(row => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      (row.fr_label || '').toLowerCase().includes(searchLower) ||
      (row.ar_label || '').toLowerCase().includes(searchLower) ||
      (row.prog || '').toString().includes(searchLower) ||
      (row.year || '').toString().includes(searchLower)
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handleExport = () => {
    // Simple CSV export
    const headers = ['Label FR', 'Label AR', 'Year', 'Program', 'Amount Proposed', 'Amount Approved'];
    const csvContent = [
      headers.join(','),
      ...filteredData.map(row => [
        `"${row.fr_label || ''}"`,
        `"${row.ar_label || ''}"`,
        row.year || '',
        row.prog || '',
        row.amount_proposed || 0,
        row.amount_approved || 0
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `insight_data_${Date.now()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (!data || data.length === 0) {
    return (
      <Card className={theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}>
        <CardHeader>
          <CardTitle className="text-lg">
            {title || (language === 'ar' ? 'البيانات' : language === 'fr' ? 'Données' : 'Data')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32 text-gray-500">
            <div className="text-center">
              <div className="text-4xl mb-2">📋</div>
              <p>
                {language === 'ar' ? 'لا توجد بيانات متاحة' :
                 language === 'fr' ? 'Aucune donnée disponible' :
                 'No data available'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">
            {title || (language === 'ar' ? 'البيانات المفلترة' : 
                     language === 'fr' ? 'Données filtrées' : 
                     'Filtered Data')}
          </CardTitle>
          <div className="text-sm text-gray-500">
            {formatNumber(filteredData.length, language)} {
              language === 'ar' ? 'عنصر' :
              language === 'fr' ? 'éléments' :
              'items'
            }
          </div>
        </div>
        
        {/* Search and Actions */}
        <div className="flex gap-2 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder={
                language === 'ar' ? 'بحث في البيانات...' :
                language === 'fr' ? 'Rechercher dans les données...' :
                'Search in data...'
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="shrink-0"
          >
            <Download className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'تصدير' : 
             language === 'fr' ? 'Exporter' : 
             'Export'}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Table */}
        <div className="rounded-md border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">#</TableHead>
                  <TableHead className="min-w-[200px]">
                    {language === 'ar' ? 'التسمية' :
                     language === 'fr' ? 'Libellé' :
                     'Label'}
                  </TableHead>
                  <TableHead className="w-20">
                    {language === 'ar' ? 'السنة' :
                     language === 'fr' ? 'Année' :
                     'Year'}
                  </TableHead>
                  <TableHead className="w-24">
                    {language === 'ar' ? 'البرنامج' :
                     language === 'fr' ? 'Prog.' :
                     'Program'}
                  </TableHead>
                  <TableHead className="text-right min-w-[120px]">
                    {language === 'ar' ? 'المبلغ المقترح' :
                     language === 'fr' ? 'Montant Proposé' :
                     'Proposed Amount'}
                  </TableHead>
                  <TableHead className="text-right min-w-[120px]">
                    {language === 'ar' ? 'المبلغ المعتمد' :
                     language === 'fr' ? 'Montant Approuvé' :
                     'Approved Amount'}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-gray-500">
                      {startIndex + index + 1}
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="max-w-xs">
                        <div className="truncate" title={row.fr_label}>
                          {row.fr_label || 'N/A'}
                        </div>
                        {row.ar_label && (
                          <div className="text-xs text-gray-500 truncate" title={row.ar_label}>
                            {row.ar_label}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{row.year || 'N/A'}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {row.prog || 'N/A'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm">
                      {formatCurrency(row.amount_proposed || 0, language)}
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm font-medium">
                      {formatCurrency(row.amount_approved || 0, language)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
              {language === 'ar' ? 
                `عرض ${startIndex + 1}-${Math.min(startIndex + rowsPerPage, filteredData.length)} من ${filteredData.length}` :
                language === 'fr' ?
                `Affichage ${startIndex + 1}-${Math.min(startIndex + rowsPerPage, filteredData.length)} de ${filteredData.length}` :
                `Showing ${startIndex + 1}-${Math.min(startIndex + rowsPerPage, filteredData.length)} of ${filteredData.length}`
              }
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                {language === 'ar' ? 'السابق' : 
                 language === 'fr' ? 'Précédent' : 
                 'Previous'}
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + Math.max(1, currentPage - 2);
                  if (pageNum > totalPages) return null;
                  
                  return (
                    <Button
                      key={pageNum}
                      variant={pageNum === currentPage ? "default" : "outline"}
                      size="sm"
                      className="w-8 h-8 p-0"
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                {language === 'ar' ? 'التالي' : 
                 language === 'fr' ? 'Suivant' : 
                 'Next'}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}