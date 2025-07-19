import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      if(storedToken && storedUser){
        try {
          const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify`, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });
          if (!res.ok) throw new Error("Failed to verify user");
          const data = await res.json();
          setToken(storedToken);
          setAuth(data.user); 
          setLoading(false);
        } catch (err) {
          console.error("Error verifying token:", err);
          logout();
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const login = ({ token, user }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setAuth(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
