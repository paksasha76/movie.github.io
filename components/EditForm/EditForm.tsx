import {
  useState,
  ComponentPropsWithoutRef,
  FC,
  useContext,
  useEffect,
} from "react";
import { useForm } from "react-hook-form";

import editPosts from "api/editPosts";
import getPosts from "api/getPosts";

import { TodoItem, schemaTodoItem, inputValues } from "types";
import { AppContext } from "providers/context/app";

interface FormEditProps extends ComponentPropsWithoutRef<"form"> {
  closePopup: () => void;
  todoItem: TodoItem;
  setTodoItem: (todo: TodoItem) => void;
}

interface EditFormValidate {
  title: string;
  description: string;
  image: string;
}

export const EditForm: FC<FormEditProps> = ({
  closePopup,
  todoItem,
  setTodoItem,
}) => {
  const { setTodoItems } = useContext(AppContext);
  const [changePost, setChangePost] = useState<inputValues>({
    title: todoItem.title,
    body: todoItem.body,
    image: todoItem.image,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<EditFormValidate>({ mode: "onBlur" });

  const handleEditForm = () => {
    if (changePost.title.trim().length >= 4) {
      saveItem(todoItem);
      closePopup();
    } else {
      alert("Название должно состоять минимум из 4 непробельных символов");
    }
  };

  const closeByEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closePopup();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", closeByEscape);
    return () => {
      document.removeEventListener("keydown", closeByEscape);
    };
  }, []);

  const saveItem = async (item: TodoItem) => {
    item.title = changePost.title;
    item.body = changePost.body;
    item.image = changePost.image;

    const edited = await editPosts(item.id, {
      title: changePost.title,
      body: changePost.body,
      image: changePost.image,
    });
    const axiosTodo = await schemaTodoItem.parseAsync(edited);
    setTodoItem(axiosTodo);
    const getAll = await getPosts();
    const axiosTodos = await schemaTodoItem.array().parseAsync(getAll);
    setTodoItems(axiosTodos);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <form
        className="max-w-[300px] rounded-lg bg-gray-400 p-6 shadow-lg sm:max-w-[450px] md:p-8 "
        onSubmit={handleSubmit(handleEditForm)}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-center font-bold text-white md:text-xl">
          Форма редактирования 🖊️
        </h2>
        <input
          {...register("title", {
            required: "Поле с названием должно быть заполнено",
            minLength: {
              value: 4,
              message: "Название должно состоять минимум из 4 символов",
            },
          })}
          className="w-full rounded border border-gray-300 px-3 py-2 text-black focus:bg-blue-200 focus:outline-none"
          value={changePost.title}
          placeholder="Изменить название"
          onChange={(e) =>
            setChangePost({ ...changePost, title: e.target.value })
          }
        />
        <input
          {...register("description", {
            required: "Поле с описанием должно быть заполнено",
            maxLength: {
              value: 1024,
              message: "Максимальная длина описания 1024 символа",
            },
          })}
          className="w-full rounded border border-gray-300 px-3 py-2 text-black focus:bg-blue-200 focus:outline-none"
          value={changePost.body}
          placeholder="Изменить описание"
          onChange={(e) =>
            setChangePost({ ...changePost, body: e.target.value })
          }
        />
        <input
          {...register("image", {
            required: "Необходимо ввести ссылку для картинки",
          })}
          type="url"
          className="w-full rounded border border-gray-300 px-3 py-2 text-black focus:bg-blue-200 focus:outline-none"
          value={changePost.image}
          placeholder="Изменить картинку"
          onChange={(e) =>
            setChangePost({ ...changePost, image: e.target.value })
          }
        />
        <div className="text-yellow-300">
          {errors?.title && (
            <p>{errors?.title?.message.toString() || "Error"}</p>
          )}
        </div>
        <div className="text-yellow-300">
          {errors?.description && (
            <p>{errors?.description?.message.toString() || "Error"}</p>
          )}
        </div>
        <div className="text-yellow-300">
          {errors?.image && (
            <p>{errors?.image?.message.toString() || "Error"}</p>
          )}
        </div>
        <button
          className="mr-4 mt-4 rounded bg-blue-500 px-4 py-2 text-[12px] font-bold text-white hover:bg-green-700 sm:text-[16px]"
          type="submit"
        >
          Сохранить
        </button>
        <button
          className="mt-4 rounded bg-black px-4 py-2 text-[12px] font-bold text-white hover:bg-red-700 sm:text-[16px]"
          onClick={closePopup}
        >
          Закрыть
        </button>
      </form>
    </div>
  );
};
