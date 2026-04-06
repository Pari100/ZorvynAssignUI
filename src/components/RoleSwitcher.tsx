import { useUIStore } from '../store/useStore';
import { Button } from './common/Button';
import { Moon, Sun } from 'lucide-react';

export const RoleSwitcher = () => {
  const role = useUIStore((state) => state.role);
  const setRole = useUIStore((state) => state.setRole);
  const isDarkMode = useUIStore((state) => state.isDarkMode);
  const setDarkMode = useUIStore((state) => state.setDarkMode);

  return (
    <div className="flex items-center gap-3">
      <div className="inline-flex bg-gray-200 dark:bg-slate-600 rounded-lg p-1 border border-gray-300 dark:border-slate-500 shadow-sm">
        <button
          onClick={() => setRole('viewer')}
          className={`px-4 py-1.5 rounded transition-all font-semibold text-sm ${
            role === 'viewer' 
              ? 'bg-white dark:bg-slate-500 text-primary-600 dark:text-primary-400 shadow-md' 
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
          }`}
        >
          Viewer
        </button>
        <button
          onClick={() => setRole('admin')}
          className={`px-4 py-1.5 rounded transition-all font-semibold text-sm ${
            role === 'admin' 
              ? 'bg-white dark:bg-slate-500 text-primary-600 dark:text-primary-400 shadow-md' 
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
          }`}
        >
          Admin
        </button>
      </div>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setDarkMode(!isDarkMode)}
        className="p-2 rounded-lg"
        title={isDarkMode ? 'Light mode' : 'Dark mode'}
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </Button>
    </div>
  );
};
