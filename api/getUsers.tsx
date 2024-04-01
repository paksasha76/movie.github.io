import axios from "axios";

const getUsers = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/users`,
    );
    return data;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};

export default getUsers;
