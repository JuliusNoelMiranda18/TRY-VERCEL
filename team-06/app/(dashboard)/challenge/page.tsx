"use client";

import { useState } from "react";
import { useChildProfiles } from "@/lib/hooks/useChildProfiles";
import { useChildChallenges } from "@/lib/hooks/useChildChallenges";
import { ChildDropdown } from "@/components/child-dropdown";
import { ChallengeCard } from "@/components/challenge/challenge-card";
import { ActionListItem } from "@/components/challenge/action-list-item";
import { AddChallengeModal } from "@/components/challenge/add-challenge-modal";
import { AddActionModal } from "@/components/challenge/add-action-modal";

export default function ChallengePage() {
  const { children } = useChildProfiles();
  const [selectedChildId, setSelectedChildId] = useState(children[0]?.childId || "kid-101");
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isApprovalPopupOpen, setIsApprovalPopupOpen] = useState(false);

  const activeChild = children.find((c) => c.childId === selectedChildId) || children[0];

  const {
    childChallenges,
    childActions,
    addChallenge,
    toggleChallengeStatus,
    addAction,
    toggleActionStatus,
    approveAction,
  } = useChildChallenges(activeChild?.childId || "kid-101");

  return (
    <div className="flex flex-col gap-5">
      {/* ── Page Header (Image 1 Standard Header Style) ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b-2 border-[#4A3B2C]/20 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-[#162660] tracking-tight">
            Challenge &amp; Action
          </h1>
        </div>

        {/* Child Selector Dropdown */}
        {activeChild && (
          <ChildDropdown
            children={children}
            selected={activeChild}
            onSelect={(child) => setSelectedChildId(child.childId)}
          />
        )}
      </div>

      {/* ── Two-Column Layout: Challenges on Left, Actions on Right (Equal Height) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* ── Left: Challenges (2x2 Grid of 4 Boxes) ── */}
        <div className="lg:col-span-7 flex flex-col gap-3.5 h-full">
          <div className="flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <p className="text-[10px] font-black text-[#162660]/60 uppercase tracking-widest">
                Challenges
              </p>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#E8DAC4] border border-[#4A3B2C]/30 text-[#162660]">
                {childChallenges.length}
              </span>
            </div>

            {/* + Button to Add Challenge (Pop-up contains AI Auto-Fill) */}
            <button
              type="button"
              onClick={() => setIsChallengeModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl aralkada-btn-primary text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>+ Add Challenge</span>
            </button>
          </div>

          {/* Challenges 2x2 Grid (4 Boxes) */}
          {childChallenges.length === 0 ? (
            <div className="aralkada-card-beige p-8 text-center flex flex-col items-center justify-center gap-2 flex-1">
              <p className="text-sm font-black text-[#162660]">No challenges assigned yet</p>
              <p className="text-xs font-bold text-[#4A3B2C]/60">
                Click &quot;+ Add Challenge&quot; to assign a resilience challenge.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 flex-1">
              {childChallenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  onToggleStatus={toggleChallengeStatus}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Right: Quick Actions (Equal Height to Challenges) ── */}
        <div className="lg:col-span-5 flex flex-col gap-3.5 h-full">
          <div className="flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <p className="text-[10px] font-black text-[#162660]/60 uppercase tracking-widest">
                Quick Actions
              </p>
              
              {/* Clickable badge to trigger completion approval popup */}
              <button
                type="button"
                onClick={() => setIsApprovalPopupOpen(true)}
                className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#E8DAC4] border border-[#4A3B2C]/30 text-[#162660] cursor-pointer"
                title="Click to view action completion notices"
              >
                {childActions.length}
              </button>
            </div>

            {/* + Button to Add Action (Pop-up contains AI Auto-Fill) */}
            <button
              type="button"
              onClick={() => setIsActionModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl aralkada-btn-secondary text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>+ Add Action</span>
            </button>
          </div>

          {/* Actions List (fills equal height) */}
          {childActions.length === 0 ? (
            <div className="aralkada-card-beige p-8 text-center flex flex-col items-center justify-center gap-2 flex-1">
              <p className="text-sm font-black text-[#162660]">No actions created yet</p>
              <p className="text-xs font-bold text-[#4A3B2C]/60">
                Click &quot;+ Add Action&quot; to add quick daily routine actions.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3 flex-1 justify-between">
              {childActions.map((action, idx) => (
                <ActionListItem
                  key={action.id}
                  action={action}
                  index={idx}
                  onToggleStatus={toggleActionStatus}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Action Completion Floating Notification (Right-Hand Side) ── */}
      {isApprovalPopupOpen && activeChild && (
        <div className="fixed top-20 right-6 z-50 w-full max-w-sm animate-in slide-in-from-right-8 fade-in duration-200">
          <div className="aralkada-card p-5 flex flex-col gap-3.5 shadow-[0_8px_0_#4A3B2C] border-3 border-[#4A3B2C] bg-white">
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b-2 border-[#4A3B2C]/15">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#162660] animate-pulse" />
                <span className="px-2 py-0.5 rounded-full bg-[#D0E6FD] border border-[#162660] text-[9px] font-black uppercase tracking-wider text-[#162660]">
                  Task Notice
                </span>
                <span className="text-[10px] font-bold text-[#4A3B2C]/60">Just now</span>
              </div>
              <button
                type="button"
                onClick={() => setIsApprovalPopupOpen(false)}
                className="w-7 h-7 rounded-xl bg-[#F1E4D1] border-2 border-[#4A3B2C] flex items-center justify-center hover:bg-[#E6D4BA] cursor-pointer text-xs font-black"
                title="Dismiss"
              >
                ✕
              </button>
            </div>

            {/* Child Completion Content */}
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#D0E6FD] border-2 border-[#162660] shadow-[0_2px_0_#162660] flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-6 h-6 text-[#162660]" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12 2a5 5 0 100 10 5 5 0 000-10zm-7 18a7 7 0 0114 0H5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <div className="flex flex-col min-w-0">
                <h3 className="text-sm font-black text-[#162660] leading-snug">
                  {activeChild.childName} finished the Water Balcony Houseplants
                </h3>
                <span className="text-[10px] font-bold text-[#4A3B2C]/70 mt-0.5">
                  Offline habit verified · Ready for approval
                </span>
              </div>
            </div>

            {/* Task Details Pill */}
            <div className="w-full bg-[#F8F1E5] border-2 border-[#4A3B2C]/20 rounded-xl p-2.5 flex items-center justify-between gap-2">
              <div className="flex flex-col items-start text-left min-w-0">
                <span className="text-xs font-black text-[#162660] truncate">Water Balcony Houseplants</span>
                <span className="text-[9px] font-black uppercase tracking-wider text-[#4A3B2C]/60">
                  FAMILY &amp; CHORES
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#D0E6FD] border border-[#162660] text-[10px] font-black text-[#162660] shrink-0">
                +15m Screen Time
              </span>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 pt-1 border-t border-[#4A3B2C]/15">
              <button
                type="button"
                onClick={() => setIsApprovalPopupOpen(false)}
                className="flex-1 py-2 aralkada-btn-outline text-xs cursor-pointer"
              >
                Dismiss
              </button>
              <button
                type="button"
                onClick={() => {
                  approveAction("Water Balcony Houseplants");
                  setIsApprovalPopupOpen(false);
                }}
                className="flex-[1.4] py-2 aralkada-btn-primary text-xs cursor-pointer"
              >
                Approve Screentime Gain
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modals ── */}
      {isChallengeModalOpen && activeChild && (
        <AddChallengeModal
          childId={activeChild.childId}
          childName={activeChild.childName}
          onAdd={addChallenge}
          onClose={() => setIsChallengeModalOpen(false)}
        />
      )}

      {isActionModalOpen && activeChild && (
        <AddActionModal
          childId={activeChild.childId}
          childName={activeChild.childName}
          onAdd={addAction}
          onClose={() => setIsActionModalOpen(false)}
        />
      )}
    </div>
  );
}
