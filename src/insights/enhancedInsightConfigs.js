// src/insights/enhancedInsightConfigs.js

export const enhancedInsights = [
  {
    id: "top-income-sources",
    question: {
      en: "What are the top 5 income sources of our city?",
      fr: "Quelles sont les 5 principales sources de revenus de notre ville ?",
      ar: "ما هي أهم 5 مصادر دخل لمدينتنا؟"
    },
    icon: "💰",
    category: "revenue",
    description: {
      en: "Analysis of the city's primary revenue streams including taxes, fees, and other income sources",
      fr: "Analyse des principales sources de revenus de la ville incluant les taxes, frais et autres sources de revenus",
      ar: "تحليل مصادر الإيرادات الأساسية للمدينة بما في ذلك الضرائب والرسوم ومصادر الدخل الأخرى"
    },
    filter: {
      type: "recettes",
      limit: 5,
      sortBy: "amount_approved",
      sortOrder: "desc"
    },
    charts: [
      { type: "pie", title: "Revenue Distribution" },
      { type: "bar", title: "Revenue by Year" },
      { type: "line", title: "Revenue Trends" }
    ],
    groupBy: "fr_label",
    aggregation: "sum",
    field: "amount_approved"
  },
  {
    id: "top-spending-categories",
    question: {
      en: "What are the top 5 spending categories in our budget?",
      fr: "Quelles sont les 5 principales catégories de dépenses de notre budget ?",
      ar: "ما هي أهم 5 فئات إنفاق في ميزانيتنا؟"
    },
    icon: "💸",
    category: "expenses",
    description: {
      en: "Breakdown of the largest expense categories in the municipal budget",
      fr: "Répartition des plus grandes catégories de dépenses du budget municipal",
      ar: "توزيع أكبر فئات الإعتمادات في الميزانية البلدية"
    },
    filter: {
      type: "Crédits",
      limit: 5,
      sortBy: "amount_approved",
      sortOrder: "desc"
    },
    charts: [
      { type: "bar", title: "Spending by Category" },
      { type: "pie", title: "Budget Distribution" },
      { type: "line", title: "Spending Evolution" }
    ],
    groupBy: "fr_label",
    aggregation: "sum",
    field: "amount_approved"
  },
  {
    id: "loan-interests",
    question: {
      en: "How much do we pay for loan interests?",
      fr: "Combien payons-nous pour les intérêts d'emprunts ?",
      ar: "كم ندفع لفوائد القروض؟"
    },
    icon: "🏦",
    category: "financial",
    description: {
      en: "Total interest payments on municipal loans and debt servicing costs",
      fr: "Total des paiements d'intérêts sur les emprunts municipaux et coûts du service de la dette",
      ar: "إجمالي مدفوعات الفوائد على القروض البلدية وتكاليف خدمة الديون"
    },
    filter: {
      type: "Crédits",
      keywords: ["intérêt", "emprunt", "dette", "crédit"],
      sortBy: "amount_approved",
      sortOrder: "desc"
    },
    charts: [
      { type: "line", title: "Interest Payments Over Time" },
      { type: "bar", title: "Interest by Year" },
      { type: "pie", title: "Interest Distribution" }
    ],
    groupBy: "year",
    aggregation: "sum",
    field: "amount_approved"
  },
  {
    id: "personnel-costs",
    question: {
      en: "What is our total personnel cost breakdown?",
      fr: "Quelle est la répartition de nos coûts de personnel ?",
      ar: "ما هو توزيع تكاليف الموظفين لدينا؟"
    },
    icon: "👥",
    category: "hr",
    description: {
      en: "Comprehensive analysis of all personnel-related expenses including salaries, benefits, and allowances",
      fr: "Analyse complète de toutes les dépenses liées au personnel incluant salaires, avantages et indemnités",
      ar: "تحليل شامل لجميع الإعتمادات المتعلقة بالموظفين بما في ذلك الرواتب والمزايا والبدلات"
    },
    filter: {
      type: "Crédits",
      keywords: ["personnel", "salaire", "traitement", "indemnité", "prime"],
      sortBy: "amount_approved",
      sortOrder: "desc"
    },
    charts: [
      { type: "pie", title: "Personnel Cost Breakdown" },
      { type: "bar", title: "Personnel Costs by Year" },
      { type: "line", title: "Personnel Cost Trends" }
    ],
    groupBy: "fr_label",
    aggregation: "sum",
    field: "amount_approved"
  },
  {
    id: "infrastructure-investment",
    question: {
      en: "How much do we invest in infrastructure annually?",
      fr: "Combien investissons-nous dans l'infrastructure annuellement ?",
      ar: "كم نستثمر في البنية التحتية سنوياً؟"
    },
    icon: "🏗️",
    category: "infrastructure",
    description: {
      en: "Annual infrastructure investment including roads, utilities, public facilities and urban development projects",
      fr: "Investissement annuel en infrastructure incluant routes, services publics, installations publiques et projets de développement urbain",
      ar: "الاستثمار السنوي في البنية التحتية بما في ذلك الطرق والمرافق العامة والمنشآت العامة ومشاريع التطوير الحضري"
    },
    filter: {
      type: "Crédits",
      keywords: ["infrastructure", "route", "construction", "équipement", "aménagement"],
      section: "Investissement",
      sortBy: "amount_approved",
      sortOrder: "desc"
    },
    charts: [
      { type: "bar", title: "Infrastructure Investment by Year" },
      { type: "line", title: "Investment Trends" },
      { type: "pie", title: "Infrastructure Categories" }
    ],
    groupBy: "year",
    aggregation: "sum",
    field: "amount_approved"
  }
];

export const getInsightById = (id) => {
  return enhancedInsights.find(insight => insight.id === id);
};

export const getInsightsByCategory = (category) => {
  return enhancedInsights.filter(insight => insight.category === category);
};