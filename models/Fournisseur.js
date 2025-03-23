const mongoose=require("mongoose");

const FournisseurShema=new mongoose.Schema(
    {
        nom:{type:String,required:true},
        email: { type: String, unique: true, required: true },
        telephone: { type: String, required: true },
        adresse: { type: String, required: true },
        ville: { type: String, enum: ['Casablanca','Rabat','Tanger'] },
        prestations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prestation' }],
        images: [{ type: String }]
    }
)
const Fournisseur=mongoose.model('Fournisseur',FournisseurShema);
module.exports=Fournisseur;