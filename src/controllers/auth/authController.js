const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

const { BusinessOwners } = require("../../models/index");
const secret = require("../../cfg/cfg").jwt.secret;

// Business Owner Login
exports.BOLogin = async (req, res) => {
  const { Email, Password } = req.body;

  try {
    // Kontrol: Gelen verilerin boş olup olmadığını kontrol et
    if (!Email || !Password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required", success: false });
    }

    // Email ile BusinessOwner'ı bul
    const businessOwner = await BusinessOwners.findOne({ where: { Email } });

    if (!businessOwner) {
      return res
        .status(404)
        .json({ message: "Business Owner not found", success: false });
    }

    // Şifreyi doğrula
    const validPassword = await bcrypt.compare(
      Password,
      businessOwner.Password
    );

    if (!validPassword) {
      return res
        .status(400)
        .json({ message: "Invalid password", success: false });
    }

    // JWT token oluştur
    const token = jwt.sign({ id: businessOwner.Id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// Business Owner Register
exports.BORegister = async (req, res) => {
  const { Name, LastName, Phone, Email, Password } = req.body;

  // 1. Boş alan kontrolü
  if (!Name || !LastName || !Phone || !Email || !Password) {
    return res
      .status(400)
      .json({ message: "All fields are required", success: false });
  }

  try {
    // 2. Email'in veri tabanında kayıtlı olup olmadığını kontrol et
    const existingOwner = await BusinessOwners.findOne({ where: { Email } });
    if (existingOwner) {
      return res
        .status(400)
        .json({ message: "Business Owner already exists", success: false });
    }

    // 3. Şifre uzunluğu kontrolü
    if (Password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
        success: false,
      });
    }

    // 4. Şifreyi hashle ve kayıt yap
    const hashedPassword = await bcrypt.hash(Password, 10);
    const newBusinessOwner = await BusinessOwners.create({
      Name,
      LastName,
      Phone,
      Email,
      Password: hashedPassword,
    });

    res.status(201).json({
      newBusinessOwner,
      message: "Business Owner registered",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
