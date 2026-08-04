# LeetTrack — Project Roadmap

## What this app is

LeetTrack is not a coding platform — it's the memory and tracking layer on top of
platforms like LeetCode, Codeforces, and GFG. Users solve problems elsewhere; LeetTrack
logs what they solved, tells them what to revisit and when (spaced repetition, not
guesswork), and shows where they actually stand — by topic, and by company tag —
against real placement prep goals.

**Core insight:** most students re-solve problems they already know and forget the ones
they don't, because there's no feedback loop. LeetTrack is that feedback loop.

---

## User journey

1. Sign up, set a daily/weekly goal and target companies (e.g. Amazon, Google).
2. Log a solved problem — manually, or via auto-sync — with topic, difficulty,
   company tag, notes, and self-rated confidence.
3. Dashboard shows: streak, what's due for revision today, weakest topic, milestone
   progress.
4. Revision queue resurfaces problems on a spaced schedule based on recall rating
   (Again / Hard / Good / Easy) — the app decides *when*, not the user.
5. Analytics shows trend over weeks — is DP improving? Still stuck on Graphs?
6. Before an interview, filter by company tag and revise only what that company asks.
7. Profile has a shareable stats card.

---

## Data flow: solving a problem → showing up on the dashboard

```
User solves "Two Sum" on LeetCode
        │
        ▼
Manual add (always works)   OR   Auto-sync (LeetCode/Codeforces only)
        │                                │
        │                    Backend polls public API/GraphQL
        │                    → gets recent accepted submissions
        │                    → fuzzy-matches title against Problem catalog
        │                    → dedupes against existing ActivityLog entries
        ▼                                ▼
              ActivityLog entry created (permanent — polling
              limitations stop mattering once saved)
                        │
                        ▼
        Backend aggregation turns raw logs into product features:
        - Streak (consecutive days with ≥1 log)
        - Heatmap (grouped by date)
        - Analytics (grouped by topic/difficulty)
        - Revision scheduling (SM-2 style, based on recall ratings)
        - Company progress (grouped by companyTags on Problem)
                        │
                        ▼
                REST API (JWT-protected, per user)
                        │
                        ▼
        Frontend hooks (useProblems, useStreak, useAnalytics, ...)
        → components never know if data is mock or real
                        │
                        ▼
                Dashboard / Problems / Revision / Analytics / Profile
```

---

## What gets stored vs. what doesn't

**Stored (safe, standard practice):**
- Problem metadata: title, slug, platform, difficulty, topic, company tags
- A link back to the source (`https://leetcode.com/problems/two-sum/`)
- User's own notes, code, confidence rating
- Activity logs (when solved, source, revision history)

**Never stored:**
- Copied problem statements / descriptions
- Scraped example test cases, images, constraints text
- Editorial/solution content from the source platform

Linking out to the original problem is standard web behavior (same as any search
engine or portfolio tool) — no issue there. Storing only metadata + link, never
content, keeps this clean.

---

## Data sources, platform by platform

| Platform | Sync method | Notes |
|---|---|---|
| LeetCode | Public, unauthenticated GraphQL endpoint (`recentAcSubmissionList`) | Unofficial but widely used (same endpoint their own profile page uses). Only returns recent submissions — poll periodically, dedupe on save. Treat as best-effort. |
| Codeforces | Official public REST API (`/api/user.status`) | Documented, stable, full history available. Most reliable auto-sync option. |
| GFG | None — no public API | Manual logging only. Don't scrape (fragile, low value). |
| Manual | User fills a form | Always available, zero dependency risk, the reliable fallback for everything. |

---

## Build phases

**Phase 1 — Frontend shell (current)**
React + CSS Modules. All pages (Dashboard, Problems, Revision, Analytics, Profile)
built and fully navigable against mock data, accessed only through custom hooks
(`useProblems()`, `useStreak()`, etc.) so the data source can change later without
touching component code.

**Phase 2 — Backend foundation**
Node/Express + MongoDB. Schemas: `User`, `Problem`, `ActivityLog`,
`RevisionSchedule`. JWT auth. Core CRUD: add/edit/delete problems, mark solved.

**Phase 3 — Real data flowing**
Swap mock hooks for real fetch/axios calls. Seed `Problem` catalog from an open
community dataset. Streak/analytics become real aggregation queries.

**Phase 4 — Spaced repetition engine**
The core differentiator: SM-2-based scheduling for when problems resurface for
revision, driven by user recall ratings.

**Phase 5 — Sync integrations**
Codeforces sync first (official, stable). LeetCode sync second (best-effort,
clearly labeled). Fuzzy title-matching against the `Problem` catalog.

**Phase 6 — Polish & deploy**
Responsiveness, loading/empty/error states. Deploy: frontend (Vercel), backend
(Render/Railway), DB (MongoDB Atlas). Real live URL.

**Phase 7 — Resume-grade extras** *(pick 2–3, not all)*
Redis caching, rate limiting, Jest tests, CI/CD (GitHub Actions), shareable public
profile page.

---

## Core schema sketch

```js
User {
  name, email, passwordHash,
  leetcodeUsername, codeforcesHandle,
  targetCompanies: [String],
  currentStreak, bestStreak, lastActiveDate,
  weeklyGoal
}

Problem {
  title, slug, platform, url,
  difficulty, topic,
  companyTags: [String]
}

ActivityLog {
  userId, problemId,
  solvedAt, source,       // "manual" | "leetcode-auto" | "codeforces-auto"
  userNotes, code
}

RevisionSchedule {
  userId, problemId,
  nextReviewDate, intervalDays, easeFactor,
  lastRating              // "again" | "hard" | "good" | "easy"
}
```

---

## One-paragraph pitch (for README / interviews)

> LeetTrack lets users log problems they've solved on external platforms — manually,
> or via automated sync with LeetCode's public GraphQL endpoint and Codeforces'
> official API — storing only metadata and source links, never copied problem
> content. Once logged, all product features (streaks, analytics, spaced-repetition
> revision scheduling) are computed entirely from the user's own activity history via
> MongoDB aggregation, with no ongoing dependency on external platforms. The frontend
> consumes all of this through a custom-hook data layer, so the entire UI was built
> and fully testable against mock data before the backend existed, and switching to
> real endpoints required no component changes — only the hooks themselves.
