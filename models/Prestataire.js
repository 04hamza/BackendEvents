const mongoose = require('mongoose');

const prestataireSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    telephone: { type: String, required: true },
    ville: { type: String, required: true },
    modepass: { type: String, required: true },
    prestations:{ type: mongoose.Schema.Types.ObjectId, ref: 'Prestation' },
    images: [{ type: String }],
    description:{type:String},
    services:{type:String},
    price:{type:Number}
},{ timestamps: true });

module.exports = mongoose.model('Prestataire', prestataireSchema);
