import express from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Static directory for uploaded public media
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Multer storage configuration to store product_video.mp4
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, publicDir);
    },
    filename: (req, file, cb) => {
      cb(null, 'product_video.mp4');
    },
  });

  const upload = multer({
    storage,
    limits: { fileSize: 250 * 1024 * 1024 }, // 250MB limit
  });

  app.use(express.json());

  // API Route: Video Status
  app.get("/api/video-status", (req, res) => {
    const videoFilePath = path.join(publicDir, 'product_video.mp4');
    if (fs.existsSync(videoFilePath)) {
      const stats = fs.statSync(videoFilePath);
      res.json({
        exists: true,
        url: `/product_video.mp4?v=${stats.mtimeMs}`,
        size: stats.size,
      });
    } else {
      res.json({ exists: false, url: null });
    }
  });

  // API Route: Upload Video to Server
  app.post("/api/upload-video", upload.single("video"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "Không tìm thấy file video" });
    }
    const stats = fs.statSync(req.file.path);
    res.json({
      success: true,
      url: `/product_video.mp4?v=${stats.mtimeMs}`,
      message: "Đã tải video lên server thành công cho tất cả khách hàng!",
    });
  });

  // Serve static files from /public
  app.use(express.static(publicDir));

  // Vite middleware for development vs static dist for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
