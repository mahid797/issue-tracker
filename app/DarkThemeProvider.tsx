'use client';

import { ThemeProvider } from 'next-themes';
import * as React from 'react';

interface DarkThemeProviderProps {
	children: React.ReactNode;
	attribute: string;
}

const DarkThemeProvider: React.FC<DarkThemeProviderProps> = ({
	children,
	...props
}) => {
	return (
		<ThemeProvider defaultTheme="light" {...props}>
			{children}
		</ThemeProvider>
	);
};

export default DarkThemeProvider;
