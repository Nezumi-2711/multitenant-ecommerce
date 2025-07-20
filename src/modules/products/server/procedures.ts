import type { Where } from "payload";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";
import { Category } from "@/payload-types";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure.input(z.object({
    category: z.string().nullable().optional(),
  })).query(async ({ ctx, input }) => {
    const where: Where = {}

    if (input.category) {
      const categoriesData = await ctx.db.find({
        collection: 'categories',
        limit: 1,
        depth: 1, // Populated subcategories, subcategories.[0] will be a type of "Category"
        pagination: false,
        where: {
          slug: {
            equals: input.category
          }
        }
      })

      const formattedData = categoriesData.docs.map((category) => ({
        ...category,
        subcategories: (category.subcategories?.docs ?? []).map((doc) => ({
          // Because of "depth: 1" we are confident "doc" will be a tpe of "Category"
          ...(doc as Category),
          subcategories: undefined,
        })),
      }));

      const subCategoriesSlugs = [];
      const parentCategory = formattedData[0];

      if (parentCategory) {
        subCategoriesSlugs.push(
          ...parentCategory.subcategories.map((subcategory) => subcategory.slug)
        );
      }

      if (parentCategory) {
        where['category.slug'] = {
          in: [parentCategory.slug, ...subCategoriesSlugs],
        }
      }
    }

    const data = await ctx.db.find({
      collection: 'products',
      depth: 1, // Populated "category" & "image"
      where,
    });

    return data;
  })
})