import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import IssueStatusFilter from './IssueStatusFilter';

const IssueActions = () => {
	return (
		<Flex justify="between">
			<IssueStatusFilter />
			<Button variant="soft" id="customButton">
				<Link href="/issues/new">New Issue</Link>
			</Button>
		</Flex>
	);
};

export default IssueActions;
