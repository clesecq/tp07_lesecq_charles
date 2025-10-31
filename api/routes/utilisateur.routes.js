import express from "express";
import utilisateur from "../controllers/utilisateur.controllers.js";

export default app => {
  const router = express.Router();

  // login utilisateur
  router.post("/login", utilisateur.login);
  app.use('/api/utilisateur', router);
};
