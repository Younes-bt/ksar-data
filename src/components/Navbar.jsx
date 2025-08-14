import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle, } from "@/components/ui/navigation-menu"
import { Link } from "react-router-dom"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import { useState } from "react"
import ThemeToggle from "./ThemeToggle"

function Navbar({ language, setLanguage, theme, setTheme, t }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { path: "/", label: t?.navbar?.home || "Home" },
  ]

  const dataGroup = [
    { path: "/rgph", label: t?.navbar?.RGPH || "RGPH" },
    { path: "/scores", label: t?.navbar?.scores || "CSK scores" },
    { path: "/medicines", label: t?.navbar?.medicine || "Medicine Prices" },
  ]

  const informationGroup = [
    { path: "/insights", label: t?.navbar?.insights || "Insights" },
    { path: "/facts", label: t?.navbar?.facts || "facts" },
  ]

  // MODIFICATION: Added links to new pages
  const aboutGroup = [
    { path: "/download", label: t?.navbar?.download || "download" },
    { path: "/about", label: t?.navbar?.about || "About" },
    { path: "/contactUs", label: t?.navbar?.contact || "Contact" },
    { path: "/privacy-policy", label: t?.navbar?.privacy || "Privacy Policy" },
    { path: "/terms-of-use", label: t?.navbar?.terms || "Terms of Use" },
  ]

  const servicesGroup = [
    { path: "/search", label: t?.navbar?.search || "Budget" },
    { path: "/decisions", label: t?.navbar?.decisions || "Decisions" },
    { path: "/attendance", label: t?.navbar?.attendance || "Attendance" },
    { path: "/support", label: t?.navbar?.support || "Support" },
  ]

  const languages = [
    { code: "en", label: "🇺🇸 English" },
    { code: "fr", label: "🇫🇷 Français" },
    { code: "ar", label: "🇲🇦 العربية" },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header 
      style={language === 'ar' ? { fontFamily: 'Noto Kufi Arabic, sans-serif'} : { fontFamily: 'Inter, sans-serif', direction:'ltr'}} 
      className={`sticky top-0 z-50 w-full border-b ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}
    >
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <Link to="/" className="flex items-center text-xl font-bold">
          <img 
            src={`${theme === 'dark' ? '/logo_on_dark.png' : '/Logo_on_white.png'}`} 
            alt="Ksar El Kebir Gate"
            className={`w-10 max-w-2xl h-auto object-contain drop-shadow-2xl ${language === 'ar' ? 'ml-4' : 'mr-4'}`}
          />
          KSAR DATA
        </Link>

        {/* Desktop Navigation */}
        <div className={`hidden md:flex items-center gap-4 `}>
          {/* Home Link */}
          <Link 
            to="/" 
            className={`px-4 py-2 rounded-md transition-colors font-sm  border border-transparent ${theme === 'dark' ? 'text-white hover:bg-gray-200 hover:text-gray-950 hover:border-gray-200' : 'text-gray-950 hover:bg-blue-600 hover:text-gray-200 hover:border-blue-600'}`}
          >
            {t?.navbar?.home || "Home"}
          </Link>

          {/* Services Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                className={`px-4 py-2 rounded-md transition-colors font-sm  border border-transparent flex items-center gap-1 bg-transparent ${theme === 'dark' ? 'text-white hover:bg-gray-200 hover:text-gray-950 hover:border-gray-200' : 'text-gray-950 hover:bg-blue-600 hover:text-gray-200 hover:border-blue-600'}`}
              >
                {t?.navbar?.services || "Services"}
                <ChevronDown className={`h-4 w-4 ${language === 'ar' ? 'mr-1' : 'ml-1'}`} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align={language === 'ar' ? 'end' : 'start'} 
              className={`min-w-[250px] ${theme === 'dark' ? 'bg-gray-950 border-gray-800' : 'bg-white border-gray-200'}`}
            >
              {servicesGroup.map(item => (
                <DropdownMenuItem key={item.path} asChild>
                  <Link
                    to={item.path}
                    className={`w-full px-3 py-2 ${theme === 'dark' ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-gray-900'}`}
                  >
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Data Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                className={`px-4 py-2 rounded-md transition-colors font-sm  border border-transparent flex items-center gap-1 bg-transparent ${theme === 'dark' ? 'hover:bg-gray-200 hover:text-gray-950 hover:border-gray-200' : 'text-gray-950 hover:bg-blue-600 hover:text-gray-200 hover:border-blue-600'}`}
              >
                {t?.navbar?.data || "Data"}
                <ChevronDown className={`h-4 w-4 ${language === 'ar' ? 'mr-1' : 'ml-1'}`} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align={language === 'ar' ? 'end' : 'start'} 
              className={`min-w-[250px] ${theme === 'dark' ? 'bg-gray-950 border-gray-800' : 'bg-white border-gray-200'}`}
            >
              {dataGroup.map(item => (
                <DropdownMenuItem key={item.path} asChild>
                  <Link
                    to={item.path}
                    className={`w-full px-3 py-2 ${theme === 'dark' ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-gray-900'}`}
                  >
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Information Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                className={`px-4 py-2 rounded-md transition-colors font-sm  border border-transparent flex items-center gap-1 bg-transparent ${theme === 'dark' ? 'text-white hover:bg-gray-200 hover:text-gray-950 hover:border-gray-200' : 'text-gray-950 hover:bg-blue-600 hover:text-gray-200 hover:border-blue-600'}`}
              >
                {t?.navbar?.information || "Information"}
                <ChevronDown className={`h-4 w-4 ${language === 'ar' ? 'mr-1' : 'ml-1'}`} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align={language === 'ar' ? 'end' : 'start'} 
              className={`min-w-[250px] ${theme === 'dark' ? 'bg-gray-950 border-gray-800' : 'bg-white border-gray-200'}`}
            >
              {informationGroup.map(item => (
                <DropdownMenuItem key={item.path} asChild>
                  <Link
                    to={item.path}
                    className={`w-full px-3 py-2 ${theme === 'dark' ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-gray-900'}`}
                  >
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* About Us Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                className={`px-4 py-2 rounded-md transition-colors font-sm  border border-transparent flex items-center gap-1 bg-transparent ${theme === 'dark' ? 'text-white hover:bg-gray-200 hover:text-gray-950 hover:border-gray-200' : 'text-gray-950 hover:bg-blue-600 hover:text-gray-200 hover:border-blue-600'}`}
              >
                {t?.navbar?.aboutUs || "About Us"}
                <ChevronDown className={`h-4 w-4 ${language === 'ar' ? 'mr-1' : 'ml-1'}`} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align={language === 'ar' ? 'end' : 'start'} 
              className={`min-w-[250px] ${theme === 'dark' ? 'bg-gray-950 border-gray-800' : 'bg-white border-gray-200'}`}
            >
              {aboutGroup.map(item => (
                <DropdownMenuItem key={item.path} asChild>
                  <Link
                    to={item.path}
                    className={`w-full px-3 py-2 ${theme === 'dark' ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-gray-900'}`}
                  >
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className={`flex items-center gap-2`}>
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className={`${theme === 'dark' ? 'hover:bg-gray-200 hover:text-gray-950' : 'hover:bg-blue-600 hover:text-gray-200'}`}>
                🌐 <span className="hidden sm:inline">{languages.find(l => l.code === language)?.label}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={language === 'ar' ? 'start' : 'end'} className={`${theme === 'dark' ? 'bg-gray-950 text-white border-gray-800' : 'bg-white text-gray-900 border-gray-200'}`}>
              {languages.map(lang => (
                <DropdownMenuItem key={lang.code} onClick={() => setLanguage(lang.code)} className={`${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                  {lang.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <ThemeToggle theme={theme} setTheme={setTheme} />

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="sm"
            className={`md:hidden ${theme === 'dark' ? 'hover:bg-gray-200 hover:text-gray-950' : 'hover:bg-gray-950 hover:text-gray-200'}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div style={language === 'ar' ? { fontFamily: 'Noto Kufi Arabic, sans-serif', fontSize:'2rem', direction: 'rtl' } : { fontFamily: 'Inter, sans-serif', direction:'ltr', fontSize:'2rem' }} className={`md:hidden border-t ${theme === 'dark' ? 'bg-gray-950 border-gray-800' : 'bg-stone-50 border-gray-200'}`}>
          <nav className="container mx-auto px-4 py-2">
            <div className="flex flex-col space-y-1">
              <Link
                style={language === 'ar' ? { fontFamily: 'Noto Kufi Arabic, sans-serif', fontSize:'1rem' } : { fontFamily: 'Inter, sans-serif', direction:'ltr', fontSize:'1rem' }}
                to="/"
                className={`text-center font-sans font-semibold px-3 py-2 rounded-md transition-colors ${theme === 'dark' ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-gray-950'}`}
                onClick={closeMobileMenu}
              >
                {t?.navbar?.home || "Home"}
              </Link>
              
              {[...servicesGroup, ...dataGroup, ...informationGroup, ...aboutGroup].map(item => (
                <Link
                  style={language === 'ar' ? { fontFamily: 'Noto Kufi Arabic, sans-serif', fontSize:'1rem' } : { fontFamily: 'Inter, sans-serif', direction:'ltr', fontSize:'1rem' }}
                  key={item.path}
                  to={item.path}
                  className={`text-center font-sans font-semibold px-3 py-2 rounded-md transition-colors ${theme === 'dark' ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-gray-950'}`}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar;