"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { PaperPlaneTilt, MapPin, Phone, EnvelopeSimple, FacebookLogo, InstagramLogo, ShareNetwork } from "@phosphor-icons/react/dist/ssr";
import { schoolInfo } from "@/lib/data/school-info";

export default function ContactPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const handleShareContact = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: schoolInfo.name,
          text: `Contact ${schoolInfo.name}:\nPhone: +91 ${schoolInfo.contact.phone1}\nEmail: ${schoolInfo.contact.email}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing contact:", err);
      }
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  const handleShareLocation = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${schoolInfo.name} Location`,
          text: `Location of ${schoolInfo.name}: ${schoolInfo.contact.address}`,
          url: "https://maps.google.com/?q=Park+Circus+High+School,+Kolkata",
        });
      } catch (err) {
        console.log("Error sharing location:", err);
      }
    } else {
      alert("Sharing is not supported on this browser.");
    }
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
            className="flex flex-col"
          >
            {/* Header Block */}
            <motion.div variants={itemVariants} className="mb-12 text-center flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-semibold tracking-wide mb-6">
                <PaperPlaneTilt weight="fill" /> Get in Touch
              </div>
              <h1 className="font-heading text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
                Contact <span className="text-emerald-500">Us</span>
              </h1>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <motion.div variants={itemVariants} className="glass-card p-8 md:p-10">
                <h3 className="font-heading text-2xl font-bold text-slate-900 mb-6">Send a Message</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm text-slate-900 placeholder:text-slate-400" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                    <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm text-slate-900 placeholder:text-slate-400" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Subject</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm text-slate-900 placeholder:text-slate-400" placeholder="Subject of your message" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Message</label>
                    <textarea rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm resize-none text-slate-900 placeholder:text-slate-400" placeholder="Enter Message"></textarea>
                  </div>
                  <button type="button" className="w-full bg-emerald-600 text-white font-semibold rounded-xl py-3 hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-600/20">
                    Submit Message
                  </button>
                </form>
              </motion.div>

              {/* Contact Info & Map placeholder */}
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="glass-card p-8">
                  <h3 className="font-heading text-xl font-bold mb-6 text-slate-900">Contact Information</h3>
                  <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                        <MapPin size={20} className="text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Address</p>
                        <a href="https://maps.google.com/?q=Park+Circus+High+School,+Kolkata" target="_blank" rel="noopener noreferrer" className="text-sm leading-relaxed text-slate-800 font-medium hover:text-emerald-600 transition-colors block mb-2">{schoolInfo.contact.address}</a>
                        <button onClick={handleShareLocation} className="text-xs font-semibold text-emerald-600 flex items-center gap-1 hover:text-emerald-700 transition-colors">
                          <ShareNetwork size={14} /> Share Location
                        </button>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                        <Phone size={20} className="text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Phone</p>
                        <div className="flex gap-2 mb-2">
                          <a href={`tel:+91${schoolInfo.contact.phone1}`} className="text-sm text-slate-800 font-medium hover:text-emerald-600 transition-colors">+91 {schoolInfo.contact.phone1}</a>
                          <span className="text-slate-400">/</span>
                          <a href={`tel:+91${schoolInfo.contact.phone2}`} className="text-sm text-slate-800 font-medium hover:text-emerald-600 transition-colors">{schoolInfo.contact.phone2}</a>
                        </div>
                        <button onClick={handleShareContact} className="text-xs font-semibold text-emerald-600 flex items-center gap-1 hover:text-emerald-700 transition-colors">
                          <ShareNetwork size={14} /> Share Contact Info
                        </button>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                        <EnvelopeSimple size={20} className="text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Email</p>
                        <a href={`mailto:${schoolInfo.contact.email}`} className="text-sm text-slate-800 font-medium hover:text-emerald-600 transition-colors">{schoolInfo.contact.email}</a>
                      </div>
                    </li>
                  </ul>
                </div>
                
                {/* Real Map Embed */}
                <div className="glass-card h-48 w-full overflow-hidden border border-slate-200 rounded-2xl relative">
                  <iframe 
                    src="https://maps.google.com/maps?q=Park+Circus+High+School,+Kolkata&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                    className="absolute inset-0 w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>

                <div className="flex justify-center gap-4 pt-4">
                  <a href={schoolInfo.contact.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:-translate-y-1 transition-transform shadow-md shadow-blue-600/30">
                    <FacebookLogo size={20} weight="fill" />
                  </a>
                  <a href={schoolInfo.contact.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white flex items-center justify-center hover:-translate-y-1 transition-transform shadow-md shadow-pink-500/30">
                    <InstagramLogo size={20} weight="fill" />
                  </a>
                </div>
              </motion.div>
            </div>

          </motion.div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
