import Link from "next/link";
import { useState, useEffect, FC } from "react";
import { useRouter } from "next/router";

import getPostsById from "api/getPostsById";

import { TodoItem } from "types";

const ItemPage: FC = () => {
  const [post, setPost] = useState<TodoItem | undefined>();

  const { query } = useRouter();

  useEffect(() => {
    if ("id" in query && typeof query.id === "string") {
      getPostsById(query.id).then((res) => {
        setPost(res);
      });
    }
  }, [query]);

  if (!post) {
    return <h1>Loading ...</h1>;
  }

  return (
    <>
      <div className="relative h-screen">
        <div className="relative mx-auto flex h-full flex-col rounded-[20px] bg-emerald-950 p-8 shadow-lg sm:my-12  sm:max-h-[680px] sm:w-[500px] lg:max-h-[800px] lg:w-[800px]">
          <h2 className="text-center text-[25px] font-bold text-white sm:mb-4 lg:text-[40px]">
            Все о фильме
          </h2>
          <p className="mb-[20px] overflow-hidden text-ellipsis text-white md:text-[18px]">
            {post.body}
          </p>
          <div className="relative mx-auto w-full flex-1 bg-white sm:max-w-[250px] lg:max-w-[400px]">
            <img
              src={post.image}
              alt="Картинка фильма"
              className="absolute h-full w-full object-cover shadow-2xl duration-300 hover:scale-105 hover:shadow-amber-300"
            />
          </div>
          <Link
            className="bottom-[30px] right-[30px] ml-auto mt-4 w-fit rounded bg-black px-6 text-[18px] font-bold text-white hover:bg-red-700 sm:px-12 sm:py-2 sm:text-[20px]"
            href="/"
          >
            Назад
          </Link>
        </div>
      </div>
    </>
  );
};

export default ItemPage;
