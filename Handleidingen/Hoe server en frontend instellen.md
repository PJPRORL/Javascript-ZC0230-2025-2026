# 🚀 Project Opstarten

## Vereisten

- **Node.js** geïnstalleerd
- **pnpm** geïnstalleerd

---

## Stap-voor-stap

### 1. Frontend opstarten

Open een **eerste terminal** en navigeer naar de `frontend` map:

```bash
cd frontend
```

Installeer de dependencies:

```bash
pnpm install
```

> ⚠️ **Krijg je een `ERR_PNPM_IGNORED_BUILDS` error?**
> Voer dan eerst dit uit:
>
> ```bash
> pnpm approve-builds
> ```
>
> Keur `esbuild` goed en voer daarna opnieuw `pnpm install` uit.

Start de dev server:

```bash
pnpm dev
```

✅ Open de URL die in de terminal verschijnt (meestal `http://localhost:5173`) in je browser.

---

### 2. Server opstarten

Open een **tweede terminal** en navigeer naar de `server` map:

```bash
cd server
```

Installeer de dependencies:

```bash
pnpm install
```

Start de server:

```bash
pnpm dev
```

---

## Samenvatting

| Terminal   | Map        | Commando's                                        |
| ---------- | ---------- | ------------------------------------------------- |
| Terminal 1 | `frontend` | `pnpm install` → `pnpm dev`                       |
| Terminal 2 | `server`   | `pnpm install` → `pnpm dev`                       |

> 💡 **Belangrijk:** Beide terminals moeten tegelijk blijven draaien!
> - **Frontend** = wat je ziet in de browser
> - **Server** = de backend API die data levert
