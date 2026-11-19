import { neon } from '@neondatabase/serverless';
import {
  Meeting,
  MeetingType,
  HymnInfo,
  Speaker,
  MusicalNumber,
} from './types';

// Meetings shown per page on the list view.
export const PAGE_SIZE = 5;

// Columns selected for every query. `date` is cast to text so it comes back as
// a plain 'YYYY-MM-DD' string instead of a JS Date (avoids timezone drift).
const SELECT_COLUMNS = `
  id,
  to_char(date, 'YYYY-MM-DD') AS date,
  meeting_type,
  ward_name,
  presiding,
  conducting,
  opening_hymn,
  opening_prayer,
  sacrament_hymn,
  closing_hymn,
  closing_prayer,
  announcements,
  ward_business,
  stake_business,
  speakers,
  musical_numbers
`;

// Row shape as returned by Postgres (snake_case; JSONB already parsed to objects).
interface MeetingRow {
  id: number;
  date: string;
  meeting_type: MeetingType;
  ward_name: string;
  presiding: string;
  conducting: string;
  opening_hymn: HymnInfo;
  opening_prayer: string;
  sacrament_hymn: HymnInfo;
  closing_hymn: HymnInfo;
  closing_prayer: string;
  announcements: string[] | null;
  ward_business: string[] | null;
  stake_business: boolean;
  speakers: Speaker[] | null;
  musical_numbers: MusicalNumber[] | null;
}

// Create the Neon client lazily so importing this module never throws when
// DATABASE_URL is missing (e.g. during `next build` or `next lint`). The
// connection string is only read when an actual query runs at request time.
function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      'DATABASE_URL is not set. Run `vercel env pull .env.local` for local dev, ' +
        'or confirm the Neon integration is connected to the Vercel project.'
    );
  }
  return neon(url);
}

function mapRow(row: MeetingRow): Meeting {
  return {
    id: row.id,
    date: row.date,
    type: row.meeting_type,
    wardName: row.ward_name,
    presiding: row.presiding,
    conducting: row.conducting,
    openingHymn: row.opening_hymn,
    openingPrayer: row.opening_prayer,
    sacramentHymn: row.sacrament_hymn,
    closingHymn: row.closing_hymn,
    closingPrayer: row.closing_prayer,
    announcements: row.announcements ?? [],
    wardBusiness: row.ward_business ?? [],
    stakeBusiness: row.stake_business,
    speakers: row.speakers ?? [],
    musicalNumbers: row.musical_numbers ?? [],
  };
}

// Case-insensitive search across presiding, conducting, meeting type, and the
// speakers JSON. Returns one page (PAGE_SIZE) of results, newest first.
export async function getMeetings(
  query: string = '',
  currentPage: number = 1
): Promise<Meeting[]> {
  const sql = getSql();
  const page = Math.max(1, currentPage);
  const offset = (page - 1) * PAGE_SIZE;
  const like = `%${query}%`;

  const rows = (await sql.query(
    `SELECT ${SELECT_COLUMNS}
     FROM meetings
     WHERE $1 = ''
        OR presiding ILIKE $2
        OR conducting ILIKE $2
        OR meeting_type::text ILIKE $2
        OR speakers::text ILIKE $2
     ORDER BY date DESC
     LIMIT $3 OFFSET $4`,
    [query, like, PAGE_SIZE, offset]
  )) as MeetingRow[];

  return rows.map(mapRow);
}

// Total number of pages for a given search (at least 1).
export async function getMeetingsTotalPages(
  query: string = ''
): Promise<number> {
  const sql = getSql();
  const like = `%${query}%`;

  const rows = (await sql.query(
    `SELECT COUNT(*)::int AS count
     FROM meetings
     WHERE $1 = ''
        OR presiding ILIKE $2
        OR conducting ILIKE $2
        OR meeting_type::text ILIKE $2
        OR speakers::text ILIKE $2`,
    [query, like]
  )) as { count: number }[];

  const count = rows[0]?.count ?? 0;
  return Math.max(1, Math.ceil(count / PAGE_SIZE));
}

// Single meeting by id, or null if it does not exist.
export async function getMeetingById(id: number): Promise<Meeting | null> {
  const sql = getSql();
  const rows = (await sql.query(
    `SELECT ${SELECT_COLUMNS} FROM meetings WHERE id = $1`,
    [id]
  )) as MeetingRow[];

  return rows[0] ? mapRow(rows[0]) : null;
}

// Used by the JSON API. No pagination: returns all meetings, optionally
// filtered to an exact date, newest first.
export async function getMeetingsByDate(date?: string): Promise<Meeting[]> {
  const sql = getSql();

  const rows = date
    ? ((await sql.query(
        `SELECT ${SELECT_COLUMNS} FROM meetings
         WHERE to_char(date, 'YYYY-MM-DD') = $1
         ORDER BY date DESC`,
        [date]
      )) as MeetingRow[])
    : ((await sql.query(
        `SELECT ${SELECT_COLUMNS} FROM meetings ORDER BY date DESC`,
        []
      )) as MeetingRow[]);

  return rows.map(mapRow);
}

// Write operations arrive in Week 04. Kept as stubs so the admin routes and
// future forms have a stable interface to call.
export async function addMeeting(meeting: Omit<Meeting, 'id'>): Promise<Meeting> {
  void meeting;
  throw new Error('addMeeting is not implemented yet. Coming in Week 04.');
}

export async function updateMeeting(
  id: number,
  meeting: Partial<Meeting>
): Promise<Meeting> {
  void id;
  void meeting;
  throw new Error('updateMeeting is not implemented yet. Coming in Week 04.');
}

export async function deleteMeeting(id: number): Promise<void> {
  void id;
  throw new Error('deleteMeeting is not implemented yet. Coming in Week 04.');
}
