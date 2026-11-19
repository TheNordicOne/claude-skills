# Cancellation

Every async path takes the caller's `CancellationToken` and passes it on, all the way down. This is written from the start, not added later.

- Endpoints and actions take the request's token (`HttpContext.RequestAborted` / the bound `CancellationToken`) and pass it to every awaited call: EF Core and raw SQL, HTTP clients, file and stream I/O, external tool runs, channel reads, `Task.Delay`.
- Background work takes the host's stopping token (`BackgroundService.ExecuteAsync(stoppingToken)`), linked with per-job timeouts where needed.
- Never pass `CancellationToken.None` or `default` where a real token exists; never drop the token in a helper's signature.
- A write that must finish once started (or must not leave half state) runs in a transaction, or deliberately ignores the request token with a one-line reason; cancellation must never leave partial data.
- A cancelled request is not an error: it is not logged as one and raises no alert.
