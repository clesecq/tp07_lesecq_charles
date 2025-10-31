import { Sequelize } from "sequelize";
import { BDD } from '../config';
import utilisateur from "./utilisateurs.model.js";

const sequelize = new Sequelize(
  `postgres://${BDD.user}:${BDD.password}@${BDD.host}/${BDD.bdname}`,
  {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: true,
      native:true
    },
    define:  {
    	timestamps:false
    }
  }
);

const db = {};

db.sequelize = sequelize;

db.utilisateurs = utilisateur(sequelize);

export default db;
