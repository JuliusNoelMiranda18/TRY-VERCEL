"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ChildAnalytics,
  RewardConfig,
  DEFAULT_REWARD_CONFIG,
  MOCK_CHILDREN_LIST,
} from "@/lib/constants/analytics";

const CHILDREN_KEY = "aralkada_children";
const REWARD_KEY = "aralkada_reward_config";

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage quota exceeded or private browsing — fail silently
  }
}

/* ─── Age → Daily screen-time cap (WHO/AAP guidelines) ─── */
export function getAgeCap(age: number): number {
  if (age <= 5) return 60;        // 2–5 years: 1 hour
  if (age <= 12) return 120;      // 6–12 years: 2 hours
  return 240;                     // 13–18 years: 4 hours
}

/* ─── Mi formula: Mi = round(di × Di × Wi) ─── */
export type FrictionLevel = "low" | "moderate" | "high";
export type BehaviorCategory = "physical" | "social" | "academic" | "emotional";

const FRICTION_MAP: Record<FrictionLevel, number> = {
  low: 0.75,
  moderate: 1.0,
  high: 1.25,
};
const BEHAVIOR_MAP: Record<BehaviorCategory, number> = {
  physical: 1.0,
  social: 1.1,
  academic: 1.2,
  emotional: 1.3,
};

export function computeEarnedMinutes(
  durationMin: number,
  friction: FrictionLevel,
  category: BehaviorCategory
): number {
  return Math.round(durationMin * FRICTION_MAP[friction] * BEHAVIOR_MAP[category]);
}

/* ─── Hook ─── */
export function useChildProfiles() {
  const [children, setChildren] = useState<ChildAnalytics[]>(MOCK_CHILDREN_LIST);
  const [rewardConfig, setRewardConfig] = useState<RewardConfig>(DEFAULT_REWARD_CONFIG);

  // Hydrate from localStorage once client is mounted
  useEffect(() => {
    setChildren(loadFromStorage(CHILDREN_KEY, MOCK_CHILDREN_LIST));
    setRewardConfig(loadFromStorage(REWARD_KEY, DEFAULT_REWARD_CONFIG));
  }, []);

  // Persist children
  const updateChild = useCallback((updated: ChildAnalytics) => {
    setChildren((prev) => {
      const next = prev.map((c) => (c.childId === updated.childId ? updated : c));
      saveToStorage(CHILDREN_KEY, next);
      return next;
    });
  }, []);

  // Persist reward config
  const updateRewardConfig = useCallback((updated: RewardConfig) => {
    setRewardConfig(updated);
    saveToStorage(REWARD_KEY, updated);
  }, []);

  // Add new child (from the Link Child modal)
  const addChild = useCallback((child: ChildAnalytics) => {
    setChildren((prev) => {
      const next = [...prev, child];
      saveToStorage(CHILDREN_KEY, next);
      return next;
    });
  }, []);

  return { children, rewardConfig, updateChild, updateRewardConfig, addChild };
}
