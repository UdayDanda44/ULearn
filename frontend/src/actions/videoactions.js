import { useNavigate } from "react-router-dom";
import axios from "axios";

export const uploadvideo = (data) => async (dispatch) => {
  
  try {
    const config={
        headers: {
                "Content-Type": "application/json",
             }
    }
    console.log(data);
    await axios.post('http://localhost:5000/api/auth/uploadvideo',data,config)


  } catch (err) {
    console.log(err);
  }
};

export const getVideo = () => async(dispatch)=>{
    try {
        await axios.get('http://localhost:5000/api/auth/getvideo').then((data1)=>{
          dispatch({
            type: "GET_VIDEO",
            payload: data1.data.videos,
          });
    
        })
    
      } catch (err) {
        console.log(err);
      }
}
