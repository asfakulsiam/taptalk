"use client";

import { useState, useEffect } from "react";
import { Search, ArrowLeft, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { onlineUsers, groups } from "./chat-area-mock-data";

interface MobileSearchProps {
  onClose: () => void;
  onChatSelect: (id: number, type: "user" | "group") => void;
}

export function MobileSearch({ onClose, onChatSelect }: MobileSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "meeting notes",
    "project deadline",
    "Alex",
    "presentation",
  ]);

  // Focus the search input when component mounts
  useEffect(() => {
    const searchInput = document.getElementById("mobile-search-input");
    if (searchInput) {
      searchInput.focus();
    }
  }, []);

  // Filter users and groups based on search query
  const filteredUsers = searchQuery
    ? onlineUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filteredGroups = searchQuery
    ? groups.filter(
        (group) =>
          group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          group.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Combined results
  const searchResults = [
    ...filteredUsers.map((user) => ({ ...user, type: "user" as const })),
    ...filteredGroups.map((group) => ({ ...group, type: "group" as const })),
  ];

  const handleChatClick = (id: number, type: "user" | "group") => {
    // Add search query to recent searches if it's not empty
    if (searchQuery.trim()) {
      setRecentSearches((prev) => {
        const newSearches = [
          searchQuery,
          ...prev.filter((s) => s !== searchQuery),
        ];
        return newSearches.slice(0, 5); // Keep only the 5 most recent searches
      });
    }

    onChatSelect(id, type);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const removeRecentSearch = (search: string) => {
    setRecentSearches((prev) => prev.filter((s) => s !== search));
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Search header */}
      <div className="flex items-center gap-2 p-4 border-b border-border">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            id="mobile-search-input"
            placeholder="Search messages, people, groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 bg-card border-input w-full"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1">
        {/* Search results */}
        {searchQuery ? (
          <div className="p-4">
            {searchResults.length > 0 ? (
              <>
                <h3 className="text-sm font-medium text-foreground mb-2">
                  Search Results
                </h3>
                <div className="space-y-2">
                  {searchResults.map((result) => (
                    <div
                      key={`${result.type}-${result.id}`}
                      className="flex items-center p-3 rounded-lg hover:bg-secondary cursor-pointer"
                      onClick={() => handleChatClick(result.id, result.type)}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={result.avatar || "/placeholder.svg"}
                          alt={result.name}
                        />
                        <AvatarFallback>{result.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between">
                          <span className="font-medium">{result.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {result.time}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {result.type === "user"
                            ? result.lastMessage
                            : result.lastMessage}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No results found for "{searchQuery}"
                </p>
              </div>
            )}
          </div>
        ) : (
          // Recent searches
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-foreground">
                Recent Searches
              </h3>
              {recentSearches.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearRecentSearches}
                  className="text-muted-foreground h-8"
                >
                  Clear All
                </Button>
              )}
            </div>

            {recentSearches.length > 0 ? (
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary"
                  >
                    <div
                      className="flex items-center flex-1 cursor-pointer"
                      onClick={() => setSearchQuery(search)}
                    >
                      <Search className="h-4 w-4 text-muted-foreground mr-3" />
                      <span className="text-foreground">{search}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground"
                      onClick={() => removeRecentSearch(search)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-4 text-muted-foreground">
                No recent searches
              </p>
            )}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
