import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
	const users = await prisma.user.findMany({ orderBy: { name: 'asc' } });
	return NextResponse.json(users);
}
