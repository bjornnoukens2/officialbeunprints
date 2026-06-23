const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(__dirname));

const filePath = path.join(__dirname, 'reviews.json');

/* GET reviews */
app.get('/api/reviews', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.json([]);
        res.json(JSON.parse(data));
    });
});

/* POST review */
app.post('/api/reviews', (req, res) => {
    const newReview = req.body;
    const userIP = req.ip; // IP van gebruiker

    fs.readFile(filePath, 'utf8', (err, data) => {
        let reviews = [];
        if (!err && data) {
            reviews = JSON.parse(data);
        }

        // ❌ Check: heeft deze IP al een review?
        const alreadyReviewed = reviews.find(r => r.ip === userIP);

        if (alreadyReviewed) {
            return res.status(400).send('Je hebt al een review geplaatst!');
        }

        // voeg IP + datum toe
        newReview.ip = userIP;
        newReview.date = new Date().toLocaleDateString();

        reviews.push(newReview);

        fs.writeFile(filePath, JSON.stringify(reviews, null, 2), err => {
            if (err) return res.status(500).send('Error saving review');
            res.send('Review opgeslagen!');
        });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});