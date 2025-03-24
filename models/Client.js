const mongoose = require('mongoose');
const clientSchema =new mongoose.Schema({
    type: { type: String, enum: ['Ecole', 'Entreprise', 'Particulier'], required: true },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    telephone: { type: String, required: true },
    ville: { type: String,required: true  },
    modepass:{type: String,required: true  },
    formJuridique: {  type: String, enum: ['SARL', 'SA', 'Auto-Entrepreneur'], required: function(){ 
               return this.type !== 'Particulier'; 
    }} ,
},{ timestamps: true });
module.exports = mongoose.model('Client', clientSchema);
