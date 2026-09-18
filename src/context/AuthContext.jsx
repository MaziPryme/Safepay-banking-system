import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast"
import { authServices } from "../service/authServices";
import { getAccessToken, setAccessToken, getStoredUser, setStoredUser, clearAuthStorage } from "../utils/tokenHelper";
import { getDashboardRouteForRole } from "../utils/roleHelper";

const AuthContext = createContext(null) 

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser());
  const [isLoading, setIsLoading] = useState(true); // true while we check for an existing session
  const [isAuthenticating, setIsAuthenticating] = useState(false); // true during a login/signup submit

  // On first mount: if we have an access token in memory/localStorage, confirm it's still
  // valid by fetching the current user. This is what makes "persist login" / "auto login" work
  // after a page refresh — the httpOnly refresh cookie plus this check re-establishes the session.
  useEffect(() => {
    const bootstrapSession = async () => {
      const token = getAccessToken();
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const response = await authServices.getCurrentUser();
        const currentUser = response?.data || response;
        setUser(currentUser);
        setStoredUser(currentUser);
      } catch {
        // Access token invalid/expired and refresh failed — axios interceptor already
        // cleared storage and redirected if needed. Just make sure local state is clean.
        clearAuthStorage();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    bootstrapSession();
  }, []);

  const login = async (credentials) => {
    setIsAuthenticating(true);
    try {
      const response = await authServices.login(credentials);
      const data = response?.data || response;
      const accessToken = data.accessToken;
      const loggedInUser = data.user;

      setAccessToken(accessToken);
      setStoredUser(loggedInUser);
      setUser(loggedInUser);

      toast.success(`Welcome back, ${loggedInUser?.firstName || "there"}!`);
      return { success: true, redirectTo: getDashboardRouteForRole(loggedInUser?.role) };
    } catch (error) {
      const message = error.response?.data?.message || "Invalid email or password";
      toast.error(message);
      return { success: false };
    } finally {
      setIsAuthenticating(false);
    }
  };

  const signup = async (payload) => {
    setIsAuthenticating(true);
    try {
      const response = await authServices.signup(payload);
      toast.success("Account created! Please check your email to verify your account.");
      return { success: true, data: response?.data || response };
    } catch (error) {
      const message = error.response?.data?.message || "Signup failed. Please try again.";
      toast.error(message);
      return { success: false };
    } finally {
      setIsAuthenticating(false);
    }
  };

  const logout = async () => {
    try {
      await authServices.logout();
    } catch {
      // Even if the server call fails, we still clear local session below.
    } finally {
      clearAuthStorage();
      setUser(null);
      toast.success("Logged out successfully");
    }
  };

  const value = {
    user,
    role: user?.role || null,
    isAuthenticated: !!user,
    isLoading,
    isAuthenticating,
    login,
    signup,
    logout,
    setUser, // exposed so ProfileSettings pages can update the cached user after an edit
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}