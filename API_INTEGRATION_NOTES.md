# Frontend API integration

## Environment

Copy `.env.example` to `.env.local` and fill the real values. Keep secrets server-side.

## Data flow

Browser -> RTK Query -> `/api/backend/v1/...` -> Next.js Route Handler -> Spring Boot API.

The proxy attaches the Auth.js/Keycloak bearer token on the server when a session exists, so the browser does not need the backend URL or refresh token.

## Public courses

`getPublicCourses` requests FREE and PREMIUM separately and walks through every backend page (size 100). PRIVATE is intentionally excluded from public Home/Courses UI.

## Private courses

Dashboard private course UI uses `GET /api/v1/users/me/private-courses` and requires a Keycloak session.

## Registration/login/logout

- Register: `POST /api/v1/auth/register` via RTK Query.
- Login: remains Auth.js + Keycloak redirect (no custom password login was added).
- Logout: server route reads the refresh token from the Auth.js JWT, calls backend `POST /api/v1/auth/logout`, then the client signs out of Auth.js.
