import OpenAI from "openai";
import 'dotenv/config';

const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'],
});

const dateFinder = async (pdfText) => {
    // Pass the parsed PDF text alongside prompt instructions to GPT model
    // Return a list in JSON format containing dates.
};

export default dateFinder;
