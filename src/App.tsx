import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IceCream, Sparkles, Tag, Calendar, Percent, Gift, ChevronDown, Coffee, CupSoda, ChevronLeft, ChevronRight } from 'lucide-react';

// ============================================================================
// OFFERS DATA - EDIT THIS SECTION TO ADD/REMOVE GLOBAL OFFERS
// ============================================================================
const OFFERS_DATA = [
  // { 
  //   id: 'off1', 
  //   title: 'Wednesday Special', 
  //   description: 'Come on Wednesday and buy any scoop for just ₹99!', 
  //   icon: Calendar 
  // },
  // { 
  //   id: 'off2', 
  //   title: 'Combo Delight', 
  //   description: 'Buy any Smoothie + Waffle and get 10% OFF your total bill.', 
  //   icon: Percent 
  // }
];

// ============================================================================
// FEATURED ITEMS DATA - HORIZONTAL SLIDER
// ============================================================================
const FEATURED_ITEMS_DATA = [
  { id: 'f1', name: 'Berry Burst', price: 200, image: '/Menu/Berry Burst.jpg' },
  { id: 'f2', name: 'Blueberry Bliss Waffle', price: 220, image: '/Menu/Blueberry Bliss Waffle.jpg' },
  { id: 'f3', name: 'Blueberry Pancake', price: 220, image: '/Menu/Blueberry Pancake.jpg' },
  { id: 'f4', name: 'Choco Hazelnut Heaven', price: 179, image: '/Menu/Choco Hazelnut Heaven.jpg' },
  { id: 'f5', name: 'Chocolate Pancake', price: 220, image: '/Menu/Chocolate Pancake.jpg' },
  { id: 'f6', name: 'Dark Hot Chocolate', price: 150, image: '/Menu/Dark Hot Chocolate.jpg' },
  { id: 'f7', name: 'Death By Chocolate', price: 205, image: '/Menu/Death By Chocolate.jpg' },
  { id: 'f8', name: 'Exotic Dry Fruit Falooda', price: 243, image: '/Menu/Exotic Dry Fruit Falooda.jpg' },
  { id: 'f9', name: 'Fruit Falooda Fiesta', price: 243, image: '/Menu/Fruit Falooda Fiesta.jpg' },
  { id: 'f10', name: 'Mango Chocolate Harmony', price: 190, image: '/Menu/Mango Chocolate Harmony.jpg' },
  { id: 'f11', name: 'Mango Popsicle Spritzer', price: 119, image: '/Menu/Mango Popsicle Spritzer.jpg' },
  { id: 'f12', name: 'Milk Hot Chocolate', price: 150, image: '/Menu/Milk Hot Chocolate.jpg' },
  { id: 'f13', name: 'Nutella Dream Waffle', price: 220, image: '/Menu/Nutella Dream Waffle.jpg' },
  { id: 'f14', name: 'Nutty Mango Paradise', price: 198, image: '/Menu/Nutty Mango Paradise.jpg' },
  { id: 'f15', name: 'Oreo Vanilla Crunch Waffle', price: 199, image: '/Menu/Oreo Vanilla Crunch Waffle.jpg' },
  { id: 'f16', name: 'Roasted Banana Delight', price: 230, image: '/Menu/Roasted Banana Delight.jpg' },
  { id: 'f17', name: 'Tropical Bliss', price: 212, image: '/Menu/Tropical Bliss.jpg' },
];

// ============================================================================
// MENU DATA - EDIT THIS SECTION TO ADD/REMOVE ITEMS
// ============================================================================
const MENU_DATA = [
  {
    id: 'smoothies',
    title: 'Smoothies',
    items: [
      { id: 'sm1', name: 'Tropical Bliss', description: 'Mango Passion', price: 212, isNew: true, image: '/Menu/Tropical Bliss.jpg' },
      { id: 'sm2', name: 'Berry Burst', description: 'Blueberry', price: 200, discount: '₹20 OFF', originalPrice: 220, image: '/Menu/Berry Burst.jpg' },
      { id: 'sm3', name: 'Nutty Choco Delight', description: 'Chocolate Peanut Butter', price: 177, image: '/Menu/Nutty Choco Delight.png' },
      { id: 'sm4', name: 'Strawberry Dream', description: '', price: 200, image: '/Menu/Strawberry Dream.png' },
    ]
  },
  {
    id: 'floats',
    title: 'Ice Cream Float',
    items: [
      { id: 'fl1', name: 'Blueberry Breeze Float', description: 'Blueberry', price: 211, image: '/Menu/Blueberry Breeze Float.png' },
      { id: 'fl2', name: 'Strawberry Swirl Float', description: 'Strawberry', price: 179, image: '/Menu/Strawberry Swirl Float.png' },
      { id: 'fl3', name: 'Mocha Chill', description: 'Coffee', price: 179, discount: '10% OFF', originalPrice: 199, image: '/Menu/Mocha Chill.png' },
      { id: 'fl4', name: 'Mango Splash', description: 'Mango', price: 179, image: '/Menu/Mango Splash.png' },
    ]
  },
  {
    id: 'falooda',
    title: 'Falooda',
    items: [
      { id: 'fa1', name: 'Exotic Dry Fruit Delight', description: '', price: 243, isNew: true, image: '/Menu/Exotic Dry Fruit Falooda.jpg' },
      { id: 'fa2', name: 'Gulab Jamun', description: '', price: 243, image: '/Menu/Daisy Gulab Jamun.png' },
      { id: 'fa3', name: 'Fruit Falooda Fiesta', description: '', price: 243, image: '/Menu/Fruit Falooda Fiesta.jpg' },
      { id: 'fa4', name: 'Nutty Mango Paradise', description: '', price: 198, image: '/Menu/Nutty Mango Paradise.jpg' },
    ]
  },
  {
    id: 'sundaes',
    title: 'Sundaes',
    items: [
      { id: 'su1', name: 'Death by Chocolate', description: '', price: 205, image: '/Menu/Death By Chocolate.jpg' },
      { id: 'su2', name: 'Choco Hazelnut Heaven', description: '', price: 179, image: '/Menu/Choco Hazelnut Heaven.jpg' },
      { id: 'su3', name: 'Classic Oreo Crunch', description: '', price: 170, image: '/Menu/Mango Chocolate Harmony.jpg' },
      { id: 'su4', name: 'Roasted Banana Delight', description: '', price: 230, discount: '₹20 OFF', originalPrice: 250, image: '/Menu/Roasted Banana Delight.jpg' },
    ]
  },
  {
    id: 'waffles',
    title: 'Waffles',
    items: [
      { id: 'wa1', name: 'Blueberry Bliss Waffle', description: '', price: 220, image: '/Menu/Blueberry Bliss Waffle.jpg' },
      { id: 'wa2', name: 'Nutella Dream Waffle', description: '', price: 220, image: '/Menu/Nutella Dream Waffle.jpg' },
      { id: 'wa3', name: 'Oreo Vanilla Crunch Waffle', description: '', price: 199, image: '/Menu/Oreo Vanilla Crunch Waffle.jpg' },
      { id: 'wa4', name: 'Mango Crunch Waffle', description: '', price: 231, isNew: true, image: '/Menu/Mango Crunch Waffle.png' },
    ]
  },
  {
    id: 'mocktail',
    title: 'Mocktail',
    items: [
      { id: 'mo1', name: 'Blueberry Mojito', description: '', price: 139, image: '/Menu/Blueberry Mojito.png' },
      { id: 'mo2', name: 'Chilli Guava Popsicle Spritzer', description: '', price: 119, image: '/Menu/Chilli Guava Popsicle Spritzer.png' },
      { id: 'mo3', name: 'Mango Popsicle Spritzer', description: '', price: 119, image: '/Menu/Mango Popsicle Spritzer.jpg' },
      { id: 'mo4', name: 'Pineapple Popsicle Spritzer', description: '', price: 119, image: '/Menu/Pineapple Popsicle Spritzer.png' },
    ]
  },
  {
    id: 'pancake',
    title: 'Pancake',
    items: [
      { id: 'pa1', name: 'Blueberry Pancake', description: '', price: 220, image: '/Menu/Blueberry Pancake.jpg' },
      { id: 'pa2', name: 'Chocolate Pancake', description: '', price: 220, image: '/Menu/Chocolate Pancake.jpg' },
      { id: 'pa3', name: 'Strawberry Pancake', description: '', price: 220, image: '/Menu/Strawberry Pancake.png' },
    ]
  },
  {
    id: 'scoops',
    title: 'Ice Cream Scoops',
    items: [
      { id: 'sc1', name: 'Vanilla', description: '', price: 84, image: '/Menu/Vanilla.jpeg' },
      { id: 'sc2', name: 'Chocolate', description: '', price: 84, image: '/Menu/Chocolate.jpeg' },
      { id: 'sc3', name: 'Strawberry', description: '', price: 84, image: '/Menu/Strawberry.jpeg' },
      { id: 'sc4', name: 'Spanish Delight', description: '', price: 84, image: '/Menu/Spanish Delight.jpeg' },
      { id: 'sc5', name: 'Fig and Honey', description: '', price: 84, image: '/Menu/Fig and Honey.jpeg' },
      { id: 'sc6', name: 'Mango', description: '', price: 84, image: '/Menu/Mango.jpeg' },
      { id: 'sc7', name: 'Kulfi', description: '', price: 84, image: '/Menu/Kulfi.jpeg' },
      { id: 'sc8', name: 'Coffee', description: '', price: 84, image: '/Menu/Coffee.jpeg' },
      { id: 'sc9', name: 'Passion Fruit', description: '', price: 84, image: '/Menu/Passion Fruit.jpeg' },
      { id: 'sc10', name: 'Blueberry', description: '', price: 84, image: '/Menu/Blueberry.jpeg' },
      { id: 'sc11', name: 'Strawberry Cheese Cake', description: '', price: 105, image: '/Menu/Strawberry Cheese Cake.jpeg' },
      { id: 'sc12', name: 'Red Velvet', description: '', price: 84, image: '/Menu/Red Velvet.jpeg' },
      { id: 'sc13', name: 'Tender Coconut', description: '', price: 84, image: '/Menu/Tender Coconut.jpeg' },
      { id: 'sc14', name: 'Chikku', description: '', price: 84, image: '/Menu/Chocolate.jpeg' },
      { id: 'sc15', name: 'Sitapal', description: '', price: 84, image: '/Menu/Sitaphal.jpeg' },
      { id: 'sc16', name: 'Butterscotch', description: '', price: 84, image: '/Menu/Butterscotch.jpeg' },
    ]
  }
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(OFFERS_DATA.length > 0 ? 'offers' : MENU_DATA[0].id);
  const [loadingIconIndex, setLoadingIconIndex] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const loadingIcons = [IceCream, CupSoda, Coffee];

  // Initialize the cyclic slider position to the middle to allow swiping both directions
  useEffect(() => {
    if (FEATURED_ITEMS_DATA.length > 0) {
      const timer = setTimeout(() => {
        if (sliderRef.current) {
          // We render 6 sets total. Center it at the start of set 3.
          sliderRef.current.scrollLeft = (sliderRef.current.scrollWidth / 6) * 2;
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Cycle through icons for the preloader
    const iconInterval = setInterval(() => {
      setLoadingIconIndex((prev) => (prev + 1) % loadingIcons.length);
    }, 800);

    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearInterval(iconInterval);
    };
  }, []);

  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToMenu = () => {
    const element = document.getElementById('menu-start');
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Update active category on scroll and auto-scroll navbar
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      let currentActive = activeCategory;

      // Check offers section first
      if (OFFERS_DATA.length > 0) {
        const offersEl = document.getElementById('offers');
        if (offersEl) {
          const { top, bottom } = offersEl.getBoundingClientRect();
          if (scrollPosition >= top + window.scrollY && scrollPosition <= bottom + window.scrollY) {
            currentActive = 'offers';
          }
        }
      }

      // Check menu categories
      for (const category of MENU_DATA) {
        const element = document.getElementById(category.id);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;

          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            currentActive = category.id;
            break;
          }
        }
      }

      if (currentActive !== activeCategory) {
        setActiveCategory(currentActive);

        // Auto-scroll the navbar to keep the active button in view
        if (navRef.current) {
          const activeBtn = document.getElementById(`nav-${currentActive}`);
          if (activeBtn) {
            const container = navRef.current;
            const scrollLeft = activeBtn.offsetLeft - container.offsetWidth / 2 + activeBtn.offsetWidth / 2;
            container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
          }
        }
      }
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [activeCategory]);

  const LoadingIcon = loadingIcons[loadingIconIndex];

  return (
    <div className="min-h-screen bg-[#1A0B2E] text-white font-sans selection:bg-yellow-400 selection:text-purple-900">
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-yellow-400"
          >
            <div className="relative w-24 h-24 flex items-center justify-center mb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={loadingIconIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute text-[#1A0B2E]"
                >
                  <LoadingIcon size={64} strokeWidth={1.5} />
                </motion.div>
              </AnimatePresence>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold tracking-wider text-[#1A0B2E] text-center uppercase"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Mercelys Kefi
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center bg-yellow-400 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-10 text-yellow-500/50"
          >
            <Sparkles size={48} />
          </motion.div>
          <motion.div
            animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-40 right-12 text-yellow-500/40"
          >
            <IceCream size={64} />
          </motion.div>
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-40 left-20 text-yellow-500/40"
          >
            <CupSoda size={56} />
          </motion.div>
          <motion.div
            animate={{ y: [0, 25, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-32 right-24 text-yellow-500/50"
          >
            <Coffee size={48} />
          </motion.div>

          {/* Abstract blobs - optimized for performance */}
          <div className="absolute top-1/4 -left-20 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(253,224,71,0.4) 0%, rgba(253,224,71,0) 70%)' }}></div>
          <div className="absolute top-1/3 -right-20 w-72 h-72 rounded-full" style={{ background: 'radial-gradient(circle, rgba(234,179,8,0.4) 0%, rgba(234,179,8,0) 70%)' }}></div>
          <div className="absolute -bottom-32 left-1/3 w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle, rgba(253,224,71,0.4) 0%, rgba(253,224,71,0) 70%)' }}></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center px-6 text-center -mt-20 sm:-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl"></div>
              <img
                src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Soft%20ice%20cream/3D/soft_ice_cream_3d.png"
                alt="Ice Cream"
                className="w-64 h-64 object-contain mb-6 drop-shadow-2xl relative z-10"
              />
            </div>
            <h1
              className="text-5xl font-bold text-[#1A0B2E] uppercase tracking-wider mb-2 drop-shadow-sm"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Mercelys Kefi
            </h1>
            <p className="text-purple-900 tracking-[0.3em] text-sm font-bold uppercase bg-white/50 px-4 py-1 rounded-full">
              BTM Layout
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToMenu}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-24 z-10 flex flex-col items-center text-purple-900 hover:text-purple-700 transition-colors"
        >
          <span className="text-xs tracking-widest uppercase mb-2 font-bold bg-white/50 px-4 py-2 rounded-full shadow-sm">Explore Menu</span>
          <ChevronDown size={28} className="drop-shadow-md mt-1" />
        </motion.button>
      </section>

      {/* Sticky Header */}
      <header id="menu-start" className="sticky top-0 z-40 bg-[#1A0B2E]/95 backdrop-blur-md border-b border-purple-800/50 pt-4 pb-2 shadow-lg">
        {/* Categories Navbar */}
        <div
          ref={navRef}
          className="flex overflow-x-auto hide-scrollbar px-4 pb-2 gap-3 snap-x scroll-smooth"
        >
          {OFFERS_DATA.length > 0 && (
            <button
              id="nav-offers"
              onClick={() => scrollToCategory('offers')}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all snap-start flex items-center gap-2 ${activeCategory === 'offers'
                ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                : 'bg-purple-900/50 text-red-300 border border-red-900/50 hover:bg-purple-800/50'
                }`}
            >
              <Gift size={14} />
              Offers
            </button>
          )}
          {MENU_DATA.map((category) => (
            <button
              key={category.id}
              id={`nav-${category.id}`}
              onClick={() => scrollToCategory(category.id)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all snap-start ${activeCategory === category.id
                ? 'bg-yellow-400 text-[#1A0B2E] shadow-[0_0_15px_rgba(250,204,21,0.4)]'
                : 'bg-purple-900/50 text-purple-200 border border-purple-700/50 hover:bg-purple-800/50'
                }`}
            >
              {category.title}
            </button>
          ))}
        </div>
      </header>

      {/* Menu Content */}
      <main className="px-4 py-8 max-w-md mx-auto pb-24">

        {/* Offers Section */}
        {OFFERS_DATA.length > 0 && (
          <motion.section
            id="offers"
            className="mb-12 scroll-mt-36"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px bg-gradient-to-r from-transparent to-red-500 flex-1"></div>
              <h2
                className="text-xl font-bold text-red-400 uppercase tracking-widest flex items-center gap-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                <Gift size={20} />
                Special Offers
              </h2>
              <div className="h-px bg-gradient-to-l from-transparent to-red-500 flex-1"></div>
            </div>

            <div className="flex flex-col gap-4">
              {OFFERS_DATA.map((offer, index) => {
                const Icon = offer.icon;
                return (
                  <motion.div
                    key={offer.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="relative bg-gradient-to-br from-red-950/40 to-purple-900/40 rounded-2xl p-4 border border-red-500/30 shadow-lg overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                    <div className="flex items-start gap-4 relative z-10">
                      <div className="bg-red-500/20 p-3 rounded-xl text-red-400">
                        <Icon size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-red-100 text-lg">{offer.title}</h3>
                        <p className="text-red-200/80 text-sm mt-1 leading-relaxed">
                          {offer.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        )}

        {/* Featured Items Slider (No Header) */}
        {FEATURED_ITEMS_DATA.length > 0 && (
          <motion.section
            className="mb-12 overflow-hidden relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            {/* Swipe Indicators */}
            <div className="absolute left-1 top-1/2 -translate-y-1/2 z-20 pointer-events-none drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] text-white/80 animate-[pulse_2s_ease-in-out_infinite]">
              <ChevronLeft size={40} strokeWidth={2} />
            </div>
            <div className="absolute right-1 top-1/2 -translate-y-1/2 z-20 pointer-events-none drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] text-white/80 animate-[pulse_2s_ease-in-out_infinite]">
              <ChevronRight size={40} strokeWidth={2} />
            </div>

            <div
              ref={sliderRef}
              className="flex overflow-x-auto hide-scrollbar gap-4 pb-4 snap-x snap-mandatory px-4 md:px-0"
            >
              {Array(6).fill(FEATURED_ITEMS_DATA).flat().map((item, index) => (
                <motion.div
                  key={`${item.id}-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: Math.min((index % FEATURED_ITEMS_DATA.length) * 0.1, 0.5) }}
                  className="relative shrink-0 w-64 h-80 rounded-2xl overflow-hidden snap-center group shadow-xl border border-purple-800/30"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#1A0B2E]/90 to-transparent"></div>

                  {/* Content Container */}
                  <div className="absolute bottom-0 inset-x-0 p-4 pb-5 flex flex-col justify-end items-center text-center">
                    <h3 className="font-bold text-lg text-white drop-shadow-md leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {item.name}
                    </h3>
                    <div className="mt-1.5 flex items-center gap-1 bg-yellow-400 text-[#1A0B2E] px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                      ₹{item.price}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Categories */}
        {MENU_DATA.map((category, catIndex) => (
          <motion.section
            key={category.id}
            id={category.id}
            className="mb-12 scroll-mt-36"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px bg-gradient-to-r from-transparent to-purple-700 flex-1"></div>
              <h2
                className="text-xl font-bold text-yellow-400 uppercase tracking-widest"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {category.title}
              </h2>
              <div className="h-px bg-gradient-to-l from-transparent to-purple-700 flex-1"></div>
            </div>

            <div className="flex flex-col gap-4">
              {category.items.map((item, itemIndex) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: itemIndex * 0.1 }}
                  className="relative flex items-center bg-[#251442] rounded-2xl p-3 border border-purple-800/30 shadow-lg overflow-hidden group"
                >
                  {/* Badges Container */}
                  <div className="absolute top-0 right-0 flex flex-col items-end gap-1 z-10">
                    {item.isNew && (
                      <div className="bg-yellow-400 text-[#1A0B2E] text-[10px] font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1 shadow-md">
                        <Sparkles size={10} />
                        NEW
                      </div>
                    )}
                    {item.discount && (
                      <div className="bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1 shadow-md">
                        <Tag size={10} />
                        {item.discount}
                      </div>
                    )}
                  </div>

                  {/* Image */}
                  <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-purple-900 relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 border border-white/10 rounded-xl"></div>
                  </div>

                  {/* Details & Price Container */}
                  <div className="ml-4 flex-1 flex justify-between items-center h-full min-h-[5.5rem]">
                    {/* Text Details */}
                    <div className="flex-1 pr-2">
                      <h3 className="font-semibold text-purple-50 text-base leading-tight">
                        {item.name}
                      </h3>
                      {item.description && (
                        <p className="text-purple-300 text-xs mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {/* Price on the Right */}
                    <div className="shrink-0 flex flex-col items-end justify-center pl-2 border-l border-purple-800/50">
                      <span className="text-yellow-400 font-bold text-lg">
                        ₹{item.price}
                      </span>
                      {item.originalPrice && (
                        <span className="text-purple-400/60 text-xs line-through decoration-red-500/50 mt-0.5">
                          ₹{item.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}
      </main>

      {/* Footer */}
      <footer className="bg-[#110720] py-12 text-center border-t border-purple-900/50">
        <IceCream size={32} className="mx-auto text-purple-500 mb-4 opacity-50" />
        <h2
          className="text-xl font-bold text-white uppercase tracking-wider mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Merceleys Kefi
        </h2>
        <p className="text-purple-400 text-sm font-medium mb-1">BTM Layout, Bangalore</p>
        <p className="text-purple-600/60 text-xs">Made with ❤️ for Ice Cream Lovers</p>
      </footer>

      {/* Global styles for hiding scrollbar */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
