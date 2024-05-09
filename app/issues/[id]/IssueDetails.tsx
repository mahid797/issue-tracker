import { IssueStatusBadge, Skeleton } from '@/app/components';
import { Issue } from '@prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';

const IssueStatusSelect = dynamic(
	() => import('@/app/components/IssueStatusSelect'),
	{
		ssr: false,
		loading: () => <Skeleton width="5.75rem" height="1.1rem" />,
	}
);

const IssueDetails = ({ issue }: { issue: Issue }) => {
	return (
		<>
			<Heading className="pt-5">{issue.title}</Heading>
			<Flex className="space-x-5" my="3">
				<Text className="self-end">{issue.createdAt.toDateString()}</Text>
				{/* <IssueStatusSelect status={issue.status} id={issue.id} /> */}
				<IssueStatusSelect issue={issue} />
			</Flex>
			<Card className="prose max-w-full" mt="4">
				<ReactMarkdown>{issue.description}</ReactMarkdown>
			</Card>
		</>
	);
};

export default IssueDetails;
