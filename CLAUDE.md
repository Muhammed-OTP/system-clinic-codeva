# CLAUDE.md — CodevaSanté

## Behavioral rules (always active)

- **Think before coding.** State assumptions explicitly. If multiple interpretations exist, present them — don't pick silently.
- **Simplicity first.** Minimum code that solves the problem. No speculative features, no abstractions for single-use code.
- **Surgical changes.** Touch only what the task requires. Match existing style.
- **Follow Ahmed Yahya's 10-prompt method strictly.** One phase at a time, validated before moving to the next. Never mix roles in the same prompt.
- **Verify before reporting done.** State the success criterion, then confirm it's met.

---

## Project snapshot

**App:** CodevaSanté — clinic management system  
**Stack:** React 18 + TypeScript, Vite, TailwindCSS v4, RTK (Redux Toolkit), React Router v6, Axios, React Hook Form + Zod  
**Repo:** github.com/Muhammed-OTP/system-clinic-codeva  
**Deploy:** Vercel → main branch (auto-deploy)  
**Backend:** DRF + JWT on https://codevasante.pythonanywhere.com/api  
**Backend repo:** github.com/Ahmedyahya12/CodevaSante  

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
| 401 handling | `src/lib/axios.ts` auto-dispatches `logout()` + triggers refresh first |
| Types | **Separated by feature** — `auth.types.ts`, `patient.types.ts`, `doctor.types.ts`, `appointment.types.ts`, `medical.types.ts` |
| Store hooks | `useAppDispatch` and `useAppSelector` live in `src/store/index.ts` (already done) |
| Services | One file per role: `src/services/authService.ts`, `src/services/patientService.ts` |
| ProtectedRoute | Lives at `src/routes/ProtectedRoute.tsx` — role-aware (wrong role → UnauthorizedPage) |

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

> **Rule:** Never generate patient + doctor + receptionist + admin in one prompt. One phase at a time.

| # | Phase | Status |
|---|-------|--------|
| 1 | Analyse backend Sprint 1 | ✅ DONE |
| 2 | Vérification UI patient avant intégration | ⬅ NEXT |
| 3 | Configuration Axios (baseURL + JWT + refresh interceptor) | pending |
| 4 | Redux Auth Slice | pending |
| 5 | ProtectedRoute (role-aware) | pending |
| 6 | Services API Patient | pending |
| 7 | Patient Redux Slice (createAsyncThunk) | pending |
| 8 | Pages patient Sprint 1 (one by one) | pending |
| 9 | Test complet des user stories patient | pending |
| 10 | Préparation interface médecin (analysis only) | pending |

**Checklist before any code prompt:**
- [ ] Endpoint tested in Postman with real JWT
- [ ] JSON payload known
- [ ] JSON response known
- [ ] Role is clear
- [ ] Frontend route is clear
- [ ] File to modify is clear
- [ ] Design to preserve is clear
- [ ] NOT mixing roles in same prompt

---

## API reference — complete (base: https://codevasante.pythonanywhere.com/api)

### Auth

#### `POST /api/auth/register/patient/` — Patient self-registration (AllowAny)
```json
// Request
{
  "email": "string",
  "first_name": "string",
  "last_name": "string",
  "phone": "string (optional)",
  "password": "string",
  "password_confirm": "string",
  "date_of_birth": "YYYY-MM-DD (optional)",
  "gender": "M|F (optional)",
  "address": "string (optional)",
  "national_id": "string (optional)",
  "emergency_contact": "string (optional)",
  "medical_notes": "string (optional)"
}
// Response 201
{
  "message": "تم إنشاء حساب المريض بنجاح.",
  "data": {
    "id": 1, "email": "...", "first_name": "...", "last_name": "...",
    "full_name": "...", "phone": "...", "role": "patient",
    "role_display": "مريض", "is_first_login": false
  }
}
```

#### `POST /api/auth/login/` — Login (AllowAny)
```json
// Request
{ "email": "string", "password": "string" }
// Response 200
{
  "access": "jwt_access_token",
  "refresh": "jwt_refresh_token",
  "user": {
    "id": 1, "email": "...", "first_name": "...", "last_name": "...",
    "full_name": "...", "phone": "...",
    "role": "patient|doctor|receptionist|admin",
    "role_display": "...", "is_first_login": false
  }
}
// Error 400: wrong credentials or inactive account
```

#### `POST /api/auth/refresh/` — Refresh JWT (AllowAny)
```json
// Request
{ "refresh": "jwt_refresh_token" }
// Response 200
{ "access": "new_jwt_access_token" }
// Error 401: refresh expired → force logout
```

#### `GET /api/auth/me/` — Current user (IsAuthenticated)
```json
// Response 200
{
  "id": 1, "email": "...", "first_name": "...", "last_name": "...",
  "full_name": "...", "phone": "...",
  "role": "patient|doctor|receptionist|admin",
  "role_display": "...", "is_first_login": false
}
```

#### `POST /api/auth/first-login/set-password/` — Doctor first login (IsDoctor + is_first_login=true)
```json
// Request
{ "new_password": "string", "confirm_password": "string" }
// Response 200
{ "message": "تم تعيين كلمة المرور بنجاح. يمكنك الآن استخدام الحساب بشكل طبيعي." }
// Error 403: not a doctor | Error 400: already set
```

#### `POST /api/auth/change-password/` — Change password (IsAuthenticated)
```json
// Request
{ "old_password": "string", "new_password": "string", "confirm_password": "string" }
// Response 200
{ "message": "تم تغيير كلمة المرور بنجاح." }
```

---

### Patients

#### `GET /api/patients/me/` — Patient profile (IsPatient)
```json
// Response 200
{
  "id": 1, "full_name": "...", "email": "...", "first_name": "...",
  "last_name": "...", "phone": "...", "date_of_birth": "YYYY-MM-DD|null",
  "gender": "M|F|''", "address": "...", "national_id": "...",
  "emergency_contact": "...", "medical_notes": "..."
}
```

#### `GET /api/patients/search/?q=ahmed` — Search patients (IsReceptionist)
```json
// Response 200 — array of PatientListSerializer
[{ "id": 1, "full_name": "...", "email": "...", "phone": "...",
   "date_of_birth": "...", "gender": "...", "national_id": "..." }]
```

#### `POST /api/patients/create/` — Create patient (IsReceptionist)
```json
// Request: same fields as register/patient/ + password/password_confirm
// Response 201: { "message": "...", "data": PatientProfileSerializer }
```

#### `GET /api/patients/my-doctor-patients/` — Doctor's patient list (IsDoctor)
```json
// Response 200 — array
[{
  "id": 1, "patient_id": 2, "profile_id": 1,
  "full_name": "...", "first_name": "...", "last_name": "...",
  "email": "...", "phone": "...", "date_of_birth": "...",
  "gender": "...", "national_id": "...", "created_at": "datetime"
}]
```

---

### Doctors

#### `GET /api/doctors/` — Available doctors list (IsAuthenticated — all roles)
```json
// Response 200 — array (only available=true doctors)
[{
  "id": 1,           // this is user.id — use this as doctor FK in appointments
  "full_name": "...", "email": "...", "phone": "...",
  "specialty": "...", "bio": "...",
  "years_of_experience": 5, "available": true
}]
```
> ⚠️ No `GET /api/doctors/{id}/` endpoint exists. For doctor detail page: store selected doctor in Redux when user clicks from list, render from state.

#### `POST /api/doctors/create/` — Create doctor (IsAdmin)
#### `GET /api/doctors/me/` — Doctor's own profile (IsDoctor)
#### `PUT /api/doctors/me/update/` — Update doctor profile (IsDoctor) — fields: specialty, bio, years_of_experience, available

---

### Appointments

#### `POST /api/appointments/create/` — Book appointment (IsPatient)
```json
// Request
{
  "doctor": 1,          // user.id of doctor (from doctors list "id" field)
  "date": "YYYY-MM-DD",
  "time": "HH:MM",
  "reason": "string (optional)"
}
// Response 201
{
  "message": "تم حجز الموعد بنجاح.",
  "data": {
    "id": 1, "patient": 2, "patient_name": "...", "doctor": 1,
    "doctor_name": "...", "date": "YYYY-MM-DD", "time": "HH:MM:SS",
    "reason": "...", "status": "pending", "created_at": "datetime"
  }
}
```

#### `POST /api/appointments/{id}/cancel/` — Cancel appointment (IsPatient)
```json
// Response 200: { "message": "تم إلغاء الموعد بنجاح." }
// Error 404: not found or not patient's appointment
// Error 400: already cancelled
```

#### `POST /api/appointments/reception/create/` — Create appointment (IsReceptionist)
```json
// Request: { "patient": userId, "doctor": userId, "date": "YYYY-MM-DD", "time": "HH:MM", "reason": "..." }
```

#### `GET /api/appointments/doctor/` — Doctor's appointments (IsDoctor)
```json
// Response 200 — array
[{
  "id": 1, "patient": 2, "patient_name": "...", "doctor": 1,
  "doctor_name": "...", "date": "YYYY-MM-DD", "time": "HH:MM:SS",
  "reason": "...", "status": "pending|confirmed|checked_in|cancelled",
  "created_at": "datetime"
}]
```

---

### Medical Records

#### `GET /api/medical-records/me/` — Patient's own records (IsPatient)
```json
// Response 200 — array
[{
  "id": 1, "patient": 2, "patient_name": "...",
  "doctor": 1, "doctor_name": "...", "note": "...", "created_at": "datetime"
}]
```

#### `POST /api/medical-records/create/` — Add note (IsDoctor — patient must be linked)
```json
// Request: { "patient": userId, "note": "string" }
```

#### `GET /api/medical-records/doctor/?patient_id=1` — Doctor reads patient records (IsDoctor)

---

### Reception

#### `GET /api/reception/today-appointments/` — Today's list (IsReceptionist)
```json
// Response 200 — array
[{
  "id": 1, "patient": 2, "patient_name": "...", "patient_email": "...", "patient_phone": "...",
  "doctor": 1, "doctor_name": "...", "doctor_email": "...",
  "date": "YYYY-MM-DD", "time": "HH:MM:SS", "reason": "...",
  "status": "pending|confirmed|checked_in|cancelled",
  "status_display": "...", "created_at": "datetime"
}]
```

#### `POST /api/reception/appointments/{id}/confirm-arrival/` — Confirm arrival (IsReceptionist)
```json
// Response 200: { "message": "تم تأكيد حضور المريض بنجاح.", "data": { ...appointment... } }
// Error 400: already checked_in or cancelled
```

---

## Missing backend endpoints (known gaps — flag to Mouhamedou)

| Missing | Impact | Workaround |
|---------|--------|------------|
| `GET /api/appointments/me/` — patient lists own appointments | Patient can't see RDVs to cancel | **BLOCKING** — must be added |
| `GET /api/doctors/{id}/` — individual doctor detail | No detail page with fresh fetch | Store selected doctor in Redux from list |

---

## Appointment statuses
`pending` → `confirmed` → `checked_in` → `cancelled`

---

## Role-based routing (Sprint 1 plan)

| Role | Login redirect | Guard |
|------|---------------|-------|
| `patient` | `/app/patient/home` | ProtectedRoute role=patient |
| `doctor` | `/app/doctor/home` (or `/app/set-password` if `is_first_login`) | ProtectedRoute role=doctor |
| `receptionist` | `/app/reception/home` | ProtectedRoute role=receptionist |
| `admin` | `/app/admin/home` | ProtectedRoute role=admin |

---

## Current codebase state (after Sprint 1 revert — 2026-04-28)

### Existing files to KEEP / MODIFY

| File | State | Action needed |
|------|-------|--------------|
| `src/lib/axios.ts` | Has auth interceptor, NO refresh logic | Enhance with refresh interceptor (Prompt 3) |
| `src/store/index.ts` | Has `configureStore`, `useAppDispatch`, `useAppSelector` | Keep — add patient reducer later |
| `src/store/rootReducer.ts` | Has `auth` + `ui` reducers | Add `patient` reducer in Prompt 7 |
| `src/store/uiSlice.ts` | `lang`, `dir` — complete | Keep untouched |
| `src/features/auth/authSlice.ts` | Simple — has `isLoading`, no localStorage | Rewrite in Prompt 4 |
| `src/constants/translations.ts` | AR+FR keys (website done) | Add patient app keys when needed |
| `src/types/models.ts` | Simple/old types | Replace with feature-split type files |
| `src/routes/index.tsx` | Root router | Keep — update AppRoutes import |
| `src/routes/AppRoutes.tsx` | Placeholder routes (dashboard/patients/appointments/doctors) | Rewrite in Prompt 5 |
| `src/routes/WebsiteRoutes.tsx` | Website routes — complete | Keep untouched |
| `src/hooks/useT.ts` | Translation hook — complete | Keep untouched |
| `src/components/ui/` | Button, Input, Badge — complete | Keep untouched |

### Files to CREATE (Sprint 1 — patient flow)

```
src/types/
  auth.types.ts         — User, LoginPayload, LoginResponse, RegisterPayload
  patient.types.ts      — PatientProfile, PatientListItem
  doctor.types.ts       — Doctor (from /api/doctors/ list shape)
  appointment.types.ts  — Appointment, AppointmentStatus, CreateAppointmentPayload
  medical.types.ts      — MedicalRecord

src/services/
  authService.ts        — login, register, me, refresh, setFirstPassword, changePassword
  patientService.ts     — getMyProfile, getDoctors, createAppointment, cancelAppointment,
                          getMyRecords (getMyAppointments when backend adds endpoint)

src/features/
  auth/authSlice.ts     — REWRITE: user, token, refreshToken, isAuthenticated (no isLoading)
  patient/
    patientSlice.ts     — profile, doctors, appointments, records (createAsyncThunk)

src/routes/
  ProtectedRoute.tsx    — role-aware: unauthenticated→/app/login, wrong role→/app/unauthorized

src/pages/
  app/
    LoginPage.tsx           — shared login for all roles
    UnauthorizedPage.tsx    — wrong role redirect target
    patient/
      PatientHomePage.tsx
      PatientProfilePage.tsx
      DoctorsListPage.tsx
      DoctorDetailPage.tsx    — reads from Redux state (no API call — no detail endpoint)
      CreateAppointmentPage.tsx
      MyAppointmentsPage.tsx  — BLOCKED until Mouhamedou adds /appointments/me/
    doctor/
      (Sprint 1 — Prompt 10 analysis first, then code)
    reception/
      (after doctor)
    admin/
      (after reception)
```

---

## Key existing files

```
src/lib/axios.ts              — Axios instance, auth interceptor, 401 auto-logout
src/features/auth/authSlice.ts — Redux auth state
src/store/index.ts             — configureStore + useAppDispatch + useAppSelector
src/store/rootReducer.ts       — combineReducers
src/store/uiSlice.ts           — lang ('ar'|'fr'), dir
src/constants/translations.ts  — All FR/AR string keys
src/routes/index.tsx           — Root BrowserRouter
src/routes/WebsiteRoutes.tsx   — Website routes (inside WebsiteLayout) — COMPLETE
src/routes/AppRoutes.tsx       — Dashboard routes — placeholder, needs rewrite
src/hooks/useT.ts              — Translation hook
src/hooks/useTitle.ts          — Page title hook
src/components/ui/             — Button, Input, Badge, shared UI
src/components/layout/         — Navbar, Footer, WebsiteLayout — COMPLETE
src/pages/website/             — All website pages — COMPLETE, DO NOT TOUCH
```
