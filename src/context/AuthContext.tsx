import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiUrl } from '../config/api';

export interface AuthUser {
  id: string;
  fullName: string;
  name?: string;
  email: string;
  role: 'admin' | 'client' | 'vip' | 'lead' | 'prospect';
  picture?: string;
  avatar?: string;
  phone?: string;
  company?: string;
  status?: string;
  provider?: 'google' | 'password';
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  loginWithGoogle: (payload: {
    email: string;
    name?: string;
    picture?: string;
    googleId?: string;
    credential?: string;
  }) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  googleClientId: string;
  setGoogleClientId: (id: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to safely parse JWT without external library
export function decodeJwt(token: string): any {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem('ae_auth_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('ae_auth_token') || localStorage.getItem('ae_admin_token') || null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const [googleClientId, setGoogleClientIdState] = useState<string>(() => {
    const envId = (import.meta.env.VITE_GOOGLE_CLIENT_ID as string) || '';
    const localId = localStorage.getItem('ae_google_client_id') || '';
    const active = (envId || localId).trim();
    // GOCSPX is a Client Secret, not a Client ID. Ignore it if incorrectly passed.
    if (active.startsWith('GOCSPX-')) {
      localStorage.removeItem('ae_google_client_id');
      return '';
    }
    return active;
  });

  const setGoogleClientId = useCallback(async (newId: string) => {
    const trimmed = newId.trim();
    if (trimmed.startsWith('GOCSPX-')) {
      console.warn('Cannot set Client Secret as Client ID');
      return;
    }
    setGoogleClientIdState(trimmed);
    localStorage.setItem('ae_google_client_id', trimmed);
    try {
      await fetch(apiUrl('/api/config/google-client-id'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId: trimmed }),
      });
    } catch {
      // Safe local fallback
    }
  }, []);

  const openAuthModal = useCallback(() => setIsAuthModalOpen(true), []);
  const closeAuthModal = useCallback(() => setIsAuthModalOpen(false), []);

  const isAdmin = Boolean(
    user && (user.role === 'admin' || user.email?.toLowerCase() === 'kabilk2023@gmail.com')
  );

  const isAuthenticated = Boolean(user && token);

  // Sync / verify session on start
  useEffect(() => {
    const verifyToken = async () => {
      const activeToken = localStorage.getItem('ae_auth_token') || localStorage.getItem('ae_admin_token');
      if (!activeToken) return;

      try {
        const res = await fetch(apiUrl('/api/auth/me'), {
          headers: { Authorization: `Bearer ${activeToken}` },
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.user) {
            setUser((prev) => {
              const updated: AuthUser = {
                id: data.user.id || prev?.id || 'usr-active',
                fullName: data.user.fullName || data.user.name || prev?.fullName || '',
                name: data.user.name || data.user.fullName || prev?.name || '',
                email: data.user.email,
                role: data.user.role === 'admin' || data.user.email?.toLowerCase() === 'kabilk2023@gmail.com' ? 'admin' : (data.user.role || prev?.role || 'client'),
                picture: data.user.picture || prev?.picture,
                phone: data.user.phone || prev?.phone,
                company: data.user.company || prev?.company,
                status: data.user.status || prev?.status || 'active',
                provider: prev?.provider || 'google',
              };
              localStorage.setItem('ae_auth_user', JSON.stringify(updated));
              if (updated.role === 'admin') {
                localStorage.setItem('ae_admin_token', activeToken);
                localStorage.setItem('ae_admin_user', JSON.stringify(updated));
              }
              return updated;
            });
          }
        }
      } catch (err) {
        // Safe offline preservation
      }
    };

    verifyToken();
  }, []);

  const loginWithGoogle = async (payload: {
    email: string;
    name?: string;
    picture?: string;
    googleId?: string;
    credential?: string;
  }) => {
    try {
      let email = payload.email;
      let name = payload.name;
      let picture = payload.picture;
      let googleId = payload.googleId;

      // If a JWT credential was supplied by official Google Identity Services
      if (payload.credential) {
        const decoded = decodeJwt(payload.credential);
        if (decoded) {
          email = decoded.email || email;
          name = decoded.name || name;
          picture = decoded.picture || picture;
          googleId = decoded.sub || googleId;
        }
      }

      if (!email) {
        return { success: false, message: 'Invalid Google account email.' };
      }

      const res = await fetch(apiUrl('/api/auth/google'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, picture, googleId, credential: payload.credential }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const authUser: AuthUser = {
          id: data.user.id,
          fullName: data.user.fullName || data.user.name || name || email.split('@')[0],
          name: data.user.name || data.user.fullName || name || email.split('@')[0],
          email: data.user.email || email,
          role: data.user.role,
          picture: data.user.picture || picture,
          avatar: data.user.picture || picture,
          company: data.user.company,
          phone: data.user.phone,
          status: data.user.status,
          provider: 'google',
        };

        setUser(authUser);
        setToken(data.token);

        localStorage.setItem('ae_auth_token', data.token);
        localStorage.setItem('ae_auth_user', JSON.stringify(authUser));

        // If user is admin, seamlessly unlock admin portal
        if (authUser.role === 'admin' || authUser.email.toLowerCase() === 'kabilk2023@gmail.com') {
          localStorage.setItem('ae_admin_token', data.token);
          localStorage.setItem('ae_admin_user', JSON.stringify(authUser));
        }

        setIsAuthModalOpen(false);
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Google authentication failed.' };
      }
    } catch (err: any) {
      console.error('Login error:', err);
      return { success: false, message: err.message || 'Unable to connect to authentication server.' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('ae_auth_token');
    localStorage.removeItem('ae_auth_user');
    localStorage.removeItem('ae_admin_token');
    localStorage.removeItem('ae_admin_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isAdmin,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        loginWithGoogle,
        logout,
        googleClientId,
        setGoogleClientId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

