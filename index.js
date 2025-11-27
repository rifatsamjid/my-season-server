const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 4000

// middleware
app.use(cors())
app.use(express.json())



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
        // await client.connect()
        const database = client.db("productsdb");
        const productsCollection = database.collection("products")


        

        // add product
app.post('/products', async (req, res) => {
  try {
    const newProduct = req.body;

    if (!newProduct.name || !newProduct.price) {
      return res.status(400).json({   করো
        success: false,
        message: "Name and price are required!"
      });
    }

    const result = await productsCollection.insertOne({
      name: newProduct.name.trim(),
      shortDescription: newProduct.shortDescription?.trim() || "",
      description: newProduct.description?.trim() || "",
      price: Number(newProduct.price),
      image: newProduct.image?.trim() || "https://via.placeholder.com/400x300.png?text=FruitHub",
      createdAt: new Date(),
    });

    res.status(201).json({  
      success: true,
      message: "Product added successfully!",
      insertedId: result.insertedId
    });

  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({  
      success: false,
      message: "Failed to add product"
    });
  }
});

        // api get
        app.get('/products', async (req, res) => {
            const cursor = productsCollection.find()
            const result = await cursor.toArray()
            res.send(result)
        })

        // api delete
        app.delete('/products/:id', async (req, res) => {
            const id = req.params.id;
            const quarry = { _id: new ObjectId(id) }
            const result = await productsCollection.deleteOne(quarry)
            res.send(result)
        })

        // fresh products
        app.get('/products/recent-products', async (req, res) => {
            const cursor = productsCollection.find().sort({ date: -1 }).limit(6)
            const result = await cursor.toArray()
            res.send(result || []);
        })

        // app id
        app.get("/products/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const product = await productsCollection.findOne(query)
            res.send(product)
        })

        // await client.db("admin").command({ ping: 1 });
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