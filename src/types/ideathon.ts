// ─── IDEAVYA IDEATHON Types ──────────────────────────────────────────────────

export type UserRole = 'participant' | 'admin' | 'judge';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  college: string;
  department: string;
  phone?: string;
  teamId?: string;
  createdAt: string;
}

export type InnovationTheme =
  | 'Artificial Intelligence and Machine Learning'
  | 'Smart Infrastructure and Industrial Applications'
  | 'Mobility, Automotive Technology, and Transportation'
  | 'Renewable Energy and Environmental Sustainability'
  | 'Social Innovation and Entrepreneurship';

export interface TeamMember {
  userId: string;
  name: string;
  email: string;
  department: string;
  college: string;
  role: 'leader' | 'member';
}

export interface Team {
  id: string;
  name: string;
  code: string;
  theme: InnovationTheme;
  leaderId: string;
  members: TeamMember[];
  isInterdisciplinary: boolean; // true if distinct departments >= 2
  createdAt: string;
}

export type SubmissionStatus =
  | 'submitted'
  | 'screening'
  | 'bootcamp'
  | 'level_2'
  | 'semi_finale'
  | 'grand_finale'
  | 'winner'
  | 'rejected';

export interface IdeaSubmission {
  id: string;
  teamId: string;
  teamName: string;
  leaderName: string;
  leaderEmail: string;
  title: string;
  theme: InnovationTheme;
  problemStatement: string;
  solutionAbstract: string;
  expectedImpact: string;
  techStack: string[];
  documentUrl?: string;
  documentName?: string;
  status: SubmissionStatus;
  submittedAt: string;
  updatedAt: string;
  scores?: JudgeScore[];
  averageScore?: number;
}

export interface JudgeScore {
  judgeId: string;
  judgeName: string;
  innovation: number;   // 0 - 25
  feasibility: number;  // 0 - 25
  impact: number;       // 0 - 25
  presentation: number; // 0 - 25
  total: number;        // 0 - 100
  feedback: string;
  submittedAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  category: 'general' | 'timeline' | 'bootcamp' | 'results';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  author: string;
}

export interface Sponsor {
  id: string;
  name: string;
  category: 'Organizer' | 'Co-Organizer' | 'Partner' | 'Technology';
  logoText: string;
  description: string;
  website: string;
}
