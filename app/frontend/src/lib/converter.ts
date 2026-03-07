import { saveAs } from "file-saver";
import { formatInfo } from "./seo";

export interface ConversionResult {
  blob: Blob;
  url: string;
  name: string;
  size: number;
  width: number;
  height: number;
}

export interface FileWithPreview {
  file: File;
  preview?: string;
  name: string;
  size: number;
  width?: number;
  height?: number;
}

let heic2anyModule: typeof import("heic2any") | null = null;

async function loadHeic2Any() {
  if (!heic2anyModule) {
    heic2anyModule = await import("heic2any");
  }
  return heic2anyModule.default;
}

export async function getFilePreview(file: File): Promise<FileWithPreview> {
  return new Promise((resolve) => {
    // Try to create a preview - for HEIC files this may not work directly
    const result: FileWithPreview = {
      file,
      name: file.name,
      size: file.size,
    };

    // Try converting a small version for preview
    loadHeic2Any()
      .then((heic2any) =>
        heic2any({
          blob: file,
          toType: "image/jpeg",
          quality: 0.5,
        })
      )
      .then((conversionResult) => {
        const blob = Array.isArray(conversionResult) ? conversionResult[0] : conversionResult;
        const url = URL.createObjectURL(blob);
        const img = new Image();
        img.onload = () => {
          result.preview = url;
          result.width = img.naturalWidth;
          result.height = img.naturalHeight;
          resolve(result);
        };
        img.onerror = () => {
          result.preview = url;
          resolve(result);
        };
        img.src = url;
      })
      .catch(() => {
        resolve(result);
      });
  });
}

export async function convertHeicToFormat(
  file: File,
  format: string,
  quality: number = 0.92,
  onProgress?: (progress: number) => void
): Promise<ConversionResult> {
  onProgress?.(10);

  const heic2any = await loadHeic2Any();
  onProgress?.(20);

  const info = formatInfo[format];
  if (!info) throw new Error(`Unsupported format: ${format}`);

  // For BMP, we convert to PNG first then to BMP via canvas
  const targetType = format === "bmp" ? "image/png" : format === "pdf" ? "image/jpeg" : info.mime;
  const conversionQuality = info.supportsQuality ? quality : undefined;

  let blob: Blob;
  try {
    const result = await heic2any({
      blob: file,
      toType: targetType,
      quality: conversionQuality,
    });
    blob = Array.isArray(result) ? result[0] : result;
  } catch (err) {
    console.error("heic2any conversion error:", err);
    throw new Error("Failed to convert HEIC file. Please ensure the file is a valid HEIC/HEIF image.");
  }

  onProgress?.(60);

  // For BMP, convert the PNG blob to BMP via canvas
  if (format === "bmp") {
    blob = await convertToBmp(blob);
  }

  onProgress?.(80);

  // Get dimensions
  const { width, height } = await getImageDimensions(blob);

  onProgress?.(100);

  const originalName = file.name.replace(/\.(heic|heif)$/i, "");
  const newName = `${originalName}.${info.ext}`;

  return {
    blob,
    url: URL.createObjectURL(blob),
    name: newName,
    size: blob.size,
    width,
    height,
  };
}

export async function convertHeicToPdf(
  files: File[],
  quality: number = 0.92,
  onProgress?: (progress: number) => void
): Promise<ConversionResult> {
  const { jsPDF } = await import("jspdf");
  const heic2any = await loadHeic2Any();

  onProgress?.(10);

  const doc = new jsPDF();
  let isFirstPage = true;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const progress = 10 + ((i / files.length) * 80);
    onProgress?.(progress);

    const result = await heic2any({
      blob: file,
      toType: "image/jpeg",
      quality,
    });
    const blob = Array.isArray(result) ? result[0] : result;

    const dataUrl = await blobToDataUrl(blob);
    const { width, height } = await getImageDimensions(blob);

    // Calculate dimensions to fit on PDF page
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 10;
    const maxWidth = pageWidth - margin * 2;
    const maxHeight = pageHeight - margin * 2;

    let imgWidth = maxWidth;
    let imgHeight = (height / width) * imgWidth;

    if (imgHeight > maxHeight) {
      imgHeight = maxHeight;
      imgWidth = (width / height) * imgHeight;
    }

    const x = (pageWidth - imgWidth) / 2;
    const y = (pageHeight - imgHeight) / 2;

    if (!isFirstPage) {
      doc.addPage();
    }
    isFirstPage = false;

    doc.addImage(dataUrl, "JPEG", x, y, imgWidth, imgHeight);
  }

  onProgress?.(95);

  const pdfBlob = doc.output("blob");
  const firstName = files[0].name.replace(/\.(heic|heif)$/i, "");
  const pdfName = files.length === 1 ? `${firstName}.pdf` : `heic-photos-${files.length}-pages.pdf`;

  onProgress?.(100);

  return {
    blob: pdfBlob,
    url: URL.createObjectURL(pdfBlob),
    name: pdfName,
    size: pdfBlob.size,
    width: 0,
    height: 0,
  };
}

async function convertToBmp(pngBlob: Blob): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }
      ctx.drawImage(img, 0, 0);

      // Create BMP data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const bmpBlob = createBmpBlob(imageData);
      URL.revokeObjectURL(img.src);
      resolve(bmpBlob);
    };
    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error("Failed to load image for BMP conversion"));
    };
    img.src = URL.createObjectURL(pngBlob);
  });
}

function createBmpBlob(imageData: ImageData): Blob {
  const { width, height, data } = imageData;
  const rowSize = Math.ceil((width * 3) / 4) * 4;
  const pixelDataSize = rowSize * height;
  const fileSize = 54 + pixelDataSize;

  const buffer = new ArrayBuffer(fileSize);
  const view = new DataView(buffer);

  // BMP Header
  view.setUint8(0, 0x42); // 'B'
  view.setUint8(1, 0x4d); // 'M'
  view.setUint32(2, fileSize, true);
  view.setUint32(6, 0, true);
  view.setUint32(10, 54, true);

  // DIB Header
  view.setUint32(14, 40, true);
  view.setInt32(18, width, true);
  view.setInt32(22, height, true);
  view.setUint16(26, 1, true);
  view.setUint16(28, 24, true);
  view.setUint32(30, 0, true);
  view.setUint32(34, pixelDataSize, true);
  view.setUint32(38, 2835, true);
  view.setUint32(42, 2835, true);
  view.setUint32(46, 0, true);
  view.setUint32(50, 0, true);

  // Pixel data (bottom-up, BGR)
  for (let y = height - 1; y >= 0; y--) {
    const rowOffset = 54 + (height - 1 - y) * rowSize;
    for (let x = 0; x < width; x++) {
      const srcIdx = (y * width + x) * 4;
      const dstIdx = rowOffset + x * 3;
      view.setUint8(dstIdx, data[srcIdx + 2]);     // B
      view.setUint8(dstIdx + 1, data[srcIdx + 1]); // G
      view.setUint8(dstIdx + 2, data[srcIdx]);     // R
    }
  }

  return new Blob([buffer], { type: "image/bmp" });
}

function getImageDimensions(blob: Blob): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => {
      resolve({ width: 0, height: 0 });
      URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(blob);
  });
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export function downloadFile(blob: Blob, name: string) {
  saveAs(blob, name);
}

export async function downloadAsZip(
  results: ConversionResult[],
  onProgress?: (progress: number) => void
): Promise<void> {
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();

  results.forEach((result, i) => {
    zip.file(result.name, result.blob);
    onProgress?.(((i + 1) / results.length) * 80);
  });

  onProgress?.(90);
  const zipBlob = await zip.generateAsync({ type: "blob" });
  onProgress?.(100);
  saveAs(zipBlob, "heic-converted.zip");
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}