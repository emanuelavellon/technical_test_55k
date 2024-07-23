import { useEffect, useState, useRef, useMemo } from "react"
import { API_USERS } from "./Constants/Api";
import {type Users} from "./types";
import { UsersTable } from "./Components/UsersTable";


function App() {
  const [users, setUsers]=useState<Array<Users>>([]);
  const [showColor, setShowColor] = useState(false);
  const [sortByCountry, setSortByCountry]=useState(false);
  const [filterCountry, setFilterCountry]=useState<string | null>("");
  const initialUsers=useRef<Array<Users>>([])
 
  useEffect(()=>{
    fetch(API_USERS)
      .then(res=>res.json())
      .then(data=>{
        setUsers(data?.results);
        initialUsers.current=data?.results;
      })
      .catch(err=>{
        console.log(err);
      });

  }, []);

  const filteredUsers= typeof filterCountry ==="string" && filterCountry.length>0
                      ? users.filter(user=>user.location.country.toLowerCase().includes(filterCountry.toLowerCase()))
                      : users;

  const sortedUsers= useMemo(()=>{
    console.log("entramemo")
    return sortByCountry ? [...filteredUsers].sort((a, b)=>a.location.country.localeCompare(b.location.country))
    : filteredUsers;
  }, [filteredUsers, sortByCountry]);
                                 

  const handleSortByCountry=()=>{
     setSortByCountry(prevState=>!prevState);
  }

  const handleDeleteUser=(userEmail: string)=>{
    const temp=users.filter(user=>user.email!=userEmail);
    setUsers(temp);
  }

  const handleRestoreInitialUsers=()=>{
   setUsers(initialUsers.current);
  }
 

  return (
    <>
     
        <h1>Technical Interview</h1>
        <header>
          <button onClick={()=>setShowColor(!showColor)}>Show Colors</button>
          <button onClick={handleSortByCountry}>Sort by Country</button>
          <button onClick={handleRestoreInitialUsers}>Restore Initial Users</button>
          <input type="text" onChange={(evt)=>setFilterCountry(evt.target.value)} placeholder="Filter by Country...United States, Spain, Mexico" />
        </header>

        <main>
          <UsersTable users={sortedUsers} showColor={showColor} handleDeleteUser={handleDeleteUser}/>
        </main>
        

      

    </>
  )
}

export default App
