# Brand

`brand.json` holds every user-facing product name, assistant wording and persona string.
The default file reproduces Mr. Mak exactly. A distribution can replace it before building
to rename the app without changing code; colours, fonts and logos stay in
`src/styles/tokens.css` and `public/assets/`.

Where it is read:

- **UI** (`src/brand.ts`): imported by Vite at build time. `index.html` gets the name through `%BRAND_NAME%`.
- **Service** (`desktop/service/brand.mjs`): read at startup. `desktop/prepare.mjs` copies the file
  into the packaged runtime next to the service; in development it is read from this folder.
- **Desktop shell** (`src-tauri/src/brand.rs`): compiled in with `include_str!`.

Line breaks in display text are written as `\n`. Templates fill `{name}` (the `name` key) and the
placeholders listed below.

| Key | Used for |
|---|---|
| `name` | Product name in window titles (`{name} — Workspace`), dialogs, tray menu, errors, mobile app, voice panel and labels |
| `tagline` | Tray tooltip: `{name} — {tagline}` |
| `wordmark.mode` | Sidebar wordmark: `"particles"` (animated dots) or `"text"` (static uppercase text, `.brand-wordmark`) |
| `wordmark.text` | Wordmark text |
| `wordmark.sub` | Small line under the wordmark |
| `boot.title`, `boot.subtitle` | Desktop loading screen |
| `greetings.late`, `.morning`, `.afternoon`, `.evening` | Home greeting before 5:00, before 12:00, before 18:00, after 18:00 |
| `home.empty` | Home with no cards |
| `home.loadError` | Home when workspace.json cannot be loaded |
| `home.noMatches` | Sidebar search without results |
| `pinned.label` | Pinned section heading (sidebar and home) |
| `pinned.emoji` | Show 📌 before the pinned heading |
| `categoryEmoji` | Show category emoji in chips, sidebar and home sections |
| `sidebar.reopenTooltip` | Tooltip of the button that reopens the collapsed sidebar |
| `chats.headerName` | Chats window header (`{headerName} Chats`) and mobile hints |
| `chats.empty.eyebrow`, `.heading`, `.body`, `.button`, `.footnote` | Chats empty state |
| `chats.newChat.eyebrow`, `.heading` | New chat dialog |
| `chats.resumeHelp` | Help text for resuming a CLI conversation |
| `settings.assistantLabel` | Settings section with voice and coordinator options |
| `settings.shortcutLabel` | Recall shortcut setting and tray item; `{shortcut}` is the key label |
| `persona.name` | Name the voice and text coordinator uses for itself |
| `persona.voiceStyle` | Default voice personality (users can still change it in the app) |
| `persona.rules` | Extra lines appended to the voice and coordinator instructions (empty by default) |
| `terminal.cursor`, `.selection`, `.background` | Terminal colours: cursor and selection of the original CLI theme, background of both themes |
| `microphone` | Microphone permission text; reference for packagers (macOS reads it from `src-tauri/Info.plist`) |
