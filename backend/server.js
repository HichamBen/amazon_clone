const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routers/userRouter");
const productRouter = require("./routers/productRouter");
const orderRouter = require("./routers/orderRouter");

require("dotenv").config({
    path:"../.env"
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/e-comerce");

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
});

app.get("/", (req, res) => {
    res.json("server is ready")
});

app.use((err, req, res, next)=> {
    res.status(500).send({message: err.message});
});

if(process.env.PRO === "production") {
    app.use(express.static("./frontend/build/"));
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});