---
name: dotnet
description: >
  C# / .NET conventions for writing backend code correctly from the start. Currently covers time
  (TimeProvider). Activate when editing any `.cs` file or .NET project.
license: MIT
compatibility: Requires .NET 8+
---

# .NET

Rules for writing C# / .NET code correctly on the first draft. Detail for each area lives in `references/` — pull the file you need.

## How to use this skill

- Follow the framework's own conventions where it has them (ASP.NET Core, EF Core, Microsoft.Extensions.*); these rules are for code whose shape you control.
- Strong defaults: deviate only with a stated reason.
- A priming lens, not a closed checklist — keep reasoning about the specific code.

## The areas

### Time → `references/time.md`
No code reads the current time itself: inject the built-in `TimeProvider` for every "now", "today" and timed wait; `DateTime.Now/UtcNow/Today` and `DateTimeOffset.Now/UtcNow` are banned by analyzer; SQL gets the time as a parameter instead of `now()`.
