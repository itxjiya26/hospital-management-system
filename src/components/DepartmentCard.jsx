import React from 'react';

export default function DepartmentCard({ department, onDelete, onManage }) {
  const capacityPercent = Math.round(((department.availableBeds || 0) / (department.totalBeds || 1)) * 100);
  
  const getBadgeStyle = () => {
    if (capacityPercent > 30) return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (capacityPercent > 10) return "bg-amber-50 text-amber-700 border-amber-200";
    return "bg-rose-50 text-rose-700 border-rose-200";
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between min-h-[280px]">
      <div>
        {/* Top Info */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <span className="text-xs font-bold tracking-wider text-sky-600 uppercase">
              {department.code}
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-0.5">{department.name}</h3>
          </div>
          <span className={`px-3 py-1 text-xs font-semibold rounded-full border whitespace-nowrap ${getBadgeStyle()}`}>
            {department.availableBeds ?? 0} Beds Left
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 mb-4 line-clamp-2">
          {department.description || "Comprehensive clinical unit equipped for specialized patient care."}
        </p>
      </div>

      <div>
        {/* Lead Physician Box */}
        <div className="text-xs font-medium text-slate-700 mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center justify-between">
          <span className="text-slate-400">Lead Physician:</span>
          <span className="font-semibold text-slate-800">{department.leadDoctor || "Unassigned"}</span>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
          <button 
            onClick={() => onManage(department)}
            className="flex-1 text-xs font-semibold py-2.5 px-4 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition shadow-sm cursor-pointer"
          >
            Manage Unit
          </button>
          <button 
            onClick={() => onDelete(department._id)}
            className="text-xs font-semibold py-2.5 px-3 text-rose-500 hover:bg-rose-50 rounded-xl transition cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}