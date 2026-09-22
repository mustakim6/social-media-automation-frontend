import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { getProfile, logInUser, logOutuser } from "../services/api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await getProfile();

        console.log("Current user:", response.user);

        setUser(response.user);
      } catch (error) {
        console.log("User is not authenticated");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logIn = async (email, password) => {
    console.log("from contextlogin", email, password);
    const response = await logInUser(email, password);
    setUser(response.user);
    return response;
  };

  const logout = async () => {
    await logOutuser();
    setUser(null);
  };

  const isAuthenticated = !!user;

  const authInfo = { user, loading, logIn, logout, isAuthenticated };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
