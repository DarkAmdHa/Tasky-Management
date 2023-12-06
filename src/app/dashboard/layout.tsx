import SideNav from "@/app/ui/dashboard/SideNav";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen max-w-7xl m-auto">
      <SideNav />
      <div className="w-full bg-backgroundColor">{children}</div>
    </div>
  );
}
