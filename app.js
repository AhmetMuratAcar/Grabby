import bodyParser from "body-parser";
import express from "express";
import multer from "multer";
import fs from "fs";
import parsePDF from "./src/parser.js";
// import dateFinder from "./src/GPT.js";

const app = express();
const port = 3000;

// Middleware
const upload = multer({ dest: 'uploads/' });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("src"));
app.use(express.static("public"));

// EJS setup
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
	res.render("index");
});

app.post('/upload-pdf', upload.single('pdfFile'), async (req, res) => {
	if (!req.file) {
		return res.status(400).send('No files were uploaded.');
	}

	const pdfFilePath = req.file.path;
	let pdfBuffer = fs.readFileSync(pdfFilePath);

	try {
		const text = await parsePDF(pdfBuffer);
		// Currrently just rending all parsed text into the confirm page.
		res.render('confirm', { text: text });
	} catch (error) {
		console.error('Error parsing PDF:', error);
		res.status(500).send('Error parsing PDF');
	} finally {
		fs.unlinkSync(pdfFilePath); // File cleanup
	}
});

// Starting server
app.listen(port, () => {
	console.log(`Runnig at port ${port}`);
});
