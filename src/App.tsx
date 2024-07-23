import { useEffect, useState, useRef, useMemo } from "react"
import { API_USERS } from "./Constants/Api";
import { UsersTable } from "./Components/UsersTable";
import { type Users} from './types.d';



function App() {
  const [users, setUsers]=useState<Array<Users>>([]);
  const [showColor, setShowColor] = useState(false);
  const [sorting, setSorting]=useState<SortBy>(SortBy.NONE);
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

  const filteredUsers= useMemo(()=>{
    return typeof filterCountry ==="string" && filterCountry.length>0
    ? users.filter(user=>user.location.country.toLowerCase().includes(filterCountry.toLowerCase()))
    : users;
  }, [users, filterCountry]);

  const sortedUsers= useMemo(()=>{
    switch(sorting){
      
      case SortBy.NONE:
        return filteredUsers;

      case SortBy.COUNTRY:
         return [...filteredUsers].sort((a, b)=>a.location.country.localeCompare(b.location.country));

      case SortBy.LAST:
         return [...filteredUsers].sort((a, b)=>a.name.last.localeCompare(b.name.last));
         
      case SortBy.NAME: 
         return [...filteredUsers].sort((a, b)=>a.name.first.localeCompare(b.name.first));
         
    }
    
  }, [filteredUsers, sorting]);
                                 

  const handleSortByCountry= () : void=>{
    const newSortingValue=sorting===SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSortingValue);
  }

  const handleDeleteUser=(userEmail: string) : void=>{
    const temp=users.filter(user=>user.email!=userEmail);
    setUsers(temp);
  }

  const handleRestoreInitialUsers=() : void=>{
   setUsers(initialUsers.current);
  }

  const handleShowColor=() : void =>{
    setShowColor(!showColor)
  }

  const handleSortByColumnHeader=(sort: SortBy)=>{

    setSorting(sort);
  }
 

  return (
    <>
     
        <h1>Technical Interview</h1>
        <header>
          <button onClick={handleShowColor}>Show Colors</button>
          <button onClick={handleSortByCountry}>Sort by Country</button>
          <button onClick={handleRestoreInitialUsers}>Restore Initial Users</button>
          <input type="text" onChange={(evt)=>setFilterCountry(evt.target.value)} placeholder="Filter by Country...United States, Spain, Mexico" />
        </header>

        <main>
          <UsersTable users={sortedUsers} showColor={showColor} deleteUser={handleDeleteUser} sortByColumnHeader={handleSortByColumnHeader}/>
        </main>
    </>
  )

 
  
}

export enum SortBy {
  NONE='none',
  NAME='name',
  LAST='last',
  COUNTRY='country'
}

export default App


