'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { useTRPC } from '@/trpc/client';

import Categories from './categories';
import SearchInput from './search-input';
import { DEFAULT_BG_COLOR } from '../constants';
import { BreadcrumbNavigation } from './breadcrumb-navigation';

const SearchFilters = () => {
	const trpc = useTRPC();
	const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());
	const params = useParams();
	const categoryParam = params.category as string | undefined;
	const activeCategory = categoryParam || 'all';
	const activeCategoryData = data.find(
		(category) => category.slug === activeCategory
	);
	const activeCategoryColor = activeCategoryData?.color || DEFAULT_BG_COLOR;
	const activeCategoryName = activeCategoryData?.name || null;
	const activeSubCategory = params.subcategory as string | undefined;
	const activeSubCategoryName =
		activeCategoryData?.subcategories.find(
			(sub) => sub.slug === activeSubCategory
		)?.name || null;

	return (
		<div
			className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full bg-[#F5F5F5]"
			style={{
				backgroundColor: activeCategoryColor,
			}}
		>
			<SearchInput />

			<div className="hidden lg:block">
				<Categories data={data} />
			</div>

			<BreadcrumbNavigation
				activeCategory={activeCategory}
				activeCategoryName={activeCategoryName}
				activeSubCategoryName={activeSubCategoryName}
			/>
		</div>
	);
};

export const SearchFiltersSkeleton = () => {
	return (
		<div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full bg-[#F5F5F5]">
			<SearchInput disabled />

			<div className="hidden lg:block">
				<div className="h-11" />
			</div>
		</div>
	);
};

export default SearchFilters;
