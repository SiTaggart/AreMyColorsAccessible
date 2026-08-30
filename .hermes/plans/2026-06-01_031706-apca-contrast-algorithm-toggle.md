# APCA Contrast Algorithm Toggle Implementation Plan

> **For Hermes:** Use `subagent-driven-development` to implement this plan task-by-task after Simon approves it. Work in an isolated git worktree. Do not implement from this planning PR.

**Goal:** Add a per-page, URL-shareable contrast algorithm selector so users can switch between the current WCAG 2.x contrast ratio checks and APCA contrast checks on the home and palette pages. Algorithm state is not site-wide: in-app navigation may reset it unless the user carries `algorithm` in the URL (same pattern as colors today).

**Architecture:** Keep WCAG 2.x as the default and preserve existing behavior unless the user explicitly selects APCA. Store the selected algorithm in each page context and in that page's URL search. Write algorithm search updates through TanStack Router `navigate({ search, replace: true })` rather than deepening the existing `pushState` path. Split pure rating (`colorRating` / `apcaRating`) from thin display formatting so `Results`, `ColorMatrix`/`ColorCard`, and a future API path do not each invent their own APCA interpretation.

**Tech Stack:** React 19, TanStack Router, TypeScript, `color-combos@1.2.1` (via `apca-w3@0.1.9`), Vitest, Playwright, Bun.

**APCA profile:** Results in this app come from `color-combos@1.2.1` / `apca-w3@0.1.9`. Dependency bumps or threshold changes that alter shared-URL outcomes are product-contract changes, not silent chores.

---

## Current context

- `color-combos@1.2.1` is already installed and already returns APCA metadata on combinations.
- The current app only renders WCAG 2.x data:
  - ratio via `combination.contrast`
  - AA/AAA booleans via `combination.accessibility`
- Relevant APCA shape from `color-combos`:
  - `combination.apca.lc`
  - `combination.apca.polarity`
  - `combination.apca.minimumFontSize`
  - `combination.apca.readability.{fluentText, bodyText, contentText, largeText, minimumText, nonText}` each `{ thresholdLc, meets }`
- Library readability bands (absolute Lc): fluent 90, body 75, content 60, large 45, minimum 30, nonText 15.
- Home still has two `ColorCombos` call sites; only the interactive equal-color path uses `createFakeCombination` (WCAG-only, no `apca`). Init/deep-link equal colors with default `uniq: true` yield empty `combinations` and can crash `Results`.
- Home URL writes currently stringify `colorCombos` into junk `[object Object]` query params. Palette already separates `PalettePageQueryString` from runtime state.
- `/about` reuses home `parseSiteSearch` + `SiteDataProvider` for theming only; copy is WCAG 2.0. Out of scope for this PR (follow-up).
- No project-local `AGENTS.md`, `CLAUDE.md`, or `.codex` instructions were found in this repo worktree.

## Product decisions (locked)

1. **Scope:** per-page, URL-shareable — not site-wide. Footer/nav need not preserve `algorithm`.
2. **Default algorithm:** `wcag2`. Existing URLs and behavior stay compatible.
3. **User-facing labels:**
   - Toggle labels: `WCAG 2.x` and `APCA`.
   - WCAG metric label: `Contrast Ratio`.
   - APCA metric label: `APCA Lc`.
4. **APCA copy:** do **not** use AA/AAA language in APCA mode.
   - Keep the app's personality framing: `Yup`, `Kinda`, and `Nope` (spell **`Yup`**, matching current `colorRating` / e2e / smoke).
   - `Seriously?` is **not** a heading value. It remains an additive overlay (`showSeriously`) for extreme fails in both modes:
     - WCAG: rounded ratio `< 1.3` (existing behavior; heading stays `Nope`).
     - APCA: `|Lc| < 15` / `nonText` fail band (heading stays `Nope`).
5. **APCA headline rating:** derive from library `apca.readability.*.meets`, not hardcoded magic numbers that can drift from rows:
   - `Yup` when `contentText.meets` (library band 60).
   - `Kinda` when not Yup but `largeText.meets` (library band 45).
   - `Nope` otherwise.
   - Note: Body (75) can fail under a Yup headline at Lc 65; that is expected — label rows clearly as APCA readability, not AA/AAA.
6. **URL state:**
   - Add `algorithm=apca` only when APCA is selected; omit when `wcag2`.
   - Invalid/missing algorithm → `wcag2`.
   - Parse `algorithm` **independently of color validity** (bare `/?algorithm=apca` must stick).
   - Algorithm search writes go through `navigate({ search: ..., replace: true })`.
   - Introduce `HomePageQueryString` (`textColor`, `background`, `isLight`, `algorithm`) separate from runtime `SiteData` (adds `colorCombos`). Stop writing `colorCombos` into the query string; update homepage e2e exact-URL asserts accordingly.
7. **API scope:** keep `/api/are-they` and slash command WCAG-only for this PR.
   - When APCA API support lands later, `getRating` should reuse shared `colorRating` / `apcaRating` for words while preserving its own contrast string format / response shape.
8. **Equal colors:** always call home `ColorCombos([text, bg], { uniq: false })` in **both** `setInitialContext` and `setNewColorCombo`. Delete `createFakeCombination` and `createDuplicateCombination`. Add deep-link e2e for equal colors.
9. **Palette compact rows:** Body, Content, Large on cards; full readability rows on home Results.
10. **Matrix polarity:** under APCA, cells `(i,j)` and `(j,i)` can show different signed Lc (directional). Expected; do not treat as a bug.

## Open questions

None blocking. About-page APCA copy is an explicit follow-up.

---

## Implementation tasks

### Task 1: Add shared contrast algorithm types and query parsing

**Objective:** Introduce a typed algorithm value and route parsing without changing existing WCAG behavior.

**Files:**

- Modify: `src/types/index.ts`
- Modify: `src/utils/route-search.ts`
- Test: `src/utils/__tests__/route-search.spec.ts`

**Steps:**

1. Add:
   ```ts
   export type ContrastAlgorithm = "wcag2" | "apca";
   ```
2. Add `HomePageQueryString`:
   ```ts
   export interface HomePageQueryString {
     background?: string;
     textColor?: string;
     isLight?: boolean;
     algorithm?: ContrastAlgorithm;
   }
   ```
3. Keep runtime `SiteData` as colors + `colorCombos` + `isLight` + `algorithm` (or compose from query + combos — whichever stays clearest). Do **not** treat `colorCombos` as a search field.
4. Extend `PalettePageQueryString` with optional `algorithm`.
5. Add `isContrastAlgorithm(value: unknown): value is ContrastAlgorithm` in `route-search.ts`.
6. Change `parseSiteSearch` to return `Partial<HomePageQueryString>` (not `Partial<SiteData>`). Parse `algorithm` only when valid.
7. Parse `algorithm` in `parsePaletteSearch` the same way.
8. Tests: valid `apca` / `wcag2`, invalid ignored, omitted defaults, algorithm present without colors.

**Verification:**

```bash
bunx vitest run src/utils/__tests__/route-search.spec.ts
```

Expected: route-search tests pass.

### Task 2: Persist algorithm in home context + equal-color fix + router URL writes

**Objective:** Store/update algorithm on the home page; fix equal-color crashes; stop junk `colorCombos` URL params.

**Files:**

- Modify: `src/context/home/index.tsx`
- Modify: `src/routes/index.tsx` (and `about.tsx` only if search typing requires it)
- Test: `src/context/home/__tests__/index.spec.tsx`

**Steps:**

1. Extend `HomeContextInterface` with `handleAlgorithmChange`.
2. Default algorithm to `"wcag2"`. Respect parsed `algorithm` even when colors fall back to defaults.
3. Call `ColorCombos([textColor, background], { uniq: false })` in **both** `setInitialContext` and `setNewColorCombo`.
4. Delete `createFakeCombination` and `createDuplicateCombination`.
5. `handleAlgorithmChange` updates state only (no combo recompute) and syncs search via `navigate({ search, replace: true })`, omitting `algorithm` when `wcag2`.
6. Color-driven URL updates: write only `HomePageQueryString` fields (no `colorCombos`). Prefer router navigate for consistency once algorithm uses it; if color updates stay on a debounce path temporarily, still never serialize `colorCombos`.
7. Tests: default WCAG, parsed APCA, invalid fallback, algorithm without colors, algorithm update preserves colors, equal-color init and update both expose real `apca` (e.g. `lc: 0`).

**Verification:**

```bash
bunx vitest run src/context/home/__tests__/index.spec.tsx
```

Expected: home context tests pass.

### Task 3: Persist algorithm in palette context

**Objective:** Store/update algorithm on the palette page with the same URL rules.

**Files:**

- Modify: `src/context/palette/index.tsx`
- Modify: `src/components/palette-page/index.tsx`
- Test: `src/context/palette/__tests__/index.spec.tsx`

**Steps:**

1. Extend `PaletteState` / `PaletteContextProps` with `algorithm` and `handleAlgorithmChange`.
2. Default `"wcag2"`. Respect `queryString.algorithm` even when `colors` are absent/invalid.
3. Sync algorithm via `navigate({ search, replace: true })`; preserve `colors`; omit `algorithm` when `wcag2`.
4. Ensure `updateColors()` preserves `state.algorithm`.
5. Pass `algorithm` and `handleAlgorithmChange` through `PalettePage` (toggle mount is Task 6b; matrix wiring is Task 7).
6. Tests: default, parsed APCA, algorithm-only URL, update preserves colors/combos, URL state.

**Verification:**

```bash
bunx vitest run src/context/palette/__tests__/index.spec.tsx
```

Expected: palette context tests pass.

### Task 4: Add reusable algorithm toggle component

**Objective:** One accessible control for WCAG 2.x vs APCA.

**Files:**

- Create: `src/components/contrast-algorithm-toggle/index.tsx`
- Create: `src/components/contrast-algorithm-toggle/styled.ts` (if needed)
- Test: `src/components/contrast-algorithm-toggle/__tests__/index.spec.tsx`

**Steps:**

1. Controlled props: `{ algorithm, onChange }`.
2. Real radio inputs in a `fieldset` (or equivalent), labels `WCAG 2.x` and `APCA`. No div-only toggle.
3. Tests: selecting each option calls `onChange` with the typed value.

**Verification:**

```bash
bunx vitest run src/components/contrast-algorithm-toggle/__tests__/index.spec.tsx
```

Expected: toggle component tests pass.

### Task 5: Split rating from display formatting

**Objective:** Pure APCA rating beside `colorRating`; thin formatter for UI variants.

**Files:**

- Modify: `src/utils/color-rating/` (add `apca-rating` or extend module; keep `colorRating` outputs exact)
- Create: `src/utils/contrast-results/index.ts`
- Create: `src/utils/contrast-results/__tests__/index.spec.ts`
- Create/modify matching `color-rating` tests

**Steps:**

1. Add `apcaRating(apca)` (or `apcaRating(lc, readability)`) returning at least:

   ```ts
   {
     overall: "Yup" | "Kinda" | "Nope";
     showSeriously: boolean;
   }
   ```

   - Derive `overall` from `readability.contentText.meets` / `largeText.meets` as in product decision 5.
   - `showSeriously` when `|Lc| < 15` (or `!nonText.meets` with near-zero handling) — overlay only, never as `overall`.

2. Keep `colorRating` returning `"Yup"` / `"Kinda"` / `"Nope"` exactly as today; WCAG `showSeriously` stays ratio `< 1.3` at the display layer (or shared helper).
3. Implement `getContrastDisplayResult(combination, algorithm, variant: "full" | "compact")` that:
   - Calls `colorRating` or `apcaRating` for words.
   - Returns `{ heading, metricLabel, metricValue, rows, showSeriously }`.
   - `full`: home Results rows (WCAG small/bold/large + ratio; APCA full readability set).
   - `compact`: card rows — WCAG small/large (current); APCA Body / Content / Large only.
4. APCA: signed Lc in `metricValue`; no AA/AAA copy; missing `apca` → clear Unavailable state.
5. Unit-test WCAG preservation, APCA derivation from `meets`, Seriously overlay boundaries, compact vs full row sets, missing `apca`.

**Verification:**

```bash
bunx vitest run src/utils/color-rating src/utils/contrast-results/__tests__/index.spec.ts
```

Expected: rating + formatting tests pass.

### Task 6: Wire toggle + home Results

**Objective:** Mount the toggle on home and render Results from the shared formatter.

**Files:**

- Modify: `src/components/colorInputs/index.tsx` and/or `src/components/home/index.tsx`
- Modify: `src/components/results/index.tsx`
- Modify: `src/components/palette-page/index.tsx` (mount toggle here too)
- Tests: results + related

**Steps:**

1. Wire `ContrastAlgorithmToggle` on **home** to `useSiteData().handleAlgorithmChange`.
2. Wire the same toggle on **palette** to `usePaletteData().handleAlgorithmChange` (required; e2e depends on it).
3. In `Results`, use `getContrastDisplayResult(..., "full")`. Heading from `heading`; render `AreYouSerious` (or equivalent) only when `showSeriously`.
4. Keep WCAG DOM/test IDs where reasonable.
5. Assertions: APCA shows `APCA Lc`, no `AA: 4.5 AAA: 7.0`; WCAG unchanged; Seriously overlay still works for near-zero pairs.

**Verification:**

```bash
bunx vitest run src/components/results/__tests__/index.spec.tsx src/context/home/__tests__/index.spec.tsx
```

Expected: home rendering tests pass.

### Task 7: Update palette matrix/card rendering

**Objective:** Algorithm-aware matrix without putting APCA policy inside `ColorCard`.

**Files:**

- Modify: `src/components/color-matrix/index.tsx`
- Modify: `src/components/color-card/index.tsx`
- Tests for both

**Steps:**

1. Pass `algorithm` into `ColorMatrix`.
2. `ColorMatrix` calls `getContrastDisplayResult(combination, algorithm, "compact")` and passes a display-oriented props object into `ColorCard`.
3. `ColorCard` keeps the row swatch `color` prop (foreground). Do **not** drop it in favor of `combination.hex` alone (`combination.hex` is the other color / background cell).
4. Prefer: card accepts display result + `color` (dumb). Avoid teaching the card `algorithm` or APCA row ids.
5. Tests: WCAG cards unchanged; APCA shows Lc + Body/Content/Large; polarity asymmetry `(i,j)` vs `(j,i)` may differ under APCA (assert understanding, not equality).

**Verification:**

```bash
bunx vitest run src/components/color-card/__tests__/index.spec.tsx src/components/color-matrix/__tests__/index.spec.tsx
```

Expected: palette card/matrix tests pass.

### Task 8: Add browser coverage

**Objective:** Prove toggle, deep links, equal-color safety, and cleaned home URLs.

**Files:**

- Modify: `src/e2e/homepage.spec.ts`
- Modify: `src/e2e/palette.spec.ts`

**Steps:**

1. Home:
   - default shows WCAG contrast ratio / `Yup` personality as today.
   - selecting APCA shows APCA Lc; URL gets `algorithm=apca` without `colorCombos=[object Object]`.
   - `/?algorithm=apca&textColor=...&background=...` starts in APCA.
   - `/?algorithm=apca` alone keeps APCA after default colors load.
   - equal colors deep link (`textColor` === `background`) does not crash; APCA mode safe.
2. Palette:
   - default WCAG; selecting APCA updates cards and URL.
   - `/palette?colors=...&algorithm=apca` starts in APCA.
3. Update any exact home URL assertions that previously required junk `colorCombos` params.

**Verification:**

```bash
bun run e2e
```

Expected: Playwright suite passes.

### Task 9: Full validation and PR polish

**Objective:** CI-clean implementation PR after this plan is approved.

**Steps:**

1. Focused tests per task, then full gate:
   ```bash
   bun run format:check && bun run lint && bun run test
   bun run build
   bun run smoke:routes && bun run e2e && bun run deploy:dry-run
   ```
2. Do not commit `dist`, `.wrangler`, `worker-configuration.d.ts`, `node_modules`.
3. Conventional commit, e.g. `feat: add APCA contrast algorithm toggle`.
4. Implement on a fresh branch/worktree — do not reuse this planning branch.

---

## Suggested implementation orchestration after approval

Use a fresh worktree and subagents. Do not reuse the planning branch.

1. Create a branch from latest `main`.
2. Implement task-by-task; review agent output yourself.
3. Run the full validation gate locally and watch GitHub CI after push.

## Acceptance criteria

- WCAG 2.x remains the default on home and palette.
- Existing WCAG results and labels are preserved in WCAG mode (`Yup` / `Kinda` / `Nope`).
- Users can switch to APCA from **both** the home page and the palette page (toggle mounted on each).
- APCA mode displays APCA Lc and APCA readability labels, not AA/AAA labels.
- Headline stays `Yup` / `Kinda` / `Nope` in both modes; `Seriously?` is overlay-only.
- APCA headline derives from library `readability` `meets` flags (content / large).
- Selected algorithm is shareable via that page's URL query string (`algorithm=apca` when selected).
- Invalid or absent algorithm values fall back to WCAG; algorithm parses without requiring valid colors.
- Equal foreground/background colors do not crash on init or edit and expose real APCA data.
- Home URLs no longer include `colorCombos=[object Object]`.
- About-page APCA explanation is out of scope (follow-up).
- Unit tests, build/typecheck, route smoke tests, Playwright tests, and Wrangler dry-run deploy all pass.

## Risks and mitigations

- **APCA terminology confusion:** avoid AA/AAA copy in APCA mode; label Lc/readability clearly. Expect Body fail under Yup when 60 ≤ |Lc| < 75.
- **Missing APCA metadata:** treat `combination.apca` as optional; Unavailable state.
- **URL churn:** omit `algorithm` when `wcag2`; use `replace: true` for toggle writes.
- **Per-page reset:** documented; not a bug if footer navigation drops `algorithm`.
- **Snapshot churn:** centralize rating/display first, then update snapshots deliberately.
- **API contract creep:** keep API WCAG-only; note shared rating reuse for a later APCA API PR.
- **Profile drift:** pin expectations to `color-combos@1.2.1` / `apca-w3@0.1.9` until an intentional bump.
