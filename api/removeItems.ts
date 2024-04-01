import axios from "axios";

const removeItems = async (itemId: string) => {
  try {
    const { data } = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/posts/${itemId}`,
    );
    return data;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};

export default removeItems;
