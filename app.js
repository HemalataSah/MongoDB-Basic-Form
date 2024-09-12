const express = require('express')
const  bodyParser = require('body-parser')
const path= require('path')
const MongoClient = require('mongodb').MongoClient
const url= "mongodb://localhost:27018/"

// const { log } = require('console')

const app = express()
const port = 4000

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'/views'))
app.use(bodyParser.urlencoded({extended:false}))
// app.get('/info', (req,res)=>console.log(__dirname));
app.get('/',(req,res) => res.render('index'))

app.post('/formSubmit',async(req,res) => {
    const {name,mobile}=req.body
    const data ={Name:name,mob:mobile}
    console.log(`Name: ${name}, Mobile: ${mobile}`)
    try{
        await insertData(data)
        res.send("Form submitted successfully")
       } catch(error)
       {
           console.log("error while inserting data",error);
           res.status(500).send("Internal Server Error");
       }
    
})

app.listen(port,() => console.log(`Example app Listening on port ${port}`))

async function insertData(data)
{
    const client =new MongoClient(url);
    try {
        await client.connect();
        const dbo=client.db("HRMS");
        await dbo.collection("Employees").insertOne(data);
        console.log("Data Inserted");
    } catch (err) {
        console.log("Errror",err);
        throw err;
    }finally{
        await client.close();
    }
}

