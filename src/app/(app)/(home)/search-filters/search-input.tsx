'use client';

import { useState } from 'react';
import { ListFilterIcon, SearchIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import CategoriesSidebar from './categories-sidebar';

import { CustomCategory } from '../type';

interface SearchInputProps {
	disabled?: boolean;
	data: CustomCategory[];
}

const SearchInput = ({ disabled, data }: SearchInputProps) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<div>
			<div className="flex items-center gap-2 w-full">
				<CategoriesSidebar
					data={data}
					open={isSidebarOpen}
					onOpenChange={setIsSidebarOpen}
				/>

				<div className="relative w-full">
					<SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />

					<Input
						className="pl-8"
						placeholder="Search products"
						disabled={disabled}
					/>
				</div>

				<Button
					variant="elevated"
					className="size-12 shrink-0 flex lg:hidden"
					onClick={() => setIsSidebarOpen(true)}
				>
					<ListFilterIcon />
				</Button>
			</div>
		</div>
	);
};

export default SearchInput;
