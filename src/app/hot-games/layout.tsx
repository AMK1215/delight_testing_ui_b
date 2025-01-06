import TabsLayout from "../../components/layout/TabsLayout";

export default function HotGamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TabsLayout>{children}</TabsLayout>;
}
