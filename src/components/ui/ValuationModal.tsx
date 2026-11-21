"use client";

import React, { useState, useEffect } from "react";
import { X, Phone, CheckCircle2, ShieldCheck, ArrowRight, Building, Clock, MessageSquare, User } from "lucide-react";
import { BRAND_INFO } from "@/lib/constants";

interface ValuationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ValuationModal: React.FC<ValuationModalProps> = ({ isOpen, onClose }) => {
  // Form State
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [service, setService] = useState<string>("Sell Gold for Instant Cash");
  const [notes, setNotes] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Close on Escape key & Lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      setSubmitted(false);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) return;
    setSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-maroon-darkest/98 border border-gold-metallic/40 rounded-3xl shadow-gold-glow p-5 sm:p-7 md:p-8 text-luxury-ivory"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full border border-gold-metallic/30 text-gold-champagne hover:text-white hover:bg-gold-metallic/20 transition-all cursor-pointer"
          aria-label="Close valuation modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          /* ========================================================= */
          /* SUCCESS CONFIRMATION STATE                                */
          /* ========================================================= */
          <div className="py-8 text-center space-y-5 animate-fadeIn">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-400/40 flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9 text-emerald-400" />
            </div>

            <div className="space-y-1.5">
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-luxury-ivory">
                Valuation Request Received
              </h3>
              <p className="text-xs sm:text-sm text-gold-champagne/90">
                Reference ID: <span className="font-semibold text-luxury-ivory">AGC-{Math.floor(100000 + Math.random() * 900000)}</span>
              </p>
            </div>

            <p className="text-xs sm:text-sm text-luxury-ivory/85 max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-gold-champagne">{name || "Valued Customer"}</strong>. Our Senior Valuation Officer will contact you at <strong className="text-gold-champagne">{phone}</strong> within <span className="text-emerald-400 font-medium">15 minutes</span>.
            </p>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`tel:${BRAND_INFO.helpline.replace(/\s+/g, "")}`}
                className="gold-gradient-btn px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-maroon-darkest inline-flex items-center gap-2 shadow-gold-glow w-full sm:w-auto justify-center"
              >
                <Phone className="w-4 h-4" />
                <span>Call Helpline: {BRAND_INFO.helpline}</span>
              </a>

              <button
                onClick={onClose}
                className="px-6 py-3 rounded-full border border-gold-metallic/40 text-gold-champagne hover:bg-gold-metallic/15 text-xs uppercase tracking-wider font-medium w-full sm:w-auto cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* ========================================================= */
          /* CLEAN LUXURY CONTACT FORM                                 */
          /* ========================================================= */
          <div className="space-y-5">
            {/* Modal Header */}
            <div className="space-y-1 pr-8">
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-luxury-ivory tracking-tight">
                Request Gold Valuation
              </h2>
              <p className="text-xs text-luxury-ivory/70">
                100% confidential private cabin appraisal • Zero melting deductions
              </p>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Full Name */}
              <div>
                <label htmlFor="customer-name" className="block text-[10px] uppercase tracking-wider text-luxury-muted mb-1 font-medium">
                  Your Full Name <span className="text-gold-champagne">*</span>
                </label>
                <div className="relative">
                  <input
                    id="customer-name"
                    type="text"
                    required
                    placeholder="e.g. Vikram Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-gold-metallic/30 text-xs text-luxury-ivory focus:border-gold-champagne focus:outline-none placeholder:text-luxury-muted/50"
                  />
                  <User className="w-4 h-4 text-gold-metallic/50 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Mobile Number */}
              <div>
                <label htmlFor="customer-phone" className="block text-[10px] uppercase tracking-wider text-luxury-muted mb-1 font-medium">
                  Mobile Number (For Callback) <span className="text-gold-champagne">*</span>
                </label>
                <div className="relative">
                  <input
                    id="customer-phone"
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-gold-metallic/30 text-xs text-luxury-ivory focus:border-gold-champagne focus:outline-none placeholder:text-luxury-muted/50"
                  />
                  <Phone className="w-4 h-4 text-gold-metallic/50 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Service Required */}
              <div>
                <label htmlFor="service-type" className="block text-[10px] uppercase tracking-wider text-luxury-muted mb-1 font-medium">
                  Service Required
                </label>
                <div className="relative">
                  <select
                    id="service-type"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-gold-metallic/30 text-xs text-luxury-ivory focus:border-gold-champagne focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="Sell Gold for Instant Cash" className="bg-maroon-darkest text-white">Sell Gold (Spot Cash Payment)</option>
                    <option value="Release Pledged Gold from Bank" className="bg-maroon-darkest text-white">Release Pledged Gold from Bank / NBFC</option>
                    <option value="Buy 24K Bullion Coins" className="bg-maroon-darkest text-white">Buy 24K Certified Bullion Coins</option>
                    <option value="General Gold Appraisal Enquiry" className="bg-maroon-darkest text-white">General Gold Appraisal Enquiry</option>
                  </select>
                  <Building className="w-4 h-4 text-gold-metallic/50 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Optional Gold Details / Notes */}
              <div>
                <label htmlFor="customer-notes" className="block text-[10px] uppercase tracking-wider text-luxury-muted mb-1 font-medium">
                  Approximate Weight / Jewellery Details (Optional)
                </label>
                <div className="relative">
                  <input
                    id="customer-notes"
                    type="text"
                    placeholder="e.g. ~25 grams bangles, 22K hallmark"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-gold-metallic/30 text-xs text-luxury-ivory focus:border-gold-champagne focus:outline-none placeholder:text-luxury-muted/50"
                  />
                  <MessageSquare className="w-4 h-4 text-gold-metallic/50 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full gold-gradient-btn py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-maroon-darkest inline-flex items-center justify-center gap-2 shadow-gold-glow mt-3 cursor-pointer active:scale-95 transition-transform"
              >
                <span>Request Valuation Callback</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Call Alternative */}
            <div className="pt-2 text-center">
              <span className="text-[11px] text-luxury-muted">
                Need immediate assistance?{" "}
                <a
                  href={`tel:${BRAND_INFO.helpline.replace(/\s+/g, "")}`}
                  className="text-gold-champagne font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call {BRAND_INFO.helpline}</span>
                </a>
              </span>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-4 pt-2 border-t border-gold-metallic/20 text-[10px] text-luxury-muted">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-metallic" />
                <span>100% Confidential</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gold-metallic" />
                <span>15-Min Response</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-gold-metallic" />
                <span>200+ Branches</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
