const xlsx = require('xlsx');
const fs = require('fs');

const oldWb = xlsx.readFile('Updated_RSVP_with_Category.xlsx');
const oldSheet = oldWb.Sheets[oldWb.SheetNames[0]];
const oldData = xlsx.utils.sheet_to_json(oldSheet, { defval: "" });

const newWb = xlsx.readFile('PATICIPANTS PANELS 27th March.xlsx');
const newSheet = newWb.Sheets[newWb.SheetNames[0]];
const newData = xlsx.utils.sheet_to_json(newSheet, { defval: "" });

// Extract old teams
const oldTeams = new Set();
oldData.forEach(row => {
    let name = row['Team Name'];
    if (name) oldTeams.add(name.trim().toLowerCase());
});

// Extract new teams (handling empty rows for members as done before)
const newTeams = new Set();
let teamNameKey = Object.keys(newData[0]).find(k => k.toLowerCase().includes('team name')) || Object.keys(newData[0])[1];

newData.forEach(row => {
    let name = row[teamNameKey];
    if (name && typeof name === 'string' && name.trim() !== '') {
        newTeams.add(name.trim().toLowerCase());
    }
});

console.log(`Old Teams Count (RSVP): ${oldTeams.size}`);
console.log(`New Teams Count (Panels): ${newTeams.size}`);

console.log("Teams in old but not in new:");
oldTeams.forEach(t => {
    if (!newTeams.has(t)) {
        // Find the full casing in oldData
        const original = oldData.find(row => row['Team Name'].trim().toLowerCase() === t);
        console.log(`- ${original['Team Name']} (Category: ${original['Category']})`);
    }
});
