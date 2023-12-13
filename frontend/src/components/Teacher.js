import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideo, uploadvideo } from "../actions/videoactions";
import axios from "axios";
import TeacherVideos from "./TeacherVideos";

const Teacher = () => {
  const dispatch = useDispatch();
  let fileInputRef = useRef();
  const [teacher, setteacher] = useState();
  const [tutorial, setTutorial] = useState({
    title: "",
    description: "",
    url: "",
  });
  const { video } = useSelector((state) => state.video);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById("Upload");
    const file = fileInput.files[0];
    if (!file) {
      alert("No file selected.");
      return;
    }
    const formData = new FormData();
    formData.append("title", tutorial.title);
    formData.append("description", tutorial.description);
    formData.append("teacher", teacher);
    formData.append("video", file);
    dispatch(uploadvideo(formData));
    dispatch(getVideo());
    setTutorial({ title: "", description: "", url: "" });
    fileInputRef.current.value = null;
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
      <div className="bg-teacher_bg text-white font-mono h-[100vh] pt-10">
        <form
          className="flex flex-col items-center justify-center "
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label htmlFor="title" className="text-xl">
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
            <label htmlFor="description" className="text-xl">
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
            <label htmlFor="video" className="text-xl">
              Upload Video
            </label>
            <br />
            <input type="file" id="Upload" name="video" ref={fileInputRef} />
          </div>
          <button
            type="submit"
            className="my-3 text-black-50 bg-white-700 rounded py-1 px-3 hover:shadow-lg hover:shadow-black text-lg"
          >
            Upload a video
          </button>
        </form>
        <div className="grid grid-cols-2">
          <TeacherVideos />
        </div>
      </div>
    </>
  );
};

export default Teacher;
