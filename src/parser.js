import pdfParse from "pdf-parse/lib/pdf-parse.js";  
// Imported this way because pdfParse is unmaintained and is raising an error otherwise.

const parsePDF = async (pdfBuffer) => {
	try {
		const data = await pdfParse(pdfBuffer);
		return data.text;
	} catch (error) {
		throw new Error(`Failed to parse PDF: $(error)`);
	}
};

export default parsePDF;
