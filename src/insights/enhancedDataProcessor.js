// src/insights/enhancedDataProcessor.js

export function processInsightData(insight, data, language = 'fr') {
  if (!insight || !data || !data.length) {
    return {
      title: insight?.question[language] || "No Data",
      description: insight?.description[language] || "",
      tableData: [],
      chartData: {},
      totalAmount: 0,
      recordCount: 0
    };
  }

  let filteredData = [...data];

  // Apply filters based on insight configuration
  const { filter } = insight;

  // Filter by type (Recettes or Crédits)
  if (filter.type) {
    filteredData = filteredData.filter(row => row.type === filter.type);
  }

  // Filter by section (Fonctionnement or Investissement)
  if (filter.section) {
    filteredData = filteredData.filter(row => row.section === filter.section);
  }

  // Filter by keywords
  if (filter.keywords && filter.keywords.length > 0) {
    filteredData = filteredData.filter(row => {
      const frLabel = (row.fr_label || "").toLowerCase();
      const arLabel = (row.ar_label || "").toLowerCase();
      return filter.keywords.some(keyword => 
        frLabel.includes(keyword.toLowerCase()) || 
        arLabel.includes(keyword.toLowerCase())
      );
    });
  }

  // Group and aggregate data
  const groupedData = {};
  
  filteredData.forEach(row => {
    const key = row[insight.groupBy] || 'Unknown';
    if (!groupedData[key]) {
      groupedData[key] = {
        label: key,
        records: [],
        total: 0
      };
    }
    
    const amount = row[insight.field] || 0;
    groupedData[key].records.push(row);
    groupedData[key].total += amount;
  });

  // Convert to array and sort
  let processedData = Object.values(groupedData)
    .sort((a, b) => {
      if (filter.sortOrder === 'desc') {
        return b.total - a.total;
      }
      return a.total - b.total;
    });

  // Apply limit if specified
  if (filter.limit) {
    processedData = processedData.slice(0, filter.limit);
  }

  // Prepare table data (flatten all records from filtered groups)
  const tableData = processedData.flatMap(group => group.records);

  // Prepare chart data for different chart types
  const chartData = {
    pie: processedData.map(item => ({
      name: item.label,
      value: item.total,
      percentage: 0 // Will be calculated later
    })),
    bar: processedData.map(item => ({
      name: item.label,
      value: item.total
    })),
    line: processedData.map(item => ({
      name: item.label,
      value: item.total
    }))
  };

  // Calculate percentages for pie chart
  const totalAmount = processedData.reduce((sum, item) => sum + item.total, 0);
  chartData.pie = chartData.pie.map(item => ({
    ...item,
    percentage: totalAmount > 0 ? ((item.value / totalAmount) * 100).toFixed(1) : 0
  }));

  // Prepare yearly comparison data if grouping by label
  const yearlyData = {};
  if (insight.groupBy !== 'year') {
    // Group by year for trend analysis
    filteredData.forEach(row => {
      const year = row.year || 'Unknown';
      if (!yearlyData[year]) {
        yearlyData[year] = 0;
      }
      yearlyData[year] += row[insight.field] || 0;
    });

    chartData.yearly = Object.entries(yearlyData)
      .map(([year, amount]) => ({
        name: year,
        value: amount
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  return {
    title: insight.question[language] || insight.question.fr,
    description: insight.description[language] || insight.description.fr,
    tableData,
    chartData,
    totalAmount,
    recordCount: tableData.length,
    processedGroups: processedData
  };
}

export function formatCurrency(value, language = 'fr') {
  if (typeof value !== 'number') return '0 DH';
  
  return new Intl.NumberFormat(language === 'ar' ? 'ar-MA' : 'fr-MA', {
    style: 'currency',
    currency: 'MAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

export function formatNumber(value, language = 'fr') {
  if (typeof value !== 'number') return '0';
  
  return new Intl.NumberFormat(language === 'ar' ? 'ar-MA' : 'fr-MA').format(value);
}