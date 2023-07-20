import axios from "axios";

export const uploadvideo = (videoData) => async (dispatch) => {
  
  try {
    const config={
        headers: {
                "Content-Type": "multipart/form-data",
             }
    }
    const data=await axios.post('https://minip-seven.vercel.app/api/auth/uploadvideo',videoData,config)
    dispatch({
      type: "UPLOAD_VIDEO",
      payload: data.data,
    });
    if(data.status === 200){
      alert("video uploaded sucessfully")
    }
    console.log(data);

  } catch (err) {
    console.log(err,"hi");
    if(err){
      alert('File type not supported')
    }
    
  
  }
};

export const getVideo = () => async(dispatch)=>{
    try {
      
        await axios.get('https://minip-seven.vercel.app/api/auth/getvideo').then((data1)=>{
          dispatch({
            type: "GET_VIDEO",
            payload: data1.data.videos,
          });
    
        })
    
      } catch (err) {
        console.log(err);
      }
}
