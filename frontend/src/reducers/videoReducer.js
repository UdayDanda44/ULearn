export const videoReducer= (state={videos:[]},action)=>{
    switch(action.type){
        case 'GET_VIDEO':
            return {
                videos:action.payload
            }
        default:
            return state
    }
}