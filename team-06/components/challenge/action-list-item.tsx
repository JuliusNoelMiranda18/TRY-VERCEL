"use client";

import { ChildAction } from "@/lib/constants/challenges";

interface Props {
  action: ChildAction;
  index: number;
  onToggleStatus: (id: string) => void;
}

export function ActionListItem({ action, index, onToggleStatus }: Props) {
  const isCompleted = action.status === "completed";

  return (
    <div
      onClick={() => onToggleStatus(action.id)}
      className={`p-3.5 sm:p-4 rounded-2xl border-2 border-[#4A3B2C] shadow-[0_3px_0_#4A3B2C] flex items-center justify-between gap-3.5 transition-all duration-150 cursor-pointer hover:translate-y-[-1px] active:translate-y-[2px] active:shadow-[0_1px_0_#4A3B2C] flex-1 min-h-[74px] ${
        isCompleted
          ? "bg-[#D0E6FD] opacity-80"
          : "bg-[#E8DAC4]"
      }`}
    >
      {/* Left: Numbered Badge & Info */}
      <div className="flex items-center gap-3.5 min-w-0">
        {/* Number Badge */}
        <div className="w-8 h-8 rounded-xl bg-white border-2 border-[#4A3B2C] shadow-[0_2px_0_#4A3B2C] flex items-center justify-center font-black text-sm text-[#162660] shrink-0">
          {index + 1}
        </div>

        {/* Title & Category */}
        <div className="flex flex-col min-w-0">
          <span className={`text-sm font-black text-[#162660] leading-snug truncate ${
            isCompleted ? "line-through decoration-2 decoration-[#162660]/80 opacity-70" : ""
          }`}>
            {action.title}
          </span>
          <span className="text-[9px] font-black uppercase tracking-wider text-[#4A3B2C]/70 mt-0.5">
            {action.category}
          </span>
        </div>
      </div>

      {/* Right: Earned Minutes & Checkmark Pill */}
      <div className="flex items-center gap-2.5 shrink-0">
        <span className="px-2.5 py-1 rounded-full bg-white border-2 border-[#4A3B2C] text-[10px] font-black text-[#162660]">
          +{action.earnedMinutes}m
        </span>

        {/* Completion Checkmark */}
        <div className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-colors ${
          isCompleted
            ? "bg-[#162660] border-[#162660] text-[#F1E4D1]"
            : "bg-white border-[#4A3B2C]/40 text-transparent hover:border-[#162660]"
        }`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
