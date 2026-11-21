# Clevira website

A responsive Next.js App Router website for Clevira Herbal Capsules by Trendora Global Ltd. Visitors can review package details and continue to WhatsApp to send an order request. The website does not process payments or keep an order database.

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

## Orders and support

The order form opens a prefilled WhatsApp message with the selected package and contact and delivery details. The customer reviews the message and chooses whether to send it. An order is not submitted or confirmed until the customer sends the message and the Clevira team confirms it. The website does not take payment or store order details. Set `NEXT_PUBLIC_WHATSAPP_NUMBER` to the support number in international format; the provided default is the Clevira contact number.

Never put private credentials in `NEXT_PUBLIC_*` variables. Optional consent-based analytics require a configured `ACTIVITY_WEBHOOK_URL` and `ACTIVITY_WEBHOOK_SECRET`.

## Netlify deployment

The repository includes a Netlify build command and Node.js version. Connect `Ukwun/clevira1` to a Netlify site and select `main` as the production branch; Netlify will build and deploy each push automatically. WhatsApp order requests use the public number configured in `NEXT_PUBLIC_WHATSAPP_NUMBER`; no email or payment credentials are required for this handoff. Configure both `ACTIVITY_WEBHOOK_URL` and `ACTIVITY_WEBHOOK_SECRET` in Netlify only if you enable the optional consent-based analytics service, then trigger a fresh deploy.

## Operating requirements

- Review and approve the published privacy notice and order terms.
- Verify ingredients, directions, pack details, manufacturer and regulatory information against official documents.
- Verify that the Clevira WhatsApp account is monitored and that staff can confirm orders and arrange delivery and payment.
- Add approved social sharing artwork and real product photography when available.

No product benefits, health outcomes, customer testimonials, or endorsements should be added without suitable substantiation and authorization.
