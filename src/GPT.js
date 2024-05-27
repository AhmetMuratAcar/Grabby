import OpenAI from "openai";
import 'dotenv/config';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const dateFinder = async (pdfText) => {
    try {
        const prompt = `
        Extract all important dates from the following text and return them in JSON format. Each date should have a title and date, and if available, a time.

        Text:
        ${pdfText}

        Example output:
        [
            {
                "title": "Chem 14D PS 1 Due",
                "date": "2024-01-19",
                "time": "11:59pm"
            },
            {
                "title": "Chem 14D Exam #1",
                "date": "2024-01-31",
                "time": "6:00pm - 7:30pm"
            }
        ]
        `;

        const response = await openai.complete({
            engine: 'davinci-codex', // or any other engine
            prompt: prompt,
            maxTokens: 150,
            n: 1,
            stop: null,
            temperature: 0.5,
        });

        const importantDates = JSON.parse(response.choices[0].text.trim());
        return importantDates;
    } catch (error) {
        console.error('Error extracting dates:', error);
        throw new Error('Failed to extract dates');
    }
};

export default dateFinder;
