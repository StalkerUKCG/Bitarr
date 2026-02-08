
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Library as LibraryIcon, 
  Download, 
  Settings as SettingsIcon, 
  PlusCircle, 
  Search,
  Gamepad2,
  HardDrive
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import Library from './components/Library';
import Downloads from './components/Downloads';
import Settings from './components/Settings';
import AddGame from './components/AddGame';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'library' | 'downloads' | 'settings' | 'add'>('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'library', label: 'Library', icon: LibraryIcon },
    { id: 'downloads', label: 'Downloads', icon: Download },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Gamepad2 className="text-white" size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Bitarr</h1>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                activeTab === item.id 
                  ? 'bg-indigo-600/10 text-indigo-400 font-medium' 
                  : 'hover:bg-slate-800 text-slate-400'
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
          <div className="pt-4 mt-4 border-t border-slate-800">
            <button
              onClick={() => setActiveTab('add')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                activeTab === 'add' 
                  ? 'bg-emerald-600/10 text-emerald-400 font-medium' 
                  : 'hover:bg-slate-800 text-slate-400'
              }`}
            >
              <PlusCircle size={20} />
              Add New Game
            </button>
          </div>
        </nav>

        <div className="p-4 bg-slate-900/50 border-t border-slate-800">
          <div className="flex items-center gap-3 text-sm text-slate-400">
            <HardDrive size={16} />
            <div className="flex-1">
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-[65%]"></div>
              </div>
              <p className="mt-1 text-[10px] uppercase font-bold">Storage: 4.2TB / 6TB</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-16 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-4 bg-slate-900 rounded-lg px-3 py-1.5 w-96 border border-slate-800">
            <Search size={18} className="text-slate-500" />
            <input 
              type="text" 
              placeholder="Quick search library..." 
              className="bg-transparent border-none outline-none text-sm w-full"
            />
          </div>
          <div className="flex items-center gap-4">
             <span className="text-xs bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded border border-indigo-500/20">v1.2.4-stable</span>
             <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700"></div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'library' && <Library />}
          {activeTab === 'downloads' && <Downloads />}
          {activeTab === 'settings' && <Settings />}
          {activeTab === 'add' && <AddGame />}
        </div>
      </main>
    </div>
  );
};

export default App;
