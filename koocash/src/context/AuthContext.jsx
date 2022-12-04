import React, { createContext, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState("1");

  return (
    <AuthContext.Provider value={{ userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
