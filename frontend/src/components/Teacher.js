import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadvideo } from "../actions/videoactions";

const Teacher = () => {
  const dispatch = useDispatch();
  const [tutorial,setTutorial] = useState({title:"",description:"",url:"",teacher:"rith"});
  const handleSubmit = async(e)=>{
    e.preventDefault();
    dispatch(uploadvideo({title: tutorial.title,description: tutorial.description,url: tutorial.url,teacher:tutorial.teacher}))
    console.log(tutorial);
  }
  const onchange = (e)=>{
    setTutorial({...tutorial,[e.target.name]:e.target.value});
    console.log(e.target.value,e.target.name,"hi")
  }
  return (
    <div>
      <form class = 'mx-5' onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="title" class="form-label">
            Title
          </label>
          <input
            type="text"
            class="form-control"
            name="title"
            value={tutorial.title}
            onChange={onchange}
          />

        </div>
        <div class="mb-3">
          <label for="description" class="form-label">
            Description
          </label>
          <input
            type="text"
            class="form-control"
            name="description"
            value={tutorial.description}
            onChange={onchange}
          />
        </div>
        <div class="mb-3">
          <label for="url" class="form-label">
            Url
          </label>
          <input
            type="text"
            class="form-control"
            name="url"
            value={tutorial.url}
            onChange={onchange}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Upload a video
        </button>
      </form>
    </div>
  );
};

export default Teacher;
