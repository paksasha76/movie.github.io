import axios from "axios";

import { TodoItem } from "types";

export default async function getPostsById(id: string) {
  try {
    const { data } = await axios.get<TodoItem>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/posts/${id}`,
    );
    return data;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
}
