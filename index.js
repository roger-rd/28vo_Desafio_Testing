import express from "express";
import cafesRouter from "./routes/cafes.routes.js"

export const app = express();


app.use(express.json());
app.use("/api",cafesRouter);



app.listen(3000, console.log(" http://localhost:3000/api/"))