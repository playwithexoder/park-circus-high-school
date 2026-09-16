import React from 'react';
import { schoolInfo } from '@/lib/data/school-info';

interface ApplicationPDFViewProps {
  formData: any;
  applicationNo: string;
}

export function ApplicationPDFView({ formData, applicationNo }: ApplicationPDFViewProps) {
  return (
    <div className="hidden print-only bg-white text-black min-h-screen w-full absolute top-0 left-0 z-[9999] p-10 font-sans text-sm">
      
      {/* Header with Circular SVG Logo */}
      <div className="flex items-center justify-between border-b-2 border-black pb-6 mb-8">
        <div className="flex items-center gap-5">
          {/* Plain circular logo — no black bg on white paper */}
          <div className="relative w-20 h-20 shrink-0 border-2 border-black rounded-full p-1 flex items-center justify-center">
            <img src="/assets/logo_png.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-xl font-bold uppercase tracking-widest">{schoolInfo.name}</h1>
            <p className="text-xs mt-0.5">Estd. 1936 | Govt. Sponsored | Affiliated to WBCHSE & WBBSE</p>
            <p className="text-xs">{schoolInfo.contact.address}</p>
            <p className="text-xs">Phone: {schoolInfo.contact.phone1} | Email: {schoolInfo.contact.email}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-base border border-black px-3 py-1 mb-2">ADMISSION FORM</p>
          <p className="text-xs">Session: 2026–2027</p>
          <p className="text-xs font-bold mt-1">App No: <span className="font-mono">{applicationNo}</span></p>
          <p className="text-xs text-gray-500">Date: {new Date().toLocaleDateString("en-IN")}</p>
          {/* Photo Box */}
          <div className="mt-3 w-24 h-28 border-2 border-black flex items-center justify-center overflow-hidden bg-gray-100 ml-auto">
            {formData.photoUrl ? (
              <img src={formData.photoUrl} alt="Applicant" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-1">
                <p className="text-[9px] text-gray-500 leading-tight">Affix Passport</p>
                <p className="text-[9px] text-gray-500 leading-tight">Size Photo</p>
                <p className="text-[9px] text-gray-500 leading-tight">Here</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Student Details */}
      <div className="mb-6">
        <div className="bg-gray-200 p-1.5 border border-black mb-0">
          <h2 className="font-bold uppercase text-xs">Section A — Student Details</h2>
        </div>
        <table className="w-full border-collapse border border-black text-xs">
          <tbody>
            <tr>
              <td className="border border-black p-2 font-bold bg-gray-50 w-1/4">Name of Student</td>
              <td className="border border-black p-2 w-1/4 font-semibold uppercase">{formData.studentName || '—'}</td>
              <td className="border border-black p-2 font-bold bg-gray-50 w-1/4">Date of Birth</td>
              <td className="border border-black p-2 w-1/4">{formData.dob ? new Date(formData.dob).toLocaleDateString("en-IN") : '—'}</td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-bold bg-gray-50">Gender</td>
              <td className="border border-black p-2 capitalize">{formData.gender || '—'}</td>
              <td className="border border-black p-2 font-bold bg-gray-50">Religion</td>
              <td className="border border-black p-2">{formData.religion || '—'}</td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-bold bg-gray-50">Category / Caste</td>
              <td className="border border-black p-2 uppercase">{formData.caste || '—'}</td>
              <td className="border border-black p-2 font-bold bg-gray-50">Blood Group</td>
              <td className="border border-black p-2">{formData.bloodGroup || '—'}</td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-bold bg-gray-50">Student Aadhaar No.</td>
              <td className="border border-black p-2 font-mono" colSpan={3}>{formData.studentAadhaar || '—'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Academic Details */}
      <div className="mb-6">
        <div className="bg-gray-200 p-1.5 border border-black mb-0">
          <h2 className="font-bold uppercase text-xs">Section B — Academic Details</h2>
        </div>
        <table className="w-full border-collapse border border-black text-xs">
          <tbody>
            <tr>
              <td className="border border-black p-2 font-bold bg-gray-50 w-1/4">Admission Sought in Class</td>
              <td className="border border-black p-2 w-1/4">{formData.classApplied || '—'}</td>
              <td className="border border-black p-2 font-bold bg-gray-50 w-1/4">Previous School (If any)</td>
              <td className="border border-black p-2 w-1/4">{formData.previousSchool || '—'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Parent/Guardian Details */}
      <div className="mb-6">
        <div className="bg-gray-200 p-1.5 border border-black mb-0">
          <h2 className="font-bold uppercase text-xs">Section C — Parent / Guardian Details</h2>
        </div>
        <table className="w-full border-collapse border border-black text-xs">
          <tbody>
            <tr>
              <td className="border border-black p-2 font-bold bg-gray-50 w-1/4">Father's Name</td>
              <td className="border border-black p-2 w-1/4">{formData.fatherName || '—'}</td>
              <td className="border border-black p-2 font-bold bg-gray-50 w-1/4">Mother's Name</td>
              <td className="border border-black p-2 w-1/4">{formData.motherName || '—'}</td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-bold bg-gray-50">Guardian Mobile No.</td>
              <td className="border border-black p-2 font-mono">{formData.guardianMobile || '—'}</td>
              <td className="border border-black p-2 font-bold bg-gray-50">Alternate Contact No.</td>
              <td className="border border-black p-2 font-mono">{formData.alternateContact || '—'}</td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-bold bg-gray-50">Residential Address</td>
              <td className="border border-black p-2" colSpan={3}>{formData.address || '—'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Office Use */}
      <div className="mb-6">
        <div className="bg-gray-200 p-1.5 border border-black mb-0">
          <h2 className="font-bold uppercase text-xs">For Office Use Only</h2>
        </div>
        <table className="w-full border-collapse border border-black text-xs">
          <tbody>
            <tr>
              <td className="border border-black p-3 font-bold bg-gray-50 w-1/4">Admission No.</td>
              <td className="border border-black p-3 w-1/4">&nbsp;</td>
              <td className="border border-black p-3 font-bold bg-gray-50 w-1/4">Date of Admission</td>
              <td className="border border-black p-3 w-1/4">&nbsp;</td>
            </tr>
            <tr>
              <td className="border border-black p-3 font-bold bg-gray-50">Verified By</td>
              <td className="border border-black p-3">&nbsp;</td>
              <td className="border border-black p-3 font-bold bg-gray-50">Remarks</td>
              <td className="border border-black p-3">&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Declaration & Signatures */}
      <div className="mt-10 pt-6 border-t-2 border-black text-xs">
        <p className="mb-10">I hereby declare that all the information furnished above is true and correct to the best of my knowledge. I understand that if any information is found incorrect, the admission may be cancelled without notice.</p>
        
        <div className="flex justify-between mt-6">
          <div className="text-center">
            <div className="border-b border-black w-48 mb-2"></div>
            <p className="font-semibold">Signature of Parent / Guardian</p>
            <p className="mt-2 text-gray-500">Date: _________________</p>
          </div>
          <div className="text-center">
            <div className="border-b border-black w-48 mb-2"></div>
            <p className="font-semibold">Signature of Head of Institution</p>
            <p className="mt-2 text-gray-500">Official Stamp &amp; Date</p>
          </div>
        </div>
      </div>
      
    </div>
  );
}
