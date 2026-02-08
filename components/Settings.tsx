import React, { useState } from 'react';
import { 
  Server, 
  MapPin, 
  Shield, 
  Database, 
  Download, 
  Save, 
  Plus, 
  Trash2, 
  CheckCircle2,
  HardDrive,
  Settings as SettingsIcon,
  Globe
} from 'lucide-react';
import { Platform } from '../types';

const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'general' | 'paths' | 'indexers' | 'clients' | 'metadata'>('paths');

  return (
    <div className="max-w-4xl mx-auto flex gap-8 h-full">
      <aside className="w-48 space-y-1">
        <SettingsNavItem 
          active={activeSection === 'general'} 
          onClick={() => setActiveSection('general')}
          icon={<Server size={18} />} 
          label="General" 
        />
        <SettingsNavItem 
          active={activeSection === 'paths'} 
          onClick={() => setActiveSection('paths')}
          icon={<MapPin size={18} />} 
          label="Paths" 
        />
        <SettingsNavItem 
          active={activeSection === 'metadata'} 
          onClick={() => setActiveSection('metadata')}
          icon={<Globe size={18} />} 
          label="Metadata" 
        />
        <SettingsNavItem 
          active={activeSection === 'indexers'} 
          onClick={() => setActiveSection('indexers')}
          icon={<Database size={18} />} 
          label="Indexers" 
        />
        <SettingsNavItem 
          active={activeSection === 'clients'} 
          onClick={() => setActiveSection('clients')}
          icon={<Download size={18} />} 
          label="Downloaders" 
        />
      </aside>

      <div className="flex-1 space-y-8 animate-in slide-in-from-right-4 duration-500">
        {activeSection === 'paths' && <PathSettings />}
        {activeSection === 'indexers' && <IndexerSettings />}
        {activeSection === 'clients' && <ClientSettings />}
        {activeSection === 'general' && <GeneralSettings />}
        {activeSection === 'metadata' && <MetadataSettings />}
      </div>
    </div>
  );
};

const SettingsNavItem: React.FC<{ active: boolean, onClick: () => void, icon: React.ReactNode, label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
      active ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
    }`}
  >
    {icon}
    {label}
  </button>
);

const MetadataSettings: React.FC = () => (
  <div className="space-y-6">
    <div>
      <h3 className="text-xl font-bold mb-1">Metadata Providers</h3>
      <p className="text-sm text-slate-500">Configure how Bitarr fetches game information and covers.</p>
    </div>
    
    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl space-y-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-indigo-600/20 rounded-xl flex items-center justify-center">
          <Globe className="text-indigo-400" size={24} />
        </div>
        <div>
          <h4 className="font-bold">IGDB (Twitch API)</h4>
          <p className="text-xs text-slate-500">Primary source for game data, ratings, and artwork.</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-400 uppercase">Twitch Client ID</label>
          <input 
            type="password" 
            placeholder="Enter Client ID"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm font-mono outline-none focus:ring-1 ring-indigo-500"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-400 uppercase">Twitch Client Secret</label>
          <input 
            type="password" 
            placeholder="Enter Client Secret"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm font-mono outline-none focus:ring-1 ring-indigo-500"
          />
        </div>
      </div>
    </div>

    <div className="flex justify-end">
      <button className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
         <Save size={18} /> Save Config
      </button>
    </div>
  </div>
);

const PathSettings: React.FC = () => (
  <div className="space-y-6">
    <div>
      <h3 className="text-xl font-bold mb-1">Path Mapping</h3>
      <p className="text-sm text-slate-500">Configure where your games are stored per console platform.</p>
    </div>
    
    <div className="space-y-3">
      {Object.values(Platform).map((p) => (
        <div key={p} className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl space-y-3">
           <div className="flex items-center justify-between">
              <div className="font-bold text-sm text-indigo-400">{p} Base Path</div>
              <span className="text-[10px] text-slate-600 font-mono italic">Applies to all games in this category</span>
           </div>
           <div className="flex gap-2">
             <input 
               type="text" 
               placeholder={`/mnt/games/${p.toLowerCase().replace(' ', '')}`}
               className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-sm font-mono outline-none focus:ring-1 ring-indigo-500"
             />
           </div>
           <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-800/50">
             <input type="checkbox" className="rounded bg-slate-950 border-slate-800" />
             <label className="text-xs text-slate-500 font-medium uppercase tracking-wider">Allow per-game override path</label>
           </div>
        </div>
      ))}
    </div>

    <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
       <button className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
         <Save size={18} /> Save Mappings
       </button>
    </div>
  </div>
);

const IndexerSettings: React.FC = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-xl font-bold mb-1">Indexers</h3>
        <p className="text-sm text-slate-500">Add trackers, usenet indexers, and ROM sources.</p>
      </div>
      <button className="flex items-center gap-2 bg-indigo-600/10 text-indigo-400 border border-indigo-600/20 px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-indigo-600/20">
         <Plus size={18} /> Add New
      </button>
    </div>

    <div className="grid grid-cols-1 gap-4">
      <IndexerCard name="Myrient" type="Direct Download (ROMs)" url="https://myrient.erista.me" enabled />
      <IndexerCard name="Prowlarr (Torznab)" type="Aggregator" url="http://prowlarr:9696" enabled />
      <IndexerCard name="NZBGeek (Newznab)" type="Usenet" url="https://api.nzbgeek.info" enabled />
    </div>
  </div>
);

const IndexerCard: React.FC<{ name: string, type: string, url: string, enabled: boolean }> = ({ name, type, url, enabled }) => (
  <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-xl">
    <div className="flex items-center gap-4">
       <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${enabled ? 'bg-indigo-600/20 text-indigo-400' : 'bg-slate-800 text-slate-600'}`}>
          <Database size={24} />
       </div>
       <div>
         <h4 className="font-bold">{name}</h4>
         <p className="text-xs text-slate-500">{type}</p>
         <p className="text-[10px] text-slate-600 font-mono mt-1">{url}</p>
       </div>
    </div>
    <div className="flex items-center gap-3">
       <button className="p-2 text-slate-500 hover:text-slate-300">
         <SettingsIcon size={18} />
       </button>
    </div>
  </div>
);

const ClientSettings: React.FC = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-xl font-bold mb-1">Download Clients</h3>
        <p className="text-sm text-slate-500">Connect to your torrent and usenet clients.</p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
       <ClientCard name="qBittorrent" type="Torrent" host="192.168.1.50" port={8080} active />
       <ClientCard name="SABnzbd" type="Usenet" host="192.168.1.50" port={8081} active={false} />
    </div>
  </div>
);

const ClientCard: React.FC<{ name: string, type: string, host: string, port: number, active: boolean }> = ({ name, type, host, port, active }) => (
  <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-600'}`}>
          <Download size={20} />
        </div>
        <div>
          <h4 className="font-bold">{name}</h4>
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">{type}</span>
        </div>
      </div>
      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${active ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-800 text-slate-500 border-slate-700'}`}>
        {active ? 'ONLINE' : 'OFFLINE'}
      </span>
    </div>
    <div className="space-y-2 text-sm">
      <div className="flex justify-between text-slate-500">Host: <span className="font-mono text-slate-300">{host}</span></div>
      <div className="flex justify-between text-slate-500">Port: <span className="font-mono text-slate-300">{port}</span></div>
    </div>
    <div className="pt-2 flex gap-2">
       <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-lg text-xs font-bold">Test Connection</button>
    </div>
  </div>
);

const GeneralSettings: React.FC = () => (
  <div className="space-y-6">
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
       <h3 className="font-bold text-lg">System Health</h3>
       <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
             <div className="flex items-center gap-2 text-emerald-400 mb-2">
                <CheckCircle2 size={18} />
                <span className="text-sm font-bold">Metadata Sync</span>
             </div>
             <p className="text-xs text-slate-500">IGDB API status is active and healthy.</p>
          </div>
          <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
             <div className="flex items-center gap-2 text-emerald-400 mb-2">
                <CheckCircle2 size={18} />
                <span className="text-sm font-bold">Filesystem</span>
             </div>
             <p className="text-xs text-slate-500">Path mappings are valid and writable.</p>
          </div>
       </div>
    </div>
  </div>
);

export default Settings;