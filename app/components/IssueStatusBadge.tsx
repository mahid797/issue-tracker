import { Status } from '@prisma/client';
import { Badge } from '@radix-ui/themes';

export const statusMap: Record<
	Status,
	{ label: string; color: 'tomato' | 'indigo' | 'lime' }
> = {
	OPEN: { label: 'Open', color: 'tomato' },
	IN_PROGRESS: { label: 'In Progress', color: 'indigo' },
	CLOSED: { label: 'Closed', color: 'lime' },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
	return (
		<Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
	);
};

export default IssueStatusBadge;
