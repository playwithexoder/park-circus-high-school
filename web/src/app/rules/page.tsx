"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Scales, ShieldCheck, Clock, ShirtFolded } from "@phosphor-icons/react/dist/ssr";

export default function RulesPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const rules = [
    {
      icon: <Clock size={24} weight="duotone" className="text-blue-500" />,
      title: "Punctuality & Attendance",
      description: "Students must arrive at school by 10:30 AM. Minimum 75% attendance is mandatory to appear for final examinations. Absences require a signed note from parents."
    },
    {
      icon: <ShirtFolded size={24} weight="duotone" className="text-indigo-500" />,
      title: "Uniform & Grooming",
      description: "Students must wear the prescribed school uniform neatly ironed. Proper footwear and ID cards are mandatory. Unconventional hairstyles are strictly prohibited."
    },
    {
      icon: <ShieldCheck size={24} weight="duotone" className="text-emerald-500" />,
      title: "Discipline & Conduct",
      description: "Respectful behavior towards teachers and peers is expected at all times. Bullying, use of abusive language, or damaging school property will result in strict disciplinary action."
    },
    {
      icon: <Scales size={24} weight="duotone" className="text-rose-500" />,
      title: "Prohibited Items",
      description: "Mobile phones, expensive gadgets, jewelry, and any sharp objects are not allowed on the school premises. The school is not responsible for any lost items."
    }
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
            className="flex flex-col gap-8"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center flex flex-col items-center mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-semibold tracking-wide mb-6">
                <Scales weight="fill" /> Guidelines
              </div>
              <h1 className="font-heading text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
                Rules & <span className="text-rose-600">Regulations.</span>
              </h1>
              <p className="mt-4 text-slate-500 max-w-2xl text-lg">
                To maintain a healthy, safe, and productive learning environment, we expect all students to adhere to the following guidelines.
              </p>
            </motion.div>

            {/* Rules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {rules.map((rule, idx) => (
                <motion.div key={idx} variants={itemVariants} className="glass-card p-8 hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 border border-slate-100">
                    {rule.icon}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-slate-900 mb-3">{rule.title}</h3>
                  <p className="text-slate-600 font-sans leading-relaxed">
                    {rule.description}
                  </p>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
