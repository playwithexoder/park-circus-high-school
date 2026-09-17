"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { schoolInfo } from "@/lib/data/school-info";
import { motion } from "framer-motion";
import { Desktop, UserCircle } from "@phosphor-icons/react/dist/ssr";

export default function HoiDeskPage() {
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
            className="flex flex-col gap-8"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center flex flex-col items-center mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold tracking-wide mb-6">
                <Desktop weight="fill" /> Leadership
              </div>
              <h1 className="font-heading text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
                HOI <span className="text-blue-600">Desk.</span>
              </h1>
            </motion.div>

            {/* Content */}
            <motion.div variants={itemVariants} className="glass-card p-10 md:p-14 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-10 opacity-50"></div>
              
              <div className="flex flex-col md:flex-row gap-10 items-start">
                <div className="w-32 h-32 shrink-0 bg-slate-100 rounded-full flex items-center justify-center border-4 border-white shadow-xl shadow-slate-200/50">
                  <UserCircle size={80} weight="duotone" className="text-slate-400" />
                </div>
                
                <div className="flex-1 space-y-6 text-slate-600 font-sans text-lg leading-relaxed">
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-2">Message from the Head of Institution</h2>
                  <p>
                    Welcome to the official digital platform of <strong>{schoolInfo.name}</strong>. It is with immense pride and a deep sense of responsibility that I address you. Since {schoolInfo.established}, our institution has stood as a beacon of knowledge and character development in Kolkata.
                  </p>
                  <p>
                    Our mission goes beyond imparting syllabus-based education; we strive to cultivate intellectual curiosity, moral integrity, and social responsibility in our students. We believe that true education (শিক্ষা) is the foundation of civilization (সভ্যতা), which in turn fosters humanity (মানবতা).
                  </p>
                  <p>
                    I invite parents, alumni, and well-wishers to join hands with us in shaping the bright futures of our students. Together, we will continue our legacy of excellence.
                  </p>
                  
                  <div className="pt-6 border-t border-slate-100 mt-8">
                    <p className="font-heading font-bold text-slate-900">Head of Institution</p>
                    <p className="text-sm text-slate-500">{schoolInfo.name}</p>
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
