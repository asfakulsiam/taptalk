"use client";

import { useUser } from "@clerk/nextjs";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { PricingSection } from "@/components/pricing-section";
import { SecuritySection } from "@/components/security-section";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function LandingPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [year, setYear] = useState<number | null>(null);
  // Sync user data with the server when the component mounts
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, [isLoaded, isSignedIn]);

  // 👇 Always render something to avoid conditional hooks
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (isSignedIn) {
    // Redirect to dashboard if user is signed in
    window.location.href = "/dashboard";
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <Navbar />
      {/* Hero Section */}
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <SecuritySection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
