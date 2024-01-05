import bodyParser from "body-parser";
import express from "express";
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// EJS setup
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
	res.render("index");
});

// Starting server
app.listen(port, () => {
	console.log(`Runnig at port ${port}`);
});
