export const TargetCard = () => {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900">Target</h3>
      <p className="text-xs text-slate-400 font-medium mb-6">Income target progress</p>
      
      <div className="flex flex-col items-center">
        <div className="relative w-36 h-36 flex items-center justify-center">
          {/* Circular Progress Bar */}
          <svg className="w-full h-full -rotate-90">
            <circle cx="72" cy="72" r="60" fill="none" stroke="#F1F5F9" strokeWidth="12" />
            <circle cx="72" cy="72" r="60" fill="none" stroke="#4F46E5" strokeWidth="12" 
              strokeDasharray="377" strokeDashoffset="125" strokeLinecap="round" />
          </svg>
          <div className="absolute text-center">
            <span className="text-2xl font-black italic text-slate-900">66.6%</span>
            <p className="text-[10px] text-emerald-500 font-bold">▲ 7.5%</p>
          </div>
        </div>
        <p className="text-[11px] text-slate-400 mt-6 text-center px-4">
          Hooray! You earned $150 today. Keep it up!
        </p>
      </div>
    </div>
  );
};