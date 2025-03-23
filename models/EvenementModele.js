const mongoose = require('mongoose');
const evenementModeleSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prestationsRequises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prestation' }],
    description: { type: String, required: true },
    images: [{ type: String }],
    type:{type:String,enum:["Particulier","Entreprise","Ecole"]},
},{ timestamps: true });

module.exports = mongoose.model('EvenementModele', evenementModeleSchema);
