"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { schoolInfo } from "@/lib/data/school-info";
import { motion, AnimatePresence } from "framer-motion";
import { List, X } from "@phosphor-icons/react/dist/ssr";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [
    { 
      label: "About Us", 
      href: "/about",
      dropdown: [
        { label: "History", href: "/about#history" },
        { label: "HOI Desk", href: "/hoi-desk" },
        { label: "Faculty", href: "/faculty" },
        { label: "Rules & Regulations", href: "/rules" },
        { label: "Campus & Facilities", href: "/facilities" }
      ]
    },
    { 
      label: "Admissions", 
      href: "/admissions",
      dropdown: [
        { label: "Admission Procedure", href: "/admissions" },
        { label: "Apply Online", href: "/apply" },
        { label: "Fees Structure", href: "/admissions#fees" }
      ]
    },
    { 
      label: "Academics", 
      href: "/academics",
      dropdown: [
        { label: "Subjects Offered", href: "/academics" },
        { label: "School Timings", href: "/academics#timings" },
        { label: "Uniform Guidelines", href: "/academics#uniform" },
        { label: "Academic Calendar", href: "/academics#calendar" }
      ]
    },
    { label: "Notices", href: "/notices" },
    { label: "Gallery", href: "/gallery" },
    { label: "Alumni", href: "/alumni" },
    { label: "Contact", href: "/contact" }
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-6 left-0 right-0 z-50 flex flex-col items-center px-4"
    >
      <div className="px-6 py-3 flex items-center justify-between w-full max-w-7xl relative z-20 bg-slate-950/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-slate-900/50 rounded-full">
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-12 h-12 group-hover:scale-110 transition-transform duration-300">
              {/* Circular black background */}
              <svg viewBox="0 0 48 48" className="absolute inset-0 w-full h-full" aria-hidden="true">
                <circle cx="24" cy="24" r="23" fill="black" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              </svg>
              <Image 
                src="/assets/logo_png.png" 
                alt={`${schoolInfo.name} Logo`}
                fill
                className="object-contain brightness-0 invert p-1.5 relative z-10"
              />
            </div>
          <span className="font-heading font-bold text-lg tracking-wide text-white hidden lg:block">
            {schoolInfo.name}
          </span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden xl:flex gap-6 items-center ml-auto">
          {navItems.map((item) => (
            <div key={item.label} className="relative group">
              <Link 
                href={item.href} 
                className="flex items-center gap-1 text-[13px] text-slate-300 font-sans font-semibold transition-colors hover:text-white py-2"
              >
                {item.label}
                {item.dropdown && <span className="text-[10px] ml-1 group-hover:rotate-180 transition-transform duration-300 opacity-70">▼</span>}
              </Link>
              
              {/* Dropdown Menu - Dark Glass Style */}
              {item.dropdown && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 shadow-xl shadow-slate-900/50">
                  {item.dropdown.map((drop) => (
                    <Link 
                      key={drop.label}
                      href={drop.href}
                      className="block px-4 py-2.5 text-[13px] font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
                    >
                      {drop.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="hidden xl:flex items-center ml-6 shrink-0 gap-3">
          <Link href="/dev-portal" className="text-[13px] text-slate-300 bg-slate-800 font-sans font-semibold px-5 py-2.5 rounded-full hover:bg-slate-700 hover:text-white transition-all duration-300 border border-white/10">
            Portals
          </Link>
          <Link href="/portal/login" className="text-[13px] text-white bg-emerald-600 font-sans font-semibold px-5 py-2.5 rounded-full hover:bg-emerald-700 hover:scale-105 active:scale-95 transition-all duration-300 shadow-md shadow-emerald-500/20">
            Log In
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="xl:hidden p-2 text-slate-300 hover:text-white transition-colors ml-auto"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 10, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-md bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl mt-2 p-6 flex flex-col gap-2 relative z-10 xl:hidden overflow-y-auto max-h-[75vh] shadow-2xl shadow-slate-900/50"
          >
            {navItems.map((item) => (
              <div key={item.label} className="flex flex-col">
                <Link 
                  href={item.href} 
                  onClick={() => !item.dropdown && setIsMobileMenuOpen(false)}
                  className="text-base text-white font-heading font-bold transition-colors hover:text-emerald-400 py-2"
                >
                  {item.label}
                </Link>
                {item.dropdown && (
                  <div className="flex flex-col pl-4 border-l-2 border-white/10 ml-2 mt-1 space-y-1 mb-2">
                    {item.dropdown.map((drop) => (
                      <Link 
                        key={drop.label}
                        href={drop.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-sm font-semibold text-slate-400 hover:text-white py-1.5 transition-colors"
                      >
                        {drop.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link 
              href="/dev-portal" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 text-center text-sm text-white bg-slate-900 font-sans font-semibold px-5 py-3 rounded-xl hover:bg-slate-800 transition-colors border border-white/10 shadow-md"
            >
              Portals
            </Link>
            <Link 
              href="/portal/login" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-2 text-center text-sm text-white bg-emerald-600 font-sans font-semibold px-5 py-3 rounded-xl hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-500/20"
            >
              Log In
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
