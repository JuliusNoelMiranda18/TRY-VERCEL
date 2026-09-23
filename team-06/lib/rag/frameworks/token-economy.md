# Earned Access Token Economy Framework

## Overview

A Token Economy is a behavior management system rooted in Applied Behavior Analysis (ABA) principles that has been adapted for non-clinical home use. Within this app, it operates on the **Earned Access** principle: privileges (such as screen time, special treats, or autonomy perks) are treated not as default entitlements, but as opportunities earned through positive, target behaviors. Rather than relying on punitive measures—which often trigger power struggles, anxiety, or defiance in children aged 5–12—token economies leverage positive reinforcement to make expectations clear, predictable, and visual. Over time, as children consistently connect their efforts with positive outcomes, external tokens and direct time-earning mechanisms act as a temporary scaffold that gradually transitions external compliance into intrinsic self-regulation, autonomy, and lasting habit formation.

---

## Token Types

### Token Type 1 — Direct Screen-Time Access (Time Tokens)

* **Represents:** Direct earned digital screen access time (tablets, gaming consoles, TV, or smartphone access).
* **Earned by:** Completing academic tasks, physical activity challenges, or daily offline responsibilities.
* **Redeemed for:** Blocks of verified screen time or gaming access.
* **Exchange rate:** Direct 1:1 Base Ratio adjusted by task difficulty ($M_i = \text{round}(d_i \times D_i \times W_i)$).
* **Parent tip:** Always enforce clear start and end boundaries using a visual timer when redeemed time is activated to avoid transition meltdowns.

---

### Token Type 2 — Privilege Tokens

* **Represents:** Decision-making power, autonomy, and household perks.
* **Earned by:** Demonstrating consistent emotional regulation, taking responsibility for chores without reminders, or completing challenge streaks.
* **Redeemed for:** Choosing family movie night, skipping one minor chore, picking dinner for the night, or control over the car radio.
* **Exchange rate:** 5 Privilege Tokens = 1 privilege redemption (or equivalent to 30 minutes of earned task credit).
* **Parent tip:** Ensure privileges offered do not undermine family rules or safety (e.g., skipping a chore should not mean leaving an unsafe mess).

---

### Token Type 3 — Social / Experience Tokens

* **Represents:** Shared connection moments, family outings, or special peer activities.
* **Earned by:** Displaying interpersonal skills, unprompted sharing, helping a sibling, or completing social-emotional challenges.
* **Redeemed for:** Hosting a playdate, a 1-on-1 outing with a parent (e.g., getting ice cream), or staying up 30 minutes late on a weekend night.
* **Exchange rate:** 10 Experience Tokens = 1 major experience or social activity.
* **Parent tip:** Frame these redemptions around relationship-building and connection rather than material rewards.

---

## Earning Rules — What Actions Generate Tokens

The core calculation engine computes direct earned minutes ($M_i$) using task duration ($d_i$), friction multiplier ($D_i$), and behavioral weight ($W_i$):

$$M_i = \text{round}(d_i \times D_i \times W_i)$$

Where $D_i$ represents Friction:

* **Low Friction ($0.75$):** Simple single-step routines.
* **Moderate Friction ($1.00$):** Standard structured focus tasks.
* **High Friction ($1.25$):** High cognitive/emotional load.

And $W_i$ represents Category Behavioral Weight:

$$W_i = \begin{cases}  1.30 & \text{Emotional Regulation / Mindfulness (Highest cognitive effort)} \\ 1.20 & \text{Academic / Deep Focus} \\ 1.10 & \text{Interpersonal / Social Skills} \\ 1.00 & \text{Physical Activity / Household Chores} \end{cases}$$

### A. Academic Tasks

| Task | Tokens / Minutes Earned | Frequency | Rationale |
| --- | --- | --- | --- |
| Complete homework without reminders (30m, High Friction) | 45 Screen Mins ($30 \times 1.25 \times 1.20$) | Daily | Reinforces task initiation, autonomy, and reduces evening nagging friction. |
| Read independently (30m, Moderate Friction) | 36 Screen Mins ($30 \times 1.00 \times 1.20$) | Daily | Builds literacy habits and deep-focus engagement (flow state). |
| Complete weekly study or skill review (45m, Moderate Friction) | 54 Screen Mins ($45 \times 1.00 \times 1.20$) | Weekly | Encourages long-term goal planning and sustained effort. |

### B. Social / Interpersonal Tasks

| Task | Tokens / Minutes Earned | Frequency | Rationale |
| --- | --- | --- | --- |
| Share a toy or game unprompted (10m, Moderate Friction) | 11 Screen Mins ($10 \times 1.00 \times 1.10$) | Daily | Promotes empathy, prosocial awareness, and cooperative habits. |
| Use "I-messages" during a sibling conflict (10m, High Friction) | 14 Screen Mins ($10 \times 1.25 \times 1.10$) | Daily | Translates conflict resolution concepts into active, real-time practice. |
| Complete a family contribution project (30m, Moderate Friction) | 33 Screen Mins ($30 \times 1.00 \times 1.10$) | Weekly | Connects individual action to group well-being and purpose. |

### C. Emotional Regulation Tasks

| Task | Tokens / Minutes Earned | Frequency | Rationale |
| --- | --- | --- | --- |
| Use a calm-down strategy during frustration (10m, High Friction) | 16 Screen Mins ($10 \times 1.25 \times 1.30$) | Daily | Rewards active self-management and impulse control in high-arousal moments. |
| Identify and name a big emotion accurately (5m, Moderate Friction) | 7 Screen Mins ($5 \times 1.00 \times 1.30$) | Daily | Strengthens self-awareness and emotional vocabulary. |
| Complete an evening feelings check-in (10m, Low Friction) | 10 Screen Mins ($10 \times 0.75 \times 1.30$) | Daily | Establishes a daily reflection ritual for emotional processing. |

### D. Physical / Offline Tasks

| Task | Tokens / Minutes Earned | Frequency | Rationale |
| --- | --- | --- | --- |
| Play outside / sports (30m, Moderate Friction) | 30 Screen Mins ($30 \times 1.00 \times 1.00$) | Daily | Encourages physical well-being and balances sedentary screen habits. |
| Complete an offline creative project (20m, Moderate Friction) | 20 Screen Mins ($20 \times 1.00 \times 1.00$) | Daily | Fosters intrinsic creativity, hands-on play, and focus. |
| Screen-free transition after school (45m, Low Friction) | 34 Screen Mins ($45 \times 0.75 \times 1.00$) | Daily | Establishes a calm transitional boundary between school and home. |

### E. Responsibility / Chore Tasks

| Task | Tokens / Minutes Earned | Frequency | Rationale |
| --- | --- | --- | --- |
| Pack school bag and prep clothes (10m, Low Friction) | 8 Screen Mins ($10 \times 0.75 \times 1.00$) | Daily | Eliminates morning decision fatigue and reduces stress transitions. |
| Clean bedroom floor/clutter (15m, Moderate Friction) | 15 Screen Mins ($15 \times 1.00 \times 1.00$) | Daily | Establishes environment design principles and friction reduction. |
| Clear dinner dishes to dishwasher (5m, Low Friction) | 4 Screen Mins ($5 \times 0.75 \times 1.00$) | Daily | Teaches shared responsibility and family team participation. |

### F. Bonus / Stretch Challenges

| Task | Tokens / Minutes Earned | Frequency | Rationale |
| --- | --- | --- | --- |
| Help a neighbor or friend unprompted (20m, High Friction) | 28 Screen Mins ($20 \times 1.25 \times 1.10$) | One-time | Encourages altruism, social awareness, and community connection. |
| Complete a full 7-day challenge streak | 60 Bonus Screen Mins | One-time | Builds grit, perseverance, and long-term goal tracking skills. |

---

## Redemption Rules

### Redeemable Rewards

| Reward | Token / Minutes Cost | Notes |
| --- | --- | --- |
| 30 minutes of extra screen time | 30 Earned Mins | Subject to non-negotiable hard daily limits. |
| Choose the family dinner menu | 5 Privilege Tokens (or 30 Earned Mins) | Parent sets nutritional boundaries; child picks main dish. |
| Skip one daily chore | 5 Privilege Tokens (or 30 Earned Mins) | Cannot be combined on consecutive days. |
| Stay up 30 minutes past bedtime | 8 Tokens / 45 Earned Mins | Weekend or non-school nights only. |
| Special 1-on-1 parent outing | 10 Experience Tokens / 60 Earned Mins | Requires 24-hour advance scheduling. |

### Non-Negotiable Rules (Cannot be purchased with tokens)

1. **Bedtime Limits:** Bedtime cannot be moved by more than 30–60 minutes regardless of total earned minutes accumulated.
2. **Global Daily Screen Caps:** Regardless of tasks completed or manual settings applied, the system enforces non-negotiable daily screen time limits based on age brackets:
* **2 to 5 years:** 1 hour max per day
* **6 to 12 years:** 2 hours max per day
* **13 to 18 years:** 4 hours max per day


3. **Basic Needs & Love Are Free:** Tokens and earned minutes can never buy basic care, affection, meals, bedtime comforts, or essential items.
4. **No School Hours Distractions:** Earned screen time cannot be redeemed during school hours, dedicated homework blocks, or family meal times.

---

## Setting Up the System — Parent Guide

**Step 1:** Frame It as Earning, Not Withholding. Introduce the system during a calm moment: "You're getting bigger, so you get to start earning your own privileges and picking your rewards!" Avoid presenting it as a punitive takeaway.

**Step 2:** Co-Create the Reward Menu. Sit down together and let your child brainstorm rewards they genuinely want. Ensure at least half the menu consists of non-material experiences and decision-making privileges alongside screen time.

**Step 3:** Start Small with Easy Wins. Grant a small starter balance on Day 1. Choose 2 or 3 simple, achievable target behaviors so your child experiences the gratification of earning and redeeming time within the first 24–48 hours.

**Step 4:** Keep Administration Immediate and Visual. Award credit immediately after target behavior occurs. Use the app's visual dashboard counter so progress remains visible and tangible.

**Step 5:** Enforce Zero Token Fines (Never Revoke Tokens/Minutes). Earned minutes are permanent property. If your child misbehaves, handle it with natural consequences or boundary enforcement—do not take away previously earned time.

**Step 6:** Review and Recalibrate Weekly. Use weekly family check-ins to review progress. As target behaviors become automatic habits, gradually introduce new stretch challenges while keeping basic earning opportunities predictable.

---

## Age-Based Calibration

| Age | Max Wait | Daily Cap | Challenge Complexity | Reward Menu Size |
| --- | --- | --- | --- | --- |
| **5–6** | Same day (12 hrs) | 60 mins (1 hr) | Single, concrete tasks (e.g., "Put shoes away"). | 3–4 simple choices (Immediate treats, 15 min screens). |
| **7–8** | Up to 3 days | 120 mins (2 hrs) | 2-step routines (e.g., "Pack bag and set clothes"). | 5–6 choices (Screen blocks, choosing dinner). |
| **9–10** | Up to 1 week | 120 mins (2 hrs) | Multi-day streaks & problem-solving challenges. | 7–8 choices (Outings, late bedtime, screen passes). |
| **11–12** | Up to 2 weeks | 120 mins (2 hrs) | Goal-oriented stretch projects & habit stacks. | 8–10 choices (Experience days, special events, autonomy perks). |

---

## Common Pitfalls & How to Avoid Them

| Pitfall | Why It Fails | What To Do Instead |
| --- | --- | --- |
| **Revoking Tokens/Minutes as Punishment** | Undermines trust, creates hostility, and makes the child feel the system is rigged. | Keep earning separate from discipline. Handle misbehavior with logical consequences, leaving earned time intact. |
| **Setting Prices/Rates Too High** | Causes learned helplessness; if a reward feels unattainable, the child stops trying. | Keep initial exchange rates accessible so the child experiences success within 24–48 hours of starting. |
| **Inconsistent Verification Delivery** | Forgetting to verify tasks destroys the cue-reward connection and reduces motivation. | Use actionable push notifications on the parent device to verify and disburse earned time instantly. |
| **Making Everything Screen-Centric** | Reinforces screen reliance and positions non-screen activities as boring chores. | Diversify the menu with autonomy privileges, special experiences, and 1-on-1 connection time. |
| **Parent Micromanagement** | Dictating every task without child input removes intrinsic buy-in and autonomy. | Involve your child directly in setting up reward choices and picking their active daily challenges. |

---

## Connection to App Challenges

The Earned Access Token Economy maps directly into the app's active **Challenge System**. Whenever a child completes an assigned or selected challenge within the platform—whether an academic drill, an emotional regulation exercise, or an offline responsibility task—the app automatically calculates earned minutes in real time using the mathematical formula:

$$M_i = \text{round}(d_i \times D_i \times W_i)$$

Parents can configure the economy via two primary modes:

1. **Mode A (AI-Determined Ratios):** The system scales daily screen time caps and task values automatically based on the child's age to enforce a balanced activity diet.
2. **Mode B (Custom Ratios):** Parents manually create custom tasks, assign specific minute values to each, and maintain a "Free" list of intrinsically motivated activities (like outdoor play) that do not require tracking.

To streamline the manual verification bottleneck, real-time push notifications are delivered to the parent's device as soon as a child marks a task as "Complete." Parents can verify and disburse earned screen time with a single tap. Ultimately, this system acts as a developmental bridge, using structured reinforcement to foster internal pride, self-efficacy, and self-directed behavioral mastery.