import { Container, Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavBar from './NavBar';
import QueryClientProvider from './QueryClientProvider';
import AuthProvider from './auth/provider';
import './globals.css';
import './theme-config.css';

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
});

export const metadata: Metadata = {
	title: 'Issue Tracker - Mahid',
	description: 'Track and View your issues',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning={true}>
			<body className={inter.variable} suppressHydrationWarning={true}>
				<QueryClientProvider>
					<AuthProvider>
						<Theme appearance="light" accentColor="jade">
							<NavBar />
							<main className="p-5">
								<Container>{children}</Container>
							</main>
						</Theme>
					</AuthProvider>
				</QueryClientProvider>
			</body>
		</html>
	);
}
