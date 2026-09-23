"use client";

import { useState } from "react";
import {
  ChildAnalytics,
  ChildProfile,
  FOCUS_AREA_OPTIONS,
  FocusArea,
  LearningStyle,
} from "@/lib/constants/analytics";

interface Props {
  child: ChildAnalytics;
  onSave: (updated: ChildAnalytics) => void;
  onClose: () => void;
}

const GRADE_OPTIONS = [
  "Kinder", "Grade 1", "Grade 2", "Grade 3", "Grade 4",
  "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9",
  "Grade 10", "Grade 11", "Grade 12",
];

const LEARNING_STYLES: LearningStyle[] = ["Visual", "Auditory", "Kinesthetic", "Reading-Writing"];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-black text-[#162660]/60 uppercase tracking-widest mb-2 mt-4 first:mt-0">
      {children}
    </p>
  );
}

function toggle<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
}

export function ChildProfileForm({ child, onSave, onClose }: Props) {
  const [form, setForm] = useState<ChildProfile>({ ...child.profile });
  const [name, setName] = useState(child.childName);

  const set = <K extends keyof ChildProfile>(key: K, value: ChildProfile[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  function handleSave() {
    const updated: ChildAnalytics = {
      ...child,
      childName: name.trim() || child.childName,
      avatarLetter: (name.trim() || child.childName)[0].toUpperCase(),
      profile: form,
    };
    onSave(updated);
  }

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="aralkada-card w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 flex flex-col gap-0 shadow-[0_8px_0_#4A3B2C]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-[#4A3B2C]/15 mb-2">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black text-[#F1E4D1] border-2 border-[#4A3B2C] shadow-[0_2px_0_#4A3B2C]"
              style={{ backgroundColor: child.avatarColor || "#162660" }}
            >
              {(name || child.childName)[0]?.toUpperCase() || "C"}
            </div>
            <div>
              <h2 className="text-lg font-black text-[#162660] leading-none">Edit Profile</h2>
              <p className="text-[11px] font-bold text-[#162660]/50 mt-0.5">Customize child details &amp; preferences</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-[#F1E4D1] border-2 border-[#4A3B2C] flex items-center justify-center hover:bg-[#E6D4BA] cursor-pointer transition-colors"
          >
            <svg className="w-4 h-4 text-[#162660]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── Basic Info ── */}
        <SectionTitle>Basic Info</SectionTitle>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase tracking-wider text-[#4A3B2C]/70">First Name</label>
            <input
              className="aralkada-input px-3.5 py-2.5 text-sm font-bold text-[#162660]"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Child's first name"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase tracking-wider text-[#4A3B2C]/70">Age</label>
            <input
              type="number"
              min={2}
              max={18}
              className="aralkada-input px-3.5 py-2.5 text-sm font-bold text-[#162660]"
              value={form.age}
              onChange={(e) => set("age", Number(e.target.value))}
            />
          </div>
        </div>

        {/* Improved Dropdowns */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase tracking-wider text-[#4A3B2C]/70">Grade Level</label>
            <div className="relative">
              <select
                className="w-full appearance-none bg-[#F8F1E5] border-2 border-[#4A3B2C] rounded-xl px-3.5 py-2.5 text-sm font-bold text-[#162660] focus:outline-none focus:border-[#162660] focus:ring-2 focus:ring-[#162660]/20 cursor-pointer pr-8"
                value={form.grade}
                onChange={(e) => set("grade", e.target.value)}
              >
                {GRADE_OPTIONS.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#162660]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase tracking-wider text-[#4A3B2C]/70">Attention Span</label>
            <div className="relative">
              <select
                className="w-full appearance-none bg-[#F8F1E5] border-2 border-[#4A3B2C] rounded-xl px-3.5 py-2.5 text-sm font-bold text-[#162660] focus:outline-none focus:border-[#162660] focus:ring-2 focus:ring-[#162660]/20 cursor-pointer pr-8"
                value={form.attentionSpan}
                onChange={(e) => set("attentionSpan", e.target.value as "short" | "medium" | "long")}
              >
                <option value="short">Short (5–10 min)</option>
                <option value="medium">Medium (15–25 min)</option>
                <option value="long">Long (30+ min)</option>
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#162660]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 mb-1">
          <label className="text-[10px] font-black uppercase tracking-wider text-[#4A3B2C]/70">Personality Description</label>
          <input
            className="aralkada-input px-3.5 py-2.5 text-sm font-bold text-[#162660]"
            value={form.personality}
            onChange={(e) => set("personality", e.target.value)}
            placeholder='e.g., "Energetic and curious"'
          />
        </div>

        {/* ── Learning Style ── */}
        <SectionTitle>Learning Style</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {LEARNING_STYLES.map((s) => {
            const active = form.learningStyles.includes(s);
            return (
              <button
                type="button"
                key={s}
                onClick={() => set("learningStyles", toggle(form.learningStyles, s))}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all cursor-pointer ${
                  active
                    ? "bg-[#162660] text-[#F1E4D1] border-[#0D1638] shadow-[0_2px_0_#0D1638]"
                    : "bg-white text-[#162660] border-[#4A3B2C]/30 hover:border-[#162660]"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>

        {/* ── Focus Areas (Multi-select) ── */}
        <SectionTitle>
          Focus Areas <span className="normal-case font-bold text-[#162660]/50">(select multiple)</span>
        </SectionTitle>
        <div className="flex flex-wrap gap-2">
          {FOCUS_AREA_OPTIONS.map((area) => {
            const active = (form.focusAreas || []).includes(area as FocusArea);
            return (
              <button
                type="button"
                key={area}
                onClick={() => set("focusAreas", toggle(form.focusAreas || [], area as FocusArea))}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all cursor-pointer ${
                  active
                    ? "bg-[#162660] text-[#F1E4D1] border-[#0D1638] shadow-[0_2px_0_#0D1638]"
                    : "bg-white text-[#162660] border-[#4A3B2C]/30 hover:border-[#162660]"
                }`}
              >
                {active ? `✓ ${area}` : area}
              </button>
            );
          })}
        </div>

        {/* ── Notes for the AI Chatbot ── */}
        <SectionTitle>
          Notes for the AI Chatbot <span className="normal-case font-bold text-[#162660]/50">(optional)</span>
        </SectionTitle>
        <textarea
          rows={3}
          className="w-full min-h-[88px] bg-[#F8F1E5] border-2 border-[#4A3B2C] rounded-2xl p-3.5 text-sm font-semibold text-[#162660] focus:outline-none focus:border-[#162660] focus:ring-2 focus:ring-[#162660]/20 resize-y leading-relaxed placeholder:text-xs placeholder:font-medium placeholder:text-[#162660]/40 block"
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
          placeholder='e.g., "Has ADHD, responds well to visual schedules and positive encouragement."'
        />

        {/* ── Save / Cancel Actions ── */}
        <div className="flex gap-3 mt-5 pt-3 border-t-2 border-[#4A3B2C]/15">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 aralkada-btn-outline text-xs cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 py-2.5 aralkada-btn-primary text-xs cursor-pointer"
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}
