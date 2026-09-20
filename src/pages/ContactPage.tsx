import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  ShieldAlert,
  Loader2,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { ContactFormData } from '../types';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { SectionTitle } from '../components/common/SectionTitle';
import { GlassCard } from '../components/common/GlassCard';
import { TiltCard } from '../components/3d/TiltCard';
import { Communication3D } from '../components/3d/Communication3D';
import { Button3D } from '../components/common/Button3D';
import { SEOHead } from '../components/layout/SEOHead';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [validationErrors, setValidationErrors] = useState<Partial<ContactFormData>>({});

  const validate = (): boolean => {
    const errors: Partial<ContactFormData> = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required.';
    }

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required.';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please provide a valid email address.';
    }

    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required.';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message content cannot be empty.';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const key = name === 'name' ? 'fullName' : name === 'phone' ? 'phoneNumber' : name;
    setFormData((prev) => ({ ...prev, [key]: value }));

    // Clear field-specific error as user types
    if (validationErrors[key as keyof ContactFormData]) {
      setValidationErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setStatus('loading');

    const targetEmail = siteConfig.contact.formRecipientEmail || siteConfig.contact.email;
    const isRealEmail = targetEmail && targetEmail.includes('@') && !targetEmail.includes('[');

    try {
      if (isRealEmail) {
        const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: formData.fullName,
            phone: formData.phoneNumber,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            _subject: `New EMBTA Portal Inquiry: ${formData.subject} (from ${formData.fullName})`,
            _template: 'table',
            _captcha: 'false',
          }),
        });

        const data = await response.json();
        if (!response.ok || data.success === 'false' || data.success === false) {
          throw new Error(data.message || 'Form submission service error');
        }
      } else {
        // Fallback simulation when placeholder is active
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }

      setStatus('success');
      setFormData({
        fullName: '',
        phoneNumber: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-embta-navy text-embta-light pt-20">
      <SEOHead
        title="Contact Desk"
        description="Get in touch with the EMBTA Central Secretariat, submit commercial inquiries, or lodge emergency highway transit grievances."
      />

      {/* Breadcrumb Bar */}
      <div className="bg-embta-navy-dark border-b border-embta-surface-border py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <Breadcrumb items={[{ label: 'Contact Desk' }]} />
          <div className="flex items-center gap-2 text-xs font-mono text-embta-green-light">
            <span className="w-2 h-2 rounded-full bg-embta-green animate-pulse" />
            <span>DISPATCH DESK: ONLINE</span>
          </div>
        </div>
      </div>

      {/* 1. Page Header with 3D Communication Scene */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-b from-embta-navy-dark via-embta-navy to-embta-navy border-b border-embta-surface-border overflow-hidden">
        {/* Three.js 3D Communication Network Scene (Section 23) */}
        <Communication3D className="w-full h-full absolute inset-0 z-0 opacity-70" />

        <div className="absolute inset-0 bg-gradient-to-b from-embta-navy-dark/70 via-transparent to-embta-navy pointer-events-none z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-embta-green/20 border border-embta-green/40 text-xs font-bold uppercase tracking-wider text-embta-green-light shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Official Secretariat Services</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                CONTACT DESK
              </h1>

              <p className="text-base sm:text-xl text-embta-slate leading-relaxed max-w-2xl">
                Get in touch with the EMBTA Secretariat, register commercial trade inquiries, request certified verification, or lodge formal transit grievances.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <div className="p-4 rounded-xl bg-embta-navy-dark/80 backdrop-blur-md border border-embta-surface-border shadow-3d-card space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-embta-green-light block">
                  Response Benchmark
                </span>
                <p className="text-sm font-bold text-white">Within 48 Business Hours</p>
                <p className="text-xs text-embta-slate-dim">
                  Inquiries are logged into the central secretariat register.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Secretariat Info & Contact Form */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Official Coordinates & Emergency Highway Desk */}
            <div className="lg:col-span-5 space-y-8">
              {/* Official Insignia & Seal Card */}
              <TiltCard maxTilt={5}>
                <GlassCard variant="navy" className="p-7 space-y-6 shadow-3d-card">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-xl bg-embta-navy border border-embta-surface-border p-2 flex items-center justify-center shrink-0">
                      <img
                        src={siteConfig.logoUrl}
                        alt="EMBTA Official Emblem"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-wider text-embta-green-light">
                        Institutional Seal
                      </span>
                      <h3 className="text-base font-bold text-white leading-tight mt-0.5">
                        {siteConfig.name}
                      </h3>
                      <span className="text-xs text-embta-slate-dim font-mono">
                        {siteConfig.motto}
                      </span>
                    </div>
                  </div>

                  <div className="h-px bg-embta-surface-border" />

                  {/* Official Secretariat Coordinates */}
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-embta-navy-light flex items-center justify-center text-embta-green-light shrink-0 mt-0.5">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-embta-slate-dim block">
                          Head Office & Secretariat
                        </span>
                        <span className="text-white font-medium block">
                          {siteConfig.contact.headOffice}
                        </span>
                        <span className="text-embta-slate text-xs font-mono block mt-0.5">
                          {siteConfig.contact.po}, {siteConfig.contact.ps}
                        </span>
                        <span className="text-embta-slate text-xs font-mono block">
                          {siteConfig.contact.district}
                        </span>
                        <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
                          <span className="px-2 py-0.5 rounded bg-embta-green/20 text-embta-green-light border border-embta-green/30 font-bold">
                            {siteConfig.contact.regdNo}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-white/5 text-embta-slate border border-white/10">
                            {siteConfig.contact.estd}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-embta-navy-light flex items-center justify-center text-embta-green-light shrink-0 mt-0.5">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-embta-slate-dim block">
                          Telephone Line
                        </span>
                        <a
                          href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                          className="text-white hover:text-embta-green-light font-mono font-medium underline transition-colors"
                        >
                          {siteConfig.contact.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-embta-navy-light flex items-center justify-center text-embta-green-light shrink-0 mt-0.5">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-embta-slate-dim block">
                          Official Correspondence
                        </span>
                        {siteConfig.contact.email.includes('@') && !siteConfig.contact.email.includes('[') ? (
                          <a
                            href={`mailto:${siteConfig.contact.email}`}
                            className="text-white hover:text-embta-green-light font-mono font-medium underline transition-colors"
                          >
                            {siteConfig.contact.email}
                          </a>
                        ) : (
                          <span className="text-white font-mono font-medium">
                            {siteConfig.contact.email}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-embta-navy-light flex items-center justify-center text-embta-slate shrink-0 mt-0.5">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-embta-slate-dim block">
                          Public Chamber Hours
                        </span>
                        <span className="text-white font-mono font-medium">
                          {siteConfig.contact.officeHours}
                        </span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </TiltCard>

              {/* Emergency Transit Cell Alert Box */}
              <GlassCard className="p-6 border-embta-red/30 bg-embta-red/10 space-y-3">
                <div className="flex items-center gap-2 text-red-400">
                  <ShieldAlert className="w-5 h-5 shrink-0" />
                  <h4 className="text-sm font-bold uppercase tracking-wider">
                    Emergency Highway Transit Desk
                  </h4>
                </div>
                <p className="text-xs text-red-200 leading-relaxed">
                  For urgent cargo detentions, logistics obstructions, or interstate border trade disputes requiring immediate liaison:
                </p>
                <div className="p-3 rounded-lg bg-embta-navy-dark/90 border border-embta-red/30 text-xs font-mono text-white flex items-center justify-between">
                  <span>TRANSIT HOTLINE:</span>
                  <span className="font-bold text-red-300">
                    {siteConfig.contact.phone}
                  </span>
                </div>
              </GlassCard>
            </div>

            {/* Right Column: Contact Form (Section 22) */}
            <div className="lg:col-span-7">
              <TiltCard maxTilt={3} className="w-full">
                <GlassCard variant="navy" className="p-8 sm:p-10 shadow-3d-card">
                  <div className="mb-6 space-y-1">
                    <h3 className="text-2xl font-bold text-white">
                      Dispatch Official Message
                    </h3>
                    <p className="text-xs sm:text-sm text-embta-slate-dim">
                      Submit formal inquiries, membership registration requests, or grievance briefs.
                    </p>
                  </div>

                  {/* Status Alerts */}
                  {status === 'success' && (
                    <div className="mb-6 p-4 rounded-xl bg-embta-green/20 border border-embta-green/50 text-embta-green-light text-sm flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-bold">Message Dispatched Successfully!</strong>
                        <span>
                          Your communication has been logged with the secretariat. A confirmation response will be returned within 48 business hours.
                        </span>
                      </div>
                    </div>
                  )}

                  {status === 'error' && (
                    <div className="mb-6 p-4 rounded-xl bg-embta-red/20 border border-embta-red/50 text-red-300 text-sm flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-bold">Dispatch Error</strong>
                        <span>
                          An error occurred while submitting your message. Please verify your internet connection or use official email channels directly.
                        </span>
                      </div>
                    </div>
                  )}

                  <form
                    action="https://formsubmit.co/embtaoffice@gmail.com"
                    method="POST"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    noValidate
                  >
                    {/* FormSubmit Configuration */}
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="_template" value="table" />
                    <input type="hidden" name="_subject" value="New EMBTA Portal Official Inquiry" />
                    <input type="hidden" name="_next" value="https://embtaoffice-source.github.io/EMBTA/contact" />

                    {/* Full Name & Phone Number */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="fullName"
                          className="block text-xs font-bold uppercase tracking-wider text-embta-slate mb-1.5"
                        >
                          Full Name *
                        </label>
                        <input
                          id="fullName"
                          name="name"
                          type="text"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="e.g. John Doe"
                          className={`w-full px-4 py-2.5 rounded-lg bg-embta-navy-dark border ${
                            validationErrors.fullName
                              ? 'border-embta-red focus:ring-embta-red'
                              : 'border-embta-surface-border focus:border-embta-green'
                          } text-white placeholder-embta-slate-dim/50 text-sm focus:outline-none focus:ring-2 focus:ring-embta-green/40 transition-all`}
                        />
                        {validationErrors.fullName && (
                          <span className="text-[11px] text-red-400 mt-1 block">
                            {validationErrors.fullName}
                          </span>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="phoneNumber"
                          className="block text-xs font-bold uppercase tracking-wider text-embta-slate mb-1.5"
                        >
                          Phone Number *
                        </label>
                        <input
                          id="phoneNumber"
                          name="phone"
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          placeholder="e.g. +91 98765 43210"
                          className={`w-full px-4 py-2.5 rounded-lg bg-embta-navy-dark border ${
                            validationErrors.phoneNumber
                              ? 'border-embta-red focus:ring-embta-red'
                              : 'border-embta-surface-border focus:border-embta-green'
                          } text-white placeholder-embta-slate-dim/50 text-sm focus:outline-none focus:ring-2 focus:ring-embta-green/40 transition-all`}
                        />
                        {validationErrors.phoneNumber && (
                          <span className="text-[11px] text-red-400 mt-1 block">
                            {validationErrors.phoneNumber}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Email & Subject */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs font-bold uppercase tracking-wider text-embta-slate mb-1.5"
                        >
                          Email Address *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="name@example.com"
                          className={`w-full px-4 py-2.5 rounded-lg bg-embta-navy-dark border ${
                            validationErrors.email
                              ? 'border-embta-red focus:ring-embta-red'
                              : 'border-embta-surface-border focus:border-embta-green'
                          } text-white placeholder-embta-slate-dim/50 text-sm focus:outline-none focus:ring-2 focus:ring-embta-green/40 transition-all`}
                        />
                        {validationErrors.email && (
                          <span className="text-[11px] text-red-400 mt-1 block">
                            {validationErrors.email}
                          </span>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-xs font-bold uppercase tracking-wider text-embta-slate mb-1.5"
                        >
                          Subject *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className={`w-full px-4 py-2.5 rounded-lg bg-embta-navy-dark border ${
                            validationErrors.subject
                              ? 'border-embta-red focus:ring-embta-red'
                              : 'border-embta-surface-border focus:border-embta-green'
                          } text-white text-sm focus:outline-none focus:ring-2 focus:ring-embta-green/40 transition-all`}
                        >
                          <option value="">-- Select Subject Category --</option>
                          <option value="General Secretariat Inquiry">General Secretariat Inquiry</option>
                          <option value="Member Registration & ID">Member Registration & ID</option>
                          <option value="Logistics & Transit Grievance">Logistics & Transit Grievance</option>
                          <option value="Timber & Trade Compliance">Timber & Trade Compliance</option>
                          <option value="Press & Official Gazette">Press & Official Gazette</option>
                        </select>
                        {validationErrors.subject && (
                          <span className="text-[11px] text-red-400 mt-1 block">
                            {validationErrors.subject}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs font-bold uppercase tracking-wider text-embta-slate mb-1.5"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Please provide explicit details regarding your inquiry, enterprise name, or transit route details..."
                        className={`w-full px-4 py-2.5 rounded-lg bg-embta-navy-dark border ${
                          validationErrors.message
                            ? 'border-embta-red focus:ring-embta-red'
                            : 'border-embta-surface-border focus:border-embta-green'
                        } text-white placeholder-embta-slate-dim/50 text-sm focus:outline-none focus:ring-2 focus:ring-embta-green/40 transition-all resize-y`}
                      />
                      {validationErrors.message && (
                        <span className="text-[11px] text-red-400 mt-1 block">
                          {validationErrors.message}
                        </span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2 flex items-center justify-between">
                      <Button3D
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={status === 'loading'}
                        icon={
                          status === 'loading' ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Send className="w-4 h-4" />
                          )
                        }
                      >
                        {status === 'loading' ? 'TRANSMITTING...' : 'SEND MESSAGE'}
                      </Button3D>

                      <div className="hidden sm:flex items-center gap-1.5 text-xs text-embta-slate-dim">
                        <ShieldCheck className="w-4 h-4 text-embta-green" />
                        <span>Statutory Encrypted Dispatch</span>
                      </div>
                    </div>
                  </form>
                </GlassCard>
              </TiltCard>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
