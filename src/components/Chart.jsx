// src/components/Chart.jsx

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

const formatCurrency = (value, language = 'fr') => {
  const locale = language === 'ar' ? 'ar-MA' : 'fr-MA';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'MAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

const formatNumber = (value, language = 'fr') => {
  const locale = language === 'ar' ? 'fr-MA' : 'fr-MA';
  return new Intl.NumberFormat(locale).format(value);
};

const Chart = ({ 
  data, 
  type = 'bar', 
  theme = 'dark',
  language = 'fr',
  showLegend = false,
  height = 300
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
        grid: '#374151', 
        text: '#D1D5DB' 
      }
    : { 
        primary: '#2563EB', 
        secondary: '#059669', 
        tertiary: '#D97706',
        quaternary: '#DC2626',
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
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name && `${entry.name}: `}
              {typeof entry.value === 'number' ? formatCurrency(entry.value, language) : entry.value}
            </p>
          ))}
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
            {formatCurrency(data.value, language)}
          </p>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {((data.value / data.payload.total) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  // Prepare chart data based on type
  const prepareChartData = () => {
    switch (type) {
      case 'pie':
        const total = data.reduce((sum, item) => sum + (item.value || 0), 0);
        return data.map(item => ({
          ...item,
          name: item.year || item.category || item.name,
          value: item.value,
          total
        }));
      
      case 'radar':
        return data.map(item => ({
          subject: item.year || item.category || item.name,
          value: item.value,
          fullMark: Math.max(...data.map(d => d.value)) * 1.2
        }));
      
      default:
        return data.map(item => ({
          name: item.year || item.category || item.name,
          value: item.value,
          value2: item.value2 || null // For composed charts
        }));
    }
  };

  const chartData = prepareChartData();

  // Chart rendering based on type
  switch (type) {
    case 'line':
      return (
        <ResponsiveContainer width='100%' height={height}>
          <LineChart 
            data={chartData}
            margin={{ top: 5, right: 10, left: 15, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="6 6" stroke={colors.grid} />
            <XAxis 
              dataKey="name" 
              stroke={colors.text}
              fontSize={10}
            />
            
            <Tooltip content={<CustomTooltip />} />
            {showLegend && <Legend />}
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={colors.primary}
              strokeWidth={3}
              dot={{ fill: colors.primary, strokeWidth: 2, r: 5}}
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
              tickFormatter={(value) => formatCurrency(value, language)}
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
        // Increase radius for label positioning to ensure labels are outside
        const radius = outerRadius + 30;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        
        // Determine text anchor based on position, not language
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
              labelLine={true}
              label={<CustomPieLabel />}
              outerRadius={Math.min(height * 0.60, 100)} // Reduced to make room for labels
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
        // Increase radius for label positioning to ensure labels are outside
        const radius = outerRadius + 30;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        
        // Determine text anchor based on position, not language
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
              outerRadius={Math.min(height * 0.25, 100)} // Reduced to make room for labels
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
              tickFormatter={(value) => formatNumber(value, language)}
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
              tickFormatter={(value) => formatCurrency(value, language)}
            />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && <Legend />}
            <Bar 
              dataKey="value" 
              fill={colors.primary}
              radius={[4, 4, 0, 0]}
            />
            {chartData.some(item => item.value2) && (
              <Line 
                type="monotone" 
                dataKey="value2" 
                stroke={colors.secondary}
                strokeWidth={3}
                dot={{ fill: colors.secondary, strokeWidth: 2, r: 4 }}
              />
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
              tickFormatter={(value) => formatCurrency(value, language)}
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
            
            <Tooltip content={<CustomTooltip />} />
            {showLegend && <Legend />}
            <Bar 
              dataKey="value" 
              fill={colors.primary}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      );
  }
};

export default Chart;