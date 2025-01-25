const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.addWork = async (req, res) => {
  try {
    const { projectId, clientId } = req.body;
    if (!projectId || !clientId) {
      return res
        .status(400)
        .json({ message: "Project ID and Client ID are required" });
    }
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });
    const client = await prisma.client.findUnique({
      where: { id: clientId },
    });
    const work = await prisma.projectClient.create({
      data: {
        projectId: projectId,
        clientId: clientId,
      },
    });
    return res.status(201).json({
      message: `Successfully added ${project.title} for ${client.name}`,
    });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error.` });
  }
};

exports.getWork = async (req, res) => {
  try {
    const work = await prisma.projectClient.findMany({
      include: {
        project: true,
        client: true,
      },
    });
    return res.status(200).json(work);
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error.` });
  }
};

exports.getWorkById = async (req, res) => {
  try {
    const { id } = req.params;
    const work = await prisma.projectClient.findUnique({
      where: { id },
      include: {
        project: true,
        client: true,
      },
    });
    return res.status(200).json(work);
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error.` });
  }
};

exports.updateWork = async (req, res) => {
  try {
    const { id } = req.params;
    const { projectId, clientId } = req.body;
    if (!projectId || !clientId) {
      return res.status(400).json({ message: "Please provide all detials." });
    }
    const work = await prisma.projectClient.findUnique({ where: { id } });
    const updatedWork = await prisma.projectClient.update({
      where: { id },
      data: {
        projectId: projectId || work.projectId,
        clientId: clientId || work.clientId,
      },
    });
    return res.status(200).json({ message: `Successfully updated details` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Internal Server Error.` });
  }
};

exports.deleteWork = async (req, res) => {
  try {
    const { id } = req.params;
    const work = await prisma.projectClient.delete({ where: { id } });
    return res.status(200).json({ message: `Successfully deleted details` });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error.` });
  }
};
