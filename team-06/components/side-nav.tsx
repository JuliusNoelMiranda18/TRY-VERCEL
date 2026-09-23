"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SideNav() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    {
      label: "Dashboard",
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
    <aside
      className={`h-full bg-[#F1E4D1] border-r-2 border-[#4A3B2C]/25 flex flex-col justify-between transition-all duration-300 ease-in-out shrink-0 z-40 overflow-y-auto ${
        isCollapsed ? "w-16 sm:w-20 px-2 py-4 items-center" : "w-60 sm:w-64 p-4"
      }`}
    >
      {/* Top Section: Header Controls + Brand + Nav Items */}
      <div className="flex flex-col gap-6 w-full items-center">
        
        {/* ── HEADER AREA: Toggle Button First, Logo Beside It ── */}
        {isCollapsed ? (
          /* Collapsed Mode: Toggle button on top, Logo emblem stacked cleanly below */
          <div className="flex flex-col items-center gap-3 w-full">
            {/* 1. Collapse toggle button FIRST */}
            <button
              type="button"
              onClick={() => setIsCollapsed(false)}
              className="p-2 rounded-xl bg-[#E8DAC4] border-2 border-[#4A3B2C] shadow-[0_2px_0_#4A3B2C] text-[#162660] hover:bg-[#DDD0B8] transition-colors cursor-pointer shrink-0"
              title="Expand side menu"
            >
              <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>

            {/* 2. Logo Emblem below */}
            <Link href="/dashboard" className="cursor-pointer group" title="Kith.ai">
              <div className="w-9 h-9 rounded-xl bg-[#162660] flex items-center justify-center text-[#F1E4D1] font-black text-lg border-2 border-[#4A3B2C] shadow-[0_2px_0_#4A3B2C] transform -rotate-2 group-hover:rotate-0 transition-transform">
                K
              </div>
            </Link>
          </div>
        ) : (
          /* Expanded Mode: Nav Button FIRST, Logo beside it */
          <div className="flex items-center gap-2.5 w-full min-w-0 justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              {/* 1. Nav button FIRST */}
              <button
                type="button"
                onClick={() => setIsCollapsed(true)}
                className="p-1.5 rounded-xl bg-[#E8DAC4] border-2 border-[#4A3B2C] shadow-[0_2px_0_#4A3B2C] text-[#162660] hover:bg-[#DDD0B8] transition-colors cursor-pointer shrink-0"
                title="Collapse side menu"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>

              {/* 2. Logo beside it */}
              <Link href="/dashboard" className="flex items-center gap-2.5 overflow-hidden group min-w-0">
                <div className="w-8 h-8 rounded-xl bg-[#162660] flex items-center justify-center text-[#F1E4D1] font-black text-lg border-2 border-[#4A3B2C] shadow-[0_2px_0_#4A3B2C] shrink-0 transform -rotate-2 group-hover:rotate-0 transition-transform">
                  K
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-extrabold text-sm tracking-tight text-[#162660] leading-none truncate">
                    KITH.AI
                  </span>
                  <span className="text-[8px] font-bold tracking-wider text-[#162660]/60 uppercase mt-0.5 truncate">
                    Resilience Building
                  </span>
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* ── NAV ITEMS LIST ── */}
        <nav className="flex flex-col gap-2 w-full">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all ${
                  isActive
                    ? "bg-[#D0E6FD] text-[#162660] border-2 border-[#4A3B2C] shadow-[0_3px_0_#4A3B2C]"
                    : "text-[#162660]/70 hover:text-[#162660] hover:bg-[#E8DAC4]/60"
                } ${
                  isCollapsed
                    ? "justify-center p-3 w-10 h-10 mx-auto"
                    : "px-3.5 py-3 w-full"
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                {item.icon}
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ── BOTTOM SECTION: Profile + Logout ── */}
      <div className="border-t-2 border-[#4A3B2C]/15 pt-3 flex flex-col gap-2.5 w-full items-center">
        {isCollapsed ? (
          <>
            {/* Collapsed Parent Icon */}
            <div
              className="w-10 h-10 rounded-xl bg-[#D0E6FD] border-2 border-[#4A3B2C] shadow-[0_2px_0_#4A3B2C] flex items-center justify-center font-black text-xs text-[#162660] cursor-pointer"
              title="Parent Profile"
            >
              P
            </div>

            {/* Collapsed Logout Icon Button */}
            <Link
              href="/login"
              className="w-10 h-10 rounded-xl bg-white text-[#162660] border-2 border-[#4A3B2C] shadow-[0_2px_0_#4A3B2C] hover:bg-[#F1E4D1] flex items-center justify-center transition-all"
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
            </Link>
          </>
        ) : (
          <>
            {/* Expanded Parent Badge */}
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#D0E6FD] border-2 border-[#4A3B2C] shadow-[0_2px_0_#4A3B2C] w-full">
              <div className="w-6 h-6 rounded-lg bg-[#162660] text-[#F1E4D1] text-xs font-black flex items-center justify-center shrink-0">
                P
              </div>
              <span className="text-xs font-black text-[#162660] truncate">Parent</span>
            </div>

            {/* Expanded Logout Button */}
            <Link
              href="/login"
              className="flex items-center gap-2.5 justify-center px-3 py-2.5 rounded-xl bg-white text-[#162660] border-2 border-[#4A3B2C] shadow-[0_2px_0_#4A3B2C] hover:bg-[#F1E4D1] text-xs font-black uppercase tracking-wider transition-all w-full"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Logout</span>
            </Link>
          </>
        )}
      </div>
    </aside>
  );
}
