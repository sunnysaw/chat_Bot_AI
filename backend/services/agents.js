import "dotenv/config";
import OpenAI from "openai";

const client = new OpenAI();

const SYSTEM_PROMPT = `
You are an AI assistant that give concise and cleare answer to the User Query`;

const userQuery = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "")
      return res
        .status(400)
        .josn({ success: false, answer: `Query can't be empty` });

    const message = [{ role: "user", content: query }];

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: message,
      instructions: SYSTEM_PROMPT,
    });

    const finalOutput = response.output_text;
    res.json({ success: true, answer: finalOutput });
  } catch (error) {
    console.log(
      `Error occur in agents file within the userQuery function => ${error.message}`
    );
    return res.status(400).json({ success: false, answer: `${error.message}` });
  }
};

export default userQuery;
