import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { TRPCReactProvider } from '@/trpc/client';

// Components
import { Toaster } from '@/components/ui/sonner';

import './globals.css';

const dmSans = DM_Sans({
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${dmSans.className} antialiased`}>
				<NuqsAdapter>
					<TRPCReactProvider>
						{children}
						<Toaster />
					</TRPCReactProvider>
				</NuqsAdapter>
			</body>
		</html>
	);
}
