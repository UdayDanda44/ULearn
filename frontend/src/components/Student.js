import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideo } from "../actions/videoactions";
import ReactPlayer from 'react-player'

const Student = () => {
  const dispatch = useDispatch();
  const {videos} = useSelector(state=>state.video)
  useEffect(() => {
    dispatch(getVideo());
    console.log("hi")
  }, [dispatch])
  console.log(videos);
  return (
    <>
    {videos && videos.map((video)=>(
      <div>
      <div class="card" >
        <ReactPlayer url={video.url} />
        <div class="card-body">
          <h5 class="card-title">{video.title}</h5>
          <p class="card-text">
            {video.description}
          </p>
          <a href="#" class="btn btn-primary">
            {video.teacher}
          </a>
        </div>
      </div>
    </div>
    ))}
    </>
  );
};

export default Student;
