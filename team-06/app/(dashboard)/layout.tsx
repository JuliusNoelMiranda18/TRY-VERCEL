import { BottomNav } from "@/components/bottom-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-[100dvh] w-screen bg-[#F1E4D1] text-[#162660] flex flex-col font-sans overflow-hidden">
      <main className="flex-1 min-h-0 w-full overflow-y-auto px-3 sm:px-6 py-4 pb-24 flex flex-col">
        <div className="max-w-6xl w-full mx-auto">
          {children}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
