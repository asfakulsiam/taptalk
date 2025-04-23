
# 🗨️ TapTalk – Real-Time Messaging App

TapTalk is a full-stack modern chat application built with Next.js 14, TypeScript, and Clerk for authentication. It supports real-time one-to-one and group messaging using Socket.io. Inspired by Snapchat's sleek UX, TapTalk makes chatting faster, cleaner, and more fun to use.

---

## 📚 Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [License](#license)

---

## 🚀 Features

- 🔐 Clerk-powered sign-in & sign-up
- 🧑‍🤝‍🧑 Friend system (add/remove users to chat list)
- 💬 One-to-one and group chats
- 🖼️ Update profile with picture
- ✏️ Create and edit group details
- 📩 Unread message counts
- 🟢 Real-time messages via Socket.io
- ⌨️ Typing indicators in chat
- ✅ Read receipts support
- 🌙 Light and dark mode
- 📱 Fully responsive design

---

## 🛠️ Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js 18+
- npm or yarn
- Git
- Clerk account (for auth)
- MongoDB (or your preferred DB)

---

## ⚙️ Installation

1. Clone the repository:

```bash
git clone https://github.com/asfakulsiam/taptalk.git
cd taptalk
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file and add your environment variables:

```env
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_FRONTEND_API=...
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

4. Run the development server:

```bash
npm run dev
```

5. Open your browser at [http://localhost:3000](http://localhost:3000)

---

## 📦 Usage

- 🔐 Sign up / Sign in with Clerk
- 🔍 See a list of all users
- ➕ Add users to your chat list
- 💬 Start one-to-one or group chats
- 🖼️ Upload profile pictures
- ✍️ Rename and edit group chats
- 📩 View unread message indicators
- 🔁 All chats update in real-time!

---

## 🧪 Tech Stack

- Framework: [Next.js 14](https://nextjs.org)
- Language: TypeScript
- Styling: Tailwind CSS, shadcn/ui, Framer Motion
- Auth: Clerk
- Real-time: Socket.io
- Database: MongoDB + Mongoose
- Uploads (planned): UploadThing
- Hosting: Vercel / Render / Railway

---

## 🗂 Folder Structure

```
.
├── app/               # App routes (sign-in, dashboard, etc.)
├── components/        # UI components
├── lib/               # Server actions & utils
├── middleware.ts      # Route protection with Clerk
├── socket/            # Client socket config
├── types/             # TypeScript interfaces/types
└── public/            # Static assets
```

---

## 📄 License

Licensed under the [MIT License](LICENSE).
