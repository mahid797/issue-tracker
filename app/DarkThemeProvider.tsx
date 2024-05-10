'use client';

import * as React from 'react';
import { ThemeProvider } from 'next-themes';

interface DarkThemeProviderProps {
	children: React.ReactNode;
	attribute: string; // Add this line
}

const DarkThemeProvider: React.FC<DarkThemeProviderProps> = ({
	children,
	...props
}) => {
	return <ThemeProvider {...props}>{children}</ThemeProvider>;
};

export default DarkThemeProvider;
