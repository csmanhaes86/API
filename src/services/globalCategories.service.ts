import { type Category, TransactionType } from "@prisma/client";
import prisma from "../config/prisma";

type GlobalCategoryInput = Pick<Category, "name" | "color" | "type">;

const globalCategories: GlobalCategoryInput[] = [
  // Despesas
  { name: "Alimentação", color: "#ff5733", type: TransactionType.expense },
  { name: "Transporte", color: "#33a8ff", type: TransactionType.expense },
  { name: "Moradia", color: "#33ff57", type: TransactionType.expense },
  { name: "Saúde", color: "#f033ff", type: TransactionType.expense },
  { name: "Educação", color: "#ff3366", type: TransactionType.expense },
  { name: "Lazer", color: "#ffba33", type: TransactionType.expense },
  { name: "Compras", color: "#33fff6", type: TransactionType.expense },
  { name: "Outros", color: "#b033ff", type: TransactionType.expense },

  // Receitas
  { name: "Salário", color: "#33ff57", type: TransactionType.income },
  { name: "Freelance", color: "#33a8ff", type: TransactionType.income },
  { name: "Investimentos", color: "#ffba33", type: TransactionType.income },
  { name: "Outros", color: "#b033ff", type: TransactionType.income },
];

export const initializeGlobalCategories = async (): Promise<Category[]> => {
  const createdCategories: Category[] = [];

  for (const category of globalCategories) {
    try {
      const existing = await prisma.category.findFirst({
        where: {
          name: category.name,
          type: category.type,
        },
      });

      if (!existing) {
        const newCategory = await prisma.category.create({ data: category });
        console.log(`✅Criada: ${newCategory.name}`);
        createdCategories.push(newCategory);
      } else {
        createdCategories.push(existing);
      }
    } catch (error) {
      console.error("⛔Erro ao criar categorias!");
    }
  }
  console.log("🚀Todas as categorias foram criadas!");

  return createdCategories;
};
