import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  userId?: string; // Adiciona o campo userId ao objeto Request
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).send("Token não informado.");
      return;
    }

    //dividir o token
    const token = authHeader.split(" ")[1];

    //verificar se o token é válido

    if (!token) {
      res.status(401).send("Token não informado.");
      return;
    }

    //verificar e decodificar o token

    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token as string, secret as string) as {
      id: string;
    };

    //enviar o id decodificado para o controller

    req.userId = decoded.id;

    next();
  } catch (err) {
    res
      .status(401)
      .send({ message: "Token inválido ou expirado.", error: err });
    return;
  }
};
