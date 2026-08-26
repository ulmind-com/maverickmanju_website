/**
 * Client-side image downscaling, run just before an admin upload.
 *
 * Phone photos are routinely 8–15MB, and pushing one of those through the API
 * to Cloudinary on a slow uplink often outlives the connection: the server
 * finishes the upload but the browser's fetch has already given up, so the
 * admin sees "upload failed" for a file that actually landed. Shrinking to a
 * web-sized JPEG first keeps every upload well inside a few hundred KB.
 */

const MAX_DIMENSION = 2200;
const QUALITY = 0.85;
/** Anything already this small is fast enough to send untouched. */
const SKIP_BELOW_BYTES = 500 * 1024;
/** Formats where re-encoding would lose animation or vector fidelity. */
const PASS_THROUGH = ["image/gif", "image/svg+xml"];

function canCompress(file: File): boolean {
  return (
    typeof document !== "undefined" &&
    file.type.startsWith("image/") &&
    !PASS_THROUGH.includes(file.type)
  );
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read this image."));
    };
    img.src = url;
  });
}

/**
 * Returns a smaller JPEG version of `file`, or the original when it is already
 * small, is an unsupported format, or the browser cannot decode it (HEIC on
 * some desktops) — the backend still accepts the untouched file in that case.
 */
export async function prepareImageForUpload(file: File): Promise<File> {
  if (!canCompress(file)) return file;

  try {
    const img = await loadImage(file);
    const scale = Math.min(1, MAX_DIMENSION / Math.max(img.naturalWidth, img.naturalHeight));

    // Already web-sized and light enough — sending the original keeps it lossless.
    if (scale === 1 && file.size <= SKIP_BELOW_BYTES) return file;

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.naturalWidth * scale);
    canvas.height = Math.round(img.naturalHeight * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Preserve PNG format (and transparency) instead of force-converting to JPEG.
    const isPng = file.type === "image/png";
    const outType = isPng ? "image/png" : "image/jpeg";
    const outQuality = isPng ? undefined : QUALITY;

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, outType, outQuality),
    );
    if (!blob || blob.size >= file.size) return file;

    const name = file.name.replace(/\.[^./\\]+$/, "") || "upload";
    const ext = isPng ? "png" : "jpg";
    return new File([blob], `${name}.${ext}`, { type: outType, lastModified: Date.now() });
  } catch {
    return file;
  }
}
