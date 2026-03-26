const fs = require('fs');
const path = require('path');

const storePath = path.join(__dirname, 'src', 'store', 'leaderboardStore.ts');
let code = fs.readFileSync(storePath, 'utf8');

// 1. Add deskCheckedIn: boolean to Team interface
code = code.replace(
    /foodCheckedIn:\s*boolean;/,
    "foodCheckedIn: boolean;\n    deskCheckedIn: boolean;"
);

// 2. Add toggleTeamDeskCheckIn: (id: string) => void; to LeaderboardState interface
code = code.replace(
    /toggleTeamFood:\s*\(id:\s*string\)\s*=>\s*void;/,
    "toggleTeamFood: (id: string) => void;\n    toggleTeamDeskCheckIn: (id: string) => void;"
);

// 3. Add toggleTeamDeskCheckIn implementation
code = code.replace(
    /toggleTeamFood:\s*\(id\)\s*=>([\s\S]*?)set\(\(state\)\s*=>\s*\(\{([\s\S]*?)teams:\s*state\.teams\.map\(\(t\)\s*=>([\s\S]*?)\),\n\s*\}\)\),/m,
    (match) => {
        // we'll just append it after the entire match of toggleTeamFood
        return match + `\n            toggleTeamDeskCheckIn: (id) =>
                set((state) => ({
                    teams: state.teams.map((t) =>
                        t.id === id ? { ...t, deskCheckedIn: !t.deskCheckedIn } : t
                    ),
                })),`;
    }
);

// 4. Add deskCheckedIn: false to all teams in the mockTeams array
// We can find every block that ends with roomNumber or panel and insert it before
// Or just insert it after foodCheckedIn: false,
code = code.replace(/foodCheckedIn:\s*false,/g, "foodCheckedIn: false,\n        deskCheckedIn: false,");

fs.writeFileSync(storePath, code);
console.log("Successfully injected desk check-in features into the store.");
