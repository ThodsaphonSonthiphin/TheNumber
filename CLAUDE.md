# TheNumber - Kids Number Learning App

A React-based educational web app for teaching children numbers 1-10 in Thai and English using flash cards with counting animations and text-to-speech. Includes a family member management system with ASP.NET Identity authentication.

## Tech Stack

### Frontend
- React 19 + TypeScript 5.9
- Vite 8 (build tool)
- Vitest + Testing Library (testing)
- Redux Toolkit (state management)
- React Router DOM (routing)
- MUI 7 (Material UI — UI components)
- Web Speech API (text-to-speech, no audio files)

### Backend API
- ASP.NET Core 10 (Web API)
- ASP.NET Identity (authentication — register/login with JWT)
- Entity Framework Core + SQL Server (Code First)
- Swashbuckle (Swagger/OpenAPI)

## Project Structure

```
├── src/                              # React frontend
│   ├── App.tsx                       # Router setup (all routes)
│   ├── main.tsx                      # Entry point
│   ├── index.css                     # Global styles and animations
│   ├── theme.ts                      # MUI theme (Kanit font)
│   ├── types/
│   │   └── member.ts                 # Family & Member TypeScript interfaces
│   ├── components/
│   │   ├── FlashCard.tsx             # Flash card UI (pure presentation)
│   │   ├── useFlashCard.ts           # Flash card logic (reveal, nav, speech)
│   │   ├── CountingAnimation.tsx     # Counting animation UI
│   │   ├── useCountingAnimation.ts   # Counting logic (async loop + speech)
│   │   ├── NavBar.tsx                # Bottom navigation bar UI
│   │   ├── useNavBar.ts              # NavBar logic (active tab, navigate)
│   │   ├── FamilyList.tsx            # Family list UI with create dialog
│   │   ├── useFamilyList.ts          # Family list logic
│   │   ├── FamilyDetail.tsx          # Family detail + member list UI
│   │   └── useFamilyDetail.ts        # Family detail logic (add/remove member)
│   ├── data/
│   │   ├── numbers.ts                # Number data (1-10)
│   │   └── numbers.test.ts           # Tests for number data
│   ├── utils/
│   │   ├── speech.ts                 # speakText() utility
│   │   └── speech.test.ts            # Tests for speech utility
│   ├── test/
│   │   └── setup.ts                  # Test setup (jest-dom matchers)
│   ├── pages/
│   │   ├── HomePage.tsx              # Home page with number grid selector
│   │   ├── FlashCardPage.tsx         # Flash card page
│   │   ├── AlphabetPage.tsx          # Thai alphabet page
│   │   ├── ColorGamePage.tsx         # Color quiz game page
│   │   ├── FamilyPage.tsx            # Family list page
│   │   └── FamilyDetailPage.tsx      # Family detail (members) page
│   └── store/
│       ├── index.ts                  # Redux store config
│       ├── hooks.ts                  # Typed useAppSelector/useAppDispatch
│       ├── flashCardSlice.ts         # Flash card state
│       ├── colorGameSlice.ts         # Color game state
│       └── familySlice.ts            # Family & member state
├── api/                              # ASP.NET Core 10 API
│   ├── Program.cs                    # API entry point + middleware
│   ├── TheNumber.Api.csproj          # Project file (.NET 10)
│   ├── appsettings.json              # Config (Entra ID, CORS)
│   ├── Controllers/
│   │   ├── FamiliesController.cs     # CRUD /api/families
│   │   └── MembersController.cs      # CRUD /api/families/{id}/members
│   ├── Models/
│   │   ├── Family.cs                 # Family entity
│   │   ├── Member.cs                 # Member entity
│   │   └── Dtos.cs                   # Request/Response DTOs
│   └── Data/
│       └── AppDbContext.cs           # EF Core DbContext
└── docs/
    └── sequence-diagram.md           # Mermaid sequence diagrams
```

## Architecture Rules

### 1. Separate UI and Logic

Every component MUST separate concerns into two files:
- **`useComponent.ts`** — Custom hook containing all logic (state, effects, handlers, async operations)
- **`Component.tsx`** — Pure presentation component that only renders UI using the hook's return values

Example:
```
components/
├── FlashCard.tsx          # UI only: renders JSX, styles
├── useFlashCard.ts        # Logic: Redux dispatch, speech, navigation handlers
├── CountingAnimation.tsx  # UI only: renders emoji grid, count display
└── useCountingAnimation.ts # Logic: async counting loop, speech per step
```

**Why**: Prevents bugs from mixing async logic (speech, timers) with React render cycles. Makes testing and debugging easier.

### 2. TDD (Test-Driven Development)

Follow the Red → Green → Refactor cycle for all changes:

1. **Red** — Write a failing test FIRST that describes the expected behavior
2. **Green** — Write the minimum code to make the test pass
3. **Refactor** — Clean up the code while keeping tests green

#### What to test

| Layer | File pattern | What to test |
|-------|-------------|-------------|
| Redux slices | `*.test.ts` next to slice | Every action: state transitions, edge cases |
| Utils | `*.test.ts` next to util | Pure functions: inputs → outputs |
| Hooks | `*.test.ts` next to hook | State changes, dispatch calls, async behavior |
| Components | `*.test.tsx` next to component | Rendering, user interactions, conditional display |

#### Test file placement

Place test files **next to the file they test**:
```
speech.ts          ← source
speech.test.ts     ← test (same directory)
```

#### Running tests

```bash
npm test            # Run all tests once
npm run test:watch  # Run tests in watch mode (during development)
```

#### TDD workflow example

```bash
# 1. Write failing test first
# 2. Run tests — see it fail (Red)
npm test

# 3. Write code to pass the test (Green)
# 4. Run tests — see it pass
npm test

# 5. Refactor if needed, tests must stay green
npm test
```

## Commands

- `npm run dev` — Start dev server
- `npm run build` — TypeScript check + Vite production build
- `npx vite build` — Vite build only (skip tsc)
- `npm run preview` — Preview production build
- `npm test` — Run all tests once
- `npm run test:watch` — Run tests in watch mode

## Key Patterns

- **State management**: Redux Toolkit slices at `store/` manage app state (flashCardSlice, colorGameSlice, familySlice)
- **Audio**: Uses browser's Web Speech API (`SpeechSynthesisUtterance`) via `utils/speech.ts` — no audio files needed. Thai (`th-TH`) and English (`en-US`) voices.
- **Styling**: MUI `sx` prop (CSS-in-JS). Font: Kanit (Google Fonts).
- **Animations**: CSS keyframes in `index.css` (fadeInUp, bounce, pop).
- **Build-time constants**: `__APP_VERSION__` and `__COMMIT_HASH__` injected via `vite.config.ts` define.
- **Navigation**: Bottom navigation bar (`NavBar.tsx`) with 5 tabs (Home, Flash Cards, ก-ฮ, Color Quiz, ครอบครัว)

## API Architecture

### Authentication
- ASP.NET Identity with JWT Bearer tokens
- Register/Login endpoints at `/api/auth/register` and `/api/auth/login`
- User identified by `ClaimTypes.NameIdentifier` from JWT
- Config in `api/appsettings.json` → `Jwt` section (set `Key`, `Issuer`, `Audience`)
- Passwords: minimum 6 chars, require digit, unique email required

### Database (EF Core Code First)
- SQL Server via `ConnectionStrings:DefaultConnection` in `appsettings.json`
- Run migrations: `dotnet ef migrations add InitialCreate` then `dotnet ef database update`
- Models: `ApplicationUser` (extends IdentityUser), `Family`, `Member`

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login (returns JWT) |
| GET | `/api/families` | List my families |
| GET | `/api/families/{id}` | Get family with members |
| POST | `/api/families` | Create family |
| PUT | `/api/families/{id}` | Update family |
| DELETE | `/api/families/{id}` | Delete family |
| GET | `/api/families/{familyId}/members` | List members |
| GET | `/api/families/{familyId}/members/{id}` | Get member |
| POST | `/api/families/{familyId}/members` | Add member |
| PUT | `/api/families/{familyId}/members/{id}` | Update member |
| DELETE | `/api/families/{familyId}/members/{id}` | Remove member |

### Running the API

```bash
cd api
dotnet run          # Start API server (http://localhost:5200)
                    # Swagger UI at http://localhost:5200/swagger
```

### Deployment
- **Frontend**: Azure Static Web Apps (deployed via GitHub Actions pipeline)
- **API**: Azure App Service (pipeline not yet configured — deploy manually or add workflow)

### 3. Gitflow Branching Strategy

ทุกการพัฒนา **ต้อง** ใช้ Gitflow branching model:

#### Branch types

| Branch | ใช้ทำอะไร | แตกมาจาก | Merge กลับไป |
|--------|----------|----------|-------------|
| `main` | Production-ready code | — | — |
| `develop` | Integration branch สำหรับ feature ถัดไป | `main` | `main` (ผ่าน release) |
| `feature/*` | พัฒนา feature ใหม่ | `develop` | `develop` |
| `release/*` | เตรียม release ใหม่ (bump version, fix bugs) | `develop` | `main` + `develop` |
| `hotfix/*` | แก้ bug เร่งด่วนบน production | `main` | `main` + `develop` |

#### Workflow

1. **เริ่มทำ feature ใหม่**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/my-feature
   ```

2. **พัฒนาเสร็จ → merge กลับ develop**
   ```bash
   git checkout develop
   git merge --no-ff feature/my-feature
   git branch -d feature/my-feature
   ```

3. **เตรียม release**
   ```bash
   git checkout develop
   git checkout -b release/1.0.0
   # bump version, final fixes
   git checkout main
   git merge --no-ff release/1.0.0
   git tag -a v1.0.0
   git checkout develop
   git merge --no-ff release/1.0.0
   git branch -d release/1.0.0
   ```

4. **Hotfix เร่งด่วน**
   ```bash
   git checkout main
   git checkout -b hotfix/fix-description
   # แก้ bug
   git checkout main
   git merge --no-ff hotfix/fix-description
   git tag -a v1.0.1
   git checkout develop
   git merge --no-ff hotfix/fix-description
   git branch -d hotfix/fix-description
   ```

#### Rules

- **ห้าม** commit ตรงไปที่ `main` หรือ `develop` โดยไม่ผ่าน branch
- ใช้ `--no-ff` (no fast-forward) เสมอเมื่อ merge เพื่อเก็บประวัติ branch ไว้
- ตั้งชื่อ branch ให้สื่อความหมาย เช่น `feature/add-sound-effects`, `hotfix/fix-speech-crash`
- ลบ branch ที่ merge แล้วเพื่อความสะอาด

## Flash Card Flow

1. Card displays the number, Thai name, and English name clearly
2. User presses "🔊 นับเลข" button to start counting
3. Emoji appears → then Thai counting speech plays (หนึ่ง) → next emoji appears → speech (สอง) → ...
4. After counting completes, speaks the Thai name then English name
5. User can press "🔄 นับใหม่" to reset and count again
