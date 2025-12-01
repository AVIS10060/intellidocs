"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export function MarkdownView({ content }) {
  return (
    <div
      className="
        prose prose-invert max-w-none
        prose-h1:text-3xl prose-h1:font-bold
        prose-h2:text-2xl prose-h2:font-semibold
        prose-p:text-gray-300 prose-strong:text-white
      "
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default function ExtractPage() {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleExtract(e) {
    e.preventDefault();

    if (!file) return alert("Select a file first!");

    const form = new FormData();
    form.append("file", file);
    form.append("question", question);

    setLoading(true);

    const res = await fetch("/api/extract", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    setAnswer(data.answer || "No answer found");
    setLoading(false);
  }

  // Format answer with proper line breaks and structure
  function formatAnswer(text) {
    if (!text) return null;
    
    // Split by double line breaks or numbered lists
    const sections = text.split(/\n\n+|\n(?=\d+\.)/);
    
    return sections.map((section, idx) => {
      const trimmed = section.trim();
      if (!trimmed) return null;
      
      // Check if it's a bullet point or numbered list
      if (trimmed.match(/^[-•*]\s/) || trimmed.match(/^\d+\.\s/)) {
        return (
          <li key={idx} className="ml-6 mb-2">
            {trimmed.replace(/^[-•*]\s/, '').replace(/^\d+\.\s/, '')}
          </li>
        );
      }
      
      // Regular paragraph
      return (
        <p key={idx} className="mb-3 leading-relaxed">
          {trimmed}
        </p>
      );
    }).filter(Boolean);
  }

  return (
    <div className="min-h-screen  p-6 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">🧠 AI Document Extractor</h1>
        <p className="text-gray-400 mb-8">Upload a PDF and ask questions about its content</p>

        <div className="bg-gray-900 p-6 rounded-xl shadow-lg space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Upload PDF Document
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files?.[0])}
              className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
            />
            {file && (
              <p className="mt-2 text-sm text-green-400">✓ {file.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Your Question
            </label>
            <textarea
              placeholder="e.g., 'Give me a summary' or 'What are the key skills mentioned?'"
              className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>

          <button
            onClick={handleExtract}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "🔄 Analyzing..." : "Extract & Analyze"}
          </button>
        </div>

        

<div
  className="
    prose prose-invert max-w-none
    prose-h1:text-3xl prose-h1:font-bold
    prose-h2:text-2xl prose-h2:font-semibold
    prose-p:text-gray-300 prose-strong:text-white
  "
>
  <MarkdownView content={answer} />

</div>


      </div>
    </div>
  );
}