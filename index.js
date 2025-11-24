const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
const app = express()
const port = process.env.PORT || 4000

// middleware
app.use(cors())
app.use(express.json())



const uri = "mongodb+srv://<db_username>:<db_password>@cluster1.jkfjkqt.mongodb.net/?appName=Cluster1";



app.get('/',(req,res)=>{
    res.send("Hello this is my server side")
})

app.listen(port,()=>{
    console.log(`This server is running port:${port}`)
})