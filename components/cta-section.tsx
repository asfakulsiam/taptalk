"use client";

import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CtaSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-background">
      <div
        ref={ref}
        className={`container mx-auto px-4 max-w-5xl transition-all duration-1000 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl p-8 md:p-12 border border-primary/30 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary w-64 h-64 rounded-full blur-[120px] opacity-20"></div>
            <div className="absolute bottom-0 left-0 bg-primary/80 w-64 h-64 rounded-full blur-[120px] opacity-20"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Connect Smarter?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users who have already upgraded their
              communication experience with SmartConnect's powerful features and
              privacy-first approach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-secondary hover:text-foreground"
              >
                <Link href="/dashboard">Chat Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
