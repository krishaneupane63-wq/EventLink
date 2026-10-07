# EventLink Frontend — Phase-by-Phase Build Guide

Reference site: gigsalad.com
Stack: React + Vite + Tailwind CSS + Lucide React
Skills installed: design-taste-frontend, high-end-visual-design, full-output-enforcement, brandkit

---

## How to use these files

1. Open Claude Code in your `eventlink-frontend` folder
2. Open the phase file for the phase you are building
3. Copy the ENTIRE file content
4. Paste it into Claude Code as your prompt
5. Claude Code reads your installed skills + this prompt and builds all the files
6. Run `npm run dev` to check the result
7. Move to the next phase

Each phase builds on the previous one. Do them in order.

---

## Phase Overview

| File                         | What it builds                                           | SRS Tasks covered        | Est. time |
| ---------------------------- | -------------------------------------------------------- | ------------------------ | --------- |
| PHASE-1-homepage.md          | Homepage — all 7 sections                                | TASK-REC-06 (rec feed)   | 1–2 hrs   |
| PHASE-2-auth-pages.md        | Login, Register (Customer + Business), Forgot Password   | TASK-AUTH-05             | 1 hr      |
| PHASE-3-search-results.md    | Search results + filter sidebar + 12 mock vendors        | TASK-SRCH-03             | 1–2 hrs   |
| PHASE-4-vendor-profile.md    | Vendor profile page + portfolio + reviews + enquiry form | TASK-BPM-04, TASK-REV-03 | 2 hrs     |
| PHASE-5-dashboards.md        | Customer, Business, and Admin dashboards                 | TASK-DASH-01/02/03       | 2–3 hrs   |
| PHASE-6-profile-editor-ai.md | Business profile editor (4-step) + AI recommendations UI | TASK-BPM-04, TASK-REC-06 | 2 hrs     |

---

## Pages Built Across All Phases

| Route                            | Page                             | Phase |
| -------------------------------- | -------------------------------- | ----- |
| /                                | Homepage                         | 1     |
| /login                           | Login                            | 2     |
| /register/customer               | Customer registration            | 2     |
| /register/business               | Business registration            | 2     |
| /forgot-password                 | Forgot password                  | 2     |
| /search                          | Search results + filters         | 3     |
| /vendor/:id                      | Vendor profile page              | 4     |
| /dashboard/customer              | Customer dashboard               | 5     |
| /dashboard/business              | Business dashboard               | 5     |
| /dashboard/admin                 | Admin verification dashboard     | 5     |
| /dashboard/business/edit-profile | Business profile editor (4-step) | 6     |
| /recommendations                 | AI recommendations feed          | 6     |
| /dashboard/settings              | Account settings                 | 6     |

---

## Design System (same across all phases)

```
Primary:        #E8572A
Accent hover:   #C94A20
Warm bg:        #FFF8F5
Card bg:        #FFFFFF
Text dark:      #1A1A1A
Text muted:     #717171
Border:         #E5E5E5
Success:        #008A05
Star gold:      #F59E0B
Card radius:    12px
Button radius:  8px
Font:           Inter (Google Fonts)
```

---

## SRS Traceability

| SRS Requirement Group                     | Covered in Phase                                         |
| ----------------------------------------- | -------------------------------------------------------- |
| FR-AUTH-01 to FR-AUTH-06 (Authentication) | Phase 2                                                  |
| FR-BPM-01 to FR-BPM-05 (Business Profile) | Phase 2 (reg), Phase 4 (profile view), Phase 6 (editor)  |
| FR-SRCH-01 to FR-SRCH-06 (Search)         | Phase 3                                                  |
| FR-REC-01/04/05 (Recommendations)         | Phase 1 (feed), Phase 5 (dashboard), Phase 6 (full page) |
| FR-REV-01 to FR-REV-05 (Reviews)          | Phase 4 (submit + display), Phase 5 (dashboard)          |
| FR-DASH-01 to FR-DASH-03 (Dashboards)     | Phase 5                                                  |
| NFR-USE-01 (Accessibility)                | All phases (ARIA labels, contrast, keyboard nav)         |
| NFR-SEC-02 (Consent)                      | Phase 6 (settings page consent toggle)                   |
| NFR-FAIR-01 (Fairness)                    | Phase 6 (AI page fairness note + match scores)           |

---

## After all 6 phases are done

Connect to the FastAPI backend by replacing mock data with real API calls:

- Replace `mockVendors` arrays with `fetch('/api/vendors?...')` calls
- Replace mock auth with real JWT token flow
- Use `useEffect` + `useState` pattern for all data fetching

Then deploy frontend to Vercel (free) and backend to Render (free) as per your SRS.
