import jsPDF from "jspdf";
import { readBody } from "../utils/readBody";

export const generate = async (req: Request) => {
  const doc = new jsPDF();
  const body: any = await readBody(req);
  console.log("body", body);

  doc.setFontSize(32);
  doc.text(`Title goes here`, 20, 20).setFontSize(14);

  Object.entries(body).forEach(([key, value], index) => {
    doc.text(`${key} ${value}`, 20, (index + 1) * 10 + 20);
  });

  const output = doc.output("arraybuffer");

  return new Response(output, {
    headers: {
      "content-type": "application/pdf",
    },
  });
};
