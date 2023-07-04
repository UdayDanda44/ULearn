import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideo } from "../actions/videoactions";
import axios from "axios";

const Student = () => { 
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const [input, setInput] = useState({ comment: "" });
  const [commentdata, setCommentdata] = useState([]);
  const { videos } = useSelector((state) => state.video);
  // const [likes, setLikes] = useState({});

  useEffect(() => {
    dispatch(getVideo());
  }, [dispatch]);

  // useEffect(() => {
  //   setLikes(
  //     videos.reduce((acc, video) => {
  //       acc[video._id] = video.likesCount;
  //       return acc;
  //     }, {})
  //   );
  // }, [videos]);

  const onChange = (e) => {
    setInput({ [e.target.name]: e.target.value });
  };

  const getComments = async () => {
    const { data } = await axios.get("http://localhost:5000/api/auth/getcomments");
    setCommentdata(data);
  };

  useEffect(() => {
    getComments();
    getVideo();
  }, []);

  const handleLike = async (videoId) => {
    const response = await axios.post(`http://localhost:5000/api/auth/likevideo/${videoId}`, {
      user_id: currentUser.user._id,
    });

    // if (response.status === 200) {
    //   // Update the local likes count
    //   setLikes((prevLikes) => ({
    //     ...prevLikes,
    //     [videoId]: prevLikes[videoId] + 1,
    //   }));
    // }
  };

  const handleUnlike = async (videoId) => {
    const response = await axios.post(`http://localhost:5000/api/auth/unlikevideo/${videoId}`, {
      user_id: currentUser.user._id,
    });
    // if (response.status === 200) {
    //   // Update the local likes count
    //   setLikes((prevLikes) => ({
    //     ...prevLikes,
    //     [videoId]: prevLikes[videoId] - 1,
    //   }));
    // }
  };

  if (!videos || videos.length === 0) {
    return <div>Loading...</div>; // Add a loading state or message
  }
  
  const videoElements = videos.map((video) => {
    const onSubmit = async (e) => {
      e.preventDefault();
      await uploadComment();
      setInput({ comment: "" });
      getComments(); // Fetch comments after uploading a new comment
    };
    console.log(video?.likes.includes(currentUser._id));
    console.log(currentUser);
    
    const uploadComment = async () => {
      const data = {
        user_id: currentUser.user._id,
        comment: input.comment,
        video_id: video._id,
      };
      await axios.post("http://localhost:5000/api/auth/uploadcomment", data);
    };
    

    const filteredComments = commentdata.filter((comment) => comment.video_id === video._id);
    const urlid = video.url;
    var uid = urlid.split("/d/")[1].split("/")[0];

    return (
      <div className="flex justify-center flex-row" key={video.url}>
        <div className="my-5 border-2 p-4 rounded hover:rounded-xl">
          <iframe width="640" height="360" src={`https://drive.google.com/uc?export=view&id=${uid}`} allowFullScreen></iframe>
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

  return <div className="grid grid-cols-2">{videoElements}</div>;
};

export default Student;
