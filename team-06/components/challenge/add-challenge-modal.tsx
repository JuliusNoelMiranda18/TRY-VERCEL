"use client";

import { useState } from "react";
import { FOCUS_AREA_OPTIONS, FocusArea } from "@/lib/constants/analytics";
import { ChildChallenge } from "@/lib/constants/challenges";

interface Props {
  childId: string;
  childName: string;
  onAdd: (challenge: Omit<ChildChallenge, "id">) => void;
  onClose: () => void;
}

const AI_CHALLENGE_IDEAS: Array<{
  title: string;
  description: string;
  targetFocusArea: FocusArea;
  earnedMinutes: number;
  milestones: string[];
  category: string;
}> = [
  {
    title: "Mindful Homework Pomodoro Sprint",
    description:
      "Complete chapter exercises with zero device distractions and note one key insight. Note: Physical disabilities — exercise adapted for limited mobility, no sports included.",
    targetFocusArea: "Homework & Academic Focus",
    earnedMinutes: 30,
    milestones: [
      "Set a 25-minute Pomodoro focus timer",
      "Complete workbook chapter without tablet prompts",
      "Review answers and explain one solution to parent",
    ],
    category: "Academic",
  },
  {
    title: "Feelings Wheel & Calm Breath Quest",
    description:
      "Identify current emotion using the feelings chart and practice seated 4-7-8 breathing exercises. Note: Physical disabilities — exercise adapted for limited mobility, no sports included.",
    targetFocusArea: "Emotional Regulation",
    earnedMinutes: 25,
    milestones: [
      "Point to exact emotion on the Feelings Wheel",
      "Do 4 cycles of box breathing when feeling restless",
      "Share what triggered the feeling calmly",
    ],
    category: "Emotional",
  },
  {
    title: "Offline Creative Building Sprint",
    description:
      "Construct an architectural model or craft at a desk without looking at video tutorials. Note: Physical disabilities — exercise adapted for limited mobility, no sports included.",
    targetFocusArea: "Handling Frustration / Losing",
    earnedMinutes: 35,
    milestones: [
      "Plan structure draft on physical paper",
      "Build model continuously for 20 minutes",
      "Present design to family at dinner",
    ],
    category: "Creative",
  },
  {
    title: "Screen-Free Family Storytelling Hour",
    description:
      "Read a chapter book aloud and create an alternate ending with siblings. Note: Physical disabilities — exercise adapted for limited mobility, no sports included.",
    targetFocusArea: "Sharing & Social Skills",
    earnedMinutes: 20,
    milestones: [
      "Read 15 consecutive pages quietly",
      "Narrate character motives to a parent",
      "Draw one illustration of the favorite scene",
    ],
    category: "Social",
  },
];

export function AddChallengeModal({ childId, childName, onAdd, onClose }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetFocusArea, setTargetFocusArea] = useState<FocusArea>(FOCUS_AREA_OPTIONS[0]);
  const [earnedMinutes, setEarnedMinutes] = useState(30);
  const [milestonesText, setMilestonesText] = useState("");
  const [category, setCategory] = useState("Academic");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAiAutoFill = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const randomIdea =
        AI_CHALLENGE_IDEAS[Math.floor(Math.random() * AI_CHALLENGE_IDEAS.length)];
      setTitle(randomIdea.title);
      setDescription(randomIdea.description);
      setTargetFocusArea(randomIdea.targetFocusArea);
      setEarnedMinutes(randomIdea.earnedMinutes);
      setMilestonesText(randomIdea.milestones.join("\n"));
      setCategory(randomIdea.category);
      setIsGenerating(false);
    }, 250);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const milestones = milestonesText
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    onAdd({
      childId,
      title: title.trim(),
      description: description.trim(),
      targetFocusArea,
      earnedMinutes: Number(earnedMinutes) || 15,
      milestones: milestones.length > 0 ? milestones : ["Complete offline resilience goal"],
      status: "ongoing",
      category,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="aralkada-card w-full max-w-lg max-h-[92vh] overflow-y-auto p-6 flex flex-col gap-4 shadow-[0_8px_0_#4A3B2C] animate-in fade-in zoom-in-95 duration-150">
        {/* Header with AI Generate Action */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-[#4A3B2C]/15">
          <div>
            <h2 className="text-lg font-black text-[#162660]">Create New Challenge</h2>
            <p className="text-xs font-bold text-[#162660]/60 mt-0.5">
              Assigning to <span className="text-[#162660] font-black">{childName}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* AI Auto-Fill Button */}
            <button
              type="button"
              onClick={handleAiAutoFill}
              disabled={isGenerating}
              className="px-2.5 py-1.5 rounded-xl bg-[#D0E6FD] border-2 border-[#162660] text-[#162660] text-xs font-black flex items-center gap-1.5 shadow-[0_2px_0_#162660] hover:bg-[#B8DAF9] active:translate-y-0.5 transition-all cursor-pointer disabled:opacity-50"
              title="AI Generation — adapts challenges for physical disabilities, no sports"
            >
              <svg className="w-3.5 h-3.5 text-[#162660]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>{isGenerating ? "Generating..." : "AI Generation"}</span>
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
          {/* Title */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase tracking-wider text-[#4A3B2C]/70">
              Challenge Title
            </label>
            <input
              required
              className="aralkada-input px-3.5 py-2.5 text-sm"
              placeholder="e.g., Mindful Homework Sprint"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase tracking-wider text-[#4A3B2C]/70">
              Description
            </label>
            <textarea
              rows={3}
              className="w-full min-h-[76px] bg-[#F8F1E5] border-2 border-[#4A3B2C] rounded-2xl px-3.5 py-2.5 text-sm font-bold text-[#162660] focus:outline-none focus:border-[#162660] focus:ring-2 focus:ring-[#162660]/20 leading-relaxed placeholder:text-sm placeholder:font-medium placeholder:text-[#162660]/40 shadow-[0_2px_0_#4A3B2C] resize-none"
              placeholder="e.g., Complete math workbook chapter with zero distractions"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Target Focus Area & Earned Minutes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Target Focus Area */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-[#4A3B2C]/70">
                Target Focus Area
              </label>
              <div className="relative">
                <select
                  className="aralkada-select w-full text-xs font-black text-[#162660] pr-8 cursor-pointer"
                  value={targetFocusArea}
                  onChange={(e) => setTargetFocusArea(e.target.value as FocusArea)}
                >
                  {FOCUS_AREA_OPTIONS.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#162660]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Earned Time (Mins) with Tactile Stepper */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-[#4A3B2C]/70">
                Earned Time (Mins)
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
                    max={120}
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
                  onClick={() => setEarnedMinutes((prev) => Math.min(120, prev + 5))}
                  className="w-8 h-8 rounded-xl bg-white border-2 border-[#4A3B2C] flex items-center justify-center font-black text-[#162660] hover:bg-[#E8DAC4] active:translate-y-0.5 cursor-pointer shrink-0 transition-colors"
                  title="Increase 5 minutes"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Goals to Achieve (1 per line) */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-black uppercase tracking-wider text-[#4A3B2C]/70">
                Goals to Achieve (1 per line)
              </label>
              <span className="text-[9px] font-bold text-[#162660]/50">
                Enter each milestone on a new line
              </span>
            </div>
            <textarea
              rows={3}
              className="w-full min-h-[78px] bg-[#F8F1E5] border-2 border-[#4A3B2C] rounded-2xl p-3.5 text-xs font-bold text-[#162660] focus:outline-none focus:border-[#162660] focus:ring-2 focus:ring-[#162660]/20 leading-relaxed placeholder:text-xs placeholder:font-medium placeholder:text-[#162660]/40 shadow-[0_2px_0_#4A3B2C]"
              placeholder="• Set 25-minute Pomodoro timer&#10;• Review answers with parent&#10;• Note one mistake learned"
              value={milestonesText}
              onChange={(e) => setMilestonesText(e.target.value)}
            />
          </div>

          {/* Action buttons */}
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
              Add Challenge
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
