import axios from "axios";

import { inputValues } from "types";

const editPosts = async (itemId: string, updatedItem: inputValues) => {
  try {
    const { data } = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/posts/${itemId}`,
      updatedItem,
    );
    return data;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};

export default editPosts;
