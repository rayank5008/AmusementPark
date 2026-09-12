# California recommender checks

Branch: `codex/california-park-recommender` (local). Base: `main` at `c4cb916ee1c2307371fe86f084eeb4da02d245d1`.

## Passed

- `node tests/parks.cjs`: all 14 nonempty ride-type/comfort combinations; deterministic ordering, gentle-only invariant, no matches, partial matches, ranking, invalid inputs, duplicates and official source domains.
- `node tests/check.cjs`: all 48 existing checks, including the coastal example's 20 time/vibe combinations.
- `node --check park-app.js` and `git diff --check`.
- In-app browser: coaster results list all three curated parks; gentle mode plus coasters alone returns no results; coasters plus carousels in gentle mode shows only carousel ride links and lists coasters as unmatched.
- Keyboard: Space changes a checkbox and Enter submits the form. Result heading receives focus. Empty selection produces a clear error and returns focus to the first checkbox.
- Mobile at 390 × 844: drop-tower selection returns Six Flags Magic Mountain with the official LEX LUTHOR ride link; document width equals viewport width (no horizontal overflow); image loads.
- Desktop at 1280 × 900: inspected header, train artwork, controls and results.
- All seven ride source pages were read from official park sites. No current operation, safety, price or wait-time claims are made.
- Original examples, shared teaching docs, README and publishing settings preserved.

## Limits

- Reduced-motion CSS disables animation and transitions, but an OS/browser reduced-motion setting was not exercised live.
- No screen-reader audit, 200% text-zoom check, physical-device testing or cross-browser suite was run.
- No GitHub Pages deployment test: this branch was not published, merged or submitted as a PR.
- GitHub connector write failed with 403 Resource not accessible by integration. Git push could not authenticate because no local Git credentials were configured. All implementation and approved brief commits are retained locally; remote main is unchanged.

## Local preview

Serve this directory with a static HTTP server. The verified preview was `http://127.0.0.1:4173/` on the user's Mac. It is a local preview, not a public URL. A Git bundle supplied with the handoff preserves the branch commits for recovery.
