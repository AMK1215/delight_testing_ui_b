"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { fetchPromotions } from "@/services/promotionService";
import { useQuery } from "@tanstack/react-query";

const PromotionView = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["GET_PROMOTIONS"],
    queryFn: fetchPromotions,
  });

  return (
    <div className="p-5 space-y-5">
      {isLoading ? (
        <div className="space-y-5">
          <Skeleton className="w-full h-30 bg-secondary" />
          <Skeleton className="w-full h-30 bg-secondary" />
          <Skeleton className="w-full h-30 bg-secondary" />
          <Skeleton className="w-full h-30 bg-secondary" />
          <Skeleton className="w-full h-30 bg-secondary" />
        </div>
      ) : (
        data.map((p, idx) => (
          <div key={idx} className="w-full h-[300px]">
            <img src={p.img_url} className="h-full w-full object-cover" />
          </div>
        ))
      )}
    </div>
  );
};

export default PromotionView;
