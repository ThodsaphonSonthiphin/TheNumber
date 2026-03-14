# TheNumber - Kids Number Learning App

A React-based educational web app for teaching children numbers 1-10 in Thai and English using flash cards with counting animations and text-to-speech.

## Tech Stack

- React 19 + TypeScript 5.9
- Vite 8 (build tool)
- Vitest + Testing Library (testing)
- Redux Toolkit (state management)
- React Router DOM (routing)
- Web Speech API (text-to-speech, no audio files)

## Project Structure

```
src/
├── App.tsx                          # Router setup (/ and /flashcards routes)
├── main.tsx                         # Entry point
├── index.css                        # Global styles and animations
├── components/
│   ├── FlashCard.tsx                # Flash card UI (pure presentation)
│   ├── useFlashCard.ts              # Flash card logic (reveal, nav, speech)
│   ├── CountingAnimation.tsx        # Counting animation UI (pure presentation)
│   └── useCountingAnimation.ts      # Counting logic (async loop + speech)
├── data/
│   ├── numbers.ts                   # Number data (1-10): digit, thai, english, emoji, color
│   └── numbers.test.ts              # Tests for number data
├── utils/
│   ├── speech.ts                    # speakText() utility + Thai counting words
│   └── speech.test.ts               # Tests for speech utility
├── test/
│   └── setup.ts                     # Test setup (jest-dom matchers)
├── pages/
│   ├── HomePage.tsx                 # Home page with number grid selector
│   └── FlashCardPage.tsx            # Flash card page wrapper
└── store/
    ├── index.ts                     # Redux store config
    ├── hooks.ts                     # Typed useAppSelector/useAppDispatch
    ├── flashCardSlice.ts            # Flash card state: currentIndex, isRevealed, isCounting, etc.
    └── flashCardSlice.test.ts       # Tests for flash card slice
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

- **State management**: Redux Toolkit slice at `store/flashCardSlice.ts` manages flash card state (current card index, reveal/counting/playing states)
- **Audio**: Uses browser's Web Speech API (`SpeechSynthesisUtterance`) via `utils/speech.ts` — no audio files needed. Thai (`th-TH`) and English (`en-US`) voices.
- **Styling**: Inline CSS-in-JS objects (no CSS framework). Font: Kanit (Google Fonts).
- **Animations**: CSS keyframes in `index.css` (fadeInUp, bounce, pop).
- **Build-time constants**: `__APP_VERSION__` and `__COMMIT_HASH__` injected via `vite.config.ts` define.

## Flash Card Flow

1. Card displays the number, Thai name, and English name clearly
2. User presses "🔊 นับเลข" button to start counting
3. Emoji appears → then Thai counting speech plays (หนึ่ง) → next emoji appears → speech (สอง) → ...
4. After counting completes, speaks the Thai name then English name
5. User can press "🔄 นับใหม่" to reset and count again
