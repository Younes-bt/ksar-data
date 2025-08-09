import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

function ThemeToggle({ theme, setTheme }) {
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      title="Toggle Theme"
      className={`${theme === 'dark' ? 'hover:bg-gray-200 hover:text-gray-950' : 'hover:bg-blue-600 hover:text-gray-200'}`}
    >
      {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export default ThemeToggle
