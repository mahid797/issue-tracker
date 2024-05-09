import authOptions from '@/app/auth/authOptions';
import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import AssigneeSelect from './AssigneeSelect';
import DeleteIssueButton from './DeleteIssueButton';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import { cache } from 'react';
import IssueStatusSelect from '@/app/components/IssueStatusSelect';

interface Props {
	params: { id: string };
}

const fetchUser = cache((issueId: number) =>
	prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailPage = async ({ params }: Props) => {
	const session = await getServerSession(authOptions);
	if (Number.isNaN(parseInt(params.id))) notFound();

	const issue = await fetchUser(parseInt(params.id));

	if (!issue) notFound();

	return (
		<Grid columns={{ initial: '1', sm: '5' }} gap="5">
			<Box className="md:col-span-4">
				<IssueDetails issue={issue} />
				<Flex></Flex>
			</Box>
			{session && (
				<Box className="self-end">
					<Flex className="my-0.5" direction="column" gap="4">
						<EditIssueButton issueId={issue.id} />
						<DeleteIssueButton issueId={issue.id} />
						<AssigneeSelect issue={issue} />
					</Flex>
				</Box>
			)}
		</Grid>
	);
};

export async function generateMetadata({ params }: Props) {
	const issue = await fetchUser(parseInt(params.id));

	return {
		title: issue?.title,
		description: 'Details of issue ' + issue?.id,
	};
}

export default IssueDetailPage;
