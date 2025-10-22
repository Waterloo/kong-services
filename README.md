
# Services Catalog

  

A Vue 3 application for browsing and managing a catalog of services.

<img width="3684" height="2764" alt="Xnapper" src="https://github.com/user-attachments/assets/160eeb36-6d1b-40ec-be23-1b1a1ee676c5" />


Built with ****Vue 3****, ****TypeScript****, ****Pinia****, and ****Kongponents****, it includes a local API server, strong linting setup, and a custom ****Kong Design Tokens DevTools**** tab to enhance development workflow.

  

---

  

## 🚀 Features

  

- Displays a catalog of services with name, description, type, versions, and key metrics

- Client-side search and pagination

- Detailed service view in a modal

- Loading skeletons, empty, and error states

- Strong typing with ****TypeScript****

- Centralized state management via ****Pinia****

  

---

  

## 🧰 Tech Stack

  

- ****Frontend:**** Vue 3 + Vite + TypeScript

- ****State Management:**** Pinia

- ****Routing:**** Vue Router

- ****Design System:**** `@kong/kongponents`, `@kong/icons`, and Kong Design Tokens

- ****Linting:**** ESLint + Stylelint

- ****Type Checking:**** `vue-tsc`

  

---

  

## ⚙️ Getting Started

  

This project uses ****pnpm****, with versions pinned via ****Volta**** in `package.json`.

  

### 1️⃣ Install dependencies

```bash

pnpm install

```

  

### 2️⃣ Start the local API server

```bash

pnpm dev:server

# Runs at http://localhost:4001

```

  

### 3️⃣ Start the UI

```bash

pnpm dev:ui

# Runs at http://localhost:5173

```

  

For LAN access (testing on mobile or other devices):

```bash

pnpm dev:ui-host

```

  

---

  

## 🏗️ Build & Preview

  

```bash

pnpm build

pnpm dev:server # Start API

pnpm preview  # Preview built UI

```

  

---

  

## 🔍 Linting & Type Checking

  

```bash

pnpm lint  # Run ESLint

pnpm lint:fix

pnpm stylelint # Run Stylelint

pnpm stylelint:fix

pnpm typecheck # Run vue-tsc

```

  

---

  

## 🎨 Kong Design Tokens DevTools

  

A custom DevTools tab for Kong Design Tokens is registered during development.

  <img width="1413" height="879" alt="Xnapper-2025-10-22-01 27 37" src="https://github.com/user-attachments/assets/a3f8e47d-8ad7-4d7c-b315-5a0215e9b077" />


- Available under ****Vue DevTools → “Kong Design Tokens”****

- Displays live token documentation

- Automatically disabled in production builds

  

  

---

  

## 🧾 Conventional Commits

  

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

  

We use ****Conventional Commits**** for structured commit messages.

  

```bash

git add -A

pnpm commit

```
