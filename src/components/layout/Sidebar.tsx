import { BarChart3, CreditCard, TrendingUp, Clock, Settings, HelpCircle, LogOut } from 'lucide-react';
import { useUIStore } from '../../store/useStore';

export const Sidebar = () => {
  const currentPage = useUIStore((state) => state.currentPage);
  const setCurrentPage = useUIStore((state) => state.setCurrentPage);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'transactions', label: 'Transactions', icon: CreditCard },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'history', label: 'History', icon: Clock },
  ];

  const generalItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help Center', icon: HelpCircle },
  ];

  return (
    <div className="w-72 bg-slate-950 text-white h-full flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-linear-to-br from-blue-600 to-indigo-600 rounded-lg">
            <BarChart3 size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Finova</h2>
            <p className="text-xs text-slate-400">Finance</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto py-8">
        <div className="px-4 mb-8">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Menu</p>
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* General Section */}
        <div className="px-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">General</p>
          <nav className="space-y-2">
            {generalItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer / Pro Upgrade */}
      <div className="p-4 border-t border-slate-800">
        <div className="bg-linear-to-br from-blue-600 to-purple-600 rounded-xl p-4 mb-4">
          <h3 className="font-bold text-sm mb-2">Switch to Pro</h3>
          <p className="text-xs text-slate-200 mb-4">Unlock advanced analytics and more features</p>
          <button className="w-full bg-white text-blue-600 font-semibold py-2 rounded-lg hover:bg-slate-100 transition-colors text-sm">
            Upgrade
          </button>
        </div>
        <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white transition-colors">
          <LogOut size={20} />
          <span className="font-medium">Log out</span>
        </button>
      </div>
    </div>
  );
};
