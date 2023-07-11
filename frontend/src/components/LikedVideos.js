import React, { useEffect } from "react";
import { getVideo } from "../actions/videoactions";
import { useDispatch, useSelector } from "react-redux";

const LikedVideos = () => {
  const dispatch = useDispatch();
  const { videos } = useSelector((state) => state.video);

  const { currentUser } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getVideo());
  }, []);
  console.log(videos);
  return (
    <div className="grid grid-cols-2 ">
      {videos
        .filter((v) => {
          return v.likes.includes(currentUser.user._id);
        })
        .map((v) => {
          const url = v.url.split("/d/")[1].split("/")[0];
          return (
            <div class="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg my-4 h-[70vh] w-[100vw]">
              <div class="relative h-[70vh]">
                <iframe
                  width="640"
                  height="360"
                  src={`https://drive.google.com/uc?export=view&id=${url}`}
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
  );
};

export default LikedVideos;
