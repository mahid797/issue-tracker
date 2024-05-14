import authOptions from '@/app/auth/authOptions';
import { IssueStatusBadge, Link, Skeleton } from '@/app/components';
import { Issue, Prisma, Status } from '@prisma/client';
import { Avatar, Table } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa6';

export interface IssueQuery {
	status: Status;
	orderBy: keyof Issue;
	sortOrder: 'asc' | 'desc';
	page: string;
}

const IssueStatusSelect = dynamic(
	() => import('@/app/components/IssueStatusSelect'),
	{
		ssr: false,
		loading: () => <Skeleton width="5.75rem" height="1.1rem" />,
	}
);

const issues = Prisma.validator<Prisma.IssueDefaultArgs>()({
	include: { assignedToUser: true },
});

interface Props {
	searchParams: IssueQuery;
	issues: Prisma.IssueGetPayload<typeof issues>[];
}

const IssueTable = async ({ searchParams, issues }: Props) => {
	const session = await getServerSession(authOptions);
	const toggleOrder = () => {
		return !searchParams.sortOrder || searchParams.sortOrder === 'desc'
			? 'asc'
			: 'desc';
	};

	return (
		<div>
			<Table.Root variant="surface" size="3">
				<Table.Header>
					<Table.Row>
						{columns.map((column) => (
							<Table.ColumnHeaderCell
								key={column.value}
								className={column.className}>
								<NextLink
									href={{
										query: {
											...searchParams,
											orderBy: column.value,
											sortOrder: toggleOrder(),
										},
									}}
									replace>
									{column.label}
									{column.value !== searchParams.orderBy && (
										<FaSort className="ml-1 text-xs inline" />
									)}
									{column.value === searchParams.orderBy &&
										(searchParams.sortOrder === 'asc' ? (
											<FaSortUp className="ml-1 mt-1 text-xs inline" />
										) : (
											<FaSortDown className="ml-1 mb-1 text-xs inline" />
										))}
								</NextLink>
							</Table.ColumnHeaderCell>
						))}
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{issues.map((issue) => (
						<Table.Row key={issue.id}>
							<Table.Cell className="flex justify-between">
								<Link href={`/issues/${issue.id}`}>{issue.title}</Link>
								<div className="block md:hidden">
									{!session && <IssueStatusBadge status={issue.status} />}
									{session && <IssueStatusSelect issue={issue} />}
								</div>
							</Table.Cell>
							<Table.Cell className="hidden md:table-cell">
								{!session && <IssueStatusBadge status={issue.status} />}
								{session && <IssueStatusSelect issue={issue} />}
							</Table.Cell>
							<Table.Cell className="hidden md:table-cell">
								{issue.createdAt.toDateString()}
							</Table.Cell>
							<Table.Cell className="hidden lg:table-cell ">
								{issue.assignedToUser ? (
									<Avatar
										className="size-5 ml-10"
										src={issue.assignedToUser.image!}
										fallback="N/A"
										radius="small"
										variant="soft"
									/>
								) : (
									<span className="text-gray-300 dark:text-gray-700 ml-1">
										Unassigned
									</span>
								)}
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</div>
	);
};

const columns: {
	label: string;
	value: keyof Issue;
	className?: string;
}[] = [
	{ label: 'Issue', value: 'title' },
	{
		label: 'Status',
		value: 'status',
		className: 'hidden md:table-cell',
	},
	{
		label: 'Created',
		value: 'createdAt',
		className: 'hidden md:table-cell',
	},
	{
		label: 'Assigned To',
		value: 'assignedToUserId',
		className: 'hidden lg:table-cell',
	},
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
