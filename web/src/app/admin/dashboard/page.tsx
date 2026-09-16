"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { schoolInfo } from "@/lib/data/school-info";
import {
  ShieldCheck, Users, UserPlus, Megaphone, Clock,
  Files, ListBullets, CheckCircle, XCircle, Eye,
  SignOut, Bell, Gear, X, Check, IdentificationCard, Printer
} from "@phosphor-icons/react/dist/ssr";

type AppStatus = "Pending" | "Approved" | "Rejected";

const initialApps = [
  { id: "APP-2026-042", name: "Rohan Das", class: "V", date: "16 Sep 2026", status: "Pending" as AppStatus },
  { id: "APP-2026-041", name: "Priya Ghosh", class: "XI (Science)", date: "15 Sep 2026", status: "Approved" as AppStatus },
  { id: "APP-2026-040", name: "Suman Ali", class: "V", date: "15 Sep 2026", status: "Pending" as AppStatus },
  { id: "APP-2026-039", name: "Kirti Sen", class: "XI (Arts)", date: "14 Sep 2026", status: "Rejected" as AppStatus },
  { id: "APP-2026-038", name: "Arun Mondal", class: "IX", date: "13 Sep 2026", status: "Pending" as AppStatus },
];

const initialNotices = [
  { id: 1, title: "Annual Prize Distribution Ceremony", category: "General Circular", date: "16 Sep 2026" },
  { id: 2, title: "Class XI Admission List (2026-27)", category: "Admissions", date: "15 Sep 2026" },
  { id: 3, title: "Mid-Term Examination Schedule", category: "Examinations", date: "10 Sep 2026" },
];

const mockStudents = [
  { id: "STU-001", name: "Aarav Sharma", class: "IX", section: "A", rollNo: "45", dob: "2010-05-14", bloodGroup: "O+", phone: "9876543210", photo: "" },
  { id: "STU-002", name: "Rahul Mondal", class: "IX", section: "Arts", rollNo: "42", dob: "2011-03-22", bloodGroup: "B+", phone: "9876512345", photo: "" },
  { id: "STU-003", name: "Priya Ghosh", class: "XI", section: "Science", rollNo: "12", dob: "2009-08-10", bloodGroup: "A+", phone: "9876511111", photo: "" },
  { id: "STU-004", name: "Suman Ali", class: "V", section: "B", rollNo: "05", dob: "2014-11-20", bloodGroup: "O-", phone: "9876522222", photo: "" },
  { id: "STU-005", name: "Rohan Das", class: "V", section: "A", rollNo: "18", dob: "2014-01-15", bloodGroup: "B-", phone: "9876533333", photo: "" },
  { id: "STU-006", name: "Kirti Sen", class: "XI", section: "Arts", rollNo: "24", dob: "2009-12-05", bloodGroup: "AB+", phone: "9876544444", photo: "" },
];

export default function AdminDashboard() {
  const [apps, setApps] = useState(initialApps);
  const [notices, setNotices] = useState(initialNotices);
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeCategory, setNoticeCategory] = useState("General Circular");
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"dashboard" | "idcards">("dashboard");
  
  // ID Card State
  const [students] = useState(mockStudents);
  const [idFilterClass, setIdFilterClass] = useState("All");
  const [selectedStudents, setSelectedStudents] = useState<Set<string>>(new Set());
  const [paperSize, setPaperSize] = useState("A4");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const updateStatus = (id: string, newStatus: AppStatus) => {
    setApps(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    showToast(`Application ${id} marked as ${newStatus}`);
  };

  const publishNotice = () => {
    if (!noticeTitle.trim()) return showToast("Please enter a notice title.");
    const newNotice = { id: Date.now(), title: noticeTitle, category: noticeCategory, date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) };
    setNotices(prev => [newNotice, ...prev]);
    setNoticeTitle("");
    setPublishSuccess(true);
    showToast("Notice published successfully!");
    setTimeout(() => setPublishSuccess(false), 3000);
  };

  const deleteNotice = (id: number) => {
    setNotices(prev => prev.filter(n => n.id !== id));
    showToast("Notice removed.");
  };

  const filteredStudents = idFilterClass === "All" ? students : students.filter(s => s.class === idFilterClass);

  const toggleSelectAll = () => {
    if (selectedStudents.size === filteredStudents.length) {
      setSelectedStudents(new Set());
    } else {
      setSelectedStudents(new Set(filteredStudents.map(s => s.id)));
    }
  };

  const toggleStudent = (id: string) => {
    const next = new Set(selectedStudents);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedStudents(next);
  };

  const pendingCount = apps.filter(a => a.status === "Pending").length;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* School Branding Header */}
      <header className="bg-slate-950 text-white sticky top-0 z-50 shadow-xl shadow-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-10 h-10 shrink-0">
              <svg viewBox="0 0 40 40" className="absolute inset-0 w-full h-full" aria-hidden="true">
                <circle cx="20" cy="20" r="19" fill="black" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
              </svg>
              <Image src="/assets/logo_png.png" alt="Logo" fill className="object-contain brightness-0 invert p-1 relative z-10" />
            </div>
            <div>
              <p className="font-heading font-bold text-white text-base leading-tight">{schoolInfo.name}</p>
              <p className="text-xs text-slate-400">Headmaster's Administration Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell size={20} className="text-slate-400 hover:text-white cursor-pointer transition-colors" />
              {pendingCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold">{pendingCount}</span>}
            </div>
            <div className="w-8 h-8 rounded-full bg-rose-600 flex items-center justify-center text-white text-xs font-bold">HM</div>
            <Link href="/dev-portal" className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
              <SignOut size={16} /> Exit Portal
            </Link>
          </div>
        </div>
        {/* Role Badge Strip */}
        <div className="border-t border-white/10 bg-rose-900/30">
          <div className="max-w-7xl mx-auto px-6 py-1.5 flex items-center gap-2">
            <ShieldCheck size={14} className="text-rose-400" weight="fill" />
            <span className="text-xs font-semibold text-rose-300">HEADMASTER LEVEL ACCESS</span>
            <span className="text-slate-600 text-xs mx-2">|</span>
            <span className="text-xs text-slate-400">UDISE: {schoolInfo.udise} &nbsp;•&nbsp; Academic Year 2026–27</span>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="bg-slate-900 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-6 flex items-center gap-6">
            <button 
              onClick={() => setActiveTab("dashboard")}
              className={`py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === "dashboard" ? "border-rose-500 text-white" : "border-transparent text-slate-400 hover:text-slate-200"}`}
            >
              Overview & Applications
            </button>
            <button 
              onClick={() => setActiveTab("idcards")}
              className={`py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${activeTab === "idcards" ? "border-rose-500 text-white" : "border-transparent text-slate-400 hover:text-slate-200"}`}
            >
              <IdentificationCard size={18} /> Manage ID Cards
            </button>
          </div>
        </div>
      </header>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[9999] bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl text-sm font-semibold flex items-center gap-2 border border-white/10">
          <CheckCircle size={18} className="text-emerald-400" weight="fill" /> {toast}
        </div>
      )}

      {activeTab === "dashboard" && (
        <main className="flex-1 px-6 py-8 max-w-7xl mx-auto w-full print:hidden">
        <h1 className="font-heading text-2xl font-bold text-slate-900 mb-1">Good Morning, Headmaster</h1>
        <p className="text-slate-500 text-sm mb-8">Here is a summary of what requires your attention today.</p>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Students", value: "1,248", color: "emerald", icon: <Users size={22} weight="duotone" /> },
            { label: "New Applications", value: apps.length.toString(), color: "blue", icon: <UserPlus size={22} weight="duotone" /> },
            { label: "Pending Review", value: pendingCount.toString(), color: "amber", icon: <Clock size={22} weight="duotone" /> },
            { label: "Active Notices", value: notices.length.toString(), color: "purple", icon: <Megaphone size={22} weight="duotone" /> },
          ].map((stat, i) => (
            <div key={i} className={`bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm border border-slate-200 border-t-4 border-t-${stat.color}-500`}>
              <div className={`w-11 h-11 rounded-full bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center shrink-0`}>{stat.icon}</div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Applications Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                    <ListBullets size={20} weight="duotone" />
                  </div>
                  <h2 className="font-heading text-lg font-bold text-slate-900">Admission Applications</h2>
                </div>
                <span className="text-xs font-semibold text-slate-500">{pendingCount} pending</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="pb-3 text-xs font-bold text-slate-400 uppercase">App No.</th>
                      <th className="pb-3 text-xs font-bold text-slate-400 uppercase">Student</th>
                      <th className="pb-3 text-xs font-bold text-slate-400 uppercase">Class</th>
                      <th className="pb-3 text-xs font-bold text-slate-400 uppercase">Status</th>
                      <th className="pb-3 text-xs font-bold text-slate-400 uppercase text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {apps.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 font-mono text-xs text-slate-500">{app.id}</td>
                        <td className="py-3 font-semibold text-slate-900 text-sm">{app.name}</td>
                        <td className="py-3 text-sm text-slate-600">{app.class}</td>
                        <td className="py-3">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${
                            app.status === "Approved" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                            app.status === "Rejected" ? "bg-rose-50 text-rose-700 border border-rose-200" :
                            "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}>{app.status}</span>
                        </td>
                        <td className="py-3 text-right">
                          {app.status === "Pending" ? (
                            <div className="flex justify-end gap-2">
                              <button onClick={() => updateStatus(app.id, "Approved")} className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                                <Check size={13} weight="bold" /> Approve
                              </button>
                              <button onClick={() => updateStatus(app.id, "Rejected")} className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 bg-rose-100 text-rose-700 rounded-lg hover:bg-rose-200 transition-colors">
                                <X size={13} weight="bold" /> Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs text-slate-400 italic">{app.status}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Live Notice Board */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Megaphone size={20} weight="duotone" />
                </div>
                <h2 className="font-heading text-lg font-bold text-slate-900">Published Notices</h2>
              </div>
              <div className="space-y-3">
                {notices.map(n => (
                  <div key={n.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{n.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{n.category} · {n.date}</p>
                    </div>
                    <button onClick={() => deleteNotice(n.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors ml-3 shrink-0">
                      <X size={16} weight="bold" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Notice Publisher */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Megaphone size={20} weight="duotone" />
                </div>
                <div>
                  <h2 className="font-heading text-base font-bold text-slate-900">Post New Notice</h2>
                  <p className="text-xs text-slate-500">Publishes to website instantly</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Notice Title</label>
                  <input value={noticeTitle} onChange={e => setNoticeTitle(e.target.value)} type="text" placeholder="e.g. Summer Vacation Dates" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Category</label>
                  <select value={noticeCategory} onChange={e => setNoticeCategory(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all">
                    <option>General Circular</option>
                    <option>Admissions</option>
                    <option>Examinations</option>
                    <option>Mandatory Disclosure</option>
                  </select>
                </div>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                  <Files size={22} className="text-slate-400 mb-1" />
                  <p className="text-xs font-medium text-slate-600">Attach PDF (Optional)</p>
                  <p className="text-[10px] text-slate-400">Max 5MB</p>
                </div>
                <button onClick={publishNotice} className={`w-full font-semibold py-3 rounded-xl transition-all shadow-sm text-sm flex items-center justify-center gap-2 ${publishSuccess ? "bg-emerald-500 text-white" : "bg-purple-600 hover:bg-purple-700 text-white shadow-purple-600/20"}`}>
                  {publishSuccess ? <><CheckCircle size={18} weight="fill" /> Published!</> : "Publish to Website"}
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="font-heading text-base font-bold text-slate-900 mb-4">Quick Links</h3>
              <div className="space-y-2">
                {[
                  { label: "View Notices Page", href: "/notices" },
                  { label: "School Info Register", href: "/about" },
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Dev Portal", href: "/dev-portal" },
                ].map((link, i) => (
                  <Link key={i} href={link.href} className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-sm font-semibold text-slate-700">
                    {link.label} <span className="text-slate-400 text-xs">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        </main>
      )}

      {activeTab === "idcards" && (
        <main className="flex-1 px-6 py-8 max-w-7xl mx-auto w-full print:hidden">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-heading text-2xl font-bold text-slate-900">Manage ID Cards</h1>
              <p className="text-slate-500 text-sm">Review student details and bulk print ID cards by class.</p>
            </div>
            
            <div className="flex items-center gap-4 bg-white p-2 rounded-xl shadow-sm border border-slate-200">
              <select value={paperSize} onChange={e => setPaperSize(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-semibold outline-none focus:border-rose-500">
                <option value="A4">A4 (10 cards/page)</option>
                <option value="A3">A3 (21 cards/page)</option>
                <option value="A5">A5 (4 cards/page)</option>
                <option value="A6">A6 (2 cards/page)</option>
              </select>
              <button 
                onClick={() => window.print()}
                disabled={selectedStudents.size === 0}
                className="flex items-center gap-2 bg-slate-900 text-white font-semibold px-5 py-2 rounded-lg hover:bg-black disabled:opacity-50 transition-colors"
              >
                <Printer size={18} /> Print {selectedStudents.size > 0 ? selectedStudents.size : ""} Selected
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center gap-4 bg-slate-50">
              <label className="text-sm font-bold text-slate-700">Filter by Class:</label>
              <select value={idFilterClass} onChange={e => { setIdFilterClass(e.target.value); setSelectedStudents(new Set()); }} className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-sm font-semibold outline-none focus:border-rose-500 min-w-[150px]">
                <option value="All">All Classes</option>
                {Array.from(new Set(students.map(s => s.class))).map(c => (
                  <option key={c} value={c}>Class {c}</option>
                ))}
              </select>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200 bg-white">
                    <th className="px-4 py-3 text-center w-12">
                      <input 
                        type="checkbox" 
                        checked={filteredStudents.length > 0 && selectedStudents.size === filteredStudents.length}
                        onChange={toggleSelectAll}
                        className="w-4 h-4 rounded border-slate-300 text-rose-600 focus:ring-rose-500"
                      />
                    </th>
                    <th className="pb-3 pt-3 text-xs font-bold text-slate-500 uppercase">Student</th>
                    <th className="pb-3 pt-3 text-xs font-bold text-slate-500 uppercase">Roll No</th>
                    <th className="pb-3 pt-3 text-xs font-bold text-slate-500 uppercase">Class</th>
                    <th className="pb-3 pt-3 text-xs font-bold text-slate-500 uppercase">DOB</th>
                    <th className="pb-3 pt-3 text-xs font-bold text-slate-500 uppercase text-right px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.map((stu) => (
                    <tr key={stu.id} className={`transition-colors ${selectedStudents.has(stu.id) ? "bg-rose-50" : "hover:bg-slate-50"}`}>
                      <td className="px-4 py-3 text-center">
                        <input 
                          type="checkbox" 
                          checked={selectedStudents.has(stu.id)}
                          onChange={() => toggleStudent(stu.id)}
                          className="w-4 h-4 rounded border-slate-300 text-rose-600 focus:ring-rose-500"
                        />
                      </td>
                      <td className="py-3 font-semibold text-slate-900 text-sm flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0 text-slate-500 border border-slate-300">
                          <IdentificationCard size={16} weight="fill" />
                        </div>
                        {stu.name}
                      </td>
                      <td className="py-3 text-sm text-slate-600 font-mono">{stu.rollNo}</td>
                      <td className="py-3 text-sm text-slate-600">{stu.class}-{stu.section}</td>
                      <td className="py-3 text-sm text-slate-600">{stu.dob}</td>
                      <td className="py-3 text-right px-4">
                        <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase tracking-wide">
                          Ready
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredStudents.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-500 text-sm">No students found for this class.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      )}

      {/* PRINT LAYOUT BLOCK (Hidden on screen, visible only when printing) */}
      <div className="hidden print-only bg-white w-full h-full absolute top-0 left-0 z-[9999]">
        <style dangerouslySetInnerHTML={{ __html: `
          @page { size: ${paperSize}; margin: 0.5in; }
          body { background: white !important; }
        `}} />
        
        <div className="flex flex-wrap gap-2 justify-center items-start">
          {students.filter(s => selectedStudents.has(s.id)).map(stu => (
            <div key={stu.id} className="w-[3.375in] h-[2.125in] border-[0.5px] border-dashed border-gray-400 overflow-hidden relative font-sans print-exact-colors break-inside-avoid">
              {/* Header — Black uniform colour */}
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
                <div className="w-[0.8in] h-[1.1in] bg-gray-100 border-2 border-slate-800 shrink-0 relative z-10 flex items-center justify-center text-slate-400">
                  {/* Photo area */}
                  <UserCircle size={28} weight="fill" />
                </div>
                
                <div className="flex-1 pl-3 flex flex-col justify-start relative z-10 pt-1">
                  <h4 className="font-bold text-slate-900 text-[14px] uppercase mb-1 leading-tight">{stu.name}</h4>
                  
                  <div className="grid grid-cols-2 gap-x-1 gap-y-1 text-[10px] leading-tight">
                    <div><span className="font-bold text-gray-600">DOB:</span> {stu.dob}</div>
                    <div><span className="font-bold text-gray-600">Blood:</span> <span className="text-red-600 font-bold">{stu.bloodGroup}</span></div>
                    <div><span className="font-bold text-gray-600">Class:</span> {stu.class}-{stu.section}</div>
                    <div><span className="font-bold text-gray-600">Roll:</span> {stu.rollNo}</div>
                  </div>
                  
                  <div className="mt-auto text-[9px] mb-1">
                    <span className="font-bold text-gray-600">Emergency:</span> {stu.phone}
                  </div>
                </div>
              </div>
              
              {/* Bottom Footer — Dark */}
              <div className="w-full h-[0.375in] absolute bottom-0 flex flex-col justify-center items-center text-white px-2 z-10" style={{ backgroundColor: '#222222' }}>
                <p className="text-[8px] m-0 p-0 text-center">{schoolInfo.contact.address}</p>
                <p className="text-[7px] m-0 p-0 text-center">Ph: {schoolInfo.contact.phone1}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
