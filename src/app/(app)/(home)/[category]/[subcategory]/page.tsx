import { SearchParams } from 'nuqs/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getQueryClient, trpc } from '@/trpc/server';
import { loadProductFilters } from '@/modules/products/search-params';
import { ProductListView } from '@/modules/products/ui/views/product-list-view';
import { DEFAULT_LIMIT } from '@/constants';

interface Props {
	params: Promise<{
		subcategory: string;
	}>;
	searchParams: Promise<SearchParams>;
}

const Page = async ({ params, searchParams }: Props) => {
	const { subcategory } = await params;
	const queryClient = getQueryClient();
	const filters = await loadProductFilters(searchParams);

	void queryClient.prefetchInfiniteQuery(
		trpc.products.getMany.infiniteQueryOptions({
			...filters,
			category: subcategory,
			limit: DEFAULT_LIMIT,
		})
	);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<ProductListView category={subcategory} />
		</HydrationBoundary>
	);
};

export default Page;
