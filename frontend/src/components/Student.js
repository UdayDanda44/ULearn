import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideo } from "../actions/videoactions";
import axios from "axios";
import { Link } from "react-router-dom";

const Student = () => { 
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const [input, setInput] = useState({ comment: "" });
  const [commentdata, setCommentdata] = useState([]);
  const { videos } = useSelector((state) => state.video);

  useEffect(() => {
    dispatch(getVideo());
  }, [dispatch]);

  const onChange = (e) => {
    setInput({ [e.target.name]: e.target.value });
  };

  const getComments = async () => {
    const { data } = await axios.get("https://minip-seven.vercel.app/api/auth/getcomments");
    setCommentdata(data);
  };

  useEffect(() => {
    getComments();
    getVideo();
  }, []);

  const handleLike = async (videoId) => {
    const response = await axios.post(`https://minip-seven.vercel.app/api/auth/likevideo/${videoId}`, {
      user_id: currentUser.user._id,
    });

    if (response.status === 200) {
      dispatch(getVideo())
    }
  };

  const handleUnlike = async (videoId) => {
    const response = await axios.post(`https://minip-seven.vercel.app/api/auth/unlikevideo/${videoId}`, {
      user_id: currentUser.user._id,
    });
    if (response.status === 200) {
      dispatch(getVideo())
    }

  };

  if (!videos || videos.length === 0) {
    return <div><h1 className="text-6xl text-center">No videos</h1></div>;
  }
  
  const videoElements = videos.map((video) => {
    const onSubmit = async (e) => {
      e.preventDefault();
      await uploadComment();
      setInput({ comment: "" });
      getComments(); 
    };
    console.log(video?.likes.includes(currentUser._id));
    console.log(currentUser);
    
    const uploadComment = async () => {
      const data = {
        user_id: currentUser.user._id,
        comment: input.comment,
        video_id: video._id,
      };
      await axios.post("https://minip-seven.vercel.app/api/auth/uploadcomment", data);
      alert("comment uploaded")
    };
    

    const filteredComments = commentdata.filter((comment) => comment.video_id === video._id);
    const urlid = video.url.replace('http://','https://');
    return (
      
      <div className="flex justify-center flex-row" key={video.url}>
        
        <div className="my-5 border-2 p-4 rounded hover:rounded-xl">
          <iframe width="640" height="360" src={`${urlid}`} title={video.title} allowFullScreen></iframe>
          <div className="card-body">
            <h5 className="text-xl mb-1">{video.title}</h5>
            <p className="mb-3">{video.description}</p>
            <button className="bg-blue-700 rounded py-1 px-3 hover:shadow-lg hover:shadow-blue-300 text-white">
              {video.teacher}
            </button>
            <form onSubmit={onSubmit} className="my-2">
              <label>Comment</label>
              <input type="text" name="comment" onChange={onChange} className="border mx-1" />
              <button type="submit" className="bg-blue-600 text-white border rounded-lg px-3">
                Submit
              </button>
            </form>
            <h1>Comments:</h1>
            {filteredComments.map((comment) => (
              <div key={comment.user_id._id}>
                {comment.user_id.username}: {comment.comment}
              </div>
            ))}
            <div className="flex items-center">
              {video?.likes?.indexOf(currentUser?.user?._id) !== -1 ? (
                <button
                  onClick={() => handleUnlike(video._id)}
                  className="bg-red-600 text-white rounded px-3 py-1 mr-2"
                >
                  Unlike
                </button>
              ) : (
                <button
                  onClick={() => handleLike(video._id)}
                  className="bg-green-600 text-white rounded px-3 py-1 mr-2"
                >
                  Like
                </button>
              )}
              <p>Likes: {video.likesCount}</p>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return <><Link to = '/likedvideos' className="flex justify-center"><button className="bg-blue-600 rounded-lg p-1 my-2 mx-1 text-slate-200">LikedVideos</button></Link><div className="grid grid-cols-2">{videoElements}</div></>;
};

export default Student;
