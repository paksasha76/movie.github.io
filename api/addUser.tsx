import axios from "axios";

const addUser = async (username: string, password: string, role: string) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/users`,
      { id: Date.now().toString(), username, password, role },
    );
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Что-то пошло не так");
  }
};

export default addUser;
