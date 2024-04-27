const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

app.post('/generate_paragraph', (req, res) => {
    const { numWords } = req.body;
    const options = {
        maxBuffer: 1024 * 1024 * 10 // Set maxBuffer to 10 MB (10 * 1024 * 1024 bytes)
    };

    if (!numWords || typeof numWords !== 'number' || numWords <= 0) {
        return res.status(400).json({ error: 'Invalid number of words' });
    }

    // Execute the Python script to generate a paragraph prediction
    exec('python Predict.py ' + numWords, options, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.status(500).json({ error: 'Internal server error' });
        }
        // Parse the output from the Python script
        const [prediction, ...paragraph] = stdout.trim().split(' ');
        const formattedParagraph = paragraph.join(' ');
        return res.json({ prediction, paragraph: formattedParagraph });
    });
});

app.listen(port, () => console.log(`Backend server is running on port ${port}`));
