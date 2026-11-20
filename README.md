# Clevira pre-launch landing page

A responsive Next.js App Router landing page for Clevira Herbal Capsules by Trendora Global Ltd. Product details that have not been verified are clearly marked as awaiting documentation. The page makes no therapeutic, ingredient, dosage or regulatory claims.

## Requirements

- Node.js 20.9+
- npm

## Install and run

```bash
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Product-information requests

The form accepts an email address, a requested quantity (1–99), and explicit consent. It is an information request only; it does not take payment. Configure a confirmed unit price in Nigerian naira and a Resend account with a verified sender:

```env
CLEVIRA_UNIT_PRICE_NGN=
RESEND_API_KEY=
LEADS_NOTIFICATION_EMAIL=
LEADS_FROM_EMAIL=
```

Set `LEADS_NOTIFICATION_EMAIL` to the inbox that should receive requests and `LEADS_FROM_EMAIL` to a sender address verified by Resend. The API reports success only after Resend accepts the email. Do not configure an unverified or estimated product price.

Set a public WhatsApp contact number in international format without punctuation (country code included):

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=234XXXXXXXXXX
```

When this is blank, WhatsApp opens with a prepared message and lets the visitor select a contact. Do not put secret values in `NEXT_PUBLIC_*` variables.

## Before launch

- Replace the privacy and terms placeholders with approved company notices and contact details.
- Verify and publish ingredients, directions, pack details, manufacturer and regulatory information against official documents.
- Confirm the product price; configure and test Resend delivery and the WhatsApp contact.
- Add approved social sharing artwork and real product photography when available.

No product benefits, health outcomes, customer testimonials, or endorsements should be added without suitable substantiation and authorization.
