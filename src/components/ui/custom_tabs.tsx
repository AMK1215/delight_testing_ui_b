"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface CustomTab {
  label: string;
  route: string;
}

interface TabsProps {
  tabs: CustomTab[];
  initialActiveIndex?: number;
  onTabChange?: (activeIndex: number) => void;
}

const CustomTabs: React.FC<TabsProps> = ({
  tabs,
  initialActiveIndex = 0,
  onTabChange,
}) => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    router.push(tabs[index].route);
    if (onTabChange) onTabChange(index);
  };

  useEffect(() => {
    const currentRoute = window.location.pathname;
    const tabIndex = tabs.findIndex((tab) => tab.route === currentRoute);
    if (tabIndex !== -1) {
      setActiveIndex(tabIndex);
    }
  }, [tabs]);

  return (
    <div>
      <div className="flex gap-4 p-4 text-green-400">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={`flex items-center gap-2 px-4 py-1 rounded-lg hover:shadow-lg ${
              activeIndex === index
                ? "bg-secondary"
                : "bg-transparent hover:bg-secondary"
            }`}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CustomTabs;
