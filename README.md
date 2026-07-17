# Yodev

Site bilingue du studio produit et développement Yodev.

## Configuration locale

Copier les variables suivantes dans `.env.local` :

```bash
NEXT_PUBLIC_SITE_URL=https://yodev.fr
CONTACT_EMAIL=hello@yodev.fr
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=Yodev <contact@votre-domaine-verifie.fr>
# Optionnel : le bloc de réservation reste masqué sans URL réelle.
NEXT_PUBLIC_BOOKING_URL=https://...
```

Le formulaire de contact renvoie une erreur visible si Resend n’est pas configuré
ou refuse le message. Il ne simule jamais une réussite.

Les anciennes routes marketing (blog, équipe fictive, carrières, expertises,
audits et anciennes études de cas) sont redirigées temporairement par
`next.config.ts` vers les six surfaces publiques auditées. `src/proxy.ts`
reste consacré à la négociation de langue `next-intl`.

## Développement

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
