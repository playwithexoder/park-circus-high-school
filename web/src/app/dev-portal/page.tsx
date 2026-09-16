"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Terminal, ShieldCheck, UserCircle, ChalkboardTeacher } from "@phosphor-icons/react/dist/ssr";

export default function DevPortalPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <>
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24 px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col"
          >
            {/* Header Block */}
            <motion.div variants={itemVariants} className="mb-12 text-center flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold tracking-wide mb-6">
                <Terminal weight="fill" /> Localhost Testing
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
                Developer <span className="text-slate-600">Test Hub</span>
              </h1>
              <p className="mt-4 font-sans text-slate-500 max-w-2xl text-center">
                Use these mock credentials to test role-based access once the Supabase backend is integrated. These accounts do not grant real-world access.
              </p>
            </motion.div>

            {/* Test Credentials Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Admin Card */}
              <div className="glass-card p-8 border-t-4 border-t-rose-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-600">
                    <ShieldCheck size={24} weight="duotone" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-slate-900">Headmaster</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email ID</p>
                    <code className="px-2 py-1 bg-slate-100 text-slate-800 rounded text-sm select-all">admin@parkcircus.edu</code>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Password</p>
                    <code className="px-2 py-1 bg-slate-100 text-slate-800 rounded text-sm select-all">Admin@2026test</code>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500">
                    Permissions: Upload notices, approve applications, manage staff.
                  </div>
                </div>
              </div>

              {/* Teacher Card */}
              <div className="glass-card p-8 border-t-4 border-t-indigo-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <ChalkboardTeacher size={24} weight="duotone" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-slate-900">Teacher</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email ID</p>
                    <code className="px-2 py-1 bg-slate-100 text-slate-800 rounded text-sm select-all">teacher@parkcircus.edu</code>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Password</p>
                    <code className="px-2 py-1 bg-slate-100 text-slate-800 rounded text-sm select-all">Teacher@2026test</code>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500">
                    Permissions: View student roster, update marks, upload study materials.
                  </div>
                </div>
              </div>

              {/* Student Card */}
              <div className="glass-card p-8 border-t-4 border-t-emerald-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <UserCircle size={24} weight="duotone" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-slate-900">Student</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Student ID</p>
                    <code className="px-2 py-1 bg-slate-100 text-slate-800 rounded text-sm select-all">STU-2026-001</code>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Password</p>
                    <code className="px-2 py-1 bg-slate-100 text-slate-800 rounded text-sm select-all">Student@2026test</code>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500">
                    Permissions: View results, download syllabus, check attendance.
                  </div>
                </div>
              </div>

            </motion.div>

          </motion.div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
