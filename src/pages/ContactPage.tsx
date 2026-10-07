import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Calendar, 
  Check, 
  Sparkles,
  HelpCircle 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { brandConfig } = useStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    consultationType: 'In-Person Boutique (Jaipur)',
    categoryInterest: 'Bridal Jewellery',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const faqs = [
    {
      q: 'How do I verify the gold purity of antique pieces?',
      a: 'Every piece is 100% BIS 916 hallmarked by government-recognized assay centres with a unique laser HUID (Hallmark Unique Identification). You also receive an authenticated gemological certificate detailing gemstone carats and provenance.'
    },
    {
      q: 'Can antique bangles and necklaces be resized?',
      a: 'Yes. Most antique necklaces feature an adjustable royal zari dori (silk thread cord). Our kadas feature concealed screw locks or flexible hinges. Bespoke resizing is done complimentary in our atelier prior to dispatch.'
    },
    {
      q: 'How are antique jewellery pieces shipped safely?',
      a: 'All shipments are transported via dedicated insured armored logistics partners (BVC Logistics / Sequel Secure) in tamper-evident velvet cases. transit is fully insured for 100% of order value.'
    },
    {
      q: 'What is your return or exchange policy?',
      a: 'We offer an unconditional 7-day insured return policy. Pieces can be returned in original condition with intact seals. We also provide a lifetime exchange policy at market gold rate.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#947432] font-semibold block">
          Client Concierge &amp; Ateliers
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#1E1915] font-light">
          Bespoke Consultation &amp; Care
        </h1>
        <p className="text-xs sm:text-sm text-[#736353] leading-relaxed">
          Schedule a private appointment with our heirloom jewellery curators or connect directly with our atelier.
        </p>
      </div>

      {/* Main Grid: Consultation Booking Form + Boutique Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Booking Form (7 cols on lg) */}
        <div className="lg:col-span-7 bg-[#FAF7F2] p-6 sm:p-10 rounded-xs border border-[#E8DEC8]">
          <div className="mb-6">
            <h2 className="font-serif text-2xl text-[#1E1915]">
              Book a Private Bridal Consultation
            </h2>
            <p className="text-xs text-[#7A6959] mt-1">
              Complimentary 45-minute personalized styling session with our senior jewellery curator.
            </p>
          </div>

          {formSubmitted ? (
            <div className="bg-white border border-[#DFD1B8] p-8 text-center rounded-xs space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#EAF5ED] text-[#2C6B3F] flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#1E1915]">
                Consultation Request Confirmed
              </h3>
              <p className="text-xs text-[#6B5A4B] max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. Our senior concierge will contact you at{' '}
                <strong>{formData.phone || formData.email}</strong> within 4 business hours to finalize your private appointment.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="mt-4 px-5 py-2 text-xs uppercase tracking-wider text-[#947432] underline hover:no-underline font-medium cursor-pointer"
              >
                Schedule Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#4E3F32] mb-1 font-medium">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Gayatri Devi"
                    className="w-full p-2.5 bg-white border border-[#D5C9B8] rounded-xs text-[#1E1915] focus:outline-none focus:border-[#947432]"
                  />
                </div>

                <div>
                  <label className="block text-[#4E3F32] mb-1 font-medium">Contact Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full p-2.5 bg-white border border-[#D5C9B8] rounded-xs text-[#1E1915] focus:outline-none focus:border-[#947432]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#4E3F32] mb-1 font-medium">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full p-2.5 bg-white border border-[#D5C9B8] rounded-xs text-[#1E1915] focus:outline-none focus:border-[#947432]"
                  />
                </div>

                <div>
                  <label className="block text-[#4E3F32] mb-1 font-medium">Preferred Date</label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#D5C9B8] rounded-xs text-[#1E1915] focus:outline-none focus:border-[#947432]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#4E3F32] mb-1 font-medium">Consultation Format</label>
                  <select
                    value={formData.consultationType}
                    onChange={(e) => setFormData({ ...formData, consultationType: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#D5C9B8] rounded-xs text-[#1E1915] focus:outline-none focus:border-[#947432]"
                  >
                    <option>In-Person Flagship Atelier (Jaipur)</option>
                    <option>Private Viewing Suite (Mumbai)</option>
                    <option>Virtual High-Definition Video Concierge</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#4E3F32] mb-1 font-medium">Jewellery Collection Interest</label>
                  <select
                    value={formData.categoryInterest}
                    onChange={(e) => setFormData({ ...formData, categoryInterest: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#D5C9B8] rounded-xs text-[#1E1915] focus:outline-none focus:border-[#947432]"
                  >
                    <option>Complete Bridal Trousseau</option>
                    <option>Temple Jewellery &amp; Haram</option>
                    <option>Antique Necklaces &amp; Chokers</option>
                    <option>Kundan Jadau &amp; Polki Sets</option>
                    <option>Bespoke Heirloom Remodelling</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#4E3F32] mb-1 font-medium">Specific Requests or Wedding Dates</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Share details such as outfit colors, wedding dates, or heirloom preferences..."
                  className="w-full p-2.5 bg-white border border-[#D5C9B8] rounded-xs text-[#1E1915] focus:outline-none focus:border-[#947432]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#1E1915] text-white text-xs uppercase tracking-widest font-semibold rounded-xs hover:bg-[#382F27] transition-colors cursor-pointer shadow-sm"
              >
                Request Private Appointment
              </button>
            </form>
          )}
        </div>

        {/* Boutique Locations & Contact (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FAF7F2] p-6 rounded-xs border border-[#E8DEC8] space-y-4">
            <h3 className="font-serif text-xl text-[#1E1915]">
              The Jaipur Flagship Atelier
            </h3>

            <div className="space-y-3 text-xs text-[#5C4C3E]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#947432] shrink-0 mt-0.5" />
                <span>
                  {brandConfig.boutiqueAddress}, {brandConfig.boutiqueCity}, {brandConfig.boutiqueState} - {brandConfig.boutiqueCountry}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#947432] shrink-0" />
                <a href={`tel:${brandConfig.contactPhone}`} className="hover:text-[#947432]">
                  {brandConfig.contactPhone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#947432] shrink-0" />
                <a href={`mailto:${brandConfig.contactEmail}`} className="hover:text-[#947432]">
                  {brandConfig.contactEmail}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#947432] shrink-0" />
                <span>{brandConfig.boutiqueHours}</span>
              </div>
            </div>

            {/* Direct WhatsApp Button */}
            <div className="pt-2">
              <a
                href={`https://wa.me/${brandConfig.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(brandConfig.brandName)},%20I%20would%20like%20to%20connect%20with%20your%20concierge.`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Instantly via WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Mumbai Viewing Salon */}
          <div className="bg-[#FAF7F2] p-6 rounded-xs border border-[#E8DEC8] space-y-2 text-xs text-[#5C4C3E]">
            <h4 className="font-serif text-base font-semibold text-[#1E1915]">
              Mumbai Private Viewing Suite (By Prior Appointment)
            </h4>
            <p>
              The Taj Mahal Palace, Colaba, Mumbai 400001, Maharashtra, India.
            </p>
            <p className="text-[11px] text-[#8C7A68]">
              Open for private trousseau appointments every Thursday &amp; Friday.
            </p>
          </div>
        </div>

      </div>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="bg-white border border-[#EDE5D8] p-8 sm:p-12 rounded-xs">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#947432] font-semibold block">
            Collector Queries
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#1E1915]">
            Frequently Answered Questions
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-5 bg-[#FAF7F2] rounded-xs border border-[#EAE0CF] space-y-2">
              <h4 className="font-serif text-sm font-semibold text-[#1E1915] flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-[#947432] shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs text-[#6B5A4B] leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
