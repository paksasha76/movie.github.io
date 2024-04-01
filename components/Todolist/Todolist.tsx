import Link from "next/link";
import { FC, useContext, useState } from "react";

import ConfirmForm from "../ConfirmForm/ConfirmForm";

import { TodoItem } from "types";
import { AppContext } from "providers/context/app";

interface TodoProps {
  setVisible: (visible: boolean) => void;
  getItem: (item: TodoItem) => void;
  items: TodoItem[];
}

const admin = "Админ";
const advanced = "Продвинутый";

const Todolist: FC<TodoProps> = ({ setVisible, getItem, items }) => {
  const { user } = useContext(AppContext);

  const [confirm, setConfirm] = useState<boolean>(false);

  const openConfirm = () => {
    setConfirm(true);
  };

  const closeConfirm = () => {
    setConfirm(false);
  };

  return (
    <ul className="text-white">
      {items.map((item, index) => {
        return (
          <li
            className="mx-auto my-8 w-[300px] border-4 border-yellow-400 bg-slate-700 p-8 sm:w-[350px] md:w-[450px]"
            key={item.id}
          >
            <h2 className="mb-2 text-center text-[12px] font-bold uppercase sm:text-[20px]">
              Топовый фильм №{index + 1}
            </h2>
            <p
              className="overflow-hidden text-ellipsis text-[15px] sm:text-[20px]"
              key={item.id}
            >
              Название: {item.title}
            </p>
            <p className="max-w-[600px] truncate text-[15px] sm:text-[20px]">
              Описание: {item.body}
            </p>
            <img
              src={item.image}
              alt="movie"
              className="mx-auto mt-[30px] h-[250px] w-[200px] object-fill sm:w-[250px] sm:object-contain md:h-[300px] md:w-[350px]"
            />
            <div className="flex justify-center gap-2">
              <button
                className="mt-4 rounded bg-purple-500 px-4 py-1 text-[12px] text-white shadow-lg hover:bg-red-500 hover:shadow-indigo-300 sm:px-2 sm:text-[15px] md:px-8"
                onClick={
                  user.role === admin
                    ? openConfirm
                    : (e) => {
                        e.preventDefault();
                        alert("Только админ может удалять посты");
                      }
                }
              >
                Удалить
              </button>
              <button
                className="mt-4 rounded bg-green-500 px-4 py-1 text-[12px] text-white shadow-lg hover:bg-red-500 hover:shadow-indigo-300 sm:px-2 sm:text-[15px]"
                onClick={
                  user.role === admin || user.role === advanced
                    ? () => {
                        setVisible(true);
                        getItem(item);
                      }
                    : (e) => {
                        e.preventDefault();
                        alert(
                          "Вы должны иметь минимум продвинутый уровень для редактирования постов",
                        );
                      }
                }
              >
                Редактировать
              </button>
              <Link
                href={`/posts/${item.id}`}
                className="mt-4 rounded bg-orange-500 px-2 py-1 text-[12px] text-white shadow-lg hover:bg-fuchsia-900 hover:shadow-indigo-300 sm:px-2 sm:text-[15px] md:px-4"
              >
                Подробнее
              </Link>
            </div>
            {confirm && <ConfirmForm item={item} closeConfirm={closeConfirm} />}
          </li>
        );
      })}
    </ul>
  );
};

export default Todolist;
