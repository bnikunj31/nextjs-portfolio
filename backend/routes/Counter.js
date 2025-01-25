const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const express = require("express");
const router = express();

router.get("/client", async (req, res) => {
  try {
    const clientCount = await prisma.client.count();
    return res.status(200).json({ count: clientCount });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error." });
  }
});

router.get("/project", async (req, res) => {
  try {
    const projectCount = await prisma.project.count();
    return res.status(200).json({ count: projectCount });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error." });
  }
});

module.exports = router;
