const express=require("express")
const app=express()
const cors=require("cors")
require("dotenv").config()
const dbConnect=require("./config/db")
const evenementmodeleRoutes = require("./routes/EvenementModeleRoute");
const clientRoutes = require("./routes/ClientRoute");
const prestationRoutes=require("./routes/PrestationRoute");
const prestateurRoutes=require("./routes/PrestateurRoute");
const lieuRoutes=require("./routes/lieuRoutes");
const evenementCommandeRoutes = require('./routes/EvenementCommandeRoute');

app.use(express.json())
app.use(cors())
dbConnect()
app.use("/api/evenementmodeles", evenementmodeleRoutes);
app.use("/api/clients",clientRoutes);
app.use("/api/prestations",prestationRoutes);
app.use("/api/prestataires",prestateurRoutes);
app.use("/api/lieu",lieuRoutes);
app.use("/api/evenementcommandes",evenementCommandeRoutes);

app.listen(process.env.PORT || 5000,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})