"use client";

import { useInView } from "react-intersection-observer";
import { Shield, Lock, Server, Eye } from "lucide-react";

export function SecuritySection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="security" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Security Image */}
          <div
            ref={ref}
            className={`md:w-1/2 transition-all duration-1000 ${
              inView ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
            }`}
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/80 rounded-2xl blur-xl opacity-30"></div>
              <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-2xl p-6">
                <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=800')] opacity-10 bg-center bg-cover"></div>
                <div className="relative z-10">
                  <Shield className="h-16 w-16 text-primary mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-center mb-6">
                    Security First Design
                  </h3>

                  <div className="space-y-6">
                    <div className="bg-background/60 border border-border rounded-lg p-4 flex items-start gap-4">
                      <Lock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium mb-1">Local Deployment</h4>
                        <p className="text-sm text-muted-foreground">
                          All data stays on your device or local network
                        </p>
                      </div>
                    </div>

                    <div className="bg-background/60 border border-border rounded-lg p-4 flex items-start gap-4">
                      <Server className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium mb-1">
                          No External Servers
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Your conversations never leave your control
                        </p>
                      </div>
                    </div>

                    <div className="bg-background/60 border border-border rounded-lg p-4 flex items-start gap-4">
                      <Eye className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium mb-1">Privacy Focused</h4>
                        <p className="text-sm text-muted-foreground">
                          No data collection or monitoring of any kind
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Content */}
          <div
            className={`md:w-1/2 transition-all duration-1000 delay-300 ${
              inView ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">
                Security First
              </span>{" "}
              Approach
            </h2>
            <p className="text-muted-foreground mb-8">
              Taptalk is built from the ground up with security and privacy as
              core principles, not afterthoughts.
            </p>

            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="text-xl font-semibold mb-2">
                  Fully Local Deployment
                </h3>
                <p className="text-muted-foreground">
                  All data stays on your device or local network, ensuring no
                  data leaves your control. This eliminates worries about data
                  leaks or privacy breaches.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h3 className="text-xl font-semibold mb-2">
                  No External Servers
                </h3>
                <p className="text-muted-foreground">
                  Unlike other chat applications, Taptalk doesn't route your
                  messages through external servers, giving you complete control
                  over your communications.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h3 className="text-xl font-semibold mb-2">
                  Auto-Delete Functionality
                </h3>
                <p className="text-muted-foreground">
                  Messages can be set to automatically delete, ensuring
                  sensitive information doesn't persist longer than needed.
                  Premium users get granular control over deletion timers.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h3 className="text-xl font-semibold mb-2">
                  Transparent Design
                </h3>
                <p className="text-muted-foreground">
                  We're open about how Taptalk works, giving you confidence that
                  your privacy is protected at every step of the communication
                  process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
