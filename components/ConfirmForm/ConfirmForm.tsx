import { useContext, FC, ComponentPropsWithoutRef, useEffect } from "react";

import getPosts from "api/getPosts";
import removeItems from "api/removeItems";

import { AppContext } from "providers/context/app";
import { TodoItem, schemaTodoItem } from "types";

interface ConfirmProps extends ComponentPropsWithoutRef<"form"> {
  item: TodoItem;
  closeConfirm: () => void;
}

const ConfirmForm: FC<ConfirmProps> = ({ item, closeConfirm }) => {
  const { setTodoItems } = useContext(AppContext);

  const handleDeletePost = () => {
    removeItems(item.id).then(() => {
      getPosts().then((res) => {
        const axiosTodo = schemaTodoItem.array().parse(res);
        setTodoItems(axiosTodo);
      });
    });
    closeConfirm();
  };

  const closeByEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeConfirm();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", closeByEscape);
    return () => {
      document.removeEventListener("keydown", closeByEscape);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="rounded-lg bg-white p-4 py-4 shadow-md md:p-6 lg:p-10">
        <h2 className="mb-4 text-[12px] font-semibold text-black md:text-lg">
          Вы уверены, что хотите удалить пост?
        </h2>
        <div className="flex justify-center md:gap-[30px]">
          <button
            className="mr-2 rounded-md bg-red-500 px-8 py-2 text-[12px] text-white hover:bg-red-600 md:px-10 md:text-[18px]"
            onClick={handleDeletePost}
          >
            Да
          </button>
          <button
            className="rounded-md bg-gray-500 px-8 py-2 text-[12px] text-white hover:bg-gray-600 md:px-10 md:text-[18px]"
            onClick={closeConfirm}
          >
            Нет
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmForm;
