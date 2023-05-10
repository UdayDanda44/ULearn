export const authReducer= (state={currentUser:{}},action)=>{
    switch(action.type){
        case 'LOGIN_USER':
            return {
                currentUser:action.payload
            }
        default:
            return state
    }
}