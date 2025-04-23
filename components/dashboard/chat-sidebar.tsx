"use client";

import { useState, useEffect } from "react";
import { Search, Plus, Settings, Bell, Users } from "lucide-react";
import { UserProfile } from "./user-profile";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Mock data for users and groups
const onlineUsers = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    unread: 3,
    lastMessage: "Hey, how's it going?",
    time: "10:30 AM",
    isPremium: true,
  },
  {
    id: 2,
    name: "Maria Garcia",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    unread: 0,
    lastMessage: "Can we discuss the project later?",
    time: "9:45 AM",
    isPremium: false,
  },
  {
    id: 3,
    name: "James Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    unread: 1,
    lastMessage: "I've sent you the files",
    time: "Yesterday",
    isPremium: true,
  },
  {
    id: 4,
    name: "Emma Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    unread: 0,
    lastMessage: "Let's catch up soon!",
    time: "Yesterday",
    isPremium: false,
  },
  {
    id: 5,
    name: "Michael Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    unread: 5,
    lastMessage: "Did you see the latest update?",
    time: "Monday",
    isPremium: true,
  },
];

const groups = [
  {
    id: 1,
    name: "Project Alpha",
    avatar: "/placeholder.svg?height=40&width=40",
    unread: 2,
    lastMessage: "Alex: I've updated the designs",
    time: "11:20 AM",
    members: 5,
  },
  {
    id: 2,
    name: "Design Team",
    avatar: "/placeholder.svg?height=40&width=40",
    unread: 0,
    lastMessage: "Maria: Let's meet tomorrow",
    time: "Yesterday",
    members: 8,
  },
  {
    id: 3,
    name: "Marketing",
    avatar: "/placeholder.svg?height=40&width=40",
    unread: 7,
    lastMessage: "James: Campaign results are in!",
    time: "Monday",
    members: 12,
  },
];

interface ChatSidebarProps {
  onChatSelect?: (id: number, type: "user" | "group") => void;
  selectedChatId?: { id: number; type: "user" | "group" } | null;
}

export function ChatSidebar({
  onChatSelect,
  selectedChatId,
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("chats");

  const filteredUsers = onlineUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // For debugging - log when props change
  useEffect(() => {
    console.log("ChatSidebar received selectedChatId:", selectedChatId);
  }, [selectedChatId]);

  const handleChatClick = (id: number, type: "user" | "group") => {
    console.log("ChatSidebar: Chat clicked:", id, type);
    if (onChatSelect) {
      onChatSelect(id, type);
    }
  };

  return (
    <Sidebar className="bg-[hsl(var(--sidebar-bg))] border-r border-[hsl(var(--sidebar-border))] w-[320px] flex flex-col h-full">
      <SidebarHeader className="p-4 pb-2">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-foreground">Taptalk</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground hover:bg-secondary"
            >
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="relative mb-4">
          <Input
            placeholder="Search people and groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-card border-input text-card-foreground h-10 rounded-md"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        </div>
      </SidebarHeader>
      <SidebarContent className="flex-1 overflow-hidden">
        <Tabs
          defaultValue="chats"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-2 bg-card p-0.5 rounded-md mb-2 mx-4">
            <TabsTrigger
              value="chats"
              className="rounded data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=inactive]:text-muted-foreground py-2"
            >
              Chats
            </TabsTrigger>
            <TabsTrigger
              value="groups"
              className="rounded data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=inactive]:text-muted-foreground py-2"
            >
              Groups
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chats" className="mt-0 px-4">
            <div className="flex items-center justify-between mb-2">
              <SidebarGroupLabel className="text-muted-foreground text-sm font-medium">
                Chats
              </SidebarGroupLabel>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-secondary"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <SidebarGroup>
              <SidebarGroupContent className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
                <SidebarMenu>
                  {filteredUsers.map((user) => (
                    <SidebarMenuItem key={user.id}>
                      <Button
                        variant={
                          selectedChatId?.id === user.id &&
                          selectedChatId?.type === "user"
                            ? "secondary"
                            : "ghost"
                        }
                        className="w-full justify-start p-2 h-auto"
                        onClick={() => handleChatClick(user.id, "user")}
                      >
                        <div className="flex items-center w-full">
                          <div className="relative">
                            <Avatar className="h-10 w-10 border-0">
                              <AvatarImage
                                src={user.avatar || "/placeholder.svg"}
                                alt={user.name}
                              />
                              <AvatarFallback className="bg-secondary text-secondary-foreground">
                                {user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span
                              className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${
                                user.status === "online"
                                  ? "bg-[hsl(var(--status-online))]"
                                  : "bg-[hsl(var(--status-offline))]"
                              } ring-2 ring-[hsl(var(--sidebar-bg))]`}
                            ></span>
                            {user.isPremium && (
                              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                                ✓
                              </span>
                            )}
                          </div>
                          <div className="ml-3 flex-1 overflow-hidden text-left">
                            <div className="flex justify-between items-center">
                              <span className="text-foreground font-medium">
                                {user.name}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {user.time}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground truncate">
                              {user.lastMessage}
                            </p>
                          </div>
                          {user.unread > 0 && (
                            <Badge className="ml-auto bg-primary hover:bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center p-0 text-xs">
                              {user.unread}
                            </Badge>
                          )}
                        </div>
                      </Button>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </TabsContent>

          <TabsContent value="groups" className="mt-0 px-4">
            <div className="flex items-center justify-between mb-2">
              <SidebarGroupLabel className="text-muted-foreground text-sm font-medium">
                Groups
              </SidebarGroupLabel>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-secondary"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <SidebarGroup>
              <SidebarGroupContent className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
                <SidebarMenu>
                  {filteredGroups.map((group) => (
                    <SidebarMenuItem key={group.id}>
                      <Button
                        variant={
                          selectedChatId?.id === group.id &&
                          selectedChatId?.type === "group"
                            ? "secondary"
                            : "ghost"
                        }
                        className="w-full justify-start p-2 h-auto"
                        onClick={() => handleChatClick(group.id, "group")}
                      >
                        <div className="flex items-center w-full">
                          <div className="relative">
                            <Avatar className="h-10 w-10 border-0">
                              <AvatarImage
                                src={group.avatar || "/placeholder.svg"}
                                alt={group.name}
                              />
                              <AvatarFallback className="bg-secondary text-secondary-foreground">
                                {group.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-1 -right-1 bg-secondary text-xs text-secondary-foreground rounded-full h-4 w-4 flex items-center justify-center border border-[hsl(var(--sidebar-bg))]">
                              <Users className="h-2.5 w-2.5" />
                            </div>
                          </div>
                          <div className="ml-3 flex-1 overflow-hidden text-left">
                            <div className="flex justify-between items-center">
                              <span className="text-foreground font-medium">
                                {group.name}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {group.time}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground truncate">
                              {group.lastMessage}
                            </p>
                          </div>
                          {group.unread > 0 && (
                            <Badge className="ml-auto bg-primary hover:bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center p-0 text-xs">
                              {group.unread}
                            </Badge>
                          )}
                        </div>
                      </Button>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </TabsContent>
        </Tabs>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-[hsl(var(--sidebar-border))] mt-auto">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src="/placeholder.svg?height=40&width=40"
              alt="John Doe"
            />
            <AvatarFallback className="bg-secondary text-secondary-foreground">
              JD
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">John Doe</p>
            <p className="text-xs text-muted-foreground">Premium User</p>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-secondary"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[320px]">
              <SheetHeader>
                <SheetTitle>Profile</SheetTitle>
              </SheetHeader>
              <UserProfile />
            </SheetContent>
          </Sheet>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
