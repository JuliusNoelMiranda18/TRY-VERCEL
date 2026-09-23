"use client";

import { useState } from "react";
import { ChildChallenge } from "@/lib/constants/challenges";

interface Props {
  challenge: ChildChallenge;
  onToggleStatus: (id: string) => void;
}

export function ChallengeCard({ challenge, onToggleStatus }: Props) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const isDone = challenge.status === "done";

  return (
    <>
      {/* ── Image 1 Style Squarish Card Tile ── */}
      <div
        onClick={() => setIsDetailOpen(true)}
        className={`aralkada-card p-4 flex flex-col justify-between h-full min-h-[175px] transition-all duration-200 hover:translate-y-[-2px] hover:shadow-[0_6px_0_#4A3B2C] cursor-pointer group ${
          isDone ? "opacity-75 bg-[#F8F1E5]" : "bg-[#F1E4D1]"
        }`}
      >
        {/* Top bar: Status Pill / Minutes */}
        <div className="flex items-center justify-between w-full">
          <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${
            isDone
              ? "bg-[#D0E6FD] text-[#162660] border-[#162660]"
              : "bg-white text-[#162660] border-[#4A3B2C]/30"
          }`}>
            {isDone ? "✓ Done" : "Active"}
          </span>

          <span className="text-[10px] font-black text-[#162660] bg-white px-2 py-0.5 rounded-full border border-[#4A3B2C]/30 shadow-xs">
            +{challenge.earnedMinutes}m
          </span>
        </div>

        {/* Center: Document / Challenge Graphic Emblem (Image 1 Style) */}
        <div className="flex items-center justify-center my-2">
          <div className="w-14 h-14 rounded-2xl bg-white border-2 border-[#4A3B2C] shadow-[0_3px_0_#4A3B2C] flex items-center justify-center group-hover:scale-105 transition-transform">
            <svg className="w-7 h-7 text-[#162660]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>

        {/* Bottom bar: Title, Focus Tag, and 3-dots Button (Image 1 Style) */}
        <div className="flex items-end justify-between gap-2 w-full pt-2 border-t border-[#4A3B2C]/15">
          <div className="flex flex-col min-w-0 flex-1">
            <h3 className={`text-xs sm:text-sm font-black text-[#162660] leading-snug truncate ${
              isDone ? "line-through opacity-70" : ""
            }`}>
              {challenge.title}
            </h3>
            <span className="text-[9px] font-bold text-[#4A3B2C]/70 truncate mt-0.5">
              {challenge.targetFocusArea}
            </span>
          </div>

          {/* 3-dots Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsDetailOpen(true);
            }}
            className="w-7 h-7 rounded-xl bg-white border-2 border-[#4A3B2C] shadow-[0_2px_0_#4A3B2C] flex items-center justify-center text-xs font-black text-[#162660] hover:bg-[#E8DAC4] transition-colors shrink-0 cursor-pointer"
            title="View challenge details"
          >
            •••
          </button>
        </div>
      </div>

      {/* ── Expand Details Modal ── */}
      {isDetailOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setIsDetailOpen(false); }}
        >
          <div className="aralkada-card w-full max-w-md p-6 flex flex-col gap-4 shadow-[0_8px_0_#4A3B2C] animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#4A3B2C]/15">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#D0E6FD] border-2 border-[#162660] shadow-[0_2px_0_#162660] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-[#162660]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-base font-black text-[#162660] leading-none">Challenge Details</h2>
                  <span className="text-[10px] font-bold text-[#162660]/60 mt-0.5 block">
                    {challenge.category} Challenge
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsDetailOpen(false)}
                className="w-8 h-8 rounded-xl bg-[#F1E4D1] border-2 border-[#4A3B2C] flex items-center justify-center hover:bg-[#E6D4BA] cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Title, Badges & Description */}
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-[#D0E6FD] border border-[#162660] text-[9px] font-black text-[#162660] uppercase tracking-wider">
                  +{challenge.earnedMinutes}m Screen Time
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#E8DAC4] border border-[#4A3B2C] text-[9px] font-black text-[#162660] uppercase tracking-wide">
                  {challenge.targetFocusArea}
                </span>
              </div>

              <h3 className="text-lg font-black text-[#162660] tracking-tight mt-1">
                {challenge.title}
              </h3>
              <p className="text-xs font-bold text-[#4A3B2C]/80 mt-1 leading-relaxed">
                {challenge.description}
              </p>
            </div>

            {/* Goals to Achieve Checklist */}
            {challenge.milestones && challenge.milestones.length > 0 && (
              <div className="bg-[#F8F1E5] border-2 border-[#4A3B2C]/20 rounded-2xl p-3.5 flex flex-col gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#162660]/70">
                  Goals to Achieve:
                </span>
                <ul className="flex flex-col gap-1.5">
                  {challenge.milestones.map((m, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs font-bold text-[#162660]">
                      <span className="w-4 h-4 rounded-md bg-white border border-[#4A3B2C]/30 flex items-center justify-center text-[10px] font-black text-[#162660] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-snug">{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex gap-3 pt-2 border-t-2 border-[#4A3B2C]/15 mt-1">
              <button
                type="button"
                onClick={() => setIsDetailOpen(false)}
                className="flex-1 py-2.5 aralkada-btn-outline text-xs cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  onToggleStatus(challenge.id);
                  setIsDetailOpen(false);
                }}
                className={`flex-1 py-2.5 text-xs cursor-pointer ${
                  isDone ? "aralkada-btn-secondary" : "aralkada-btn-primary"
                }`}
              >
                {isDone ? "Mark Incomplete" : "Mark Complete ✓"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
