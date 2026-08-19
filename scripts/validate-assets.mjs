import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

const manifest = JSON.parse(await readFile("media-manifest.json", "utf8"));

if (manifest.universe !== "JUDAS" || !Array.isArray(manifest.assets) || manifest.assets.length === 0) {
  throw new Error("media-manifest.json: invalid JUDAS manifest");
}

for (const asset of manifest.assets) {
  const data = await readFile(asset.path);
  const hash = createHash("sha256").update(data).digest("hex");

  if (data.length !== asset.size_bytes) {
    throw new Error(`${asset.path}: size mismatch (expected ${asset.size_bytes}, got ${data.length})`);
  }

  if (hash !== asset.sha256) {
    throw new Error(`${asset.path}: SHA-256 mismatch (expected ${asset.sha256}, got ${hash})`);
  }

  console.log(`ok ${asset.path} (${asset.mime_type}, ${asset.duration_seconds}s)`);
}
