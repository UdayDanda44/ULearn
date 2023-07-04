import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadvideo } from "../actions/videoactions";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Teacher = () => {
  const dispatch = useDispatch();
  const [teacher, setteacher] = useState();
  const [tutorial, setTutorial] = useState({
    title: "",
    description: "",
    url: "",
  });
  const { video } = useSelector((state) => state.video);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      uploadvideo({
        title: tutorial.title,
        description: tutorial.description,
        url: tutorial.url,
        teacher: teacher,
      })
      
    );
    if(video.success){
      toast.success('Video Uploaded Successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
        });
    }

   
  };

  const getuser = async () => {
    const config = {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    };
    const { data } = await axios.get(
      "http://localhost:5000/api/auth/getuser",
      config
    );
    setteacher(data.username);
  };

  const onchange = (e) => {
    setTutorial({ ...tutorial, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    return () => {
      getuser();
      if (video?.success) {
        setTutorial({ title: "", description: "", url: "" });
        
      }
    };
  }, [video]);

  return (
    <>
      <div className="bg-teacher_bg text-white font-mono">
        <form
          className="flex flex-col items-center justify-center h-[100vh]"
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label for="title" className="text-xl">
              Title
            </label>
            <br />
            <input
              type="text"
              className="border-2 rounded hover:rounded-xl my-2 w-80 h-9 p-1 transition duration-[10000] text-black"
              name="title"
              value={tutorial.title}
              onChange={onchange}
            />
          </div>
          <div className="mb-3">
            <label for="description" className="text-xl">
              Description
            </label>
            <br />
            <input
              type="text"
              className="border-2 rounded hover:rounded-xl my-2 w-80 h-9 p-1 transition duration-[10000] text-black"
              name="description"
              value={tutorial.description}
              onChange={onchange}
            />
          </div>
          <div className="mb-3">
            <label for="url" className="text-xl">
              Url
            </label>
            <br />
            <input
              type="text"
              className="border-2 rounded hover:rounded-xl my-2 w-80 h-9 p-1 transition duration-[10000] text-black"
              name="url"
              value={tutorial.url}
              onChange={onchange}
            />
          </div>
          <button
            type="submit"
            className="my-3 text-black-50 bg-white-700 rounded py-1 px-3 hover:shadow-lg hover:shadow-black text-lg"
          >
            Upload a video
          </button>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false} 
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </form>
      </div>
      
   </> 
  );
};

export default Teacher;
