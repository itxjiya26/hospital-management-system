import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DepartmentCard from '../components/DepartmentCard';
import DepartmentSkeleton from '../components/DepartmentSkeleton';

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  // Modal State
  const [selectedDept, setSelectedDept] = useState(null);
  const [formData, setFormData] = useState({ availableBeds: 0, leadDoctor: "", description: "" });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/departments");
      setDepartments(res.data);
    } catch (err) {
      console.error("Failed to load departments:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this department?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/departments/${id}`);
      setDepartments(prev => prev.filter(d => d._id !== id));
    } catch (err) {
      alert("Failed to delete department");
    }
  };

  const handleOpenManageModal = (dept) => {
    setSelectedDept(dept);
    setFormData({
      availableBeds: dept.availableBeds || 0,
      leadDoctor: dept.leadDoctor || "",
      description: dept.description || ""
    });
  };

  const handleUpdateDepartment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5000/api/departments/${selectedDept._id}`, formData);
      setDepartments(prev => prev.map(d => d._id === selectedDept._id ? res.data : d));
      setSelectedDept(null);
    } catch (err) {
      alert("Failed to update department details");
    }
  };

  const filteredDepartments = departments.filter(d => {
    const matchesSearch = 
      d.name?.toLowerCase().includes(search.toLowerCase()) ||
      d.code?.toLowerCase().includes(search.toLowerCase()) ||
      (d.leadDoctor && d.leadDoctor.toLowerCase().includes(search.toLowerCase()));
    
    const matchesBeds = onlyAvailable ? d.availableBeds > 0 : true;
    return matchesSearch && matchesBeds;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      
      {/* Banner */}
      <div className="relative bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden mb-10 shadow-md">
        <div className="absolute inset-0 opacity-25 mix-blend-overlay">
          <img 
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=2000&q=80" 
            alt="Hospital Interior" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-sky-950 via-slate-900/90 to-slate-900/70"></div>

        <div className="relative max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-400 text-xs font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
            Live Clinical Network
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Hospital Departments Directory
          </h1>
          <p className="max-w-2xl text-sm sm:text-base text-slate-300">
            Real-time tracking of critical care units, bed capacity metrics, assigned physicians, and specialized medical infrastructure.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search by name, code, or physician..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
            />
            <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-600">
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
              className="w-4 h-4 text-sky-500 rounded border-slate-300 focus:ring-sky-500"
            />
            Show Only Units with Available Beds
          </label>
        </div>

        {/* Department Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(n => <DepartmentSkeleton key={n} />)}
          </div>
        ) : filteredDepartments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDepartments.map(dept => (
              <DepartmentCard 
                key={dept._id} 
                department={dept} 
                onDelete={handleDelete} 
                onManage={handleOpenManageModal}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center max-w-md mx-auto space-y-4 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">No departments match your query</h3>
            <button 
              onClick={() => { setSearch(""); setOnlyAvailable(false); }}
              className="text-xs font-semibold px-4 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* 🌟 Manage Unit Modal Overlay */}
      {selectedDept && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-sky-600 uppercase">{selectedDept.code}</span>
                <h3 className="text-xl font-bold text-slate-900">Manage {selectedDept.name}</h3>
              </div>
              <button 
                onClick={() => setSelectedDept(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateDepartment} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Available Beds</label>
                <input 
                  type="number"
                  value={formData.availableBeds}
                  onChange={(e) => setFormData({...formData, availableBeds: Number(e.target.value)})}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Lead Physician</label>
                <input 
                  type="text"
                  value={formData.leadDoctor}
                  onChange={(e) => setFormData({...formData, leadDoctor: e.target.value})}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Unit Description</label>
                <textarea 
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 resize-none"
                />
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button 
                  type="button"
                  onClick={() => setSelectedDept(null)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2.5 bg-sky-500 text-white text-xs font-semibold rounded-xl hover:bg-sky-600 transition shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}