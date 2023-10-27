const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://dummyuser:dummyuser123@cluster0.e7kxje8.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*30) + 10;
        const camp = new Campground({
            author: '641d8f21b99b4be7b469cf3f',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image:'https://source.unsplash.com/collection/483251',
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus aut expedita, corporis magni quas, accusantium iure, laboriosam quam veritatis' ,
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})