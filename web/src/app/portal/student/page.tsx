"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { schoolInfo } from "@/lib/data/school-info";
import {
  Student, CalendarCheck, Exam, CurrencyInr, Books,
  SignOut, IdentificationCard, Printer, UserCircle,
  UploadSimple, WarningCircle, CheckCircle, ArrowLeft
} from "@phosphor-icons/react/dist/ssr";

type View = "dashboard" | "attendance" | "exams" | "library" | "fees" | "idcard";

const scheduleData = [
  { time: "10:30 AM", subject: "English",          teacher: "Mr. A. Sen",    present: true  },
  { time: "11:15 AM", subject: "History",           teacher: "Mrs. S. Bose",  present: true  },
  { time: "12:00 PM", subject: "Geography",         teacher: "Mr. R. Das",    present: true  },
  { time: "01:30 PM", subject: "Political Science", teacher: "Ms. T. Roy",    present: true  },
  { time: "02:30 PM", subject: "Mathematics",       teacher: "Mr. S. Mukherjee", present: false },
];

const examResults = [
  { subject: "English",          marks: 78, max: 100, grade: "B+" },
  { subject: "History",          marks: 82, max: 100, grade: "A"  },
  { subject: "Geography",        marks: 69, max: 100, grade: "B"  },
  { subject: "Political Science",marks: 88, max: 100, grade: "A+" },
  { subject: "Mathematics",      marks: 55, max: 100, grade: "C"  },
];

export default function StudentPortal() {
  const [view, setView] = useState<View>("dashboard");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [idForm, setIdForm] = useState({ name: "Rahul Mondal", class: "IX", section: "Arts", rollNo: "42", bloodGroup: "B+", dob: "2011-03-22", phone: "9876512345" });
  const [toast, setToast] = useState<string | null>(null);
  const [libraryBooks, setLibraryBooks] = useState([
    { title: "The Discovery of India", due: "25 Sep 2026", overdue: false },
    { title: "Bengal: Rise and Fall", due: "10 Sep 2026", overdue: true },
  ]);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const navItems: { id: View; label: string; icon: React.ReactNode }[] = [
    { id: "dashboard",  label: "Dashboard",      icon: <Student size={20} weight="duotone" /> },
    { id: "attendance", label: "Attendance",      icon: <CalendarCheck size={20} weight="duotone" /> },
    { id: "exams",      label: "Examinations",    icon: <Exam size={20} weight="duotone" /> },
    { id: "library",    label: "Library",         icon: <Books size={20} weight="duotone" /> },
    { id: "fees",       label: "Fee Details",     icon: <CurrencyInr size={20} weight="duotone" /> },
    { id: "idcard",     label: "My ID Card",      icon: <IdentificationCard size={20} weight="duotone" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[9999] bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl text-sm font-semibold flex items-center gap-2 border border-white/10">
          <CheckCircle size={18} className="text-emerald-400" weight="fill" /> {toast}
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-100 flex-col hidden lg:flex sticky top-0 h-screen">
        {/* School Branding */}
        <div className="p-5 border-b border-slate-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="relative w-10 h-10 shrink-0">
              <svg viewBox="0 0 40 40" className="absolute inset-0 w-full h-full" aria-hidden="true">
                <circle cx="20" cy="20" r="19" fill="black" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
              </svg>
              <Image src="/assets/logo_png.png" alt="Logo" fill className="object-contain brightness-0 invert p-1 relative z-10" />
            </div>
            <div>
              <div className="font-heading font-bold text-sm text-slate-800 leading-tight">{schoolInfo.shortName}</div>
              <div className="text-[10px] text-slate-500">{schoolInfo.name}</div>
            </div>
          </div>
          <div className="text-xs text-emerald-600 font-semibold uppercase tracking-wider bg-emerald-50 px-3 py-1.5 rounded-lg">Student Portal</div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all text-left ${
                view === item.id
                  ? "bg-emerald-50 text-emerald-700 shadow-sm"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 space-y-1">
          <div className="px-4 py-2 text-xs text-slate-500">
            <div className="font-bold text-slate-600">Rahul Mondal</div>
            <div>Class IX (Arts) · Roll No. 42</div>
          </div>
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-rose-600 hover:bg-rose-50 font-semibold rounded-xl transition-colors">
            <SignOut size={20} weight="bold" /> Logout
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >

              {/* ─── DASHBOARD ─── */}
              {view === "dashboard" && (
                <>
                  <div className="flex justify-between items-end">
                    <div>
                      <h1 className="font-heading text-3xl font-bold text-slate-900 mb-1">Welcome back, Rahul! 👋</h1>
                      <p className="text-slate-500">Class IX (Arts) • Roll No: 42</p>
                    </div>
                    <div className="hidden md:block text-right">
                      <div className="text-sm font-bold text-slate-800">{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</div>
                      <div className="text-xs text-slate-500">Current Term: 2nd Semester</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-card p-6 border-l-4 border-emerald-500 cursor-pointer hover:-translate-y-1 transition-transform" onClick={() => setView("attendance")}>
                      <div className="flex justify-between items-start mb-4">
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Attendance</div>
                        <CalendarCheck size={24} weight="duotone" className="text-emerald-500" />
                      </div>
                      <div className="font-heading text-3xl font-bold text-slate-900">92%</div>
                      <div className="text-sm text-emerald-600 mt-2 font-medium">On track for term</div>
                    </div>
                    <div className="glass-card p-6 border-l-4 border-blue-500 cursor-pointer hover:-translate-y-1 transition-transform" onClick={() => setView("exams")}>
                      <div className="flex justify-between items-start mb-4">
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Upcoming Exam</div>
                        <Exam size={24} weight="duotone" className="text-blue-500" />
                      </div>
                      <div className="font-heading text-xl font-bold text-slate-900 leading-tight">History (Half-Yearly)</div>
                      <div className="text-sm text-slate-500 mt-2 font-medium">In 12 days</div>
                    </div>
                    <div className="glass-card p-6 border-l-4 border-amber-500 cursor-pointer hover:-translate-y-1 transition-transform" onClick={() => setView("fees")}>
                      <div className="flex justify-between items-start mb-4">
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Fee Status</div>
                        <CurrencyInr size={24} weight="duotone" className="text-amber-500" />
                      </div>
                      <div className="font-heading text-xl font-bold text-slate-900">Cleared</div>
                      <div className="text-sm text-slate-500 mt-2 font-medium">Next due: Dec 2026</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="glass-card p-6 md:p-8">
                      <h2 className="font-heading text-xl font-bold text-slate-900 mb-6">Today's Schedule</h2>
                      <div className="space-y-3">
                        {scheduleData.map((cls, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                            <div className="flex items-center gap-4">
                              <div className="text-sm font-bold text-slate-400 w-16">{cls.time}</div>
                              <div>
                                <div className="font-semibold text-slate-800">{cls.subject}</div>
                                <div className="text-xs text-slate-500">{cls.teacher}</div>
                              </div>
                            </div>
                            <div className={`w-2.5 h-2.5 rounded-full ${cls.present ? "bg-emerald-500" : "bg-slate-300"}`}></div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="glass-card p-6 md:p-8">
                      <h2 className="font-heading text-xl font-bold text-slate-900 mb-6">Recent Notices</h2>
                      <div className="space-y-5">
                        <div className="border-l-2 border-emerald-500 pl-4">
                          <div className="text-xs text-slate-400 mb-1">Today</div>
                          <div className="font-semibold text-slate-800">Saraswati Puja Preparations</div>
                          <p className="text-sm text-slate-600 mt-1">Students interested in participating in the cultural program please submit names by Friday.</p>
                        </div>
                        <div className="border-l-2 border-blue-500 pl-4">
                          <div className="text-xs text-slate-400 mb-1">Yesterday</div>
                          <div className="font-semibold text-slate-800">Library Book Returns</div>
                          <p className="text-sm text-slate-600 mt-1">All history reference books must be returned before the half-yearly exams begin.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* ─── ATTENDANCE ─── */}
              {view === "attendance" && (
                <>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setView("dashboard")} className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"><ArrowLeft size={20} /></button>
                    <div><h1 className="font-heading text-2xl font-bold text-slate-900">My Attendance</h1><p className="text-slate-500 text-sm">Class IX (Arts) · 2nd Semester 2026</p></div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {[{ label: "Total Days", val: "85", color: "blue" }, { label: "Present", val: "78", color: "emerald" }, { label: "Absent", val: "7", color: "rose" }].map((s, i) => (
                      <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 text-center">
                        <p className={`text-3xl font-bold text-${s.color}-600`}>{s.val}</p>
                        <p className="text-xs font-bold text-slate-500 uppercase mt-1">{s.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                    <h2 className="font-heading text-lg font-bold text-slate-900 mb-4">Monthly Breakdown</h2>
                    <div className="space-y-3">
                      {[{ month: "September 2026", present: 12, total: 14, pct: 86 }, { month: "August 2026", present: 24, total: 26, pct: 92 }, { month: "July 2026", present: 22, total: 23, pct: 96 }].map((m, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <div className="w-32 text-sm font-semibold text-slate-700">{m.month}</div>
                          <div className="flex-1 bg-slate-100 rounded-full h-2.5">
                            <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: `${m.pct}%` }}></div>
                          </div>
                          <div className="text-sm font-bold text-slate-600 w-20 text-right">{m.present}/{m.total} · {m.pct}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* ─── EXAMS ─── */}
              {view === "exams" && (
                <>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setView("dashboard")} className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"><ArrowLeft size={20} /></button>
                    <div><h1 className="font-heading text-2xl font-bold text-slate-900">Examinations</h1><p className="text-slate-500 text-sm">Mid-Term 2026 Results · Class IX (Arts)</p></div>
                  </div>
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                    <h2 className="font-heading text-lg font-bold text-slate-900 mb-5">Mid-Term Exam Results</h2>
                    <div className="space-y-4">
                      {examResults.map((r, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <div className="w-40 text-sm font-semibold text-slate-700">{r.subject}</div>
                          <div className="flex-1 bg-slate-100 rounded-full h-3">
                            <div className={`h-3 rounded-full ${r.marks >= 80 ? "bg-emerald-500" : r.marks >= 60 ? "bg-blue-500" : "bg-amber-500"}`} style={{ width: `${r.marks}%` }}></div>
                          </div>
                          <div className="text-sm font-bold text-slate-700 w-16 text-right">{r.marks}/{r.max}</div>
                          <div className={`text-xs font-bold px-2.5 py-1 rounded-full w-10 text-center ${r.marks >= 80 ? "bg-emerald-50 text-emerald-700" : r.marks >= 60 ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"}`}>{r.grade}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                      <span className="font-bold text-slate-700">Total Aggregate</span>
                      <span className="text-xl font-bold text-blue-600">{examResults.reduce((a, r) => a + r.marks, 0)}/{examResults.reduce((a, r) => a + r.max, 0)} ({Math.round(examResults.reduce((a, r) => a + r.marks, 0) / examResults.length)}%)</span>
                    </div>
                  </div>
                </>
              )}

              {/* ─── LIBRARY ─── */}
              {view === "library" && (
                <>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setView("dashboard")} className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"><ArrowLeft size={20} /></button>
                    <div><h1 className="font-heading text-2xl font-bold text-slate-900">Library</h1><p className="text-slate-500 text-sm">Borrowed books and renewals</p></div>
                  </div>
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                    <h2 className="font-heading text-lg font-bold text-slate-900 mb-4">Currently Borrowed</h2>
                    <div className="space-y-3">
                      {libraryBooks.map((b, i) => (
                        <div key={i} className={`flex items-center justify-between p-4 rounded-xl border ${b.overdue ? "bg-rose-50 border-rose-200" : "bg-slate-50 border-slate-100"}`}>
                          <div>
                            <p className="font-semibold text-slate-900">{b.title}</p>
                            <p className={`text-xs mt-0.5 font-semibold ${b.overdue ? "text-rose-600" : "text-slate-500"}`}>Due: {b.due} {b.overdue && "· OVERDUE"}</p>
                          </div>
                          {b.overdue ? (
                            <button onClick={() => { setLibraryBooks(p => p.map((bk, j) => j === i ? { ...bk, overdue: false, due: "07 Oct 2026" } : bk)); showToast("Book renewed for 3 weeks!"); }} className="px-4 py-2 text-xs font-bold bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition-colors">Renew Now</button>
                          ) : (
                            <span className="px-3 py-1 text-xs font-bold bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">On time</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* ─── FEES ─── */}
              {view === "fees" && (
                <>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setView("dashboard")} className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"><ArrowLeft size={20} /></button>
                    <div><h1 className="font-heading text-2xl font-bold text-slate-900">Fee Details</h1><p className="text-slate-500 text-sm">Academic Year 2026–27</p></div>
                  </div>
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-100 mb-6">
                      <CheckCircle size={24} className="text-emerald-600" weight="fill" />
                      <div><p className="font-bold text-emerald-800">All fees cleared for this semester</p><p className="text-sm text-emerald-600">Next payment due: December 2026</p></div>
                    </div>
                    <h2 className="font-heading text-lg font-bold text-slate-900 mb-4">Payment History</h2>
                    <div className="space-y-3">
                      {[
                        { period: "2nd Semester 2026", amount: "₹1,200", status: "Paid", date: "02 Jul 2026" },
                        { period: "1st Semester 2026", amount: "₹1,200", status: "Paid", date: "05 Jan 2026" },
                        { period: "2nd Semester 2025", amount: "₹1,100", status: "Paid", date: "03 Jul 2025" },
                      ].map((f, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                          <div><p className="font-semibold text-slate-900 text-sm">{f.period}</p><p className="text-xs text-slate-500">{f.date}</p></div>
                          <div className="text-right"><p className="font-bold text-slate-900">{f.amount}</p><span className="text-xs font-bold text-emerald-600">{f.status}</span></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* ─── ID CARD ─── */}
              {view === "idcard" && (
                <>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setView("dashboard")} className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"><ArrowLeft size={20} /></button>
                    <div><h1 className="font-heading text-2xl font-bold text-slate-900">My ID Card</h1><p className="text-slate-500 text-sm">Generate and print your school ID card</p></div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                      <h2 className="font-heading text-lg font-bold text-slate-900 mb-5">Your Details</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(["name", "dob", "class", "section", "rollNo", "bloodGroup", "phone"] as const).map(field => (
                          <div key={field}>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">{field === "dob" ? "Date of Birth" : field === "rollNo" ? "Roll No." : field.charAt(0).toUpperCase() + field.slice(1)}</label>
                            <input
                              type={field === "dob" ? "date" : "text"}
                              value={idForm[field]}
                              onChange={e => setIdForm(p => ({ ...p, [field]: e.target.value }))}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                            />
                          </div>
                        ))}
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Passport Photo</label>
                          <div className="border-2 border-dashed border-slate-200 rounded-xl p-5 flex flex-col items-center text-center bg-slate-50 hover:bg-slate-100 transition-colors relative cursor-pointer">
                            <input type="file" accept="image/*" onChange={e => { if (e.target.files?.[0]) setPhotoUrl(URL.createObjectURL(e.target.files[0])); }} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                            {photoUrl ? <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm"><CheckCircle size={20} weight="fill" /> Photo uploaded successfully!</div> : <><UploadSimple size={28} className="text-slate-400 mb-2" /><p className="text-sm font-medium text-slate-700">Click to upload photo</p><p className="text-xs text-slate-400">White background, passport size</p></>}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col items-center">
                        <h3 className="font-heading text-base font-bold text-slate-900 w-full mb-4">Preview</h3>
                        <div className="w-[220px] bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                          {/* Header — Black (uniform colour) */}
                          <div className="p-2 flex items-center gap-2" style={{ backgroundColor: '#111111' }}>
                            <div className="relative w-6 h-6 shrink-0">
                              <img src="/assets/logo_png.png" alt="Logo" className="w-full h-full object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
                            </div>
                            <div>
                              <p className="text-[9px] font-bold text-white leading-none">PARK CIRCUS HIGH SCHOOL</p>
                              <p className="text-[7px] text-white/70">ESTD 1936 · GOVT SPONSORED</p>
                            </div>
                          </div>
                          <div className="flex p-2 gap-2">
                            <div className="w-14 bg-slate-100 border-2 border-slate-900 flex items-center justify-center overflow-hidden shrink-0" style={{ height: '72px' }}>
                              {photoUrl ? <img src={photoUrl} alt="Student" className="w-full h-full object-cover" /> : <UserCircle size={28} className="text-slate-400" weight="fill" />}
                            </div>
                            <div className="flex-1 text-[9px] space-y-0.5">
                              <p className="font-bold text-slate-900 text-[10px] uppercase leading-tight">{idForm.name}</p>
                              <p><span className="font-bold text-slate-500">Class:</span> {idForm.class}-{idForm.section}</p>
                              <p><span className="font-bold text-slate-500">Roll:</span> {idForm.rollNo}</p>
                              <p><span className="font-bold text-slate-500">Blood:</span> <span className="text-red-600 font-bold">{idForm.bloodGroup}</span></p>
                              <p><span className="font-bold text-slate-500">Ph:</span> {idForm.phone}</p>
                            </div>
                          </div>
                          <div className="p-1 text-center" style={{ backgroundColor: '#222222' }}><p className="text-[7px] text-white/90">{schoolInfo.contact.address}</p></div>
                        </div>

                        <div className="w-full mt-4 space-y-3">
                          <div className="flex items-start gap-2 text-xs text-amber-600 bg-amber-50 p-3 rounded-xl border border-amber-100"><WarningCircle size={15} className="shrink-0 mt-0.5" /><p>Upload a passport photo with white background before printing.</p></div>
                          <button onClick={() => window.print()} disabled={!photoUrl} className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-semibold py-3 rounded-xl hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                            <Printer size={18} /> {photoUrl ? "Generate & Print" : "Upload Photo First"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Print ID Card */}
      <div className="hidden print-only absolute top-0 left-0 w-full h-full bg-white z-[9999] p-8">
        <p className="text-xs mb-4 text-gray-500">Standard ID Card Size (3.375" × 2.125") — Cut along dotted line</p>
        <div className="w-[3.375in] h-[2.125in] border border-dashed border-gray-400 overflow-hidden relative">
          {/* Header — Black uniform colour */}
          <div className="w-full h-[0.45in] flex items-center justify-center gap-2 text-white px-2" style={{ backgroundColor: '#111111' }}>
            <div className="w-[0.38in] h-[0.38in] shrink-0">
              <img src="/assets/logo_png.png" alt="Logo" className="w-full h-full object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
            </div>
            <div>
              <p className="text-[11px] font-bold tracking-wide">PARK CIRCUS HIGH SCHOOL</p>
              <p className="text-[7px] opacity-75">ESTD 1936 · GOVT SPONSORED · WB</p>
            </div>
          </div>
          {/* Body */}
          <div className="flex px-2 py-2 h-[1.3in] bg-white">
            <div className="w-[0.8in] h-[1.1in] bg-gray-100 border-2 border-slate-800 shrink-0">{photoUrl && <img src={photoUrl} alt="Student" className="w-full h-full object-cover" />}</div>
            <div className="flex-1 pl-2 pt-1 text-[10px]">
              <h4 className="font-bold uppercase text-[13px] mb-1" style={{ color: '#111111' }}>{idForm.name}</h4>
              <div className="grid grid-cols-2 gap-x-1 gap-y-0.5">
                <div><span className="font-bold text-gray-600">DOB:</span> {idForm.dob}</div>
                <div><span className="font-bold text-gray-600">Blood:</span> <span className="text-red-600 font-bold">{idForm.bloodGroup}</span></div>
                <div><span className="font-bold text-gray-600">Class:</span> {idForm.class}-{idForm.section}</div>
                <div><span className="font-bold text-gray-600">Roll:</span> {idForm.rollNo}</div>
              </div>
              <div className="mt-1"><span className="font-bold text-gray-600">Emergency:</span> {idForm.phone}</div>
            </div>
          </div>
          {/* Footer — Dark gray */}
          <div className="absolute bottom-0 w-full h-[0.375in] flex flex-col justify-center items-center text-white px-2" style={{ backgroundColor: '#222222' }}>
            <p className="text-[8px]">{schoolInfo.contact.address}</p>
            <p className="text-[7px]">Ph: {schoolInfo.contact.phone1}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
