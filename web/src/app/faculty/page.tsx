"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { UsersThree, ChalkboardTeacher } from "@phosphor-icons/react/dist/ssr";

export default function FacultyPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const faculty = [
    { name: "Dr. A. Rahman", role: "Headmaster", subject: "Administration" },
    { name: "Mr. S. Chatterjee", role: "Senior Teacher", subject: "Mathematics" },
    { name: "Mrs. N. Khan", role: "Teacher", subject: "Physics" },
    { name: "Mr. D. Sen", role: "Teacher", subject: "English" },
    { name: "Mrs. R. Das", role: "Teacher", subject: "History" },
    { name: "Mr. K. Ali", role: "Teacher", subject: "Chemistry" },
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold tracking-wide mb-6">
                <ChalkboardTeacher weight="fill" /> Our Staff
              </div>
              <h1 className="font-heading text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
                Meet our <span className="text-blue-600">Faculty</span>
              </h1>
              <p className="mt-4 font-sans text-lg text-slate-600 max-w-2xl text-center">
                Dedicated professionals shaping the minds of tomorrow through experience, patience, and excellence.
              </p>
            </motion.div>

            {/* Faculty Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {faculty.map((member, idx) => (
                <div key={idx} className="glass-card p-6 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4 border border-slate-200">
                    <UsersThree size={32} weight="duotone" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                  <p className="font-sans text-sm font-semibold text-blue-600 mb-1">{member.role}</p>
                  <p className="font-sans text-xs text-slate-500 uppercase tracking-wider">{member.subject}</p>
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
