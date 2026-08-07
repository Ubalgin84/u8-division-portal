import { supabase } from "./supabase";

/**
 * Supabase Storage keys must be plain ASCII (no diacritics, spaces or
 * parentheses). Raw filenames from Windows/macOS pickers (e.g. "Snimek
 * obrazovky 2026-08-07 v 14.35.28.png") break the storage backend and
 * surface as "Failed to save file on the disk" errors from upload().
 */
export function sanitizeFileName(name: string): string {
  const lastDot = name.lastIndexOf(".");
  const base = lastDot > 0 ? name.slice(0, lastDot) : name;
  const ext = lastDot > 0 ? name.slice(lastDot + 1) : "";

  const stripDiacritics = (value: string) =>
    value.normalize("NFD").replace(/[̀-ͯ]/g, "");

  const safeBase =
    stripDiacritics(base)
      .replace(/[^a-zA-Z0-9-_]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .toLowerCase() || "image";

  const safeExt = stripDiacritics(ext)
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();

  return safeExt ? `${safeBase}.${safeExt}` : safeBase;
}

export type UploadImageResult = {
  url: string | null;
  error: string | null;
};

export async function uploadImageToBucket(
  bucket: string,
  file: File
): Promise<UploadImageResult> {
  const fileName = `${Date.now()}-${sanitizeFileName(file.name)}`;

  // Uploading with no session always fails storage RLS; catching it here
  // gives a clear Czech message instead of the raw Supabase error.
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    console.error(`[uploadImage:${bucket}] aborted: no active Supabase session`, {
      fileName,
    });
    return {
      url: null,
      error: "Nejste přihlášen. Přihlaste se prosím znovu a zkuste to znovu.",
    };
  }

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, {
      contentType: file.type || undefined,
      upsert: false,
    });

  if (uploadError) {
    console.error(`[uploadImage:${bucket}] upload() failed`, {
      fileName,
      originalName: file.name,
      size: file.size,
      type: file.type,
      message: uploadError.message,
      name: uploadError.name,
      status:
        (uploadError as { status?: number; statusCode?: string }).status ??
        (uploadError as { status?: number; statusCode?: string }).statusCode,
      raw: uploadError,
    });

    return { url: null, error: uploadError.message };
  }

  const { data: publicUrlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName);

  if (!publicUrlData?.publicUrl) {
    console.error(`[uploadImage:${bucket}] getPublicUrl() returned no URL`, {
      fileName,
    });
    return { url: null, error: "Nepodařilo se získat veřejnou URL souboru." };
  }

  return { url: publicUrlData.publicUrl, error: null };
}
