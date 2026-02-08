
import React, { useState } from 'react';
// Added AlertCircle and Clock to the imports from lucide-react
import { Filter, Grid, List as ListIcon, MoreVertical, Download, ExternalLink, AlertCircle, Clock } from 'lucide-react';
import { Game, Platform, DownloadStatus } from '../types';

const MOCK_GAMES: Game[] = [
  {
    id: '1',
    igdbId: '1022',
    title: 'Final Fantasy VII',
    platform: Platform.PS1,
    releaseYear: 1997,
    description: 'A masterpiece of RPG storytelling.',
    coverUrl: 'https://picsum.photos/seed/ff7/300/400',
    status: DownloadStatus.DOWNLOADED,
    path: '/games/ps1/Final Fantasy VII',
    // Added required addedDate property
    addedDate: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    igdbId: '1025',
    title: 'The Legend of Zelda: Breath of the Wild',
    platform: Platform.SWITCH,
    releaseYear: 2017,
    description: 'A landmark open-world adventure.',
    coverUrl: 'https://picsum.photos/seed/botw/300/400',
    status: DownloadStatus.DOWNLOADED,
    path: '/games/switch/Zelda BOTW',
    // Added required addedDate property
    addedDate: '2024-02-20T14:45:00Z'
  },
  {
    id: '3',
    igdbId: '1028',
    title: 'Metroid Prime',
    platform: Platform.GC,
    releaseYear: 2002,
    description: 'First person adventure on Tallon IV.',
    coverUrl: 'https://picsum.photos/seed/metroid/300/400',
    status: DownloadStatus.MISSING,
    // Added required addedDate property
    addedDate: '2024-03-05T09:15:00Z'
  },
  {
    id: '4',
    igdbId: '1030',
    title: 'Shadow of the Colossus',
    platform: Platform.PS2,
    releaseYear: 2005,
    description: 'Journey to the forbidden land.',
    coverUrl: 'https://picsum.photos/seed/shadow/300/400',
    status: DownloadStatus.DOWNLOADING,
    // Added required addedDate property
    addedDate: '2024-03-10T11:00:00Z'
  }
];

const Library: React.FC = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<Platform | 'all'>('all');

  const filteredGames = filter === 'all' 
    ? MOCK_GAMES 
    : MOCK_GAMES.filter(g => g.platform === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Library</h2>
        <div className="flex items-center gap-4">
          <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800">
            <button 
              onClick={() => setView('grid')}
              className={`p-1.5 rounded ${view === 'grid' ? 'bg-slate-800 text-indigo-400' : 'text-slate-500'}`}
            >
              <Grid size={18} />
            </button>
            <button 
              onClick={() => setView('list')}
              className={`p-1.5 rounded ${view === 'list' ? 'bg-slate-800 text-indigo-400' : 'text-slate-500'}`}
            >
              <ListIcon size={18} />
            </button>
          </div>
          <select 
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 ring-indigo-500/20"
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
          >
            <option value="all">All Platforms</option>
            {Object.values(Platform).map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {filteredGames.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-900 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Title</th>
                <th className="px-6 py-4 font-semibold">Platform</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Path</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredGames.map(game => (
                <tr key={game.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={game.coverUrl} className="w-8 h-10 object-cover rounded" alt="" />
                      <div>
                        <p className="font-medium text-sm">{game.title}</p>
                        <p className="text-xs text-slate-500">{game.releaseYear}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{game.platform}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={game.status} />
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-500">
                    {game.path || '—'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-slate-700 rounded-full text-slate-400">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const GameCard: React.FC<{ game: Game }> = ({ game }) => (
  <div className="group relative flex flex-col bg-slate-900 rounded-xl border border-slate-800 overflow-hidden hover:border-indigo-500/50 transition-all hover:-translate-y-1">
    <div className="aspect-[3/4] overflow-hidden relative">
      <img src={game.coverUrl} alt={game.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute top-2 right-2">
        <StatusBadge status={game.status} compact />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
      <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
        <span className="text-[10px] font-bold uppercase bg-indigo-600/90 text-white px-2 py-0.5 rounded backdrop-blur-sm">
          {game.platform}
        </span>
      </div>
    </div>
    <div className="p-3">
      <h4 className="font-semibold text-sm line-clamp-1">{game.title}</h4>
      <p className="text-xs text-slate-500">{game.releaseYear}</p>
    </div>
    <div className="absolute inset-0 bg-slate-950/80 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
       <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
         <ExternalLink size={16} /> Details
       </button>
       {game.status === DownloadStatus.MISSING && (
         <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium border border-slate-700">
           <Download size={16} /> Manual Search
         </button>
       )}
    </div>
  </div>
);

const StatusBadge: React.FC<{ status: DownloadStatus, compact?: boolean }> = ({ status, compact }) => {
  const config = {
    [DownloadStatus.DOWNLOADED]: { color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', icon: CheckCircle2 },
    [DownloadStatus.DOWNLOADING]: { color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20', icon: Download },
    [DownloadStatus.MISSING]: { color: 'bg-rose-500/10 text-rose-400 border-rose-500/20', icon: AlertCircle },
    [DownloadStatus.WANTED]: { color: 'bg-amber-500/10 text-amber-400 border-amber-500/20', icon: Clock },
  };

  const { color } = config[status];

  if (compact) {
    return <div className={`w-3 h-3 rounded-full border-2 border-slate-900 ${status === DownloadStatus.DOWNLOADED ? 'bg-emerald-500' : status === DownloadStatus.MISSING ? 'bg-rose-500' : 'bg-indigo-500'}`}></div>;
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${color}`}>
      {status}
    </span>
  );
};

const CheckCircle2 = ({ size = 16, className = "" }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>;

export default Library;
