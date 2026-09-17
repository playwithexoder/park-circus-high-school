"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { schoolInfo } from "@/lib/data/school-info";
import { IdentificationCard, Printer, UserCircle, UploadSimple, WarningCircle, CheckCircle, GraduationCap, SignOut, Bell } from "@phosphor-icons/react/dist/ssr";

export default function StudentDashboard() {
  const [formData, setFormData] = useState({
    name: "Aarav Sharma",
    class: "IX",
    section: "A",
    rollNo: "45",
    bloodGroup: "O+",
    dob: "2010-05-14",
    phone: "9876543210",
  });
  
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-teal-50/30 flex flex-col">
      {/* School Branding Header — Teal/Emerald theme for Student */}
      <header className="bg-emerald-950 text-white sticky top-0 z-50 shadow-xl shadow-emerald-900/50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-10 h-10 shrink-0">
              <Image src="/assets/logo_png.png" alt="Logo" fill className="object-contain brightness-0 invert" />
            </div>
            <div>
              <p className="font-heading font-bold text-white text-base leading-tight">{schoolInfo.name}</p>
              <p className="text-xs text-emerald-400">Student Self-Service Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Bell size={20} className="text-emerald-400 hover:text-white cursor-pointer transition-colors" />
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-bold">AS</div>
            <Link href="/dev-portal" className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-white transition-colors">
              <SignOut size={16} /> Exit Portal
            </Link>
          </div>
        </div>
        {/* Context Strip */}
        <div className="border-t border-white/10 bg-emerald-900/40">
          <div className="max-w-7xl mx-auto px-6 py-1.5 flex items-center gap-2">
            <GraduationCap size={14} className="text-emerald-400" weight="fill" />
            <span className="text-xs font-semibold text-emerald-300">AARAV SHARMA · CLASS IX-A</span>
            <span className="text-emerald-700 text-xs mx-2">|</span>
            <span className="text-xs text-emerald-400">Roll No. 45 &nbsp;•&nbsp; Admission No. STU-2026-001</span>
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 py-8 max-w-7xl mx-auto w-full">

        <h1 className="font-heading text-2xl font-bold text-slate-900 mb-1">Welcome back, Aarav!</h1>
        <p className="text-slate-500 text-sm mb-8">Here is your student portal. Generate your ID card or check your details below.</p>

        {/* Student Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-emerald-100 border-t-4 border-t-emerald-500">
            <p className="text-xs font-bold text-slate-500 uppercase mb-1">Attendance</p>
            <p className="text-2xl font-bold text-emerald-600">94%</p>
            <p className="text-xs text-slate-400">This Month</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100 border-t-4 border-t-blue-500">
            <p className="text-xs font-bold text-slate-500 uppercase mb-1">Last Avg Marks</p>
            <p className="text-2xl font-bold text-blue-600">85%</p>
            <p className="text-xs text-slate-400">Mid-Term 2026</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-purple-100 border-t-4 border-t-purple-500">
            <p className="text-xs font-bold text-slate-500 uppercase mb-1">Class</p>
            <p className="text-2xl font-bold text-purple-600">IX-A</p>
            <p className="text-xs text-slate-400">Roll No. 45</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-amber-100 border-t-4 border-t-amber-500">
            <p className="text-xs font-bold text-slate-500 uppercase mb-1">House</p>
            <p className="text-2xl font-bold text-amber-600">Blue</p>
            <p className="text-xs text-slate-400">Tagore House</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                    <IdentificationCard size={24} weight="duotone" />
                  </div>
                  <div>
                    <h2 className="font-heading text-xl font-bold text-slate-900">ID Card Generator</h2>
                    <p className="text-sm text-slate-500">Update your details for the current academic year.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                    <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Date of Birth</label>
                    <input type="date" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Class</label>
                    <input type="text" value={formData.class} onChange={e => setFormData({...formData, class: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Section</label>
                    <input type="text" value={formData.section} onChange={e => setFormData({...formData, section: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Roll Number</label>
                    <input type="text" value={formData.rollNo} onChange={e => setFormData({...formData, rollNo: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Blood Group</label>
                    <select value={formData.bloodGroup} onChange={e => setFormData({...formData, bloodGroup: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                      <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                      <option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Guardian Phone</label>
                    <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                  </div>
                  
                  {/* Photo Upload */}
                  <div className="md:col-span-2 mt-4">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Passport Photo</label>
                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-slate-50 hover:bg-slate-100 transition-colors relative">
                      <input type="file" accept="image/*" onChange={handlePhotoUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      <UploadSimple size={32} className="text-slate-400 mb-2" />
                      <p className="text-sm font-medium text-slate-700">Click or drag photo to upload</p>
                      <p className="text-xs text-slate-500 mt-1">PNG, JPG up to 2MB (White Background)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Preview & Action */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col items-center">
                <h3 className="font-heading text-lg font-bold text-slate-900 w-full mb-4">Live Preview</h3>
                
                {/* Visual ID Card Preview (Not the print version) */}
                <div className="w-[250px] aspect-[1.58] bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden flex flex-col relative select-none">
                  {/* Top Bar */}
                  <div className="w-full p-2 flex items-center justify-center gap-2 relative z-10 text-white shadow-md" style={{ backgroundColor: '#111111' }}>
                    <div className="w-6 h-6 relative shrink-0">
                      <img src="/assets/logo_png.png" alt="Logo" className="w-full h-full object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-bold leading-none tracking-wide">PARK CIRCUS HIGH SCHOOL</p>
                      <p className="text-[7px] leading-none opacity-75 mt-0.5">ESTD 1936 • GOVT SPONSORED</p>
                    </div>
                  </div>
                  
                  <div className="flex-1 flex px-3 py-2 bg-gradient-to-b from-white to-slate-50 relative">
                    {/* Watermark */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                      <img src="/assets/logo_png.png" alt="Watermark" className="w-24 h-24 grayscale" />
                    </div>
                    
                    {/* Photo */}
                    <div className="w-16 h-20 bg-slate-200 border-2 border-slate-300 shrink-0 mt-1 relative z-10 overflow-hidden shadow-sm">
                      {photoUrl ? (
                        <img src={photoUrl} alt="Student" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <UserCircle size={32} weight="fill" />
                        </div>
                      )}
                    </div>
                    
                    {/* Details */}
                    <div className="flex-1 pl-3 flex flex-col justify-center relative z-10">
                      <h4 className="font-bold text-slate-900 text-[13px] leading-tight uppercase mb-1">{formData.name || "Student Name"}</h4>
                      <div className="grid grid-cols-2 gap-x-1 gap-y-0.5 text-[9px]">
                        <p><span className="font-bold text-slate-500">DOB:</span> {formData.dob}</p>
                        <p><span className="font-bold text-slate-500">Blood:</span> <span className="text-red-600 font-bold">{formData.bloodGroup}</span></p>
                        <p><span className="font-bold text-slate-500">Class:</span> {formData.class}-{formData.section}</p>
                        <p><span className="font-bold text-slate-500">Roll:</span> {formData.rollNo}</p>
                      </div>
                      <p className="text-[9px] mt-1"><span className="font-bold text-slate-500">Emergency:</span> {formData.phone}</p>
                    </div>
                  </div>
                  
                  {/* Bottom Bar */}
                  <div className="w-full p-1.5 text-center relative z-10" style={{ backgroundColor: '#222222' }}>
                    <p className="text-[7px] text-white opacity-90">{schoolInfo.contact.address}</p>
                  </div>
                </div>

                <div className="w-full mt-6 space-y-3">
                  <div className="flex items-start gap-2 text-xs text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-100">
                    <WarningCircle size={16} className="shrink-0 mt-0.5" />
                    <p>Ensure photo has a white background. Please collect the physical lanyard from the office after printing.</p>
                  </div>
                  <button 
                    onClick={handlePrint}
                    disabled={!photoUrl}
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-semibold py-3 rounded-xl hover:bg-black transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Printer size={20} />
                    {photoUrl ? "Generate & Print ID Card" : "Upload Photo First"}
                  </button>
                </div>
              </div>
            </div>

          </div>
      </main>
      
      {/* PRINT ONLY ID CARD */}
      <div className="hidden print-only absolute top-0 left-0 w-full h-full bg-white z-[9999] p-8">
        <p className="text-xs mb-4 text-gray-500">Cut along the dotted lines. Standard ID Card Size (3.375" x 2.125")</p>
        
        {/* Actual Printable ID Card */}
        <div className="w-[3.375in] h-[2.125in] border border-dashed border-gray-400 overflow-hidden relative font-sans print-exact-colors shadow-[0_0_10px_rgba(0,0,0,0.1)]">
          {/* Top Header — Black uniform colour */}
          <div className="w-full h-[0.45in] flex items-center justify-center gap-2 text-white relative z-10 px-2" style={{ backgroundColor: '#111111' }}>
            <div className="w-[0.38in] h-[0.38in] shrink-0 flex items-center justify-center">
              <img src="/assets/logo_png.png" alt="Logo" className="w-full h-full object-contain" style={{ filter: "brightness(0) invert(1)" }} />
            </div>
            <div className="text-center">
              <p className="text-[11px] font-bold tracking-wide m-0 p-0 leading-tight">PARK CIRCUS HIGH SCHOOL</p>
              <p className="text-[7px] m-0 p-0 opacity-75 leading-tight">ESTD 1936 • GOVT SPONSORED</p>
            </div>
          </div>
          
          <div className="flex px-2 py-2 h-[1.3in] bg-white relative">
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <img src="/assets/logo_png.png" alt="Watermark" className="w-16 h-16 grayscale" />
            </div>
            
            {/* Photo */}
            <div className="w-[0.8in] h-[1.1in] bg-gray-100 border-2 border-gray-300 shrink-0 relative z-10">
              {photoUrl && <img src={photoUrl} alt="Student" className="w-full h-full object-cover" />}
            </div>
            
            {/* Details */}
            <div className="flex-1 pl-3 flex flex-col justify-start relative z-10 pt-1">
              <h4 className="font-bold text-slate-900 text-[14px] uppercase mb-1 leading-tight">{formData.name}</h4>
              
              <div className="grid grid-cols-2 gap-x-1 gap-y-1 text-[10px] leading-tight">
                <div><span className="font-bold text-gray-600">DOB:</span> {formData.dob}</div>
                <div><span className="font-bold text-gray-600">Blood:</span> <span className="text-red-600 font-bold">{formData.bloodGroup}</span></div>
                <div><span className="font-bold text-gray-600">Class:</span> {formData.class}-{formData.section}</div>
                <div><span className="font-bold text-gray-600">Roll:</span> {formData.rollNo}</div>
              </div>
              
              <div className="mt-auto text-[9px] mb-1">
                <span className="font-bold text-gray-600">Emergency:</span> {formData.phone}
              </div>
            </div>
          </div>
          
          {/* Bottom Footer — Dark */}
          <div className="w-full h-[0.375in] absolute bottom-0 flex flex-col justify-center items-center text-white px-2 z-10" style={{ backgroundColor: '#222222' }}>
            <p className="text-[8px] m-0 p-0 text-center">{schoolInfo.contact.address}</p>
            <p className="text-[7px] m-0 p-0 text-center">Ph: {schoolInfo.contact.phone1}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
