// src/insights/simpleInsightConfigs.js

export const simpleInsights = [
  
  {
    id: "total_income_trend",
    question: {
      en: "How the total income moving during last 5 years?",
      fr: "Comment évolue le revenu total au cours des 5 dernières années ?",
      ar: "كيف تطور إجمالي الدخل خلال السنوات الخمس الماضية؟"
    },
    type: "line",
    description: {
      en: "Compare total recettes between the years to see income trends.",
      fr: "Comparer les recettes totales entre les années pour voir les tendances des revenus.",
      ar: "مقارنة إجمالي الإيرادات بين السنوات لرؤية اتجاهات الدخل."
    },
    getData: (data) => {
      const filteredData = data.filter(row => 
        row.fr_label && (
          row.fr_label.includes("Total Recette") || 
          row.fr_label.includes("Total des comptes spéciaux") ||
          row.fr_label.includes("Total Recette dÉquipement")
        )
      );
      
      const chartData = filteredData.reduce((acc, row) => {
        acc[row.year] = (acc[row.year] || 0) + (row.amount_approved || 0);
        return acc;
      }, {});
      
      return {
        chartData: Object.entries(chartData)
          .map(([year, value]) => ({ year, value }))
          .sort((a, b) => a.year - b.year),
        filteredData: filteredData
      };
    },
  },

  {
    id: "budget_year_over_year_change",
    question: {
      en: "What was the largest single-year increase or decrease in the city's budget since 2020?",
      fr: "Quelle a été la plus forte augmentation ou diminution annuelle du budget de la ville depuis 2020 ?",
      ar: "ما هي أكبر زيادة أو نقصان سنوي في ميزانية المدينة منذ عام 2020؟"
    },
    type: "bar",
    description: {
      en: "Analyze year-over-year budget changes to identify the largest variations.",
      fr: "Analyser les changements budgétaires d'une année à l'autre pour identifier les plus grandes variations.",
      ar: "تحليل تغيرات الميزانية من سنة إلى أخرى لتحديد أكبر التغييرات."
    },
    getData: (data) => {
      const totalData = data.filter(row => 
        row.fr_label && (
          row.fr_label.includes("Total Dépenses de Fonctionnement") || 
          row.fr_label.includes("Total Dépenses dÉquipement")
        )
      );
      
      const yearlyTotals = totalData.reduce((acc, row) => {
        acc[row.year] = (acc[row.year] || 0) + (row.amount_approved || 0);
        return acc;
      }, {});

      const sortedYears = Object.keys(yearlyTotals).sort();
      const changes = [];
      
      for (let i = 1; i < sortedYears.length; i++) {
        const currentYear = sortedYears[i];
        const previousYear = sortedYears[i - 1];
        const change = yearlyTotals[currentYear] - yearlyTotals[previousYear];
        const changePercent = (change / yearlyTotals[previousYear]) * 100;
        
        changes.push({
          year: currentYear,
          value: change,
          changePercent: changePercent.toFixed(2)
        });
      }
      
      return {
        chartData: changes.filter(item => parseInt(item.year) >= 2020),
        filteredData: totalData
      };
    },
  },

  {
    id: "total_debt_payments",
    question: {
      en: "What is the city's total debt payment (interest and principal) for the current year?",
      fr: "Quel est le montant total des paiements de dette de la ville (intérêts et capital) pour l'année en cours ?",
      ar: "ما هو إجمالي مدفوعات ديون المدينة (الفوائد والأصل) للسنة الحالية؟"
    },
    type: "pie",
    description: {
      en: "Show the breakdown of debt payments including interest and principal repayments.",
      fr: "Afficher la répartition des paiements de dette, y compris les intérêts et les remboursements de capital.",
      ar: "إظهار تفصيل مدفوعات الديون بما في ذلك الفوائد وسداد رأس المال."
    },
    getData: (data) => {
      const filteredData = data.filter(row => 
        row.fr_label && (
          (row.fr_label.includes("Intérêts des emprunts") ||
          row.fr_label.includes("Amortissement en capital")) && row.amount_approved > 0
        )
      );
      
      const latestYear = Math.max(...data.map(row => parseInt(row.year)));
      const currentYearData = filteredData.filter(row => parseInt(row.year) === latestYear);
      
      const chartData = currentYearData.map(row => ({
        category: row.fr_label.includes("Intérêts") ? "Intérêts" : "Remboursement Capital",
        value: row.amount_approved || 0
      }));
      
      return {
        chartData: chartData,
        filteredData: filteredData
      };
    },
  },

  {
    id: "top_expensive_services",
    question: {
      en: "What are the top 5 most expensive services the city manages?",
      fr: "Quels sont les 5 services les plus coûteux que gère la ville ?",
      ar: "ما هي أعلى 5 خدمات تكلفة تديرها المدينة؟"
    },
    type: "bar",
    description: {
      en: "Identify the most expensive city services by total budget allocation.",
      fr: "Identifier les services municipaux les plus coûteux par allocation budgétaire totale.",
      ar: "تحديد أكثر الخدمات البلدية تكلفة حسب إجمالي التخصيص في الميزانية."
    },
    getData: (data) => {
      const latestYear = Math.max(...data.map(row => parseInt(row.year)));
      const revenueData = data.filter(row => 
        parseInt(row.year) === latestYear &&
        row.fr_label && (
          row.fr_label.includes("Taxe") ||
          row.fr_label.includes("Part dans le produit") ||
          row.fr_label.includes("Subventions") ||
          row.fr_label.includes("Produit")
        )
      );
      
      const revenueCategories = {
        "Taxes Locales": ["Taxe urbaine", "Taxe dédilité", "Taxe sur les terrains", "Impôt des patentes"],
        "Part TVA": ["Part dans le produit de la TVA"],
        "Subventions": ["Subventions", "Dotations"]
      };
      
      const chartData = Object.keys(revenueCategories).map(category => {
        const value = revenueData
          .filter(row => revenueCategories[category].some(keyword => row.fr_label.includes(keyword)))
          .reduce((sum, row) => sum + (row.amount_approved || 0), 0);
        return { category, value };
      }).filter(item => item.value > 0)
        .sort((a, b) => b.value - a.value)
        .slice(0, 3);
      
      return {
        chartData: chartData,
        filteredData: revenueData
      };
    },
  },

  {
    id: "taxes_vs_fees_revenue",
    question: {
      en: "How much of the city's income comes from local taxes versus fees for services?",
      fr: "Quelle part des revenus de la ville provient des taxes locales par rapport aux frais de services ?",
      ar: "كم من دخل المدينة يأتي من الضرائب المحلية مقابل رسوم الخدمات؟"
    },
    type: "donut",
    description: {
      en: "Compare revenue from local taxes against service fees and charges.",
      fr: "Comparer les revenus des taxes locales par rapport aux frais et charges de services.",
      ar: "مقارنة الإيرادات من الضرائب المحلية مقابل رسوم وتكاليف الخدمات."
    },
    getData: (data) => {
      const latestYear = Math.max(...data.map(row => parseInt(row.year)));
      const currentYearData = data.filter(row => parseInt(row.year) === latestYear);
      
      const taxRevenue = currentYearData
        .filter(row => row.fr_label && (
          row.fr_label.includes("Taxe") ||
          row.fr_label.includes("Impôt")
        ))
        .reduce((sum, row) => sum + (row.amount_approved || 0), 0);
      
      const serviceRevenue = currentYearData
        .filter(row => row.fr_label && (
          row.fr_label.includes("Produit") ||
          row.fr_label.includes("Droits") ||
          row.fr_label.includes("Redevances") ||
          row.fr_label.includes("Concession")
        ))
        .reduce((sum, row) => sum + (row.amount_approved || 0), 0);
      
      const chartData = [
        { category: "Taxes Locales", value: taxRevenue },
        { category: "Frais de Services", value: serviceRevenue }
      ];
      
      return {
        chartData: chartData,
        filteredData: currentYearData.filter(row => row.fr_label && (
          row.fr_label.includes("Taxe") ||
          row.fr_label.includes("Impôt") ||
          row.fr_label.includes("Produit") ||
          row.fr_label.includes("Droits") ||
          row.fr_label.includes("Redevances")
        ))
      };
    },
  },

  {
    id: "local_taxes_trend",
    question: {
      en: "Are revenues from key local taxes increasing or decreasing over time?",
      fr: "Les revenus des principales taxes locales augmentent-ils ou diminuent-ils au fil du temps ?",
      ar: "هل إيرادات الضرائب المحلية الرئيسية تزيد أم تنقص مع مرور الوقت؟"
    },
    type: "line",
    description: {
      en: "Track the trend of major local tax revenues over multiple years.",
      fr: "Suivre la tendance des revenus des principales taxes locales sur plusieurs années.",
      ar: "تتبع اتجاه إيرادات الضرائب المحلية الرئيسية على مدى عدة سنوات."
    },
    getData: (data) => {
      const filteredData = data.filter(row => 
        row.fr_label && (
          row.fr_label.includes("Taxe urbaine") ||
          row.fr_label.includes("Taxe dédilité") ||
          row.fr_label.includes("Impôt des patentes") ||
          row.fr_label.includes("Taxe Professionnelle")
        )
      );
      
      const chartData = filteredData.reduce((acc, row) => {
        acc[row.year] = (acc[row.year] || 0) + (row.amount_approved || 0);
        return acc;
      }, {});
      
      return {
        chartData: Object.entries(chartData)
          .map(([year, value]) => ({ year, value }))
          .sort((a, b) => a.year - b.year),
        filteredData: filteredData
      };
    },
  },

  {
    id: "intermunicipal_contributions",
    question: {
      en: "How much is the city contributing to inter-municipal partnerships (like 'OUED EL MAKHAZINE')?",
      fr: "Combien la ville contribue-t-elle aux partenariats intercommunaux (comme 'OUED EL MAKHAZINE') ?",
      ar: "كم تساهم المدينة في الشراكات بين البلديات (مثل 'واد المخازن')؟"
    },
    type: "bar",
    description: {
      en: "Show contributions to inter-municipal cooperation establishments and partnerships.",
      fr: "Afficher les contributions aux établissements de coopération intercommunale et partenariats.",
      ar: "إظهار المساهمات في مؤسسات التعاون بين البلديات والشراكات."
    },
    getData: (data) => {
      const filteredData = data.filter(row => 
        row.fr_label && (
          row.fr_label.includes("OUED EL MAKHAZINE") ||
          row.fr_label.includes("établissement de coopération intercommunale") ||
          row.fr_label.includes("groupements")
        )
      );
      
      const chartData = filteredData.reduce((acc, row) => {
        acc[row.year] = (acc[row.year] || 0) + (row.amount_approved || 0);
        return acc;
      }, {});
      
      return {
        chartData: Object.entries(chartData)
          .map(([year, value]) => ({ year, value }))
          .sort((a, b) => a.year - b.year),
        filteredData: filteredData
      };
    },
  },

  {
    id: "women_children_programs",
    question: {
      en: "What is the budget for programs supporting women and children?",
      fr: "Quel est le budget pour les programmes de soutien aux femmes et aux enfants ?",
      ar: "ما هي ميزانية برامج دعم النساء والأطفال؟"
    },
    type: "area",
    description: {
      en: "Track spending on programs specifically designed for women and children support.",
      fr: "Suivre les dépenses pour les programmes spécifiquement conçus pour le soutien des femmes et enfants.",
      ar: "تتبع الإنفاق على البرامج المخصصة خصيصاً لدعم النساء والأطفال."
    },
    getData: (data) => {
      const filteredData = data.filter(row => 
        row.fr_label && (
          row.fr_label.includes("femme et lenfance") ||
          row.fr_label.includes("foyers socioculturels de femme") ||
          row.fr_label.includes("garderies denfants") ||
          row.fr_label.includes("colonies de vacances")
        )
      );
      
      const chartData = filteredData.reduce((acc, row) => {
        acc[row.year] = (acc[row.year] || 0) + (row.amount_approved || 0);
        return acc;
      }, {});
      
      return {
        chartData: Object.entries(chartData)
          .map(([year, value]) => ({ year, value }))
          .sort((a, b) => a.year - b.year),
        filteredData: filteredData
      };
    },
  },

  {
    id: "decorations_budget",
    question: {
      en: "What is the budget for purchasing and maintaining official city decorations?",
      fr: "Quel est le budget pour l'achat et l'entretien des décorations officielles de la ville ?",
      ar: "ما هي ميزانية شراء وصيانة الزينة الرسمية للمدينة؟"
    },
    type: "bar",
    description: {
      en: "Show spending on decorative materials, banners, and ceremonial items.",
      fr: "Afficher les dépenses pour les matériaux décoratifs, banderoles et articles cérémoniels.",
      ar: "إظهار الإنفاق على المواد الزخرفية واللافتات والعناصر الاحتفالية."
    },
    getData: (data) => {
      const filteredData = data.filter(row => 
        row.fr_label && (
          row.fr_label.includes("décoration") ||
          row.fr_label.includes("pavoisement") ||
          row.fr_label.includes("Matériel des fêtes") ||
          row.fr_label.includes("petit matériel fongible de décoration")
        )
      );
      
      const chartData = filteredData.reduce((acc, row) => {
        acc[row.year] = (acc[row.year] || 0) + (row.amount_approved || 0);
        return acc;
      }, {});
      
      return {
        chartData: Object.entries(chartData)
          .map(([year, value]) => ({ year, value }))
          .sort((a, b) => a.year - b.year),
        filteredData: filteredData
      };
    },
  },

  {
    id: "ramed_support_budget",
    question: {
      en: "How has the city's financial support for the national medical assistance program (RAMED) changed?",
      fr: "Comment le soutien financier de la ville au programme national d'assistance médicale (RAMED) a-t-il évolué ?",
      ar: "كيف تغير الدعم المالي للمدينة لبرنامج المساعدة الطبية الوطني (راميد)؟"
    },
    type: "line",
    description: {
      en: "Track the evolution of city contributions to the RAMED medical assistance program.",
      fr: "Suivre l'évolution des contributions de la ville au programme d'assistance médicale RAMED.",
      ar: "تتبع تطور مساهمات المدينة في برنامج المساعدة الطبية راميد."
    },
    getData: (data) => {
      const filteredData = data.filter(row => 
        row.fr_label && row.fr_label.includes("RAMED")
      );
      
      const chartData = filteredData.reduce((acc, row) => {
        acc[row.year] = (acc[row.year] || 0) + (row.amount_approved || 0);
        return acc;
      }, {});
      
      return {
        chartData: Object.entries(chartData)
          .map(([year, value]) => ({ year, value }))
          .sort((a, b) => a.year - b.year),
        filteredData: filteredData
      };
    },
  },

  {
    id: "youth_centers_budget",
    question: {
      en: "How much is allocated for programs related to youth and youth centers?",
      fr: "Combien est alloué aux programmes liés à la jeunesse et aux centres de jeunesse ?",
      ar: "كم هو مخصص للبرامج المتعلقة بالشباب ومراكز الشباب؟"
    },
    type: "area",
    description: {
      en: "Show budget allocation for youth programs and youth center operations.",
      fr: "Afficher l'allocation budgétaire pour les programmes jeunesse et le fonctionnement des centres de jeunesse.",
      ar: "إظهار تخصيص الميزانية لبرامج الشباب وتشغيل مراكز الشباب."
    },
    getData: (data) => {
      const filteredData = data.filter(row => 
        row.fr_label && (
          row.fr_label.includes("Maisons de jeunes") ||
          row.fr_label.includes("jeunesse") ||
          row.fr_label.includes("colonies de vacances")
        )
      );
      
      const chartData = filteredData.reduce((acc, row) => {
        acc[row.year] = (acc[row.year] || 0) + (row.amount_approved || 0);
        return acc;
      }, {});
      
      return {
        chartData: Object.entries(chartData)
          .map(([year, value]) => ({ year, value }))
          .sort((a, b) => a.year - b.year),
        filteredData: filteredData
      };
    },
  },

  {
    id: "libraries_books_budget",
    question: {
      en: "What is the budget for purchasing books and supplies for public libraries?",
      fr: "Quel est le budget pour l'achat de livres et fournitures pour les bibliothèques publiques ?",
      ar: "ما هي ميزانية شراء الكتب واللوازم للمكتبات العامة؟"
    },
    type: "bar",
    description: {
      en: "Track spending on library books, supplies, and maintenance of library facilities.",
      fr: "Suivre les dépenses pour les livres de bibliothèque, fournitures et entretien des installations.",
      ar: "تتبع الإنفاق على كتب المكتبة واللوازم وصيانة مرافق المكتبة."
    },
    getData: (data) => {
      const filteredData = data.filter(row => 
        row.fr_label && (
          row.fr_label.includes("Bibliothèques") ||
          row.fr_label.includes("Achat de livres") ||
          row.fr_label.includes("bibliothèque communale") ||
          row.fr_label.includes("Reliure de livres")
        )
      );
      
      const chartData = filteredData.reduce((acc, row) => {
        acc[row.year] = (acc[row.year] || 0) + (row.amount_approved || 0);
        return acc;
      }, {});
      
      return {
        chartData: Object.entries(chartData)
          .map(([year, value]) => ({ year, value }))
          .sort((a, b) => a.year - b.year),
        filteredData: filteredData
      };
    },
  },

  {
    id: "employee_salaries_benefits",
    question: {
      en: "What percentage of the budget is spent on city employee salaries and benefits?",
      fr: "Quel pourcentage du budget est consacré aux salaires et avantages des employés municipaux ?",
      ar: "ما هي النسبة المئوية من الميزانية المخصصة لرواتب ومزايا موظفي البلدية؟"
    },
    type: "donut",
    description: {
      en: "Show the proportion of budget spent on personnel costs versus other expenses.",
      fr: "Afficher la proportion du budget consacrée aux coûts de personnel par rapport aux autres dépenses.",
      ar: "إظهار نسبة الميزانية المخصصة لتكاليف الموظفين مقابل المصروفات الأخرى."
    },
    getData: (data) => {
      const latestYear = Math.max(...data.map(row => parseInt(row.year)));
      const currentYearData = data.filter(row => parseInt(row.year) === latestYear);
      
      const personnelCosts = currentYearData
        .filter(row => row.fr_label && (
          row.fr_label.includes("Rémunérations") ||
          row.fr_label.includes("Salaires") ||
          row.fr_label.includes("Traitements") ||
          row.fr_label.includes("Indémnités") ||
          row.fr_label.includes("Cotisations et avantages sociaux")
        ))
        .reduce((sum, row) => sum + (row.amount_approved || 0), 0);
      
      const totalBudget = currentYearData
        .reduce((sum, row) => sum + (row.amount_approved || 0), 0);
      
      const otherCosts = totalBudget - personnelCosts;
      
      const chartData = [
        { category: "Salaires et Avantages", value: personnelCosts },
        { category: "Autres Dépenses", value: otherCosts }
      ];
      
      return {
        chartData: chartData,
        filteredData: currentYearData.filter(row => row.fr_label && (
          row.fr_label.includes("Rémunérations") ||
          row.fr_label.includes("Salaires") ||
          row.fr_label.includes("Traitements") ||
          row.fr_label.includes("Indémnités") ||
          row.fr_label.includes("Cotisations et avantages sociaux")
        ))
      };
    },
  },

 
  

];

export const getInsightById = (id) => {
  return simpleInsights.find(insight => insight.id === id);
};