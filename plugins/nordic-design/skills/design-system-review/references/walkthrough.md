# Phase 4: Walkthrough

The owner decides every Open finding and sees every Rejected and Fixed one. You lead, one finding at a time.

## Contents

- Format of one finding
- Conduct
- Rejected and Fixed findings
- Recording decisions

## Format of one finding

Write it as markdown in the reply, not inside a question tool. Short, plain sentences. Sizes in rem, not px.

```markdown
## SP-03 Group gaps too close to item gaps

**Problem:** Space between groups is one step above space inside a group.

**Where users feel it:** In a settings list, the user cannot tell where one group ends and the next starts.

**What was found:** Items use 0.75rem, groups 1rem. The rule says groups use the next step.

**Options**
- A: Groups skip one step (1.5rem). Changes every grouped list.
- B: Keep 1rem and add a heading per group.

**Recommendation:** A, because it fixes the rule and every place that uses it.
```

Order of the parts never changes: heading, problem, where users feel it, what was found, options, recommendation. Fixed findings replace options with what was changed.

## Conduct

- Show one finding. Wait.
- Each owner answer starts a discussion. Answer questions, add facts, revise options. Do not show the next finding until the owner says to move on.
- A question is not an order. Answer "why" questions; change nothing until asked.
- When a finding points at a rule, propose fixing the rule, not only the place that exposed it.
- Apply earlier decisions to every later finding. Say so: "Decision D1 already covers this; it becomes 1.5rem."
- Never summarise back what the owner just said. Confirm only your own guesses, with one short question.

## Rejected and Fixed findings

- Present Rejected findings too, with your own view next to the verifier's.
- Where the verifier was wrong, say so openly and treat the finding as Open.
- Fixed findings: say what changed and where to look. The owner may still revert.

## Recording decisions

Right after each decision, before the next finding:
1. Write the decision into the finding's **Decision** line.
2. If it is a rule, add it to **Decisions that apply everywhere** and list the findings it touches.
3. Update the summary table.
