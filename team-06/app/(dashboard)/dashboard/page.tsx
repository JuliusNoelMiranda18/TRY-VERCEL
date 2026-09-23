"use client";

import { useState } from "react";
import Link from "next/link";
import { ChildDropdown } from "@/components/child-dropdown";
import { useChildProfiles, getAgeCap } from "@/lib/hooks/useChildProfiles";

/* ── Task that fires from the Parent Overview notification ── */
const OVERVIEW_TASK = {
  title: "Tidy Up Desk & Organize Backpack",
  category: "DAILY ROUTINE",
  earnedMinutes: 15,
  childName: "Leo",
};

export default function DashboardPage() {
  const { children, updateChild } = useChildProfiles();
  const [selectedChildId, setSelectedChildId] = useState(children[0]?.childId || "kid-101");
  const [showNotif, setShowNotif] = useState(false);
  const [approved, setApproved] = useState(false);

  const activeChild = children.find((c) => c.childId === selectedChildId) || children[0];
  const dailyCapMin = getAgeCap(activeChild?.profile?.age || 8);
  const dailyCapHours = (dailyCapMin / 60).toFixed(1);

  const usedPercentage = activeChild?.tokens?.earnedHours
    ? Math.min(
      100,
      Math.round((activeChild.tokens.usedHours / activeChild.tokens.earnedHours) * 100)
    )
    : 0;

  /* ── Approve handler ── */
  function handleApprove() {
    if (!activeChild || approved) return;
    const earnedExtra = OVERVIEW_TASK.earnedMinutes / 60; // convert mins → hrs
    const updated = {
      ...activeChild,
      actions: {
        ongoing: Math.max(0, (activeChild.actions?.ongoing ?? 1) - 1),
        done: (activeChild.actions?.done ?? 0) + 1,
      },
      tokens: {
        ...activeChild.tokens,
        earnedHours: Math.round((activeChild.tokens.earnedHours + earnedExtra) * 100) / 100,
        remainingHours: Math.round((activeChild.tokens.remainingHours + earnedExtra) * 100) / 100,
        totalTokens: (activeChild.tokens.totalTokens ?? 0) + OVERVIEW_TASK.earnedMinutes,
      },
    };
    updateChild(updated);
    setApproved(true);
    // Auto-dismiss after 1.5 s
    setTimeout(() => setShowNotif(false), 1500);
  }

  return (
    <div className="flex flex-col gap-4 my-auto">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b-2 border-[#4A3B2C]/20 shrink-0">
        <div>
          {/* Clickable "Parent Overview" heading */}
          <button
            type="button"
            onClick={() => { setShowNotif(true); setApproved(false); }}
            className="text-2xl font-black text-[#162660] tracking-tight cursor-pointer text-left"
          >
            Parent Overview
          </button>
        </div>

        {activeChild && (
          <ChildDropdown
            children={children}
            selected={activeChild}
            onSelect={(child) => setSelectedChildId(child.childId)}
          />
        )}
      </div>

      {/* ── Bento Box Grid Layout ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-stretch">

        {/* ── BENTO TILE 1: Child Growth & Focus Areas ── */}
        <div className="lg:col-span-7 aralkada-card p-5 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between border-b border-[#4A3B2C]/15 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#162660] text-[#F1E4D1] font-black text-lg flex items-center justify-center border-2 border-[#4A3B2C] shadow-[0_3px_0_#4A3B2C] shrink-0">
                  {activeChild?.avatarLetter}
                </div>
                <div>
                  <h2 className="font-black text-lg text-[#162660] leading-none">
                    {activeChild?.childName}&apos;s Growth Analytics
                  </h2>
                  <span className="text-[10px] font-bold text-[#162660]/70 uppercase tracking-wider mt-0.5 block">
                    Age {activeChild?.profile?.age} · {activeChild?.profile?.grade} · &quot;{activeChild?.profile?.personality}&quot;
                  </span>
                </div>
              </div>

              <div className="px-3 py-1 rounded-full bg-[#D0E6FD] border-2 border-[#162660] shadow-[0_2px_0_#162660] text-[9px] font-black text-[#162660] uppercase tracking-wider shrink-0">
                Live Tracking
              </div>
            </div>

            {activeChild?.profile?.focusAreas && activeChild.profile.focusAreas.length > 0 && (
              <div className="flex flex-col gap-1.5 mt-3">
                <span className="text-[9px] font-black text-[#162660]/50 uppercase tracking-widest">
                  Active Focus:
                </span>
                <div className="flex flex-wrap gap-1.5 items-center">
                  {activeChild.profile.focusAreas.slice(0, 3).map((area, idx) => (
                    <span
                      key={area}
                      className={`text-[9px] font-black border-2 rounded-full px-2.5 py-0.5 uppercase tracking-wide ${idx % 2 === 0
                        ? "bg-[#D0E6FD] text-[#162660] border-[#162660]"
                        : "bg-[#E8DAC4] text-[#162660] border-[#4A3B2C]"
                        }`}
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Offline Actions & Challenges sub-grid */}
          <div className="grid grid-cols-2 gap-3 mt-1">
            {/* Actions Box */}
            <div className="rounded-2xl border-2 border-[#4A3B2C] bg-[#F8F1E5] p-3 shadow-[0_3px_0_#4A3B2C] flex flex-col justify-between">
              <span className="font-black text-[10px] text-[#162660] uppercase tracking-wider mb-2 block">
                Offline Actions
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-white border-2 border-[#4A3B2C]/25 p-2 text-center">
                  <span className="block text-[9px] font-bold text-[#162660]/60 uppercase">Ongoing</span>
                  <span className="text-lg font-black text-[#162660]">{activeChild?.actions?.ongoing ?? 0}</span>
                </div>
                <div className="rounded-xl bg-white border-2 border-[#4A3B2C]/25 p-2 text-center">
                  <span className="block text-[9px] font-bold text-[#162660]/60 uppercase">Done</span>
                  <span className="text-lg font-black text-[#162660]">{activeChild?.actions?.done ?? 0}</span>
                </div>
              </div>
            </div>

            {/* Challenges Box */}
            <div className="rounded-2xl border-2 border-[#4A3B2C] bg-[#F8F1E5] p-3 shadow-[0_3px_0_#4A3B2C] flex flex-col justify-between">
              <span className="font-black text-[10px] text-[#162660] uppercase tracking-wider mb-2 block">
                Challenges
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-white border-2 border-[#4A3B2C]/25 p-2 text-center">
                  <span className="block text-[9px] font-bold text-[#162660]/60 uppercase">Ongoing</span>
                  <span className="text-lg font-black text-[#162660]">{activeChild?.challenges?.ongoing ?? 0}</span>
                </div>
                <div className="rounded-xl bg-white border-2 border-[#4A3B2C]/25 p-2 text-center">
                  <span className="block text-[9px] font-bold text-[#162660]/60 uppercase">Done</span>
                  <span className="text-lg font-black text-[#162660]">{activeChild?.challenges?.done ?? 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── BENTO TILE 2: Earned Screen Time ── */}
        <div className="lg:col-span-5 aralkada-card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b-2 border-[#4A3B2C]/15 pb-2.5">
            <span className="font-black text-xs text-[#162660] uppercase tracking-wider">
              Screen Time Balance
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#F8F1E5] border-2 border-[#4A3B2C]/30 text-[9px] font-black text-[#162660]">
              WHO Cap: {dailyCapHours} hrs/day
            </span>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-3 py-4">
            <div className="flex items-baseline justify-between">
              <span className="text-xs sm:text-sm font-black text-[#162660] uppercase tracking-wide">
                Total Earned Time:
              </span>
              <span className="text-2xl sm:text-3xl font-black text-[#162660]">
                {activeChild?.tokens?.earnedHours ?? 0} hrs
              </span>
            </div>

            <div className="w-full bg-[#E8DAC4] h-3.5 rounded-full overflow-hidden border-2 border-[#4A3B2C]/30 my-0.5">
              <div
                className="bg-[#162660] h-full rounded-full transition-all duration-500"
                style={{ width: `${usedPercentage}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-xs font-black text-[#162660]/80">
              <span>Used: {activeChild?.tokens?.usedHours ?? 0} hrs</span>
              <span className="text-[#162660] font-black underline">
                Available: {activeChild?.tokens?.remainingHours ?? 0} hrs
              </span>
            </div>
          </div>
        </div>

        {/* ── BENTO TILE 3: Chatbot ── */}
        <div className="lg:col-span-6 aralkada-card p-5 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#D0E6FD] border-2 border-[#162660] shadow-[0_2px_0_#162660] text-[9px] font-black text-[#162660] uppercase tracking-wider">
                Chatbot
              </span>
            </div>
            <h3 className="text-lg font-black text-[#162660] mb-1.5 tracking-tight">
              Express a Concern to Chatbot
            </h3>
            <p className="text-xs font-bold text-[#4A3B2C]/70 mb-3">
              Get grounded, multi-framework coaching for everyday parenting moments tonight.
            </p>
            <div className="flex flex-wrap gap-1.5 mb-2">
              <span className="px-2.5 py-1 rounded-xl bg-[#F8F1E5] border-2 border-[#4A3B2C]/20 text-[11px] font-bold text-[#162660]">
                &quot;Handling anger when turning off iPad&quot;
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-[#F8F1E5] border-2 border-[#4A3B2C]/20 text-[11px] font-bold text-[#162660]">
                &quot;Encouraging resilience after failure&quot;
              </span>
            </div>
          </div>
          <Link
            href="/chatbot"
            className="w-full py-2.5 aralkada-btn-primary flex items-center justify-center gap-2 text-xs cursor-pointer"
          >
            <svg className="w-4 h-4 text-[#F1E4D1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span>CHAT</span>
          </Link>
        </div>

        {/* ── BENTO TILE 4: Make an Action or Challenge ── */}
        <div className="lg:col-span-6 aralkada-card p-5 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#E8DAC4] border-2 border-[#4A3B2C] shadow-[0_2px_0_#4A3B2C] text-[9px] font-black text-[#162660] uppercase tracking-wider">
                Offline Skill Building
              </span>
            </div>
            <h3 className="text-lg font-black text-[#162660] mb-1 tracking-tight">
              Make an Action or Challenge
            </h3>
            <p className="text-xs font-bold text-[#4A3B2C]/75 mb-3">
              Every minute of offline hard work unlocks healthy screen time.
            </p>
            <div className="grid grid-cols-2 gap-2.5 mb-2">
              <div className="p-2.5 rounded-2xl bg-[#F8F1E5] border-2 border-[#4A3B2C]/25 text-center shadow-sm flex flex-col justify-center">
                <span className="block text-[9px] font-black text-[#162660]/60 uppercase tracking-wider">
                  Reward Rate
                </span>
                <span className="text-xs sm:text-sm font-black text-[#162660] leading-tight mt-0.5">
                  1 Min Effort = 1 Min Screen
                </span>
              </div>
              <div className="p-2.5 rounded-2xl bg-[#F8F1E5] border-2 border-[#4A3B2C]/25 text-center shadow-sm flex flex-col justify-center">
                <span className="block text-[9px] font-black text-[#162660]/60 uppercase tracking-wider">
                  Max Daily Cap
                </span>
                <span className="text-xs sm:text-sm font-black text-[#162660] leading-tight mt-0.5">
                  {dailyCapHours} hrs / day
                </span>
              </div>
            </div>
          </div>
          <Link
            href="/challenge"
            className="w-full py-2.5 aralkada-btn-secondary flex items-center justify-center gap-2 text-center text-xs cursor-pointer"
          >
            <svg className="w-4 h-4 text-[#162660]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 4v16m8-8H4" />
            </svg>
            <span>CREATE ACTION / CHALLENGE</span>
          </Link>
        </div>

      </div>

      {/* ── Floating Task Completion Notification (Centered & Compact) ── */}
      {showNotif && activeChild && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/25 backdrop-blur-[2px] animate-in fade-in duration-150">
          <div className="w-full max-w-[320px] bg-white border-2 border-[#4A3B2C] shadow-[0_6px_0_#4A3B2C] rounded-2xl p-4 flex flex-col gap-2.5 animate-in zoom-in-95 duration-150">

            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-[#4A3B2C]/15">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#162660] animate-pulse" />
                <span className="px-2 py-0.5 rounded-full bg-[#D0E6FD] border border-[#162660] text-[8px] font-black uppercase tracking-wider text-[#162660]">
                  Task Notice
                </span>
                <span className="text-[9px] font-bold text-[#4A3B2C]/60">Just now</span>
              </div>
              <button
                type="button"
                onClick={() => setShowNotif(false)}
                className="w-6 h-6 rounded-lg bg-[#F1E4D1] border-2 border-[#4A3B2C] flex items-center justify-center hover:bg-[#E6D4BA] cursor-pointer text-xs font-black transition-colors"
                title="Dismiss"
              >
                ✕
              </button>
            </div>

            {/* Child + message */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#D0E6FD] border-2 border-[#162660] shadow-[0_2px_0_#162660] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[#162660]" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2a5 5 0 100 10 5 5 0 000-10zm-7 18a7 7 0 0114 0H5z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex flex-col min-w-0">
                <h3 className="text-xs font-black text-[#162660] leading-snug">
                  {activeChild.childName} finished the {OVERVIEW_TASK.title}
                </h3>
                <span className="text-[9px] font-bold text-[#4A3B2C]/70">
                  Offline habit verified · Ready for approval
                </span>
              </div>
            </div>

            {/* Task detail pill */}
            <div className="w-full bg-[#F8F1E5] border border-[#4A3B2C]/20 rounded-xl p-2 flex items-center gap-2 overflow-hidden">
              <div className="flex flex-col items-start text-left flex-1 min-w-0 overflow-hidden">
                <span className="text-[11px] font-black text-[#162660] w-full truncate block leading-tight">{OVERVIEW_TASK.title}</span>
                <span className="text-[8px] font-black uppercase tracking-wider text-[#4A3B2C]/60">
                  {OVERVIEW_TASK.category}
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#D0E6FD] border border-[#162660] text-[9px] font-black text-[#162660] shrink-0 whitespace-nowrap">
                +{OVERVIEW_TASK.earnedMinutes}m Screen Time
              </span>
            </div>

            {/* Approved state */}
            {approved ? (
              <div className="flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-[#D4EDDA] border-2 border-[#276749]">
                <svg className="w-3.5 h-3.5 text-[#276749]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[11px] font-black text-[#276749]">Approved! Screen time added ✓</span>
              </div>
            ) : (
              /* Buttons */
              <div className="flex gap-2 pt-1 border-t border-[#4A3B2C]/15">
                <button
                  type="button"
                  onClick={() => setShowNotif(false)}
                  className="flex-1 py-1.5 rounded-xl bg-[#E8DAC4] border-2 border-[#4A3B2C] shadow-[0_2px_0_#4A3B2C] text-[11px] font-black text-[#162660] hover:bg-[#DDD0B8] cursor-pointer transition-all"
                >
                  Dismiss
                </button>
                <button
                  type="button"
                  onClick={handleApprove}
                  className="flex-[1.4] py-1.5 rounded-xl bg-[#162660] text-[#F1E4D1] border-2 border-[#4A3B2C] shadow-[0_2px_0_#4A3B2C] text-[11px] font-black hover:bg-[#1E3A8A] cursor-pointer transition-all"
                >
                  Approve Screentime Gain
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
