const fs = require('fs');

const storePath = 'src/store/leaderboardStore.ts';
let storeCode = fs.readFileSync(storePath, 'utf8');

const newData = fs.readFileSync('generated_teams_with_panels.txt', 'utf8');

// The new data goes from export interface Team { ... } down to export { mockTeams };
// In storeCode, let's find the export const useLeaderboardStore = create...

const storeSplitToken = 'export const useLeaderboardStore = create';
const storeIndex = storeCode.indexOf(storeSplitToken);

if (storeIndex === -1) {
    console.error("Could not find the store split token!");
    process.exit(1);
}

const tail = storeCode.substring(storeIndex);

// Replace the old text with newData + tail
const newStoreCode = newData + '\n' + tail;
fs.writeFileSync(storePath, newStoreCode);
console.log("Successfully injected new teams into leaderboardStore.ts");
