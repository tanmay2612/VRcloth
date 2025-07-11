# VRcloth 🎨🧥

**VRcloth** is a real-time collaboration platform where users can sketch ideas, write code together, and chat — all in one space. Whether you're designing, coding, or just vibing with your team, VRcloth makes remote collab feel *almost physical*.

---

##  Core Features

- ✏️ **Live Drawing Canvas** – Sketch ideas in real-time with others
- 💬 **Text Chat** – Talk while you work, without switching tabs
- 💻 **Code Editor** – Share and edit code live
- 🎙️ **Voice Chat** – Real conversations while collaborating
- 🛏️ **Rooms** – Create, join, and manage collab spaces on the fly

---

## 🧠 Tech Behind the Magic

- **Frontend**: Next.js + React + TypeScript + Tailwind CSS
- **Backends**:
  - REST APIs → Node.js + Express + Prisma (PostgreSQL)
  - Real-time → WebSockets, WebRTC
- **Auth**: JWT (token-based)
- **Database**: PostgreSQL (via Prisma ORM)
- **Tools**: Managed with `pnpm` & `npm`

---

## 🗂 Folder Breakdown

### `frontend/`  
> The UI part — all things user-facing. Built with Next.js & React. Handles drawing, chatting, code-sharing in real-time.

### `http-backend/`  
> Powers the REST API — handles users, auth, DB queries, and general API routes.

### `websocket-backend/`  
> Manages real-time communication with Socket.io — think collaborative drawing, live code edits, chat events, etc.

---

## ⚙️ Getting Started

Clone this project to your machine:

```bash
git clone https://github.com/tanmay2612/VRcloth.git
cd VRcloth
