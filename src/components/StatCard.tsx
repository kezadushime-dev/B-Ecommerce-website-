import { DollarSign, ArrowUpRight } from 'lucide-react';

export const StatCard = ({ title, value, trend, isIndigo = true }: any) => {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex-1">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-slate-500 text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-black text-slate-900 mt-1">{value}</h3>
        </div>
        <div className={`p-3 rounded-2xl ${isIndigo ? 'bg-indigo-600 text-white' : 'bg-emerald-500 text-white'}`}>
          <DollarSign size={20} />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg flex items-center">
          <ArrowUpRight size={12} className="mr-1" /> {trend}
        </span>
        <span className="text-slate-400 text-[10px] font-medium">+150 today</span>
      </div>
    </div>
  );
};