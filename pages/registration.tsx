import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import addUser from "api/addUser";
import getUsers from "api/getUsers";

import { RoleUser, UserItem, schemaUserItem } from "types";

const roles = ["Базовый", "Продвинутый", "Админ"];
const length = 8;
const values =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@$%_";

interface registerFormValidate {
  username: string;
  password: string;
}

const Registration: FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<registerFormValidate>({ mode: "onBlur" });

  const [userName, setUserName] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [role, setRole] = useState<RoleUser>("Базовый");
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);

  const router = useRouter();

  const generatePassword = () => {
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * values.length);
      password += values[randomIndex];
    }
    setUserPassword(password);
  };

  const handleRegister = () => {
    getUsers().then((res: UserItem[]) => {
      const userExist = res.find((user: UserItem) => {
        const axiosUser = schemaUserItem.parse(user);
        return axiosUser.username === userName;
      });
      if (userExist) {
        alert("Пользователь с таким именем уже существует");
      } else {
        addUser(userName, userPassword, role);
        alert("Вы успешно зарегистрировались!");
        router.push("/login");
      }
    });
  };

  return (
    <form
      className="mx-auto mt-[200px] w-[300px] border-spacing-2 rounded-[20px] bg-white px-10 py-7 sm:w-[400px] lg:w-[500px] "
      onSubmit={handleSubmit(handleRegister)}
    >
      <h2 className="mb-8 text-center font-bold sm:text-[24px] lg:text-[32px]">
        Регистрация
      </h2>
      <input
        {...register("username", {
          required: "Поле логина должно быть заполнено",
          minLength: {
            value: 4,
            message: "Логин должен состоять минимум из 4 символов",
          },
        })}
        placeholder="Придумайте логин"
        className="w-full rounded border border-gray-300 px-3 py-2 text-black focus:bg-slate-300 focus:outline-none sm:py-3"
        value={userName}
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
            <div className="text-red-500">
        {errors?.username && (
          <p>{errors?.username?.message.toString() || "Error"}</p>
        )}
      </div>
      <input
        {...register("password", {
          required: "Поле пароля должно быть заполнено",
          minLength: {
            value: 8,
            message: "Пароль должен состоять минимум из 8 символов",
          },
        })}
        type="password"
        placeholder="Придумайтe пароль"
        className="mt-2 w-full rounded border border-gray-300 px-3 py-2 text-black focus:bg-slate-300 focus:outline-none sm:py-3"
        value={userPassword}
        onChange={(e) => {
          setUserPassword(e.target.value);
        }}
      />
      <button
        type="button"
        className="w-[200px] bg-orange-300 text-[15px] text-black sm:text-[17px]"
        onClick={() => {
          generatePassword();
          setVisiblePassword(true);
        }}
      >
        Сгенерировать пароль
      </button>
      <div className="text-red-500">
        {errors?.password && (
          <p>{errors?.password?.message.toString() || "Error"}</p>
        )}
      </div>
      <div className="flex justify-center">
        <button
          className="my-4 mt-6 rounded bg-blue-400  px-4 py-1 text-[13px] text-white  shadow-indigo-600 hover:bg-purple-500 sm:h-[48px] sm:px-6 sm:text-[16px] lg:h-[56px] lg:w-[200px] lg:text-[18px]"
          type="submit"
        >
          Создать аккаунт
        </button>
      </div>
      <div className="flex">
        <div>
          <p className="text-[15px] font-bold sm:text-[18px]">
            Выберите роль:&nbsp;
          </p>
        </div>
        <select
          value={role}
          onChange={(e) => {
            setRole(e.target.value as RoleUser);
          }}
        >
          {roles.map((role, index) => {
            return (
              <option key={index} value={role}>
                {role}
              </option>
            );
          })}
        </select>
      </div>
      {visiblePassword ? <p>Ваш пароль: {userPassword}</p> : <p></p>}
    </form>
  );
};

export default Registration;
