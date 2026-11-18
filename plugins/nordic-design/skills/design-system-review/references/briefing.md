# Phase 1: Briefing

The briefing settles everything the later phases need. Until the owner confirms the task summary, you only ask questions. You do not read the design system, open files, or dispatch agents. Reading early anchors your view and leaks into the questions.

## Contents

- How to ask
- Questions to cover
- Task summary
- Setup after confirmation

## How to ask

- Use the AskUserQuestion tool when it is available. Put everything needed to answer into the question itself.
- Short, plain questions. Only what the decision needs.
- Bundle related questions into one call where the tool allows it.
- If the owner gives the briefing step by step, only ask questions and keep a short running summary. Start nothing until they say the briefing is complete.
- Decide obvious defaults yourself and say so; ask only real decisions.

## Questions to cover

**Sources of truth**
- Where does the design system live? Docs, token files (JSON, CSS custom properties), global styles in the code, a design tool, an external artifact. Often several.
- Which source wins when two disagree?
- Are there copies that must stay in sync (for example a token file and a published style guide)?

**Scope**
- Which foundations are in scope? Default: spacing, typography, colour, layout and widths, sizes, elevation, motion, focus and states.
- Components are out of scope unless the owner adds them.
- Themes and modes to cover (light, dark, high contrast).

**Known problems**
- Recurring complaints or problems the owner already knows. These guide where the reviewer looks harder; they are not findings.

**How fixes are applied**
- Every place a fix must land (token file, docs, code, external copy). All fix places are kept in sync.
- Who may publish external artifacts, and their limits (publishes per day, review steps). Default: batch all changes and publish once at the end.

**Findings doc**
- Where it lives. Default: a file in the repo that is git-ignored via `.git/info/exclude`, never committed.

**Workspace**
- One worktree or branch for all review work. Ask where worktrees go if the repo has no convention.

## Task summary

After all questions, write a summary of five to eight lines: sources and precedence, scope, fix places, doc location, branch/worktree, publish rule. Ask the owner to confirm it. Only then start Phase 2.

## Setup after confirmation

1. Create the review worktree/branch.
2. Create the findings doc from [findings-doc.md](findings-doc.md) and add it to `.git/info/exclude`.
3. Fill the doc's header (sources, precedence, scope, fix places).
