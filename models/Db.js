const mongoose = require("mongoose");

// -------------------------------------------------------
const Users = mongoose.model(
    "Users",
    new mongoose.Schema({
        Name: { type: String, required: true },
        UserName: { type: String, required: true, unique: true },
        Email: { type: String, required: true },
        Password: { type: String, required: true },
        Age: { type: Number },
        Gender: { type: String, enum: ["man", "woman"] },
        Profile_Pic: { data: Buffer, contentType: String },
        
        Saved_blogs: [
            { blogId: { type: mongoose.Types.ObjectId, ref: "Blogs" } },
        ],
        Follow: [{ userId: { type: mongoose.Types.ObjectId, ref: "Users" } }],
    })
);
// -------------------------------------------------------
const Blogs = mongoose.model(
    "Blogs",
    new mongoose.Schema({
        Owner: { type: mongoose.Types.ObjectId, ref: "Users" },
        pics: [{ data: Buffer, contentType: String }],
        Content: {type:String },
        Likes: [
            {
                type: String,
                enum: ["man", "woman"],
                userId: mongoose.Types.ObjectId,
                ref: "Users",
            },
        ],
        Comments: [{ type: mongoose.Types.ObjectId, ref: "Users" }],
    })
);


// -------------------------------------------------------
// const Products = mongoose.model(
//     "Products",
//     new mongoose.Schema({
//         Owner: { type: mongoose.Types.ObjectId, ref: "Stores" },
//         Title: { type: String, required: true },
//         Describtion: { type: String, required: true },
//         Category: {
//             type: String,
//             enum: ["Tech", "Kitchen", "Books", "clothes"],
//             required: true,
//         },
//         Price: { type: Number, default: 0 },
//         Price_Currency: { type: String, enum: ["EURO", "USD", "DA"] },
//         Product_Image: { data: Buffer, contentType: String },
//         Comments: [
//             {
//                 user: { type: mongoose.Types.ObjectId, ref: "Users" },
//                 Comment: { type: String, required: true },
//             },
//         ],
//         Ratings: [
//             {
//                 user: { type: mongoose.Types.ObjectId, ref: "Users" },
//                 stars: { type: Number, required: true },
//             },
//         ],
//         Product_RatingAverage: { type: Number, default: 0 },
//     })
// );
// -------------------------------------------------------
// user Actions

// const UserActions = mongoose.model(
//     "UsersActions",
//     new mongoose.Schema({
//         userId: { type: mongoose.Types.ObjectId, ref: "Users" },
//         Favorite_Products: [
//             {
//                 Product_Category: {
//                     type: String,
//                     enum: ["Tech", "Kitchen", "Books", "clothes"],
//                 },
//                 time: { type: Date, default: Date.now },
//                 Store_Rating_Average: { type: Number },
//                 Store_Rating_Length: { type: Number },
//                 Product_Rating_Average: { type: Number },
//                 Product_Rating_Length: { type: Number },
//                 Product_Comments_Length: { type: Number },
//             },
//         ],
//         Basket_Products: [
//             {
//                 Product_Category: {
//                     type: String,
//                     enum: ["Tech", "Kitchen", "Books", "clothes"],
//                 },
//                 time: { type: Date, default: Date.now },
//                 Store_Rating_Average: { type: Number },
//                 Store_Rating_Length: { type: Number },
//                 Product_Rating_Average: { type: Number },
//                 Product_Rating_Length: { type: Number },
//                 Product_Comments_Length: { type: Number },
//             },
//         ],
//         Rated_Products: [
//             {
//                 rate: { type: Number },
//                 Product_Category: {
//                     type: String,
//                     enum: ["Tech", "Kitchen", "Books", "clothes"],
//                 },
//                 time: { type: Date, default: Date.now },
//                 Store_Rating_Average: { type: Number },
//                 Store_Rating_Length: { type: Number },
//                 Product_Rating_Average: { type: Number },
//                 Product_Rating_Length: { type: Number },
//                 Product_Comments_Length: { type: Number },
//             },
//         ],
//         Commented_Products: [
//             {
//                 Comment: { type: String },
//                 Product_Category: {
//                     type: String,
//                     enum: ["Tech", "Kitchen", "Books", "clothes"],
//                 },
//                 time: { type: Date, default: Date.now },
//                 Store_Rating_Average: { type: Number },
//                 Store_Rating_Length: { type: Number },
//                 Product_Rating_Average: { type: Number },
//                 Product_Rating_Length: { type: Number },
//                 Product_Comments_Length: { type: Number },
//             },
//         ],
//         Rated_Stores: [
//             {
//                 rate: { type: Number },
//                 Store_Rating_Average: { type: Number },
//                 Store_Rating_Length: { type: Number },
//                 Time_Of_Watching: { type: Number },
//                 time: { type: Date, default: Date.now },
//             },
//         ],
//         Visited_Products: [
//             {
//                 time: { type: Number, default: 0 },
//                 Product_Category: {
//                     type: String,
//                     enum: ["Tech", "Kitchen", "Books", "clothes"],
//                 },
//                 time: { type: Date, default: Date.now },
//                 Store_Rating_Average: { type: Number },
//                 Store_Rating_Length: { type: Number },
//                 Product_Rating_Average: { type: Number },
//                 Product_Rating_Length: { type: Number },
//                 Product_Comments_Length: { type: Number },
//             },
//         ],
//     })
// );
// ----------------------------------
// Qvalue
module.exports = {
    Users,
    Blogs,
};
