const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.addSkill = async (req, res) => {
  try {
    const { svg, name, description } = req.body;
    if (!svg || !name || !description) {
      return res.status(400).json("Please fill all the fields");
    }
    const skillExists = await prisma.skill.findFirst({ where: { name } });
    if (skillExists) {
      return res.status(400).json({ message: "Skill Already Exists." });
    }
    const skill = await prisma.skill.create({
      data: {
        svg,
        name,
        description,
      },
    });
    return res.status(201).json({ message: `New skill Found: ${name}` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error." });
  } finally {
    await prisma.$disconnect();
  }
};

exports.fetchSkills = async (req, res) => {
  try {
    const skills = await prisma.skill.findMany();
    if (!skills || skills.length === 0) {
      return res.status(404).json({ message: "No Skills Found." });
    }
    return res.status(200).json(skills);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error." });
  } finally {
    await prisma.$disconnect();
  }
};

exports.fetchSkillsById = async (req, res) => {
  try {
    const id = req.params.id;
    const skills = await prisma.skill.findUnique({ where: { id } });
    if (!skills || skills.length === 0) {
      return res.status(404).json({ message: "No Skills Found." });
    }
    return res.status(200).json(skills);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error." });
  } finally {
    await prisma.$disconnect();
  }
};

exports.updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { svg, name, description } = req.body;
    const skill = await prisma.skill.findUnique({ where: { id } });
    if (!skill) {
      return res.status(404).json("Skill Not Found");
    }

    const updatedSkill = await prisma.skill.update({
      where: {
        id,
      },
      data: {
        svg: svg || skill.svg,
        name: name || skill.name,
        description: description || skill.description,
      },
    });
    return res
      .status(200)
      .json({ message: `Successfully Updated Skill: ${updatedSkill.name}` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error." });
  } finally {
    await prisma.$disconnect();
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const skill = await prisma.skill.delete({ where: { id } });
    return res
      .status(200)
      .json({ message: `Skill Deleted Successfully: ${skill.name}` });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error.` });
  } finally {
    await prisma.$disconnect();
  }
};
