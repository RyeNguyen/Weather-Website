const path = require("path");
const express = require('express');
const hbs = require('hbs');
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode.js");

console.log(__dirname);

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "readyWeather",
        name: "Minh Nguyen"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "Minh Nguyen"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        text: "Don't know how to use the app?",
        name: "Minh Nguyen"
    });
});

app.get("/weather", (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({
            error: "Please provide an address!"
        })
    }

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error});
            }
            res.send({
                forecast: forecastData,
                location: location,
                address
            })
        });
    });
});

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term!"
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Minh Nguyen",
        errorMessage: "Help article not found!!!"
    })
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Minh Nguyen",
        errorMessage: "Page not found!!!"
    })
});

app.listen(3000, () => {
    console.log("Server is up on port 3000!");
});