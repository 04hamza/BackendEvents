const express = require("express");
const router = express.Router();
const Lieu = require("../models/Lieu");

router.post("/", async (req, res) => {
    try {
        const nouveauLieu =new Lieu(req.body);
        await nouveauLieu.save();
        res.status(201).json(nouveauLieu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const lieux = await Lieu.find();
        res.status(200).json(lieux);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const lieu = await Lieu.findById(req.params.id);
        if (!lieu) return res.status(404).json({ message: "Lieu non trouvé" });
        res.json(lieu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const lieu = await Lieu.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!lieu) return res.status(404).json({ message: "Lieu non trouvé" });
        res.json(lieu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const lieu = await Lieu.findByIdAndDelete(req.params.id);
        if (!lieu) return res.status(404).json({ message: "Lieu non trouvé" });
        res.json({ message: "Lieu supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
