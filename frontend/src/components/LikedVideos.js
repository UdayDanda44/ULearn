import React, { useEffect } from "react";
import { getVideo } from "../actions/videoactions";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

const LikedVideos = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { videos } = useSelector((state) => state.video);
  const handleClick = () => {
    navigate("/");
  };
  const { currentUser } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getVideo());
  }, []);
  console.log(videos);
  return (
    <div className="bg-slate-300 ">
      <div className="flex flex-row justify-normal">
        <Link to="/">
          <IoIosArrowRoundBack
            className="my-10 content-start ml-10"
            style={{ fontSize: "40px", fontWeight: "bold" }}
            onClick={handleClick}
          />
        </Link>
        <h1 className="text-4xl text-center font-serif font-bold mb-4 ml-[35rem] text-emerald-700 pt-9 border-b-2 border-black pb-8 ">
          Liked Videos
        </h1>
      </div>
      <div className="grid grid-cols-2 bg-slate-300 h-[100vh]">
        {videos
          .filter((v) => {
            return v.likes.includes(currentUser.user._id);
          })
          .map((v) => {
            return (
              <div class="max-w-md mx-auto rounded-lg overflow-hidden shadow-2xl my-4 h-[75vh] w-[100vw] shadow-black border-2 p-4">
                <div class="relative h-[70vh] ">
                  <iframe
                    title={v.title}
                    width="640"
                    height="360"
                    src={`${v.url}`}
                    class="w-full h-full"
                  ></iframe>
                  <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent py-2 px-4">
                    <h5 class="text-xl mb-1 text-white">{v.title}</h5>
                    <p class="mb-3 text-white">{v.description}</p>
                    <button class="bg-blue-700 rounded py-1 px-3 hover:shadow-lg hover:shadow-blue-300 text-white">
                      {v.teacher}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default LikedVideos;
