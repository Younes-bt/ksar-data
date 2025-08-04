// src/insights/simpleInsightConfigs.js

export const simpleInsights = [
  
  {
    id: "total_income_trend",
    question: {
      en: "How have the permanent compensation and benefits of tenured employees and their equivalents changed over time?",
      fr: "Comment évolue les Traitements et indémnités permanentes du personnel titulaire et assimilés ?",
      ar: "كم تبلغ الرواتب و التعوياضات القارة للموظفين الرسميين و مثلائهم؟"
    },
    type: "line",
    description: {
      en: "Compare total permanent compensation and benefits of tenured employees and their equivalents changed over time.",
      fr: "Comparer les recettes totales entre les années pour voir les tendances des revenus.",
      ar: "مقارنة الرواتب و التعوياضات القارة للموظفين الرسميين و مثلائهم."
    },
    getData: (data) => {
      const filteredData = data.filter(row => 
        row.ar_label && (
          row.ar_label.includes("ﺍﻟﺮﻮﺍﺗﺏ ﻮﺍﻟﺘﻌﻮﻳﻀﺎﺕ ﺍﻟﻘﺎﺭﺓ ﻟﻠﻣﻮﻈﻔﻴﻦ ﺍﻟﺮﺴﻣﻴﻴﻦ ﻮﻣﺘﻼﺋﻣﻬﻡ")
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
    id: "Q2",
    question: {
      en: "How have the Hardship and unsanitary work allowances changed over time?",
      fr: "Comment évolue les Indemnités pour travaux pénibles et salissants ?",
      ar: "كم كان مبلغ ﺍﻟﺘﻌﻮﻳﻀﺎﺕ ﻋﻦ ﺍﻷﺸﻐﺎﻝ ﺍﻟﺸﺎﻗﺔ ﻮﺍﻟﻣﻮﺴﺧﺔ؟"
    },
    type: "line",
    description: {
      en: "Compare Hardship and unsanitary work allowances changing over time.",
      fr: "Comparer les Indemnités pour travaux pénibles et salissants.",
      ar: "مقارنة مبلغ ﺍﻟﺘﻌﻮﻳﻀﺎﺕ ﻋﻦ ﺍﻷﺸﻐﺎﻝ ﺍﻟﺸﺎﻗﺔ ﻮﺍﻟﻣﻮﺴﺧﺔ."
    },
    getData: (data) => {
      const filteredData = data.filter(row => 
        row.ar_label && (
          row.ar_label.includes("ﺍﻟﺘﻌﻮﻳﻀﺎﺕ ﻋﻦ ﺍﻷﺸﻐﺎﻝ ﺍﻟﺸﺎﻗﺔ ﻮﺍﻟﻣﻮﺴﺧﺔ")
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
    id: "Q3",
    question: {
      en: "How have the Domestic travel expenses changed over time?",
      fr: "Comment évolue les Frais de déplacement à lintérieur du Royaume ?",
      ar: "كم كان مبلغ ﻣﺼﺎﺭﻳﻒ ﺍﻟﺘﻧﻘﻞ ﺩﺍﺧﻞ ﺍﻟﻣﻣﻠﻜﺔ؟"
    },
    type: "line",
    description: {
      en: "Compare Domestic travel expenses changing over time.",
      fr: "Comparer les Frais de déplacement à lintérieur du Royaume.",
      ar: "مقارنة مبلغ ﻣﺼﺎﺭﻳﻒ ﺍﻟﺘﻧﻘﻞ ﺩﺍﺧﻞ ﺍﻟﻣﻣﻠﻜﺔ."
    },
    getData: (data) => {
      const filteredData = data.filter(row => 
        row.ar_label && (
          row.ar_label.includes("ﻣﺼﺎﺭﻳﻒ ﺍﻟﺘﻧﻘﻞ ﺩﺍﺧﻞ ﺍﻟﻣﻣﻠﻜﺔ")
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
    id: "Q4",
    question: {
      en: "How have the costs of renting administrative buildings changed over time?",
      fr: "Comment évolue les Frais de Location de bâtiments administratifs ?",
      ar: "كم كان مبلغ ﺍﻛﺘﺮﺍﺀ البنايات ﺇﺩﺍﺭﻳﺔ؟"
    },
    type: "line",
    description: {
      en: "Compare costs of renting administrative buildings changed over time.",
      fr: "Comparer les Frais de Location de bâtiments administratifs.",
      ar: "مقارنة مبلغ ﻣﺼﺎﺭﻳﻒ ﺍﻟﺘﻧﻘﻞ ﺩﺍﺧﻞ ﺍﻟﻣﻣﻠﻜﺔ."
    },
    getData: (data) => {
      const filteredData = data.filter(row => 
        row.ar_label && (
          row.ar_label.includes("ﺍﻛﺘﺮﺍﺀ ﺑﻧﺎﻳﺎﺕ ﺇﺩﺍﺭﻳﺔ")
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
    id: "Q5",
    question: {
      en: "Is public lighting consumption increasing or decreasing?",
      fr: "La consommation de l’éclairage public est-elle en augmentation ou en diminution ?",
      ar: "هل استهلاك الإنارة العمومية في تزايد أم في انخفاض؟"
    },
    type: "line",
    description: {
      en: "Compare public lighting consumption.",
      fr: "Comparer La consommation de l’éclairage public",
      ar: "مقارنة استهلاك الإنارة العمومية."
    },
    getData: (data) => {
      const filteredData = data.filter(row => 
        row.ar_label && (
          row.ar_label.includes("مجموع - ﺍﺴﺘﻬﻼﻙ ﺍﻹﻧﺎﺭﺓ ﺍﻟﻌﻣﻮﻣﻴﺔ")
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
    id: "Q6",
    question: {
      en: "How have the enforcement expenses for judgments and settlement agreements changed over time?",
      fr: "Comment évolue les Frais d'exécution des jugements et des conventions de transaction?",
      ar: "كم أدت الجماعة في ﻣﺼﺎﺭﻳﻒ ﺗﻧﻔﻴﺬ ﺍﻷﺤﻜﺎﻡ ﺍﻟﻘﻀﺎﺋﻴﺔ ﻮﺍﺗﻔﺎﻗﺎﺕ ﺍﻟﺼﻠﺢ؟"
    },
    type: "line",
    description: {
      en: "Compare enforcement expenses for judgments and settlement agreements.",
      fr: "Comparer les Frais d'exécution des jugements et des conventions de transaction.",
      ar: "مقارنة ﻣﺼﺎﺭﻳﻒ ﺗﻧﻔﻴﺬ ﺍﻷﺤﻜﺎﻡ ﺍﻟﻘﻀﺎﺋﻴﺔ ﻮﺍﺗﻔﺎﻗﺎﺕ ﺍﻟﺼﻠﺢ."
    },
    getData: (data) => {
      const filteredData = data.filter(row => 
        row.ar_label && (
          row.ar_label.includes("ﻣﺼﺎﺭﻳﻒ ﺗﻧﻔﻴﺬ ﺍﻷﺤﻜﺎﻡ ﺍﻟﻘﻀﺎﺋﻴﺔ ﻮﺍﺗﻔﺎﻗﺎﺕ ﺍﻟﺼﻠﺢ")
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
    id: "Q7",
    question: {
      en: "How have the enforcement expenses for judgments and settlement agreements changed over time?",
      fr: "Comment évolue les Frais d'exécution des jugements et des conventions de transaction?",
      ar: "ماهي اكثر 5 مصادر الإنفاق في سنة 2025"
    },
    type: "pie",
    description: {
      en: "Compare enforcement expenses for judgments and settlement agreements.",
      fr: "Comparer les Frais d'exécution des jugements et des conventions de transaction.",
      ar: "مقارنة اكثر 5 مصادر الإنفاق في سنة 2025."
    },
    getData: (data) => {
  const filteredData = data.filter(row => 
    row.fr_label && (
      row.fr_label.includes("Total du projet ") && (row.year === 2025) && (row.amount_approved > 0) && (row.type === 'Crédits')
    )
  ).sort((a, b) => (b.amount_approved || 0) - (a.amount_approved || 0)); 
      
      const chartData = filteredData
        .slice(0, 5) // Take only first 5 items (already sorted)
        .map(row => ({
          name: row.fr_label, // Use the French label as the pie slice name
          value: row.amount_approved || 0,
          year: row.year,
          category: row.fr_label
        }));
      
      return {
        chartData: chartData,
        filteredData: filteredData.slice(0, 5)
      };
    },
  },

  {
    id: "Q8",
    question: {
      en: "How have the enforcement expenses for judgments and settlement agreements changed over time?",
      fr: "Comment évolue les Frais d'exécution des jugements et des conventions de transaction?",
      ar: "هل مداخيل ضريبة التجارة في تزايد أم في انخفاض؟"
    },
    type: "line",
    description: {
      en: "Compare enforcement expenses for judgments and settlement agreements.",
      fr: "Comparer les Frais d'exécution des jugements et des conventions de transaction.",
      ar: "مقارنة ﻣﺼﺎﺭﻳﻒ ﺗﻧﻔﻴﺬ ﺍﻷﺤﻜﺎﻡ ﺍﻟﻘﻀﺎﺋﻴﺔ ﻮﺍﺗﻔﺎﻗﺎﺕ ﺍﻟﺼﻠﺢ."
    },
    getData: (data) => {
      const filteredData = data.filter(row => 
        row.ar_label && (
          row.ar_label.includes("ﻀﺮﻳﺑﺔ ﺍﻟﺘﺠﺎﺭﺓ")
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


];

export const getInsightById = (id) => {
  return simpleInsights.find(insight => insight.id === id);
};