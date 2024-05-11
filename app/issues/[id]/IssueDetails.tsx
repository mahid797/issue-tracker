import authOptions from '@/app/auth/authOptions';
import { IssueStatusBadge, Skeleton } from '@/app/components';
import { Issue } from '@prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';

const IssueStatusSelect = dynamic(
	() => import('@/app/components/IssueStatusSelect'),
	{
		ssr: false,
		loading: () => <Skeleton width="5.75rem" height="1.1rem" />,
	}
);

const IssueDetails = async ({ issue }: { issue: Issue }) => {
	const session = await getServerSession(authOptions);
	return (
		<>
			<Heading className="pt-5">{issue.title}</Heading>
			<Flex className="space-x-5" my="3">
				<Text className="self-end">{issue.createdAt.toDateString()}</Text>
				{!session && <IssueStatusBadge status={issue.status} />}
				{session && <IssueStatusSelect issue={issue} />}
			</Flex>
			<Card className="prose max-w-full dark:text-green-200" mt="4">
				<ReactMarkdown>{issue.description}</ReactMarkdown>
			</Card>
		</>
	);
};

export default IssueDetails;
