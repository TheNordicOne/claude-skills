# Structure

How classes, helpers and dependencies are shaped. Owner rules about code structure always mean the established best practice behind them, never their most literal reading; when a literal reading would produce something best practice rejects, follow the best practice or ask.

## Classes
- One class, one job (single responsibility). Services are small injectable classes, each with a narrow purpose, registered in DI. "One data class per feature" means a focused class per job inside a feature (queue, value requests, cleanup), never one class for a whole module area.
- `partial` is for generated code (source generators, `LoggerMessage`, EF designer). Splitting a large hand-written class into `partial` files hides a god class; split it into separate classes instead.
- Classes that must run in one transaction share it through a transaction helper or a unit of work, not by calling each other's internals.

## Helpers: extensions over static classes
- A helper that acts on one obvious type (`DbSet<T>`, `DbContext`, `IServiceCollection`, `IQueryable<T>`, a record) is an extension method on that type and is called like the framework's own (`db.Shares.SaveAsync(...)`, like EF's `ExecuteUpdateAsync`).
- Plain static classes taking that type as the first parameter (`Upserts.Save(db, ...)`) are not used where an extension fits.
- Static classes stay only for pure rule functions with no natural receiver (calculations, parsing, validation rules); these are unit-tested directly.

## Dependencies
- No new package (NuGet, npm, tool, container image) without the product owner's explicit yes. Propose it with what it is for, how much of it is used, and the alternatives (framework feature, a small own helper, plain code).
- A package used for a single method is almost never worth it: write the small helper on top of the framework instead.
- In reviews, check package manifests (`Directory.Packages.props`, `*.csproj`, `package.json`) for additions and raise every one.

## Data access (EF Core)
- Prefer EF Core's own operations (`ExecuteUpdateAsync`, `ExecuteDeleteAsync`, LINQ) over raw SQL; raw SQL only where EF truly cannot express it, kept in one place with a reason.
- An "insert or update" is an SDK/shared extension on `DbSet<T>` built on EF (update, else insert, on a unique-violation race update again), not an extra library.
