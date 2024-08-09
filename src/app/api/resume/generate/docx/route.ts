import { ClassicDOCX } from "@/components/resume/templates/classic/classic-docx";
import { GENERATED_FILE_LIFETIME } from "@/lib/constants";
import { Packer } from "docx";
import { createReadStream, existsSync, unlinkSync, writeFileSync } from "fs";
import { NextResponse } from "next/server";
import path from "path";
import { v7 as uuid } from "uuid";

export const dynamic = "force-dynamic";

export async function GET() {
  const filename = `${uuid()}.docx`;
  const filepath = path.join(process.cwd(), "storage", filename);

  try {
    writeFileSync(filepath, await Packer.toBuffer(ClassicDOCX));
  } catch (e) {
    return NextResponse.json({ error: "Failed to generate DOCX file" }, { status: 500 });
  }

  if (existsSync(filepath)) {
    try {
      const fileStream = createReadStream(filepath);
      const response = new NextResponse(fileStream as any, {
        headers: {
          "Content-Disposition": `attachment; filename="${filename}"`,
          "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        },
        status: 200,
      });

      setTimeout(() => {
        if (existsSync(filepath)) {
          unlinkSync(filepath);
        }
      }, GENERATED_FILE_LIFETIME);

      return response;
    } catch (e) {
      return NextResponse.json({ error: "Failed to generate DOCX file" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "DOCX file is not found" }, { status: 500 });
  }
}
