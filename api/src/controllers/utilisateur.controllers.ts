import { Request, Response } from "express";
import db from "../models/index.js";
import { v4 as uuidv4 } from "uuid";
import { validateUserCreation, validateLogin, validatePassword } from "../utils/validators.js";

const Utilisateur = db.utilisateurs;

// Create a new user
export function create(req: Request, res: Response): void {
  // Validate input
  const validationErrors = validateUserCreation(req.body);
  if (validationErrors.length > 0) {
    res.status(400).send({
      message: "Données invalides",
      errors: validationErrors
    });
    return;
  }

  const utilisateur = {
    id: uuidv4(),
    nom: req.body.nom,
    prenom: req.body.prenom,
    login: req.body.login,
    pass: req.body.pass
  };

  Utilisateur.create(utilisateur)
    .then(data => {
      res.status(201).send(data);
    })
    .catch(err => {
      res.status(400).send({
        message: err.message || "Error creating user"
      });
    });
}

// Get all users
export function findAll(req: Request, res: Response): void {
  Utilisateur.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(400).send({
        message: err.message || "Error retrieving users"
      });
    });
}

// Find a single Utilisateur with a login
export function login(req: Request, res: Response): void {
  const utilisateur = {
    login: req.body.login,
    password: req.body.password
  };

  // Validate credentials
  const loginError = validateLogin(utilisateur.login);
  const passwordError = validatePassword(utilisateur.password);
  
  if (loginError || passwordError) {
    res.status(400).send({
      message: "Login ou password incorrect",
      errors: [loginError, passwordError].filter(e => e !== null)
    });
    return;
  }

  Utilisateur.findOne({ where: { login: utilisateur.login } })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Utilisateur with login=${utilisateur.login}.`
        });
      }
    })
    .catch(err => {
      res.status(400).send({
        message: "Error retrieving Utilisateur with login=" + utilisateur.login
      });
    });
}
