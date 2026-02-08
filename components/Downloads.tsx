
import React from 'react';
import { Play, Pause, X, ArrowDown, Database, Cpu } from 'lucide-react';

const Downloads: React.FC = () => {
  const activeDownloads = [
    { id: 1, title: "Elden Ring", progress: 68.4, speed: "24.2 MB/s", size: "48.2 GB", client: "qBittorrent", eta: "14m" },
    { id: 2, title: "Bloodborne", progress: 12.1, speed: "12.8 MB/s", size: "36.5 GB", client: "SABnzbd", eta: "42m" },
    { id: 3, title: "Mario Kart 8 Deluxe", progress: 98.2, speed: "4.1 MB/s", size: "7.2 GB", client: "qBittorrent", eta: "1m" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Download Queue</h2>
        <div className="flex gap-4">
           <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
              <ArrowDown size={18} className="text-indigo-400" />
              <span className="text-lg font-bold">41.1 MB/s</span>
           </div>
           <div className="flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest px-4 py-2 border border-slate-800 rounded-xl">
             <div className="flex items-center gap-1.5"><Cpu size={14} /> 12% CPU</div>
             <div className="flex items-center gap-1.5"><Database size={14} /> 2.4GB RAM</div>
           </div>
        </div>
      </div>

      <div className="space-y-4">
        {activeDownloads.map(dl => (
          <div key={dl.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative overflow-hidden group">
            {/* Background Progress */}
            <div 
              className="absolute left-0 bottom-0 top-0 bg-indigo-600/5 transition-all duration-1000" 
              style={{ width: `${dl.progress}%` }}
            ></div>
            
            <div className="relative flex items-center justify-between">
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between pr-8">
                  <h3 className="text-lg font-bold">{dl.title}</h3>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-right">
                      <p className="text-[10px] text-slate-500 uppercase font-bold">Speed</p>
                      <p className="font-mono text-indigo-400">{dl.speed}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-500 uppercase font-bold">ETA</p>
                      <p className="font-mono">{dl.eta}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-500 uppercase font-bold">Progress</p>
                      <p className="font-bold">{dl.progress}%</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500 rounded-full transition-all duration-1000" 
                      style={{ width: `${dl.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-slate-500 whitespace-nowrap">{dl.size}</span>
                </div>

                <div className="flex items-center gap-4">
                   <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400 font-bold uppercase">{dl.client}</span>
                   <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
                   <span className="text-[10px] text-slate-500">Source: Torznab/Prowlarr</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-400 transition-all hover:scale-110">
                  <Pause size={18} />
                </button>
                <button className="p-3 bg-slate-800 hover:bg-rose-600/20 text-slate-400 hover:text-rose-400 rounded-xl transition-all hover:scale-110">
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Downloads;
