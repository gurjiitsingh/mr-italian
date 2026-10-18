"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import ProductCardPrductOfMonth from "../../components/level-2/ProductCardPOM";

export default function BestOfMonth() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/products/featured", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch featured products");
        const products = await res.json();
        setFeaturedProducts(products);
      } catch (err) {
        console.error("Error fetching featured products:", err);
      }
    };
    fetchData();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount =
        direction === "left" ? -clientWidth / 1.5 : clientWidth / 1.5;

      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
      <div className="relative overflow-hidden rounded-3xl border border-[#f7c82d]/30 bg-gradient-to-br from-[#0c241b] via-[#103427] to-[#071811] py-8 md:py-12 my-12 shadow-2xl">

        {/* Ambient Glows & Corner Accents */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#1a4e39_0%,transparent_65%)] opacity-80" />
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#f7c82d]/10 blur-[90px]" />
        <div className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-[#d71920]/15 blur-[90px]" />

        {/* Decorative corner lines in gold */}
        <div className="pointer-events-none absolute top-3 left-3 h-10 w-10 border-t-2 border-l-2 border-[#f7c82d]/40" />
        <div className="pointer-events-none absolute top-3 right-3 h-10 w-10 border-t-2 border-r-2 border-[#f7c82d]/40" />
        <div className="pointer-events-none absolute bottom-3 left-3 h-10 w-10 border-b-2 border-l-2 border-[#f7c82d]/40" />
        <div className="pointer-events-none absolute bottom-3 right-3 h-10 w-10 border-b-2 border-r-2 border-[#f7c82d]/40" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 text-left">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#f7c82d]/40 bg-[#f7c82d] text-black shadow-[0_0_15px_rgba(247,200,45,0.35)]">
                  <FaStar className="text-sm" />
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white">
                  Trending{" "}
                  <span className="text-[#f7c82d] drop-shadow-[0_2px_10px_rgba(247,200,45,0.3)]">
                    Foods
                  </span>
                </h2>
              </div>

              <p className="mt-2 text-sm text-emerald-100/80">
                The most ordered dishes of the last 30 days
              </p>
            </div>

            {/* Small Tag Pill */}
            <div className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[#f7c82d]/30 bg-[#091f17]/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#f7c82d] backdrop-blur-md">
              Chef Recommended
            </div>
          </div>

          {/* Slider Navigation Buttons */}
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="absolute -left-1 sm:left-2 top-[55%] z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#f7c82d]/40 bg-[#0c241b]/90 text-[#f7c82d] shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-[#f7c82d] hover:text-black hover:shadow-[0_0_20px_rgba(247,200,45,0.4)]"
          >
            <FaChevronLeft size={14} />
          </button>

          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="absolute -right-1 sm:right-2 top-[55%] z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#f7c82d]/40 bg-[#0c241b]/90 text-[#f7c82d] shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-[#f7c82d] hover:text-black hover:shadow-[0_0_20px_rgba(247,200,45,0.4)]"
          >
            <FaChevronRight size={14} />
          </button>

          {/* Slider */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide px-1 pb-4"
          >
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product, i) => (
                <div key={product.id ?? `${product.name}-${i}`} className="snap-center">
                  <ProductCardPrductOfMonth product={product} />
                </div>
              ))
            ) : (
              [...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="min-w-[260px] flex-shrink-0 rounded-2xl border border-[#f7c82d]/15 bg-[#091f17]/70 p-6 shadow-lg backdrop-blur-sm animate-pulse"
                >
                  <div className="mb-4 h-40 w-full rounded-xl bg-emerald-950/40" />
                  <div className="mb-3 h-4 w-3/4 rounded-full bg-[#f7c82d]/20" />
                  <div className="mb-2 h-3 w-1/2 rounded-full bg-emerald-700/20" />
                  <div className="mb-1 h-3 w-full rounded-full bg-emerald-700/20" />
                  <div className="h-3 w-2/3 rounded-full bg-emerald-700/20" />
                </div>
              ))
            )}
          </div>

          {/* Bottom Accent Line */}
          <div className="mt-8 flex items-center gap-3">
            <div className="h-1 w-12 rounded-full bg-gradient-to-r from-[#f7c82d] to-[#d71920]" />
            <div className="h-1 w-2 rounded-full bg-[#f7c82d]" />
            <p className="text-xs uppercase tracking-widest text-[#f7c82d]/80 font-bold">
              Hot & Fresh Every Day
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}