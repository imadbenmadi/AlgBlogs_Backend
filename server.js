const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path")
const app = express();
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "Public")));

mongoose.set("strictQuery", false);
const mongoDB = "mongodb://127.0.0.1:27017/AlgBlogs";
async function connect_to_db() {
    await mongoose.connect(mongoDB, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    });
}
connect_to_db().catch((err) => console.log(err));



app.use("/Login", require("./api/Auth/Login"));
app.use("/Signup", require("./api/Auth/Signup"));
app.use("/Logout", require("./api/Auth/Logout"));
// -------------------------------------------------------
// app.use("/GetAllUsers", require("./api/User/GetAllUsers"));
// app.use("/GetUserById", require("./api/User/GetUserById"));
// app.use("/GetUserProfile", require("./api/User/GetUserProfile"));
// app.use("/RateStore", require("./api/User/Rate/RateStore"));
// app.use("/DeleteStoreRate", require("./api/User/Rate/DaleteRateStore"));
// app.use("/RateProduct", require("./api/User/Rate/RateProduct"));
// app.use("/DeleteProductRate", require("./api/User/Rate/DeleteRateProduct"));
// app.use("/CommentToProduct", require("./api/User/Comment/CommentToProduct"));
// app.use("/DeleteCommentToProduct", require("./api/User/Comment/DeleteComment"));

// -------------------------------------------------------
// app.use("/CreateStore", require("./api/Saller/CreateStore"));
// app.use("/GetStoreByid", require("./api/Saller/GetStoreByid"));
// app.use("/GetStoreProfile", require("./api/Saller/GetStoreProfile"));
// app.use("/AddProduct", require("./api/Saller/AddProduct"));
// app.use("/DeleteProduct", require("./api/Saller/DeleteProduct"));
// --------------------------------------------------------
// app.use("/AddToBasket", require("./api/Basket/AddToBasket"));
// app.use("/GetBasket", require("./api/Basket/GetBasket"));
// app.use("/DeleteFromBasket", require("./api/Basket/DeleteFromBasket"));

// --------------------------------
// app.use("/AddToFavorite", require("./api/Favorite/AddToFavorite"));
// app.use("/GetFavorite", require("./api/Favorite/GetFavorite"));
// app.use("/DeleteFromFavorite", require("./api/Favorite/DeleteFromFavorite"));
// --------------------------------------
// app.use("/GetAlLProducts", require("./api/GetProducts/GetAlLProducts"));
// app.use("/GetProductById", require("./api/GetProducts/GetProductById"));
// app.use(
//     "/GetProductsByCategorey",
//     require("./api/GetProducts/GetProductsByCategorey")
// );
// app.use("/GetStoreProducts", require("./api/GetProducts/GetStoreProducts"));
// -------------------------------------
// app.use("/DeleteStore", require("./api/Saller/DeleteStore"));
// app.use("/DeleteUser", require("./api/User/DeleteUser"));
// ---------------------------------------------------

app.listen(3000);

module.exports = app;
