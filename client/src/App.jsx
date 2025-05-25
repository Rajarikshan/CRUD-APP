import axios from "axios";
import { useEffect, useState } from "react";
import './App.css'

function App() {
const [users, setUsers]=useState([]);
const [filterusers,setFilterusers]=useState([]);
const [isModelOpen,setIsModelOpen]=useState(false);
const [userData,setUserData]=useState({name:"",age:"",city:""})

const getAllUsers=async()=>{
await axios.get("http://localhost:8000/users").then
((res)=>{

  console.log(res.data)
  setUsers(res.data);
  setFilterusers(res.data);


});
};


useEffect(()=>{
getAllUsers();
},[]);


// seaech function

const handleSearchChange=(e)=>{
  const searchText=e.target.value.toLowerCase();
  const filterusers=users.filter((user)=>user.name.
    toLowerCase().includes(searchText)||user.city.
    toLowerCase().includes(searchText));
    setFilterusers(filterusers)
  
  }


// delete user Function

const handleDelete=async(id)=>{
  const isConfirmed=window.confirm("are you sure you want to delete this user?");
if(isConfirmed){await axios.delete(`http://localhost:8000/users/${id}`).then((res)=>{
    setUsers(res.data);
  setFilterusers(res.data);
})
}
}

// add user details

const handleAddRecord=()=>{
setUserData({name:"",age:"",city:""});
setIsModelOpen(true); 
}

// close model

const closeModal=()=>{
  setIsModelOpen(false);
getAllUsers();

}

const handelData=(e)=>{
 setUserData({...userData,[e.target.name]: e.target.value})
}


const handleSubmit=async(e)=>{
  e.preventDefault();

  if(userData.id){
      await axios.put(`http://localhost:8000/users/${userData.id}`,userData).then((res)=>{
    console.log(res);
  });
  }else{
       await axios.post(`http://localhost:8000/users/${userData.id}`,userData).then((res)=>{
    console.log(res);
 
  });
  }
  closeModal();
setUserData({name:"",age:"",city:""});

};

// update user function

const handelupdateRecord=(user)=>{
  setUserData(user);
  setIsModelOpen(true)
}
  return (
    <>
      <div className='container'>
        <h3>CRUD Application with React.js Frondend and Node.js Backend</h3>
         <div className="input-search">
          <input type="search"  placeholder="search text here" onChange={handleSearchChange}/>
          <button onClick={handleAddRecord} className='btn green'>Add Record</button>
          </div>    
          <table className='table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>AGE</th>
                <th>CITY</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </thead>
              <tbody>
                {filterusers && filterusers.map((user,index)=>{
                  return(
                       <tr key={user.id}>
                  <td >{index+1}</td>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.city}</td>
                  <td><button onClick={()=>handelupdateRecord(user)} className='btn green'>EDIT</button></td>
                  <td><button onClick={()=>handleDelete(user.id)} className='btn red' >DELETE</button></td>  
                </tr> 
                  )
                })}
              </tbody>
          </table>
            {isModelOpen && (
              <div className="modal">
              <div className="modal-content">
                  <span className="close" onClick={closeModal}>&times;</span>
                <h2>{userData.id ? "update Record" : "Add record"}</h2>
                <div className="input-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" name="name" id="name" onChange={handelData} value={userData.name}/>
                  <label htmlFor="name">Age</label>
                  <input type="number" name="age" id="age" onChange={handelData} value={userData.age} />
                  <label htmlFor="city">City</label>
                  <input type="text" name="city" id="city" onChange={handelData} value={userData.city}/>
                </div>
                <button className="btn green" onClick={handleSubmit}>{userData.id ? "update Record" : "Add record"}</button>
              </div>
              </div>
            )}
          
      </div>


    </>
  )
}

export default App
