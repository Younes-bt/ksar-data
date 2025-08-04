// src/insights/getInsightData.js

// Enhanced getInsightData function
export function getInsightData(insight, data, language = 'fr') {
  let filteredRows = [...data];

  // 1. Filter by type if specified
  if (insight.type) {
    filteredRows = filteredRows.filter(row => row.type === insight.type);
  }

  // 2. Filter by keywords in labels (fr or ar)
  if (insight.filterKeywords?.length) {
    filteredRows = filteredRows.filter(row => {
      const fr = row.fr_label?.toLowerCase() || "";
      const ar = row.ar_label || "";
      return insight.filterKeywords.some(keyword =>
        fr.includes(keyword.toLowerCase()) || ar.includes(keyword)
      );
    });
  }

  // 3. Handle custom aggregations and build chart data
  let chartData = [];
  let total = 0;
  let description = "";

  if (insight.aggregation === "custom" && insight.field === "variance") {
    // Special case for budget variance
    const groupMap = {};
    for (const row of filteredRows) {
      const key = row[insight.groupBy] || 'Unknown';
      if (!groupMap[key]) {
        groupMap[key] = { proposed: 0, approved: 0 };
      }
      groupMap[key].proposed += row.amount_proposed || 0;
      groupMap[key].approved += row.amount_approved || 0;
    }

    chartData = Object.entries(groupMap).map(([key, values]) => ({
      label: key.toString(),
      value: values.approved - values.proposed,
      proposed: values.proposed,
      approved: values.approved
    })).sort((a, b) => Math.abs(b.value) - Math.abs(a.value));

    total = chartData.reduce((sum, item) => sum + Math.abs(item.value), 0);
    
  } else if (insight.groupBy) {
    // Standard grouping
    const groupMap = {};
    for (const row of filteredRows) {
      const key = row[insight.groupBy] || 'Unknown';
      if (!groupMap[key]) groupMap[key] = [];
      groupMap[key].push(row[insight.field] || 0);
    }

    chartData = Object.entries(groupMap).map(([key, values]) => {
      let y = 0;
      if (insight.aggregation === "sum") y = values.reduce((a, b) => a + b, 0);
      else if (insight.aggregation === "avg") y = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
      else if (insight.aggregation === "count") y = values.length;

      return {
        label: key.toString(),
        value: y,
      };
    }).sort((a, b) => b.value - a.value);

    // Limit to top 10 for readability
    if (chartData.length > 10) {
      const others = chartData.slice(10).reduce((sum, item) => sum + item.value, 0);
      chartData = chartData.slice(0, 10);
      if (others > 0) {
        chartData.push({ label: "Others", value: others });
      }
    }

    total = chartData.reduce((sum, item) => sum + item.value, 0);

  } else {
    // No grouping - single total
    const values = filteredRows.map(row => row[insight.field] || 0);
    if (insight.aggregation === "sum") {
      total = values.reduce((acc, val) => acc + val, 0);
    } else if (insight.aggregation === "avg") {
      total = values.length ? values.reduce((acc, val) => acc + val, 0) / values.length : 0;
    } else if (insight.aggregation === "count") {
      total = filteredRows.length;
    }

    chartData = [{ label: "Total", value: total }];
  }

  // Add percentage calculation for pie charts
  if (insight.chartType === "pie") {
    chartData = chartData.map(item => ({
      ...item,
      percentage: total > 0 ? ((item.value / total) * 100).toFixed(1) : 0
    }));
  }

  return {
    title: insight.question[language] || insight.question.fr,
    description: insight.description[language] || insight.description.fr,
    chartData,
    total,
    filteredRows,
    chartType: insight.chartType,
    count: filteredRows.length
  };
}