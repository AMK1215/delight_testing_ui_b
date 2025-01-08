import HomeLayout from "@/components/layout/HomeLayout";
import TabsLayout from "../../components/layout/TabsLayout";

export default function HotGamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HomeLayout>
      <TabsLayout>{children}</TabsLayout>
    </HomeLayout>
  );
}
