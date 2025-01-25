// Packages
const express = require("express");
require("dotenv").config();
const next = require("next");
const cors = require("cors");
const upload = require("express-fileupload");

// Middlewares
const { isAuthenticated } = require("./backend/middleware/auth");

// Routes
const userRoutes = require("./backend/routes/User");
const contactRoutes = require("./backend/routes/Contact");
const skillsRoutes = require("./backend/routes/Skills");
const experienceRoutes = require("./backend/routes/Experience");
const technologyRoutes = require("./backend/routes/Technologies");
const projectRoutes = require("./backend/routes/Posts");
const clientRoutes = require("./backend/routes/Client");
const workRoutes = require("./backend/routes/Work");
const countRoutes = require("./backend/routes/Counter");

const { use } = require("react");
const { hasExternalOtelApiPackage } = require("next/dist/build/webpack-config");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const server = express();
  // connectDB();

  //Node.js API Routes
  server.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    })
  );

  // Request Data Parsers
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(upload());

  // API's
  server.use("/api/users", userRoutes);
  server.use("/api/skills", skillsRoutes);
  server.use("/api/technology", technologyRoutes);
  server.use("/api/contact", contactRoutes);
  server.use("/api/experience", experienceRoutes);
  server.use("/api/post", projectRoutes);
  server.use("/api/client", clientRoutes);
  server.use("/api/work", workRoutes);
  server.use("/api/count", countRoutes);

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  // Server PORT
  const port = process.env.PORT || 3000;

  server.listen(port, () =>
    console.log(`Server is running http://localhost:${port}`)
  );
});
