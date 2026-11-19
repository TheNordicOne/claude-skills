# Time

Code never reads the current time itself. This is how the code is written from the start, not a test concern added later.

- Every "now", "today" and timed wait comes from one injected clock. In an Angular app that is a clock service from the shared kit; elsewhere a clock passed in as a parameter or dependency.
- Never call `Date.now()`, `new Date()` without a value or `performance.now()` in app code; lint bans them. `new Date(value)` from a given value is fine.
- "Today" is a calendar day in a stated time zone, computed by the clock, never from the machine's local zone by accident.
- Timers that decide behaviour (debounce, polling, delays) take their time from the same clock, so a test can advance it.
- One clock per app. A module never builds its own clock; a missing feature goes into the shared clock.
- Only third-party code that reads the clock itself is exempt; document it with its source.
