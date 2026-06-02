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
