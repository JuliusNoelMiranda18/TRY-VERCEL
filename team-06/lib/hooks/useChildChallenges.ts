"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ChildChallenge,
  ChildAction,
  INITIAL_CHALLENGES,
  INITIAL_ACTIONS,
} from "@/lib/constants/challenges";

const CHALLENGES_KEY = "kith_child_challenges_v3";
const ACTIONS_KEY = "kith_child_actions_v3";

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length === 0) return fallback;
    return parsed as T;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // quota exceeded — ignore
  }
}

export function useChildChallenges(childId: string) {
  const [challenges, setChallenges] = useState<ChildChallenge[]>(INITIAL_CHALLENGES);
  const [actions, setActions] = useState<ChildAction[]>(INITIAL_ACTIONS);

  useEffect(() => {
    setChallenges(loadFromStorage(CHALLENGES_KEY, INITIAL_CHALLENGES));
    setActions(loadFromStorage(ACTIONS_KEY, INITIAL_ACTIONS));
  }, []);

  // Filtered by selected child
  const childChallenges = challenges.filter((c) => c.childId === childId);
  const childActions = actions.filter((a) => a.childId === childId);

  const addChallenge = useCallback((challenge: Omit<ChildChallenge, "id">) => {
    setChallenges((prev) => {
      const newChallenge: ChildChallenge = {
        ...challenge,
        id: `ch-${Date.now()}`,
      };
      const next = [newChallenge, ...prev];
      saveToStorage(CHALLENGES_KEY, next);
      return next;
    });
  }, []);

  const toggleChallengeStatus = useCallback((id: string) => {
    setChallenges((prev) => {
      const next: ChildChallenge[] = prev.map((c) =>
        c.id === id
          ? { ...c, status: (c.status === "ongoing" ? "done" : "ongoing") as "ongoing" | "done" }
          : c
      );
      saveToStorage(CHALLENGES_KEY, next);
      return next;
    });
  }, []);

  const addAction = useCallback((action: Omit<ChildAction, "id">) => {
    setActions((prev) => {
      const newAction: ChildAction = {
        ...action,
        id: `act-${Date.now()}`,
      };
      const next = [newAction, ...prev];
      saveToStorage(ACTIONS_KEY, next);
      return next;
    });
  }, []);

  const toggleActionStatus = useCallback((id: string) => {
    setActions((prev) => {
      const next: ChildAction[] = prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status: (a.status === "pending" ? "completed" : "pending") as
                | "pending"
                | "completed",
            }
          : a
      );
      saveToStorage(ACTIONS_KEY, next);
      return next;
    });
  }, []);

  const approveAction = useCallback((idOrTitle: string) => {
    setActions((prev) => {
      const next: ChildAction[] = prev.map((a) =>
        a.id === idOrTitle || a.title.toLowerCase() === idOrTitle.toLowerCase()
          ? { ...a, status: "completed" as const }
          : a
      );
      saveToStorage(ACTIONS_KEY, next);
      return next;
    });
  }, []);

  return {
    childChallenges,
    childActions,
    addChallenge,
    toggleChallengeStatus,
    addAction,
    toggleActionStatus,
    approveAction,
  };
}
