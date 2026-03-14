# TheNumber - Kids Number Learning App

A React-based educational web app for teaching children numbers 1-10 in Thai and English using flash cards with counting animations and text-to-speech.

## Tech Stack

- React 19 + TypeScript 5.9
- Vite 8 (build tool)
- Redux Toolkit (state management)
- React Router DOM (routing)
- Web Speech API (text-to-speech, no audio files)

## Project Structure

```
src/
├── App.tsx                      # Router setup (/ and /flash-cards routes)
├── main.tsx                     # Entry point
├── index.css                    # Global styles and animations
├── components/
│   ├── FlashCard.tsx            # Flash card with number display + speech
│   └── CountingAnimation.tsx    # Emoji counting animation with per-step speech
├── data/
│   └── numbers.ts              # Number data (1-10): digit, thai, english, emoji, color
├── pages/
│   ├── HomePage.tsx             # Home page with number grid selector
│   └── FlashCardPage.tsx        # Flash card page wrapper
└── store/
    ├── index.ts                 # Redux store config
    ├── hooks.ts                 # Typed useAppSelector/useAppDispatch
    └── flashCardSlice.ts        # Flash card state: currentIndex, isRevealed, isCounting, etc.
```

## Commands

- `npm run dev` — Start dev server
- `npm run build` — TypeScript check + Vite production build
- `npx vite build` — Vite build only (skip tsc)
- `npm run preview` — Preview production build

## Key Patterns

- **State management**: Redux Toolkit slice at `store/flashCardSlice.ts` manages all flash card state (current card index, reveal/counting/playing states)
- **Audio**: Uses browser's Web Speech API (`SpeechSynthesisUtterance`) — no audio files needed. Thai (`th-TH`) and English (`en-US`) voices.
- **Styling**: Inline CSS-in-JS objects (no CSS framework). Font: Kanit (Google Fonts).
- **Animations**: CSS keyframes in `index.css` (fadeInUp, bounce, pop).

## Flash Card Flow

1. Card displays the number, Thai name, and English name clearly
2. User presses "🔊 นับเลข" button to start counting
3. Emojis appear one by one with Thai counting speech (หนึ่ง, สอง, สาม...)
4. After counting completes, speaks the Thai name then English name
5. User can press "🔄 นับใหม่" to reset and count again
