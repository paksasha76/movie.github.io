import { useEffect, useState, FC, useContext } from "react";
import { useRouter } from "next/router";
import { Listbox } from "@headlessui/react";

import Todolist from "@/components/Todolist/Todolist";
import AddTodoForm from "@/components/AddForm/AddTodoForm";
import Header from "@/components/Header/Header";
import Profile from "./profile";

import { EditForm } from "@/components/EditForm/EditForm";
import { AuthContext } from "providers/context/auth";
import { TodoItem } from "types";
import { AppContext } from "providers/context/app";

const initialState: TodoItem = {
  id: null,
  title: "",
  body: "",
  userId: 1,
  image: "",
};

const options = [
  {
    value: "title",
    label: "По названию",
  },
  {
    value: "body",
    label: "По описанию",
  },
] as const;

const App: FC = () => {
  const router = useRouter();
  const { todoItems, loading } = useContext(AppContext);
  const [state, setState] = useState({
    searchMovie: "",
    selectedSort: "",
  });

  const { searchMovie, selectedSort } = state;

  const [items, setItems] = useState<TodoItem[]>([]);

  const [visibleForm, setVisibleForm] = useState<boolean>(false);

  const [todoItem, setTodoItem] = useState<TodoItem>(initialState);

  const { login, setLogin } = useContext(AuthContext);

  useEffect(() => {
    setItems(todoItems);
  }, [todoItems]);

  useEffect(() => {
    if (!login) {
      router.push("/login");
    }
  }, [login, router]);

  const closePopup = () => {
    setVisibleForm(false);
  };

  const getItem = (item: TodoItem) => {
    setTodoItem(item);
  };

  useEffect(() => {
    const _input =
      searchMovie !== ""
        ? todoItems.filter((x) =>
            x.title.toLowerCase().includes(searchMovie.toLowerCase()),
          )
        : todoItems;
    const _select =
      selectedSort !== ""
        ? [..._input].sort((a, b) => {
            return a[selectedSort].localeCompare(b[selectedSort]);
          })
        : _input;
    setItems(_select);
  }, [state]);

  const searchPosts = items.filter((post) =>
    post.title.toLowerCase().includes(searchMovie.toLowerCase()),
  );

  if (!login) {
    return <h1>Loading....</h1>;
  }

  return (
    <div
      className="lg:m-15 m-0 sm:m-10 md:m-12 xl:m-40"
      onClick={() => {
        visibleForm && closePopup();
      }}
    >
      <Header setLogin={setLogin} />

      <Profile />
      <h1 className="group my-10 text-center font-mono font-bold uppercase text-white text-[12px] sm:text-2xl md:text-[25px] lg:text-4xl">
        <span className="px-2 group-hover:bg-teal-500 group-hover:underline decoration-wavy">ВЕЛИКИЕ</span>
        &nbsp;ФИЛЬМЫ&nbsp;
        <span className="bg-orange-500 px-2 hover:bg-black">СОВРЕМЕННОГО</span>
        &nbsp;КИНЕМАТОГРАФА
      </h1>
      <input
        type="text"
        className="mx-auto block w-full max-w-lg rounded-lg border border-gray-300 bg-white px-4 py-2"
        placeholder="Поиск"
        value={searchMovie}
        onChange={(e) =>
          setState((prev) => ({ ...prev, searchMovie: e.target.value }))
        }
      ></input>
      <div className="mx-auto mt-[20px]">
        <Listbox
          value={selectedSort}
          onChange={(value) =>
            setState((prev) => ({ ...prev, selectedSort: value }))
          }
        >
          <Listbox.Button className="mx-auto flex h-8 md:h-12 w-46 md:w-64 items-center justify-between rounded-md border border-gray-300 bg-white px-8 py-2 text-[18px] md:text-2xl shadow-sm focus:ring focus:ring-gray-500">
            {options.find((option) => option.value === selectedSort)?.label}
            {selectedSort === "" && "Сортировка по ↓"}
          </Listbox.Button>
          <Listbox.Options className="mx-auto mt-2 max-h-60 w-40 md:w-64 cursor-pointer rounded-md border border-gray-300 bg-white shadow-lg">
            {options.map(({ value, label }) => (
              <Listbox.Option
                className="border-b-gray border-b-4 text-center text-[20px] hover:bg-stone-500"
                key={value}
                value={value}
              >
                {label}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>
      <AddTodoForm />
      {visibleForm && (
        <div className="fixed inset-0 mx-auto flex max-w-md items-center justify-center">
          <EditForm
            closePopup={closePopup}
            todoItem={todoItem}
            setTodoItem={setTodoItem}
          />
        </div>
      )}
      {loading && (
        <div role="status" className="mt-[30px] flex justify-center">
          <svg
            aria-hidden="true"
            className="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {searchPosts.length ? (
        <Todolist setVisible={setVisibleForm} getItem={getItem} items={items} />
      ) : (
        <div>
          <h1 className="mt-[50px] text-center text-white sm:mt-[30px] sm:text-xl lg:mt-[50px] lg:text-4xl xl:mt-[90px]">
            Фильмы не найдены
          </h1>                                                  
        </div>
      )}
    </div>
  );
};

export default App;
