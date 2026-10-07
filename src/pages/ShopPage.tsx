import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  X, 
  SlidersHorizontal, 
  Search, 
  RotateCcw, 
  Check, 
  ChevronDown 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CategoryType, CollectionType, MaterialType, OccasionType } from '../types';
import { ProductCard } from '../components/common/ProductCard';

export const ShopPage: React.FC = () => {
  const { products, pageParams, formatPrice } = useStore();

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>(pageParams.category || 'All');
  const [selectedCollection, setSelectedCollection] = useState<string>(pageParams.collection || 'All');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('All');
  const [selectedGender, setSelectedGender] = useState<string>('All');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('All');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('All');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>(pageParams.search || '');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Available filter options
  const categories: (CategoryType | 'All')[] = [
    'All',
    'Antique Necklaces',
    'Earrings',
    'Bangles',
    'Rings',
    'Chains',
    'Bracelets',
    'Maang Tikka',
    'Nose Pins',
    'Bridal Jewellery',
    'Temple Jewellery',
    'Vintage Collections'
  ];

  const priceRanges = [
    { label: 'All', min: 0, max: Infinity },
    { label: 'Under ₹10,000', min: 0, max: 10000 },
    { label: '₹10,000 – ₹25,000', min: 10000, max: 25000 },
    { label: '₹25,000 – ₹50,000', min: 25000, max: 50000 },
    { label: 'Above ₹50,000', min: 50000, max: Infinity },
  ];

  const collections: (CollectionType | 'All')[] = [
    'All',
    'Royal Rajputana',
    'Temple Heritage',
    'Nizami Polki',
    'Victorian Heirloom',
    'South Indian Kasu'
  ];

  const genders = ['All', 'Women', 'Unisex', 'Men'];

  const availabilities = ['All', 'In Stock', 'Made to Order', 'Limited Heirloom'];

  const materials: (MaterialType | 'All')[] = [
    'All',
    '22K Antique Gold',
    '24K Gold Leaf over Silver',
    'Kundan Jadau',
    'Temple Nakshi Gold',
    'Polki Uncut Diamonds',
    'Natural Burmese Rubies & Emeralds'
  ];

  const occasions: (OccasionType | 'All')[] = [
    'All',
    'Bridal & Wedding',
    'Festive & Celebration',
    'Heirloom Milestone',
    'Cocktail Soirée',
    'Royal Everyday'
  ];

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedCollection('All');
    setSelectedPriceRange('All');
    setSelectedGender('All');
    setSelectedAvailability('All');
    setSelectedMaterial('All');
    setSelectedOccasion('All');
    setSearchQuery('');
    setSortBy('featured');
  };

  const hasActiveFilters = 
    selectedCategory !== 'All' ||
    selectedCollection !== 'All' ||
    selectedPriceRange !== 'All' ||
    selectedGender !== 'All' ||
    selectedAvailability !== 'All' ||
    selectedMaterial !== 'All' ||
    selectedOccasion !== 'All' ||
    searchQuery.trim() !== '';

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        p => p.name.toLowerCase().includes(q) ||
             p.category.toLowerCase().includes(q) ||
             p.collection.toLowerCase().includes(q) ||
             p.shortDescription.toLowerCase().includes(q) ||
             p.specs.craftTechnique.toLowerCase().includes(q)
      );
    }

    // Category
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Collection
    if (selectedCollection !== 'All') {
      result = result.filter(p => p.collection === selectedCollection);
    }

    // Price Range
    if (selectedPriceRange !== 'All') {
      const range = priceRanges.find(r => r.label === selectedPriceRange);
      if (range) {
        result = result.filter(p => p.price >= range.min && p.price < range.max);
      }
    }

    // Gender
    if (selectedGender !== 'All') {
      result = result.filter(p => p.gender === selectedGender || p.gender === 'Unisex');
    }

    // Availability
    if (selectedAvailability !== 'All') {
      result = result.filter(p => p.availability === selectedAvailability);
    }

    // Material
    if (selectedMaterial !== 'All') {
      result = result.filter(p => p.material === selectedMaterial);
    }

    // Occasion
    if (selectedOccasion !== 'All') {
      result = result.filter(p => p.occasion === selectedOccasion);
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 5) - (a.rating || 5));
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    }

    return result;
  }, [
    products, 
    selectedCategory, 
    selectedCollection, 
    selectedPriceRange, 
    selectedGender, 
    selectedAvailability, 
    selectedMaterial, 
    selectedOccasion, 
    searchQuery, 
    sortBy
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header Banner - Exactly as requested */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#947432] font-semibold block">
          Archival Catalog
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#1E1915] font-light tracking-tight">
          Explore Our Collection
        </h1>
        <p className="text-xs sm:text-sm text-[#736353] leading-relaxed">
          Mastercrafted 22K antique gold, temple nakshi, uncut polki, and royal kundan heirlooms.
        </p>
      </div>

      {/* Control Bar: Search, Mobile Filter Toggle, Sort Selector */}
      <div className="bg-[#F8F5F0] border border-[#E8DEC8] p-4 rounded-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-[#8C7B6C]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by jewellery piece, gemstone, motif..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-[#D5C9B8] rounded-xs text-xs text-[#1E1915] placeholder-[#9E8E7D] focus:outline-none focus:border-[#947432]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-[#9E8E7D] hover:text-[#1E1915]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between md:justify-end gap-3">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-white border border-[#D5C9B8] rounded-xs text-xs font-medium text-[#2E251E] hover:border-[#947432] cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#947432]" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[#947432]" />
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs text-[#5D4E41]">
            <span className="hidden sm:inline uppercase tracking-wider text-[11px] text-[#8C7B6C]">
              Sort By:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-[#D5C9B8] rounded-xs px-3 py-2 text-xs text-[#1E1915] focus:outline-none focus:border-[#947432] cursor-pointer"
            >
              <option value="featured">Featured Heirlooms</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">New Arrivals First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Layout: Sidebar Filters + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* DESKTOP FILTERS SIDEBAR */}
        <div className="hidden lg:block space-y-6 bg-[#FAF7F2] p-5 border border-[#EAE1D3] rounded-xs h-fit sticky top-28">
          <div className="flex items-center justify-between pb-3 border-b border-[#E3D7C4]">
            <span className="font-serif text-base font-semibold text-[#1E1915] flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#947432]" />
              Refine Collection
            </span>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-[11px] text-[#8F2824] hover:underline flex items-center gap-1 cursor-pointer font-medium"
              >
                <RotateCcw className="w-3 h-3" />
                Reset All
              </button>
            )}
          </div>

          {/* 1. Category Filter */}
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.16em] text-[#8C7764] font-semibold block">
              Category
            </span>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left text-xs py-1.5 px-2 rounded-xs flex items-center justify-between transition-colors cursor-pointer ${
                    selectedCategory === cat 
                      ? 'bg-[#EAE0CF] text-[#1E1915] font-semibold' 
                      : 'text-[#5C4C3E] hover:bg-[#F2ECE0]'
                  }`}
                >
                  <span>{cat}</span>
                  {selectedCategory === cat && <Check className="w-3.5 h-3.5 text-[#947432]" />}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Price Range Filter */}
          <div className="space-y-2 pt-3 border-t border-[#EAE1D3]">
            <span className="text-[11px] uppercase tracking-[0.16em] text-[#8C7764] font-semibold block">
              Price Range
            </span>
            <div className="space-y-1">
              {priceRanges.map((range) => (
                <button
                  key={range.label}
                  onClick={() => setSelectedPriceRange(range.label)}
                  className={`w-full text-left text-xs py-1.5 px-2 rounded-xs flex items-center justify-between transition-colors cursor-pointer ${
                    selectedPriceRange === range.label 
                      ? 'bg-[#EAE0CF] text-[#1E1915] font-semibold' 
                      : 'text-[#5C4C3E] hover:bg-[#F2ECE0]'
                  }`}
                >
                  <span>{range.label}</span>
                  {selectedPriceRange === range.label && <Check className="w-3.5 h-3.5 text-[#947432]" />}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Heritage Collection Filter */}
          <div className="space-y-2 pt-3 border-t border-[#EAE1D3]">
            <span className="text-[11px] uppercase tracking-[0.16em] text-[#8C7764] font-semibold block">
              Collection
            </span>
            <div className="space-y-1">
              {collections.map((col) => (
                <button
                  key={col}
                  onClick={() => setSelectedCollection(col)}
                  className={`w-full text-left text-xs py-1.5 px-2 rounded-xs flex items-center justify-between transition-colors cursor-pointer ${
                    selectedCollection === col 
                      ? 'bg-[#EAE0CF] text-[#1E1915] font-semibold' 
                      : 'text-[#5C4C3E] hover:bg-[#F2ECE0]'
                  }`}
                >
                  <span>{col}</span>
                  {selectedCollection === col && <Check className="w-3.5 h-3.5 text-[#947432]" />}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Material Filter */}
          <div className="space-y-2 pt-3 border-t border-[#EAE1D3]">
            <span className="text-[11px] uppercase tracking-[0.16em] text-[#8C7764] font-semibold block">
              Material &amp; Purity
            </span>
            <div className="space-y-1">
              {materials.map((mat) => (
                <button
                  key={mat}
                  onClick={() => setSelectedMaterial(mat)}
                  className={`w-full text-left text-xs py-1.5 px-2 rounded-xs flex items-center justify-between transition-colors cursor-pointer ${
                    selectedMaterial === mat 
                      ? 'bg-[#EAE0CF] text-[#1E1915] font-semibold' 
                      : 'text-[#5C4C3E] hover:bg-[#F2ECE0]'
                  }`}
                >
                  <span className="truncate">{mat}</span>
                  {selectedMaterial === mat && <Check className="w-3.5 h-3.5 text-[#947432] shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Occasion Filter */}
          <div className="space-y-2 pt-3 border-t border-[#EAE1D3]">
            <span className="text-[11px] uppercase tracking-[0.16em] text-[#8C7764] font-semibold block">
              Occasion
            </span>
            <div className="space-y-1">
              {occasions.map((occ) => (
                <button
                  key={occ}
                  onClick={() => setSelectedOccasion(occ)}
                  className={`w-full text-left text-xs py-1.5 px-2 rounded-xs flex items-center justify-between transition-colors cursor-pointer ${
                    selectedOccasion === occ 
                      ? 'bg-[#EAE0CF] text-[#1E1915] font-semibold' 
                      : 'text-[#5C4C3E] hover:bg-[#F2ECE0]'
                  }`}
                >
                  <span>{occ}</span>
                  {selectedOccasion === occ && <Check className="w-3.5 h-3.5 text-[#947432]" />}
                </button>
              ))}
            </div>
          </div>

          {/* 6. Availability & Gender */}
          <div className="pt-3 border-t border-[#EAE1D3] space-y-3">
            <div>
              <span className="text-[11px] uppercase tracking-[0.16em] text-[#8C7764] font-semibold block mb-1.5">
                Availability
              </span>
              <div className="flex flex-wrap gap-1.5">
                {availabilities.map((av) => (
                  <button
                    key={av}
                    onClick={() => setSelectedAvailability(av)}
                    className={`px-2 py-1 text-[11px] rounded-xs border transition-colors cursor-pointer ${
                      selectedAvailability === av
                        ? 'border-[#947432] bg-[#947432] text-white'
                        : 'border-[#D9CFC2] bg-white text-[#5C4C3E] hover:border-[#947432]'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-[0.16em] text-[#8C7764] font-semibold block mb-1.5">
                Gender
              </span>
              <div className="flex flex-wrap gap-1.5">
                {genders.map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGender(g)}
                    className={`px-2.5 py-1 text-[11px] rounded-xs border transition-colors cursor-pointer ${
                      selectedGender === g
                        ? 'border-[#947432] bg-[#947432] text-white'
                        : 'border-[#D9CFC2] bg-white text-[#5C4C3E] hover:border-[#947432]'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* PRODUCTS GRID (Desktop: 4-col layout grid across main section, Tablet: 2-3, Mobile: 2) */}
        <div className="lg:col-span-3">
          
          {/* Active Filter Indicators */}
          <div className="flex items-center justify-between text-xs text-[#6B5A4B] mb-4 pb-2 border-b border-[#EDE5D8]">
            <span className="font-medium">
              Showing <span className="text-[#1E1915] font-semibold">{filteredProducts.length}</span> pieces
            </span>
            {hasActiveFilters && (
              <span className="text-[11px] text-[#947432]">
                Filtered selection
              </span>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-[#FAF7F2] border border-[#EAE0D0] p-12 text-center rounded-xs space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#EFE8DC] flex items-center justify-center text-[#8C765E]">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#1E1915]">
                No matching antique pieces found
              </h3>
              <p className="text-xs text-[#736353] max-w-sm mx-auto leading-relaxed">
                We could not find any jewellery matching the selected filters. Try broadening your criteria or reset all filters.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 bg-[#1E1915] text-white text-xs uppercase tracking-wider font-medium rounded-xs hover:bg-[#382F27] transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            /* Responsive Grid: Desktop 3 cols inside 3/4 layout (or 4 on full), Tablet 2-3 cols, Mobile 2 cols */
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

      </div>

      {/* MOBILE FILTERS DRAWER */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div 
            className="absolute inset-0 bg-[#161311]/60 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs bg-[#FAF7F2] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#E3D7C4]">
                  <span className="font-serif text-lg font-semibold text-[#1E1915]">
                    Refine Filters
                  </span>
                  <button 
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1.5 text-[#6D5D4E]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Categories */}
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#8C7764] font-semibold block mb-2">
                    Category
                  </span>
                  <div className="space-y-1">
                    {categories.map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedCategory(c)}
                        className={`w-full text-left text-xs py-1.5 px-2 rounded-xs ${
                          selectedCategory === c ? 'bg-[#EAE0CF] font-semibold text-[#1E1915]' : 'text-[#5C4C3E]'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#8C7764] font-semibold block mb-2">
                    Price Range
                  </span>
                  <div className="space-y-1">
                    {priceRanges.map((pr) => (
                      <button
                        key={pr.label}
                        onClick={() => setSelectedPriceRange(pr.label)}
                        className={`w-full text-left text-xs py-1.5 px-2 rounded-xs ${
                          selectedPriceRange === pr.label ? 'bg-[#EAE0CF] font-semibold text-[#1E1915]' : 'text-[#5C4C3E]'
                        }`}
                      >
                        {pr.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#E3D7C4] space-y-2">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-3 bg-[#1E1915] text-white text-xs uppercase tracking-wider font-semibold rounded-xs"
                >
                  Apply Filters ({filteredProducts.length})
                </button>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="w-full py-2 text-xs text-[#8F2824] underline text-center"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
