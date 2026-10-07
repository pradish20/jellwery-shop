import React, { useState } from 'react';
import { X, Heart, ShoppingBag, ShieldCheck, Check, Zap, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ImageWithFallback } from './ImageWithFallback';

export const QuickViewModal: React.FC = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    formatPrice, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setCurrentPage 
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('Standard');
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const isFavorited = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, selectedSize);
    setQuickViewProduct(null);
  };

  const handleBuyNow = () => {
    addToCart(quickViewProduct, quantity, selectedSize);
    setQuickViewProduct(null);
    setCurrentPage('checkout');
  };

  const handleViewDetails = () => {
    const id = quickViewProduct.id;
    setQuickViewProduct(null);
    setCurrentPage('product', { id });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#161311]/70 backdrop-blur-xs transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-[#FDFCF9] border border-[#E0D7C9] shadow-2xl rounded-xs overflow-hidden z-10 my-8">
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 text-[#6D5D4E] hover:text-[#1E1915] bg-white/80 rounded-full transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Images Gallery */}
          <div className="p-6 bg-[#F8F5F0] flex flex-col justify-between">
            <div className="relative aspect-square overflow-hidden rounded-xs bg-[#EDE5D8] border border-[#E3D9C9]">
              <ImageWithFallback
                src={quickViewProduct.images[activeImageIndex] || quickViewProduct.images[0]}
                alt={quickViewProduct.name}
                fallbackTitle={quickViewProduct.name}
                categoryName={quickViewProduct.category}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnails */}
            {quickViewProduct.images.length > 1 && (
              <div className="flex gap-2.5 mt-4">
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-xs overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx ? 'border-[#947432] scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <ImageWithFallback
                      src={img}
                      alt={`${quickViewProduct.name} view ${idx + 1}`}
                      fallbackTitle={quickViewProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-5">
            <div>
              {/* Category & Collection */}
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#8C765E] font-medium mb-1.5">
                <span>{quickViewProduct.category}</span>
                <span aria-hidden="true">/</span>
                <span>{quickViewProduct.collection}</span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl font-medium text-[#1E1915] leading-tight">
                {quickViewProduct.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="font-serif text-2xl font-semibold text-[#1E1915] tabular-nums">
                  {formatPrice(quickViewProduct.price)}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-sm text-[#948474] line-through tabular-nums">
                    {formatPrice(quickViewProduct.originalPrice)}
                  </span>
                )}
              </div>

              {/* Short Description */}
              <p className="text-xs text-[#5D5043] leading-relaxed mt-3 border-t border-[#EDE5D8] pt-3">
                {quickViewProduct.shortDescription}
              </p>

              {/* Essential Specs Grid */}
              <div className="grid grid-cols-2 gap-2 text-[11px] bg-[#F7F3EB] p-3 rounded-xs border border-[#EAE0D0] mt-4">
                <div>
                  <span className="text-[#877461] block">Purity:</span>
                  <span className="font-medium text-[#1E1915]">{quickViewProduct.specs.goldPurity}</span>
                </div>
                <div>
                  <span className="text-[#877461] block">Net Gold Wt:</span>
                  <span className="font-medium text-[#1E1915]">{quickViewProduct.specs.netGoldWeight}</span>
                </div>
                <div>
                  <span className="text-[#877461] block">Technique:</span>
                  <span className="font-medium text-[#1E1915]">{quickViewProduct.specs.craftTechnique}</span>
                </div>
                <div>
                  <span className="text-[#877461] block">Certification:</span>
                  <span className="font-medium text-[#2C6B3F] flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> BIS Hallmarked
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-3 border-t border-[#EDE5D8]">
              <div className="flex gap-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-4 bg-[#1E1915] hover:bg-[#382F27] text-white text-xs uppercase tracking-wider font-medium rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`p-3 rounded-xs border transition-colors cursor-pointer ${
                    isFavorited 
                      ? 'border-[#8F2824] bg-[#8F2824]/10 text-[#8F2824]' 
                      : 'border-[#D9CFBE] text-[#524437] hover:text-[#8F2824]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full py-2.5 px-4 bg-[#947432] hover:bg-[#7D6126] text-white text-xs uppercase tracking-wider font-medium rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Zap className="w-4 h-4" />
                <span>Buy Now Directly</span>
              </button>

              <button
                onClick={handleViewDetails}
                className="w-full text-center text-xs text-[#7B6753] hover:text-[#1E1915] underline pt-1 cursor-pointer"
              >
                View Full Specifications &amp; Provenance →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
