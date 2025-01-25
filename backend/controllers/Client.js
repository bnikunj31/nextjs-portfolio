const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getClient = async (req, res) => {
  try {
    const client = await prisma.client.findMany();
    if (!client || client.length === 0) {
      return res.status(404).json({ message: "No clients found" });
    }
    return res.status(200).json(client);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Internal Server Error.` });
  }
};

exports.addClient = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields." });
    }
    const client = await prisma.client.create({
      data: {
        name,
        email,
        phone,
      },
    });
    return res.status(201).json(client);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Internal Server Error.` });
  }
};

exports.getClientById = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await prisma.client.findUnique({ where: { id } });
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    return res.status(200).json(client);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Internal Server Error.` });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, phone } = req.body;
    const client = await prisma.client.findUnique({ where: { id } });
    const updatedClient = await prisma.client.update({
      where: { id },
      data: {
        name: name || client.name,
        email: email || client.email,
        phone: phone || client.phone,
      },
    });
    return res.status(200).json(updatedClient);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Internal Server Error.` });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await prisma.client.delete({ where: { id } });
    return res
      .status(200)
      .json({ message: `Record for ${client.name} deleted successfully.` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Internal Server Error.` });
  }
};
