
import { useContext,useEffect } from "react";
import { UserContext } from "../context/AuthContext/UserState";
import {Card,Avatar,Descriptions} from "antd"

const Profile = () => {
    const {getUserInfo,user} = useContext(UserContext)


    useEffect(()=>{
        getUserInfo()
    },[])

 if(!user) {
    return <span>Cargando...</span>
 }
 return (
    <Card style={{maxWidth:500,margin: "0 auto"}}>
    <Avatar size={100} src={user.avatar} style={{marginBottom:20}}/>
    <Descriptions title="Información del usuario" layout="vertical" column={1} bordered>
        <Descriptions.Item >
          {user.first_name} {user.last_name}
        </Descriptions.Item>
        <Descriptions.Item>{user.email}</Descriptions.Item>
      </Descriptions>
    
    </Card>
 )

}





export default Profile