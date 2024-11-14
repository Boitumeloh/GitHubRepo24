// utils/compareUtils.js
const fs = require('fs');
const path = require('path');

const loadPolicies = () => {
    const policiesPath = path.join(__dirname, '../policies.json');
    const policiesData = fs.readFileSync(policiesPath);
    return JSON.parse(policiesData);
};

const comparePolicies = (userPolicySummary) => {
    const availablePolicies = loadPolicies();
    console.log("Available policies for comparison:", availablePolicies);
    console.log("User policy summary:", userPolicySummary);

    const normalizeValue = (value) => {
        return value.toString().toLowerCase().replace(/\s/g, '');
    };

    const similarPolicies = availablePolicies.filter(policy => {
        return (
            policy.premium < parseInt(userPolicySummary.premium) &&
            policy.franchise === userPolicySummary.franchise &&
            normalizeValue(policy.freeDoctorChoice) === normalizeValue(userPolicySummary.freeDoctorChoice === 'Yes') &&
            normalizeValue(policy.accidentInsurance) === normalizeValue(userPolicySummary.accidentInsurance === 'Covered')
        );
    });

    console.log("Similar policies found:", similarPolicies);
    return similarPolicies.sort((a, b) => a.premium - b.premium);
};

module.exports = { comparePolicies};
