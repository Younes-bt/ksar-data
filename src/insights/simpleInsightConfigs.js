// src/insights/simpleInsightConfigs.js

export const simpleInsights = [
  
  {
    id: "total_income_trend",
    question: {
  en: "Permanent Salaries & Benefits — What’s the Trend?",
  fr: "Traitements et indemnités permanents — Quelle est la tendance ?",
  ar: "الرواتب و التعويضات القارة — كيف تغيرت عبر السنين؟"
},
type: "line",
description: {
  en: "Discover how permanent salaries and allowances for tenured staff have evolved year after year.",
  fr: "Découvrez comment les traitements et indemnités permanents du personnel titulaire ont évolué au fil des ans.",
  ar: "اكتشف كيف تغيرت الرواتب و التعويضات القارة للموظفين الرسميين عبر السنين."
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
  en: "How much were the hardship and unsanitary work allowances?",
  fr: "Quel était le montant des indemnités pour travaux pénibles et insalubres ?",
  ar: "كم كان مبلغ ﺍﻟﺘﻌﻮﻳﻀﺎﺕ ﻋﻦ ﺍﻷﺸﻐﺎﻝ ﺍﻟﺸﺎﻗﺔ ﻮﺍﻟﻣﻮﺴﺧﺔ؟"
},
type: "line",
description: {
  en: "Show the amount of hardship and unsanitary work allowances over time.",
  fr: "Afficher le montant des indemnités pour travaux pénibles et insalubres au fil du temps.",
  ar: "مقارنة مبلغ ﺍﻟﺘﻌﻮﻳﻀﺎﺕ ﻋﻦ ﺍﻷﺸﻐﺎﻝ ﺍﻟﺸﺎﻗﺔ ﻮﺍﻟﻣﻮﺴﺧﺔ على مر السنين."
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
  en: "How much were the domestic travel expenses within the Kingdom?",
  fr: "Quel était le montant des frais de déplacement à l'intérieur du Royaume ?",
  ar: "كم كان مبلغ ﻣﺼﺎﺭﻳﻒ ﺍﻟﺘﻧﻘﻞ ﺩﺍﺧﻞ ﺍﻟﻣﻣﻠﻜﺔ؟"
},
type: "line",
description: {
  en: "Show domestic travel expenses within the Kingdom over time.",
  fr: "Afficher les frais de déplacement à l'intérieur du Royaume au fil du temps.",
  ar: "مقارنة مبلغ ﻣﺼﺎﺭﻳﻒ ﺍﻟﺘﻧﻘﻞ ﺩﺍﺧﻞ ﺍﻟﻣﻣﻠﻜﺔ على مر السنين."
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
  en: "How much were the costs of renting administrative buildings?",
  fr: "Quel était le montant des frais de location de bâtiments administratifs ?",
  ar: "كم كان مبلغ ﺍﻛﺘﺮﺍﺀ البنايات ﺇﺩﺍﺭﻳﺔ؟"
},
type: "line",
description: {
  en: "Show the costs of renting administrative buildings over time.",
  fr: "Afficher le montant des frais de location de bâtiments administratifs au fil du temps.",
  ar: "مقارنة مبلغ ﺍﻛﺘﺮﺍﺀ البنايات ﺇﺩﺍﺭﻳﺔ على مر السنين."
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
  en: "Track whether public lighting consumption is rising or falling over time.",
  fr: "Suivre si la consommation de l’éclairage public augmente ou diminue au fil du temps.",
  ar: "مقارنة استهلاك الإنارة العمومية عبر السنوات لمعرفة اتجاهه."
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
    id: "Q8",
   question: {
  en: "Is trade tax revenue increasing or decreasing?",
  fr: "Les recettes de la taxe sur le commerce sont-elles en augmentation ou en diminution ?",
  ar: "هل مداخيل ضريبة التجارة في تزايد أم في انخفاض؟"
},
type: "line",
description: {
  en: "Track whether trade tax revenue is rising or falling over time.",
  fr: "Suivre si les recettes de la taxe sur le commerce augmentent ou diminuent au fil du temps.",
  ar: "مقارنة مداخيل ضريبة التجارة لمعرفة اتجاهها على مر السنين."
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
  {
    id: "Q9",
    question: {
  en: "How much does vehicle and machinery maintenance cost the municipality budget?",
  fr: "Quel est le coût de l’entretien et de la réparation des véhicules et machines pour le budget communal ?",
  ar: "كم تكلف صيانة و ﺇﺼﻼﺡ ﺍﻟﺴﻴﺎﺭﺍﺕ وﺍﻵﻟﻴﺎﺕ ميزانية الجماعة؟"
},
type: "line",
description: {
  en: "Show the cost of vehicle and machinery maintenance over time.",
  fr: "Afficher le coût de l’entretien et de la réparation des véhicules et machines au fil du temps.",
  ar: "مقارنة تكلفة صيانة و ﺇﺼﻼﺡ ﺍﻟﺴﻴﺎﺭﺍﺕ وﺍﻵﻟﻴﺎﺕ على مر السنين."
},
    getData: (data) => {
      const filteredData = data.filter(row => 
        row.ar_label && (
          row.ar_label.includes("ﺼﻴﺎﻧﺔ ﻮﺇﺼﻼﺡ ﺍﻟﺴﻴﺎﺭﺍﺕ ﻮﺍﻵﻟﻴﺎﺕ ")
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
    id: "Q10",
    question: {
  en: "How much were the revenues from ambulance transport fee recovery in the last five years?",
  fr: "Quel était le montant des recettes issues de la récupération des frais de transport par ambulance au cours des cinq dernières années ?",
  ar: "كم كانت المداخيل من ﺍﺴﺘﺮﺠﺎﻉ ﺻﻮﺍﺋﺮ ﺍﻟﻨﻘﻞ ﺑﻮﺍﺴﻄﺔ سيارة ﺍﻹسعاف خلال الخمس سنوات الماضية؟"
},
type: "line",
description: {
  en: "Show the revenues from ambulance transport fee recovery over the last five years.",
  fr: "Afficher les recettes issues de la récupération des frais de transport par ambulance sur les cinq dernières années.",
  ar: "مقارنة المداخيل من ﺍﺴﺘﺮﺟﺎﻉ ﺻﻮﺍﺋﺮ ﺍﻟﻨﻘﻞ ﺑﻮﺍﺳﻄﺔ سيارة ﺍﻹسعاف خلال الخمس سنوات الماضية."
},
    getData: (data) => {
      const filteredData = data.filter(row => 
        row.ar_label && (
          row.ar_label.includes("ﺍﺴﺘﺮﺠﺎﻉ ﺼﻮﺍﺋﺮ ﺍﻟﻧﻘﻞ ﺑﻮﺍﺴﻄﺔ ﺴﻴﺎﺭﺓ ﺍﻹﺴﻌﺎﻑ") || row.ar_label.includes("ﺍﺴﺘﺮﺠﺎﻉ ﺻﻮﺍﺋﺮ ﺍﻟﻨﻘﻞ ﺑﻮﺍﺴﻄﺔ ﺴﻴﺎﺭﺓ ﺍﻹﺴﻌﺎﻒ ")
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
    id: "Q11",
    question: {
  en: "How have civil status fee revenues changed over time?",
  fr: "Comment ont évolué les recettes des droits de l'état civil au fil du temps ?",
  ar: "كيف تطورت مداخيل رسوم الحالة المدنية؟"
},
type: "line",
description: {
  en: "Track the evolution of civil status fee revenues over time.",
  fr: "Suivre l’évolution des recettes des droits de l'état civil au fil du temps.",
  ar: "مقارنة مداخيل رسوم الحالة المدنية على مر السنين."
},
    getData: (data) => {
      const filteredData = data.filter(row => 
        row.ar_label && (
          row.ar_label.includes("ﺭﺴﻮﻢ ﺍﻟﺤﺎﻟﺔ ﺍﻟﻣﺪﻧﻴﺔ ") || row.ar_label.includes("ﺭﺴﻮﻢ ﺍﻟﺤﺎﻟﺔ ﺍﻟﻤﺪﻨﻴﺔ  ")
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
    id: "Q12",
    question: {
  en: "How much were the revenues from cemetery and burial fees?",
  fr: "Quel était le montant des recettes issues des droits de cimetière et d’inhumation ?",
  ar: "كم بلغت المداخيل من ﻤﺪﺧﻮﻝ ﺍﻟﻤﻘﺎﺑﺮ ﻮﺪﻓﻦ ﺍﻷﻤﻮﺍﺕ"
},
type: "line",
description: {
  en: "Show the revenues from cemetery and burial fees over time.",
  fr: "Afficher les recettes issues des droits de cimetière et d’inhumation au fil du temps.",
  ar: "مقارنة المداخيل من ﺍﻟﻤﻘﺎﺑﺮ ﻮﺩﻓﻦ ﺍﻷﻤﻮﺍﺕ على مر السنين."
},
    getData: (data) => {
      const filteredData = data.filter(row => 
        row.ar_label && (
          row.ar_label.includes("ﻤﺪﺧﻮﻝ ﺍﻟﻤﻘﺎﺑﺮ ﻮﺪﻓﻦ ﺍﻷﻤﻮﺍﺕ ") || row.ar_label.includes("ﻣﺪﺧﻮﻝ ﺍﻟﻣﻘﺎﺑﺮ ﻮﺪﻓﻦ ﺍﻷﻣﻮﺍﺕ ")
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
    id: "Q13",
    question: {
  en: "How much does fuel and oil purchase cost?",
  fr: "Quel est le coût de l’achat de carburant et d’huiles ?",
  ar: "كم تكلفة شراء الوقود و الزيوت؟"
},
type: "line",
description: {
  en: "Show the cost of fuel and oil purchases over time.",
  fr: "Afficher le coût de l’achat de carburant et d’huiles au fil du temps.",
  ar: "مقارنة تكلفة شراء الوقود و الزيوت على مر السنين."
},
    getData: (data) => {
      const filteredData = data.filter(row => 
        row.ar_label && (
          row.ar_label.includes("ﺸﺮﺍﺀ ﺍﻟﻮﻗﻮﺩ ﻮﺍﻟﺰﻳﻮﺕ")
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
    id: "Q14",
    question: {
  en: "How much were the cultural and artistic activity expenses?",
  fr: "Quel était le montant des dépenses pour les activités culturelles et artistiques ?",
  ar: "كم بلغت ﻣﺼﺎﺭﻳﻒ ﺍﻟﻧﺸﺎﻁ ﺍﻟﺜﻘﺎﻓﻲ ﻮﺍﻟﻔﻧﻲ"
},
type: "line",
description: {
  en: "Show the cultural and artistic activity expenses over time.",
  fr: "Afficher les dépenses pour les activités culturelles et artistiques au fil du temps.",
  ar: "مقارنة مصاريف النشاط الثقافي و الفني على مر السنين."
},
    getData: (data) => {
      const filteredData = data.filter(row => 
        row.ar_label && (
          row.ar_label.includes("ﻣﺼﺎﺭﻳﻒ ﺍﻟﻧﺸﺎﻄ ﺍﻟﺜﻘﺎﻓﻲ ﻮﺍﻟﻔﻧﻲ")
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
    id: "Q15",
   question: {
  en: "How have procedure fee and lawsuit filing expenses evolved?",
  fr: "Comment ont évolué les frais de procédure et de dépôt de plaintes ?",
  ar: "كيف تطورت مصاريف ﺼﻮﺍﺋﺮ ﺍﻟﻣﺴﻄﺮﺓ ﻮﺇﻗﺎﻣﺔ ﺍﻟﺩﻋﺎﻮﻱ"
},
type: "line",
description: {
  en: "Track the evolution of procedure fee and lawsuit filing expenses over time.",
  fr: "Suivre l’évolution des frais de procédure et de dépôt de plaintes au fil du temps.",
  ar: "مقارنة مصاريف ﺼﻮﺍﺋﺮ ﺍﻟﻣﺴﻄﺮﺓ ﻮﺇﻗﺎﻣﺔ ﺍﻟﺩﻋﺎﻮﻱ على مر السنين."
},
    getData: (data) => {
      const filteredData = data.filter(row => 
        row.ar_label && (
          row.ar_label.includes("ﺼﻮﺍﺋﺮ ﺍﻟﻣﺴﻄﺮﺓ ﻮﺇﻗﺎﻣﺔ ﺍﻟﺩﻋﺎﻮﻱ")
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