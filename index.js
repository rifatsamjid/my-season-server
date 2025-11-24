const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 4000

// middleware
app.use(cors())
app.use(express.json())

// 
// 0AQi84c0MSIJUI7J

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster1.jkfjkqt.mongodb.net/?appName=Cluster1`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {
    try {
        await client.connect()
        const database = client.db("productsdb");
        const productsCollection = database.collection("products")


        // add api
        app.post('/products', async (req, res) => {
            const newProduct = req.body
            const result = await productsCollection.insertOne(newProduct)
            res.send(result)
        })

       

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    finally {

    }
}
run().catch(console.dir)



app.get('/', (req, res) => {
    res.send("Hello this is my server side")
})

app.listen(port, () => {
    console.log(`This server is running port:${port}`)
})