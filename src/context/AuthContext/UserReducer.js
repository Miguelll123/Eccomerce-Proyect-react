const users = (state,action) => {
    switch(action.type){
        case "LOGIN":
            return {
                ...state,
                token:action.payload.token,
                user:action.payload.user,
                isAuthenticated:true
            };


            case "GET_USER_INFO":
                return {
                    ...state,
                    user:action.payload.user  // El backend devuelve { message: "...", user: {...} }
                };

            case "LOGOUT":
                return {
                    ...state,
                    user: null,
                    token: null,
                    isAuthenticated: false
                };
            default:
                return state;
    }
}



export default users;