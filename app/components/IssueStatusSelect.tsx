'use client';
import React, { useEffect, useState } from 'react';
import IssueStatusBadge from './IssueStatusBadge';
import { Issue, Status } from '@prisma/client';
import { Badge, Spinner, Select, Theme } from '@radix-ui/themes';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { statusMap } from './IssueStatusBadge';
import styles from './issue-status-select.module.css';

const IssueStatusSelect = ({ issue }: { issue: Issue }) => {
	const router = useRouter();
	const [selectedStatus, setSelectedStatus] = useState<Status>(issue.status);
	const [statusChanging, setStatusChanging] = useState(false);

	useEffect(() => {
		setSelectedStatus(issue.status);
	}, [issue]);

	const changeStatus = (status: Status) => {
		const previousStatus = selectedStatus;
		setStatusChanging(true);
		setSelectedStatus(status);
		axios
			.patch('/api/issues/' + issue.id, {
				status: status,
			})
			.then(() => {
				setStatusChanging(false);
				toast.success('Status Changed!');
				router.refresh();
			})
			.catch(() => {
				setSelectedStatus(previousStatus);
				toast.error('Changes could not be saved');
			});
	};

	return (
		<>
			<div className="statusBadge">
				<Select.Root
					size="1"
					value={selectedStatus}
					onValueChange={changeStatus}>
					<Select.Trigger
						variant="soft"
						color={statusMap[selectedStatus].color}
					/>
					<Select.Content position="popper">
						<Select.Group>
							{Object.values(Status).map((status) => (
								<Theme key={status} accentColor={statusMap[status].color}>
									<Select.Item value={status}>
										<Spinner loading={statusChanging}>
											{statusMap[status].label}
										</Spinner>
									</Select.Item>
								</Theme>
							))}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</div>
		</>
	);
};

export default IssueStatusSelect;
