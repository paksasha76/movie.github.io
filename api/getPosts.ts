import axios from "axios";

import { TodoItem } from "types";

const getPosts = async () => {
  try {
    const { data } = await axios.get<TodoItem[]>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/posts`,
    );
    return data;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};

export default getPosts;
