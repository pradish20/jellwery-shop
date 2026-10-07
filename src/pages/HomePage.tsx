import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  ChevronRight, 
  Compass, 
  Calendar,
  Gem
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { initialCategories } from '../data/initialData';
import { ProductCard } from '../components/common/ProductCard';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

export const HomePage: React.FC = () => {
  const { brandConfig, products, setCurrentPage } = useStore();

  // Featured products: 6-8 items
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 8);
  if (featuredProducts.length < 6) {
    // Fill up to 6 if needed
    products.slice(0, 6).forEach(p => {
      if (!featuredProducts.some(fp => fp.id === p.id)) {
        featuredProducts.push(p);
      }
    });
  }

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. HERO SECTION - Editorial Luxury Campaign */}
      <section className="relative min-h-[580px] sm:min-h-[660px] lg:min-h-[720px] flex items-center justify-center bg-[#15120F] text-[#FDFCF9] overflow-hidden">
        {/* Editorial Background Image with measured scrim */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1920&q=85"
            alt="Antique Jewellery Campaign"
            fallbackTitle="Timeless Beauty. Crafted to Last."
            className="w-full h-full object-cover opacity-35 scale-102 transition-transform duration-1000 ease-out"
          />
          {/* Measured multi-stop scrim for guaranteed contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#15120F] via-[#15120F]/65 to-[#15120F]/85" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0,transparent_70%)]" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 space-y-6 sm:space-y-8">
          
          {/* Quiet kicker */}
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm tracking-[0.3em] uppercase text-[#D4AF37] font-medium">
            <span className="w-8 h-px bg-[#D4AF37]" />
            <span>The Royal Indian Archives</span>
            <span className="w-8 h-px bg-[#D4AF37]" />
          </div>

          {/* Headline - Exactly as requested */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#FBF9F5] tracking-tight leading-[1.1] max-w-3xl mx-auto">
            Timeless Beauty. <br className="hidden sm:inline" />
            <span className="italic font-normal text-[#EAE2D2]">Crafted to Last.</span>
          </h1>

          {/* Subtitle - Exactly as requested */}
          <p className="text-sm sm:text-base md:text-lg text-[#C8B8A6] font-light max-w-2xl mx-auto leading-relaxed">
            {brandConfig.subTitle}
          </p>

          {/* Action Buttons - Exactly as requested */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setCurrentPage('shop')}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#C5A262] hover:bg-[#D8B475] text-[#16120E] text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 rounded-xs shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Shop Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCurrentPage('shop', { category: 'Temple Jewellery' })}
              className="w-full sm:w-auto px-8 py-3.5 border border-[#C5A262]/60 hover:border-[#D8B475] text-[#EBE3D5] hover:text-white hover:bg-white/5 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-xs cursor-pointer"
            >
              <span>Explore Jewellery</span>
            </button>
          </div>

          {/* Trust badges below Hero */}
          <div className="pt-8 border-t border-[#362D24]/80 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[11px] sm:text-xs text-[#A89886] tracking-wider uppercase">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C5A262]" />
              <span>100% BIS 916 Hallmarked Gold</span>
            </div>
            <div className="flex items-center gap-2">
              <Gem className="w-4 h-4 text-[#C5A262]" />
              <span>Certified Natural Gems</span>
            </div>
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#C5A262]" />
              <span>Pan-India Insured Transit</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED COLLECTION - Visual Category Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#947432] font-semibold block">
            Curated Categories
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#1E1915] font-normal tracking-tight">
            Featured Collections
          </h2>
          <p className="text-xs sm:text-sm text-[#736353] leading-relaxed">
            From imperial Temple motifs to delicate Polki rings, discover each distinguished heritage genre.
          </p>
        </div>

        {/* Responsive Grid of Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {initialCategories.map((category) => (
            <div
              key={category.name}
              onClick={() => setCurrentPage('shop', { category: category.name })}
              className="group relative flex flex-col bg-white border border-[#EDE5D8] rounded-xs overflow-hidden cursor-pointer hover:border-[#C5A262] transition-all duration-300 hover:shadow-md"
            >
              <div className="relative aspect-4/3 sm:aspect-square overflow-hidden bg-[#F5EFEA]">
                <ImageWithFallback
                  src={category.image}
                  alt={category.name}
                  fallbackTitle={category.name}
                  categoryName={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-serif text-base sm:text-lg font-medium text-[#FAF8F5] leading-snug group-hover:text-[#EAD098] transition-colors">
                    {category.name}
                  </h3>
                  <span className="text-[11px] text-[#D8CEBF] block mt-0.5 line-clamp-1 font-light">
                    {category.tagline}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-[#FAF8F5] flex items-center justify-between text-xs border-t border-[#EFE8DD]">
                <span className="text-[#877461] text-[11px] uppercase tracking-wider font-medium">
                  {category.count} Heirloom Designs
                </span>
                <span className="text-[#947432] group-hover:translate-x-1 transition-transform">
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS (6-8 items with prompt-specified elements) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 pb-4 border-b border-[#EAE3D6] gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#947432] font-semibold block">
              Handcrafted Treasures
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#1E1915] font-normal tracking-tight mt-1">
              Featured Products
            </h2>
          </div>
          <button
            onClick={() => setCurrentPage('shop')}
            className="text-xs uppercase tracking-[0.16em] font-medium text-[#825C1B] hover:text-[#1E1915] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>View All ({products.length}) Masterpieces</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Products Grid: 4 items/desktop, 2/mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. HERITAGE & CRAFTSMANSHIP SPOTLIGHT */}
      <section className="bg-[#F8F5F0] border-y border-[#E8DEC8] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Visual Showcase */}
            <div className="relative">
              <div className="relative aspect-4/3 overflow-hidden rounded-xs border border-[#DFD3BE] shadow-lg">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80"
                  alt="Antique jewellery craftsmanship"
                  fallbackTitle="Artisanal Handcrafting"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Inset Authenticity Plaque */}
              <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:right-6 bg-[#1F1915] text-[#F3EEE7] p-5 rounded-xs border border-[#C5A262]/40 shadow-xl max-w-xs">
                <div className="flex items-center gap-2 text-[#D4AF37] mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold">Cire-Perdue Casting</span>
                </div>
                <p className="text-xs text-[#C8B8A6] leading-relaxed">
                  Every curve is sculpted by generational karigars using centuries-old lost-wax and repoussé techniques.
                </p>
              </div>
            </div>

            {/* Story Text */}
            <div className="space-y-6">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#947432] font-semibold block">
                The Karigar Heritage
              </span>
              
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1915] font-light leading-snug">
                Honouring ancient artistry with unimpeachable authenticity.
              </h2>

              <p className="text-xs sm:text-sm text-[#5C4C3E] leading-relaxed">
                Antique jewellery isn't simply an adornment—it is a cultural artifact. 
                At <strong>{brandConfig.brandName}</strong>, we work hand-in-hand with hereditary artisans 
                across Jaipur, Thanjavur, and Hyderabad who have preserved royal goldcraft methods 
                spanning over five centuries.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#E5DAC6]">
                <div>
                  <h4 className="font-serif text-base font-semibold text-[#1E1915]">
                    22K Antique Patina
                  </h4>
                  <p className="text-xs text-[#786654] mt-1 leading-relaxed">
                    Custom-developed botanical and oxidised finishes that simulate noble heirloom patina without chemical degradation.
                  </p>
                </div>

                <div>
                  <h4 className="font-serif text-base font-semibold text-[#1E1915]">
                    Uncut Polki &amp; Kundan
                  </h4>
                  <p className="text-xs text-[#786654] mt-1 leading-relaxed">
                    Set exclusively with pure 24K gold foil (daak) to capture ambient light with warm, regal brilliance.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setCurrentPage('about')}
                  className="px-6 py-3 bg-[#1E1915] hover:bg-[#382F27] text-white text-xs uppercase tracking-widest font-medium rounded-xs transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Read The Heritage Story</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. PRIVATE BRIDAL CONCIERGE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[#201A16] text-[#FAF8F5] p-8 sm:p-12 md:p-16 rounded-xs overflow-hidden border border-[#3A3026]">
          {/* Subtle background ornamentation */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-15 pointer-events-none hidden md:block">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80"
              alt="Bridal Antique Jewellery"
              fallbackTitle="Bridal Concierge"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A262] font-medium">
              <Calendar className="w-4 h-4" />
              <span>Personalised Bridal Trousseau</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-4xl font-light text-white leading-tight">
              Curate Your Heirloom Wedding Ensemble
            </h3>

            <p className="text-xs sm:text-sm text-[#C4B4A2] leading-relaxed">
              Planning your wedding or special celebration? Schedule a 1-on-1 private styling consultation 
              with our master jewellery appraisers in Jaipur, Mumbai, or over high-definition video concierge.
            </p>

            <div className="pt-3 flex flex-wrap gap-3">
              <button
                onClick={() => setCurrentPage('contact')}
                className="px-6 py-3 bg-[#C5A262] hover:bg-[#D4B375] text-[#16120E] text-xs uppercase tracking-widest font-semibold rounded-xs transition-colors cursor-pointer"
              >
                Schedule Private Consultation
              </button>
              <a
                href={`https://wa.me/${brandConfig.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(brandConfig.brandName)},%20I%20would%20like%20to%20inquire%20about%20your%20antique%20bridal%20jewellery.`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 border border-[#C5A262]/60 hover:bg-white/5 text-[#EFEBE4] text-xs uppercase tracking-widest font-medium rounded-xs transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <span>WhatsApp Concierge</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
