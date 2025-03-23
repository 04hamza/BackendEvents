const mongoose=require("mongoose");
const dbConnect=()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/eventDB", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("MongoDB Connected"))
      .catch(err => console.log(err));
}
module.exports=dbConnect;
