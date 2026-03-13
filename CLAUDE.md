# Project Instructions

## Auto Prompt Optimization (MANDATORY)

**EVERY user prompt MUST be internally optimized before execution.** This is a non-negotiable preprocessing step.

Before acting on any user message:
1. In your internal reasoning, refine the user's raw prompt into a structured, specific, and actionable version using the optimization principles defined in `.claude/skills/prompt-optimizer/SKILL.md`
2. Immediately execute the optimized version — do NOT show the optimized prompt to the user
3. Deliver results directly — no preamble about optimization, no clipboard operations

This applies to ALL prompts — implementation requests, questions, bug fixes, reviews, everything. The user should experience better results without any extra steps on their part.
