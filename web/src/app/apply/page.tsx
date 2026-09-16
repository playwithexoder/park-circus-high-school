"use client";

import { useState, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ArrowRight, ArrowLeft, Student, FileText, UploadSimple, Printer, Camera, WarningCircle, X } from "@phosphor-icons/react/dist/ssr";
import { ApplicationPDFView } from "@/components/ApplicationPDFView";

export default function ApplicationForm() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoError, setPhotoError] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    studentName: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    caste: "",
    religion: "",
    studentAadhaar: "",
    fatherName: "",
    motherName: "",
    guardianMobile: "",
    alternateContact: "",
    address: "",
    classApplied: "",
    previousSchool: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      setPhotoUrl(URL.createObjectURL(file));
      setPhotoError(false);
    }
  };

  const nextStep = () => {
    if (step === 3 && !photoUrl) {
      // photo is on step 4 but let's enforce it on submit
    }
    setStep(s => Math.min(4, s + 1));
  };
  const prevStep = () => setStep(s => Math.max(1, s - 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoUrl) {
      setPhotoError(true);
      return;
    }
    setIsSubmitting(true);
    try {
      // Mock local submission for proposal stage
      await new Promise(res => setTimeout(res, 1200));
      const id = "APP-" + new Date().getFullYear() + "-" + String(Math.floor(Math.random() * 900) + 100);
      setApplicationId(id);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Failed to submit application", error);
      alert("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      
      {/* Printable PDF View */}
      {isSubmitted && (
        <ApplicationPDFView formData={{ ...formData, photoUrl }} applicationNo={applicationId} />
      )}

      <main className="flex-1 pt-32 pb-24 px-6 lg:px-8 bg-slate-50 min-h-screen no-print">
        <div className="container mx-auto max-w-3xl">
          
          <div className="text-center mb-10">
            <h1 className="font-heading text-4xl font-bold text-slate-900 mb-2">Student Application Form</h1>
            <p className="text-slate-500 font-sans">Admissions for Academic Year 2026-27</p>
          </div>

          <div className="glass-card p-8 md:p-12 relative overflow-hidden">
            
            {/* Progress Stepper */}
            {!isSubmitted && (
              <div className="flex justify-between items-center mb-12 relative">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -z-10 -translate-y-1/2 rounded-full"></div>
                <div className="absolute top-1/2 left-0 h-1 bg-emerald-500 -z-10 -translate-y-1/2 rounded-full transition-all duration-500" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
                
                {[
                  { num: 1, icon: <Student weight="fill" />, label: "Student" },
                  { num: 2, icon: <FileText weight="fill" />, label: "Guardian" },
                  { num: 3, icon: <FileText weight="fill" />, label: "Academic" },
                  { num: 4, icon: <Camera weight="fill" />, label: "Photo & Docs" }
                ].map((s) => (
                  <div key={s.num} className="flex flex-col items-center gap-2 bg-white px-2 rounded-full">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${step >= s.num ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-slate-200 text-slate-400'}`}>
                      {s.icon}
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${step >= s.num ? 'text-emerald-700' : 'text-slate-400'}`}>{s.label}</span>
                  </div>
                ))}
              </div>
            )}

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={48} weight="fill" />
                  </div>
                  <h2 className="font-heading text-3xl font-bold text-slate-900 mb-4">Application Submitted!</h2>
                  <p className="text-slate-600 mb-8 max-w-md mx-auto">
                    Your application has been received. Please download and print your official application receipt, and submit the physical copy to the school office within 7 days.
                  </p>
                  
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 inline-block mb-8 w-full max-w-xs">
                    <span className="block text-sm font-bold text-slate-500 mb-1">Application Reference No.</span>
                    <span className="font-mono font-bold text-2xl tracking-wider text-slate-900">{applicationId}</span>
                  </div>

                  <div>
                    <button 
                      onClick={() => window.print()} 
                      className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-indigo-600/30"
                    >
                      <Printer size={24} weight="duotone" />
                      Download Application PDF
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form 
                  key={`step-${step}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={step === 4 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}
                >
                  {/* STEP 1: Student Details */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Student Full Name *</label>
                        <input type="text" name="studentName" value={formData.studentName} onChange={handleInputChange} required placeholder="As per birth certificate" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Date of Birth *</label>
                          <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Gender *</label>
                          <select name="gender" value={formData.gender} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white outline-none">
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other / Transgender</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Blood Group</label>
                          <select name="bloodGroup" value={formData.bloodGroup} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white outline-none">
                            <option value="">Select</option>
                            <option value="A+">A+</option><option value="A-">A-</option>
                            <option value="B+">B+</option><option value="B-">B-</option>
                            <option value="O+">O+</option><option value="O-">O-</option>
                            <option value="AB+">AB+</option><option value="AB-">AB-</option>
                            <option value="Unknown / Not Tested">Unknown / Not Tested</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Category / Caste *</label>
                          <select name="caste" value={formData.caste} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white outline-none">
                            <option value="">Select</option>
                            <option value="General">General</option>
                            <option value="SC">SC</option>
                            <option value="ST">ST</option>
                            <option value="OBC">OBC</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Religion *</label>
                          <input type="text" name="religion" value={formData.religion} onChange={handleInputChange} required placeholder="e.g. Hindu" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                          Student's Aadhaar Number
                          <span className="ml-2 text-slate-400 normal-case font-normal">(12-digit, optional)</span>
                        </label>
                        <input
                          type="text"
                          name="studentAadhaar"
                          value={formData.studentAadhaar}
                          onChange={e => {
                            const val = e.target.value.replace(/\D/g, "").slice(0, 12);
                            setFormData(prev => ({ ...prev, studentAadhaar: val }));
                          }}
                          placeholder="xxxx xxxx xxxx"
                          maxLength={12}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none font-mono tracking-widest"
                        />
                        {formData.studentAadhaar.length > 0 && formData.studentAadhaar.length < 12 && (
                          <p className="text-xs text-amber-600 mt-1.5 flex items-center gap-1"><WarningCircle size={13} weight="fill" /> Aadhaar should be 12 digits ({formData.studentAadhaar.length}/12 entered)</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Guardian Details */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Father's Name *</label>
                          <input type="text" name="fatherName" value={formData.fatherName} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Mother's Name *</label>
                          <input type="text" name="motherName" value={formData.motherName} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                            Guardian Mobile No. *
                            <span className="ml-1 text-slate-400 font-normal normal-case">(primary)</span>
                          </label>
                          <input
                            type="tel"
                            name="guardianMobile"
                            value={formData.guardianMobile}
                            onChange={e => {
                              const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                              setFormData(prev => ({ ...prev, guardianMobile: val }));
                            }}
                            required
                            placeholder="10-digit mobile number"
                            maxLength={10}
                            pattern="\d{10}"
                            title="Please enter a valid 10-digit mobile number"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none font-mono"
                          />
                          {formData.guardianMobile.length > 0 && formData.guardianMobile.length < 10 && (
                            <p className="text-xs text-amber-600 mt-1.5 flex items-center gap-1"><WarningCircle size={13} weight="fill" /> Enter 10-digit number ({formData.guardianMobile.length}/10)</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                            Alternate Contact No.
                            <span className="ml-1 text-slate-400 font-normal normal-case">(optional)</span>
                          </label>
                          <input
                            type="tel"
                            name="alternateContact"
                            value={formData.alternateContact}
                            onChange={e => {
                              const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                              setFormData(prev => ({ ...prev, alternateContact: val }));
                            }}
                            placeholder="Optional second number"
                            maxLength={10}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none font-mono"
                          />
                          {formData.alternateContact.length > 0 && formData.alternateContact.length < 10 && (
                            <p className="text-xs text-slate-400 mt-1.5">({formData.alternateContact.length}/10 digits — still accepted)</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Residential Address *</label>
                        <textarea name="address" value={formData.address} onChange={handleInputChange} required rows={3} placeholder="House No., Street, Area, City, PIN Code" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none"></textarea>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Academic */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Admission Sought In Class *</label>
                        <select name="classApplied" value={formData.classApplied} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white outline-none">
                          <option value="">Select Class</option>
                          <option value="Class V">Class V</option>
                          <option value="Class VI">Class VI</option>
                          <option value="Class VII">Class VII</option>
                          <option value="Class VIII">Class VIII</option>
                          <option value="Class IX">Class IX</option>
                          <option value="Class XI (Arts)">Class XI (Arts)</option>
                          <option value="Class XI (Commerce)">Class XI (Commerce)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Previous School Name (If Any)</label>
                        <input type="text" name="previousSchool" value={formData.previousSchool} onChange={handleInputChange} placeholder="Leave blank if new admission" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none" />
                      </div>
                    </div>
                  )}

                  {/* STEP 4: Photo & Documents */}
                  {step === 4 && (
                    <div className="space-y-6">
                      <div className="bg-amber-50 p-4 border border-amber-200 rounded-xl">
                        <p className="text-sm text-amber-800 font-medium">Please bring physical copies of documents to school for verification. A <strong>passport photo is mandatory</strong> to complete this application.</p>
                      </div>

                      {/* Mandatory Photo Upload */}
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                          Passport Photo * <span className="text-rose-500">(Mandatory)</span>
                        </label>
                        <div
                          onClick={() => photoInputRef.current?.click()}
                          className={`relative border-2 border-dashed rounded-xl p-6 flex gap-6 items-center cursor-pointer transition-all ${photoError ? "border-rose-400 bg-rose-50" : photoUrl ? "border-emerald-400 bg-emerald-50" : "border-slate-300 bg-slate-50 hover:bg-slate-100"}`}
                        >
                          <input ref={photoInputRef} type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                          
                          {/* Photo Box */}
                          <div className={`w-24 h-28 rounded-lg border-2 flex items-center justify-center overflow-hidden shrink-0 ${photoUrl ? "border-emerald-400" : "border-slate-300 bg-white"}`}>
                            {photoUrl ? (
                              <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                              <div className="flex flex-col items-center text-slate-300">
                                <Camera size={28} />
                                <span className="text-[10px] mt-1">Photo</span>
                              </div>
                            )}
                          </div>

                          <div className="flex-1">
                            {photoUrl ? (
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="font-semibold text-emerald-700 flex items-center gap-2"><CheckCircle size={18} weight="fill" /> Photo uploaded!</p>
                                  <p className="text-xs text-slate-500 mt-1">{photoFile?.name}</p>
                                  <p className="text-xs text-emerald-600 mt-2">Click to change photo</p>
                                </div>
                                <button type="button" onClick={e => { e.stopPropagation(); setPhotoUrl(null); setPhotoFile(null); }} className="p-1 rounded-full hover:bg-red-100 text-slate-400 hover:text-red-600 transition-colors"><X size={18} weight="bold" /></button>
                              </div>
                            ) : (
                              <div>
                                <p className="font-semibold text-slate-700">Upload Passport Photo</p>
                                <p className="text-xs text-slate-500 mt-1">White background, face clearly visible</p>
                                <p className="text-xs text-slate-400 mt-0.5">JPEG or PNG, Max 2MB</p>
                                <p className="text-xs text-rose-500 mt-2 font-semibold">Required to submit application</p>
                              </div>
                            )}
                          </div>
                        </div>
                        {photoError && (
                          <p className="text-xs text-rose-600 mt-2 flex items-center gap-1 font-semibold"><WarningCircle size={14} weight="fill" /> Passport photo is mandatory. Please upload a photo to proceed.</p>
                        )}
                      </div>

                      {/* Optional Documents */}
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Birth Certificate <span className="font-normal text-slate-400">(Optional — bring original to school)</span></label>
                        <div className="p-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-center cursor-pointer">
                          <UploadSimple size={24} className="mx-auto text-slate-400 mb-1" />
                          <p className="text-sm font-medium text-slate-600">Click to upload Birth Certificate</p>
                          <p className="text-xs text-slate-400">PDF or JPEG, Max 5MB</p>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Aadhaar Card Copy <span className="font-normal text-slate-400">(Optional)</span></label>
                        <div className="p-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-center cursor-pointer">
                          <UploadSimple size={24} className="mx-auto text-slate-400 mb-1" />
                          <p className="text-sm font-medium text-slate-600">Click to upload Aadhaar Card</p>
                          <p className="text-xs text-slate-400">PDF or JPEG, Max 5MB</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Form Controls */}
                  <div className="flex justify-between mt-10 pt-6 border-t border-slate-100">
                    {step > 1 ? (
                      <button type="button" onClick={prevStep} className="px-6 py-3 rounded-xl font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-2">
                        <ArrowLeft weight="bold" /> Back
                      </button>
                    ) : <div></div>}
                    
                    <button type="submit" disabled={isSubmitting} className="px-8 py-3 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                      {isSubmitting ? "Submitting..." : (step === 4 ? "Submit Application" : "Continue")} 
                      {!isSubmitting && step < 4 && <ArrowRight weight="bold" />}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      
      <div className="no-print">
        <Footer />
      </div>
    </>
  );
}
