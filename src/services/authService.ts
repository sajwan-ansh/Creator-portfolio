import { IAuthService, AuthCredentials, AuthResult, UserSession } from '../types/auth';
import { ENV } from '../config/envConfig';

const SESSION_KEY = 'ansh_creator_session';

class DevMockAuthService implements IAuthService {
  private currentSession: UserSession | null = null;

  constructor() {
    this.restoreSession();
  }

  private restoreSession(): void {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY);
      if (stored) {
        this.currentSession = JSON.parse(stored);
      }
    } catch {
      this.currentSession = null;
    }
  }

  async login(credentials: AuthCredentials): Promise<AuthResult> {
    // Artificial dev delay to simulate secure network authentication
    await new Promise((res) => setTimeout(res, 600));

    const pin = credentials.passcode?.trim();

    if (!pin) {
      return { success: false, error: 'Passcode is required' };
    }

    if (pin === ENV.devAdminPin) {
      const session: UserSession = {
        id: 'creator-dev-session-01',
        email: 'creator@ansh-portfolio.com',
        role: 'creator',
        token: `mock_jwt_token_${Date.now()}`,
        authenticatedAt: new Date().toISOString(),
      };

      this.currentSession = session;
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));

      return { success: true, session };
    }

    return {
      success: false,
      error: 'Invalid Creator Passcode. (In development, check VITE_DEV_ADMIN_PIN)',
    };
  }

  async logout(): Promise<void> {
    this.currentSession = null;
    sessionStorage.removeItem(SESSION_KEY);
  }

  getSession(): UserSession | null {
    return this.currentSession;
  }

  isAuthenticated(): boolean {
    return this.currentSession !== null;
  }
}

// Export singleton instance based on environment
export const authService: IAuthService = new DevMockAuthService();
