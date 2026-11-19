# Input

The server never trusts the client. This is how every action and endpoint is written from the start.

- Every check the frontend makes on input (required, length, format, range, allowed values, cross-field rules such as end after start, file type and size) is made again by the server action that receives it. The frontend check is for the person's convenience; the server check is the rule.
- Input the UI could never send is refused too: missing or null fields, wrong types, unknown values, ids of things the person cannot reach.
- A refusal is a clean 400 with a stable code the frontend can show. Never a 500, never silent acceptance, never silent clamping.
- Model binding enforces what it can (required members, nullable annotations respected, no silent defaults); everything else is a plain, unit-tested check function the action calls before any write.
- No limit exists only on one side, and no limit exists that the product owner did not ask for.
