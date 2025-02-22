import Image from 'next/image';
import ContactSection from '../components/about/Contact';
import MembersSection from '../components/about/Members';
import RoleSection from '../components/about/Role';
import VisionSection from '../components/about/Vision';

export default function About() {
  return (
    <main className="relative min-h-screen">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/icons/AboutBackGround.svg"
          alt="background"
          fill
          className="object-cover w-full h-full -z-10"
          priority
          sizes="100vw"
        />
      </div>
      <div className="relative">
        <RoleSection />
        <MembersSection />
        <VisionSection />
        <ContactSection />
      </div>
    </main>
  );
}
