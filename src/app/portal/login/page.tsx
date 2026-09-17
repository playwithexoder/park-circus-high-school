"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Student, ChalkboardTeacher, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [role, setRole] = useState<'student' | 'teacher' | null>(null);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'student') router.push('/portal/student');
    if (role === 'teacher') router.push('/portal/teacher');
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 px-6 lg:px-8 min-h-screen bg-slate-50 flex flex-col justify-center">
        <div className="container mx-auto max-w-4xl">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-10 md:p-14 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -z-10 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-10 opacity-50"></div>

            <div className="text-center mb-10">
              <h1 className="font-heading text-4xl font-bold text-slate-900 mb-2">Welcome Back</h1>
              <p className="text-slate-500 font-sans">Select your role to access the portal</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {/* Student Role Card */}
              <div 
                onClick={() => setRole('student')}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col items-center gap-4 ${role === 'student' ? 'border-emerald-500 bg-emerald-50 shadow-md shadow-emerald-500/10 scale-105' : 'border-slate-100 bg-white hover:border-emerald-200 hover:bg-slate-50'}`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${role === 'student' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                  <Student size={32} weight="duotone" />
                </div>
                <div className="text-center">
                  <h3 className="font-heading font-bold text-slate-900 text-lg">Student</h3>
                  <p className="text-xs text-slate-500">Access timetable & grades</p>
                </div>
              </div>

              {/* Teacher Role Card */}
              <div 
                onClick={() => setRole('teacher')}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col items-center gap-4 ${role === 'teacher' ? 'border-blue-500 bg-blue-50 shadow-md shadow-blue-500/10 scale-105' : 'border-slate-100 bg-white hover:border-blue-200 hover:bg-slate-50'}`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${role === 'teacher' ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                  <ChalkboardTeacher size={32} weight="duotone" />
                </div>
                <div className="text-center">
                  <h3 className="font-heading font-bold text-slate-900 text-lg">Teacher / Staff</h3>
                  <p className="text-xs text-slate-500">Manage classes & attendance</p>
                </div>
              </div>
            </div>

            <AnimatePresence mode="popLayout">
              {role && (
                <motion.form 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={handleLogin}
                  className="max-w-md mx-auto space-y-4"
                >
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">User ID</label>
                    <input type="text" required placeholder={`Enter your ${role} ID`} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Password</label>
                    <input type="password" required placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow" />
                  </div>
                  <button type="submit" className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all ${role === 'student' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'} shadow-lg`}>
                    Sign In to Portal <ArrowRight weight="bold" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
