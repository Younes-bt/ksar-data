import React, { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronUp, ChevronDown, ChevronsUpDown, Calendar, MapPin, Trophy } from "lucide-react";

export default function ScoresTable({ data, isLoading, t, theme, language }) {
  const [sortField, setSortField] = useState('date'); // Default sort by date
  const [sortOrder, setSortOrder] = useState('desc'); // Default to descending
  const [resultFilter, setResultFilter] = useState('all'); // 'all', 'win', 'loss', 'draw'
  const [seasonFilter, setSeasonFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all'); // 'all', 'home', 'away'

  // Get unique seasons for filter dropdown
  const seasons = useMemo(() => {
    if (!data) return [];
    const uniqueSeasons = [...new Set(data.map(match => match.season))];
    return uniqueSeasons.sort().reverse(); // Most recent first
  }, [data]);

  // Helper function to determine match result for CSK
  const getMatchResult = (match) => {
    const isCSKHome = match['match-slim__team-home-title'] === "النادي القصري CSK";
    const homeScore = parseInt(match['match-slim__scores-hom'], 10);
    const awayScore = parseInt(match['match-slim__scores-away'], 10);

    if (isNaN(homeScore) || isNaN(awayScore)) return 'draw'; // Default to draw if scores are not numbers

    if (isCSKHome) {
      if (homeScore > awayScore) return 'win';
      if (homeScore < awayScore) return 'loss';
      return 'draw';
    } else {
      if (awayScore > homeScore) return 'win';
      if (awayScore < homeScore) return 'loss';
      return 'draw';
    }
  };

  // Helper function to get CSK's location (home/away)
  const getCSKLocation = (match) => {
    return match['match-slim__team-home-title'] === "النادي القصري CSK" ? 'home' : 'away';
  };
  
  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    if (!data) return [];
    let filtered = data.filter(match => {
      if (resultFilter !== 'all' && getMatchResult(match) !== resultFilter) return false;
      if (seasonFilter !== 'all' && match.season !== seasonFilter) return false;
      if (locationFilter !== 'all' && getCSKLocation(match) !== locationFilter) return false;
      return true;
    });

    // Sort data
    if (sortField && sortOrder) {
      filtered.sort((a, b) => {
        let valueA, valueB;
        if (sortField === 'date') {
          // Robust date parsing
          try {
            valueA = new Date(a['match__date-formatted'].split(" ").reverse().join("-"));
            valueB = new Date(b['match__date-formatted'].split(" ").reverse().join("-"));
             if (isNaN(valueA.getTime()) || isNaN(valueB.getTime())) return 0; // handle invalid dates
          } catch(e) {
            return 0;
          }
        } else if (sortField === 'season') {
          valueA = a.season;
          valueB = b.season;
        } else {
            return 0;
        }
        
        return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
      });
    }
    
    return filtered;
  }, [data, resultFilter, seasonFilter, locationFilter, sortField, sortOrder]);

  // Calculate statistics based on filtered data
  const stats = useMemo(() => {
    const wins = filteredAndSortedData.filter(match => getMatchResult(match) === 'win').length;
    const losses = filteredAndSortedData.filter(match => getMatchResult(match) === 'loss').length;
    const draws = filteredAndSortedData.filter(match => getMatchResult(match) === 'draw').length;
    const total = filteredAndSortedData.length;
    return { wins, losses, draws, total };
  }, [filteredAndSortedData]);

  const handleSort = (field) => {
    const newSortOrder = (sortField === field && sortOrder === 'desc') ? 'asc' : 'desc';
    setSortField(field);
    setSortOrder(newSortOrder);
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return <ChevronsUpDown className="h-4 w-4 opacity-50" />;
    if (sortOrder === 'asc') return <ChevronUp className="h-4 w-4 text-blue-500" />;
    return <ChevronDown className="h-4 w-4 text-blue-500" />;
  };

  const getResultBadge = (result) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium inline-flex items-center justify-center gap-1";
    const resultText = {
      win: t.scores?.win || 'Win',
      loss: t.scores?.loss || 'Loss',
      draw: t.scores?.draw || 'Draw',
    };
    switch (result) {
      case 'win': return <span className={`${baseClasses} bg-green-100 text-green-800`}>{resultText.win}</span>;
      case 'loss': return <span className={`${baseClasses} bg-red-100 text-red-800`}>{resultText.loss}</span>;
      case 'draw': return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>{resultText.draw}</span>;
      default: return <span className={baseClasses}></span>;
    }
  };
  
  const MobileCard = ({ match }) => {
    const result = getMatchResult(match);
    const location = getCSKLocation(match);
    const isCSKHome = location === 'home';
    const cskClasses = `font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`;

    return (
      <div className={`p-3 mb-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} shadow-sm`}>
        <div className="flex justify-between items-center text-xs mb-2 text-gray-500 dark:text-gray-400">
          <span>{match.season}</span>
          <span>{match['match__date-formatted']} - {match['match__time-formatted']}</span>
        </div>
        
        <div className="grid grid-cols-3 items-center gap-2 text-center mb-3">
          <span className={`font-semibold text-sm truncate ${isCSKHome ? cskClasses : ''}`}>{match['match-slim__team-home-title']}</span>
          <span className="font-bold text-lg tabular-nums">{match['match-slim__scores-hom']} - {match['match-slim__scores-away']}</span>
          <span className={`font-semibold text-sm truncate ${!isCSKHome ? cskClasses : ''}`}>{match['match-slim__team-away-title']}</span>
        </div>

        <div className="flex justify-between items-center">
          {getResultBadge(result)}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${location === 'home' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
            {location === 'home' ? (t.scores?.home || 'Home') : (t.scores?.away || 'Away')}
          </span>
        </div>
      </div>
    );
  };

  const EmptyState = () => (
    <TableRow>
      <TableCell colSpan="7" className="text-center text-gray-500 py-16">
        <div className="flex flex-col items-center gap-2">
          <div className="text-5xl">⚽</div>
          <p className="text-lg font-medium">{t.scores?.no_matches || 'No matches found'}</p>
          <p className="text-sm">{t.scores?.adjust_filters || 'Try adjusting your filters'}</p>
        </div>
      </TableCell>
    </TableRow>
  );

  const LoadingRow = ({ cells = 7 }) => (
    <TableRow>
      {Array.from({ length: cells }).map((_, cellIdx) => (
        <TableCell key={cellIdx}>
          <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
        </TableCell>
      ))}
    </TableRow>
  );

  const getFontAndDirection = () => {
    switch (language) {
      case 'ar':
        return { fontFamily: 'Noto Kufi Arabic, sans-serif', direction: 'rtl' };
      case 'fr':
        return { fontFamily: 'Inter, system-ui, sans-serif', direction: 'ltr' };
      default:
        return { fontFamily: 'Inter, sans-serif', direction: 'ltr' };
    }
  };

  return (
    <div style={getFontAndDirection()} className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { val: stats.total, label: t.scores?.total_matches || 'Total', icon: <Trophy/>, color: theme === 'dark' ? 'text-white' : 'text-gray-900' },
          { val: stats.wins, label: t.scores?.wins || 'Wins', icon: <Trophy className="text-green-500"/>, color: theme === 'dark' ? 'text-green-400' : 'text-green-600' },
          { val: stats.losses, label: t.scores?.losses || 'Losses', icon: <Trophy className="text-red-500"/>, color: theme === 'dark' ? 'text-red-400' : 'text-red-600' },
          { val: stats.draws, label: t.scores?.draws || 'Draws', icon: <Trophy className="text-yellow-500"/>, color: theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600' }
        ].map(stat => (
          <div key={stat.label} className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center space-x-2">
              <h3 className={`font-semibold text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</h3>
            </div>
            <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.val}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { value: resultFilter, onChange: (e) => setResultFilter(e.target.value), label: t.scores?.filter_result || 'Filter by Result', options: [{value: 'all', label: t.scores?.all_results || 'All'}, {value: 'win', label: t.scores?.wins || 'Wins'}, {value: 'loss', label: t.scores?.losses || 'Losses'}, {value: 'draw', label: t.scores?.draws || 'Draws'}] },
          { value: seasonFilter, onChange: (e) => setSeasonFilter(e.target.value), label: t.scores?.filter_season || 'Filter by Season', options: [{value: 'all', label: t.scores?.all_seasons || 'All Seasons'}, ...seasons.map(s => ({value: s, label: s}))] },
          { value: locationFilter, onChange: (e) => setLocationFilter(e.target.value), label: t.scores?.filter_location || 'Filter by Location', options: [{value: 'all', label: t.scores?.all_locations || 'All'}, {value: 'home', label: t.scores?.home || 'Home'}, {value: 'away', label: t.scores?.away || 'Away'}] }
        ].map(filter => (
          <div key={filter.label}>
            <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{filter.label}</label>
            <select value={filter.value} onChange={filter.onChange} className={`w-full p-2 border rounded-md ${theme === 'dark' ? 'bg-gray-950 border-gray-800 text-white' : 'bg-stone-50 border-gray-200 text-gray-950'}`}>
              {filter.options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
        ))}
      </div>

      {/* Mobile Card View */}
      <div className="block md:hidden">
        {isLoading ? Array.from({ length: 5 }).map((_, idx) => <div key={idx} className="p-3 mb-3 rounded-lg border bg-gray-50 dark:bg-gray-900 animate-pulse h-28"></div>) : filteredAndSortedData.length === 0 ? <EmptyState /> : filteredAndSortedData.map((match, idx) => <MobileCard key={idx} match={match} />)}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-auto rounded-md border max-h-[70vh] shadow-cyan-500/20 shadow-2xl">
        <Table>
          <TableHeader className={`sticky top-0 z-10 ${theme === 'dark' ? 'bg-gray-50' : 'bg-gray-50'}`}>
            <TableRow>
              {[ { key: 'season', label: t.scores?.season || 'Season', sortable: true }, { key: 'date', label: t.scores?.date || 'Date', sortable: true, icon: <Calendar className="h-4 w-4" /> }, { key: 'homeTeam', label: t.scores?.home_team || 'Home Team', className: 'text-right' }, { key: 'score', label: t.scores?.score || 'Score', className: 'text-center' }, { key: 'awayTeam', label: t.scores?.away_team || 'Away Team' }, { key: 'result', label: t.scores?.result || 'Result', className: 'text-center' }, { key: 'location', label: <MapPin className="h-4 w-4 mx-auto" />, className: 'text-center' } ].map(col => (
                <TableHead key={col.key} className={col.className}>
                  {col.sortable ? <div className="flex items-center gap-1 cursor-pointer select-none" onClick={() => handleSort(col.key)}>{col.icon || ''}<span>{col.label}</span>{getSortIcon(col.key)}</div> : col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 10 }).map((_, idx) => <LoadingRow key={idx} />)
            ) : filteredAndSortedData.length === 0 ? (
              <EmptyState />
            ) : (
              filteredAndSortedData.map((match, idx) => {
                const result = getMatchResult(match);
                const location = getCSKLocation(match);
                const isCSKHome = location === 'home';
                const cskClasses = `font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`;
                
                return (
                  <TableRow key={idx} className={`${theme === 'dark' ? 'hover:bg-gray-700 text-gray-100' : 'bg-stone-50 text-gray-950 hover:bg-gray-100'} transition-colors`}>
                    <TableCell className="font-medium text-xs">{match.season}</TableCell>
                    <TableCell className="text-xs">
                      <div>{match['match__date-formatted']}</div>
                      <div className="text-gray-500 dark:text-gray-400">{match['match__time-formatted']}</div>
                    </TableCell>
                    <TableCell className={`text-right font-semibold text-xs ${isCSKHome ? cskClasses : ''}`}>{match['match-slim__team-home-title']}</TableCell>
                    <TableCell className="text-center font-bold text-sm tabular-nums">
                      <span >{match['match-slim__scores-away']}</span>
                      <span className="mx-1">-</span>
                      <span >{match['match-slim__scores-hom']}</span>
                    </TableCell>
                    <TableCell className={`font-semibold text-xs ${!isCSKHome ? cskClasses : ''}`}>{match['match-slim__team-away-title']}</TableCell>
                    <TableCell className="text-center">{getResultBadge(result)}</TableCell>
                    <TableCell className="text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${location === 'home' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                        {location === 'home' ? (t.scores?.home || 'Home') : (t.scores?.away || 'Away')}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}