import { BrandConfig, CategoryType, Product, Review } from '../types';

export const defaultBrandConfig: BrandConfig = {
  brandName: 'Your Antique Jewellery',
  tagline: 'Timeless Beauty. Crafted to Last.',
  subTitle: 'Discover exquisite antique jewellery inspired by heritage, craftsmanship and timeless elegance.',
  currencySymbol: '₹',
  currencyCode: 'INR',
  contactEmail: 'concierge@yourantiquejewellery.com',
  contactPhone: '+91 98765 43210',
  whatsappNumber: '+91 98765 43210',
  boutiqueAddress: '14, Johari Heritage Palace, M.I. Road',
  boutiqueCity: 'Jaipur',
  boutiqueState: 'Rajasthan',
  boutiqueCountry: 'India',
  boutiqueHours: 'Mon - Sat: 10:30 AM - 8:00 PM IST',
  freeShippingThreshold: 5000,
  defaultShippingFee: 499,
  giftPackagingPrice: 350,
  instagramHandle: '@yourantiquejewellery',
};

export interface CategoryInfo {
  name: CategoryType;
  tagline: string;
  image: string;
  count: number;
}

export const initialCategories: CategoryInfo[] = [
  {
    name: 'Antique Necklaces',
    tagline: 'Imperial chokers & tiered heirloom neckpieces',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    count: 14,
  },
  {
    name: 'Earrings',
    tagline: 'Royal jhumkas, chandbalis & antique studs',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
    count: 22,
  },
  {
    name: 'Bangles',
    tagline: 'Hand-carved nakshi kadas & antique gokhru pairs',
    image: 'https://images.unsplash.com/photo-1611591475870-8e4ce2289f81?auto=format&fit=crop&w=800&q=80',
    count: 18,
  },
  {
    name: 'Rings',
    tagline: 'Uncut polki cocktail statements & traditional vanki rings',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    count: 16,
  },
  {
    name: 'Chains',
    tagline: 'Hand-linked antique gold rope & rudraksha chains',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
    count: 9,
  },
  {
    name: 'Bridal Jewellery',
    tagline: 'Complete heirloom bridal trousseau collections',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    count: 26,
  },
  {
    name: 'Temple Jewellery',
    tagline: 'Devi Lakshmi & Mayur temple motifs crafted in 22K',
    image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80',
    count: 19,
  },
  {
    name: 'Vintage Collections',
    tagline: 'Victorian era polki & preserved 19th-century designs',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    count: 12,
  },
];

export const initialProducts: Product[] = [
  {
    id: 'prod-01',
    name: 'Antique Lakshmi Necklace',
    slug: 'antique-lakshmi-necklace',
    category: 'Antique Necklaces',
    collection: 'Temple Heritage',
    shortDescription: 'Masterpiece 22K antique gold temple haram adorned with embossed Goddess Lakshmi motif, natural rubies, and seed pearls.',
    description: 'An iconic antique jewel crafted in deep antique gold patina. Hand-engraved using centuries-old repoussé and champlevé techniques by master artisans in South India. Featuring a regal central Lakshmi idol flanked by sacred peacocks and suspended cluster of freshwater seed pearls. Completely hallmarked and certified for purity.',
    price: 12999,
    originalPrice: 15999,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80'
    ],
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    gender: 'Women',
    material: '22K Antique Gold',
    occasion: 'Bridal & Wedding',
    availability: 'In Stock',
    stockCount: 3,
    specs: {
      goldPurity: '22 Karat (916 Hallmarked)',
      grossWeight: '42.80 grams',
      netGoldWeight: '38.40 grams',
      gemstones: 'Cabochon Rubies (3.40 cts), Basra Seed Pearls',
      dimensions: 'Necklace Length: 16 inches with adjustable dori',
      craftTechnique: 'Temple Nakshi & Champlevé Repoussé',
      hallmarkCert: 'BIS 916 Laser Hallmarked + IGI Certificate',
      provenance: 'Traditional Heritage Atelier, Thanjavur'
    },
    reviewsCount: 18,
    rating: 4.9
  },
  {
    id: 'prod-02',
    name: 'Heirloom Mayur Temple Jhumkas',
    slug: 'heirloom-mayur-temple-jhumkas',
    category: 'Earrings',
    collection: 'Temple Heritage',
    shortDescription: 'Grand 3-tier antique gold jhumkas featuring dancing peacock crest and suspended pearl drops.',
    description: 'Evoking the royal courts of the Cholas, these chandelier jhumkas are forged in rich antique finish with delicate filigree lattice work. Each tier chimed with hand-threaded south sea pearls and natural pigeon blood rubies.',
    price: 18499,
    originalPrice: 21999,
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80'
    ],
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    gender: 'Women',
    material: '22K Antique Gold',
    occasion: 'Festive & Celebration',
    availability: 'In Stock',
    stockCount: 5,
    specs: {
      goldPurity: '22 Karat (916 BIS)',
      grossWeight: '28.60 grams',
      netGoldWeight: '25.90 grams',
      gemstones: 'Natural Burmese Rubies, South Sea Pearls',
      dimensions: 'Earring Drop: 7.2 cm, Diameter: 3.1 cm',
      craftTechnique: 'Handcrafted Filigree & Granulation',
      hallmarkCert: 'BIS 916 Hallmark certified',
      provenance: 'Heritage Karigars of Jaipur'
    },
    reviewsCount: 24,
    rating: 5.0
  },
  {
    id: 'prod-03',
    name: 'Imperial Nakshi Kada Pair',
    slug: 'imperial-nakshi-kada-pair',
    category: 'Bangles',
    collection: 'Royal Rajputana',
    shortDescription: 'Pair of royal openable screw kadas intricately embossed with elephant and floral motifs.',
    description: 'An ode to Rajputana royal regalia. These heavy kadas showcase deeply relief-carved elephant crests symbolising prosperity and strength. Complete with concealed floral screw locks for an effortless royal fit.',
    price: 38999,
    originalPrice: 44999,
    images: [
      'https://images.unsplash.com/photo-1611591475870-8e4ce2289f81?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80'
    ],
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    gender: 'Women',
    material: 'Temple Nakshi Gold',
    occasion: 'Bridal & Wedding',
    availability: 'In Stock',
    stockCount: 2,
    specs: {
      goldPurity: '22 Karat (916 Hallmarked)',
      grossWeight: '64.20 grams (Pair)',
      netGoldWeight: '62.00 grams',
      gemstones: 'Natural Emerald accents in eyes',
      dimensions: 'Standard Indian Bangle Size 2.6 (Openable)',
      craftTechnique: 'Deep Nakshi Repoussé & Die-forging',
      hallmarkCert: 'BIS 916 Laser Inscription',
      provenance: 'Rajputana Royal Guild, Jaipur'
    },
    reviewsCount: 11,
    rating: 4.8
  },
  {
    id: 'prod-04',
    name: 'Vintage Nizami Polki Cocktail Ring',
    slug: 'vintage-nizami-polki-cocktail-ring',
    category: 'Rings',
    collection: 'Nizami Polki',
    shortDescription: 'Statement cocktail ring with uncut Polki diamond core, bezel-set Zambian emerald halo and meenakari back.',
    description: 'Inspired by the private vaults of the Nizams of Hyderabad. A monumental cocktail ring boasting a high-dome silhouette, uncut natural polki diamonds wrapped in 24K gold foil and delicate Persian blue meenakari enamelling on the reverse.',
    price: 24500,
    originalPrice: 28000,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80'
    ],
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    gender: 'Women',
    material: 'Polki Uncut Diamonds',
    occasion: 'Cocktail Soirée',
    availability: 'In Stock',
    stockCount: 4,
    specs: {
      goldPurity: '22K Gold Core + 24K Pure Foil Setting',
      grossWeight: '19.40 grams',
      netGoldWeight: '14.80 grams',
      gemstones: 'Syndicate Polki (2.85 cts), Zambian Emeralds',
      dimensions: 'Ring Head: 3.4 cm x 3.4 cm, Adjustable shank',
      craftTechnique: 'Jadau Polki & Reverse Meenakari Enamel',
      hallmarkCert: 'IGI Diamond & Gemstone Certified',
      provenance: 'Hyderabad Heirloom Collection'
    },
    reviewsCount: 15,
    rating: 4.9
  },
  {
    id: 'prod-05',
    name: 'Guttapusalu Pearl Heritage Haram',
    slug: 'guttapusalu-pearl-heritage-haram',
    category: 'Antique Necklaces',
    collection: 'South Indian Kasu',
    shortDescription: 'Celebrated Andhra royal haram draped with clusters of natural seed pearls and ruby florals.',
    description: 'The iconic Guttapusalu—meaning "clusters of shoals of small pearls"—is the crown jewel of southern bridal tradition. Handcrafted with multiple tiers of shimmering pearl fringes cascading beneath antique gold floral pendants studded with uncut rubies.',
    price: 49999,
    originalPrice: 56000,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80'
    ],
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    gender: 'Women',
    material: '22K Antique Gold',
    occasion: 'Bridal & Wedding',
    availability: 'Limited Heirloom',
    stockCount: 1,
    specs: {
      goldPurity: '22 Karat (916 BIS)',
      grossWeight: '78.50 grams',
      netGoldWeight: '58.20 grams',
      gemstones: 'Natural Seed Pearls, Burmese Rubies, Emeralds',
      dimensions: 'Long Haram Length: 24 inches',
      craftTechnique: 'Traditional Hand-knotted Guttapusalu',
      hallmarkCert: 'BIS 916 Laser Hallmarked',
      provenance: 'Machilipatnam Pearl Heritage Guild'
    },
    reviewsCount: 9,
    rating: 5.0
  },
  {
    id: 'prod-06',
    name: 'Victorian Uncut Polki Pendant Chain',
    slug: 'victorian-uncut-polki-pendant-chain',
    category: 'Chains',
    collection: 'Victorian Heirloom',
    shortDescription: 'Antique hand-twined double rope gold chain with detachable Victorian crown polki medallion.',
    description: 'A crossover of Anglo-Indian craftsmanship from the late 19th century. Featuring an oxidized antique finish gold chain with twisted rope links, paired with a crest pendant set with rosecut polki diamonds and a cabochon teardrop ruby.',
    price: 16999,
    originalPrice: 19999,
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80'
    ],
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: false,
    gender: 'Unisex',
    material: '24K Gold Leaf over Silver',
    occasion: 'Royal Everyday',
    availability: 'In Stock',
    stockCount: 6,
    specs: {
      goldPurity: 'Antique Gilded 92.5 Silver with 24K Leaf',
      grossWeight: '32.10 grams',
      netGoldWeight: 'Fine Gilded Coating',
      gemstones: 'Rose-cut Polki, Teardrop Ruby Cabochon',
      dimensions: 'Chain Length: 20 inches, Pendant: 4.0 cm',
      craftTechnique: 'Victorian Collet Setting & Hand Weave',
      hallmarkCert: 'Authenticity Guarantee Card Included',
      provenance: 'Calcutta Colonial Restorations'
    },
    reviewsCount: 14,
    rating: 4.7
  },
  {
    id: 'prod-07',
    name: 'Kundan Chandbali Bridal Tikka Set',
    slug: 'kundan-chandbali-bridal-tikka-set',
    category: 'Maang Tikka',
    collection: 'Royal Rajputana',
    shortDescription: 'Matching crescent moon Chandbali maang tikka and passah set in 22K antique gold finish.',
    description: 'The crescent moon holds sacred significance in Rajputana bridal ceremonies. This ornate Maang Tikka features intricate Jadau Kundan stonework with cascading emerald beads and hand-strung seed pearls.',
    price: 9999,
    originalPrice: 12500,
    images: [
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80'
    ],
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    gender: 'Women',
    material: 'Kundan Jadau',
    occasion: 'Bridal & Wedding',
    availability: 'In Stock',
    stockCount: 7,
    specs: {
      goldPurity: '22 Karat Gold with Pure 24K Kundan Foiling',
      grossWeight: '22.40 grams',
      netGoldWeight: '17.80 grams',
      gemstones: 'Pachi Kundan, Natural Russian Emerald Beads',
      dimensions: 'Tikka Length: 15 cm with hair chain hook',
      craftTechnique: 'Traditional Jadau Setting & Meena Inlay',
      hallmarkCert: 'BIS Hallmarked + Brand Authenticity Seal',
      provenance: 'Bikaner Royal Ateliers'
    },
    reviewsCount: 20,
    rating: 4.9
  },
  {
    id: 'prod-08',
    name: 'Heritage Kasu Mala Temple Choker',
    slug: 'heritage-kasu-mala-temple-choker',
    category: 'Temple Jewellery',
    collection: 'South Indian Kasu',
    shortDescription: 'Classic gold coin kasu choker stamped with Goddess Lakshmi emblems and ruby accents.',
    description: 'Revered as the ultimate symbol of fortune and ancestral heritage. Over 32 precisely struck gold coins overlap along an antique braided frame, culminating in an opulent ruby-studded clasp.',
    price: 34999,
    originalPrice: 39999,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80'
    ],
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    gender: 'Women',
    material: '22K Antique Gold',
    occasion: 'Festive & Celebration',
    availability: 'In Stock',
    stockCount: 3,
    specs: {
      goldPurity: '22 Karat (916 BIS Hallmarked)',
      grossWeight: '52.00 grams',
      netGoldWeight: '49.80 grams',
      gemstones: 'Natural Burmese Rubies (2.10 cts)',
      dimensions: 'Choker Diameter: 14 cm, Broad Band: 2.8 cm',
      craftTechnique: 'Antique Die-Striking & Link Soldering',
      hallmarkCert: 'BIS 916 Laser Certification',
      provenance: 'Coimbatore Heritage Goldsmiths'
    },
    reviewsCount: 16,
    rating: 4.9
  },
  {
    id: 'prod-09',
    name: 'Traditional Royal Maharashtrian Brahmani Nath',
    slug: 'royal-maharashtrian-brahmani-nath',
    category: 'Nose Pins',
    collection: 'Royal Rajputana',
    shortDescription: 'Heritage clip-on/pierced paisley nose ring with Basra pearls and pigeon-blood ruby stones.',
    description: 'An iconic antique nose jewel embodying Maratha regal elegance. Crafted in a signature paisley silhouette adorned with lustrous pearls and deep red rubies. Available in both clip-on and pierced variants.',
    price: 7499,
    originalPrice: 8999,
    images: [
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80'
    ],
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    gender: 'Women',
    material: '22K Antique Gold',
    occasion: 'Bridal & Wedding',
    availability: 'In Stock',
    stockCount: 8,
    specs: {
      goldPurity: '22 Karat (916 Hallmarked)',
      grossWeight: '7.80 grams',
      netGoldWeight: '6.40 grams',
      gemstones: 'Fine Basra Pearls, Natural Rubies',
      dimensions: 'Length: 3.8 cm, Clip/Piercing adjustable',
      craftTechnique: 'Hand-strung wire twisting & gem bezel',
      hallmarkCert: 'BIS 916 Hallmark certificate',
      provenance: 'Pune Traditional Goldsmiths'
    },
    reviewsCount: 12,
    rating: 4.8
  },
  {
    id: 'prod-10',
    name: 'Antique Vanki Bridal Armlet',
    slug: 'antique-vanki-bridal-armlet',
    category: 'Bridal Jewellery',
    collection: 'Temple Heritage',
    shortDescription: 'Inverted V-shape antique gold bajuband with sculpted Anjaneya motif and emerald drop.',
    description: 'The sacred Vanki armlet worn by royal southern brides. Sculpted in an ergonomic curved profile that grips the upper arm comfortably, with antique nakshi figures and dangling emerald cabochons.',
    price: 28999,
    originalPrice: 33500,
    images: [
      'https://images.unsplash.com/photo-1611591475870-8e4ce2289f81?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80'
    ],
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    gender: 'Women',
    material: '22K Antique Gold',
    occasion: 'Bridal & Wedding',
    availability: 'Made to Order',
    stockCount: 2,
    specs: {
      goldPurity: '22 Karat (916 Hallmarked)',
      grossWeight: '46.10 grams',
      netGoldWeight: '43.50 grams',
      gemstones: 'Natural Zambian Emerald cabochons',
      dimensions: 'Adjustable flex coil fits arm 8 to 11 inches',
      craftTechnique: 'Antique Nakshi Cire-Perdue Casting',
      hallmarkCert: 'BIS 916 Hallmarked',
      provenance: 'Mysore Palace Karigars'
    },
    reviewsCount: 7,
    rating: 5.0
  }
];

export const initialReviews: Review[] = [
  {
    id: 'rev-01',
    productId: 'prod-01',
    author: 'Sunita Mehra',
    city: 'Mumbai',
    rating: 5,
    date: '12 January 2026',
    title: 'Breathtaking temple craftsmanship',
    comment: 'The Antique Lakshmi Necklace exceeded my expectations. The antique gold tone is genuine, warm, and deeply royal—not that fake bright yellow you get elsewhere. The hallmarking laser seal gave complete peace of mind.',
    verifiedPurchase: true
  },
  {
    id: 'rev-02',
    productId: 'prod-01',
    author: 'Ananya Raghavan',
    city: 'Chennai',
    rating: 5,
    date: '3 February 2026',
    title: 'Wore it for my daughter’s wedding',
    comment: 'Every guest inquired where this heirloom piece was sourced. The weight feels substantial and the seed pearl fringe moves beautifully. Packing in the velvet box was fit for royalty.',
    verifiedPurchase: true
  },
  {
    id: 'rev-03',
    productId: 'prod-02',
    author: 'Meenakshi Iyer',
    city: 'Bengaluru',
    rating: 5,
    date: '18 February 2026',
    title: 'The Mayur Jhumkas are pure poetry',
    comment: 'Extremely detailed peacock carving. Even the reverse side has delicate floral engraving. Light enough to wear through a whole sangeet evening without dragging the earlobes.',
    verifiedPurchase: true
  },
  {
    id: 'rev-04',
    productId: 'prod-04',
    author: 'Dr. Radhika Singhania',
    city: 'Jaipur',
    rating: 5,
    date: '28 February 2026',
    title: 'Nizami elegance at its peak',
    comment: 'The reverse meenakari enamel work on this cocktail ring is museum-worthy. A conversation starter at every dinner party. Thank you to the concierge team for resizing it seamlessly.',
    verifiedPurchase: true
  }
];
