export const RevenueCard = () => {
  const data = [40, 70, 45, 90, 65, 80, 50];

  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900">Revenue Flow</h3>
      <p className="text-sm text-slate-400 mb-8">Based on sources</p>

      <div className="h-48 flex items-end justify-between gap-4">
        {data.map((val, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
            <div 
              style={{ height: `${val}%` }} 
              className={`w-full max-w-[40px] rounded-t-xl transition-all duration-300 
                ${i === 3 ? 'bg-indigo-600 shadow-lg shadow-indigo-100' : 'bg-slate-100 group-hover:bg-indigo-200'}`} 
            />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Label</span>
          </div>
        ))}
      </div>
    </div>
  );
};