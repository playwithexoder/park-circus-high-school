"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Images } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

export default function GalleryPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const images = [
    "/assets/gallery/annual-sports.jpg",
    "/assets/gallery/park-circus-high-school-circus-avenue-kolkata-wbbse-schools-2opo04meb2.jpg",
    "/assets/gallery/park-circus-high-school-circus-avenue-kolkata-wbbse-schools-92qv95qyf9.jpg",
    "/assets/gallery/park-circus-high-school-circus-avenue-kolkata-wbbse-schools-ktltl4f4du.jpg",
    "/assets/gallery/park-circus-high-school-circus-avenue-kolkata-wbbse-schools-prsl6rhyiw.jpg",
    "/assets/gallery/park-circus-high-school-circus-avenue-kolkata-wbbse-schools-qi367099zc.jpg"
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-semibold tracking-wide mb-6">
                <Images weight="fill" /> Campus Life
              </div>
              <h1 className="font-heading text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
                Photo <span className="text-rose-500">Gallery</span>
              </h1>
              <p className="mt-4 text-xs text-slate-500 max-w-xl text-center">
                *In compliance with the DPDP Act 2023, all images featuring students are published with verifiable parental consent.
              </p>
            </motion.div>

            {/* Gallery Grid (Masonry style simulation) */}
            <motion.div variants={itemVariants} className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {images.map((src, idx) => (
                <div key={idx} className="break-inside-avoid relative overflow-hidden rounded-3xl shadow-md group border border-slate-200/50">
                  <Image 
                    src={src} 
                    alt={`Gallery Image ${idx + 1}`} 
                    width={500} 
                    height={idx % 2 === 0 ? 600 : 400} 
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
