"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquareText, Shield, Zap } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setIsVisible(true);
    setMounted(true);
  }, []);
  if (!mounted) return null;

  const currentTheme = resolvedTheme ?? theme;

  const imageSrc =
    currentTheme === "dark" ? "/lead-image-dark.png" : "/lead-image.png";
  return (
    <section className="py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Hero Content */}
          <div
            className={`md:w-1/2 space-y-6 transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full">
              <span className="bg-primary h-2 w-2 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium">
                Secure. Private. Powerful.
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Connect Smarter with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">
                taptalk
              </span>
            </h1>
            <p className="text-lg text-muted-foreground md:pr-12">
              A feature-rich, locally hosted chat application designed with
              privacy and functionality in mind. Built for seamless
              communication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white"
              >
                <Link href="/sign-up">Get Started Free</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-secondary hover:text-foreground"
              >
                View Demo
              </Button>
            </div>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  100% Secure
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquareText className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Real-time Chat
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  AI Powered
                </span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div
            className={`md:w-1/2 transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/80 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
              <div className="relative bg-card border-border rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={imageSrc}
                  alt="taptalk App Interface"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
