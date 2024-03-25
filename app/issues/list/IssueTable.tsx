import { IssueStatusBadge, Link } from '@/app/components';
import { Issue, Status } from '@prisma/client';
import { Table } from '@radix-ui/themes';
import NextLink from 'next/link';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa6';

export interface IssueQuery {
	status: Status;
	orderBy: keyof Issue;
	sortOrder: 'asc' | 'desc';
	page: string;
}

interface Props {
	searchParams: IssueQuery;
	issues: Issue[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
	const toggleOrder = () => {
		return !searchParams.sortOrder || searchParams.sortOrder === 'desc'
			? 'asc'
			: 'desc';
	};

	return (
		<div>
			<Table.Root variant="surface">
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
									<IssueStatusBadge status={issue.status} />
								</div>
							</Table.Cell>
							<Table.Cell className="hidden md:table-cell">
								<IssueStatusBadge status={issue.status} />
							</Table.Cell>
							<Table.Cell className="hidden md:table-cell">
								{issue.createdAt.toDateString()}
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
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
