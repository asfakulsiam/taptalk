"use client";

import { useState } from "react";
import { Plus, Bell, Settings, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { onlineUsers, groups } from "./chat-area-mock-data";
import { Input } from "../ui/input copy";
interface MobileMessageListProps {
  onChatSelect: (id: number, type: "user" | "group") => void;
}

export function MobileMessageList({ onChatSelect }: MobileMessageListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredUsers = onlineUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Combined and sorted by time (most recent first)
  const allChats = [
    ...filteredUsers.map((user) => ({
      ...user,
      type: "user" as const,
    })),
    ...filteredGroups.map((group) => ({
      ...group,
      type: "group" as const,
    })),
  ].sort((a, b) => {
    // Convert time strings to comparable values (this is simplified)
    const timeA =
      a.time.includes("AM") || a.time.includes("PM")
        ? 3
        : a.time === "Yesterday"
        ? 2
        : 1;
    const timeB =
      b.time.includes("AM") || b.time.includes("PM")
        ? 3
        : b.time === "Yesterday"
        ? 2
        : 1;
    return timeB - timeA;
  });

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h1 className="text-xl font-bold">TapTalk</h1>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-input"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        defaultValue="all"
        className="flex-1 flex flex-col"
        onValueChange={setActiveTab}
      >
        <div className="px-4">
          <TabsList className="grid w-full grid-cols-3 bg-card">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="chats">Chats</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent
          value="all"
          className="flex-1 overflow-y-auto p-4 pt-2 space-y-2"
        >
          {allChats.map((chat) => (
            <div
              key={`${chat.type}-${chat.id}`}
              className="flex items-center p-3 rounded-lg hover:bg-secondary cursor-pointer"
              onClick={() => onChatSelect(chat.id, chat.type)}
            >
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={chat.avatar || "/placeholder.svg"}
                    alt={chat.name}
                  />
                  <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                </Avatar>

                {chat.type === "user" && (
                  <>
                    <span
                      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${
                        chat.status === "online"
                          ? "bg-[hsl(var(--status-online))]"
                          : "bg-[hsl(var(--status-offline))]"
                      } ring-2 ring-background`}
                    ></span>
                    {chat.isPremium && (
                      <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                        ✓
                      </span>
                    )}
                  </>
                )}
              </div>

              <div className="ml-3 flex-1 overflow-hidden">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{chat.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {chat.time}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {chat.type === "user" ? chat.lastMessage : chat.lastMessage}
                </p>
              </div>

              {chat.unread > 0 && (
                <Badge className="ml-2 bg-primary hover:bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {chat.unread}
                </Badge>
              )}
            </div>
          ))}
        </TabsContent>

        <TabsContent
          value="chats"
          className="flex-1 overflow-y-auto p-4 pt-2 space-y-2"
        >
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center p-3 rounded-lg hover:bg-secondary cursor-pointer"
              onClick={() => onChatSelect(user.id, "user")}
            >
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.name}
                  />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span
                  className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${
                    user.status === "online"
                      ? "bg-[hsl(var(--status-online))]"
                      : "bg-[hsl(var(--status-offline))]"
                  } ring-2 ring-background`}
                ></span>
                {user.isPremium && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                    ✓
                  </span>
                )}
              </div>

              <div className="ml-3 flex-1 overflow-hidden">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {user.time}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {user.lastMessage}
                </p>
              </div>

              {user.unread > 0 && (
                <Badge className="ml-2 bg-primary hover:bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {user.unread}
                </Badge>
              )}
            </div>
          ))}
        </TabsContent>

        <TabsContent
          value="groups"
          className="flex-1 overflow-y-auto p-4 pt-2 space-y-2"
        >
          {filteredGroups.map((group) => (
            <div
              key={group.id}
              className="flex items-center p-3 rounded-lg hover:bg-secondary cursor-pointer"
              onClick={() => onChatSelect(group.id, "group")}
            >
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={group.avatar || "/placeholder.svg"}
                  alt={group.name}
                />
                <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="ml-3 flex-1 overflow-hidden">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{group.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {group.time}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {group.lastMessage}
                </p>
              </div>

              {group.unread > 0 && (
                <Badge className="ml-2 bg-primary hover:bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {group.unread}
                </Badge>
              )}
            </div>
          ))}
        </TabsContent>
      </Tabs>

      {/* Floating action button */}
      <Button className="absolute bottom-20 right-4 h-14 w-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
}
