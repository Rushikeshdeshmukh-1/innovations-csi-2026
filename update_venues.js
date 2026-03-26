const fs = require('fs');
const path = require('path');

const storePath = path.join(__dirname, 'src', 'store', 'leaderboardStore.ts');
let code = fs.readFileSync(storePath, 'utf8');

let hardwareCount = 0;
const labs = ['LAB-5', 'LAB-6', 'LAB-7'];

// We'll replace using regex to safely modify directly without evaluating
// We look for objects inside mockTeams. We can match each team block:
//    {
//        ...
//        roomNumber: '...',
//        panel: '1',
//    }

code = code.replace(/(\{[\s\S]*?roomNumber:\s*'([^']*)'[\s\S]*?panel:\s*'([^']*)' *,?[\s\S]*?\})/g, (match, block, oldVenue, panel) => {
    let newVenue = oldVenue;
    
    if (panel === '1') {
        newVenue = 'GST AUDI';
    } else if (panel === '2') {
        newVenue = labs[hardwareCount % labs.length]; // Assign one of the labs
        hardwareCount++;
    } else if (panel === '3') {
        newVenue = 'IEM CONFERENCE ROOM';
    }

    return block.replace(/roomNumber:\s*'[^']*'/, `roomNumber: '${newVenue}'`);
});

// For Nullpointer, it has NO panel but it's SOFTWARE, so it defaults to GST AUDI which is correct anyway.

fs.writeFileSync(storePath, code);
console.log("Venues updated successfully!");
