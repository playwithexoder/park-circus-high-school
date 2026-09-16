"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Bell, MagnifyingGlass, ArrowRight, ShieldCheck, FilePdf, CaretDown } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";

export default function NoticesPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const [isDisclosureOpen, setIsDisclosureOpen] = useState(true);

  const notices = [
    { id: 1, title: "Higher Secondary Pre-Test Examination Schedule", date: "15 Sep 2026", category: "Academics", color: "text-blue-600 bg-blue-50 border-blue-100" },
    { id: 2, title: "Instructions for Kanyashree Prakalpa Renewal", date: "10 Sep 2026", category: "Admin", color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
    { id: 3, title: "School Uniform Guidelines for Winter Session", date: "05 Sep 2026", category: "General", color: "text-slate-600 bg-slate-100 border-slate-200" },
    { id: 4, title: "Inter-school Debate Competition Nominations", date: "01 Sep 2026", category: "Events", color: "text-amber-600 bg-amber-50 border-amber-100" },
    { id: 5, title: "Notice Regarding Guardian Meeting for Class X", date: "28 Aug 2026", category: "Admin", color: "text-emerald-600 bg-emerald-50 border-emerald-100" }
  ];

  return (
    <>
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24 px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col"
          >
            {/* Header Block */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold tracking-wide mb-6">
                  <Bell weight="fill" /> Official Board
                </div>
                <h1 className="font-heading text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
                  Notice <span className="text-indigo-600">Board</span>
                </h1>
              </div>

              <div className="relative w-full md:w-72">
                <MagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search notices..." 
                  className="w-full glass-pill pl-12 pr-6 py-3 font-sans text-sm text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-400"
                />
              </div>
            </motion.div>

            {/* Mandatory Public Disclosure (Appendix-IX) */}
            <motion.div variants={itemVariants} className="mb-12">
              <div 
                className="glass-card border-amber-200/50 overflow-hidden cursor-pointer"
                onClick={() => setIsDisclosureOpen(!isDisclosureOpen)}
              >
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                      <ShieldCheck size={24} weight="duotone" className="text-amber-600" />
                    </div>
                    <div>
                      <h2 className="font-heading text-xl font-bold text-slate-900">Mandatory Public Disclosure</h2>
                      <p className="text-sm text-slate-600">Statutory documents as per RTE Act & Board Guidelines (Appendix-IX)</p>
                    </div>
                  </div>
                  <motion.div animate={{ rotate: isDisclosureOpen ? 180 : 0 }}>
                    <CaretDown size={24} className="text-amber-600" />
                  </motion.div>
                </div>
                
                <motion.div 
                  initial={false}
                  animate={{ height: isDisclosureOpen ? "auto" : 0, opacity: isDisclosureOpen ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border-t border-amber-100/50">
                    {[
                      "Affiliation / Upgradation Letter",
                      "Society / Trust Registration Certificate",
                      "No Objection Certificate (NOC)",
                      "RTE Recognition Certificate",
                      "Building Safety Certificate",
                      "Fire Safety Certificate",
                      "Water, Health & Sanitation Certificate",
                      "Academic Calendar 2026-27",
                      "Last 3-Year Board Results"
                    ].map((doc, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 hover:border-amber-200 hover:bg-amber-50/30 transition-colors group">
                        <FilePdf size={24} weight="duotone" className="text-red-400 shrink-0 group-hover:text-red-500" />
                        <span className="text-sm font-medium text-slate-700 leading-snug">{doc}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* General Notices Header */}
            <motion.div variants={itemVariants} className="mb-6 flex items-center gap-3">
              <h3 className="font-heading text-2xl font-bold text-slate-900">General Notices</h3>
              <div className="h-px flex-1 bg-slate-200"></div>
            </motion.div>

            {/* Notices List */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 gap-4">
              {notices.map((notice) => (
                <div 
                  key={notice.id}
                  className="group flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 glass-card hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 cursor-pointer"
                >
                  <div className="flex-1 pr-8">
                    <span className={`inline-block px-3 py-1 border rounded-full text-[10px] font-sans font-bold uppercase tracking-wider mb-4 ${notice.color}`}>
                      {notice.category}
                    </span>
                    <h4 className="font-heading text-2xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                      {notice.title}
                    </h4>
                  </div>
                  <div className="mt-6 md:mt-0 flex items-center justify-between md:flex-col md:items-end md:justify-center gap-4 shrink-0">
                    <span className="font-mono text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">{notice.date}</span>
                    <button className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-200 transition-all">
                      <ArrowRight weight="bold" />
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>

          </motion.div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
