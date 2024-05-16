import { Link as RadixLink } from '@radix-ui/themes';
import NextLink from 'next/link';

interface Props {
	href: string;
	children: string;
}

const Link = ({ href, children }: Props) => {
	return (
		<NextLink href={href} passHref legacyBehavior>
			<RadixLink
				weight="medium"
				underline="hover"
				className="dark:text-emerald-200 max-[400px]:truncate max-[400px]:w-[200px]">
				{children}
			</RadixLink>
		</NextLink>
	);
};

export default Link;
