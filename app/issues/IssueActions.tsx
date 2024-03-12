import { Button } from '@radix-ui/themes';
import Link from 'next/link';

const IssueActions = () => {
	return (
		<div className="mb-5">
			<Link href="/issues/new">
				<Button variant="soft">New Issue</Button>
			</Link>
		</div>
	);
};

export default IssueActions;
