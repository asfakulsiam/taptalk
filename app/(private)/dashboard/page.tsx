"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { ChatSidebar } from "@/components/dashboard/chat-sidebar";
import { ChatArea } from "@/components/dashboard/chat-area";
import { MobileNavigation } from "@/components/dashboard/mobile-navigation";
import { MobileMessageList } from "@/components/dashboard/mobile-message-list";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

export default function DashboardPage() {
  const { isLoaded, isSignedIn } = useUser();
  const isMobile = useIsMobile();
  const [activeMobileTab, setActiveMobileTab] = useState<
    "chat" | "search" | "profile"
  >("chat");
  const [isChatActive, setIsChatActive] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<{
    id: number;
    type: "user" | "group";
  } | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Handle chat selection from sidebar or mobile message list
  const handleChatSelect = (id: number, type: "user" | "group") => {
    console.log("Dashboard: Chat selected:", id, type);
    setSelectedChatId({ id, type });
    setShowMobileSidebar(false);
    setIsChatActive(true);
  };

  // Reset chat selection when going back on mobile
  useEffect(() => {
    if (!isChatActive && isMobile) {
      setSelectedChatId(null);
    }
  }, [isChatActive, isMobile]);
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const syncUser = async () => {
        try {
          const res = await fetch("/api/user", { method: "POST" });
        } catch (err) {}
      };
      syncUser();
    }
  }, [isLoaded, isSignedIn]);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        {/* Desktop sidebar */}
        {!isMobile && (
          <div className="w-[320px] flex-shrink-0">
            <ChatSidebar
              onChatSelect={handleChatSelect}
              selectedChatId={selectedChatId}
            />
          </div>
        )}

        {/* Mobile view */}
        {isMobile && (
          <>
            {/* Show chat area when a chat is active */}
            {isChatActive ? (
              <div className="w-full h-full">
                <ChatArea
                  setIsChatActive={setIsChatActive}
                  isChatActive={isChatActive}
                  selectedChatId={selectedChatId}
                />
              </div>
            ) : (
              <>
                {/* Show message list when no chat is active */}
                <div className="w-full h-full pb-16">
                  <MobileMessageList onChatSelect={handleChatSelect} />
                </div>

                {/* Mobile navigation */}
                <MobileNavigation
                  activeTab={activeMobileTab}
                  onTabChange={setActiveMobileTab}
                  onSearchOpen={() => setIsSearchOpen(true)}
                  onSearchClose={() => setIsSearchOpen(false)}
                  onChatSelect={handleChatSelect}
                />
              </>
            )}
          </>
        )}

        {/* Desktop chat area */}
        {!isMobile && (
          <main className="flex-1 overflow-hidden">
            <ChatArea
              setIsChatActive={setIsChatActive}
              isChatActive={isChatActive}
              selectedChatId={selectedChatId}
            />
          </main>
        )}
      </div>
    </SidebarProvider>
  );
}
