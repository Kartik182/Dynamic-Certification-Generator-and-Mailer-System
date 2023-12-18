const express = require("express");
require('dotenv').config();
const port =process.env.PORT||5000;
const app = express();
const{uploadFiles}=require("./controllers/uploadFiles.js");
const cors=require('cors');

const dB=require('./middlewares/dB.js')
dB.connectTodB();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.set('view engine','ejs')
const excelRoutes=require("./routes/excelRoutes.js");
app.use("",excelRoutes)
app.listen(port, () => {
  console.log("server started");
});
