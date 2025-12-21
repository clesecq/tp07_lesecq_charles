import { Application, Router } from "express";
import * as pollution from "../controllers/pollution.controllers.js";
import { authenticateJWT } from "../middleware/auth.middleware.js";

export default (app: Application): void => {
  const router = Router();

  // Public routes - Retrieve all/single pollutions
  router.get("/", pollution.findAll);
  router.get("/:id", pollution.findById);

  // Protected routes - Create, Update, Delete (require authentication)
  router.post("/", authenticateJWT, pollution.create);
  router.put("/:id", authenticateJWT, pollution.update);
  router.delete("/:id", authenticateJWT, pollution.remove);

  app.use('/api/pollutions', router);
};
