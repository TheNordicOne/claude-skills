# Claude Instructions

IMPORTANT: Before starting ANY task, you MUST first discover and activate relevant skills. This is a mandatory first step — do NOT skip it, do NOT wait to be reminded.

This project follows the [Agent Skills](https://agentskills.io/specification) pattern for modular, reusable coding guidelines. All coding guidelines are defined as skill files in the `skills/` directory.

Follow the progressive disclosure pattern from the spec:
1. **Discover**: List all skill directories in `skills/`
2. **Triage**: Read only the YAML frontmatter (`name` and `description`) of each `SKILL.md` to decide relevance
3. **Activate**: Load the full body of relevant skills only
4. **Resources**: Load files from `references/`, `scripts/`, or `assets/` only when needed

## Workflow

- Interview me in detail using the AskUserQuestionTool about literally anything: technical implementations, UI & UX, concerns, tradeoffs, etc. but make sure the questions are not obvious. Look for the best sub agent for the several tasks.
  Be very in-depth and continue interviewing me continually until it's complete, then write to the file.
- **NEVER write out markdown files unless explicitly asked to**
