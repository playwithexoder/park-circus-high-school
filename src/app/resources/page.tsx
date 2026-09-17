"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Link as LinkIcon, ArrowRight, ShieldCheck } from "@phosphor-icons/react/dist/ssr";

export default function ResourcesPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const resources = [
    {
      title: "Banglar Shiksha Portal",
      description: "Official school education portal of the Government of West Bengal.",
      url: "https://banglarshiksha.wb.gov.in",
      logo: "https://banglarshiksha.wb.gov.in/front_asset/images/biswa_bangla_logo.png",
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "WBBSE",
      description: "West Bengal Board of Secondary Education official website.",
      url: "https://wbbse.wb.gov.in",
      logo: "https://upload.wikimedia.org/wikipedia/en/9/95/West_Bengal_Board_of_Secondary_Education_Logo.svg",
      color: "from-emerald-500 to-teal-600"
    },
    {
      title: "WBCHSE",
      description: "West Bengal Council of Higher Secondary Education portal.",
      url: "https://wbchse.wb.gov.in",
      logo: "https://upload.wikimedia.org/wikipedia/en/b/b7/West_Bengal_Council_of_Higher_Secondary_Education_Logo.png",
      color: "from-amber-500 to-orange-600"
    },
    {
      title: "Kanyashree Prakalpa",
      description: "Information and tracking for the Kanyashree scheme.",
      url: "https://www.wbkanyashree.gov.in",
      logo: "https://www.wbkanyashree.gov.in/kp_4.0/images/k_logo_new.png",
      color: "from-pink-500 to-rose-600"
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
            className="flex flex-col"
          >
            {/* Header Block */}
            <motion.div variants={itemVariants} className="mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold tracking-wide mb-6">
                <ShieldCheck weight="fill" /> Verified Links
              </div>
              <h1 className="font-heading text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
                Official <span className="text-slate-500">Resources</span>
              </h1>
              <p className="mt-4 font-sans text-lg text-slate-600 max-w-2xl">
                Quick access to important government portals and educational boards associated with our institution.
              </p>
            </motion.div>

            {/* Resources Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.map((res, idx) => (
                <a 
                  key={idx} 
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative glass-card p-8 flex flex-col items-start justify-between min-h-[240px] overflow-hidden hover:-translate-y-2 transition-transform duration-300"
                >
                  {/* Subtle Background Glow */}
                  <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${res.color} opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:opacity-20 transition-opacity`}></div>
                  
                  <div className="relative z-10 w-full flex justify-between items-start mb-8">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center overflow-hidden p-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={res.logo} alt={res.title} className="w-full h-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all">
                      <ArrowRight weight="bold" className="-rotate-45" />
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="font-heading text-2xl font-bold text-slate-900 mb-2">{res.title}</h3>
                    <p className="font-sans text-sm text-slate-500 leading-relaxed">{res.description}</p>
                  </div>
                </a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
