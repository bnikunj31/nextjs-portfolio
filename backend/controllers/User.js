const admin = {
  username: "admin_nikunj_bansal",
  phone: "9729891959",
  email: "nikunj.banssal@gmail.com",
  password: "Be31nikunj@",
  role: "admin",
};

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.login = async (req, res) => {
  try {
    const { entity, password } = req.body;

    if (!entity) {
      return res.status(400).json({
        message:
          "Please provide atleast one of the following: Username, Phone, Email",
      });
    }
    if (
      entity === admin.username ||
      entity === admin.phone ||
      entity === admin.email
    ) {
      if (password !== admin.password) {
        return res.status(400).json({ message: "Password is incorrect." });
      } else {
        const token = jwt.sign({ user: admin }, process.env.SECRET, {
          expiresIn: "1h",
        });
        return res
          .status(200)
          .json({ message: "Logged in successfully.", data: admin, token });
      }
    } else {
      return res
        .status(404)
        .json({ message: "Provided information doesn't match." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error." });
  }
};
