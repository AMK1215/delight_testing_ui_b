import FilterSideMenu from "../navigation/FilterSideMenu";
import Banners from "../widgets/Banners";

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <div>
      <FilterSideMenu />
      <div className="space-y-3">
        <Banners />
        {children}
      </div>
    </div>
  );
};

export default HomeLayout;
