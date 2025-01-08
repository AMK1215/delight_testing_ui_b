"use client";

import React, { useEffect, useState } from "react";

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  initialActiveIndex?: number;
  onTabChange?: (activeIndex: number) => void;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  initialActiveIndex = 0,
  onTabChange,
}) => {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    if (onTabChange) onTabChange(index);
  };

  useEffect(() => {
    if (initialActiveIndex >= 0 && initialActiveIndex < tabs.length) {
      setActiveIndex(initialActiveIndex);
    }
  }, [initialActiveIndex, tabs]);

  return (
    <div className="space-y-4">
      <div className="flex gap-4 text-green-400">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={`flex items-center gap-2 px-4 py-1 rounded-lg hover:shadow-lg hover:border hover:border-active ${
              activeIndex === index
                ? "bg-secondary"
                : "bg-transparent hover:bg-secondary"
            }`}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="rounded-lg shadow">
        {tabs[activeIndex]?.content}
      </div>
    </div>
  );
};

export default Tabs;
