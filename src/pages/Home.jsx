import React from 'react';
import { Link } from "react-router-dom";
import { Typewriter } from 'react-simple-typewriter'
import { Search, TrendingUp, Users, ArrowRight, BarChart3 } from 'lucide-react';
import GlobeBackground from '../components/GlobeBackground';

const Home = ({ t, language, theme }) => {
  const text1 = [t?.home?.yourCity || 'YOUR CITY..', t?.home?.yourBudget || 'YOUR BUDGET']


  const arabicStyle = {
    fontFamily: 'Noto Kufi Arabic, sans-serif',
    direction: 'rtl',
    
  }

  // Theme classes for consistency
  const themeClasses = {
    bg: theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50',
    cardBg: theme === 'dark' ? 'bg-gray-900' : 'bg-white',
    borderColor: theme === 'dark' ? 'border-gray-800' : 'border-gray-200',
    textPrimary: theme === 'dark' ? 'text-white' : 'text-gray-900',
    textSecondary: theme === 'dark' ? 'text-gray-400' : 'text-gray-600',
    textAccent: theme === 'dark' ? 'text-blue-400' : 'text-blue-600',
    gradientFrom: theme === 'dark' ? 'from-blue-600' : 'from-blue-500',
    gradientTo: theme === 'dark' ? 'to-purple-600' : 'to-purple-500'
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* HERO SECTION */}
      <div className={`relative overflow-hidden ${themeClasses.bg}`}>
        {/* Animated Dark Blue Gradient Background */}
        
        {/* Subtle animated dots pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400 rounded-full animate-ping delay-20"></div>
          <div className="absolute bottom-32 right-32 w-2 h-2 bg-blue-400 rounded-full animate-ping delay-3000"></div>
          <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-3000"></div>
          <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-indigo-400 rounded-full animate-ping delay-3000"></div>
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="container mx-auto px-3 lg:px-15">
            <div className="lg:flex lg:flex-cols-2 gap-12 items-center">
      <GlobeBackground theme={theme}/>
              
              {/* Left Side - Text Content */}
              <div className="space-y-15 text-center">
                
                {/* Main Headlines */}
                <div className="space-y-4">
                    <h1 className=" lg:text-6xl font-[1000] leading-tight">
                      {/* First Line */}
                      <span
                        style={language === 'ar' ? arabicStyle : undefined}
                        className={`md:text-8xl text-6xl text-center bg-gradient-to-r ${theme === 'dark' ? 'from-amber-600 via-amber-300 to-amber-600' : 'from-amber-600 via-amber-400 to-amber-600'} bg-clip-text text-transparent `}
                      >
                        <Typewriter
                          words={text1}
                          loop={false}
                          cursor
                          typeSpeed={100}
                          deleteSpeed={30}
                          delaySpeed={2000}
                        />
                      </span>
                    </h1>
                  </div>

                {/* Main Description */}
                <div className="space-y-6 text-center">
                  
                  <h2 style={language === 'ar' ? { fontFamily: 'Noto Kufi Arabic, sans-serif', direction:'rtl', fontSize:'1.50rem' } : undefined} className={`text-xl lg:text-2xl font-bold leading-relaxed ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                    {t?.home?.welcomeMessage || 'WELCOME TO KSAR-DATA'}
                  </h2>

                  
                  <p style={language === 'ar' ? { fontFamily: 'Noto Kufi Arabic, sans-serif', direction:'rtl', fontSize:'1.25rem' } : undefined} className={`text-base lg:text-sm leading-relaxed max-w-xl ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                    {t?.home?.subtitle || 'An interactive web application aimed at helping users explore public data related to the city of Ksar El Kebir in a visual and user-friendly way.'}
                  </p>
                </div>

                
                
              </div>

              {/* Right Side - PNG Image */}
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative">
                  {/* Subtle glow effect behind image */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 blur-3xl transform scale-110"></div>
                  
                  {/* PNG Image Container */}
                  <div className="relative  mt-8">
                    <img 
                      src={theme === 'dark'
                        ? 'https://res.cloudinary.com/daeuundyc/image/upload/f_auto,q_auto/ksar-el-kebir-gate_lqfind.png'
                        : 'https://res.cloudinary.com/daeuundyc/image/upload/f_auto,q_auto/ksar-el-kebir-gate_dark_ujloxv.png'

                      }
                      alt="Ksar El Kebir Gate"
                      className="w-100 sm:w-250 max-w-2xl h-auto object-contain drop-shadow-2xl"
                    />
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* SEARCH SECTION */}
      <section 
        className={`py-20 ${themeClasses.bg}`}
        dir={language === 'ar' ? 'rtl' : 'ltr'}
        style={language === 'ar' ? { fontFamily: 'Noto Kufi Arabic, sans-serif' } : undefined}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="lg:flex lg:items-center lg:gap-16">
            
            {/* Text Content */}
            <div className={`lg:w-1/2 space-y-6 ${language === 'ar' ? 'text-right' : 'text-left'} mb-12 lg:mb-0`}>
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-3 rounded-full ${theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-100'}`}>
                  <Search className={`w-6 h-6 ${themeClasses.textAccent}`} />
                </div>
                <h2 className={`text-3xl lg:text-4xl font-bold ${themeClasses.textPrimary}`}>
                  {t?.home?.searchTitle || 'EXPLORE THE BUDGET'}
                </h2>
              </div>
              
              <p className={`text-lg leading-relaxed ${themeClasses.textSecondary}`}>
                {t?.home?.searchDescription || 'Dive deep into Ksar El Kebir\'s financial data. Search through thousands of budget entries, filter by year and type, and discover where public money flows. Our intuitive search makes complex budget data accessible to everyone.'}
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full bg-green-500 ${language === 'ar' ? 'ml-3' : 'mr-3'}`}></div>
                  <span className={themeClasses.textSecondary}>
                    {t?.home?.searchFeature1 || 'Advanced search and filtering'}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full bg-green-500 ${language === 'ar' ? 'ml-3' : 'mr-3'}`}></div>
                  <span className={themeClasses.textSecondary}>
                    {t?.home?.searchFeature2 || 'Multi-year budget comparison'}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full bg-green-500 ${language === 'ar' ? 'ml-3' : 'mr-3'}`}></div>
                  <span className={themeClasses.textSecondary}>
                    {t?.home?.searchFeature3 || 'Mobile-friendly interface'}
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <Link to="/search">
                  <button className={`inline-flex items-center px-6 py-3 text-base font-semibold rounded-full border-2 transition-all duration-300 hover:scale-105 ${theme === 'dark' ? 'border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white' : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'}`}>
                    {t?.home?.searchCTA || 'START SEARCHING'}
                    <ArrowRight className={`w-4 h-4 ${language === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`} />
                  </button>
                </Link>
              </div>
            </div>

            {/* Image/Visual */}
            <div className="lg:w-1/2 relative">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 blur-2xl transform scale-110"></div>
                
                {/* Placeholder for search page screenshot/illustration */}
                <div className={`relative z-10 rounded-lg border-2 p-8 ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-sm`}>
                  <div className="space-y-4">
                    <div className={`h-12 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} flex items-center px-4`}>
                      <Search className={`w-5 h-5 ${themeClasses.textSecondary} mr-3`} />
                      <div className={`h-2 bg-gradient-to-r ${themeClasses.gradientFrom} ${themeClasses.gradientTo} rounded-full w-1/3`}></div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {[1, 2, 3, 4, 5, 3].map((i) => (
                        <div key={i} className={`h-8 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}></div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className={`h-6 rounded ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-150'}`}></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RGPH SECTION - NEW */}                
      <section 
        className={`py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}
        dir={language === 'ar' ? 'rtl' : 'ltr'}
        style={language === 'ar' ? { fontFamily: 'Noto Kufi Arabic, sans-serif' } : undefined}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="lg:flex lg:items-center lg:gap-16">
            
            {/* Image/Visual - Left side */}
            <div className="lg:w-1/2 relative mb-12 lg:mb-0 order-2 lg:order-1">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-cyan-400/10 blur-2xl transform scale-110"></div>
                
                {/* RGPH data visualization */}
                <div className={`relative z-10 rounded-lg border-2 p-8 ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-sm`}>
                  <div className="space-y-6">
                    {/* Population demographics visualization */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Male/Female distribution */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className={`w-3 h-3 rounded-full bg-blue-500`}></div>
                          <div className={`h-2 bg-blue-500 rounded-full flex-1 mx-2`}></div>
                          <span className={`text-xs ${themeClasses.textSecondary}`}>49%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className={`w-3 h-3 rounded-full bg-pink-500`}></div>
                          <div className={`h-2 bg-pink-500 rounded-full flex-1 mx-2`}></div>
                          <span className={`text-xs ${themeClasses.textSecondary}`}>51%</span>
                        </div>
                      </div>
                      
                      {/* Age groups */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className={`w-3 h-3 rounded-full bg-green-500`}></div>
                          <div className={`h-2 bg-green-500 rounded-full w-1/4`}></div>
                          <span className={`text-xs ${themeClasses.textSecondary} ml-2`}>25%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className={`w-3 h-3 rounded-full bg-yellow-500`}></div>
                          <div className={`h-2 bg-yellow-500 rounded-full w-3/5`}></div>
                          <span className={`text-xs ${themeClasses.textSecondary} ml-2`}>60%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className={`w-3 h-3 rounded-full bg-orange-500`}></div>
                          <div className={`h-2 bg-orange-500 rounded-full w-1/6`}></div>
                          <span className={`text-xs ${themeClasses.textSecondary} ml-2`}>15%</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Housing conditions indicators */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded ${theme === 'dark' ? 'bg-teal-600' : 'bg-teal-500'}`}></div>
                        <div className={`h-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex-1`}></div>
                        <span className={`text-xs ${themeClasses.textSecondary}`}>98%</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded ${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'}`}></div>
                        <div className={`h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex-1`}></div>
                        <span className={`text-xs ${themeClasses.textSecondary}`}>97%</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded ${theme === 'dark' ? 'bg-purple-600' : 'bg-purple-500'}`}></div>
                        <div className={`h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex-1`}></div>
                        <span className={`text-xs ${themeClasses.textSecondary}`}>99%</span>
                      </div>
                    </div>

                    {/* Years comparison */}
                    <div className="flex justify-center space-x-6 pt-4">
                      <div className="text-center">
                        <div className={`w-8 h-8 rounded-full ${theme === 'dark' ? 'bg-teal-600' : 'bg-teal-500'} mx-auto mb-1 flex items-center justify-center`}>
                          <span className="text-xs text-white font-bold">42</span>
                        </div>
                        <div className={`h-2 rounded ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'} w-8`}></div>
                      </div>
                      <div className="text-center">
                        <div className={`w-8 h-8 rounded-full ${theme === 'dark' ? 'bg-cyan-600' : 'bg-cyan-500'} mx-auto mb-1 flex items-center justify-center`}>
                          <span className="text-xs text-white font-bold">A</span>
                        </div>
                        <div className={`h-2 rounded ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'} w-8`}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className={`lg:w-1/2 space-y-6 ${language === 'ar' ? 'text-right' : 'text-left'} order-1 lg:order-2`}>
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-3 rounded-full ${theme === 'dark' ? 'bg-teal-600/20' : 'bg-teal-100'}`}>
                  <BarChart3 className={`w-6 h-6 ${theme === 'dark' ? 'text-teal-400' : 'text-teal-600'}`} />
                </div>
                <h2 className={`text-3xl lg:text-4xl font-bold ${themeClasses.textPrimary}`}>
                  {t?.home?.rgphTitle || 'CENSUS DATA (RGPH)'}
                </h2>
              </div>
              
              <p className={`text-lg leading-relaxed ${themeClasses.textSecondary}`}>
                {t?.home?.rgphDescription || 'Explore comprehensive demographic and housing data from Morocco\'s General Population and Housing Census. Access detailed statistics about education, employment, languages, and living conditions in Ksar El Kebir.'}
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full bg-teal-500 ${language === 'ar' ? 'ml-3' : 'mr-3'}`}></div>
                  <span className={themeClasses.textSecondary}>
                    {t?.home?.rgphFeature1 || 'Population demographics by age and gender'}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full bg-teal-500 ${language === 'ar' ? 'ml-3' : 'mr-3'}`}></div>
                  <span className={themeClasses.textSecondary}>
                    {t?.home?.rgphFeature2 || 'Education and employment statistics'}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full bg-teal-500 ${language === 'ar' ? 'ml-3' : 'mr-3'}`}></div>
                  <span className={themeClasses.textSecondary}>
                    {t?.home?.rgphFeature3 || 'Housing conditions and infrastructure'}
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <Link to="/rgph">
                  <button className={`inline-flex items-center px-6 py-3 text-base font-semibold rounded-full border-2 transition-all duration-300 hover:scale-105 ${theme === 'dark' ? 'border-teal-500 text-teal-400 hover:bg-teal-500 hover:text-white' : 'border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white'}`}>
                    {t?.home?.rgphCTA || 'EXPLORE CENSUS DATA'}
                    <ArrowRight className={`w-4 h-4 ${language === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INSIGHTS SECTION */}
      <section 
        className={`py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}
        dir={language === 'ar' ? 'rtl' : 'ltr'}
        style={language === 'ar' ? { fontFamily: 'Noto Kufi Arabic, sans-serif' } : undefined}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="lg:flex lg:items-center lg:gap-16">
            
            {/* Image/Visual - Left side for variety */}
            <div className="lg:w-1/2 relative mb-12 lg:mb-0 order-2 lg:order-1">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 blur-2xl transform scale-110"></div>
                
                {/* Placeholder for insights visualization */}
                <div className={`relative z-10 rounded-lg border-2 p-8 ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-sm`}>
                  <div className="space-y-6">
                    {/* Chart placeholder */}
                    <div className="relative">
                      <div className={`h-32 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} p-4`}>
                        <div className="flex items-end justify-between h-full space-x-2">
                          {[60, 80, 45, 90, 70, 55].map((height, i) => (
                            <div 
                              key={i} 
                              className={`bg-gradient-to-t ${themeClasses.gradientFrom} ${themeClasses.gradientTo} rounded-t`}
                              style={{ height: `${height}%`, width: '12%' }}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Analytics cards */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-100'}`}>
                        <div className={`w-full h-2 bg-gradient-to-r ${themeClasses.gradientFrom} ${themeClasses.gradientTo} rounded-full mb-2`}></div>
                        <div className={`h-4 rounded ${theme === 'dark' ? 'bg-gray-500' : 'bg-gray-200'} w-3/4`}></div>
                      </div>
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-100'}`}>
                        <div className={`w-full h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-2`}></div>
                        <div className={`h-4 rounded ${theme === 'dark' ? 'bg-gray-500' : 'bg-gray-200'} w-2/3`}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className={`lg:w-1/2 space-y-6 ${language === 'ar' ? 'text-right' : 'text-left'} order-1 lg:order-2`}>
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-3 rounded-full ${theme === 'dark' ? 'bg-purple-600/20' : 'bg-purple-100'}`}>
                  <TrendingUp className={`w-6 h-6 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                </div>
                <h2 className={`text-3xl lg:text-4xl font-bold ${themeClasses.textPrimary}`}>
                  {t?.home?.insightsTitle || 'DISCOVER INSIGHTS'}
                </h2>
              </div>
              
              <p className={`text-lg leading-relaxed ${themeClasses.textSecondary}`}>
                {t?.home?.insightsDescription || 'Uncover meaningful patterns and trends in the city\'s financial data. Our interactive analytics transform complex budget information into clear, visual insights that tell the story of how your city invests in its future.'}
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full bg-purple-500 ${language === 'ar' ? 'ml-3' : 'mr-3'}`}></div>
                  <span className={themeClasses.textSecondary}>
                    {t?.home?.insightsFeature1 || 'Interactive charts and visualizations'}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full bg-purple-500 ${language === 'ar' ? 'ml-3' : 'mr-3'}`}></div>
                  <span className={themeClasses.textSecondary}>
                    {t?.home?.insightsFeature2 || 'Multi-year trend analysis'}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full bg-purple-500 ${language === 'ar' ? 'ml-3' : 'mr-3'}`}></div>
                  <span className={themeClasses.textSecondary}>
                    {t?.home?.insightsFeature3 || 'Key performance indicators'}
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <Link to="/insights">
                  <button className={`inline-flex items-center px-6 py-3 text-base font-semibold rounded-full border-2 transition-all duration-300 hover:scale-105 ${theme === 'dark' ? 'border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white' : 'border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white'}`}>
                    {t?.home?.insightsCTA || 'VIEW ANALYTICS'}
                    <ArrowRight className={`w-4 h-4 ${language === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section 
        className={`py-20 ${themeClasses.bg}`}
        dir={language === 'ar' ? 'rtl' : 'ltr'}
        style={language === 'ar' ? { fontFamily: 'Noto Kufi Arabic, sans-serif' } : undefined}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="lg:flex lg:items-center lg:gap-16">
            
            {/* Text Content */}
            <div className={`lg:w-1/2 space-y-6 ${language === 'ar' ? 'text-right' : 'text-left'} mb-12 lg:mb-0`}>
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-3 rounded-full ${theme === 'dark' ? 'bg-green-600/20' : 'bg-green-100'}`}>
                  <Users className={`w-6 h-6 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                </div>
                <h2 className={`text-3xl lg:text-4xl font-bold ${themeClasses.textPrimary}`}>
                  {t?.home?.aboutTitle || 'ABOUT KSAR-DATA'}
                </h2>
              </div>
              
              <p className={`text-lg leading-relaxed ${themeClasses.textSecondary}`}>
                {t?.home?.aboutDescription || 'KSAR-DATA is a local initiative dedicated to making public data transparent and accessible. We believe in the power of information to strengthen democracy and civic engagement in our community.'}
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full bg-green-500 ${language === 'ar' ? 'ml-3' : 'mr-3'}`}></div>
                  <span className={themeClasses.textSecondary}>
                    {t?.home?.aboutFeature1 || 'Non-political, community-driven'}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full bg-green-500 ${language === 'ar' ? 'ml-3' : 'mr-3'}`}></div>
                  <span className={themeClasses.textSecondary}>
                    {t?.home?.aboutFeature2 || 'Open source and transparent'}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full bg-green-500 ${language === 'ar' ? 'ml-3' : 'mr-3'}`}></div>
                  <span className={themeClasses.textSecondary}>
                    {t?.home?.aboutFeature3 || 'Built for civic awareness'}
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <Link to="/about">
                  <button className={`inline-flex items-center px-6 py-3 text-base font-semibold rounded-full border-2 transition-all duration-300 hover:scale-105 ${theme === 'dark' ? 'border-green-500 text-green-400 hover:bg-green-500 hover:text-white' : 'border-green-600 text-green-600 hover:bg-green-600 hover:text-white'}`}>
                    {t?.home?.aboutCTA || 'LEARN MORE'}
                    <ArrowRight className={`w-4 h-4 ${language === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`} />
                  </button>
                </Link>
              </div>
            </div>

            {/* Image/Visual */}
            <div className="lg:w-1/2 relative">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-teal-400/10 blur-2xl transform scale-110"></div>
                
                {/* Team/Community illustration */}
                <div className={`relative z-10 rounded-lg border-2 p-8 ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-sm`}>
                  <div className="space-y-6">
                    {/* Community icons */}
                    <div className="flex justify-center space-x-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className={`w-12 h-12 rounded-full ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'} flex items-center justify-center`}>
                          <Users className={`w-6 h-6 ${themeClasses.textAccent}`} />
                        </div>
                      ))}
                    </div>
                    
                    {/* Mission statement visualization */}
                    <div className="text-center space-y-3">
                      <div className={`h-4 rounded-full bg-gradient-to-r ${themeClasses.gradientFrom} ${themeClasses.gradientTo} mx-auto w-3/4`}></div>
                      <div className={`h-3 rounded-full ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'} mx-auto w-1/2`}></div>
                      <div className={`h-3 rounded-full ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'} mx-auto w-2/3`}></div>
                    </div>
                    
                    {/* Values indicators */}
                    <div className="flex justify-around pt-4">
                      <div className="text-center">
                        <div className={`w-8 h-8 rounded-full bg-green-500 mx-auto mb-2 flex items-center justify-center`}>
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <div className={`h-2 rounded ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'} w-12`}></div>
                      </div>
                      <div className="text-center">
                        <div className={`w-8 h-8 rounded-full bg-blue-500 mx-auto mb-2 flex items-center justify-center`}>
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <div className={`h-2 rounded ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'} w-12`}></div>
                      </div>
                      <div className="text-center">
                        <div className={`w-8 h-8 rounded-full bg-purple-500 mx-auto mb-2 flex items-center justify-center`}>
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <div className={`h-2 rounded ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'} w-12`}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center">
            <div className={`inline-flex items-center px-6 py-3 rounded-full border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-3"></div>
              <span className={themeClasses.textSecondary}>
                {language === 'ar' ? 'الشفافية من خلال البيانات' : 
                 language === 'en' ? 'Transparency through data' : 
                 'Transparence par les données'}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;