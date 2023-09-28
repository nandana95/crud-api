import express from "express";
import mongoose from  "mongoose"
const app=express()
let port=4000;
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/demo');

app.post("/", (req, res) => {

    mongoose.connection.collection("users").insertOne(req.body)
    console.log(req.body);

})
app.get('/',async(req, res) => {
    let result = await mongoose.connection.collection("users").find().toArray();
    res.json(result)
})
app.put('/api/user/:id',(req,res)=>{
    console.log(req.params.id)
    console.log(req.body);
    const { id } = req.params;
    let result_id = new mongoose.Types.ObjectId(id)
    mongoose.connection.collection("users").updateOne({_id:result_id},{
        $set:{
            email:req.body.email,
            password:req.body.password
        }
    })
   
    res.json("api for update")
})
app.delete('/api/user/:id',(req,res)=>{
    console.log(req.params.id)
    let result_id = new mongoose.Types.ObjectId(req.params.id)
    mongoose.connection.collection("users").deleteOne({_id:result_id})
    res.json("deleted")

})


app.get('/app/nandhu',(req,res)=>{
console.log("first")
})
app.listen(port,()=>{
    console.log(`app listening on port:${port}`);})

