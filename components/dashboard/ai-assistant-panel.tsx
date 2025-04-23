"use client"

import { useState } from "react"
import { Bot, Settings, X, MessageSquare, Clock, Zap, Shield, RefreshCw, Ban } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

export function AiAssistantPanel() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating button to open AI panel */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 right-4 h-12 w-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
        >
          <Bot className="h-6 w-6" />
        </Button>
      )}

      {/* AI Assistant Panel */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-80 bg-card border-border rounded-lg shadow-xl overflow-hidden z-50">
          <div className="flex items-center justify-between bg-background p-3 border-b border-border">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <h3 className="font-medium">AI Assistant</h3>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-secondary"
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-secondary"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Tabs defaultValue="settings">
            <TabsList className="w-full bg-background p-0 border-b border-border">
              <TabsTrigger
                value="settings"
                className="flex-1 rounded-none data-[state=active]:bg-card data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground py-2"
              >
                Settings
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className="flex-1 rounded-none data-[state=active]:bg-card data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground py-2"
              >
                Activity
              </TabsTrigger>
            </TabsList>

            <TabsContent value="settings" className="m-0">
              <ScrollArea className="h-80 p-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-primary" />
                        <Label htmlFor="auto-reply" className="text-sm font-medium">
                          Auto Reply
                        </Label>
                      </div>
                      <Switch id="auto-reply" defaultChecked />
                    </div>
                    <p className="text-xs text-muted-foreground pl-6">
                      AI will respond to messages when you're offline
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <Label htmlFor="smart-suggestions" className="text-sm font-medium">
                          Smart Suggestions
                        </Label>
                      </div>
                      <Switch id="smart-suggestions" defaultChecked />
                    </div>
                    <p className="text-xs text-muted-foreground pl-6">Show AI-generated reply suggestions</p>
                  </div>

                  <Separator className="bg-border" />

                  <div>
                    <h4 className="text-sm font-medium mb-2">AI Personality</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-primary border-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                      >
                        Professional
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-transparent border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
                      >
                        Friendly
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-transparent border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
                      >
                        Concise
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-transparent border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
                      >
                        Detailed
                      </Button>
                    </div>
                  </div>

                  <Separator className="bg-border" />

                  <div>
                    <h4 className="text-sm font-medium mb-2">AI Tone</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input type="radio" id="formal" name="ai-tone" className="text-primary" defaultChecked />
                        <label htmlFor="formal" className="text-sm">
                          Formal
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="radio" id="casual" name="ai-tone" className="text-primary" />
                        <label htmlFor="casual" className="text-sm">
                          Casual
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="radio" id="technical" name="ai-tone" className="text-primary" />
                        <label htmlFor="technical" className="text-sm">
                          Technical
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="radio" id="creative" name="ai-tone" className="text-primary" />
                        <label htmlFor="creative" className="text-sm">
                          Creative
                        </label>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-border" />

                  <div>
                    <h4 className="text-sm font-medium mb-2">Languages</h4>
                    <div className="space-y-2 pl-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="english" className="text-sm">
                          English
                        </Label>
                        <Switch id="english" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="bangla" className="text-sm">
                          Bangla
                        </Label>
                        <Switch id="bangla" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-border" />

                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full border-border text-muted-foreground hover:bg-secondary hover:text-foreground flex items-center gap-2"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Reset AI Session
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-border text-muted-foreground hover:bg-secondary hover:text-foreground flex items-center gap-2"
                    >
                      <Ban className="h-4 w-4" />
                      Disable AI Replies
                    </Button>
                  </div>

                  <Separator className="bg-border" />

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      <h4 className="text-sm font-medium">Privacy</h4>
                    </div>
                    <p className="text-xs text-muted-foreground pl-6">
                      All AI processing happens locally on your device. Your messages are never sent to external
                      servers.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      <h4 className="text-sm font-medium">Premium Feature</h4>
                    </div>
                    <p className="text-xs text-muted-foreground pl-6">
                      AI Assistant is available exclusively for Premium users.
                    </p>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="activity" className="m-0">
              <ScrollArea className="h-80 p-4">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Recent Activity</h4>

                  <div className="space-y-3">
                    {[1, 2, 3].map((id) => (
                      <div key={id} className="bg-background p-3 rounded-lg border-border">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-medium">Chat with Alex Johnson</span>
                          <span className="text-xs text-muted-foreground">Today, 10:45 AM</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          AI Assistant replied to a message while you were offline.
                        </p>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
                  >
                    View All Activity
                  </Button>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </>
  )
}
