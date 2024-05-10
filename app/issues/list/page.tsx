import Pagination from '@/app/components/Pagination';
import prisma from '@/prisma/client';
import { Status } from '@prisma/client';
import { Flex } from '@radix-ui/themes';
import { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import IssueActions from './IssueActions';
import IssueTable, { columnNames, IssueQuery } from './IssueTable';

interface Props {
	searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
	const statuses = Object.values(Status);
	const status = statuses.includes(searchParams.status)
		? searchParams.status
		: undefined;

	const where = { status };

	const orderBy = columnNames.includes(searchParams.orderBy)
		? { [searchParams.orderBy]: searchParams.sortOrder }
		: undefined;

	const page = parseInt(searchParams.page) || 1;
	const pageSize = 10;

	const issues = await prisma.issue.findMany({
		where: {
			status,
		},
		orderBy,
		skip: (page - 1) * pageSize,
		take: pageSize,
	});

	const issueCount = await prisma.issue.count({ where });

	return (
		<Flex direction="column" gap="3">
			<IssueActions />
			<IssueTable searchParams={searchParams} issues={issues} />
			<Pagination
				pageSize={pageSize}
				currentPage={page}
				itemCount={issueCount}
			/>
			<Toaster />
		</Flex>
	);
};

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
	title: 'Issue Tracker - Issue List',
	description: 'View all project issues',
};
export default IssuesPage;
