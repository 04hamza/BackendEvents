const express = require("express");
const router = express.Router();
const Client = require("../models/Client");
const { protect } = require("../middleware/authMiddleware");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id,email) => {
  return jwt.sign({id,email}, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

router.post("/register", async (req, res) => {
  try {
    const clientExists = await Client.findOne({"email":req.body.email});
    if (clientExists) {
      return res.status(400).json({ message: "Client already exists" });
    }
    const hashedPassword = await bcrypt.hash(req.body.modepass,10);
    const client = await Client.create({...req.body,modepass:hashedPassword,});
    if(client){
      res.status(201).json(client);
    } else {
      res.status(400).json({ message: "Invalid client data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post("/login", async (req, res) => {
  const { email, modepass } = req.body;

  try {
    const client = await Client.findOne({ email });
    if (client && (await bcrypt.compare(modepass, client.modepass))) {
      res.json({
        _id: client._id,
        name: client.name,
        email: client.email,
        token: generateToken(client._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// // ✅ Get client profile (protected route)
// router.get("/profile", protect, async(req, res) => {
//   res.json(req.user);
// });

// // ✅ Update client profile (protected route)
// router.put("/profile", protect, async (req, res) => {
//   try {
//     const client = await Client.findById(req.user._id);

//     if (client) {
//       client.name = req.body.name || client.name;
//       client.email = req.body.email || client.email;

//       if (req.body.password) {
//         client.password = await bcrypt.hash(req.body.password, 10);
//       }

//       const updatedClient = await client.save();

//       res.json({
//         _id: updatedClient._id,
//         name: updatedClient.name,
//         email: updatedClient.email,
//         token: generateToken(updatedClient._id),
//       });
//     } else {
//       res.status(404).json({ message: "Client not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

module.exports = router;
