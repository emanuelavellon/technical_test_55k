import { SortBy } from "../App";
import { type Users } from "../types.d"

interface Props{
    users: Users[],
    showColor: boolean
    deleteUser: (userEmail: string)=>void,
    sortByColumnHeader : (column: SortBy)=>void
} 

export function UsersTable({users, showColor, deleteUser, sortByColumnHeader} : Props){
  return(
    <>
    <table width={'100%'}>
        <thead>
            <tr>
                <td><strong>Avatar</strong></td>
                <td style={{cursor: "pointer"}} onClick={()=>sortByColumnHeader(SortBy.NAME)}><strong>Name</strong></td>
                <td style={{cursor: "pointer"}} onClick={()=>sortByColumnHeader(SortBy.LAST)}><strong>Last Name</strong></td>
                <td style={{cursor: "pointer"}} onClick={()=>sortByColumnHeader(SortBy.COUNTRY)}><strong>Country</strong></td>
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
                            <button onClick={()=>deleteUser(user.email)}>Delete</button>
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