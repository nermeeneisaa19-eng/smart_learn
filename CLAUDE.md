# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SEDUC (منصة التعليم الذكي) is a single-file Arabic-language educational platform prototype. It is a pure HTML/CSS/JavaScript SPA — no build tools, no package manager, no server required. Open `seduc_platform (1).html` directly in a browser to run it.

## Development

No build, lint, or test commands exist. Edit the HTML file and refresh the browser. All HTML, CSS, and JS are in one file.

## Architecture

The application is a single-page app managed entirely by toggling CSS `.hidden` classes between named screens. Navigation never changes the URL.

### Screens

| ID | Purpose |
|----|---------|
| `landing` | Role selection (Student, Teacher, Parent, Admin) |
| `register` | Registration with role-specific fields |
| `login` | Unified login with role-specific badge |
| `student-dash` | Student dashboard |
| `teacher-dash` | Teacher dashboard |
| `parent-dash` | Parent dashboard |
| `admin-dash` | Admin dashboard |

### Navigation Flow

1. `landing` — user picks role card → `showLogin(role)`
2. `login` screen → `doLogin()` → routes to the matching dashboard
3. Within each dashboard, tabs are switched with `sTab()` / `tTab()` / `pTab()` / `aTab()` (student/teacher/parent/admin)

### Key Functions

- `showScreen(id)` — all screen transitions go through this
- `openModal(id)` / `closeModal(id)` — modal dialogs
- `sendAI()` / `addMsg()` — mock AI chat (replies from hardcoded `aiReplies` array)
- `answerQ()` / `loadQ()` — quiz engine (5 Arabic AI/ML questions in `qs` array)
- `runCode()` / `clearCode()` — sandboxed code editor
- `generateAIContent()` — mock AI content generation for teachers
- `togglePodcast()` / `updatePod()` — simulated podcast player

### Styling Conventions

- Primary color: `#FF8C42` (orange)
- Role accent colors: Student `#D4622A`, Teacher `#1B6DB5`, Parent `#1B8A30`, Admin `#7B3ADB`
- RTL layout throughout; font: Cairo (Google Fonts)
- Layout uses CSS Grid and Flexbox; responsive via media queries

### Current Limitations (mock/prototype)

- No backend — all data is hardcoded or simulated
- Authentication (`doLogin`) is a no-op stub
- AI assistant replies are random picks from `aiReplies[]`
- Quiz data is 5 static questions; scores reset on reload
- Media/broadcast features are UI-only with no real streams
