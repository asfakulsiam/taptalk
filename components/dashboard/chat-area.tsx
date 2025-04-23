"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  Phone,
  Video,
  Paperclip,
  Send,
  Smile,
  Bot,
  Clock,
  MoreVertical,
  ImageIcon,
  FileText,
  Mic,
  Check,
  X,
  Edit,
  Trash2,
  WifiOff,
  CalendarClock,
  Users,
  ArrowLeft,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  onlineUsers,
  groups,
  mockMessages,
  mariaMessages,
  projectAlphaMessages,
  aiSuggestions,
} from "./chat-area-mock-data";

type ChatAreaProps = {
  setIsChatActive?: (active: boolean) => void;
  isChatActive?: boolean;
  selectedChatId?: { id: number; type: "user" | "group" } | null;
};

export function ChatArea({
  setIsChatActive,
  isChatActive,
  selectedChatId,
}: ChatAreaProps) {
  console.log("ChatArea received selectedChatId:", selectedChatId);

  const [messageInput, setMessageInput] = useState("");
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const editInputRef = useRef<HTMLTextAreaElement>(null);
  const [messages, setMessages] = useState<any[]>([]);

  // Get the selected chat data
  const selectedChat = selectedChatId
    ? selectedChatId.type === "user"
      ? onlineUsers.find((user) => user.id === selectedChatId.id)
      : groups.find((group) => group.id === selectedChatId.id)
    : null;

  // Update messages when selected chat changes
  useEffect(() => {
    if (!selectedChatId) {
      setMessages([]);
      return;
    }

    let newMessages: any[] = [];
    if (selectedChatId.type === "user") {
      switch (selectedChatId.id) {
        case 1:
          newMessages = [...mockMessages]; // Alex Johnson
          break;
        case 2:
          newMessages = [...mariaMessages]; // Maria Garcia
          break;
        default:
          newMessages = []; // Other users (empty for demo)
      }
    } else if (selectedChatId.type === "group") {
      switch (selectedChatId.id) {
        case 1:
          newMessages = [...projectAlphaMessages]; // Project Alpha
          break;
        default:
          newMessages = []; // Other groups (empty for demo)
      }
    }

    setMessages(newMessages);
    console.log(
      "Updated messages for chat:",
      selectedChatId,
      "count:",
      newMessages.length
    );
  }, [selectedChatId]);

  // For demo purposes, we'll show the chat if there's a selected chat
  const hasActiveChat = !!selectedChat;

  // Handle edit message
  const handleEditMessage = (message: any) => {
    if (message.isMine) {
      setEditingMessageId(message.id);
      setEditText(message.content);
      setTimeout(() => {
        editInputRef.current?.focus();
      }, 50);
    }
  };

  // Handle save edit
  const handleSaveEdit = () => {
    if (editingMessageId !== null) {
      // In a real app, you would update the message in your backend
      console.log("Saving edited message:", editingMessageId, editText);

      // Update the message in the UI
      setMessages(
        messages.map((msg) => {
          if (msg.id === editingMessageId) {
            return { ...msg, content: editText };
          }
          return msg;
        })
      );

      setEditingMessageId(null);
    }
  };

  // Handle delete message
  const handleDeleteMessage = (
    messageId: number,
    deleteType: "now" | "offline" | "timed"
  ) => {
    // In a real app, you would delete or update the message in your backend
    console.log("Deleting message:", messageId, "with type:", deleteType);

    if (deleteType === "now") {
      // Remove from UI immediately
      setMessages(messages.filter((msg) => msg.id !== messageId));
    } else {
      // Mark for auto-deletion
      setMessages(
        messages.map((msg) => {
          if (msg.id === messageId) {
            return { ...msg, autoDeleteType: deleteType };
          }
          return msg;
        })
      );
    }
  };

  // Update parent component when chat state changes
  useEffect(() => {
    if (setIsChatActive) {
      setIsChatActive(hasActiveChat);
    }
  }, [hasActiveChat, setIsChatActive]);

  // Scroll to bottom when messages change or when selected chat changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedChatId]);

  // Simulate typing indicator
  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      setIsTyping(false);
    }, 3000);

    return () => clearTimeout(typingTimeout);
  }, [isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim()) {
      // In a real app, you would send the message to your backend
      console.log("Sending message:", messageInput, "to chat:", selectedChatId);

      // Add the message to the current chat
      const newMessage = {
        id: Date.now(),
        sender: "You",
        content: messageInput,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isMine: true,
        status: "sent",
      };

      setMessages([...messages, newMessage]);
      setMessageInput("");

      // Show AI suggestions after sending a message
      setShowAiSuggestions(true);
      // Hide suggestions after 5 seconds
      setTimeout(() => setShowAiSuggestions(false), 5000);

      // Simulate a reply after 2 seconds for demo purposes
      if (selectedChatId?.type === "user" && selectedChatId?.id === 1) {
        setTimeout(() => {
          setIsTyping(true);

          setTimeout(() => {
            setIsTyping(false);
            const replyMessage = {
              id: Date.now() + 1,
              sender: "Alex Johnson",
              content:
                "Thanks for the update! Let me know if you need any help.",
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              isMine: false,
              status: "read",
              isPremium: true,
            };
            setMessages((prevMessages) => [...prevMessages, replyMessage]);
          }, 3000);
        }, 2000);
      }
    }
  };

  const handleBackClick = () => {
    if (setIsChatActive) {
      setIsChatActive(false);
    }
  };

  const handleAiSuggestionClick = (suggestion: string) => {
    setMessageInput(suggestion);
    setShowAiSuggestions(false);
  };

  return (
    <div className="flex h-full flex-col bg-[hsl(var(--chat-bg))]">
      {hasActiveChat ? (
        <>
          {/* Chat header */}
          <div className="flex items-center border-b border-border p-4 h-[72px]">
            <Button
              variant="ghost"
              size="icon"
              className={`mr-2 text-foreground sm:hidden`}
              onClick={handleBackClick}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Avatar className="h-10 w-10 border-0">
              <AvatarImage
                src={
                  selectedChat?.avatar || "/placeholder.svg?height=40&width=40"
                }
                alt={selectedChat?.name || "Chat"}
              />
              <AvatarFallback className="bg-secondary text-secondary-foreground">
                {selectedChat?.name?.charAt(0) || "C"}
              </AvatarFallback>
            </Avatar>
            {/* Premium badge for users */}
            {selectedChatId?.type === "user" &&
              (selectedChat as any)?.isPremium && (
                <div className="absolute ml-[19%] mt-6 sm:ml-8">
                  <Badge className="h-4 w-4 rounded-full bg-primary flex items-center justify-center p-0 s">
                    <span className="text-[10px]">✓</span>
                  </Badge>
                </div>
              )}
            {/* Group indicator for groups */}
            {selectedChatId?.type === "group" && (
              <div className="absolute ml-8 mt-6">
                <Badge className="h-4 w-4 rounded-full bg-secondary flex items-center justify-center p-0">
                  <Users className="h-2.5 w-2.5" />
                </Badge>
              </div>
            )}
            <div className="ml-3 flex-1">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-foreground">
                  {selectedChat?.name}
                </h2>
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-secondary"
                        >
                          <Phone className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Audio Call</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-secondary"
                        >
                          <Video className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Video Call</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-secondary"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-card border-border text-card-foreground"
                    >
                      <DropdownMenuItem className="hover:bg-secondary focus:bg-secondary">
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-secondary focus:bg-secondary">
                        Search in Conversation
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-secondary focus:bg-secondary">
                        Mute Notifications
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-secondary focus:bg-secondary">
                        Block User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              {selectedChatId?.type === "user" ? (
                <div className="flex items-center gap-1">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      (selectedChat as any)?.status === "online"
                        ? "bg-[hsl(var(--status-online))]"
                        : "bg-[hsl(var(--status-offline))]"
                    }`}
                  ></span>
                  <p className="text-xs text-muted-foreground">
                    {(selectedChat as any)?.status === "online"
                      ? "Online"
                      : "Offline"}
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <p className="text-xs text-muted-foreground">
                    {(selectedChat as any)?.members} members
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Chat messages */}
          <ScrollArea className="flex-1 px-4 py-6">
            <div className="space-y-4 max-w-[800px] mx-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isMine ? "justify-end" : "justify-start"
                  }`}
                >
                  {!message.isMine && (
                    <Avatar className="h-8 w-8 mr-2 mt-1">
                      <AvatarImage
                        src="/placeholder.svg?height=32&width=32"
                        alt={message.sender}
                      />
                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                        {message.sender.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div className="max-w-[75%]">
                    {editingMessageId === message.id ? (
                      <div
                        className={`rounded-lg p-3 bg-card border border-primary`}
                      >
                        <textarea
                          ref={editInputRef}
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="w-full bg-transparent text-foreground outline-none resize-none"
                          rows={Math.max(1, editText.split("\n").length)}
                        />
                        <div className="mt-2 flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditingMessageId(null)}
                            className="h-7 px-2 text-muted-foreground hover:text-foreground hover:bg-secondary"
                          >
                            <X className="h-3 w-3 mr-1" />
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            onClick={handleSaveEdit}
                            className="h-7 px-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                          >
                            <Check className="h-3 w-3 mr-1" />
                            Save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={
                          message.isMine
                            ? "message-bubble-mine"
                            : "message-bubble-other"
                        }
                      >
                        <p className="whitespace-pre-line">{message.content}</p>
                        <div className="mt-1 flex items-center justify-end gap-1">
                          <p className="text-right text-xs opacity-70">
                            {message.time}
                          </p>
                          {message.isMine && (
                            <span className="text-xs opacity-70">
                              {message.status === "read" ? "✓✓" : "✓"}
                            </span>
                          )}
                          {message.autoDeleteType && (
                            <Tooltip>
                              <TooltipTrigger>
                                <Clock className="h-3 w-3 opacity-70" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs">
                                  {message.autoDeleteType === "offline"
                                    ? "Deletes when offline"
                                    : message.autoDeleteType === "timed"
                                    ? "Deletes in 3 days"
                                    : ""}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                      </div>
                    )}
                    {!editingMessageId && (
                      <div className="mt-1 flex justify-end gap-1 opacity-0 hover:opacity-100 transition-opacity">
                        {message.isMine && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-muted-foreground hover:text-foreground hover:bg-secondary"
                            onClick={() => handleEditMessage(message)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-muted-foreground hover:text-foreground hover:bg-secondary"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-56 bg-card border-border text-card-foreground"
                          >
                            <DropdownMenuItem
                              className="hover:bg-secondary focus:bg-secondary cursor-pointer"
                              onClick={() =>
                                handleDeleteMessage(message.id, "now")
                              }
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              <span>Delete Now</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="hover:bg-secondary focus:bg-secondary cursor-pointer"
                              onClick={() =>
                                handleDeleteMessage(message.id, "offline")
                              }
                            >
                              <WifiOff className="h-4 w-4 mr-2" />
                              <span>Auto Delete After Offline</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="hover:bg-secondary focus:bg-secondary cursor-pointer"
                              onClick={() =>
                                handleDeleteMessage(message.id, "timed")
                              }
                            >
                              <CalendarClock className="h-4 w-4 mr-2" />
                              <span>Auto Delete After 3 Days</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage
                      src={
                        selectedChat?.avatar ||
                        "/placeholder.svg?height=32&width=32"
                      }
                      alt={selectedChat?.name || "User"}
                    />
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      {selectedChat?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg bg-secondary p-3 text-secondary-foreground">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"></div>
                      <div
                        className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              {/* AI suggestions */}
              {showAiSuggestions && (
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Bot className="h-3 w-3" />
                    <span>AI Suggested Replies</span>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {aiSuggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="bg-card border-border text-muted-foreground hover:bg-secondary hover:text-foreground text-xs"
                        onClick={() => handleAiSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Message input */}
          <div className="border-t border-border p-4">
            <form
              onSubmit={handleSendMessage}
              className="space-y-2 max-w-[800px] mx-auto"
            >
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-foreground hover:bg-secondary"
                    >
                      <Paperclip className="h-5 w-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    side="top"
                    className="w-56 bg-card border-border text-card-foreground p-2"
                  >
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant="ghost"
                        className="flex flex-col items-center h-auto py-2 hover:bg-secondary"
                      >
                        <ImageIcon className="h-5 w-5 mb-1" />
                        <span className="text-xs">Image</span>
                      </Button>
                      <Button
                        variant="ghost"
                        className="flex flex-col items-center h-auto py-2 hover:bg-secondary"
                      >
                        <FileText className="h-5 w-5 mb-1" />
                        <span className="text-xs">Document</span>
                      </Button>
                      <Button
                        variant="ghost"
                        className="flex flex-col items-center h-auto py-2 hover:bg-secondary"
                      >
                        <Mic className="h-5 w-5 mb-1" />
                        <span className="text-xs">Audio</span>
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>

                <Input
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-card border-input text-card-foreground"
                />

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground hover:bg-secondary"
                >
                  <Smile className="h-5 w-5" />
                </Button>

                <Button
                  type="submit"
                  disabled={!messageInput.trim()}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Bot className="h-3 w-3" />
                  <span>AI Assistant is active</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>Auto-delete: 7 days</span>
                </div>
              </div>
            </form>
          </div>
        </>
      ) : (
        // Empty state when no chat is selected
        <div className="flex h-full flex-col items-center justify-center p-4 text-center">
          <div className="mb-4 rounded-full bg-secondary p-6">
            <MessageSquare className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="mb-2 text-xl font-semibold text-foreground">
            Select a chat to start messaging
          </h2>
          <p className="text-muted-foreground">
            Choose a contact or group from the sidebar to start a conversation
          </p>
          <div className="mt-8 flex flex-col items-center">
            <Badge className="mb-2 bg-primary text-primary-foreground">
              Premium Feature
            </Badge>
            <div className="flex items-center gap-2 bg-card p-3 rounded-lg">
              <Bot className="h-5 w-5 text-primary" />
              <p className="text-sm text-muted-foreground">
                AI Assistant is ready to help with your messages
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
