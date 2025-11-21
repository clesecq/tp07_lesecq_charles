import { Application, Router } from "express";
import * as utilisateur from "../controllers/utilisateur.controllers.js";

export default (app: Application): void => {
  const router = Router();

  // Create a new user
  router.post("/", utilisateur.create);

  // Get all users
  router.get("/", utilisateur.findAll);

  // login utilisateur
  router.post("/login", utilisateur.login);

  app.use('/api/users', router);
  app.use('/api/utilisateur', router);
};
