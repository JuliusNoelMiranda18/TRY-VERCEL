"use client";

import { useState } from "react";
import { ChildAnalytics } from "@/lib/constants/analytics";
import { ChildProfileForm } from "./child-profile-form";

interface Props {
  child: ChildAnalytics;
  onSave: (updated: ChildAnalytics) => void;
}

const FOCUS_COLORS: Record<string, string> = {
  "Emotional Regulation": "bg-[#D0E6FD] text-[#162660] border-[#162660]",
  "Homework & Academic Focus": "bg-[#E8DAC4] text-[#162660] border-[#4A3B2C]",
  "Sharing & Social Skills": "bg-[#D0E6FD] text-[#162660] border-[#162660]",
  "Friendship & Peer Relationships": "bg-[#E8DAC4] text-[#162660] border-[#4A3B2C]",
  "Handling Frustration / Losing": "bg-[#D0E6FD] text-[#162660] border-[#162660]",
  "Following Routines & Instructions": "bg-[#E8DAC4] text-[#162660] border-[#4A3B2C]",
  "Physical Activity Habits": "bg-[#D0E6FD] text-[#162660] border-[#162660]",
  "Screen Time Balance": "bg-[#E8DAC4] text-[#162660] border-[#4A3B2C]",
};

export function ChildProfileCard({ child, onSave }: Props) {
  const [showForm, setShowForm] = useState(false);

  const focusAreas = child.profile.focusAreas || [];
  const visibleFocus = focusAreas.slice(0, 2);
  const extraFocusCount = focusAreas.length > 2 ? focusAreas.length - 2 : 0;
  const totalTasksDone = (child.actions?.done || 0) + (child.challenges?.done || 0);

  return (
    <>
      {/* ── ID Badge Card Design ── */}
      <div className="aralkada-card p-5 flex flex-col items-center text-center justify-between h-full relative hover:translate-y-[-2px] transition-transform duration-200 group bg-white shadow-[0_5px_0_#4A3B2C]">
        
        {/* Top Header: ID Badge Tag & Edit Button */}
        <div className="w-full flex items-center justify-between pb-2 border-b border-[#4A3B2C]/15">
          <span className="px-2.5 py-0.5 rounded-full bg-[#E8DAC4] border border-[#4A3B2C]/40 text-[9px] font-black uppercase tracking-widest text-[#162660]">
            Child ID · {child.childId.toUpperCase()}
          </span>

          {/* Edit Button */}
          <button
            onClick={() => setShowForm(true)}
            className="w-7 h-7 rounded-xl bg-[#F1E4D1] border-2 border-[#4A3B2C] shadow-[0_2px_0_#4A3B2C] flex items-center justify-center hover:bg-[#E6D4BA] transition-all active:translate-y-[2px] active:shadow-none cursor-pointer"
            aria-label={`Edit ${child.childName}'s profile`}
            title="Edit Profile"
          >
            <svg className="w-3.5 h-3.5 text-[#162660]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
              />
            </svg>
          </button>
        </div>

        {/* ── Center: Person Icon ID Portrait ── */}
        <div className="flex flex-col items-center my-3">
          <div className="w-16 h-16 rounded-2xl bg-[#D0E6FD] border-3 border-[#162660] shadow-[0_4px_0_#162660] flex items-center justify-center transition-transform group-hover:scale-105">
            {/* Person Face/Avatar Icon */}
            <svg
              className="w-9 h-9 text-[#162660]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 2a5 5 0 100 10 5 5 0 000-10zm-7 18a7 7 0 0114 0H5z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Child Name & Details Below Portrait */}
          <h3 className="text-base sm:text-lg font-black text-[#162660] mt-2.5 leading-tight tracking-tight">
            {child.childName}
          </h3>
          <span className="text-[11px] font-extrabold text-[#162660]/60 mt-0.5">
            Age {child.profile.age} · {child.profile.grade}
          </span>
          <p className="text-xs italic font-bold text-[#4A3B2C]/75 mt-1 line-clamp-1 max-w-[200px]">
            &quot;{child.profile.personality}&quot;
          </p>
        </div>

        {/* ── Focus Areas Pills ── */}
        <div className="w-full flex flex-wrap gap-1.5 justify-center items-center my-1.5">
          {visibleFocus.map((area) => (
            <span
              key={area}
              className={`text-[9px] font-black border-2 rounded-full px-2.5 py-0.5 uppercase tracking-wide truncate max-w-[150px] ${
                FOCUS_COLORS[area] ?? "bg-[#D0E6FD] text-[#162660] border-[#162660]"
              }`}
            >
              {area}
            </span>
          ))}
          {extraFocusCount > 0 && (
            <span
              className="text-[9px] font-black bg-[#E8DAC4] text-[#162660] border-2 border-[#4A3B2C] rounded-full px-2 py-0.5"
              title={`${extraFocusCount} more focus areas`}
            >
              +{extraFocusCount}
            </span>
          )}
        </div>

        {/* ── Stats Row: Time Left & Tasks Done ── */}
        <div className="w-full border-t-2 border-dashed border-[#4A3B2C]/20 pt-2.5 mt-2">
          <div className="grid grid-cols-2 gap-2 w-full">
            {/* Time Left */}
            <div className="flex flex-col items-center justify-center bg-[#E8DAC4] border-2 border-[#4A3B2C] rounded-xl py-1.5 px-2 shadow-[0_2px_0_#4A3B2C]">
              <span className="text-sm font-black text-[#162660] leading-none">
                {child.tokens.remainingHours}h
              </span>
              <span className="text-[8px] font-black text-[#162660]/70 uppercase tracking-wider mt-1">
                Time Left
              </span>
            </div>

            {/* Tasks Done */}
            <div className="flex flex-col items-center justify-center bg-[#D0E6FD] border-2 border-[#162660] rounded-xl py-1.5 px-2 shadow-[0_2px_0_#162660]">
              <span className="text-sm font-black text-[#162660] leading-none">
                {totalTasksDone}
              </span>
              <span className="text-[8px] font-black text-[#162660]/70 uppercase tracking-wider mt-1">
                Tasks Done
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit modal */}
      {showForm && (
        <ChildProfileForm
          child={child}
          onSave={(updated) => {
            onSave(updated);
            setShowForm(false);
          }}
          onClose={() => setShowForm(false)}
        />
      )}
    </>
  );
}
