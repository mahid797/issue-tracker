import './globals.css';
import { Container, Theme } from '@radix-ui/themes';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import bgImage from '../public/bg.svg';
import DarkThemeProvider from './DarkThemeProvider';
import NavBar from './NavBar';
import QueryClientProvider from './QueryClientProvider';
import AuthProvider from './auth/provider';
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
						<DarkThemeProvider attribute="class">
							<Theme accentColor="jade" panelBackground="translucent">
								<Image
									src={bgImage}
									alt="Background"
									fill
									style={{
										objectFit: 'cover',
										zIndex: -1,
									}}
								/>
								<NavBar />
								<main className="p-5">
									<Container>{children}</Container>
								</main>
							</Theme>
						</DarkThemeProvider>
					</AuthProvider>
				</QueryClientProvider>
			</body>
		</html>
	);
}
