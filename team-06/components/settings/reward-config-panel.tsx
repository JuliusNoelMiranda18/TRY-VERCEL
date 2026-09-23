"use client";

import { RewardConfig } from "@/lib/constants/analytics";

interface Props {
  config: RewardConfig;
  onChange: (updated: RewardConfig) => void;
}

export function RewardConfigPanel({ config, onChange }: Props) {
  const isAI = config.mode === "ai";

  const handleSelect = (mode: "ai" | "custom") => {
    onChange({ ...config, mode });
  };

  return (
    <div className="aralkada-card p-5 flex flex-col justify-between h-full shadow-[0_5px_0_#4A3B2C]">
      {/* ── Header ── */}
      <div>
        <h2 className="text-lg font-black text-[#162660]">Screen Time &amp; Reward Mode</h2>
        <p className="text-xs font-bold text-[#162660]/60 mt-0.5">
          Select how screen time rewards and daily caps are calculated for all linked children.
        </p>
      </div>

      {/* ── Mode Options ── */}
      <div className="flex flex-col gap-3 my-auto py-2">
        {/* Option A Row */}
        <div
          onClick={() => handleSelect("ai")}
          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4 ${
            isAI
              ? "bg-[#D0E6FD] border-[#162660] shadow-[0_3px_0_#162660]"
              : "bg-white border-[#4A3B2C]/20 hover:border-[#162660]/40 hover:bg-[#F8F1E5]/50"
          }`}
        >
          {/* Button on the left */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleSelect("ai");
            }}
            className={`shrink-0 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              isAI
                ? "aralkada-btn-primary"
                : "aralkada-btn-outline"
            }`}
          >
            {isAI && (
              <svg className="w-3.5 h-3.5 text-[#F1E4D1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            )}
            Option A
          </button>

          {/* Description beside it */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-black text-[#162660]">
              AI-Generated Rates
            </h3>
            <p className="text-xs font-bold text-[#4A3B2C]/75 mt-1 leading-relaxed">
              Automatically scales daily screen time caps and task rewards based on your child&apos;s age, cognitive task difficulty, and official WHO/AAP health guidelines.
            </p>
          </div>
        </div>

        {/* Option B Row */}
        <div
          onClick={() => handleSelect("custom")}
          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4 ${
            !isAI
              ? "bg-[#D0E6FD] border-[#162660] shadow-[0_3px_0_#162660]"
              : "bg-white border-[#4A3B2C]/20 hover:border-[#162660]/40 hover:bg-[#F8F1E5]/50"
          }`}
        >
          {/* Button on the left */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleSelect("custom");
            }}
            className={`shrink-0 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              !isAI
                ? "aralkada-btn-primary"
                : "aralkada-btn-outline"
            }`}
          >
            {!isAI && (
              <svg className="w-3.5 h-3.5 text-[#F1E4D1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            )}
            Option B
          </button>

          {/* Description beside it */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-black text-[#162660]">
              Custom Rates
            </h3>
            <p className="text-xs font-bold text-[#4A3B2C]/75 mt-1 leading-relaxed">
              Gives parents complete manual control to set custom minute values per completed task, assign intrinsic free activities, and specify fixed daily screen time caps.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
