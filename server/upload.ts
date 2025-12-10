import multer from "multer";
import path from "path";
import fs from "fs";
import sharp from "sharp";
import crypto from "crypto";

// Ensure upload directories exist
const uploadDirs = {
  images: path.join(process.cwd(), "public", "uploads", "images"),
  pdfs: path.join(process.cwd(), "public", "uploads", "pdfs"),
};

Object.values(uploadDirs).forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Generate unique filename
function generateFilename(originalName: string): string {
  const ext = path.extname(originalName);
  const name = path.basename(originalName, ext);
  const hash = crypto.randomBytes(8).toString("hex");
  return `${name.replace(/[^a-zA-Z0-9-_]/g, "_")}_${hash}${ext}`;
}

// Multer storage configuration for images
const imageStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDirs.images);
  },
  filename: (_req, file, cb) => {
    cb(null, generateFilename(file.originalname));
  },
});

// Multer storage configuration for PDFs
const pdfStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDirs.pdfs);
  },
  filename: (_req, file, cb) => {
    cb(null, generateFilename(file.originalname));
  },
});

// Allowed file extensions (whitelist)
const allowedImageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
const allowedPdfExtensions = [".pdf"];

// File filter for images - validates both MIME type and extension
const imageFilter = (
  _req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedMimes.includes(file.mimetype) && allowedImageExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (JPEG, PNG, GIF, WebP) with valid extensions are allowed"));
  }
};

// File filter for PDFs - validates both MIME type and extension
const pdfFilter = (
  _req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (file.mimetype === "application/pdf" && allowedPdfExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files with .pdf extension are allowed"));
  }
};

// Image upload middleware
export const uploadImage = multer({
  storage: imageStorage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max
  },
});

// PDF upload middleware
export const uploadPdf = multer({
  storage: pdfStorage,
  fileFilter: pdfFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max
  },
});

// Image optimization function - converts to WebP and creates optimized versions
export async function optimizeImage(
  inputPath: string,
  options: {
    width?: number;
    quality?: number;
    format?: "webp" | "jpeg" | "png";
  } = {}
): Promise<{ path: string; width: number; height: number; size: number }> {
  const { width, quality = 80, format = "webp" } = options;

  const ext = format === "webp" ? ".webp" : format === "jpeg" ? ".jpg" : ".png";
  const outputFilename = path.basename(inputPath, path.extname(inputPath)) + ext;
  const outputPath = path.join(path.dirname(inputPath), outputFilename);

  let pipeline = sharp(inputPath);

  if (width) {
    pipeline = pipeline.resize(width, undefined, {
      withoutEnlargement: true,
      fit: "inside",
    });
  }

  switch (format) {
    case "webp":
      pipeline = pipeline.webp({ quality });
      break;
    case "jpeg":
      pipeline = pipeline.jpeg({ quality });
      break;
    case "png":
      pipeline = pipeline.png({ compressionLevel: Math.floor((100 - quality) / 10) });
      break;
  }

  const info = await pipeline.toFile(outputPath);

  // Remove original if different from output
  if (inputPath !== outputPath && fs.existsSync(inputPath)) {
    fs.unlinkSync(inputPath);
  }

  return {
    path: outputPath,
    width: info.width,
    height: info.height,
    size: info.size,
  };
}

// Create multiple sizes for responsive images
export async function createResponsiveImages(
  inputPath: string
): Promise<{ original: string; webp: string; thumbnail: string }> {
  const dir = path.dirname(inputPath);
  const basename = path.basename(inputPath, path.extname(inputPath));

  // Create WebP version (optimized original size)
  const webpResult = await optimizeImage(inputPath, {
    format: "webp",
    quality: 85,
  });

  // Create thumbnail (300px width)
  const thumbPath = path.join(dir, `${basename}_thumb.webp`);
  await sharp(webpResult.path)
    .resize(300, undefined, { withoutEnlargement: true, fit: "inside" })
    .webp({ quality: 75 })
    .toFile(thumbPath);

  return {
    original: webpResult.path,
    webp: webpResult.path,
    thumbnail: thumbPath,
  };
}

// Get public URL from file path
export function getPublicUrl(filePath: string): string {
  const publicPath = filePath.replace(process.cwd() + "/public", "");
  return publicPath.startsWith("/") ? publicPath : "/" + publicPath;
}

// Delete file helper
export function deleteFile(filePath: string): void {
  const fullPath = filePath.startsWith("/")
    ? path.join(process.cwd(), "public", filePath)
    : filePath;
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
}
