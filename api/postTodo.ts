import axios from "axios";

import { TodoItem } from "types";

const postTodo = async (title: string, body: string, image: string) => {
  try {
    const { data } = await axios.post<TodoItem>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/posts`,
      { id: Date.now().toString(), title, body, image },
    );
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Что-то пошло не так");
  }
};

export default postTodo;
