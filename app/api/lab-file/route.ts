import { readFile } from "node:fs/promises"
import path from "node:path"
import { NextRequest, NextResponse } from "next/server"

import { validateLabRelativePath } from "@/lib/lab-file-path"

export async function GET(req: NextRequest) {
  const rel = validateLabRelativePath(req.nextUrl.searchParams.get("path"))
  if (!rel) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 })
  }

  const cwd = process.cwd()
  const abs = path.resolve(cwd, rel)
  const relativeToCwd = path.relative(cwd, abs)
  if (
    !relativeToCwd
    || relativeToCwd.startsWith("..")
    || path.isAbsolute(relativeToCwd)
  ) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 })
  }

  try {
    const buf = await readFile(abs)
    const name = path.basename(rel)
    return new NextResponse(buf, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${name.replace(/"/g, "")}"`,
      },
    })
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }
}
