const mongoose=require('mongoose');

const excelData=new mongoose.Schema({
    id:{type:Number,required:true},
    name:{type:String,required:true},
    email:{type:String,required:true},
    mobile_number:{type:Number,required:true},
    amount:{type:String,reuired:true},
    number_of_trees:{type:Number,reuired:true},
    
})
module.exports =mongoose.model('excel',excelData)