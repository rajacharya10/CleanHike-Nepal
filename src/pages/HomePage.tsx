import { HeroSection } from '../components/sections/HeroSection';
import { AboutSection } from '../components/sections/AboutSection';
import { FeaturedHikesSection } from '../components/sections/FeaturedHikesSection';
import { DonationSection } from '../components/sections/DonationSection';
import { SponsorsSection } from '../components/sections/SponsorsSection';
import { GalleryPreviewSection } from '../components/sections/GalleryPreviewSection';
import { ContactSection } from '../components/sections/ContactSection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturedHikesSection />
      <DonationSection />
      <SponsorsSection />
      <GalleryPreviewSection />
      <ContactSection />
    </>
  );
}
