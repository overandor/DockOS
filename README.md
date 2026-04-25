# DockOS + Couchify Full-Stack Prototype

Couchify is the consumer app for booking private spaces by the minute.
DockOS is the infrastructure layer powering scheduling, sessions, pricing, and rules.
DockGrid is the optional compute-sharing network for opted-in laptops.
ComputePay lets guests reduce payment by sharing verified simulated compute in MVP.

## Positioning
- **DockOS** = infrastructure
- **Couchify** = consumer app
- **DockGrid** = opt-in compute network
- **ComputePay** = pay-with-compute mechanism

Core ideas:
- “Private space by the minute.”
- “Dock anywhere. Rest privately.”
- “Pay with compute.”
- “Turn idle space into live infrastructure.”

## Tech Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- Vercel deployment
- Mock data first, optional external APIs later

## Setup
```bash
npm install
npm run dev
```

## Environment Variables
Copy `.env.example` to `.env.local`.

- `NEXT_PUBLIC_DOCKOS_API_URL=` optional DockOS backend endpoint.
- `NEXT_PUBLIC_HF_SPACE_URL=` optional public Hugging Face Space LLM endpoint.

If both are empty, the app runs fully in **mock mode**.

## Mock Mode Behavior
- Space discovery, detail pages, host/guest workflows, and compute jobs are local mock data.
- API wrappers in `lib/dockos.ts` switch to remote fetch only when env var is set.
- LLM recommendation box uses a built-in recommendation fallback when HF URL is unset.

## Vercel Deployment
1. Push repository to Git provider.
2. Import project in Vercel.
3. Ensure build commands:
   - Install: `npm install`
   - Build: `npm run build`
4. Add optional env vars in Vercel project settings.
5. Deploy.

`vercel.json` is included for explicit install/build commands.

## Safety Note for Compute Sharing
Compute in this MVP is **explicit opt-in only**:
- No hidden compute
- No mining
- No arbitrary unsafe code
- Simulated workloads only

## Partnerships Language
This prototype is **partnership-ready** and uses integration language only:
- designed for integration with Docker-compatible workflows
- designed for Render-style deployment patterns
- compatible with host inventory models like Airbnb

No official partnerships are claimed.
