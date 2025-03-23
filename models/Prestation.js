const mongoose = require('mongoose');

const prestationSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String }]
},{ timestamps: true });

module.exports = mongoose.model('Prestation', prestationSchema);
