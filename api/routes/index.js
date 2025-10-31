export default app => {  
  require("./catalogue.routes").default(app);
  require("./utilisateur.routes").default(app);
}
