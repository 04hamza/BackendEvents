const express = require("express");
const EvenementModele = require("../models/EvenementModele");
const Prestation = require('../models/Prestation');
const Prestataire = require('../models/Prestataire');  
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const evenement = new EvenementModele(req.body);
        await evenement.save();
        res.status(201).json(evenement);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.get("/", async (req, res) => {
    try {
        const evenements = await EvenementModele.find().populate("prestationsRequises");
        res.status(200).json(evenements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get("/:id", async (req, res) => {
    try {
        const evenement = await EvenementModele.findById(req.params.id).populate("prestationsRequises");
        if (!evenement) return res.status(404).json({ message: "Event not found" });
        const prestations = await Prestation.find({ _id: { $in: evenement.prestationsRequises } });
        const prestatairesByPrestation = {};
        for (const prestation of prestations) {
            const prestataires = await Prestataire.find({prestations: prestation._id });
            prestatairesByPrestation[prestation._id] = prestataires;
        }
        res.status(200).json({evenement,prestations,prestatairesByPrestation});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.put("/:id", async (req, res) => {
    try {
        const evenement = await EvenementModele.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!evenement) return res.status(404).json({ message: "Event not found" });
        res.status(200).json(evenement);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const evenement = await EvenementModele.findByIdAndDelete(req.params.id);
        if (!evenement) return res.status(404).json({ message: "Event not found" });
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports=router;

