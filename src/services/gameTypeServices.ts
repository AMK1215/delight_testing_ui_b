import { GameType } from "@/@types/gametype";
// import { ApiConfig } from "@/configs/apiConfig";
// import { apiService } from "@/utils/apiService";

const fetchGameType = async () => {
  try {
    // const { data } = await apiService.get(
    //   `${ApiConfig.baseUrl}/${ApiConfig.gameType}`
    // );
    const data = [
      {
        id: 2,
        name: "Slots",
        code: "1",
        img: "slots.png",
        status: 1,
        order: "2",
        img_url: "https://agdashboard.pro/assets/img/game_type/slots.png",
      },
      {
        id: 6,
        name: "LiveCasino",
        code: "5",
        img: "live_casino.png",
        status: 1,
        order: "6",
        img_url: "https://agdashboard.pro/assets/img/game_type/live_casino.png",
      },
    ] as GameType[];
    return data as GameType[];
  } catch (error) {
    throw error;
  }
};

export { fetchGameType };
