import { Search, Bell, Settings, Moon, Sun, User } from 'lucide-react';
import { useUIStore } from '../../store/useStore';

export const Header = () => {
  const isDarkMode = useUIStore((state) => state.isDarkMode);
  const toggleDarkMode = useUIStore((state) => state.toggleDarkMode);

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
      <div className="px-8 py-5 flex items-center justify-between">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome, User 👋</h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 rounded-full px-4 py-2.5 w-64">
            <Search size={18} className="text-slate-500" />
            <input
              type="text"
              placeholder="Search anything"
              className="bg-transparent ml-3 w-full outline-none text-slate-700 dark:text-slate-300 placeholder-slate-500 dark:placeholder-slate-400 text-sm"
            />
            <span className="ml-auto text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <kbd className="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded text-xs">⌘</kbd>
              <kbd className="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded text-xs">K</kbd>
            </span>
          </div>

          {/* Icons */}
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <Bell size={20} className="text-slate-600 dark:text-slate-400" />
          </button>

          <button
            onClick={toggleDarkMode}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            {isDarkMode ? (
              <Sun size={20} className="text-slate-600 dark:text-slate-400" />
            ) : (
              <Moon size={20} className="text-slate-600 dark:text-slate-400" />
            )}
          </button>

          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <Settings size={20} className="text-slate-600 dark:text-slate-400" />
          </button>

          {/* Profile Avatar */}
          <button className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold hover:shadow-lg transition-shadow">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};
