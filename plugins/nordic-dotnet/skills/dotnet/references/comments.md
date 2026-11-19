# Comments

A comment exists only when it tells the reader something the code cannot: why it is done this way, why the obvious way is wrong here, a constraint from outside (a browser bug, a library limit, a spec, a product decision), or a non-obvious consequence. This is a hard rule for every language: TypeScript, C#, HTML templates, CSS, SQL, scripts.

- Never narrate: no comment that restates what the next line does, names what a function or variable already says, or walks through the steps of the code.
- Never describe history ("was X, now Y", "added for the review", "moved from …"); that belongs in the commit message.
- A comment that only paraphrases the code is a code smell: delete it, or rename and restructure until the code says it.
- Keep the comments that carry real insight, short and in plain English, next to the code they explain, and cite the source when the reason comes from outside (spec, issue, docs).
- Doc comments on public APIs say what the caller needs to know (contract, edge cases), not how it works inside.
