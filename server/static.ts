import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Serve uploaded files from public/uploads
  const uploadsPath = path.resolve(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, { recursive: true });
  }
  app.use(
    "/uploads",
    express.static(uploadsPath, {
      maxAge: "7d",
      setHeaders: (res, filePath) => {
        if (filePath.match(/\.(pdf)$/i)) {
          res.setHeader("Content-Type", "application/pdf");
          res.setHeader("Content-Disposition", "inline");
        }
      },
    })
  );

  // Serve static assets with long-term caching for hashed files (1 year)
  app.use(
    "/assets",
    express.static(path.join(distPath, "assets"), {
      maxAge: "1y",
      immutable: true,
    })
  );

  // Serve other static files with appropriate caching
  app.use(
    express.static(distPath, {
      maxAge: "1d",
      setHeaders: (res, filePath) => {
        // Never cache HTML files
        if (filePath.match(/\.html?$/i)) {
          res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
          res.setHeader("Pragma", "no-cache");
          res.setHeader("Expires", "0");
        }
        // Cache images for longer (1 week)
        else if (filePath.match(/\.(png|jpg|jpeg|gif|svg|webp|ico)$/i)) {
          res.setHeader("Cache-Control", "public, max-age=604800");
        }
      },
    })
  );

  // fall through to index.html if the file doesn't exist (no caching for HTML)
  app.get("/{*splat}", (_req, res) => {
    res.setHeader("Cache-Control", "no-cache");
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
