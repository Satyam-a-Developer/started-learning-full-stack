const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs'); // Import fs module to write to files

const app = express();
const port = 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// POST endpoint to receive form data and save it to a JSON file
app.post('/submit-form', (req, res) => {
    const formData = req.body;
    
    // Log the received form data
    console.log('Received form data:', formData);

    // Read the existing data from the file
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ message: 'Error reading file' });
        }

        let jsonData = [];
        
        // If the file is not empty, parse the existing data
        if (data) {
            jsonData = JSON.parse(data);
        }

        // Add the new form data to the JSON array
        jsonData.push(formData);

        // Write the updated data back to the file
        fs.writeFile('data.json', JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error('Error writing to file:', err);
                return res.status(500).json({ message: 'Error writing to file' });
            }

            // Send success response
            res.json({ message: 'Form data saved successfully!' });
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
