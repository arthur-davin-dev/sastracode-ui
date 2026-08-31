# Authentication: Registration + Keycloak Login + Email Verification

Status of this document: **frontend is implemented in this repo**; Keycloak and
Spring Boot sections are the contract the backend/infra must satisfy. Nothing in
the working Auth.js core (`src/auth.ts`) was rewritten — only additive changes.

---

## 1. Recommended architecture

```
        Browser (Next.js, public client)
                 │
    ┌────────────┼─────────────────────────────┐
    │            │                             │
 signIn()   POST /api/backend/v1/auth/*   GET /api/auth/login/keycloak
    │            │                             │
    ▼            ▼                             ▼
 Auth.js     Next Route Handler          Auth.js signIn("keycloak")
 (server)    proxy → Spring Boot          → Keycloak /auth  (Auth Code + PKCE)
    │            │                             │
    │            ▼                             ▼
    │       Spring Boot  ──Admin API──▶   Keycloak
    │       (user mgmt, email)                 │
    │                                          │
    └──────────── code ◀───────────────────────┘
                 exchanged for tokens server-side
                 (client secret never leaves the server)
                 │
                 ▼
        Auth.js encrypted JWT session cookie
                 │
       proxy.ts + requireVerifiedUser() gate protected routes
                 │
                 ▼
        Protected app  ──Bearer access_token──▶  Spring Boot (validates JWT)
```

Key decisions (agreed):

| Concern | Decision |
| --- | --- |
| Password auth | **Keycloak only.** The frontend never sees or posts a password to our backend. |
| Email verification owner | **Keycloak.** Backend creates the user via the Keycloak Admin API with `emailVerified=false` + a `VERIFY_EMAIL` required action; Keycloak sends and consumes its own verification email. No custom token table. |
| Frontend client type | **Public** client, Authorization Code + PKCE. The confidential secret in `.env` is used **server-side only** by Auth.js for the code exchange — acceptable because the browser never receives it. |
| Session | Auth.js encrypted JWT cookie. Access token refreshed silently via the Keycloak `refresh_token` grant in the `jwt` callback. |
| Route protection | `src/proxy.ts` (Next 16's renamed middleware) as the first gate + `requireVerifiedUser()` in Server Components + backend JWT validation. Defense in depth. |
| Auto-login after registration | **Never.** Registration ends on `/verify-email`. |
| Auto-login after verification | **Never.** On success `/verify-email/callback` immediately hands off to `signIn("keycloak")` (Keycloak's hosted login) — no session is created by the app itself. |

### 1.1 Existing-user login (sequence)

There is **no frontend login page**. The "Login" control calls
`signIn("keycloak")` (client) — or a protected route hits the server
`GET /api/auth/login/keycloak` — and the user goes straight to Keycloak's
hosted login. The frontend never renders email/password fields.

```
"Login" button / protected route
        │  signIn("keycloak")  or  GET /api/auth/login/keycloak
        ▼
   Keycloak hosted login page
        │  user enters credentials
        ▼
   /api/auth/callback/keycloak ◀── code
        │ Auth.js exchanges code → tokens (server, PKCE)
        ▼
   session cookie set → redirect to callbackUrl (default "/")
```

### 1.2 New-user registration (sequence)

```
/register ──POST /api/backend/v1/auth/register──▶ Spring Boot
   │                                                   │  validate, dedupe email/username
   │                                                   │  Keycloak Admin: create user
   │                                                   │    enabled=true, emailVerified=false
   │                                                   │    requiredActions=["VERIFY_EMAIL"]
   │                                                   │  Keycloak Admin: send-verify-email
   │                                                   ▼
   │                                            202 Accepted
   ▼
sessionStorage["pendingVerificationEmail"] = email
router.replace("/verify-email")   ← "check your inbox" + Resend
```

### 1.3 Email verification + after (sequence)

```
Email link ──▶ Keycloak "Verify Email" action page ──▶ marks emailVerified=true
                        │
                        ▼ (Keycloak action-token redirect_uri)
              /verify-email/callback
                        │  success: no UI, useEffect → signIn("keycloak")
                        │  ?error=expired|invalid: message + link to /verify-email
                        ▼
              Keycloak hosted login ──▶ /api/auth/callback/keycloak ──▶ session ──▶ "/"
```

Configure the backend's `send-verify-email` / `execute-actions-email` call with
`redirect_uri = {APP_VERIFY_EMAIL_REDIRECT_URI}` (`…/verify-email/callback`) and
`client_id = {AUTH_KEYCLOAK_ID}` so Keycloak redirects here after the action
instead of showing its own "Back to Application" page.

---

## 2. What is implemented in this repo (frontend)

| Deliverable | File(s) | Notes |
| --- | --- | --- |
| Keycloak login core | `src/auth.ts` *(pre-existing; +`email_verified` claim propagation only)* | Auth Code + PKCE via Auth.js Keycloak provider, JWT strategy, silent refresh, `RefreshAccessTokenError` handling. |
| Login trigger (client) | `src/components/auth/Login.tsx` *(pre-existing)* | Button → `signIn("keycloak", { redirectTo: "/" })`. No intermediate page. Used in navbar, profile, players, instructor-application. |
| Login trigger (server) | `src/app/api/auth/login/keycloak/route.ts` *(pre-existing)* | `GET` → `signIn("keycloak")`, validates `callbackUrl` is app-relative. Target of `proxy.ts` / `requireVerifiedUser()` redirects. |
| **/register page** | `src/app/register/page.tsx`, `src/components/auth/RegisterForm.tsx` *(pre-existing)* | zod validation: name, email, username, password (≥8, upper, symbol), confirm. "Already have an account" → `signIn("keycloak")`. No auto-login. |
| **/verify-email** | `src/app/verify-email/page.tsx` *(pre-existing)* | "Check your inbox" + Resend (`useResendVerificationEmailMutation`). |
| **/verify-email/callback** | `src/app/verify-email/callback/page.tsx` | Post-verification landing. Success → `useEffect` immediately calls `signIn("keycloak")` (spinner only, no button). `?error=expired\|invalid` → message + link back to `/verify-email` for resend. Never renders a login form, never auto-authenticates. |
| **/forgot-password** | `src/app/forgot-password/page.tsx`, `src/components/auth/ForgotPasswordForm.tsx` | `useForgotPasswordMutation` → `POST /api/backend/v1/auth/forgot-password`. Always shows a generic "if an account exists…" result (no account enumeration). |
| RTK auth endpoints | `src/redux/api/auth-api.ts` | `register`, `resendVerificationEmail`, `forgotPassword`. Base URL `/api/backend` → server proxy attaches the bearer token. |
| Session propagation | `src/auth.ts`, `src/types/next-auth.d.ts` | `session.emailVerified?: boolean` from the OIDC `email_verified` claim (on the session root — `User.emailVerified` is typed `Date` and would clash). |
| **Route protection** | `src/proxy.ts` | Matches protected prefixes; unauthenticated → Keycloak login with `callbackUrl`; `emailVerified === false` → `/verify-email`; unknown (`undefined`) is allowed through so legacy sessions aren't locked out; token-decode failure fails **closed**. |
| Server-page guard | `src/lib/auth/guard.ts` | `requireVerifiedUser(callbackPath)` — same rules as the proxy, returns a non-null typed `Session` for Server Components. |
| Backend proxy | `src/app/api/backend/[...path]/route.ts` *(pre-existing)* | Adds `Authorization: Bearer <access_token>` server-side; browser never holds it. |
| Logout | `src/lib/auth/logout.ts`, `src/app/api/session/logout/route.ts` *(pre-existing)* | Backend `/api/v1/auth/logout` (refresh-token revoke) → Keycloak RP-initiated logout (`id_token_hint`) → Auth.js `signOut()`. |
| Error normalization | `src/lib/api/error.ts` *(pre-existing)* | Strips transport noise and leaked server internals from toasts. |

### 2.1 Protected route prefixes (`src/proxy.ts`)

`/profile`, `/achivement`, `/certificate`, `/notifications`,
`/instructor-application`, `/courses/bookmark`, `/courses/my-courses`,
`/courses/private-courses`, `/documentation/bookmark`, `/players`.

`/student/certificate/verify/*` stays **public** (QR-code verification for
logged-out visitors). Add new protected areas to **both** `PROTECTED_PREFIXES`
and `config.matcher`.

---

## 3. Environment variables

Frontend (`.env` / deployment secrets):

| Var | Example | Purpose |
| --- | --- | --- |
| `AUTH_SECRET` | 32-byte hex | Encrypts the Auth.js session JWT. Rotate = all sessions invalidated. |
| `AUTH_URL` | `https://www.sastracode.tech` | Canonical origin; used to build callback URLs. |
| `AUTH_TRUST_HOST` | `true` | Required behind a proxy/load balancer. |
| `AUTH_KEYCLOAK_ID` | `sastra-code-web-user` | Keycloak client id. |
| `AUTH_KEYCLOAK_SECRET` | *(secret)* | Client secret — **server-side only**, used for the code exchange + refresh. Never `NEXT_PUBLIC_*`. |
| `AUTH_KEYCLOAK_ISSUER` | `https://auth.sastracode.tech/realms/sastra-code-app` | OIDC issuer (realm URL). |
| `BACKEND_API_URL` | `https://api.sastracode.tech` | Server-side base for the `/api/backend/*` proxy. |
| `NEXT_PUBLIC_BACKEND_URL` | `https://api.sastracode.tech` | Only where the browser must know the backend origin directly (e.g. websockets). |

Backend (Spring Boot) — for reference:

| Var | Example |
| --- | --- |
| `KEYCLOAK_ISSUER_URI` | `https://auth.sastracode.tech/realms/sastra-code-app` |
| `KEYCLOAK_JWK_SET_URI` | `${issuer}/protocol/openid-connect/certs` |
| `KEYCLOAK_ADMIN_BASE_URL` | `https://auth.sastracode.tech` |
| `KEYCLOAK_REALM` | `sastra-code-app` |
| `KEYCLOAK_ADMIN_CLIENT_ID` | `sastra-code-backend` (confidential, service account) |
| `KEYCLOAK_ADMIN_CLIENT_SECRET` | *(secret)* |
| `APP_VERIFY_EMAIL_REDIRECT_URI` | `https://www.sastracode.tech/verify-email/callback` |
| `APP_RESET_PASSWORD_REDIRECT_URI` | `https://www.sastracode.tech/` (Keycloak shows its own login after the reset) |

---

## 4. Keycloak configuration

### 4.1 Realm — `sastra-code-app`

- **Login → "Verify email"**: ON. Forces the `VERIFY_EMAIL` required action; a
  user cannot complete an interactive login until verified. This is what
  enforces rule 4 at the IdP.
- **Login → "Forgot password"**: ON (enables Keycloak's own reset link and the
  Admin `execute-actions-email` path).
- **Login → "Duplicate emails"**: OFF (`Email as username` optional). Enforces
  rule 7 at the IdP in addition to the backend check.
- **Sessions**
  - SSO Session Idle: `30m`
  - SSO Session Max: `10h`
  - Client Session Idle / Max: inherit or tighten per client
- **Tokens**
  - Access Token Lifespan: `5m` (short; Auth.js refreshes ~30s before expiry)
  - Refresh token: **Revoke Refresh Token** ON, **Refresh Token Max Reuse** `0`
    (one-time-use / rotation)
  - Access Token Lifespan For Implicit Flow: n/a (implicit disabled)
  - Action token lifespans: `Verify Email` `24h` (`APP_VERIFY_EMAIL_LIFESPAN`),
    `Reset Credentials` `1h`
- **Email / SMTP** (Realm Settings → Email)
  - Host / Port / StartTLS or SSL per provider
  - Auth: username + password (store as env-backed secret in Keycloak)
  - From: `no-reply@sastracode.tech`, From display name: `SastraCode`
  - Send a test email before go-live.

### 4.2 Client — `sastra-code-web-user` (frontend)

| Setting | Value |
| --- | --- |
| Client type | OpenID Connect |
| Client authentication | **On** (confidential) — the code exchange runs only on the Next.js server via Auth.js. If you switch to a pure SPA exchange, make it **public** + PKCE and drop the secret. |
| Standard flow (Authorization Code) | Enabled |
| Direct access grants (password grant) | **Disabled** |
| Implicit flow | Disabled |
| PKCE (`Advanced → Proof Key for Code Exchange`) | `S256` |
| Valid redirect URIs | `https://www.sastracode.tech/api/auth/callback/keycloak`, `http://localhost:3000/api/auth/callback/keycloak` |
| Valid post-logout redirect URIs | `https://www.sastracode.tech/`, `http://localhost:3000/` |
| Web origins | `https://www.sastracode.tech`, `http://localhost:3000` (**not** `*`) |
| Default client scopes | `openid`, `profile`, `email` (so `email_verified` is issued) |

### 4.3 Client — `sastra-code-backend` (Spring Boot service account)

| Setting | Value |
| --- | --- |
| Client authentication | On (confidential) |
| Standard flow | Disabled |
| Service accounts roles | Enabled |
| Assigned roles (realm-management) | `manage-users`, `view-users` (add `query-users` for search) |

Backend obtains an admin token with the `client_credentials` grant against this
client and calls the Admin REST API — **never** touch the Keycloak DB directly.

### 4.4 Logout

- Frontend already performs **RP-initiated logout**:
  `${issuer}/protocol/openid-connect/logout?client_id=…&id_token_hint=…&post_logout_redirect_uri=…`.
- Ensure the `post_logout_redirect_uri` values are registered (4.2).
- Optionally enable **Backchannel logout** on the client if other RPs share the
  SSO session.

---

## 5. Backend API contract (Spring Boot)

All responses use the existing envelope:

```json
{ "success": true, "message": "…", "data": { }, "timestamp": "2026-08-31T12:00:00Z" }
```

The frontend calls these through `/api/backend/*`; the proxy adds the bearer
token when a session exists (registration/verification are callable while
logged out).

### 5.1 `POST /api/v1/auth/register`

Request:

```json
{
  "firstName": "Scopheak",
  "lastName": "Chan",
  "email": "sopheak@example.com",
  "username": "sopheak_c",
  "password": "S3cret!pass",
  "confirmPassword": "S3cret!pass"
}
```

Server steps:

1. Validate: email format; `password == confirmPassword`; password policy
   (≥8, ≥1 uppercase, ≥1 symbol — mirror `RegisterForm` and the Keycloak
   password policy); username `^[a-zA-Z0-9_]{5,30}$`.
2. Reject duplicates — check Keycloak (`GET /admin/realms/{realm}/users?email=` /
   `?username=`) **and** the local `users` table. Return `409`.
3. Keycloak Admin `POST /admin/realms/{realm}/users`:
   ```json
   {
     "username": "sopheak_c",
     "email": "sopheak@example.com",
     "firstName": "Sopheak",
     "lastName": "Chan",
     "enabled": true,
     "emailVerified": false,
     "requiredActions": ["VERIFY_EMAIL"],
     "credentials": [
       { "type": "password", "value": "S3cret!pass", "temporary": false }
     ]
   }
   ```
   Keycloak stores the password hashed (PBKDF2/Argon2 per realm policy). The
   backend does **not** persist the raw password; if it must hold it transiently
   in memory, never log it and drop it immediately after the Admin call.
4. Local `users` row: `keycloak_id`, `email`, `username`, `full_name`,
   `status = 'UNVERIFIED'`, timestamps. No password column.
5. Trigger the verification email — either:
   - `PUT /admin/realms/{realm}/users/{id}/send-verify-email?redirect_uri={APP_VERIFY_EMAIL_REDIRECT_URI}&client_id=sastra-code-web-user`, or
   - `PUT /admin/realms/{realm}/users/{id}/execute-actions-email` with body
     `["VERIFY_EMAIL"]` and the same query params.
6. Respond `202`:

```json
{ "success": true,
  "message": "Account created. Check your email to verify your address.",
  "data": { "email": "sopheak@example.com", "status": "UNVERIFIED" } }
```

Errors:

| Case | Status | `message` |
| --- | --- | --- |
| Email already registered | `409` | `An account with this email already exists.` |
| Username taken | `409` | `That username is taken.` |
| Password policy / mismatch | `422` | field errors under `data.errors` (`{ "password": "…", "confirmPassword": "…" }`) |
| Invalid email | `422` | `data.errors.email` |
| Keycloak Admin unreachable | `502` | `Could not create your account right now. Please try again shortly.` |
| Email send failed (user created) | `202` | still success; the user can Resend. Log the failure. |

### 5.2 `POST /api/v1/auth/resend-verification-email`

Request: `{ "email": "sopheak@example.com" }`

- Look up the Keycloak user by email. If found **and** `emailVerified == false`,
  re-send the verify email (5.1 step 5).
- If not found, or already verified, **still return `200`** with the generic
  message — no account enumeration.
- Rate-limit per email + per IP (e.g. 1 / 60s, 5 / hour) → `429`
  `Too many requests. Please wait a moment.`

```json
{ "success": true, "message": "If that address needs verification, we've sent a new link.", "data": null }
```

### 5.3 `POST /api/v1/auth/forgot-password`

Request: `{ "email": "sopheak@example.com" }`

- If a Keycloak user exists: `PUT /admin/realms/{realm}/users/{id}/execute-actions-email`
  body `["UPDATE_PASSWORD"]`, `redirect_uri={APP_RESET_PASSWORD_REDIRECT_URI}`,
  `client_id=sastra-code-web-user`, `lifespan=3600`.
- Always return `200` with the generic message (no enumeration). Rate-limit as
  in 5.2.

```json
{ "success": true, "message": "If that account exists, a reset link is on its way.", "data": null }
```

### 5.4 `POST /api/v1/auth/logout` *(already integrated)*

Request: `{ "refreshToken": "<token>" }` — backend calls
`${issuer}/protocol/openid-connect/logout` (or token revocation) to kill the
refresh token, returns `{ "success": true }`. Failure must not block the UI;
the frontend proceeds to Keycloak logout + `signOut()` regardless.

### 5.5 Verification endpoint — not needed in this model

Keycloak owns the token: it is generated by Keycloak, is single-use, expires per
the `Verify Email` action-token lifespan, carries no PII beyond an opaque nonce,
and is invalidated on use. There is **no** `POST /verify-email` in this design.
`/verify-email/callback` is only Keycloak's `redirect_uri` after the action
completes. (If you ever move to backend-owned tokens: 32+ bytes from a CSPRNG,
store only a SHA-256 hash, `expires_at` ≤ 24h, `used_at` nulled until consumed,
delete/expire on success.)

---

## 6. Database changes (backend)

Model Keycloak as the identity source of truth; keep only a projection.

```sql
-- users: application profile, no credentials
ALTER TABLE users ADD COLUMN keycloak_id   VARCHAR(36) UNIQUE;
ALTER TABLE users ADD COLUMN status        VARCHAR(16) NOT NULL DEFAULT 'UNVERIFIED'
  CHECK (status IN ('UNVERIFIED','VERIFIED','DISABLED'));
CREATE UNIQUE INDEX ux_users_email_ci ON users (LOWER(email));
CREATE UNIQUE INDEX ux_users_username_ci ON users (LOWER(username));

-- abuse control for resend / forgot-password
CREATE TABLE auth_email_throttle (
  id          BIGSERIAL PRIMARY KEY,
  email_hash  VARCHAR(64) NOT NULL,   -- sha256(lower(email))
  kind        VARCHAR(24) NOT NULL,   -- 'RESEND_VERIFY' | 'RESET_PASSWORD'
  ip_hash     VARCHAR(64),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ix_throttle_lookup ON auth_email_throttle (email_hash, kind, created_at);
```

Keep `users.status` in sync: flip to `VERIFIED` either lazily on first
authenticated request when the JWT shows `email_verified: true`, or via a
Keycloak **event listener / webhook** on `VERIFY_EMAIL`.
No custom verification-token table is required in this model.

---

## 7. Error handling matrix

Frontend messages are already normalized by `src/lib/api/error.ts` (technical
strings and leaked stack/SQL fragments are dropped). Each surface has a Khmer
fallback.

| Condition | Where handled | User sees |
| --- | --- | --- |
| Email already exists | backend `409` → `RegisterForm` toast | "មិនអាចបង្កើតគណនីបាន" + backend message |
| Invalid email / weak password / mismatch | zod (client) + backend `422` `data.errors` | inline field errors |
| Verification email failed to send | backend still `202`; user uses Resend on `/verify-email` | "ផ្ញើអ៊ីមែលម្ដងទៀត" |
| Invalid / used verification link | Keycloak → `/verify-email/callback?error=invalid` | "តំណ…មិនត្រឹមត្រូវ ឬត្រូវបានប្រើរួចហើយ" + Resend |
| Expired verification link | `/verify-email/callback?error=expired` | "…បានផុតកំណត់ហើយ" + Resend |
| Already-verified user hits verify link | Keycloak completes → callback success (idempotent) | success screen |
| Keycloak auth failure (bad credentials) | handled on the Keycloak hosted login page itself; on Auth.js error → `/api/auth/error?error=` (default Auth.js error page) | Keycloak's own inline error, then Auth.js error page |
| Keycloak unavailable | Auth.js `signIn` throws / `?error=Configuration` | "ការកំណត់រចនាសម្ព័ន្ធការចូលមានបញ្ហា…" |
| Backend unavailable | proxy returns `502`/`FETCH_ERROR` | "មិនអាចភ្ជាប់ទៅ server បានទេ" (per surface) |
| Session expired / refresh failed | `jwt` callback sets `error`; `AuthProvider` → `logoutUser()` | signed out, back to `/` |
| Logout failure (backend) | swallowed in `session/logout` route | logout still completes |
| Duplicate resend / forgot spam | backend `429` | "សំណើច្រើនពេក…" |

---

## 8. Security considerations

- **No password in the browser → our backend.** Keycloak's hosted login is the
  only place a password is entered. `Direct access grants` is disabled so the
  password grant cannot be abused.
- **Client secret stays server-side.** Only `AUTH_KEYCLOAK_*` (no
  `NEXT_PUBLIC_` prefix) — Auth.js does the code exchange and refresh in Route
  Handlers. PKCE `S256` is on regardless.
- **Session cookie**: Auth.js sets `HttpOnly`, `SameSite=Lax`, `Secure` in
  production, and the JWT is encrypted (A256CBC-HS512) with `AUTH_SECRET`.
- **Access token** is attached to backend calls **only server-side** (proxy /
  `backendFetch`); it is never exposed to page JS except the deliberate
  websocket path.
- **Authorization is enforced server-side**: `proxy.ts` is a convenience gate;
  Server Components call `requireVerifiedUser()`, and Spring Boot independently
  validates the JWT signature (`jwk-set-uri`), `iss`, `aud`, `exp`, and
  `email_verified` for protected endpoints. Hiding UI is never the control.
- **Unverified users**: blocked at Keycloak (cannot finish login), at the proxy
  (`emailVerified === false` → `/verify-email`), and should be rejected by the
  backend (`status = UNVERIFIED` or JWT `email_verified=false` → `403`).
- **No account enumeration**: register returns a distinct `409` only for a
  genuine duplicate (unavoidable UX); resend and forgot-password always return
  the same generic `200`.
- **Token rotation**: Keycloak refresh tokens are one-time-use
  (`Revoke Refresh Token` + `Max Reuse 0`); a replayed refresh token invalidates
  the chain and the user is signed out.
- **Redirect safety**: `callbackUrl` is constrained to app-relative paths in
  `getSafeCallbackUrl` (login route) and `searchParams.set` (`proxy.ts`); Keycloak only
  honors registered redirect URIs and exact web origins (no wildcards).
- **Rate limiting / brute force**: enable Keycloak Realm → Security Defenses →
  Brute Force Detection; rate-limit `register`, `resend`, `forgot-password` at
  the backend (per email hash + IP hash).
- **CSRF**: Auth.js protects its own routes with state/PKCE + a CSRF token; the
  backend proxy is same-origin and only acts on the server-held token.
- **Logging**: never log passwords, tokens, or full verification links.
  `src/lib/api/error.ts` also prevents leaking server internals to end users.

---

## 9. Authentication rules → enforcement

| Rule | Enforced by |
| --- | --- |
| 1. Existing verified user can log in via Keycloak | Auth.js Keycloak provider |
| 2. New user must register via frontend | `/register` → backend; `Direct access grants` disabled |
| 3. Registration requires email verification | backend sets `VERIFY_EMAIL`; realm "Verify email" ON |
| 4. Unverified user can't reach protected features | Keycloak login block + `proxy.ts` + `requireVerifiedUser()` + backend JWT `email_verified` check |
| 5. Verified user can log in | Keycloak |
| 6. Invalid credentials → login error | Keycloak hosted login page (inline error); Auth.js default error page on provider failure |
| 7. Duplicate email rejected | backend `409` + Keycloak "Duplicate emails" OFF |
| 8. Expired verification token → resend | Keycloak action-token lifespan → `/verify-email/callback?error=expired` → `/verify-email` Resend |
| 9. Used verification token rejected | Keycloak single-use action token → `?error=invalid` |
| 10. Logout invalidates app session + Keycloak | `session/logout` route (refresh revoke) + RP-initiated logout + `signOut()` |

---

## 10. Manual test checklist

1. Register with a fresh email → lands on `/verify-email`, **not** logged in
   (no session cookie). Keycloak user exists with `emailVerified=false`.
2. Visit `/profile` while unauthenticated → redirected to Keycloak login,
   return to `/profile` after login.
3. Register with an existing email → `409`, inline error, no Keycloak user
   created.
4. Click the emailed link → Keycloak verifies → `/verify-email/callback` success
   → auto-forwards to Keycloak hosted login (no click) → `/` with a session.
5. Reuse the same link → `/verify-email/callback?error=invalid` → Resend works.
6. Let the access token expire (>5m idle) → next navigation still works (silent
   refresh); revoke the session in Keycloak → app signs you out.
7. Logout → back on `/`, `/profile` again requires login, Keycloak SSO session
   gone.
8. `/forgot-password` with any email → generic success; real account receives a
   Keycloak reset-password link.
9. Hammer Resend / forgot-password → `429` after the limit.
```
