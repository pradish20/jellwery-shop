import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Award, 
  Truck, 
  Sparkles, 
  Send, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Lock
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Footer: React.FC = () => {
  const { brandConfig, setCurrentPage, isAdminLoggedIn } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#181411] text-[#E8DCCF] border-t border-[#2E2620]">
      {/* Trust Pillars Bar */}
      <div className="border-b border-[#29221C] bg-[#1E1915]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-start gap-3.5">
              <Award className="w-6 h-6 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif text-sm font-semibold text-[#F7F3ED] tracking-wide">
                  100% BIS Hallmarked
                </h4>
                <p className="text-xs text-[#9E8E7E] mt-1 leading-relaxed">
                  Every 22K piece bears authentic laser hallmark stamps and gem authenticity cards.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Truck className="w-6 h-6 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif text-sm font-semibold text-[#F7F3ED] tracking-wide">
                  Insured Express Transit
                </h4>
                <p className="text-xs text-[#9E8E7E] mt-1 leading-relaxed">
                  Complimentary armored transit across India. Tamper-evident secure sealing.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <ShieldCheck className="w-6 h-6 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif text-sm font-semibold text-[#F7F3ED] tracking-wide">
                  Lifetime Authenticity
                </h4>
                <p className="text-xs text-[#9E8E7E] mt-1 leading-relaxed">
                  Guaranteed heirloom provenance with lifetime buyback and exchange value.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Sparkles className="w-6 h-6 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif text-sm font-semibold text-[#F7F3ED] tracking-wide">
                  Master Heritage Karigars
                </h4>
                <p className="text-xs text-[#9E8E7E] mt-1 leading-relaxed">
                  Preserving centuries-old lost wax casting, Jadau polki, and temple nakshi crafts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Navigation & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Intro & Newsletter (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-5">
            <div>
              <span className="font-display text-xl sm:text-2xl tracking-[0.16em] uppercase text-[#F5EFEB] font-semibold block">
                {brandConfig.brandName}
              </span>
              <p className="text-xs tracking-wider uppercase text-[#C5A262] font-medium mt-1">
                {brandConfig.tagline}
              </p>
            </div>

            <p className="text-xs text-[#A89887] leading-relaxed max-w-sm">
              Dedicated to the preservation and revival of royal Indian antique jewellery. 
              Each bespoke creation is an heirloom passed through generations, forged in pure 22K gold 
              with reverence for cultural legacy.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <span className="text-xs font-serif text-[#F3EEE7] tracking-wider block mb-2">
                Join the Royal Collector's Gazette:
              </span>
              {subscribed ? (
                <div className="p-3 bg-[#241E18] border border-[#785E2B] text-xs text-[#D8B974] rounded-xs">
                  Thank you for joining. You will receive private previews of archival collections.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-sm">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full px-3.5 py-2.5 bg-[#201A16] border border-[#3C3229] rounded-l-xs text-xs text-[#F2EDE6] placeholder-[#807263] focus:outline-none focus:border-[#C5A262]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#8C6D33] hover:bg-[#A88440] text-white text-xs uppercase tracking-wider font-medium rounded-r-xs transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Join</span>
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links / Collections */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm tracking-wider uppercase text-[#F3EFE9] font-medium border-b border-[#2C241D] pb-2">
              Collections
            </h5>
            <ul className="space-y-2 text-xs text-[#A89887]">
              <li>
                <button 
                  onClick={() => setCurrentPage('shop', { category: 'Antique Necklaces' })} 
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Antique Necklaces
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('shop', { category: 'Temple Jewellery' })} 
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Temple Jewellery
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('shop', { collection: 'Royal Rajputana' })} 
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Royal Rajputana
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('shop', { category: 'Bridal Jewellery' })} 
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Bridal Trousseau
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('shop', { collection: 'Nizami Polki' })} 
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Nizami Polki &amp; Jadau
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('shop', { category: 'Vintage Collections' })} 
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Victorian Heirlooms
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Concierge */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm tracking-wider uppercase text-[#F3EFE9] font-medium border-b border-[#2C241D] pb-2">
              Client Concierge
            </h5>
            <ul className="space-y-2 text-xs text-[#A89887]">
              <li>
                <button 
                  onClick={() => setCurrentPage('contact')} 
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Book Private Bridal Appointment
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('about')} 
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  BIS Hallmark &amp; Purity Standards
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('account')} 
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Track Insured Order
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('contact')} 
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Antique Gold Care Guide
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('about')} 
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Artisanal Heritage Process
                </button>
              </li>
            </ul>
          </div>

          {/* Boutique Atelier Contact */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm tracking-wider uppercase text-[#F3EFE9] font-medium border-b border-[#2C241D] pb-2">
              The Flagship Atelier
            </h5>
            <div className="space-y-2.5 text-xs text-[#A89887]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C5A262] shrink-0 mt-0.5" />
                <span>
                  {brandConfig.boutiqueAddress}, {brandConfig.boutiqueCity}, {brandConfig.boutiqueState}, {brandConfig.boutiqueCountry}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A262] shrink-0" />
                <a href={`tel:${brandConfig.contactPhone}`} className="hover:text-[#D4AF37]">
                  {brandConfig.contactPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C5A262] shrink-0" />
                <a href={`mailto:${brandConfig.contactEmail}`} className="hover:text-[#D4AF37]">
                  {brandConfig.contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-[#8C7D6D]">
                <Clock className="w-3.5 h-3.5 text-[#C5A262] shrink-0" />
                <span>{brandConfig.boutiqueHours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Quiet Sub-Footer */}
        <div className="mt-14 pt-6 border-t border-[#261F1A] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#7F7061] gap-4">
          <div>
            © {new Date().getFullYear()} {brandConfig.brandName}. All Rights Reserved. Handcrafted in India.
          </div>
          
          <div className="flex items-center gap-5">
            <span>GST Registered · Government Certified Appraiser</span>
            <span aria-hidden="true">·</span>
            {/* Admin Portal Gateway */}
            <button
              onClick={() => setCurrentPage(isAdminLoggedIn ? 'admin-dashboard' : 'admin-login')}
              className="flex items-center gap-1.5 text-[#A89369] hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>{isAdminLoggedIn ? 'Store Management' : 'Admin Portal'}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
