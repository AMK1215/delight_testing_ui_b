"use client";

// import { useQuery } from "@tanstack/react-query";
import TabsLayout from "../components/layout/TabsLayout";
import HomeLayout from "@/components/layout/HomeLayout";
// import { fetchGameProviders } from "@/services/gameProviderService";
// import { Card, CardContent } from "@/components/ui/card";

const HomePage = () => {
  // const { data, isLoading } = useQuery({
  //   queryKey: ["GET_GAME_PROVIDERS"],
  //   queryFn: fetchGameProviders,
  // });
  return (
    <HomeLayout>
      <TabsLayout>
        {/* <div className="space-y-5 px-5">
          <div className="space-y-3">
            <div>
              <div className="inline-flex flex-row space-x-3 bg-black w-auto">
                <div className="bg-active w-[5px]" />
                <div className="p-1 pr-3">
                  <span>Game Provider</span>
                </div>
              </div>
            </div>

            <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 w-full">
              {data?.map((gp, idx) => (
                <Card className="border-none bg-secondary" key={idx}>
                  <CardContent>
                    <div className="flex flex-col justify-center items-center">
                      <img
                        src={gp.imgUrl}
                        className="object-cover h-[40px] w-full"
                      />
                      <p>{gp.provider_name}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="inline-flex flex-row space-x-3 bg-black w-auto">
                <div className="bg-active w-[5px]" />
                <div className="p-1 pr-3">
                  <span>Game Provider</span>
                </div>
              </div>
            </div>

            <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 w-full">
              {data?.map((gp, idx) => (
                <Card className="border-none bg-secondary" key={idx}>
                  <CardContent>
                    <div className="flex flex-col justify-center items-center">
                      <img
                        src={gp.imgUrl}
                        className="object-cover h-[40px] w-full"
                      />
                      <p>{gp.provider_name}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div> */}
        <></>
      </TabsLayout>
    </HomeLayout>
  );
};

export default HomePage;
