"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { IdentificationBadge, FileText, UsersThree, GraduationCap, CalendarBlank, DownloadSimple, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function AdmissionsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const steps = [
    { icon: <IdentificationBadge weight="duotone" size={28} />, title: "Registration", desc: "Download the admission form from our digital portal or collect it from the administrative office during working hours." },
    { icon: <FileText weight="duotone" size={28} />, title: "Document Submission", desc: "Submit the completed form along with birth certificate, previous academic records, and identification documents." },
    { icon: <UsersThree weight="duotone" size={28} />, title: "Interaction", desc: "Shortlisted candidates will be called for a brief interaction along with their guardians to understand their academic background." },
    { icon: <GraduationCap weight="duotone" size={28} />, title: "Enrollment", desc: "Upon successful selection, complete the fee payment and uniform measurement to finalize the enrollment." }
  ];

  return (
    <>
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24 px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center"
          >
            {/* Header Block */}
            <motion.div variants={itemVariants} className="mb-12 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-600 text-xs font-semibold tracking-wide mb-6">
                <IdentificationBadge weight="fill" /> Admissions
              </div>
              <h1 className="font-heading text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight mb-8">
                Join our <span className="text-amber-500">community.</span>
              </h1>

              {/* Admission Timeline Banner */}
              <div className="glass-card p-6 bg-amber-50/50 border border-amber-100 flex flex-col md:flex-row items-center justify-between gap-6 mb-12 text-left w-full">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                    <CalendarBlank size={24} weight="duotone" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-slate-900 mb-1">Admission Schedule (2026-2027)</h3>
                    <p className="text-sm text-slate-600 font-medium">As per West Bengal Government norms, admissions for Class V - IX typically occur between <strong className="text-slate-800">December and January</strong>. Class XI admissions commence in <strong className="text-slate-800">June</strong> following the Madhyamik results.</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center mb-16">
                <Link href="/apply" className="flex items-center gap-2 bg-amber-500 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-amber-600 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-amber-500/30">
                  Apply Online <ArrowRight weight="bold" />
                </Link>
                <a href="/assets/admission_form_placeholder.pdf" download className="flex items-center gap-2 bg-white text-slate-700 font-semibold px-8 py-3.5 rounded-full border border-slate-200 hover:bg-slate-50 hover:text-amber-600 hover:border-amber-200 transition-colors shadow-sm">
                  <DownloadSimple weight="bold" /> Download Offline Form
                </a>
              </div>
            </motion.div>

            {/* Timeline Block */}
            <motion.div variants={itemVariants} className="w-full glass-card p-8 md:p-12 relative">
              {/* Vertical line connecting steps */}
              <div className="absolute left-12 md:left-20 top-20 bottom-20 w-px bg-slate-200 z-0 hidden sm:block"></div>
              
              <div className="space-y-8 relative z-10">
                {steps.map((item, index) => (
                  <div key={index} className="flex flex-col sm:flex-row gap-6 items-start">
                    <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 shadow-sm border border-amber-200/50">
                      {item.icon}
                    </div>
                    <div className="pt-2">
                      <div className="text-xs font-bold text-amber-500 mb-1 uppercase tracking-wider">Step 0{index + 1}</div>
                      <h3 className="font-heading text-2xl font-bold text-slate-800 mb-2">{item.title}</h3>
                      <p className="font-sans text-slate-600 leading-relaxed max-w-xl">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </motion.div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
