"use client";

import { useState, useRef, useEffect } from "react";
import { ChildAnalytics } from "@/lib/constants/analytics";

interface ChildDropdownProps {
  children: ChildAnalytics[];
  selected: ChildAnalytics;
  onSelect: (child: ChildAnalytics) => void;
  onAddChild?: (newChild: ChildAnalytics) => void;
}

export function ChildDropdown({ children: initialChildren, selected, onSelect, onAddChild }: ChildDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [childrenList, setChildrenList] = useState<ChildAnalytics[]>(initialChildren);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [linkCode, setLinkCode] = useState("");
  const [linkError, setLinkError] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  /* Keep childrenList updated if props change */
  useEffect(() => {
    setChildrenList(initialChildren);
  }, [initialChildren]);

  /* Close dropdown on outside click */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLinkChild = (e: React.FormEvent) => {
    e.preventDefault();
    setLinkError("");

    if (!linkCode.trim() || linkCode.trim().length < 4) {
      setLinkError("Please enter a valid 6-digit link code.");
      return;
    }

    // Generate a new child profile linked via code
    const generatedNames = ["Sammy", "Chloe", "Noah", "Alex", "Zoe"];
    const randomName = generatedNames[childrenList.length % generatedNames.length];
    
    const newChild: ChildAnalytics = {
      childId: `kid-linked-${Date.now()}`,
      childName: randomName,
      avatarLetter: randomName[0],
      avatarColor: "#6B7280",
      challenges: { ongoing: 1, done: 6 },
      actions: { ongoing: 3, done: 12 },
      tokens: { earnedHours: 3.5, usedHours: 1.0, remainingHours: 2.5, totalTokens: 70 },
      profile: {
        age: 8,
        grade: "Grade 3",
        personality: "Curious & Energetic",
        attentionSpan: "medium",
        focusAreas: ["Emotional Regulation", "Homework & Academic Focus"],
        learningStyles: ["Kinesthetic"],
        screenFreeZones: ["Mealtimes", "1hr Before Bed"],
        notes: "Newly added child profile.",
      },
    };

    const updatedList = [...childrenList, newChild];
    setChildrenList(updatedList);
    if (onAddChild) onAddChild(newChild);
    onSelect(newChild);

    // Reset form state and close modal + dropdown
    setLinkCode("");
    setIsModalOpen(false);
    setIsOpen(false);
  };

  return (
    <>
      <div ref={ref} className="relative">
        {/* Trigger pill */}
        <button
          type="button"
          id="active-child-dropdown"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
          className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#E8DAC4] border-2 border-[#4A3B2C] shadow-[0_3px_0_#4A3B2C] hover:bg-[#DDD0B8] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#162660]/30 select-none"
        >
          {/* Status dot */}
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />

          {/* Avatar letter */}
          <span className="w-6 h-6 rounded-lg bg-[#162660] text-[#F1E4D1] text-[11px] font-black flex items-center justify-center shrink-0">
            {selected.avatarLetter}
          </span>

          {/* Label */}
          <span className="text-xs font-black text-[#162660] tracking-wide">
            {selected.childName}
          </span>

          {/* Chevron */}
          <svg
            className={`w-3.5 h-3.5 text-[#162660] transition-transform duration-200 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown panel */}
        {isOpen && (
          <div
            role="listbox"
            aria-label="Select active child"
            className="absolute right-0 top-[calc(100%+8px)] z-50 w-60 bg-white border-2 border-[#4A3B2C] rounded-2xl shadow-[0_6px_0_#4A3B2C] overflow-hidden"
            style={{ animation: "dropdownFadeIn 0.15s ease" }}
          >
            {/* Panel header: Header text + Plus button beside it */}
            <div className="px-4 py-2.5 bg-[#F8F1E5] border-b-2 border-[#4A3B2C]/20 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-[#162660]/70 uppercase tracking-widest">
                  SELECT ACTIVE CHILD
                </span>
                {/* + Icon Button beside SELECT ACTIVE CHILD header */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(true);
                  }}
                  className="w-5 h-5 rounded-full bg-[#162660] text-[#F1E4D1] text-xs font-black flex items-center justify-center hover:bg-[#121F50] transition-colors cursor-pointer shrink-0"
                  title="Add another child using code"
                >
                  +
                </button>
              </div>

              <span className="text-[10px] font-extrabold text-[#162660]">
                {childrenList.length}
              </span>
            </div>

            {/* Options List */}
            <ul className="py-1 max-h-52 overflow-y-auto">
              {childrenList.map((child) => {
                const isSelected = child.childId === selected.childId;
                return (
                  <li key={child.childId}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        onSelect(child);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-[#D0E6FD]"
                          : "hover:bg-[#F8F1E5]"
                      }`}
                    >
                      {/* Avatar */}
                      <span
                        className={`w-8 h-8 rounded-xl text-sm font-black flex items-center justify-center shrink-0 border-2 ${
                          isSelected
                            ? "bg-[#162660] text-[#F1E4D1] border-[#162660]"
                            : "bg-[#E8DAC4] text-[#162660] border-[#4A3B2C]/30"
                        }`}
                      >
                        {child.avatarLetter}
                      </span>

                      {/* Name + quick stat */}
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-black text-[#162660] leading-none">
                          {child.childName}
                        </span>
                        <span className="text-[10px] font-bold text-[#162660]/60 mt-0.5">
                          {child.tokens.totalTokens} tokens · {child.tokens.earnedHours} hrs
                        </span>
                      </div>

                      {/* Check mark for selected */}
                      {isSelected && (
                        <svg
                          className="w-4 h-4 text-[#162660] ml-auto shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {/* ── POPUP MODAL: Link Child with Code ── */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white border-2 border-[#4A3B2C] rounded-2xl shadow-[0_6px_0_#4A3B2C] p-5 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b-2 border-[#4A3B2C]/15 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#162660] text-[#F1E4D1] font-black text-xs flex items-center justify-center">
                  +
                </div>
                <h3 className="text-base font-black text-[#162660]">Link Child Device</h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setLinkCode("");
                  setLinkError("");
                }}
                className="w-7 h-7 rounded-lg bg-[#E8DAC4] border border-[#4A3B2C]/40 text-[#162660] font-black flex items-center justify-center hover:bg-[#DDD0B8] transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Description & Form */}
            <form onSubmit={handleLinkChild} className="flex flex-col gap-3">
              <p className="text-xs font-bold text-[#162660]/75 leading-relaxed">
                Enter the 6-digit link code generated on your child&apos;s device to monitor their offline actions &amp; challenges.
              </p>

              {linkError && (
                <div className="p-2 rounded-lg bg-red-100 border border-red-300 text-red-700 text-xs font-bold text-center">
                  {linkError}
                </div>
              )}

              <div>
                <label htmlFor="child-link-code-input" className="block text-[10px] font-black uppercase text-[#162660]/60 tracking-wider mb-1">
                  Child Link Code
                </label>
                <input
                  id="child-link-code-input"
                  type="text"
                  value={linkCode}
                  onChange={(e) => setLinkCode(e.target.value)}
                  placeholder="e.g. 849201"
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-[#4A3B2C] bg-[#F8F1E5] text-base font-black tracking-widest text-center text-[#162660] uppercase focus:outline-none focus:ring-2 focus:ring-[#162660]/30"
                  autoFocus
                />
              </div>

              <div className="flex items-center gap-2 mt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 aralkada-btn-primary text-xs cursor-pointer"
                >
                  LINK CHILD DEVICE
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setLinkCode("");
                    setLinkError("");
                  }}
                  className="py-2.5 px-4 rounded-xl bg-[#F8F1E5] border-2 border-[#4A3B2C]/30 text-[#162660] text-xs font-extrabold hover:bg-[#E8DAC4] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
