import Banners from "@/components/widgets/Banners";
import TabsLayout from "../components/layout/TabsLayout";
import FilterSideMenu from "@/components/navigation/FilterSideMenu";

const HomePage = () => {
  return (
    <TabsLayout >
      <FilterSideMenu/>
      <Banners/>
      <div>HOME PAGE</div>
    </TabsLayout>
  );
};

export default HomePage;
