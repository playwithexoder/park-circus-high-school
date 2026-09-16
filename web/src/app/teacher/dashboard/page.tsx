"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { schoolInfo } from "@/lib/data/school-info";
import {
  ChalkboardTeacher, UsersThree, CalendarCheck, BookOpen,
  PresentationChart, CheckCircle, SignOut, Bell, X, Check,
  UploadSimple, Student
} from "@phosphor-icons/react/dist/ssr";

const initialRoster = [
  { roll: "01", name: "Aarav Sharma",  present: true,  marks: "85" },
  { roll: "02", name: "Ananya Patel",  present: false, marks: "78" },
  { roll: "03", name: "Bikram Roy",    present: true,  marks: "91" },
  { roll: "04", name: "Deepika Sen",   present: true,  marks: "94" },
  { roll: "05", name: "Farhan Shaikh", present: true,  marks: "72" },
];

type Tab = "attendance" | "marks" | "material";

export default function TeacherDashboard() {
  const [roster, setRoster] = useState(initialRoster);
  const [activeTab, setActiveTab] = useState<Tab>("attendance");
  const [editMarks, setEditMarks] = useState<Record<string, string>>(
    Object.fromEntries(initialRoster.map(s => [s.roll, s.marks]))
  );
  const [marksSaved, setMarksSaved] = useState(false);
  const [attSaved, setAttSaved] = useState(false);
  const [materialName, setMaterialName] = useState("");
  const [materials, setMaterials] = useState([
    { name: "Chapter 5 - Quadratic Equations.pdf", date: "10 Sep 2026" },
    { name: "Mid-Term Practice Paper 2026.pdf", date: "8 Sep 2026" },
  ]);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const toggleAttendance = (roll: string) => {
    setRoster(prev => prev.map(s => s.roll === roll ? { ...s, present: !s.present } : s));
  };

  const saveAttendance = () => {
    setAttSaved(true);
    showToast("Attendance saved for Class IX-A!");
    setTimeout(() => setAttSaved(false), 3000);
  };

  const saveMarks = () => {
    setRoster(prev => prev.map(s => ({ ...s, marks: editMarks[s.roll] || s.marks })));
    setMarksSaved(true);
    showToast("Marks saved successfully!");
    setTimeout(() => setMarksSaved(false), 3000);
  };

  const uploadMaterial = () => {
    if (!materialName.trim()) return showToast("Please enter a material name.");
    setMaterials(prev => [{ name: materialName, date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) }, ...prev]);
    setMaterialName("");
    showToast("Study material uploaded!");
  };

  const presentCount = roster.filter(s => s.present).length;

  return (
    <div className="min-h-screen bg-indigo-50/30 flex flex-col">
      {/* School Branding Header — Indigo theme for Teacher */}
      <header className="bg-indigo-950 text-white sticky top-0 z-50 shadow-xl shadow-indigo-900/50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-10 h-10 shrink-0">
              <Image src="/assets/logo_png.png" alt="Logo" fill className="object-contain brightness-0 invert" />
            </div>
            <div>
              <p className="font-heading font-bold text-white text-base leading-tight">{schoolInfo.name}</p>
              <p className="text-xs text-indigo-300">Teacher's Academic Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Bell size={20} className="text-indigo-400 hover:text-white cursor-pointer transition-colors" />
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">SM</div>
            <Link href="/dev-portal" className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-white transition-colors">
              <SignOut size={16} /> Exit Portal
            </Link>
          </div>
        </div>
        {/* Role & Context Strip */}
        <div className="border-t border-white/10 bg-indigo-900/40">
          <div className="max-w-7xl mx-auto px-6 py-1.5 flex items-center gap-2 flex-wrap">
            <ChalkboardTeacher size={14} className="text-indigo-400" weight="fill" />
            <span className="text-xs font-semibold text-indigo-300">MR. S. MUKHERJEE · MATHEMATICS</span>
            <span className="text-indigo-700 text-xs mx-2">|</span>
            <span className="text-xs text-indigo-400">Class Teacher: IX-A &nbsp;•&nbsp; Academic Year 2026–27</span>
            <span className="ml-auto text-xs font-bold text-indigo-300">{presentCount}/{roster.length} Present Today</span>
          </div>
        </div>
      </header>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[9999] bg-indigo-900 text-white px-5 py-3 rounded-2xl shadow-2xl text-sm font-semibold flex items-center gap-2 border border-white/10">
          <CheckCircle size={18} className="text-indigo-400" weight="fill" /> {toast}
        </div>
      )}

      <main className="flex-1 px-6 py-8 max-w-7xl mx-auto w-full">
        <h1 className="font-heading text-2xl font-bold text-slate-900 mb-1">Good Morning, Mr. Mukherjee</h1>
        <p className="text-slate-500 text-sm mb-8">Today's Date: {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}</p>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-indigo-100 border-t-4 border-t-indigo-500 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center"><Student weight="fill" size={20} /></div>
            <div><p className="text-xs font-bold text-slate-500 uppercase">My Students</p><p className="text-xl font-bold text-slate-900">{roster.length}</p></div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-emerald-100 border-t-4 border-t-emerald-500 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center"><CheckCircle size={20} weight="duotone" /></div>
            <div><p className="text-xs font-bold text-slate-500 uppercase">Present</p><p className="text-xl font-bold text-slate-900">{presentCount}</p></div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-rose-100 border-t-4 border-t-rose-500 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center"><X size={20} weight="bold" /></div>
            <div><p className="text-xs font-bold text-slate-500 uppercase">Absent</p><p className="text-xl font-bold text-slate-900">{roster.length - presentCount}</p></div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-purple-100 border-t-4 border-t-purple-500 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center"><BookOpen size={20} weight="duotone" /></div>
            <div><p className="text-xs font-bold text-slate-500 uppercase">Materials</p><p className="text-xl font-bold text-slate-900">{materials.length}</p></div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm w-fit">
          {([
            { id: "attendance", label: "Mark Attendance", icon: <CalendarCheck size={16} /> },
            { id: "marks", label: "Enter Marks", icon: <PresentationChart size={16} /> },
            { id: "material", label: "Study Materials", icon: <BookOpen size={16} /> },
          ] as const).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === tab.id ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25" : "text-slate-600 hover:bg-slate-100"}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">

            {/* Attendance Tab */}
            {activeTab === "attendance" && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center"><CalendarCheck size={20} weight="duotone" /></div>
                    <h2 className="font-heading text-lg font-bold text-slate-900">Today's Attendance · Class IX-A</h2>
                  </div>
                  <span className="text-sm font-semibold text-slate-500">{presentCount}/{roster.length} Present</span>
                </div>
                <div className="space-y-2 mb-6">
                  {roster.map(student => (
                    <div key={student.roll} className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${student.present ? "bg-emerald-50 border-emerald-100" : "bg-rose-50 border-rose-100"}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${student.present ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>{student.roll}</div>
                        <span className="font-semibold text-slate-900 text-sm">{student.name}</span>
                      </div>
                      <button
                        onClick={() => toggleAttendance(student.roll)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${student.present ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-rose-600 text-white hover:bg-rose-700"}`}
                      >
                        {student.present ? <><Check size={13} weight="bold" /> Present</> : <><X size={13} weight="bold" /> Absent</>}
                      </button>
                    </div>
                  ))}
                </div>
                <button onClick={saveAttendance} className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${attSaved ? "bg-emerald-500 text-white" : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/25"}`}>
                  {attSaved ? "✓ Attendance Saved" : "Save Attendance"}
                </button>
              </div>
            )}

            {/* Marks Tab */}
            {activeTab === "marks" && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center"><PresentationChart size={20} weight="duotone" /></div>
                  <h2 className="font-heading text-lg font-bold text-slate-900">Enter Exam Marks · Class IX-A</h2>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="grid grid-cols-3 gap-4 pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-400 uppercase">Student</span>
                    <span className="text-xs font-bold text-slate-400 uppercase">Roll</span>
                    <span className="text-xs font-bold text-slate-400 uppercase">Marks (/100)</span>
                  </div>
                  {roster.map(student => (
                    <div key={student.roll} className="grid grid-cols-3 gap-4 items-center py-2 border-b border-slate-50 last:border-0">
                      <span className="font-semibold text-slate-900 text-sm">{student.name}</span>
                      <span className="text-sm text-slate-500">{student.roll}</span>
                      <input
                        type="number" min="0" max="100"
                        value={editMarks[student.roll] || ""}
                        onChange={e => setEditMarks(prev => ({ ...prev, [student.roll]: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-center font-bold"
                      />
                    </div>
                  ))}
                </div>
                <button onClick={saveMarks} className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${marksSaved ? "bg-emerald-500 text-white" : "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/25"}`}>
                  {marksSaved ? "✓ Marks Saved" : "Save Marks"}
                </button>
              </div>
            )}

            {/* Study Material Tab */}
            {activeTab === "material" && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center"><BookOpen size={20} weight="duotone" /></div>
                  <h2 className="font-heading text-lg font-bold text-slate-900">Upload Study Material</h2>
                </div>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Material Name / Title</label>
                    <input value={materialName} onChange={e => setMaterialName(e.target.value)} placeholder="e.g. Chapter 6 Notes.pdf" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20" />
                  </div>
                  <div className="border-2 border-dashed border-purple-200 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-purple-50/50 hover:bg-purple-50 transition-colors cursor-pointer">
                    <UploadSimple size={28} className="text-purple-400 mb-2" />
                    <p className="text-sm font-medium text-purple-700">Click to select file</p>
                    <p className="text-xs text-purple-400 mt-1">PDF, DOC, JPG — Max 10MB</p>
                  </div>
                  <button onClick={uploadMaterial} className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm transition-all shadow-md shadow-purple-600/25">
                    Upload Material
                  </button>
                </div>
                <h3 className="font-semibold text-slate-700 text-sm mb-3">Uploaded Materials</h3>
                <div className="space-y-2">
                  {materials.map((m, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-red-600 text-xs font-bold">PDF</div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{m.name}</p>
                          <p className="text-xs text-slate-500">{m.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Schedule */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center"><CalendarCheck size={20} weight="duotone" /></div>
                <h3 className="font-heading text-base font-bold text-slate-900">Today's Schedule</h3>
              </div>
              <div className="space-y-4">
                {[
                  { time: "10:40–11:20 AM", subject: "Mathematics", class: "Class IX-A", room: "Room 102", active: true },
                  { time: "11:20–12:00 PM", subject: "Mathematics", class: "Class X-B", room: "Room 105", active: false },
                  { time: "12:00–12:40 PM", subject: "Tiffin Break", class: "—", room: "—", active: false },
                  { time: "12:40–01:20 PM", subject: "Free Period", class: "Duty", room: "Ground Floor", active: false },
                ].map((p, i) => (
                  <div key={i} className={`relative pl-5 pb-4 last:pb-0 border-l-2 ${p.active ? "border-indigo-500" : "border-slate-200"}`}>
                    <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white ${p.active ? "bg-indigo-500" : "bg-slate-300"}`}></div>
                    <p className={`text-xs font-bold mb-0.5 ${p.active ? "text-indigo-600" : "text-slate-400"}`}>{p.time}</p>
                    <p className={`text-sm font-bold ${p.active ? "text-slate-900" : "text-slate-600"}`}>{p.subject}</p>
                    <p className="text-xs text-slate-400">{p.class} · {p.room}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="font-heading text-base font-bold text-slate-900 mb-4">Quick Links</h3>
              <div className="space-y-2">
                {[
                  { label: "Class Attendance History", href: "#" },
                  { label: "Exam Results Archive", href: "/academics" },
                  { label: "School Notices", href: "/notices" },
                  { label: "Dev Portal", href: "/dev-portal" },
                ].map((link, i) => (
                  <Link key={i} href={link.href} className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50 transition-colors text-sm font-semibold text-slate-700 hover:text-indigo-700">
                    {link.label} <span className="text-slate-400 text-xs">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
