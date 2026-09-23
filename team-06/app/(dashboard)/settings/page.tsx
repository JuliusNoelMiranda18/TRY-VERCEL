"use client";

import { useChildProfiles } from "@/lib/hooks/useChildProfiles";
import { ChildProfileCard } from "@/components/settings/child-profile-card";
import { RewardConfigPanel } from "@/components/settings/reward-config-panel";

export default function SettingsPage() {
  const { children, rewardConfig, updateChild, updateRewardConfig } = useChildProfiles();

  return (
    <div className="flex flex-col gap-5">
      {/* ── Page Header ── */}
      <div className="flex items-center justify-between pb-3 border-b-2 border-[#4A3B2C]/20">
        <div>
          <h1 className="text-2xl font-black text-[#162660] tracking-tight">Settings</h1>
        </div>
      </div>

      {/* ── Two-column layout (Equal Height) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left: Child Profile ID Cards */}
        <div className="lg:col-span-7 flex flex-col gap-3.5 h-full">
          <div className="flex items-center justify-between shrink-0">
            <p className="text-[10px] font-black text-[#162660]/60 uppercase tracking-widest">
              Linked Children
            </p>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#E8DAC4] border border-[#4A3B2C]/30 text-[#162660]">
              {children.length} profile{children.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* 2 ID Cards Side-by-Side in Equal Height Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 items-stretch">
            {children.map((child) => (
              <ChildProfileCard
                key={child.childId}
                child={child}
                onSave={updateChild}
              />
            ))}
          </div>
        </div>

        {/* Right: Reward Config Panel (Equal Height) */}
        <div className="lg:col-span-5 flex flex-col gap-3.5 h-full">
          <div className="flex items-center justify-between shrink-0">
            <p className="text-[10px] font-black text-[#162660]/60 uppercase tracking-widest">
              Reward Configuration
            </p>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#E8DAC4] border border-[#4A3B2C]/30 text-[#162660]">
              Global Rule
            </span>
          </div>

          <div className="flex-1 flex flex-col">
            <RewardConfigPanel config={rewardConfig} onChange={updateRewardConfig} />
          </div>
        </div>
      </div>
    </div>
  );
}
