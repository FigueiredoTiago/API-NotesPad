import bcrypt from "bcrypt";

//número de salt rounds
const SALT_ROUNDS = 10;

// Função para hashear a senha
export async function hashPassword(password: string): Promise<string> {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return hashedPassword;
  } catch (error) {
    throw new Error("Erro ao criptografar a senha.");
  }
}
