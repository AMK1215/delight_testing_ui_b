import TabsLayout from "../../../components/layout/TabsLayout";

export default function LiveCasinoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TabsLayout>{children}</TabsLayout>;
}
