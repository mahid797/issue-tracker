import { Button, Flex, Skeleton } from '@radix-ui/themes';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const IssueStatusFilter = dynamic(() => import('./IssueStatusFilter'), {
	ssr: false,
	loading: () => <Skeleton width="9rem" height="1.8rem" />,
});

const IssueActions = () => {
	return (
		<Flex justify="between">
			<IssueStatusFilter />
			<Button variant="solid" highContrast id="customButton">
				<Link href="/issues/new">New Issue</Link>
			</Button>
		</Flex>
	);
};

export default IssueActions;
