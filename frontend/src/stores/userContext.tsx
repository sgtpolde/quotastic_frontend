import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    image: string
  ) => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  //const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("login", {
        email,
        password,
      });
      const userData = response.data;
      setUser({
        id: userData.id,
        firstName: userData.first_name,
        lastName: userData.last_name,
        email: userData.email,
        image: userData.image,
      });
      // navigate('/');
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error (show error message, redirect, etc.)
    }
  };

  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    image: string
  ) => {
    try {
      const response = await api.post("register", {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        image,
      });
      const userData = response.data;
      setUser({
        id: userData.id,
        firstName: userData.first_name,
        lastName: userData.last_name,
        email: userData.email,
        image: userData.image,
      });
      //navigate('/login');
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle registration error (show error message, redirect, etc.)
    }
  };

  // Function to logout user
  const logout = async () => {
    try {
      await api.post("logout", {});
      // Redirect after successful logout
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    const checkUserLogin = async () => {
      try {
        const response = await api.get("me"); // Assuming you have an endpoint to check user authentication
        const userData = response.data;
        setUser({
          id: userData.id,
          firstName: userData.first_name,
          lastName: userData.last_name,
          email: userData.email,
          image: userData.image,
        });
      } catch (error) {
        // Handle authentication error (e.g., redirect to login page, show error message, etc.)
        console.error("User authentication failed:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching user data, regardless of success or failure
      }
    };

    checkUserLogin();
  }, [setUser]);

  return (
    <UserContext.Provider
      value={{ user, setUser, login, register, logout, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
