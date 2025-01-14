"use client";

import { useQuery } from "@tanstack/react-query";
import TabsLayout from "../components/layout/TabsLayout";
import HomeLayout from "@/components/layout/HomeLayout";
import { fetchGameProductsByGameType } from "@/services/gameService";
import { fetchGameType } from "@/services/gameTypeServices";
import { useEffect, useState } from "react";
import { GameProduct } from "@/@types/game-product";
import { useRouter } from "next/navigation";
import GameListSkeleton from "@/components/GameListSkeleton";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const HomePage = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [gameProducts, setGameProducts] = useState<GameProduct[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const { data: game_types, isLoading: isLoadingGameTypes } = useQuery({
    queryKey: ["GET_GAME_TYPES"],
    queryFn: fetchGameType,
  });

  const filteredGameProducts = gameProducts.map((game) => ({
    ...game,
    products: game.products?.filter((product) =>
      product.provider_name.toLowerCase().includes(searchValue.toLowerCase())
    ),
  }));

  useEffect(() => {
    const fetchGameProducts = async () => {
      if (game_types) {
        const allGameProducts = await Promise.all(
          game_types.map((t) => fetchGameProductsByGameType(t.id))
        );
        setGameProducts(allGameProducts.flat());
        setIsLoading(false);
      }
    };
    fetchGameProducts();
  }, [game_types, isLoadingGameTypes]);

  return (
    <HomeLayout>
      <TabsLayout
        searchValue={searchValue}
        onChangeInput={(v) => setSearchValue(v)}
      >
        <div className="space-y-5 px-5">
          {isLoading || isLoadingGameTypes ? (
            <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 w-full">
              <GameListSkeleton />
            </div>
          ) : (
            filteredGameProducts.map((g, idx) => (
              <div className="space-y-3 relative" key={idx}>
                <div>
                  <div className="inline-flex flex-row space-x-3 bg-black w-auto">
                    <div className="bg-active w-[5px]" />
                    <div className="p-1 pr-3">
                      <span>{g.name}</span>
                    </div>
                  </div>
                </div>
                {/* className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 w-full" */}
                   {g.products.length > 0 ? (
                    <>
                    <Carousel className="max-w-[100vw] lg:max-w-[80vw] ">
                    <CarouselContent>
                    { g.products?.map((gp, idx) => (
                      <CarouselItem
                        key={idx}
                        className="basis-1/3 sm:basis-1/4 md:basis-1/5 cursor-pointer"
                        onClick={() =>
                          router.push(`game-type/${g.id}?provider=${gp.id}`)
                        }
                      >
                        <div>
                          <img
                            src={gp.imgUrl}
                            alt={gp.provider_name}
                            className="object-contain w-full h-[200px] md:h-[230px] rounded-md"
                          />
                        </div>
                        <p className="text-sm text-center font-bold">
                          {gp.provider_name}
                        </p>
                      </CarouselItem>
                    ))}
                    </CarouselContent>
                    <div className="absolute -top-[15%] right-[15%] sm:right-[12%] md:right-[8%] ">
                    <CarouselPrevious className="!border-white !border-2" />
                    <CarouselNext className="-left-2 !border-white !border-2"  />
                    </div>
                    </Carousel>
                    </>
                  ) : (
                    <div className="text-sm text-gray-500">
                      No game available
                    </div>
                  )}
               </div>
            ))
          )}
        </div>
        <></>
      </TabsLayout>
    </HomeLayout>
  );
};

export default HomePage;
