const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema ({
    name: {
        type: String,
        require: true,
    },
    discription: {
        type: String,
    },
   image: {
    type: String,
    default: "https://cdn.pixabay.com/photo/2025/02/21/19/48/nature-9422880_1280.jpg",
    set: (v) =>
      v === ""
        ? "https://cdn.pixabay.com/photo/2025/02/21/19/48/nature-9422880_1280.jpg"
        : v,
},

    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    }
});

const Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing; 