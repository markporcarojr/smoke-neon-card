# Smoke & Neon Card

QR-code landing page for the bar. Smoke clears, the logo flickers on like a neon sign, then it dims behind a stack of buttons. A **Food & Drink** button opens an editable menu at `/menu`.

Everything the owner edits lives in Sanity, embedded at **`/studio`**. He can edit from his phone.

- **Site settings**: business name, logo, glow color, intro on/off, and the buttons (text, link, email, or menu; drag to reorder)
- **Menu sections**: Cocktails, Small Plates, and so on. Drag to reorder.
- **Menu items**: name, description, price, and an **Available** switch to 86 something without deleting it

Until Sanity is hooked up, the site runs on sample content (`sanity/lib/sample.ts`).

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. The studio is at http://localhost:3000/studio.

## Hook up Sanity

1. Make a free project at [sanity.io/manage](https://www.sanity.io/manage) (or run `npx sanity@latest init --env` and pick "create new project").
2. Copy `.env.example` to `.env.local` and fill in `NEXT_PUBLIC_SANITY_PROJECT_ID`. Leave the dataset as `production`.
3. In the project's **API → CORS origins**, add `http://localhost:3000` with **Allow credentials** checked.
4. Restart `npm run dev`, open `/studio`, log in, and fill in **Site settings**.

## Deploy to Vercel

1. Push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new).
2. Add the three env vars from `.env.example` in the Vercel project settings.
3. Add the Vercel URL (and the real domain later) to Sanity's **CORS origins**, with credentials allowed.
4. Point the QR codes at the bar's own domain, not the `.vercel.app` URL. Printed codes can't be changed.

## Make edits go live

Pages are cached and only rebuild when Sanity says something changed. In Sanity, go to **API → Webhooks → Create webhook**:

- **URL**: `https://YOUR-DOMAIN/api/revalidate`
- **Dataset**: `production`
- **Trigger on**: Create, Update, Delete
- **Filter**: `_type in ["siteSettings", "menuCategory", "menuItem"]`
- **Projection**: `{_type}`
- **Secret**: the same value as `SANITY_REVALIDATE_SECRET`

Publish a change in the studio and the live site updates within a few seconds.

## Invite the owner

In sanity.io/manage → **Members**, invite him as an **Editor**. He opens `https://YOUR-DOMAIN/studio` in Safari and can use "Add to Home Screen" so it acts like an app.

## Where things are

| Path | What |
| --- | --- |
| `app/(site)/page.tsx` | Landing page |
| `app/(site)/menu/page.tsx` | Menu page |
| `app/(site)/site.css` | All the neon, smoke and menu styles |
| `components/NeonLanding.tsx` | Intro timing, tap to skip, once-per-visit |
| `components/smoke.ts` | Canvas smoke |
| `sanity/schemaTypes/` | What the owner can edit |
| `sanity/lib/fetch.ts` | Cached Sanity queries |
| `app/api/revalidate/route.ts` | Webhook that clears the cache |

The `.bulb` glow in `site.css` is placed over the Edison bulb on this logo. If the logo changes, delete that block.

Fonts: Josefin Sans and Limelight, self-hosted under the SIL Open Font License (see `app/fonts`).
