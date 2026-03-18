import express from "express"
const app = express();
app.use(express.json());
import { prismaClient } from "database/client";

app.get("/" , async (req , res) => {
    
    try{
        const todos_Done = await prismaClient.todo.findMany({
        where : {done : true},
    });
    const todos_NotDone = await prismaClient.todo.findMany({
        where : {done : false},
    });

    res.json({
        message : "Get Endpoint",
        todos_Done,
        todos_NotDone
    })
    }catch(error){
        res.status(500).json({
            message : "WSoemthing wrong Happened in Get Endpoint",
            error
        })
    }

})

app.post("/" , async (req , res) => {
     
    try{
            const {username , password} = req.body;

    if(!username || !password){
        res.status(400).json({
            message : "password and username are Required"
        })
    }
   
    const user = await prismaClient.user.create({
        data : {
            username,
            password
        }
    }) 
    res.json({
        message : "Post Endpoint",
        user
    })
    }catch(error){
        res.status(500).json({
            message : "Something wrong Happened in Post Endpoint",
            error
        })
    }

})

app.listen(3000 , () => {
    console.log("Listening on poort 3000")
})