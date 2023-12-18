const mongoose =require('mongoose')
require('dotenv').config();
const uri=process.env.DB_STRING
exports.connectTodB=()=>{
mongoose.connect(uri,{
})
.then(()=>console.log('Database connected'))
.catch(()=> console.log("error"))
}