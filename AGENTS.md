# AGENTS.md — CodevaSanté

> Universal instructions for any AI coding agent (Cursor, Copilot, Gemini, GPT, etc.).
> This file is the single source of truth. Read it entirely before touching any code.

---

## Behavioral rules (always active)

- **Think before coding.** State assumptions explicitly. If multiple interpretations exist, present them — don't pick silently.
- **Simplicity first.** Minimum code that solves the problem. No speculative features, no abstractions for single-use code.
- **Surgical changes.** Touch only what the task requires. Match existing style exactly.
- **Follow Ahmed Yahya's 10-phase method strictly.** One phase at a time, validated before moving to the next. Never mix roles (patient/doctor/receptionist/admin) in the same task.
- **Verify before reporting done.** State the success criterion, then confirm it is met.
- **TypeScript:** Always run `npx tsc -b` (not `tsc --noEmit`) after every change. Vercel uses `tsc -b` and catches errors `--noEmit` misses.
- **Never spread arrays into RTK matchers.** `isPending(thunkA, thunkB)` — pass thunks directly, no `...array`.
- **No hardcoded strings anywhere.** All UI text must go through `useT()`.
- **No raw hex colors.** Use CSS tokens only (`--color-primary`, `--color-error`, etc.).
- **No comments explaining what code does.** Only write a comment if the WHY is genuinely non-obvious.

---

## Project snapshot

**App:** CodevaSanté — clinic management system
**Stack:** React 18 + TypeScript 6, Vite 8, TailwindCSS v4, RTK (Redux Toolkit), React Router v7, Axios, React Hook Form + Zod
**Repo:** github.com/Muhammed-OTP/system-clinic-codeva
**Deploy:** Vercel → main branch (auto-deploy on push)
**Backend:** DRF + JWT on https://codevasante.pythonanywhere.com/api
**Backend repo:** github.com/Ahmedyahya12/CodevaSante
**Team:** Mohamed Salem (frontend), Ahmed Yahya (tech lead), Mouhamedou (backend)

---

## Architecture rules (locked — never revisit)

| Rule | Detail |
|------|--------|
| Default language | Arabic (`lang: 'ar'` in `uiSlice`) |
| Website `/` | FR + AR — always use `useT()` |
| Dashboard `/app/*` | Arabic by default — use `useT()` same as website |
| AppShell | Respects `lang`/`dir` from `uiSlice` — do **not** force `dir="ltr"` |
| Font | Tajawal (AR/RTL) + Inter (FR/LTR via `[dir="ltr"]`) — CDN in `index.html` |
| Translations | All keys in `src/constants/translations.ts` — no hardcoded strings |
| Zod schemas | Bilingual errors → always factory `makeXSchema(lang)` + `key={lang}` on form |
| Auth token | Stored in Redux `auth.token`, injected by `src/lib/axios.ts` interceptor |
| 401 handling | `src/lib/axios.ts` auto-dispatches `logout()` + triggers one token refresh before logout |
| Types | **Separated by feature** — `auth.types.ts`, `patient.types.ts`, `doctor.types.ts`, `appointment.types.ts`, `medical.types.ts` |
| Store hooks | `useAppDispatch` and `useAppSelector` live in `src/store/index.ts` |
| Services | One file per role: `src/services/authService.ts`, `src/services/patientService.ts` |
| ProtectedRoute | Lives at `src/routes/ProtectedRoute.tsx` — role-aware (wrong role → UnauthorizedPage) |
| Patient pages | Nested under `<PatientLayout>` — do NOT add `dir` to individual pages |
| Doctor detail | No `GET /api/doctors/{id}/` endpoint exists. Read from `state.patient.selectedDoctor` only. |
| LoginPage loading | Local `useState` — no loginThunk in Redux |

---

## Color tokens (no hex outside this table)

| Token | Hex | Use |
|-------|-----|-----|
| `--color-primary` | `#0914B7` | brand blue |
| `--color-primary-dark` | `#070FA3` | hover |
| `--color-primary-subtle` | `#F7FAFB` | light bg |
| `--color-accent` | `#1E2A39` | headings |
| `--color-dark` | `#202C3E` | dark sections |
| `--color-success` | `#10B981` | status |
| `--color-error` | `#EF4444` | status |

---

## Ahmed Yahya — Sprint 1 integration method (MANDATORY ORDER)

> **Rule:** Never generate patient + doctor + receptionist + admin in one task. One phase at a time.

| # | Phase | Status | PR |
|---|-------|--------|----|
| 1 | Analyse backend Sprint 1 | ✅ DONE | — |
| 2 | Vérification UI patient avant intégration | ✅ DONE | — |
| 3 | Configuration Axios (baseURL + JWT + refresh interceptor) | ✅ DONE | #11 |
| 4 | Redux Auth Slice | ✅ DONE | #11 |
| 5 | ProtectedRoute (role-aware) | ✅ DONE | #12 |
| 6 | Services API Patient | ✅ DONE | #13 |
| 7 | Patient Redux Slice (createAsyncThunk) | ✅ DONE | #14 |
| 8 | Pages patient Sprint 1 (one by one) | ✅ DONE | ⬅ PR pending (branch: feat/app-patient-pages) |
| 9 | Test complet des user stories patient | ⬅ NEXT | — |
| 10 | Préparation interface médecin (analysis only) | pending | — |

**Checklist before any code task:**
- [ ] Endpoint tested in Postman with real JWT
- [ ] JSON payload known
- [ ] JSON response known
- [ ] Role is clear
- [ ] Frontend route is clear
- [ ] File to modify is clear
- [ ] Design to preserve is clear
- [ ] NOT mixing roles in same task

---

## API reference — complete (base: https://codevasante.pythonanywhere.com/api)

### Auth

#### `POST /api/auth/register/patient/` — Patient self-registration (AllowAny)
```json
// Request
{
  "email": "string", "first_name": "string", "last_name": "string",
  "phone": "string (optional)", "password": "string", "password_confirm": "string",
  "date_of_birth": "YYYY-MM-DD (optional)", "gender": "M|F (optional)",
  "address": "string (optional)", "national_id": "string (optional)",
  "emergency_contact": "string (optional)", "medical_notes": "string (optional)"
}
// Response 201: { "message": "...", "data": { id, email, full_name, phone, role, role_display, is_first_login } }
```

#### `POST /api/auth/login/` — Login (AllowAny)
```json
// Request: { "email": "string", "password": "string" }
// Response 200: { "access": "jwt", "refresh": "jwt", "user": { id, email, first_name, last_name, full_name, phone, role, role_display, is_first_login } }
// Error 400: wrong credentials or inactive account
```

#### `POST /api/auth/refresh/` — Refresh JWT (AllowAny)
```json
// Request: { "refresh": "jwt_refresh_token" }
// Response 200: { "access": "new_jwt_access_token" }
// Error 401: refresh expired → force logout
```

#### `GET /api/auth/me/` — Current user (IsAuthenticated)
#### `POST /api/auth/first-login/set-password/` — Doctor first login (IsDoctor + is_first_login=true)
#### `POST /api/auth/change-password/` — Change password (IsAuthenticated)

---

### Patients

#### `GET /api/patients/me/` — Patient profile (IsPatient)
```json
// Response 200: { id, full_name, email, first_name, last_name, phone, date_of_birth, gender, address, national_id, emergency_contact, medical_notes }
```

#### `GET /api/patients/search/?q=ahmed` — Search patients (IsReceptionist)
#### `POST /api/patients/create/` — Create patient (IsReceptionist)
#### `GET /api/patients/my-doctor-patients/` — Doctor's patient list (IsDoctor)

---

### Doctors

#### `GET /api/doctors/` — Available doctors list (IsAuthenticated — all roles)
```json
// Response 200 — array: [{ id, full_name, email, phone, specialty, bio, years_of_experience, available }]
```
> ⚠️ `id` here is `user.id` — use this as the doctor FK in appointments.
> ⚠️ No `GET /api/doctors/{id}/` endpoint. For detail page: store selected doctor in Redux from list, render from state.

#### `POST /api/doctors/create/` — Create doctor (IsAdmin)
#### `GET /api/doctors/me/` — Doctor's own profile (IsDoctor)
#### `PUT /api/doctors/me/update/` — Update doctor profile (IsDoctor)

---

### Appointments

#### `POST /api/appointments/create/` — Book appointment (IsPatient)
```json
// Request: { "doctor": 1, "date": "YYYY-MM-DD", "time": "HH:MM", "reason": "optional" }
// Response 201: { "message": "...", "data": { id, patient, patient_name, doctor, doctor_name, date, time, reason, status, created_at } }
```

#### `POST /api/appointments/{id}/cancel/` — Cancel appointment (IsPatient)
#### `POST /api/appointments/reception/create/` — Create appointment (IsReceptionist)
#### `GET /api/appointments/doctor/` — Doctor's appointments (IsDoctor)

---

### Medical Records

#### `GET /api/medical-records/me/` — Patient's own records (IsPatient)
#### `POST /api/medical-records/create/` — Add note (IsDoctor)
#### `GET /api/medical-records/doctor/?patient_id=1` — Doctor reads patient records (IsDoctor)

---

### Reception

#### `GET /api/reception/today-appointments/` — Today's list (IsReceptionist)
#### `POST /api/reception/appointments/{id}/confirm-arrival/` — Confirm arrival (IsReceptionist)

---

## Missing backend endpoints (known gaps — flag to Mouhamedou)

| Missing | Impact | Workaround |
|---------|--------|------------|
| `GET /api/appointments/me/` — patient lists own appointments | Patient can't see their RDVs | **BLOCKING** — `MyAppointmentsPage` shows placeholder |
| `GET /api/doctors/{id}/` | No fresh fetch for doctor detail | Store selected doctor in Redux from list |

---

## Appointment statuses
`pending` → `confirmed` → `checked_in` → `cancelled`

---

## Role-based routing

| Role | Login redirect | Guard |
|------|---------------|-------|
| `patient` | `/app/patient/home` | ProtectedRoute role=patient |
| `doctor` | `/app/doctor/home` (or `/app/set-password` if `is_first_login`) | ProtectedRoute role=doctor |
| `receptionist` | `/app/reception/home` | ProtectedRoute role=receptionist |
| `admin` | `/app/admin/home` | ProtectedRoute role=admin |

---

## Complete file map (post Task 9 / Phase 8)

```
src/
├── components/
│   ├── layout/
│   │   ├── PatientLayout.tsx     — sticky top nav, logout, RTL-aware, renders <Outlet />
│   │   ├── WebsiteLayout.tsx     — website shell (COMPLETE — do not touch)
│   │   ├── Navbar.tsx            — website navbar (COMPLETE — do not touch)
│   │   ├── Footer.tsx            — website footer (COMPLETE — do not touch)
│   │   └── SocialSidebar.tsx     — website sidebar (COMPLETE — do not touch)
│   └── ui/
│       ├── Button.tsx            — variants: primary|secondary|ghost|outline|success
│       ├── Input.tsx             — Input + Textarea components
│       └── Badge.tsx             — variants: scheduled|waiting|cancelled|completed|active|onleave|blue|purple|green
├── constants/
│   ├── translations.ts           — ALL FR/AR keys — never hardcode strings
│   └── data.ts                   — static mock data (website only)
├── features/
│   ├── auth/
│   │   └── authSlice.ts          — user, token, refreshToken, isAuthenticated + setCredentials/setToken/logout
│   └── patient/
│       └── patientSlice.ts       — profile, doctors, selectedDoctor, appointments, records, loading, error
├── hooks/
│   ├── useT.ts                   — { t, lang, isRTL } from uiSlice
│   └── useTitle.ts               — document.title hook
├── lib/
│   └── axios.ts                  — Axios instance + JWT inject + refresh interceptor + auto-logout
├── pages/
│   ├── website/                  — ALL COMPLETE — do not touch
│   └── app/
│       ├── LoginPage.tsx         — shared login for all roles ✅
│       ├── UnauthorizedPage.tsx  — wrong role page ✅
│       └── patient/
│           ├── PatientHomePage.tsx         — welcome + 4 quick-link cards ✅
│           ├── PatientProfilePage.tsx      — fetchMyProfile, 8 fields display ✅
│           ├── DoctorsListPage.tsx         — fetchDoctors, card grid, selectDoctor ✅
│           ├── DoctorDetailPage.tsx        — reads selectedDoctor from Redux ✅
│           ├── CreateAppointmentPage.tsx   — bookAppointment thunk, date/time/reason ✅
│           └── MyAppointmentsPage.tsx      — BLOCKED placeholder ✅
├── routes/
│   ├── index.tsx                 — BrowserRouter root
│   ├── WebsiteRoutes.tsx         — website routes (COMPLETE — do not touch)
│   ├── AppRoutes.tsx             — nested patient layout route
│   └── ProtectedRoute.tsx        — role-aware guard
├── services/
│   ├── authService.ts            — login, register, me, refresh, setFirstPassword, changePassword
│   └── patientService.ts         — getMyProfile, getDoctors, createAppointment, cancelAppointment, getMyRecords
├── store/
│   ├── index.ts                  — configureStore + useAppDispatch + useAppSelector
│   ├── rootReducer.ts            — auth + ui + patient
│   └── uiSlice.ts                — lang ('ar'|'fr'), dir — do not touch
├── types/
│   ├── auth.types.ts             — User, UserRole, LoginPayload, LoginResponse, RegisterPayload
│   ├── patient.types.ts          — PatientProfile, PatientListItem
│   ├── doctor.types.ts           — Doctor
│   ├── appointment.types.ts      — Appointment, AppointmentStatus, CreateAppointmentPayload
│   └── medical.types.ts          — MedicalRecord
└── utils/
    └── cn.ts                     — clsx + tailwind-merge
```

---

## What is still needed (Sprint 1 — after Phase 9 verification)

### Immediate (Phase 9 — test & fix)
- Login with a real patient JWT and walk all 6 pages
- Confirm Redux state updates correctly on each action
- Fix any runtime errors found during testing
- Confirm RTL layout is correct on all pages
- Open PR for `feat/app-patient-pages`

### Blocked by backend
- `MyAppointmentsPage` — blocked until Mouhamedou adds `GET /api/appointments/me/`

### Next after patient (Phase 10+)
- Doctor interface analysis (Phase 10 — analysis only, no code)
- Doctor pages: home, profile, appointments list, medical records
- Receptionist interface
- Admin interface

---

## Environment variables

```
VITE_API_URL=https://codevasante.pythonanywhere.com/api   # already set as default fallback in axios.ts
```

No `.env` file required for development — the URL is hardcoded as fallback in `src/lib/axios.ts`.

---

## Git workflow

- `main` → Vercel auto-deploys
- One branch per task: `feat/app-<task-name>`
- Open PR to main, merge after `tsc -b` passes
- Never push directly to main
