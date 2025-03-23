const express = require('express');
const router = express.Router();
const Prestation = require('../models/Prestation');
const EvenementModele = require("../models/EvenementModele");
const Prestataire = require('../models/Prestataire'); 

router.post('/add', async (req, res) => {
    try {
        const { nom, description,images } = req.body;
        const newPrestation = new Prestation({nom,description,images});
        await newPrestation.save();
        res.status(201).json({ message: "Prestation created successfully", prestation: newPrestation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const prestations = await Prestation.find();
        res.status(200).json(prestations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const prestation = await Prestation.findById(req.params.id);
        if (!prestation) return res.status(404).json({ message: "Prestation not found" });
        const prestataires = await Prestataire.find({ prestations:prestation._id});
        //const evenements = await EvenementModele.find({ _id: { $in: prestation.evenements } });
        res.status(200).json({prestation,prestataires});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const updatedPrestation = await Prestation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedPrestation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        await Prestation.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Prestation deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;


