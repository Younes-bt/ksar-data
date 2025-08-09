import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger, NavigationMenuContent, navigationMenuTriggerStyle, } from "@/components/ui/navigation-menu"
import { Link } from "react-router-dom"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import ThemeToggle from "./ThemeToggle"

function Navbar({ language, setLanguage, theme, setTheme, t }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { path: "/", label: t?.navbar?.home || "Home" },
    { path: "/rgph", label: t?.navbar?.RGPH || "RGPH" },
    { path: "/insights", label: t?.navbar?.insights || "Insights" },
    { path: "/medicines", label: t?.navbar?.medicine || "Medicine Prices" },
    { path: "/download", label: t?.navbar?.download || "download" },
    { path: "/about", label: t?.navbar?.about || "About" },
    { path: "/contactUs", label: t?.navbar?.contact || "Contact" },
  ]

  const groupedItems = [
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
    <header style={language === 'ar' ? { fontFamily: 'Noto Kufi Arabic, sans-serif', fontSize:'2rem' } : { fontFamily: 'Inter, sans-serif', direction:'ltr', fontSize:'2rem' }} className={`sticky top-0 z-50 w-full border-b ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-stone-50 text-gray-950'}`}>
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <Link to="/" className="flex items-center text-xl font-bold">
          <img 
            src={`${theme === 'dark' ? '/logo_on_dark.png' : '/Logo_on_white.png'}`} 
            alt="Ksar El Kebir Gate"
            className="w-10 mr-4 max-w-2xl h-auto object-contain drop-shadow-2xl"
          />
          KSAR-DATA
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu>
          <NavigationMenuList className="hidden md:flex gap-4">
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link to="/" className={`px-3 py-2 rounded-md transition-colors ${theme === 'dark' ? 'hover:bg-gray-200 hover:text-gray-950' : 'hover:bg-blue-600 hover:text-gray-200'}`}>
                  {t?.navbar?.home || "Home"}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className={`rounded-md transition-colors ${theme === 'dark' ? 'hover:bg-gray-200 hover:text-gray-950' : 'hover:bg-blue-600 hover:text-gray-200'}`}>
                {t?.navbar?.services || "Services"}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className={`grid gap-3 p-4 md:w-[400px] ${theme === 'dark' ? 'bg-gray-950 ' : 'bg-gray-50 '}`}>
                  {groupedItems.map(item => (
                    <li key={item.path}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={item.path}
                          className={`block rounded-md leading-none no-underline outline-none transition-colors  ${theme === 'dark' ? 'hover:bg-gray-200 hover:text-gray-950' : 'hover:bg-blue-600 hover:text-gray-200'}`}
                        >
                          {item.label}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {navItems.slice(1).map(item => (
              <NavigationMenuItem key={item.path}>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link to={item.path} className={`px-3 py-2 rounded-md transition-colors ${theme === 'dark' ? 'hover:bg-gray-200 hover:text-gray-950' : 'hover:bg-blue-600 hover:text-gray-200'}`}>
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className={`${theme === 'dark' ? 'hover:bg-gray-200 hover:text-gray-950' : 'hover:bg-blue-600 hover:text-gray-200'}`}>
                🌐 <span className="hidden sm:inline">{languages.find(l => l.code === language)?.label}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className={`${theme === 'dark' ? 'bg-gray-200 text-gray-950' : 'bg-gray-950 text-gray-200'}`}>
              {languages.map(lang => (
                <DropdownMenuItem key={lang.code} onClick={() => setLanguage(lang.code)} className={` ${theme === 'dark' ? 'hover:bg-gray-950 hover:text-gray-200' : 'hover:bg-gray-200 hover:text-gray-950'}`}>
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
        <div style={language === 'ar' ? { fontFamily: 'Noto Kufi Arabic, sans-serif', fontSize:'2rem' } : { fontFamily: 'Inter, sans-serif', direction:'ltr', fontSize:'2rem' }} className={`md:hidden border-t ${theme === 'dark' ? 'bg-gray-950 border-gray-800' : 'bg-stone-50 border-gray-200'}`}>
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
              
              {groupedItems.map(item => (
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
              {navItems.slice(1).map(item => (
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

export default Navbar