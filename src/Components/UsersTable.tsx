import { type Users } from "../types"

interface Props{
    users: Users[],
    showColor: boolean
    handleDeleteUser: (userEmail: string)=>void
} 

export function UsersTable({users, showColor, handleDeleteUser} : Props){

  

  return(
    <>
    <table width={'100%'}>
        <thead>
            <tr>
                <td><strong>Avatar</strong></td>
                <td><strong>Name</strong></td>
                <td><strong>Last Name</strong></td>
                <td><strong>Country</strong></td>
                <td><strong>Actions</strong></td>
            </tr>
        </thead>
        <tbody>
            {
                users.map((user, index)=>{
                const backgroundColor= showColor ? (index%2==0 
                                                        ? "#333" 
                                                        : "#555")   
                                                 : "transparent";  

                   return( 
                    <tr key={user.email} style={{backgroundColor: backgroundColor}}>
                        <td>
                            <img src={user.picture.thumbnail} alt="" />
                        </td>
                        <td>{user.name.first}</td>
                        <td>{user.name.last}</td>
                        <td>{user.location.country}</td>
                        <td>
                            <button onClick={()=>handleDeleteUser(user.email)}>Delete</button>
                        </td>
                    </tr>
                   )
                })
            }

        </tbody>
    </table>
    
    </>
  )
}