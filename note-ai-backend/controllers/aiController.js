const asyncHandler = require("express-async-handler");
const { GoogleGenAI } = require("@google/genai");
const { constants } = require("../errorConstants");
// const dotenv = require("dotenv").config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_KEY,
});

const enhanceNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body || {};

  if (!content) {
    res.status(constants.VALIDATION_ERROR);
    throw new Error("Content is required for AI enhancement");
  }

  const prompt = `
Improve the following note.

Rules:
- Keep the original meaning
- Make it clearer and more expressive
- Expand it to around 70-80 words
- Do NOT add headings or bullet points

Title: ${title || "Untitled"}
Content: ${content}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const enhancedText = response.text;

  if (!enhancedText) {
    res.status(constants.SERVER_ERROR);
    throw new Error("AI did not return any content");
  }

  res.status(200).json({
    success: true,
    enhancedText: enhancedText.trim(),
  });
});

module.exports = { enhanceNote };
