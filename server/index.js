const express=require("express");
const cors=require("cors");
const users=require("./sample.json");
const app=express();
const fs=require("fs")

const port=8000;
app.use(express.json())





  const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  };

  app.use(cors(corsOptions));






// display all users
app.get("/users",(req,res)=>{
return res.json(users);
})


// delete user details

app.delete("/users/:id",(req,res)=>{
    let id =Number(req.params.id);
    let filteredUser=users.filter((user)=>user.id!==id);

    fs.writeFile("./sample.json",JSON.stringify
        (filteredUser),(err,data)=>{
            return res.json(filteredUser)
        })
})


// add new users

app.post("/users/:id",(req,res)=>{

    let {name,age,city}=req.body;
    if(!name || !age || !city){
        res.status(400).send({message:"All Field Required"})
    }
let id=Date.now();
users.push({id,name,age,city})

 fs.writeFile("./sample.json",JSON.stringify(users),
        (err,data)=>{
    return res.json({"message":"user datail added success"})
            
        })

})


// update user
app.put("/users/:id",(req,res)=>{
    let id=Number(req.params.id)
    let {name,age,city}=req.body;
    if(!name || !age || !city){
        res.status(400).send({message:"All Field Required"})
    }

let index=users.findIndex((user)=>user.id==id);

users.splice(index,1,{...req.body});


 fs.writeFile("./sample.json",JSON.stringify(users),
        (err,data)=>{
    return res.json({"message":"user datail update success"})
            
        })

})


app.listen(port,(err)=>{
    console.log(`App is running in port ${port}`)
})