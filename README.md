# Sanad (سند) - Event Sponsorship Platform in Egypt

منصة مصرية تربط منظمي الفعاليات بالشركات الراعية بأسعار بالجنيه وفواتير ضريبية.

This project is built with **TanStack Start**, **React 19**, **Vite**, **Tailwind CSS**, and **Supabase**.

---

## 🚀 Deploying to Vercel

The application is configured to deploy directly to [Vercel](https://vercel.com) from GitHub.

### 1. Import Repository into Vercel
1. Log in to your Vercel Dashboard.
2. Click **Add New...** > **Project**.
3. Select this GitHub repository.

### 2. Configure Build & Project Settings
* **Framework Preset**: `Other` (or auto-detected Nitro / Build Output API v3)
* **Root Directory**: `./` (leave default)
* **Build Command**: `npm run build`
* **Output Directory**: Leave empty / default (Nitro automatically produces `.vercel/output`)
* **Install Command**: `npm install` (or `npm ci`)

### 3. Set Environment Variables in Vercel
In the Vercel Project Settings under **Environment Variables**, configure the following variables for `Production`, `Preview`, and `Development`:

| Variable Name | Exposure | Required | Purpose |
| :--- | :--- | :--- | :--- |
| `VITE_SUPABASE_URL` | Public / Client | **Yes** | Supabase project API URL (e.g. `https://your-project.supabase.co`) |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Public / Client | **Yes** | Supabase anon/publishable API key |
| `VITE_SUPABASE_PROJECT_ID` | Public / Client | Optional | Supabase reference ID |
| `SUPABASE_URL` | Server & SSR | **Yes** | Supabase API URL accessed by SSR and server functions |
| `SUPABASE_PUBLISHABLE_KEY` | Server & SSR | **Yes** | Supabase publishable key for SSR queries |
| `SUPABASE_SERVICE_ROLE_KEY` | **Secret (Server Only)** | **Yes** | Supabase service role key for backend admin operations & event ingestion |
| `INGEST_SECRET` | **Secret (Server Only)** | Optional | Secret key used to authorize scheduled calls to `/api/public/ingest-events` |

> 🔒 **Security Notice:**
> - Variables prefixed with `VITE_` are embedded into the client-side JavaScript bundle during build time.
> - `SUPABASE_SERVICE_ROLE_KEY` and `INGEST_SECRET` **must remain secret** and are never exposed to client bundles.

### 4. Supabase Ingest Cron Setup (Optional)
If using the scheduled background event scraper:
1. In your Supabase SQL editor or `public.ingest_config` table, update `ingest_url` to point to your Vercel production domain:
   ```sql
   UPDATE public.ingest_config SET ingest_url = 'https://<your-vercel-domain>.vercel.app/api/public/ingest-events';
   ```

---

## 💻 Local Development

### Prerequisites
- Node.js >= 20.x
- npm >= 10.x

### Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd edit-magic-hub-58
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure local environment:
   ```bash
   cp .env.example .env.local
   # Fill in your Supabase credentials in .env.local
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

5. Build for production locally:
   ```bash
   npm run build
   ```

6. Preview production build:
   ```bash
   npm run preview
   ```

---

## 🛠 Project Scripts

- `npm run dev`: Starts the Vite development server with HMR.
- `npm run build`: Generates the production bundle with Nitro and TanStack Start.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Runs ESLint across the codebase.
- `npm run format`: Formats source files with Prettier.

---

## 🔗 Syncing with Lovable

This project was originally developed with [Lovable](https://lovable.dev). Pushing commits to the `main` branch keeps the codebase in sync with Lovable without rewriting git history.
