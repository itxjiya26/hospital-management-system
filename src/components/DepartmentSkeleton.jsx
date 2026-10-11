import React from 'react';

export default function DepartmentSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm animate-pulse space-y-4">
      <div className="flex items-center justify-between">
        <div className="h-6 bg-slate-200 rounded-md w-1/3"></div>
        <div className="h-5 bg-sky-100 rounded-full w-16"></div>
      </div>
      <div className="h-4 bg-slate-100 rounded-md w-3/4"></div>
      <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
        <div className="h-10 bg-slate-100 rounded-lg"></div>
        <div className="h-10 bg-slate-100 rounded-lg"></div>
      </div>
    </div>
  );
}