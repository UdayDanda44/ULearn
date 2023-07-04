export const videoReducer= (state={videos:[],video:{}},action)=>{
    switch(action.type){
        case 'GET_VIDEO':
            return {
                videos:action.payload
            }
        case 'UPLOAD_VIDEO':
            return{
                video:action.payload
            }
        default:
            return state
    }
}