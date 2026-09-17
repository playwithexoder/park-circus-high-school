"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Buildings, Desktop, Books, Basketball } from "@phosphor-icons/react/dist/ssr";

export default function FacilitiesPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const facilities = [
    { icon: <Buildings size={32} weight="duotone" />, title: "11 Classrooms", desc: "Spacious and well-maintained classrooms for instructional purposes within our private building.", color: "text-blue-500 bg-blue-50" },
    { icon: <Books size={32} weight="duotone" />, title: "Central Library", desc: "Our library contains a collection of 327 books, providing academic and reference materials to support learning.", color: "text-amber-500 bg-amber-50" },
    { icon: <Desktop size={32} weight="duotone" />, title: "Computer Aided Learning", desc: "Equipped with IT infrastructure to equip students with essential digital skills.", color: "text-emerald-500 bg-emerald-50" },
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
            <motion.div variants={itemVariants} className="mb-12 text-center flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold tracking-wide mb-6">
                <Buildings weight="fill" /> Infrastructure
              </div>
              <h1 className="font-heading text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
                Our <span className="text-slate-500">Facilities</span>
              </h1>
            </motion.div>

            {/* Facilities Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {facilities.map((fac, idx) => (
                <div key={idx} className="glass-card p-8 flex flex-col items-start hover:-translate-y-1 transition-transform duration-300">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${fac.color}`}>
                    {fac.icon}
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-slate-900 mb-2">{fac.title}</h3>
                  <p className="font-sans text-slate-600 leading-relaxed">{fac.desc}</p>
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
