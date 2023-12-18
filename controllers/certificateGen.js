const ejs=require("ejs");
exports.certificateGen=async(req, res)=>{
    ejs.render('index',{
        name:"Kartik",
        email:"kartik182@gmail.com",
        mobile_number:"923792013791",
        amount:"1000",
        number_of_trees:"10"
    })
}