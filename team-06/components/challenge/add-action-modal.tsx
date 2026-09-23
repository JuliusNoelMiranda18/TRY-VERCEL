"use client";

import { useState } from "react";
import { ChildAction } from "@/lib/constants/challenges";

interface Props {
  childId: string;
  childName: string;
  onAdd: (action: Omit<ChildAction, "id">) => void;
  onClose: () => void;
}

const CATEGORIES = [
  "DAILY ROUTINE",
  "PHYSICAL HABIT",
  "FAMILY & CHORES",
  "MINDFULNESS",
  "CREATIVE PRACTICE",
];

const AI_ACTION_IDEAS: Array<{
  title: string;
  category: string;
  earnedMinutes: number;
}> = [
  { title: "Tidy Up Desk & Organize Backpack", category: "DAILY ROUTINE", earnedMinutes: 15 },
  { title: "15-Min Calming Breath & Stretch", category: "MINDFULNESS", earnedMinutes: 10 },
  { title: "Help Sort & Fold Clean Laundry", category: "FAMILY & CHORES", earnedMinutes: 15 },
  { title: "Draw 1 Creative Comic Sketch", category: "CREATIVE PRACTICE", earnedMinutes: 20 },
  { title: "Seated Gentle Stretch & Deep Breaths", category: "PHYSICAL HABIT", earnedMinutes: 10 },
  { title: "Wash & Put Away Breakfast Dishes", category: "DAILY ROUTINE", earnedMinutes: 15 },
  { title: "Water All Porch Houseplants", category: "FAMILY & CHORES", earnedMinutes: 10 },
  { title: "5-Minute Gratitude & Kindness Log", category: "MINDFULNESS", earnedMinutes: 10 },
];

export function AddActionModal({ childId, childName, onAdd, onClose }: Props) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [earnedMinutes, setEarnedMinutes] = useState(15);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAiAutoFill = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const randomIdea =
        AI_ACTION_IDEAS[Math.floor(Math.random() * AI_ACTION_IDEAS.length)];
      setTitle(randomIdea.title);
      setCategory(randomIdea.category);
      setEarnedMinutes(randomIdea.earnedMinutes);
      setIsGenerating(false);
    }, 250);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      childId,
      title: title.trim(),
      category,
      earnedMinutes: Number(earnedMinutes) || 10,
      status: "pending",
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="aralkada-card w-full max-w-sm p-6 flex flex-col gap-4 shadow-[0_8px_0_#4A3B2C] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-[#4A3B2C]/15">
          <div>
            <h2 className="text-lg font-black text-[#162660]">Add Quick Action</h2>
            <p className="text-xs font-bold text-[#162660]/60 mt-0.5">
              For <span className="text-[#162660] font-black">{childName}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* AI Auto-Fill Button */}
            <button
              type="button"
              onClick={handleAiAutoFill}
              disabled={isGenerating}
              className="px-2.5 py-1.5 rounded-xl bg-[#D0E6FD] border-2 border-[#162660] text-[#162660] text-xs font-black flex items-center gap-1.5 shadow-[0_2px_0_#162660] hover:bg-[#B8DAF9] active:translate-y-0.5 transition-all cursor-pointer disabled:opacity-50"
              title="AI Generation — adapts actions for physical disabilities, no sports"
            >
              <svg className="w-3.5 h-3.5 text-[#162660]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>{isGenerating ? "..." : "AI Generation"}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-[#F1E4D1] border-2 border-[#4A3B2C] flex items-center justify-center hover:bg-[#E6D4BA] cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {/* Action Title */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase tracking-wider text-[#4A3B2C]/70">
              Action Title
            </label>
            <input
              required
              className="aralkada-input px-3.5 py-2.5 text-sm"
              placeholder="e.g., Make Bed & Clean Room"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase tracking-wider text-[#4A3B2C]/70">
              Category
            </label>
            <div className="relative">
              <select
                className="aralkada-select w-full text-xs font-black text-[#162660] pr-8 cursor-pointer"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#162660]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Earned Minutes with Stepper */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase tracking-wider text-[#4A3B2C]/70">
              Earned Minutes
            </label>
            <div className="flex items-center gap-1.5 bg-[#F8F1E5] border-2 border-[#4A3B2C] rounded-2xl p-1 shadow-[0_2px_0_#4A3B2C]">
              <button
                type="button"
                onClick={() => setEarnedMinutes((prev) => Math.max(5, prev - 5))}
                className="w-8 h-8 rounded-xl bg-white border-2 border-[#4A3B2C] flex items-center justify-center font-black text-[#162660] hover:bg-[#E8DAC4] active:translate-y-0.5 cursor-pointer shrink-0 transition-colors"
                title="Decrease 5 minutes"
              >
                −
              </button>
              <div className="flex-1 flex items-center justify-center">
                <input
                  type="number"
                  min={5}
                  max={60}
                  step={5}
                  required
                  className="w-12 bg-transparent text-center text-sm font-black text-[#162660] focus:outline-none"
                  value={earnedMinutes}
                  onChange={(e) => setEarnedMinutes(Number(e.target.value))}
                />
                <span className="text-xs font-black text-[#162660]/60 -ml-1">mins</span>
              </div>
              <button
                type="button"
                onClick={() => setEarnedMinutes((prev) => Math.min(60, prev + 5))}
                className="w-8 h-8 rounded-xl bg-white border-2 border-[#4A3B2C] flex items-center justify-center font-black text-[#162660] hover:bg-[#E8DAC4] active:translate-y-0.5 cursor-pointer shrink-0 transition-colors"
                title="Increase 5 minutes"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-2 pt-3 border-t-2 border-[#4A3B2C]/15">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 aralkada-btn-outline text-xs cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 aralkada-btn-primary text-xs cursor-pointer"
            >
              Add Action
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
