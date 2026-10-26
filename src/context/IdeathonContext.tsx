import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  Team,
  IdeaSubmission,
  Announcement,
  InnovationTheme,
  SubmissionStatus,
  JudgeScore,
} from '../types/ideathon';

interface IdeathonContextType {
  teams: Team[];
  submissions: IdeaSubmission[];
  announcements: Announcement[];
  createTeam: (name: string, theme: InnovationTheme, leaderName: string, leaderEmail: string, leaderDept: string, leaderCollege: string, leaderId: string) => Team;
  joinTeam: (code: string, userId: string, name: string, email: string, department: string, college: string) => { success: boolean; message: string; team?: Team };
  submitIdea: (data: Omit<IdeaSubmission, 'id' | 'submittedAt' | 'updatedAt' | 'status'>) => IdeaSubmission;
  updateSubmissionStatus: (submissionId: string, status: SubmissionStatus) => void;
  evaluateSubmission: (submissionId: string, score: JudgeScore) => void;
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'createdAt'>) => void;
  deleteAnnouncement: (id: string) => void;
  getUserTeam: (teamId?: string) => Team | undefined;
  getTeamSubmission: (teamId?: string) => IdeaSubmission | undefined;
}

const INITIAL_TEAMS: Team[] = [
  {
    id: 'team_01',
    name: 'NeuralHarvesters',
    code: 'IDEA-8841',
    theme: 'Artificial Intelligence and Machine Learning',
    leaderId: 'user_part_01',
    isInterdisciplinary: true,
    createdAt: '2026-10-16T12:00:00Z',
    members: [
      {
        userId: 'user_part_01',
        name: 'Aarav Sharma',
        email: 'aarav.sharma@mits.ac.in',
        department: 'Electronics & Communication Engineering',
        college: 'MITS',
        role: 'leader',
      },
      {
        userId: 'user_mem_02',
        name: 'Sneha Patel',
        email: 'sneha.p@mits.ac.in',
        department: 'Computer Science & Engineering (AI)',
        college: 'MITS',
        role: 'member',
      },
      {
        userId: 'user_mem_03',
        name: 'Vikas Rao',
        email: 'vikas.rao@mits.ac.in',
        department: 'Mechanical Engineering',
        college: 'MITS',
        role: 'member',
      },
    ],
  },
  {
    id: 'team_02',
    name: 'AgriVolt Dynamics',
    code: 'IDEA-2390',
    theme: 'Renewable Energy and Environmental Sustainability',
    leaderId: 'user_leader_02',
    isInterdisciplinary: true,
    createdAt: '2026-10-18T14:30:00Z',
    members: [
      {
        userId: 'user_leader_02',
        name: 'Kavya Reddy',
        email: 'kavya.reddy@mits.ac.in',
        department: 'Electrical & Electronics Engineering',
        college: 'MITS',
        role: 'leader',
      },
      {
        userId: 'user_mem_04',
        name: 'Manoj Kumar',
        email: 'manoj.k@mits.ac.in',
        department: 'Civil & Environmental Engineering',
        college: 'MITS',
        role: 'member',
      },
    ],
  },
  {
    id: 'team_03',
    name: 'PulseFleet IoT',
    code: 'IDEA-4512',
    theme: 'Mobility, Automotive Technology, and Transportation',
    leaderId: 'user_leader_03',
    isInterdisciplinary: true,
    createdAt: '2026-10-20T09:15:00Z',
    members: [
      {
        userId: 'user_leader_03',
        name: 'Rohit Verma',
        email: 'rohit.v@mits.ac.in',
        department: 'Mechanical & Automotive Systems',
        college: 'MITS',
        role: 'leader',
      },
      {
        userId: 'user_mem_05',
        name: 'Divya Ananth',
        email: 'divya.a@mits.ac.in',
        department: 'Computer Science & Engineering',
        college: 'MITS',
        role: 'member',
      },
    ],
  },
];

const INITIAL_SUBMISSIONS: IdeaSubmission[] = [
  {
    id: 'sub_01',
    teamId: 'team_01',
    teamName: 'NeuralHarvesters',
    leaderName: 'Aarav Sharma',
    leaderEmail: 'aarav.sharma@mits.ac.in',
    title: 'Edge-AI Autonomous Crop Disease Early Telemetry for Smallholder Farmers',
    theme: 'Artificial Intelligence and Machine Learning',
    problemStatement: 'Smallholder agricultural farmers in semi-arid zones suffer up to 35% crop loss because leaf fungal pathogens remain undetected until visually obvious, rendering preventive organic treatments ineffective.',
    solutionAbstract: 'We designed a low-power ESP32-CAM and Raspberry Pi edge module running quantized MobileNetV4. It performs real-time multispectral foliage analysis directly in fields without internet connectivity, dispatching SMS alerts in vernacular Telugu and Hindi.',
    expectedImpact: 'Reduces pesticide expense by 40% while preventing up to 25% post-harvest loss across 1,200 pilot farming hectares in Rayalaseema region.',
    techStack: ['PyTorch Mobile', 'TensorFlow Lite Micro', 'ESP32', 'FastAPI', 'Supabase Edge'],
    documentName: 'NeuralHarvesters_Level1_Executive_Summary.pdf',
    status: 'bootcamp',
    submittedAt: '2026-10-21T15:20:00Z',
    updatedAt: '2026-10-24T18:00:00Z',
    scores: [
      {
        judgeId: 'user_judge_01',
        judgeName: 'Priya Iyer (Pathvision)',
        innovation: 23,
        feasibility: 22,
        impact: 24,
        presentation: 21,
        total: 90,
        feedback: 'Exceptional interdisciplinary integration of hardware sensor design with lightweight computer vision. Focus next on battery life optimization during monsoon cloud cover.',
        submittedAt: '2026-10-24T18:00:00Z',
      },
    ],
    averageScore: 90,
  },
  {
    id: 'sub_02',
    teamId: 'team_02',
    teamName: 'AgriVolt Dynamics',
    leaderName: 'Kavya Reddy',
    leaderEmail: 'kavya.reddy@mits.ac.in',
    title: 'Decentralized Solar Microgrid Autonomous Phase Balancing & Energy Trading',
    theme: 'Renewable Energy and Environmental Sustainability',
    problemStatement: 'Rural decentralized rooftop microgrids face frequent phase unbalance and energy clipping during peak afternoon hours due to lack of real-time peer-to-peer load equalization.',
    solutionAbstract: 'An automated solid-state phase balancing switch combined with a lightweight ledger allowing adjacent farming households to trade excess irrigation solar power autonomously.',
    expectedImpact: 'Recovers 18% wasted clean solar energy and delivers uninterrupted power to critical rural healthcare clinics.',
    techStack: ['Embedded C', 'MQTT', 'Solid State Relays', 'React Dashboard', 'PostgreSQL'],
    documentName: 'AgriVolt_Technical_Whitepaper.pdf',
    status: 'screening',
    submittedAt: '2026-10-22T11:45:00Z',
    updatedAt: '2026-10-22T11:45:00Z',
    scores: [],
    averageScore: undefined,
  },
  {
    id: 'sub_03',
    teamId: 'team_03',
    teamName: 'PulseFleet IoT',
    leaderName: 'Rohit Verma',
    leaderEmail: 'rohit.v@mits.ac.in',
    title: 'Emergency Vehicle Intelligent Corridor Dispatch & Dynamic Traffic Preemption',
    theme: 'Mobility, Automotive Technology, and Transportation',
    problemStatement: 'Ambulances in tier-2 Indian cities face average transit delays of 14 minutes due to non-responsive fixed-cycle signal junctions, directly endangering patient survival windows.',
    solutionAbstract: 'A GPS-linked V2X beacon broadcasting authenticated priority signals to intersection controllers 500m ahead to dynamically create green corridors.',
    expectedImpact: 'Cuts emergency hospital transit duration by 45% based on simulation in Madanapalle city grid.',
    techStack: ['CAN Bus', 'ESP-NOW', 'Node.js', 'Leaflet GIS', 'React'],
    documentName: 'PulseFleet_V2X_Architecture.pdf',
    status: 'level_2',
    submittedAt: '2026-10-23T16:10:00Z',
    updatedAt: '2026-10-25T10:00:00Z',
    scores: [
      {
        judgeId: 'user_judge_01',
        judgeName: 'Priya Iyer (Pathvision)',
        innovation: 21,
        feasibility: 24,
        impact: 23,
        presentation: 22,
        total: 90,
        feedback: 'Very solid practical architecture with clear safety fail-safes. Recommend testing latency with encrypted payloads.',
        submittedAt: '2026-10-25T10:00:00Z',
      },
    ],
    averageScore: 90,
  },
];

const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann_01',
    title: 'Official IDEAVYA 2026 Innovation Bootcamp Scheduled',
    message: 'All teams shortlisted through Level 1 screening will receive direct mentorship access starting next week. Ensure your hardware and software architectural diagrams are updated in the portal.',
    category: 'bootcamp',
    priority: 'high',
    createdAt: '2026-10-25T09:00:00Z',
    author: 'MITS Innovation Cell',
  },
  {
    id: 'ann_02',
    title: 'Reminder: Interdisciplinary Team Composition is Mandatory',
    message: 'To qualify for the Semi-Finale at MITS Campus, each team of 2 to 4 members must represent at least two distinct departments. Single-department teams must add cross-department members prior to Level 2 lock-in.',
    category: 'timeline',
    priority: 'high',
    createdAt: '2026-10-24T14:00:00Z',
    author: 'Pathvision Steering Committee',
  },
  {
    id: 'ann_03',
    title: 'Early Bird Registration Window Open',
    message: 'Early Bird passes are available at ₹150 per team before standard ₹200 pricing takes effect. Registered teams receive immediate access to the problem statements depository.',
    category: 'general',
    priority: 'medium',
    createdAt: '2026-10-22T10:00:00Z',
    author: 'Event Organizing Desk',
  },
];

const IdeathonContext = createContext<IdeathonContextType | undefined>(undefined);

const TEAMS_KEY = 'ideavya_teams';
const SUBMISSIONS_KEY = 'ideavya_submissions';
const ANNOUNCEMENTS_KEY = 'ideavya_announcements';

export const IdeathonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [teams, setTeams] = useState<Team[]>(() => {
    try {
      const saved = localStorage.getItem(TEAMS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_TEAMS;
  });

  const [submissions, setSubmissions] = useState<IdeaSubmission[]>(() => {
    try {
      const saved = localStorage.getItem(SUBMISSIONS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_SUBMISSIONS;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    try {
      const saved = localStorage.getItem(ANNOUNCEMENTS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_ANNOUNCEMENTS;
  });

  useEffect(() => {
    localStorage.setItem(TEAMS_KEY, JSON.stringify(teams));
  }, [teams]);

  useEffect(() => {
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem(ANNOUNCEMENTS_KEY, JSON.stringify(announcements));
  }, [announcements]);

  const createTeam = (
    name: string,
    theme: InnovationTheme,
    leaderName: string,
    leaderEmail: string,
    leaderDept: string,
    leaderCollege: string,
    leaderId: string
  ): Team => {
    const code = `IDEA-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTeam: Team = {
      id: `team_${Date.now()}`,
      name,
      code,
      theme,
      leaderId,
      isInterdisciplinary: false, // only 1 member initially
      createdAt: new Date().toISOString(),
      members: [
        {
          userId: leaderId,
          name: leaderName,
          email: leaderEmail,
          department: leaderDept,
          college: leaderCollege,
          role: 'leader',
        },
      ],
    };
    setTeams(prev => [newTeam, ...prev]);
    return newTeam;
  };

  const joinTeam = (
    code: string,
    userId: string,
    name: string,
    email: string,
    department: string,
    college: string
  ) => {
    const teamIndex = teams.findIndex(t => t.code.trim().toUpperCase() === code.trim().toUpperCase());
    if (teamIndex === -1) {
      return { success: false, message: 'Invalid team invite code. Check with your team leader.' };
    }

    const team = teams[teamIndex];
    if (team.members.length >= 4) {
      return { success: false, message: 'Team limit reached (Maximum 4 members allowed).' };
    }

    if (team.members.some(m => m.userId === userId || m.email === email)) {
      return { success: false, message: 'You are already a member of this team.' };
    }

    const updatedMembers = [
      ...team.members,
      {
        userId,
        name,
        email,
        department,
        college,
        role: 'member' as const,
      },
    ];

    const uniqueDepts = new Set(updatedMembers.map(m => m.department.trim().toLowerCase())).size;
    const isInterdisciplinary = uniqueDepts >= 2;

    const updatedTeam: Team = {
      ...team,
      members: updatedMembers,
      isInterdisciplinary,
    };

    const newTeams = [...teams];
    newTeams[teamIndex] = updatedTeam;
    setTeams(newTeams);

    return {
      success: true,
      message: `Successfully joined ${team.name}!`,
      team: updatedTeam,
    };
  };

  const submitIdea = (data: Omit<IdeaSubmission, 'id' | 'submittedAt' | 'updatedAt' | 'status'>): IdeaSubmission => {
    const existingIndex = submissions.findIndex(s => s.teamId === data.teamId);
    const now = new Date().toISOString();

    if (existingIndex >= 0) {
      const updated: IdeaSubmission = {
        ...submissions[existingIndex],
        ...data,
        updatedAt: now,
      };
      const newSubmissions = [...submissions];
      newSubmissions[existingIndex] = updated;
      setSubmissions(newSubmissions);
      return updated;
    }

    const newSub: IdeaSubmission = {
      ...data,
      id: `sub_${Date.now()}`,
      status: 'submitted',
      submittedAt: now,
      updatedAt: now,
      scores: [],
    };
    setSubmissions(prev => [newSub, ...prev]);
    return newSub;
  };

  const updateSubmissionStatus = (submissionId: string, status: SubmissionStatus) => {
    setSubmissions(prev =>
      prev.map(sub => (sub.id === submissionId ? { ...sub, status, updatedAt: new Date().toISOString() } : sub))
    );
  };

  const evaluateSubmission = (submissionId: string, score: JudgeScore) => {
    setSubmissions(prev =>
      prev.map(sub => {
        if (sub.id !== submissionId) return sub;
        const currentScores = sub.scores ?? [];
        const existingIdx = currentScores.findIndex(s => s.judgeId === score.judgeId);
        let updatedScores: JudgeScore[];
        if (existingIdx >= 0) {
          updatedScores = [...currentScores];
          updatedScores[existingIdx] = score;
        } else {
          updatedScores = [...currentScores, score];
        }
        const avg = Math.round(
          updatedScores.reduce((acc, curr) => acc + curr.total, 0) / updatedScores.length
        );
        return {
          ...sub,
          scores: updatedScores,
          averageScore: avg,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  };

  const addAnnouncement = (item: Omit<Announcement, 'id' | 'createdAt'>) => {
    const newAnn: Announcement = {
      ...item,
      id: `ann_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setAnnouncements(prev => [newAnn, ...prev]);
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  const getUserTeam = (teamId?: string) => {
    if (!teamId) return undefined;
    return teams.find(t => t.id === teamId);
  };

  const getTeamSubmission = (teamId?: string) => {
    if (!teamId) return undefined;
    return submissions.find(s => s.teamId === teamId);
  };

  return (
    <IdeathonContext.Provider
      value={{
        teams,
        submissions,
        announcements,
        createTeam,
        joinTeam,
        submitIdea,
        updateSubmissionStatus,
        evaluateSubmission,
        addAnnouncement,
        deleteAnnouncement,
        getUserTeam,
        getTeamSubmission,
      }}
    >
      {children}
    </IdeathonContext.Provider>
  );
};

export const useIdeathon = () => {
  const ctx = useContext(IdeathonContext);
  if (!ctx) throw new Error('useIdeathon must be used within an IdeathonProvider');
  return ctx;
};
