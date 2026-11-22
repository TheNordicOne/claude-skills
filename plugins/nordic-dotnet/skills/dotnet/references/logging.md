# Logging

- Every log call is a source-generated `[LoggerMessage]` method (`static partial` extension on `ILogger`, or a `partial` method on the class). Never call `logger.LogInformation(...)` and friends directly.
- Never wrap a log call in `if (logger.IsEnabled(...))`. The generated method checks the level itself before it builds anything; a hand-written check is noise.
- Levels are decided where `IsEnabled` is asked: configure them through the framework's logging filters (`LoggerFilterOptions`, `Logging:LogLevel`, reloadable options). A provider-side filter that drops events after they were built (for example a Serilog `Filter.ByIncludingOnly` on the root logger) makes `IsEnabled` answer "yes" for everything and wastes the work.
- Message templates use named holes (`{Sql}`), never string interpolation, so the values stay structured.
- Only an `ILogger` / `ILoggerProvider` implementation (test capture, a wrapper) implements `IsEnabled`; that is the interface, not a check.
