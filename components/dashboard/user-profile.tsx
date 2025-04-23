"use client";

import { LogOut, User, Shield, Bell, Moon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "../dark-theme";
import { useClerk, useUser } from "@clerk/nextjs"; // Using Clerk's hooks directly

export function UserProfile() {
  const { user } = useUser(); // Clerk's hook to get the user
  const { signOut } = useClerk(); // Clerk's signOut function

  // Handle sign-out when user clicks the button
  const handleLogout = async () => {
    await signOut(); // Sign out the user using Clerk's signOut method
  };

  // If user is not available, show loading state
  if (!user) {
    return <div>Loading...</div>;
  }

  // Check the user object in the console to see the available properties
  return (
    <div className="flex flex-col h-full overflow-hidden px-4 sm:px-0">
      {/* Header */}
      <div className="flex flex-col items-center justify-center p-6">
        <div className="relative">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.imageUrl} alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Badge className="absolute -top-1 -right-1 bg-primary text-primary-foreground">
            Premium
          </Badge>
        </div>
        {/* Here we log the properties from user to see what to use */}
        <h2 className="mt-4 text-xl font-bold text-foreground">
          {user.firstName || "First Name"} {user.lastName || "Last Name"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {user.emailAddresses[0].emailAddress || "Email Address"}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <span className="status-indicator-online"></span>
          <p className="text-xs text-muted-foreground">Online</p>
        </div>
      </div>

      <Separator className="bg-border" />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide space-y-4 p-2">
        {/* Account Section */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Account</h3>
          <Button variant="ghost" className="w-full justify-start">
            <User className="h-4 w-4" />
            My Profile
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Shield className="h-4 w-4" />
            Privacy
          </Button>
        </div>

        <Separator className="bg-border" />

        {/* Preferences Section */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">
            Preferences
          </h3>
          <div className="flex items-center justify-between py-2 px-4">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <Label htmlFor="notifications" className="text-sm">
                Notifications
              </Label>
            </div>
            <Switch id="notifications" defaultChecked />
          </div>
          <div className="flex items-center justify-between py-2 px-4">
            <div className="flex items-center gap-2">
              <Moon className="h-4 w-4" />
              <Label htmlFor="dark-mode" className="text-sm">
                Dark Mode
              </Label>
            </div>
            <ModeToggle />
          </div>
        </div>

        <Separator className="bg-border" />
      </div>

      {/* Footer with Settings & Logout */}
      <div className="flex flex-col p-4 gap-2">
        <Button variant="destructive" className="w-full" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
