const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
const path = require('path');
const { extractTextFromPDF } = require('../utils/pdfutils');
const { generateSummary } = require('../utils/summaryUtils');
const { comparePolicies } = require('../utils/compareUtils');

// Define the loadPolicies function to read from policies.json
const loadPolicies = () => {
    const policiesPath = path.join(__dirname, '../policies.json'); // Adjust the path as needed
    const policiesData = fs.readFileSync(policiesPath, 'utf8');
    return JSON.parse(policiesData);
};

let extractedTextGlobal = ''; // Global variable to store extracted text
let availablePoliciesGlobal = [];
let summaryGlobal = {};
let similarPoliciesGlobal = [];

router.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded." });
    }

    const filePath = req.file.path;

    try {
        const extractedText = await extractTextFromPDF(filePath);
        extractedTextGlobal = extractedText; // Store extracted text in global variable
        console.log("Extracted text:", extractedText); // Print extracted text to VS Code terminal
        const summary = await generateSummary(extractedText);
        summary.clientName = summary.clientName.replace(/\n/g, ' '); // Clean up clientName
        summaryGlobal = summary; // Store summary in global variable
        const availablePolicies = loadPolicies(); // Load available policies
        availablePoliciesGlobal = availablePolicies; // Store available policies in global variable
        const similarPolicies = comparePolicies(summary);
        similarPoliciesGlobal = similarPolicies; // Store similar policies in global variable

        console.log("Available policies for comparison:", availablePolicies);
        console.log("User policy summary:", summary);
        console.log("Similar policies found:", similarPolicies);

        const response = { summary, extractedText, availablePolicies, similarPolicies };
        res.json(response);
    } catch (error) {
        console.error("Error during file upload and processing:", error);
        res.status(500).json({ error: 'Failed to process the file.' });
    }
});

router.get('/logs', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const sendLog = (message) => {
        res.write(`data: ${message}\n\n`);
    };

    // Use promises to handle asynchronous operations
    Promise.resolve()
        .then(() => {
            sendLog('File uploaded successfully');
            return new Promise((resolve) => setTimeout(resolve, 1000));
        })
        .then(() => {
            sendLog(`Extracted text: ${JSON.stringify(extractedTextGlobal)}`);
            return new Promise((resolve) => setTimeout(resolve, 1000));
        })
        .then(() => {
            sendLog(`Available policies for comparison: ${JSON.stringify(availablePoliciesGlobal)}`);
            return new Promise((resolve) => setTimeout(resolve, 1000));
        })
        .then(() => {
            sendLog(`User policy summary: ${JSON.stringify(summaryGlobal)}`);
            return new Promise((resolve) => setTimeout(resolve, 1000));
        })
        .then(() => {
            sendLog(`Similar policies found: ${JSON.stringify(similarPoliciesGlobal)}`);
            return new Promise((resolve) => setTimeout(resolve, 1000));
        })
        .then(() => {
            res.end();
        })
        .catch((error) => {
            console.error("Error during log streaming:", error);
            res.status(500).json({ error: 'Failed to stream logs.' });
        });
});

// New endpoint to serve availablePoliciesGlobal
router.get('/available-policies', (req, res) => {
    res.json(availablePoliciesGlobal);
});

// New endpoint to serve similarPoliciesGlobal
router.get('/similar-policies', (req, res) => {
    res.json(similarPoliciesGlobal);
});

module.exports = router;