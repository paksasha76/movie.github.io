import { useState, FC, useContext } from "react";
import { useForm } from "react-hook-form";

import getPosts from "api/getPosts";
import postTodo from "api/postTodo";

import { AppContext } from "providers/context/app";
import { schemaTodoItem } from "types";

interface addFormValidate {
  title: string;
  description: string;
  image: string;
}

const admin = "Админ";
const advanced = "Продвинутый";

const AddTodoForm: FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const { user, setTodoItems } = useContext(AppContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<addFormValidate>({ mode: "onBlur" });

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setImage("");
  };

  const onSubmit = async () => {
    if (title.trim().length >= 4) {
      await postTodo(title, description, image);
      const updatedTodos = await getPosts();
      const axiosTodos = await schemaTodoItem.array().parseAsync(updatedTodos);
      setTodoItems(axiosTodos);
      resetForm();
    } else {
      alert("Название должно состоять минимум из 4 непробельных символов");
    }
  };

  return (
    <form
      className="mx-auto mt-10 w-[300px]  border-spacing-2  rounded-[10px] bg-white p-5 sm:w-[400px] sm:p-10 md:w-[500px]"
      onSubmit={
        user.role === admin || user.role === advanced
          ? handleSubmit(onSubmit)
          : (e) => {
              e.preventDefault();
              alert(
                "Чтобы добавлять посты нужно иметь минимум продвинутый уровень",
              );
            }
      }
    >
      <div className="relative flex">
        <h2 className="mb-4 ml-[40px] text-[15px] font-bold sm:ml-[50px] sm:text-[18px] md:text-[22px]">
          Добавьте свой фильм
        </h2>
        <div className="absolute bottom-[10px] bg-[url('https://img.freepik.com/premium-vector/art-illustration-hand-draw-sketch-symbol-icon-design-clip-board-movie-film_824268-913.jpg')] bg-contain bg-center bg-no-repeat sm:bottom-[15px] sm:right-[15px] sm:h-[35px] sm:w-[35px]  md:bottom-[10px] md:right-[55px] md:h-[60px] md:w-[50px] "></div>
      </div>
      <div className="border-2">
        <input
          {...register("title", {
            required: "Поле с названием должно быть заполнено",
            minLength: {
              value: 4,
              message: "Название должно состоять минимум из 4 символов",
            },
          })}
          className="w-full rounded border border-gray-300 px-3 py-2 text-black focus:bg-slate-300 focus:outline-none"
          placeholder="Введите название"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div className="border-2">
        <input
          {...register("description", {
            required: "Поле с описанием должно быть заполнено",
            maxLength: {
              value: 1024,
              message: "Максимальная длина описания 1024 символа",
            },
          })}
          className="w-full rounded border border-gray-300 px-3 py-2 text-black focus:bg-slate-300 focus:outline-none"
          placeholder="Введите описание"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </div>
      <div className="border-2">
        <input
          {...register("image", {
            required: "Необходима ссылка для картинки",
          })}
          type="url"
          className="w-full rounded border border-gray-300 px-3 py-2 text-black focus:bg-slate-300 focus:outline-none"
          placeholder="Введите ссылку на картинку"
          value={image}
          onChange={(e) => {
            setImage(e.target.value);
          }}
        />
      </div>
      <div className="text-red-500">
        {errors?.title && <p>{errors?.title?.message.toString() || "Error"}</p>}
      </div>
      <div className="text-red-500">
        {errors?.description && (
          <p>{errors?.description?.message.toString() || "Error"}</p>
        )}
      </div>
      <div className="text-red-500">
        {errors?.image && <p>{errors?.image?.message.toString() || "Error"}</p>}
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="mt-6 rounded bg-blue-400 px-10 py-2 text-[12px] text-white shadow-indigo-600 hover:bg-purple-500 sm:px-20 sm:text-[16px]"
        >
          Добавить
        </button>
      </div>
    </form>
  );
};

export default AddTodoForm;
