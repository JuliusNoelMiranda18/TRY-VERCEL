export type LearningStyle = "Visual" | "Auditory" | "Kinesthetic" | "Reading-Writing";
export type AttentionSpan = "short" | "medium" | "long";
export type ScreenFreeZone = "Mealtimes" | "Bedroom" | "1hr Before Bed" | "Morning";

export const FOCUS_AREA_OPTIONS = [
  "Emotional Regulation",
  "Homework & Academic Focus",
  "Sharing & Social Skills",
  "Friendship & Peer Relationships",
  "Handling Frustration / Losing",
  "Following Routines & Instructions",
  "Physical Activity Habits",
  "Screen Time Balance",
] as const;

export type FocusArea = typeof FOCUS_AREA_OPTIONS[number];

export interface CustomTask {
  id: string;
  name: string;
  durationMin: number;
  earnedMin: number;
}

export interface RewardConfig {
  mode: "ai" | "custom";
  customTasks: CustomTask[];
  freeActivities: string[];
  customDailyCap: number; // minutes
}

export interface ChildProfile {
  age: number;
  grade: string;
  personality: string;
  learningStyles: LearningStyle[];
  attentionSpan: AttentionSpan;
  focusAreas: FocusArea[];
  screenFreeZones: ScreenFreeZone[];
  notes: string;
}

export interface ChildAnalytics {
  childId: string;
  childName: string;
  avatarLetter: string;
  avatarColor: string;
  challenges: {
    ongoing: number;
    done: number;
  };
  actions: {
    ongoing: number;
    done: number;
  };
  tokens: {
    earnedHours: number;
    usedHours: number;
    remainingHours: number;
    totalTokens: number;
  };
  profile: ChildProfile;
}

export const DEFAULT_REWARD_CONFIG: RewardConfig = {
  mode: "ai",
  customTasks: [],
  freeActivities: ["Outdoor play", "Drawing / creative play", "Reading for fun"],
  customDailyCap: 120,
};

export const MOCK_CHILDREN_LIST: ChildAnalytics[] = [
  {
    childId: "kid-101",
    childName: "Leo",
    avatarLetter: "L",
    avatarColor: "#162660",
    challenges: { ongoing: 3, done: 8 },
    actions: { ongoing: 5, done: 19 },
    tokens: {
      earnedHours: 4.5,
      usedHours: 2.0,
      remainingHours: 2.5,
      totalTokens: 90,
    },
    profile: {
      age: 8,
      grade: "Grade 3",
      personality: "Energetic and curious",
      learningStyles: ["Kinesthetic", "Visual"],
      attentionSpan: "medium",
      focusAreas: ["Homework & Academic Focus", "Emotional Regulation"],
      screenFreeZones: ["Mealtimes", "1hr Before Bed"],
      notes: "",
    },
  },
  {
    childId: "kid-102",
    childName: "Maya",
    avatarLetter: "M",
    avatarColor: "#162660",
    challenges: { ongoing: 2, done: 11 },
    actions: { ongoing: 4, done: 22 },
    tokens: {
      earnedHours: 5.0,
      usedHours: 1.5,
      remainingHours: 3.5,
      totalTokens: 110,
    },
    profile: {
      age: 10,
      grade: "Grade 5",
      personality: "Creative and empathetic",
      learningStyles: ["Visual", "Reading-Writing"],
      attentionSpan: "long",
      focusAreas: ["Sharing & Social Skills", "Handling Frustration / Losing"],
      screenFreeZones: ["Mealtimes", "Bedroom"],
      notes: "",
    },
  },
];

export const MOCK_CHILD_ANALYTICS: ChildAnalytics = MOCK_CHILDREN_LIST[0];
