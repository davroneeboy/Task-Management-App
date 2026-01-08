/**
 * User role enum.
 */
export enum UserRole {
  MANAGER = 'MANAGER',
  DEVELOPER = 'DEVELOPER',
  VIEWER = 'VIEWER',
}

/**
 * User interface.
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
