"use client";

import { useState } from "react";
import { MessageSquare, Search, UserCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/components/dashboard/user-profile";
import { MobileSearch } from "@/components/dashboard/mobile-search";

type MobileNavigationProps = {
  activeTab: "chat" | "search" | "profile";
  onTabChange: (tab: "chat" | "search" | "profile") => void;
  onChatSelect: (id: number, type: "user" | "group") => void;
};

export function MobileNavigation({
  activeTab,
  onTabChange,
  onChatSelect,
}: MobileNavigationProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      {/* Conditionally render MobileSearch */}
      {isSearchOpen ? (
        <div className="fixed inset-0 z-50 bg-background text-foreground flex flex-col">
          <div className="flex items-center gap-2 p-4 border-b border-border">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(false)}
              className="text-foreground"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <span className="text-lg font-medium">Search</span>
          </div>
          <MobileSearch
            onClose={() => setIsSearchOpen(false)}
            onChatSelect={onChatSelect}
          />
        </div>
      ) : isProfileOpen ? (
        <div className="fixed inset-0 z-50 bg-background text-foreground flex flex-col">
          <div className="flex items-center gap-2 p-4 border-b border-border">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsProfileOpen(false)}
              className="text-foreground"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <span className="text-lg font-medium">Profile</span>
          </div>
          <div className="flex-1 overflow-auto">
            <UserProfile />
          </div>
        </div>
      ) : null}

      {/* Navigation bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background p-2 z-40">
        <div className="flex items-center justify-around">
          {/* Chat Tab */}
          <Button
            variant="ghost"
            size="icon"
            className={`h-12 w-12 rounded-full ${
              activeTab === "chat" ? "text-primary" : "text-foreground"
            }`}
            onClick={() => onTabChange("chat")}
          >
            <MessageSquare className="h-6 w-6" />
            <span className="sr-only">Chats</span>
          </Button>

          {/* Search Tab */}
          <Button
            variant="ghost"
            size="icon"
            className={`h-12 w-12 rounded-full ${
              activeTab === "search" ? "text-primary" : "text-foreground"
            }`}
            onClick={() => {
              onTabChange("search");
              setIsSearchOpen(true);
            }}
          >
            <Search className="h-6 w-6" />
            <span className="sr-only">Search</span>
          </Button>

          {/* Profile Tab */}
          <Button
            variant="ghost"
            size="icon"
            className={`h-12 w-12 rounded-full ${
              activeTab === "profile" ? "text-primary" : "text-foreground"
            }`}
            onClick={() => {
              onTabChange("profile");
              setIsProfileOpen(true);
            }}
          >
            <UserCircle2 className="h-6 w-6" />
            <span className="sr-only">Profile</span>
          </Button>
        </div>
      </div>
    </>
  );
}
