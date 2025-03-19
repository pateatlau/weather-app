import { Link } from 'react-router-dom';
import { CitySearch } from './city-search';
import { ThemeToggle } from './theme-toggle';
import { useTheme } from '@/context/theme-provider';

export function Header() {
  const { theme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to={'https://lalding.in/'}>
          <img
            src={theme === 'dark' ? '/lalding.jpg' : '/lalding.jpg'}
            alt="Lalding's logo"
            className="h-14 w-14 rounded-full"
          />
        </Link>

        <div className="flex gap-4">
          <CitySearch />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
