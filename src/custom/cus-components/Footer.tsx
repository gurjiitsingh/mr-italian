"use client";
import Link from "next/link";
import React from "react";
import { useLanguage } from "@/store/LanguageContext";
import { Cinzel, Lato, Roboto, Abel } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "600", "700"] });
const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });
const abel = Abel({ subsets: ["latin"], weight: "400" });
const fonts = {
  Cinzel: cinzel,
  Abel: abel,
  Lato: lato,
  Roboto: roboto,
};

const fontTitle =
  fonts[process.env.NEXT_PUBLIC_FONT_TITLE as keyof typeof fonts] || cinzel;
const fontDescription =
  fonts[process.env.NEXT_PUBLIC_FONT_DESCRIPTION as keyof typeof fonts] || lato;
const fontPrice =
  fonts[process.env.NEXT_PUBLIC_FONT_PRICE as keyof typeof fonts] || roboto;

type FooterLink = { href: string; name: string };

type Props = {
  outlet?: any;
};

export default function Footer({ outlet }: Props) {
  const { TEXT, BRANDING } = useLanguage();

  const fallbackBrand = {
    brand_name: outlet?.outletName || BRANDING?.brand_name || "Mr. Italian",
    poweredBy: BRANDING?.poweredBy || "Powered by",
    poweredByUrl:
      BRANDING?.poweredByUrl || "https://www.gstadeveloper.com",
    copyright: {
      prefix: BRANDING?.copyright?.prefix || "Copyright ©",
      suffix:
        BRANDING?.copyright?.suffix || "All Rights Reserved by",
      company:
        outlet?.outletName ||
        BRANDING?.copyright?.company ||
        "Mr. Italian Restaurant",
    },
  };

  const fallbackText = {
    logo_alt: TEXT?.logo_alt || "Restaurant Logo",
    sections: {
      links: {
        title: BRANDING?.sections?.links?.title || "Quick Links",
        items: BRANDING?.sections?.links?.items || [
          { name: "Home", href: "/" },
          { name: "Menu", href: "/menu" },
          { name: "About Us", href: "/about" },
          { name: "Contact", href: "/contact" },
          { name: "Table Reservation", href: "/reservation" },
          { name: "Allergens", href: "/allergene" },
        ],
      },
      company: {
        title: BRANDING?.sections?.company?.title || "Company",
        items: BRANDING?.sections?.company?.items || [
          { name: "Privacy Policy", href: "/privacy" },
          { name: "Terms of Service", href: "#" },
        ],
      },
      social: {
        title: BRANDING?.sections?.social?.title || "Follow Us",
      },
    },
  };

  const companyName =
    outlet?.web
      ? new URL(
          outlet.web.startsWith("http")
            ? outlet.web
            : `https://${outlet.web}`
        ).hostname
      : outlet?.outletName || fallbackBrand.brand_name;

  return (
    <footer className="relative overflow-hidden border-t border-[#f7c82d]/25 bg-[#091a13] pt-14 text-white selection:bg-[#f7c82d] selection:text-black">
      {/* Background ambient lighting matching the hero palette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#123728_0%,_#091a13_70%,_#040d09_100%)] opacity-95" />
      <div className="pointer-events-none absolute -left-28 -top-28 h-80 w-80 rounded-full bg-[#f7c82d]/10 blur-[110px]" />
      <div className="pointer-events-none absolute -right-28 bottom-0 h-80 w-80 rounded-full bg-[#d71920]/15 blur-[110px]" />

      {/* Decorative Gold Filigree Corner Accents */}
      <div className="pointer-events-none absolute left-4 top-4 h-12 w-12 border-l-2 border-t-2 border-[#f7c82d]/30" />
      <div className="pointer-events-none absolute right-4 top-4 h-12 w-12 border-r-2 border-t-2 border-[#f7c82d]/30" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Logo & Brand Card */}
          <div className="flex flex-col items-start gap-4">
            <div className="flex flex-col items-start rounded-2xl border border-[#f7c82d]/25 bg-[#06140e]/70 p-4 backdrop-blur-md shadow-lg w-full max-w-[280px]">
              <Link href="/" className="inline-block transition-transform duration-300 hover:scale-105">
                <img
                  className="h-20 w-auto object-contain drop-shadow-[0_2px_10px_rgba(247,200,45,0.2)]"
                  src={outlet?.logo || "/logo.png"}
                  alt={fallbackText.logo_alt}
                />
              </Link>
              <span className={`${fontPrice.className} mt-3 text-base font-extrabold tracking-wide text-[#f7c82d]`}>
                {fallbackBrand.brand_name}
              </span>
              <p className="mt-1 text-xs text-emerald-100/70">
                Indian • Chinese • Tandoor • Pizza & Coffee Bar
              </p>
            </div>
          </div>

          {/* Links Section */}
          <div className="flex flex-col">
            <h3 className={`${fontTitle.className} mb-4 text-base font-bold uppercase tracking-wider text-[#f7c82d]`}>
              {fallbackText.sections.links.title}
            </h3>
            <ul className="flex flex-col space-y-2">
              {fallbackText.sections.links.items.map((item: FooterLink, idx: number) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className={`${fontDescription.className} text-sm text-stone-200 transition-colors duration-200 hover:text-[#f7c82d] hover:translate-x-1 inline-block`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Section */}
          <div className="flex flex-col">
            <h3 className={`${fontTitle.className} mb-4 text-base font-bold uppercase tracking-wider text-[#f7c82d]`}>
              {fallbackText.sections.company.title}
            </h3>
            <ul className="flex flex-col space-y-2">
              {fallbackText.sections.company.items.map((item: FooterLink, idx: number) => (
                <li key={idx}>
                  <a
                    rel="noopener noreferrer"
                    href={item.href}
                    className={`${fontDescription.className} text-sm text-stone-200 transition-colors duration-200 hover:text-[#f7c82d] hover:translate-x-1 inline-block`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media & Delivery Badge */}
          <div className="flex flex-col">
            <h3 className={`${fontTitle.className} mb-4 text-base font-bold uppercase tracking-wider text-[#f7c82d]`}>
              {fallbackText.sections.social.title}
            </h3>
            <div className="flex items-center space-x-3">
              {/* Social icons can be mounted here */}
              <div className="rounded-xl border border-[#f7c82d]/30 bg-[#102d21] p-2.5 text-xs text-emerald-200 shadow-sm">
                Follow our daily specials & deals
              </div>
            </div>

            {/* Quick Delivery Callout */}
            <div className="mt-6 rounded-2xl border border-[#d71920]/40 bg-gradient-to-r from-[#d71920]/25 to-transparent p-3 backdrop-blur-sm">
              <p className="text-xs font-bold text-white uppercase tracking-wide">Free Home Delivery</p>
              <p className="text-[11px] text-red-200 mt-0.5">Min Order ₹400 within 3 Km.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="mt-12 border-t border-[#f7c82d]/15 bg-[#050e0a] py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-center text-xs text-emerald-100/60 sm:flex-row sm:px-6 lg:px-12 sm:text-left">
          <p>
            {fallbackBrand.poweredBy}{" "}
            <a
              href={fallbackBrand.poweredByUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#f7c82d] hover:underline"
            >
              {new URL(fallbackBrand.poweredByUrl).hostname}
            </a>
          </p>

          <p>
            {fallbackBrand.copyright.prefix} {new Date().getFullYear()}{" "}
            {fallbackBrand.copyright.suffix}{" "}
            <b className="font-semibold text-white">{companyName}</b>
          </p>
        </div>
      </div>
    </footer>
  );
}