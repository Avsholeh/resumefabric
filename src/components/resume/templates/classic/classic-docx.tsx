import { Document, Paragraph, TextRun } from "docx";

export const ClassicDOCX = new Document({
  sections: [
    {
      children: [
        new Paragraph({
          children: [
            new TextRun("Hello World"),
            new TextRun({
              text: "Foo Bar",
              bold: true,
            }),
            new TextRun({
              text: "\tGithub is the best",
              bold: true,
            }),
          ],
        }),
      ],
    },
  ],
});
