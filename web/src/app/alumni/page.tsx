"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Student, ArrowRight } from "@phosphor-icons/react/dist/ssr";

export default function AlumniPage() {
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
        <div className="container mx-auto max-w-5xl">
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-8"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center flex flex-col items-center mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-600 text-xs font-semibold tracking-wide mb-6">
                <Student weight="fill" /> Our Legacy
              </div>
              <h1 className="font-heading text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
                Alumni <span className="text-amber-500">Association.</span>
              </h1>
            </motion.div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants} className="glass-card p-10 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-amber-50 rounded-full blur-3xl -z-10 opacity-70"></div>
                <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">Reconnect & Inspire</h2>
                <p className="font-sans text-slate-600 mb-6 leading-relaxed">
                  Our alumni are our greatest pride. Spread across the globe, they carry the values and excellence of our institution wherever they go. The Alumni Association serves as a bridge to stay connected, mentor current students, and give back to the alma mater.
                </p>
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-amber-500/20">
                  Register Now <ArrowRight weight="bold" />
                </button>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-6">
                <div className="glass-card p-8 hover:-translate-y-1 transition-transform duration-300">
                  <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">Upcoming Events</h3>
                  <p className="text-sm text-slate-500 mb-4">Join us for the Annual Alumni Meet this December. Details will be shared via email for registered members.</p>
                  <div className="text-amber-600 font-semibold text-sm cursor-pointer hover:underline">View Calendar →</div>
                </div>

                <div className="glass-card p-8 bg-gradient-to-br from-amber-50 to-orange-50 hover:-translate-y-1 transition-transform duration-300">
                  <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">Mentorship Program</h3>
                  <p className="text-sm text-slate-600">
                    Guide our current students in their career paths. Your experience can shape the next generation.
                  </p>
                </div>
              </motion.div>
            </div>

          </motion.div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
