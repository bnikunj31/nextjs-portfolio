const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const default_svg = `<svg fill="#000000" width="40px" height="40px" viewBox="0 0 14 14" role="img" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <path d="m 11.8,10.6 0,-7.2035638 C 11.8,2.7367083 11.264337,2.2 10.603564,2.2 l -7.2071278,0 C 2.7367083,2.2 2.2,2.7356627 2.2,3.3964362 L 2.2,10.6 1,10.6 1,11.2 c 0,0.333681 0.2664272,0.6 0.5950819,0.6 l 10.8098361,0 C 12.726816,11.8 13,11.531371 13,11.2 l 0,-0.6 -1.2,0 z m -8.4,-7.2 7.2,0 0,5.4 -7.2,0 0,-5.4 z m 2.4,6.6 2.4,0 0,0.6 -2.4,0 0,-0.6 z"/>
        </svg>`;

exports.addTechonology = async (req, res) => {
  try {
    const { svg, name, description } = req.body;
    if (!name || !description) {
      return res
        .status(400)
        .json({ message: "Name and description are required" });
    }
    const newTech = await prisma.technology.create({
      data: {
        name,
        description,
        svg: svg || default_svg,
      },
    });
    return res.status(201).json({ message: `New Tech Found: ${name}` });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error.` });
  } finally {
    await prisma.$disconnect();
  }
};

exports.fetchTechonologies = async (req, res) => {
  try {
    const technologies = await prisma.technology.findMany();
    if (!technologies || technologies.length === 0) {
      return res.status(404).json({ message: "No technologies found" });
    }
    return res.status(200).json({ technologies });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error.` });
  } finally {
    await prisma.$disconnect();
  }
};

exports.fetchTechonologiesById = async (req, res) => {
  try {
    const { id } = req.params;
    const technology = await prisma.technology.findUnique({ where: { id } });
    if (!technology) {
      return res.status(404).json({ message: "Technology not found" });
    }
    return res.status(200).json({ technology });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error.` });
  } finally {
    await prisma.$disconnect();
  }
};

exports.updateTechonologies = async (req, res) => {
  try {
    const { id } = req.params;
    const { svg, name, description } = req.body;
    const technology = await prisma.technology.findUnique({ where: { id } });
    if (!technology) {
      return res.status(404).json({ message: "Technology not found" });
    }
    const updatedTechonology = await prisma.technology.update({
      where: { id },
      data: {
        svg: svg || technology.svg || default_svg,
        name: name || technology.name,
        description: description || technology.description,
      },
    });
    return res
      .status(200)
      .json({ message: `Updated Tech: ${updatedTechonology.name}` });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error.` });
  } finally {
    await prisma.$disconnect();
  }
};

exports.deleteTechonology = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTechonology = await prisma.technology.delete({
      where: { id },
    });
    if (!deletedTechonology) {
      return res.status(404).json({ message: "Techonology not found" });
    }
    return res
      .status(200)
      .json({ message: `Techonology deleted ${deletedTechonology.name}` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Internal Server Error.` });
  } finally {
    await prisma.$disconnect();
  }
};
