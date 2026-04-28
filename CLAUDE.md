# CLAUDE.md — CodevaSanté

## Behavioral rules (always active)

- **Think before coding.** State assumptions explicitly. If multiple interpretations exist, present them — don't pick silently. If something is unclear, stop and ask.
- **Simplicity first.** Minimum code that solves the problem. No speculative features, no abstractions for single-use code, no error handling for impossible scenarios.
- **Surgical changes.** Touch only what the task requires. Don't improve adjacent code. Match existing style. Remove only the imports/variables YOUR change made orphan — not pre-existing dead code.
- **Verify before reporting done.** Every task has a success criterion. State it, then confirm it's met.

---

## Project snapshot

**App:** CodevaSanté — clinic management system  
**Stack:** React 18 + TypeScript, Vite, TailwindCSS v4, RTK (Redux Toolkit), React Router v6, Axios, React Hook Form + Zod  
**Repo:** github.com/Muhammed-OTP/system-clinic-codeva  
**Deploy:** Vercel → main branch (auto-deploy)  
**Backend:** DRF on https://codevasante.pythonanywhere.com/api  

---

## Architecture rules (locked — never revisit)

| Rule | Detail |
|------|--------|
| Default language | Arabic (`lang: 'ar'` in `uiSlice`) |
| Website `/` | FR + AR — always use `useT()` |
| Dashboard `/app/*` | Arabic by default — use `useT()` same as website. French is a future premium option, not Sprint 1 concern. |
| AppShell | Respects `lang`/`dir` from `uiSlice` — do **not** force `dir="ltr"` |
| Font | Tajawal (AR/RTL) + Inter (FR/LTR via `[dir="ltr"]`) — CDN in `index.html` |
| Translations | All keys in `src/constants/translations.ts` — no hardcoded strings in components |
| Zod schemas | Bilingual errors → always factory `makeXSchema(lang)` + `key={lang}` on form component |
| Auth token | Stored in Redux `auth.token`, injected by `src/lib/axios.ts` interceptor |
| 401 handling | `src/lib/axios.ts` auto-dispatches `logout()` |

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

## API endpoints (base: https://codevasante.pythonanywhere.com/api)

### Auth
| Method | Path | Who |
|--------|------|-----|
| POST | `/auth/login/` | All |
| GET | `/auth/me/` | All |
| POST | `/auth/refresh/` | All |
| POST | `/auth/first-login/set-password/` | Doctor only (`is_first_login: true`) |
| POST | `/auth/change-password/` | All |

**Login response shape:**
```json
{
  "access": "<jwt>",
  "refresh": "<jwt>",
  "user": {
    "id": 1,
    "email": "...",
    "first_name": "...",
    "last_name": "...",
    "full_name": "...",
    "phone": "...",
    "role": "patient|doctor|receptionist|admin",
    "role_display": "...",
    "is_first_login": false
  }
}
```
Role values: `patient` `doctor` `receptionist` `admin`  
Doctor first-login flow: if `is_first_login === true` after login → redirect to set-password page before dashboard.

### Patients
| Method | Path | Who |
|--------|------|-----|
| GET | `/patients/me/` | Patient |
| GET | `/patients/search/?q=ahmed` | Receptionist |
| POST | `/patients/create/` | Receptionist |
| GET | `/patients/my-doctor-patients/` | Doctor |

### Doctors
| Method | Path | Who |
|--------|------|-----|
| GET | `/doctors/` | All |
| POST | `/doctors/create/` | Admin |
| GET | `/doctors/me/` | Doctor |
| PUT | `/doctors/me/update/` | Doctor |

### Appointments
| Method | Path | Who |
|--------|------|-----|
| POST | `/appointments/create/` | Patient |
| POST | `/appointments/{id}/cancel/` | Patient |
| POST | `/appointments/reception/create/` | Receptionist |
| GET | `/appointments/doctor/` | Doctor |

### Medical Records
| Method | Path | Who |
|--------|------|-----|
| POST | `/medical-records/create/` | Doctor |
| GET | `/medical-records/doctor/?patient_id=1` | Doctor |
| GET | `/medical-records/me/` | Patient |

### Reception
| Method | Path | Who |
|--------|------|-----|
| GET | `/reception/today-appointments/` | Receptionist |
| POST | `/reception/appointments/{id}/confirm-arrival/` | Receptionist |

---

## Roles & dashboard routing

| Role | Login redirects to | Key permissions |
|------|--------------------|-----------------|
| `admin` | `/app/admin/...` | Create doctors, manage accounts |
| `doctor` | `/app/doctor/...` | View patients, appointments, medical records |
| `receptionist` | `/app/reception/...` | Today's appointments, create RDV, confirm arrival, search/add patients |
| `patient` | `/app/patient/...` | Own profile, own appointments, own medical records |

---

## Key files

```
src/lib/axios.ts          — Axios instance, auth interceptor, 401 auto-logout
src/features/auth/authSlice.ts — Redux auth state (user, token, isAuthenticated)
src/types/models.ts       — Patient, Doctor, Appointment interfaces
src/types/api.ts          — ApiResponse<T>, PaginatedResponse<T>, ApiError
src/constants/translations.ts — All FR/AR string keys
src/store/uiSlice.ts      — lang ('ar'|'fr'), dir
src/routes/AppRoutes.tsx  — Top-level router
src/routes/WebsiteRoutes.tsx — Website routes (inside WebsiteLayout)
```

---

## Sprint state (as of 2026-04-28)

| Sprint | Branch | Status |
|--------|--------|--------|
| Website pages | `feat/website-pages` | DONE (PR #8) |
| Mock API setup | skipped — real backend ready | — |
| App login | `feat/app-login` | **NEXT** |
| App shell | `feat/app-shell` | then |
| Role dashboards | `feat/app-admin/doctor/receptionist` | then |

**Active sprint goal:** Wire login → role redirect → protected shell → 4 role dashboards consuming real DRF APIs. Deadline: 28/04/2026 evening.

---

## Known deferred UI bugs (fix in next sprint)

- `bg-white/8` / `text-white/18` non-standard Tailwind opacity → use `/10` or `/20`
- `w-13 h-13` doesn't exist in Tailwind → use `w-12 h-12`
- ContactPage success heading reuses `formSubmit` key — needs `formSuccess` key
- AuthPage forms use `setTimeout` stub — wire to real API when login sprint lands
- DoctorsPage modal close (X) button non-functional
- Home page missing scroll arrow
- No favicon set
- About page team photo is placeholder icon
- Remove "من نحن" label from About banner
- Remove dark statistics block from HomePage
- Remove ContactPage form (not aligned with user stories — patients book via auth flow)
- Add real doctor photos (website feels too tech for Mauritanian clinic context)
