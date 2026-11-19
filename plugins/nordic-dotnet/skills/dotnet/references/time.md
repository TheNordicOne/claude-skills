# Time

Code never reads the current time itself. This is how the code is written from the start, not a test concern added later.

- Inject the built-in `TimeProvider` (since .NET 8; register `TimeProvider.System` once) and use `GetUtcNow()` / `GetLocalNow()`. Store and compare instants as UTC `DateTimeOffset`.
- Timed waits and loops take the same clock: `Task.Delay(span, timeProvider)`, `timeProvider.CreateTimer(...)`, `PeriodicTimer(span, timeProvider)`. No pacing on `DateTimeOffset.UtcNow`, even when "it never changes a result".
- Ban direct reads with `Microsoft.CodeAnalysis.BannedApiAnalyzers` (`BannedSymbols.txt`): `DateTime.Now`, `DateTime.UtcNow`, `DateTime.Today`, `DateTimeOffset.Now`, `DateTimeOffset.UtcNow`, `Stopwatch` used for app logic. In app code and tests alike.
- SQL: pass the time in as a parameter instead of `now()` / `CURRENT_TIMESTAMP` / column defaults that stamp time. Use the database's own time only where it must be the commit time of that database (e.g. ordering by insertion inside one transaction), and document why at that place.
- Calendar days ("today", due dates) are computed in a stated time zone from the injected clock, never from the server's local zone.
- Tests use `FakeTimeProvider` (Microsoft.Extensions.TimeProvider.Testing): set and advance it instead of waiting.
- Exempt only third-party code that reads the clock itself (e.g. a TOTP library); document it with its source.

Sources: Microsoft Learn, "What is the TimeProvider class" (https://learn.microsoft.com/dotnet/standard/datetime/timeprovider-overview); FakeTimeProvider (https://learn.microsoft.com/dotnet/api/microsoft.extensions.time.testing.faketimeprovider); BannedApiAnalyzers (https://github.com/dotnet/roslyn-analyzers/blob/main/src/Microsoft.CodeAnalysis.BannedApiAnalyzers/BannedApiAnalyzers.Help.md).
