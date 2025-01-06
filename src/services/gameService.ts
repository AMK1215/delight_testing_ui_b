import { Game } from "@/@types/game";

const fetchAllGames = async ({
  page = 1,
  size = 10,
  game_type,
}: {
  game_type: number;
  page?: number;
  size?: number;
}) => {
  try {
    // const { data } = await apiService.get(
    //   `${ApiConfig.baseUrl}/`
    // );
    const data = [
      {
        id: 144,
        game_id: 513144,
        image_url:
          "https://gicon.sm-sspi-res.com/providers/pragmaticplay/thumbs_square/513144.png",
      },
      {
        id: 2392,
        game_id: 513516,
        image_url:
          "https://gicon.sm-sspi-res.com/providers/pragmaticplay/thumbs_square/513516.png",
      },
      {
        id: 2393,
        game_id: 513512,
        image_url:
          "https://gicon.sm-sspi-res.com/providers/pragmaticplay/thumbs_square/513512.png",
      },
      {
        id: 2394,
        game_id: 513513,

        image_url:
          "https://gicon.sm-sspi-res.com/providers/pragmaticplay/thumbs_square/513513.png",
      },
      {
        id: 2395,
        game_id: 513514,
        image_url:
          "https://gicon.sm-sspi-res.com/providers/pragmaticplay/thumbs_square/513514.png",
      },
      {
        id: 500,
        game_id: 514003,
        image_url:
          "https://gicon.sm-sspi-res.com/providers/pragmatic_live/thumbs_square/514003.png",
      },
      {
        id: 501,
        game_id: 514004,
        image_url:
          "https://gicon.sm-sspi-res.com/providers/pragmatic_live/thumbs_square/514004.png",
      },
      {
        id: 502,
        game_id: 514005,
        image_url:
          "https://gicon.sm-sspi-res.com/providers/pragmatic_live/thumbs_square/514005.png",
      },
      {
        id: 503,
        game_id: 514006,
        image_url:
          "https://gicon.sm-sspi-res.com/providers/pragmatic_live/thumbs_square/514006.png",
      },
      {
        id: 504,
        game_id: 514007,
        image_url:
          "https://gicon.sm-sspi-res.com/providers/pragmatic_live/thumbs_square/514007.png",
      },
      {
        id: 505,
        game_id: 514008,
        image_url:
          "https://gicon.sm-sspi-res.com/providers/pragmatic_live/thumbs_square/514008.png",
      },
      {
        id: 506,
        game_id: 514009,
        image_url:
          "https://gicon.sm-sspi-res.com/providers/pragmatic_live/thumbs_square/514009.png",
      },
      {
        id: 507,
        game_id: 514010,
        image_url:
          "https://gicon.sm-sspi-res.com/providers/pragmatic_live/thumbs_square/514010.png",
      },
      {
        id: 508,
        game_id: 514011,
        image_url:
          "https://gicon.sm-sspi-res.com/providers/pragmatic_live/thumbs_square/514011.png",
      },
    ] as Game[];

    return data as Game[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { fetchAllGames };
