import axios from "axios";

import { UserItem } from "types";

const loginUser = async (name: string, password: string) => {
  try {
    const { data } = await axios.get<UserItem[]>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/users`,
    );
    const user = data.find(
      (elem: UserItem) => name === elem.username && password === elem.password,
    );

    if (user) {
      return user;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Что-то пошло не так");
  }
};

export default loginUser;
