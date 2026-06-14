# Decisions

Significant choices and the reasoning behind them.

## 2026-06-01 — Create a dedicated case study documentation area
- Decision: Store case study notes under `docs/case-study/`.
- Reasoning: Keeps process artifacts separate from source code and groups all supporting material in one place.

## 2026-06-01 — Initialize files with starter content
- Decision: Use structured starter content instead of blank files.
- Reasoning: Reduces setup friction and makes it clear what belongs in each document.

## 2026-06-01 — Track screenshots with a placeholder file
- Decision: Add a placeholder file in `screenshots/` so the directory is committed.
- Reasoning: Git does not retain empty directories, and the folder needs to exist in the repo structure now.

## 2026-06-02 — Finalize positioning statement and homepage thesis
- Decision: Lock the positioning statement and expanded thesis for the homepage hero.
- Positioning statement: *I make expert-level tools learnable — for agents, adjusters, attorneys, and traders who can't afford to get it wrong.*
- Expanded thesis: *I've worked across travel, insurance, fintech, and mortgage — building tools that experts actually adopt. The work is in the details: the decision that made onboarding 6 months faster, the user research that redesigned how an industry works, the chatbot that let retail traders think like professionals.*
- Reasoning: The positioning statement names both the capability (making expert tools learnable) and the audience (high-stakes expert users) in a single line. The thesis grounds it in real outcomes — specific enough to be credible, varied enough to signal range. The examples implicitly reference Sagent, USAA/Sabre, and Upfluent without requiring the reader to already know the work.

## 2026-06-09 — USAA case study draft method
- Decision: Version B selected as the final base for the USAA case study.
- Reasoning: Version B had more voice and told a story. Version A read
  like a thorough project summary — credible but safe. For Principal/Director
  reviewers, B demonstrated judgment rather than just competence. The
  stakeholder pivot section in particular earned the outcomes rather than
  just reporting them.
- Alternatives considered: Version A (direct rewrite from source material);
  hybrid of A and B. Both rejected — hybrid risked bloat, A lacked perspective.
- Open question: Question 7 (what outlasted the project beyond metrics)
  was skipped. Worth revisiting before the case study is finalized.

  
  ## 2026-06-14 — Upfluent case study rewrite
 
- **Decision:** Rewrote the Upfluent case study using the eight-section structure. Reframed role ownership from "we/the team" to explicit individual ownership — led the AI chatbot design effort end to end, and owned signup, account management, and Risk Analysis individually; brand and visual system framed as a team effort contributed to. Reframed the product's non-launch as a funding outcome unrelated to design timelines: design delivered full platform designs and explorative chatbot concepts within 12 months, alongside market/user research and building the brand from scratch. Reframed the early-ChatGPT-model constraint (pre-function-calling) as a differentiator — early hands-on AI-in-product work, not a limitation.
- **Reasoning:** key-insights.md (#4, #5, #9) identified Upfluent as the most differentiated but most underdeveloped case study in the portfolio — "we" language obscured individual ownership, and the hybrid NLP + structured-UI chatbot architecture was never articulated despite being the most interesting design decision in the project. The non-launch needed careful framing to avoid implying design caused delays, since that wasn't the case. The early-model constraint connects to the portfolio's "AI before it was mainstream" throughline (key-insights.md #9), pairing this project with the portfolio rebuild itself.
- **Alternatives considered:** Considered keeping the 12-month delivery scope ("full platform + chatbot concepts + research + brand from scratch in 12 months") inside "What Was Hard or Failed" as part of the struggle narrative. Moved it to Outcomes instead — it reads as a delivery achievement, not a difficulty, and keeps the "hard" section focused on the genuine design tension (desktop-grade complexity vs. mobile feasibility).
- **Open question:** Sections 4 (Process) and 7 (Outcomes) currently cover multiple threads each — competitive research, signup, and the chatbot in Process; delivery scope, signup stat, and chatbot outcome in Outcomes — rather than the "one sharp detail beats three vague ones" standard. Claude flagged this as a deviation from the CLAUDE.md tone/length standard; Ben opted to keep as written. Revisit if overall portfolio length needs trimming, or if a future pass wants to narrow these sections to focus on the chatbot specifically.