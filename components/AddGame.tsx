import React, { useState } from 'react';
import { Search, Loader2, Plus, Download, FolderOpen, AlertTriangle } from 'lucide-react';
import { searchIGDB, matchLocalFiles } from '../services/igdbService';

const AddGame: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [importMode, setImportMode] = useState<'search' | 'import'>('search');
  const [localPath, setLocalPath] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsSearching(true);
    // In a real app, these would come from the Settings state
    const clientId = localStorage.getItem('bitarr_igdb_client_id') || '';
    const clientSecret = localStorage.getItem('bitarr_igdb_client_secret') || '';
    
    const games = await searchIGDB(query, clientId, clientSecret);
    setResults(games as any[]);
    setIsSearching(false);
  };

  const handleImport = async () => {
    setIsSearching(true);
    const mockFiles = ["Mario_Odyssey.nsp", "Zelda_BOTW_Update.v1.2.zip", "FFVII_Disc1.bin", "Tekken3.iso"];
    const parsed = await matchLocalFiles(mockFiles);
    setResults(parsed);
    setIsSearching(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col items-center text-center space-y-4">
        <h2 className="text-3xl font-bold">Add New Content</h2>
        <div className="flex bg-slate-900 rounded-xl p-1 border border-slate-800">
          <button 
            onClick={() => { setImportMode('search'); setResults([]); }}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${importMode === 'search' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Search IGDB
          </button>
          <button 
            onClick={() => { setImportMode('import'); setResults([]); }}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${importMode === 'import' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Import Local Files
          </button>
        </div>
      </div>

      {importMode === 'search' ? (
        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter game title (e.g. Halo Infinite)..." 
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 ring-indigo-500/50 text-lg shadow-2xl"
          />
          <button 
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium"
          >
            {isSearching ? <Loader2 className="animate-spin" size={18} /> : 'Search'}
          </button>
        </form>
      ) : (
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex gap-4">
             <div className="flex-1 relative">
                <FolderOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input 
                  type="text" 
                  value={localPath}
                  onChange={(e) => setLocalPath(e.target.value)}
                  placeholder="/mnt/games/import..." 
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 ring-indigo-500/50"
                />
             </div>
             <button 
               onClick={handleImport}
               className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-xl font-medium"
             >
               Scan Library
             </button>
          </div>
          <p className="text-xs text-slate-500 text-center">Scan folders to automatically map existing game files to metadata.</p>
        </div>
      )}

      {isSearching && results.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500 animate-pulse">
          <Loader2 className="animate-spin mb-4" size={48} />
          <p>Querying metadata providers...</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {importMode === 'search' ? (
            results.map((game: any) => (
              <div key={game.igdbId} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex gap-6 hover:border-slate-700 transition-all shadow-lg overflow-hidden group">
                <img src={game.coverUrl} className="w-32 h-44 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform" alt="" />
                <div className="flex-1 py-2">
                   <div className="flex justify-between items-start">
                     <h3 className="text-xl font-bold line-clamp-1">{game.title}</h3>
                     <span className="text-[10px] font-mono bg-slate-800 text-slate-400 px-2 py-1 rounded">IGDB</span>
                   </div>
                   <p className="text-sm text-indigo-400 font-medium mb-2">{game.platform} • {game.releaseYear}</p>
                   <p className="text-xs text-slate-400 line-clamp-3 mb-4">{game.description}</p>
                   <div className="flex gap-2">
                     <button className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2">
                        <Plus size={18} /> Add to Library
                     </button>
                     <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2">
                        <Download size={18} /> Add & Search
                     </button>
                   </div>
                </div>
              </div>
            ))
          ) : (
            results.map((match: any, idx: number) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-indigo-400">
                     <FolderOpen size={24} />
                   </div>
                   <div>
                     <p className="text-xs text-slate-500 font-mono">{match.originalName}</p>
                     <div className="flex items-center gap-2">
                        <p className="font-bold text-lg text-emerald-400">{match.identifiedTitle}</p>
                        <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded uppercase font-bold text-slate-500">MATCH</span>
                     </div>
                   </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="p-2 bg-emerald-600/10 text-emerald-400 rounded-lg hover:bg-emerald-600/20 transition-colors">
                     <Plus size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
      
      {!isSearching && results.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-slate-600">
           <AlertTriangle size={48} className="mb-4 opacity-20" />
           <p className="text-lg">No results to display</p>
           <p className="text-sm">Start by typing a game name or scanning a folder</p>
        </div>
      )}
    </div>
  );
};

export default AddGame;