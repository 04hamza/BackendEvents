const mongoose = require('mongoose');
const evenementCommandeSchema = new mongoose.Schema({
    evenementModele: { type: mongoose.Schema.Types.ObjectId, ref: 'EvenementModele', required: true }, 
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true }, 
    date: { type: Date, required: true }, 
    lieu: { type: mongoose.Schema.Types.ObjectId, ref: 'Lieu', required: true },
    prestationsChoisies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prestation' }],
    prestataires: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prestataire' }], 
    statut: { type: String, enum: ['En attente', 'Confirmé', 'Annulé'], default: 'En attente' } 
},{ timestamps: true });

module.exports = mongoose.model('EvenementCommande', evenementCommandeSchema);
