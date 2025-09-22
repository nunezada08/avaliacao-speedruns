import express from "express";
import dotenv from "dotenv";
import speedRunerRoutes from "./src/routes/speedrunerRoutes.js"


const app = express();
app.use(express.json())

dotenv.config();
const serverPort = process.env.PORT || 3001;

app.get("/", (req,res) => {
    res.send("Server funcionando...");
});

app.use("/speedruners", speedRunerRoutes)


app.listen(serverPort, () => {
    console.log(`👌servidor rodando em http://localhost:${serverPort}`)
})