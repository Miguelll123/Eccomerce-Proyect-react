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
 };

 const getUserInfo = async ()=>{
    const token = localStorage.getItem("token");
    const response = await axios.get(API_URL + "/profile",{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });
    dispatch({
        type:"GET_USER_INFO",
        payload:response.data
    })
 };

 const logout = async () => {
    try {
        const token = localStorage.getItem("token");
        await axios.delete(API_URL + "/logout", {
            headers: {
                Authorization: token
            }
        });
        
        // Limpiar el estado
        dispatch({
            type: "LOGOUT"
        });
        
        // Limpiar el token del localStorage
        localStorage.removeItem("token");
    } catch (error) {
        console.error('Error en logout:', error);
        // Aunque falle el logout en el backend, limpiamos el estado local
        dispatch({
            type: "LOGOUT"
        });
        localStorage.removeItem("token");
    }
 }



     return (
        <UserContext.Provider value={({
            token:state.token,
            user:state.user,
            isAuthenticated:state.isAuthenticated,
            login,
            getUserInfo,
            logout
        })}
        >
            {children}
        </UserContext.Provider>
     )

 }