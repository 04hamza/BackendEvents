const mongoose = require('mongoose');

const lieuSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    adresse: { type: String, required: true },
    ville: { type: String, required: true },
    pay:{ type: String, required: true },
    star:{ type: Number, required: true },
    capacite: { type: Number, required: true },
    evenementsOrganises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Evenement' }],
    images: [{ type: String }]
},{ timestamps: true });

module.exports = mongoose.model('Lieu', lieuSchema);
