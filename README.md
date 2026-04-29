# CodevaSanté — Clinic Management System

Full-stack clinic management system built for Codeva startup. React frontend + Django REST Framework backend.

**Live frontend:** https://system-clinic-codeva.vercel.app  
**Backend API:** https://codevasante.pythonanywhere.com/api  
**Backend repo:** https://github.com/Ahmedyahya12/CodevaSante

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| UI framework | React 19 + TypeScript 6 |
| Build | Vite 8 |
| Styling | TailwindCSS v4 (CSS variables, no config file) |
| State | Redux Toolkit (RTK) + React Redux |
| Routing | React Router v7 |
| HTTP | Axios with JWT refresh interceptor |
| Forms | React Hook Form + Zod (bilingual schemas) |
| Deployment | Vercel (main branch auto-deploys) |

---

## Getting started

```bash
npm install
npm run dev          # http://localhost:5173
npx tsc -b           # type-check (always use -b, not --noEmit)
npm run build        # production build
```

No `.env` file required — the API URL defaults to the production backend in `src/lib/axios.ts`.

---

## Project structure

```
src/
├── components/
│   ├── layout/
│   │   ├── PatientLayout.tsx     # App top-nav for patient pages (sticky, RTL-aware)
│   │   ├── WebsiteLayout.tsx     # Website shell
│   │   ├── Navbar.tsx            # Website navbar
│   │   └── Footer.tsx            # Website footer
│   └── ui/
│       ├── Button.tsx            # primary | secondary | ghost | outline | success
│       ├── Input.tsx             # Input + Textarea
│       └── Badge.tsx             # status badges
├── constants/
│   └── translations.ts           # All FR/AR strings — never hardcode text
├── features/
│   ├── auth/authSlice.ts         # user, token, refreshToken, isAuthenticated
│   └── patient/patientSlice.ts   # profile, doctors, selectedDoctor, appointments, records
├── hooks/
│   ├── useT.ts                   # { t, lang, isRTL } — translation hook
│   └── useTitle.ts               # document.title hook
├── lib/
│   └── axios.ts                  # Axios instance + Bearer token inject + 401 refresh interceptor
├── pages/
│   ├── website/                  # Public website pages (complete)
│   └── app/
│       ├── LoginPage.tsx         # Shared login for all roles
│       ├── UnauthorizedPage.tsx  # Wrong-role redirect target
│       └── patient/              # Patient dashboard pages
├── routes/
│   ├── index.tsx                 # BrowserRouter root
│   ├── WebsiteRoutes.tsx         # /  routes
│   ├── AppRoutes.tsx             # /app/* routes (nested layout)
│   └── ProtectedRoute.tsx        # Role-aware auth guard
├── services/
│   ├── authService.ts            # login, register, me, refresh, changePassword
│   └── patientService.ts         # getMyProfile, getDoctors, createAppointment, cancelAppointment
├── store/
│   ├── index.ts                  # configureStore + typed hooks
│   ├── rootReducer.ts            # auth + ui + patient
│   └── uiSlice.ts                # lang ('ar'|'fr'), dir
└── types/
    ├── auth.types.ts
    ├── patient.types.ts
    ├── doctor.types.ts
    ├── appointment.types.ts
    └── medical.types.ts
```

---

## Routing map

| Path | Component | Guard |
|------|-----------|-------|
| `/` | WebsiteRoutes → HomePage | public |
| `/about` | AboutPage | public |
| `/doctors` | DoctorsPage | public |
| `/contact` | ContactPage | public |
| `/app/login` | LoginPage | redirects if already authenticated |
| `/app/unauthorized` | UnauthorizedPage | public |
| `/app/patient/home` | PatientHomePage | ProtectedRoute(patient) |
| `/app/patient/profile` | PatientProfilePage | ProtectedRoute(patient) |
| `/app/patient/doctors` | DoctorsListPage | ProtectedRoute(patient) |
| `/app/patient/doctors/:id` | DoctorDetailPage | ProtectedRoute(patient) |
| `/app/patient/appointments` | MyAppointmentsPage | ProtectedRoute(patient) |
| `/app/patient/appointments/new` | CreateAppointmentPage | ProtectedRoute(patient) |

Patient routes share `PatientLayout` (sticky top nav + `<Outlet />`).

---

## State management

```
Redux store
├── auth
│   ├── user: User | null
│   ├── token: string | null
│   ├── refreshToken: string | null
│   └── isAuthenticated: boolean
├── ui
│   ├── lang: 'ar' | 'fr'
│   └── dir: 'rtl' | 'ltr'
└── patient
    ├── profile: PatientProfile | null
    ├── doctors: Doctor[]
    ├── selectedDoctor: Doctor | null   ← used by DoctorDetailPage (no API endpoint)
    ├── appointments: Appointment[]
    ├── records: MedicalRecord[]
    ├── loading: boolean
    └── error: string | null
```

**Thunks in patientSlice:** `fetchMyProfile`, `fetchDoctors`, `bookAppointment`, `cancelAppointment`, `fetchMyRecords`

---

## Authentication flow

1. `POST /api/auth/login/` → returns `{ access, refresh, user }`
2. Frontend dispatches `setCredentials({ user, token: access, refreshToken: refresh })`
3. All subsequent requests inject `Authorization: Bearer <token>` (Axios request interceptor)
4. On 401: interceptor attempts one silent refresh via `POST /api/auth/refresh/`
5. If refresh succeeds → retries original request with new token
6. If refresh fails → dispatches `logout()` + clears state

---

## i18n / Translations

Default language is **Arabic**. All strings live in `src/constants/translations.ts`.

```tsx
// In any component:
const { t, lang, isRTL } = useT()
// t.someKey  → Arabic string (default)
// lang       → 'ar' | 'fr'
// isRTL      → true by default
```

Layout direction is set by `PatientLayout` and `WebsiteLayout` from `uiSlice.lang`.

---

## Backend API summary

Base URL: `https://codevasante.pythonanywhere.com/api`

| Method | Path | Role | Description |
|--------|------|------|-------------|
| POST | `/auth/login/` | Any | Login, returns JWT pair + user |
| POST | `/auth/register/patient/` | Any | Patient self-registration |
| POST | `/auth/refresh/` | Any | Refresh access token |
| GET | `/auth/me/` | Authenticated | Current user profile |
| GET | `/patients/me/` | Patient | Patient's own profile |
| GET | `/doctors/` | Authenticated | List available doctors |
| POST | `/appointments/create/` | Patient | Book appointment |
| POST | `/appointments/{id}/cancel/` | Patient | Cancel appointment |
| GET | `/medical-records/me/` | Patient | Patient's medical records |
| GET | `/reception/today-appointments/` | Receptionist | Today's appointments |
| POST | `/reception/appointments/{id}/confirm-arrival/` | Receptionist | Mark patient arrived |

### Known missing endpoints (blocking)

| Missing | Workaround |
|---------|-----------|
| `GET /api/appointments/me/` | `MyAppointmentsPage` shows placeholder — **request from backend team** |
| `GET /api/doctors/{id}/` | Store selected doctor in Redux on list click, read from state in detail page |

---

## Appointment status lifecycle

```
pending → confirmed → checked_in → cancelled
```

---

## Design system

All colors use CSS variables defined in `index.css`:

| Variable | Hex | Use |
|----------|-----|-----|
| `--color-primary` | `#0914B7` | brand blue, buttons, links |
| `--color-primary-dark` | `#070FA3` | hover state |
| `--color-primary-subtle` | `#F7FAFB` | light backgrounds |
| `--color-accent` | `#1E2A39` | headings, primary text |
| `--color-dark` | `#202C3E` | dark sections |
| `--color-success` | `#10B981` | success states |
| `--color-error` | `#EF4444` | error states |

Fonts: **Tajawal** (Arabic/RTL), **Inter** (French/LTR) — loaded via CDN in `index.html`.

---

## Sprint 1 — Development status

| # | Feature | Status | Branch/PR |
|---|---------|--------|-----------|
| 1 | Backend analysis | ✅ Done | — |
| 2 | UI audit | ✅ Done | — |
| 3 | Axios + JWT refresh interceptor | ✅ Done | PR #11 |
| 4 | Auth Redux slice rewrite | ✅ Done | PR #11 |
| 5 | ProtectedRoute + UnauthorizedPage | ✅ Done | PR #12 |
| 6 | Services: authService + patientService | ✅ Done | PR #13 |
| 7 | patientSlice (5 thunks) | ✅ Done | PR #14 |
| 8 | Patient pages (all 6) | ✅ Done | PR pending — `feat/app-patient-pages` |
| 9 | Patient user story testing | ⬅ Next | — |
| 10 | Doctor interface analysis | pending | — |

### Patient pages built

| Page | Path | Notes |
|------|------|-------|
| LoginPage | `/app/login` | All roles, redirects by role on success |
| PatientHomePage | `/app/patient/home` | Welcome + 4 quick-link cards |
| PatientProfilePage | `/app/patient/profile` | Fetches + displays 8 profile fields |
| DoctorsListPage | `/app/patient/doctors` | Card grid, available badge, click to detail |
| DoctorDetailPage | `/app/patient/doctors/:id` | Reads Redux state (no API call) |
| CreateAppointmentPage | `/app/patient/appointments/new` | date + time + reason, pre-fills doctor |
| MyAppointmentsPage | `/app/patient/appointments` | Placeholder — waiting for `/api/appointments/me/` |

---

## Contributing

1. Create branch: `feat/app-<task-name>` from `main`
2. Make changes, run `npx tsc -b` — zero errors required
3. Open PR to `main`
4. Merge after review — Vercel deploys automatically
