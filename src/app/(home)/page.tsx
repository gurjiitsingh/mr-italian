// app/page.tsx

import { Suspense } from "react";
//import AOSInit from "@/components/AOSInit";

 
import BestOfMonth from "@/custom/slider/BestOfMonth";
import ContactInfoWrapper from "@/custom/cus-com/ContactInfoWrapper";
import ProductsWrapper from "@/components/ProductsWrapper";
import CategorySlider from "@/custom/slider/CategorySlider";
import HeroSectionCustom from "@/custom/cus-com/HeroSectionCustom";

export default function Page() {
  return (
   <main className="relative min-h-screen overflow-x-hidden bg-[#071611] font-sans text-emerald-50 selection:bg-[#f7c82d] selection:text-black">
  {/* Ambient Theme Background (Deep Forest Green to Dark Obsidian Mesh) */}
  <div className="pointer-events-none fixed inset-0 z-0">
    {/* Radial emerald glow centered at top */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(25,77,56,0.35),transparent)]" />
    
    {/* Deep emerald-to-obsidian gradient */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#0c241b] via-[#081812] to-[#040c09]" />

    {/* Ambient golden and crimson corner glows */}
    <div className="absolute top-[20%] -left-48 h-[600px] w-[600px] rounded-full bg-[#f7c82d]/[0.035] blur-[160px]" />
    <div className="absolute top-[50%] -right-48 h-[650px] w-[650px] rounded-full bg-[#d71920]/[0.04] blur-[170px]" />
    <div className="absolute bottom-[15%] left-1/3 h-[500px] w-[500px] rounded-full bg-[#194d38]/[0.15] blur-[150px]" />
  </div>

  {/* Page Sections Content Layer */}
  <div className="relative z-10">
    {/* ✅ Client-only animation init */}
    {/* <AOSInit /> */}

    {/* Sections */}
    <HeroSectionCustom />
    <BestOfMonth />
    <CategorySlider />

    <Suspense 
      fallback={
        <div className="flex h-52 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#f7c82d]/20 border-t-[#f7c82d]" />
        </div>
      }
    >
      <ProductsWrapper />
    </Suspense>

    {/* ✅ Server async component with streaming */}
    <Suspense 
      fallback={
        <div className="flex h-40 items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#f7c82d]/20 border-t-[#f7c82d]" />
        </div>
      }
    >
      <ContactInfoWrapper />
    </Suspense>
  </div>
</main>
  );
}