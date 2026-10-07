export type CategoryType = 
  | 'Antique Necklaces'
  | 'Earrings'
  | 'Bangles'
  | 'Rings'
  | 'Chains'
  | 'Bracelets'
  | 'Maang Tikka'
  | 'Nose Pins'
  | 'Bridal Jewellery'
  | 'Temple Jewellery'
  | 'Vintage Collections';

export type CollectionType = 
  | 'Royal Rajputana'
  | 'Temple Heritage'
  | 'Nizami Polki'
  | 'Victorian Heirloom'
  | 'South Indian Kasu';

export type MaterialType =
  | '22K Antique Gold'
  | '24K Gold Leaf over Silver'
  | 'Kundan Jadau'
  | 'Temple Nakshi Gold'
  | 'Polki Uncut Diamonds'
  | 'Natural Burmese Rubies & Emeralds';

export type OccasionType =
  | 'Bridal & Wedding'
  | 'Festive & Celebration'
  | 'Heirloom Milestone'
  | 'Cocktail Soirée'
  | 'Royal Everyday';

export type AvailabilityType = 'In Stock' | 'Made to Order' | 'Limited Heirloom';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: CategoryType;
  collection: CollectionType;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  images: string[];
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  gender: 'Women' | 'Unisex' | 'Men';
  material: MaterialType;
  occasion: OccasionType;
  availability: AvailabilityType;
  stockCount: number;
  specs: {
    goldPurity: string; // e.g. "22K (916 BIS Hallmarked)"
    grossWeight: string; // e.g. "48.50 grams"
    netGoldWeight: string; // e.g. "42.10 grams"
    gemstones: string; // e.g. "Natural Rubies (4.20 cts), Basra Pearls"
    dimensions: string; // e.g. "Length: 16 inches, Pendant: 5.2 cm"
    craftTechnique: string; // e.g. "Handcrafted Nakshi & Thappa Champlevé"
    hallmarkCert: string; // e.g. "BIS 916 Laser Engraved + IGI Gem ID"
    provenance: string; // e.g. "Jaipur Heritage Atelier"
  };
  reviewsCount?: number;
  rating?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface OrderAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export type OrderStatus = 'Processing' | 'Confirmed' | 'Hallmarked & Inspected' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  shippingAddress: OrderAddress;
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'COD';
  paymentStatus: 'Paid' | 'Pending COD';
  subtotal: number;
  discount: number;
  shippingFee: number;
  giftWrapFee: number;
  total: number;
  status: OrderStatus;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

export interface BrandConfig {
  brandName: string;
  tagline: string;
  subTitle: string;
  currencySymbol: string;
  currencyCode: string;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  boutiqueAddress: string;
  boutiqueCity: string;
  boutiqueState: string;
  boutiqueCountry: string;
  boutiqueHours: string;
  freeShippingThreshold: number;
  defaultShippingFee: number;
  giftPackagingPrice: number;
  instagramHandle: string;
}
