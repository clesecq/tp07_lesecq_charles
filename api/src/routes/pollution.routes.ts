import { Application, Router } from "express";
import * as pollution from "../controllers/pollution.controllers.js";

export default (app: Application): void => {
  const router = Router();

  // Create a new pollution
  router.post("/", pollution.create);

  // Retrieve all pollutions
  router.get("/", pollution.findAll);

  // Retrieve a single pollution with id
  router.get("/:id", pollution.findById);

  // Update a pollution with id
  router.put("/:id", pollution.update);

  // Delete a pollution with id
  router.delete("/:id", pollution.remove);

  app.use('/api/pollutions', router);
};
