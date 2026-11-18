---
name: shared-parts
description: >
  Decides when code becomes one shared part, when it stays separate, and how shared parts grow,
  for any language or framework (components, modules, functions, services, styles). Use when
  building something a shared part may already cover, when two parts look alike, when a shared
  part lacks a feature, or when reviewing duplicated or overloaded code.
license: MIT
metadata:
  author: Alexander Pahn
  version: "1.0"
---

# shared-parts

A shared part is any reusable unit: a component, module, function, service or style.

## Use what exists

- If a shared part exists for a job, every feature uses it. Never hand-roll the same part again.
- If the shared part lacks something the job needs, extend the shared part. Never make a local copy.
- The worst case is a local variant with different behaviour for the same job: people meet two behaviours for one thing, and fixes land in only one of them.

## One part, one purpose

- Each shared part exists for one specific use case or interaction.
- Extend a part only when the addition serves that same purpose. Don't squeeze in "also feature x" because the part is close by. That path ends in god components full of flags and modes.
- A new purpose gets its own part, which may reuse smaller shared pieces underneath.

## Intention decides, not look

- Code that looks almost the same in two places is not a reason to merge it.
- Same intention or business case: one shared part.
- Different intentions: separate parts, even when they look alike today. They will change for different reasons.
- Ask: if one of them changes, must the other change too? Yes means one part. No means two.

## Review checks

- Does a feature rebuild something a shared part already does?
- Does a local copy or variant exist for a job a shared part covers?
- Does a shared part carry options that serve a different purpose?
- Were two parts merged only because they look alike?
