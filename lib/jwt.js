import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const DEFAULT_EXPIRES = process.env.JWT_EXPIRES_IN || "7d";

export function signToken(payload, expiresIn = DEFAULT_EXPIRES) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}
