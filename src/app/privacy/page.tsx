"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { ShieldCheck, LockKey, FileText, Checks } from "@phosphor-icons/react/dist/ssr";

export default function PrivacyPage() {
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
            {/* Header */}
            <motion.div variants={itemVariants} className="mb-12 text-center flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold tracking-wide mb-6">
                <ShieldCheck weight="fill" /> DPDP Act 2023 Compliant
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
                Privacy Policy & <span className="text-slate-600">Data Protection</span>
              </h1>
              <p className="mt-4 font-sans text-slate-500 max-w-2xl text-center">
                Park Circus High School is committed to protecting the privacy of our students, parents, and staff in accordance with the Digital Personal Data Protection (DPDP) Act, 2023.
              </p>
            </motion.div>

            {/* Content Sections */}
            <motion.div variants={itemVariants} className="glass-card p-8 md:p-12 space-y-12">
              
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <LockKey size={20} weight="fill" />
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900">1. Data Fiduciary Responsibility</h2>
                </div>
                <div className="pl-13 space-y-4 text-slate-600 font-sans leading-relaxed">
                  <p>As a government-aided educational institution, Park Circus High School acts as a Data Fiduciary. We collect and process personal data solely for educational, administrative, and statutory compliance purposes as mandated by the School Education Department, Government of West Bengal, WBBSE, and WBCHSE.</p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <Checks size={20} weight="fill" />
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900">2. Verifiable Parental Consent</h2>
                </div>
                <div className="pl-13 space-y-4 text-slate-600 font-sans leading-relaxed">
                  <p>In strict compliance with the DPDP Act 2023, the processing of any personal data belonging to a child (under 18 years of age) requires clear, verifiable consent from a parent or lawful guardian.</p>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li><strong>Admission Data:</strong> Data collected during admission is processed under the legal basis of fulfilling educational obligations and state mandates (e.g., UDISE+, Kanyashree).</li>
                    <li><strong>Media & Publications:</strong> Photographs, videos, and names of students will only be published on this website, social media, or school magazines with explicit, opt-in parental consent.</li>
                  </ul>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                    <FileText size={20} weight="fill" />
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900">3. Purpose Limitation & Data Minimization</h2>
                </div>
                <div className="pl-13 space-y-4 text-slate-600 font-sans leading-relaxed">
                  <p>We do not collect unnecessary data. All data collected is strictly limited to the purpose for which it was obtained. We expressly prohibit any form of behavioral monitoring, tracking, or targeted profiling of our students.</p>
                  <p>Data will be retained only as long as necessary to fulfill its purpose or as required by state archiving laws.</p>
                </div>
              </section>

              <section className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">Grievance Redressal & Consent Withdrawal</h3>
                <p className="text-sm text-slate-600 mb-4">Parents/Guardians have the right to access, correct, or withdraw consent for the processing of their ward's non-statutory data at any time.</p>
                <p className="text-sm text-slate-600 font-semibold">For any privacy concerns, contact our designated Data Protection Officer / Headmaster:</p>
                <p className="text-sm text-indigo-600 mt-1">headmaster@parkcircushighschool.edu.in | +91 33 2284 XXXX</p>
              </section>

            </motion.div>

          </motion.div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
