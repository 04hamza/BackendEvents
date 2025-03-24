const express = require('express');
const router = express.Router();
const EvenementCommande = require('../models/EvenementCommande');

router.post('/', async (req, res) => {
    try {
        const { evenementModele, client, date, invites, price, lieu, prestataires, statut } = req.body;

        const newCommande = new EvenementCommande({
            evenementModele,
            client,
            date,
            invites,
            price,
            lieu,
            prestataires,
            statut
        });

        await newCommande.save();
        res.status(201).json({ message: "Commande créée avec succès", commande: newCommande });

    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la création de la commande", details: error.message });
    }
});
router.get('/', async (req, res) => {
    try {
        const commandes = await EvenementCommande.find()
            .populate('evenementModele')
            .populate('client')
            .populate('lieu')
            .populate('prestataires');
        
        res.status(200).json(commandes);

    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des commandes", details: error.message });
    }
});

// ✅ GET Single Event Order by ID
router.get('/:id', async (req, res) => {
    try {
        const commande = await EvenementCommande.findById(req.params.id)
            .populate('evenementModele')
            .populate('client')
            .populate('lieu')
            .populate('prestataires');

        if (!commande) {
            return res.status(404).json({ error: "Commande non trouvée" });
        }

        res.status(200).json(commande);

    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération de la commande", details: error.message });
    }
});

// ✅ UPDATE an Event Order
router.put('/:id', async (req, res) => {
    try {
        const updatedCommande = await EvenementCommande.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedCommande) {
            return res.status(404).json({ error: "Commande non trouvée" });
        }

        res.status(200).json({ message: "Commande mise à jour avec succès", commande: updatedCommande });

    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la mise à jour de la commande", details: error.message });
    }
});

// ✅ DELETE an Event Order
router.delete('/:id', async (req, res) => {
    try {
        const deletedCommande = await EvenementCommande.findByIdAndDelete(req.params.id);

        if (!deletedCommande) {
            return res.status(404).json({ error: "Commande non trouvée" });
        }

        res.status(200).json({ message: "Commande supprimée avec succès" });

    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression de la commande", details: error.message });
    }
});

module.exports = router;
