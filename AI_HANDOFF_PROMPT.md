# AI Agent Handoff Prompt — CodevaSanté
**Date:** 2026-04-29 | **From:** Claude Sonnet 4.6 | **To:** Next AI agent

---

## CONTEXT: WHO YOU ARE WORKING WITH

You are building a clinic management system for **Codeva Santé** (Mauritania). Your collaborator is **Mohamed Salem**, a frontend developer at Codeva Startup. He works under the technical direction of **Ahmed Yahya** (tech lead). The CEO is **Mouhamedou**. Mohamed is 100% dependent on you to build the code — he does not yet understand the stack deeply. Ahmed Yahya has recommended that Mohamed learn the stack for 2 weeks before continuing. This means **your code must be production-quality, self-explanatory, and leave zero ambiguity** — Mohamed cannot debug complex issues alone.

---

## THE REPOSITORY

**Frontend:** `github.com/Muhammed-OTP/system-clinic-codeva`
**Backend:** `github.com/Ahmedyahya12/CodevaSante`
**Deploy:** Vercel → main branch (auto-deploy on merge)
**Backend live:** `https://codevasante.pythonanywhere.com/api`
**Current branch:** `main` — always pull before starting

---

## MANDATORY RULES (from CLAUDE.md — never break these)

1. **One phase at a time.** Follow Ahmed Yahya's 10-prompt method. Never mix patient + doctor + receptionist + admin in one prompt.
2. **All strings via `useT()`** — zero hardcoded French or Arabic in JSX. Every string key must be in `src/constants/translations.ts` in BOTH `fr` and `ar` blocks.
3. **Default language: Arabic.** `uiSlice` initializes to `'ar'`. Never force `dir="ltr"` on the app shell.
4. **Color tokens only.** Never write hex colors outside the design system (see token table below). Use Tailwind classes like `bg-primary`, `text-accent`, etc.
5. **TypeScript: `tsc -b`** — not `--noEmit`. Run it after every change. Zero errors before any PR.
6. **GitHub workflow for every change:** `git checkout main && git pull` → `git checkout -b feat/...` → commit → push → PR → wait for merge.
7. **Services:** one file per role (`authService.ts`, `patientService.ts`). Never call `fetch()` directly.
8. **Redux hooks:** always `useAppDispatch` and `useAppSelector` from `src/store/index.ts`.
9. **No speculative code.** Minimum code that solves the stated problem. No "future-proofing".
10. **Verify before reporting done.** State what success looks like, then confirm it.

---

## COLOR TOKEN TABLE (no hex outside this)

| Tailwind class | Hex | Use |
|---|---|---|
| `bg-primary` / `text-primary` | `#0914B7` | brand blue |
| `hover:bg-primary-dark` | `#070FA3` | hover state |
| `bg-primary-subtle` | `#F7FAFB` | light backgrounds |
| `text-accent` | `#1E2A39` | headings, labels |
| `bg-dark` | `#202C3E` | dark sections |
| `text-success` / `bg-success` | `#10B981` | success states |
| `text-error` / `bg-error` | `#EF4444` | error states |

Hardcoded hex IS acceptable only for: `#E2E8F0` (border), `#64748B` (body text), `#94A3B8` (placeholder), `#334155` (label), `#F1F5F9` (divider). These are Tailwind slate colors already used consistently throughout.

---

## TECH STACK

| Layer | Tech | Version |
|---|---|---|
| Framework | React | 18 |
| Language | TypeScript | strict |
| Build | Vite | latest |
| Styling | TailwindCSS | v4 (uses `@theme` directive, NOT `tailwind.config.js`) |
| State | Redux Toolkit (RTK) | createSlice, createAsyncThunk, isPending/isRejected matchers |
| Routing | React Router | v6 (nested routes, Outlet, NavLink) |
| HTTP | Axios | custom instance in `src/lib/axios.ts` |
| Forms | React Hook Form + Zod | bilingual schemas via factory `makeXSchema(lang)` |
| Icons | Lucide React | already installed |
| Font | Tajawal (AR) + Inter (LTR) | via CDN in `index.html` |

---

## COMPLETE FILE MAP — CURRENT STATE

```
src/
├── App.tsx                          ✅ renders Router()
├── main.tsx                         ✅ Provider + setLang sync on load
├── assets/hero.png                  ✅ hero image
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx               ✅ website navbar (lang toggle, links)
│   │   ├── Footer.tsx               ✅ website footer
│   │   ├── WebsiteLayout.tsx        ✅ wraps website pages with Navbar+Footer
│   │   ├── PatientLayout.tsx        ✅ sidebar nav for patient dashboard
│   │   └── SocialSidebar.tsx        ✅ floating WhatsApp/social on website
│   └── ui/
│       ├── Button.tsx               ✅ variants: primary|secondary|ghost|outline|success
│       ├── Input.tsx                ✅ exports Input + Textarea
│       └── Badge.tsx                ✅ variants: active|pending|confirmed|cancelled
│
├── constants/
│   ├── translations.ts              ✅ ALL keys present in both fr + ar blocks
│   └── data.ts                      ✅ services[], benefits[], doctors[] static data
│
├── features/
│   ├── auth/
│   │   └── authSlice.ts             ✅ setCredentials|setToken|logout + localStorage persist
│   └── patient/
│       └── patientSlice.ts          ✅ fetchMyProfile|fetchDoctors|bookAppointment|
│                                        cancelAppointment|fetchMyRecords thunks
│                                        + selectDoctor|clearPatientState actions
│
├── hooks/
│   ├── useT.ts                      ✅ returns { t, lang, isRTL }
│   └── useTitle.ts                  ✅ sets document.title
│
├── lib/
│   └── axios.ts                     ✅ baseURL from VITE_API_URL env, Bearer injection,
│                                        401 refresh queue (isRefreshing + failedQueue),
│                                        auto-logout on refresh fail
│
├── pages/
│   ├── website/                     ✅ COMPLETE — DO NOT TOUCH
│   │   ├── HomePage.tsx             ✅ hero CTAs → /auth, "En savoir plus" → /about
│   │   ├── AboutPage.tsx            ✅
│   │   ├── DoctorsPage.tsx          ✅ uses static data.ts doctors
│   │   ├── ContactPage.tsx          ✅ contact form (UI only, no API)
│   │   ├── AuthPage.tsx             ⚠️ LOGIN+REGISTER ARE FAKE — see critical bugs
│   │   └── NotFoundPage.tsx         ✅
│   └── app/
│       ├── LoginPage.tsx            ✅ real login → dispatches setCredentials → role redirect
│       ├── UnauthorizedPage.tsx     ✅ 403 page with back + login buttons
│       └── patient/
│           ├── PatientHomePage.tsx       ✅ welcome + 4 quick-access cards
│           ├── PatientProfilePage.tsx    ✅ fetches /patients/me/, displays fields
│           ├── DoctorsListPage.tsx       ✅ fetches /doctors/, selectDoctor → navigate
│           ├── DoctorDetailPage.tsx      ✅ reads selectedDoctor from Redux (no API)
│           ├── CreateAppointmentPage.tsx ✅ books via /appointments/create/
│           └── MyAppointmentsPage.tsx    🔴 PLACEHOLDER — backend endpoint missing
│
├── routes/
│   ├── index.tsx                    ✅ /app/* before /* (fixed)
│   ├── AppRoutes.tsx                ✅ patient nested routes under ProtectedRoute
│   ├── WebsiteRoutes.tsx            ✅ website routes under WebsiteLayout
│   └── ProtectedRoute.tsx           ✅ isAuthenticated check + role check
│
├── services/
│   ├── authService.ts               ✅ login|register|me|setFirstPassword|changePassword
│   └── patientService.ts            ✅ getMyProfile|getDoctors|createAppointment|
│                                        cancelAppointment|getMyRecords
│
├── store/
│   ├── index.ts                     ✅ configureStore + useAppDispatch + useAppSelector
│   ├── rootReducer.ts               ✅ auth + ui + patient
│   └── uiSlice.ts                   ✅ lang ('ar'|'fr') + setLang (persists to localStorage)
│
├── styles/index.css                 ✅ TailwindCSS v4 @theme tokens
│
├── types/
│   ├── auth.types.ts                ✅ UserRole|User|LoginPayload|LoginResponse|RegisterPayload
│   ├── patient.types.ts             ✅ PatientProfile|PatientListItem
│   ├── doctor.types.ts              ✅ Doctor
│   ├── appointment.types.ts         ✅ Appointment|AppointmentStatus|CreateAppointmentPayload
│   └── medical.types.ts             ✅ MedicalRecord
│
└── utils/cn.ts                      ✅ clsx/tailwind-merge helper
```

---

## CRITICAL BUGS TO FIX BEFORE ANY NEW FEATURE

### 🔴 BUG #1 — AuthPage.tsx login/register are completely fake
**File:** `src/pages/website/AuthPage.tsx`
**Problem:** `onSubmit` in both LoginFormBody and RegisterFormBody does nothing:
```typescript
function onSubmit(_data: LoginForm) {
  return new Promise<void>((resolve) => setTimeout(resolve, 600)) // FAKE
}
```
The real login is at `/app/login` (LoginPage.tsx) which actually calls the API.
AuthPage is the page patients land on from the website CTAs (`/auth`).
**Fix needed:** Wire `LoginFormBody.onSubmit` to call `authService.login()`, dispatch `setCredentials`, and redirect to `/app/patient/home`. Wire `RegisterFormBody.onSubmit` to call `authService.register()` then auto-login.

### 🔴 BUG #2 — MyAppointmentsPage is a placeholder
**File:** `src/pages/app/patient/MyAppointmentsPage.tsx`
**Problem:** Backend endpoint `GET /api/appointments/me/` does not exist yet.
**Action:** Ask Mouhamedou (backend dev) to add it. Expected response shape:
```json
[{
  "id": 1, "patient": 2, "patient_name": "...", "doctor": 1,
  "doctor_name": "...", "date": "YYYY-MM-DD", "time": "HH:MM:SS",
  "reason": "...", "status": "pending|confirmed|checked_in|cancelled",
  "created_at": "datetime"
}]
```
Once added: add `getMyAppointments()` to patientService.ts, add `fetchMyAppointments` thunk to patientSlice.ts, wire MyAppointmentsPage.tsx to display them.

### 🟠 BUG #3 — No route for `/app/set-password`
**File:** `src/pages/app/LoginPage.tsx` line 31, `src/routes/AppRoutes.tsx`
**Problem:** Doctors with `is_first_login: true` are redirected to `/app/set-password` on login, but that route and page don't exist. Any doctor logging in for the first time will get a blank page.
**Fix:** Create `src/pages/app/SetPasswordPage.tsx` + add route in AppRoutes.tsx + wire to `authService.setFirstPassword()`.

### 🟠 BUG #4 — patientSlice hardcoded Arabic error
**File:** `src/features/patient/patientSlice.ts` line 97
```typescript
state.error = action.error.message ?? 'خطأ غير متوقع'  // hardcoded Arabic
```
**Fix:** This is tricky because Redux reducers don't have access to the translation hook. The error from `action.error.message` will be the Axios error message (English). Pages that show `error` already use `t.errorLoad`. Accept this for now — the fallback Arabic is acceptable short-term.

---

## WHAT IS COMPLETE AND WORKING (DO NOT TOUCH)

- All website pages (`/`, `/about`, `/doctors`, `/contact`, `/auth` UI)
- Navbar, Footer, WebsiteLayout, SocialSidebar
- Button, Input/Textarea, Badge UI components
- Translation system (all 100+ keys in FR + AR)
- uiSlice (language + dir persistence)
- axios.ts (refresh interceptor with queue — this is delicate, don't modify)
- authSlice (localStorage persistence — just fixed in PR #17)
- ProtectedRoute (role-aware)
- PatientLayout (sidebar with logout)
- PatientHomePage, PatientProfilePage, DoctorsListPage, DoctorDetailPage, CreateAppointmentPage

---

## WHAT DOES NOT EXIST YET (next phases)

| Module | Status | Blocker |
|---|---|---|
| Doctor dashboard | Not started | Backend needs doctor appointment endpoint tested first |
| Receptionist dashboard | Not started | After doctor |
| Admin dashboard | Not started | After receptionist |
| Set password page | Not started | Medium priority |
| AuthPage real API wiring | Not started | High priority |
| Patient appointment list | Not started | Backend endpoint missing |

---

## API REFERENCE — SPRINT 1 (base: `https://codevasante.pythonanywhere.com/api`)

### Auth
| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| POST | `/auth/login/` | None | Login → returns access+refresh+user |
| POST | `/auth/register/patient/` | None | Patient self-registration |
| POST | `/auth/refresh/` | None | Refresh access token |
| GET | `/auth/me/` | Bearer | Get current user |
| POST | `/auth/first-login/set-password/` | IsDoctor + is_first_login | Doctor first password |
| POST | `/auth/change-password/` | Bearer | Change password |

### Patient
| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| GET | `/patients/me/` | IsPatient | Patient's own profile |

### Doctors
| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| GET | `/doctors/` | IsAuthenticated | Available doctors list |
| **MISSING** | `/doctors/{id}/` | — | No detail endpoint — use Redux state |

### Appointments
| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| POST | `/appointments/create/` | IsPatient | Book appointment |
| POST | `/appointments/{id}/cancel/` | IsPatient | Cancel appointment |
| **MISSING** | `/appointments/me/` | — | Patient's own list — Mouhamedou must add |

### Medical
| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| GET | `/medical-records/me/` | IsPatient | Patient's records |

### Appointment Request Shape
```json
{ "doctor": 1, "date": "YYYY-MM-DD", "time": "HH:MM", "reason": "optional string" }
```
**Note:** `doctor` field uses `user.id` from the `/doctors/` response `id` field — NOT a separate doctor profile ID.

---

## ROUTE MAP

### Website (`/`)
```
/            → HomePage
/about       → AboutPage
/doctors     → DoctorsPage (static data, not API)
/contact     → ContactPage
/auth        → AuthPage (login + register — currently FAKE API calls)
/*           → NotFoundPage
```

### App (`/app/`)
```
/app/login           → LoginPage (real login, all roles)
/app/unauthorized    → UnauthorizedPage

/app/patient/home              → PatientHomePage
/app/patient/profile           → PatientProfilePage
/app/patient/doctors           → DoctorsListPage
/app/patient/doctors/:id       → DoctorDetailPage (reads Redux, not :id param)
/app/patient/appointments      → MyAppointmentsPage (placeholder)
/app/patient/appointments/new  → CreateAppointmentPage

/app/set-password    → MISSING (doctors with is_first_login=true land here)
/app/doctor/home     → MISSING (not built)
/app/reception/home  → MISSING (not built)
/app/admin/home      → MISSING (not built)
```

---

## AUTH FLOW — HOW IT WORKS

1. User visits `/auth` → sees AuthPage with login/register tabs
2. **Currently:** Login is fake. **Should:** call `/auth/login/`, dispatch `setCredentials`, redirect by role.
3. Real login works at `/app/login` — used by all staff roles.
4. On login: `setCredentials` saves `{ user, token, refreshToken }` to Redux state AND localStorage keys: `auth_token`, `auth_refresh`, `auth_user`.
5. On page refresh: authSlice `loadFromStorage()` reads localStorage → session restored.
6. On any API call: axios request interceptor injects `Authorization: Bearer {token}`.
7. On 401 from any API: axios response interceptor tries to refresh (plain axios POST to `/auth/refresh/`), queues concurrent requests, retries them all with new token. If refresh fails → `logout()` → clear localStorage.
8. `ProtectedRoute role="patient"` checks `isAuthenticated` + `user.role`. Wrong role → `/app/unauthorized`. Not logged in → `/app/login`.

---

## REDUX STATE SHAPE

```typescript
// store.getState()
{
  auth: {
    user: User | null,          // { id, email, first_name, last_name, full_name, phone, role, role_display, is_first_login }
    token: string | null,       // access JWT
    refreshToken: string | null,
    isAuthenticated: boolean
  },
  ui: {
    lang: 'ar' | 'fr'
  },
  patient: {
    profile: PatientProfile | null,
    doctors: Doctor[],
    selectedDoctor: Doctor | null,  // set by selectDoctor action before navigating to detail
    appointments: Appointment[],    // only locally pushed after booking — no list fetch yet
    records: MedicalRecord[],
    loading: boolean,
    error: string | null
  }
}
```

---

## HOW TO ADD TRANSLATION KEYS

When you need a new string, add it to `src/constants/translations.ts` in BOTH `fr` and `ar` objects:
```typescript
// In fr: {}
myNewKey: 'French text',

// In ar: {}
myNewKey: 'النص بالعربية',
```
TypeScript will automatically update `TranslationKey = keyof typeof translations.fr`. Any missing key causes a compile error — this is intentional.

---

## HOW TO ADD A NEW PAGE

1. Create `src/pages/app/[role]/MyPage.tsx`
2. Add route in `src/routes/AppRoutes.tsx` nested under the correct `ProtectedRoute`
3. Add nav link to the corresponding Layout component if needed
4. Add translation keys to `translations.ts`
5. Add service function to the role's service file
6. Add Redux thunk to the role's slice if needed
7. Run `tsc -b` → zero errors
8. Commit + PR

---

## HOW TO ADD A NEW ROLE DASHBOARD

Example for Doctor (next after patient):
1. Create `src/pages/app/doctor/DoctorHomePage.tsx` — reads from `s.auth.user`
2. Create `src/components/layout/DoctorLayout.tsx` — sidebar like PatientLayout
3. Add `doctorReducer` from a new `src/features/doctor/doctorSlice.ts` to `rootReducer.ts`
4. Add `src/services/doctorService.ts`
5. Add types to `src/types/doctor.types.ts` (already exists for Doctor interface)
6. Add routes to AppRoutes.tsx: `<Route path="doctor" element={<ProtectedRoute role="doctor"><DoctorLayout /></ProtectedRoute>}>`
7. Add translation keys
8. `tsc -b` → zero errors → PR

---

## IMPORTANT QUIRKS

1. **DoctorDetailPage ignores `:id`** — There is no `GET /api/doctors/{id}/` endpoint. The detail page reads `state.patient.selectedDoctor` which is set when user clicks a doctor card. If user navigates directly to `/app/patient/doctors/123`, they see a "Médecin introuvable" message. This is intentional per the backend constraint.

2. **`Textarea` is exported from `Input.tsx`** — `import { Textarea } from '@/components/ui/Input'` — not a typo.

3. **TailwindCSS v4** — Uses `@theme` in `src/styles/index.css`. No `tailwind.config.js`. Custom colors are defined as CSS variables with the `--color-*` prefix.

4. **Form schemas use factory functions** — Zod schemas are created as `makeLoginSchema(lang)` inside components, not at module level. This ensures bilingual error messages. Always pass `key={lang}` to force remount when language changes.

5. **`tsc -b` vs `tsc --noEmit`** — Always use `tsc -b`. The `--noEmit` flag misses certain errors (specifically TS2556 spread errors) that Vercel's build catches. Use `npx tsc -b`.

6. **PR #17 may not be merged yet** — As of 2026-04-29, PR #17 (`fix/auth-persistence-and-cleanup`) was opened but may still be pending. Merge it first before starting any new work. It fixes localStorage auth persistence — without it, users get logged out on every page refresh.

---

## WORKFLOW TEMPLATE (use for every task)

```bash
# 1. Always start fresh from main
git checkout main && git pull

# 2. Create branch
git checkout -b feat/description-of-task   # or fix/ or chore/

# 3. Make changes...

# 4. TypeScript check
npx tsc -b

# 5. Stage and commit
git add src/path/to/changed/files
git commit -m "feat: short description of what and why

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"

# 6. Push and open PR
git push -u origin feat/description-of-task
gh pr create --title "feat: title" --body "..."

# 7. Wait for merge — never self-merge
```

---

## IMMEDIATE PRIORITY ORDER FOR NEXT AGENT

1. **Merge PR #17** if not already merged (auth persistence fix)
2. **Fix AuthPage** — wire real login + register API calls (highest user impact)
3. **Wait for Mouhamedou** to add `GET /api/appointments/me/` — then wire MyAppointmentsPage
4. **Add SetPasswordPage** for doctor first-login flow
5. **Doctor dashboard** — only after Postman-testing every doctor endpoint with a real JWT

---

## DOCUMENTS IN THE REPO TO READ

| File | What it contains |
|---|---|
| `CLAUDE.md` | Architecture rules, API reference, color tokens, file map |
| `AGENTS.md` | Agent behavior rules, testing checklist |
| `README.md` | Project overview, setup instructions |
| `AI_HANDOFF.md` | Previous handoff notes |
| `audit-technique-codevasante.html` | Full French technical audit with criticality ratings |

---

*Handoff prepared by Claude Sonnet 4.6 after full live codebase audit — 2026-04-29*
