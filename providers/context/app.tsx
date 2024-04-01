import React, { createContext, useEffect, useState } from "react";

import getPosts from "api/getPosts";

import { TodoItem, UserItem } from "types";

interface AppContextProps {
  todoItems: TodoItem[];
  setTodoItems: (value: TodoItem[]) => void;
  user: UserItem;
  setUser: (user: UserItem) => void;
  loading: boolean
}

const base = "Базовый";

export const AppContext = createContext<AppContextProps>({
  todoItems: [],
  setTodoItems: () => {},
  user: { username: "", id: String(Date.now()), password: "", role: base },
  setUser: () => {},
  loading: false,
});

interface AppContextProviderProps {
  children: React.ReactNode;
}

export default function AppContextProvider({
  children,
}: AppContextProviderProps) {
  const [loading, setLoading] = useState(false);
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const [user, setUser] = useState<UserItem>({
    username: "John Doe",
    id: String(Date.now()),
    password: "",
    role: base,
  });

  useEffect(() => {
    setLoading(true);
    getPosts()
      .then((res) => setTodoItems(res))
      .finally(() => setTimeout(() => setLoading(false), 2000));
  }, []);

  useEffect(() => {}, [loading]);

  return (
    <AppContext.Provider
      value={{ todoItems, setTodoItems, user, setUser, loading }}
    >
      {children}
    </AppContext.Provider>
  );
}
