import pdfParse from "pdf-parse/lib/pdf-parse.js";

const parsePDF = async (pdfBuffer) => {
	try {
		const data = await pdfParse(pdfBuffer);
		return data.text;
	} catch (error) {
		throw new Error(`Failed to parse PDF: $(error)`);
	}
};

export default parsePDF;
