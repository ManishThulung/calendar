import { SidebarDemo } from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" max-w-[1440px] mx-auto">
      <div className="flex justify-start gap-6">
        <SidebarDemo />
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
