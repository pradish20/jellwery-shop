import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  BrandConfig, 
  CartItem, 
  Order, 
  Product, 
  Review, 
  OrderStatus 
} from '../types';
import { 
  defaultBrandConfig, 
  initialProducts, 
  initialReviews 
} from '../data/initialData';

interface StoreContextType {
  brandConfig: BrandConfig;
  updateBrandConfig: (newConfig: BrandConfig) => void;
  resetBrandConfig: () => void;

  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'slug'>) => Product;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedSize?: string) => void;
  removeFromCart: (productId: string, selectedSize?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, selectedSize?: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartTotal: number;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  isGiftWrap: boolean;
  setIsGiftWrap: (gift: boolean) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingNumber?: string) => void;

  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;

  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  currentPage: string;
  setCurrentPage: (page: string, params?: Record<string, string>) => void;
  pageParams: Record<string, string>;

  isAdminLoggedIn: boolean;
  adminLogin: (password: string) => boolean;
  adminLogout: () => void;

  formatPrice: (amount: number) => string;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const BRAND_CONFIG_KEY = 'ayj_brand_config_v1';
const PRODUCTS_KEY = 'ayj_products_v1';
const CART_KEY = 'ayj_cart_v1';
const WISHLIST_KEY = 'ayj_wishlist_v1';
const ORDERS_KEY = 'ayj_orders_v1';
const REVIEWS_KEY = 'ayj_reviews_v1';
const ADMIN_AUTH_KEY = 'ayj_admin_auth_v1';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Brand Config
  const [brandConfig, setBrandConfig] = useState<BrandConfig>(() => {
    try {
      const saved = localStorage.getItem(BRAND_CONFIG_KEY);
      return saved ? JSON.parse(saved) : defaultBrandConfig;
    } catch {
      return defaultBrandConfig;
    }
  });

  const updateBrandConfig = (newConfig: BrandConfig) => {
    setBrandConfig(newConfig);
    localStorage.setItem(BRAND_CONFIG_KEY, JSON.stringify(newConfig));
  };

  const resetBrandConfig = () => {
    setBrandConfig(defaultBrandConfig);
    localStorage.setItem(BRAND_CONFIG_KEY, JSON.stringify(defaultBrandConfig));
  };

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_KEY);
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  const addProduct = (prodData: Omit<Product, 'id' | 'slug'>): Product => {
    const id = `prod-${Date.now()}`;
    const slug = prodData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newProduct: Product = {
      ...prodData,
      id,
      slug,
      rating: 5.0,
      reviewsCount: 0
    };
    const updated = [newProduct, ...products];
    setProducts(updated);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updated));
    return newProduct;
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    const updated = products.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
    setProducts(updated);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updated));
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updated));
  };

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [isGiftWrap, setIsGiftWrap] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const addToCart = (product: Product, quantity = 1, selectedSize?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === selectedSize
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }
      return [...prev, { product, quantity, selectedSize }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, selectedSize?: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.selectedSize === selectedSize))
    );
  };

  const updateCartQuantity = (productId: string, quantity: number, selectedSize?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedSize === selectedSize) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setIsGiftWrap(false);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  let cartDiscount = 0;
  if (appliedCoupon === 'ROYAL10') {
    cartDiscount = Math.round(cartSubtotal * 0.10);
  } else if (appliedCoupon === 'ANTIQUE15') {
    cartDiscount = Math.round(cartSubtotal * 0.15);
  } else if (appliedCoupon === 'WELCOME500') {
    cartDiscount = Math.min(500, cartSubtotal);
  }

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'ROYAL10') {
      setAppliedCoupon('ROYAL10');
      return { success: true, message: '10% Royal Privilege discount applied!' };
    }
    if (clean === 'ANTIQUE15') {
      setAppliedCoupon('ANTIQUE15');
      return { success: true, message: '15% Antique Heritage discount applied!' };
    }
    if (clean === 'WELCOME500') {
      setAppliedCoupon('WELCOME500');
      return { success: true, message: '₹500 Welcome heirloom privilege applied!' };
    }
    return { success: false, message: 'Invalid coupon code. Try ROYAL10 or ANTIQUE15' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const shippingFee = cartSubtotal >= brandConfig.freeShippingThreshold || cartSubtotal === 0
    ? 0
    : brandConfig.defaultShippingFee;

  const giftFee = isGiftWrap ? brandConfig.giftPackagingPrice : 0;

  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + shippingFee + giftFee);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_KEY);
      return saved ? JSON.parse(saved) : ['prod-01', 'prod-03'];
    } catch {
      return ['prod-01', 'prod-03'];
    }
  });

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const next = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
      return next;
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_KEY);
      if (saved) return JSON.parse(saved);
      // Sample initial order for user satisfaction
      const sampleOrder: Order = {
        id: 'ord-1001',
        orderNumber: 'AYJ-94821',
        createdAt: '2026-03-24T10:15:00Z',
        items: [
          {
            product: initialProducts[0],
            quantity: 1,
            selectedSize: 'Standard (16 in)'
          }
        ],
        shippingAddress: {
          fullName: 'Pooja Agarwal',
          email: 'pooja.agarwal@example.com',
          phone: '+91 98234 56789',
          addressLine1: 'Flat 402, Royal Palms, Banjara Hills Road No. 12',
          city: 'Hyderabad',
          state: 'Telangana',
          pincode: '500034',
          country: 'India'
        },
        paymentMethod: 'UPI',
        paymentStatus: 'Paid',
        subtotal: 12999,
        discount: 1300,
        shippingFee: 0,
        giftWrapFee: 350,
        total: 12049,
        status: 'Hallmarked & Inspected',
        trackingNumber: 'BVL-IND-882941',
        estimatedDelivery: '3 to 5 business days'
      };
      return [sampleOrder];
    } catch {
      return [];
    }
  });

  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status'>): Order => {
    const timestamp = Date.now();
    const randomHex = Math.floor(10000 + Math.random() * 90000);
    const newOrder: Order = {
      ...orderData,
      id: `ord-${timestamp}`,
      orderNumber: `AYJ-${randomHex}`,
      createdAt: new Date().toISOString(),
      status: 'Confirmed',
      trackingNumber: `BVL-IND-${Math.floor(100000 + Math.random() * 900000)}`,
      estimatedDelivery: '3 to 5 business days (Insured Express)'
    };
    const updated = [newOrder, ...orders];
    setOrders(updated);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, trackingNumber?: string) => {
    const updated = orders.map((o) => {
      if (o.id === orderId) {
        return {
          ...o,
          status,
          trackingNumber: trackingNumber || o.trackingNumber
        };
      }
      return o;
    });
    setOrders(updated);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
  };

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem(REVIEWS_KEY);
      return saved ? JSON.parse(saved) : initialReviews;
    } catch {
      return initialReviews;
    }
  });

  const addReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    };
    const updated = [newRev, ...reviews];
    setReviews(updated);
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(updated));

    // Update product rating and reviews count
    const prod = products.find((p) => p.id === reviewData.productId);
    if (prod) {
      const currentCount = prod.reviewsCount || 0;
      const currentRating = prod.rating || 5.0;
      const newRating = Number(((currentRating * currentCount + reviewData.rating) / (currentCount + 1)).toFixed(1));
      updateProduct(prod.id, {
        reviewsCount: currentCount + 1,
        rating: newRating
      });
    }
  };

  // Navigation / Page state
  const [currentPage, setCurrentPageState] = useState<string>('home');
  const [pageParams, setPageParams] = useState<Record<string, string>>({});

  const setCurrentPage = (page: string, params: Record<string, string> = {}) => {
    setCurrentPageState(page);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quick view
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Admin Auth
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const adminLogin = (pass: string): boolean => {
    if (pass.trim() === 'antique123' || pass.trim() === 'admin' || pass.trim() === 'admin123') {
      setIsAdminLoggedIn(true);
      try {
        localStorage.setItem(ADMIN_AUTH_KEY, 'true');
      } catch {}
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    try {
      localStorage.removeItem(ADMIN_AUTH_KEY);
    } catch {}
    setCurrentPage('home');
  };

  // Currency helper
  const formatPrice = (amount: number): string => {
    const formatted = new Intl.NumberFormat('en-IN').format(amount);
    return `${brandConfig.currencySymbol}${formatted}`;
  };

  return (
    <StoreContext.Provider
      value={{
        brandConfig,
        updateBrandConfig,
        resetBrandConfig,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartDiscount,
        cartTotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        isGiftWrap,
        setIsGiftWrap,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        orders,
        createOrder,
        updateOrderStatus,
        reviews,
        addReview,
        quickViewProduct,
        setQuickViewProduct,
        currentPage,
        setCurrentPage,
        pageParams,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        formatPrice
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
