"use client";

import { useState, useRef, useEffect } from "react";

/* ─── Types ─────────────────────────────────────────────── */
type ResourceType = "book" | "strategy" | "activity" | "article" | "task" | "framework" | "guardrail";

interface Resource {
  title: string;
  type: ResourceType;
  description: string;
}

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
  resources?: Resource[];
  highlight?: "reflection" | "guardrail" | "framework";
}

/**
 * Scripted RAG Conversation Phases:
 *
 *  welcome          → bot shows opening greeting
 *  awaiting_concern → parent types the Leo concern
 *  details_asked    → bot asked for more details
 *  details_given    → parent gave details → bot summarises + offers suggestion
 *  offer_made       → bot asked "should I suggest how to handle it?"
 *  yes_received     → parent said "yes" → bot gives CASEL + Dweck response
 *  followup         → parent types the self-harm question → guardrail fires
 *  done             → conversation complete, freeform allowed
 */
type Phase =
  | "welcome"
  | "awaiting_concern"
  | "details_asked"
  | "details_given"
  | "offer_made"
  | "yes_received"
  | "followup"
  | "done";

/* ══════════════════════════════════════════════════════════
   HARDCODED SCRIPTED MESSAGES
══════════════════════════════════════════════════════════ */

const SCRIPT = {
  /** Step 0 – Bot welcome */
  welcome:
    "Hi! I'm here to help you navigate your child's emotional growth and build healthier habits together. What's on your mind today?",

  /** Step 1 – Parent says (hardcoded chip): "My child Leo gets easily discouraged when failing" */
  parentConcern: "My child Leo gets easily discouraged when failing",

  /** Step 2 – Bot asks for more details */
  askDetails:
    "Thank you for sharing that. To make sure I understand Leo's situation fully, could you tell me a bit more?\n\n• How does Leo typically react in the moment — does he shut down, cry, get angry, or withdraw?\n• What kinds of tasks or situations tend to trigger this discouragement the most?\n• How long has this pattern been going on?\n\nThe more you share, the more tailored my guidance can be for Leo.",

  /** Step 3 – Parent gives details (hardcoded chip) */
  parentDetails:
    "He usually shuts down and refuses to try again. It happens mostly during board games and homework. He'll say things like \"I'm just bad at this\" and walk away. It's been going on for about 3 months.",

  /** Step 4 – Bot reflects back + offers to suggest */
  reflection:
    "Thank you — that gives me a much clearer picture. Let me reflect back what I'm hearing:\n\n📋 Leo, when he fails or struggles, tends to shut down completely, says fixed statements like \"I'm just bad at this,\" and withdraws — particularly in board games and during homework. This pattern has been consistent for about 3 months.\n\nWhat you're describing sounds like a classic **fixed mindset response to failure** combined with early signs of low frustration tolerance — both of which are very common and, importantly, very treatable at his developmental stage.\n\nShould I suggest strategies on how to handle this based on the latest child development frameworks?",

  /** Step 5 – Parent types "yes" */

  /** Step 6 – Bot's CASEL + Carol Dweck framework-based response */
  frameworkResponse: {
    intro:
      "Absolutely. Based on two of the most evidence-backed frameworks in child development — **CASEL's Social-Emotional Learning** and **Carol Dweck's Growth Mindset** research — here is a personalised approach for Leo:",
    resources: [
      {
        title: "CASEL: Self-Management — Rebuild Frustration Tolerance",
        type: "framework" as ResourceType,
        description:
          "Leo's shutdown response is a Self-Management deficit (CASEL Competency 2). His emotional brain is overriding his thinking brain the moment failure is perceived. The evidence-based response: establish a \"Calm-Down Reset\" ritual — when Leo says 'I give up', calmly say: 'Your emotional brain is in the driver's seat. Let's take 3 breaths and come back to one small piece of this together.' Never reason during the flood state; wait for full de-escalation first.",
      },
      {
        title: "CASEL: Self-Awareness — Name the Feeling First",
        type: "framework" as ResourceType,
        description:
          "Before redirecting Leo, help him identify the emotion (CASEL Competency 1). Use the in-the-moment script: 'I can see your body is tense and you want to walk away. It looks like you're feeling really frustrated — does that feel right?' Naming the emotion reduces its intensity in the brain (affect labelling) and opens the window for learning.",
      },
      {
        title: "Carol Dweck: The \"Not Yet\" Language Shift",
        type: "framework" as ResourceType,
        description:
          "When Leo says 'I'm just bad at this', he is expressing a fixed mindset belief — the belief that ability is permanent and unchangeable. Dweck's research shows that adding two words changes everything. Help Leo rephrase: 'I'm not good at this YET — but my brain is building the pathway right now.' Make it a family rule: when anyone says 'I can't', someone gently adds '…yet!' Dweck's EEG studies show this simple shift keeps the brain cognitively engaged instead of disengaging.",
      },
      {
        title: "Carol Dweck: Praise Effort, Not Outcome",
        type: "framework" as ResourceType,
        description:
          "Avoid: 'You're so smart!' or 'You're great at this game!' — these create a fragile self-image that collapses under difficulty. Instead use Process Praise: 'I loved how you tried three different strategies on that puzzle before asking for help' or 'You kept going for 10 whole minutes even when it was hard — that focus is building your brain.' Praise the effort + strategy + progress, never the result or the trait.",
      },
      {
        title: "Immediate Action: The 5-Step Failure Moment Protocol",
        type: "task" as ResourceType,
        description:
          "Apply this the next time Leo shuts down — (1) Acknowledge: 'I see how frustrated you are, and that's completely okay.' (2) Normalise: 'Everyone struggles — even adults and professional athletes.' (3) Celebrate the attempt: 'I'm so proud you tried at all.' (4) Introduce brain growth: 'Right now your brain is building new connections because this is hard.' (5) Invite one tiny try: 'Let's just try one small piece together — you don't have to finish, just one step.' This sequence is adapted from Dweck's Failure Reframing Protocol and CASEL's 5-Step Emotion Coaching model.",
      },
    ] as Resource[],
  },

  /** Step 7 – Parent asks: "Do you think he will hurt himself?" */
  parentFollowup: "Do you think he will hurt himself?",

  /** Step 8 – Guardrail response */
  guardrail:
    "I want to take your question seriously — it's a caring and important one to ask.\n\nHowever, I need to be transparent with you: **this chatbot is not equipped to assess risk of self-harm or make clinical determinations about a child's safety.** That requires a qualified mental health professional who can evaluate Leo in person.\n\nWhat I can tell you is this: if Leo is showing any of the following signs, please seek professional support immediately:\n\n🔴 Expressing explicit statements about wanting to hurt himself\n🔴 Self-injurious behaviour (hitting himself, head-banging, scratching)\n🔴 Severe withdrawal from all social contact and activities\n🔴 Loss of previously mastered skills or significant behavioural regression\n\nFor immediate concerns, please contact:\n• Your child's paediatrician or school psychologist\n• A licensed child and adolescent therapist (LCAT)\n• Crisis helpline: **Hopeline PH — 0917-558-4673** (Philippines)\n\nYou are doing the right thing by paying close attention to Leo. Please do not hesitate to escalate to a professional if your instincts are telling you something is wrong.",
};

/* ══════════════════════════════════════════════════════════
   FREEFORM FALLBACK (for after the scripted flow)
══════════════════════════════════════════════════════════ */
const FREEFORM_RESPONSES: { match: string; intro: string; resources?: Resource[] }[] = [
  {
    match: "meltdown",
    intro: "Screen-time transition meltdowns are very common. The CASEL Self-Management framework recommends building a pre-transition ritual — give a 5-minute visual countdown, then guide your child through the Stop-Breathe-Think sequence.",
  },
  {
    match: "focus",
    intro: "Difficulty sustaining attention after screen time is linked to dopamine contrast. CASEL recommends Task Chunking: 20-minute focus blocks with 5-minute movement breaks, gradually extending over 3 weeks.",
  },
];

/* ─── Helpers ────────────────────────────────────────────── */
const RESOURCE_COLORS: Record<ResourceType, string> = {
  book:       "bg-[#D0E6FD] border-[#162660] text-[#162660]",
  strategy:   "bg-[#E8DAC4] border-[#4A3B2C] text-[#4A3B2C]",
  activity:   "bg-[#D4EDDA] border-[#276749] text-[#276749]",
  article:    "bg-[#F8F1E5] border-[#4A3B2C] text-[#162660]",
  task:       "bg-[#EDE7F6] border-[#5C35A8] text-[#5C35A8]",
  framework:  "bg-[#E3F2FD] border-[#1565C0] text-[#1565C0]",
  guardrail:  "bg-[#FFF3E0] border-[#E65100] text-[#E65100]",
};

const RESOURCE_LABELS: Record<ResourceType, string> = {
  book:      "Book",
  strategy:  "Strategy",
  activity:  "Activity",
  article:   "Article",
  task:      "Habit Task",
  framework: "Framework",
  guardrail: "Safety Note",
};

const BotIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="3" y="8" width="18" height="12" rx="3" strokeWidth="2" />
    <circle cx="9" cy="13" r="1.5" fill="currentColor" />
    <circle cx="15" cy="13" r="1.5" fill="currentColor" />
    <path strokeLinecap="round" strokeWidth="2" d="M10 17h4M12 4v4M9 4h6" />
  </svg>
);

const ResourceIcon = ({ type }: { type: ResourceType }) => {
  if (type === "framework") return (
    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  );
  if (type === "guardrail") return (
    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );
  if (type === "task") return (
    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  );
  return (
    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );
};

function formatTime(d: Date) {
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function uid() { return Date.now().toString() + Math.random().toString(36).slice(2); }

/* ══════════════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════════════ */
export default function ChatbotPage() {
  const [messages, setMessages]     = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [phase, setPhase]           = useState<Phase>("welcome");
  const [currentTime, setCurrentTime] = useState("");
  const endRef   = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* Mount: pre-load the full hardcoded scripted conversation */
  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    const t = new Date();
    const preloaded: Message[] = [
      // Bot welcome
      { id: uid(), role: "bot",  content: SCRIPT.welcome,          timestamp: t },
      // Parent concern (hardcoded)
      { id: uid(), role: "user", content: SCRIPT.parentConcern,    timestamp: t },
      // Bot asks for details
      { id: uid(), role: "bot",  content: SCRIPT.askDetails,       timestamp: t },
      // Parent gives details (hardcoded)
      { id: uid(), role: "user", content: SCRIPT.parentDetails,    timestamp: t },
      // Bot reflects + offers suggestion
      { id: uid(), role: "bot",  content: SCRIPT.reflection,       timestamp: t, highlight: "reflection" },
    ];
    setMessages(preloaded);
    // Conversation starts here — user will type from this point
    setPhase("offer_made");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Auto-scroll */
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isBotTyping]);

  /* ── Core send function ─────────────────────────────── */
  function handleSend(text: string = inputValue) {
    const trimmed = text.trim();
    if (!trimmed || isBotTyping) return;

    // Add user message
    const userMsg: Message = { id: uid(), role: "user", content: trimmed, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");

    const t = trimmed.toLowerCase();

    /* ── SCRIPTED PHASE MACHINE ── */

    // Phase: awaiting parent's concern about Leo
    if (phase === "awaiting_concern") {
      setPhase("details_asked");
      botReply(SCRIPT.askDetails, {}, 1200);
      return;
    }

    // Phase: parent just gave details
    if (phase === "details_asked") {
      setPhase("offer_made");
      botReply(SCRIPT.reflection, { highlight: "reflection" }, 1600);
      return;
    }

    // Phase: bot offered to suggest — parent says yes
    if (phase === "offer_made") {
      if (t === "yes" || t.includes("yes") || t.includes("sure") || t.includes("please")) {
        setPhase("yes_received");
        botReply(
          SCRIPT.frameworkResponse.intro,
          { resources: SCRIPT.frameworkResponse.resources, highlight: "framework" },
          1800
        );
        return;
      }
      // Parent said no or something else
      setPhase("done");
      botReply("Of course — I'm here whenever you're ready. Feel free to ask anything else about Leo or another concern.", {}, 1000);
      return;
    }

    // Phase: after framework was shown — ANY second message always fires the guardrail
    if (phase === "yes_received") {
      setPhase("followup");
      botReply(SCRIPT.guardrail, { highlight: "guardrail" }, 1400);
      return;
    }

    // Phase: followup — subsequent messages also trigger guardrail if self-harm related
    if (phase === "followup") {
      if (
        t.includes("hurt") ||
        t.includes("harm") ||
        t.includes("self harm") ||
        t.includes("self-harm") ||
        t.includes("injure") ||
        t.includes("suicide") ||
        t.includes("kill")
      ) {
        botReply(SCRIPT.guardrail, { highlight: "guardrail" }, 1400);
        return;
      }
    }

    // FREEFORM FALLBACK
    setPhase("done");
    const match = FREEFORM_RESPONSES.find(r => t.includes(r.match));
    const resp = match ?? FREEFORM_RESPONSES[0];
    botReply(resp.intro, { resources: resp.resources }, 1200);
  }

  function botReply(content: string, extra: Partial<Message> = {}, delay = 1200) {
    setIsBotTyping(true);
    setTimeout(() => {
      const msg: Message = { id: uid(), role: "bot", content, timestamp: new Date(), ...extra };
      setMessages(prev => [...prev, msg]);
      setIsBotTyping(false);
    }, delay);
  }

  /* ── Dynamic placeholder ────────────────────────────── */
  const placeholder =
    phase === "offer_made"   ? 'Type "yes" to receive strategies…' :
    phase === "yes_received" ? "Ask a follow-up question…" :
    "Ask anything else…";

  /* ── Phase label ───────────────────────────────────── */
  const phaseLabel: Partial<Record<Phase, string>> = {
    awaiting_concern: "Step 1 — Share concern",
    details_asked:    "Step 2 — Add details",
    offer_made:       "Step 3 — Confirm",
    yes_received:     "Step 4 — Review strategies",
    followup:         "Safety check",
    done:             "Conversation complete",
  };

  return (
    <div className="h-full flex flex-col min-h-[520px]">

      {/* ── Header ── */}
      <div className="shrink-0 flex items-center justify-between pb-3 border-b-2 border-[#4A3B2C]/20 mb-4">
        <div>
          <h1 className="text-2xl font-black text-[#162660] tracking-tight">Parent Coaching Chatbot</h1>
          <p className="text-[10px] font-bold text-[#162660]/50 mt-0.5 uppercase tracking-widest">
            CASEL &amp; Growth Mindset — RAG Framework
          </p>
        </div>
        <div className="hidden sm:flex flex-col items-end gap-1">
          <span className="text-xs font-black text-[#162660]">Parent</span>
          <span className="text-[10px] font-bold text-[#162660]/60">
            {currentTime ? `${currentTime}, today` : "Today"}
          </span>
          {phaseLabel[phase] && (
            <span className="px-2 py-0.5 rounded-full bg-[#D0E6FD] border border-[#162660] text-[9px] font-black uppercase tracking-wider text-[#162660]">
              {phaseLabel[phase]}
            </span>
          )}
        </div>
      </div>

      {/* ── Message area ── */}
      <div className="flex-1 min-h-[350px] overflow-y-auto py-6 flex flex-col gap-4 px-4 mx-[-4px] rounded-2xl bg-[#E8DAC4]/60 border border-[#4A3B2C]/10">
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>

            {/* Avatar */}
            <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-sm font-black border-2 shadow-[0_2px_0] ${
              msg.role === "user"
                ? "bg-[#162660] text-[#F1E4D1] border-[#0D1638] shadow-[#0D1638]"
                : "bg-[#E8DAC4] text-[#162660] border-[#4A3B2C] shadow-[#4A3B2C]"
            }`}>
              {msg.role === "user" ? "P" : <BotIcon className="w-4 h-4 text-[#162660]" />}
            </div>

            {/* Bubble + cards */}
            <div className={`flex flex-col gap-2 max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
              <div className={`px-4 py-3 rounded-2xl border-2 text-sm font-bold leading-relaxed whitespace-pre-line ${
                msg.role === "user"
                  ? "bg-[#162660] text-[#F1E4D1] border-[#0D1638] shadow-[0_3px_0_#0D1638] rounded-tr-sm"
                  : msg.highlight === "reflection"
                  ? "bg-[#FFF8E1] text-[#162660] border-[#F6C43E] shadow-[0_3px_0_#C49A10] rounded-tl-sm"
                  : msg.highlight === "guardrail"
                  ? "bg-[#FFF3E0] text-[#BF360C] border-[#E65100] shadow-[0_3px_0_#BF360C] rounded-tl-sm"
                  : msg.highlight === "framework"
                  ? "bg-[#E8EAF6] text-[#162660] border-[#162660] shadow-[0_3px_0_#162660] rounded-tl-sm"
                  : "bg-white text-[#162660] border-[#4A3B2C] shadow-[0_3px_0_#4A3B2C] rounded-tl-sm"
              }`}>
                {msg.content}
              </div>

              {/* Resource cards */}
              {msg.resources && (
                <div className="flex flex-col gap-2 w-full">
                  {msg.resources.map((res, i) => (
                    <div key={i} className={`rounded-xl border-2 p-3 ${RESOURCE_COLORS[res.type]}`}>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <ResourceIcon type={res.type} />
                        <span className="text-[10px] font-black uppercase tracking-wider">
                          {RESOURCE_LABELS[res.type]}
                        </span>
                      </div>
                      <p className="text-xs font-black leading-snug mb-1">{res.title}</p>
                      <p className="text-[11px] font-bold opacity-85 leading-relaxed">{res.description}</p>
                    </div>
                  ))}
                </div>
              )}

              <span className="text-[9px] font-bold text-[#162660]/40 px-1">{formatTime(msg.timestamp)}</span>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isBotTyping && (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#E8DAC4] border-2 border-[#4A3B2C] shadow-[0_2px_0_#4A3B2C] flex items-center justify-center">
              <BotIcon className="w-4 h-4 text-[#162660]" />
            </div>
            <div className="bg-white border-2 border-[#4A3B2C] shadow-[0_3px_0_#4A3B2C] rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-[#162660]/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 bg-[#162660]/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 bg-[#162660]/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}

        <div ref={endRef} />
      </div>



      {/* ── Input bar ── */}
      <div className="shrink-0 pt-3 border-t-2 border-[#4A3B2C]/20">
        <form
          onSubmit={e => { e.preventDefault(); handleSend(); }}
          className="flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder={placeholder}
            disabled={isBotTyping}
            className="flex-1 px-4 py-3 aralkada-input text-sm disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isBotTyping}
            className="w-11 h-11 rounded-xl bg-[#162660] border-2 border-[#0D1638] shadow-[0_3px_0_#0D1638] flex items-center justify-center text-[#F1E4D1] hover:bg-[#121F50] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer active:translate-y-[3px] active:shadow-none shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
        <p className="text-[9px] font-bold text-[#162660]/40 text-center mt-1.5">
          This chatbot provides educational guidance only · Not a substitute for professional mental health advice
        </p>
      </div>

    </div>
  );
}
