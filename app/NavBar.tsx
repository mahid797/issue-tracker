'use client';
import { Skeleton } from '@/app/components';
import {
	Avatar,
	Box,
	Container,
	DropdownMenu,
	Flex,
	Text,
	Tooltip,
} from '@radix-ui/themes';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppIcon from './components/AppLogo';
import DarkModeToggle from './components/DarkModeToggle';

const NavBar = () => {
	return (
		<nav className="px-5 py-3 mb-5 border-b dark:border-b-emerald-950">
			<Container>
				<Flex justify="between" className="text-lg md:text-xl font-medium">
					<Flex align="center" className="gap-2 md:gap-4">
						<Link href="/">
							<AppIcon />
						</Link>
						<NavLinks />
					</Flex>
					<div className="flex md:gap-5 gap-4 items-center">
						<AuthStatus />
						<DarkModeToggle />
					</div>
				</Flex>
			</Container>
		</nav>
	);
};

const NavLinks = () => {
	const currentPath = usePathname();

	const links = [
		{ label: 'Dashboard', href: '/' },
		{ label: 'Issues', href: '/issues/list' },
	];

	return (
		<ul className="flex md:space-x-4 space-x-2">
			{links.map((link) => (
				<li key={link.href}>
					<Link
						className={classnames({
							'!text-emerald-600': link.href === currentPath,
							'nav-link': true,
						})}
						href={link.href}>
						{link.label}
					</Link>
				</li>
			))}
		</ul>
	);
};

const AuthStatus = () => {
	const { status, data: session } = useSession();

	if (status === 'loading')
		return <Skeleton borderRadius="50%" width="1.7rem" height="1.7rem" />;

	if (status === 'unauthenticated')
		return (
			<Tooltip content="Login to access all functions">
				<Link
					href="/api/auth/signin"
					className="hover:bg-emerald-50 py-1.5 md:px-2.5 rounded-md nav-link md:text-base text-lg">
					Login
				</Link>
			</Tooltip>
		);

	return (
		<Box>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Avatar
						src={session!.user!.image!}
						fallback="?"
						size="2"
						radius="full"
						className="cursor-pointer"
					/>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content variant="soft" align="end">
					<DropdownMenu.Label>
						<Text size="2">{session!.user!.email}</Text>
					</DropdownMenu.Label>
					<Link href="/api/auth/signout">
						<DropdownMenu.Item id="LogOut">Log out</DropdownMenu.Item>
					</Link>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</Box>
	);
};

export default NavBar;
