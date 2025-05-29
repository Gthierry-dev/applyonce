import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { FaBell } from 'react-icons/fa';
import { BiMessageDetail } from 'react-icons/bi';
import ContactSearch from './search';

interface DashboardHeaderProps {
  title?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title = 'Dashboard' }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Ctrl+K or Cmd+K (Mac)
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault(); // Prevent default browser behavior
        setIsSearchOpen(true);
      }
      
      // Close search on Escape key
      if (event.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSearchOpen]);

  // Handle click on search input
  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  // Handle close search
  const handleCloseSearch = () => {
    setIsSearchOpen(false);
  };

  return (
    <>
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={handleCloseSearch}>
          <div onClick={(e) => e.stopPropagation()}>
            <ContactSearch   onClose={handleCloseSearch} />
          </div>
        </div>
      )}
      
      <header className="flex items-center justify-between py-[17px] mb-6 border-b-[2px] border-stone-200/60">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search" 
              className="pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-xl w-64 focus:outline-none focus:ring-2 focus:ring-main_color focus:border-transparent cursor-pointer"
              onClick={handleSearchClick}
              readOnly
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <div className="flex items-center justify-center h-5 w-8 text-xs text-gray-400 bg-gray-100 rounded">
                ⌘ K
              </div>
            </div>
          </div>
          <button className="relative p-2 border rounded-lg text-gray-400 hover:text-gray-500">
            <span className="sr-only">Notifications</span>
            <FaBell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          <button className="relative p-2 border rounded-lg text-gray-400 hover:text-gray-500">
            <span className="sr-only">Messages</span>
            <BiMessageDetail className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
            <img 
              src="https://ui-avatars.com/api/?name=User&background=random" 
              alt="User avatar" 
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default DashboardHeader;