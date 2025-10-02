const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); 
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

main().then (() => {
    console.log("connecteed to DB");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');

}

app.get("/",(req,res) =>{
    res.send("I am root");
});

// Index Route

app.get("/listings", async (req,res) => {
    const allListings = await Listing.find({})
    res.render("index.ejs", {allListings});
});

// New  Route
app.get("/listings/new", (req,res) =>{
    res.render("new.ejs");

});

// Show route

app.get("/listings/:id", async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("show.ejs", {listing});
});

// Create Route

app.post("/listings", async (req,res) => {
    // let {name,discription,image,price,location,country} = req.body;
    // let listing = req.body.listing;
    let newListing =  new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

// Edit Route

app.get("/listings/:id/edit", async (req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("edit.ejs", {listing});
});

// Update Route
app.put("/listings/:id" , async (req,res) =>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
})

// Delete Route
app.delete("/listings/:id" ,async (req,res) =>{
    let {id} = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect("/listings");
});

// app.get("/testListing", async (req,res) =>{
//     let sampleListing  new Listing ({
//         title: "Feel The Nature Villa",
//         discription: "Just Happiness",
//         price: 1500,
//         location: "Goa",
//         country: " India",
         
//     });
//     await sampleListing.save();
//     console.log("Sample was saved");
//     res.send("successfull");
// });

app.listen(8080, () =>{
    console.log("Listning on port 8080");
});