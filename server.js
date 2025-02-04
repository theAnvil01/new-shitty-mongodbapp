const { MongoClient } = require("mongodb");
const express = require("express")
const cors = require("cors")

const app = express()
const uri = "mongodbapi"
const client = new MongoClient(uri)
const database = client.db("class")
const students = database.collection("student")
const port = 4000

//allow corss





app.use(express.json())
// logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} ${req.ip} ${req.cookies}`);
    next();
  });

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
  }));

 
 app.post("/final_request" , async ( req , res)=> {
     const { username,name, classes, age } = req.body;
     if (!name || !classes || !age || !username) { 
     res.send("all fields are required")
     }
     else{
        const data ={
            username: username,
            name: name,
            class: classes,
            age: age

            
        }

        const UsernameCheck = /^[0-9a-zA-Z]{5,10}$/;
        if (UsernameCheck.test(username) === true){
                   
                    //error response

                    
            
                    const query = { username: username}
                    const option = { projection: {_id: 0, username: 1, age: 1, remarks: 1 } }
                    const stdata = await students.findOne(query, option)
         
                 if (stdata === null){
                                var insertOne = await students.insertOne(data)
                    console.log("registered")
                     res.send("username Successfully registered")
                 }
                         else {
                     res.send("Username already Registered,Please select other")
                                console.log("Not registered")
                 }
        }
        else
            {
            res.send("invalid username, please select from 5-10 characters")
        }


}})     


 

//search function 

app.post("/search",async (req, res) => {
    const username = req.body.user
    console.log("hello " + username)
    
    //error message 
    const error = { 
        error: "No user found." 
    }
    // retrieve data from server 
        // set options for data 
            const query = {username : username}
            const options = { projection :  { _id:0 ,username:1,class:1,age:1 }}
            //retrieve data from find one 
            
            
            
            const searchres = await students.findOne(query, options)
            if (searchres === null){
                 res.send(error)
                 console.log(error)
            }
            else {
                res.send(searchres)
                console.log(searchres)
            }
           // await client.close()
})

app.listen(port)
    console.log("server Started on port: "+ port)
