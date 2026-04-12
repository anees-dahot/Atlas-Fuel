import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { FeatureBoxesSection } from "@/components/feature-boxes-section";
import { WhatWeDoSection } from "@/components/what-we-do-section";
import { VisionSection } from "@/components/vision-section";
import { CommunitySection } from "@/components/community-section";
import { AboutSection } from "@/components/about-section";
import { CertificationsSection } from "@/components/certifications-section";
import { RetailSection } from "@/components/retail-section";
import { PeopleSection } from "@/components/people-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FeatureBoxesSection />
      <WhatWeDoSection />
      <VisionSection />
      <CommunitySection />
      <AboutSection />
      <CertificationsSection />
      <RetailSection />
      <PeopleSection />
      <Footer />
    </main>
  );
}
