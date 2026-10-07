import React, { useState } from 'react';
import { 
  Heart, 
  ShoppingBag, 
  ShieldCheck, 
  Award, 
  Truck, 
  RotateCcw, 
  Share2, 
  Check, 
  Star, 
  MessageCircle, 
  Zap, 
  Ruler, 
  X,
  ChevronRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { ProductCard } from '../components/common/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { 
    products, 
    pageParams, 
    formatPrice, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setCurrentPage, 
    reviews, 
    addReview,
    brandConfig 
  } = useStore();

  const productId = pageParams.id || products[0].id;
  const product = products.find(p => p.id === productId) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('Standard Size');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Review Form state
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerCity, setReviewerCity] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');

  const isFavorited = isInWishlist(product.id);

  const productReviews = reviews.filter(r => r.productId === product.id);
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.collection === product.collection))
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize);
    setCurrentPage('checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName || !reviewComment) return;
    addReview({
      productId: product.id,
      author: reviewerName,
      city: reviewerCity || 'India',
      rating: reviewRating,
      title: reviewTitle || 'Exquisite piece',
      comment: reviewComment,
      verifiedPurchase: true
    });
    setShowReviewModal(false);
    setReviewerName('');
    setReviewComment('');
    setReviewTitle('');
  };

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-[#7F6E5E] tracking-wider uppercase font-medium">
        <button onClick={() => setCurrentPage('home')} className="hover:text-[#1E1915]">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => setCurrentPage('shop')} className="hover:text-[#1E1915]">
          Jewellery
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button 
          onClick={() => setCurrentPage('shop', { category: product.category })} 
          className="hover:text-[#1E1915]"
        >
          {product.category}
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#1E1915] truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Main Contiguous Purchase Module */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        
        {/* Left Column: Gallery (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Showcase Image */}
          <div className="relative aspect-square sm:aspect-4/3 overflow-hidden rounded-xs bg-[#F5EFEA] border border-[#E5DDD0] shadow-xs">
            <ImageWithFallback
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              fallbackTitle={product.name}
              categoryName={product.category}
              className="w-full h-full object-cover"
            />

            {/* Collection Watermark Tag */}
            <div className="absolute top-4 left-4 text-[11px] uppercase tracking-[0.2em] font-semibold text-[#664F27] bg-[#FAF6EE]/90 backdrop-blur-xs px-2.5 py-1 border border-[#DFD1B8]">
              {product.collection}
            </div>

            {/* Quick Share button */}
            <button
              onClick={handleShare}
              className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white text-[#4A3D31] rounded-full transition-colors cursor-pointer"
              title="Share link"
              aria-label="Share product"
            >
              {isCopied ? <Check className="w-4 h-4 text-[#2C6B3F]" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Thumbnail Carousel */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 shrink-0 rounded-xs overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx ? 'border-[#947432] scale-95 shadow-xs' : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  <ImageWithFallback
                    src={img}
                    alt={`${product.name} angle ${idx + 1}`}
                    fallbackTitle={product.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Craftsmanship Highlights Banner */}
          <div className="bg-[#FAF7F2] p-4 rounded-xs border border-[#E8DEC8] flex items-center justify-between text-xs text-[#635345]">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#947432]" />
              <span className="font-medium text-[#1E1915]">BIS 916 Hallmarked</span>
              <span>· Laser Engraved Purity</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#947432]" />
              <span className="font-medium text-[#1E1915]">IGI Certified</span>
              <span>· Genuine Gemstones</span>
            </div>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Block (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8C7560] font-medium mb-1">
              <span>{product.category}</span>
              <span aria-hidden="true">/</span>
              <span>{product.collection}</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#1E1915] leading-tight">
              {product.name}
            </h1>

            {/* Stock status indicator */}
            <div className="mt-2 text-xs font-medium text-[#7A6126] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#947432] animate-ping" />
              <span>
                {product.availability === 'In Stock' 
                  ? `Only ${product.stockCount} handcrafted ${product.stockCount === 1 ? 'piece' : 'pieces'} available in vault`
                  : product.availability}
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 pb-4 border-b border-[#EDE5D8]">
            <span className="font-serif text-3xl sm:text-4xl font-semibold text-[#1E1915] tabular-nums">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="text-base text-[#9E8E7D] line-through tabular-nums">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="text-xs font-semibold text-[#2C6B3F] bg-[#EAF5ED] px-2 py-0.5 rounded-xs">
                  Save {discountPercent}%
                </span>
              </>
            )}
          </div>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-[#5C4C3E] leading-relaxed">
            {product.description}
          </p>

          {/* Size / Sizing Guide Selector */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="uppercase tracking-wider font-semibold text-[#705E4D]">
                Select Standard Dimension:
              </span>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-[#947432] hover:underline flex items-center gap-1 cursor-pointer font-medium"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Jewellery Size Guide</span>
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {['Standard Size', 'Petite / 2.4', 'Medium / 2.6', 'Broad / 2.8'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-2 text-xs rounded-xs border transition-colors cursor-pointer ${
                    selectedSize === size
                      ? 'border-[#947432] bg-[#947432] text-white font-medium'
                      : 'border-[#D9CFBE] bg-white text-[#4A3E33] hover:border-[#947432]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector & Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-[#D5C9B8] rounded-xs bg-white px-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 py-2 text-[#5E5043] hover:text-[#1E1915] text-sm cursor-pointer"
                >
                  -
                </button>
                <span className="px-2.5 text-xs font-semibold tabular-nums text-[#1E1915]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 py-2 text-[#5E5043] hover:text-[#1E1915] text-sm cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 px-4 bg-[#1E1915] hover:bg-[#382F27] text-white text-xs uppercase tracking-widest font-medium rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                <span>Add to Shopping Bag</span>
              </button>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 rounded-xs border transition-colors cursor-pointer ${
                  isFavorited 
                    ? 'border-[#8F2824] bg-[#8F2824]/10 text-[#8F2824]' 
                    : 'border-[#D9CFBE] bg-white text-[#524437] hover:text-[#8F2824]'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Buy Now directly */}
            <button
              onClick={handleBuyNow}
              className="w-full py-3.5 px-4 bg-[#947432] hover:bg-[#7D6126] text-white text-xs uppercase tracking-widest font-semibold rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Zap className="w-4 h-4" />
              <span>Instant Buy Now</span>
            </button>

            {/* Inquire on WhatsApp */}
            <a
              href={`https://wa.me/${brandConfig.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(brandConfig.brandName)},%20I%20am%20interested%20in%20the%20${encodeURIComponent(product.name)}%20(${encodeURIComponent(formatPrice(product.price))}).%20Could%20you%20share%20more%20details?`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-4 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#175E2E] text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Inquire via WhatsApp Concierge</span>
            </a>
          </div>

          {/* Delivery & Assurance checklist */}
          <div className="pt-4 border-t border-[#EDE5D8] space-y-2 text-xs text-[#635345]">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-[#947432]" />
              <span>Insured express delivery within 3–5 business days</span>
            </div>
            <div className="flex items-center gap-2.5">
              <RotateCcw className="w-4 h-4 text-[#947432]" />
              <span>7-Day insured appraisal return guarantee</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#947432]" />
              <span>Certificate of Purity &amp; Lifetime Authenticity included</span>
            </div>
          </div>
        </div>

      </div>

      {/* DETAILED SPECIFICATIONS SECTION */}
      <section className="bg-[#FAF7F2] border border-[#E8DEC8] p-6 sm:p-10 rounded-xs">
        <h2 className="font-serif text-2xl text-[#1E1915] font-normal mb-6">
          Architectural Specifications &amp; Gemology
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          <div className="p-4 bg-white border border-[#EDE5D8] rounded-xs space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-[#8F7C6A] block">Gold Purity</span>
            <span className="font-serif text-base font-semibold text-[#1E1915] block">
              {product.specs.goldPurity}
            </span>
            <span className="text-[11px] text-[#7A6A5A]">Laser engraved hallmark</span>
          </div>

          <div className="p-4 bg-white border border-[#EDE5D8] rounded-xs space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-[#8F7C6A] block">Net Gold Weight</span>
            <span className="font-serif text-base font-semibold text-[#1E1915] block">
              {product.specs.netGoldWeight}
            </span>
            <span className="text-[11px] text-[#7A6A5A]">Gross: {product.specs.grossWeight}</span>
          </div>

          <div className="p-4 bg-white border border-[#EDE5D8] rounded-xs space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-[#8F7C6A] block">Craft Technique</span>
            <span className="font-serif text-base font-semibold text-[#1E1915] block">
              {product.specs.craftTechnique}
            </span>
            <span className="text-[11px] text-[#7A6A5A]">Hereditary Karigar Guild</span>
          </div>

          <div className="p-4 bg-white border border-[#EDE5D8] rounded-xs space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-[#8F7C6A] block">Gemstones &amp; Inlay</span>
            <span className="font-serif text-base font-semibold text-[#1E1915] block">
              {product.specs.gemstones}
            </span>
            <span className="text-[11px] text-[#7A6A5A]">Untreated natural gems</span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-[#E8DEC8] grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#5C4C3E]">
          <div>
            <strong className="text-[#1E1915]">Hallmarking &amp; Certification:</strong> {product.specs.hallmarkCert}
          </div>
          <div>
            <strong className="text-[#1E1915]">Provenance &amp; Heritage Origin:</strong> {product.specs.provenance}
          </div>
        </div>
      </section>

      {/* CUSTOMER REVIEWS & APPRAISALS */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EDE5D8] gap-4">
          <div>
            <h3 className="font-serif text-2xl text-[#1E1915]">
              Client Appraisals &amp; Reviews
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex text-[#C5A262]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-semibold text-[#1E1915] tabular-nums">
                {product.rating || 5.0} out of 5.0
              </span>
              <span className="text-xs text-[#7F6E5E]">
                ({productReviews.length} verified reviews)
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowReviewModal(true)}
            className="px-5 py-2.5 border border-[#1E1915] text-[#1E1915] hover:bg-[#1E1915] hover:text-white text-xs uppercase tracking-wider font-medium rounded-xs transition-colors cursor-pointer"
          >
            Submit an Appraisal
          </button>
        </div>

        {/* Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {productReviews.length === 0 ? (
            <div className="col-span-2 text-center py-8 text-xs text-[#7A6A5A]">
              Be the first collector to review this exquisite heirloom creation.
            </div>
          ) : (
            productReviews.map((rev) => (
              <div key={rev.id} className="p-5 bg-white border border-[#EDE5D8] rounded-xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex text-[#C5A262]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#8C7A68]">{rev.date}</span>
                </div>
                <h4 className="font-serif text-sm font-semibold text-[#1E1915]">
                  {rev.title}
                </h4>
                <p className="text-xs text-[#5C4C3E] leading-relaxed">
                  "{rev.comment}"
                </p>
                <div className="text-[11px] text-[#7A6958] pt-2 border-t border-[#F5EFEA] flex items-center justify-between">
                  <span>{rev.author}, {rev.city}</span>
                  {rev.verifiedPurchase && (
                    <span className="text-[#2C6B3F] font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Verified Collector
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* RELATED HEIRLOOM PIECES */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-6 border-t border-[#EDE5D8]">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#947432] font-semibold block">
              Complementary Treasures
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1E1915] mt-1">
              You May Also Admire
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* SIZE GUIDE MODAL */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF7F2] p-6 max-w-lg w-full rounded-xs border border-[#DFD1B8] shadow-2xl relative space-y-4">
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="absolute top-4 right-4 text-[#6E5D4C] hover:text-[#1E1915]"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-serif text-xl font-semibold text-[#1E1915]">
              Traditional Indian Jewellery Sizing
            </h3>
            
            <div className="text-xs text-[#5C4C3E] space-y-3">
              <h4 className="font-semibold text-[#1E1915] uppercase tracking-wider text-[11px]">
                Bangle Sizing (Standard Indian Anna Standard)
              </h4>
              <table className="w-full text-left border-collapse border border-[#E0D5C3]">
                <thead>
                  <tr className="bg-[#EFE7D8]">
                    <th className="p-2 border border-[#E0D5C3]">Indian Size</th>
                    <th className="p-2 border border-[#E0D5C3]">Inner Diameter (Inches)</th>
                    <th className="p-2 border border-[#E0D5C3]">Circumference (mm)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border border-[#E0D5C3]">2.4 (Small)</td>
                    <td className="p-2 border border-[#E0D5C3]">2.25 inches</td>
                    <td className="p-2 border border-[#E0D5C3]">179 mm</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-[#E0D5C3]">2.6 (Medium)</td>
                    <td className="p-2 border border-[#E0D5C3]">2.37 inches</td>
                    <td className="p-2 border border-[#E0D5C3]">189 mm</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-[#E0D5C3]">2.8 (Large)</td>
                    <td className="p-2 border border-[#E0D5C3]">2.50 inches</td>
                    <td className="p-2 border border-[#E0D5C3]">200 mm</td>
                  </tr>
                </tbody>
              </table>

              <p className="text-[11px] text-[#7A6A5A] pt-2">
                Need bespoke sizing? Our concierge custom-resizes openable kadas and rings without compromising antique motifs.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* WRITE REVIEW MODAL */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF7F2] p-6 sm:p-8 max-w-md w-full rounded-xs border border-[#DFD1B8] shadow-2xl relative space-y-4">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-4 right-4 text-[#6E5D4C] hover:text-[#1E1915]"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-serif text-xl font-semibold text-[#1E1915]">
              Share Your Appraisal
            </h3>
            
            <form onSubmit={handleSubmitReview} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#5C4C3E] mb-1 font-medium">Your Name</label>
                <input
                  type="text"
                  required
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="e.g. Radhika Sharma"
                  className="w-full p-2.5 bg-white border border-[#D5C9B8] rounded-xs text-[#1E1915]"
                />
              </div>

              <div>
                <label className="block text-[#5C4C3E] mb-1 font-medium">City</label>
                <input
                  type="text"
                  value={reviewerCity}
                  onChange={(e) => setReviewerCity(e.target.value)}
                  placeholder="e.g. New Delhi"
                  className="w-full p-2.5 bg-white border border-[#D5C9B8] rounded-xs text-[#1E1915]"
                />
              </div>

              <div>
                <label className="block text-[#5C4C3E] mb-1 font-medium">Rating (1 to 5 Stars)</label>
                <select
                  value={reviewRating}
                  onChange={(e) => setReviewRating(Number(e.target.value))}
                  className="w-full p-2.5 bg-white border border-[#D5C9B8] rounded-xs text-[#1E1915]"
                >
                  <option value={5}>5 Stars - Magnificent Royal Heirloom</option>
                  <option value={4}>4 Stars - High Quality Antique</option>
                  <option value={3}>3 Stars - Satisfactory</option>
                </select>
              </div>

              <div>
                <label className="block text-[#5C4C3E] mb-1 font-medium">Headline</label>
                <input
                  type="text"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  placeholder="e.g. Unbelievable Nakshi Details"
                  className="w-full p-2.5 bg-white border border-[#D5C9B8] rounded-xs text-[#1E1915]"
                />
              </div>

              <div>
                <label className="block text-[#5C4C3E] mb-1 font-medium">Your Review</label>
                <textarea
                  rows={3}
                  required
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Describe the craftsmanship, weight, and styling experience..."
                  className="w-full p-2.5 bg-white border border-[#D5C9B8] rounded-xs text-[#1E1915]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#1E1915] text-white text-xs uppercase tracking-wider font-semibold rounded-xs hover:bg-[#382F27] transition-colors cursor-pointer"
              >
                Submit Collector Appraisal
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
