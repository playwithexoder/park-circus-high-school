"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { schoolInfo } from "@/lib/data/school-info";
import { motion } from "framer-motion";
import { Sparkle, UserCircle, UsersFour, BowlFood, BuildingOffice, GraduationCap, CheckCircle } from "@phosphor-icons/react/dist/ssr";

export default function AboutPage() {
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
            className="grid grid-cols-1 md:grid-cols-12 gap-6"
          >
            {/* Header Block */}
            <motion.div variants={itemVariants} className="md:col-span-12 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold tracking-wide mb-6">
                <Sparkle weight="fill" /> About Us
              </div>
              <h1 className="font-heading text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
                A legacy of <span className="text-blue-600">excellence.</span>
              </h1>
            </motion.div>

            {/* History Block */}
            <motion.div variants={itemVariants} className="md:col-span-8 glass-card p-10 md:p-12">
              <h2 className="font-heading text-2xl font-bold text-slate-900 mb-6">Our History</h2>
              <div className="space-y-6 text-slate-600 font-sans text-lg leading-relaxed">
                <p>
                  Established in <strong className="text-slate-900">{schoolInfo.established}</strong>, {schoolInfo.name} has been a cornerstone of academic rigor and character building in Kolkata. For nearly nine decades, we have remained committed to providing high-quality education to our community.
                </p>
                <p>
                  As a {schoolInfo.managementType} institution, we balance tradition with modern pedagogical advancements, ensuring our students are prepared for the challenges of the future while remaining grounded in their cultural heritage.
                </p>
              </div>
            </motion.div>

            {/* Facts Block */}
            <motion.div variants={itemVariants} className="md:col-span-4 space-y-6">
              <div className="glass-card p-8 hover:-translate-y-1 transition-transform duration-300">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Location</p>
                <h3 className="font-heading text-xl font-bold text-slate-900 mb-1">{schoolInfo.contact.address}</h3>
                <p className="text-sm text-slate-500">Kolkata - 17, West Bengal</p>
              </div>
              
              <div className="glass-card p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100/50 hover:-translate-y-1 transition-transform duration-300">
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-500 mb-4">Affiliations</p>
                <ul className="space-y-4">
                  <li className="flex items-center justify-between">
                     <span className="font-semibold text-slate-700">WBBSE</span>
                     <span className="font-mono text-xs font-medium text-slate-500 bg-white px-2 py-1 rounded-md">{schoolInfo.identifiers.wbbse}</span>
                   </li>
                   <li className="flex items-center justify-between">
                     <span className="font-semibold text-slate-700">WBCHSE</span>
                     <span className="font-mono text-xs font-medium text-slate-500 bg-white px-2 py-1 rounded-md">{schoolInfo.identifiers.wbchse}</span>
                   </li>
                   <li className="flex items-center justify-between pt-4 border-t border-blue-200/50">
                     <span className="font-semibold text-slate-700">UDISE</span>
                     <span className="font-mono text-xs font-medium text-slate-500 bg-white px-2 py-1 rounded-md">{schoolInfo.identifiers.udise}</span>
                   </li>
                 </ul>
               </div>
             </motion.div>

             {/* HOI Desk */}
             <motion.div id="hoi-desk" variants={itemVariants} className="md:col-span-12 glass-card p-10 md:p-12 scroll-mt-24 mt-6">
               <div className="flex flex-col md:flex-row gap-8 items-start">
                 <div className="w-24 h-24 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                   <UserCircle size={64} weight="duotone" className="text-slate-400" />
                 </div>
                 <div>
                   <h2 className="font-heading text-3xl font-bold text-slate-900 mb-2">Head of Institution's Desk</h2>
                   <p className="text-slate-500 font-semibold mb-6">Mr. A. Rahman (Headmaster)</p>
                   <div className="space-y-4 text-slate-600 font-sans leading-relaxed">
                     <p>Welcome to Park Circus High School. As a government-aided institution, our primary goal is to provide inclusive, high-quality education to students from all walks of life. We believe that education is the most powerful tool for social mobility and empowerment.</p>
                     <p>Our dedicated faculty ensures that we strictly adhere to the academic standards set by WBBSE and WBCHSE, while nurturing the holistic development of our students in a safe, compliant environment.</p>
                   </div>
                 </div>
               </div>
             </motion.div>

             {/* SMC Table */}
             <motion.div variants={itemVariants} className="md:col-span-12 glass-card p-10 md:p-12 mt-6">
               <div className="flex items-center gap-3 mb-6">
                 <UsersFour size={32} weight="duotone" className="text-indigo-500" />
                 <h2 className="font-heading text-2xl font-bold text-slate-900">School Management Committee (SMC)</h2>
               </div>
               <p className="text-slate-600 mb-6">In accordance with the Right to Education (RTE) Act, 2009, our School Management Committee plays a vital role in ensuring accountability, transparency, and the effective functioning of the school.</p>
               <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200">
                   <thead className="bg-slate-50 border-b border-slate-200">
                     <tr>
                       <th className="py-4 px-6 font-heading font-bold text-slate-800">Name</th>
                       <th className="py-4 px-6 font-heading font-bold text-slate-800">Designation</th>
                       <th className="py-4 px-6 font-heading font-bold text-slate-800">Category</th>
                     </tr>
                   </thead>
                   <tbody className="text-sm text-slate-600 divide-y divide-slate-100">
                     <tr className="hover:bg-slate-50 transition-colors">
                       <td className="py-4 px-6 font-semibold text-slate-800">Dr. S. K. Mondal</td>
                       <td className="py-4 px-6">President</td>
                       <td className="py-4 px-6">Educationist</td>
                     </tr>
                     <tr className="hover:bg-slate-50 transition-colors">
                       <td className="py-4 px-6 font-semibold text-slate-800">Mr. A. Rahman</td>
                       <td className="py-4 px-6">Secretary</td>
                       <td className="py-4 px-6">Headmaster</td>
                     </tr>
                     <tr className="hover:bg-slate-50 transition-colors">
                       <td className="py-4 px-6 font-semibold text-slate-800">Mrs. F. Khatun</td>
                       <td className="py-4 px-6">Member</td>
                       <td className="py-4 px-6">Guardian Representative</td>
                     </tr>
                     <tr className="hover:bg-slate-50 transition-colors">
                       <td className="py-4 px-6 font-semibold text-slate-800">Mr. R. Das</td>
                       <td className="py-4 px-6">Member</td>
                       <td className="py-4 px-6">Teacher Representative</td>
                     </tr>
                   </tbody>
                 </table>
               </div>
             </motion.div>

             {/* Government Schemes */}
             <motion.div variants={itemVariants} className="md:col-span-12 glass-card p-10 md:p-12 mt-6 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 border-emerald-100/50">
               <div className="flex items-center gap-3 mb-8">
                 <BowlFood size={32} weight="duotone" className="text-emerald-500" />
                 <h2 className="font-heading text-2xl font-bold text-slate-900">Government Initiatives</h2>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
                   <h3 className="font-bold text-emerald-800 mb-2">Mid-Day Meal (PM POSHAN)</h3>
                   <p className="text-sm text-slate-600">Nutritious, hot-cooked meals are provided daily to students in Classes V-VIII in strict compliance with government nutritional guidelines.</p>
                 </div>
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
                   <h3 className="font-bold text-emerald-800 mb-2">Kanyashree Prakalpa</h3>
                   <p className="text-sm text-slate-600">We actively facilitate the Kanyashree scheme to empower our female students, ensuring financial assistance for their continued education.</p>
                 </div>
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
                   <h3 className="font-bold text-emerald-800 mb-2">Sabuj Sathi</h3>
                   <p className="text-sm text-slate-600">Bicycles are distributed to students of Class IX to XII to enhance mobility and encourage higher attendance rates.</p>
                 </div>
               </div>
             </motion.div>

             {/* Infrastructure */}
             <motion.div id="facilities" variants={itemVariants} className="md:col-span-12 glass-card p-10 md:p-12 scroll-mt-24 mt-6">
               <div className="flex items-center gap-3 mb-8">
                 <BuildingOffice size={32} weight="duotone" className="text-amber-500" />
                 <h2 className="font-heading text-2xl font-bold text-slate-900">Campus & Facilities</h2>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div className="flex gap-4">
                   <CheckCircle size={24} weight="fill" className="text-amber-500 shrink-0 mt-0.5" />
                   <div>
                     <h4 className="font-bold text-slate-800">Spacious Classrooms</h4>
                     <p className="text-sm text-slate-600 mt-1">Well-ventilated classrooms with adequate seating to maintain a healthy student-teacher ratio.</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <CheckCircle size={24} weight="fill" className="text-amber-500 shrink-0 mt-0.5" />
                   <div>
                     <h4 className="font-bold text-slate-800">RTE Compliant Sanitation</h4>
                     <p className="text-sm text-slate-600 mt-1">Separate, clean, and well-maintained washrooms for boys and girls, along with safe drinking water facilities.</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <CheckCircle size={24} weight="fill" className="text-amber-500 shrink-0 mt-0.5" />
                   <div>
                     <h4 className="font-bold text-slate-800">Science Laboratories</h4>
                     <p className="text-sm text-slate-600 mt-1">Fully equipped Physics, Chemistry, and Biology labs for Higher Secondary science students.</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <CheckCircle size={24} weight="fill" className="text-amber-500 shrink-0 mt-0.5" />
                   <div>
                     <h4 className="font-bold text-slate-800">Library</h4>
                     <p className="text-sm text-slate-600 mt-1">A dedicated reading room with a vast collection of academic textbooks and reference materials.</p>
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
