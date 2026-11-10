import { notFound } from 'next/navigation';
import MeetingDetail from '@/components/MeetingDetail';
import { Meeting } from '@/lib/types';

async function getMeeting(id: string): Promise<Meeting | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/meetings/${id}`, {
    cache: 'no-store',
  });

  if (res.status === 404 || res.status === 400) {
    return null;
  }

  if (!res.ok) {
    throw new Error('Failed to fetch meeting');
  }

  return res.json();
}

export default async function MeetingDetailPage(
  props: PageProps<'/meetings/[id]'>
) {
  const { id } = await props.params;
  const meeting = await getMeeting(id);

  if (!meeting) {
    notFound();
  }

  return <MeetingDetail meeting={meeting} />;
}
