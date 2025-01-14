import HomeLayout from "@/components/layout/HomeLayout";

export default function LiveCasinoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HomeLayout>
      {children}
    </HomeLayout>
  );
}
