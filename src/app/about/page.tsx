import MembersSection from '../components/about/Members';
import RoleSection from '../components/about/Role';
import VisionSection from '../components/about/Vision';

export default function Home() {
  return (
    <main className="min-h-screen">
      <RoleSection />
      <MembersSection />
      <VisionSection />
    </main>
  );
}
