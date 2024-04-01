import { FC, useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import useAuth from "../hooks/useAuth";
import loginUser from "../api/loginUser";
import getUsers from "api/getUsers";

import { AppContext } from "providers/context/app";
import { UserItem, schemaUserItem } from "types";

interface loginFormValidate {
  username: string;
  password: string;
}

const LoginPage: FC = () => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setLogin, login } = useAuth();
  const router = useRouter();
  const { setUser } = useContext(AppContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<loginFormValidate>({ mode: "onBlur" });

  useEffect(() => {
    if (login) {
      router.push("/");
      const jsonProfile = localStorage.getItem("profile");
      setUser(JSON.parse(jsonProfile));
    }
  }, [login, router]);

  const getProfileData = () => {
    getUsers().then((res) => {
      const profile: UserItem[] = res.filter((elem: UserItem) => {
        const axiosUser = schemaUserItem.parse(elem);
        return axiosUser.username === name;
      });
      setUser(profile[0]);
      localStorage.setItem("profile", JSON.stringify(profile[0]));
    });
  };

  const onSubmit = () => {
    if (name.length < 4 || password.length < 8) {
      alert("Длина логина и паролей не соблюдены");
      return;
    } else {
      loginUser(name, password)
        .then((res) => {
          if (res) {
            alert("Пользователь найден!");
            setLogin(true);
            getProfileData();
            localStorage.setItem("isAuth", "true");
            router.push("/");
          } else {
            alert("Пользователь не найден! Попробуйте еще раз!");
          }
        })
        .catch((e) => alert(e));
    }
  };

  if (login) {
    return null;
  }
  return (
    <>
      <button
        onClick={() => {
          router.push("/registration");
        }}
        className="my-4 ml-[150px] mt-[50px] h-[40px] w-[130px] rounded bg-blue-400 px-2 py-1 text-[10px] text-white shadow-indigo-600 hover:bg-purple-500 sm:ml-[100px] sm:h-[46px] sm:w-[200px] sm:text-[18px]"
      >
        Зарегистрироваться
      </button>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mt-[50px] w-[280px] border-spacing-2 rounded-[20px] bg-white px-5 py-7 sm:mt-[100px] sm:w-[400px] sm:px-10 lg:w-[500px]"
      >
        <h2 className="mb-8 text-center font-bold sm:text-[24px] lg:text-[32px]">
          Авторизация
        </h2>
        <input
          {...register("username", {
            required: "Поле логина должно быть заполнено",
            minLength: {
              value: 4,
              message: "Логин должен состоять минимум из 4 символов",
            },
          })}
          value={name}
          onChange={(e) => {
            setName(e.target.value.trim());
          }}
          placeholder="Введите логин"
          className=" w-full rounded border border-gray-300 px-3 py-2 text-black focus:bg-slate-300 focus:outline-none sm:py-3"
        />
    <div className="text-red-500 mb-3">
          {errors?.username && (
            <p>{errors?.username?.message.toString() || "Error"}</p>
          )}
        </div>
        <input
          {...register("password", {
            required: "Поле пароля должно быть заполнено",
            minLength: {
              value: 8,
              message: "Пароль должен состоять минимум из  символов",
            },
          })}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value.trim());
          }}
          type="password"
          placeholder="Введите пароль"
          className="mt-2 w-full rounded border border-gray-300 px-3 py-2 text-black focus:bg-slate-300 focus:outline-none sm:py-3"
        />
      
        <div className="text-red-500">
          {errors?.password && (
            <p>{errors?.password?.message.toString() || "Error"}</p>
          )}
        </div>
        <div className="flex justify-center">
          <button
            className="my-4 mt-6 h-[40px] rounded bg-blue-400 px-6 py-1 text-white shadow-indigo-600 hover:bg-purple-500 sm:h-[46px] sm:w-[150px] sm:text-[13px] lg:w-[200px] lg:text-[18px]"
            type="submit"
          >
            Войти в систему
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
