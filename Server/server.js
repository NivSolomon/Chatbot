import express from "express";
import OpenAI from "openai";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(cors());
app.use(express.json());

// Endpoint to handle OpenAI API calls
app.post("/api/chat", async (req, res) => {
  try {
    const { conversation } = req.body;
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: conversation,
      temperature: 0.4,
    });
    res.json({ message: completion.choices[0].message.content }); // The first element of the array is the assistant response
  } catch (error) {
    console.error("Error communicating with OpenAI:", error);
    res.status(500).json({ error: "Failed to fetch response from OpenAI." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
