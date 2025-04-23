"use client";

import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground mb-8">
            Choose the plan that works best for you, with no hidden fees or
            complicated tiers.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span
              className={`text-sm ${
                !isAnnual
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-7 bg-secondary rounded-full p-1 transition-colors duration-300"
            >
              <span
                className={`absolute top-1 left-1 bg-primary w-5 h-5 rounded-full transition-transform duration-300 ${
                  isAnnual ? "translate-x-7" : ""
                }`}
              ></span>
            </button>
            <span
              className={`text-sm ${
                isAnnual
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              }`}
            >
              Annual <span className="text-primary">(-20%)</span>
            </span>
          </div>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {/* Free Plan */}
          <div
            className={`bg-card border-border rounded-xl overflow-hidden transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <p className="text-muted-foreground mb-6">
                Perfect for casual users
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/forever</span>
              </div>
              <Button className="w-full bg-secondary hover:bg-secondary/80 text-foreground">
                Get Started
              </Button>
            </div>
            <div className="border-t border-border p-8">
              <ul className="space-y-4">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Real-time text messaging</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Edit and delete messages</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Auto-delete messages when offline</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Online/offline indicators</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>20 minutes daily audio/video calls</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-500">Screen sharing</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-500">File sharing</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-500">AI chat assistant</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Premium Plan */}
          <div
            className={`bg-card border-border rounded-xl overflow-hidden relative transition-all duration-700 delay-300 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="absolute top-0 right-0 bg-primary text-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
              POPULAR
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-2">Premium</h3>
              <p className="text-muted-foreground mb-6">
                For power users and professionals
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold">
                  ${isAnnual ? "7.99" : "9.99"}
                </span>
                <span className="text-muted-foreground">
                  /{isAnnual ? "month" : "month"}
                </span>
                {isAnnual && (
                  <p className="text-sm text-primary mt-1">
                    Billed annually (${7.99 * 12})
                  </p>
                )}
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-foreground">
                Upgrade Now
              </Button>
            </div>
            <div className="border-t border-border p-8">
              <ul className="space-y-4">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Everything in Free plan</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Blue tick verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Custom auto-delete timers per chat</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Unlimited high-quality audio/video calls</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Screen sharing for meetings & collaboration</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>File sharing up to 50MB</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>AI chat assistant (Bangla & English)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Priority support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
