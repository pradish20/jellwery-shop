import React from 'react';
import { Award, Compass, Sparkles, ShieldCheck, ArrowRight, Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

export const AboutPage: React.FC = () => {
  const { brandConfig, setCurrentPage } = useStore();

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* Editorial Hero Banner */}
      <section className="relative min-h-[420px] flex items-center justify-center bg-[#171310] text-[#FDFCF9] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1920&q=80"
            alt="Heritage Jewellery Atelier"
            fallbackTitle="The Heritage Legacy"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171310] via-[#171310]/70 to-[#171310]/90" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A262] font-semibold block">
            Our Heritage &amp; Ethos
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#FBF9F5] tracking-tight">
            Preserving The Sacred Art of Indian Antique Jewellery
          </h1>
          <p className="text-sm sm:text-base text-[#C2B19F] max-w-xl mx-auto font-light leading-relaxed">
            Where ancestral craftsmanship meets royal provenance. Every creation is an enduring dialogue with history.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="space-y-5 text-xs sm:text-sm text-[#5C4C3E] leading-relaxed">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#947432] font-semibold block">
              The Genesis
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1E1915] font-light leading-snug">
              Born from a reverence for forgotten royal dynasties.
            </h2>
            <p>
              In an era dominated by rapid mass production and computerized casting, 
              <strong> {brandConfig.brandName}</strong> was founded to safeguard India’s priceless jewellery traditions. 
              From the temple treasures of the Cholas in Thanjavur to the celestial Jadau ateliers of Rajputana 
              and the decadent Nizami vaults of Hyderabad, our collection restores genuine antique grandeur to modern collectors.
            </p>
            <p>
              We do not merely sell jewellery. We preserve heirlooms that carry spiritual meaning, 
              intricate iconography, and the unmistakable soul of master human hands.
            </p>
          </div>

          <div className="relative aspect-4/3 rounded-xs overflow-hidden border border-[#DFD1B8] shadow-md bg-[#F5EFEA]">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80"
              alt="Antique jewellery atelier"
              fallbackTitle="Generations of Goldcraft"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* The Four Pillar Techniques */}
      <section className="bg-[#FAF7F2] border-y border-[#E8DEC8] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#947432] font-semibold block">
              Centuries-Old Processes
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1E1915]">
              The Four Sacred Techniques of Antique Goldsmithing
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white border border-[#EAE0CF] rounded-xs space-y-3">
              <span className="font-display text-xl text-[#947432] font-semibold block">01</span>
              <h4 className="font-serif text-base font-semibold text-[#1E1915]">
                Temple Nakshi &amp; Repoussé
              </h4>
              <p className="text-xs text-[#6B5A4B] leading-relaxed">
                Sculpting intricate deity figures and flora into heavy sheets of 22K gold using hand chisels and pitch beds without any machine punches.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#EAE0CF] rounded-xs space-y-3">
              <span className="font-display text-xl text-[#947432] font-semibold block">02</span>
              <h4 className="font-serif text-base font-semibold text-[#1E1915]">
                Jadau &amp; Polki Setting
              </h4>
              <p className="text-xs text-[#6B5A4B] leading-relaxed">
                Embedding raw uncut diamonds into 24K purified gold foil (daak), capturing ambient candle and lamp light with historic royal luster.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#EAE0CF] rounded-xs space-y-3">
              <span className="font-display text-xl text-[#947432] font-semibold block">03</span>
              <h4 className="font-serif text-base font-semibold text-[#1E1915]">
                Champlevé Meenakari
              </h4>
              <p className="text-xs text-[#6B5A4B] leading-relaxed">
                Enamelling mineral colors onto the hidden reverse side of gold pieces. An intimate secret beauty known only to the royal wearer.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#EAE0CF] rounded-xs space-y-3">
              <span className="font-display text-xl text-[#947432] font-semibold block">04</span>
              <h4 className="font-serif text-base font-semibold text-[#1E1915]">
                Antique Patina Oxidation
              </h4>
              <p className="text-xs text-[#6B5A4B] leading-relaxed">
                Natural herbal infusions and micro-burnishing that bestow 22K gold with a warm, authentic matte bronze patina that never fades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Guild */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1F1915] text-[#FAF8F5] p-8 sm:p-12 rounded-xs border border-[#382F27] flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-lg">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold block">
              Ethical Artisanal Guild
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-white">
              Supporting Hereditary Goldsmith Families
            </h3>
            <p className="text-xs sm:text-sm text-[#C4B4A2] leading-relaxed">
              We pledge fair wages, generational apprenticeships, and safe studio ateliers for over 45 hereditary artisan families in Rajasthan and Tamil Nadu.
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('shop')}
            className="px-6 py-3 bg-[#C5A262] hover:bg-[#D4B375] text-[#16120E] text-xs uppercase tracking-widest font-semibold rounded-xs transition-colors shrink-0 cursor-pointer"
          >
            Explore The Guild's Work
          </button>
        </div>
      </section>

    </div>
  );
};
