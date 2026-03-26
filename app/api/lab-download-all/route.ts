import { readFile } from "node:fs/promises"
import path from "node:path"
import JSZip from "jszip"
import { NextResponse } from "next/server"

import { getAllDownloadableLabPaths } from "@/lib/lab-downloadable-paths"
import { validateLabRelativePath } from "@/lib/lab-file-path"

export async function GET() {
  const cwd = process.cwd()
  const zip = new JSZip()
  const folder = zip.folder("cloudbet-lab-resources")
  if (!folder) {
    return NextResponse.json({ error: "Zip init failed" }, { status: 500 })
  }

  for (const raw of getAllDownloadableLabPaths()) {
    const rel = validateLabRelativePath(raw)
    if (!rel) continue
    const abs = path.resolve(cwd, rel)
    const relativeToCwd = path.relative(cwd, abs)
    if (
      !relativeToCwd
      || relativeToCwd.startsWith("..")
      || path.isAbsolute(relativeToCwd)
    ) {
      continue
    }
    try {
      const buf = await readFile(abs)
      folder.file(rel, buf)
    } catch {
      /* skip missing */
    }
  }

  const out = await zip.generateAsync({
    type: "nodebuffer",
    compression: "DEFLATE",
    compressionOptions: { level: 6 },
  })

  return new NextResponse(new Uint8Array(out), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": 'attachment; filename="cloudbet-lab-resources.zip"',
    },
  })
}
