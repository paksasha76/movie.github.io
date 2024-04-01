import { FC } from "react";

interface HeaderProps {
  setLogin: (login: boolean) => void;
}

const Header: FC<HeaderProps> = ({ setLogin }) => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-[20px]">
        <div className="hidden h-40 rounded-[30px] bg-[url('https://sky.pro/media/wp-content/webp-express/webp-images/uploads/2022/12/5.5.-10-filmov-motiviruyushhih-uchitsya.png.webp')] bg-contain bg-center bg-no-repeat sm:block sm:w-60 md:w-80 lg:w-[350px] xl:w-[250px]"></div>
        <div>
          <p className="ml-[20px] mt-[90px] font-bold text-green-400 sm:mt-[70px] sm:text-[13px] md:ml-[60px] md:text-[20px]  lg:ml-20 lg:mt-[60px] lg:text-[23px] xl:mt-5 xl:text-[27px]">
            Добавляйте новые фильмы или редактируйте уже существующие! 
          </p>
          <p className="ml-[20px] mt-5 font-bold  text-violet-500 sm:text-[13px] md:ml-[60px] md:text-[20px] lg:ml-20 lg:text-[23px] xl:text-[27px]">
            Все в ваших руках! Успехов!
          </p>
        </div>
      </div>
      <button
        className="absolute right-10 top-[10px] my-4 rounded bg-purple-500 px-2 py-2 text-[12px] text-white hover:bg-blue-300 hover:text-pink-950 sm:right-20 sm:px-5 sm:text-[20px] md:px-8 lg:top-[40px] lg:my-0 xl:top-[120px]"
        onClick={() => {
          setLogin(false);
          localStorage.removeItem("isAuth");
        }}
      >
        Выход → 🚪
      </button>
    </div>
  );
};

export default Header;
