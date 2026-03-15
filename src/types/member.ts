export interface Member {
  id: string;
  displayName: string;
  avatarEmoji: string | null;
  role: 'parent' | 'child';
  dateOfBirth: string;
  createdAt: string;
  familyId: string;
}

export interface Family {
  id: string;
  name: string;
  avatarEmoji: string | null;
  createdAt: string;
  memberCount: number;
  members: Member[];
}

export interface CreateFamilyRequest {
  name: string;
  avatarEmoji?: string;
}

export interface CreateMemberRequest {
  displayName: string;
  avatarEmoji?: string;
  role: 'parent' | 'child';
  dateOfBirth: string;
}
