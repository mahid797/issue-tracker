'use client';
import classnames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';

const NavBar = () => {
	const currentPath = usePathname();
	const links = [
		{ label: 'Dashboard', href: '/' },
		{ label: 'Issues', href: '/issues' },
	];
	return (
		<nav className="flex items-center px-5 mb-5 space-x-6 border-b h-14">
			<Link href="/">
				<AiFillBug />
			</Link>
			<ul className="flex space-x-6">
				{links.map((link) => (
					<Link
						key={link.href}
						className={classnames({
							'text-sky-800': link.href === currentPath,
							'text-zinc-500': link.href !== currentPath,
							'hover:text-sky-600 transition-colors': true,
						})}
						href={link.href}>
						{link.label}
					</Link>
				))}
				<li></li>
			</ul>
		</nav>
	);
};

export default NavBar;
