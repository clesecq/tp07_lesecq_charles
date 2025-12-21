import { Application } from "express";
import catalogueRoutes from "./catalogue.routes.js";
import utilisateurRoutes from "./utilisateur.routes.js";
import pollutionRoutes from "./pollution.routes.js";
import authRoutes from "./auth.routes.js";

export default (app: Application): void => {  
  app.use('/api/auth', authRoutes);
  catalogueRoutes(app);
  utilisateurRoutes(app);
  pollutionRoutes(app);
};
