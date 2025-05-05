import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const prismaConnect = async () => {
  try {
    await prisma.$connect();
    console.log("✅DB conectadocom sucesso!");
  } catch (error) {
    console.error("⛔Falha ao conectar o DB!");
  }
};

export default prisma;
