# RKVeda Tiffin Platform v1

Fresh full-stack starter for:
- Frontend: https://tiffin.rkveda.in
- API: https://tiffin-api.rkveda.in

## Locked business rules
- Lunch ₹100
- Dinner ₹100
- Lunch + Dinner ₹200/day
- FREE delivery
- Disposable thali
- Every thali: Dal, Sukhi Sabji, Rice, 4 Roti, Salad, Raita
- 7-day menu managed from Admin
- Admin image upload for lunch/dinner menu
- Customer login: Mobile + Password
- Razorpay online payments
- MySQL
- Admin monitoring: dashboard, orders, customers, payments, subscriptions, menu, plans

## Folders
- frontend/ React + Vite customer website + admin panel
- api/ Node.js + Express REST API
- database/ MySQL schema and seed data
- deploy/ Hostinger deployment guide
- docs/ API endpoint reference

## Setup
### Database
Create your MySQL database, then run database/schema.sql.

### API
cd api
npm install
copy .env.example .env
npm run dev

### Frontend
cd frontend
npm install
copy .env.example .env
npm run dev

Frontend env:
VITE_API_BASE_URL=http://localhost:5000/api
VITE_API_ORIGIN=http://localhost:5000

## Admin
The package includes `api/src/seed-admin.js`.
Run:
node src/seed-admin.js
Default credentials:
Mobile: 9999999999
Password: ChangeMe@123

Change the password before production use.

## Razorpay
Put the live/test credentials only in the API `.env`:
RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET
RAZORPAY_WEBHOOK_SECRET

Webhook:
https://tiffin-api.rkveda.in/api/payments/webhook

Payment is verified server-side with the Razorpay signature and webhook.

## Production
Read deploy/HOSTINGER.md before deployment.

## v1.0 implementation note
The Razorpay webhook endpoint uses the raw request body for HMAC verification before JSON parsing, which is required for reliable webhook signature validation.
