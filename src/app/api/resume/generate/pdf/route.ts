import { ClassicPDF } from "@/components/resume/templates/classic/classic-pdf";
import { GENERATED_FILE_LIFETIME } from "@/lib/constants";
import ReactPDF from "@react-pdf/renderer";
import * as fs from "fs";
import { createReadStream, existsSync } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { v7 as uuid } from "uuid";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const filename = `${uuid()}.pdf`;
  const filepath = path.join(process.cwd(), "storage", filename);

  await ReactPDF.renderToFile(ClassicPDF(), filepath);

  if (existsSync(filepath)) {
    try {
      const fileStream = createReadStream(filepath);
      const response = new NextResponse(fileStream as any, {
        headers: {
          "Content-Disposition": `attachment; filename="${filename}"`,
          "Content-Type": "application/pdf",
        },
        status: 200,
      });

      setTimeout(() => {
        if (existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }
      }, GENERATED_FILE_LIFETIME);
      return response;
    } catch (e) {
      return NextResponse.json({ error: "Failed to generate PDF file" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "PDF file is not found" }, { status: 500 });
  }
}
