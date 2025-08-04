// src/components/InsightsSidebar.jsx

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Search } from 'lucide-react';
import { enhancedInsights, getInsightsByCategory } from '@/insights/enhancedInsightConfigs';

export default function InsightsSidebar({ 
  selectedInsightId, 
  onInsightSelect, 
  language = 'fr', 
  theme = 'dark' 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredInsights = enhancedInsights.filter(insight =>
    insight.question[language]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    insight.question.fr?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [
    { id: 'revenue', label: { en: 'Revenue', fr: 'Recettes', ar: 'الإيرادات' }, icon: '💰' },
    { id: 'expenses', label: { en: 'Expenses', fr: 'Dépenses', ar: 'المصروفات' }, icon: '💸' },
    { id: 'financial', label: { en: 'Financial', fr: 'Financier', ar: 'مالي' }, icon: '🏦' },
    { id: 'hr', label: { en: 'Human Resources', fr: 'Ressources Humaines', ar: 'الموارد البشرية' }, icon: '👥' },
    { id: 'infrastructure', label: { en: 'Infrastructure', fr: 'Infrastructure', ar: 'البنية التحتية' }, icon: '🏗️' }
  ];

  const handleInsightClick = (insightId) => {
    onInsightSelect(insightId);
    setIsOpen(false); // Close mobile sidebar
  };

  const SidebarContent = () => (
    <div className={`h-full flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} border-1 rounded-xl mt-4 w-75`}>
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold mb-3">
          {language === 'ar' ? 'تحليلات الميزانية' :
           language === 'fr' ? 'Analyses Budget' :
           'Budget Insights'}
        </h2>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder={
              language === 'ar' ? 'بحث...' :
              language === 'fr' ? 'Rechercher...' :
              'Search...'
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Insights List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {categories.map(category => {
            const categoryInsights = filteredInsights.filter(insight => insight.category === category.id);
            
            if (categoryInsights.length === 0) return null;

            return (
              <div key={category.id} className="">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-500 uppercase tracking-wide">
                  
                  <span>{category.label[language] || category.label.fr}</span>
                </div>
                
                <div className="space-y-1">
                  {categoryInsights.map(insight => (
                    <Button
                      key={insight.id}
                      variant={selectedInsightId === insight.id ? "default" : "ghost"}
                      className={`w-full justify-start text-wrap text-left h-auto p-3 ${
                        selectedInsightId === insight.id 
                          ? 'bg-blue-600 text-white hover:bg-blue-700' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => handleInsightClick(insight.id)}
                    >
                      <div className="flex items-start gap-3 w-full">
                        
                        <div className="flex-1 text-left text-wrap">
                          <div className="text-sm font-medium leading-5">
                            {insight.question[language] || insight.question.fr}
                          </div>
                          <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {insight.description[language] || insight.description.fr}
                          </div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t text-center">
        <div className="text-xs text-gray-500">
          {filteredInsights.length} {
            language === 'ar' ? 'تحليل' :
            language === 'fr' ? 'analyses' :
            'insights'
          }
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col w-80 border-r h-full">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm">
              <Menu className="h-4 w-4 mr-2" />
              {language === 'ar' ? 'التحليلات' :
               language === 'fr' ? 'Analyses' :
               'Insights'}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}