
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const HIGHSCORE_FILE = "highscores.json";

app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/api/highscores", (req, res) => {
    fs.readFile(HIGHSCORE_FILE, (err, data) => {
        if (err) return res.json([]);
        res.json(JSON.parse(data));
    });
});

app.post("/api/highscores", (req, res) => {
    const { name, attempts } = req.body;
    if (!name || typeof attempts !== "number") {
        return res.status(400).send("Invalid input");
    }

    fs.readFile(HIGHSCORE_FILE, (err, data) => {
        const scores = err ? [] : JSON.parse(data);
        scores.push({ name, attempts });
        scores.sort((a, b) => a.attempts - b.attempts);
        const topScores = scores.slice(0, 10);
        fs.writeFile(HIGHSCORE_FILE, JSON.stringify(topScores), () => {
            res.json(topScores);
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
