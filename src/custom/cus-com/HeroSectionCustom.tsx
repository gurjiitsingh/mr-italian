import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  Bike, 
  PhoneCall, 
  MapPin, 
  Flame 
} from 'lucide-react';

export default function HeroSectionCustom() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0c241b] text-white pt-20 pb-16 selection:bg-[#f7c82d] selection:text-black">
      {/* Background radial textures and subtle glows */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#194d38_0%,_#0c241b_60%,_#06140e_100%)] opacity-90" />
      <div className="pointer-events-none absolute -left-20 top-24 h-96 w-96 rounded-full bg-[#f7c82d]/10 blur-[130px]" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-96 w-96 rounded-full bg-[#d71920]/15 blur-[140px]" />

      {/* Decorative corner borders in signature gold */}
      <div className="pointer-events-none absolute top-4 left-4 h-14 w-14 border-t-2 border-l-2 border-[#f7c82d]/40 z-20" />
      <div className="pointer-events-none absolute top-4 right-4 h-14 w-14 border-t-2 border-r-2 border-[#f7c82d]/40 z-20" />
      <div className="pointer-events-none absolute bottom-4 left-4 h-14 w-14 border-b-2 border-l-2 border-[#f7c82d]/40 z-20" />
      <div className="pointer-events-none absolute bottom-4 right-4 h-14 w-14 border-b-2 border-r-2 border-[#f7c82d]/40 z-20" />

      {/* Main Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        
        {/* Top Floating Event Catering Bar */}
        <div className="mx-auto mb-8 max-w-3xl rounded-full border border-[#f7c82d]/30 bg-[#091d16]/90 px-5 py-2 shadow-lg backdrop-blur-md text-center">
          <p className="text-xs sm:text-sm font-semibold tracking-wide text-stone-200">
            <span className="text-[#f7c82d] font-bold">Special Catering:</span> Ring Ceremony • Marriage Parties • Kitty Parties • Birthday Parties
          </p>
        </div>

        {/* Hero Grid */}
        <div className="grid min-h-[600px] items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] pt-4">
          
          {/* ================= LEFT CONTENT COLUMN ================= */}
          <div className="relative z-10 max-w-xl text-left">
            
            {/* Cuisine Tag Pill */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#f7c82d]/40 bg-[#163a2c] px-4 py-1.5 shadow-md">
              <span className="flex h-2.5 w-2.5 rounded-full bg-[#f7c82d] animate-pulse" />
              <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-[#f7c82d]">
                Indian | Chinese | Tandoor
              </span>
            </div>

            {/* Main Brand Headline */}
            <h1 className="font-serif text-[clamp(2.6rem,5.5vw,4.8rem)] font-black leading-[1.02] tracking-tight text-white drop-shadow-md">
              <span className="italic font-serif text-[#f7c82d] text-2xl sm:text-3xl block -mb-1">
                Welcome to
              </span>
              Mr. Italian
              <span className="block text-xl sm:text-2xl font-bold tracking-wider uppercase text-amber-200 mt-1">
                Restaurant • Pizza • Coffee Bar
              </span>
            </h1>

            {/* Description */}
            <p className="mt-5 text-sm sm:text-base leading-relaxed text-emerald-100/90 font-normal max-w-lg">
              Indulge in authentic cheesy Italian pizzas, rich Indian curries, and sizzling tandoori specialties crafted fresh daily.
            </p>

            {/* Call to Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/#order_now"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#f7c82d] px-8 py-3.5 text-base font-black text-black shadow-[0_0_20px_rgba(247,200,45,0.4)] transition-all duration-300 hover:scale-105 hover:bg-[#fed649]"
              >
                <span>Order Online</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/15 transition-transform group-hover:translate-x-1">
                  <ArrowRight size={14} className="stroke-[3]" />
                </span>
              </Link>

              <Link
                href="/menu"
                className="inline-flex items-center justify-center rounded-full border-2 border-[#f7c82d]/60 bg-[#0a231a]/80 px-8 py-3.5 text-base font-bold text-[#f7c82d] backdrop-blur-md transition-all duration-300 hover:border-[#f7c82d] hover:bg-[#f7c82d]/10 hover:text-white"
              >
                Explore Full Menu
              </Link>
            </div>

            {/* Free Home Delivery Ribbon */}
            <div className="mt-8 rounded-2xl bg-gradient-to-r from-[#d71920] to-[#b31317] p-3 shadow-lg flex items-center justify-between gap-4 max-w-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#d71920] shadow-sm">
                  <Bike size={22} className="stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-wider text-white">Free Home Delivery</h4>
                  <p className="text-[11px] text-red-100 font-medium">Fast, hot & fresh to your doorstep</p>
                </div>
              </div>
              <a 
                href="tel:9878002667" 
                className="flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1.5 text-xs font-bold text-yellow-300 hover:bg-black/50 transition"
              >
                <PhoneCall size={13} />
                <span>Call Now</span>
              </a>
            </div>

            {/* Location & Quick Contact */}
            <div className="mt-6 flex items-center gap-2 text-xs text-emerald-200/80">
              <MapPin size={15} className="text-[#f7c82d] flex-shrink-0" />
              <span>DAD, KAMRAI (BOLATH) • Ph: 98780-02667</span>
            </div>
          </div>

          {/* ================= RIGHT CIRCULAR CREST & FOOD SHOWCASE ================= */}
          <div className="relative flex items-center justify-center min-h-[460px] lg:min-h-[560px]">
            
            {/* Outer Signature Yellow Ring */}
            <div className="absolute h-[340px] w-[340px] sm:h-[450px] sm:w-[450px] rounded-full border-[6px] border-[#f7c82d] shadow-[0_0_50px_rgba(247,200,45,0.35)]" />
            
            {/* Multi-dish Collage Grid Container */}
            <div className="relative z-10 grid grid-cols-2 gap-3 w-full max-w-[380px] sm:max-w-[430px] p-4">
              
              {/* Top Left: hero-2.jpg */}
              <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-[#f7c82d]/50 shadow-lg group">
                <Image
                  src="/images/hero-2.jpg"
                  alt="Tandoori & Indian Dishes"
                  fill
                  priority
                  sizes="(max-width: 768px) 50vw, 220px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute bottom-2 left-2 rounded-md bg-black/75 px-2 py-0.5 text-[10px] font-bold text-[#f7c82d]">
                  Tandoori & Indian
                </span>
              </div>

              {/* Top Right: hero-3.jpg */}
              <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-[#f7c82d]/50 shadow-lg group">
                <Image
                  src="/images/hero-3.jpg"
                  alt="Butter Chicken Handi"
                  fill
                  priority
                  sizes="(max-width: 768px) 50vw, 220px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute bottom-2 left-2 rounded-md bg-black/75 px-2 py-0.5 text-[10px] font-bold text-[#f7c82d]">
                  Butter Chicken
                </span>
              </div>

              {/* Bottom Left: hero-9.jpg */}
              <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-[#f7c82d]/50 shadow-lg group">
                <Image
                  src="/images/hero-11.jpg"
                  alt="Italian Pasta & Chinese"
                  fill
                  sizes="(max-width: 768px) 50vw, 220px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute bottom-2 left-2 rounded-md bg-black/75 px-2 py-0.5 text-[10px] font-bold text-[#f7c82d]">
                  Pasta & Chinese
                </span>
              </div>

              {/* Bottom Right: hero-7.jpg */}
              <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-[#f7c82d]/50 shadow-lg group">
                <Image
                  src="/images/hero-14.jpg"
                  alt="Cheesy Pizza"
                  fill
                  sizes="(max-width: 768px) 50vw, 220px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute bottom-2 left-2 rounded-md bg-black/75 px-2 py-0.5 text-[10px] font-bold text-[#f7c82d]">
                  Cheesy Pizza
                </span>
              </div>

              {/* Central Iconic Black Logo Badge */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center h-28 w-28 sm:h-32 sm:w-32 rounded-full border-4 border-[#f7c82d] bg-[#111111] text-center shadow-2xl p-2 z-20">
                <span className="text-[11px] font-serif italic text-amber-200">Menu</span>
                <p className="font-serif text-xs sm:text-sm font-extrabold text-[#f7c82d] leading-none">
                  Mr. Italian
                </p>
                <div className="my-0.5 h-[1.5px] w-10 bg-[#f7c82d]" />
                <span className="text-[9px] uppercase font-bold text-white tracking-widest">
                  Pizza Bar
                </span>
              </div>
            </div>

            {/* Floating Order Minimum Badge */}
            <div className="absolute -bottom-4 right-2 sm:right-6 z-30 rounded-2xl border-2 border-white/20 bg-gradient-to-br from-white to-stone-100 p-3 shadow-2xl text-black">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#d71920] text-white font-bold">
                  <Bike size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Min Order</p>
                  <p className="text-sm font-black text-[#d71920] leading-none">
                    ₹ 400
                  </p>
                  <p className="text-[10px] font-medium text-stone-600 mt-0.5">with in 3 Km.</p>
                </div>
              </div>
            </div>

            {/* Floating Flame Tag */}
            <div className="absolute -top-3 left-4 z-30 flex items-center gap-2 rounded-full border border-[#f7c82d]/50 bg-[#0e271d]/90 px-4 py-1.5 shadow-xl backdrop-blur-md">
              <Flame size={14} className="text-[#f7c82d]" />
              <span className="text-xs font-bold text-white">Fresh & Hot Everyday</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}