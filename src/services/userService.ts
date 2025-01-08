import { User } from "@/@types/user";

const getMe = () => {
  const data = {
    id: 2357,
    name: "Kaung Sett",
    user_name: "P27406977",
    phone: "099818645612",
    email: null,
    balance: "1.40",
    status: 1,
  } as User;

  return data as User;
};

export { getMe };
