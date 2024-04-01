import { FC, useContext, useState } from "react";

import { AppContext } from "providers/context/app";

const Profile: FC = () => {
  const { user } = useContext(AppContext);

  const [popupImage, setPopupImage] = useState<boolean>(false);

  const [avatarRef, setAvatarRef] = useState<string>("");

  const [defaultRef, setDefaultRef] = useState<string>(
    "https://img.myloview.ru/canvas-prints/avatar-icon-vector-male-person-symbol-circle-user-profile-avatar-sign-in-flat-color-glyph-pictogram-illustration-700-121123335.jpg",
  );

  const openPopupImage = () => {
    setPopupImage(true);
  };

  const closePopupImage = () => {
    setPopupImage(false);
  };

  const saveAvatar = () => {
    setDefaultRef(avatarRef);
  };

  return (
    <div className="mt-[20px] flex justify-center text-white">
      <div className="relative">
        <h2 className="mb-[15px] text-[18px] font-bold md:text-2xl">
          Мой профиль:
        </h2>
        <img
          className="mb-[10px] ml-[18px] w-[100px] rounded-[50%] md:ml-[35px] md:w-[120px] lg:ml-[30px]"
          src={defaultRef}
          alt="Аватар профиля"
        />
        <button
          onClick={openPopupImage}
          className={`absolute right-[15px] top-[45px] h-[15px] w-[15px] bg-[url("https://w7.pngwing.com/pngs/518/411/png-transparent-computer-icons-pencil-drawing-crayons-angle-pencil-black-thumbnail.png")] bg-contain bg-center bg-no-repeat md:right-[20px] md:top-[50px] md:h-[20px] md:w-[20px]`}
        ></button>
      </div>
      <div className="mt-[55px] lg:mt-[60px]">
        <p className="text-[15px] md:text-[18px]">Имя: {user.username}</p>
        <p className="text-[15px] md:text-[18px]">Роль: {user.role}</p>
        <p className="text-[15px] md:text-[18px]">Раса: Программист</p>
      </div>
      {popupImage && (
        <div className="fixed inset-0 mx-auto flex max-w-md items-center justify-center">
          <form
            className="max-w-[300px] rounded-lg bg-violet-400 p-6  shadow-lg  sm:max-w-[400px] md:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              closePopupImage();
              saveAvatar();
            }}
          >
            <h2 className="mb-4 font-bold text-white md:text-xl">
              Форма редактирования 🖊️
            </h2>
            <input
              type="url"
              required
              className="w-full rounded border border-gray-300 px-3 py-2 text-black focus:bg-blue-200 focus:outline-none"
              placeholder="Изменить аватар"
              value={avatarRef}
              onChange={(e) => {
                setAvatarRef(e.target.value);
              }}
            />
            <button
              className="mr-4 mt-4 rounded bg-blue-500 px-4 py-2 text-[12px] font-bold text-white hover:bg-green-700 sm:text-[16px]"
              type="submit"
            >
              Сохранить
            </button>
            <button
              onClick={closePopupImage}
              className="mt-4 rounded bg-black px-4 py-2 text-[12px] font-bold text-white hover:bg-red-700 sm:text-[16px]"
            >
              Закрыть
            </button>                               
          </form>                                    
        </div>                                  
      )}                              
    </div>                                                                                       
  );
};                                 
                                                                                                         
export default Profile;
