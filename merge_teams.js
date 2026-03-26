const fs = require('fs');
const path = require('path');

// Read the parsed panels data
const parsedPanels = JSON.parse(fs.readFileSync('parsed_panels.json', 'utf-8'));

// Read the existing leaderboardStore.ts
const storePath = path.join(__dirname, 'src', 'store', 'leaderboardStore.ts');
let storeContent = fs.readFileSync(storePath, 'utf-8');

// Use a regex to extract the mockTeams array from storeContent
// The mockTeams array usually starts with: const mockTeams: Team[] = [
// And ends where we see the end of the array. Let's do something simpler:
// Let's create a temporary node execution to evaluate the array.
// But evaluating TS might be tricky due to typing.

// Let's just do text manipulation to extract the JSON-like part,
// OR since we generated it earlier in generated_teams.txt or parse_xlsx.js, we can write a regex.

// Actually, let's just write a script that generates the whole mockTeams array from scratch
// using the PREVIOUS parse_xlsx.js logic + the new parsed_panels.json logic.
// In the previous step, we generated `mockTeams` using `update_rsvp_with_category.xlsx`.
// Let's parse BOTH files now and merge them.

const xlsx = require('xlsx');

// 1. Parse old file for Categories and Venues
const oldFile = path.join(__dirname, 'Updated_RSVP_with_Category.xlsx');
let oldData = [];
if (fs.existsSync(oldFile)) {
    const wb = xlsx.readFile(oldFile);
    oldData = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { defval: "" });
}

const teamsDb = new Map();

// Initialize old data (category, venue, base members if needed)
oldData.forEach(row => {
    let teamName = row['Team Name'];
    if (!teamName) return;
    teamName = teamName.trim();
    if (!teamsDb.has(teamName)) {
        teamsDb.set(teamName, {
            teamName: teamName,
            category: row['Category']?.trim() || 'SOFTWARE',
        });
    }
});

// Calculate venues
let softwareCount = 0;
let hardwareCount = 0;
const softwareVenues = ['GST AUDI', 'IEM'];
const hardwareVenues = ['LAB-5', 'LAB-6', 'LAB-7'];

const finalTeams = [];

// 2. Iterate through parsed_panels (which is the source of truth for members and panels)
parsedPanels.forEach((panelTeam, idx) => {
    const teamName = panelTeam.teamName;
    const existing = teamsDb.get(teamName) || {};
    
    // Fallback category if not found in old data
    const category = existing.category || 'SOFTWARE'; 

    let venue = '';
    if (category === 'SOFTWARE') {
        venue = softwareVenues[softwareCount % softwareVenues.length];
        softwareCount++;
    } else {
        venue = hardwareVenues[hardwareCount % hardwareVenues.length];
        hardwareCount++;
    }

    // Generate unique ID based on a hash of the team name, or just a random one.
    // let's just make one:
    const id = 'u' + Math.random().toString(36).substr(2, 8);

    // Filter out undefined panels, parse number if possible
    const panel = panelTeam.panel ? String(panelTeam.panel).trim() : undefined;

    finalTeams.push({
        id: id,
        position: idx + 1,
        teamName: teamName,
        projectName: teamName,
        category: category,
        status: 'Under Review',
        score: 0,
        leads: panelTeam.members.length > 0 ? [panelTeam.members[0].name] : [],
        members: panelTeam.members,
        foodCheckedIn: false,
        roomNumber: venue,
        panel: panel
    });
});

console.log("Total final teams:", finalTeams.length);

// Also need to check if there are teams in oldData that are NOT in parsedPanels
// Because maybe they didn't make it to this round? User said "update with this", meaning the new file is the source of truth.

const tsOutput = `export interface Team {
    id: string;
    position: number;
    teamName: string;
    projectName: string;
    category: string;
    status: TeamStatus;
    score: number;
    leads: string[];
    members: TeamMember[];
    foodCheckedIn: boolean;
    roomNumber?: string;
    timeSlot?: string;
    presentationUrl?: string;
    certificateUrl?: string;
    panel?: string;
}

export type TeamStatus = 'Under Review' | 'Pitching' | 'Shortlisted' | 'Eliminated';

export interface TeamMember {
    name: string;
    foodCheckedIn: boolean;
}

const mockTeams: Team[] = [
${finalTeams.map(t => `    {
        id: '${t.id}',
        position: ${t.position},
        teamName: '${t.teamName.replace(/'/g, "\\'")}',
        projectName: '${t.projectName.replace(/'/g, "\\'")}',
        category: '${t.category}',
        status: '${t.status}',
        score: ${t.score},
        leads: ${JSON.stringify(t.leads)},
        members: ${JSON.stringify(t.members)},
        foodCheckedIn: ${t.foodCheckedIn},
        roomNumber: '${t.roomNumber}',
        ${t.panel ? `panel: '${t.panel}',` : ''}
    }`).join(',\n')}
];

export { mockTeams };
`;

fs.writeFileSync('generated_teams_with_panels.txt', tsOutput);
console.log("Successfully generated generated_teams_with_panels.txt");
