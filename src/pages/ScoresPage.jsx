import React from "react";
import ScoresTable from "../components/ScoresTable";
import { Trophy, Target, TrendingUp } from "lucide-react";

export default function ScoresPage({ data, loading, t, language, theme }) {
  // Calculate overall statistics for the header
  const overallStats = React.useMemo(() => {
    if (!data || data.length === 0) return { wins: 0, losses: 0, draws: 0, total: 0 };
    
    const getMatchResult = (match) => {
      const isHome = match['match-slim__team-home-title'] === "النادي القصري CSK";
      const homeScore = parseInt(match['match-slim__scores-hom']);
      const awayScore = parseInt(match['match-slim__scores-away']);
      
      if (isHome) {
        if (homeScore > awayScore) return 'win';
        if (homeScore < awayScore) return 'loss';
        return 'draw';
      } else {
        if (awayScore > homeScore) return 'win';
        if (awayScore < homeScore) return 'loss';
        return 'draw';
      }
    };

    const wins = data.filter(match => getMatchResult(match) === 'win').length;
    const losses = data.filter(match => getMatchResult(match) === 'loss').length;
    const draws = data.filter(match => getMatchResult(match) === 'draw').length;
    const total = data.length;
    
    return { wins, losses, draws, total };
  }, [data]);

  const winRate = overallStats.total > 0 ? ((overallStats.wins / overallStats.total) * 100).toFixed(1) : 0;

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
    <div style={getFontAndDirection()} className={`min-h-screen transition-colors duration-200 ${
      theme === 'dark' ? 'bg-gray-950' : 'bg-stone-50'
    }`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className={`rounded-xl mb-8 p-8 border ${
          theme === 'dark' 
            ? 'bg-gray-900 border-gray-800' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                
                <div>
                  <h1 className={`text-xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`} style={language === 'ar' ? { direction: 'rtl' } : { direction: 'ltr' }}>
                    {t.scores?.page_title || 'CSK Match Results'}
                  </h1>
                  <p className={`text-lg ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`} style={language === 'ar' ? { direction: 'rtl' } : { direction: 'ltr' }}>
                    {t.scores?.page_subtitle || 'Complete match history and statistics for Chabab Souss Ksar'}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              <div className="text-center">
                <div className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-green-400' : 'text-green-600'
                }`}>
                  {overallStats.wins}
                </div>
                <div className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {t.scores?.wins || 'Wins'}
                </div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
                }`}>
                  {overallStats.draws}
                </div>
                <div className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {t.scores?.draws || 'Draws'}
                </div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-red-400' : 'text-red-600'
                }`}>
                  {overallStats.losses}
                </div>
                <div className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {t.scores?.losses || 'Losses'}
                </div>
              </div>
            </div>
          </div>

          {/* Win Rate */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <TrendingUp className={`h-5 w-5 ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                }`} />
                <span className={`font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {t.scores?.win_rate || 'Win Rate'}:
                </span>
              </div>
              <div className={`text-xl font-bold ${
                parseFloat(winRate) >= 50 
                  ? theme === 'dark' ? 'text-green-400' : 'text-green-600'
                  : theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
              }`}>
                {winRate}%
              </div>
              <div className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                ({overallStats.total} {t.scores?.total_matches_text || 'total matches'})
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              {t?.common?.loading || "Loading Matches..."}
            </h2>
          </div>
        )}

        {/* Error State */}
        {!loading && (!data || data.length === 0) && (
          <div className={`text-center py-12 rounded-lg border ${
            theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
          }`}>
            <Target className={`h-16 w-16 mx-auto mb-4 ${
              theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
            }`} />
            <h2 className={`text-xl font-semibold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              {t.scores?.no_data || 'No match data available'}
            </h2>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {t.scores?.no_data_description || 'Match results will appear here when data is loaded.'}
            </p>
          </div>
        )}

        {/* Main Content */}
        {!loading && data && data.length > 0 && (
          <div className={`rounded-lg border p-6 ${
            theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
          }`}>
            <div className="mb-6">
              <h2 className={`text-xl font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`} style={language === 'ar' ? { direction: 'rtl' } : { direction: 'ltr' }}>
                {t.scores?.match_history || 'Match History'}
              </h2>
              <p className={`mt-1 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`} style={language === 'ar' ? { direction: 'rtl' } : { direction: 'ltr' }}>
                {t.scores?.filter_description || 'Use the filters below to analyze match results by season, result, or location.'}
              </p>
            </div>

            <ScoresTable 
              data={data} 
              isLoading={loading} 
              t={t} 
              theme={theme} 
              language={language} 
            />
          </div>
        )}
      </div>
    </div>
  );
}