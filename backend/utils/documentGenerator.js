const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

async function generateNewPolicyDocument(policy) {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument();
            const filePath = `uploads/${policy.name}_policy.pdf`; // Save to 'uploads' folder
            const writeStream = fs.createWriteStream(filePath);

            doc.pipe(writeStream);

            doc.fontSize(16).text(`Policy Name: ${policy.name}`, 100, 100);
            doc.fontSize(14).text(`Premium: ${policy.premium}`, 100, 120);
            doc.fontSize(14).text(`Franchise: ${policy.franchise}`, 100, 140);

            doc.end();

            writeStream.on("finish", () => {
                resolve(filePath); // Return the relative path
            });

            writeStream.on("error", (err) => {
                reject(err);
            });
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = { generateNewPolicyDocument };
