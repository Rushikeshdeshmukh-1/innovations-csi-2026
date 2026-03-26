const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const newFilePath = path.join(__dirname, 'PATICIPANTS PANELS 27th March.xlsx');
const workbook = xlsx.readFile(newFilePath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const jsonData = xlsx.utils.sheet_to_json(worksheet, { defval: "" });

const firstRow = jsonData[0];
const keys = Object.keys(firstRow);

let teamNameKey = keys.find(k => k.toLowerCase().includes('team name')) || keys[1];
let memberNameKey = keys.find(k => k.toLowerCase().includes('member name')) || keys[3];
let panelKey = keys.find(k => k.toLowerCase().includes('panel')) || keys[4];

const teamsMap = new Map();
let currentTeamName = null;
let currentPanel = null;

jsonData.forEach(row => {
    let teamNameRaw = row[teamNameKey];
    let memberNameRaw = row[memberNameKey];
    let panelRaw = row[panelKey];

    // If there is a team name on this row, it's a new team
    if (teamNameRaw && typeof teamNameRaw === 'string' && teamNameRaw.trim() !== '') {
        currentTeamName = teamNameRaw.trim();
        currentPanel = panelRaw !== "" ? panelRaw : undefined;
    }

    if (!currentTeamName) return; // Still no team, skip noise

    let teamName = currentTeamName;
    let memberName = typeof memberNameRaw === 'string' ? memberNameRaw.trim() : "";

    if (!teamsMap.has(teamName)) {
        teamsMap.set(teamName, {
            teamName: teamName,
            members: [],
            panel: currentPanel
        });
    }

    if (memberName) {
        // Some members might be separated by newlines within the same cell
        const membersList = memberName.split(/[\r\n]+/).map(n => n.trim()).filter(Boolean);
        membersList.forEach(m => {
            teamsMap.get(teamName).members.push({ name: m, foodCheckedIn: false });
        });
    }
});

// The user mentioned "there is 1 more member in pseudo bot team". Let's verify we got 4.
const parsedArr = Array.from(teamsMap.values());
const pseudoBots = parsedArr.find(t => t.teamName.toLowerCase().includes('pseudo'));
console.log("Pseudo Bots members:", pseudoBots ? pseudoBots.members : "Not found!");

fs.writeFileSync('parsed_panels.json', JSON.stringify(parsedArr, null, 2));
console.log(`Parsed ${teamsMap.size} unique teams.`);
