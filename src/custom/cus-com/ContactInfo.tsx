"use client";

import { FaMapMarkedAlt, FaPhoneAlt, FaEnvelope, FaCalendarAlt } from "react-icons/fa";

export default function ContactInfo({ outlet, schedule }: any) {
  if (!outlet) return null;

  return (
    <section className="relative overflow-hidden border-t border-[#f7c82d]/20 bg-[#0c241b] px-6 py-16 text-white selection:bg-[#f7c82d] selection:text-black md:py-24">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#194d38_0%,_#0c241b_65%,_#06140e_100%)] opacity-90" />
      <div className="pointer-events-none absolute -left-20 bottom-10 h-80 w-80 rounded-full bg-[#f7c82d]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 top-10 h-80 w-80 rounded-full bg-[#d71920]/15 blur-[120px]" />

      {/* Signature Gold Corner Accents */}
      <div className="pointer-events-none absolute left-4 top-4 h-12 w-12 border-l-2 border-t-2 border-[#f7c82d]/40" />
      <div className="pointer-events-none absolute right-4 top-4 h-12 w-12 border-r-2 border-t-2 border-[#f7c82d]/40" />
      <div className="pointer-events-none absolute bottom-4 left-4 h-12 w-12 border-b-2 border-l-2 border-[#f7c82d]/40" />
      <div className="pointer-events-none absolute bottom-4 right-4 h-12 w-12 border-b-2 border-r-2 border-[#f7c82d]/40" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-14 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#f7c82d]/30 bg-[#163a2c] px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#f7c82d]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#f7c82d]" />
            Get In Touch
          </div>
          <h2 className="font-serif text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Location &{" "}
            <span className="text-[#f7c82d] drop-shadow-[0_2px_10px_rgba(247,200,45,0.3)]">
              Store Details
            </span>
          </h2>
          <p className="mt-2 text-sm text-emerald-100/80">
            Dine-in, takeaway, or call us for free home delivery
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 text-center">
          
          {/* Address */}
          <div className="group relative flex flex-col items-center rounded-2xl border border-[#f7c82d]/25 bg-[#091f17]/90 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#f7c82d]/60 hover:shadow-[0_0_25px_rgba(247,200,45,0.2)]">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#f7c82d]/40 bg-[#f7c82d] text-black shadow-md transition-transform duration-300 group-hover:scale-105">
              <FaMapMarkedAlt className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-serif text-sm font-bold uppercase tracking-wider text-[#f7c82d]">
              Address
            </h3>
            <div className="space-y-0.5 text-xs text-stone-200">
              {outlet.outletName && (
                <p className="font-semibold text-white">{outlet.outletName}</p>
              )}
              <p>{outlet.addressLine1}</p>
              {outlet.addressLine2 && (
                <p className="text-emerald-100/70">{outlet.addressLine2}</p>
              )}
              <p className="text-emerald-100/70">{outlet.city}</p>
            </div>
          </div>

          {/* Phone */}
          <div className="group relative flex flex-col items-center rounded-2xl border border-[#f7c82d]/25 bg-[#091f17]/90 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#f7c82d]/60 hover:shadow-[0_0_25px_rgba(247,200,45,0.2)]">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#f7c82d]/40 bg-[#f7c82d] text-black shadow-md transition-transform duration-300 group-hover:scale-105">
              <FaPhoneAlt className="h-5 w-5" />
            </div>
            <h3 className="mb-2 font-serif text-sm font-bold uppercase tracking-wider text-[#f7c82d]">
              Phone
            </h3>
            <div className="space-y-1 text-xs text-stone-200">
              {outlet.phone ? (
                <a
                  href={`tel:${outlet.phone}`}
                  className="block transition hover:text-[#f7c82d]"
                >
                  {outlet.phone}
                </a>
              ) : (
                <p>-</p>
              )}
              {outlet.phone2 && (
                <a
                  href={`tel:${outlet.phone2}`}
                  className="block text-emerald-100/80 transition hover:text-[#f7c82d]"
                >
                  {outlet.phone2}
                </a>
              )}
            </div>
          </div>

          {/* E-Mail */}
          <div className="group relative flex flex-col items-center rounded-2xl border border-[#f7c82d]/25 bg-[#091f17]/90 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#f7c82d]/60 hover:shadow-[0_0_25px_rgba(247,200,45,0.2)]">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#f7c82d]/40 bg-[#f7c82d] text-black shadow-md transition-transform duration-300 group-hover:scale-105">
              <FaEnvelope className="h-5 w-5" />
            </div>
            <h3 className="mb-2 font-serif text-sm font-bold uppercase tracking-wider text-[#f7c82d]">
              E-Mail
            </h3>
            <div className="text-xs text-stone-200">
              {outlet.email ? (
                <a
                  href={`mailto:${outlet.email}`}
                  className="break-all transition hover:text-[#f7c82d]"
                >
                  {outlet.email}
                </a>
              ) : (
                <p>-</p>
              )}
            </div>
          </div>

          {/* Timing */}
          <div className="group relative flex flex-col items-center rounded-2xl border border-[#f7c82d]/25 bg-[#091f17]/90 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#f7c82d]/60 hover:shadow-[0_0_25px_rgba(247,200,45,0.2)]">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#f7c82d]/40 bg-[#f7c82d] text-black shadow-md transition-transform duration-300 group-hover:scale-105">
              <FaCalendarAlt className="h-5 w-5" />
            </div>
            <h3 className="mb-2 font-serif text-sm font-bold uppercase tracking-wider text-[#f7c82d]">
              Timing
            </h3>

            <div className="max-h-36 w-full space-y-1.5 overflow-y-auto pr-1 text-xs text-stone-200">
              {schedule && schedule.length > 0 ? (
                schedule.map((line: string, i: number) => {
                  const isClosed = line.toLowerCase().includes("closed");
                  return (
                    <p
                      key={i}
                      className={
                        isClosed ? "font-semibold text-[#d71920]" : "text-emerald-100/90"
                      }
                    >
                      {line}
                    </p>
                  );
                })
              ) : (
                <p className="text-emerald-100/60">No schedule available</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}