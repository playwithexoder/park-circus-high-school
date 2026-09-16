import { schoolInfo } from "@/lib/data/school-info";
import { MapPin, Phone, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200/50 bg-white/50 backdrop-blur-xl pt-24 pb-12">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          <div className="md:col-span-4 pr-8">
            <h3 className="font-heading text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <div className="relative w-12 h-12 shrink-0">
                <Image 
                  src="/assets/logo_png.png" 
                  alt={`${schoolInfo.name} Logo`}
                  fill
                  className="object-contain invert"
                />
              </div>
              {schoolInfo.name}
            </h3>
            <p className="font-sans text-sm text-slate-500 leading-relaxed max-w-sm mb-6">
              A {schoolInfo.managementType} institution dedicated to academic excellence and character building since {schoolInfo.established}.
            </p>
            
            {/* Recognized By Section */}
            <div className="mt-8">
              <h4 className="font-sans text-xs font-bold text-slate-900 mb-4 uppercase tracking-wider">Recognized By</h4>
              <div className="flex items-center gap-4">
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 px-4 py-2 flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-600">WBBSE</span>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 px-4 py-2 flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-600">WBCHSE</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-4 md:col-start-6">
            <h4 className="font-sans text-xs font-bold text-slate-900 mb-6 uppercase tracking-wider">Directory</h4>
            <ul className="grid grid-cols-2 gap-4 font-sans text-sm text-slate-500">
              <li><Link href="/about" className="hover:text-emerald-600 transition-colors">About</Link></li>
              <li><Link href="/hoi-desk" className="hover:text-emerald-600 transition-colors">HOI Desk</Link></li>
              <li><Link href="/admissions" className="hover:text-emerald-600 transition-colors">Admissions</Link></li>
              <li><Link href="/academics" className="hover:text-emerald-600 transition-colors">Academics</Link></li>
              <li><Link href="/alumni" className="hover:text-emerald-600 transition-colors">Alumni</Link></li>
              <li><Link href="/notices" className="hover:text-emerald-600 transition-colors">Notices</Link></li>
              <li><Link href="/gallery" className="hover:text-emerald-600 transition-colors">Gallery</Link></li>
              <li><Link href="/faculty" className="hover:text-emerald-600 transition-colors">Faculty</Link></li>
              <li><Link href="/rules" className="hover:text-emerald-600 transition-colors">Rules</Link></li>
              <li><Link href="/privacy" className="hover:text-emerald-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-600 transition-colors">Contact</Link></li>
              <li><Link href="/dev-portal" className="text-slate-300 hover:text-emerald-500 transition-colors">Dev Portal</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-3">
            <h4 className="font-sans text-xs font-bold text-slate-900 mb-6 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4 font-sans text-sm text-slate-500">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                <a href="https://maps.google.com/?q=Park+Circus+High+School,+Kolkata" target="_blank" rel="noopener noreferrer" className="leading-relaxed hover:text-emerald-600 transition-colors">
                  {schoolInfo.contact.address}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <EnvelopeSimple size={18} className="text-emerald-500 shrink-0" />
                <a href={`mailto:${schoolInfo.contact.email}`} className="hover:text-emerald-600 transition-colors">
                  {schoolInfo.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-emerald-500 shrink-0" />
                <div className="flex gap-1">
                  <a href={`tel:+91${schoolInfo.contact.phone1}`} className="hover:text-emerald-600 transition-colors">+91 {schoolInfo.contact.phone1}</a>
                  <span>/</span>
                  <a href={`tel:+91${schoolInfo.contact.phone2}`} className="hover:text-emerald-600 transition-colors">{schoolInfo.contact.phone2}</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-slate-200/50 pt-8">
          <p className="font-sans text-xs text-slate-400 font-medium">
            © {new Date().getFullYear()} {schoolInfo.name}. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
             <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider border border-slate-200">
               UDISE: {schoolInfo.identifiers.udise}
             </span>
             <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider border border-slate-200">
               Code: {schoolInfo.identifiers.wbchse}
             </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
