import { Application, Router } from "express";
import * as catalogue from "../controllers/catalogue.controllers.js";

export default (app: Application): void => {
  const router = Router();
  
  router.get("/", catalogue.get);
  app.use('/api/catalogue', router);
};
