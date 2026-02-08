
import React from 'react';
import { Download, CheckCircle2, AlertCircle, Clock, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', downloads: 12 },
  { name: 'Tue', downloads: 19 },
  { name: 'Wed', downloads: 8 },
  { name: 'Thu', downloads: 15 },
  { name: 'Fri', downloads: 22 },
  { name: 'Sat', downloads: 30 },
  { name: 'Sun', downloads: 25 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Games in Library" value="482" icon={<CheckCircle2 className="text-emerald-500" />} trend="+4 this week" />
        <StatCard title="Active Downloads" value="12" icon={<Download className="text-indigo-500" />} trend="284 GB total" />
        <StatCard title="Missing Content" value="24" icon={<AlertCircle className="text-amber-500" />} trend="Wants: PS2, Switch" />
        <StatCard title="System Uptime" value="14d 6h" icon={<Clock className="text-slate-500" />} trend="Last scan: 2m ago" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp size={20} className="text-indigo-400" />
              Download History
            </h3>
            <select className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#818cf8' }}
                />
                <Bar dataKey="downloads" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <ActivityItem 
              title="Super Mario Odyssey" 
              desc="Imported successfully" 
              time="10m ago" 
              type="success"
            />
            <ActivityItem 
              title="Elden Ring" 
              desc="Downloading (42%)" 
              time="25m ago" 
              type="info"
            />
            <ActivityItem 
              title="God of War II" 
              desc="Missing files detected" 
              time="1h ago" 
              type="warning"
            />
            <ActivityItem 
              title="System Scan" 
              desc="Completed on /mnt/games" 
              time="3h ago" 
              type="success"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string, value: string, icon: React.ReactNode, trend: string }> = ({ title, value, icon, trend }) => (
  <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl hover:bg-slate-900 transition-colors">
    <div className="flex items-center justify-between mb-2">
      <span className="text-slate-400 text-sm font-medium">{title}</span>
      {icon}
    </div>
    <div className="text-2xl font-bold">{value}</div>
    <div className="text-xs text-slate-500 mt-1">{trend}</div>
  </div>
);

const ActivityItem: React.FC<{ title: string, desc: string, time: string, type: 'success' | 'warning' | 'info' }> = ({ title, desc, time, type }) => {
  const colors = {
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    info: 'bg-indigo-500'
  };
  return (
    <div className="flex gap-3">
      <div className={`w-1 self-stretch rounded-full ${colors[type]}`}></div>
      <div className="flex-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-slate-500">{desc}</p>
      </div>
      <span className="text-[10px] text-slate-600 uppercase font-bold">{time}</span>
    </div>
  );
};

export default Dashboard;
