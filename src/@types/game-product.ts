import { GameProvider } from "./gameProvider";

export type GameProduct = {
  id: number;
  name: string;
  code: string;
  img: string;
  status: number;
  order: string;
  created_at?: string | null;
  updated_at?: string | null;
  img_url: string;
  products: GameProvider[];
};
