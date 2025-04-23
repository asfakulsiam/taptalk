"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import type { UserBase } from "@/types/user"; // Adjust path if needed

// Define the type of your context
type UserContextType = {
  userInfo: UserBase | null;
  signOut: () => Promise<void>;
};

// Create the context
const UserContext = createContext<UserContextType | null>(null);

// Provider component
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isSignedIn, isLoaded } = useUser();
  const [userInfo, setUserInfo] = useState<UserBase | null>(null);
  const { signOut } = useClerk();

  // Set user info when user is loaded and signed in
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      setUserInfo({
        name: user.fullName ?? "",
        email: user.emailAddresses[0]?.emailAddress ?? "",
        username: user.username ?? "",
        profileImageUrl: user.imageUrl,
      });
    }
  }, [user, isSignedIn, isLoaded]);

  // Handle logout
  const handleLogout = async () => {
    console.log("Trying to log out..."); // Debugging line
    try {
      await signOut();
      console.log("signout success"); // Debugging line
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <UserContext.Provider value={{ userInfo, signOut: handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the context
export const useClerkUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useClerkUser must be used within a UserProvider");
  }
  return context;
};
