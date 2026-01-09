import { Sequelize } from "sequelize";
import { DATABASE } from '../config.js';
import utilisateurInit, { Utilisateur } from "./utilisateurs.model.js";
import pollutionInit, { Pollution } from "./pollution.model.js";

const sequelize = new Sequelize(
  `postgres://${DATABASE.user}:${DATABASE.password}@${DATABASE.host}/${DATABASE.name}`,
  {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      },
      native: true
    },
    define: {
      timestamps: false
    }
  }
);

interface Database {
  sequelize: Sequelize;
  utilisateurs: typeof Utilisateur;
  pollutions: typeof Pollution;
}

const db: Database = {
  sequelize,
  utilisateurs: utilisateurInit(sequelize),
  pollutions: pollutionInit(sequelize)
};

export default db;
export { sequelize };
