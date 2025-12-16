import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../config.js';
import { v4 as uuidv4 } from 'uuid';

export interface JWTPayload {
  // Custom claims
  id: string;
  login: string;
  nom: string;
  prenom: string;
  
  // Standard JWT claims
  sub?: string;      // Subject (identifiant unique de l'utilisateur)
  iss?: string;      // Issuer (émetteur du token)
  aud?: string;      // Audience (destinataire du token)
  exp?: number;      // Expiration time (timestamp)
  iat?: number;      // Issued at (timestamp)
  jti?: string;      // JWT ID (identifiant unique du token)
}

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

/**
 * Middleware to authenticate JWT tokens
 * Extracts token from Authorization header (Bearer token)
 */
export function authenticateJWT(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).send({ message: 'Token manquant' });
    return;
  }

  const token = authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    res.status(401).send({ message: 'Format de token invalide' });
    return;
  }

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as JWTPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).send({ message: 'Token invalide ou expiré' });
    return;
  }
}

/**
 * Generate JWT access token with standard claims
 * Includes: sub (subject), iss (issuer), aud (audience), exp (expiration), iat (issued at), jti (JWT ID)
 */
export function generateAccessToken(user: JWTPayload): string {
  const payload = {
    ...user,
    sub: user.id,                    // Subject: user ID
    iss: 'pollution-api',            // Issuer: notre API
    aud: 'pollution-app',            // Audience: notre application
    jti: uuidv4()                    // JWT ID: identifiant unique pour prévenir les rejeux
  };
  
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { 
    expiresIn: '1h'                  // exp (expiration) géré automatiquement
    // iat (issued at) est ajouté automatiquement par jwt.sign
  });
}

/**
 * Generate JWT refresh token with standard claims (longer expiration)
 * Includes: sub (subject), iss (issuer), aud (audience), exp (expiration), iat (issued at), jti (JWT ID)
 */
export function generateRefreshToken(user: JWTPayload): string {
  const payload = {
    ...user,
    sub: user.id,                    // Subject: user ID
    iss: 'pollution-api',            // Issuer: notre API
    aud: 'pollution-app',            // Audience: notre application
    jti: uuidv4()                    // JWT ID: identifiant unique pour prévenir les rejeux
  };
  
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { 
    expiresIn: '7d'                  // exp (expiration) géré automatiquement
    // iat (issued at) est ajouté automatiquement par jwt.sign
  });
}
