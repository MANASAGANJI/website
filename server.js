require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// Define MongoDB Schema
const requestSchema = new mongoose.Schema({
    name: String,
    location: String,
    helpType: String,
    description: String
});

const offerSchema = new mongoose.Schema({
    name: String,
    location: String,
    helpType: String,
    description: String
});

const Request = mongoose.model("Request", requestSchema);
const Offer = mongoose.model("Offer", offerSchema);

// API Routes

// Add a new help request
app.post("/api/requests", async (req, res) => {
    try {
        const newRequest = new Request(req.body);
        await newRequest.save();
        res.status(201).json(newRequest);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all help requests
app.get("/api/requests", async (req, res) => {
    try {
        const requests = await Request.find();
        res.json(requests);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new help offer
app.post("/api/offers", async (req, res) => {
    try {
        const newOffer = new Offer(req.body);
        await newOffer.save();
        res.status(201).json(newOffer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all help offers
app.get("/api/offers", async (req, res) => {
    try {
        const offers = await Offer.find();
        res.json(offers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
