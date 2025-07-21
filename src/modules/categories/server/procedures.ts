import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Category } from '@/payload-types';

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {

    const data = await ctx.db.find({
      collection: 'categories',
      depth: 1, // Populated subcategories, subcategories.[0] will be a type of "Category"
      pagination: false,
      where: {
        parent: {
          exists: false,
        },
      },
      sort: 'name',
    });

    const formattedData = data.docs.map((category) => ({
      ...category,
      subcategories: (category.subcategories?.docs ?? []).map((doc) => ({
        ...(doc as Category),
      })),
    }));

    return formattedData;
  })
})