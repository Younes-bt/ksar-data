// src/components/RgphChart.jsx

import React from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ComposedChart,
  Area,
  AreaChart,
  ScatterChart,
  Scatter,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts';

const formatNumber = (value, language = 'fr') => {
  const locale = language === 'ar' ? 'ar-MA' : 'fr-MA';
  return new Intl.NumberFormat(locale).format(value);
};

const formatPercentage = (value, language = 'fr') => {
  const locale = language === 'ar' ? 'ar-MA' : 'fr-MA';
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(value / 100);
};

const RgphChart = ({ 
  data, 
  type = 'bar', 
  theme = 'dark',
  language = 'fr',
  showLegend = false,
  height = 400
}) => {
  const getNoDataText = () => {
    switch (language) {
      case 'ar': return 'لا توجد بيانات متاحة';
      case 'en': return 'No data available';
      default: return 'Aucune donnée disponible';
    }
  };

  if (!data || data.length === 0) {
    return (
      <div className={`
        flex items-center justify-center rounded-lg border
        ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-500'}
        ${language === 'ar' ? 'text-right' : 'text-left'}
      `}
      style={{ height }}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      >
        <p>{getNoDataText()}</p>
      </div>
    );
  }

  const colors = theme === 'dark' 
    ? { 
        primary: '#3B82F6', 
        secondary: '#10B981', 
        tertiary: '#F59E0B',
        quaternary: '#EF4444',
        male: '#3B82F6',
        female: '#EC4899',
        grid: '#374151', 
        text: '#D1D5DB' 
      }
    : { 
        primary: '#2563EB', 
        secondary: '#059669', 
        tertiary: '#D97706',
        quaternary: '#DC2626',
        male: '#2563EB',
        female: '#EC4899',
        grid: '#E5E7EB', 
        text: '#6B7280' 
      };

  // Color palette for pie charts and multi-series charts
  const colorPalette = [
    colors.primary,
    colors.secondary,
    colors.tertiary,
    colors.quaternary,
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#06B6D4', // Cyan
    '#84CC16', // Lime
    '#F97316', // Orange
    '#6366F1'  // Indigo
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`
          p-3 rounded-lg shadow-lg
          ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}
          ${language === 'ar' ? 'text-right' : 'text-left'}
        `}
        dir={language === 'ar' ? 'rtl' : 'ltr'}
        >
          {label && (
            <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {label}
            </p>
          )}
          {payload.map((entry, index) => {
            // Determine if the value should be formatted as percentage or number
            const isPercentage = entry.value < 100 && (
              entry.name && (entry.name.includes('%') || entry.name.includes('Taux') || entry.name.includes('Part'))
            );
            
            return (
              <p key={index} style={{ color: entry.color }}>
                {entry.name && `${entry.name}: `}
                {isPercentage 
                  ? formatPercentage(entry.value, language)
                  : formatNumber(entry.value, language)
                }
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className={`
          p-3 rounded-lg shadow-lg
          ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}
          ${language === 'ar' ? 'text-right' : 'text-left'}
        `}
        dir={language === 'ar' ? 'rtl' : 'ltr'}
        >
          <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {data.name}
          </p>
          <p style={{ color: data.payload.fill }}>
            {data.value < 100 
              ? formatPercentage(data.value, language)
              : formatNumber(data.value, language)
            }
          </p>
          {data.payload.total && (
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {((data.value / data.payload.total) * 100).toFixed(1)}%
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  // Prepare chart data based on type
  const prepareChartData = () => {
    switch (type) {
      case 'pie':
      case 'donut':
        const total = data.reduce((sum, item) => sum + (item.value || 0), 0);
        return data.map(item => ({
          ...item,
          name: item.category || item.name || item.year,
          value: item.value,
          total
        }));
      
      case 'radar':
        return data.map(item => ({
          subject: item.subject || item.category || item.name,
          value: item.value,
          fullMark: Math.max(...data.map(d => d.value)) * 1.2
        }));
      
      default:
        return data.map(item => ({
          name: item.name || item.category || item.year,
          value: item.value,
          male: item.male || null,
          female: item.female || null,
          category: item.category || null
        }));
    }
  };

  const chartData = prepareChartData();

  // Custom Y-axis tick formatter
  const formatYAxisTick = (value) => {
    // For demographic data, most values under 100 are percentages
    if (value < 100 && type !== 'radar') {
      return `${value.toFixed(0)}%`;
    }
    // For population numbers, format with locale
    return formatNumber(value, language);
  };

  // Chart rendering based on type
  switch (type) {
    case 'line':
      return (
        <ResponsiveContainer width='100%' height={height}>
          <LineChart 
            data={chartData}
            margin={{ top: 5, right: 10, left: 15, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="2 3" stroke={colors.grid} />
            <XAxis 
              dataKey="name" 
              stroke={colors.text}
              fontSize={12}
            />
            <YAxis 
              stroke={colors.text}
              fontSize={12}
              tickFormatter={formatYAxisTick}
            />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && <Legend />}
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={colors.primary}
              strokeWidth={3}
              dot={{ fill: colors.primary, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: colors.primary, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      );

    case 'area':
      return (
        <ResponsiveContainer width='100%' height={height}>
          <AreaChart 
            data={chartData}
            margin={{ top: 5, right: 10, left: 15, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="2 3" stroke={colors.grid} />
            <XAxis 
              dataKey="name" 
              stroke={colors.text}
              fontSize={12}
            />
            <YAxis 
              stroke={colors.text}
              fontSize={12}
              tickFormatter={formatYAxisTick}
            />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && <Legend />}
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={colors.primary}
              fill={colors.primary}
              fillOpacity={0.3}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      );

    case 'pie':
      const CustomPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius + 30;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        
        const textAnchor = x > cx ? 'start' : 'end';
        
        return (
          <text 
            x={x} 
            y={y} 
            fill={colors.text}
            textAnchor={textAnchor}
            dominantBaseline="central"
            fontSize={12}
            fontFamily={language === 'ar' ? 'Noto Kufi Arabic, sans-serif' : undefined}
          >
            {`${name} ${(percent * 100).toFixed(0)}%`}
          </text>
        );
      };

      return (
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={<CustomPieLabel />}
              outerRadius={Math.min(height * 0.25, 100)}
              fill={colors.primary}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colorPalette[index % colorPalette.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomPieTooltip />} />
            {showLegend && <Legend />}
          </PieChart>
        </ResponsiveContainer>
      );

    case 'donut':
      const CustomDonutLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius + 30;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        
        const textAnchor = x > cx ? 'start' : 'end';
        
        return (
          <text 
            x={x} 
            y={y} 
            fill={colors.text}
            textAnchor={textAnchor}
            dominantBaseline="central"
            fontSize={12}
            fontFamily={language === 'ar' ? 'Noto Kufi Arabic, sans-serif' : undefined}
          >
            {`${name} ${(percent * 100).toFixed(0)}%`}
          </text>
        );
      };

      return (
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={Math.min(height * 0.15, 60)}
              outerRadius={Math.min(height * 0.25, 100)}
              fill={colors.primary}
              dataKey="value"
              label={<CustomDonutLabel />}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colorPalette[index % colorPalette.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomPieTooltip />} />
            {showLegend && <Legend />}
          </PieChart>
        </ResponsiveContainer>
      );

    case 'radar':
      return (
        <ResponsiveContainer width="100%" height={height}>
          <RadarChart data={chartData}>
            <PolarGrid stroke={colors.grid} />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: colors.text, fontSize: 12 }}
            />
            <PolarRadiusAxis 
              tick={{ fill: colors.text, fontSize: 10 }}
              tickFormatter={(value) => `${value.toFixed(0)}%`}
            />
            <Radar
              name="Value"
              dataKey="value"
              stroke={colors.primary}
              fill={colors.primary}
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && <Legend />}
          </RadarChart>
        </ResponsiveContainer>
      );

    case 'composed':
      return (
        <ResponsiveContainer width="100%" height={height}>
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
            <XAxis 
              dataKey="name" 
              stroke={colors.text}
              fontSize={12}
            />
            <YAxis 
              stroke={colors.text}
              fontSize={12}
              tickFormatter={formatYAxisTick}
            />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && <Legend />}
            <Bar 
              dataKey="value" 
              fill={colors.primary}
              radius={[4, 4, 0, 0]}
            />
            {chartData.some(item => item.male && item.female) && (
              <>
                <Line 
                  type="monotone" 
                  dataKey="male" 
                  stroke={colors.male}
                  strokeWidth={3}
                  dot={{ fill: colors.male, strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="female" 
                  stroke={colors.female}
                  strokeWidth={3}
                  dot={{ fill: colors.female, strokeWidth: 2, r: 4 }}
                />
              </>
            )}
          </ComposedChart>
        </ResponsiveContainer>
      );

    case 'scatter':
      return (
        <ResponsiveContainer width="100%" height={height}>
          <ScatterChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
            <XAxis 
              dataKey="name" 
              stroke={colors.text}
              fontSize={12}
            />
            <YAxis 
              stroke={colors.text}
              fontSize={12}
              tickFormatter={formatYAxisTick}
            />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && <Legend />}
            <Scatter 
              dataKey="value" 
              fill={colors.primary}
            />
          </ScatterChart>
        </ResponsiveContainer>
      );

    case 'bar':
    default:
      // Check if we have gender-specific data
      const hasGenderData = chartData.some(item => item.male !== null || item.female !== null);
      
      return (
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
            <XAxis 
              dataKey="name" 
              stroke={colors.text}
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              stroke={colors.text}
              fontSize={12}
              tickFormatter={formatYAxisTick}
            />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && <Legend />}
            
            {hasGenderData ? (
              <>
                <Bar 
                  dataKey="male" 
                  fill={colors.male}
                  radius={[4, 4, 0, 0]}
                  name="Masculin"
                />
                <Bar 
                  dataKey="female" 
                  fill={colors.female}
                  radius={[4, 4, 0, 0]}
                  name="Féminin"
                />
              </>
            ) : (
              <Bar 
                dataKey="value" 
                fill={colors.primary}
                radius={[4, 4, 0, 0]}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      );
  }
};

export default RgphChart;