import React from 'react';
import { Search } from 'lucide-react';
import { FaBell } from 'react-icons/fa';
import { BiMessageDetail } from 'react-icons/bi';

interface DashboardHeaderProps {
  title?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title = 'Dashboard' }) => {
  return (
    <header className="flex items-center justify-between pb-2 mb-6 border-b border-gray-200">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search" 
            className="pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-main_color focus:border-transparent"
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
  );
};

export default DashboardHeader;