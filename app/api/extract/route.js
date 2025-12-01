export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import PDFParser from "pdf2json";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// GROQ CALL
async function callAI(prompt) {
  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
    max_tokens: 800,
  });

  return completion.choices[0]?.message?.content || "";
}

// PDF TEXT EXTRACTOR (pdf2json) - Enhanced version
function extractPdfText(buffer) {
  return new Promise((resolve, reject) => {
    const parser = new PDFParser(null, 1); // Raw text mode

    parser.on("pdfParser_dataError", (err) => reject(err.parserError));

    parser.on("pdfParser_dataReady", (pdf) => {
      let text = "";

      // Try multiple extraction methods
      try {
        // Method 1: Raw text extraction
        if (pdf.Pages && pdf.Pages.length > 0) {
          pdf.Pages.forEach((page) => {
            if (page.Texts && page.Texts.length > 0) {
              page.Texts.forEach((textItem) => {
                if (textItem.R && textItem.R.length > 0) {
                  textItem.R.forEach((r) => {
                    if (r.T) {
                      const decoded = decodeURIComponent(r.T);
                      text += decoded + " ";
                    }
                  });
                }
              });
              text += "\n";
            }
          });
        }

        // Method 2: Fallback to getRawTextContent if available
        if (text.trim().length < 10 && parser.getRawTextContent) {
          text = parser.getRawTextContent();
        }

        resolve(text.trim());
      } catch (e) {
        reject(e);
      }
    });

    parser.parseBuffer(buffer);
  });
}

// --------- MAIN ROUTE ----------
export async function POST(req) {
  try {
    console.log("📥 Request received");
    const formData = await req.formData();
    const file = formData.get("file");
    const question = formData.get("question");

    console.log("📄 File:", file?.name, "Size:", file?.size);
    console.log("❓ Question:", question);

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    console.log("✅ Buffer created, size:", buffer.length);

    // Extract text from PDF
    console.log("🔍 Starting PDF extraction...");
    const extractedText = await extractPdfText(buffer);
    console.log("✅ Text extracted, length:", extractedText.length);
    console.log("📝 First 200 chars:", extractedText.substring(0, 200));

    if (!extractedText.trim() || extractedText.length < 10) {
      return NextResponse.json({ 
        error: "Failed to extract meaningful text from PDF. The file might be image-based or have an unsupported format." 
      }, { status: 500 });
    }

    // Send to AI
    console.log("🤖 Calling Groq AI...");
    const prompt = `
You are an AI specialized in reading PDF documents and producing clean, 
well-formatted, highly readable output.

Below is the extracted text from the document:
----------------------------------------------
${extractedText}
----------------------------------------------

User Question:
${question}

RULES YOU MUST FOLLOW:
1. If the user asks for a summary:
   - Provide a 3-part structured summary:
     a) Executive Summary (2–3 paragraphs)
     b) Key Highlights (bullet points)
     c) Critical Insights (short points)
     
2. If the text looks like a resume:
   - Use resume format:
     - Candidate Summary
     - Skills
     - Experience
     - Education
     - Achievements
     - ATS keywords

3. If the text looks like a report:
   - Structure as:
     - Overview
     - Sections Summary
     - Key Findings
     - Recommendations

4. Always return clean formatting:
   - Use headings
   - Use bullet points where helpful
   - Separate sections with blank lines

5. Final output must be helpful, well-organized, and easy to read.

Now produce the best possible answer:
`;


    const answer = await callAI(prompt);
    console.log("✅ AI response received");

    return NextResponse.json({ text: extractedText, answer });
  } catch (err) {
    console.error("EXTRACT ERROR:", err);
    console.error("Stack:", err.stack);
    return NextResponse.json({ 
      error: "Failed to process PDF", 
      details: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    }, { status: 500 });
  }
}