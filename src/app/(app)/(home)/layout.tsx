import { ReactNode } from 'react';
import configPromise from '@payload-config';
import { getPayload } from 'payload';

import Navbar from './navbar';
import Footer from './footer';
import SearchFilters from './search-filters';
import { Category } from '@/payload-types';
import { CustomCategory } from './type';

interface LayoutProps {
	children: ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
	const payload = await getPayload({
		config: configPromise,
	});

	const data = await payload.find({
		collection: 'categories',
		depth: 1,
		where: {
			parent: {
				exists: false,
			},
		},
		sort: 'name',
	});

	const formattedData: CustomCategory[] = data.docs.map((category) => ({
		...category,
		subcategories: (category.subcategories?.docs ?? []).map((doc) => ({
			...(doc as Category),
			subcategories: undefined,
		})),
	}));

	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />

			<SearchFilters data={formattedData} />

			<div className="flex-1 bg-[#F4F4F0]">{children}</div>

			<Footer />
		</div>
	);
};

export default Layout;
