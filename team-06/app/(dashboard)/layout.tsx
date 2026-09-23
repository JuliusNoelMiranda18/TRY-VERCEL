import { SideNav } from "@/components/side-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen bg-[#F1E4D1] text-[#162660] flex flex-row font-sans overflow-hidden">
      <SideNav />
      <main className="flex-1 h-full overflow-y-auto px-3 sm:px-6 py-4 flex flex-col">
        <div className="max-w-6xl w-full mx-auto my-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
