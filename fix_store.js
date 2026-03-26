const fs = require('fs');
const path = require('path');

const storePath = path.join(__dirname, 'src', 'store', 'leaderboardStore.ts');
let code = fs.readFileSync(storePath, 'utf8');

const splitToken = 'export const useLeaderboardStore = create<LeaderboardState>()(';
const index = code.indexOf(splitToken);

if (index === -1) {
    console.error("Could not find split token");
    process.exit(1);
}

const before = code.substring(0, index);

const correctStoreDef = `export const useLeaderboardStore = create<LeaderboardState>()(
    persist(
        (set, get) => ({
            teams: mockTeams,
            updateTeamStatus: (id, status) =>
                set((state) => ({
                    teams: state.teams.map((t) => (t.id === id ? { ...t, status } : t)),
                })),
            getTeamById: (id) => get().teams.find((t) => t.id === id),
            getTeamByName: (name) => {
                const lower = name.toLowerCase().trim();
                return get().teams.find((t) => t.teamName.toLowerCase() === lower);
            },
            toggleTeamFood: (id) =>
                set((state) => ({
                    teams: state.teams.map((t) =>
                        t.id === id
                            ? {
                                ...t,
                                foodCheckedIn: !t.foodCheckedIn,
                                members: t.members.map((m) => ({
                                    ...m,
                                    foodCheckedIn: !t.foodCheckedIn,
                                })),
                            }
                            : t
                    ),
                })),
            toggleTeamDeskCheckIn: (id) =>
                set((state) => ({
                    teams: state.teams.map((t) =>
                        t.id === id ? { ...t, deskCheckedIn: !t.deskCheckedIn } : t
                    ),
                })),
            toggleMemberFood: (teamId, memberName) =>
                set((state) => ({
                    teams: state.teams.map((t) => {
                        if (t.id !== teamId) return t;
                        const updatedMembers = t.members.map((m) =>
                            m.name === memberName
                                ? { ...m, foodCheckedIn: !m.foodCheckedIn }
                                : m
                        );
                        const allCheckedIn = updatedMembers.every((m) => m.foodCheckedIn);
                        return { ...t, members: updatedMembers, foodCheckedIn: allCheckedIn };
                    }),
                })),
        }),
        {
            name: 'innovations-leaderboard',
        }
    )
);
`;

fs.writeFileSync(storePath, before + correctStoreDef);
console.log("Successfully fixed checkout store syntax!");
