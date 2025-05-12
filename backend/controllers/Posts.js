const { Readable } = require("stream");
const cloudinary = require("cloudinary").v2;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.addPost = async (req, res) => {
  try {
    const { title, technologies, team, description } = req.body;
    const teamMembers = team.split(",").map((member) => member.trim());

    if (!title || !technologies || !description) {
      return res.status(400).json({
        message: "Please provide title, technologies, and description",
      });
    }

    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: "Please provide an image." });
    }

    const file = req.files.image;

    const bufferToStream = (buffer) => {
      const readableStream = new Readable();
      readableStream.push(buffer);
      readableStream.push(null);
      return readableStream;
    };

    const uploadImage = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "image",
            folder: "projects",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        bufferToStream(fileBuffer).pipe(uploadStream);
      });
    };

    const uploadResult = await uploadImage(file.data);

    const newPost = await prisma.project.create({
      data: {
        title,
        technologies,
        team: teamMembers,
        description,
        images: uploadResult.secure_url,
      },
    });

    return res.status(201).json({ message: `Project Added: ${newPost.title}` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error." });
  } finally {
    await prisma.$disconnect();
  }
};

exports.getPost = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error." });
  } finally {
    await prisma.$disconnect();
  }
};

exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await prisma.project.findUnique({ where: { id } });
    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Internal Server Error.` });
  } finally {
    await prisma.$disconnect();
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, technologies, team, description } = req.body;

    const teamMembers = team
      ? team.split(",").map((member) => member.trim())
      : [];

    const existingPost = await prisma.project.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return res.status(404).json({ message: "Project not found." });
    }

    let updatedData = {
      title,
      technologies,
      team: teamMembers,
      description,
    };

    if (req.files && req.files.image) {
      const file = req.files.image;

      const bufferToStream = (buffer) => {
        const readableStream = new Readable();
        readableStream.push(buffer);
        readableStream.push(null);
        return readableStream;
      };

      const uploadImage = (fileBuffer) => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              resource_type: "image",
              folder: "projects",
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );

          bufferToStream(fileBuffer).pipe(uploadStream);
        });
      };

      try {
        const uploadResult = await uploadImage(file.data);
        updatedData.images = uploadResult.secure_url;
      } catch (uploadError) {
        console.error("Image upload failed:", uploadError);
        return res.status(500).json({ message: "Image upload failed." });
      }
    }

    const updatePromise = prisma.project.update({
      where: { id },
      data: updatedData,
    });

    res.status(200).json({ message: "Project update initiated." });

    await updatePromise;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error." });
  } finally {
    await prisma.$disconnect();
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await prisma.project.delete({ where: { id } });
    return res
      .status(200)
      .json({ message: `Successfully Delete a project: ${post.title}` });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error.` });
  } finally {
    await prisma.$disconnect();
  }
};
