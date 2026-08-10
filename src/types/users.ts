export type UserRole = "STUDENT" | "INSTRUCTOR" | "MODERATOR" | "ADMIN";
export type UserStatus = "active" | "warning" | "suspended" | "disciplinary";

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  status: UserStatus;
  statusLabel?: string; // 👈 Made optional with '?'
  role: UserRole;
  lastLoginAt: string;
  memberSince: string;
  createdAt?: string;
  updatedAt?: string;
  lastActive?: string;
}