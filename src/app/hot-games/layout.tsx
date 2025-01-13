import HomeLayout from "@/components/layout/HomeLayout";

export default function HotGamesLayout({
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
