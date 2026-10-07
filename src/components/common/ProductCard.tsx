import React from 'react';
import { Heart, ShoppingBag, Eye, Zap } from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { ImageWithFallback } from './ImageWithFallback';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    formatPrice, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setCurrentPage, 
    setQuickViewProduct 
  } = useStore();

  const isFavorited = isInWishlist(product.id);

  const handleCardClick = () => {
    setCurrentPage('product', { id: product.id });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setCurrentPage('checkout');
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div 
      onClick={handleCardClick}
      className="group relative flex flex-col bg-white border border-[#EBE4D8] rounded-xs hover:border-[#D0C0A6] transition-all duration-300 hover:shadow-md cursor-pointer overflow-hidden"
    >
      {/* Image Container - 65%-75% visual dominance */}
      <div className="relative aspect-4/3 sm:aspect-square overflow-hidden bg-[#F5EFEA]">
        <ImageWithFallback
          src={product.images[0]}
          alt={product.name}
          fallbackTitle={product.name}
          categoryName={product.category}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Clean Unboxed Heritage Tag (Top-left, quiet text, no loud pill sandwich) */}
        <div className="absolute top-3 left-3 text-[10px] tracking-[0.2em] uppercase font-semibold text-[#664F27] bg-[#FAF6EE]/90 backdrop-blur-xs px-2 py-0.5 border border-[#DFD1B8]">
          {product.collection}
        </div>

        {/* Wishlist Button (Top-right) */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
            isFavorited 
              ? 'bg-[#8F2824] text-white shadow-sm' 
              : 'bg-white/85 text-[#4D3F33] hover:text-[#8F2824] hover:bg-white'
          }`}
          aria-label={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View floating action on hover */}
        <div className="absolute inset-x-0 bottom-3 px-3 hidden sm:flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleQuickView}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1E1915]/90 hover:bg-[#1E1915] text-[#F3EFE9] text-xs uppercase tracking-wider font-medium rounded-xs backdrop-blur-xs shadow-sm transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
            Quick View
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Metadata line with typographic separator */}
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-[#8F7D6D] mb-1 font-medium">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.specs.goldPurity.split(' ')[0]}</span>
          </div>

          {/* Product Name (Serif luxury) */}
          <h3 className="font-serif text-base sm:text-lg font-medium text-[#1E1915] leading-snug group-hover:text-[#9A7B38] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-[#6B5D50] line-clamp-2 mt-1 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing Block */}
        <div className="pt-2 border-t border-[#F2ECE3]">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-serif text-lg sm:text-xl font-semibold text-[#1E1915] tabular-nums">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="text-xs text-[#9B8C7E] line-through tabular-nums">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="text-[11px] font-medium text-[#2C6B3F] tracking-tight">
                  ({discountPercentage}% off)
                </span>
              </>
            )}
          </div>

          {/* Buttons: Add to Cart & Buy Now */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-2 text-xs uppercase tracking-wider font-medium border border-[#2B231D] text-[#2B231D] hover:bg-[#2B231D] hover:text-white transition-colors rounded-xs cursor-pointer whitespace-nowrap"
            >
              <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
              <span>Add to Bag</span>
            </button>

            <button
              onClick={handleBuyNow}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-2 text-xs uppercase tracking-wider font-medium bg-[#947432] hover:bg-[#7D6126] text-white transition-colors rounded-xs cursor-pointer shadow-xs whitespace-nowrap"
            >
              <Zap className="w-3.5 h-3.5 shrink-0" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
