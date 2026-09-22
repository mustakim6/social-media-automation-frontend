import { useAuth } from "../contexts/AuthContext"

const Profile = () => {
    
  const {user} = useAuth()
   
  return (
    <div>
        <h1>Name:{user?.name}</h1>
        <p>Email: {user?.email}</p>
    </div>
  )
}

export default Profile