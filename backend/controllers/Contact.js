const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const nodemailer = require("nodemailer");
require("dotenv").config();

exports.addQuery = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    console.log(req.body);
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    if (message.length < 29) {
      return res
        .status(400)
        .json({ message: "Message must be at least 30 characters" });
    }

    const newEnquiry = await prisma.enquiry.create({
      data: {
        name,
        email,
        message,
      },
    });

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: process.env.USER_EMAIL,
      subject: "Nikunj Techologies - New Enquiry",
      html: `
            <html>
                <body>
                    <h2>Dear Nikunj Technologies,</h2>
                    <p>There is a new enquiry from ${name}.</p>
                    <p>${message}</p>
                    <br>
                    <p>Thanking You,</p>
                    <p><strong>From: ${name}</strong></p>
                </body>
            </html>
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Notification email sent:", info.response);
      }
    });

    return res.status(201).json({
      message: `Thank you, ${name.charAt(0).toUpperCase()}${name.slice(
        1
      )} We'll be in touch soon!`,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Internal Server Error." });
  } finally {
    await prisma.$disconnect();
  }
};

exports.fetchQuries = async (req, res) => {
  try {
    const enquries = await prisma.enquiry.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    if (enquries.length === 0) {
      return res.status(404).json({ message: "No Data Found." });
    }
    return res.status(200).json({
      message: `Fetched ${enquries.length} ${
        enquries.length < 1 ? "Enquiries" : "Enquiry"
      }`,
      data: enquries,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error." });
  } finally {
    await prisma.$disconnect();
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const enquiry = await prisma.enquiry.findUnique({ where: { id } });
    const read = enquiry.read === true ? false : true;
    const enquries = await prisma.enquiry.update({
      where: {
        id,
      },
      data: {
        read,
      },
    });
    if (enquries.length === 0) {
      return res.status(404).json({ message: "Enquiry Not Found." });
    }
    return res.status(200).json({
      message: `Enquiry of ${enquries.name} is${
        read ? " (Marked as Read)" : " (Not Read Yet)"
      }`,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error." });
  } finally {
    await prisma.$disconnect();
  }
};

exports.deleteQuery = async (req, res) => {
  try {
    const { id } = req.params;
    const enquries = await prisma.enquiry.delete({
      where: {
        id,
      },
    });
    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: enquries.email,
      subject: "Nikunj Techologies - Irrelevant Request Found",
      html: `
            <html>
                <body>
                    <h2>Dear ${enquries.name},</h2>
                    <p>I have received your recent request, but it seems to be irrelevant. As a result, I will be deleting your request.</p>
                    <p>If this is a mistake and you believe your message was legitimate, please reply to this email with a proper explanation of your message. I'll review it again and take the necessary action.</p>
                    <p>Thank you for your understanding.</p>
                    <br>
                    <p>Best regards,</p>
                    <p><strong>Nikunj Technologies</strong></p>
                </body>
            </html>
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Notification email sent:", info.response);
      }
    });

    return res
      .status(200)
      .json({ message: `Successfully Deleted ${enquries.name}'s Enquiry.` });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error." });
  } finally {
    await prisma.$disconnect();
  }
};

exports.reply = async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;
    const enquries = await prisma.enquiry.findUnique({ where: { id } });
    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: enquries.email,
      subject: "Nikunj Techologies - Reply To Your Request",
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2 style="color: #333;">Dear ${enquries.name},</h2>
            <p>${reply}</p>
            <br>
            <p>Thank you for reaching out to us. If you have any further quries or questions, feel free to contact us.</p>
            <br>
            <p>Best regards,</p>
            <p><strong>Team Nikunj Technologies</strong></p>
            <p style="font-size: 0.9em; color: #777;">This email is automatically generated. Please do not reply to this email.</p>
          </body>
        </html>
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Notification email sent:", info.response);
      }
    });
    return res.status(200).json({ message: `Reply Sent To ${enquries.name}` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error." });
  } finally {
    await prisma.$disconnect();
  }
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  },
});

// Checking Unread Messages
const checkUnreadMessages = async () => {
  const unreadMessages = await getUnreadMessages();
  const unreadCount = unreadMessages.length;
  if (unreadCount >= 1) {
    sendNotificationEmail(unreadMessages);
  } else {
    console.error("No Un-read Message Found");
  }
};

// Running script to check the unreaded messages everyday
setInterval(checkUnreadMessages, 24 * 3600 * 1000);

const getUnreadMessages = async () => {
  const enquries = await Enquiry.find({ read: false })
    .sort({ createdAt: -1 })
    .lean();
  return enquries;
};

// Function to send email
const sendNotificationEmail = (unreadMessages) => {
  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: process.env.USER_EMAIL,
    subject: "Personal Portfolio - Unread Messages Notification",
    text: `You have an unread message. Here are the latest senders:\n\n${unreadMessages
      .map((msg) => `From: ${msg.name}, Email: ${msg.email}`)
      .join("\n")}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Notification email sent:", info.response);
    }
  });
};
