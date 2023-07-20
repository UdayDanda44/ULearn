import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideo } from "../actions/videoactions";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";

const TeacherVideos = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { videos } = useSelector((state) => state.video);
  useEffect(() => {
    dispatch(getVideo());
  }, [dispatch]);

  const filteredVideos = videos?.filter((video) => {
    return video.teacher === currentUser.user.username;
  });
  const handleDelete = async(videoId)=>{
   const {data} = await axios.delete(`http://minip-seven.vercel.app/api/auth/deletevideo/${videoId}`)
    dispatch(getVideo())
    alert(data.message)
  }
  return (
    <>
      {filteredVideos?.map((video) => {
        return (
          <div className="my-5 flex relative border-2 p-4 w-[686px] ml-7 rounded hover:rounded-xl">
            <iframe
              title={video.title}
              width="640"
              height="360"
              src={`${video.url}`}
              allowFullScreen
            ></iframe>
            <AiFillDelete className="absolute right-10 top-6 cursor-pointer" onClick={()=>handleDelete(video._id)} style={{fontSize:"24px"}}></AiFillDelete>
          </div>
        );
      })}
    </>
  );
};

export default TeacherVideos;
