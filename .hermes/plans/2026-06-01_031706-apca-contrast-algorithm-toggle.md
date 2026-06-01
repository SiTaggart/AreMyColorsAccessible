# APCA Contrast Algorithm Toggle Implementation Plan

> **For Hermes:** Use `subagent-driven-development` to implement this plan task-by-task after Simon approves it. Work in an isolated git worktree. Do not implement from this planning PR.

**Goal:** Add a site-wide contrast algorithm selector so users can switch between the current WCAG 2.x contrast ratio checks and APCA contrast checks.

**Architecture:** Keep WCAG 2.x as the default and preserve existing behavior unless the user explicitly selects APCA. Store the selected algorithm in context state and the URL query string for shareable/deep-linked checks. Centralize algorithm-specific display logic in a utility so `Results`, `ColorCard`, and future API work do not each invent their own APCA interpretation.

**Tech Stack:** React 19, TanStack Router, TypeScript, `color-combos@1.2.1`, Vitest, Playwright, Bun.

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
  - `combination.apca.readability.{fluentText, bodyText, contentText, largeText, minimumText, nonText}`
- No project-local `AGENTS.md`, `CLAUDE.md`, or `.codex` instructions were found in this repo worktree.
- `main` currently includes the fix-forward dependency update from PR #1465, so this plan assumes APCA metadata exists but still requires defensive fallback for missing `apca`.

## Product decisions proposed

1. **Default algorithm:** `wcag2`.
   - Existing URLs and behavior stay compatible.
2. **User-facing labels:**
   - Toggle labels: `WCAG 2.x` and `APCA`.
   - WCAG metric label: `Contrast Ratio`.
   - APCA metric label: `APCA Lc`.
3. **APCA copy:** do **not** use AA/AAA language in APCA mode.
   - APCA is a different model, not WCAG 2 conformance with new labels.
   - Keep the app's existing three-level personality/conformance framing: `Yep`, `Kinda`, and `Nope`, with `Seriously?` retained for extreme failures.
4. **APCA headline thresholds:** base the APCA headline on absolute Lc (`Math.abs(lc)`) while preserving signed Lc in the metric display.
   - `Yep`: `|Lc| >= 60` — target for normal/body text readability, roughly analogous to the current WCAG `4.5` clear-pass level.
   - `Kinda`: `45 <= |Lc| < 60` — acceptable only with larger/bolder or less demanding text use, roughly analogous to the current WCAG large-text compromise around `3.5`.
   - `Nope`: `15 <= |Lc| < 45` — not good enough for the app's headline conformance.
   - `Seriously?`: `|Lc| < 15`, including same-colour/near-zero contrast cases.
5. **URL state:** add `algorithm=apca` only when APCA is selected.
   - Omit or default `algorithm` to WCAG for cleaner backward-compatible URLs.
6. **API scope for first implementation:** keep `/api/are-they` and slash command WCAG-only.
   - Add APCA API support later as a separate PR if wanted. Mixing UI and API response-shape changes in one PR is unnecessary blast radius.
7. **Same foreground/background colors:** remove or replace the fake duplicate combination path so APCA data is available for equal-color checks.
   - Current `createFakeCombination` only includes WCAG fields and would leave APCA undefined.

## Review decisions and open questions

- APCA headline should retain the app's `Yep` / `Kinda` / `Nope` personality rather than switching to neutral `Pass` / `Partial` / `Fail` language.
  - Use `|Lc| >= 60` for `Yep`, `45 <= |Lc| < 60` for `Kinda`, `15 <= |Lc| < 45` for `Nope`, and `|Lc| < 15` for `Seriously?`.
  - Keep supporting row labels explicit and non-WCAG so users do not confuse APCA guidance with AA/AAA conformance.
- Which APCA rows should appear in compact palette cards?
  - Recommendation: show `Body`, `Content`, and `Large`; keep full APCA rows on the two-color home result.
- Should APCA API support be in this PR?
  - Recommendation: no, first PR should ship UI mode only.

---

## Implementation tasks

### Task 1: Add shared contrast algorithm types and query parsing

**Objective:** Introduce a typed algorithm value and route parsing without changing existing behavior.

**Files:**

- Modify: `src/types/index.ts`
- Modify: `src/utils/route-search.ts`
- Test: `src/utils/__tests__/route-search.spec.ts`

**Steps:**

1. Add:
   ```ts
   export type ContrastAlgorithm = "wcag2" | "apca";
   ```
2. Extend `SiteData` with:
   ```ts
   algorithm: ContrastAlgorithm;
   ```
3. Extend `PalettePageQueryString` with:
   ```ts
   algorithm: ContrastAlgorithm;
   ```
4. Add an `isContrastAlgorithm(value: unknown): value is ContrastAlgorithm` helper in `route-search.ts`.
5. Parse `algorithm` in `parseSiteSearch` and `parsePaletteSearch` only when valid.
6. Add tests for valid `algorithm=apca`, valid `algorithm=wcag2`, invalid algorithm ignored, and omitted algorithm default behavior.

**Verification:**

```bash
bunx vitest run src/utils/__tests__/route-search.spec.ts
```

Expected: route-search tests pass.

### Task 2: Persist algorithm in home context

**Objective:** Store and update the selected algorithm on the two-color home page.

**Files:**

- Modify: `src/context/home/index.tsx`
- Test: `src/context/home/__tests__/index.spec.tsx`

**Steps:**

1. Extend `HomeContextInterface` with:
   ```ts
   handleAlgorithmChange: (algorithm: ContrastAlgorithm) => void;
   ```
2. Default `setInitialContext()` to `algorithm: "wcag2"`.
3. Respect `initialSiteData.algorithm` when valid.
4. Include `algorithm` in the URL update, preferably omitting it when `wcag2` if that fits existing query-string conventions.
5. Implement `handleAlgorithmChange` as a state-only update; it should not recalculate color combos.
6. Fix equal-color combination handling so APCA data is not lost. Prefer `ColorCombos([textColor, backgroundColor], { uniq: false })` if supported by current `color-combos`; otherwise include an APCA fallback object for the fake duplicate combination.
7. Update home context tests for default WCAG, parsed APCA, invalid algorithm fallback, algorithm update preserving colors, and equal-color APCA safety.

**Verification:**

```bash
bunx vitest run src/context/home/__tests__/index.spec.tsx
```

Expected: home context tests pass.

### Task 3: Persist algorithm in palette context

**Objective:** Store and update the selected algorithm on the palette page.

**Files:**

- Modify: `src/context/palette/index.tsx`
- Modify: `src/components/palette-page/index.tsx`
- Test: `src/context/palette/__tests__/index.spec.tsx`

**Steps:**

1. Extend `PaletteState` with `algorithm: ContrastAlgorithm`.
2. Extend `PaletteContextProps` with:
   ```ts
   handleAlgorithmChange: (algorithm: ContrastAlgorithm) => void;
   ```
3. Default `getInitialState()` to `algorithm: "wcag2"`.
4. Respect `queryString.algorithm` when valid.
5. Include `algorithm` in palette URL updates, preserving existing `colors` behavior.
6. Ensure `updateColors()` preserves `state.algorithm`.
7. Pass `algorithm` through `PalettePage` to `ColorMatrix`.
8. Add tests for default WCAG, parsed APCA, algorithm update preserving colors/combinations, and URL state.

**Verification:**

```bash
bunx vitest run src/context/palette/__tests__/index.spec.tsx
```

Expected: palette context tests pass.

### Task 4: Add reusable algorithm toggle component

**Objective:** Provide one accessible UI control for choosing WCAG 2.x or APCA.

**Files:**

- Create: `src/components/contrast-algorithm-toggle/index.tsx`
- Create or modify: `src/components/contrast-algorithm-toggle/styled.ts`
- Test: `src/components/contrast-algorithm-toggle/__tests__/index.spec.tsx`
- Modify: export barrel only if this repo uses one for components; otherwise import directly.

**Steps:**

1. Implement a controlled component:
   ```ts
   interface ContrastAlgorithmToggleProps {
     algorithm: ContrastAlgorithm;
     onChange: (algorithm: ContrastAlgorithm) => void;
   }
   ```
2. Render as a `fieldset`/radio group or segmented control with accessible labels:
   - `WCAG 2.x`
   - `APCA`
3. Use real radio inputs unless styling makes that impossible. Do not use a div-only toggle.
4. Add tests that selecting each option calls `onChange` with the expected typed value.

**Verification:**

```bash
bunx vitest run src/components/contrast-algorithm-toggle/__tests__/index.spec.tsx
```

Expected: toggle component tests pass.

### Task 5: Centralize WCAG/APCA result formatting

**Objective:** Keep rendering components dumb and ensure APCA terminology is consistent.

**Files:**

- Create: `src/utils/contrast-results/index.ts`
- Create: `src/utils/contrast-results/__tests__/index.spec.ts`
- Possibly modify: `src/utils/color-rating/index.ts`

**Steps:**

1. Define a render-friendly result shape, for example:
   ```ts
   interface ContrastDisplayResult {
     heading: string;
     metricLabel: string;
     metricValue: string;
     rows: Array<{
       id: string;
       label: string;
       description: string;
       rating: string;
       passes: boolean;
     }>;
     showSeriously: boolean;
   }
   ```
2. Implement `getContrastDisplayResult(combination, algorithm)`.
3. For WCAG:
   - Preserve current `colorRating(accessibility)` outputs exactly.
   - Preserve `Contrast Ratio` formatting as `N : 1`.
   - Preserve `Seriously?` behavior when rounded ratio is `< 1.3`.
4. For APCA:
   - Format `lc` as signed `Lc`, rounded to one decimal or integer consistently.
   - Preserve the sign in display, but use `Math.abs(lc)` for headline thresholds.
   - Keep app personality in the headline: `Yep` for `|Lc| >= 60`, `Kinda` for `45 <= |Lc| < 60`, `Nope` for `15 <= |Lc| < 45`, and `Seriously?` for `|Lc| < 15`.
   - Treat the thresholds as AMCA display guidance, not WCAG AA/AAA conformance.
   - Use APCA readability rows from `combination.apca.readability` for supporting details.
   - Do not render AA/AAA copy.
   - Handle missing `apca` safely with a clear `Unavailable` state instead of crashing.
5. Unit-test WCAG preservation, APCA formatting, APCA missing fallback, APCA headline threshold boundaries, `Seriously?` near-zero behavior, and threshold row output.

**Verification:**

```bash
bunx vitest run src/utils/contrast-results/__tests__/index.spec.ts
```

Expected: result formatting tests pass.

### Task 6: Update home page rendering

**Objective:** Show the toggle and render the two-color result in either WCAG or APCA mode.

**Files:**

- Modify: `src/components/colorInputs/index.tsx` or `src/components/home/index.tsx` depending on best layout fit
- Modify: `src/components/results/index.tsx`
- Test: `src/components/results/__tests__/index.spec.tsx`
- Possibly update snapshots used by home/results tests

**Steps:**

1. Wire `ContrastAlgorithmToggle` to `useSiteData()`.
2. In `Results`, call `getContrastDisplayResult(colorInfo, siteData.algorithm)`.
3. Render rows from the utility result rather than hard-coded WCAG rows.
4. Keep the current WCAG DOM/test IDs where reasonable to avoid unnecessary test churn.
5. Add APCA-specific test assertions:
   - APCA mode shows `APCA Lc`.
   - APCA mode does not show `AA: 4.5 AAA: 7.0`.
   - WCAG mode still shows current labels and ratings.

**Verification:**

```bash
bunx vitest run src/components/results/__tests__/index.spec.tsx src/context/home/__tests__/index.spec.tsx
```

Expected: home rendering tests pass.

### Task 7: Update palette matrix/card rendering

**Objective:** Render palette matrix cards using the selected algorithm.

**Files:**

- Modify: `src/components/color-matrix/index.tsx`
- Modify: `src/components/color-card/index.tsx`
- Test: `src/components/color-matrix/__tests__/index.spec.tsx`
- Test: `src/components/color-card/__tests__/index.spec.tsx`

**Steps:**

1. Add `algorithm: ContrastAlgorithm` to `ColorMatrixProps`.
2. Pass `algorithm` from palette context through `PalettePage` into `ColorMatrix`.
3. Change `ColorCard` props to accept the full `combination` plus `algorithm`, or add optional `apca` while keeping WCAG props. Prefer full combination if it simplifies utility reuse.
4. In `ColorCard`, render compact output from `getContrastDisplayResult()`:
   - WCAG: keep current ratio, small, large, and headline behavior.
   - APCA: show `APCA Lc`, headline, and compact rows for `Body`, `Content`, and `Large`.
5. Add tests for WCAG unchanged and APCA card rendering.

**Verification:**

```bash
bunx vitest run src/components/color-card/__tests__/index.spec.tsx src/components/color-matrix/__tests__/index.spec.tsx
```

Expected: palette card/matrix tests pass.

### Task 8: Add browser coverage

**Objective:** Prove the user can switch algorithms and deep-link to APCA.

**Files:**

- Modify: `src/e2e/homepage.spec.ts`
- Modify: `src/e2e/palette.spec.ts`

**Steps:**

1. Add home-page e2e coverage:
   - default page shows WCAG contrast ratio.
   - selecting APCA changes visible result to APCA Lc.
   - URL reflects `algorithm=apca`.
   - loading `/?algorithm=apca&textColor=...&background=...` starts in APCA mode.
2. Add palette e2e coverage:
   - default palette remains WCAG.
   - selecting APCA changes cards to APCA Lc.
   - URL preserves colors and adds algorithm.
   - loading `/palette?colors=...&algorithm=apca` starts in APCA mode.

**Verification:**

```bash
bun run e2e
```

Expected: Playwright suite passes.

### Task 9: Full validation and PR polish

**Objective:** Ensure the implementation is CI-clean and reviewable.

**Files:**

- Update only files touched by the implementation.
- Do not commit generated artifacts: `dist`, `.wrangler`, `worker-configuration.d.ts`, `node_modules`.

**Steps:**

1. Run focused tests as each task lands.
2. Run full local gate:
   ```bash
   bun run format:check && bun run lint && bun run test
   bun run build
   bun run smoke:routes && bun run e2e && bun run deploy:dry-run
   ```
3. Review diff:
   ```bash
   git diff --check
   git status --short
   git diff --stat origin/main...HEAD
   ```
4. Commit with a conventional commit message:
   ```bash
   git commit -m "feat: add APCA contrast algorithm toggle"
   ```
5. Push and open the implementation PR only after this plan is approved.

---

## Suggested implementation orchestration after approval

Use a fresh worktree and subagents. Do not reuse the planning branch.

1. Create a branch:
   ```bash
   git fetch origin main --prune
   git worktree add -b feat/apca-contrast-algorithm-toggle \
     /opt/data/workspace/github/SiTaggart/AreMyColorsAccessible-apca-impl \
     origin/main
   ```
2. Use Codex for implementation tasks where useful. Preferred command pattern:
   ```bash
   HOME=/opt/data/home codex exec \
     -C /opt/data/workspace/github/SiTaggart/AreMyColorsAccessible-apca-impl \
     -m gpt-5.5 \
     -c 'model_reasoning_effort="xhigh"' \
     -s workspace-write \
     -o /tmp/codex-apca-task-last.md \
     - < /tmp/codex-apca-task.md
   ```
3. If Codex rejects `gpt-5.5` or `xhigh`, stop and report the exact CLI/provider limitation instead of silently downgrading.
4. Review subagent output yourself; do not trust agent self-reporting.
5. Run the full validation gate locally and watch GitHub CI after push.

## Acceptance criteria

- WCAG 2.x remains the default everywhere.
- Existing WCAG results and labels are preserved in WCAG mode.
- Users can switch to APCA from the home page and palette page.
- APCA mode displays APCA Lc and APCA-specific readability labels, not AA/AAA labels.
- APCA mode keeps the app's `Yep` / `Kinda` / `Nope` headline language, with `Seriously?` for `|Lc| < 15`.
- Selected algorithm is shareable via URL query string.
- Invalid query-string algorithm values are ignored/fall back to WCAG.
- Equal foreground/background colors do not crash and produce safe APCA output.
- Unit tests, build/typecheck, route smoke tests, Playwright tests, and Wrangler dry-run deploy all pass.

## Risks and mitigations

- **APCA terminology confusion:** avoid AA/AAA copy in APCA mode and label it clearly as APCA Lc/readability guidance.
- **Missing APCA metadata:** handle `combination.apca` as optional even though current dependency provides it.
- **URL churn:** preserve existing behavior and only add `algorithm` when needed.
- **Snapshot churn:** centralize display logic first, then update snapshots deliberately.
- **API contract creep:** keep API WCAG-only for this PR unless explicitly approved.
