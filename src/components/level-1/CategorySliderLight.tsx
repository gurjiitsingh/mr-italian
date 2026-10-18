"use client";

import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { UseSiteContext } from "@/SiteContext/SiteContext";
import { Lato, Poppins } from "next/font/google";

// Category type definition
export type CategoryType = {
  id: string;
  name: string;
  desc?: string;
  productDesc?: string;
  slug?: string;
  image?: string;
  isFeatured?: boolean | string;
  sortOrder?: number;
  disablePickupDiscount?: boolean;
};

export default function CategorySliderLight() {
  const [categoryData, setCategoryData] = useState<CategoryType[]>([]);
  const [displayCategory, setDisplayCategory] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    productCategoryIdG,
    setProductCategoryIdG,
    setDisablePickupCatDiscountIds,
    settings,
  } = UseSiteContext();

  // Handle displayCategory selection
  useEffect(() => {
    if (!productCategoryIdG) {
      setDisplayCategory(settings.display_category?.toString() ?? null);
    } else {
      setDisplayCategory(productCategoryIdG);
    }
  }, [settings, productCategoryIdG]);

  // Fetch categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/categories");
        const categories: CategoryType[] = await res.json();

        categories.sort((a, b) => Number(a.sortOrder ?? 0) - Number(b.sortOrder ?? 0));

        const featured = categories.filter(
          (category) => category.isFeatured !== "no"
        );
        setCategoryData(featured);

        const disablePickupCategoryIds = categories
          .filter((category) => category.disablePickupDiscount === true)
          .map((category) => category.id);

        setDisablePickupCatDiscountIds(disablePickupCategoryIds);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchData();
  }, []);

  // Scroll handler
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
    <div id="order_now" className="scroll-mt-24 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 my-8">
      {/* Scroll Arrows */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-1 sm:left-3 top-[48%] -translate-y-1/2 z-20 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-[#f7c82d]/40 bg-[#0c241b]/90 text-[#f7c82d] shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-[#f7c82d] hover:text-black hover:shadow-[0_0_20px_rgba(247,200,45,0.4)]"
        aria-label="Scroll Left"
      >
        <FaChevronLeft className="text-xs sm:text-sm" />
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-1 sm:right-3 top-[48%] -translate-y-1/2 z-20 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-[#f7c82d]/40 bg-[#0c241b]/90 text-[#f7c82d] shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-[#f7c82d] hover:text-black hover:shadow-[0_0_20px_rgba(247,200,45,0.4)]"
        aria-label="Scroll Right"
      >
        <FaChevronRight className="text-xs sm:text-sm" />
      </button>

      {/* Category scroll area */}
      <div
        ref={scrollRef}
        className="flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide justify-start px-1 py-2"
      >
        {categoryData.length > 0 ? (
          categoryData.map((category) => {
            const isActive = displayCategory === category.id;
            return (
              <div key={category.id} className="flex-shrink-0 snap-start">
                <button
                  onClick={() => setProductCategoryIdG(category.id)}
                  className={`group w-[120px] sm:w-[140px] h-[175px] rounded-2xl p-2.5 transition-all duration-300 ease-in-out flex flex-col items-center justify-start gap-3 backdrop-blur-md ${
                    isActive
                      ? "bg-gradient-to-b from-[#143d2c] to-[#0c241b] border-2 border-[#f7c82d] shadow-[0_0_25px_rgba(247,200,45,0.3)] scale-[1.03]"
                      : "bg-[#091f17]/90 border border-[#f7c82d]/25 hover:border-[#f7c82d]/60 hover:bg-[#103023] hover:shadow-[0_0_15px_rgba(247,200,45,0.15)]"
                  }`}
                >
                  <div
                    className={`w-full h-[100px] sm:h-[110px] relative rounded-xl overflow-hidden bg-emerald-950/60 border ${
                      isActive
                        ? "border-[#f7c82d] shadow-inner"
                        : "border-[#f7c82d]/20"
                    }`}
                  >
                    <img
                      src={category.image || "/com.jpg"}
                      alt={category.name || "Category"}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <span
                    className={`text-center text-[13px] sm:text-[14px] font-bold leading-snug font-serif tracking-wide transition-colors ${
                      isActive
                        ? "text-[#f7c82d] drop-shadow-[0_1px_8px_rgba(247,200,45,0.4)]"
                        : "text-stone-200 group-hover:text-[#f7c82d]"
                    }`}
                  >
                    {category.name}
                  </span>
                </button>
              </div>
            );
          })
        ) : (
          // Skeleton Loader
          [...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-[120px] sm:w-[140px] h-[175px] bg-[#091f17]/80 border border-[#f7c82d]/15 animate-pulse rounded-2xl flex-shrink-0 snap-start p-2.5 flex flex-col items-center gap-3"
            >
              <div className="w-full h-[100px] sm:h-[110px] rounded-xl bg-emerald-950/50" />
              <div className="w-3/4 h-3 rounded-full bg-[#f7c82d]/20 mt-1" />
            </div>
          ))
        )}
      </div>
    </div>
  );
}