import { Application, Router } from "express";
import * as utilisateur from "../controllers/utilisateur.controllers.js";
import { authenticateJWT } from "../middleware/auth.middleware.js";

export default (app: Application): void => {
  const router = Router();

  // Protected routes - require authentication
  router.post("/", authenticateJWT, utilisateur.create);
  router.get("/", authenticateJWT, utilisateur.findAll);

  // Note: login is now handled by /api/auth/login
  // Keeping this for backward compatibility but should be deprecated
  router.post("/login", utilisateur.login);

  app.use('/api/users', router);
  app.use('/api/utilisateur', router);
};
