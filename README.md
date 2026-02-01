# 🗂️ NESCO Prepaid Meter Dashboard

## 🎥 Demo

**Live Link:** https://jt-excel-automation-electric-meter.vercel.app/

**Repository: (Frontend & Backend)** https://github.com/faridulhaque/Nesco-E-Meter-Dashboard

## 🚀 Overview

**NESCO Prepaid Meter Dashboard** is modern web system that lets users add and manage electric meters, view current balances, and receive daily email alerts when balances fall below a set threshold.

## 🧩 Features

- 🔐 **Login / Register** using Email & Password (email must be real and verified to continue)
- 🗓️ **Add Meters** with meter name, meter no and threshold
- 🔄 **Update Meters** Name & threshold
- ❌ **Delete Meter** anytime
- ⏰ **Scheduled Alert** Low balance alert via email at 12:01 AM

## 🧰 Tech Stack

### Frontend

- Next.js
- TypeScript
- Tailwind CSS

### Backend

- Next.js
- Prisma
- JWT
- NeonDB (SQL)
- MailJet
- cronjob.org (for scheduled email sending)

## 🧑‍💻 Test Credentials

You can try the live app using the following credentials:

Email: `test@faridmurshed.dev`  
Password: `test@faridmurshed.dev`

## ⚙️ Installation (Local Setup)

1. **Clone the repository**

   ```bash
   git clone https://github.com/faridulhaque/Nesco-E-Meter-Dashboard.git
   cd Nesco-E-Meter-Dashboard


   ```

2. **Install dependencies**

   npm install

3. **Create a .env file and add:**

```env

CRON_SECRET=
DATABASE_URL=
MAILJET_PUBLIC_KEY=
MAILJET_PRIVATE_KEY=
MAILJET_SENDER_EMAIL=
JWT_SECRET=

```

NOTE: All environment variables are server-side only. Please do NOT prefix them with NEXT*PUBLIC*

4. **Run Migrations**

```bash

    npx prisma migrate dev --name init
    npx prisma generate

```

5. **Run the development server**

   npm run dev

6. **Open in browser**

   http://localhost:3000



# 🧑‍🤝‍🧑 Author

Faridul Haque Murshed

https://github.com/faridulhaque

⭐ Please star this repo if you like it!
