import bodyParser from "body-parser";
import express from "express";
import multer from "multer";
import fs from "fs";
import parsePDF from "./src/parser.js";
import { googleAuth, handleOAuthCallback } from './src/google-auth.js';

// import dateFinder from "./src/GPT.js";

const app = express();
const port = 3000;

app.use(session({
    secret: pprocess.env['SESSION_SECRET'],
    resave: false,
    saveUninitialized: true
}));

// Middleware
const upload = multer({ dest: 'uploads/' });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("src"));
app.use(express.static("public"));

// EJS setup
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
	const jsonData = JSON.parse(fs.readFileSync('test-dates.JSON', 'utf8'));
	res.render('confirm', { important_dates: jsonData.important_dates });
	// res.render("index");
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

// Route to initiate Google OAuth
app.get('/google-auth', googleAuth);

// OAuth callback route
app.get('/auth/google/callback', handleOAuthCallback);

// Starting server
app.listen(port, () => {
	console.log(`Runnig at port ${port}`);
});
