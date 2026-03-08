import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TeamStatus = 'Under Review' | 'Pitching' | 'Shortlisted' | 'Eliminated';

export interface TeamMember {
    name: string;
    foodCheckedIn: boolean;
}

export interface Team {
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
}

interface LeaderboardState {
    teams: Team[];
    updateTeamStatus: (id: string, status: TeamStatus) => void;
    getTeamById: (id: string) => Team | undefined;
    getTeamByName: (name: string) => Team | undefined;
    toggleTeamFood: (id: string) => void;
    toggleMemberFood: (teamId: string, memberName: string) => void;
}

const mockTeams: Team[] = [
    {
        id: 'team-9f8a7b',
        position: 1,
        teamName: 'Circuit Breakers',
        projectName: 'NeuroLink AI',
        category: 'Artificial Intelligence',
        status: 'Shortlisted',
        score: 94,
        leads: ['Aarav Patel', 'Priya Sharma'],
        members: [
            { name: 'Aarav Patel', foodCheckedIn: false },
            { name: 'Priya Sharma', foodCheckedIn: false },
        ],
        foodCheckedIn: false,
        roomNumber: 'A-204',
        timeSlot: '14:00 - 14:30',
        presentationUrl: '#',
        certificateUrl: '#',
    },
    {
        id: 'team-3c2d1e',
        position: 2,
        teamName: 'Quantum Flux',
        projectName: 'EcoSense IoT',
        category: 'Internet of Things',
        status: 'Pitching',
        score: 89,
        leads: ['Rohan Mehta', 'Ananya Iyer'],
        members: [
            { name: 'Rohan Mehta', foodCheckedIn: false },
            { name: 'Ananya Iyer', foodCheckedIn: false },
        ],
        foodCheckedIn: false,
        roomNumber: 'B-102',
        timeSlot: '14:30 - 15:00',
    },
    {
        id: 'team-7x6y5z',
        position: 3,
        teamName: 'Binary Storm',
        projectName: 'CryptoShield',
        category: 'Cybersecurity',
        status: 'Under Review',
        score: 86,
        leads: ['Vikram Singh', 'Neha Gupta'],
        members: [
            { name: 'Vikram Singh', foodCheckedIn: false },
            { name: 'Neha Gupta', foodCheckedIn: false },
        ],
        foodCheckedIn: false,
        roomNumber: 'A-301',
        timeSlot: '15:00 - 15:30',
    },
    {
        id: 'team-1a2b3c',
        position: 4,
        teamName: 'Pixel Pioneers',
        projectName: 'MediVision AR',
        category: 'Augmented Reality',
        status: 'Shortlisted',
        score: 83,
        leads: ['Arjun Kumar', 'Sneha Reddy'],
        members: [
            { name: 'Arjun Kumar', foodCheckedIn: false },
            { name: 'Sneha Reddy', foodCheckedIn: false },
        ],
        foodCheckedIn: false,
        roomNumber: 'C-105',
        timeSlot: '15:30 - 16:00',
    },
    {
        id: 'team-4d5e6f',
        position: 5,
        teamName: 'Code Alchemists',
        projectName: 'GreenGrid',
        category: 'Sustainability',
        status: 'Under Review',
        score: 81,
        leads: ['Dev Malhotra', 'Kavya Nair'],
        members: [
            { name: 'Dev Malhotra', foodCheckedIn: false },
            { name: 'Kavya Nair', foodCheckedIn: false },
        ],
        foodCheckedIn: false,
        roomNumber: 'B-203',
        timeSlot: '16:00 - 16:30',
    },
    {
        id: 'team-8g9h0i',
        position: 6,
        teamName: 'Neural Nets',
        projectName: 'DroneHive',
        category: 'Robotics',
        status: 'Pitching',
        score: 78,
        leads: ['Siddharth Rao', 'Ishita Jain'],
        members: [
            { name: 'Siddharth Rao', foodCheckedIn: false },
            { name: 'Ishita Jain', foodCheckedIn: false },
        ],
        foodCheckedIn: false,
        roomNumber: 'A-102',
        timeSlot: '16:30 - 17:00',
    },
    {
        id: 'team-2j3k4l',
        position: 7,
        teamName: 'Stack Overflow',
        projectName: 'EduChain',
        category: 'Blockchain',
        status: 'Under Review',
        score: 75,
        leads: ['Manish Tiwari', 'Riya Das'],
        members: [
            { name: 'Manish Tiwari', foodCheckedIn: false },
            { name: 'Riya Das', foodCheckedIn: false },
        ],
        foodCheckedIn: false,
    },
    {
        id: 'team-5m6n7o',
        position: 8,
        teamName: 'Cyber Sentinels',
        projectName: 'AgriBot Pro',
        category: 'AgriTech',
        status: 'Eliminated',
        score: 62,
        leads: ['Karthik Nair', 'Pooja Verma'],
        members: [
            { name: 'Karthik Nair', foodCheckedIn: false },
            { name: 'Pooja Verma', foodCheckedIn: false },
        ],
        foodCheckedIn: false,
    },
];

export const useLeaderboardStore = create<LeaderboardState>()(
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
