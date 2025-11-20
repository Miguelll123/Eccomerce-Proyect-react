const users = (state,action) => {
    switch(action.type){
        case "LOGIN":
            return {
                ...state,
                token:action.payload.token,
                user:action.payload.user,
                isAuthenticated:true
            };
            default:
                return state;
    }
}



export default users;