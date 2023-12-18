const excelData = require("../model/excelData");
const xlsx = require("xlsx");
const ejs=require("ejs");
const pdf=require("html-pdf");
const path=require("path");
const nodemailer=require("nodemailer");
require('dotenv').config();


exports.uploadFiles=async(req, res)=>{
    const file = req.file;
    try {
      const workbook = xlsx.readFile(file.path);
      const sheet_name_list = workbook.SheetNames;
      const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
      
      for(let i=0;i<data.length;i++){
          data[i].number_of_trees=Math.floor((data[i].amount)/100);
        //   console.log('data',data[i])
          const createData=await excelData.create(data[i]);
        //   console.log('createData',createData);

      }
      console.log('data',data);
      for(let i=0;i<data.length;i++){
        res.render("../views/index.ejs",{
          name:data[i].name,
          email:data[i].email,
          mobile_number:data[i].mobile_number,
          amount:data[i].amount,
          number_of_trees:data[i].number_of_trees
      },(err,html)=>{
        if(err){
          console.log("error while rendering");
        }else{
          let options={
            height: "242px",
            width: "576px", 
            border: "0", 
            // "format": "A4"
          };
          pdf.create(html,options).toBuffer(function(err, buffer){
            console.log('This is a buffer:', Buffer.isBuffer(buffer));
            if(err){
              console.log("pdf not created");
              console.log(err);
            } else{
              
              console.log("file created succesfully");
              const nodemailer=require("nodemailer");
              let mailTransporter=nodemailer.createTransport({
                service:"gmail",
                auth:{
                  user:process.env.MAIL,
                  pass:process.env.PASS,
                }
              });
              let mailDetails={
                from:process.env.MAIL,
                to:data[i].email,
                subject:"Heartfelt Thanks for Your Generous Donation 🌳",




                text: `Dear ${data[i].name},

I hope this message finds you well. On behalf of our team, I want to express our deepest gratitude for your generous donation of Rs${data[i].amount} towards the cause of planting ${data[i].number_of_trees} trees. Your commitment to environmental sustainability is truly inspiring, and we are immensely grateful for your support.

As a token of our appreciation, we are pleased to attach your certificate of contribution. This certificate signifies your valuable contribution to the initiative and serves as a testament to your dedication to making a positive impact on our planet.

Your kindness and generosity will go a long way in fostering a greener and healthier environment for generations to come. Once again, thank you for being a vital part of our mission.

If you have any questions or would like further information about our projects, please feel free to reach out. We look forward to keeping you updated on the progress of our initiatives and the impact of your contribution.

Thank you, ${data[i].name}, for making a difference and being a part of our journey towards a more sustainable future.

Warm regards,\n
Kartik,
Chitkara university,
7015378325`,
                attachments:[
                  {
                    filename:"certificate.pdf",
                    content:buffer,
                    contentType:"application/pdf",
                    encoding:"base64",
                  }
                ]
                
              }
              mailTransporter.sendMail(mailDetails,(err,html)=>{
                if(err){
                  console.log("error occurred");
                }else{
                  console.log(`Email sent successfully to ${data[i].name}`);
                }
              })



            }
            
          });
          // pdf.create(html,options).toFile(`certificate${data[i].id}_${data[i].name}.pdf`,(err,html)=>{
          //  })
      }});
        }
        res.json({ message: "uploaded and converted the file to JSON", data });
    } catch (error) {
      console.error("Error converting Excel to JSON:", error);
      res
      .status(500)
        .json({
          message: "Error converting Excel to JSON",
          error: error.message,
        });
    }
  }
