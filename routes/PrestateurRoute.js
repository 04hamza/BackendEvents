const express = require('express');
const router = express.Router();
const Prestataire = require('../models/Prestataire');  


router.post('/', async (req, res) => {
    try {
        const newPrestataire = new Prestataire({
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            telephone: req.body.telephone,
            ville: req.body.ville,
            modepass: req.body.modepass,
            prestations: req.body.prestations,
            images: req.body.images
        });

        const savedPrestataire = await newPrestataire.save();
        res.status(201).json(savedPrestataire);
    } catch (err) {
        res.status(500).json({ message: "Error creating Prestataire", error: err });
    }
});

router.get('/prestataires', async (req, res) => {
    try {
        const prestataires = await Prestataire.find().populate('prestations');  // Populating prestation reference
        res.status(200).json(prestataires);
    } catch (err) {
        res.status(500).json({ message: "Error fetching Prestataires", error: err });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const prestataire = await Prestataire.findById(req.params.id).populate('prestations');  // Populating prestation reference
        if (!prestataire) {
            return res.status(404).json({ message: "Prestataire not found" });
        }
        res.status(200).json(prestataire);
    } catch (err) {
        res.status(500).json({ message: "Error fetching Prestataire", error: err });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const updatedPrestataire = await Prestataire.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPrestataire) {
            return res.status(404).json({ message: "Prestataire not found" });
        }
        res.status(200).json(updatedPrestataire);
    } catch (err) {
        res.status(500).json({ message: "Error updating Prestataire", error: err });
    }
});

router.delete('/prestataires/:id', async (req, res) => {
    try {
        const deletedPrestataire = await Prestataire.findByIdAndDelete(req.params.id);
        if (!deletedPrestataire) {
            return res.status(404).json({ message: "Prestataire not found" });
        }
        res.status(200).json({ message: "Prestataire deleted" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting Prestataire", error: err });
    }
});

module.exports = router;
