export type History = {
  id: number;
  invoice?: string;
  account_name: string;
  account_number: string;
  created_at: string;
  updated_at: string;
  status: string; // pending | approve | reject
  amount: number;
  provider: string;
  type: string; // deposit | withdraw
};
