"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Dashboard",
      shortLabel: "Home",
      href: "/dashboard",
      icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.2"
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      ),
    },
    {
      label: "Challenge & Action",
      shortLabel: "Challenges",
      href: "/challenge",
      icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" strokeWidth="2.2" />
          <circle cx="12" cy="12" r="6" strokeWidth="2.2" />
          <circle cx="12" cy="12" r="2" strokeWidth="2.2" />
        </svg>
      ),
    },
    {
      label: "Chatbot",
      shortLabel: "Coach",
      href: "/chatbot",
      icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.2"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      ),
    },
    {
      label: "Settings",
      shortLabel: "Settings",
      href: "/settings",
      icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full bg-[#F1E4D1] border-t-2 border-[#4A3B2C]/25 shrink-0 z-50 px-2 sm:px-6 py-2 shadow-[0_-4px_12px_rgba(74,59,44,0.08)]">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-1 sm:gap-4">
        
        {/* Brand Logo / Emblem */}
        <Link
          href="/dashboard"
          className="flex items-center gap-2 group shrink-0"
          title="Kith.ai"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#162660] flex items-center justify-center text-[#F1E4D1] font-black text-lg border-2 border-[#4A3B2C] shadow-[0_2px_0_#4A3B2C] transform -rotate-2 group-hover:rotate-0 transition-transform">
            K
          </div>
          <div className="hidden lg:flex flex-col min-w-0">
            <span className="font-extrabold text-sm tracking-tight text-[#162660] leading-none">
              KITH.AI
            </span>
            <span className="text-[8px] font-bold tracking-wider text-[#162660]/60 uppercase mt-0.5">
              Resilience Building
            </span>
          </div>
        </Link>

        {/* Navigation Items */}
        <div className="flex items-center justify-around sm:justify-center gap-1 sm:gap-2 md:gap-3 flex-1 sm:flex-initial">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-2 rounded-xl sm:rounded-2xl font-black text-xs uppercase tracking-wider transition-all ${
                  isActive
                    ? "bg-[#D0E6FD] text-[#162660] border-2 border-[#4A3B2C] shadow-[0_3px_0_#4A3B2C]"
                    : "text-[#162660]/70 hover:text-[#162660] hover:bg-[#E8DAC4]/60"
                } p-2.5 sm:px-3.5 sm:py-2.5`}
                title={item.label}
              >
                {item.icon}
                <span className="hidden md:inline">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Right Section: Parent Profile + Logout */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Parent Badge */}
          <div
            className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-xl bg-[#D0E6FD] border-2 border-[#4A3B2C] shadow-[0_2px_0_#4A3B2C]"
            title="Parent Profile"
          >
            <div className="w-5 h-5 rounded-lg bg-[#162660] text-[#F1E4D1] text-[10px] font-black flex items-center justify-center shrink-0">
              P
            </div>
            <span className="hidden sm:inline text-xs font-black text-[#162660]">Parent</span>
          </div>

          {/* Logout Button */}
          <Link
            href="/login"
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white text-[#162660] border-2 border-[#4A3B2C] shadow-[0_2px_0_#4A3B2C] hover:bg-[#F1E4D1] text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0"
            title="Logout"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="hidden md:inline">Logout</span>
          </Link>
        </div>

      </div>
    </nav>
  );
}
