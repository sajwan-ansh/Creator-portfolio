export interface UserSession {
  id: string;
  email: string;
  role: 'creator' | 'admin';
  token: string;
  authenticatedAt: string;
}

export interface AuthCredentials {
  passcode?: string;
  email?: string;
  password?: string;
}

export interface AuthResult {
  success: boolean;
  session?: UserSession;
  error?: string;
}

export interface IAuthService {
  login(credentials: AuthCredentials): Promise<AuthResult>;
  logout(): Promise<void>;
  getSession(): UserSession | null;
  isAuthenticated(): boolean;
}
