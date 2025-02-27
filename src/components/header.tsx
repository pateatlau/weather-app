import React from 'react';
import { Link } from 'react-router-dom';
import CitySearch from '@/components/city-search';
import ThemeToggle from '@/components/theme-toggle';
import { useTheme } from '@/context/theme-provider';

const Header: React.FC = () => {
  const { theme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to={'/'}>
          <img
            src={theme === 'dark' ? '/logo.png' : '/logo2.png'}
            alt="logo"
            className="h-14"
          />
        </Link>

        <div className="flex gap-4">
          <CitySearch />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;

// import React from 'react';
// import { Link } from 'react-router-dom';

// import ModeToggle from '@/components/mode-toggle';
// import { useTheme } from '@/context/theme-provider';

// const Header: React.FC = () => {
//   const { theme } = useTheme();
//   return (
//     <header className="sticky top-0 z-50 w-full border-b backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">
//       <div className="flex container mx-auto px-4 items-center justify-between text-center text-gray-400">
//         <div>
//           <Link to={'/'}>
//             <img src={theme === 'dark' ? './logo.png' : 'logo2.png'} alt="logo" className="h-14 w-auto" />
//           </Link>
//         </div>
//         <div>
//           {/* Search */}
//           <ModeToggle />
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
