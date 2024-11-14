// utils/summaryUtils.js
const { spawn } = require('child_process');

const generateSummary = async (text) => {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', ['../backend/python/analyze_text.py']);

        pythonProcess.stdin.write(text);
        pythonProcess.stdin.end();

        let result = '';
        pythonProcess.stdout.on('data', (data) => {
            result += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error("Python error:", data.toString());
        });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                try {
                    const summary = JSON.parse(result);
                    resolve(summary);
                } catch (error) {
                    reject("Failed to parse Python output.");
                }
            } else {
                reject("Python script failed.");
            }
        });
    });
};

module.exports = { generateSummary };
