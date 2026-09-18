# RKVeda Tiffin Frontend

## Latest frontend fixes (1.3.0)

- Admin link is always visible in the main navigation and opens `/admin/login`.
- `/admin-login` is retained as a backward-compatible redirect to `/admin/login`.
- Admin dashboard is protected by the stored `admin` / `super_admin` role.
- Logged-in customers see `My Orders` in the navigation.
- `My Orders` supports both array and `{ orders: [...] }` API responses.
- COD/online order creation accepts common backend order-ID response shapes (`orderId`, `order_id`, `id`, or nested `order`).
- COD order success redirects the customer to `My Orders`.


React + Vite frontend for **RKVeda Tiffin — Vrindavan, Mathura**.

## Current updates

- Cashfree hosted checkout using Cashfree JS SDK v3.
- Backend payment flow:
  - `POST /api/orders`
  - `POST /api/payments/create`
  - Cashfree checkout using `payment_session_id`
  - return to `/payment/callback`
  - `POST /api/payments/verify` for server-side verification
- Razorpay frontend script and checkout code removed.
- Business contact updated:
  - +91 81260 37298
  - +91 98730 81994
  - Vrindavan, Mathura, Uttar Pradesh
  - tiffinrkveda@gmail.com
- Vrindavan-oriented home, plans, checkout, contact and policy copy.
- Cashfree whitelisting pages remain available:
  - `/contact`
  - `/terms`
  - `/refund-cancellation`
  - `/privacy`
- Admin menu image upload UI remains available, and uploaded menu images are displayed on the public menu when the API returns their URLs.

## Environment

Set these in the Hostinger Node/Vite build environment:

`VITE_API_BASE_URL=https://tiffin-api.rkveda.in/api`

`VITE_CASHFREE_MODE=sandbox` for testing.

Change to `production` only when the Cashfree production credentials/configuration are active on the backend.

## Important Cashfree flow

The Cashfree App ID/Client Secret are **not** placed in the frontend. The backend creates the Cashfree order and returns only the payment session required by the browser checkout.

Cashfree documents the web flow as: create the order server-side, use the returned Payment Session ID in Cashfree JS checkout, then verify the payment server-side. 
