'use client';
import { Skeleton } from '@/app/components';
import {
	Avatar,
	Box,
	Container,
	DropdownMenu,
	Flex,
	Text,
} from '@radix-ui/themes';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';

const NavBar = () => {
	return (
		<nav className="px-5 py-3 mb-5 border-b ">
			<Container>
				<Flex justify="between" className="text-lg font-medium">
					<Flex align="center" gap="4">
						<Link href="/">
							<AiFillBug size={22} />
						</Link>
						<NavLinks />
					</Flex>
					<AuthStatus />
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
		<ul className="flex space-x-4">
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

	if (status === 'loading') return <Skeleton width="3.8rem" height="1.2rem" />;

	if (status === 'unauthenticated')
		return (
			<Link
				href="/api/auth/signin"
				className="hover:bg-emerald-50 py-0.5 px-2.5 rounded-md nav-link text-base">
				Login
			</Link>
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
