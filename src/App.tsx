import React from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PainPointsSection } from './components/PainPointsSection';
import { ProblemDeepDiveSection } from './components/ProblemDeepDiveSection';
import { SolutionStepsSection } from './components/SolutionStepsSection';
import { MassageZonesSection } from './components/MassageZonesSection';
import { Roller3DSection } from './components/Roller3DSection';
import { BackMassageSection } from './components/BackMassageSection';
import { HeatAndVibrationSection } from './components/HeatAndVibrationSection';
import { InteractiveRemoteSection } from './components/InteractiveRemoteSection';
import { ExperienceTimelineSection } from './components/ExperienceTimelineSection';
import { LifestyleSection } from './components/LifestyleSection';
import { DesignFeaturesSection } from './components/DesignFeaturesSection';
import { ReviewsAndFaqSection } from './components/ReviewsAndFaqSection';
import { OrderSection } from './components/OrderSection';
import { Footer } from './components/Footer';
import { BottomStickyBar } from './components/BottomStickyBar';

export default function App() {
  return (
    <div className="min-h-screen bg-[#f7fafc] text-[#181c1e] flex flex-col selection:bg-[#ffdbd0] selection:text-[#aa3000]">
      {/* Top App Bar & Progress */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Section 01: Hero */}
        <HeroSection />

        {/* Section 02: Pain Points */}
        <PainPointsSection />

        {/* Section 03: Problem Deep Dive (5 Vùng cơ thể) */}
        <ProblemDeepDiveSection />

        {/* Section 04: Solution (4 Bước đặt đệm & thư giãn) */}
        <SolutionStepsSection />

        {/* Section 05: Massage Zones (Nhiều vùng massage) */}
        <MassageZonesSection />

        {/* Section 06: 3D Rollers (Con lăn 3D xoay đảo chiều) */}
        <Roller3DSection />

        {/* Section 07: Back Massage (Ray trượt ôm dọc sống lưng) */}
        <BackMassageSection />

        {/* Section 08, 09, 10: Heat, Vibration & 3 Intensities */}
        <HeatAndVibrationSection />

        {/* Section 11: Remote Control Simulator (Mọi chức năng trong tầm tay) */}
        <InteractiveRemoteSection />

        {/* Section 12: 15-Minute Experience (Liệu trình 15 phút) */}
        <ExperienceTimelineSection />

        {/* Section 13: Lifestyle (Tại nhà, Văn phòng, Trên xe hơi) */}
        <LifestyleSection />

        {/* Section 14, 15: Smart Design & Specifications */}
        <DesignFeaturesSection />

        {/* Section 16: Customer Reviews & FAQ */}
        <ReviewsAndFaqSection />

        {/* Section 17: Order & Checkout Form */}
        <OrderSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Sticky Bar & Floating Quick Hotline */}
      <BottomStickyBar />
    </div>
  );
}
