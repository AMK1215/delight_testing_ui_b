export type GameProvider = {
  id: number;
  provider_code: string;
  provider_name: string;
  is_active: number;
  order: number;
  status: number;
  game_list_status: number;
  imgUrl: string;
  pivot: {
    game_type_id: number;
    product_id: number;
    image: string;
  };
};
