# 🔗 URL Shortener + QR Code Generator
![](image.png)
[![Axios](https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)
[![Cheerio](https://img.shields.io/badge/cheerio-FFD700?style=for-the-badge&logo=cheerio&logoColor=black)](https://cheerio.js.org/)
[![CORS](https://img.shields.io/badge/cors-4B32C3?style=for-the-badge&logo=node.js&logoColor=white)](https://www.npmjs.com/package/cors)
[![Dotenv](https://img.shields.io/badge/dotenv-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black)](https://www.npmjs.com/package/dotenv)
[![Express](https://img.shields.io/badge/-Express-373737?style=for-the-badge&logo=Express&logoColor=white)](https://expressjs.com/)
[![Fetch API](https://img.shields.io/badge/Fetch%20API-FFCA28?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
[![Fontawesome](https://img.shields.io/badge/fontawesome-538DD7?style=for-the-badge&logo=fontawesome&logoColor=white)](https://fontawesome.com/)
[![MongoDB](https://img.shields.io/badge/-MongoDB-13aa52?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/mongoose-800000?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/)
[![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![qrcode.react](https://img.shields.io/badge/qrcode.react-000000?style=for-the-badge&logo=react&logoColor=61DAFB)](https://github.com/zpao/qrcode.react)
[![React Hot Toast](https://img.shields.io/badge/react--hot--toast-FF6B00?style=for-the-badge&logo=react&logoColor=white)](https://react-hot-toast.com/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![ts-node](https://img.shields.io/badge/ts--node-3178C6?style=for-the-badge&logo=ts-node&logoColor=white)](https://typestrong.org/ts-node/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

A free, open-source, no-login URL shortener with QR code generation. Built with **Next.js + TypeScript** on the frontend, **Express + TypeScript** on the backend, and **MongoDB** for data storage.

## 🚀 Features

- 🔒 No authentication required
- 🧠 Avoids duplicate entries: already-shortened URLs are reused
- 🔁 Prevents shortening an already-shortened URL (loop protection)
- ⚙️ Domain can be changed easily via `.env` (no code changes needed)
- 🖼️ Extracts Open Graph metadata from original URL
- 📦 Fully open-source and ready for deployment

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/matheusleiner/url-shortener.git
cd url-shortener
````

### 2. Install dependencies

```bash
# Install frontend and backend dependencies
cd frontend && npm install
cd ../backend && npm install
```

### 3. Set up environment variables

Create a `.env` file in both `frontend/` and `backend/` folders:

#### Example `.env` (backend)

```env
PORT=3001
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=https://yourdomain.com
```

#### Example `.env` (frontend)

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

### 4. Run the project

```bash
# In two terminals:
cd backend && npm run dev
cd frontend && npm run dev
```

## 🧑‍💻 Contributing

Pull requests are welcome! Feel free to open issues or suggest features.

## 📄 License

This project is licensed under the MIT License.
