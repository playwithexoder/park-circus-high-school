"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { schoolInfo } from "@/lib/data/school-info";
import { motion } from "framer-motion";
import { BookOpenText, Target, Clock, ShirtFolded, CalendarHeart } from "@phosphor-icons/react/dist/ssr";

export default function AcademicsPage() {
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
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Header Block */}
            <motion.div variants={itemVariants} className="md:col-span-2 mb-2 text-center flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-semibold tracking-wide mb-6">
                <Target weight="fill" /> Academics
              </div>
              <h1 className="font-heading text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
                Fostering <span className="text-emerald-600">intellect.</span>
              </h1>
            </motion.div>

            {/* Quick Stats */}
            <motion.div variants={itemVariants} className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
              {[
                { label: "Medium", value: "Bengali & Urdu" },
                { label: "Faculty Members", value: "17" },
                { label: "Classes", value: "V - XII" },
                { label: "Management", value: schoolInfo.managementType }
              ].map((stat) => (
                <div key={stat.label} className="glass-card p-6 text-center">
                  <div className="font-heading text-xl md:text-2xl font-bold text-emerald-600 mb-1">{stat.value}</div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Curriculum Block */}
            <motion.div variants={itemVariants} className="glass-card p-10 md:p-12 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                <BookOpenText size={24} weight="duotone" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">Curriculum Structure</h2>
              <p className="font-sans text-slate-600 mb-8 leading-relaxed">
                As an affiliated institution of WBBSE and WBCHSE, we offer a rigorous academic program in <strong className="text-slate-900">Bengali & Urdu medium</strong>, preparing students for board examinations.
              </p>
              
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <h3 className="font-heading text-lg font-bold text-slate-800 mb-1">Secondary (V - X)</h3>
                  <p className="text-sm text-slate-500">Comprehensive foundation following WBBSE guidelines.</p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <h3 className="font-heading text-lg font-bold text-slate-800 mb-1">Higher Secondary (XI - XII)</h3>
                  <p className="text-sm text-slate-500">Specialized streams following WBCHSE syllabus.</p>
                </div>
              </div>
            </motion.div>

            {/* Streams Block */}
            <motion.div variants={itemVariants} className="glass-card p-10 md:p-12 bg-gradient-to-br from-emerald-500 to-teal-600 text-white relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              
              <h2 className="font-heading text-3xl font-bold mb-8">H.S. Streams</h2>
              
              <div className="space-y-4 relative z-10">
                {['Arts', 'Commerce'].map((stream, i) => (
                  <div key={stream} className="flex items-center justify-between p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors cursor-default">
                    <span className="font-heading text-xl font-bold">{stream}</span>
                    <span className="font-sans text-xs font-semibold text-emerald-100 bg-black/20 px-3 py-1 rounded-full">Stream 0{i+1}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* School Timings Block */}
            <motion.div id="timings" variants={itemVariants} className="md:col-span-2 glass-card p-10 md:p-12 scroll-mt-24">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6">
                <Clock size={24} weight="duotone" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-slate-900 mb-6">School Timings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-center text-center">
                  <div className="font-heading text-xl font-bold text-slate-800">10:40 AM</div>
                  <div className="text-sm text-slate-500 font-medium">Morning Assembly</div>
                </div>
                <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-100 flex flex-col justify-center text-center">
                  <div className="font-heading text-xl font-bold text-indigo-700">10:50 AM - 4:30 PM</div>
                  <div className="text-sm text-indigo-600/80 font-medium">Regular Classes</div>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-center text-center">
                  <div className="font-heading text-xl font-bold text-slate-800">1:30 PM - 2:10 PM</div>
                  <div className="text-sm text-slate-500 font-medium">Tiffin Break</div>
                </div>
              </div>
            </motion.div>

            {/* Uniform Block */}
            <motion.div id="uniform" variants={itemVariants} className="md:col-span-2 glass-card p-10 md:p-12 scroll-mt-24">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-6">
                <ShirtFolded size={24} weight="duotone" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-slate-900 mb-6">Uniform Guidelines</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-heading text-lg font-bold text-slate-800 mb-3">Summer Uniform</h3>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span> White Shirt (Half/Full Sleeves)</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span> Navy Blue Trousers</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span> Black Leather Shoes with White Socks</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span> School Tie and Belt</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-slate-800 mb-3">Winter Additions</h3>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Navy Blue Sweater (V-Neck)</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Navy Blue Blazer (for Class IX-XII)</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Calendar Block */}
            <motion.div id="calendar" variants={itemVariants} className="md:col-span-2 glass-card p-10 md:p-12 scroll-mt-24">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-6">
                <CalendarHeart size={24} weight="duotone" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">Academic Calendar</h2>
              <p className="font-sans text-slate-600 mb-8 leading-relaxed">
                The school observes all public holidays as gazetted by the State Government of West Bengal. Exact dates for examinations will be announced via the Notice Board.
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th className="py-4 px-4 font-heading font-bold text-slate-800">Term / Event</th>
                      <th className="py-4 px-4 font-heading font-bold text-slate-800">Tentative Schedule</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-slate-600">
                    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 font-semibold text-slate-800">First Summative Evaluation</td>
                      <td className="py-4 px-4">April - May</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 font-semibold text-slate-800">Summer Vacation</td>
                      <td className="py-4 px-4">May - June</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 font-semibold text-slate-800">Second Summative Evaluation</td>
                      <td className="py-4 px-4">August</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 font-semibold text-slate-800">Puja Vacation</td>
                      <td className="py-4 px-4">September - October</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 font-semibold text-slate-800">Third Summative / Final Exam</td>
                      <td className="py-4 px-4">November - December</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
