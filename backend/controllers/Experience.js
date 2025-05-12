const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.addExperience = async (req, res) => {
  try {
    const { company_name, role, joining_date, ending_date, description } =
      req.body;
    if (!company_name || !role || !joining_date || !description) {
      return res.status(400).json({ msg: "Please fill in all fields" });
    }
    const experience = await prisma.experience.findFirst({
      where: { company_name },
    });
    if (experience) {
      return res
        .status(400)
        .json({ message: "Experience already exists for this company" });
    }

    await prisma.experience.create({
      data: {
        company_name,
        role,
        joining_date,
        ending_date: ending_date || null,
        description,
      },
    });

    return res
      .status(201)
      .json({ message: `Successfully added experience of ${company_name}` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Internal Server Error.` });
  } finally {
    await prisma.$disconnect();
  }
};

exports.fetchExperience = async (req, res) => {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    if (!experiences || experiences.length === 0) {
      return res.status(404).json({ message: "No experiences found" });
    }
    return res.status(200).json(experiences);
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error.` });
  } finally {
    await prisma.$disconnect();
  }
};

exports.fetchExperienceById = async (req, res) => {
  try {
    const id = req.params.id;
    const experience = await prisma.experience.findUnique({ where: { id } });
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    return res.status(200).json(experience);
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error.` });
  } finally {
    await prisma.$disconnect();
  }
};

exports.updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const { company_name, role, joining_date, ending_date, description } =
      req.body;

    const experience = await prisma.experience.findUnique({ where: { id } });
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    const updatedExperience = await prisma.experience.update({
      where: { id },
      data: {
        company_name: company_name || experience.company_name,
        role: role || experience.role,
        joining_date: joining_date || experience.joining_date,
        ending_date: ending_date || experience.ending_date,
        description: description || experience.description,
      },
    });
    return res.status(200).json({
      message: `Experience updated successfully: ${
        company_name || experience.company_name
      }`,
    });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error.` });
  } finally {
    await prisma.$disconnect();
  }
};

exports.deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const experience = await prisma.experience.delete({ where: { id } });
    return res.status(200).json({
      message: `Experience deleted successfully: ${experience.company_name}`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Internal Server Error.` });
  } finally {
    await prisma.$disconnect();
  }
};
