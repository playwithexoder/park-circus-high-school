"use client";

import { useState, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { schoolInfo } from "@/lib/data/school-info";
import { ArrowRight, BookOpen, GraduationCap, Users, Trophy, ChalkboardTeacher, Books, Certificate, Star, Laptop, Play, Pause } from "@phosphor-icons/react/dist/ssr";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <>
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24 px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-12 auto-rows-[minmax(200px,auto)] gap-6"
          >
            {/* HERO BLOCK - Spans 8 columns */}
            <motion.div variants={itemVariants} className="md:col-span-8 glass-card p-6 sm:p-8 md:p-12 flex flex-col justify-center relative overflow-hidden group">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] sm:text-xs font-semibold tracking-wide mb-4 sm:mb-6">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                  {schoolInfo.managementType} Institution
                </div>
                
                <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-4 sm:mb-6 leading-[1.1]">
                  Where knowledge <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">rises higher.</span>
                </h1>
                
                <p className="font-sans text-base sm:text-lg text-slate-600 max-w-lg mb-6 sm:mb-8 leading-relaxed">
                  Welcome to {schoolInfo.name}. Empowering students with academic excellence and strong character since {schoolInfo.established}.
                </p>
                
                <Link href="/apply" className="flex w-full sm:w-auto justify-center items-center gap-3 bg-slate-900 text-white px-6 py-3.5 rounded-full font-medium hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-900/20">
                  Discover Admissions <ArrowRight weight="bold" />
                </Link>
              </div>
            </motion.div>

            {/* EMBLEM SHOWCASE BLOCK - Spans 4 columns */}
            <motion.div variants={itemVariants} className="md:col-span-4 rounded-3xl relative overflow-hidden min-h-[290px] md:min-h-[330px] flex flex-col items-center justify-center bg-slate-950 group border border-slate-800 shadow-2xl mt-6 md:mt-0 p-6">
              {/* Moving Grid Background */}
              <motion.div 
                animate={{ backgroundPosition: ['0px 0px', '24px 24px'] }}
                transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"
              />
              {/* Gradient Mask to fade edges */}
              <div className="absolute inset-0 bg-slate-950 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,transparent_20%,#000_100%)] pointer-events-none" />
              
              <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              {/* Circular Emblem Frame with Watermark-Clipping Circular Mask & Ambient Glow */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative">
                  {/* Soft ambient backlight */}
                  <div className="absolute -inset-2 bg-gradient-to-tr from-blue-600/30 to-amber-500/25 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Precision Circular Mask - completely clips all 4 outer corners including bottom-left watermark */}
                  <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl bg-black flex items-center justify-center ring-4 ring-white/5 transition-transform duration-500 group-hover:scale-105">
                    <video
                      ref={videoRef}
                      src="/assets/logo-animation.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover scale-[1.08] pointer-events-none"
                    />
                  </div>

                  {/* Subtle play/pause toggle pill */}
                  <button 
                    onClick={togglePlay}
                    aria-label={isPlaying ? "Pause animation" : "Play animation"}
                    className="absolute bottom-1 right-1 z-20 w-7 h-7 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-md"
                  >
                    {isPlaying ? <Pause size={12} weight="fill" /> : <Play size={12} weight="fill" />}
                  </button>
                </div>

                <div className="mt-4 text-center z-10">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-slate-300 uppercase tracking-widest mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Official Crest
                  </div>
                  <p className="text-white font-heading text-lg font-bold tracking-tight">Est. {schoolInfo.established}</p>
                  <p className="text-slate-400 text-xs font-medium">Govt Sponsored • Kolkata</p>
                </div>
              </div>
            </motion.div>

            {/* QUICK STATS GRID - Spans 8 columns */}
            <motion.div variants={itemVariants} className="md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Established", value: schoolInfo.established, icon: <Trophy size={24} weight="duotone" /> },
                { label: "Faculty", value: schoolInfo.stats.teachers, icon: <ChalkboardTeacher size={24} weight="duotone" /> },
                { label: "Classrooms", value: schoolInfo.stats.classrooms, icon: <GraduationCap size={24} weight="duotone" /> },
                { label: "Library Books", value: schoolInfo.stats.libraryBooks, icon: <Books size={24} weight="duotone" /> }
              ].map((stat, idx) => (
                <div key={idx} className="glass-card p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                    {stat.icon}
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-slate-900 mb-1">{stat.value}</h3>
                    <p className="text-slate-600 text-sm">{stat.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* NOTICES WIDGET - 4 columns */}
            <motion.div variants={itemVariants} className="md:col-span-4 glass-card p-8 bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              <h3 className="font-heading text-2xl font-bold mb-6">Latest Updates</h3>
              <ul className="space-y-4 relative z-10">
                <li className="border-b border-white/20 pb-3">
                  <p className="text-xs text-blue-200 mb-1">15 Sep 2026</p>
                  <p className="font-medium text-sm">H.S. Pre-Test Schedule Released</p>
                </li>
                <li className="pb-2">
                  <p className="text-xs text-blue-200 mb-1">10 Sep 2026</p>
                  <p className="font-medium text-sm">Kanyashree Renewal Guidelines</p>
                </li>
              </ul>
              <Link href="/notices" className="mt-4 inline-flex text-xs font-semibold uppercase tracking-wider text-blue-200 hover:text-white transition-colors items-center gap-1">
                View All Notices <ArrowRight />
              </Link>
            </motion.div>
          </motion.div>
          
          {/* STUDENT QUICK LINKS SECTION */}
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={containerVariants}
            className="mt-20"
          >
            <div className="flex items-center gap-3 mb-8">
              <h2 className="font-heading text-3xl font-bold text-slate-900">Student <span className="text-emerald-500">Resources</span></h2>
              <div className="flex-1 h-px bg-slate-200 ml-4"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Exam Results", desc: "Check WBBSE & WBCHSE Results", link: "https://wbresults.nic.in/", icon: <Certificate size={32} weight="duotone" className="text-amber-500" />, color: "from-amber-400 to-orange-500" },
                { title: "Scholarships", desc: "SVMCM, Oasis, & Aikyashree", link: "https://svmcm.wbhed.gov.in/", icon: <GraduationCap size={32} weight="duotone" className="text-emerald-500" />, color: "from-emerald-400 to-teal-500" },
                { title: "Kanyashree Prakalpa", desc: "Scheme for Girls' Education", link: "https://www.wbkanyashree.gov.in/", icon: <Star size={32} weight="duotone" className="text-pink-500" />, color: "from-pink-400 to-rose-500" },
                { title: "Banglar Shiksha", desc: "Govt. E-Learning Portal", link: "https://banglarshiksha.gov.in/", icon: <Laptop size={32} weight="duotone" className="text-blue-500" />, color: "from-blue-400 to-indigo-500" }
              ].map((item, idx) => (
                <motion.a 
                  key={idx}
                  variants={itemVariants}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-6 flex flex-col justify-between group hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.color} rounded-full blur-3xl opacity-10 group-hover:opacity-30 transition-opacity -translate-y-1/2 translate-x-1/2`}></div>
                  <div>
                    <div className="mb-4 group-hover:scale-110 transition-transform transform origin-left">{item.icon}</div>
                    <h3 className="font-heading font-bold text-slate-900 text-lg mb-1 group-hover:text-emerald-600 transition-colors">{item.title}</h3>
                    <p className="text-slate-500 text-sm font-medium">{item.desc}</p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-emerald-500 transition-colors">
                    Visit Portal <ArrowRight />
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
          
        </div>
      </main>
      
      <Footer />
    </>
  );
}
