#  Roadmap Feedback Application

An interactive roadmap platform where users can:

 * View product roadmap by status
* Upvote features and milestones
*  Comment, reply, and discuss roadmap items
*  Admins can add roadmap items via a secure dashboard

---

## 🌐 Live Links

* **Frontend:** [https://roadmap-app-azure.vercel.app](https://roadmap-app-azure.vercel.app)
* **Backend API:** [https://road-map-app-backend.vercel.app](https://road-map-app-backend.vercel.app)

---

## 🔑 Test Credentials

### Admin Account (can add roadmap items):

* **Email:** `admin@gmail.com`
* **Password:** `123456#As`

### Regular User Account:

* **Email:** `labib@gmail.com`
* **Password:** `123456`

---

##  Features

* Clean, responsive UI (Next.js 15 + Tailwind CSS)
*  Filter and sort roadmap items by **status**, **category**, **popularity**, or **date**
* Upvote system (one upvote per user per item)
* Nested comments with reply support (max depth: 3 levels)
* Edit/Delete own comments with real-time updates
*  Admin Dashboard to add new roadmap items

---

## 🛠️ Tech Stack

* **Frontend:** Next.js 15, React, Tailwind CSS, Axios
* **Backend:** Node.js, Express.js, MongoDB (Mongoose)
* **Authentication:** Custom JWT-based Auth
* **Deployment:** Vercel (Frontend + Backend)

---

## 📂 Project Structure

```
roadmap-app/
├── frontend/
│   ├── pages/
│   ├── components/
│   └── lib/axios.ts
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.ts
```

---

## ⚡ Quick Start (Local Development)

**Frontend:**

```bash
cd frontend
npm install
npm run dev
```

**Backend:**

```bash
cd backend
npm install
npm run dev
```

Ensure `.env` files are properly configured for backend connection.

---

## 📢 Additional Notes

* Upvotes update instantly via optimistic UI
* Comments show threaded replies with visual indentation
* Admin route protected for adding new roadmap items
* Responsive design for all devices

---

## 📧 Contact

For feedback or queries, please contact: \[[mdrabiulkhanbabo@gmail.com](mailto:mdrabiulkhanbabo@gmail.com)]

---

Do you want me to generate this as a `.md` file ready for download? Let me know! 🚀
