"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { schoolInfo } from "@/lib/data/school-info";
import {
  ChalkboardTeacher, CalendarCheck, FileText, Users, Megaphone,
  SignOut, Check, X, UploadSimple, BookOpen, PresentationChart,
  CheckCircle, ArrowLeft
} from "@phosphor-icons/react/dist/ssr";

const rosterData = [
  { roll: "01", name: "Aarav Sharma",   present: true  },
  { roll: "02", name: "Ananya Patel",   present: false },
  { roll: "03", name: "Bikram Roy",     present: true  },
  { roll: "04", name: "Deepika Sen",    present: true  },
  { roll: "05", name: "Farhan Shaikh",  present: true  },
  { roll: "06", name: "Gita Mondal",    present: false },
];

type View = "dashboard" | "attendance" | "grades" | "classes" | "notices";

export default function TeacherPortal() {
  const [view, setView] = useState<View>("dashboard");
  const [roster, setRoster] = useState(rosterData);
  const [marks, setMarks] = useState<Record<string, string>>(Object.fromEntries(rosterData.map(s => [s.roll, "75"])));
  const [attSaved, setAttSaved] = useState(false);
  const [marksSaved, setMarksSaved] = useState(false);
  const [noticeTitle, setNoticeTitle] = useState("");
  const [postedNotices, setPostedNotices] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [leaveReason, setLeaveReason] = useState("");
  const [leaveSubmitted, setLeaveSubmitted] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const presentCount = roster.filter(s => s.present).length;

  const navItems: { id: View; label: string; icon: React.ReactNode }[] = [
    { id: "dashboard",  label: "Dashboard",      icon: <ChalkboardTeacher size={20} weight="duotone" /> },
    { id: "attendance", label: "Mark Attendance", icon: <CalendarCheck size={20} weight="duotone" /> },
    { id: "grades",     label: "Grades Entry",    icon: <FileText size={20} weight="duotone" /> },
    { id: "classes",    label: "My Classes",      icon: <Users size={20} weight="duotone" /> },
    { id: "notices",    label: "Staff Notices",   icon: <Megaphone size={20} weight="duotone" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[9999] bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl text-sm font-semibold flex items-center gap-2 border border-white/10">
          <CheckCircle size={18} className="text-blue-400" weight="fill" /> {toast}
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 flex-col hidden lg:flex text-slate-300 sticky top-0 h-screen">
        {/* School Branding */}
        <div className="p-5 border-b border-slate-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="relative w-10 h-10 shrink-0">
              <svg viewBox="0 0 40 40" className="absolute inset-0 w-full h-full" aria-hidden="true">
                <circle cx="20" cy="20" r="19" fill="black" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
              </svg>
              <Image src="/assets/logo_png.png" alt="Logo" fill className="object-contain brightness-0 invert p-1 relative z-10" />
            </div>
            <div>
              <div className="font-heading font-bold text-sm text-white leading-tight">{schoolInfo.shortName}</div>
              <div className="text-[10px] text-slate-400">{schoolInfo.name}</div>
            </div>
          </div>
          <div className="text-xs text-blue-400 font-semibold uppercase tracking-wider bg-blue-500/10 px-3 py-1.5 rounded-lg">Staff Portal</div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all text-left ${
                view === item.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "hover:bg-slate-800 hover:text-white"
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-1">
          <div className="px-4 py-2 text-xs text-slate-500">
            <div className="font-bold text-slate-400">Mr. S. Mukherjee</div>
            <div>Dept. of Mathematics</div>
          </div>
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 font-semibold rounded-xl transition-colors">
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
                      <h1 className="font-heading text-3xl font-bold text-slate-900 mb-1">Good morning, Mr. Mukherjee!</h1>
                      <p className="text-slate-500">Department of Mathematics • Class Teacher: IX-A</p>
                    </div>
                    <div className="hidden md:block text-right">
                      <div className="text-sm font-bold text-slate-800">{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</div>
                      <div className="text-xs text-slate-500">2nd Semester</div>
                    </div>
                  </div>

                  {/* Action Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: "Mark Attendance", icon: <CalendarCheck size={24} weight="duotone" />, color: "bg-blue-50 text-blue-600", target: "attendance" as View },
                      { label: "Upload Grades",   icon: <PresentationChart size={24} weight="duotone" />, color: "bg-emerald-50 text-emerald-600", target: "grades" as View },
                      { label: "Post Notice",     icon: <Megaphone size={24} weight="duotone" />, color: "bg-amber-50 text-amber-600", target: "notices" as View },
                      { label: "Leave Request",   icon: <BookOpen size={24} weight="duotone" />, color: "bg-purple-50 text-purple-600", target: "classes" as View },
                    ].map((card, i) => (
                      <button key={i} onClick={() => setView(card.target)} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-3 group hover:-translate-y-1">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform ${card.color}`}>{card.icon}</div>
                        <div className="font-semibold text-slate-800 text-sm">{card.label}</div>
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8">
                      <h2 className="font-heading text-xl font-bold text-slate-900 mb-6">Today's Classes</h2>
                      <div className="space-y-3">
                        {[
                          { time: "10:30 AM", subject: "Mathematics", class: "Class IX - Sec A" },
                          { time: "12:00 PM", subject: "Mathematics", class: "Class XI - Science" },
                          { time: "02:30 PM", subject: "Mathematics", class: "Class X - Sec B" },
                        ].map((cls, idx) => (
                          <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                            <div className="flex items-center gap-4">
                              <div className="text-sm font-bold text-slate-500 w-20">{cls.time}</div>
                              <div>
                                <div className="font-semibold text-slate-800">{cls.class}</div>
                                <div className="text-xs text-blue-600 font-medium">{cls.subject}</div>
                              </div>
                            </div>
                            <button onClick={() => setView("attendance")} className="px-4 py-2 rounded-lg bg-blue-100 text-blue-700 text-xs font-bold hover:bg-blue-200 transition-colors">
                              Mark Attendance
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8">
                      <h2 className="font-heading text-xl font-bold text-slate-900 mb-6">Pending Tasks</h2>
                      <div className="space-y-3">
                        <div className="p-4 rounded-xl bg-rose-50 border border-rose-100">
                          <div className="font-semibold text-rose-800 text-sm">Upload Class XI internal marks</div>
                          <div className="text-xs text-rose-600 mt-1">Due Today</div>
                        </div>
                        <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
                          <div className="font-semibold text-amber-800 text-sm">Review syllabus completion status</div>
                          <div className="text-xs text-amber-600 mt-1">Due Friday</div>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 opacity-60">
                          <div className="font-semibold text-slate-600 text-sm line-through">Submit monthly attendance report</div>
                          <div className="text-xs text-slate-500 mt-1">Completed</div>
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
                    <div>
                      <h1 className="font-heading text-2xl font-bold text-slate-900">Mark Attendance</h1>
                      <p className="text-slate-500 text-sm">Class IX-A · {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</p>
                    </div>
                    <div className="ml-auto bg-blue-50 text-blue-700 text-sm font-bold px-4 py-2 rounded-full border border-blue-100">{presentCount}/{roster.length} Present</div>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                    <div className="space-y-3 mb-6">
                      {roster.map(student => (
                        <div key={student.roll} className={`flex items-center justify-between p-4 rounded-xl border transition-all ${student.present ? "bg-emerald-50 border-emerald-200" : "bg-rose-50 border-rose-200"}`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${student.present ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>{student.roll}</div>
                            <span className="font-semibold text-slate-900">{student.name}</span>
                          </div>
                          <button onClick={() => { setRoster(p => p.map(s => s.roll === student.roll ? { ...s, present: !s.present } : s)); setAttSaved(false); }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${student.present ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-rose-600 text-white hover:bg-rose-700"}`}>
                            {student.present ? <><Check size={14} weight="bold" /> Present</> : <><X size={14} weight="bold" /> Absent</>}
                          </button>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => { setAttSaved(true); showToast("Attendance saved for Class IX-A!"); }}
                      className={`w-full py-3 rounded-xl font-semibold transition-all ${attSaved ? "bg-emerald-500 text-white" : "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/25"}`}>
                      {attSaved ? "✓ Attendance Saved!" : "Save Attendance"}
                    </button>
                  </div>
                </>
              )}

              {/* ─── GRADES ─── */}
              {view === "grades" && (
                <>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setView("dashboard")} className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"><ArrowLeft size={20} /></button>
                    <div>
                      <h1 className="font-heading text-2xl font-bold text-slate-900">Grades Entry</h1>
                      <p className="text-slate-500 text-sm">Class IX-A · Half-Yearly Examination 2026</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                    <div className="grid grid-cols-3 gap-4 pb-3 border-b border-slate-100 mb-3">
                      <span className="text-xs font-bold text-slate-400 uppercase">Roll</span>
                      <span className="text-xs font-bold text-slate-400 uppercase">Student Name</span>
                      <span className="text-xs font-bold text-slate-400 uppercase">Marks (/100)</span>
                    </div>
                    <div className="space-y-3 mb-6">
                      {roster.map(student => (
                        <div key={student.roll} className="grid grid-cols-3 gap-4 items-center">
                          <span className="font-mono text-sm text-slate-500">{student.roll}</span>
                          <span className="font-semibold text-slate-900 text-sm">{student.name}</span>
                          <input
                            type="number" min="0" max="100"
                            value={marks[student.roll] ?? ""}
                            onChange={e => { setMarks(p => ({ ...p, [student.roll]: e.target.value })); setMarksSaved(false); }}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-center font-bold"
                          />
                        </div>
                      ))}
                    </div>
                    <button onClick={() => { setMarksSaved(true); showToast("Marks submitted for Class IX-A!"); }}
                      className={`w-full py-3 rounded-xl font-semibold transition-all ${marksSaved ? "bg-emerald-500 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}>
                      {marksSaved ? "✓ Marks Submitted!" : "Submit Marks"}
                    </button>
                  </div>
                </>
              )}

              {/* ─── MY CLASSES ─── */}
              {view === "classes" && (
                <>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setView("dashboard")} className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"><ArrowLeft size={20} /></button>
                    <div>
                      <h1 className="font-heading text-2xl font-bold text-slate-900">My Classes & Leave Request</h1>
                      <p className="text-slate-500 text-sm">Academic Year 2026–27</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                      <h2 className="font-heading text-lg font-bold text-slate-900 mb-4">Assigned Classes</h2>
                      <div className="space-y-3">
                        {[
                          { class: "IX-A", subject: "Mathematics", students: 42, room: "Room 102" },
                          { class: "X-B",  subject: "Mathematics", students: 38, room: "Room 105" },
                          { class: "XI Science", subject: "Mathematics", students: 35, room: "Room 201" },
                        ].map((c, i) => (
                          <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                            <div>
                              <div className="font-bold text-slate-900">Class {c.class}</div>
                              <div className="text-xs text-blue-600 font-medium">{c.subject} · {c.room}</div>
                            </div>
                            <div className="text-xs text-slate-500 font-semibold bg-white border border-slate-200 px-3 py-1 rounded-full">{c.students} students</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                      <h2 className="font-heading text-lg font-bold text-slate-900 mb-4">Leave Request</h2>
                      {leaveSubmitted ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
                          <CheckCircle size={48} className="text-emerald-500" weight="fill" />
                          <p className="font-bold text-slate-800">Leave Request Submitted</p>
                          <p className="text-slate-500 text-sm">The Headmaster will review and approve your request shortly.</p>
                          <button onClick={() => setLeaveSubmitted(false)} className="text-sm text-blue-600 font-semibold hover:underline mt-2">Submit another</button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Leave Type</label>
                            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
                              <option>Casual Leave</option><option>Medical Leave</option><option>Earned Leave</option>
                            </select>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">From Date</label>
                              <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">To Date</label>
                              <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Reason</label>
                            <textarea rows={3} value={leaveReason} onChange={e => setLeaveReason(e.target.value)} placeholder="State reason for leave..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none" />
                          </div>
                          <button onClick={() => { setLeaveSubmitted(true); showToast("Leave request sent to Headmaster!"); }} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all">
                            Submit Leave Request
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* ─── NOTICES ─── */}
              {view === "notices" && (
                <>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setView("dashboard")} className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"><ArrowLeft size={20} /></button>
                    <div>
                      <h1 className="font-heading text-2xl font-bold text-slate-900">Staff Notices</h1>
                      <p className="text-slate-500 text-sm">Post and view school notices</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                      <h2 className="font-heading text-lg font-bold text-slate-900 mb-4">Post a Notice</h2>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Notice Title</label>
                          <input value={noticeTitle} onChange={e => setNoticeTitle(e.target.value)} placeholder="e.g. Exam schedule change" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Category</label>
                          <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500">
                            <option>General</option><option>Examination</option><option>Event</option>
                          </select>
                        </div>
                        <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center text-center bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
                          <UploadSimple size={22} className="text-slate-400 mb-1" /><p className="text-xs font-medium text-slate-600">Attach PDF (Optional)</p>
                        </div>
                        <button onClick={() => { if (!noticeTitle.trim()) return showToast("Please enter a title."); setPostedNotices(p => [noticeTitle, ...p]); setNoticeTitle(""); showToast("Notice posted!"); }}
                          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all">
                          Post Notice
                        </button>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                      <h2 className="font-heading text-lg font-bold text-slate-900 mb-4">Recent Notices</h2>
                      <div className="space-y-3">
                        {[...postedNotices.map(n => ({ title: n, date: "Today", new: true })), { title: "Saraswati Puja Preparations", date: "Today", new: false }, { title: "Library Book Returns", date: "Yesterday", new: false }].map((n, i) => (
                          <div key={i} className={`border-l-4 pl-4 py-2 ${n.new ? "border-blue-500" : "border-slate-300"}`}>
                            <div className="text-xs text-slate-400 mb-0.5">{n.date} {n.new && <span className="text-blue-500 font-bold">• NEW</span>}</div>
                            <div className="font-semibold text-slate-800 text-sm">{n.title}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
