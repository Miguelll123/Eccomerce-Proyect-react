import { createContext,useReducer } from "react";
import axios from "axios";
import userReducer from "./UserReducer";

 const token = localStorage.getItem("token") || null;

 const initialState = {
    token:token,
    user:null,
    isAuthenticated:!!token
 }


 const API_URL = "http://localhost:3000/users";


 export const UserContext = createContext(initialState);

 export const UserProvider = ({children})=>{
    const [state,dispatch] = useReducer (userReducer, initialState);

 // Función para iniciar sesión 
 const login = async (user) => {
    try {
        const response = await axios.post(API_URL + "/login", user);
        dispatch({
            type:"LOGIN",
            payload:response.data
        });

        if(response.data){
            localStorage.setItem("token",response.data.token);
        }
        
        return response.data; // Retornar los datos para que el componente pueda saber si fue exitoso
    } catch(error){
        console.log(error);
        throw error; // Lanzar el error para que el componente pueda manejarlo
    }
 }



     return (
        <UserContext.Provider value={({
            token:state.token,
            user:state.user,
            isAuthenticated:state.isAuthenticated,
            login
        })}
        >
            {children}
        </UserContext.Provider>
     )

 }