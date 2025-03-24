const mongoose = require('mongoose');
const evenementCommandeSchema = new mongoose.Schema({
    evenementModele: { type: mongoose.Schema.Types.ObjectId, ref: 'EvenementModele'}, 
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client'}, 
    date: { type: Date}, 
    invites:{ type: Number}, 
    price:{ type: Number}, 
    lieu: { type: mongoose.Schema.Types.ObjectId, ref: 'Lieu'},
    prestataires: [{ type: mongoose.Schema.Types.ObjectId, ref: 'prestataires' }], 
    statut: { type: String, enum: ['En attente', 'Confirmé', 'Annulé'], default: 'En attente' } 
},{ timestamps: true });

module.exports = mongoose.model('EvenementCommande', evenementCommandeSchema);
