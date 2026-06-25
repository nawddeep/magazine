# Authentication Flow Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        AUTHENTICATION FLOW                       │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────┐
│   User Visits    │
│   Website        │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│   Default Route  │
│   /              │◄──────────────┐
│   (Public View)  │               │
└────────┬─────────┘               │
         │                         │
         │ Clicks User Icon        │
         │ or Admin Link           │
         │                         │
         ▼                         │
┌──────────────────┐               │
│  /admin/login    │               │
│  Login Page      │               │
└────────┬─────────┘               │
         │                         │
         │ Enters Credentials      │
         │                         │
         ▼                         │
┌──────────────────┐               │
│  Validate        │               │
│  Credentials     │               │
└────────┬─────────┘               │
         │                         │
    ┌────┴────┐                   │
    │         │                   │
    ▼         ▼                   │
┌───────┐ ┌───────┐              │
│ Valid │ │Invalid│              │
└───┬───┘ └───┬───┘              │
    │         │                   │
    │         ▼                   │
    │    ┌──────────┐            │
    │    │  Show    │            │
    │    │  Error   │            │
    │    └──────────┘            │
    │                             │
    ▼                             │
┌──────────────────┐              │
│  Set Auth State  │              │
│  in Context API  │              │
└────────┬─────────┘              │
         │                         │
         ▼                         │
┌──────────────────┐              │
│  Store in        │              │
│  localStorage    │              │
└────────┬─────────┘              │
         │                         │
         ▼                         │
┌──────────────────┐              │
│  /admin/dashboard│              │
│  Admin View      │              │
└────────┬─────────┘              │
         │                         │
         │ User clicks Logout      │
         │                         │
         ▼                         │
┌──────────────────┐              │
│  Clear Auth      │              │
│  State & Storage │              │
└────────┬─────────┘              │
         │                         │
         └─────────────────────────┘
```

## Route Protection Flow

```
┌──────────────────────────────────────────────────────────────┐
│               PROTECTED ROUTE ACCESS FLOW                     │
└──────────────────────────────────────────────────────────────┘

User tries to access /admin/dashboard
         │
         ▼
┌──────────────────┐
│  Check Auth      │
│  State           │
└────────┬─────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌────────┐ ┌─────────────┐
│Logged  │ │Not Logged   │
│In      │ │In           │
└───┬────┘ └─────┬───────┘
    │            │
    │            ▼
    │     ┌─────────────────┐
    │     │  Auto Redirect  │
    │     │  to             │
    │     │  /admin/login   │
    │     └─────────────────┘
    │
    ▼
┌──────────────────┐
│  Grant Access    │
│  to Dashboard    │
└──────────────────┘
```

## State Persistence Flow

```
┌──────────────────────────────────────────────────────────────┐
│               STATE PERSISTENCE FLOW                          │
└──────────────────────────────────────────────────────────────┘

User logs in successfully
         │
         ▼
┌──────────────────┐
│  Update Context  │
│  - isAdmin       │
│  - user          │
│  - isAuth        │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Save to         │
│  localStorage:   │
│  - vanguard_auth │
│  - vanguard_user │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  User refreshes  │
│  page            │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  App initializes │
│  Read from       │
│  localStorage    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Restore Context │
│  Auth State      │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  User remains    │
│  logged in       │
└──────────────────┘
```

## Component Interaction

```
┌─────────────────────────────────────────────────────────────┐
│                  COMPONENT ARCHITECTURE                      │
└─────────────────────────────────────────────────────────────┘

                    ┌──────────────┐
                    │   AuthContext│
                    │   Provider   │
                    └───────┬──────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             ▼
        ┌─────────┐   ┌─────────┐   ┌──────────┐
        │  App.tsx│   │TopNavBar│   │AdminLogin│
        │         │   │         │   │          │
        └────┬────┘   └────┬────┘   └────┬─────┘
             │             │             │
             │             │             │
   ┌─────────┼─────────┐   │             │
   │         │         │   │             │
   ▼         ▼         ▼   ▼             ▼
┌────────┐┌─────────┐┌──────────┐┌────────────┐
│Public  ││Magazine ││Perspective││Admin       │
│Reader  ││Slider   ││Switcher   ││Dashboard   │
└────────┘└─────────┘└──────────┘└──────┬─────┘
                                        │
                                        ▼
                                 ┌──────────────┐
                                 │Logout Button │
                                 │Calls logout()│
                                 └──────────────┘
```

## Navigation Entry Points

```
┌──────────────────────────────────────────────────────────────┐
│            ADMIN ACCESS ENTRY POINTS                          │
└──────────────────────────────────────────────────────────────┘

1. TopNavBar User Icon
   └─▶ Redirects to /admin/login

2. PerspectiveSwitcher Admin Option
   └─▶ Redirects to /admin/login

3. Direct URL Access
   └─▶ /admin/login (login page)
   └─▶ /admin/dashboard (protected, redirects if not auth)

4. Back Button from Admin
   └─▶ Navigates to / (public homepage)

5. Logout Button
   └─▶ Clears state, navigates to /
```

## Authentication States

```
┌──────────────────────────────────────────────────────────────┐
│                 AUTHENTICATION STATES                         │
└──────────────────────────────────────────────────────────────┘

STATE 1: Unauthenticated
├─ isAuthenticated: false
├─ isAdmin: false
├─ user: null
├─ Can access: / (public routes)
└─ Cannot access: /admin/dashboard

STATE 2: Authenticated as Admin
├─ isAuthenticated: true
├─ isAdmin: true
├─ user: { email: "admin@vanguard.editorial", role: "admin" }
├─ Can access: / (public routes) + /admin/dashboard
└─ Persisted in: localStorage

STATE 3: Logging In
├─ isLoading: true
├─ Showing loading spinner
└─ Waiting for credentials validation

STATE 4: Login Error
├─ isAuthenticated: false
├─ error: "Invalid credentials..."
└─ User can retry
```

## Security Flow

```
┌──────────────────────────────────────────────────────────────┐
│                    SECURITY LAYERS                            │
└──────────────────────────────────────────────────────────────┘

Layer 1: Route Protection
└─▶ Automatic redirect on unauthorized access

Layer 2: Context API
└─▶ Centralized authentication state

Layer 3: Credential Validation
└─▶ Email and password validation in adminLogin()

Layer 4: State Persistence
└─▶ localStorage for session continuity

Layer 5: Manual Logout
└─▶ Explicit state cleanup and redirect

Layer 6: Browser Navigation Guard
└─▶ Back/forward button state validation
```

---

**Visual Reference**: Use this diagram to understand the complete authentication flow  
**Last Updated**: June 25, 2026
